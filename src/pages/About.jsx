import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, Award, Target, Eye, Heart } from 'lucide-react';

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

function SectionHeader({ label, title, subtitle }) {
  return (
    <div className="text-center mb-12">
      <div className="flex items-center justify-center gap-4 mb-4">
        <div className="h-px w-12 bg-gray-300" />
        <span className="text-xs uppercase tracking-widest text-gray-400 font-semibold">{label}</span>
        <div className="h-px w-12 bg-gray-300" />
      </div>
      <h2 className="text-2xl sm:text-3xl font-bold text-green-900 uppercase tracking-wide">{title}</h2>
      {subtitle && <p className="text-gray-500 text-sm mt-3 max-w-xl mx-auto">{subtitle}</p>}
    </div>
  );
}

const team = [
  { name: 'DJOMO Aubin', role: 'Directeur Général & Fondateur', initials: 'DA', color: 'bg-green-900' },
  { name: 'Ingénieur Génie Civil', role: 'Responsable Technique GC', initials: 'GC', color: 'bg-green-700' },
  { name: 'Ingénieur Électricien', role: 'Chef de Projet Génie Élec', initials: 'GE', color: 'bg-green-800' },
  { name: 'Architecte Principal', role: 'Responsable Architecture', initials: 'AR', color: 'bg-green-600' },
  { name: 'Ingénieur Topographe', role: 'Chef de Projet Topo', initials: 'TO', color: 'bg-green-900' },
  { name: 'DRH', role: 'Directrice des Ressources Humaines', initials: 'RH', color: 'bg-green-700' },
  { name: 'Responsable Communication', role: 'Chargée de Communication', initials: 'CO', color: 'bg-green-800' },
  { name: 'Assistante de Direction', role: 'Assistante de Direction', initials: 'AD', color: 'bg-green-600' },
];

