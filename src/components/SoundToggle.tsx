import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Howl } from 'howler';
import ambientAudio from '../assets/audio/ambient.mp3';

export default function SoundToggle() {
  const [introCompleted, setIntroCompleted] = React.useState(() => {
    return sessionStorage.getItem('hasStarted') === 'true';
  });
  const [isPlaying, setIsPlaying] = React.useState(false);
  const soundRef = React.useRef<Howl | null>(null);

  React.useEffect(() => {
    const handleIntroComplete = () => {
      setIntroCompleted(true);
    };

    window.addEventListener('intro-completed', handleIntroComplete);
    return () => {
      window.removeEventListener('intro-completed', handleIntroComplete);
    };
  }, []);

  React.useEffect(() => {
    if (!introCompleted) return;

    // Load ambient audio from assets directory using Vite import
    soundRef.current = new Howl({
      src: [ambientAudio],
      format: ['mp3'],
      html5: true, // Use <audio> tag (more forgiving of file encoding issues than Web Audio API)
      loop: true,
      volume: 0.5, // Start at 0.5 since we fade from 0
      onloaderror: (_id, err) => console.error('Howler load error:', err),
      onplayerror: (_id, err) => {
        console.error('Howler play error:', err);
        soundRef.current?.once('unlock', () => {
          soundRef.current?.play();
        });
      }
    });

    return () => {
      if (soundRef.current) {
        soundRef.current.unload();
      }
    };
  }, [introCompleted]);

  const toggleSound = () => {
    if (!soundRef.current) return;

    if (isPlaying) {
      // Fade out from current volume to 0 over 1s, then pause
      const currentVol = soundRef.current.volume();
      soundRef.current.fade(currentVol, 0, 1000);
      
      const sound = soundRef.current;
      setTimeout(() => {
        if (sound.volume() === 0) {
          sound.pause();
        }
      }, 1000);
      setIsPlaying(false);
    } else {
      // Play and fade in from 0 to 0.5 over 1s
      soundRef.current.play();
      soundRef.current.fade(0, 0.5, 1000);
      setIsPlaying(true);
    }
  };

  const speakerPlayingSvg = (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
      <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/>
    </svg>
  );

  const speakerMutedSvg = (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
      <path d="M4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v1.52c1.24-.27 2.38-.85 3.33-1.63L19.73 21 21 19.73 4.27 3zM12 4L9.91 6.09 12 8.18V4zm4.5 8c0-.68-.15-1.32-.42-1.9l1.1-1.1c.51.91.82 1.95.82 3.06 0 2.22-1.2 4.14-3 5.16v-1.55c1.07-.71 1.5-1.95 1.5-3.67z"/>
    </svg>
  );

  return (
    <AnimatePresence>
      {introCompleted && (
        <div className="fixed bottom-6 right-6 z-40 flex flex-col items-center gap-1.5 select-none pointer-events-auto">
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
            onClick={toggleSound}
            aria-label="Toggle background music"
            className="w-11 h-11 rounded-full bg-bgNearBlack/60 backdrop-blur-md border border-accentBlue/30 hover:border-accentBlue text-accentBlue hover:text-textOffWhite hover:bg-accentBlue/10 transition-all duration-300 flex items-center justify-center cursor-pointer relative shadow-[0_0_12px_rgba(110,168,232,0.08)]"
            title={isPlaying ? "Mute music" : "Play ambient music"}
          >
            {/* Pulse ping animation around the ring button */}
            <span className="absolute inset-0 rounded-full border border-accentBlue/30 animate-ping opacity-60 pointer-events-none" />
            
            {isPlaying ? speakerPlayingSvg : speakerMutedSvg}
          </motion.button>
          
          <AnimatePresence>
            {!isPlaying && (
              <motion.span
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="text-[9px] tracking-[0.25em] uppercase text-gray-500 font-bold text-center pointer-events-none whitespace-nowrap bg-bgNearBlack/40 backdrop-blur-sm px-2 py-0.5 rounded border border-gray-800/20"
              >
                Click to enable sound
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      )}
    </AnimatePresence>
  );
}
