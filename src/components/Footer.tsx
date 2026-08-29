
interface FooterProps {
  onOpenPrivacy: () => void;
}

export default function Footer({ onOpenPrivacy }: FooterProps) {
  return (
    <footer className="w-full py-8 px-8 border-t border-border/10 bg-bgNearBlack mt-12">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-semibold tracking-wider text-gray-500">
        <p>© 2026 Akshat Aswal — All rights reserved.</p>
        
        <button 
          onClick={onOpenPrivacy}
          className="hover:text-accentBlue transition-colors duration-300 uppercase tracking-widest cursor-pointer"
        >
          Privacy Policy
        </button>
      </div>
    </footer>
  );
}
