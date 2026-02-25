import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, Award, Target, Eye, Heart } from 'lucide-react';

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

const team = [
  { name: 'DJOMO Aubin', role: 'Directeur Général & Fondateur', desc: 'Ingénieur en génie civil, visionnaire et fondateur de l\'entreprise depuis 2016.', initials: 'DA', color: 'bg-green-900' },
  { name: 'Ingénieur Génie Civil', role: 'Responsable Technique GC', desc: 'Expert en conception structurelle et supervision de projets de construction.', initials: 'GC', color: 'bg-green-500' },
  { name: 'Ingénieur Électricien', role: 'Chef de Projet Génie Élec', desc: 'Spécialiste des installations électriques industrielles et résidentielles.', initials: 'GE', color: 'bg-green-700' },
  { name: 'Architecte Principal', role: 'Responsable Architecture', desc: 'Architecte diplômé, concepteur de projets résidentiels et commerciaux.', initials: 'AR', color: 'bg-purple-700' },
  { name: 'Ingénieur Topographe', role: 'Chef de Projet Topo', desc: 'Expert en levés topographiques, bornage et géolocalisation de précision.', initials: 'TO', color: 'bg-teal-700' },
  { name: 'DRH', role: 'Directrice des Ressources Humaines', desc: 'Pilote la politique RH et le développement des talents de l\'entreprise.', initials: 'RH', color: 'bg-pink-700' },
  { name: 'Responsable Communication', role: 'Chargée de Communication', desc: 'Gère la stratégie de communication et le marketing digital de l\'entreprise.', initials: 'CO', color: 'bg-yellow-600' },
  { name: 'Assistante de Direction', role: 'Assistante de Direction', desc: 'Coordinatrice administrative et commerciale de la direction générale.', initials: 'AD', color: 'bg-red-700' },
];

const values = [
  { icon: Award, title: 'Excellence Technique', desc: 'Nous appliquons les plus hauts standards de qualité dans chaque mission.', color: 'text-green-600' },
  { icon: Heart, title: 'Écoute Client', desc: 'Vos besoins sont au cœur de notre démarche. Nous adaptons nos solutions à votre contexte.', color: 'text-green-500' },
  { icon: Users, title: 'Esprit d\'Équipe', desc: 'Une équipe soudée et pluridisciplinaire au service de vos projets.', color: 'text-green-600' },
  { icon: Target, title: 'Engagement', desc: 'Nous respectons nos engagements en termes de délais, de qualité et de budget.', color: 'text-purple-600' },
];

