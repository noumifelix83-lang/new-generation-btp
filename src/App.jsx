import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Suspense } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import MobileBottomBar from './components/MobileBottomBar';
import HomePage from './pages/Home';
import AboutPage from './pages/About';
import { ServicesListPage, ServiceDetailPage } from './pages/Services';
import ProjectsPage from './pages/Projects';
import CataloguePage from './pages/Catalogue';
import ContactPage from './pages/Contact';

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        {/* pb-20 on mobile reserves space above the fixed bottom bar */}
        <div className="flex-1 flex flex-col pb-20 lg:pb-0">
          <main className="flex-1">
            <Suspense fallback={
              <div className="min-h-screen flex items-center justify-center bg-green-950">
                <div className="text-center text-white">
                  <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                  <p className="text-green-200">Chargement...</p>
                </div>
              </div>
            }>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/a-propos" element={<AboutPage />} />
                <Route path="/services" element={<ServicesListPage />} />
                <Route path="/services/:id" element={<ServiceDetailPage />} />
                <Route path="/realisations" element={<ProjectsPage />} />
                <Route path="/catalogue" element={<CataloguePage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="*" element={
                  <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 pt-16">
                    <div className="text-8xl font-bold text-green-900 mb-4">404</div>
                    <h2 className="text-2xl font-bold text-green-900 mb-3">Page Introuvable</h2>
                    <p className="text-gray-600 mb-8">La page que vous cherchez n'existe pas.</p>
                    <a href="/" className="btn-primary">Retour à l'Accueil</a>
                  </div>
                } />
              </Routes>
            </Suspense>
          </main>
          <Footer />
        </div>
        <MobileBottomBar />
      </div>
    </BrowserRouter>
  );
}
