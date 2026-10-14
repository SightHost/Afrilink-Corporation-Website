import React, { useState } from 'react';
import { Award, Briefcase, Globe, Users, ExternalLink, ChevronDown, ChevronUp, MapPin, BookOpen } from 'lucide-react';
import CTAButton from '../components/CTAButton';
import { ceoProfile, boardMembers, shareholdersData, milestonesData, strategicPartnersData } from '../data/corporateData';

function TabNav({ tabs, active, onSelect }) {
  return (
    <div className="flex flex-wrap gap-2">
      {tabs.map(t => (
        <button
          key={t.id}
          onClick={() => onSelect(t.id)}
          className={`px-5 py-2 rounded-full text-sm font-semibold border transition-all ${
            active === t.id
              ? 'bg-afrilink-orange text-white border-afrilink-orange shadow-card'
              : 'bg-white text-afrilink-navy border-afrilink-grey hover:border-afrilink-orange hover:text-afrilink-orange'
          }`}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}

function OverviewTab({ onNavigate }) {
  return (
    <div>
      {/* Mission / Vision cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
        {[
          { label: 'Mission', icon: Globe, color: '#F37121', text: 'To be the pre-eminent pan-African investment holding company, channelling diaspora capital and expertise into transformative economic opportunities across Africa, in service of a prosperous, self-reliant continent.' },
          { label: 'Vision', icon: Award, color: '#F18728', text: 'To create sustainable, broad-based wealth through strategic investment in mining, infrastructure, technology, and human capital — ensuring every community in our footprint participates in and benefits from our growth.' },
          { label: 'Values', icon: Users, color: '#2B3044', text: 'Ubuntu · Integrity · Excellence · Transformation · Sustainability · Pan-African Solidarity. These are not aspirations — they are our operating principles.' },
        ].map(item => (
          <div key={item.label} className="bg-white rounded-lg p-7 border border-afrilink-grey-light shadow-card hover:shadow-card-hover transition-shadow">
            <div className="w-11 h-11 rounded-md flex items-center justify-center mb-5" style={{ background: `${item.color}20`, border: `1px solid ${item.color}40` }}>
              <item.icon className="w-5 h-5" style={{ color: item.color }} />
            </div>
            <div className="font-heading text-xl font-semibold text-afrilink-navy mb-3">{item.label}</div>
            <p className="text-afrilink-navy-80 text-base leading-[1.7]">{item.text}</p>
          </div>
        ))}
      </div>

      {/* Partnerships */}
      {strategicPartnersData && strategicPartnersData.length > 0 && (
        <div className="mb-14">
          <h3 className="font-heading text-2xl font-semibold text-afrilink-navy mb-6">Strategic Alliances & Partnerships</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {strategicPartnersData.map((p, i) => (
              <div key={i} className="bg-white rounded-lg p-5 border border-afrilink-grey-light shadow-card hover:shadow-card-hover hover:border-afrilink-orange/30 transition-all">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-md bg-afrilink-orange/10 border border-afrilink-orange/20 flex items-center justify-center shrink-0">
                    <Globe className="w-5 h-5 text-afrilink-orange" />
                  </div>
                  <div>
                    <div className="font-semibold text-afrilink-navy text-base mb-1">{p.name}</div>
                    <div className="text-afrilink-navy-60 text-sm leading-relaxed">{p.description}</div>
                    {p.country && <div className="text-afrilink-orange text-[13px] font-semibold mt-1">{p.country}</div>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-4">
        <CTAButton variant="orange" onClick={() => onNavigate('about/ceo')}>Meet Dr Mokgatle</CTAButton>
        <CTAButton variant="outline" onClick={() => onNavigate('partner')}>Partner With Us</CTAButton>
      </div>
    </div>
  );
}

function CEOTab() {
  const [openSection, setOpenSection] = useState(0);
  return (
    <div>
      {/* CEO Header */}
      <div className="bg-white rounded-lg p-8 border border-afrilink-grey-light shadow-card mb-10">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="relative shrink-0">
            <img
              src="/dr-mokgatle.jpg"
              alt="Dr Molefe M.D. Mokgatle"
              onError={e => { e.target.src = '/afrilink-logo.png'; e.target.className = 'w-40 h-40 rounded-lg object-contain bg-afrilink-cream p-4 border border-afrilink-grey-light'; }}
              className="w-40 h-40 rounded-lg object-cover shadow-card-hover border-2 border-afrilink-orange/30"
            />
            <div className="absolute -bottom-3 -right-3 w-8 h-8 rounded-full bg-afrilink-orange flex items-center justify-center text-white text-[10px] font-semibold shadow-card">CEO</div>
          </div>
          <div className="flex-1">
            <div className="eyebrow mb-2">Founder, Chairman & Chief Executive Officer</div>
            <h2 className="font-heading text-3xl lg:text-[42px] leading-[1.2] font-semibold text-afrilink-navy mb-3">{ceoProfile.name}</h2>
            <div className="text-afrilink-navy-80 text-base leading-[1.7] mb-4 max-w-2xl">{ceoProfile.overview}</div>
            <div className="flex flex-wrap gap-2">
              {(ceoProfile.credentials || '').split(';').map(c => c.trim()).filter(Boolean).map((cred, i) => (
                <span key={i} className="text-xs font-medium bg-afrilink-butter text-afrilink-navy px-3 py-1 rounded-full">{cred}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Quote */}
        {ceoProfile.quote && (
          <div className="mt-6 pt-6 border-t border-afrilink-grey-light">
            <blockquote className="text-afrilink-navy text-lg italic leading-[1.6] font-medium border-l-4 border-afrilink-orange pl-5">
              "{ceoProfile.quote}"
            </blockquote>
          </div>
        )}
      </div>

      {/* Accordion Sections */}
      <div className="space-y-4">
        {(ceoProfile.sections || []).map((section, i) => (
          <div key={i} className="bg-white rounded-lg border border-afrilink-grey-light shadow-card overflow-hidden">
            <button
              onClick={() => setOpenSection(openSection === i ? -1 : i)}
              className="w-full flex items-center justify-between p-5 text-left hover:bg-afrilink-cream transition-colors"
            >
              <span className="font-heading font-semibold text-afrilink-navy text-lg">{section.title}</span>
              {openSection === i ? <ChevronUp className="w-4 h-4 text-afrilink-orange" /> : <ChevronDown className="w-4 h-4 text-afrilink-navy-60" />}
            </button>
            {openSection === i && (
              <div className="px-5 pb-5 text-afrilink-navy-80 text-base leading-[1.7]">
                <div className="pt-4 border-t border-afrilink-grey-light whitespace-pre-line">
                  {section.content.replace(/\*\*(.*?)\*\*/g, '$1')}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function ShareholdersTab() {
  const total = (shareholdersData?.segments || []).reduce((s, seg) => s + seg.percentage, 0);
  return (
    <div>
      <div className="bg-white rounded-lg p-8 border border-afrilink-grey-light shadow-card mb-8">
        <h3 className="font-heading text-2xl font-semibold text-afrilink-navy mb-4">Shareholding Structure</h3>
        <p className="text-afrilink-navy-80 text-base leading-[1.7] mb-8">{shareholdersData?.philosophy}</p>

        {/* Visual bar */}
        <div className="flex rounded-full overflow-hidden h-4 mb-8 bg-afrilink-grey-light">
          {(shareholdersData?.segments || []).map((seg, i) => (
            <div
              key={i}
              className="h-full transition-all duration-500"
              style={{ width: `${seg.percentage}%`, background: seg.color }}
              title={`${seg.name}: ${seg.percentage}%`}
            />
          ))}
        </div>

        <div className="space-y-4">
          {(shareholdersData?.segments || []).map((seg, i) => (
            <div key={i} className="flex items-start gap-4 p-4 rounded-md bg-afrilink-cream border border-afrilink-grey-light">
              <div className="w-3 h-3 rounded-full mt-1 shrink-0" style={{ background: seg.color }} />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-afrilink-navy text-base">{seg.name}</span>
                  <span className="font-heading font-semibold text-xl" style={{ color: seg.color }}>{seg.percentage}%</span>
                </div>
                <p className="text-afrilink-navy-60 text-sm leading-relaxed">{seg.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-lg p-5 border border-afrilink-gold bg-afrilink-butter/50">
        <p className="text-afrilink-navy-80 text-sm leading-relaxed italic">{shareholdersData?.disclaimer}</p>
      </div>
    </div>
  );
}

function GalleryTab() {
  const galleryItems = [
    { title: 'UN General Assembly Address', year: '2001', category: 'International', desc: 'Dr Mokgatle addresses the United Nations General Assembly in New York on media infrastructure and democratic transition.' },
    { title: 'SABC Repositioning', year: '2000', category: 'Media', desc: 'Landmark repositioning of SABC channels establishing distinct brand identities for SABC 1, 2 and 3.' },
    { title: 'AfriSam World Cup Infrastructure', year: '2010', category: 'Infrastructure', desc: 'Commercial leadership steering cement and aggregates supply for 2010 FIFA World Cup infrastructure delivery.' },
    { title: 'Motokolo Community Land Claim', year: '2015', category: 'Community', desc: 'Successful ancestral land restitution and co-founding of cooperative enterprises in sand mining and agriculture.' },
    { title: 'B-BBEE Level 1 Certification', year: '2023', category: 'Governance', desc: 'Afrilink achieves B-BBEE Level 1 contributor status, underscoring deep empowerment architecture.' },
    { title: 'DBA — Paris School of Business', year: '2025', category: 'Academic', desc: 'Dr Mokgatle awarded Doctor of Business Administration, with research on governance and institutional turnaround in SOCs.' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {galleryItems.map((item, i) => (
        <div key={i} className="bg-white rounded-lg overflow-hidden border border-afrilink-grey-light shadow-card hover:shadow-card-hover hover:border-afrilink-orange/30 transition-all group">
          <div className="h-40 flex items-center justify-center bg-afrilink-cream">
            <div className="text-center">
              <div className="text-4xl font-heading font-semibold text-afrilink-orange/40">{item.year}</div>
              <div className="text-[13px] font-semibold text-afrilink-orange mt-1">{item.category}</div>
            </div>
          </div>
          <div className="p-5">
            <h4 className="font-semibold text-afrilink-navy text-lg mb-2 group-hover:text-afrilink-orange transition-colors">{item.title}</h4>
            <p className="text-afrilink-navy-60 text-sm leading-relaxed">{item.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function AboutPage({ currentTab, onNavigate }) {
  const tabs = [
    { id: 'overview', label: 'Company Overview' },
    { id: 'ceo', label: 'Founder & CEO' },
    { id: 'shareholders', label: 'Shareholders' },
    { id: 'gallery', label: 'Gallery' },
  ];

  const activeTab = currentTab || 'overview';

  return (
    <div className="min-h-screen bg-white">
      {/* Page Header */}
      <div className="relative pt-36 pb-16 lg:pt-40 lg:pb-20 bg-afrilink-navy overflow-hidden">
        <div className="absolute inset-0 bg-ndebele-pattern opacity-40" />
        <div className="absolute top-1/2 left-1/4 w-80 h-80 bg-afrilink-orange/10 rounded-full blur-[80px]" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="eyebrow mb-4">About Afrilink Group</div>
          <h1 className="font-heading text-5xl lg:text-[70px] leading-[1.1] font-semibold text-white mb-4">
            Who We <span className="text-afrilink-gold">Are</span>
          </h1>
          <p className="text-white/75 text-lg lg:text-[21px] leading-[1.6] font-medium max-w-2xl">
            An avant-garde South African investment holding company with 39 years of executive leadership, transforming diaspora capital into continental wealth.
          </p>
        </div>
      </div>

      {/* Sub-nav */}
      <div className="bg-afrilink-cream border-b border-afrilink-grey-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <TabNav tabs={tabs} active={activeTab} onSelect={(id) => {
            if (id === 'overview') onNavigate('about');
            else onNavigate(`about/${id}`);
          }} />
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {activeTab === 'overview' && <OverviewTab onNavigate={onNavigate} />}
        {activeTab === 'ceo' && <CEOTab />}
        {activeTab === 'shareholders' && <ShareholdersTab />}
        {activeTab === 'gallery' && <GalleryTab />}
      </div>
    </div>
  );
}
