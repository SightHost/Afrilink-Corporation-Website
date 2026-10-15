import React, { useState, useEffect, useCallback } from 'react';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CookieBanner from './components/CookieBanner';
import QuickSearchModal from './components/QuickSearchModal';
import LegalModal from './components/LegalModal';

import HomePage from './views/HomePage';
import AboutOverviewPage from './views/AboutOverviewPage';
import AboutCeoPage from './views/AboutCeoPage';
import AboutShareholdersPage from './views/AboutShareholdersPage';
import AboutGalleryPage from './views/AboutGalleryPage';

import GovernanceOverviewPage from './views/GovernanceOverviewPage';
import GovernanceBbeePage from './views/GovernanceBbeePage';
import GovernanceCompliancePage from './views/GovernanceCompliancePage';
import GovernanceLabourPage from './views/GovernanceLabourPage';

import InvestmentsPage from './views/InvestmentsPage';
import SectorMiningPage from './views/SectorMiningPage';
import SectorInfrastructurePage from './views/SectorInfrastructurePage';
import SectorDigitalPage from './views/SectorDigitalPage';
import SectorHumanCapitalPage from './views/SectorHumanCapitalPage';
import SectorStrategicPage from './views/SectorStrategicPage';

import { withBase } from './lib/paths';

import ContactPage from './views/ContactPage';
import PartnerPage from './views/PartnerPage';

// Client-side router mapping routes to dedicated pages
function parseRoute(route) {
  if (!route || route === 'home') return { page: 'home', sub: null };

  // About routes
  if (route === 'about' || route === 'about/overview') return { page: 'about-overview', sub: null };
  if (route === 'about/ceo') return { page: 'about-ceo', sub: null };
  if (route === 'about/shareholders') return { page: 'about-shareholders', sub: null };
  if (route === 'about/gallery') return { page: 'about-gallery', sub: null };

  // Governance routes
  if (route === 'governance' || route === 'governance/overview') return { page: 'governance-overview', sub: null };
  if (route === 'governance/bbee') return { page: 'governance-bbee', sub: null };
  if (route === 'governance/compliance' || route === 'governance/cipc') return { page: 'governance-compliance', sub: null };
  if (route === 'governance/good-standing' || route === 'governance/labour') return { page: 'governance-labour', sub: null };

  // Sector routes
  if (route === 'investments/mining' || route === 'investments/sector/mining') return { page: 'sector-mining', sub: null };
  if (route === 'investments/infrastructure' || route === 'investments/sector/infrastructure') return { page: 'sector-infrastructure', sub: null };
  if (route === 'investments/digital' || route === 'investments/sector/digital') return { page: 'sector-digital', sub: null };
  if (route === 'investments/human-capital' || route === 'investments/sector/human-capital') return { page: 'sector-human-capital', sub: null };
  if (route === 'investments/strategic' || route === 'investments/sector/strategic') return { page: 'sector-strategic', sub: null };

  // Holdings & Investments hub
  if (route.startsWith('investments/')) {
    const slug = route.replace('investments/', '');
    return { page: 'investments-hub', sub: slug };
  }
  if (route === 'investments') return { page: 'investments-hub', sub: null };

  // Contact & Partner
  if (route === 'contact') return { page: 'contact', sub: null };
  if (route === 'partner') return { page: 'partner', sub: null };

  return { page: 'home', sub: null };
}

// Each route is a prerendered Astro page; navigating loads the real URL
export function routeToPath(route) {
  return withBase(!route || route === 'home' ? '/' : `/${route}`);
}

export default function App({ route = 'home' }) {
  const currentRoute = route;
  const [searchOpen, setSearchOpen] = useState(false);
  const [legalModal, setLegalModal] = useState(null); // 'popia' | 'paia' | 'terms' | null

  const navigate = useCallback((target) => {
    window.location.assign(routeToPath(target));
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
    <div className="min-h-screen bg-afrilink-surface text-afrilink-fg font-sans antialiased">
      {/* Sticky Navigation */}
      <Navbar
        currentRoute={currentRoute}
        onNavigate={navigate}
        onOpenSearch={() => setSearchOpen(true)}
      />

      {/* Page Content */}
      <main>
        {page === 'home' && <HomePage onNavigate={navigate} />}

        {/* About dedicated pages */}
        {page === 'about-overview' && <AboutOverviewPage onNavigate={navigate} />}
        {page === 'about-ceo' && <AboutCeoPage onNavigate={navigate} />}
        {page === 'about-shareholders' && <AboutShareholdersPage onNavigate={navigate} />}
        {page === 'about-gallery' && <AboutGalleryPage onNavigate={navigate} />}

        {/* Governance dedicated pages */}
        {page === 'governance-overview' && <GovernanceOverviewPage onNavigate={navigate} />}
        {page === 'governance-bbee' && <GovernanceBbeePage onNavigate={navigate} />}
        {page === 'governance-compliance' && <GovernanceCompliancePage onNavigate={navigate} />}
        {page === 'governance-labour' && <GovernanceLabourPage onNavigate={navigate} />}

        {/* Investment dedicated sector pages */}
        {page === 'sector-mining' && <SectorMiningPage onNavigate={navigate} />}
        {page === 'sector-infrastructure' && <SectorInfrastructurePage onNavigate={navigate} />}
        {page === 'sector-digital' && <SectorDigitalPage onNavigate={navigate} />}
        {page === 'sector-human-capital' && <SectorHumanCapitalPage onNavigate={navigate} />}
        {page === 'sector-strategic' && <SectorStrategicPage onNavigate={navigate} />}

        {/* Investment Hub & Holdings */}
        {page === 'investments-hub' && (
          <InvestmentsPage
            currentSlug={sub}
            onNavigate={navigate}
          />
        )}

        {/* Contact & Partner */}
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
          isOpen={searchOpen}
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
