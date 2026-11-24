"""
Studio diorama — Blender build script.

Rebuilds the home-page diorama (components/DioramaScene.tsx) with the same
layout and hotspot positions in a soft "clay" style — inflated rounded forms,
felt walls, rounded floor tiles, warm window light — kept to the Storm Grey /
Matte Black / Safety Orange palette. Then bakes the lighting into one texture
atlas and exports a GLB.

Run (Blender 5.x):
  blender -b --factory-startup --python blender/diorama.py -- preview  <out.png>
  blender -b --factory-startup --python blender/diorama.py -- bake     <out.glb>

Coordinates are written in three.js space (x, y-up, z) and converted with
v3(); three's rotation.y maps 1:1 to Blender's rotation_euler.z.
Hotspot groups are empties named hs_<key> — the web component looks them up
by name. Meshes named screen / frame_glass_<i> keep their own material (the
page textures them at runtime); everything else gets the baked atlas.
"""
import bpy, bmesh, math, sys
from mathutils import Vector

ARGS = sys.argv[sys.argv.index('--') + 1:] if '--' in sys.argv else ['preview', '//preview.png']
MODE, OUT = ARGS[0], ARGS[1]
SAMPLES = int(ARGS[2]) if len(ARGS) > 2 else 0

# ── palette ─────────────────────────────────────────────────────────
def srgb(h):
    h = h.lstrip('#')
    c = [int(h[i:i + 2], 16) / 255 for i in (0, 2, 4)]
    return tuple(((x / 12.92) if x <= 0.04045 else ((x + 0.055) / 1.055) ** 2.4) for x in c) + (1.0,)

# Original diorama colours (components/DioramaScene.tsx before the rebuild),
# rendered in a soft "clay" style. (hex, roughness, surface)
# surface: None | 'felt' (fine knit bump) | 'fluff' (pile rug)
PAL = {
    'wall':       ('#D8D5E5', 0.95, 'felt'),
    'wall2':      ('#CCC9DC', 0.95, 'felt'),
    'floor':      ('#C8B89A', 0.7,  None),
    'floor2':     ('#C1B092', 0.7,  None),
    'floor3':     ('#CDBEA2', 0.7,  None),
    'skirt':      ('#9E8A72', 0.8,  None),
    'frame':      ('#B9694A', 0.6,  None),
    'ac':         ('#ECEAF0', 0.5,  None),
    'ac_grille':  ('#CFCDD6', 0.6,  None),
    'rug':        ('#2E3248', 1.0,  'fluff'),
    'desk_wood':  ('#D4C9B2', 0.55, None),
    'metal':      ('#1C1E28', 0.4,  None),
    'mon_back':   ('#2B2F3D', 0.5,  None),
    'tablet':     ('#33384A', 0.5,  None),
    'tab_active': ('#5B6076', 0.6,  None),
    'stylus':     ('#222222', 0.5,  None),
    'mouse':      ('#E6E3EA', 0.5,  None),
    'cup':        ('#CAA06E', 0.6,  None),
    'notebook':   ('#2C2F3A', 0.8,  None),
    'nb_band':    ('#C45B6A', 0.7,  None),
    'pot_sm':     ('#D9D4CC', 0.7,  None),
    'succ':       ('#5F9D63', 0.6,  None),
    'phone':      ('#3A3F4D', 0.4,  None),
    'chair_seat': ('#22263A', 0.75, 'felt'),
    'chair_mesh': ('#1A1D2E', 0.8,  'felt'),
    'chair_arm':  ('#2A2D3E', 0.55, None),
    'wheel':      ('#18191F', 0.6,  None),
    'pot':        ('#E7E2DA', 0.85, None),
    'soil':       ('#3A2A20', 1.0,  None),
    'trunk':      ('#6E5A3E', 0.8,  None),
    'leaf':       ('#6F9152', 0.65, None),
    'leaf2':      ('#5C7E45', 0.65, None),
    'cab':        ('#EAE6F4', 0.3,  None),
    'cab2':       ('#DDD9EC', 0.3,  None),
    'cab_handle': ('#A8A4BC', 0.35, None),
    'cab_top':    ('#F0ECF8', 0.25, None),
    'arm':        ('#2E3254', 0.85, 'felt'),
    'arm_cush':   ('#363A5C', 0.85, 'felt'),
    'walnut':     ('#8A6244', 0.55, None),
    'ct_glass':   ('#B0B8C8', 0.15, None),
    'device':     ('#EEF0F2', 0.5,  None),
    'device_scr': ('#CFD3DA', 0.5,  None),
    'dial':       ('#2A2E38', 0.5,  None),
    'screen':     ('#1C2030', 0.3,  None),
    'glass':      ('#9B98A6', 0.3,  None),
}
EMIT = {}
SURF = {'felt': (30.0, 0.3), 'fluff': (28.0, 1.1)}   # noise scale, bump strength
MATS = {}
def mat(key):
    """Material by palette key, or by a plain '#rrggbb' (roughness 0.6)."""
    if key in MATS:
        return MATS[key]
    col, rough, surf = PAL.get(key) or (key, 0.6, None)
    m = bpy.data.materials.new(key)
    m.use_nodes = True
    nt = m.node_tree
    b = nt.nodes['Principled BSDF']
    b.inputs['Base Color'].default_value = srgb(col)
    b.inputs['Roughness'].default_value = rough
    if key in EMIT:
        b.inputs['Emission Color'].default_value = srgb(EMIT[key][0])
        b.inputs['Emission Strength'].default_value = EMIT[key][1]
    if surf:
        scale, strength = SURF[surf]
        tc = nt.nodes.new('ShaderNodeTexCoord')
        nz = nt.nodes.new('ShaderNodeTexNoise')
        nz.inputs['Scale'].default_value = scale
        nz.inputs['Detail'].default_value = 4.0
        bp = nt.nodes.new('ShaderNodeBump')
        bp.inputs['Strength'].default_value = strength
        bp.inputs['Distance'].default_value = 0.02
        nt.links.new(tc.outputs['Object'], nz.inputs['Vector'])
        nt.links.new(nz.outputs['Fac'], bp.inputs['Height'])
        nt.links.new(bp.outputs['Normal'], b.inputs['Normal'])
    MATS[key] = m
    return m

