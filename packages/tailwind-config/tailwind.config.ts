import type { Config } from 'tailwindcss'

export default {
  content: ['./src/**/*.tsx', './src/**/*.jsx', 'node_modules/@ai-chat/chat/**/*.tsx'],
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config

