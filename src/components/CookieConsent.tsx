import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CookieConsentProps {
  onOpenPrivacy: () => void;
}

export default function CookieConsent({ onOpenPrivacy }: CookieConsentProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasConsented = localStorage.getItem('cookieConsent');
    if (!hasConsented) {
      // Small delay so it doesn't pop up instantly on first paint
      const timer = setTimeout(() => setIsVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'true');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 pointer-events-none flex justify-center"
        >
          <div className="pointer-events-auto bg-bgNearBlack/90 backdrop-blur-xl border border-gray-800 rounded-2xl shadow-[0_-10px_40px_rgba(0,0,0,0.5)] p-4 md:p-6 w-full max-w-4xl flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-300 font-sans leading-relaxed flex-1">
              By continuing to use this site, you agree to our{' '}
              <button
                onClick={onOpenPrivacy}
                className="text-accentBlue hover:underline font-semibold cursor-pointer"
              >
                Privacy Policy
              </button>. We use minimal local storage to remember your preferences.
            </p>
            <button
              onClick={handleAccept}
              className="px-6 py-2.5 rounded-full bg-accentBlue text-bgNearBlack font-bold text-xs uppercase tracking-wider hover:bg-accentBlue/90 active:scale-[0.98] transition-all duration-300 whitespace-nowrap cursor-pointer shadow-[0_0_15px_rgba(110,168,232,0.2)]"
            >
              I Accept
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
