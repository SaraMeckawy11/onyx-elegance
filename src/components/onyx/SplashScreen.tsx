import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { themeConfig } from '@/config/theme.config';
import { translations } from '@/config/translations';
import { useLang } from '@/hooks/useLang';

export default function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const { lang } = useLang();
  const t = translations[lang];
  const [phase, setPhase] = useState<'idle' | 'cracking' | 'opening' | 'exiting' | 'done'>('idle');

  const handleOpen = () => {
    if (phase !== 'idle') return;
    setPhase('cracking');
    setTimeout(() => setPhase('opening'), 300);
    setTimeout(() => setPhase('exiting'), 1100);
    setTimeout(() => { setPhase('done'); onComplete(); }, 1700);
  };

  if (phase === 'done') return null;

  const envelopeW = 320;
  const envelopeH = 220;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex flex-col items-center justify-center cursor-pointer"
        style={{ backgroundColor: '#FAF8F5' }}
        onClick={handleOpen}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="relative"
          animate={phase === 'exiting' ? { scale: 0.8, opacity: 0 } : {}}
          transition={phase === 'exiting' ? { duration: 0.6, ease: 'easeIn' } : {}}
        >
          {/* Envelope body — landscape rectangle */}
          <div
            className="relative overflow-visible"
            style={{
              width: envelopeW,
              height: envelopeH,
              backgroundColor: '#F5F0E8',
              borderRadius: 2,
              boxShadow: '0 8px 40px -12px rgba(107, 98, 89, 0.18), 0 2px 8px rgba(107, 98, 89, 0.08)',
            }}
          >
            {/* Inner shadow lines to simulate folds */}
            {/* Bottom-left diagonal fold line */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `
                  linear-gradient(to top right, transparent 49.5%, rgba(200,191,176,0.3) 49.5%, rgba(200,191,176,0.3) 50.5%, transparent 50.5%),
                  linear-gradient(to top left, transparent 49.5%, rgba(200,191,176,0.3) 49.5%, rgba(200,191,176,0.3) 50.5%, transparent 50.5%)
                `,
              }}
            />

            {/* Top flap — triangle that folds down to center */}
            <motion.div
              className="absolute left-0 right-0 origin-top"
              style={{
                top: 0,
                height: envelopeH / 2,
                transformStyle: 'preserve-3d',
                perspective: 800,
                zIndex: 10,
              }}
              animate={
                phase === 'opening' || phase === 'exiting'
                  ? { rotateX: -180 }
                  : {}
              }
              transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <div
                style={{
                  width: 0,
                  height: 0,
                  borderLeft: `${envelopeW / 2}px solid transparent`,
                  borderRight: `${envelopeW / 2}px solid transparent`,
                  borderTop: `${envelopeH / 2}px solid #EDE7DB`,
                }}
              />
              {/* Subtle crease on top flap */}
              <div
                className="absolute top-0 left-1/2 -translate-x-1/2"
                style={{
                  width: 0,
                  height: 0,
                  borderLeft: `${envelopeW / 2 - 20}px solid transparent`,
                  borderRight: `${envelopeW / 2 - 20}px solid transparent`,
                  borderTop: `${envelopeH / 2 - 14}px solid rgba(200,191,176,0.15)`,
                  top: 7,
                }}
              />
            </motion.div>

            {/* Left flap — triangle pointing right */}
            <div
              className="absolute top-0 left-0"
              style={{
                width: envelopeW / 2,
                height: envelopeH,
                overflow: 'hidden',
                zIndex: 1,
              }}
            >
              <div
                style={{
                  width: 0,
                  height: 0,
                  borderTop: `${envelopeH / 2}px solid transparent`,
                  borderBottom: `${envelopeH / 2}px solid transparent`,
                  borderLeft: `${envelopeW / 2}px solid #F0EAE0`,
                }}
              />
            </div>

            {/* Right flap — triangle pointing left */}
            <div
              className="absolute top-0 right-0"
              style={{
                width: envelopeW / 2,
                height: envelopeH,
                overflow: 'hidden',
                zIndex: 1,
              }}
            >
              <div
                style={{
                  width: 0,
                  height: 0,
                  borderTop: `${envelopeH / 2}px solid transparent`,
                  borderBottom: `${envelopeH / 2}px solid transparent`,
                  borderRight: `${envelopeW / 2}px solid #F0EAE0`,
                }}
              />
            </div>

            {/* Bottom flap — triangle pointing up (the back flap, visible) */}
            <div
              className="absolute bottom-0 left-0 right-0"
              style={{
                height: envelopeH / 2,
                zIndex: 2,
              }}
            >
              <div
                style={{
                  width: 0,
                  height: 0,
                  borderLeft: `${envelopeW / 2}px solid transparent`,
                  borderRight: `${envelopeW / 2}px solid transparent`,
                  borderBottom: `${envelopeH / 2}px solid #EEE8DD`,
                }}
              />
            </div>

            {/* Wax Seal — champagne gold, centered */}
            <motion.div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
              style={{
                width: 64,
                height: 64,
                borderRadius: '50%',
                zIndex: 20,
                background: `
                  radial-gradient(circle at 35% 30%, #D4BC94 0%, #C4A882 30%, #B89B6E 70%, #A88C5C 100%)
                `,
                boxShadow: `
                  0 2px 8px rgba(164, 140, 92, 0.35),
                  0 4px 16px rgba(164, 140, 92, 0.2),
                  inset 0 1px 2px rgba(255,255,255,0.3),
                  inset 0 -1px 2px rgba(0,0,0,0.1)
                `,
              }}
              animate={
                phase === 'cracking'
                  ? { scale: [1, 1.1, 0.95], opacity: [1, 0.85, 1] }
                  : {}
              }
              transition={{ duration: 0.3 }}
            >
              {/* Inner ring */}
              <div
                className="absolute inset-[6px] rounded-full"
                style={{
                  border: '1.5px solid rgba(255,255,255,0.2)',
                  boxShadow: 'inset 0 0 4px rgba(0,0,0,0.08)',
                }}
              />
              {/* Ornamental border simulation */}
              <div
                className="absolute inset-[10px] rounded-full"
                style={{
                  border: '0.5px solid rgba(255,255,255,0.15)',
                }}
              />
              {/* Initials */}
              <span
                className="font-display italic text-[16px] tracking-wide relative z-10"
                style={{
                  color: '#FAF8F5',
                  textShadow: '0 1px 2px rgba(0,0,0,0.15)',
                }}
              >
                {themeConfig.couple.initials.split(' ').filter(c => c !== '&').join('')}
              </span>
            </motion.div>
          </div>
        </motion.div>

        {/* Touch to open */}
        <motion.p
          className="mt-10 font-display italic text-[13px] tracking-[0.3em] animate-pulse-fade"
          style={{ color: '#9E9488' }}
          animate={phase !== 'idle' ? { opacity: 0 } : {}}
        >
          {t.touchToOpen}
        </motion.p>
      </motion.div>
    </AnimatePresence>
  );
}
