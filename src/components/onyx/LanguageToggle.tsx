import { motion } from 'framer-motion';
import { useLang } from '@/hooks/useLang';

export default function LanguageToggle() {
  const { lang, setLang } = useLang();

  const toggle = () => {
    const next = lang === 'en' ? 'ar' : 'en';
    setLang(next);
    document.documentElement.dir = next === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = next;
  };

  return (
    <motion.button
      onClick={toggle}
      className="fixed top-5 right-5 z-[60] w-10 h-10 flex items-center justify-center bg-card/80 backdrop-blur-sm border border-border/60 font-body text-[11px] text-foreground rounded-full"
      style={{
        fontWeight: 300,
        boxShadow: '0 2px 12px hsl(var(--charcoal) / 0.06)',
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {lang === 'en' ? 'ع' : 'EN'}
    </motion.button>
  );
}
