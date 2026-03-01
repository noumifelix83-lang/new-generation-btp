import { Link } from 'react-router-dom';
import { Phone, MessageCircle, ArrowRight } from 'lucide-react';

export default function MobileBottomBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-white border-t border-gray-200">
      <div className="flex items-center gap-2 px-3 py-2 safe-bottom">

        {/* Appeler */}
        <a
          href="tel:+237654210842"
          className="flex flex-col items-center justify-center gap-0.5 px-4 py-2 rounded-xl text-green-900 hover:bg-green-50 active:bg-green-100 transition-colors touch-manipulation min-w-[64px]"
        >
          <Phone size={20} strokeWidth={2} />
          <span className="text-xs font-semibold">Appeler</span>
        </a>

        {/* WhatsApp */}
        <a
          href="https://wa.me/237654210842"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center gap-0.5 px-4 py-2 rounded-xl text-green-700 hover:bg-green-50 active:bg-green-100 transition-colors touch-manipulation min-w-[64px]"
        >
          <MessageCircle size={20} strokeWidth={2} />
          <span className="text-xs font-semibold">WhatsApp</span>
        </a>

        {/* Devis */}
        <Link
          to="/contact"
          className="flex-1 flex items-center justify-center gap-2 bg-green-700 hover:bg-green-800 active:bg-green-900 text-white font-bold text-sm py-3 px-4 rounded-xl transition-colors touch-manipulation"
        >
          Devis Gratuit <ArrowRight size={15} />
        </Link>

      </div>
    </div>
  );
}
