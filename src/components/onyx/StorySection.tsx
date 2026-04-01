import { motion } from 'framer-motion';
import { themeConfig } from '@/config/theme.config';
import { translations } from '@/config/translations';
import { useLang } from '@/hooks/useLang';
import { useScrollReveal } from '@/hooks/useScrollReveal';

function StoryCard({ item, index }: { item: typeof themeConfig.story[0]; index: number }) {
  const { ref, visible } = useScrollReveal(0.1);
  const isLeft = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      className={`relative flex flex-col md:flex-row items-center md:gap-16 mb-20 md:mb-24 ${
        isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
      }`}
      initial={{ opacity: 0, y: 40 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {/* Diamond connector on timeline spine (desktop) */}
      <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 border border-accent/60 bg-card z-10 items-center justify-center">
        <div className="w-1 h-1 rotate-45 bg-accent/40" />
      </div>

      <div className={`w-full md:w-5/12 ${isLeft ? 'md:text-right' : 'md:text-left'}`}>
        <div className="bg-card rounded overflow-hidden border border-border/50 group"
          style={{ boxShadow: '0 8px 32px -8px hsl(var(--charcoal) / 0.08)' }}
        >
          <div className="aspect-[16/10] overflow-hidden">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover gallery-filter transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              loading="lazy"
            />
          </div>
          <div className="p-6 sm:p-8">
            <p className="font-body text-[9px] tracking-[0.4em] uppercase text-accent mb-3" style={{ fontWeight: 300 }}>
              {item.date}
            </p>
            <h3 className="font-display italic text-[24px] sm:text-[28px] text-foreground mb-3 leading-tight">{item.title}</h3>
            <p className="font-body text-[14px] text-muted-foreground leading-[1.9]" style={{ fontWeight: 300 }}>
              {item.description}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function StorySection() {
  const { lang } = useLang();
  const t = translations[lang];
  const { ref, visible } = useScrollReveal();

  return (
    <motion.section
      ref={ref}
      className="bg-background section-padding px-6"
      initial={{ opacity: 0 }}
      animate={visible ? { opacity: 1 } : {}}
      transition={{ duration: 0.8 }}
    >
      {/* Section divider */}
      <div className="section-divider mb-12" />

      <div className="heading-ornament mb-16">
        <h2 className="font-display italic text-3xl sm:text-5xl text-foreground">{t.ourStory}</h2>
      </div>

      <div className="max-w-4xl mx-auto relative">
        {/* Vertical spine (desktop) */}
        <div className="hidden md:block absolute left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-transparent via-accent/25 to-transparent" />

        {themeConfig.story.map((item, i) => (
          <StoryCard key={i} item={item} index={i} />
        ))}
      </div>
    </motion.section>
  );
}
