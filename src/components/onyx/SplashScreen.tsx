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
    setTimeout(() => setPhase('exiting'), 1000);
    setTimeout(() => { setPhase('done'); onComplete(); }, 1600);
  };

  if (phase === 'done') return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background cursor-pointer"
        onClick={handleOpen}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="relative"
          style={{ perspective: '600px' }}
          animate={phase === 'exiting' ? { y: '-110vh' } : {}}
          transition={phase === 'exiting' ? { duration: 0.6, ease: 'easeIn' } : {}}
        >
          {/* Envelope body */}
          <div
            className="relative w-[260px] h-[370px] sm:w-[300px] sm:h-[420px] rounded-lg"
            style={{
              backgroundColor: '#FAF8F5',
              border: '1px solid #D9D0C1',
              boxShadow: 'inset 0 0 20px rgba(240, 235, 225, 0.8), 0 10px 30px -10px rgba(107, 98, 89, 0.2)',
            }}
          >
            {/* Flap */}
            <motion.div
              className="absolute top-0 left-0 w-full origin-top"
              style={{ transformStyle: 'preserve-3d' }}
              animate={
                phase === 'opening' || phase === 'exiting'
                  ? { rotateX: -160 }
                  : {}
              }
              transition={{ duration: 0.7, ease: 'easeInOut' }}
            >
              <div
                className="w-full relative"
                style={{
                  height: '140px',
                  backgroundColor: '#E8E1D5',
                  clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                }}
              >
                {/* Crease line */}
                <div className="absolute bottom-[30%] left-[15%] right-[15%] h-[0.5px]" style={{ backgroundColor: '#D9D0C1' }} />

                {/* Ribbon lines */}
                <div className="absolute top-[55%] left-0 w-[30%] h-[0.5px]" style={{ backgroundColor: '#C8BFB0' }} />
                <div className="absolute top-[55%] right-0 w-[30%] h-[0.5px]" style={{ backgroundColor: '#C8BFB0' }} />

                {/* Wax seal */}
                <motion.div
                  className="absolute left-1/2 top-[40%] -translate-x-1/2 -translate-y-1/2 w-[52px] h-[52px] rounded-full flex items-center justify-center"
                  style={{
                    backgroundColor: '#1A1A1A',
                    backgroundImage: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.1) 0%, transparent 80%)',
                    boxShadow: '0 4px 12px rgba(26, 26, 26, 0.4)',
                  }}
                  animate={
                    phase === 'cracking'
                      ? { scale: [1, 1.08, 0.95], opacity: [1, 0.8, 1] }
                      : {}
                  }
                  transition={{ duration: 0.3 }}
                >
                  <span className="font-display italic text-[13px] tracking-wide" style={{ color: '#FAF8F5' }}>
                    {themeConfig.couple.initials.split(' ').filter(c => c !== '&').join('')}
                  </span>
                </motion.div>
              </div>
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
