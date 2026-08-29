import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Contact() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      const response = await fetch('https://formspree.io/f/mljedpjq', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        // Reset success state after a few seconds
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
        // Reset error state after a few seconds
        setTimeout(() => setStatus('idle'), 5000);
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setStatus('error');
      // Reset error state after a few seconds
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const socials = [
    {
      name: 'GitHub',
      url: 'https://github.com/akshat3021',
      icon: (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
          <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
        </svg>
      )
    },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/akshat-aswal-3021m',
      icon: (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      )
    },
    {
      name: 'Email',
      url: 'mailto:akshataswal84@gmail.com',
      icon: (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
          <path d="M2 5.5A2.5 2.5 0 0 1 4.5 3h15A2.5 2.5 0 0 1 22 5.5v13a2.5 2.5 0 0 1-2.5 2.5h-15A2.5 2.5 0 0 1 2 18.5v-13zM4.5 4a1.5 1.5 0 0 0-1.5 1.5v.693l8.605 4.732a1 1 0 0 0 .79 0L21 6.193V5.5A1.5 1.5 0 0 0 19.5 4h-15zm-1.5 3.393v11.107a1.5 1.5 0 0 0 1.5 1.5h15a1.5 1.5 0 0 0 1.5-1.5V7.393l-8.118 4.465a2 2 0 0 1-1.764 0L3 7.393z" />
        </svg>
      )
    }
  ];

  return (
    <section className="py-16 md:py-24 px-4 md:px-8 text-textOffWhite max-w-6xl mx-auto relative border-t border-border/10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
        
        {/* Contact Info (Left) */}
        <div>
          <p className="text-accentBlue tracking-[0.25em] text-xs font-semibold uppercase mb-2">
            LET'S CONNECT
          </p>
          <h2 className="text-2xl md:text-4xl font-bold font-sans text-textOffWhite mb-6">
            Get in touch
          </h2>
          <p className="text-gray-400 text-base md:text-lg max-w-xl mb-10 leading-relaxed">
            I'm currently looking for Software Engineering and Full Stack Internship opportunities. Have a project in mind, or just want to chat? I'll try my best to get back to you!
          </p>

          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full border border-gray-800 bg-bgNearBlack/40 flex items-center justify-center text-accentBlue">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Location</p>
                <p className="text-textOffWhite">Dehradun, India</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full border border-gray-800 bg-bgNearBlack/40 flex items-center justify-center text-accentBlue">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Email</p>
                <a href="mailto:akshataswal84@gmail.com" className="text-textOffWhite hover:text-accentBlue transition-colors">
                  akshataswal84@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Social Icons */}
          <div className="mt-12 pt-8 border-t border-gray-800/50 flex gap-4">
            {socials.map(social => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                className="w-10 h-10 rounded-full border border-gray-800 bg-bgNearBlack/40 flex items-center justify-center text-gray-400 hover:text-accentBlue hover:border-accentBlue/50 hover:bg-accentBlue/10 transition-all duration-300"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Contact Form (Right) */}
        <div className="bg-bgNearBlack/30 border border-gray-800 rounded-2xl p-6 md:p-8 relative overflow-hidden">
          <AnimatePresence mode="wait">
            {status === 'success' ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 bg-bgNearBlack/95 backdrop-blur-sm z-10"
              >
                <div className="w-16 h-16 rounded-full bg-accentBlue/20 text-accentBlue flex items-center justify-center mb-6">
                  <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-textOffWhite mb-2">Message Sent!</h3>
                <p className="text-gray-400 text-sm">Thank you for reaching out. I'll get back to you as soon as possible.</p>
              </motion.div>
            ) : status === 'error' ? (
              <motion.div
                key="error"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 bg-bgNearBlack/95 backdrop-blur-sm z-10"
              >
                <div className="w-16 h-16 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center mb-6">
                  <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-textOffWhite mb-2">Oops!</h3>
                <p className="text-gray-400 text-sm">Something went wrong. Please try again later or email me directly.</p>
              </motion.div>
            ) : null}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-xs text-gray-400 font-semibold uppercase tracking-wider pl-1">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Akshat Aswal"
                className="w-full bg-bgNearBlack border border-gray-800 rounded-xl px-4 py-3 text-textOffWhite text-sm focus:outline-none focus:border-accentBlue/50 focus:ring-1 focus:ring-accentBlue/50 transition-all"
              />
            </div>
            
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-xs text-gray-400 font-semibold uppercase tracking-wider pl-1">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="akshat@example.com"
                className="w-full bg-bgNearBlack border border-gray-800 rounded-xl px-4 py-3 text-textOffWhite text-sm focus:outline-none focus:border-accentBlue/50 focus:ring-1 focus:ring-accentBlue/50 transition-all"
              />
            </div>
            
            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="text-xs text-gray-400 font-semibold uppercase tracking-wider pl-1">Message</label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                value={formData.message}
                onChange={handleChange}
                placeholder="Hello Akshat, I'd like to discuss..."
                className="w-full bg-bgNearBlack border border-gray-800 rounded-xl px-4 py-3 text-textOffWhite text-sm focus:outline-none focus:border-accentBlue/50 focus:ring-1 focus:ring-accentBlue/50 transition-all resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={status === 'loading'}
              className="mt-4 w-full py-3.5 rounded-xl bg-accentBlue text-bgNearBlack font-bold text-sm hover:bg-accentBlue/90 active:scale-[0.98] transition-all duration-300 shadow-[0_0_15px_rgba(110,168,232,0.2)] disabled:opacity-70 disabled:active:scale-100 flex justify-center items-center gap-2 cursor-pointer"
            >
              {status === 'loading' ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-bgNearBlack" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </>
              ) : (
                'Say hi ↗'
              )}
            </button>
          </form>
        </div>

      </div>
    </section>
  );
}