# ── helpers ─────────────────────────────────────────────────────────
def v3(x, y, z):
    return Vector((x, -z, y))

def empty(name, pos=(0, 0, 0), rot_y=0.0, parent=None):
    e = bpy.data.objects.new(name, None)
    bpy.context.scene.collection.objects.link(e)
    e.location = v3(*pos)
    e.rotation_euler = (0, 0, rot_y)
    e.parent = parent
    return e

def _finish(obj, name, pos, m, parent, rot_y, bevel, segs):
    obj.name = name
    obj.data.name = name
    obj.location = v3(*pos)
    obj.rotation_euler = (0, 0, rot_y)
    obj.data.materials.clear()
    obj.data.materials.append(mat(m))
    obj.parent = parent
    if bevel > 0:
        mod = obj.modifiers.new('bevel', 'BEVEL')
        mod.width = bevel
        mod.segments = segs
        mod.limit_method = 'ANGLE'
        mod.harden_normals = False
    for p in obj.data.polygons:
        p.use_smooth = True
    return obj

def box(name, w, h, d, pos, m, parent=None, rot_y=0.0, bevel=None, segs=6):
    """Rounded box. bevel=None → 'clay' rounding: 30 % of the thinnest side (max 0.18)."""
    if bevel is None:
        bevel = min(0.18, 0.3 * min(w, h, d))
    bpy.ops.mesh.primitive_cube_add(size=1)
    o = bpy.context.active_object
    o.scale = (w, d, h)
    bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
    return _finish(o, name, pos, m, parent, rot_y, bevel, segs)

def cyl(name, r_top, r_bot, h, pos, m, parent=None, verts=32, bevel=None, rot=(0, 0, 0)):
    if bevel is None:
        bevel = min(0.12, 0.35 * min(r_top, r_bot), 0.3 * h)
    bpy.ops.mesh.primitive_cone_add(vertices=verts, radius1=r_bot, radius2=r_top, depth=h)
    o = bpy.context.active_object
    o = _finish(o, name, pos, m, parent, 0.0, bevel, 4)
    o.rotation_euler = rot
    return o

