import React, { useState } from 'react';
import { CheckCircle2, Send, ArrowRight, Shield, Globe, TrendingUp, Building2, Zap, BookOpen, ChevronDown } from 'lucide-react';

const PARTNERSHIP_TYPES = [
  { id: 'capital', label: 'Investment Capital', icon: TrendingUp, desc: 'Direct equity, mezzanine debt, or development finance into Afrilink holdings.' },
  { id: 'mining', label: 'Mining Joint Venture', icon: Building2, desc: 'Exploration capital, technical JV, offtake or processing partnerships.' },
  { id: 'infrastructure', label: 'Infrastructure & Civils', icon: Globe, desc: 'Water, sanitation, civic engineering contracts and consortium participation.' },
  { id: 'digital', label: 'Digital & Technology', icon: Zap, desc: 'UX, QA, enterprise digital transformation through Strider Digital.' },
  { id: 'human', label: 'Human Capital', icon: BookOpen, desc: 'Learnerships, skills development, training co-investment via Mahlori Group.' },
  { id: 'diaspora', label: 'Diaspora Fund / Syndicate', icon: Globe, desc: 'Pan-African diaspora capital syndication and investment access pathways.' },
];

const SCALES = [
  'Under R5 million',
  'R5m – R25m',
  'R25m – R100m',
  'R100m – R500m',
  'Over R500 million',
  'To be determined',
];

