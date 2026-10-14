import React from 'react';
import { Mail, Phone, MapPin, ArrowUpRight, ShieldCheck, Heart } from 'lucide-react';
import AfrilinkLogo from './AfrilinkLogo';

// lucide-react v1 dropped brand icons, so these are inline equivalents.
const iconProps = {
  xmlns: 'http://www.w3.org/2000/svg',
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
};

const Linkedin = ({ className }) => (
  <svg {...iconProps} className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const Facebook = ({ className }) => (
  <svg {...iconProps} className={className}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const Instagram = ({ className }) => (
  <svg {...iconProps} className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

export default function Footer({ onNavigate, onOpenLegal }) {
  return (
    <footer className="relative bg-afrilink-orange text-white/85 overflow-hidden">
      {/* Pan-African symbol wall background */}
      <img
        src="/footer-bg.png"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover object-center opacity-85 pointer-events-none select-none"
      />
      <div className="absolute inset-0 bg-afrilink-ink/30 pointer-events-none" />

      {/* Main Footer Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-16 border-b border-afrilink-orange-soft">
          {/* Brand Info & Tagline (lg: 4 cols) */}
          <div className="lg:col-span-4 space-y-5">
            <AfrilinkLogo light={true} onClick={() => onNavigate?.('home')} />
            
            <div className="inline-block px-3 py-1 rounded-full bg-afrilink-gold text-[13px] font-heading font-semibold text-afrilink-navy">
              Making Diaspora Work
            </div>

            <p className="text-sm sm:text-[15px] text-white/90 leading-[1.7] max-w-sm">
              Afrilink Corporation (Pty) Ltd is an avant-garde South African investment holding company committed to broad-based economic empowerment, strict governance, and sustainable business growth across Southern Africa and the continent.
            </p>

            {/* Social Channels */}
            <div className="pt-2">
              <div className="text-[13px] text-white mb-3 font-semibold">
                Connect With Leadership
              </div>
              <div className="flex items-center gap-3">
                <a
                  href="https://www.linkedin.com/company/afrilink-corporation"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full border border-white/40 text-white hover:bg-white hover:text-afrilink-orange flex items-center justify-center transition-all duration-300"
                  aria-label="Afrilink on LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href="https://www.facebook.com/afrilinkcorp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full border border-white/40 text-white hover:bg-white hover:text-afrilink-orange flex items-center justify-center transition-all duration-300"
                  aria-label="Afrilink on Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href="https://www.instagram.com/afrilink_group"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full border border-white/40 text-white hover:bg-white hover:text-afrilink-orange flex items-center justify-center transition-all duration-300"
                  aria-label="Afrilink on Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Quick Nav Columns (lg: 8 cols total) */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8">
            {/* About Column */}
            <div>
              <h4 className="text-base font-heading font-semibold text-white mb-4">
                About Group
              </h4>
              <ul className="space-y-2.5 text-sm text-white/80">
                <li>
                  <button onClick={() => onNavigate?.('about')} className="hover:text-afrilink-gold transition-colors">
                    Company Overview
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate?.('about/ceo')} className="hover:text-afrilink-gold transition-colors">
                    Dr Molefe Mokgatle (CEO)
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate?.('about/shareholders')} className="hover:text-afrilink-gold transition-colors">
                    Shareholding Structure
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate?.('about/gallery')} className="hover:text-afrilink-gold transition-colors">
                    Corporate Gallery
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate?.('about')} className="hover:text-afrilink-gold transition-colors">
                    Strategic Alliances
                  </button>
                </li>
              </ul>
            </div>

            {/* Governance Column */}
            <div>
              <h4 className="text-base font-heading font-semibold text-white mb-4">
                Governance
              </h4>
              <ul className="space-y-2.5 text-sm text-white/80">
                <li>
                  <button onClick={() => onNavigate?.('governance/bbee')} className="hover:text-afrilink-gold transition-colors">
                    B-BBEE Verification
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate?.('governance/compliance')} className="hover:text-afrilink-gold transition-colors">
                    CIPC Registration
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate?.('governance/compliance')} className="hover:text-afrilink-gold transition-colors">
                    SARS Tax Pin
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate?.('governance/compliance')} className="hover:text-afrilink-gold transition-colors">
                    King IV Governance
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate?.('governance/good-standing')} className="hover:text-afrilink-gold transition-colors">
                    COIDA Good Standing
                  </button>
                </li>
              </ul>
            </div>

            {/* Investments Column */}
            <div>
              <h4 className="text-base font-heading font-semibold text-white mb-4">
                Sectors & Holdings
              </h4>
              <ul className="space-y-2.5 text-sm text-white/80">
                <li>
                  <button onClick={() => onNavigate?.('investments/mining')} className="hover:text-afrilink-gold transition-colors">
                    Mining & Commodities
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate?.('investments/infrastructure')} className="hover:text-afrilink-gold transition-colors">
                    Infrastructure & Civils
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate?.('investments/digital')} className="hover:text-afrilink-gold transition-colors">
                    Digital Engineering
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate?.('investments/human-capital')} className="hover:text-afrilink-gold transition-colors">
                    Human Capital Academy
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate?.('investments/strategic')} className="hover:text-afrilink-gold transition-colors">
                    Strategic Manufacturing
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate?.('investments')} className="text-afrilink-gold font-semibold hover:underline">
                    All Holdings (6+) →
                  </button>
                </li>
              </ul>
            </div>

            {/* Contact & Brief Column */}
            <div>
              <h4 className="text-base font-heading font-semibold text-white mb-4">
                Engage
              </h4>
              <ul className="space-y-2.5 text-sm text-white/80">
                <li>
                  <button onClick={() => onNavigate?.('partner')} className="text-white font-semibold hover:text-afrilink-gold hover:underline flex items-center gap-1">
                    <span>Partner With Us</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate?.('contact')} className="hover:text-afrilink-gold transition-colors">
                    Head Office Details
                  </button>
                </li>
                <li>
                  <span className="text-white/80 block text-[13px] mt-2">Sandton, Johannesburg</span>
                </li>
                <li>
                  <a href="mailto:info@afrilink.co.za" className="text-white/80 hover:text-afrilink-gold transition-colors block text-[13px]">
                    info@afrilink.co.za
                  </a>
                </li>
                <li>
                  <span className="text-white/80 block text-[13px]">+27 (0) 11 000 0000</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Corporate Leadership Credit */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[13px] text-white/80">
          <div>
            <strong className="text-white font-semibold">Afrilink Corporation (Pty) Ltd</strong> · Chairman & CEO: <span className="text-white font-semibold">Dr Molefe M.D. Mokgatle</span>
          </div>
          <div className="flex items-center gap-2 text-[13px] text-white/80">
            <ShieldCheck className="w-4 h-4 text-afrilink-gold" />
            <span>King IV & POPIA Compliant Sovereign Entity</span>
          </div>
        </div>
      </div>

      {/* Legal & Copyright */}
      <div className="relative z-10 bg-afrilink-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-[13px] text-white/40">
          <div>
            © {new Date().getFullYear()} AFRILINK CORPORATION (Pty) Ltd. All rights reserved. Registered in the Republic of South Africa.
          </div>
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <button
              onClick={() => onOpenLegal?.('popia')}
              className="text-white/80 hover:text-afrilink-gold transition-colors"
            >
              Privacy Policy (POPIA)
            </button>
            <span>·</span>
            <button
              onClick={() => onOpenLegal?.('paia')}
              className="text-white/80 hover:text-afrilink-gold transition-colors"
            >
              PAIA Manual
            </button>
            <span>·</span>
            <button
              onClick={() => onOpenLegal?.('terms')}
              className="text-white/80 hover:text-afrilink-gold transition-colors"
            >
              Terms & Regulatory Disclosures
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
