import React from 'react';
import { Award, Briefcase, Landmark, ShieldCheck } from 'lucide-react';

export default function StatCounter({ className = '' }) {
  const stats = [
    {
      number: '39',
      suffix: '+',
      title: 'Years of Leadership',
      description: 'Executive stewardship across heavy industry, broadcasting, banking & civil infrastructure.',
      icon: Briefcase,
      accent: 'orange'
    },
    {
      number: '2',
      suffix: '',
      title: 'Sovereign Markets',
      description: 'South Africa & Republic of Botswana with active capital lines to the diaspora.',
      icon: Landmark,
      accent: 'gold'
    },
    {
      number: '4',
      suffix: '',
      title: 'Core Focus Areas',
      description: 'Resources & Infrastructure, Mining & Commodities, Financial Services & Strategic Tech.',
      icon: ShieldCheck,
      accent: 'orange'
    },
    {
      number: '2015',
      suffix: '',
      title: 'Achiever Award Winner',
      description: 'South African Supplier Diversity Council award & national Entrepreneur of the Year runner-up.',
      icon: Award,
      accent: 'gold'
    }
  ];

  return (
    <div className={`w-full ${className}`}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          const isGold = stat.accent === 'gold';
          return (
            <div
              key={idx}
              className="relative group p-6 rounded-lg bg-white/[0.06] backdrop-blur-sm border border-white/15 hover:border-afrilink-orange/60 hover:bg-white/[0.09] transition-all duration-300 hover:-translate-y-1"
            >
              {/* Top Accent line */}
              <div 
                className={`absolute top-0 left-6 right-6 h-[2px] transition-all duration-300 group-hover:left-2 group-hover:right-2 ${
                  isGold ? 'bg-afrilink-gold' : 'bg-afrilink-orange'
                }`} 
              />

              <div className="flex items-start justify-between mb-4">
                <div className="flex items-baseline">
                  <span className="font-heading font-semibold text-4xl md:text-5xl text-white">
                    {stat.number}
                  </span>
                  {stat.suffix && (
                    <span className="font-heading font-semibold text-3xl text-afrilink-orange ml-0.5">
                      {stat.suffix}
                    </span>
                  )}
                </div>
                <div className={`p-2.5 rounded-md bg-white/10 border border-white/10 text-${isGold ? 'afrilink-gold' : 'afrilink-orange'}`}>
                  <Icon className={`w-5 h-5 ${isGold ? 'text-afrilink-gold' : 'text-afrilink-orange'}`} />
                </div>
              </div>

              <h4 className="text-base font-heading font-semibold text-white mb-1.5">
                {stat.title}
              </h4>
              <p className="text-[13px] text-white/75 leading-[1.6]">
                {stat.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
