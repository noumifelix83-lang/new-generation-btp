import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, ArrowRight } from 'lucide-react';
import Logo from './Logo';

const services = [
  { label: 'Génie Civil', to: '/services/genie-civil' },
  { label: 'Génie Électrique', to: '/services/genie-electrique' },
  { label: 'Architecture', to: '/services/architecture' },
  { label: 'Permis de Bâtir', to: '/services/permis-batir' },
  { label: 'Topographie', to: '/services/topographie' },
  { label: 'Rénovation', to: '/services/renovation' },
  { label: 'Froid & Clim', to: '/services/froid-clim' },
  { label: 'Immobilier', to: '/services/immobilier' },
];

export default function Footer() {
  return (
    <footer className="bg-green-950 text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <Logo light={true} size={48} />
              <div>
                <div className="font-bold text-base">New Generation</div>
                <div className="text-green-400 text-sm">Engineering BTP MS</div>
              </div>
            </div>
            <p className="text-green-200 text-sm leading-relaxed mb-6">
              Bureau d'étude multi-services spécialisé en génie civil, électrique, architecture et topographie. Votre partenaire de confiance pour tous vos projets de construction au Cameroun.
            </p>
            <div className="flex gap-3">
              {[
                { label: 'f', title: 'Facebook' },
                { label: 'in', title: 'LinkedIn' },
                { label: 'ig', title: 'Instagram' },
              ].map((s) => (
                <a key={s.title} href="#" title={s.title}
                  className="w-9 h-9 bg-green-800 hover:bg-green-500 rounded-lg flex items-center justify-center transition-colors duration-300 text-xs font-bold">
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white">Nos Services</h3>
            <ul className="space-y-2">
              {services.map((s) => (
                <li key={s.to}>
                  <Link
                    to={s.to}
                    className="text-green-200 hover:text-green-400 text-sm flex items-center gap-2 transition-colors duration-200 group"
                  >
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Liens rapides */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white">Liens Rapides</h3>
            <ul className="space-y-2">
              {[
                { label: 'Accueil', to: '/' },
                { label: 'À Propos', to: '/a-propos' },
                { label: 'Réalisations', to: '/realisations' },
                { label: 'Catalogue Architectural', to: '/catalogue' },
                { label: 'Devis Gratuit', to: '/contact' },
              ].map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-green-200 hover:text-green-400 text-sm flex items-center gap-2 transition-colors duration-200 group"
                  >
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone size={16} className="text-green-400 mt-0.5 shrink-0" />
                <div>
                  <a href="tel:+237654210842" className="text-green-200 hover:text-green-400 text-sm transition-colors">
                    +237 654 21 08 42
                  </a>
                  <br />
                  <a href="tel:+237671547984" className="text-green-200 hover:text-green-400 text-sm transition-colors">
                    +237 671 54 79 84
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={16} className="text-green-400 mt-0.5 shrink-0" />
                <a href="mailto:generationnouvelle@gmail.com" className="text-green-200 hover:text-green-400 text-sm transition-colors">
                  generationnouvelle@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-green-400 mt-0.5 shrink-0" />
                <span className="text-green-200 text-sm">
                  Yaoundé, Cameroun
                </span>
              </li>
            </ul>
            <div className="mt-6 p-4 bg-green-900 rounded-xl">
              <p className="text-green-200 text-xs mb-2">Heures d'ouverture</p>
              <p className="text-white text-sm font-medium">Lun – Sam : 7h30 – 18h00</p>
              <p className="text-green-200 text-xs mt-1">Urgences disponibles 24h/24</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-green-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-green-300 text-sm text-center">
            © {new Date().getFullYear()} New Generation Engineering BTP MS. Tous droits réservés.
          </p>
          <p className="text-green-400 text-xs">
            Fondée en 2016 · Yaoundé, Cameroun
          </p>
        </div>
      </div>
    </footer>
  );
}
