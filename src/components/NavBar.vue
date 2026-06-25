<template>
  <header :class="['navbar', { scrolled }]">
    <div class="container nav-inner">

      <!-- Logo / identity -->
      <a href="#hero" class="nav-logo">
        <svg width="22" height="22" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
          <!-- Atom symbol -->
          <circle cx="22" cy="22" r="3" fill="white"/>
          <ellipse cx="22" cy="22" rx="18" ry="6" stroke="white" stroke-width="1" opacity="0.7"/>
          <ellipse cx="22" cy="22" rx="18" ry="6" stroke="white" stroke-width="1" opacity="0.7" transform="rotate(60 22 22)"/>
          <ellipse cx="22" cy="22" rx="18" ry="6" stroke="white" stroke-width="1" opacity="0.7" transform="rotate(120 22 22)"/>
        </svg>
        <span class="nav-logo-text">CJV</span>
      </a>

      <nav class="nav-dropdowns">
        <!-- Navigation Dropdown -->
        <div class="drop-wrap" ref="navWrap">
          <button class="nav-btn" :class="{ open: openDrop === 'nav' }" @click="toggle('nav')" :aria-expanded="openDrop === 'nav'">
            Navigate
            <svg class="caret" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
          </button>
          <div class="dropdown" :class="{ open: openDrop === 'nav' }" role="menu">
            <a v-for="link in navLinks" :key="link.href" :href="link.href" class="drop-item" role="menuitem" @click="openDrop = null">
              <span class="drop-icon" v-html="link.icon"></span>
              <span class="drop-title">{{ link.label }}</span>
            </a>
          </div>
        </div>

        <!-- Socials Dropdown -->
        <div class="drop-wrap" ref="socialWrap">
          <button class="nav-btn" :class="{ open: openDrop === 'social' }" @click="toggle('social')" :aria-expanded="openDrop === 'social'">
            Socials
            <svg class="caret" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
          </button>
          <div class="dropdown" :class="{ open: openDrop === 'social' }" role="menu">
            <a v-for="link in socialLinks" :key="link.label" :href="link.url" target="_blank" rel="noopener" class="drop-item" role="menuitem" @click="openDrop = null">
              <span class="drop-icon" v-html="link.icon"></span>
              <div>
                <span class="drop-title">{{ link.label }}</span>
                <span class="drop-sub">{{ link.sub }}</span>
              </div>
            </a>
          </div>
        </div>

        <!-- Hire Me -->
        <div class="drop-wrap hire-wrap" ref="hireWrap">
          <button class="nav-btn nav-cta" :class="{ open: openDrop === 'hire' }" @click="toggle('hire')" :aria-expanded="openDrop === 'hire'">
            <span class="cta-dot"></span>
            Hire Me
            <svg class="caret" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
          </button>
          <div class="dropdown" :class="{ open: openDrop === 'hire' }" role="menu">
            <a href="/docs/velitario-resume.pdf" download class="drop-item" role="menuitem" @click="openDrop = null">
              <span class="drop-icon"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="13" x2="12" y2="17"/><line x1="10" y1="15" x2="14" y2="15"/></svg></span>
              <div><span class="drop-title">Download Resume</span><span class="drop-sub">PDF · ATS-friendly</span></div>
            </a>
            <a href="/docs/velitario-cv.pdf" download class="drop-item" role="menuitem" @click="openDrop = null">
              <span class="drop-icon"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="13" x2="12" y2="17"/><line x1="10" y1="15" x2="14" y2="15"/></svg></span>
              <div><span class="drop-title">Download CV</span><span class="drop-sub">PDF · Updated 2026</span></div>
            </a>
            <button type="button" class="drop-item" role="menuitem" @click="handleCoverLetter">
              <span class="drop-icon"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="8" y1="8" x2="16" y2="8"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="8" y1="16" x2="12" y2="16"/></svg></span>
              <div><span class="drop-title">Cover Letter</span><span class="drop-sub">PDF · Dated to today</span></div>
            </button>
            <a href="mailto:velitariochrisjasper69@gmail.com" class="drop-item" role="menuitem" @click="openDrop = null">
              <span class="drop-icon"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="2,4 12,13 22,4"/></svg></span>
              <div><span class="drop-title">Send Email</span><span class="drop-sub">velitariochrisjasper69@gmail.com</span></div>
            </a>
          </div>
        </div>
      </nav>

      <button class="nav-hamburger" @click="menuOpen = !menuOpen" :aria-expanded="menuOpen">
        <span></span><span></span><span></span>
      </button>
    </div>

    <div :class="['mobile-menu', { open: menuOpen }]">
      <p class="mobile-section-label">Navigate</p>
      <a v-for="link in navLinks" :key="link.href" :href="link.href" @click="menuOpen = false" class="mobile-link">{{ link.label }}</a>
      <p class="mobile-section-label">Socials</p>
      <a v-for="link in socialLinks" :key="link.label" :href="link.url" target="_blank" rel="noopener" @click="menuOpen = false" class="mobile-link">{{ link.label }}</a>
      <p class="mobile-section-label">Hire Me</p>
      <a href="/docs/velitario-resume.pdf" download class="mobile-link mobile-link--cta" @click="menuOpen = false">Download Resume</a>
      <a href="/docs/velitario-cv.pdf" download class="mobile-link mobile-link--cta" @click="menuOpen = false">Download CV</a>
      <button type="button" class="mobile-link mobile-link--cta mobile-link--btn" @click="handleCoverLetter">Cover Letter (PDF)</button>
      <a href="mailto:velitariochrisjasper69@gmail.com" class="mobile-link mobile-link--cta" @click="menuOpen = false">Send Email</a>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { downloadCoverLetter } from '../utils/generateCoverLetter.js'

