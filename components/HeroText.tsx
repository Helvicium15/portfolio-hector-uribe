'use client';
import { useState, useEffect } from 'react';

const WORDS   = ['HECTOR', 'DESIGNER'];
const STAGGER = 72;   // ms between letters on enter
const HOLD    = 2800; // ms fully visible
const EXIT_ST = 44;   // ms between letters on exit

type Phase = 'enter' | 'hold' | 'exit';

export default function HeroText() {
  const [wIdx,  setWIdx]  = useState(0);
  const [phase, setPhase] = useState<Phase>('enter');

  useEffect(() => {
    const word = WORDS[wIdx];
    let t: ReturnType<typeof setTimeout>;

    if (phase === 'enter') {
      t = setTimeout(() => setPhase('hold'), word.length * STAGGER + 700);
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
        fontWeight: 800,
        margin: 0,
        fontSize: 'clamp(64px, 18vw, 280px)',
        lineHeight: 0.85,
        letterSpacing: '-0.048em',
        display: 'flex',
        justifyContent: 'center',
        userSelect: 'none',
        overflow: 'visible',
      }}
    >
      {word.split('').map((char, i) => {
        const enterDelay = `${i * STAGGER}ms`;
        const exitDelay  = `${(word.length - 1 - i) * EXIT_ST}ms`;

        const irisDelay = `-${(i * 0.82).toFixed(2)}s`;

        return (
          <span
            key={`${wIdx}-${i}`}
            className="hero-letter"
            style={{
              display: 'inline-block',
              fontStyle: 'italic',
              animation:
                phase === 'enter'
                  ? `letterIn 0.72s cubic-bezier(0.22,1,0.36,1) ${enterDelay} both, iris-color 6s linear ${irisDelay} infinite`
                  : phase === 'exit'
                  ? `letterOut 0.42s ease-in ${exitDelay} both, iris-color 6s linear ${irisDelay} infinite`
                  : `iris-color 6s linear ${irisDelay} infinite`,
            }}
          >
            {char}
          </span>
        );
      })}
    </h1>
  );
}
