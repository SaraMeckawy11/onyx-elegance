import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { themeConfig } from '@/config/theme.config';
import { translations } from '@/config/translations';
import { useLang } from '@/hooks/useLang';
import { useScrollReveal } from '@/hooks/useScrollReveal';

function getTimeLeft(target: string) {
  const diff = new Date(target).getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
  };
}

function SlotNumber({ value }: { value: number }) {
  const display = String(value).padStart(2, '0');
  return (
    <div className="relative h-[80px] sm:h-[100px] overflow-hidden">
      <AnimatePresence mode="popLayout">
        <motion.span
          key={value}
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -30, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          className="font-display text-[52px] sm:text-[80px] text-foreground tabular-nums block"
        >
          {display}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

export default function CountdownSection() {
  const { lang } = useLang();
  const t = translations[lang];
  const [time, setTime] = useState(getTimeLeft(themeConfig.wedding.date));
  const { ref, visible } = useScrollReveal();

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft(themeConfig.wedding.date)), 1000);
    return () => clearInterval(id);
  }, []);

  const blocks = [
    { value: time.days, label: t.days },
    { value: time.hours, label: t.hours },
    { value: time.minutes, label: t.minutes },
    { value: time.seconds, label: t.seconds },
  ];

  return (
    <motion.section
      ref={ref}
      className="bg-card border-y border-border py-16 sm:py-24"
      initial={{ opacity: 0, y: 20 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
    >
      <div className="flex items-center justify-center gap-4 sm:gap-8">
        {blocks.map((b, i) => (
          <div key={i} className="flex items-center gap-4 sm:gap-8">
            <div className="flex flex-col items-center">
              <SlotNumber value={b.value} />
              <span className="font-body text-[9px] tracking-[0.4em] uppercase mt-2" style={{ color: '#9E9488' }}>
                {b.label}
              </span>
            </div>
            {i < 3 && (
              <span className="w-1 h-1 rounded-full bg-accent self-center -mt-6" />
            )}
          </div>
        ))}
      </div>
    </motion.section>
  );
}
