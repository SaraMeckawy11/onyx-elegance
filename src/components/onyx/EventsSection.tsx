import { motion } from 'framer-motion';
import { themeConfig } from '@/config/theme.config';
import { translations } from '@/config/translations';
import { useLang } from '@/hooks/useLang';
import { useScrollReveal } from '@/hooks/useScrollReveal';

function RingsIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="hsl(35, 38%, 64%)" strokeWidth="1">
      <circle cx="10" cy="14" r="7" />
      <circle cx="18" cy="14" r="7" />
    </svg>
  );
}

function CheersIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="hsl(35, 38%, 64%)" strokeWidth="1">
      <path d="M9 4L7 22M19 4L21 22" />
      <path d="M5 10h8M15 10h8" />
      <path d="M12 4L14 2L16 4" />
    </svg>
  );
}

function EventCard({ type }: { type: 'ceremony' | 'reception' }) {
  const { lang } = useLang();
  const t = translations[lang];
  const data = type === 'ceremony' ? themeConfig.ceremony : themeConfig.reception;
  const { ref, visible } = useScrollReveal();

  return (
    <motion.div
      ref={ref}
      className="border border-border rounded-lg p-8 sm:p-10 flex flex-col items-center text-center"
      initial={{ opacity: 0, scale: 0.97 }}
      animate={visible ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      {type === 'ceremony' ? <RingsIcon /> : <CheersIcon />}
      <p className="font-body text-[9px] tracking-[0.4em] uppercase mt-4 mb-2" style={{ color: '#9E9488' }}>
        {type === 'ceremony' ? t.ceremony : t.reception}
      </p>
      <h3 className="font-display italic text-[28px] text-foreground mb-3">{data.name}</h3>
      <div className="w-10 h-[1px] bg-border mb-3" />
      <p className="font-body text-[15px] tracking-[0.1em] text-foreground mb-2">{data.time}</p>
      <p className="font-body text-[11px] tracking-[0.25em] uppercase text-accent mb-1">{data.venue}</p>
      <p className="font-body text-[13px] text-muted-foreground">{data.address}</p>
    </motion.div>
  );
}

export default function EventsSection() {
  const { lang } = useLang();
  const t = translations[lang];
  const { ref, visible } = useScrollReveal();

  return (
    <motion.section
      ref={ref}
      className="bg-card py-20 sm:py-32 px-6"
      initial={{ opacity: 0, y: 20 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-center gap-6 mb-16">
          <div className="w-16 h-[1px] bg-border" />
          <h2 className="font-display italic text-3xl sm:text-5xl text-foreground">{t.theCelebration}</h2>
          <div className="w-16 h-[1px] bg-border" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          <EventCard type="ceremony" />
          <EventCard type="reception" />
        </div>

        {/* Map */}
        <div className="border border-border mt-4 overflow-hidden">
          <iframe
            src={themeConfig.mapEmbedUrl}
            className="w-full h-[240px] sm:h-[320px] map-premium"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Wedding venue location"
          />
        </div>
      </div>
    </motion.section>
  );
}
