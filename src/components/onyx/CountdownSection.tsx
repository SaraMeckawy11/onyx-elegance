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
    <div className="relative h-[72px] sm:h-[96px] overflow-hidden">
      <AnimatePresence mode="popLayout">
        <motion.span
          key={value}
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -24, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
          className="font-display text-[48px] sm:text-[72px] text-foreground tabular-nums block leading-none"
          style={{ fontWeight: 300 }}
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
      className="relative bg-card py-16 sm:py-24"
      initial={{ opacity: 0 }}
      animate={visible ? { opacity: 1 } : {}}
      transition={{ duration: 0.8 }}
    >
      {/* Top/bottom border lines */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 max-w-md h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 max-w-md h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="flex items-center justify-center gap-6 sm:gap-10">
        {blocks.map((b, i) => (
          <div key={i} className="flex items-center gap-6 sm:gap-10">
            <motion.div
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={visible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <SlotNumber value={b.value} />
              <span
                className="font-body text-[8px] sm:text-[9px] tracking-[0.45em] uppercase mt-3 text-muted-foreground"
                style={{ fontWeight: 200 }}
              >
                {b.label}
              </span>
            </motion.div>
            {i < 3 && (
              <div className="flex flex-col items-center gap-2 -mt-4">
                <div className="w-[3px] h-[3px] rounded-full bg-accent/50" />
                <div className="w-[3px] h-[3px] rounded-full bg-accent/30" />
              </div>
            )}
          </div>
        ))}
      </div>
    </motion.section>
  );
}
