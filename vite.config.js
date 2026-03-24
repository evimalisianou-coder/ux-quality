import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/ux-quality/',
  define: {
    __PASSWORD_HASH__: JSON.stringify('41dc5373bfd0d83279efe2e8022335c3935fa8bdd7ec8dfb74c5b3d690ff9ac9'),
  },
})