const values = [
  {
    icon: Award,
    title: 'Excellence Technique',
    desc: 'Nous appliquons les plus hauts standards de qualité dans chaque mission.',
    image: 'https://images.pexels.com/photos/3862132/pexels-photo-3862132.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    icon: Heart,
    title: 'Écoute Client',
    desc: 'Vos besoins sont au cœur de notre démarche. Nous adaptons nos solutions à votre contexte.',
    image: 'https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    icon: Users,
    title: "Esprit d'Équipe",
    desc: 'Une équipe soudée et pluridisciplinaire au service de vos projets.',
    image: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    icon: Target,
    title: 'Engagement',
    desc: 'Nous respectons nos engagements en termes de délais, de qualité et de budget.',
    image: 'https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
];

const milestones = [
  { year: '2016', title: 'Fondation', desc: 'Création de New Generation Engineering BTP MS par M. DJOMO Aubin.' },
  { year: '2017', title: 'Ouverture', desc: 'Recrutement des premiers ingénieurs qualifiés et lancement des opérations.' },
  { year: '2019', title: 'Expansion', desc: 'Extension des services : topographie, froid & clim, immobilier.' },
  { year: '2021', title: '100+ Projets', desc: 'Franchissement du cap des 100 projets réalisés au Cameroun.' },
  { year: '2024', title: "Aujourd'hui", desc: 'Plus de 200 projets réalisés et 150 clients satisfaits à travers tout le Cameroun.' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-16">

      {/* HERO */}
      <section className="relative py-16 sm:py-20 text-white overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/3860937/pexels-photo-3860937.jpeg?auto=compress&cs=tinysrgb&w=1600)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-green-950/85" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <p className="text-green-400 text-xs sm:text-sm font-semibold uppercase tracking-widest mb-3">Notre Histoire</p>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">À Propos de New Generation BTP</h1>
          <p className="text-green-200 text-base max-w-2xl mx-auto">
            Un bureau d'étude multi-services fondé sur l'ambition, l'expertise et la passion de construire l'avenir du Cameroun.
          </p>
        </div>
      </section>

      {/* STORY */}
      <section className="py-14 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <FadeIn>
              <img
                src="https://images.pexels.com/photos/3860937/pexels-photo-3860937.jpeg?auto=compress&cs=tinysrgb&w=700"
                alt="Notre histoire"
                className="w-full aspect-[4/3] object-cover"
              />
            </FadeIn>
            <FadeIn delay={100}>
              <h2 className="text-2xl font-bold text-green-900 mb-6">De l'Ambition à l'Excellence</h2>
              <div className="space-y-4 text-gray-600 text-sm leading-relaxed">
                <p>
                  <strong className="text-green-900">New Generation Engineering BTP MS</strong> a été pensée en 2016 par un groupe d'étudiants de divers domaines d'ingénierie. M. DJOMO Aubin, tête pensante du projet, a persévéré malgré les difficultés initiales.
                </p>
                <p>
                  En 2017, il ouvre la direction générale et recrute plusieurs ingénieurs qualifiés en génie civil, génie électrique, topographie, froid et clim et architecture — formant une équipe pluridisciplinaire unie autour d'une même vision.
                </p>
                <p>
                  Aujourd'hui, <strong className="text-green-900">New Generation Engineering BTP MS</strong> est un bureau d'étude multi-services reconnu, avec plus de 200 projets réalisés à travers tout le Cameroun.
                </p>
              </div>
              <div className="mt-8 grid grid-cols-3 gap-4">
                {[
                  { value: '2016', label: 'Fondée en' },
                  { value: '8+', label: 'Experts' },
                  { value: '200+', label: 'Projets' },
                ].map((s, i) => (
                  <div key={i} className="text-center p-4 bg-green-50 rounded-lg border border-green-100">
                    <div className="text-2xl font-bold text-green-900">{s.value}</div>
                    <div className="text-gray-500 text-xs mt-1">{s.label}</div>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* MISSION / VISION */}
      <section className="py-14 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <SectionHeader label="Identité" title="Mission & Vision" />
          </FadeIn>
          <div className="grid md:grid-cols-2 gap-6">
            <FadeIn>
              <div className="bg-white rounded-xl p-7 border-l-4 border-green-700 shadow-sm h-full">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Target className="text-green-700" size={20} />
                </div>
                <h3 className="text-lg font-bold text-green-900 mb-3">Notre Mission</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Fournir des services d'ingénierie de haute qualité, accessibles et adaptés aux besoins des particuliers, entreprises et institutions au Cameroun. Nous valorisons l'expertise technique locale et contribuons au développement des infrastructures nationales.
                </p>
              </div>
            </FadeIn>
            <FadeIn delay={100}>
              <div className="bg-white rounded-xl p-7 border-l-4 border-green-500 shadow-sm h-full">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Eye className="text-green-600" size={20} />
                </div>
                <h3 className="text-lg font-bold text-green-900 mb-3">Notre Vision</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Devenir le bureau d'étude de référence en Afrique Centrale, reconnu pour son excellence technique, sa polyvalence et son engagement envers ses clients — accompagnant le développement durable du Cameroun.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="py-14 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <SectionHeader label="Fondements" title="Nos Valeurs" />
          </FadeIn>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <FadeIn key={i} delay={i * 80}>
                  <div className="group flex flex-col bg-white hover:shadow-lg transition-shadow duration-300">
                    {/* Image */}
                    <div className="relative overflow-hidden aspect-[4/3]">
                      <img
                        src={v.image}
                        alt={v.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-green-950/0 group-hover:bg-green-950/30 transition-colors duration-300" />
                    </div>
                    {/* Content */}
                    <div className="pt-4 pb-5 px-1">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-7 h-7 rounded bg-green-900 flex items-center justify-center shrink-0 group-hover:bg-green-700 transition-colors">
                          <Icon size={14} className="text-white" />
                        </div>
                        <h3 className="font-bold text-green-900 text-sm uppercase tracking-wide group-hover:text-green-700 transition-colors">
                          {v.title}
                        </h3>
                      </div>
                      <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="py-14 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <SectionHeader
              label="Équipe"
              title="Notre Équipe"
              subtitle="Une équipe pluridisciplinaire d'ingénieurs et de professionnels qualifiés."
            />
          </FadeIn>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {team.map((member, i) => (
              <FadeIn key={i} delay={i * 60}>
                <div className="bg-white p-5 shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow duration-300">
                  <div className={`w-14 h-14 ${member.color} flex items-center justify-center text-white font-bold text-lg mx-auto mb-3`}>
                    {member.initials}
                  </div>
                  <h3 className="font-bold text-green-900 text-sm">{member.name}</h3>
                  <p className="text-green-600 text-xs mt-1">{member.role}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="py-14 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <SectionHeader label="Histoire" title="Notre Parcours" />
          </FadeIn>
          <div className="relative">
            <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-green-100" />
            <div className="space-y-6">
              {milestones.map((m, i) => (
                <FadeIn key={i} delay={i * 80} className="relative flex gap-5">
                  <div className="shrink-0 w-10 h-10 bg-green-900 rounded-full flex items-center justify-center text-white font-bold text-xs z-10">
                    {m.year.slice(2)}
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 flex-1 border border-gray-100">
                    <div className="text-green-600 font-semibold text-xs mb-1">{m.year}</div>
                    <h4 className="font-bold text-green-900 text-sm mb-1">{m.title}</h4>
                    <p className="text-gray-500 text-sm">{m.desc}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 bg-green-900 text-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Prêt à Travailler avec Nous ?</h2>
          <p className="text-green-200 mb-8">Contactez notre équipe pour discuter de votre projet.</p>
          <Link to="/contact" className="btn-primary inline-flex items-center gap-2 px-8 py-4 text-base">
            Nous Contacter <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}
