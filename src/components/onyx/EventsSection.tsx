import { motion } from 'framer-motion';
import { themeConfig } from '@/config/theme.config';
import { translations } from '@/config/translations';
import { useLang } from '@/hooks/useLang';
import { useScrollReveal } from '@/hooks/useScrollReveal';

function RingsIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="text-accent" stroke="currentColor" strokeWidth="0.8">
      <circle cx="12" cy="16" r="8" />
      <circle cx="20" cy="16" r="8" />
    </svg>
  );
}

function CheersIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="text-accent" stroke="currentColor" strokeWidth="0.8">
      <path d="M11 5L9 25M21 5L23 25" />
      <path d="M7 12h8M17 12h8" />
      <path d="M14 5L16 3L18 5" />
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
      className="relative border border-border/60 p-8 sm:p-10 flex flex-col items-center text-center bg-card/50 backdrop-blur-sm group hover:border-accent/30 transition-colors duration-500"
      initial={{ opacity: 0, y: 24 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      style={{ boxShadow: '0 4px 24px -4px hsl(var(--charcoal) / 0.04)' }}
    >
      {/* Corner accents */}
      <div className="absolute top-3 left-3 w-4 h-4 border-t border-l border-accent/20" />
      <div className="absolute top-3 right-3 w-4 h-4 border-t border-r border-accent/20" />
      <div className="absolute bottom-3 left-3 w-4 h-4 border-b border-l border-accent/20" />
      <div className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-accent/20" />

      {type === 'ceremony' ? <RingsIcon /> : <CheersIcon />}
      <p className="font-body text-[8px] tracking-[0.5em] uppercase mt-5 mb-3 text-muted-foreground" style={{ fontWeight: 200 }}>
        {type === 'ceremony' ? t.ceremony : t.reception}
      </p>
      <h3 className="font-display italic text-[26px] sm:text-[30px] text-foreground mb-4">{data.name}</h3>
      <div className="flex items-center gap-2 mb-4">
        <div className="w-6 h-px bg-accent/30" />
        <div className="w-1 h-1 rotate-45 bg-accent/40" />
        <div className="w-6 h-px bg-accent/30" />
      </div>
      <p className="font-body text-[15px] tracking-[0.12em] text-foreground mb-2" style={{ fontWeight: 300 }}>{data.time}</p>
      <p className="font-body text-[10px] tracking-[0.3em] uppercase text-accent mb-1" style={{ fontWeight: 300 }}>{data.venue}</p>
      <p className="font-body text-[13px] text-muted-foreground" style={{ fontWeight: 200 }}>{data.address}</p>
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
      className="bg-card section-padding px-6"
      initial={{ opacity: 0 }}
      animate={visible ? { opacity: 1 } : {}}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-4xl mx-auto">
        <div className="section-divider mb-12" />

        <div className="heading-ornament mb-16">
          <h2 className="font-display italic text-3xl sm:text-5xl text-foreground">{t.theCelebration}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <EventCard type="ceremony" />
          <EventCard type="reception" />
        </div>

        {/* Map */}
        <div className="border border-border/60 overflow-hidden">
          <iframe
            src={themeConfig.mapEmbedUrl}
            className="w-full h-[220px] sm:h-[300px] map-premium"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Wedding venue location"
          />
        </div>
      </div>
    </motion.section>
  );
}
