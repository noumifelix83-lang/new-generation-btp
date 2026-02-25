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

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isTransparent
          ? 'bg-transparent py-4'
          : 'bg-white shadow-lg py-2'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <Logo light={isTransparent} size={44} />
            <div>
              <div className={`font-bold text-sm leading-tight transition-colors duration-300 ${isTransparent ? 'text-white' : 'text-green-900'}`}>
                New Generation
              </div>
              <div className={`text-xs transition-colors duration-300 ${isTransparent ? 'text-green-300' : 'text-green-500'}`}>
                Engineering BTP MS
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
                    isActive
                      ? 'bg-green-500 text-white'
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

          {/* CTA + Mobile */}
          <div className="flex items-center gap-3">
            <a
              href="tel:+237654210842"
              className={`hidden md:flex items-center gap-2 text-sm font-semibold transition-colors duration-300 ${
                isTransparent ? 'text-white hover:text-green-300' : 'text-green-900 hover:text-green-500'
              }`}
            >
              <Phone size={16} />
              654 21 08 42
            </a>
            <Link
              to="/contact"
              className="hidden md:inline-flex btn-primary text-sm py-2 px-4"
            >
              Devis Gratuit
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`lg:hidden p-2 rounded-lg transition-colors ${
                isTransparent ? 'text-white hover:bg-white/10' : 'text-green-900 hover:bg-gray-100'
              }`}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden mt-4 bg-white rounded-2xl shadow-xl p-4 border border-gray-100">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `block px-4 py-3 rounded-lg font-medium transition-colors duration-200 ${
                    isActive
                      ? 'bg-green-500 text-white'
                      : 'text-gray-700 hover:bg-green-50 hover:text-green-900'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <div className="mt-4 pt-4 border-t border-gray-100 flex flex-col gap-2">
              <a
                href="tel:+237654210842"
                className="flex items-center gap-2 px-4 py-3 text-green-900 font-semibold"
              >
                <Phone size={16} />
                654 21 08 42
              </a>
              <Link to="/contact" className="btn-primary text-center justify-center">
                Demander un Devis Gratuit
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
