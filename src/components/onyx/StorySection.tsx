import { motion } from 'framer-motion';
import { themeConfig } from '@/config/theme.config';
import { translations } from '@/config/translations';
import { useLang } from '@/hooks/useLang';
import { useScrollReveal } from '@/hooks/useScrollReveal';

function SectionHeading({ text }: { text: string }) {
  return (
    <div className="flex items-center justify-center gap-6 mb-16">
      <div className="w-16 h-[1px] bg-border" />
      <h2 className="font-display italic text-3xl sm:text-5xl text-foreground">{text}</h2>
      <div className="w-16 h-[1px] bg-border" />
    </div>
  );
}

function StoryCard({ item, index }: { item: typeof themeConfig.story[0]; index: number }) {
  const { ref, visible } = useScrollReveal();
  const isLeft = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      className={`relative flex flex-col md:flex-row items-center md:gap-12 mb-16 ${
        isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
      }`}
      initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
      animate={visible ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      {/* Diamond connector (desktop) */}
      <div className="hidden md:block absolute left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 bg-accent border border-card z-10" />

      <div className={`w-full md:w-5/12 ${isLeft ? 'md:text-right' : 'md:text-left'}`}>
        <div
          className="bg-card rounded-lg overflow-hidden"
          style={{ boxShadow: '0 4px 20px -4px rgba(107, 98, 89, 0.12)' }}
        >
          <div className="aspect-video overflow-hidden group">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover gallery-filter transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
          </div>
          <div className="p-6">
            <p className="font-body text-[10px] tracking-[0.3em] uppercase text-accent mb-2">
              {item.date}
            </p>
            <h3 className="font-display italic text-[22px] text-foreground mb-2">{item.title}</h3>
            <p className="font-body text-[15px] text-muted-foreground leading-[1.8]">
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
      className="bg-background py-20 sm:py-32 px-6"
      initial={{ opacity: 0, y: 20 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
    >
      <SectionHeading text={t.ourStory} />

      <div className="max-w-4xl mx-auto relative">
        {/* Vertical spine (desktop) */}
        <div className="hidden md:block absolute left-1/2 -translate-x-1/2 w-[1px] h-full bg-accent/40" />

        {themeConfig.story.map((item, i) => (
          <StoryCard key={i} item={item} index={i} />
        ))}
      </div>
    </motion.section>
  );
}
