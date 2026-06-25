<template>
  <section id="certifications" ref="sectionEl">
    <div class="container">
      <span class="section-eyebrow reveal sector-anim">03 — Certifications</span>
      <h2 class="section-title reveal">Credentials</h2>

      <!-- Filter bar -->
      <div class="filter-bar reveal">
        <button v-for="f in filters" :key="f" class="filter-btn"
          :class="{ active: activeFilter === f }"
          @click="activeFilter = f">{{ f }}</button>
        <span class="cert-count">{{ filteredCerts.length }} credential{{ filteredCerts.length !== 1 ? 's' : '' }}</span>
      </div>

      <!-- Grid -->
      <div class="cert-grid">
        <button v-for="(cert, i) in filteredCerts" :key="cert.name + i"
          type="button"
          class="cert-card"
          :class="{ stamped: stampedCount > i }"
          :style="{ transitionDelay: i * 110 + 'ms' }"
          @click="openPreview(cert)"
          @mouseenter="hoveredCert = i"
          @mouseleave="hoveredCert = -1">

          <!-- Burst ring on appear -->
          <div class="cert-stamp-ring"></div>

          <!-- Orbit ring decoration -->
          <div class="cert-orbit" :class="{ active: hoveredCert === i }"></div>

          <div class="cert-thumb">
            <img :src="cert.image" :alt="cert.name + ' certificate'" loading="lazy" />
            <div class="cert-thumb-overlay">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                <circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/><path d="M11 8v6M8 11h6"/>
              </svg>
              <span>Preview</span>
            </div>
          </div>

          <div class="cert-top">
            <div class="cert-nucleus">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <circle cx="12" cy="8" r="5"/><path d="M8.21 13.89L7 23l5-3 5 3-1.21-9.12"/>
              </svg>
            </div>
            <span class="cert-category-tag">{{ cert.category }}</span>
          </div>

          <h3 class="cert-name">{{ cert.name }}</h3>
          <p class="cert-issuer">{{ cert.issuer }}</p>

          <div class="cert-footer">
            <span class="cert-date">{{ cert.date }}</span>
            <div class="cert-arrow">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>
              </svg>
            </div>
          </div>

          <div class="cert-progress-track">
            <div class="cert-progress-fill"
              :style="{ width: stampedCount > i ? '100%' : '0%', transitionDelay: (i * 110 + 300) + 'ms' }"></div>
          </div>
        </button>
      </div>
    </div>

    <!-- Lightbox preview -->
    <Transition name="lightbox-fade">
      <div v-if="previewCert" class="cert-lightbox" @click.self="closePreview">
        <button class="cert-lightbox-close" type="button" @click="closePreview" aria-label="Close preview">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 6 6 18M6 6l12 12"/>
          </svg>
        </button>
        <figure class="cert-lightbox-content">
          <img :src="previewCert.image" :alt="previewCert.name + ' certificate'" />
          <figcaption>
            <strong>{{ previewCert.name }}</strong>
            <span>{{ previewCert.issuer }} — {{ previewCert.date }}</span>
          </figcaption>
        </figure>
      </div>
    </Transition>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

const sectionEl   = ref(null)
const stampedCount = ref(0)
const hoveredCert  = ref(-1)
const activeFilter = ref('All')
const previewCert  = ref(null)

function openPreview(cert) {
  previewCert.value = cert
}
function closePreview() {
  previewCert.value = null
}
function onKeydown(e) {
  if (e.key === 'Escape') closePreview()
}

const certifications = [
  { name: 'Introduction to Cybersecurity', issuer: 'Cisco Networking Academy', date: 'Jan 2026', category: 'Security', image: '/certs/cert-cybersecurity-intro.png' },
  { name: 'Ethical Hacker',                issuer: 'Cisco Networking Academy', date: 'Apr 2026', category: 'Security', image: '/certs/cert-ethical-hacker.png' },
  { name: 'JavaScript Essentials 1',        issuer: 'Cisco Networking Academy', date: 'Apr 2026', category: 'Dev',      image: '/certs/cert-javascript-essentials-1.png' },
  { name: 'Networking Basics',              issuer: 'Cisco Networking Academy', date: 'Apr 2026', category: 'Network',  image: '/certs/cert-networking-basics.png' },
  { name: 'Google Analytics Certification', issuer: 'Google',                  date: 'Apr 2026', category: 'Marketing', image: '/certs/cert-google-analytics.png' },
  { name: 'HubSpot Data Integrations Certified', issuer: 'HubSpot Academy',    date: 'Apr 2026', category: 'Marketing', image: '/certs/cert-hubspot-data-integrations.png' },
]

const filters = computed(() => ['All', ...new Set(certifications.map(c => c.category))])
const filteredCerts = computed(() =>
  activeFilter.value === 'All' ? certifications : certifications.filter(c => c.category === activeFilter.value)
)

