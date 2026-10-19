import React, { useState, useEffect } from 'react';
import { ChevronDown, Menu, X, ArrowRight, Search, Shield, Building2, Users, FileCheck, Phone, Landmark } from 'lucide-react';
import AfrilinkLogo from './AfrilinkLogo';
import CTAButton from './CTAButton';

export default function Navbar({ currentRoute, onNavigate, onOpenSearch }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null); // 'about' | 'governance' | 'investments' | null
  const [mobileAccordions, setMobileAccordions] = useState({
    about: false,
    governance: false,
    investments: false
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (route) => {
    setActiveDropdown(null);
    setMobileMenuOpen(false);
    onNavigate(route);
  };

  const toggleMobileAccordion = (section) => {
    setMobileAccordions((prev) => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const navItems = [
    { label: 'Home', route: 'home' },
    {
      label: 'About',
      id: 'about',
      hasDropdown: true,
      children: [
        { label: 'Company Overview & Values', route: 'about/overview', desc: 'Mission, vision, milestones & partnerships' },
        { label: 'Founder & CEO Profile', route: 'about/ceo', desc: 'Dr Molefe M.D. Mokgatle (39 yrs leadership)' },
        { label: 'Shareholders & Capital', route: 'about/shareholders', desc: 'Empowerment equity & institutional structure' },
        { label: 'Corporate Gallery', route: 'about/gallery', desc: 'Projects, UN address & milestones' }
      ]
    },
    {
      label: 'Governance',
      id: 'governance',
      hasDropdown: true,
      children: [
        { label: 'Governance Hub & Standards', route: 'governance', desc: 'King IV compliance & executive oversight' },
        { label: 'B-BBEE Transformation', route: 'governance/bbee', desc: 'Level 1 status & 100% black ownership credentials' },
        { label: 'Statutory Compliance & SARS', route: 'governance/compliance', desc: 'CIPC registration, Tax PIN & POPIA data officer' },
        { label: 'Letter of Good Standing (COIDA)', route: 'governance/good-standing', desc: 'Department of Labour workplace safety status' }
      ]
    },
    {
      label: 'Investments',
      id: 'investments',
      hasDropdown: true,
      children: [
        { label: 'All Investment Holdings', route: 'investments', desc: 'Diversified portfolio across South Africa & Botswana' },
        { label: 'Sector: Mining & Commodities', route: 'investments/mining', desc: 'Gold, diamonds, manganese, chrome & vanadium' },
        { label: 'Sector: Infrastructure & Civils', route: 'investments/infrastructure', desc: 'Bulk water, civic engineering & municipal PPPs' },
        { label: 'Sector: Digital Engineering', route: 'investments/digital', desc: 'Strider Digital tier-1 bank UX & QA engineering' },
        { label: 'Sector: Human Capital Academy', route: 'investments/human-capital', desc: 'Mahlori Group youth upskilling & SETA certifications' },
        { label: 'Sector: Strategic Ventures', route: 'investments/strategic', desc: 'German ELO AI alliance & University of Botswana EdTech MOU' }
      ]
    },
    { label: 'Contact Us', route: 'contact' }
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-afrilink-surface shadow-card border-b border-afrilink-grey-light py-3.5'
          : 'bg-afrilink-surface border-b border-afrilink-grey-light py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <AfrilinkLogo
            light
            onClick={() => handleNavClick('home')}
            variant="full"
          />


          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navItems.map((item) => {
              if (!item.hasDropdown) {
                const isActive = currentRoute === item.route;
                return (
                  <button
                    key={item.label}
                    onClick={() => handleNavClick(item.route)}
                    className={`px-3 xl:px-3.5 py-2 text-[15px] xl:text-base font-semibold whitespace-nowrap relative transition-colors duration-200 border-b-[3px] border-transparent after:absolute after:inset-x-0 after:-bottom-[3px] after:h-[3px] after:rounded-full ${
                      isActive
                        ? 'text-afrilink-orange after:bg-afrilink-gold'
                        : 'text-afrilink-fg hover:text-afrilink-orange'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              }

              // Dropdown Menu Item
              const isSubActive = currentRoute.startsWith(item.id);
              const isOpen = activeDropdown === item.id;

              return (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setActiveDropdown(item.id)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button
                    onClick={() => handleNavClick(item.id)}
                    className={`px-3 xl:px-3.5 py-2 text-[15px] xl:text-base font-semibold whitespace-nowrap relative transition-colors duration-200 border-b-[3px] border-transparent after:absolute after:inset-x-0 after:-bottom-[3px] after:h-[3px] after:rounded-full inline-flex items-center gap-1.5 ${
                      isSubActive
                        ? 'text-afrilink-orange after:bg-afrilink-gold'
                        : 'text-afrilink-fg hover:text-afrilink-orange'
                    }`}
                  >
                    <span>{item.label}</span>
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? 'rotate-180 text-afrilink-orange' : ''}`} />
                  </button>

                  {/* Dropdown Card */}
                  {isOpen && (
                    <div className="absolute top-full left-0 mt-1 w-72 lg:w-80 rounded-lg bg-afrilink-surface border border-afrilink-grey-light shadow-card-hover p-2.5 z-50 animate-fade-in">
                      <div className="text-[13px] font-semibold text-afrilink-orange px-3 py-1.5 border-b border-afrilink-grey-light mb-1">
                        {item.label} Directory
                      </div>
                      <div className="space-y-1">
                        {item.children.map((sub) => (
                          <button
                            key={sub.route}
                            onClick={() => handleNavClick(sub.route)}
                            className="w-full text-left p-2.5 rounded-md hover:bg-afrilink-cream group transition-all"
                          >
                            <div className="text-sm font-semibold text-afrilink-fg group-hover:text-afrilink-orange transition-colors">
                              {sub.label}
                            </div>
                            <div className="text-xs text-afrilink-fg-60 leading-snug mt-0.5">
                              {sub.desc}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Right Header Controls (Search + Primary CTA) */}
          <div className="flex items-center gap-3">
            {/* Quick Search Button */}
            <button
              onClick={onOpenSearch}
              className="p-2 rounded-md bg-afrilink-surface hover:bg-afrilink-cream text-afrilink-fg-80 hover:text-afrilink-fg border border-afrilink-grey transition-colors hidden sm:flex items-center gap-2 text-xs"
              title="Quick Search (Ctrl+K)"
            >
              <Search className="w-4 h-4 text-afrilink-orange" />
              <span className="hidden md:inline text-afrilink-fg-60 text-[13px]">Search</span>
              <kbd className="hidden lg:inline bg-afrilink-cream px-1.5 py-0.5 rounded text-[10px] text-afrilink-fg-60">⌘K</kbd>
            </button>

            {/* Pinned Primary Header CTA: Partner With Us */}
            <CTAButton
              variant="orange"
              size="sm"
              onClick={() => handleNavClick('partner')}
              className="whitespace-nowrap"
            >
              Partner With Us
            </CTAButton>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-md bg-afrilink-surface hover:bg-afrilink-cream text-afrilink-fg border border-afrilink-grey transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer (Full screen with accordion dropdowns and pinned CTA) */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[72px] bottom-0 bg-afrilink-surface z-50 overflow-y-auto border-t border-afrilink-grey-light p-6 flex flex-col justify-between animate-fade-in">
          <div className="space-y-4">
            {/* Search Bar in Mobile Menu */}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSearch();
              }}
              className="w-full flex items-center justify-between p-3.5 rounded-md bg-afrilink-cream border border-afrilink-grey-light text-afrilink-fg-80 text-sm"
            >
              <span className="flex items-center gap-2">
                <Search className="w-4 h-4 text-afrilink-orange" />
                <span>Search holdings, documents, CEO...</span>
              </span>
              <kbd className="bg-afrilink-surface border border-afrilink-grey-light px-2 py-0.5 rounded text-[11px] text-afrilink-fg-60">Open</kbd>
            </button>

            {/* Nav list */}
            <div className="space-y-2">
              {navItems.map((item) => {
                if (!item.hasDropdown) {
                  return (
                    <button
                      key={item.label}
                      onClick={() => handleNavClick(item.route)}
                      className={`w-full text-left p-3 rounded-md text-base font-semibold ${
                        currentRoute === item.route
                          ? 'bg-afrilink-orange text-white'
                          : 'text-afrilink-fg hover:bg-afrilink-cream hover:text-afrilink-orange'
                      }`}
                    >
                      {item.label}
                    </button>
                  );
                }

                const isAccordionOpen = mobileAccordions[item.id];

                return (
                  <div key={item.label} className="border border-afrilink-grey-light rounded-md overflow-hidden bg-afrilink-surface">
                    <button
                      onClick={() => toggleMobileAccordion(item.id)}
                      className="w-full flex items-center justify-between p-3.5 text-base font-semibold text-afrilink-fg"
                    >
                      <span>{item.label}</span>
                      <ChevronDown className={`w-4 h-4 transition-transform ${isAccordionOpen ? 'rotate-180 text-afrilink-orange' : ''}`} />
                    </button>

                    {isAccordionOpen && (
                      <div className="p-2 space-y-1 bg-afrilink-cream border-t border-afrilink-grey-light">
                        {item.children.map((sub) => (
                          <button
                            key={sub.route}
                            onClick={() => handleNavClick(sub.route)}
                            className="w-full text-left p-2.5 rounded hover:bg-afrilink-surface text-sm font-medium text-afrilink-fg hover:text-afrilink-orange"
                          >
                            <div className="font-semibold">{sub.label}</div>
                            <div className="text-xs text-afrilink-fg-60">{sub.desc}</div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom Pinned Mobile CTA & Info */}
          <div className="pt-6 border-t border-afrilink-grey-light space-y-4">
            <CTAButton
              variant="orange"
              size="lg"
              className="w-full justify-center"
              onClick={() => handleNavClick('partner')}
            >
              Partner With Us
            </CTAButton>
            <div className="text-center text-xs text-afrilink-fg-60">
              Johannesburg · Gaborone · London · Diaspora Conduits
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
