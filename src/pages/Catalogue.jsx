import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Star, Calculator, X, Plus, Minus, Phone } from 'lucide-react';
import { architecturalPlans, options, planTypes } from '../data/plans';

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

function formatPrice(price) {
  return new Intl.NumberFormat('fr-FR').format(price) + ' FCFA';
}

function PlanCard({ plan, onSelect }) {
  return (
    <div className={`card group relative overflow-visible ${plan.popular ? 'ring-2 ring-green-500' : ''}`}>
      {plan.popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
          <span className="bg-green-500 text-white text-xs font-bold px-4 py-1 rounded-full flex items-center gap-1">
            <Star size={12} className="fill-white" /> Populaire
          </span>
        </div>
      )}
      <div className="relative overflow-hidden aspect-[4/3]">
        <img src={plan.image} alt={plan.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute inset-0 bg-green-950/0 group-hover:bg-green-950/30 transition-colors duration-300" />
        <div className="absolute bottom-3 left-3 right-3">
          <span className="bg-white/20 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">{plan.style}</span>
        </div>
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="font-bold text-green-900 text-lg">{plan.name}</h3>
            <p className="text-gray-500 text-xs">{plan.type} • {plan.surfaceBase} m² de base</p>
          </div>
          {plan.floors > 0 && (
            <span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded-full">
              R+{plan.floors}
            </span>
          )}
        </div>

        <p className="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-2">{plan.description}</p>

        <div className="grid grid-cols-3 gap-2 mb-4">
          {plan.rooms > 0 && (
            <div className="text-center bg-gray-50 rounded-lg p-2">
              <div className="font-bold text-green-900">{plan.rooms}</div>
              <div className="text-gray-500 text-xs">Chambres</div>
            </div>
          )}
          <div className="text-center bg-gray-50 rounded-lg p-2">
            <div className="font-bold text-green-900">{plan.bathrooms}</div>
            <div className="text-gray-500 text-xs">SDB</div>
          </div>
          <div className="text-center bg-gray-50 rounded-lg p-2">
            <div className="font-bold text-green-900">{plan.surfaceBase}m²</div>
            <div className="text-gray-500 text-xs">Surface</div>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-4 mb-4">
          <p className="text-xs text-gray-500 mb-1">Prix de base estimatif</p>
          <p className="text-2xl font-bold text-green-900">{formatPrice(plan.basePrice)}</p>
          <p className="text-xs text-green-500">{formatPrice(plan.pricePerM2)} / m²</p>
        </div>

        <button
          onClick={() => onSelect(plan)}
          className="btn-primary w-full justify-center text-sm"
        >
          <Calculator size={16} />
          Personnaliser & Estimer
        </button>
      </div>
    </div>
  );
}