onMounted(() => {
  window.addEventListener('keydown', onKeydown)

  const reveals = sectionEl.value?.querySelectorAll('.reveal') || []
  const ro = new IntersectionObserver(
    (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
    { threshold: 0.1 }
  )
  reveals.forEach(el => ro.observe(el))

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        certifications.forEach((_, i) => {
          setTimeout(() => { stampedCount.value = i + 1 }, i * 130)
        })
        obs.disconnect()
      }
    })
  }, { threshold: 0.2 })
  if (sectionEl.value) obs.observe(sectionEl.value)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown)
})
</script>

<style scoped>
.filter-bar {
  display: flex; align-items: center; gap: 8px;
  margin-bottom: 28px; flex-wrap: wrap;
}
.filter-btn {
  font-family: var(--font-mono);
  font-size: 10px; font-weight: 400;
  letter-spacing: 0.1em; text-transform: uppercase;
  background: transparent;
  border: 1px solid var(--border-mid);
  color: var(--text-dim);
  padding: 5px 14px; border-radius: var(--radius-xs);
  cursor: pointer;
  transition: color var(--transition-base), border-color var(--transition-base), background var(--transition-base);
}
.filter-btn:hover { color: var(--text-secondary); border-color: var(--border-strong); }
.filter-btn.active {
  color: var(--text);
  border-color: var(--border-strong);
  background: var(--accent-glow-strong);
}
.cert-count {
  margin-left: auto;
  font-family: var(--font-mono);
  font-size: 9px; font-weight: 400;
  letter-spacing: 0.12em; text-transform: uppercase;
  color: var(--text-dim);
}

/* ── Grid ── */
.cert-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 16px;
}

.cert-card {
  display: flex; flex-direction: column;
  background: var(--surface);
  border: 1px solid var(--border-mid);
  border-radius: var(--radius-lg);
  padding: 20px 20px 0;
  transition:
    border-color var(--transition-base),
    box-shadow var(--transition-base),
    transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1),
    opacity 0.35s ease;
  transform: scale(0.82) rotate(-3deg);
  opacity: 0;
  position: relative;
  overflow: hidden;
  text-decoration: none;
  font: inherit;
  color: inherit;
  text-align: left;
  cursor: pointer;
  -webkit-appearance: none;
  appearance: none;
}
.cert-card.stamped {
  transform: scale(1) rotate(0deg);
  opacity: 1;
}
.cert-card:hover {
  border-color: var(--border-strong);
  box-shadow: var(--shadow-md), var(--shadow-glow);
  transform: scale(1) rotate(0deg) translateY(-4px) !important;
}

/* Stamp burst ring */
.cert-stamp-ring {
  position: absolute; inset: 0;
  border-radius: var(--radius-lg);
  border: 1.5px solid rgba(255,255,255,0.5);
  opacity: 0; pointer-events: none;
}
.cert-card.stamped .cert-stamp-ring {
  animation: stamp-ring 0.55s ease-out forwards;
}
@keyframes stamp-ring {
  0%   { opacity: 0.7; transform: scale(0.88); }
  100% { opacity: 0;   transform: scale(1.08); }
}

/* Orbit ring on hover */
.cert-orbit {
  position: absolute;
  top: 50%; left: 50%;
  width: 80px; height: 80px;
  margin: -40px 0 0 -40px;
  border-radius: 50%;
  border: 1px solid rgba(255,255,255,0.08);
  pointer-events: none;
  opacity: 0;
  transform: scale(0);
  transition: opacity var(--transition-base), transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.cert-orbit.active {
  opacity: 1;
  transform: scale(3.5);
}

/* Card content */
.cert-thumb {
  width: 100%;
  aspect-ratio: 16 / 10;
  border-radius: var(--radius-md);
  overflow: hidden;
  margin-bottom: 14px;
  background: #fff;
  border: 1px solid var(--border-mid);
  transition: border-color var(--transition-base);
  position: relative;
}
.cert-thumb img {
  width: 100%; height: 100%;
  object-fit: cover;
  object-position: top center;
  display: block;
  transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), filter 0.5s ease;
}
.cert-card:hover .cert-thumb {
  border-color: var(--border-strong);
}
.cert-card:hover .cert-thumb img {
  transform: scale(1.06);
  filter: brightness(0.7);
}
.cert-thumb-overlay {
  position: absolute; inset: 0;
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  gap: 6px;
  color: #fff;
  opacity: 0;
  transition: opacity var(--transition-base);
  pointer-events: none;
}
.cert-thumb-overlay span {
  font-family: var(--font-mono);
  font-size: 10px; font-weight: 400;
  letter-spacing: 0.12em; text-transform: uppercase;
}
.cert-card:hover .cert-thumb-overlay {
  opacity: 1;
}

.cert-top {
  display: flex; justify-content: space-between; align-items: flex-start;
  margin-bottom: 14px;
}

