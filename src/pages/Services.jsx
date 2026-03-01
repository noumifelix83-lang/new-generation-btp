import { useRef, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Phone, ChevronRight } from 'lucide-react';
import {
  Building2, Zap, Layers, FileCheck, Map, Wrench, Wind, Home
} from 'lucide-react';
import { services, getServiceById } from '../data/services';

const iconMap = { Building2, Zap, Layers, FileCheck, Map, Wrench, Wind, Home };

function FadeIn({ children, className = '', delay = 0 }) {
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }, delay);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    const el = ref.current;
    if (el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      observer.observe(el);
    }
    return () => { if (el) observer.unobserve(el); };
  }, [delay]);
  return <div ref={ref} className={className}>{children}</div>;
}

// ============================
// Page liste des services
// ============================
function ServicesListPage() {
  return (
    <div className="min-h-screen pt-16">

      {/* Hero with background image */}
      <section className="relative py-16 sm:py-20 text-white overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/4442490/pexels-photo-4442490.jpeg?auto=compress&cs=tinysrgb&w=1600)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-green-950/85" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <p className="text-green-400 text-xs sm:text-sm font-semibold uppercase tracking-widest mb-3">Expertise Multi-Disciplines</p>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">Nos Services</h1>
          <p className="text-green-200 text-base max-w-2xl mx-auto">
            De la conception à la livraison, notre équipe pluridisciplinaire couvre tous les aspects de vos projets.
          </p>
        </div>
      </section>

      {/* Services — image cards grid (3 cols desktop) */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="h-px w-12 bg-gray-300" />
              <span className="text-xs uppercase tracking-widest text-gray-400 font-semibold">Expertise</span>
              <div className="h-px w-12 bg-gray-300" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-green-900 uppercase tracking-wide">
              Nos Services
            </h2>
          </div>

          {/* Cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {services.map((service, i) => {
              const Icon = iconMap[service.icon] || Building2;
              return (
                <FadeIn key={service.id} delay={i * 50}>
                  <Link
                    to={`/services/${service.id}`}
                    className="group flex flex-col bg-white hover:shadow-lg transition-shadow duration-300"
                  >
                    {/* Image */}
                    <div className="relative overflow-hidden aspect-[4/3]">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {/* Dark overlay on hover */}
                      <div className="absolute inset-0 bg-green-950/0 group-hover:bg-green-950/30 transition-colors duration-300" />
                    </div>

                    {/* Content */}
                    <div className="pt-4 pb-5 px-2">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-7 h-7 rounded bg-green-900 flex items-center justify-center shrink-0 group-hover:bg-green-700 transition-colors">
                          <Icon size={14} className="text-white" />
                        </div>
                        <h3 className="font-bold text-green-900 text-sm uppercase tracking-wide group-hover:text-green-700 transition-colors">
                          {service.title}
                        </h3>
                      </div>
                      <p className="text-gray-500 text-sm leading-relaxed line-clamp-3">
                        {service.shortDesc}
                      </p>
                      <div className="flex items-center gap-1 text-green-600 text-xs font-semibold mt-3 group-hover:gap-2 transition-all">
                        En savoir plus <ArrowRight size={12} />
                      </div>
                    </div>
                  </Link>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-14 text-white overflow-hidden">
        <div className="absolute inset-0 bg-green-900" />
        <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-3">Besoin d'un Service Spécifique ?</h2>
          <p className="text-green-200 mb-8">Contactez-nous pour une étude personnalisée de votre projet.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="btn-primary px-8 py-4">Demander un Devis <ArrowRight size={16} /></Link>
            <a href="tel:+237654210842" className="btn-outline-white px-8 py-4"><Phone size={16} />+237 654 21 08 42</a>
          </div>
        </div>
      </section>
    </div>
  );
}

// ============================
// Page détail d'un service
// ============================
function ServiceDetailPage() {
  const { id } = useParams();
  const service = getServiceById(id);
  const Icon = service ? (iconMap[service.icon] || Building2) : Building2;

  if (!service) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-green-900 mb-4">Service introuvable</h2>
          <Link to="/services" className="btn-primary">Voir tous les services</Link>
        </div>
      </div>
    );
  }

  const relatedServices = services.filter(s => s.id !== service.id).slice(0, 3);

  return (
    <div className="min-h-screen pt-16">
      {/* Hero */}
      <section className="relative py-14 sm:py-16 text-white overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${service.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-green-950/85" />
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-green-400 text-xs mb-6 flex-wrap">
            <Link to="/" className="hover:text-white transition-colors">Accueil</Link>
            <ChevronRight size={12} />
            <Link to="/services" className="hover:text-white transition-colors">Services</Link>
            <ChevronRight size={12} />
            <span className="text-white">{service.title}</span>
          </div>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white/15 rounded-xl flex items-center justify-center shrink-0">
              <Icon size={26} className="text-white" />
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">{service.title}</h1>
          </div>
          <p className="text-green-200 text-base sm:text-lg max-w-2xl">{service.shortDesc}</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 sm:py-14 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-10">
            {/* Main */}
            <div className="lg:col-span-2">
              <FadeIn>
                <p className="text-gray-600 leading-relaxed text-base mb-8">{service.description}</p>
                <h3 className="text-lg font-bold text-green-900 mb-4">Ce que nous proposons</h3>
                <div className="divide-y divide-gray-100 mb-8">
                  {service.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-3 py-3">
                      <CheckCircle2 size={18} className="text-green-600 shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full rounded-xl shadow-sm aspect-video object-cover"
                />
              </FadeIn>
            </div>

            {/* Sidebar */}
            <div className="space-y-5">
              <FadeIn>
                <div className="bg-green-950 text-white rounded-xl p-6 sticky top-24">
                  <h3 className="text-lg font-bold mb-2">Intéressé par ce service ?</h3>
                  <p className="text-green-300 text-sm mb-5">Consultation gratuite et devis personnalisé.</p>
                  <div className="space-y-3">
                    <Link to="/contact" className="btn-primary w-full justify-center">
                      Demander un Devis
                    </Link>
                    <a href="tel:+237654210842" className="flex items-center justify-center gap-2 text-green-300 hover:text-white text-sm py-2 transition-colors">
                      <Phone size={15} />
                      +237 654 21 08 42
                    </a>
                  </div>
                </div>
              </FadeIn>

              <FadeIn delay={100}>
                <div className="bg-gray-50 rounded-xl p-5">
                  <h3 className="font-bold text-green-900 mb-4 text-sm uppercase tracking-wider">Autres Services</h3>
                  <div className="space-y-2">
                    {relatedServices.map((s) => {
                      const SIcon = iconMap[s.icon] || Building2;
                      return (
                        <Link key={s.id} to={`/services/${s.id}`}
                          className="flex items-center gap-3 p-3 rounded-lg hover:bg-white hover:shadow-sm transition-all duration-200 group">
                          <div className="w-9 h-9 rounded-lg bg-green-900 flex items-center justify-center group-hover:bg-green-700 transition-colors shrink-0">
                            <SIcon size={16} className="text-white" />
                          </div>
                          <span className="font-medium text-gray-700 group-hover:text-green-900 text-sm flex-1">{s.title}</span>
                          <ChevronRight size={14} className="text-gray-400 shrink-0" />
                        </Link>
                      );
                    })}
                    <Link to="/services" className="flex items-center gap-1 text-green-600 font-semibold text-sm mt-2 hover:text-green-700">
                      Voir tous <ArrowRight size={13} />
                    </Link>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export { ServicesListPage, ServiceDetailPage };
