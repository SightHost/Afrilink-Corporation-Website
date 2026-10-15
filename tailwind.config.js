/** @type {import('tailwindcss').Config} */
// Dark theme: deep navy surfaces, light text, Afrilink orange accents, gold highlights.
// `navy` stays the brand colour (dark sections, text on gold); body text uses `fg`.
export default {
  content: [
    "./src/**/*.astro",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        afrilink: {
          orange: '#F37121',        // primary brand / links
          'orange-hover': '#F27304', // button hover
          'orange-soft': '#F29257',  // dividers on orange, secondary accent
          'orange-btn': '#F18728',   // button gradient
          navy: '#040922',           // darkest sections, copyright bar, text on gold
          surface: '#0B1022',        // page and card background
          fg: '#F1F2F6',             // headings, body text
          'fg-80': '#C5C8D4',        // secondary text
          'fg-60': '#9196AA',        // muted text
          gold: '#FFD177',           // hover highlight, top bar, nav underline
          butter: '#2A2113',         // soft warm highlight background
          cream: '#10162E',          // alternate section background
          grey: '#303957',           // borders, form outlines
          'grey-light': '#1F2740',   // hairlines on dark
          ink: '#161616',            // dark image-overlay sections
          'ink-soft': '#1F1F1F',
        }
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'Arial', 'Helvetica', 'sans-serif'],
        heading: ['"Plus Jakarta Sans"', 'Arial', 'Helvetica', 'sans-serif'],
        sans: ['"Plus Jakarta Sans"', 'Arial', 'Helvetica', 'sans-serif'],
      },
      fontSize: {
        // Reference type scale
        'h1': ['70px', { lineHeight: '1.1', fontWeight: '600' }],
        'h2': ['42px', { lineHeight: '1.2', fontWeight: '600' }],
        'h3': ['37px', { lineHeight: '1.2', fontWeight: '600' }],
        'h4': ['28px', { lineHeight: '1.4', fontWeight: '600' }],
        'lead': ['21px', { lineHeight: '1.6', fontWeight: '500' }],
        'body': ['17px', { lineHeight: '1.7', fontWeight: '500' }],
        'label': ['13px', { lineHeight: '1.7', fontWeight: '600' }],
      },
      borderRadius: {
        'form': '6px',
      },
      boxShadow: {
        'card': '0 2px 18px rgba(0, 0, 0, 0.35)',
        'card-hover': '0 10px 34px rgba(0, 0, 0, 0.55)',
      },
      opacity: {
        '85': '0.85',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-slow': 'float 6s ease-in-out infinite',
        'fade-in': 'fadeIn 0.2s ease-out',
        'slide-down': 'slideDown 0.25s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
}
