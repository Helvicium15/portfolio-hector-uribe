'use client';
import { useState, useEffect } from 'react';

const WORDS   = ['HECTOR', 'DESIGNER'];
const STAGGER = 72;
const HOLD    = 2800;
const EXIT_ST = 44;

type Phase = 'enter' | 'hold' | 'exit';

export default function HectorLogo() {
  const [wIdx,  setWIdx]  = useState(0);
  const [phase, setPhase] = useState<Phase>('enter');

  useEffect(() => {
    const word = WORDS[wIdx];
    let t: ReturnType<typeof setTimeout>;
    if (phase === 'enter') {
      t = setTimeout(() => setPhase('hold'), word.length * STAGGER + 800);
    } else if (phase === 'hold') {
      t = setTimeout(() => setPhase('exit'), HOLD);
    } else {
      t = setTimeout(() => {
        setWIdx(i => (i + 1) % WORDS.length);
        setPhase('enter');
      }, word.length * EXIT_ST + 500);
    }
    return () => clearTimeout(t);
  }, [phase, wIdx]);

  const word = WORDS[wIdx];

  return (
    <h1
      aria-label={word}
      style={{
        fontFamily: 'var(--font-display)',
        fontWeight: 900,
        fontStyle: 'italic',
        margin: 0,
        fontSize: 'clamp(52px, 10vw, 130px)',
        lineHeight: 0.88,
        letterSpacing: '-0.046em',
        display: 'flex',
        justifyContent: 'center',
        userSelect: 'none',
        overflow: 'visible',
        /* No CSS filter here — it would create an isolated layer that
           breaks background-clip:text on the span children */
      }}
    >
      {word.split('').map((char, i) => {
        const enterDelay = `${i * STAGGER}ms`;
        const exitDelay  = `${(word.length - 1 - i) * EXIT_ST}ms`;
        /* negative delay staggers each letter to a different hue in glass-flow */
        const glassDelay = `-${(i * 0.68).toFixed(2)}s`;

        return (
          <span
            key={`${wIdx}-${i}`}
            className="hector-letter"
            style={{
              display: 'inline-block',
              animation:
                phase === 'enter'
                  ? `hectorIn 0.78s cubic-bezier(0.22,1,0.36,1) ${enterDelay} both, glass-flow 5.5s ease-in-out ${glassDelay} infinite`
                  : phase === 'exit'
                  ? `hectorOut 0.44s ease-in ${exitDelay} both, glass-flow 5.5s ease-in-out ${glassDelay} infinite`
                  : `glass-flow 5.5s ease-in-out ${glassDelay} infinite`,
            }}
          >
            {char}
          </span>
        );
      })}
    </h1>
  );
}