def sphere(name, r, pos, m, parent=None, scale=(1, 1, 1), rot=(0, 0, 0)):
    bpy.ops.mesh.primitive_uv_sphere_add(radius=r, segments=24, ring_count=12)
    o = bpy.context.active_object
    o.scale = (scale[0], scale[2], scale[1])
    bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
    o = _finish(o, name, pos, m, parent, 0.0, 0, 0)
    o.rotation_euler = rot
    return o

def plane(name, w, h, pos, m, parent=None, facing='z'):
    """Flat quad with clean 0–1 UVs (image upright). facing: 'z' → three +z, 'x' → three +x."""
    bpy.ops.mesh.primitive_plane_add(size=1)
    o = bpy.context.active_object
    o.scale = (w, h, 1)
    bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
    o = _finish(o, name, pos, m, parent, 0.0, 0, 0)
    o.rotation_euler = (math.pi / 2, 0, math.pi / 2 if facing == 'x' else 0)
    return o

def apply_mod(o, mod):
    bpy.ops.object.select_all(action='DESELECT')
    o.select_set(True)
    bpy.context.view_layer.objects.active = o
    bpy.ops.object.modifier_apply(modifier=mod.name)

def area(name, pos, target, energy, size, color):
    L = bpy.data.lights.new(name, 'AREA'); L.energy = energy; L.size = size; L.color = color
    o = bpy.data.objects.new(name, L); bpy.context.scene.collection.objects.link(o)
    o.location = v3(*pos)
    o.rotation_euler = (v3(*target) - o.location).to_track_quat('-Z', 'Y').to_euler()
    return o

