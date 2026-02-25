import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import {
  ArrowRight, CheckCircle2, ChevronRight, Star,
  Building2, Zap, Layers, FileCheck, Map, Wrench, Wind, Home,
  Users, Award, Clock, TrendingUp, Phone, Quote
} from 'lucide-react';
import { services } from '../data/services';
import { projects } from '../data/projects';

const iconMap = { Building2, Zap, Layers, FileCheck, Map, Wrench, Wind, Home };

function AnimatedSection({ children, className = '' }) {
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    const el = ref.current;
    if (el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(40px)';
      el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
      observer.observe(el);
    }
    return () => { if (el) observer.unobserve(el); };
  }, []);
  return <div ref={ref} className={className}>{children}</div>;
}

const stats = [
  { icon: Users, value: '150+', label: 'Clients Satisfaits', color: 'text-green-600' },
  { icon: Award, value: '200+', label: 'Projets Réalisés', color: 'text-green-500' },
  { icon: Clock, value: '8+', label: 'Années d\'Expérience', color: 'text-green-600' },
  { icon: TrendingUp, value: '8', label: 'Experts Multi-Services', color: 'text-purple-600' },
];

const testimonials = [
  {
    name: 'Jean-Baptiste Nkomo',
    role: 'Promoteur Immobilier, Douala',
    text: 'New Generation BTP a dépassé nos attentes. Leur équipe est professionnelle, rigoureuse et respecte les délais. Je recommande vivement leurs services.',
    rating: 5,
  },
  {
    name: 'Dr. Amina Seck',
    role: 'Directrice de Clinique, Yaoundé',
    text: 'Excellent travail pour notre centre médical. Les études techniques étaient précises et le suivi de chantier exemplaire. Merci à toute l\'équipe !',
    rating: 5,
  },
  {
    name: 'Paul Mbarga',
    role: 'Particulier, Ngaoundéré',
    text: 'Très content de ma villa ! Le plan était exactement ce que je voulais et la réalisation est de grande qualité. Prix compétitifs et équipe disponible.',
    rating: 5,
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* ========== HERO ========== */}
      <section
        className="relative min-h-screen flex items-center overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #052e16 0%, #14532d 40%, #166534 100%)',
        }}
      >
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        {/* Background image overlay */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/5298215/pexels-photo-5298215.jpeg?auto=compress&cs=tinysrgb&w=1600)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-green-500/20 border border-green-500/30 text-green-300 rounded-full px-4 py-2 text-sm font-medium mb-6">
                <Star size={14} className="fill-green-400 text-green-400" />
                Bureau d'Étude Multi-Services depuis 2016
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
                  style={{ fontFamily: 'Montserrat, system-ui, sans-serif' }}>
                Bâtissons
                <span className="text-green-400 block">l'Avenir</span>
                Ensemble
              </h1>

              <p className="text-green-100 text-lg leading-relaxed mb-8 max-w-lg">
                New Generation Engineering BTP MS — votre partenaire de confiance pour tous vos projets de construction, d'ingénierie et d'architecture au Cameroun.
              </p>

              <div className="flex flex-wrap gap-3 mb-10">
                {['Génie Civil', 'Architecture', 'Topographie', 'Permis de Bâtir'].map((s) => (
                  <div key={s} className="flex items-center gap-1.5 text-green-200 text-sm">
                    <CheckCircle2 size={16} className="text-green-400" />
                    {s}
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Link to="/contact" className="btn-primary text-base px-8 py-4 w-full sm:w-auto justify-center">
                  Demander un Devis
                  <ArrowRight size={18} />
                </Link>
                <Link to="/realisations" className="btn-outline-white text-base px-8 py-4 w-full sm:w-auto justify-center">
                  Nos Réalisations
                </Link>
              </div>
            </div>

            {/* Stats cards */}
            <div className="hidden lg:grid grid-cols-2 gap-4">
              {stats.map((s, i) => {
                const Icon = s.icon;
                return (
                  <div key={i} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-white hover:bg-white/15 transition-all duration-300">
                    <Icon size={32} className={s.color + ' mb-3'} />
                    <div className="text-3xl font-bold">{s.value}</div>
                    <div className="text-green-200 text-sm mt-1">{s.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 80H1440V30C1440 30 1100 80 720 50C340 20 0 60 0 60V80Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* ========== STATS (mobile) ========== */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((s, i) => {
              const Icon = s.icon;
              return (
                <AnimatedSection key={i} className="text-center p-6 rounded-2xl bg-gray-50 hover:bg-green-50 transition-colors duration-300">
                  <Icon size={36} className={`${s.color} mx-auto mb-3`} />
                  <div className="text-3xl font-bold text-green-900">{s.value}</div>
                  <div className="text-gray-600 text-sm mt-1">{s.label}</div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========== SERVICES ========== */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-14">
            <span className="inline-block bg-green-100 text-green-600 font-semibold text-sm px-4 py-1.5 rounded-full mb-4">Nos Domaines d'Expertise</span>
            <h2 className="section-title">Des Services Multi-Disciplines</h2>
            <p className="section-subtitle mx-auto text-center">
              De la conception à la livraison, notre équipe d'ingénieurs qualifiés couvre tous les aspects de votre projet de construction.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, i) => {
              const Icon = iconMap[service.icon] || Building2;
              return (
                <AnimatedSection key={service.id} style={{ transitionDelay: `${i * 0.08}s` }}>
                  <Link
                    to={`/services/${service.id}`}
                    className="card group p-6 hover:-translate-y-1 transition-transform duration-300 block h-full"
                  >
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition-transform duration-300`}>
                      <Icon size={26} className="text-white" />
                    </div>
                    <h3 className="font-bold text-green-900 text-lg mb-2">{service.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">{service.shortDesc}</p>
                    <div className="flex items-center gap-1 text-green-500 text-sm font-semibold group-hover:gap-2 transition-all">
                      En savoir plus <ChevronRight size={16} />
                    </div>
                  </Link>
                </AnimatedSection>
              );
            })}
          </div>

          <AnimatedSection className="text-center mt-10">
            <Link to="/services" className="btn-secondary">
              Voir tous nos services
              <ArrowRight size={18} />
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* ========== WHY US ========== */}
      <section className="py-20 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection>
              <span className="inline-block bg-green-100 text-green-700 font-semibold text-sm px-4 py-1.5 rounded-full mb-4">Pourquoi Nous Choisir</span>
              <h2 className="section-title">L'Excellence au Cœur de Chaque Projet</h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Fondée en 2016 par M. DJOMO Aubin, New Generation Engineering BTP MS s'est imposée comme un bureau d'étude de référence au Cameroun. Notre force réside dans notre équipe pluridisciplinaire d'ingénieurs qualifiés.
              </p>

              <div className="space-y-4">
                {[
                  { title: 'Équipe Pluridisciplinaire', desc: 'Ingénieurs en génie civil, électrique, architectes et topographes qualifiés.' },
                  { title: 'Qualité & Rigueur', desc: 'Chaque projet est réalisé avec les plus hauts standards techniques et professionnels.' },
                  { title: 'Accompagnement Complet', desc: 'De l\'étude de faisabilité à la réception des travaux, nous vous accompagnons à chaque étape.' },
                  { title: 'Délais Respectés', desc: 'Notre planification rigoureuse garantit le respect de vos délais et budget.' },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 p-4 rounded-xl hover:bg-green-50 transition-colors duration-200">
                    <CheckCircle2 size={22} className="text-green-500 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-green-900">{item.title}</h4>
                      <p className="text-gray-600 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-8">
                <Link to="/a-propos" className="btn-primary w-full sm:w-auto justify-center">
                  En Savoir Plus
                  <ArrowRight size={18} />
                </Link>
                <a href="tel:+237654210842" className="btn-secondary w-full sm:w-auto justify-center">
                  <Phone size={18} />
                  Nous Appeler
                </a>
              </div>
            </AnimatedSection>

            <AnimatedSection>
              <div className="relative">
                <img
                  src="https://images.pexels.com/photos/8961125/pexels-photo-8961125.jpeg?auto=compress&cs=tinysrgb&w=700"
                  alt="Chantier New Generation BTP"
                  className="rounded-3xl shadow-2xl w-full object-cover aspect-[4/3]"
                />
                <div className="absolute -bottom-4 -left-4 md:-bottom-6 md:-left-6 bg-green-500 text-white p-4 md:p-6 rounded-2xl shadow-xl">
                  <div className="text-2xl md:text-3xl font-bold">8+</div>
                  <div className="text-xs md:text-sm font-medium text-green-100">Années d'expérience</div>
                </div>
                <div className="absolute -top-4 -right-4 md:-top-6 md:-right-6 bg-green-900 text-white p-4 md:p-6 rounded-2xl shadow-xl">
                  <div className="text-2xl md:text-3xl font-bold">200+</div>
                  <div className="text-xs md:text-sm font-medium text-green-200">Projets Réalisés</div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ========== FEATURED PROJECTS ========== */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-14">
            <span className="inline-block bg-green-100 text-green-600 font-semibold text-sm px-4 py-1.5 rounded-full mb-4">Portfolio</span>
            <h2 className="section-title">Nos Dernières Réalisations</h2>
            <p className="section-subtitle mx-auto text-center">
              Découvrez une sélection de nos projets les plus récents qui illustrent notre expertise et notre savoir-faire.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.slice(0, 6).map((project, i) => (
              <AnimatedSection key={project.id}>
                <div className="card group overflow-hidden">
                  <div className="relative overflow-hidden aspect-video">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-green-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute top-3 right-3">
                      <span className="bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                        {project.year}
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {project.tags.slice(0, 2).map((tag) => (
                        <span key={tag} className="bg-green-100 text-green-700 text-xs font-medium px-2 py-0.5 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="font-bold text-green-900 text-lg mb-2">{project.title}</h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{project.description}</p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>📍 {project.location}</span>
                      <span>{project.surface}</span>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection className="text-center mt-10">
            <Link to="/realisations" className="btn-primary">
              Voir Toutes les Réalisations
              <ArrowRight size={18} />
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* ========== CTA BANNER ========== */}
      <section className="py-16 bg-gradient-to-r from-green-900 to-green-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'Montserrat, system-ui, sans-serif' }}>
              Vous Avez un Projet de Construction ?
            </h2>
            <p className="text-green-200 text-lg mb-8">
              Contactez-nous dès aujourd'hui pour une consultation gratuite. Notre équipe est prête à vous accompagner.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Link to="/contact" className="btn-primary bg-green-500 hover:bg-green-600 text-base px-8 py-4 w-full sm:w-auto justify-center">
                Demander un Devis Gratuit
                <ArrowRight size={18} />
              </Link>
              <a href="tel:+237654210842" className="btn-outline-white text-base px-8 py-4 w-full sm:w-auto justify-center">
                <Phone size={18} />
                +237 654 21 08 42
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ========== TESTIMONIALS ========== */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-14">
            <span className="inline-block bg-green-100 text-green-700 font-semibold text-sm px-4 py-1.5 rounded-full mb-4">Témoignages</span>
            <h2 className="section-title">Ce que Disent Nos Clients</h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <AnimatedSection key={i}>
                <div className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-shadow duration-300 relative">
                  <Quote size={32} className="text-green-200 absolute top-6 right-6" />
                  <div className="flex mb-4">
                    {[...Array(t.rating)].map((_, j) => (
                      <Star key={j} size={16} className="text-green-400 fill-green-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed mb-6 italic">"{t.text}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-900 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold text-green-900 text-sm">{t.name}</div>
                      <div className="text-gray-500 text-xs">{t.role}</div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ========== CATALOGUE CTA ========== */}
      <section className="py-16 bg-gradient-to-br from-green-50 to-green-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
              <div className="grid lg:grid-cols-2">
                <div className="p-6 sm:p-10 flex flex-col justify-center">
                  <span className="inline-block bg-green-100 text-green-600 font-semibold text-sm px-4 py-1.5 rounded-full mb-4 w-fit">
                    Nouveau
                  </span>
                  <h2 className="text-3xl font-bold text-green-900 mb-4" style={{ fontFamily: 'Montserrat, system-ui, sans-serif' }}>
                    Catalogue de Plans Architecturaux
                  </h2>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Parcourez notre catalogue de plans architecturaux, personnalisez-les selon vos besoins et recevez une estimation de coût instantanée.
                  </p>
                  <Link to="/catalogue" className="btn-primary w-fit">
                    Explorer le Catalogue
                    <ArrowRight size={18} />
                  </Link>
                </div>
                <div className="relative min-h-48 lg:min-h-0">
                  <img
                    src="https://images.pexels.com/photos/8482835/pexels-photo-8482835.jpeg?auto=compress&cs=tinysrgb&w=600"
                    alt="Plans architecturaux"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
