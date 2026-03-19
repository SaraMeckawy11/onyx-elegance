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
      className="bg-foreground py-20 sm:py-28 px-6 text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
    >
      <h2 className="font-display italic text-6xl sm:text-7xl text-accent mb-6">
        {themeConfig.couple.monogram}
      </h2>
      <div className="w-10 h-[1px] bg-accent/30 mx-auto mb-8" />
      <p className="font-display italic text-[22px] mb-6" style={{ color: '#FAF8F5' }}>
        {t.thankYou}
      </p>
      <p className="font-body text-[10px] tracking-[0.4em] uppercase mb-8" style={{ color: '#9E9488' }}>
        {t.weddingDateDisplay}
      </p>
      <p className="font-body text-[10px]" style={{ color: '#4A4A4A' }}>
        {t.madeWith}
      </p>
    </motion.footer>
  );
}
