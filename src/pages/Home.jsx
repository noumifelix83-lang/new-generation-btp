import { Link } from 'react-router-dom';
import { useEffect, useRef, useState, useCallback } from 'react';
import {
  ArrowRight, ChevronLeft, ChevronRight,
  Building2, Zap, Layers, FileCheck, Map, Wrench, Wind, Home,
  Users, Award, Clock, TrendingUp, Phone
} from 'lucide-react';
import { services } from '../data/services';

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

const stats = [
  { icon: Users, value: '150+', label: 'Clients Satisfaits' },
  { icon: Award, value: '200+', label: 'Projets Réalisés' },
  { icon: Clock, value: '8+', label: "Années d'Expérience" },
  { icon: TrendingUp, value: '8', label: "Domaines d'Expertise" },
];

const heroSlides = [
  {
    image: '/images/team-terrain.jpeg',
    label: 'New Generation Engineering BTP MS · Yaoundé, Cameroun',
    title: 'Innover pour',
    highlight: 'Construire Mieux !',
    desc: "Bureau d'étude multi-services fondé en 2016. De la conception à la livraison, nous transformons vos projets de construction en réalité avec expertise et professionnalisme.",
  },
  {
    image: '/images/nge-plans-review.jpg',
    label: 'Expertise Terrain · Étude & Révision des Plans',
    title: 'La Précision,',
    highlight: 'Notre Signature',
    desc: "Nos ingénieurs analysent chaque plan avec rigueur sur le terrain. Chaque décision est prise pour garantir la solidité, la conformité et la qualité de votre ouvrage.",
  },
  {
    image: '/images/genie-civil-1.jpeg',
    label: 'Génie Civil · Structures robustes & durables',
    title: 'Des Fondations',
    highlight: 'Qui Durent',
    desc: "Études, plans d'exécution et supervision de chantier pour des ouvrages solides, conformes aux normes et livrés dans les délais convenus.",
  },
  {
    image: '/images/topographie-3.jpeg',
    label: 'Topographie · Levés & Implantation de précision',
    title: 'Votre Terrain,',
    highlight: 'Maîtrisé à la Précision',
    desc: "Bornage, levés topographiques et implantation d'ouvrages réalisés avec des équipements de dernière génération. Chaque mesure compte.",
  },
  {
    image: '/images/dg.jpg',
    label: 'DJOMO Aubin · Fondateur & Directeur Général',
    title: 'Une Vision,',
    highlight: 'Un Leadership',
    desc: "Fondé par M. DJOMO Aubin en 2016, NGE BTP MS porte une vision claire : bâtir l'avenir du Cameroun avec excellence, innovation et engagement sans faille.",
    pos: 'center top',
  },
  {
    image: '/images/plans-chantier.jpeg',
    label: 'Architecture · Conception, Plans & Suivi de chantier',
    title: 'Vos Rêves,',
    highlight: 'Nos Plans',
    desc: "Des esquisses aux plans d'exécution, notre bureau d'architecture conçoit des espaces qui allient esthétique, fonctionnalité et durabilité.",
  },
];

