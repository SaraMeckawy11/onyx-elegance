import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LangProvider } from '@/hooks/useLang';
import SplashScreen from '@/components/onyx/SplashScreen';
import HeroSection from '@/components/onyx/HeroSection';
import CountdownSection from '@/components/onyx/CountdownSection';
import StorySection from '@/components/onyx/StorySection';
import EventsSection from '@/components/onyx/EventsSection';
import RSVPSection from '@/components/onyx/RSVPSection';
import GallerySection from '@/components/onyx/GallerySection';
import FooterSection from '@/components/onyx/FooterSection';
import LanguageToggle from '@/components/onyx/LanguageToggle';
import ScrollProgress from '@/components/onyx/ScrollProgress';

export default function InvitationPage() {
  const [splashDone, setSplashDone] = useState(false);

  return (
    <LangProvider>
      <div className="paper-grain">
        <AnimatePresence>
          {!splashDone && <SplashScreen onComplete={() => setSplashDone(true)} />}
        </AnimatePresence>

        {splashDone && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ScrollProgress />
            <LanguageToggle />
            <HeroSection />
            <CountdownSection />
            <StorySection />
            <EventsSection />
            <RSVPSection />
            <GallerySection />
            <FooterSection />
          </motion.div>
        )}
      </div>
    </LangProvider>
  );
}
