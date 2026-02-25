import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Calendar, Ruler, Filter, X } from 'lucide-react';
import { projects, categories } from '../data/projects';

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
      el.style.transform = 'translateY(30px)';
      el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
      observer.observe(el);
    }
    return () => { if (el) observer.unobserve(el); };
  }, []);
  return <div ref={ref} className={className}>{children}</div>;
}

function ProjectCard({ project }) {
  const [showDetail, setShowDetail] = useState(false);

  return (
    <>
      <div className="card group cursor-pointer" onClick={() => setShowDetail(true)}>
        <div className="relative overflow-hidden aspect-video">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-green-950/80 via-green-950/20 to-transparent" />
          <div className="absolute top-3 right-3">
            <span className="bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full">{project.year}</span>
          </div>
          <div className="absolute bottom-3 left-3 right-3">
            <div className="flex flex-wrap gap-1">
              {project.tags.slice(0, 2).map((tag) => (
                <span key={tag} className="bg-white/20 backdrop-blur-sm text-white text-xs px-2 py-0.5 rounded-full">{tag}</span>
              ))}
            </div>
          </div>
        </div>
        <div className="p-5">
          <h3 className="font-bold text-green-900 text-base mb-2 group-hover:text-green-500 transition-colors">{project.title}</h3>
          <p className="text-gray-600 text-sm line-clamp-2 mb-3">{project.description}</p>
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span className="flex items-center gap-1"><MapPin size={12} /> {project.location}</span>
            <span className="flex items-center gap-1"><Ruler size={12} /> {project.surface}</span>
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      {showDetail && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-end sm:items-center justify-center p-0 sm:p-4" onClick={() => setShowDetail(false)}>
          <div className="bg-white rounded-t-3xl sm:rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden max-h-[92vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}>
            <div className="relative">
              <img src={project.image} alt={project.title} className="w-full aspect-video object-cover" />
              <button onClick={() => setShowDetail(false)}
                className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-100 transition-colors">
                <X size={20} />
              </button>
              <div className="absolute top-4 left-4">
                <span className="bg-green-500 text-white text-sm font-semibold px-3 py-1 rounded-full">{project.year}</span>
              </div>
            </div>
            <div className="p-4 sm:p-8">
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag) => (
                  <span key={tag} className="bg-green-100 text-green-700 text-xs font-medium px-3 py-1 rounded-full">{tag}</span>
                ))}
              </div>
              <h2 className="text-2xl font-bold text-green-900 mb-4">{project.title}</h2>
              <p className="text-gray-600 leading-relaxed mb-6">{project.description}</p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: MapPin, label: 'Localisation', value: project.location },
                  { icon: Calendar, label: 'Année', value: project.year },
                  { icon: Ruler, label: 'Surface', value: project.surface },
                  { icon: null, label: 'Client', value: project.client },
                ].map((info, i) => (
                  <div key={i} className="bg-gray-50 rounded-xl p-4">
                    <div className="text-gray-500 text-xs mb-1">{info.label}</div>
                    <div className="font-semibold text-green-900 text-sm">{info.value}</div>
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <Link to="/contact" className="btn-primary w-full justify-center" onClick={() => setShowDetail(false)}>
                  Projet Similaire ? Contactez-nous
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState('Tous');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = projects.filter((p) => {
    const matchCat = activeCategory === 'Tous' || p.tags.some(t => t.includes(activeCategory.replace('Tous', '')));
    const matchSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="min-h-screen pt-16">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-green-950 to-green-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20"
          style={{ backgroundImage: 'url(https://images.pexels.com/photos/1117452/pexels-photo-1117452.jpeg?auto=compress&cs=tinysrgb&w=1600)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <span className="inline-block bg-green-500/20 border border-green-500/30 text-green-300 rounded-full px-4 py-2 text-sm font-medium mb-6">
            Notre Portfolio
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'Montserrat, system-ui, sans-serif' }}>
            Nos Réalisations
          </h1>
          <p className="text-green-200 text-lg max-w-2xl mx-auto">
            Découvrez plus de 200 projets réalisés avec excellence à travers tout le Cameroun.
          </p>
          <div className="mt-6 flex justify-center gap-6 sm:gap-8">
            {[
              { value: '200+', label: 'Projets' },
              { value: '10+', label: 'Villes' },
              { value: '8+', label: 'Secteurs' },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl font-bold text-green-400">{s.value}</div>
                <div className="text-green-200 text-sm">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none"><path d="M0 60H1440V20C1440 20 1100 60 720 35C340 10 0 45 0 45V60Z" fill="white" /></svg>
        </div>
      </section>

      {/* Filters */}
      <section className="py-4 sm:py-8 bg-white sticky top-16 z-30 shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-start sm:items-center">
            <div className="flex items-center gap-2 text-gray-500 shrink-0">
              <Filter size={16} />
              <span className="text-sm font-medium">Filtrer :</span>
            </div>
            <div className="flex gap-2 flex-1 overflow-x-auto pb-1 sm:pb-0 sm:flex-wrap">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 shrink-0 ${
                    activeCategory === cat
                      ? 'bg-green-900 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-green-50 hover:text-green-900'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <input
              type="text"
              placeholder="Rechercher..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-field w-full sm:w-48 text-sm py-2"
            />
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-gray-400 text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-bold text-green-900 mb-2">Aucun projet trouvé</h3>
              <p className="text-gray-600">Essayez une autre catégorie ou recherche.</p>
              <button onClick={() => { setActiveCategory('Tous'); setSearchQuery(''); }}
                className="btn-primary mt-4">Réinitialiser les filtres</button>
            </div>
          ) : (
            <>
              <p className="text-gray-500 text-sm mb-6">{filtered.length} projet(s) trouvé(s)</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filtered.map((project) => (
                  <AnimatedSection key={project.id}>
                    <ProjectCard project={project} />
                  </AnimatedSection>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <AnimatedSection>
            <h2 className="text-3xl font-bold text-green-900 mb-4" style={{ fontFamily: 'Montserrat, system-ui, sans-serif' }}>
              Votre Projet Sera Notre Prochaine Réalisation
            </h2>
            <p className="text-gray-600 mb-8">Faites confiance à notre expertise pour concrétiser votre vision.</p>
            <Link to="/contact" className="btn-primary">
              Démarrer Mon Projet <ArrowRight size={18} />
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
