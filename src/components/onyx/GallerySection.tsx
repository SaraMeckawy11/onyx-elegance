import { motion } from 'framer-motion';
import { themeConfig } from '@/config/theme.config';
import { translations } from '@/config/translations';
import { useLang } from '@/hooks/useLang';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export default function GallerySection() {
  const { lang } = useLang();
  const t = translations[lang];
  const { ref, visible } = useScrollReveal(0.05);

  return (
    <motion.section
      ref={ref}
      className="bg-card py-20 sm:py-32 px-6"
      initial={{ opacity: 0, y: 20 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-center gap-6 mb-16">
        <div className="w-16 h-[1px] bg-border" />
        <h2 className="font-display italic text-3xl sm:text-5xl text-foreground">{t.capturedMoments}</h2>
        <div className="w-16 h-[1px] bg-border" />
      </div>

      {/* Desktop: asymmetric grid, Mobile: 2-col */}
      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-3 auto-rows-[200px] md:auto-rows-[220px]">
        {themeConfig.gallery.map((src, i) => {
          // Asymmetric spans for editorial feel
          const spanClass = i === 0
            ? 'md:row-span-2'
            : i === 3
            ? 'md:row-span-2'
            : '';

          return (
            <motion.div
              key={i}
              className={`relative overflow-hidden group ${spanClass}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={visible ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              style={{ border: '1px solid #FAF8F5' }}
            >
              <img
                src={src}
                alt={`Gallery ${i + 1}`}
                className="w-full h-full object-cover gallery-filter transition-transform duration-300 group-hover:scale-[1.03]"
                loading="lazy"
              />
              {/* Gold overlay on hover */}
              <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/20 transition-colors duration-300" />
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
}