.cert-nucleus {
  width: 32px; height: 32px;
  border-radius: var(--radius-md);
  background: var(--surface-2);
  border: 1px solid var(--border-mid);
  display: flex; align-items: center; justify-content: center;
  color: var(--text-secondary);
  transition: border-color var(--transition-base), color var(--transition-base);
}
.cert-card:hover .cert-nucleus {
  border-color: var(--border-strong);
  color: var(--text);
}

.cert-category-tag {
  font-family: var(--font-mono);
  font-size: 9px; font-weight: 400;
  letter-spacing: 0.12em; text-transform: uppercase;
  color: var(--text-dim);
  background: var(--bg);
  border: 1px solid var(--border-mid);
  padding: 3px 8px; border-radius: var(--radius-xs);
  transition: color var(--transition-base), border-color var(--transition-base);
}
.cert-card:hover .cert-category-tag {
  color: var(--text-secondary);
  border-color: var(--border-strong);
}

.cert-name {
  font-family: var(--font-display);
  font-size: 13px; font-weight: 700;
  letter-spacing: -0.015em;
  margin-bottom: 5px; flex: 1;
  color: var(--text);
}

.cert-issuer {
  font-family: var(--font-mono);
  font-size: 10px; font-weight: 400;
  color: var(--text-muted); letter-spacing: 0.04em;
  margin-bottom: 14px;
}

.cert-footer {
  display: flex; justify-content: space-between; align-items: center;
  padding: 10px 0 12px;
  border-top: 1px solid var(--border);
  margin-top: auto;
}
.cert-date {
  font-family: var(--font-mono);
  font-size: 10px; font-weight: 400;
  color: var(--text-dim); letter-spacing: 0.08em;
}
.cert-arrow {
  color: var(--text-dim);
  transition: color var(--transition-base), transform var(--transition-base);
}
.cert-card:hover .cert-arrow {
  color: var(--text);
  transform: translate(2px, -2px);
}

/* Progress bar */
.cert-progress-track {
  height: 2px; background: var(--border);
  border-radius: 0 0 var(--radius-lg) var(--radius-lg);
  overflow: hidden; margin: 0 -20px;
}
.cert-progress-fill {
  height: 100%; width: 0; background: var(--text);
  border-radius: 0 0 var(--radius-lg) var(--radius-lg);
  transition: width 0.9s cubic-bezier(0.16, 1, 0.3, 1);
}

/* ── Lightbox ── */
.cert-lightbox {
  position: fixed; inset: 0;
  z-index: 200;
  background: rgba(5, 6, 10, 0.86);
  backdrop-filter: blur(6px);
  display: flex; align-items: center; justify-content: center;
  padding: 32px;
}
.cert-lightbox-close {
  position: absolute; top: 20px; right: 20px;
  width: 40px; height: 40px;
  border-radius: 50%;
  background: var(--surface);
  border: 1px solid var(--border-mid);
  color: var(--text);
  display: flex; align-items: center; justify-content: center;
  cursor: pointer;
  transition: border-color var(--transition-base), background var(--transition-base), transform var(--transition-base);
}
.cert-lightbox-close:hover {
  border-color: var(--border-strong);
  background: var(--surface-2);
  transform: scale(1.06);
}
.cert-lightbox-content {
  max-width: min(900px, 92vw);
  max-height: 88vh;
  display: flex; flex-direction: column;
  align-items: center;
  margin: 0;
}
.cert-lightbox-content img {
  max-width: 100%;
  max-height: 76vh;
  width: auto; height: auto;
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-md), var(--shadow-glow);
  background: #fff;
  object-fit: contain;
}
.cert-lightbox-content figcaption {
  margin-top: 16px;
  display: flex; flex-direction: column; align-items: center;
  gap: 4px;
  text-align: center;
}
.cert-lightbox-content figcaption strong {
  font-family: var(--font-display);
  font-size: 15px; font-weight: 700;
  color: var(--text);
  letter-spacing: -0.01em;
}
.cert-lightbox-content figcaption span {
  font-family: var(--font-mono);
  font-size: 10px; font-weight: 400;
  letter-spacing: 0.08em; text-transform: uppercase;
  color: var(--text-dim);
}

.lightbox-fade-enter-active, .lightbox-fade-leave-active {
  transition: opacity 0.25s ease;
}
.lightbox-fade-enter-from, .lightbox-fade-leave-to {
  opacity: 0;
}
.lightbox-fade-enter-active .cert-lightbox-content,
.lightbox-fade-leave-active .cert-lightbox-content {
  transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.lightbox-fade-enter-from .cert-lightbox-content {
  transform: scale(0.92);
}

@media (max-width: 700px) {
  .container { text-align: center; }

  .filter-bar { justify-content: center; }
  .cert-count { margin-left: 0; width: 100%; text-align: center; order: 99; }

  .cert-grid { grid-template-columns: 1fr; }
}
</style>