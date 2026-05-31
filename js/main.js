/* ============================================================
   VIDEO PLAYBACK RATE
   ============================================================ */
document.querySelector('.desktop-video').playbackRate = 0.75;

/* ============================================================
   PROJECT DATA
   ============================================================ */
const projects = [

  /* ── COL 1 (x=62) ─────────────────────────────────────────── */
  {
    id: 1, name: 'Silly Crab',
    cat_de: 'Web Dev · React', cat_en: 'Web Dev · React',
    img: 'img/projects/silly-crab.png',
    url: 'https://silly-crab-sc75.vercel.app/',
    desc_de: 'Animierte React-App mit spielerischer UI und interaktiven Charakteren.',
    desc_en: 'Animated React app with playful UI and interactive characters.',
    x: 62, y: 13
  },
  {
    id: 2, name: 'Squishy Savings',
    cat_de: 'UX/UI · Web-App', cat_en: 'UX/UI · Web App',
    img: 'img/projects/mosaic-savings.jpg',
    url: 'squishy-savings.html',
    desc_de: 'Spar-App mit unterhaltsamem und visuellem UX-Design.',
    desc_en: 'Savings app with fun and visual UX design.',
    x: 62, y: 31
  },
  {
    id: 9, name: 'SchwimmSpass',
    cat_de: 'UX/UI · Mobil', cat_en: 'UX/UI · Mobile',
    img: 'img/projects/schwimmspass-thumbnail.webp',
    url: 'schwimmspass.html',
    desc_de: 'Mobile-App-Design für eine Schwimmschule.',
    desc_en: 'Mobile app design for a swimming school.',
    x: 62, y: 49
  },
  {
    id: 19, name: 'Only Franz',
    cat_de: 'UX/UI · Rezept-App', cat_en: 'UX/UI · Recipe App',
    img: 'img/projects/onlyfranz.png',
    url: 'https://onlyfranz.lovable.app',
    desc_de: 'Rezept-App mit warmem, redaktionellem Stil.',
    desc_en: 'Recipe app with a warm, editorial style.',
    x: 62, y: 67
  },

  /* ── COL 2 (x=74) ─────────────────────────────────────────── */
  {
    id: 3, name: 'SentinelOne',
    cat_de: 'UX/UI · Dashboard', cat_en: 'UX/UI · Dashboard',
    img: 'img/projects/mosaic-sentinel.png',
    url: 'https://sentinel-2025.vercel.app/',
    desc_de: 'Redesign eines Cybersecurity-Dashboards mit moderner Dark UI.',
    desc_en: 'Cybersecurity dashboard redesign with modern dark UI.',
    x: 74, y: 13
  },
  {
    id: 18, name: 'EcoThread',
    cat_de: 'UX/UI · E-Commerce', cat_en: 'UX/UI · E-Commerce',
    img: 'img/projects/ecothread.png',
    url: 'https://ecothread.lovable.app',
    desc_de: 'E-Commerce UX-Design für nachhaltige Mode.',
    desc_en: 'E-commerce UX design for sustainable fashion.',
    x: 74, y: 31
  },
  {
    id: 17, name: 'Obsidian',
    cat_de: 'UX/UI · Landingpage', cat_en: 'UX/UI · Landing Page',
    img: 'img/projects/obsidian-thumbnail.webp',
    url: 'https://obsidian-rise-shine.lovable.app',
    desc_de: 'Crypto-Landingpage mit dunkler, Premium-UI.',
    desc_en: 'Crypto landing page with dark, premium UI.',
    x: 74, y: 49
  },
  {
    id: 6, name: 'Vegetables Calendar',
    cat_de: 'Grafikdesign · Druck', cat_en: 'Graphic Design · Print',
    img: 'img/projects/vegetables-calendar.png',
    url: 'https://www.behance.net/gallery/162725755/VEGETABLES-SEASONAL-CALENDAR-2024',
    desc_de: 'Saisonaler Gemüsekalender 2024, Printdesign.',
    desc_en: 'Seasonal vegetables calendar 2024, print design.',
    x: 74, y: 67
  },

  /* ── COL 3 (x=86) ─────────────────────────────────────────── */
  {
    id: 4, name: 'Photography',
    cat_de: 'Fotografie · Unsplash', cat_en: 'Photography · Unsplash',
    img: 'img/projects/photography.png',
    url: 'https://unsplash.com/de/@helvicium',
    desc_de: 'Kreative Porträt- und Street-Fotografie auf Unsplash.',
    desc_en: 'Creative portrait and street photography on Unsplash.',
    x: 86, y: 13
  },
  {
    id: 5, name: 'Branding',
    cat_de: 'Grafikdesign · Logo', cat_en: 'Graphic Design · Logo',
    img: 'img/projects/branding-thumbnail.webp',
    url: 'branding.html',
    desc_de: 'Markenidentitäten für AeroLeaf, NordWand und SüßMund.',
    desc_en: 'Brand identities for AeroLeaf, NordWand and SüßMund.',
    x: 86, y: 31
  },
  {
    id: 7, name: 'Posters',
    cat_de: 'Grafikdesign · Poster', cat_en: 'Graphic Design · Poster',
    img: 'img/projects/posters.jpg',
    url: 'https://www.behance.net/hectoruribe2',
    desc_de: 'Grafikdesign-Posterserie mit kühner Ästhetik.',
    desc_en: 'Graphic design poster series with bold aesthetics.',
    x: 86, y: 49,
    mosaic: [
      'img/projects/mosaic-smile.webp',
      'img/projects/mosaic-sweet.webp',
      'img/projects/mosaic-metaball.webp',
    ]
  },
  {
    id: 8, name: '3D Models',
    cat_de: '3D · Sketchfab', cat_en: '3D · Sketchfab',
    img: 'img/projects/3D_model.png',
    url: 'https://sketchfab.com/hectorz151',
    desc_de: '3D-Modelle und Skulpturen auf Sketchfab veröffentlicht.',
    desc_en: '3D models and sculptures published on Sketchfab.',
    x: 86, y: 67,
    mosaic: [
      'img/projects/mosaic-robot.webp',
      'img/projects/mosaic-candy-gun.webp',
      'img/projects/mosaic-frog.webp',
      'img/projects/mosaic-aztec.webp',
    ]
  },
];


