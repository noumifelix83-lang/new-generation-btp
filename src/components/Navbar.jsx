import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';
import Logo from './Logo';

const navLinks = [
  { to: '/', label: 'Accueil' },
  { to: '/a-propos', label: 'À Propos' },
  { to: '/services', label: 'Services' },
  { to: '/realisations', label: 'Réalisations' },
  { to: '/catalogue', label: 'Catalogue' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const isHome = location.pathname === '/';
  const isTransparent = isHome && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setIsOpen(false); }, [location]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isTransparent
          ? 'bg-transparent py-4'
          : 'bg-white border-b border-gray-100 py-2 shadow-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 sm:gap-3 shrink-0">
            <Logo light={isTransparent} size={38} />
            <div>
              <div className={`font-bold text-xs sm:text-sm leading-tight transition-colors duration-300 ${
                isTransparent ? 'text-white' : 'text-green-900'
              }`}>
                New Generation
              </div>
              <div className={`text-xs transition-colors duration-300 ${
                isTransparent ? 'text-green-300' : 'text-green-600'
              }`}>
                Engineering BTP MS
              </div>
            </div>
          </Link>

          {/* Desktop Nav — only lg+ */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
                    isActive
                      ? 'bg-green-700 text-white'
                      : isTransparent
                      ? 'text-white/90 hover:bg-white/10 hover:text-white'
                      : 'text-gray-700 hover:bg-green-50 hover:text-green-900'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Phone — md+ only */}
            <a
              href="tel:+237654210842"
              className={`hidden md:flex items-center gap-1.5 text-sm font-semibold transition-colors duration-200 ${
                isTransparent ? 'text-white hover:text-green-300' : 'text-green-900 hover:text-green-600'
              }`}
            >
              <Phone size={14} />
              <span className="hidden xl:inline">654 21 08 42</span>
            </a>

            {/* Devis Gratuit button — lg+ only, avoids conflicts with hamburger */}
            <Link
              to="/contact"
              className={`hidden lg:flex items-center gap-2 font-semibold text-sm px-4 py-2 rounded-lg transition-all duration-200 ${
                isTransparent
                  ? 'bg-white/15 hover:bg-white/25 text-white border border-white/30'
                  : 'bg-green-700 hover:bg-green-800 text-white'
              }`}
            >
              Devis Gratuit
            </Link>

            {/* Mobile/Tablet hamburger — below lg */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Menu"
              className={`lg:hidden p-2 rounded-lg transition-colors cursor-pointer ${
                isTransparent ? 'text-white hover:bg-white/10' : 'text-green-900 hover:bg-gray-100'
              }`}
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden mt-2 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
            <nav className="p-3">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) =>
                    `flex items-center px-4 py-3 rounded-lg font-medium text-sm transition-colors duration-200 ${
                      isActive
                        ? 'bg-green-700 text-white'
                        : 'text-gray-700 hover:bg-green-50 hover:text-green-900'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>
            <div className="px-3 pb-3 pt-1 border-t border-gray-100 flex flex-col gap-2">
              <a
                href="tel:+237654210842"
                className="flex items-center gap-2 px-4 py-3 text-green-900 font-semibold text-sm"
              >
                <Phone size={15} />
                +237 654 21 08 42
              </a>
              <Link
                to="/contact"
                className="flex items-center justify-center gap-2 bg-green-700 hover:bg-green-800 text-white font-semibold text-sm px-4 py-3 rounded-lg transition-colors cursor-pointer"
              >
                Demander un Devis Gratuit
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
