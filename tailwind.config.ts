import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"SF Pro Text"',
          '"SF Pro Display"',
          '"PingFang SC"',
          '"Hiragino Sans GB"',
          '"Microsoft YaHei"',
          '"Helvetica Neue"',
          'Helvetica',
          'Arial',
          'sans-serif',
        ],
      },
      colors: {
        brand: {
          50: '#f5f6ff',
          100: '#ebeeff',
          200: '#c8ceff',
          300: '#9ea7ff',
          400: '#747cff',
          500: '#4f5bff',
          600: '#3b47e0',
          700: '#2d38b3',
          800: '#202986',
          900: '#151b59',
        },
      },
      fontSize: {
        base: '16px',
      },
      lineHeight: {
        normal: '1.6',
      },
    },
  },
  plugins: [],
};

export default config;