/* ============================================================
   INIT
   ============================================================ */
const iconsField       = document.getElementById('iconsField');
const windowsContainer = document.getElementById('windowsContainer');
const overlay          = document.getElementById('overlay');
const mobileBackdrop   = document.getElementById('mobileBackdrop');

let activeWin = null;
const isMobile = () => window.innerWidth <= 768;

/* ============================================================
   GET INFO PANEL
   ============================================================ */
const infoPanel = document.getElementById('infoPanel');
const infoPanelBar = document.getElementById('infoPanelBar');

// Collapsible sections
document.querySelectorAll('.info-sec-title').forEach(btn => {
  btn.addEventListener('click', () => {
    const body = document.getElementById(btn.dataset.target);
    const tri  = btn.querySelector('.sec-tri');
    const isOpen = !body.classList.contains('hidden');
    if (isOpen) {
      body.classList.add('hidden');
      tri.style.transform = 'rotate(-90deg)';
      btn.classList.remove('open');
    } else {
      body.classList.remove('hidden');
      tri.style.transform = 'rotate(0deg)';
      btn.classList.add('open');
    }
  });
});

// Close button hides the panel
document.getElementById('infoPanelClose').addEventListener('click', () => {
  if (isMobile()) {
    closeMobileSheet(infoPanel);
  } else {
    infoPanel.style.transition = 'opacity 0.18s, transform 0.18s';
    infoPanel.style.opacity = '0';
    infoPanel.style.transform = 'scale(0.92)';
    setTimeout(() => { infoPanel.style.display = 'none'; }, 200);
  }
});

// Mobile profile dock button
document.getElementById('dockProfileBtn').addEventListener('click', () => {
  if (infoPanel.classList.contains('mobile-open')) {
    closeMobileSheet(infoPanel);
  } else {
    openMobileSheet(infoPanel);
  }
});

// Mobile sheet helpers
function openMobileSheet(el) {
  // Close any other open sheet first
  document.querySelectorAll('.info-panel.mobile-open').forEach(s => {
    if (s !== el) closeMobileSheet(s);
  });
  if (!skillsWin.classList.contains('hidden') && el !== skillsWin) {
    skillsWin.classList.add('hidden');
  }
  el.classList.add('mobile-open');
  mobileBackdrop.classList.add('active');
}

function closeMobileSheet(el) {
  el.classList.remove('mobile-open');
  // also covers skills win
  skillsWin.classList.add('hidden');
  mobileBackdrop.classList.remove('active');
}

