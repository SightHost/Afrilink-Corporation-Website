import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight, FileText, Briefcase, User, Sparkles, Building } from 'lucide-react';
import { investmentsData } from '../data/investmentsData';
import { governanceDocs } from '../data/governanceData';

export default function QuickSearchModal({ isOpen, onClose, onNavigate }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  // Keyboard shortcut listener (Ctrl+K or Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else onNavigate(window.location.hash || '');
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Search logic
  const normalizedQuery = query.toLowerCase().trim();

  const matchedInvestments = investmentsData.filter(item =>
    item.name.toLowerCase().includes(normalizedQuery) ||
    item.sector.toLowerCase().includes(normalizedQuery) ||
    item.country.toLowerCase().includes(normalizedQuery) ||
    item.oneLiner.toLowerCase().includes(normalizedQuery)
  );

  const matchedDocs = governanceDocs.filter(doc =>
    doc.code.toLowerCase().includes(normalizedQuery) ||
    doc.title.toLowerCase().includes(normalizedQuery) ||
    doc.category.toLowerCase().includes(normalizedQuery) ||
    doc.description.toLowerCase().includes(normalizedQuery)
  );

  const quickLinks = [
    { label: 'Dr Molefe M.D. Mokgatle (Founder & CEO Profile)', route: 'about/ceo', category: 'Leadership', icon: User },
    { label: 'Company Overview, Mission & Values', route: 'about/overview', category: 'About', icon: Building },
    { label: 'Shareholding Structure & Capital Architecture', route: 'about/shareholders', category: 'About', icon: Building },
    { label: 'Corporate Gallery & Project Archive', route: 'about/gallery', category: 'Media', icon: Sparkles },
    { label: 'Level 1 B-BBEE Transformation & Certificate', route: 'governance/bbee', category: 'Governance', icon: FileText },
    { label: 'Statutory Compliance, CIPC & SARS Tax PIN', route: 'governance/compliance', category: 'Governance', icon: FileText },
    { label: 'COIDA Letter of Good Standing & Labour', route: 'governance/good-standing', category: 'Governance', icon: FileText },
    { label: 'Sector: Mining & Commodities (Botswana & SA)', route: 'investments/mining', category: 'Sectors', icon: Briefcase },
    { label: 'Sector: Infrastructure, Water & Civils', route: 'investments/infrastructure', category: 'Sectors', icon: Briefcase },
    { label: 'Sector: Digital Engineering & Tech Talent', route: 'investments/digital', category: 'Sectors', icon: Briefcase },
    { label: 'Sector: Human Capital Academy (Daveyton)', route: 'investments/human-capital', category: 'Sectors', icon: Briefcase },
    { label: 'Sector: Strategic Manufacturing & ELO AI', route: 'investments/strategic', category: 'Sectors', icon: Briefcase },
    { label: 'Partner With Us Briefing Form', route: 'partner', category: 'Investment CTA', icon: Briefcase },
    { label: 'Johannesburg Corporate Office & Contacts', route: 'contact', category: 'Contact', icon: Building }
  ].filter(l => l.label.toLowerCase().includes(normalizedQuery));

  const handleSelect = (route) => {
    onClose();
    onNavigate(route);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-afrilink-navy/60 backdrop-blur-sm animate-fade-in">
      <div 
        className="relative w-full max-w-2xl bg-white border border-afrilink-grey-light rounded-lg shadow-card-hover overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search input bar */}
        <div className="p-4 bg-white border-b border-afrilink-grey-light flex items-center gap-3">
          <Search className="w-5 h-5 text-afrilink-orange shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search investments, mining rights, B-BBEE, CEO profile, compliance..."
            className="w-full bg-transparent text-afrilink-navy placeholder-afrilink-navy-60 text-base focus:outline-none"
          />
          {query && (
            <button onClick={() => setQuery('')} className="text-afrilink-navy-60 hover:text-afrilink-navy p-1">
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline bg-afrilink-cream px-2 py-0.5 rounded text-[11px] text-afrilink-navy-60 border border-afrilink-grey-light">
            ESC
          </kbd>
        </div>

        {/* Results area */}
        <div className="p-4 max-h-[60vh] overflow-y-auto space-y-4">
          {/* Investments Section */}
          {matchedInvestments.length > 0 && (
            <div>
              <div className="text-[13px] font-semibold text-afrilink-orange px-2 mb-2">
                Portfolio Entities & Opportunities ({matchedInvestments.length})
              </div>
              <div className="space-y-1">
                {matchedInvestments.map((inv) => (
                  <div
                    key={inv.slug}
                    onClick={() => handleSelect(`investments/${inv.slug}`)}
                    className="p-3 rounded-md bg-white hover:bg-afrilink-cream hover:border-afrilink-orange/40 border border-afrilink-grey-light cursor-pointer flex items-center justify-between group transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{inv.flag}</span>
                      <div>
                        <div className="text-sm font-semibold text-afrilink-navy group-hover:text-afrilink-orange transition-colors">
                          {inv.name}
                        </div>
                        <div className="text-xs text-afrilink-navy-60 line-clamp-1">
                          {inv.oneLiner}
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-afrilink-navy-60 group-hover:text-afrilink-orange group-hover:translate-x-1 transition-all" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Governance Docs Section */}
          {matchedDocs.length > 0 && (
            <div>
              <div className="text-[13px] font-semibold text-afrilink-orange px-2 mb-2">
                Governance & Verification Records ({matchedDocs.length})
              </div>
              <div className="space-y-1">
                {matchedDocs.map((doc) => (
                  <div
                    key={doc.id}
                    onClick={() => handleSelect('governance')}
                    className="p-3 rounded-md bg-white hover:bg-afrilink-cream hover:border-afrilink-orange/40 border border-afrilink-grey-light cursor-pointer flex items-center justify-between group transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded bg-afrilink-butter text-afrilink-navy text-xs font-semibold font-mono">
                        {doc.code}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-afrilink-navy group-hover:text-afrilink-orange transition-colors">
                          {doc.title}
                        </div>
                        <div className="text-xs text-afrilink-navy-60">
                          {doc.level} · {doc.status}
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-afrilink-navy-60 group-hover:text-afrilink-orange group-hover:translate-x-1 transition-all" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quick Links Section */}
          {quickLinks.length > 0 && (
            <div>
              <div className="text-[13px] font-semibold text-afrilink-orange px-2 mb-2">
                Corporate Sections & Leadership
              </div>
              <div className="space-y-1">
                {quickLinks.map((ql, i) => {
                  const Icon = ql.icon;
                  return (
                    <div
                      key={i}
                      onClick={() => handleSelect(ql.route)}
                      className="p-3 rounded-md bg-white hover:bg-afrilink-cream border border-afrilink-grey-light cursor-pointer flex items-center justify-between group transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="w-4 h-4 text-afrilink-orange" />
                        <div>
                          <div className="text-sm font-medium text-afrilink-navy group-hover:text-afrilink-orange transition-colors">
                            {ql.label}
                          </div>
                          <div className="text-xs text-afrilink-navy-60">{ql.category}</div>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-afrilink-navy-60 group-hover:text-afrilink-orange group-hover:translate-x-1 transition-all" />
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {matchedInvestments.length === 0 && matchedDocs.length === 0 && quickLinks.length === 0 && (
            <div className="text-center py-8 text-afrilink-navy-60 text-sm">
              No matching corporate results for "{query}". Try "Botswana", "B-BBEE", "CEO", "Mining", or "Civils".
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-afrilink-cream border-t border-afrilink-grey-light text-xs text-afrilink-navy-60 flex items-center justify-between px-4">
          <span>Search Afrilink Corporation Knowledge Registry</span>
          <span className="text-afrilink-orange font-semibold">Press ESC to exit</span>
        </div>
      </div>
    </div>
  );
}
