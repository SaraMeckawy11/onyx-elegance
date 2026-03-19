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

  const inputClass = "w-full bg-transparent border-0 border-b border-border focus:border-foreground outline-none font-body text-[14px] text-foreground py-3 transition-colors duration-300 placeholder:text-muted-foreground";

  return (
    <motion.section
      ref={ref}
      className="bg-background py-20 sm:py-32 px-6"
      initial={{ opacity: 0, y: 30 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4 }}
    >
      <div className="flex items-center justify-center gap-6 mb-16">
        <div className="w-16 h-[1px] bg-border" />
        <h2 className="font-display italic text-3xl sm:text-5xl text-foreground">{t.rsvpHeading}</h2>
        <div className="w-16 h-[1px] bg-border" />
      </div>

      <div className="max-w-[560px] mx-auto">
        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              className="space-y-8"
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <input
                type="text"
                required
                placeholder={t.fullName}
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                className={inputClass}
              />
              <input
                type="number"
                min={1}
                max={10}
                placeholder={t.guestsLabel}
                value={form.guests}
                onChange={e => setForm({ ...form, guests: Number(e.target.value) })}
                className={inputClass}
              />

              {/* Attending toggle */}
              <div className="flex gap-4">
                {[true, false].map(val => (
                  <button
                    key={String(val)}
                    type="button"
                    onClick={() => setForm({ ...form, attending: val })}
                    className={`flex-1 py-3 rounded-full font-body text-[13px] tracking-[0.1em] transition-all duration-300 ${
                      form.attending === val
                        ? 'bg-foreground text-primary-foreground'
                        : 'border border-border text-foreground hover:bg-background'
                    }`}
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
                  className={`${inputClass} appearance-none cursor-pointer`}
                >
                  <option value="meat">{t.meat}</option>
                  <option value="fish">{t.fish}</option>
                  <option value="vegetarian">{t.vegetarian}</option>
                  <option value="vegan">{t.vegan}</option>
                </select>
                <svg className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 text-accent pointer-events-none" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M4 6l4 4 4-4" />
                </svg>
              </div>

              <textarea
                rows={3}
                placeholder={t.message}
                value={form.message}
                onChange={e => setForm({ ...form, message: e.target.value })}
                className={`${inputClass} resize-none`}
              />

              <button
                type="submit"
                className="w-full py-4 bg-foreground text-primary-foreground font-body text-[12px] tracking-[0.2em] uppercase rounded-lg transition-colors duration-500 hover:bg-accent"
              >
                {t.submit}
              </button>
            </motion.form>
          ) : (
            <motion.div
              key="confirmation"
              className="flex flex-col items-center py-16"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', duration: 0.6 }}
            >
              {/* Seal icon */}
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
                style={{
                  backgroundColor: '#C4A882',
                  backgroundImage: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.2) 0%, transparent 80%)',
                }}
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="#FAF8F5" strokeWidth="1.5">
                  <path d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="font-display italic text-[22px] text-foreground text-center">
                {t.confirmationMessage}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  );
}