const scrolled  = ref(false)
const menuOpen  = ref(false)
const openDrop  = ref(null)
const navWrap   = ref(null)
const socialWrap = ref(null)
const hireWrap  = ref(null)

const handleCoverLetter = () => {
  downloadCoverLetter()
  openDrop.value = null
  menuOpen.value = false
}

const navLinks = [
  { href: '#hero',           label: 'Home',           icon: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>` },
  { href: '#about',          label: 'About',          icon: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>` },
  { href: '#projects',       label: 'Projects',       icon: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>` },
  { href: '#certifications', label: 'Certifications', icon: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="6"/><path d="M9 21l3-3 3 3"/><path d="M9 12l-5 9h16l-5-9"/></svg>` },
  { href: '#contact',        label: 'Contact',        icon: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="2,4 12,13 22,4"/></svg>` },
]

const socialLinks = [
  { label: 'GitHub',   sub: 'github.com/Xieruu-29',       url: 'https://github.com/Xieruu-29',       icon: `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>` },
  { label: 'LinkedIn', sub: 'linkedin.com/in/velitario-chris-jasper',   url: 'https://www.linkedin.com/in/velitario-chris-jasper-28033a3a1/',   icon: `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>` },
  { label: 'Facebook', sub: 'facebook.com/jasper.velitario.7',     url: 'https://www.facebook.com/jasper.velitario.7',     icon: `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>` },
  { label: 'Credly',   sub: 'credly.com/users/chris-jasper-velitario', url: 'https://www.credly.com/users/chris-jasper-velitario', icon: `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/></svg>` },
]

const toggle = (name) => { openDrop.value = openDrop.value === name ? null : name }
const onScroll = () => { scrolled.value = window.scrollY > 48 }
const onClickOutside = (e) => {
  const refs = [navWrap.value, socialWrap.value, hireWrap.value]
  if (!refs.some(r => r && r.contains(e.target))) openDrop.value = null
}

onMounted(() => {
  window.addEventListener('scroll', onScroll)
  document.addEventListener('mousedown', onClickOutside)
})
onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  document.removeEventListener('mousedown', onClickOutside)
})
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 200;
  padding: 20px 0;
  transition: background var(--transition-slow), padding var(--transition-base), border-color var(--transition-base);
  border-bottom: 1px solid transparent;
}
.navbar.scrolled {
  background: rgba(0, 0, 0, 0.88);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  padding: 14px 0;
  border-color: var(--border);
}
.nav-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

/* ── Logo ── */
.nav-logo {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  opacity: 0.85;
  transition: opacity var(--transition-base);
}
.nav-logo:hover { opacity: 1; }
.nav-logo-text {
  font-family: var(--font-mono);
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.12em;
  color: var(--text);
}

/* ── Dropdown area ── */
.nav-dropdowns {
  display: flex;
  align-items: center;
  gap: 6px;
}
.drop-wrap { position: relative; }

.nav-btn {
  font-family: var(--font-display);
  font-size: 12px;
  font-weight: 600;
  color: var(--text-muted);
  background: transparent;
  border: 1px solid var(--border-mid);
  padding: 7px 13px;
  border-radius: var(--radius-sm);
  letter-spacing: 0.015em;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: color var(--transition-base), border-color var(--transition-base), background var(--transition-base);
  white-space: nowrap;
}
.nav-btn:hover {
  color: var(--text);
  border-color: var(--border-strong);
  background: var(--accent-glow);
}
.nav-btn.open {
  color: var(--text);
  border-color: var(--border-strong);
  background: var(--accent-glow);
}
.caret {
  opacity: 0.5;
  transition: transform var(--transition-base);
  flex-shrink: 0;
}
.nav-btn.open .caret { transform: rotate(180deg); }

/* CTA button */
.nav-cta {
  color: var(--bg);
  background: var(--accent);
  border-color: var(--accent);
  font-weight: 700;
  letter-spacing: 0.02em;
}
.nav-cta:hover { opacity: 0.88; color: var(--bg); background: var(--accent); border-color: var(--accent); }
.nav-cta.open  { opacity: 0.88; color: var(--bg); background: var(--accent); border-color: var(--accent); }
.nav-cta .caret { color: var(--bg); opacity: 0.6; }

.cta-dot {
  width: 5px; height: 5px;
  border-radius: 50%;
  background: var(--bg);
  opacity: 0.7;
  flex-shrink: 0;
  animation: cta-blink 2s ease-in-out infinite;
}
@keyframes cta-blink {
  0%, 100% { opacity: 0.7; }
  50% { opacity: 0.2; }
}

/* ── Dropdown panel ── */
.dropdown {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  min-width: 220px;
  background: #0d0d0d;
  border: 1px solid var(--border-mid);
  border-radius: var(--radius-md);
  overflow: hidden;
  box-shadow: var(--shadow-lg), 0 0 0 1px var(--accent-glow);
  opacity: 0;
  transform: translateY(-6px);
  pointer-events: none;
  transition: opacity var(--transition-base), transform var(--transition-base);
  z-index: 300;
}
.dropdown.open {
  opacity: 1;
  transform: translateY(0);
  pointer-events: all;
}
.drop-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 11px 14px;
  transition: background var(--transition-fast);
  cursor: pointer;
  border-bottom: 1px solid var(--border);
  text-decoration: none;
  width: 100%;
  background: none;
  border-left: none;
  border-right: none;
  border-top: none;
  text-align: left;
  font: inherit;
  color: inherit;
  -webkit-appearance: none;
  appearance: none;
}
.drop-item:last-child { border-bottom: none; }
.drop-item:hover { background: var(--accent-glow); }

.drop-icon {
  width: 28px; height: 28px;
  border-radius: var(--radius-sm);
  background: var(--surface-2);
  border: 1px solid var(--border-mid);
  display: flex; align-items: center; justify-content: center;
  color: var(--text-secondary);
  flex-shrink: 0;
  transition: border-color var(--transition-fast), color var(--transition-fast);
}
.drop-item:hover .drop-icon { border-color: var(--border-strong); color: var(--text); }

.drop-title {
  display: block;
  font-family: var(--font-display);
  font-size: 13px; font-weight: 600;
  color: var(--text); letter-spacing: -0.01em;
}
.drop-sub {
  display: block;
  font-family: var(--font-mono);
  font-size: 10px; font-weight: 400;
  color: var(--text-muted); letter-spacing: 0.04em;
  margin-top: 2px;
}

/* ── Hamburger ── */
.nav-hamburger {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none; border: none;
  cursor: pointer; padding: 4px;
}
.nav-hamburger span {
  display: block;
  width: 22px; height: 1.5px;
  background: var(--text-muted);
  border-radius: 1px;
  transition: background var(--transition-base);
}
.nav-hamburger:hover span { background: var(--text); }

/* ── Mobile menu ── */
.mobile-menu {
  display: none;
  flex-direction: column;
  background: rgba(0,0,0,0.97);
  border-top: 1px solid var(--border);
  max-height: 0;
  overflow: hidden;
  transition: max-height var(--transition-slow);
}
.mobile-menu.open { max-height: 600px; }

.mobile-section-label {
  font-family: var(--font-mono);
  font-size: 9px; font-weight: 400;
  letter-spacing: 0.2em; text-transform: uppercase;
  color: var(--text-dim); padding: 14px 28px 4px;
}
.mobile-link {
  font-family: var(--font-display);
  font-size: 14px; font-weight: 500;
  color: var(--text-muted);
  padding: 12px 28px;
  border-bottom: 1px solid var(--border);
  transition: color var(--transition-base), background var(--transition-base);
  display: block;
}
.mobile-link:hover { color: var(--text); background: var(--accent-glow); }
.mobile-link--cta { color: var(--text); }
.mobile-link--btn {
  width: 100%;
  background: none;
  border: none;
  text-align: left;
  font: inherit;
  cursor: pointer;
  -webkit-appearance: none;
  appearance: none;
}

@media (max-width: 700px) {
  .nav-dropdowns  { display: none; }
  .nav-hamburger  { display: flex; }
  .mobile-menu    { display: flex; }
}
</style>
