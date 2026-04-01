import { useState } from 'react';
import { motion } from 'framer-motion';
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
        {/* Content renders underneath — revealed as splash fades */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: splashDone ? 1 : 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
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

        {/* Splash overlay — fades out to reveal content */}
        <SplashScreen onComplete={() => setSplashDone(true)} />
      </div>
    </LangProvider>
  );
}
