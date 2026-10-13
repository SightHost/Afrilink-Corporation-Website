import React, { useState, useEffect, useCallback } from 'react';
import './index.css';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CookieBanner from './components/CookieBanner';
import QuickSearchModal from './components/QuickSearchModal';
import LegalModal from './components/LegalModal';

import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import GovernancePage from './pages/GovernancePage';
import InvestmentsPage from './pages/InvestmentsPage';
import ContactPage from './pages/ContactPage';
import PartnerPage from './pages/PartnerPage';

// Simple client-side router based on state
function parseRoute(route) {
  if (!route || route === 'home') return { page: 'home', sub: null };
  if (route.startsWith('about/')) return { page: 'about', sub: route.replace('about/', '') };
  if (route === 'about') return { page: 'about', sub: null };
  if (route.startsWith('governance/')) return { page: 'governance', sub: route.replace('governance/', '') };
  if (route === 'governance') return { page: 'governance', sub: null };
  if (route.startsWith('investments/')) return { page: 'investments', sub: route.replace('investments/', '') };
  if (route === 'investments') return { page: 'investments', sub: null };
  if (route === 'contact') return { page: 'contact', sub: null };
  if (route === 'partner') return { page: 'partner', sub: null };
  return { page: 'home', sub: null };
}

export default function App() {
  const [currentRoute, setCurrentRoute] = useState('home');
  const [searchOpen, setSearchOpen] = useState(false);
  const [legalModal, setLegalModal] = useState(null); // 'popia' | 'paia' | 'terms' | null

  const navigate = useCallback((route) => {
    setCurrentRoute(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Keyboard shortcut: Ctrl+K / Cmd+K for search
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
      if (e.key === 'Escape') {
        setSearchOpen(false);
        setLegalModal(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const { page, sub } = parseRoute(currentRoute);

  return (
    <div className="min-h-screen bg-white text-afrilink-navy font-sans antialiased">
      {/* Sticky Navigation */}
      <Navbar
        currentRoute={currentRoute}
        onNavigate={navigate}
        onOpenSearch={() => setSearchOpen(true)}
      />

      {/* Page Content */}
      <main>
        {page === 'home' && <HomePage onNavigate={navigate} />}
        {page === 'about' && (
          <AboutPage
            currentTab={sub || 'overview'}
            onNavigate={navigate}
          />
        )}
        {page === 'governance' && (
          <GovernancePage
            currentSub={sub}
            onNavigate={navigate}
          />
        )}
        {page === 'investments' && (
          <InvestmentsPage
            currentSlug={sub}
            onNavigate={navigate}
          />
        )}
        {page === 'contact' && <ContactPage onNavigate={navigate} />}
        {page === 'partner' && <PartnerPage onNavigate={navigate} />}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={navigate}
        onOpenLegal={setLegalModal}
      />

      {/* Global Overlays */}
      {searchOpen && (
        <QuickSearchModal
          onClose={() => setSearchOpen(false)}
          onNavigate={(route) => { navigate(route); setSearchOpen(false); }}
        />
      )}

      {legalModal && (
        <LegalModal
          type={legalModal}
          onClose={() => setLegalModal(null)}
        />
      )}

      <CookieBanner />
    </div>
  );
}