// Backdrop closes sheets on mobile
mobileBackdrop.addEventListener('click', () => {
  infoPanel.classList.remove('mobile-open');
  skillsWin.classList.add('hidden');
  mobileBackdrop.classList.remove('active');
});

// Drag the panel (desktop only)
makeDraggableEl(infoPanel, infoPanelBar);

function makeDraggableEl(el, handle) {
  let startX, startY, startLeft, startTop, dragging = false;

  handle.addEventListener('mousedown', (e) => {
    if (e.target.classList.contains('wc')) return;
    dragging = true;
    startX    = e.clientX;
    startY    = e.clientY;
    const rect = el.getBoundingClientRect();
    startLeft = rect.left;
    startTop  = rect.top;
    el.style.transition = 'none';
    el.style.right = 'auto';
    e.preventDefault();
  });

  document.addEventListener('mousemove', (e) => {
    if (!dragging) return;
    let newLeft = startLeft + (e.clientX - startX);
    let newTop  = startTop  + (e.clientY - startY);
    newLeft = Math.max(0, Math.min(window.innerWidth  - el.offsetWidth,  newLeft));
    newTop  = Math.max(0, Math.min(window.innerHeight - el.offsetHeight, newTop));
    el.style.left = newLeft + 'px';
    el.style.top  = newTop  + 'px';
  });

  document.addEventListener('mouseup', () => { dragging = false; });
}



/* ============================================================
   BUILD & OPEN WINDOWS
   ============================================================ */
function openWindow(p, iconEl) {
  // Close any existing window
  if (activeWin) closeWindow(activeWin, false);

  // Create window element
  const win = document.createElement('div');
  win.className = 'project-win';
  win.id = 'win-' + p.id;
  win.dataset.projectId = p.id;  // used by applyLanguage to refresh text
  win.innerHTML = `
    <div class="win-bar" id="winBar-${p.id}">
      <div class="win-controls">
        <span class="wc red"  data-close="true"></span>
        <span class="wc yellow"></span>
        <span class="wc green"></span>
      </div>
      <span class="win-title">${p.name}</span>
    </div>
    <div class="win-img">
      <img src="${p.img}" alt="${p.name}" loading="lazy">
    </div>
    <div class="win-info">
      <span class="win-cat">${p['cat_' + currentLang]}</span>
      <h3 class="win-name">${p.name}</h3>
      <p class="win-desc">${p['desc_' + currentLang]}</p>
      <a href="${p.url}" class="win-btn" target="_blank" rel="noopener">
        ${translations[currentLang]['win-open']}
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M7 17L17 7M17 7H7M17 7v10"/></svg>
      </a>
    </div>
  `;

  windowsContainer.appendChild(win);

  // Position: centered on mobile, near icon on desktop
  let left, top;
  if (isMobile()) {
    left = 12;
    top  = window.innerHeight - 470;
    if (top < 60) top = 60;
  } else {
    const iconRect = iconEl.getBoundingClientRect();
    left = iconRect.right + 12;
    top  = iconRect.top - 20;
    const winW = 390, winH = 370;
    if (left + winW > window.innerWidth  - 16) left = iconRect.left - winW - 12;
    if (left < 16)                              left = 16;
    if (top + winH > window.innerHeight - 80)   top  = window.innerHeight - winH - 80;
    if (top < 16)                               top  = 16;
  }

  win.style.left = left + 'px';
  win.style.top  = top  + 'px';

  // Activate
  requestAnimationFrame(() => {
    win.classList.add('active');
  });

  overlay.classList.add('active');
  activeWin = win;

  // Close button
  win.querySelector('.wc.red').addEventListener('click', (e) => {
    e.stopPropagation();
    closeWindow(win);
  });

  // Prevent link from closing overlay
  win.querySelector('.win-btn').addEventListener('click', (e) => {
    e.stopPropagation();
  });

  // Drag (desktop only)
  if (!isMobile()) makeDraggable(win, win.querySelector('.win-bar'));

  // Swipe down to close on mobile
  if (isMobile()) {
    const bar = win.querySelector('.win-bar');
    let startY = 0, currentY = 0, dragging = false;
    bar.addEventListener('touchstart', (e) => {
      startY = e.touches[0].clientY;
      dragging = true;
      win.style.transition = 'none';
    }, { passive: true });
    document.addEventListener('touchmove', (e) => {
      if (!dragging) return;
      currentY = e.touches[0].clientY - startY;
      if (currentY > 0) win.style.transform = `translateY(${currentY}px)`;
    }, { passive: true });
    document.addEventListener('touchend', () => {
      if (!dragging) return;
      dragging = false;
      if (currentY > 80) {
        closeWindow(win);
      } else {
        win.style.transition = 'transform 0.3s cubic-bezier(0.16,1,0.3,1)';
        win.style.transform = 'translateY(0)';
      }
      currentY = 0;
    });
  }

  // Stop overlay click from propagating through window
  win.addEventListener('click', (e) => e.stopPropagation());
}

