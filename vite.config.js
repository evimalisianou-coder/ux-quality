import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/ux-quality/',
  define: {
    __PASSWORD_HASH__: JSON.stringify('993a681a9052fb7fe2f0e866a732ad2183a4266cf44cfc19df0588aa0a116df4'),
  },
})
