import React, { useState } from 'react';
import { Globe, ArrowUpRight, CheckCircle2, Sparkles, MapPin } from 'lucide-react';

export default function AfricaMap({ onSelectEntity, onNavigate }) {
  const [activeNode, setActiveNode] = useState('za'); // 'za', 'bw', 'uk', 'eu', 'us'

  const nodes = {
    za: {
      id: 'za',
      name: 'South Africa',
      flag: '🇿🇦',
      badge: 'Headquarters & Core Asset Base',
      hubs: 'Johannesburg, Pretoria, Limpopo & Mpumalanga',
      description: 'The operational and governance anchor of Afrilink Corporation. Directing mineral consortia, civil infrastructure, Tier-1 automotive manufacturing, and elite digital talent squads.',
      companies: [
        { name: 'Afrilink Mining (Pty) Ltd', desc: 'Chrome, Iron, Vanadium & Titanium Tenure', slug: 'afrilink-mining' },
        { name: 'Afrilink Building & Civils', desc: 'Water, Sanitation & Civil Engineering', slug: 'afrilink-buildings' },
        { name: 'Vacuform 2000 (Motherson Net)', desc: 'Tier-1 Automotive Component Manufacturing (Rosslyn)', slug: 'strategic-ventures' },
        { name: 'Strider Digital', desc: 'Enterprise UX & QA Digital Engineering (Level 3 B-BBEE)', slug: 'strider-digital' },
        { name: 'Mahlori Group', desc: 'Daveyton Human Capital & Skills Academy', slug: 'mahlori-group' }
      ]
    },
    bw: {
      id: 'bw',
      name: 'Botswana',
      flag: '🇧🇼',
      badge: 'Mining Rights & Strategic EdTech',
      hubs: 'Gaborone & Prospecting Concessions',
      description: 'Afrilink’s strategic sovereign gateway into one of Africa’s highest-rated mining and legal jurisdictions.',
      companies: [
        { name: 'Afrilink MG (Botswana)', desc: 'Prospecting rights for Gold, Diamonds & Manganese', slug: 'afrilink-mg' },
        { name: 'University of Botswana MOU', desc: '5-Year Digital Transformation & Degree LMS Alliance', slug: 'strategic-ventures' }
      ]
    },
    uk: {
      id: 'uk',
      name: 'United Kingdom (Diaspora Hub)',
      flag: '🇬🇧',
      badge: 'Diaspora Capital & Institutional Networks',
      hubs: 'London Financial District',
      description: 'Chatham House affiliations, London institutional capital syndication, and private wealth diaspora networks mobilizing patient capital into Southern African industrial assets.',
      companies: [
        { name: 'Diaspora Syndication Hub', desc: 'Structured equity & debt participations in SADC assets', slug: 'partner' },
        { name: 'Chatham House Affiliations', desc: 'Geopolitical & developmental economic policy alignment', slug: 'about-ceo' }
      ]
    },
    eu: {
      id: 'eu',
      name: 'Europe (Technology & Offtake)',
      flag: '🇪🇺',
      badge: 'Enterprise AI & Automotive OEMs',
      hubs: 'Stuttgart & Munich, Germany',
      description: 'Longstanding European corporate alliances including German enterprise content titan ELO Digital Office and global automotive supply chains (BMW, Mercedes-Benz, VW).',
      companies: [
        { name: 'ELO Digital Office (Germany)', desc: 'Enterprise AI and low-code ECM across 1.3M+ global users', slug: 'strategic-ventures' },
        { name: 'Automotive OEM Supply Lines', desc: 'Tier-1 supplier networks with German automotive majors', slug: 'strategic-ventures' }
      ]
    },
    us: {
      id: 'us',
      name: 'North America (Diplomacy & Capital)',
      flag: '🇺🇸',
      badge: 'UN Legacy & Private Markets',
      hubs: 'New York & Washington D.C.',
      description: 'Legacy established through Dr Mokgatle’s historic United Nations address on media transition, NATAS board service, and bilateral diaspora investor networks.',
      companies: [
        { name: 'United Nations Legacy', desc: 'Historical keynote address on South African transition', slug: 'about-ceo' },
        { name: 'Diaspora Direct Investment', desc: 'Qualified investor briefings for US-based African diaspora', slug: 'partner' }
      ]
    }
  };

  const currentData = nodes[activeNode] || nodes.za;

  return (
    <div className="relative w-full rounded-lg bg-afrilink-surface border border-afrilink-grey-light p-4 sm:p-6 md:p-10 overflow-hidden shadow-card">

      {/* Header bar */}
      <div className="relative z-10 flex flex-col gap-4 mb-8 pb-6 border-b border-afrilink-grey-light">
        <div>
          <div className="eyebrow mb-2">
            <Globe className="w-3.5 h-3.5" />
            Strategic Geographic Footprint
          </div>
          <h3 className="text-2xl md:text-3xl font-heading font-semibold text-afrilink-fg leading-[1.2]">
            Connecting African Opportunity with Global Capital & Diaspora
          </h3>
          <p className="text-afrilink-fg-60 text-[15px] leading-[1.7] max-w-2xl mt-2">
            Anchored in South Africa and Botswana, with active capital and technology conduits extending across London, Europe, and North America.
          </p>
        </div>

        {/* Quick Node Selector Pills */}
        <div className="flex flex-wrap gap-2">
          {Object.entries(nodes).map(([key, item]) => (
            <button
              key={key}
              onClick={() => setActiveNode(key)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 flex items-center gap-1.5 border ${
                activeNode === key
                  ? 'bg-afrilink-orange text-white border-afrilink-orange shadow-card scale-105'
                  : 'bg-afrilink-cream text-afrilink-fg-80 border-afrilink-grey-light hover:border-afrilink-grey hover:text-afrilink-fg'
              }`}
            >
              <span>{item.flag}</span>
              <span>{item.name.split(' ')[0]}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="relative z-10 flex flex-col gap-6">
        {/* SVG Interactive Map Area */}
        <div className="relative flex items-center justify-center min-h-[300px] sm:min-h-[340px] pb-14 bg-afrilink-cream/60 rounded-lg p-2 sm:p-4 border border-afrilink-grey-light">
          <svg
            viewBox="0 0 700 560"
            className="w-full h-auto max-h-[500px] select-none"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Coordinate grid lines for avant-garde cartography aesthetic */}
            <g opacity="0.14" stroke="#2B3044" strokeWidth="0.75" strokeDasharray="3 5">
              <line x1="80" y1="50" x2="620" y2="50" />
              <line x1="80" y1="150" x2="620" y2="150" />
              <line x1="80" y1="280" x2="620" y2="280" />
              <line x1="80" y1="420" x2="620" y2="420" />
              <line x1="160" y1="30" x2="160" y2="530" />
              <line x1="340" y1="30" x2="340" y2="530" />
              <line x1="500" y1="30" x2="500" y2="530" />
            </g>

            {/* Stylized Silhouette of African Continent */}
            <path
              d="M310 90 
                 C360 85, 430 95, 460 125 
                 C480 145, 520 180, 520 220 
                 C520 260, 460 270, 440 300 
                 C420 330, 400 370, 395 420 
                 C390 460, 370 500, 345 520 
                 C330 530, 320 520, 310 490 
                 C300 450, 275 420, 260 380 
                 C240 330, 210 320, 200 280 
                 C190 240, 160 220, 150 190 
                 C140 160, 170 140, 200 130 
                 C230 120, 270 95, 310 90 Z"
              fill="#FFFFFF"
              stroke="#D1D1D1"
              strokeWidth="1.5"
            />

            {/* Subtle African Topography contour rings */}
            <path
              d="M320 130 C370 125, 430 150, 440 190 C450 230, 410 260, 390 300 C370 340, 360 400, 335 450 C310 420, 280 370, 270 330 C250 280, 220 230, 240 180 C260 145, 290 135, 320 130 Z"
              fill="none"
              stroke="rgba(243, 113, 33, 0.25)"
              strokeWidth="1"
              strokeDasharray="4 4"
            />

            {/* DIASPORA CONNECTION ARCS */}
            {/* SA to UK (London) */}
            <path
              d="M340 480 C260 350, 180 200, 140 60"
              fill="none"
              stroke="#F37121"
              strokeWidth={activeNode === 'uk' || activeNode === 'za' ? "2.5" : "1.2"}
              strokeOpacity={activeNode === 'uk' || activeNode === 'za' ? "0.9" : "0.35"}
              strokeDasharray={activeNode === 'uk' ? "none" : "6 4"}
              className="transition-all duration-300"
            />

            {/* SA to Europe (Stuttgart / Germany) */}
            <path
              d="M340 480 C320 320, 260 160, 220 50"
              fill="none"
              stroke="#2B3044"
              strokeWidth={activeNode === 'eu' || activeNode === 'za' ? "2.5" : "1.2"}
              strokeOpacity={activeNode === 'eu' || activeNode === 'za' ? "0.9" : "0.35"}
              strokeDasharray={activeNode === 'eu' ? "none" : "6 4"}
              className="transition-all duration-300"
            />

            {/* SA to USA (New York) */}
            <path
              d="M340 480 C180 380, 80 220, 50 110"
              fill="none"
              stroke="#F37121"
              strokeWidth={activeNode === 'us' || activeNode === 'za' ? "2.5" : "1.2"}
              strokeOpacity={activeNode === 'us' || activeNode === 'za' ? "0.9" : "0.35"}
              strokeDasharray={activeNode === 'us' ? "none" : "6 4"}
              className="transition-all duration-300"
            />

            {/* Botswana to South Africa Corridor */}
            <path
              d="M330 435 L345 475"
              fill="none"
              stroke="#F37121"
              strokeWidth="3"
              strokeLinecap="round"
            />

            {/* BOTSWANA TERRITORY HIGHLIGHT */}
            <path
              d="M305 410 C325 405, 345 410, 350 425 C355 440, 345 455, 330 455 C315 455, 300 440, 305 410 Z"
              fill="rgba(243, 113, 33, 0.22)"
              stroke="#F37121"
              strokeWidth="1.5"
            />

            {/* SOUTH AFRICA TERRITORY HIGHLIGHT */}
            <path
              d="M305 460 C325 455, 365 455, 380 470 C375 500, 355 525, 335 525 C315 520, 290 490, 305 460 Z"
              fill="rgba(255, 209, 119, 0.55)"
              stroke="#2B3044"
              strokeWidth="1.5"
            />

            {/* DIASPORA NODES (TOP & LEFT) */}
            {/* New York Node */}
            <g
              className="cursor-pointer group"
              onClick={() => setActiveNode('us')}
            >
              <circle cx="50" cy="110" r="14" fill="#FFFFFF" stroke="#F37121" strokeWidth="1.5" />
              <circle cx="50" cy="110" r="5" fill="#F37121" />
              <text x="50" y="140" fill="#040922" fontSize="11" fontWeight="700" textAnchor="middle" fontFamily="Plus Jakarta Sans">USA</text>
              <text x="50" y="153" fill="#5A5E6E" fontSize="9" textAnchor="middle">New York</text>
            </g>

            {/* London Node */}
            <g
              className="cursor-pointer group"
              onClick={() => setActiveNode('uk')}
            >
              <circle cx="140" cy="60" r="14" fill="#FFFFFF" stroke="#F37121" strokeWidth="1.5" />
              <circle cx="140" cy="60" r="5" fill="#F37121" />
              <text x="140" y="38" fill="#040922" fontSize="11" fontWeight="700" textAnchor="middle" fontFamily="Plus Jakarta Sans">UK</text>
              <text x="140" y="24" fill="#5A5E6E" fontSize="9" textAnchor="middle">London</text>
            </g>

            {/* Europe Node */}
            <g
              className="cursor-pointer group"
              onClick={() => setActiveNode('eu')}
            >
              <circle cx="220" cy="50" r="14" fill="#FFFFFF" stroke="#2B3044" strokeWidth="1.5" />
              <circle cx="220" cy="50" r="5" fill="#FFD177" />
              <text x="220" y="32" fill="#040922" fontSize="11" fontWeight="700" textAnchor="middle" fontFamily="Plus Jakarta Sans">EUROPE</text>
              <text x="220" y="18" fill="#5A5E6E" fontSize="9" textAnchor="middle">Stuttgart / Munich</text>
            </g>

            {/* BOTSWANA NODE (Gaborone) */}
            <g
              className="cursor-pointer group"
              onClick={() => setActiveNode('bw')}
            >
              {/* Radar pulse */}
              <circle cx="330" cy="435" r="18" fill="none" stroke="#F37121" strokeWidth="1" opacity="0.6">
                <animate attributeName="r" values="8;24;8" dur="3s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.8;0;0.8" dur="3s" repeatCount="indefinite" />
              </circle>
              <circle cx="330" cy="435" r="9" fill="#FFFFFF" stroke="#F37121" strokeWidth="2.5" />
              <circle cx="330" cy="435" r="4.5" fill="#F37121" />
              <rect x="345" y="420" width="95" height="26" rx="4" fill="#FFFFFF" stroke="#F37121" strokeWidth="1" />
              <text x="353" y="434" fill="#040922" fontSize="10" fontWeight="700">BOTSWANA 🇧🇼</text>
              <text x="353" y="443" fill="#F37121" fontSize="8">Gaborone (Afrilink MG)</text>
            </g>

            {/* SOUTH AFRICA NODE (Johannesburg / Pretoria) */}
            <g
              className="cursor-pointer group"
              onClick={() => setActiveNode('za')}
            >
              {/* Radar pulse */}
              <circle cx="345" cy="485" r="22" fill="none" stroke="#2B3044" strokeWidth="1.5" opacity="0.7">
                <animate attributeName="r" values="10;30;10" dur="2.5s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.9;0;0.9" dur="2.5s" repeatCount="indefinite" />
              </circle>
              <circle cx="345" cy="485" r="11" fill="#FFFFFF" stroke="#2B3044" strokeWidth="2.5" />
              <circle cx="345" cy="485" r="5.5" fill="#FFD177" />
              <rect x="365" y="475" width="125" height="28" rx="4" fill="#FFFFFF" stroke="#2B3044" strokeWidth="1" />
              <text x="373" y="489" fill="#040922" fontSize="10" fontWeight="700">SOUTH AFRICA 🇿🇦</text>
              <text x="373" y="499" fill="#2B3044" fontSize="8">HQ, Civils, Mining, Tech</text>
            </g>
          </svg>

          {/* Bottom legend */}
          <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[11px] text-afrilink-fg-60 bg-afrilink-surface/90 backdrop-blur-md px-3 py-1.5 rounded-md border border-afrilink-grey-light">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-afrilink-orange inline-block" /> Sovereign Concessions</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-afrilink-gold border border-afrilink-fg inline-block" /> Group Headquarters</span>
            </div>
            <span className="italic hidden sm:inline">Click any pin to inspect operations</span>
          </div>
        </div>

        {/* Selected Node Details panel, opens below the map */}
        <div key={activeNode} className="bg-afrilink-cream border border-afrilink-grey-light rounded-lg p-4 sm:p-6 relative overflow-hidden animate-fade-in">
          {/* Card Eyebrow & Title */}
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-[13px] font-semibold text-afrilink-orange flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> {currentData.badge}
            </span>
            <span className="text-2xl">{currentData.flag}</span>
          </div>

          <h4 className="text-2xl font-heading font-semibold text-afrilink-fg mb-1">
            {currentData.name}
          </h4>
          <p className="text-xs text-afrilink-fg-60 mb-3 flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-afrilink-orange shrink-0" />
            {currentData.hubs}
          </p>
          <p className="text-[15px] text-afrilink-fg-80 leading-[1.7] mb-6">
            {currentData.description}
          </p>

          {/* Operational entities list */}
          <div className="mb-6">
            <div className="text-[13px] font-semibold text-afrilink-fg-60 mb-2.5">
              Key Operations & Synergies
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {currentData.companies.map((co, idx) => (
              <div
                key={idx}
                onClick={() => {
                  if (co.slug === 'partner') onNavigate?.('partner');
                  else if (co.slug === 'about-ceo') onNavigate?.('about/ceo');
                  else onSelectEntity ? onSelectEntity(co.slug) : onNavigate?.(`investments/${co.slug}`);
                }}
                className="group flex items-start justify-between p-2.5 rounded-lg bg-afrilink-surface hover:bg-afrilink-butter/60 border border-afrilink-grey-light hover:border-afrilink-orange/40 cursor-pointer transition-all duration-200"
              >
                <div>
                  <div className="text-sm font-semibold text-afrilink-fg group-hover:text-afrilink-orange transition-colors flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-afrilink-orange shrink-0" />
                    {co.name}
                  </div>
                  <div className="text-xs text-afrilink-fg-60 ml-5">{co.desc}</div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-afrilink-fg-60 group-hover:text-afrilink-orange group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 mt-0.5" />
              </div>
            ))}
            </div>
          </div>

          {/* Action Button */}
          <button
            onClick={() => {
              if (activeNode === 'bw') onNavigate?.('investments/afrilink-mg');
              else if (activeNode === 'za') onNavigate?.('investments');
              else onNavigate?.('partner');
            }}
            className="w-full py-3 px-5 rounded-full btn-glass btn-glass-orange text-white text-sm font-semibold flex items-center justify-center gap-2"
          >
            <span>Explore {currentData.name} Engagements</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
