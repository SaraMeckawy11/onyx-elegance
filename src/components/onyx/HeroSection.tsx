import { motion } from 'framer-motion';
import { themeConfig } from '@/config/theme.config';
import { translations } from '@/config/translations';
import { useLang } from '@/hooks/useLang';

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] } },
};

export default function HeroSection() {
  const { lang } = useLang();
  const t = translations[lang];
  const { couple } = themeConfig;

  return (
    <motion.section
      className="relative min-h-screen flex flex-col items-center justify-center px-6 py-24 bg-background overflow-hidden"
      variants={stagger}
      initial="hidden"
      animate="show"
    >
      {/* Decorative corner ornaments */}
      <div className="absolute top-8 left-8 w-12 h-12 border-t border-l border-accent/20" />
      <div className="absolute top-8 right-8 w-12 h-12 border-t border-r border-accent/20" />
      <div className="absolute bottom-8 left-8 w-12 h-12 border-b border-l border-accent/20" />
      <div className="absolute bottom-8 right-8 w-12 h-12 border-b border-r border-accent/20" />

      {/* Top ornamental line */}
      <motion.div variants={fadeUp} className="flex flex-col items-center mb-12">
        <div className="w-px h-12 bg-gradient-to-b from-transparent to-accent/40" />
        <div className="w-1.5 h-1.5 rotate-45 bg-accent/50 mt-1" />
      </motion.div>

      {/* Invited label */}
      <motion.p
        variants={fadeUp}
        className="font-body text-[10px] tracking-[0.4em] uppercase mb-8 text-muted-foreground"
        style={{ fontWeight: 200 }}
      >
        {t.invitedLabel}
      </motion.p>

      {/* Names */}
      <motion.div variants={fadeUp} className="text-center">
        <h1 className="font-display italic text-5xl sm:text-7xl lg:text-8xl text-foreground leading-[0.95]">
          {couple.name1}
        </h1>
        <div className="flex items-center justify-center gap-4 my-5">
          <div className="w-12 h-px bg-accent/30" />
          <p className="font-display italic text-3xl sm:text-4xl text-accent">&</p>
          <div className="w-12 h-px bg-accent/30" />
        </div>
        <h1 className="font-display italic text-5xl sm:text-7xl lg:text-8xl text-foreground leading-[0.95]">
          {couple.name2}
        </h1>
      </motion.div>

      {/* Date */}
      <motion.div variants={fadeUp} className="mt-12 text-center">
        <div className="flex items-center justify-center gap-3 mb-1">
          <div className="w-8 h-px bg-accent/30" />
          <div className="w-1 h-1 rotate-45 bg-accent/40" />
          <div className="w-8 h-px bg-accent/30" />
        </div>
        <p className="font-body text-[11px] tracking-[0.25em] uppercase text-muted-foreground mt-4" style={{ fontWeight: 200 }}>
          {t.weddingDateDisplay}
        </p>
      </motion.div>

      {/* Tagline */}
      <motion.p
        variants={fadeUp}
        className="font-display italic text-lg sm:text-xl mt-8 text-accent/80"
      >
        {t.tagline}
      </motion.p>

      {/* Scroll indicator */}
      <motion.div
        variants={fadeUp}
        className="absolute bottom-10 flex flex-col items-center"
      >
        <p className="font-body text-[8px] tracking-[0.4em] uppercase text-muted-foreground/60 mb-3" style={{ fontWeight: 200 }}>
          SCROLL
        </p>
        <div className="w-px bg-accent/40 animate-scroll-line" />
      </motion.div>
    </motion.section>
  );
}