function closeWindow(win, clearActive = true) {
  if (isMobile()) {
    win.style.transition = 'transform 0.32s cubic-bezier(0.4,0,1,1)';
    win.style.transform = 'translateY(100%)';
    setTimeout(() => win.remove(), 340);
  } else {
    win.style.animation = 'none';
    win.style.opacity   = '0';
    win.style.transform = 'scale(0.9) translateY(6px)';
    win.style.transition = 'opacity 0.18s, transform 0.18s';
    setTimeout(() => win.remove(), 200);
  }
  overlay.classList.remove('active');
  if (clearActive) activeWin = null;
}

// Close on overlay click
overlay.addEventListener('click', () => {
  if (activeWin) closeWindow(activeWin);
});

/* ============================================================
   DRAG
   ============================================================ */
function makeDraggable(win, handle) {
  let startX, startY, startLeft, startTop;
  let dragging = false;

  handle.addEventListener('mousedown', (e) => {
    if (e.target.dataset.close) return;
    dragging = true;
    startX    = e.clientX;
    startY    = e.clientY;
    startLeft = parseInt(win.style.left) || 0;
    startTop  = parseInt(win.style.top)  || 0;
    win.style.transition = 'none';
    win.style.zIndex     = '250';
    handle.style.cursor  = 'grabbing';
    e.preventDefault();
  });

  document.addEventListener('mousemove', (e) => {
    if (!dragging) return;
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    let newLeft = startLeft + dx;
    let newTop  = startTop  + dy;
    // Keep within viewport
    newLeft = Math.max(0, Math.min(window.innerWidth  - 330, newLeft));
    newTop  = Math.max(0, Math.min(window.innerHeight - 60,  newTop));
    win.style.left = newLeft + 'px';
    win.style.top  = newTop  + 'px';
  });

  document.addEventListener('mouseup', () => {
    if (!dragging) return;
    dragging = false;
    handle.style.cursor = 'grab';
  });

  // Touch support
  handle.addEventListener('touchstart', (e) => {
    if (e.target.dataset.close) return;
    const t = e.touches[0];
    dragging  = true;
    startX    = t.clientX;
    startY    = t.clientY;
    startLeft = parseInt(win.style.left) || 0;
    startTop  = parseInt(win.style.top)  || 0;
    win.style.transition = 'none';
  }, { passive: true });

  document.addEventListener('touchmove', (e) => {
    if (!dragging) return;
    const t = e.touches[0];
    win.style.left = Math.max(0, startLeft + t.clientX - startX) + 'px';
    win.style.top  = Math.max(0, startTop  + t.clientY - startY) + 'px';
  }, { passive: true });

  document.addEventListener('touchend', () => { dragging = false; });
}

/* ============================================================
   SKILLS WINDOW
   ============================================================ */
const skillsWin    = document.getElementById('skillsWin');
const skillsBar    = document.getElementById('skillsBar');
const skillsClose  = document.getElementById('skillsClose');
const dockSkillsBtn = document.getElementById('dockSkillsBtn');
const skillsSearch = document.getElementById('skillsSearch');
const skillsCount  = document.getElementById('skillsCount');

// Drag
makeDraggableEl(skillsWin, skillsBar);

// Dock button → shakes if visible, opens if hidden
dockSkillsBtn.addEventListener('click', () => {
  if (!skillsWin.classList.contains('hidden')) {
    // Shake the window (on mobile it's always visible; on desktop it may be open)
    skillsWin.classList.remove('shake');
    void skillsWin.offsetWidth;
    skillsWin.classList.add('shake');
    skillsWin.addEventListener('animationend', () => skillsWin.classList.remove('shake'), { once: true });
  } else {
    skillsWin.classList.remove('hidden');
  }
});