# ── scene ───────────────────────────────────────────────────────────
def build():
    bpy.ops.wm.read_factory_settings(use_empty=True)
    sc = bpy.context.scene

    # FLOOR — darker wood base slab with soft edges, rounded planks on top (tops at y = 0)
    box('skirt', 10.7, 0.65, 10.55, (-0.1, -0.44, -0.025), 'skirt', bevel=0.26)
    x0, x1, z0, z1, rows = -4.85, 5.1, -4.7, 5.1, 10
    rd = (z1 - z0) / rows
    for r in range(rows):
        split = -1.6 + (r * 3.7) % 6.0          # staggered butt joints
        zc = z0 + (r + 0.5) * rd
        for k, (xa, xb) in enumerate(((x0, split), (split, x1))):
            box(f'plank_{r}_{k}', xb - xa - 0.04, 0.14, rd - 0.04, ((xa + xb) / 2, -0.07, zc),
                ('floor', 'floor2', 'floor3')[(r + k) % 3], bevel=0.05, segs=4)

    # WALLS — two thick felt walls with soft rounded edges, meeting in the corner like cushions
    box('wall_l', 0.45, 6.2, 10.15, (-5.075, 2.9, -0.075), 'wall', bevel=0.2, segs=8)
    pts = [(-4.86, -0.2), (5, -0.2), (5, 3.7), (1.0, 6), (-4.86, 6)]   # starts at the left wall's inner face
    me = bpy.data.meshes.new('wall_b')
    bm = bmesh.new()
    front = [bm.verts.new(v3(x, y, -4.7)) for x, y in pts]
    back = [bm.verts.new(v3(x, y, -5.15)) for x, y in pts]
    bm.faces.new(front)
    bm.faces.new(list(reversed(back)))
    for i in range(len(pts)):
        j = (i + 1) % len(pts)
        bm.faces.new([front[i], back[i], back[j], front[j]])
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
    bm.to_mesh(me)
    bm.free()
    me.materials.append(mat('wall2'))
    wb = bpy.data.objects.new('wall_b', me)
    sc.collection.objects.link(wb)
    bv = wb.modifiers.new('bevel', 'BEVEL')
    bv.width = 0.2; bv.segments = 8; bv.limit_method = 'ANGLE'
    for p in me.polygons:
        p.use_smooth = True

    # PICTURE FRAMES (hotspot: galerie) — terracotta frames, glass textured at runtime
    hs_gal = empty('hs_galerie')
    for r in range(3):
        for c in range(4):
            i = r * 4 + c
            fg = empty(f'frame_{i}', (-2.95 + c * 1.97, 3.7 - r * 1.38, -4.62), parent=hs_gal)
            box(f'frame_border_{i}', 0.88, 1.12, 0.1, (0, 0, 0), 'frame', parent=fg, bevel=0.045)
            plane(f'frame_glass_{i}', 0.7, 0.94, (0, 0, 0.052), 'glass', parent=fg)

    # AC UNIT
    ac = empty('ac', (0, 4.7, -2.6))
    box('ac_body', 0.4, 0.9, 2.4, (-4.66, 0, 0), 'ac', parent=ac, bevel=0.15)
    box('ac_grille', 0.08, 0.3, 2.0, (-4.47, -0.2, 0), 'ac_grille', parent=ac, bevel=0.035)

    # RUG — navy pile
    box('rug', 4.6, 0.12, 4.6, (0.4, 0.05, 0.6), 'rug', bevel=0.06)

    # DESK (hotspot: info) — light-oak top, black legs
    d = empty('hs_info', (-3.15, 0, -1.4))
    box('desk_top', 2.0, 0.12, 3.4, (0, 1.48, 0), 'desk_wood', parent=d, bevel=0.05)
    for k, (px, pz) in enumerate([(-0.82, -1.52), (0.82, -1.52), (-0.82, 1.52), (0.82, 1.52)]):
        cyl(f'desk_leg_{k}', 0.055, 0.055, 1.44, (px, 0.72, pz), 'metal', parent=d, verts=16)
    box('mon_stand', 0.18, 0.5, 0.18, (-0.6, 1.82, -0.3), 'metal', parent=d)
    box('mon_base', 0.45, 0.06, 0.7, (-0.6, 1.57, -0.3), 'metal', parent=d)
    box('mon_back', 0.1, 1.24, 1.72, (-0.56, 2.52, -0.3), 'mon_back', parent=d, bevel=0.045)
    plane('screen', 1.6, 1.12, (-0.507, 2.52, -0.3), 'screen', parent=d, facing='x')
    box('tablet', 0.62, 0.06, 0.92, (0.12, 1.57, 0.25), 'tablet', parent=d)
    box('tab_active', 0.42, 0.065, 0.72, (0.12, 1.575, 0.25), 'tab_active', parent=d, bevel=0.015)
    cyl('stylus', 0.025, 0.025, 0.5, (0.42, 1.63, 0.5), 'stylus', parent=d, verts=12,
        rot=(math.pi / 2, 0, 0.2))
    box('mouse', 0.16, 0.08, 0.24, (0.62, 1.58, -0.05), 'mouse', parent=d, bevel=0.035)
    cyl('cup', 0.13, 0.11, 0.32, (-0.68, 1.7, 1.05), 'cup', parent=d)
    for k, cl in enumerate(('#5B8CFF', '#FF6F8B', '#3FD49A')):
        cyl(f'pen_{k}', 0.025, 0.025, 0.42, (-0.68, 1.9, 1.05 + (k - 1) * 0.05), cl, parent=d, verts=10,
            rot=((k - 1) * 0.12, 0, 0))
    box('notebook', 0.62, 0.07, 0.9, (-0.12, 1.575, 1.0), 'notebook', parent=d, rot_y=0.1)
    box('nb_band', 0.64, 0.075, 0.1, (-0.12, 1.577, 1.0), 'nb_band', parent=d, rot_y=0.1)
    for k, cl in enumerate(('#6A7BDC', '#C45B6A', '#3FAE8E', '#D8A24A')):
        bk = box(f'book_{k}', 0.46, 0.6, 0.11, (-0.46, 1.84, -1.45 + k * 0.13), cl, parent=d)
        bk.rotation_euler = ((k - 1.5) * 0.05, 0, 0)
    cyl('succ_pot', 0.14, 0.11, 0.22, (0.06, 1.65, -1.28), 'pot_sm', parent=d)
    sphere('succ', 0.17, (0.06, 1.83, -1.28), 'succ', parent=d, scale=(1, 0.8, 1))
    box('phone', 0.3, 0.04, 0.56, (0.42, 1.56, -1.4), 'phone', parent=d, rot_y=-0.15)

    # OFFICE CHAIR — navy, black base
    ch = empty('chair', (-1.55, 0, -1.05), rot_y=-0.22)
    box('chair_seat', 0.95, 0.18, 0.95, (0, 0.95, 0), 'chair_seat', parent=ch, bevel=0.085)
    box('chair_back', 0.16, 1.05, 0.92, (0.44, 1.52, 0), 'chair_mesh', parent=ch, bevel=0.075)
    box('chair_head', 0.14, 0.3, 0.72, (0.44, 2.1, 0), 'chair_mesh', parent=ch, bevel=0.065)
    box('chair_arm_l', 0.62, 0.08, 0.14, (0, 1.18, -0.48), 'chair_arm', parent=ch)
    box('chair_arm_r', 0.62, 0.08, 0.14, (0, 1.18, 0.48), 'chair_arm', parent=ch)
    cyl('chair_post', 0.07, 0.07, 0.72, (0, 0.5, 0), 'metal', parent=ch, verts=16)
    for k in range(5):
        a = k / 5 * math.pi * 2
        box(f'chair_foot_{k}', 0.48, 0.07, 0.09, (math.cos(a) * 0.3, 0.1, math.sin(a) * 0.3), 'metal',
            parent=ch, rot_y=-a)
        sphere(f'chair_wheel_{k}', 0.065, (math.cos(a) * 0.48, 0.065, math.sin(a) * 0.48), 'wheel', parent=ch)

    # PLANT (hotspot: kontakt) — bushy, round leaves
    pl = empty('hs_kontakt', (-4.25, 0, 1.45))
    cyl('plant_pot', 0.42, 0.3, 0.7, (0, 0.35, 0), 'pot', parent=pl, verts=40, bevel=0.06)
    cyl('plant_soil', 0.36, 0.36, 0.03, (0, 0.715, 0), 'soil', parent=pl, verts=40, bevel=0)
    cyl('plant_trunk', 0.05, 0.07, 2.1, (0, 1.7, 0), 'trunk', parent=pl, verts=10, bevel=0.02)
    for k in range(16):
        a = k * 2.399
        sphere(f'leaf_{k}', 0.4, (math.cos(a) * (0.34 + (k % 3) * 0.1), 1.15 + k * 0.095,
                                  math.sin(a) * (0.34 + (k % 3) * 0.1)),
               'leaf' if k % 2 else 'leaf2', parent=pl, scale=(1.0, 0.42, 0.78), rot=(0, -0.42, -a))

    # CABINET (hotspot: skills) — lilac-white lacquer, slim legs
    cb = empty('hs_skills', (-4.3, 0, 3.0), rot_y=math.pi / 2)
    box('cab_body', 1.4, 1.72, 0.92, (0, 0.98, 0), 'cab', parent=cb, bevel=0.12)
    box('cab_seam', 0.03, 1.4, 0.03, (0, 0.98, 0.465), 'cab2', parent=cb, bevel=0.01)
    for k, px in enumerate((-0.22, 0.22)):
        box(f'cab_handle_{k}', 0.05, 0.24, 0.05, (px, 0.98, 0.48), 'cab_handle', parent=cb)
    box('cab_top', 1.48, 0.07, 0.98, (0, 1.87, 0), 'cab_top', parent=cb, bevel=0.03)
    for k, (px, pz) in enumerate([(-0.55, -0.35), (0.55, -0.35), (-0.55, 0.35), (0.55, 0.35)]):
        cyl(f'cab_leg_{k}', 0.04, 0.035, 0.2, (px, 0.1, pz), 'metal', parent=cb, verts=12)

    # ARMCHAIR — slate-blue fabric, walnut legs
    ar = empty('armchair', (3.05, 0, 0.35), rot_y=-0.82)
    box('arm_seat', 1.42, 0.38, 1.3, (0, 0.56, 0.01), 'arm', parent=ar, bevel=0.16)
    box('arm_back', 1.2, 1.0, 0.32, (0, 1.1, -0.52), 'arm', parent=ar, bevel=0.15)
    box('arm_arm_l', 0.28, 0.54, 1.4, (-0.62, 0.79, 0), 'arm', parent=ar, bevel=0.135)
    box('arm_arm_r', 0.28, 0.54, 1.4, (0.62, 0.79, 0), 'arm', parent=ar, bevel=0.135)
    box('arm_cushion', 0.94, 0.18, 0.98, (0, 0.8, 0.08), 'arm_cush', parent=ar, bevel=0.085)
    for k, (px, pz) in enumerate([(-0.55, -0.5), (0.55, -0.5), (-0.55, 0.5), (0.55, 0.5)]):
        cyl(f'arm_leg_{k}', 0.04, 0.055, 0.38, (px, 0.19, pz), 'walnut', parent=ar, verts=16)

    # COFFEE TABLE (hotspot: hobbys) — frosted glass top, device, rainbow swatch fan
    ct = empty('hs_hobbys', (0.3, 0, 2.9))
    box('ct_top', 1.8, 0.08, 0.95, (0, 0.62, 0), 'ct_glass', parent=ct, bevel=0.035)
    for k, (px, pz) in enumerate([(-0.74, -0.34), (0.74, -0.34), (-0.74, 0.34), (0.74, 0.34)]):
        cyl(f'ct_leg_{k}', 0.035, 0.035, 0.6, (px, 0.3, pz), 'metal', parent=ct, verts=12)
    box('device', 0.56, 0.1, 0.42, (-0.42, 0.71, -0.02), 'device', parent=ct, rot_y=0.08)
    box('device_scr', 0.4, 0.105, 0.28, (-0.42, 0.7125, -0.02), 'device_scr', parent=ct, rot_y=0.08,
        bevel=0.02)
    cyl('dial', 0.085, 0.085, 0.05, (-0.42, 0.78, -0.02), 'dial', parent=ct, verts=24)
    for k, cl in enumerate(('#FF5B5B', '#FF9D3C', '#FFD23C', '#7ED957', '#4EC3FF', '#7D6BFF', '#D96BFF')):
        box(f'swatch_{k}', 0.12, 0.014, 0.5, (0.42, 0.672 + k * 0.014, 0.05), cl, parent=ct,
            rot_y=-0.6 + k * 0.17, bevel=0.005, segs=2)

    # ── lighting: soft warm key, cool front fill, warm desk glow (as the original) ──
    world = bpy.data.worlds.new('world')
    sc.world = world
    world.use_nodes = True
    bg = world.node_tree.nodes['Background']
    bg.inputs['Color'].default_value = srgb('#E6E4EE')
    bg.inputs['Strength'].default_value = 0.5
    area('key', (7, 14, 6), (0, 1.5, 0), 2200, 8, (1.0, 0.96, 0.91))
    area('fill', (-1, 7, 11), (0, 1, 0), 450, 9, (0.85, 0.89, 1.0))
    warm = bpy.data.lights.new('warm', 'POINT')
    warm.energy = 70; warm.color = (1.0, 0.79, 0.63); warm.shadow_soft_size = 0.4
    wo = bpy.data.objects.new('warm', warm)
    sc.collection.objects.link(wo)
    wo.location = v3(-3, 2.6, -2)

    # ── render settings ───────────────────────────────────────────
    sc.render.engine = 'CYCLES'
    prefs = bpy.context.preferences.addons['cycles'].preferences
    prefs.compute_device_type = 'OPTIX'
    prefs.get_devices()
    for dv in prefs.devices:
        dv.use = dv.type == 'OPTIX'
    sc.cycles.device = 'GPU'
    sc.view_settings.view_transform = 'AgX'
    sc.view_settings.look = 'AgX - Base Contrast'
    return sc


