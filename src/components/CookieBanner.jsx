import React, { useState, useEffect } from 'react';
import { ShieldCheck, X } from 'lucide-react';

export default function CookieBanner({ onOpenLegal }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('afrilink_popia_consent');
    if (!consent) {
      // Show banner after brief delay
      const timer = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('afrilink_popia_consent', 'accepted');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50 animate-slide-up">
      <div className="bg-afrilink-surface border border-afrilink-grey-light text-afrilink-fg p-5 rounded-lg shadow-card-hover relative">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-afrilink-orange/10 rounded-md text-afrilink-orange shrink-0 mt-0.5">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="text-sm font-heading font-semibold text-afrilink-fg mb-1">
              POPIA & Cookie Compliance
            </div>
            <p className="text-[13px] text-afrilink-fg-80 leading-[1.6] mb-3">
              Afrilink Corporation processes data in compliance with the South African Protection of Personal Information Act (POPIA). We utilize functional cookies to optimize investor interactions and proposal submissions.
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={handleAccept}
                className="px-4 py-1.5 btn-glass btn-glass-orange text-white text-[13px] font-semibold rounded-full"
              >
                Accept & Proceed
              </button>
              <button
                onClick={() => onOpenLegal?.('popia')}
                className="text-[13px] text-afrilink-orange hover:underline transition-colors"
              >
                Read POPIA Notice
              </button>
            </div>
          </div>
          <button
            onClick={() => setVisible(false)}
            className="text-afrilink-fg-60 hover:text-afrilink-fg transition-colors p-1"
            aria-label="Dismiss banner"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
