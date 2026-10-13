import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
// No COOP/COEP headers: Vite sends none by default, which lets Firebase's
// Google signInWithPopup poll window.closed without being blocked.
// (Do NOT set "same-origin" here — that is what caused the
// "Cross-Origin-Opener-Policy policy would block the window.closed call" warning.)
export default defineConfig({
  plugins: [react(), tailwindcss()],
});
