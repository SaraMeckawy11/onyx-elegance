import { motion } from 'framer-motion';
import { themeConfig } from '@/config/theme.config';
import { translations } from '@/config/translations';
import { useLang } from '@/hooks/useLang';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export default function FooterSection() {
  const { lang } = useLang();
  const t = translations[lang];
  const { ref, visible } = useScrollReveal();

  return (
    <motion.footer
      ref={ref}
      className="relative bg-foreground py-24 sm:py-32 px-6 text-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={visible ? { opacity: 1 } : {}}
      transition={{ duration: 0.8 }}
    >
      {/* Corner ornaments */}
      <div className="absolute top-6 left-6 w-8 h-8 border-t border-l border-accent/15" />
      <div className="absolute top-6 right-6 w-8 h-8 border-t border-r border-accent/15" />
      <div className="absolute bottom-6 left-6 w-8 h-8 border-b border-l border-accent/15" />
      <div className="absolute bottom-6 right-6 w-8 h-8 border-b border-r border-accent/15" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={visible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <h2 className="font-display italic text-6xl sm:text-7xl text-accent mb-8">
          {themeConfig.couple.monogram}
        </h2>

        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-8 h-px bg-accent/20" />
          <div className="w-1.5 h-1.5 rotate-45 bg-accent/30" />
          <div className="w-8 h-px bg-accent/20" />
        </div>

        <p className="font-display italic text-[20px] sm:text-[24px] mb-8 text-primary-foreground/90 leading-relaxed">
          {t.thankYou}
        </p>

        <p
          className="font-body text-[9px] tracking-[0.45em] uppercase mb-10 text-muted-foreground/60"
          style={{ fontWeight: 200 }}
        >
          {t.weddingDateDisplay}
        </p>

        <p className="font-body text-[9px] text-muted-foreground/30" style={{ fontWeight: 200 }}>
          {t.madeWith}
        </p>
      </motion.div>
    </motion.footer>
  );
}
