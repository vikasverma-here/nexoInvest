import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.JPG'],
  server: {
    port: 6017,
    allowedHosts:['https://nexoinvest.org','http://nexoinvest.org','https://www.nexoinvest.org','http://www.nexoinvest.org','www.nexoinvest.org','nexoinvest.org']
  },
  preview: {
    port: 6017,
    allowedHosts:['https://nexoinvest.org','http://nexoinvest.org','https://www.nexoinvest.org','http://www.nexoinvest.org','www.nexoinvest.org','nexoinvest.org']
  }
})