function PlanEstimator({ plan, onClose }) {
  const [surface, setSurface] = useState(plan.surfaceBase);
  const [selectedOptions, setSelectedOptions] = useState({});

  const toggleOption = (key) => {
    setSelectedOptions(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const optionsTotal = Object.entries(selectedOptions)
    .filter(([, checked]) => checked)
    .reduce((sum, [key]) => sum + options[key].price, 0);

  const surfaceExtra = Math.max(0, surface - plan.surfaceBase);
  const surfacePrice = surfaceExtra * plan.pricePerM2;
  const total = plan.basePrice + surfacePrice + optionsTotal;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-end sm:items-center justify-center p-0 sm:p-4" onClick={onClose}>
      <div className="bg-white rounded-t-3xl sm:rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden max-h-[92vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="bg-green-900 text-white p-6 relative">
          <button onClick={onClose} className="absolute top-4 right-4 w-9 h-9 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors">
            <X size={18} />
          </button>
          <div className="flex items-center gap-3">
            <Calculator size={24} className="text-green-400" />
            <div>
              <h2 className="text-xl font-bold">{plan.name}</h2>
              <p className="text-green-200 text-sm">Estimateur de coût personnalisé</p>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Surface */}
          <div>
            <h3 className="font-bold text-green-900 mb-3">Surface habitable (m²)</h3>
            <div className="flex items-center gap-4">
              <button onClick={() => setSurface(Math.max(plan.surfaceBase, surface - 10))}
                className="w-10 h-10 rounded-full bg-gray-100 hover:bg-green-100 flex items-center justify-center transition-colors">
                <Minus size={16} />
              </button>
              <div className="flex-1 text-center">
                <span className="text-4xl font-bold text-green-900">{surface}</span>
                <span className="text-gray-500 text-lg ml-1">m²</span>
              </div>
              <button onClick={() => setSurface(surface + 10)}
                className="w-10 h-10 rounded-full bg-gray-100 hover:bg-green-100 flex items-center justify-center transition-colors">
                <Plus size={16} />
              </button>
            </div>
            <input
              type="range"
              min={plan.surfaceBase}
              max={plan.surfaceBase * 3}
              step={10}
              value={surface}
              onChange={(e) => setSurface(Number(e.target.value))}
              className="w-full mt-3 accent-green-900"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>{plan.surfaceBase} m² (base)</span>
              <span>{plan.surfaceBase * 3} m² (max)</span>
            </div>
          </div>

          {/* Options */}
          <div>
            <h3 className="font-bold text-green-900 mb-3">Options supplémentaires</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {Object.entries(options).map(([key, opt]) => (
                <button
                  key={key}
                  onClick={() => toggleOption(key)}
                  className={`flex items-center gap-3 p-3 rounded-xl border-2 transition-all duration-200 text-left ${
                    selectedOptions[key]
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
                >
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                    selectedOptions[key] ? 'bg-green-500' : 'bg-gray-200'
                  }`}>
                    {selectedOptions[key] && <Check size={14} className="text-white" />}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-800">{opt.label}</div>
                    <div className="text-xs text-green-500 font-semibold">+{formatPrice(opt.price)}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Summary */}
          <div className="bg-green-50 rounded-2xl p-6">
            <h3 className="font-bold text-green-900 mb-4">Récapitulatif</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Prix de base ({plan.surfaceBase} m²)</span>
                <span className="font-semibold">{formatPrice(plan.basePrice)}</span>
              </div>
              {surfaceExtra > 0 && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Extension de surface (+{surfaceExtra} m²)</span>
                  <span className="font-semibold">{formatPrice(surfacePrice)}</span>
                </div>
              )}
              {Object.entries(selectedOptions).filter(([, v]) => v).map(([key]) => (
                <div key={key} className="flex justify-between">
                  <span className="text-gray-600">{options[key].label}</span>
                  <span className="font-semibold">+{formatPrice(options[key].price)}</span>
                </div>
              ))}
              <div className="border-t border-green-200 pt-3 mt-3">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-green-900 text-lg">Estimation Totale</span>
                  <span className="font-bold text-green-500 text-2xl">{formatPrice(total)}</span>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  * Cette estimation est indicative. Un devis précis sera établi après étude de votre terrain et spécifications.
                </p>
              </div>
            </div>
          </div>

          {/* Included features */}
          <div>
            <h3 className="font-bold text-green-900 mb-3">Inclus dans ce plan</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {plan.features.map((f, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-gray-700">
                  <Check size={16} className="text-green-500 shrink-0" />
                  {f}
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              to={`/contact?plan=${encodeURIComponent(plan.name)}&surface=${surface}&total=${total}`}
              className="btn-primary flex-1 justify-center"
              onClick={onClose}
            >
              Demander ce Plan
              <ArrowRight size={18} />
            </Link>
            <a href="tel:+237654210842" className="btn-secondary flex-1 justify-center">
              <Phone size={18} />
              Appeler un Expert
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CataloguePage() {
  const [activeType, setActiveType] = useState('Tous');
  const [selectedPlan, setSelectedPlan] = useState(null);

  const filtered = architecturalPlans.filter(
    p => activeType === 'Tous' || p.type === activeType
  );

  return (
    <div className="min-h-screen pt-16">
      {/* Hero */}
      <section className="relative py-16 sm:py-20 text-white overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/8293670/pexels-photo-8293670.jpeg?auto=compress&cs=tinysrgb&w=1600)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-green-950/85" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <p className="text-green-400 text-xs sm:text-sm font-semibold uppercase tracking-widest mb-3">Plans Architecturaux</p>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">Catalogue Architectural</h1>
          <p className="text-green-200 text-base max-w-2xl mx-auto mb-6">
            Choisissez parmi nos plans, personnalisez selon vos besoins et obtenez une estimation de coût instantanée.
          </p>
          <div className="flex flex-wrap gap-2 sm:gap-3 justify-center">
            {['Plans certifiés', 'Personnalisables', 'Estimation instantanée', 'Permis inclus'].map((f) => (
              <span key={f} className="bg-white/10 text-white text-xs sm:text-sm px-3 sm:px-4 py-1.5 rounded-full border border-white/20">✓ {f}</span>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-12 bg-green-50">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
            {[
              { step: '1', title: 'Choisissez', desc: 'Sélectionnez un plan qui correspond à votre projet' },
              { step: '2', title: 'Personnalisez', desc: 'Ajustez la surface et les options selon vos besoins' },
              { step: '3', title: 'Estimez', desc: 'Obtenez une estimation de coût instantanée' },
              { step: '4', title: 'Contactez', desc: 'Envoyez votre demande à notre équipe' },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <div className="w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-3 shadow-lg">
                  {s.step}
                </div>
                <h3 className="font-bold text-green-900 mb-1">{s.title}</h3>
                <p className="text-gray-600 text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filter & Plans */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section header */}
          <AnimatedSection className="text-center mb-10">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="h-px w-12 bg-gray-300" />
              <span className="text-xs uppercase tracking-widest text-gray-400 font-semibold">Plans</span>
              <div className="h-px w-12 bg-gray-300" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-green-900 uppercase tracking-wide">
              Nos Plans Architecturaux
            </h2>
          </AnimatedSection>

          {/* Type Filter */}
          <AnimatedSection className="flex flex-wrap gap-3 mb-10 justify-center">
            {planTypes.map((type) => (
              <button
                key={type}
                onClick={() => setActiveType(type)}
                className={`px-5 py-2 rounded-full font-semibold text-sm transition-all duration-200 ${
                  activeType === type
                    ? 'bg-green-900 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-green-50 hover:text-green-900'
                }`}
              >
                {type}
              </button>
            ))}
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((plan) => (
              <AnimatedSection key={plan.id}>
                <PlanCard plan={plan} onSelect={setSelectedPlan} />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Custom Plan CTA */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <AnimatedSection>
            <div className="bg-green-900 rounded-3xl p-6 sm:p-10 text-white text-center">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4" style={{ fontFamily: 'Montserrat, system-ui, sans-serif' }}>
                Plan sur Mesure ?
              </h2>
              <p className="text-green-200 text-base sm:text-lg mb-6 sm:mb-8 max-w-xl mx-auto">
                Vous avez une vision unique ? Nos architectes conçoivent des plans personnalisés selon vos spécifications et votre budget.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <Link to="/contact" className="btn-primary bg-green-500 hover:bg-green-600 px-8 py-4 justify-center">
                  Plan Personnalisé <ArrowRight size={18} />
                </Link>
                <a href="tel:+237654210842" className="border-2 border-white text-white hover:bg-white hover:text-green-900 font-semibold px-8 py-4 rounded-lg transition-all duration-300 inline-flex items-center justify-center gap-2">
                  <Phone size={18} />
                  +237 654 21 08 42
                </a>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Estimator Modal */}
      {selectedPlan && (
        <PlanEstimator plan={selectedPlan} onClose={() => setSelectedPlan(null)} />
      )}
    </div>
  );
}