function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => setCurrent(c => (c + 1) % heroSlides.length), []);
  const prev = useCallback(() => setCurrent(c => (c - 1 + heroSlides.length) % heroSlides.length), []);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [paused, next]);

  return (
    <section
      className="relative text-white pt-20 pb-14 sm:pt-28 sm:pb-24 overflow-hidden min-h-[480px] sm:min-h-[560px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Slides — stacked, fade between them */}
      {heroSlides.map((slide, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-1000"
          style={{ opacity: i === current ? 1 : 0, zIndex: i === current ? 1 : 0 }}
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${slide.image})`,
              backgroundSize: 'cover',
              backgroundPosition: slide.pos || 'center',
            }}
          />
          <div className="absolute inset-0 bg-green-950/82" />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

        {/* Logo — always visible, prominent */}
        <div className="flex justify-center mb-5 sm:mb-6">
          <img
            src="/images/logo-clean.png"
            alt="NGE BTP ms"
            className="w-20 h-20 sm:w-28 sm:h-28 object-contain bg-white rounded-2xl p-2 shadow-2xl"
          />
        </div>

        <p
          key={`label-${current}`}
          className="text-green-400 font-semibold text-xs sm:text-sm uppercase tracking-widest mb-4 animate-fade-in"
        >
          {heroSlides[current].label}
        </p>
        <h1
          key={`title-${current}`}
          className="text-3xl sm:text-5xl md:text-6xl font-bold text-white leading-tight mb-6 animate-fade-in"
        >
          {heroSlides[current].title}<br />
          <span className="text-green-400">{heroSlides[current].highlight}</span>
        </h1>
        <p
          key={`desc-${current}`}
          className="text-green-200 text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in"
        >
          {heroSlides[current].desc}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/contact" className="btn-primary text-base px-8 py-4">
            Demander un Devis Gratuit <ArrowRight size={18} />
          </Link>
          <Link to="/realisations" className="btn-outline-white text-base px-8 py-4">
            Voir nos Réalisations
          </Link>
        </div>
      </div>

      {/* Prev / Next arrows */}
      <button
        onClick={prev}
        aria-label="Diapositive précédente"
        className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/15 hover:bg-white/30 active:bg-white/40 rounded-full flex items-center justify-center transition-colors touch-manipulation"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={next}
        aria-label="Diapositive suivante"
        className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/15 hover:bg-white/30 active:bg-white/40 rounded-full flex items-center justify-center transition-colors touch-manipulation"
      >
        <ChevronRight size={20} />
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {heroSlides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Aller à la diapositive ${i + 1}`}
            className={`transition-all duration-300 rounded-full touch-manipulation ${
              i === current
                ? 'w-7 h-2 bg-green-400'
                : 'w-2 h-2 bg-white/40 hover:bg-white/70'
            }`}
          />
        ))}
      </div>

      {/* Progress bar */}
      {!paused && (
        <div className="absolute bottom-0 left-0 right-0 z-20 h-0.5 bg-white/10">
          <div
            key={current}
            className="h-full bg-green-400 origin-left"
            style={{ animation: 'progress 5s linear forwards' }}
          />
        </div>
      )}
    </section>
  );
}

export default function HomePage() {
  return (
    <div className="min-h-screen">

      {/* ========== HERO SLIDER ========== */}
      <HeroSlider />

      {/* ========== STATS ========== */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4">
            {stats.map((s, i) => (
              <div key={i} className={`py-6 sm:py-8 px-4 text-center border-gray-100 ${
                i === 0 ? 'border-r border-b lg:border-b-0' :
                i === 1 ? 'border-b lg:border-b-0 lg:border-r' :
                i === 2 ? 'border-r lg:border-r' : ''
              }`}>
                <div className="text-2xl sm:text-3xl font-bold text-green-900">{s.value}</div>
                <div className="text-gray-500 text-xs sm:text-sm mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== SERVICES ========== */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section header */}
          <FadeIn className="text-center mb-12">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="h-px w-12 bg-gray-300" />
              <span className="text-xs uppercase tracking-widest text-gray-400 font-semibold">Expertise</span>
              <div className="h-px w-12 bg-gray-300" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-green-900 uppercase tracking-wide">
              Nos Domaines d'Expertise
            </h2>
          </FadeIn>

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
                    <div className="relative overflow-hidden aspect-[4/3]">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-green-950/0 group-hover:bg-green-950/30 transition-colors duration-300" />
                    </div>
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

          <FadeIn className="text-center mt-10">
            <Link to="/services" className="btn-secondary">
              Voir tous nos Services <ArrowRight size={16} />
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* ========== CTA ========== */}
      <section className="relative py-16 text-white overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'url(/images/genie-civil-2.jpeg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-green-900/90" />
        <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
          <FadeIn>
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              Vous avez un projet de construction ?
            </h2>
            <p className="text-green-200 mb-8 text-base">
              Contactez-nous pour une consultation gratuite. Notre équipe est disponible pour vous accompagner à chaque étape.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="btn-primary text-base px-8 py-4">
                Demander un Devis <ArrowRight size={18} />
              </Link>
              <a href="tel:+237654210842" className="btn-outline-white text-base px-8 py-4">
                <Phone size={18} /> +237 654 21 08 42
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

    </div>
  );
}
