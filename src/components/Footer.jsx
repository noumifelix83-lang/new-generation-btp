import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin } from 'lucide-react';
import Logo from './Logo';

const serviceLinks = [
  { label: 'Génie Civil', to: '/services/genie-civil' },
  { label: 'Génie Électrique', to: '/services/genie-electrique' },
  { label: 'Architecture', to: '/services/architecture' },
  { label: 'Permis de Bâtir', to: '/services/permis-batir' },
  { label: 'Topographie', to: '/services/topographie' },
  { label: 'Rénovation', to: '/services/renovation' },
  { label: 'Froid & Clim', to: '/services/froid-clim' },
  { label: 'Immobilier', to: '/services/immobilier' },
];

const quickLinks = [
  { label: 'Accueil', to: '/' },
  { label: 'À Propos', to: '/a-propos' },
  { label: 'Réalisations', to: '/realisations' },
  { label: 'Catalogue', to: '/catalogue' },
  { label: 'Contact', to: '/contact' },
];

export default function Footer() {
  return (
    <footer className="bg-green-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <Logo light={true} size={44} />
              <div>
                <div className="font-bold text-sm">New Generation</div>
                <div className="text-green-400 text-xs">Engineering BTP MS</div>
              </div>
            </div>
            <p className="text-green-300 text-sm leading-relaxed mb-5">
              Bureau d'étude multi-services spécialisé en génie civil, électrique, architecture et topographie. Votre partenaire au Cameroun depuis 2016.
            </p>
            <div className="text-green-400 text-xs">
              Lun – Sam : 7h30 – 18h00
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-green-400 mb-5">Nos Services</h3>
            <ul className="space-y-2">
              {serviceLinks.map((s) => (
                <li key={s.to}>
                  <Link to={s.to} className="text-green-200 hover:text-white text-sm transition-colors duration-200">
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Liens rapides */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-green-400 mb-5">Navigation</h3>
            <ul className="space-y-2">
              {quickLinks.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-green-200 hover:text-white text-sm transition-colors duration-200">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-green-400 mb-5">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone size={15} className="text-green-400 mt-0.5 shrink-0" />
                <div className="text-sm">
                  <a href="tel:+237654210842" className="text-green-200 hover:text-white transition-colors block">
                    +237 654 21 08 42
                  </a>
                  <a href="tel:+237671547984" className="text-green-200 hover:text-white transition-colors block">
                    +237 671 54 79 84
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={15} className="text-green-400 mt-0.5 shrink-0" />
                <a href="mailto:generationnouvelle@gmail.com" className="text-green-200 hover:text-white text-sm transition-colors">
                  generationnouvelle@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={15} className="text-green-400 mt-0.5 shrink-0" />
                <span className="text-green-200 text-sm">Yaoundé, Cameroun</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-green-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-green-400 text-xs">
            © {new Date().getFullYear()} New Generation Engineering BTP MS. Tous droits réservés.
          </p>
          <p className="text-green-600 text-xs">Fondée en 2016 · Yaoundé, Cameroun</p>
        </div>
      </div>
    </footer>
  );
}
