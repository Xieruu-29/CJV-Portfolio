<template>
  <footer id="contact" class="footer">
    <div class="container">
      <!-- Atom divider top -->
      <div class="footer-atom-divider" aria-hidden="true">
        <div class="fa-line fa-line-left"></div>
        <div class="fa-nucleus">
          <div class="fa-ring r1"></div>
          <div class="fa-ring r2"></div>
          <div class="fa-core"></div>
        </div>
        <div class="fa-line fa-line-right"></div>
      </div>

      <div class="footer-inner">
        <div class="footer-cta-block">
          <span class="section-eyebrow">04 — Contact</span>
          <h2 class="footer-heading">
            <span class="glitch-wrap" ref="glitchEl" @mouseenter="triggerGlitch">
              <span class="glitch-text" :class="{ glitching }">Let's build something.</span>
              <span class="glitch-clone-1" aria-hidden="true">Let's build something.</span>
              <span class="glitch-clone-2" aria-hidden="true">Let's build something.</span>
            </span>
          </h2>
          <p class="footer-sub">
            Open to full-time roles, freelance projects, and collaborations.
            Based in the Philippines — working globally.
          </p>
          <a href="mailto:velitariochrisjasper69@gmail.com" class="footer-email">
            velitariochrisjasper69@gmail.com
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 17L17 7M7 7h10v10"/></svg>
          </a>
        </div>

        <div class="footer-links-block">
          <p class="links-title">Find me</p>
          <div class="footer-socials">
            <a v-for="link in socialLinks" :key="link.label"
               :href="link.url" target="_blank" rel="noopener"
               class="footer-social">
              <span v-html="link.icon"></span>
              <span>{{ link.label }}</span>
            </a>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <span class="footer-copy">© {{ year }} Chris Jasper Velitario · Built with Vue &amp; Vite</span>
        <span class="footer-made">PH — Reaching globally</span>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref } from 'vue'

const year = new Date().getFullYear()
const glitching = ref(false)
const glitchEl = ref(null)

const triggerGlitch = () => {
  if (glitching.value) return
  glitching.value = true
  setTimeout(() => { glitching.value = false }, 600)
}

const socialLinks = [
  { label: 'GitHub',   url: 'https://github.com/Xieruu-29',        icon: `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>` },
  { label: 'LinkedIn', url: 'https://www.linkedin.com/in/velitario-chris-jasper-28033a3a1/',   icon: `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>` },
  { label: 'Facebook', url: 'https://www.facebook.com/jasper.velitario.7',     icon: `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>` },
  { label: 'Credly',   url: 'https://www.credly.com/users/chris-jasper-velitario', icon: `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/></svg>` },
]
</script>

<style scoped>
.footer {
  background: var(--surface);
  border-top: 1px solid var(--border);
  padding: 0 0 48px;
}

/* ── Atom divider ── */
.footer-atom-divider {
  display: flex; align-items: center; gap: 0;
  padding: 48px 0 64px;
}
.fa-line {
  flex: 1; height: 1px; background: var(--border);
}
.fa-nucleus {
  position: relative;
  width: 44px; height: 44px;
  flex-shrink: 0;
}
.fa-ring {
  position: absolute;
  top: 50%; left: 50%;
  border-radius: 50%;
  border: 1px solid var(--border-mid);
}
.r1 {
  width: 44px; height: 16px;
  margin: -8px 0 0 -22px;
  animation: atom-spin 8s linear infinite;
}
.r2 {
  width: 44px; height: 16px;
  margin: -8px 0 0 -22px;
  animation: atom-spin 12s linear infinite reverse;
  transform-origin: center;
}
.r2 { transform: rotate(60deg); }
@keyframes atom-spin {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}
.fa-core {
  position: absolute;
  top: 50%; left: 50%;
  width: 6px; height: 6px;
  border-radius: 50%;
  background: white;
  margin: -3px 0 0 -3px;
  box-shadow: 0 0 10px rgba(255,255,255,0.6), 0 0 24px rgba(255,255,255,0.2);
}

/* ── Layout ── */
.footer-inner {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 60px; flex-wrap: wrap;
  margin-bottom: 72px;
}