def preview(sc, out):
    cam = bpy.data.cameras.new('cam'); cam.type = 'ORTHO'; cam.ortho_scale = 19.5
    co = bpy.data.objects.new('cam', cam); sc.collection.objects.link(co)
    d = Vector((1, 0.92, 1)).normalized() * 40
    co.location = v3(d.x, d.y + 1.5, d.z)
    co.rotation_euler = (v3(0, 1.5, 0) - co.location).to_track_quat('-Z', 'Y').to_euler()
    cam.shift_y = 0.06
    sc.camera = co
    sc.render.resolution_x, sc.render.resolution_y = 1600, 1000
    sc.render.film_transparent = True
    sc.cycles.samples = SAMPLES or 96
    sc.cycles.use_denoising = True
    sc.render.filepath = out
    bpy.ops.render.render(write_still=True)


RUNTIME = ('screen', 'frame_glass_')   # textured by the page, not baked
TEX_SIZE = 4096                        # bake resolution
EXPORT_SIZE = int(ARGS[3]) if len(ARGS) > 3 else 2048


def bake(sc, out):
    import os
    dg = bpy.context.evaluated_depsgraph_get()
    meshes = [o for o in sc.objects if o.type == 'MESH']
    baked = [o for o in meshes if not o.name.startswith(RUNTIME)]

    # 1. freeze modifiers into the mesh and drop faces the camera never sees
    for o in meshes:
        me = bpy.data.meshes.new_from_object(o.evaluated_get(dg))
        o.modifiers.clear()
        old = o.data
        o.data = me
        me.name = o.name
        bpy.data.meshes.remove(old)
    dg.update()
    for o in baked:
        bm = bmesh.new(); bm.from_mesh(o.data)
        rot = o.matrix_world.to_3x3()
        # leaves are tilted: their undersides can turn towards the camera while the room sways
        keep_all = o.name.startswith(('leaf_', 'succ'))
        dead = [] if keep_all else [f for f in bm.faces if (rot @ f.normal).normalized().z < -0.6]
        bmesh.ops.delete(bm, geom=dead, context='FACES')
        bm.to_mesh(o.data); bm.free()
        for uv in list(o.data.uv_layers):
            o.data.uv_layers.remove(uv)
        o.data.uv_layers.new(name='bake')

    # 2. one shared UV atlas, uniform texel density
    bpy.ops.object.select_all(action='DESELECT')
    for o in baked:
        o.select_set(True)
    bpy.context.view_layer.objects.active = baked[0]
    bpy.ops.object.mode_set(mode='EDIT')
    bpy.ops.mesh.select_all(action='SELECT')
    bpy.ops.uv.smart_project(angle_limit=math.radians(60), island_margin=0.0, scale_to_bounds=False)
    bpy.ops.uv.average_islands_scale()
    bpy.ops.uv.pack_islands(rotate=True, margin=0.004)
    bpy.ops.object.mode_set(mode='OBJECT')

    # 3. bake lighting (diffuse + GI + emission, no view-dependent gloss)
    img = bpy.data.images.new('diorama_bake', TEX_SIZE, TEX_SIZE, alpha=False, float_buffer=True)
    for m in {s.material for o in baked for s in o.material_slots if s.material}:
        n = m.node_tree.nodes.new('ShaderNodeTexImage')
        n.image = img
        m.node_tree.nodes.active = n
    sc.cycles.samples = SAMPLES or 768
    sc.cycles.use_denoising = False
    b = sc.render.bake
    b.use_pass_direct = b.use_pass_indirect = True
    b.use_pass_diffuse = b.use_pass_emit = b.use_pass_transmission = True
    b.use_pass_glossy = False
    b.margin = 32
    b.margin_type = 'EXTEND'
    bpy.ops.object.bake(type='COMBINED')

    # 4. save through the scene view transform (AgX), so the page shows it 1:1
    tex_dir = os.path.dirname(out)
    tex_path = os.path.join(tex_dir, 'diorama_bake.png')
    st = sc.render.image_settings
    st.file_format = 'PNG'; st.color_mode = 'RGB'; st.color_depth = '8'
    img.save_render(tex_path, scene=sc)
    tex = bpy.data.images.load(tex_path)
    if EXPORT_SIZE != TEX_SIZE:
        tex.scale(EXPORT_SIZE, EXPORT_SIZE)

    # 5. every baked mesh shares one material that shows the atlas
    bm_mat = bpy.data.materials.new('baked'); bm_mat.use_nodes = True
    nt = bm_mat.node_tree
    tn = nt.nodes.new('ShaderNodeTexImage'); tn.image = tex
    nt.links.new(tn.outputs['Color'], nt.nodes['Principled BSDF'].inputs['Base Color'])
    for o in baked:
        o.data.materials.clear()
        o.data.materials.append(bm_mat)

    # 6. export
    for o in list(sc.objects):
        if o.type in ('LIGHT', 'CAMERA'):
            bpy.data.objects.remove(o)
    bpy.ops.export_scene.gltf(
        filepath=out, export_format='GLB', export_apply=True,
        export_normals=False, export_tangents=False,
        export_draco_mesh_compression_enable=True, export_draco_mesh_compression_level=6,
        export_image_format='WEBP', export_image_quality=88,
    )
    print('EXPORTED', out, os.path.getsize(out), 'bytes')


if __name__ == '__main__':
    scene = build()
    if MODE == 'preview':
        preview(scene, OUT)
    elif MODE == 'bake':
        bake(scene, OUT)