// Botón rojo → cierra con animación
skillsClose.addEventListener('click', (e) => {
  e.stopPropagation();
  skillsWin.classList.add('hidden');
});

// Prevent project overlay from propagating through window
skillsWin.addEventListener('click', e => e.stopPropagation());

// Category filter
document.querySelectorAll('.skills-cat').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.skills-cat').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    filterSkills();
  });
});

// Search filter
skillsSearch.addEventListener('input', filterSkills);

function filterSkills() {
  const cat   = document.querySelector('.skills-cat.active').dataset.cat;
  const query = skillsSearch.value.toLowerCase().trim();
  const items = document.querySelectorAll('.skill-item');
  let visible = 0;

  items.forEach(item => {
    const matchCat  = cat === 'all' || item.dataset.cat === cat;
    const matchName = !query || item.dataset.name.includes(query);
    if (matchCat && matchName) {
      item.classList.remove('hidden');
      visible++;
    } else {
      item.classList.add('hidden');
    }
  });

  const single = currentLang === 'de' ? 'Programm' : 'Program';
  const plural  = currentLang === 'de' ? 'Programme' : 'Programs';
  skillsCount.textContent = visible === 1 ? `1 ${single}` : `${visible} ${plural}`;
}

/* ============================================================
   PROJEKTE WINDOW
   ============================================================ */
const projekteWin     = document.getElementById('projekteWin');
const projekteBar     = document.getElementById('projekteBar');
const projekteClose   = document.getElementById('projekteClose');
const dockProjekteBtn = document.getElementById('dockProjekteBtn');

// Drag (desktop only)
makeDraggableEl(projekteWin, projekteBar);

// Close button
projekteClose.addEventListener('click', (e) => {
  e.stopPropagation();
  projekteWin.classList.add('hidden');
});

// Dock button — shake if visible, show if hidden
dockProjekteBtn.addEventListener('click', () => {
  if (isMobile()) return;
  if (!projekteWin.classList.contains('hidden')) {
    projekteWin.classList.remove('shake');
    void projekteWin.offsetWidth;
    projekteWin.classList.add('shake');
    projekteWin.addEventListener('animationend', () => projekteWin.classList.remove('shake'), { once: true });
  } else {
    projekteWin.classList.remove('hidden');
  }
});

// Prevent project overlay from propagating through
projekteWin.addEventListener('click', e => e.stopPropagation());

// Build cards from the existing projects array (Finder icon grid)
function buildProjekteCards(lang) {
  const body  = document.getElementById('projekteBody');
  const count = document.getElementById('projekteCount');

  body.innerHTML = projects.map(p => `
    <div class="proj-card-item" data-proj-id="${p.id}">
      <div class="proj-card-thumb">
        <img src="${p.img}" alt="${p.name}" loading="lazy">
      </div>
      <span class="proj-card-name">${p.name}</span>
      <span class="proj-card-cat">${p['cat_' + lang]}</span>
    </div>
  `).join('');

  body.querySelectorAll('.proj-card-item').forEach(card => {
    const p = projects.find(x => x.id === +card.dataset.projId);
    if (p) card.addEventListener('click', () => openWindow(p, card));
  });

  if (count) {
    const n = projects.length;
    count.textContent = lang === 'de' ? `${n} Projekte` : `${n} Projects`;
  }
}

function updateProjekteLanguage(lang) {
  document.querySelectorAll('.proj-card-item').forEach(card => {
    const p = projects.find(x => x.id === +card.dataset.projId);
    if (p) card.querySelector('.proj-card-cat').textContent = p['cat_' + lang];
  });
  const count = document.getElementById('projekteCount');
  if (count) count.textContent = lang === 'de' ? `${projects.length} Projekte` : `${projects.length} Projects`;
}

/* ============================================================
   LANGUAGE TOGGLE
   ============================================================ */
let currentLang = localStorage.getItem('lang') || 'en';

