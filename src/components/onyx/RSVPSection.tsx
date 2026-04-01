import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { translations } from '@/config/translations';
import { useLang } from '@/hooks/useLang';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export default function RSVPSection() {
  const { lang } = useLang();
  const t = translations[lang];
  const { ref, visible } = useScrollReveal();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '',
    guests: 1,
    attending: true,
    meal: 'meat',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = crypto.randomUUID();
    const existing = JSON.parse(localStorage.getItem('onyx_rsvp_data') || '[]');
    existing.push({ id, ...form, timestamp: new Date().toISOString() });
    localStorage.setItem('onyx_rsvp_data', JSON.stringify(existing));
    setSubmitted(true);
  };

  return (
    <motion.section
      ref={ref}
      className="bg-background section-padding px-6"
      initial={{ opacity: 0 }}
      animate={visible ? { opacity: 1 } : {}}
      transition={{ duration: 0.8 }}
    >
      <div className="section-divider mb-12" />

      <div className="heading-ornament mb-16">
        <h2 className="font-display italic text-3xl sm:text-5xl text-foreground">{t.rsvpHeading}</h2>
      </div>

      <div className="max-w-[520px] mx-auto">
        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              className="space-y-10"
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <input
                type="text"
                required
                placeholder={t.fullName}
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                className="input-elegant"
              />
              <input
                type="number"
                min={1}
                max={10}
                placeholder={t.guestsLabel}
                value={form.guests}
                onChange={e => setForm({ ...form, guests: Number(e.target.value) })}
                className="input-elegant"
              />

              {/* Attending toggle */}
              <div className="flex gap-4">
                {[true, false].map(val => (
                  <button
                    key={String(val)}
                    type="button"
                    onClick={() => setForm({ ...form, attending: val })}
                    className={`flex-1 py-3.5 font-body text-[11px] tracking-[0.15em] uppercase transition-all duration-500 ${
                      form.attending === val
                        ? 'bg-foreground text-primary-foreground'
                        : 'border border-border text-foreground hover:border-accent/50'
                    }`}
                    style={{ fontWeight: 300 }}
                  >
                    {val ? t.accept : t.decline}
                  </button>
                ))}
              </div>

              {/* Meal */}
              <div className="relative">
                <select
                  value={form.meal}
                  onChange={e => setForm({ ...form, meal: e.target.value })}
                  className="input-elegant appearance-none cursor-pointer"
                >
                  <option value="meat">{t.meat}</option>
                  <option value="fish">{t.fish}</option>
                  <option value="vegetarian">{t.vegetarian}</option>
                  <option value="vegan">{t.vegan}</option>
                </select>
                <svg className="absolute right-0 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-accent pointer-events-none" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2">
                  <path d="M4 6l4 4 4-4" />
                </svg>
              </div>

              <textarea
                rows={3}
                placeholder={t.message}
                value={form.message}
                onChange={e => setForm({ ...form, message: e.target.value })}
                className="input-elegant resize-none"
              />

              <motion.button
                type="submit"
                className="w-full py-4 bg-foreground text-primary-foreground font-body text-[11px] tracking-[0.25em] uppercase transition-all duration-500 hover:bg-accent"
                style={{ fontWeight: 300 }}
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.99 }}
              >
                {t.submit}
              </motion.button>
            </motion.form>
          ) : (
            <motion.div
              key="confirmation"
              className="flex flex-col items-center py-20"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', duration: 0.8 }}
            >
              {/* Checkmark seal */}
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mb-8 border border-accent/30"
                style={{ background: 'linear-gradient(135deg, hsl(var(--gold)), hsl(var(--gold-light)))' }}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="hsl(var(--bg-warm))" strokeWidth="1.5">
                  <path d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="font-display italic text-[22px] sm:text-[26px] text-foreground text-center leading-relaxed">
                {t.confirmationMessage}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  );
}
