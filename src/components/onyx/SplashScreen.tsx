import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { translations } from '@/config/translations';
import { useLang } from '@/hooks/useLang';
import envelopeTexture from '@/assets/envelope-damask.jpg';
import waxSealImg from '@/assets/wax-seal.png';

export default function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const { lang } = useLang();
  const t = translations[lang];
  const [phase, setPhase] = useState<'idle' | 'cracking' | 'opening' | 'exiting' | 'done'>('idle');

  const handleOpen = () => {
    if (phase !== 'idle') return;
    setPhase('cracking');
    setTimeout(() => setPhase('opening'), 350);
    setTimeout(() => setPhase('exiting'), 1100);
    setTimeout(() => { setPhase('done'); onComplete(); }, 1700);
  };

  if (phase === 'done') return null;

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
          animate={phase === 'exiting' ? { scale: 0.85, opacity: 0 } : {}}
          transition={phase === 'exiting' ? { duration: 0.6, ease: 'easeIn' } : {}}
        >
          {/* Envelope container — fills most of viewport */}
          <div
            className="relative overflow-hidden"
            style={{
              width: 'min(88vw, 420px)',
              height: 'min(62vw, 300px)',
              borderRadius: 3,
              boxShadow: '0 12px 60px -16px rgba(80, 70, 56, 0.25), 0 4px 16px rgba(80, 70, 56, 0.1)',
            }}
          >
            {/* Envelope body — textured background */}
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `url(${envelopeTexture})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />

            {/* Diagonal fold lines — subtle crease shadows */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `
                  linear-gradient(to top right, transparent 49.3%, rgba(160,148,130,0.15) 49.3%, rgba(160,148,130,0.15) 50.7%, transparent 50.7%),
                  linear-gradient(to top left, transparent 49.3%, rgba(160,148,130,0.15) 49.3%, rgba(160,148,130,0.15) 50.7%, transparent 50.7%)
                `,
              }}
            />

            {/* Bottom-left triangle flap overlay */}
            <div className="absolute bottom-0 left-0 pointer-events-none" style={{ width: '50%', height: '100%' }}>
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: 0,
                  height: 0,
                  borderBottom: 'min(31vw, 150px) solid rgba(200,190,172,0.12)',
                  borderRight: 'min(44vw, 210px) solid transparent',
                }}
              />
            </div>

            {/* Bottom-right triangle flap overlay */}
            <div className="absolute bottom-0 right-0 pointer-events-none" style={{ width: '50%', height: '100%' }}>
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  width: 0,
                  height: 0,
                  borderBottom: 'min(31vw, 150px) solid rgba(200,190,172,0.12)',
                  borderLeft: 'min(44vw, 210px) solid transparent',
                }}
              />
            </div>

            {/* Top flap — the triangular V-flap that opens */}
            <motion.div
              className="absolute left-0 right-0 origin-top"
              style={{
                top: 0,
                height: '55%',
                zIndex: 10,
                perspective: 800,
              }}
              animate={
                phase === 'opening' || phase === 'exiting'
                  ? { rotateX: -180 }
                  : {}
              }
              transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
            >
              {/* Flap shape via clip-path */}
              <div
                className="w-full h-full"
                style={{
                  clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                  backgroundImage: `url(${envelopeTexture})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center top',
                  filter: 'brightness(0.96)',
                  boxShadow: '0 4px 20px rgba(80,70,56,0.15)',
                }}
              />
              {/* Flap bottom shadow line */}
              <div
                className="absolute bottom-0 left-0 right-0"
                style={{
                  height: 2,
                  clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                  background: 'linear-gradient(to right, transparent, rgba(140,128,110,0.2) 30%, rgba(140,128,110,0.3) 50%, rgba(140,128,110,0.2) 70%, transparent)',
                }}
              />
            </motion.div>

            {/* Bottom flap — upward pointing triangle */}
            <div
              className="absolute bottom-0 left-0 right-0 pointer-events-none"
              style={{
                height: '50%',
                zIndex: 5,
              }}
            >
              <div
                className="w-full h-full"
                style={{
                  clipPath: 'polygon(0 100%, 100% 100%, 50% 0)',
                  backgroundImage: `url(${envelopeTexture})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center bottom',
                  filter: 'brightness(0.94)',
                }}
              />
            </div>

            {/* Wax Seal — real image */}
            <motion.div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{
                width: 72,
                height: 72,
                zIndex: 20,
                filter: 'drop-shadow(0 3px 8px rgba(100,80,50,0.35))',
              }}
              animate={
                phase === 'cracking'
                  ? { scale: [1, 1.12, 0.94], rotate: [0, 2, -1, 0] }
                  : {}
              }
              transition={{ duration: 0.35 }}
            >
              <img
                src={waxSealImg}
                alt="Wax seal"
                className="w-full h-full object-contain"
                draggable={false}
              />
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