const translations = {
  de: {
    'tags':         'Schlagwörter hinzufügen…',
    'sec-general':  ' Allgemein:',
    'key-rolle':    'Rolle:',
    'val-rolle':    'Mediengestalter',
    'key-standort': 'Standort:',
    'key-herkunft': 'Herkunft:',
    'val-herkunft': 'Mexikanische Wurzeln',
    'key-sprachen': 'Sprachen:',
    'key-erstellt': 'Erstellt:',
    'key-geaendert':'Geändert:',
    'val-geaendert':'Täglich ✦',
    'sec-about':    ' Über mich:',
    'about-1':      'Ein leidenschaftlicher Mediengestalter mit mexikanischen Wurzeln, der in Deutschland lebt und arbeitet. Ich verbinde kreatives Denken mit technischer Präzision.',
    'about-2':      'Mit Erfahrung in UX/UI Design, 3D Modellierung, Fotografie und Webentwicklung bringe ich Ideen zum Leben — und schaffe Werke, die Eindruck hinterlassen.',
    'sec-share':    ' Teilen & Berechtigungen:',
    'favs':         'Favoriten',
    'all':          'Alle',
    'search-ph':    'Suchen…',
    'win-open':      'Öffnen',
    'projekte-nav':  'Projekte',
    'projekte-dock': 'Projekte',
  },
  en: {
    'tags':         'Add Tags…',
    'sec-general':  ' General:',
    'key-rolle':    'Role:',
    'val-rolle':    'Media Designer',
    'key-standort': 'Location:',
    'key-herkunft': 'Origin:',
    'val-herkunft': 'Mexican Roots',
    'key-sprachen': 'Languages:',
    'key-erstellt': 'Created:',
    'key-geaendert':'Modified:',
    'val-geaendert':'Daily ✦',
    'sec-about':    ' About me:',
    'about-1':      'A passionate media designer with Mexican roots, living and working in Germany. I combine creative thinking with technical precision.',
    'about-2':      'With experience in UX/UI design, 3D modeling, photography, and web development, I bring ideas to life — creating work that leaves a lasting impression.',
    'sec-share':    ' Sharing & Permissions:',
    'favs':         'Favorites',
    'all':          'All',
    'search-ph':    'Search…',
    'win-open':      'Open',
    'projekte-nav':  'Projects',
    'projekte-dock': 'Projects',
  }
};

function applyLanguage(lang) {
  // Text content
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (translations[lang][key] !== undefined) {
      el.textContent = translations[lang][key];
    }
  });

  // Placeholders
  document.querySelectorAll('[data-i18n-ph]').forEach(el => {
    const key = el.dataset.i18nPh;
    if (translations[lang][key] !== undefined) {
      el.placeholder = translations[lang][key];
    }
  });

  // Update any open project window's text to match language
  document.querySelectorAll('.project-win').forEach(win => {
    const p = projects.find(pr => pr.id === +win.dataset.projectId);
    if (!p) return;
    const catEl  = win.querySelector('.win-cat');
    const descEl = win.querySelector('.win-desc');
    const btn    = win.querySelector('.win-btn');
    if (catEl)  catEl.textContent  = p['cat_'  + lang];
    if (descEl) descEl.textContent = p['desc_' + lang];
    if (btn) {
      const svg = btn.querySelector('svg');
      btn.childNodes.forEach(n => { if (n.nodeType === 3) n.remove(); });
      btn.insertBefore(document.createTextNode(translations[lang]['win-open'] + ' '), svg);
    }
  });

  // Skills count
  filterSkills();

  // Projekte cards language
  updateProjekteLanguage(lang);

  // Toggle button UI
  const btn = document.getElementById('langToggle');
  if (lang === 'de') {
    btn.querySelector('.lang-flag').textContent = '🇩🇪';
    btn.querySelector('.lang-label').textContent = 'DE';
  } else {
    btn.querySelector('.lang-flag').textContent = '🇬🇧';
    btn.querySelector('.lang-label').textContent = 'EN';
  }

  document.documentElement.lang = lang;
  localStorage.setItem('lang', lang);

  /* Sync theme label with new language */
  const _tl = document.getElementById('themeDockLabel');
  if (_tl) {
    const _th = document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
    _tl.textContent = lang === 'de' ? (_th === 'light' ? 'Hell' : 'Dunkel') : (_th === 'light' ? 'Light' : 'Dark');
  }
}

document.getElementById('langToggle').addEventListener('click', () => {
  currentLang = currentLang === 'de' ? 'en' : 'de';
  applyLanguage(currentLang);
});

// Build projekte cards with initial language
buildProjekteCards(currentLang);

// Apply saved language on load
if (currentLang !== 'de') applyLanguage(currentLang);