.footer-heading {
  font-family: var(--font-display);
  font-size: clamp(28px, 5vw, 50px);
  font-weight: 800;
  letter-spacing: -0.055em; line-height: 1;
  margin: 18px 0 20px;
  color: var(--text);
}

/* Glitch */
.glitch-wrap {
  position: relative; display: inline-block; cursor: default;
}
.glitch-text, .glitch-clone-1, .glitch-clone-2 { display: block; }
.glitch-clone-1, .glitch-clone-2 {
  position: absolute; top: 0; left: 0; width: 100%; opacity: 0;
}
.glitch-text.glitching { animation: glitch-main 0.6s steps(1) forwards; }
.glitch-text.glitching ~ .glitch-clone-1 {
  animation: glitch-c1 0.6s steps(1) forwards;
  color: rgba(255,255,255,0.4);
}
.glitch-text.glitching ~ .glitch-clone-2 {
  animation: glitch-c2 0.6s steps(1) forwards;
  color: rgba(255,255,255,0.2);
}
@keyframes glitch-main {
  0%, 100% { clip-path: none; transform: none; }
  10% { clip-path: inset(20% 0 60% 0); transform: translateX(-4px); }
  20% { clip-path: inset(50% 0 20% 0); transform: translateX(3px); }
  30% { clip-path: none; transform: none; }
  50% { clip-path: inset(10% 0 70% 0); transform: translateX(2px); }
  60% { clip-path: none; transform: none; }
}
@keyframes glitch-c1 {
  0%, 100% { opacity: 0; }
  10%, 25% { opacity: 1; clip-path: inset(60% 0 10% 0); transform: translateX(-6px); }
  30%, 100% { opacity: 0; }
}
@keyframes glitch-c2 {
  0%, 100% { opacity: 0; }
  15%, 28% { opacity: 1; clip-path: inset(30% 0 40% 0); transform: translateX(4px); }
  32%, 100% { opacity: 0; }
}

.footer-sub {
  font-size: 15px; color: var(--text-muted);
  max-width: 400px; line-height: 1.78; margin-bottom: 28px;
}

.footer-email {
  display: inline-flex; align-items: center; gap: 8px;
  font-family: var(--font-display);
  font-size: 15px; font-weight: 700;
  letter-spacing: -0.02em; color: var(--text);
  border-bottom: 1px solid var(--border-mid);
  padding-bottom: 2px;
  transition: border-color var(--transition-base), opacity var(--transition-base);
}
.footer-email:hover { border-color: var(--border-strong); opacity: 0.75; }

.footer-links-block { flex-shrink: 0; }
.links-title {
  font-family: var(--font-mono);
  font-size: 9px; font-weight: 400;
  letter-spacing: 0.2em; text-transform: uppercase;
  color: var(--text-dim); margin-bottom: 20px;
}
.footer-socials { display: flex; flex-direction: column; gap: 14px; }
.footer-social {
  display: flex; align-items: center; gap: 10px;
  font-family: var(--font-display);
  font-size: 13px; font-weight: 500;
  color: var(--text-muted);
  transition: color var(--transition-base);
}
.footer-social:hover { color: var(--text); }

.footer-bottom {
  border-top: 1px solid var(--border);
  padding-top: 28px;
  display: flex; justify-content: space-between; align-items: center;
  flex-wrap: wrap; gap: 12px;
}
.footer-copy, .footer-made {
  font-family: var(--font-mono);
  font-size: 10px; font-weight: 400;
  color: var(--text-dim); letter-spacing: 0.06em;
}

@media (max-width: 700px) {
  .footer-atom-divider { padding: 40px 0 52px; }

  .footer-inner {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 48px;
    margin-bottom: 56px;
  }

  .footer-cta-block { width: 100%; display: flex; flex-direction: column; align-items: center; }
  .footer-sub { margin-left: auto; margin-right: auto; }

  .footer-links-block { width: 100%; display: flex; flex-direction: column; align-items: center; }
  .footer-socials {
    display: grid;
    grid-template-columns: repeat(2, auto);
    gap: 16px 28px;
    justify-content: center;
  }

  .footer-bottom { flex-direction: column; text-align: center; gap: 10px; }
}
</style>