export default function PartnerPage() {
  const [selectedType, setSelectedType] = useState('');
  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    role: '',
    country: '',
    phone: '',
    partnershipType: '',
    scale: '',
    timeline: '',
    background: '',
    proposal: '',
    referral: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [refCode] = useState(() => 'AFL-' + Math.random().toString(36).slice(2, 8).toUpperCase());

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1800);
  };

  return (
    <div className="min-h-screen bg-afrilink-cream text-afrilink-navy">
      {/* Page Header (navy hero; top padding clears the ~94px white header) */}
      <div className="relative pt-[150px] pb-16 bg-afrilink-navy overflow-hidden">
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-afrilink-orange/10 rounded-full blur-[80px]" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-afrilink-gold text-[13px] font-semibold mb-4">New Business & Partnerships</div>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-[70px] leading-[1.1] font-semibold text-white mb-4">
            Partner <span className="text-afrilink-gold">With Us</span>
          </h1>
          <p className="text-white/75 text-lg lg:text-[21px] leading-[1.6] font-medium max-w-2xl">
            Afrilink Corporation is actively seeking institutional co-investors, mining JV partners, DFI debt facilities, diaspora capital syndicates, and strategic technical partners. Complete the brief below and our executive team will respond within 48 business hours.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {submitted ? (
          /* Success State */
          <div className="bg-white rounded-lg p-12 border border-afrilink-grey-light shadow-card flex flex-col items-center justify-center text-center">
            <div className="w-20 h-20 rounded-full bg-afrilink-orange/10 border-2 border-afrilink-orange/40 flex items-center justify-center mb-6">
              <CheckCircle2 className="w-10 h-10 text-afrilink-orange" />
            </div>
            <h2 className="font-heading text-3xl lg:text-[42px] leading-[1.2] font-semibold text-afrilink-navy mb-3">Brief Received</h2>
            <p className="text-afrilink-navy-80 text-[17px] leading-[1.7] max-w-lg mx-auto mb-6">
              Thank you, {form.name || 'Partner'}. Your partnership brief has been submitted to the Afrilink Corporation executive office.
            </p>
            <div className="bg-afrilink-cream rounded-lg p-5 border border-afrilink-grey-light mb-8 w-full max-w-sm">
              <div className="text-[13px] font-semibold text-afrilink-navy-60 mb-2">Your Reference Code</div>
              <div className="font-heading font-semibold text-3xl text-afrilink-orange">{refCode}</div>
              <div className="text-afrilink-navy-60 text-sm mt-2">Quote this in all correspondence with our team.</div>
            </div>
            <div className="space-y-2 text-base text-afrilink-navy-80 max-w-md mx-auto mb-8">
              <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-afrilink-orange shrink-0" /> Confirmation email sent to {form.email}</div>
              <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-afrilink-orange shrink-0" /> Your brief has been logged with the Investment Office</div>
              <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-afrilink-orange shrink-0" /> Expected response within 48 business hours</div>
            </div>
            <button
              onClick={() => setSubmitted(false)}
              className="text-afrilink-orange text-sm font-semibold hover:underline"
            >
              Submit another brief
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-10">
            {/* Step 1: Partnership Type */}
            <div className="bg-white rounded-lg p-8 border border-afrilink-grey-light shadow-card">
              <div className="font-heading font-semibold text-afrilink-navy text-2xl mb-2">1. Partnership Category</div>
              <p className="text-afrilink-navy-60 text-base mb-6">Select the type of partnership or investment you are proposing.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {PARTNERSHIP_TYPES.map(type => (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => { setSelectedType(type.id); setForm({ ...form, partnershipType: type.label }); }}
                    className={`p-5 rounded-lg border text-left transition-all ${
                      selectedType === type.id
                        ? 'border-afrilink-orange bg-afrilink-butter shadow-card-hover'
                        : 'border-afrilink-grey-light hover:border-afrilink-grey bg-afrilink-cream hover:bg-white hover:shadow-card'
                    }`}
                  >
                    <type.icon className={`w-6 h-6 mb-3 ${selectedType === type.id ? 'text-afrilink-orange' : 'text-afrilink-navy-60'}`} />
                    <div className="font-semibold text-afrilink-navy text-base mb-1">{type.label}</div>
                    <div className="text-afrilink-navy-60 text-sm leading-relaxed">{type.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Your Details */}
            <div className="bg-white rounded-lg p-8 border border-afrilink-grey-light shadow-card">
              <div className="font-heading font-semibold text-afrilink-navy text-2xl mb-2">2. Your Details</div>
              <p className="text-afrilink-navy-60 text-base mb-6">Tell us about yourself and your organisation.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {[
                  { name: 'name', label: 'Full Name *', placeholder: 'Your full name', required: true },
                  { name: 'email', label: 'Email Address *', placeholder: 'your@email.com', required: true, type: 'email' },
                  { name: 'company', label: 'Company / Organisation *', placeholder: 'Company name', required: true },
                  { name: 'role', label: 'Your Role / Title', placeholder: 'e.g. CEO, Investment Manager' },
                  { name: 'country', label: 'Country', placeholder: 'South Africa, UK, USA...' },
                  { name: 'phone', label: 'Phone Number', placeholder: '+27...' },
                ].map(field => (
                  <div key={field.name}>
                    <label className="text-sm font-semibold text-afrilink-navy mb-1.5 block">{field.label}</label>
                    <input
                      name={field.name}
                      type={field.type || 'text'}
                      value={form[field.name]}
                      onChange={handleChange}
                      required={field.required}
                      placeholder={field.placeholder}
                      className="form-input"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Step 3: Partnership Detail */}
            <div className="bg-white rounded-lg p-8 border border-afrilink-grey-light shadow-card">
              <div className="font-heading font-semibold text-afrilink-navy text-2xl mb-2">3. Partnership Parameters</div>
              <p className="text-afrilink-navy-60 text-base mb-6">Help us understand the scale and scope of your proposed engagement.</p>
              <div className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-sm font-semibold text-afrilink-navy mb-1.5 block">Investment Scale</label>
                    <div className="relative">
                      <select
                        name="scale"
                        value={form.scale}
                        onChange={handleChange}
                        className="form-input appearance-none pr-10 cursor-pointer"
                      >
                        <option value="">Select scale</option>
                        {SCALES.map(s => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-afrilink-navy-60 pointer-events-none" />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-afrilink-navy mb-1.5 block">Proposed Timeline</label>
                    <input
                      name="timeline"
                      value={form.timeline}
                      onChange={handleChange}
                      placeholder="e.g. Q1 2026, Immediate, 12–18 months"
                      className="form-input"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-semibold text-afrilink-navy mb-1.5 block">Partner Background *</label>
                  <textarea
                    name="background"
                    value={form.background}
                    onChange={handleChange}
                    required
                    rows={4}
                    placeholder="Briefly describe your organisation, track record, and existing investments or projects..."
                    className="form-input py-3 resize-none"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-afrilink-navy mb-1.5 block">Partnership Proposal *</label>
                  <textarea
                    name="proposal"
                    value={form.proposal}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="Describe your proposed partnership, what you bring to the table, and the specific Afrilink holdings or sectors you are interested in..."
                    className="form-input py-3 resize-none"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-afrilink-navy mb-1.5 block">How did you hear about Afrilink?</label>
                  <input
                    name="referral"
                    value={form.referral}
                    onChange={handleChange}
                    placeholder="e.g. LinkedIn, Referral (name), Online search..."
                    className="form-input"
                  />
                </div>
              </div>
            </div>

            {/* Trust & Submit */}
            <div className="bg-white rounded-lg p-8 border border-afrilink-grey-light shadow-card">
              <div className="flex items-start gap-3 mb-6 p-4 rounded-md bg-afrilink-cream border border-afrilink-orange/20">
                <Shield className="w-5 h-5 text-afrilink-orange shrink-0 mt-0.5" />
                <p className="text-afrilink-navy-80 text-sm leading-relaxed">
                  All information shared via this form is treated as strictly confidential and used exclusively for the evaluation of potential partnership opportunities. Afrilink Corporation operates under POPIA and maintains robust data governance standards.
                </p>
              </div>
              <button
                type="submit"
                disabled={loading || !form.name || !form.email || !form.proposal}
                className={`w-full flex items-center justify-center gap-3 px-8 py-4 rounded-full font-semibold text-base text-white transition-all ${
                  loading || !form.name || !form.email || !form.proposal
                    ? 'bg-afrilink-orange-btn/40 cursor-not-allowed'
                    : 'bg-afrilink-orange-btn hover:bg-afrilink-orange-hover shadow-card hover:shadow-card-hover hover:-translate-y-0.5'
                }`}
              >
                {loading ? (
                  <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Submitting Brief...</>
                ) : (
                  <><Send className="w-5 h-5" /> Submit Partnership Brief</>
                )}
              </button>
              <div className="mt-4 text-center text-sm text-afrilink-navy-60">
                Response guaranteed within 48 business hours · Reference code issued on submission
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