/* ============================================================
   MOBILE INIT — show panels on load (they are always-on widgets)
   ============================================================ */
if (isMobile()) {
  // Skills window is always visible on mobile — remove hidden class
  skillsWin.classList.remove('hidden');
  // Ensure info panel is always visible (no bottom-sheet offset)
  infoPanel.classList.add('mobile-open');
}

/* ============================================================
   MOBILE — TAP TO EXPAND / AUTO-COLLAPSE PANELS
   ============================================================ */
(function () {
  if (!isMobile()) return;

  let infoTimer   = null;
  let skillsTimer = null;

  const EASE_IN  = 'all 0.38s cubic-bezier(0.16,1,0.3,1)';
  const EASE_OUT = 'all 0.3s cubic-bezier(0.4,0,1,1)';

  /* ── helpers ───────────────────────────────────────────── */
  function expandPanel(panel) {
    panel.style.transition = EASE_IN;
    panel.classList.add('mobile-expanded');
    // Show the red close button
    const ctrl = panel.querySelector('.win-controls');
    if (ctrl) ctrl.style.display = 'flex';
    document.body.classList.add('panel-expanded');
  }

  function collapsePanel(panel) {
    clearTimeout(panel === infoPanel ? infoTimer : skillsTimer);
    panel.style.transition = EASE_OUT;
    panel.classList.remove('mobile-expanded');
    document.body.classList.remove('panel-expanded');
    // Hide the red close button again after transition
    setTimeout(() => {
      const ctrl = panel.querySelector('.win-controls');
      if (ctrl) ctrl.style.display = '';
      panel.style.transition = '';
    }, 320);
  }

  function triggerPop(btn, onDone) {
    btn.classList.remove('pop');
    void btn.offsetWidth; // reflow to restart animation
    btn.classList.add('pop');
    btn.addEventListener('animationend', () => {
      btn.classList.remove('pop');
      onDone();
    }, { once: true });
  }

  function scheduleAutoCollapse(panel, getTimer, setTimer) {
    clearTimeout(getTimer());
    setTimer(setTimeout(() => {
      if (!panel.classList.contains('mobile-expanded')) return; // already closed
      const closeBtn = panel.querySelector('.wc.red');
      if (closeBtn) {
        // Pop the button as a hint, then collapse
        triggerPop(closeBtn, () => collapsePanel(panel));
      } else {
        collapsePanel(panel);
      }
    }, 10000));
  }

  /* ── Info panel ─────────────────────────────────────────── */
  infoPanel.addEventListener('click', (e) => {
    if (infoPanel.classList.contains('mobile-expanded')) return; // already expanded
    expandPanel(infoPanel);
    scheduleAutoCollapse(infoPanel, () => infoTimer, v => { infoTimer = v; });
    e.stopPropagation();
  });

  document.getElementById('infoPanelClose').addEventListener('click', (e) => {
    if (infoPanel.classList.contains('mobile-expanded')) {
      collapsePanel(infoPanel);
      e.stopPropagation();
    }
  });

  /* ── Skills window ──────────────────────────────────────── */
  // Tap anywhere on the card to expand
  skillsWin.addEventListener('click', (e) => {
    if (skillsWin.classList.contains('mobile-expanded')) return;
    expandPanel(skillsWin);
    scheduleAutoCollapse(skillsWin, () => skillsTimer, v => { skillsTimer = v; });
    e.stopPropagation();
  });

  document.getElementById('skillsClose').addEventListener('click', (e) => {
    if (skillsWin.classList.contains('mobile-expanded')) {
      collapsePanel(skillsWin);
      e.stopPropagation();
    }
  });
}());

/* ============================================================
   THEME TOGGLE — Light / Dark (macOS Appearance style)
   Reads localStorage → falls back to prefers-color-scheme
   ============================================================ */
