import React from 'react';
import { useReducedMotion } from 'framer-motion';

export default function NoiseOverlay() {
  const [noiseUrl, setNoiseUrl] = React.useState('');
  const shouldReduceMotion = useReducedMotion();

  React.useEffect(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const imgData = ctx.createImageData(128, 128);
    const data = imgData.data;
    for (let i = 0; i < data.length; i += 4) {
      const val = Math.floor(Math.random() * 255);
      data[i] = val;
      data[i + 1] = val;
      data[i + 2] = val;
      data[i + 3] = 30; // opacity of noise particles
    }
    ctx.putImageData(imgData, 0, 0);
    setNoiseUrl(canvas.toDataURL());
  }, []);

  if (!noiseUrl) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 mix-blend-overlay overflow-hidden select-none">
      <div
        className="absolute w-[300%] h-[300%] -left-[100%] -top-[100%] opacity-[0.18]"
        style={{
          backgroundImage: `url(${noiseUrl})`,
          backgroundRepeat: 'repeat',
          animation: shouldReduceMotion ? 'none' : 'noiseShift 1s steps(4) infinite',
        }}
      />
    </div>
  );
}
