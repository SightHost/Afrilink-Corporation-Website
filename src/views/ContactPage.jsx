import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, ChevronDown, Globe } from 'lucide-react';
import CTAButton from '../components/CTAButton';

const ENQUIRY_TYPES = [
  'Investment Partnership',
  'Mining Joint Venture',
  'Infrastructure Tender',
  'Digital / Technology',
  'Human Capital / Training',
  'Governance & Compliance',
  'Media & Press',
  'General Enquiry',
];

export default function ContactPage({ onNavigate }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    type: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-afrilink-cream text-afrilink-fg">
      {/* Page Header (navy hero; top padding clears the ~94px white header) */}
      <div className="relative pt-[150px] pb-16 bg-afrilink-navy overflow-hidden">
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-afrilink-orange/10 rounded-full blur-[80px]" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-afrilink-gold text-[13px] font-semibold mb-4">Reach Our Executive Team</div>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-[70px] leading-[1.1] font-semibold text-white mb-4">
            Contact <span className="text-afrilink-gold">Afrilink</span>
          </h1>
          <p className="text-white/75 text-lg lg:text-[21px] leading-[1.6] font-medium max-w-2xl">
            Whether you are an investor, government partner, media professional, or community stakeholder — we would like to hear from you.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="space-y-6">
            <div>
              <h2 className="font-heading text-2xl font-semibold text-afrilink-fg mb-6">Head Office</h2>
              <div className="space-y-5">
                {[
                  {
                    icon: MapPin,
                    label: 'Address',
                    value: 'Sandton, Johannesburg\nGauteng, South Africa',
                    color: '#F37121'
                  },
                  {
                    icon: Mail,
                    label: 'Email',
                    value: 'info@afrilink.co.za',
                    href: 'mailto:info@afrilink.co.za',
                    color: '#F18728'
                  },
                  {
                    icon: Phone,
                    label: 'Telephone',
                    value: '011 568 5357',
                    href: 'tel:+27115685357',
                    color: '#FFD177'
                  },
                  {
                    icon: Clock,
                    label: 'Office Hours',
                    value: 'Mon–Fri: 08:00–17:00 SAST\nSat: By appointment only',
                    color: '#9196AA'
                  },
                ].map((item, i) => (
                  <div key={i} className="bg-afrilink-surface rounded-lg p-4 border border-afrilink-grey-light shadow-card hover:shadow-card-hover transition-shadow flex items-start gap-4">
                    <div className="w-9 h-9 rounded-md flex items-center justify-center shrink-0"
                      style={{ background: `${item.color}14`, border: `1px solid ${item.color}33` }}>
                      <item.icon className="w-4 h-4" style={{ color: item.color }} />
                    </div>
                    <div>
                      <div className="text-[13px] font-semibold text-afrilink-fg-60 mb-1">{item.label}</div>
                      {item.href ? (
                        <a href={item.href} className="text-afrilink-fg text-base font-medium hover:text-afrilink-orange transition-colors whitespace-pre-line">
                          {item.value}
                        </a>
                      ) : (
                        <div className="text-afrilink-fg text-base font-medium whitespace-pre-line">{item.value}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Botswana Office */}
            <div className="bg-afrilink-surface rounded-lg p-5 border border-afrilink-grey-light shadow-card">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">🇧🇼</span>
                <div className="text-afrilink-fg text-base font-semibold">Botswana Representative Office</div>
              </div>
              <div className="text-afrilink-fg-60 text-sm leading-relaxed">
                Gaborone, Republic of Botswana<br />
                For mining and mineral tenure enquiries.
              </div>
            </div>

            {/* Partner CTA */}
            <div className="bg-afrilink-butter rounded-lg p-5 border border-afrilink-orange/30 shadow-card">
              <div className="text-afrilink-fg font-semibold text-base mb-2">Submit a Partnership Brief</div>
              <p className="text-afrilink-fg-80 text-sm mb-4 leading-relaxed">
                For structured investment enquiries, joint ventures or DFI partnerships, please use our dedicated Partner Brief form.
              </p>
              <CTAButton variant="orange" size="sm" onClick={() => onNavigate('partner')}>
                Partner With Us
              </CTAButton>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            {submitted ? (
              <div className="bg-afrilink-surface rounded-lg p-12 border border-afrilink-grey-light shadow-card flex flex-col items-center justify-center text-center h-full min-h-[500px]">
                <CheckCircle2 className="w-16 h-16 text-afrilink-orange mb-6" />
                <h3 className="font-heading text-3xl font-semibold text-afrilink-fg mb-3">Message Received</h3>
                <p className="text-afrilink-fg-80 text-base leading-[1.7] max-w-md mb-8">
                  Thank you for reaching out to Afrilink Corporation. Our executive team will review your enquiry and respond within 2 business days.
                </p>
                <CTAButton variant="outline" size="md" onClick={() => setSubmitted(false)}>
                  Send Another Message
                </CTAButton>
              </div>
            ) : (
              <div className="bg-afrilink-surface rounded-lg p-8 border border-afrilink-grey-light shadow-card">
                <h2 className="font-heading text-2xl lg:text-3xl font-semibold text-afrilink-fg mb-6">Send an Enquiry</h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="text-sm font-semibold text-afrilink-fg mb-1.5 block">Full Name *</label>
                      <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        placeholder="Your full name"
                        className="form-input"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-afrilink-fg mb-1.5 block">Email Address *</label>
                      <input
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        placeholder="your@email.com"
                        className="form-input"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-afrilink-fg mb-1.5 block">Company / Organisation</label>
                      <input
                        name="company"
                        value={form.company}
                        onChange={handleChange}
                        placeholder="Your organisation"
                        className="form-input"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-afrilink-fg mb-1.5 block">Phone Number</label>
                      <input
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="+27 ..."
                        className="form-input"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-afrilink-fg mb-1.5 block">Enquiry Type</label>
                    <div className="relative">
                      <select
                        name="type"
                        value={form.type}
                        onChange={handleChange}
                        className="form-input appearance-none pr-10 cursor-pointer"
                      >
                        <option value="">Select enquiry type</option>
                        {ENQUIRY_TYPES.map(t => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-afrilink-fg-60 pointer-events-none" />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-afrilink-fg mb-1.5 block">Message *</label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      placeholder="Describe your enquiry, partnership proposal, or investment interest..."
                      className="form-input py-3 resize-none"
                    />
                  </div>

                  <div className="text-sm text-afrilink-fg-60 leading-relaxed">
                    By submitting this form, you consent to your personal information being processed by Afrilink Corporation (Pty) Ltd in accordance with our Privacy Policy (POPIA) for the purpose of responding to your enquiry.
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className={`inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-semibold text-base text-white transition-all ${
                      loading
                        ? 'bg-afrilink-orange-btn/50 cursor-wait'
                        : 'bg-afrilink-orange-btn hover:bg-afrilink-orange-hover shadow-card hover:shadow-card-hover'
                    }`}
                  >
                    {loading ? (
                      <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Sending...</>
                    ) : (
                      <><Send className="w-4 h-4" /> Send Enquiry</>
                    )}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
