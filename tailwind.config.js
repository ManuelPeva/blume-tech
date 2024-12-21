/** @type {import('tailwindcss').Config} */
import typography from '@tailwindcss/typography';

export default {
  content: [
     "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors:{
        blumecolor: '#4BC7B5',
        blumecolor2: '#a777e3',
        blumecolor3: '#00BFC9',
      }
    },
  },
  plugins: [typography // Opcional, si deseas más control en el texto
   ],
}

