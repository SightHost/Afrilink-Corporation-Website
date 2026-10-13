import React from 'react';
import { X, ShieldCheck, FileText, Lock } from 'lucide-react';

export default function LegalModal({ type, onClose }) {
  if (!type) return null;

  const content = {
    popia: {
      title: 'Protection of Personal Information Act (POPIA) Privacy Notice',
      subtitle: 'Compliance with Act No. 4 of 2013 (Republic of South Africa)',
      sections: [
        {
          heading: '1. Commitment to Data Protection',
          body: 'Afrilink Corporation (Pty) Ltd ("Afrilink", "we", "us") respects the constitutional right to privacy and is strictly committed to protecting the personal and proprietary information of our partners, investors, stakeholders, and website visitors in accordance with the Protection of Personal Information Act No. 4 of 2013 (POPIA).'
        },
        {
          heading: '2. Collection and Purpose of Processing',
          body: 'We collect personal information solely when submitted directly by you via our "Partner With Us" briefing portal, contact forms, or direct correspondence. This includes your name, title, organization, email address, contact numbers, jurisdiction, indicative investment scale, and uploaded proposals. The purpose of processing is strictly limited to evaluating investment syndicates, structuring joint ventures, responding to partnership inquiries, and fulfilling statutory compliance.'
        },
        {
          heading: '3. Non-Disclosure & Security Measures',
          body: 'All investor data and confidential proposals transmitted through this platform are encrypted via AES-256 protocols and stored in secured cloud environments. Afrilink never sells, rents, or distributes partner data to third-party commercial marketing entities. Access is restricted strictly to executive directors and the Investment Committee.'
        },
        {
          heading: '4. Rights of Data Subjects',
          body: 'In terms of Sections 23–25 of POPIA, you have the right to request access to the personal information held by Afrilink, request correction or destruction of inaccurate records, or withdraw processing consent at any time by contacting our registered Information Officer at compliance@afrilink.co.za.'
        }
      ]
    },
    paia: {
      title: 'Promotion of Access to Information Act (PAIA) Manual',
      subtitle: 'Prepared in accordance with Section 51 of Act No. 2 of 2000',
      sections: [
        {
          heading: '1. Introduction & Company Particulars',
          body: 'Afrilink Corporation (Pty) Ltd is a private investment holding company incorporated under the laws of the Republic of South Africa with Registration No. 2001/014920/07. Head Office: Sandton, Johannesburg, Gauteng. Executive Leadership: Dr Molefe M.D. Mokgatle (Chairman & CEO).'
        },
        {
          heading: '2. Guide of the Information Regulator',
          body: 'The Information Regulator of South Africa has compiled a comprehensive guide containing information required by any person wishing to exercise any right contemplated in PAIA. This guide is accessible at www.inforegulator.org.za.'
        },
        {
          heading: '3. Records Automatically Available',
          body: 'Corporate profiles, public press statements, annual empowerment summaries, and high-level investment overviews published on www.afrilink.co.za are freely accessible without formal PAIA requisition.'
        },
        {
          heading: '4. Requisition Procedure',
          body: 'Requests for non-public commercial records, technical mineral concession reports, or governance audit papers must be submitted using Prescribed Form 2, addressed to the Information Officer, accompanied by the statutory request fee.'
        }
      ]
    },
    terms: {
      title: 'Terms of Use & Investor Disclosures',
      subtitle: 'Regulatory disclaimers regarding investment briefs and forward-looking statements',
      sections: [
        {
          heading: '1. Informational Nature of Website',
          body: 'The contents of this corporate website are published for general institutional information and introduction purposes only. Nothing on this website constitutes a formal public securities offering, financial advice under the Financial Advisory and Intermediary Services (FAIS) Act, or a binding contractual commitment.'
        },
        {
          heading: '2. Qualified Investor Verification',
          body: 'Prospective institutional investors, DFIs, and joint-venture partners submitting brief proposals via the "Partner With Us" interface understand that binding investment agreements require independent due diligence, bilateral Non-Disclosure Agreements (NDAs), and regulatory clearance from the South African Reserve Bank (SARB) and relevant mining tenure regulators.'
        },
        {
          heading: '3. Intellectual Property Rights',
          body: 'All trademarks, logos, copy, architectural renderings, photographic assets, and structural layouts on this website are the proprietary intellectual property of Afrilink Corporation (Pty) Ltd or their respective consortium entities (Vacuform 2000, Strider Digital, Mahlori Group, University of Botswana). Unauthorized duplication or reverse engineering is prohibited.'
        }
      ]
    }
  };

  const activeContent = content[type] || content.popia;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-afrilink-navy/60 backdrop-blur-sm animate-fade-in">
      <div 
        className="relative w-full max-w-2xl bg-white border border-afrilink-grey-light text-afrilink-navy rounded-lg shadow-card-hover overflow-hidden flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-afrilink-cream p-6 border-b border-afrilink-grey-light flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-afrilink-orange/10 rounded-md text-afrilink-orange border border-afrilink-orange/30">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading font-semibold text-xl text-afrilink-navy">
                {activeContent.title}
              </h3>
              <p className="text-[13px] text-afrilink-orange font-semibold mt-0.5">
                {activeContent.subtitle}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-md bg-white hover:bg-afrilink-grey-light text-afrilink-navy-60 hover:text-afrilink-navy border border-afrilink-grey-light transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 overflow-y-auto space-y-6 text-[15px] text-afrilink-navy-80 leading-[1.7]">
          {activeContent.sections.map((sec, idx) => (
            <div key={idx} className="space-y-1.5">
              <h4 className="font-heading font-semibold text-afrilink-navy text-base">
                {sec.heading}
              </h4>
              <p className="text-afrilink-navy-80 leading-[1.7]">
                {sec.body}
              </p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 bg-white border-t border-afrilink-grey-light flex items-center justify-between gap-4 text-xs text-afrilink-navy-60">
          <span>Afrilink Corporation (Pty) Ltd · Regulatory Registry</span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-full bg-afrilink-orange-btn hover:bg-afrilink-orange-hover text-white text-sm font-semibold transition-colors shrink-0"
          >
            Acknowledge & Close
          </button>
        </div>
      </div>
    </div>
  );
}
