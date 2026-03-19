import { motion } from 'framer-motion';
import { themeConfig } from '@/config/theme.config';
import { translations } from '@/config/translations';
import { useLang } from '@/hooks/useLang';

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
};

export default function HeroSection() {
  const { lang } = useLang();
  const t = translations[lang];
  const { couple, wedding } = themeConfig;

  return (
    <motion.section
      className="min-h-screen flex flex-col items-center justify-center px-6 py-20 bg-background relative"
      variants={stagger}
      initial="hidden"
      animate="show"
    >
      {/* Top rule */}
      <motion.div variants={fadeUp} className="w-[60px] h-[1px] bg-border mb-8" />

      {/* Invited label */}
      <motion.p
        variants={fadeUp}
        className="font-body text-[10px] tracking-[0.35em] uppercase mb-10"
        style={{ color: '#9E9488' }}
      >
        {t.invitedLabel}
      </motion.p>

      {/* Names */}
      <motion.div variants={fadeUp} className="text-center">
        <h1 className="font-display italic text-5xl sm:text-7xl text-foreground leading-tight">
          {couple.name1}
        </h1>
        <p className="font-display italic text-4xl sm:text-5xl text-accent my-4">&</p>
        <h1 className="font-display italic text-5xl sm:text-7xl text-foreground leading-tight">
          {couple.name2}
        </h1>
      </motion.div>

      {/* Date */}
      <motion.div variants={fadeUp} className="mt-10 text-center">
        <div className="w-[40px] h-[1px] bg-border mx-auto mb-4" />
        <p className="font-body text-[13px] tracking-[0.2em] uppercase text-muted-foreground">
          {t.weddingDateDisplay}
        </p>
      </motion.div>

      {/* Tagline */}
      <motion.p
        variants={fadeUp}
        className="font-display italic text-lg mt-6"
        style={{ color: '#9E9488' }}
      >
        {t.tagline}
      </motion.p>

      {/* Scroll indicator */}
      <motion.div variants={fadeUp} className="absolute bottom-12 flex flex-col items-center">
        <div className="w-[1px] bg-accent animate-scroll-line" />
      </motion.div>
    </motion.section>
  );
}
