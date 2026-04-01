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
      className="bg-card section-padding px-6"
      initial={{ opacity: 0 }}
      animate={visible ? { opacity: 1 } : {}}
      transition={{ duration: 0.8 }}
    >
      <div className="section-divider mb-12" />

      <div className="heading-ornament mb-16">
        <h2 className="font-display italic text-3xl sm:text-5xl text-foreground">{t.capturedMoments}</h2>
      </div>

      {/* Masonry-like grid */}
      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3">
        {themeConfig.gallery.map((src, i) => {
          const spanClass = i === 0
            ? 'md:row-span-2'
            : i === 3
            ? 'md:row-span-2'
            : '';

          return (
            <motion.div
              key={i}
              className={`relative overflow-hidden group ${spanClass}`}
              style={{ minHeight: spanClass ? undefined : '200px' }}
              initial={{ opacity: 0, y: 20 }}
              animate={visible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.07 }}
            >
              <img
                src={src}
                alt={`Gallery ${i + 1}`}
                className="w-full h-full object-cover gallery-filter transition-all duration-700 ease-out group-hover:scale-[1.04] group-hover:brightness-105"
                loading="lazy"
              />
              {/* Soft gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/0 via-transparent to-transparent group-hover:from-foreground/10 transition-all duration-500" />
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
}
