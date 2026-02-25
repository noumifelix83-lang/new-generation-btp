import { useRef, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Phone, ChevronRight } from 'lucide-react';
import {
  Building2, Zap, Layers, FileCheck, Map, Wrench, Wind, Home
} from 'lucide-react';
import { services, getServiceById } from '../data/services';

const iconMap = { Building2, Zap, Layers, FileCheck, Map, Wrench, Wind, Home };

function AnimatedSection({ children, className = '', delay = 0 }) {
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
      el.style.transform = 'translateY(30px)';
      el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
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
      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-green-950 to-green-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1600&auto=format&fit=crop)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <span className="inline-block bg-green-500/20 border border-green-500/30 text-green-300 rounded-full px-4 py-2 text-sm font-medium mb-6">Expertise Multi-Disciplines</span>
          <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'Montserrat, system-ui, sans-serif' }}>Nos Services</h1>
          <p className="text-green-200 text-lg max-w-2xl mx-auto">
            De la conception à la livraison, notre équipe pluridisciplinaire couvre tous les aspects de vos projets de construction et d'ingénierie.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none"><path d="M0 60H1440V20C1440 20 1100 60 720 35C340 10 0 45 0 45V60Z" fill="white" /></svg>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, i) => {
              const Icon = iconMap[service.icon] || Building2;
              return (
                <AnimatedSection key={service.id} delay={i * 80}>
                  <div className="card group flex gap-6 p-6 hover:-translate-y-1 transition-transform duration-300">
                    <div className={`shrink-0 w-16 h-16 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300`}>
                      <Icon size={28} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-green-900 mb-2">{service.title}</h3>
                      <p className="text-gray-600 text-sm mb-4 leading-relaxed">{service.description}</p>
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {service.features.slice(0, 3).map((f, j) => (
                          <span key={j} className={`text-xs px-2 py-0.5 rounded-full ${service.bgColor} ${service.textColor} font-medium`}>
                            {f}
                          </span>
                        ))}
                      </div>
                      <Link
                        to={`/services/${service.id}`}
                        className="inline-flex items-center gap-1 text-green-500 font-semibold text-sm hover:gap-2 transition-all group-hover:text-green-600"
                      >
                        En savoir plus <ArrowRight size={16} />
                      </Link>
                    </div>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <AnimatedSection>
            <h2 className="text-3xl font-bold text-green-900 mb-4" style={{ fontFamily: 'Montserrat, system-ui, sans-serif' }}>
              Besoin d'un Service Spécifique ?
            </h2>
            <p className="text-gray-600 mb-8">Contactez-nous pour une étude personnalisée de votre projet.</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/contact" className="btn-primary">Demander un Devis <ArrowRight size={18} /></Link>
              <a href="tel:+237654210842" className="btn-secondary"><Phone size={18} />+237 654 21 08 42</a>
            </div>
          </AnimatedSection>
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
      <section className={`py-20 bg-gradient-to-br ${service.color} text-white relative overflow-hidden`}>
        <div className="absolute inset-0 opacity-20"
          style={{ backgroundImage: `url(${service.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-white/70 text-sm mb-6">
            <Link to="/" className="hover:text-white">Accueil</Link>
            <ChevronRight size={14} />
            <Link to="/services" className="hover:text-white">Services</Link>
            <ChevronRight size={14} />
            <span className="text-white">{service.title}</span>
          </div>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
              <Icon size={32} className="text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold" style={{ fontFamily: 'Montserrat, system-ui, sans-serif' }}>
              {service.title}
            </h1>
          </div>
          <p className="text-white/90 text-xl max-w-2xl leading-relaxed">{service.shortDesc}</p>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none"><path d="M0 60H1440V20C1440 20 1100 60 720 35C340 10 0 45 0 45V60Z" fill="white" /></svg>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main */}
            <div className="lg:col-span-2">
              <AnimatedSection>
                <h2 className="text-2xl font-bold text-green-900 mb-4">À Propos de Ce Service</h2>
                <p className="text-gray-600 leading-relaxed text-lg mb-8">{service.description}</p>

                <h3 className="text-xl font-bold text-green-900 mb-4">Ce que nous proposons</h3>
                <div className="space-y-3 mb-8">
                  {service.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl hover:bg-green-50 transition-colors">
                      <CheckCircle2 size={20} className="text-green-500 shrink-0 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full rounded-2xl shadow-lg aspect-video object-cover"
                />
              </AnimatedSection>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* CTA Card */}
              <AnimatedSection>
                <div className="bg-green-900 text-white rounded-2xl p-6 sticky top-24">
                  <h3 className="text-xl font-bold mb-3">Intéressé par ce service ?</h3>
                  <p className="text-green-200 text-sm mb-6">Contactez-nous pour une consultation gratuite et un devis personnalisé.</p>
                  <div className="space-y-3">
                    <Link to="/contact" className="btn-primary w-full justify-center">
                      Demander un Devis
                    </Link>
                    <a href="tel:+237654210842" className="flex items-center justify-center gap-2 text-white/80 hover:text-white text-sm py-2 transition-colors">
                      <Phone size={16} />
                      +237 654 21 08 42
                    </a>
                  </div>
                </div>
              </AnimatedSection>

              {/* Other services */}
              <AnimatedSection delay={150}>
                <div className="bg-gray-50 rounded-2xl p-6">
                  <h3 className="font-bold text-green-900 mb-4">Autres Services</h3>
                  <div className="space-y-3">
                    {relatedServices.map((s) => {
                      const SIcon = iconMap[s.icon] || Building2;
                      return (
                        <Link key={s.id} to={`/services/${s.id}`}
                          className="flex items-center gap-3 p-3 rounded-xl hover:bg-white hover:shadow-md transition-all duration-200 group">
                          <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${s.color} flex items-center justify-center`}>
                            <SIcon size={18} className="text-white" />
                          </div>
                          <span className="font-medium text-gray-800 group-hover:text-green-900 text-sm">{s.title}</span>
                          <ChevronRight size={16} className="ml-auto text-gray-400 group-hover:text-green-500" />
                        </Link>
                      );
                    })}
                    <Link to="/services" className="flex items-center gap-2 text-green-500 font-semibold text-sm mt-3 hover:text-green-600">
                      Voir tous les services <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export { ServicesListPage, ServiceDetailPage };
