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
      className="fixed top-5 right-5 z-[60] px-4 py-2 rounded-full bg-card border border-border font-body text-[12px] text-foreground"
      style={{ boxShadow: '0 4px 16px rgba(107, 98, 89, 0.1)' }}
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.98 }}
    >
      {lang === 'en' ? 'ع' : 'EN'}
    </motion.button>
  );
}
