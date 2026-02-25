import { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2 } from 'lucide-react';

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

const services = [
  'Génie Civil', 'Génie Électrique', 'Architecture', 'Permis de Bâtir',
  'Topographie', 'Rénovation & Réhabilitation', 'Froid & Climatisation',
  'Immobilier', 'Plan Architectural (Catalogue)', 'Autre',
];

export default function ContactPage() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const planName = params.get('plan');
  const planSurface = params.get('surface');
  const planTotal = params.get('total');

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    service: planName ? 'Plan Architectural (Catalogue)' : '',
    subject: planName ? `Plan: ${planName} - ${planSurface}m²` : '',
    message: planName ? `Je suis intéressé(e) par le plan "${planName}" (${planSurface}m²). Estimation: ${Number(planTotal).toLocaleString('fr-FR')} FCFA.\n\nVeuillez me contacter pour finaliser les détails.` : '',
    budget: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Le nom est requis';
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Email invalide';
    if (!form.phone.trim()) errs.phone = 'Le téléphone est requis';
    if (!form.message.trim()) errs.message = 'Le message est requis';
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setSubmitting(true);
    // Simulate API call
    await new Promise(r => setTimeout(r, 1500));
    setSubmitting(false);
    setSubmitted(true);
  };

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) setErrors(prev => ({ ...prev, [e.target.name]: '' }));
  };

  return (
    <div className="min-h-screen pt-16">
      {/* Hero */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-green-950 to-green-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20"
          style={{ backgroundImage: 'url(https://images.pexels.com/photos/9301291/pexels-photo-9301291.jpeg?auto=compress&cs=tinysrgb&w=1600)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <span className="inline-block bg-green-500/20 border border-green-500/30 text-green-300 rounded-full px-4 py-2 text-sm font-medium mb-6">
            Contactez-Nous
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'Montserrat, system-ui, sans-serif' }}>
            Parlons de Votre Projet
          </h1>
          <p className="text-green-200 text-lg max-w-2xl mx-auto">
            Notre équipe d'experts est prête à vous accompagner. Contactez-nous pour une consultation gratuite.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none"><path d="M0 60H1440V20C1440 20 1100 60 720 35C340 10 0 45 0 45V60Z" fill="white" /></svg>
        </div>
      </section>

      {/* Main */}
      <section className="py-10 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Info Sidebar */}
            <AnimatedSection className="space-y-6">
              {/* Contact info */}
              <div className="bg-green-900 text-white rounded-2xl p-6">
                <h2 className="text-xl font-bold mb-6">Informations de Contact</h2>
                <div className="space-y-5">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center shrink-0">
                      <Phone size={18} />
                    </div>
                    <div>
                      <p className="text-green-200 text-xs mb-1">Téléphone</p>
                      <a href="tel:+237654210842" className="font-semibold text-sm hover:text-green-300 transition-colors block">+237 654 21 08 42</a>
                      <a href="tel:+237671547984" className="font-semibold text-sm hover:text-green-300 transition-colors block">+237 671 54 79 84</a>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center shrink-0">
                      <Mail size={18} />
                    </div>
                    <div>
                      <p className="text-green-200 text-xs mb-1">Email</p>
                      <a href="mailto:generationnouvelle@gmail.com" className="font-semibold text-sm hover:text-green-300 transition-colors">
                        generationnouvelle@gmail.com
                      </a>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center shrink-0">
                      <MapPin size={18} />
                    </div>
                    <div>
                      <p className="text-green-200 text-xs mb-1">Adresse</p>
                      <p className="font-semibold text-sm">Yaoundé, Cameroun</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center shrink-0">
                      <Clock size={18} />
                    </div>
                    <div>
                      <p className="text-green-200 text-xs mb-1">Heures d'ouverture</p>
                      <p className="font-semibold text-sm">Lun – Sam : 7h30 – 18h00</p>
                      <p className="text-green-300 text-xs">Urgences : 24h/24</p>
                    </div>
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t border-green-800">
                  <p className="text-green-200 text-sm mb-3">Suivez-nous</p>
                  <div className="flex gap-3">
                    {[
                    { label: 'f', title: 'Facebook' },
                    { label: 'in', title: 'LinkedIn' },
                    { label: 'ig', title: 'Instagram' },
                  ].map((s) => (
                      <a key={s.title} href="#" title={s.title} className="w-9 h-9 bg-green-800 hover:bg-green-500 rounded-lg flex items-center justify-center transition-colors duration-300 text-xs font-bold">
                        {s.label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Quick actions */}
              <div className="bg-green-50 rounded-2xl p-6">
                <h3 className="font-bold text-green-900 mb-4">Réponse Rapide</h3>
                <div className="space-y-3">
                  <a href="tel:+237654210842"
                    className="flex items-center gap-3 p-3 bg-white rounded-xl hover:shadow-md transition-shadow duration-200 group">
                    <div className="w-10 h-10 bg-green-100 group-hover:bg-green-500 rounded-xl flex items-center justify-center transition-colors">
                      <Phone size={18} className="text-green-500 group-hover:text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-green-900 text-sm">Appel Direct</div>
                      <div className="text-gray-500 text-xs">Réponse immédiate</div>
                    </div>
                  </a>
                  <a href="https://wa.me/237654210842" target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 bg-white rounded-xl hover:shadow-md transition-shadow duration-200 group">
                    <div className="w-10 h-10 bg-green-100 group-hover:bg-green-500 rounded-xl flex items-center justify-center transition-colors">
                      <span className="text-green-600 group-hover:text-white font-bold text-sm">WA</span>
                    </div>
                    <div>
                      <div className="font-semibold text-green-900 text-sm">WhatsApp</div>
                      <div className="text-gray-500 text-xs">Messagerie instantanée</div>
                    </div>
                  </a>
                </div>
              </div>
            </AnimatedSection>

            {/* Form */}
            <AnimatedSection className="lg:col-span-2">
              {submitted ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-20">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 size={40} className="text-green-500" />
                  </div>
                  <h2 className="text-2xl font-bold text-green-900 mb-3">Message Envoyé !</h2>
                  <p className="text-gray-600 mb-2">Merci pour votre message, <strong>{form.name}</strong>.</p>
                  <p className="text-gray-600 mb-8">Notre équipe vous contactera dans les 24 heures.</p>
                  <button onClick={() => setSubmitted(false)} className="btn-primary">
                    Envoyer un autre message
                  </button>
                </div>
              ) : (
                <div>
                  <h2 className="text-2xl font-bold text-green-900 mb-2">Envoyez-nous un Message</h2>
                  <p className="text-gray-600 mb-8">Remplissez ce formulaire et nous vous répondrons dans les meilleurs délais.</p>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          Nom complet <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          placeholder="Jean Dupont"
                          className={`input-field ${errors.name ? 'border-red-400 ring-1 ring-red-400' : ''}`}
                        />
                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          Email <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          placeholder="vous@exemple.com"
                          className={`input-field ${errors.email ? 'border-red-400 ring-1 ring-red-400' : ''}`}
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          Téléphone <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={form.phone}
                          onChange={handleChange}
                          placeholder="+237 6XX XXX XXX"
                          className={`input-field ${errors.phone ? 'border-red-400 ring-1 ring-red-400' : ''}`}
                        />
                        {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Service concerné</label>
                        <select name="service" value={form.service} onChange={handleChange} className="input-field">
                          <option value="">Sélectionner un service...</option>
                          {services.map((s) => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Objet</label>
                        <input
                          type="text"
                          name="subject"
                          value={form.subject}
                          onChange={handleChange}
                          placeholder="Objet de votre demande"
                          className="input-field"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Budget estimé (FCFA)</label>
                        <select name="budget" value={form.budget} onChange={handleChange} className="input-field">
                          <option value="">Budget approximatif...</option>
                          <option value="< 5M">Moins de 5 Millions</option>
                          <option value="5-15M">5 à 15 Millions</option>
                          <option value="15-30M">15 à 30 Millions</option>
                          <option value="30-50M">30 à 50 Millions</option>
                          <option value="50-100M">50 à 100 Millions</option>
                          <option value="> 100M">Plus de 100 Millions</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Message <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        rows={6}
                        placeholder="Décrivez votre projet, vos besoins, votre localisation..."
                        className={`input-field resize-none ${errors.message ? 'border-red-400 ring-1 ring-red-400' : ''}`}
                      />
                      {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                    </div>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="btn-primary w-full justify-center text-base py-4 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {submitting ? (
                        <span className="flex items-center gap-2">
                          <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                          Envoi en cours...
                        </span>
                      ) : (
                        <>
                          <Send size={18} />
                          Envoyer le Message
                        </>
                      )}
                    </button>
                  </form>
                </div>
              )}
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Map section */}
      <section className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <AnimatedSection className="text-center mb-8">
            <h2 className="section-title">Où Nous Trouver</h2>
            <p className="text-gray-600">Yaoundé, Cameroun – Interventions sur tout le territoire national</p>
          </AnimatedSection>
          <AnimatedSection>
            <div className="rounded-3xl overflow-hidden shadow-2xl h-56 sm:h-80 bg-green-100 flex items-center justify-center">
              <iframe
                title="New Generation BTP Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127672.07685516537!2d11.43845087!3d3.87019505!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x108bcfe4e1c2e7d3%3A0x6b61b63e3cf8a3d0!2sYaound%C3%A9%2C%20Cameroon!5e0!3m2!1sfr!2sfr!4v1700000000000!5m2!1sfr!2sfr"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Zones d'intervention */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-8">
            <h2 className="text-2xl font-bold text-green-900" style={{ fontFamily: 'Montserrat, system-ui, sans-serif' }}>
              Zones d'Intervention
            </h2>
            <p className="text-gray-600 mt-2">Nous intervenons dans toutes les régions du Cameroun</p>
          </AnimatedSection>
          <AnimatedSection>
            <div className="flex flex-wrap gap-3 justify-center">
              {[
                'Yaoundé', 'Douala', 'Bafoussam', 'Bamenda', 'Garoua',
                'Maroua', 'Ngaoundéré', 'Bertoua', 'Ebolowa', 'Kribi',
                'Limbé', 'Dschang', 'Mbalmayo', 'Edéa', 'Et Partout au Cameroun'
              ].map((city) => (
                <span key={city} className={`px-4 py-2 rounded-full text-sm font-medium ${
                  city === 'Et Partout au Cameroun'
                    ? 'bg-green-500 text-white'
                    : 'bg-green-50 text-green-900 border border-green-200'
                }`}>
                  📍 {city}
                </span>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