const milestones = [
  { year: '2016', title: 'Fondation', desc: 'Création de New Generation Engineering BTP MS par M. DJOMO Aubin.' },
  { year: '2017', title: 'Premiers Projets', desc: 'Ouverture de la direction générale et recrutement des premiers ingénieurs qualifiés.' },
  { year: '2019', title: 'Expansion Services', desc: 'Extension des services : topographie, froid & clim, immobilier.' },
  { year: '2021', title: '100+ Projets', desc: 'Franchissement du cap des 100 projets réalisés sur le territoire camerounais.' },
  { year: '2023', title: 'Croissance', desc: 'Plus de 150 clients satisfaits et des projets dans toutes les régions du Cameroun.' },
  { year: '2024', title: 'Digitalisation', desc: 'Lancement du site web et de la plateforme digitale pour mieux servir nos clients.' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-16">
      {/* HERO */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-green-950 to-green-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20"
          style={{ backgroundImage: 'url(https://images.pexels.com/photos/30688596/pexels-photo-30688596.jpeg?auto=compress&cs=tinysrgb&w=1600)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <span className="inline-block bg-green-500/20 border border-green-500/30 text-green-300 rounded-full px-4 py-2 text-sm font-medium mb-6">
            Notre Histoire
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: 'Montserrat, system-ui, sans-serif' }}>
            À Propos de New Generation BTP
          </h1>
          <p className="text-green-200 text-lg max-w-2xl mx-auto">
            Un bureau d'étude multi-services fondé sur l'ambition, l'expertise et la passion de construire l'avenir du Cameroun.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 60H1440V20C1440 20 1100 60 720 35C340 10 0 45 0 45V60Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* STORY */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <AnimatedSection>
              <img
                src="https://images.pexels.com/photos/3860937/pexels-photo-3860937.jpeg?auto=compress&cs=tinysrgb&w=700"
                alt="Notre histoire"
                className="rounded-3xl shadow-2xl w-full aspect-[4/3] object-cover"
              />
            </AnimatedSection>
            <AnimatedSection delay={150}>
              <span className="inline-block bg-green-100 text-green-600 font-semibold text-sm px-4 py-1.5 rounded-full mb-4">Notre Histoire</span>
              <h2 className="section-title">De l'Ambition à l'Excellence</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  <strong className="text-green-900">New Generation Engineering BTP MS</strong> a été pensée en 2016 par un groupe d'étudiants de divers domaines d'ingénierie. Avant la sortie de l'école, 5 étudiants se sont désolidarisés, laissant M. DJOMO Aubin seul, lui qui était la tête pensante du projet.
                </p>
                <p>
                  En 2017, M. DJOMO Aubin, par sa grande vision et son ambition dans le domaine de l'ingénierie, ouvre la direction générale et recrute ainsi plusieurs ingénieurs qualifiés en génie civil, génie électrique, topographie, froid et clim et architecture, ainsi qu'une DRH, un DG, une responsable de la communication, une assistante de direction et des commerciaux.
                </p>
                <p>
                  Tout cela dans le but de travailler en équipe et de propulser cette jeune entreprise jusqu'à nos jours. Aujourd'hui, <strong className="text-green-900">New Generation Engineering BTP MS</strong> est un bureau d'étude multi-services reconnu, avec plus de 200 projets réalisés à travers tout le Cameroun.
                </p>
              </div>
              <div className="mt-8 grid grid-cols-3 gap-4">
                {[
                  { value: '2016', label: 'Fondée en' },
                  { value: '8+', label: 'Experts' },
                  { value: '200+', label: 'Projets' },
                ].map((s, i) => (
                  <div key={i} className="text-center p-4 bg-green-50 rounded-xl">
                    <div className="text-2xl font-bold text-green-900">{s.value}</div>
                    <div className="text-gray-600 text-sm">{s.label}</div>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* MISSION/VISION */}
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-10 md:mb-14">
            <h2 className="section-title">Notre Mission & Vision</h2>
          </AnimatedSection>
          <div className="grid md:grid-cols-2 gap-8">
            <AnimatedSection>
              <div className="bg-white rounded-2xl p-8 shadow-lg border-l-4 border-green-500 h-full">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                  <Target className="text-green-500" size={24} />
                </div>
                <h3 className="text-xl font-bold text-green-900 mb-3">Notre Mission</h3>
                <p className="text-gray-600 leading-relaxed">
                  Fournir des services d'ingénierie de haute qualité, accessibles et adaptés aux besoins des particuliers, entreprises et institutions au Cameroun. Nous nous engageons à valoriser l'expertise technique locale et à contribuer au développement des infrastructures nationales.
                </p>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={150}>
              <div className="bg-white rounded-2xl p-8 shadow-lg border-l-4 border-green-600 h-full">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                  <Eye className="text-green-600" size={24} />
                </div>
                <h3 className="text-xl font-bold text-green-900 mb-3">Notre Vision</h3>
                <p className="text-gray-600 leading-relaxed">
                  Devenir le bureau d'étude de référence en Afrique Centrale, reconnu pour son excellence technique, sa polyvalence et son engagement envers ses clients. À long terme, être une plateforme intégrée de services d'ingénierie et d'architecture qui accompagne le développement durable du Cameroun.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-10 md:mb-14">
            <span className="inline-block bg-green-100 text-green-700 font-semibold text-sm px-4 py-1.5 rounded-full mb-4">Ce qui nous anime</span>
            <h2 className="section-title">Nos Valeurs</h2>
          </AnimatedSection>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <AnimatedSection key={i} delay={i * 100}>
                  <div className="text-center p-6 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-lg transition-all duration-300 h-full">
                    <div className={`w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4`}>
                      <Icon size={30} className={v.color} />
                    </div>
                    <h3 className="font-bold text-green-900 text-lg mb-2">{v.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{v.desc}</p>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-10 md:mb-14">
            <span className="inline-block bg-green-100 text-green-600 font-semibold text-sm px-4 py-1.5 rounded-full mb-4">Notre Équipe</span>
            <h2 className="section-title">Des Experts à Votre Service</h2>
            <p className="section-subtitle mx-auto text-center">
              Une équipe pluridisciplinaire d'ingénieurs et de professionnels qualifiés, unis par la passion de l'excellence.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, i) => (
              <AnimatedSection key={i} delay={i * 80}>
                <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 text-center group">
                  <div className={`w-20 h-20 ${member.color} rounded-2xl flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    {member.initials}
                  </div>
                  <h3 className="font-bold text-green-900 text-base">{member.name}</h3>
                  <p className="text-green-500 text-sm font-medium mb-2">{member.role}</p>
                  <p className="text-gray-600 text-xs leading-relaxed">{member.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-10 md:mb-14">
            <span className="inline-block bg-green-100 text-green-700 font-semibold text-sm px-4 py-1.5 rounded-full mb-4">Notre Parcours</span>
            <h2 className="section-title">Chronologie</h2>
          </AnimatedSection>
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-green-200" />
            <div className="space-y-8">
              {milestones.map((m, i) => (
                <AnimatedSection key={i} delay={i * 100} className="relative flex gap-6">
                  <div className="shrink-0 w-12 h-12 bg-green-900 rounded-full flex items-center justify-center text-white font-bold text-xs z-10">
                    {m.year.slice(2)}
                  </div>
                  <div className="bg-gray-50 rounded-xl p-5 flex-1 hover:shadow-md transition-shadow duration-300">
                    <div className="text-green-500 font-bold text-sm mb-1">{m.year}</div>
                    <h4 className="font-bold text-green-900 text-base mb-1">{m.title}</h4>
                    <p className="text-gray-600 text-sm">{m.desc}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 md:py-16 bg-gradient-to-r from-green-500 to-green-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4" style={{ fontFamily: 'Montserrat, system-ui, sans-serif' }}>
            Prêt à Travailler avec Nous ?
          </h2>
          <p className="text-green-100 text-base md:text-lg mb-8">Contactez notre équipe pour discuter de votre projet.</p>
          <Link to="/contact" className="inline-flex items-center gap-2 bg-white text-green-600 font-bold px-8 py-4 rounded-lg hover:bg-green-50 transition-colors duration-300 shadow-lg">
            Nous Contacter
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}