(function () {
  const html       = document.documentElement;
  const themeBtn   = document.getElementById('dockThemeBtn');
  const themeLabel = document.getElementById('themeDockLabel');

  function label(theme, lang) {
    return lang === 'de'
      ? (theme === 'light' ? 'Hell' : 'Dunkel')
      : (theme === 'light' ? 'Light' : 'Dark');
  }

  function current() {
    return html.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
  }

  function apply(theme, save) {
    if (theme === 'light') {
      html.setAttribute('data-theme', 'light');
    } else {
      html.removeAttribute('data-theme');
    }
    if (themeLabel) themeLabel.textContent = label(theme, currentLang);
    if (save) localStorage.setItem('theme', theme);
  }

  /* Sync initial label (theme already set by anti-flash inline script) */
  const initTheme = localStorage.getItem('theme') ||
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  apply(initTheme, false);

  /* Toggle on click */
  if (themeBtn) {
    themeBtn.addEventListener('click', () => apply(current() === 'dark' ? 'light' : 'dark', true));
  }

  /* Follow OS preference changes when user hasn't set a manual preference */
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (!localStorage.getItem('theme')) apply(e.matches ? 'dark' : 'light', false);
  });
}());

/* ============================================================
   ENTRANCE ANIMATIONS
   Equivalent to Framer Motion: whileInView, viewport once:true
   opacity 0→1, translateY 24px→0, 500ms easeOut, stagger 80ms
   ============================================================ */
(function () {
  const DUR           = 500;
  const EASE          = 'cubic-bezier(0.0, 0.0, 0.2, 1)';
  const PANEL_STAGGER = 80;
  const GRID_STAGGER  = 50;

  /* Play entrance on a single element and clean up after */
  function revealEl(el, delay) {
    el.style.opacity    = '0';
    el.style.transform  = 'translateY(24px)';
    el.style.willChange = 'opacity, transform';

    const anim = el.animate(
      [{ opacity: 0, transform: 'translateY(24px)' },
       { opacity: 1, transform: 'translateY(0)'    }],
      { duration: DUR, delay, easing: EASE, fill: 'both' }
    );

    /* After animation: hand CSS control back so open/close toggles still work */
    anim.finished.then(() => {
      el.style.opacity    = '';
      el.style.transform  = '';
      el.style.willChange = '';
      anim.cancel();
    }).catch(() => {});
  }

  /* Observe a list of elements, animate each once it enters the viewport */
  function watchOnce(els, baseDelay, stagger) {
    if (!els.length) return;

    const obs = new IntersectionObserver((entries, o) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const i = parseInt(entry.target.dataset.ainIdx || '0');
        revealEl(entry.target, baseDelay + i * stagger);
        o.unobserve(entry.target);
      });
    }, { threshold: 0.05 });

    els.forEach((el, i) => {
      el.dataset.ainIdx = i;
      /* Pre-hide before observer fires (prevents flash) */
      el.style.opacity   = '0';
      el.style.transform = 'translateY(24px)';
      obs.observe(el);
    });
  }

  /* ── 1. Hero / Perfil panel ───────────────────────────────── */
  /* ── 2. Skills window ────────────────────────────────────── */
  /* ── 3. Projekte window ──────────────────────────────────── */
  watchOnce(
    [document.getElementById('infoPanel'),
     document.getElementById('skillsWin'),
     document.getElementById('projekteWin')].filter(Boolean),
    0, PANEL_STAGGER
  );

  /* ── 4. Dock ─────────────────────────────────────────────── */
  const dockEl = document.querySelector('.dock');
  if (dockEl) watchOnce([dockEl], 3 * PANEL_STAGGER, 0);

  /* ── 5. Skills grid — stagger each item ──────────────────── */
  /* Base delay = skills-win entrance (1×80ms) + its animation (500ms) − overlap */
  watchOnce(
    Array.from(document.querySelectorAll('.skill-item')),
    PANEL_STAGGER + 220, GRID_STAGGER
  );

  /* ── 6. Projekte cards — stagger each card ───────────────── */
  /* Base delay = projekte-win entrance (2×80ms) + its animation − overlap */
  watchOnce(
    Array.from(document.querySelectorAll('#projekteBody .proj-card-item')),
    2 * PANEL_STAGGER + 220, GRID_STAGGER
  );

  /* ── 7. Project icons — dynamic, observe with MutationObserver */
  const iconsFieldEl = document.getElementById('iconsField');
  if (iconsFieldEl) {
    const tryIcons = () => {
      const icons = Array.from(iconsFieldEl.querySelectorAll('.project-icon'));
      if (!icons.length) return false;
      watchOnce(icons, 100, GRID_STAGGER);
      return true;
    };
    if (!tryIcons()) {
      const mo = new MutationObserver(() => { if (tryIcons()) mo.disconnect(); });
      mo.observe(iconsFieldEl, { childList: true, subtree: true });
    }
  }
}());
