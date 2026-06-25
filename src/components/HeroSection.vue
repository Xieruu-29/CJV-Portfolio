<template>
  <section id="hero" class="hero" ref="heroEl">
    <!-- Starfield canvas -->
    <canvas ref="canvas" class="star-canvas"></canvas>

    <!-- Atom orbits decorative background -->
    <div class="orbit-bg" aria-hidden="true">
      <div class="orbit orbit-1"></div>
      <div class="orbit orbit-2"></div>
      <div class="orbit orbit-3"></div>
      <div class="orbit-nucleus"></div>
      <div class="orbit-electron e1"></div>
      <div class="orbit-electron e2"></div>
      <div class="orbit-electron e3"></div>
    </div>

    <div class="container hero-content">
      <div class="hero-badge reveal">
        <span class="badge-ring"></span>
        BS Information Technology · Philippines
      </div>

      <h1 class="hero-name reveal">
        Chris Jasper<br>
        <span class="name-outline">Velitario<span class="name-cursor">_</span></span>
      </h1>

      <p class="hero-title reveal">
        IT Support<span class="title-sep">/</span>Web Development
      </p>

      <p class="hero-bio reveal">
        Aspiring Full-Stack Developer building clean, performant digital systems
        from the frontend to the server room. An IT graduate from the Philippines,
        driven to make an impact on the global stage.
      </p>

      <div class="hero-actions reveal">
        <a href="#projects" class="btn-primary">
          View Projects
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </a>
        <a href="#contact" class="btn-ghost">Get in Touch</a>
      </div>
    </div>

    <!-- Scroll indicator -->
    <div class="hero-scroll-hint">
      <span class="scroll-label">scroll</span>
      <div class="scroll-track">
        <div class="scroll-dot"></div>
      </div>
    </div>

    <!-- Coordinates readout -->
    <div class="coord-readout">
      <span class="coord-mono">Cabuyao</span>
      <span class="coord-sep">//</span>
      <span class="coord-mono">Sta. Rosa</span>
      <span class="coord-sep">//</span>
      <span class="coord-mono">Calamba</span>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const heroEl = ref(null)
const canvas = ref(null)
let animId = null

onMounted(() => {
  const reveals = heroEl.value?.querySelectorAll('.reveal') || []
  reveals.forEach((el, i) => {
    setTimeout(() => el.classList.add('visible'), 100 + i * 90)
  })

  const c = canvas.value
  if (!c) return
  const ctx = c.getContext('2d')
  let W, H
  const STARS = 220

  class Star {
    constructor() { this.reset() }
    reset() {
      this.x = Math.random() * W
      this.y = Math.random() * H
      this.size = Math.random() * 1.2 + 0.2
      this.opacity = Math.random() * 0.6 + 0.1
      this.speed = Math.random() * 0.12 + 0.02
      this.twinklePhase = Math.random() * Math.PI * 2
      this.twinkleSpeed = Math.random() * 0.02 + 0.005
    }
  }

  let stars = []
  const resize = () => {
    W = c.width = c.offsetWidth
    H = c.height = c.offsetHeight
    stars = Array.from({ length: STARS }, () => new Star())
  }

  let frame = 0
  const draw = () => {
    ctx.clearRect(0, 0, W, H)
    frame++
    for (const s of stars) {
      s.twinklePhase += s.twinkleSpeed
      const twinkle = 0.5 + 0.5 * Math.sin(s.twinklePhase)
      const alpha = s.opacity * twinkle
      ctx.beginPath()
      ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(255,255,255,${alpha})`
      ctx.fill()

      // Occasional star with cross-glow
      if (s.size > 1.0 && Math.sin(s.twinklePhase) > 0.8) {
        const glow = s.size * 3
        const grad = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, glow)
        grad.addColorStop(0, `rgba(255,255,255,${alpha * 0.4})`)
        grad.addColorStop(1, 'rgba(255,255,255,0)')
        ctx.beginPath()
        ctx.arc(s.x, s.y, glow, 0, Math.PI * 2)
        ctx.fillStyle = grad
        ctx.fill()
      }
    }
    animId = requestAnimationFrame(draw)
  }

  resize()
  draw()

  window.addEventListener('resize', resize)
  onUnmounted(() => {
    cancelAnimationFrame(animId)
    window.removeEventListener('resize', resize)
  })
})
</script>

<style scoped>
.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding: 120px 0 80px;
  position: relative;
  overflow: hidden;
  background: #000;
}

/* ── Star canvas ── */
.star-canvas {
  position: absolute;
  inset: 0;
  width: 100%; height: 100%;
  pointer-events: none;
  z-index: 0;
}

/* ── Atom background ── */
.orbit-bg {
  position: absolute;
  right: -80px;
  top: 50%;
  transform: translateY(-50%);
  width: 560px;
  height: 560px;
  z-index: 0;
  pointer-events: none;
  opacity: 0.18;
}

.orbit {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  border: 1px solid rgba(255,255,255,0.5);
}

.orbit-1 {
  top: 50%; left: 50%;
  width: 100%; height: 34%;
  transform: translate(-50%, -50%) rotate(0deg);
  border-radius: 50%;
  animation: orbit-spin 12s linear infinite;
}
.orbit-2 {
  top: 50%; left: 50%;
  width: 100%; height: 34%;
  transform: translate(-50%, -50%) rotate(60deg);
  border-radius: 50%;
  animation: orbit-spin 16s linear infinite reverse;
}
.orbit-3 {
  top: 50%; left: 50%;
  width: 100%; height: 34%;
  transform: translate(-50%, -50%) rotate(120deg);
  border-radius: 50%;
  animation: orbit-spin 20s linear infinite;
}

@keyframes orbit-spin {
  from { transform: translate(-50%, -50%) rotate(var(--start-deg, 0deg)); }
  to   { transform: translate(-50%, -50%) rotate(calc(var(--start-deg, 0deg) + 360deg)); }
}

.orbit-1 { --start-deg: 0deg; }
.orbit-2 { --start-deg: 60deg; }
.orbit-3 { --start-deg: 120deg; }

.orbit-nucleus {
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  width: 14px; height: 14px;
  border-radius: 50%;
  background: white;
  box-shadow: 0 0 24px rgba(255,255,255,0.8), 0 0 60px rgba(255,255,255,0.3);
}

.orbit-electron {
  position: absolute;
  width: 7px; height: 7px;
  border-radius: 50%;
  background: white;
  box-shadow: 0 0 8px rgba(255,255,255,0.6);
}

.e1 {
  top: 50%; left: 0;
  animation: electron-1 12s linear infinite;
  transform-origin: 280px 0;
}
.e2 {
  top: 50%; left: 0;
  animation: electron-2 16s linear infinite;
  transform-origin: 280px 0;
}
.e3 {
  top: 50%; left: 0;
  animation: electron-3 20s linear infinite;
  transform-origin: 280px 0;
}

@keyframes electron-1 {
  from { transform: translateY(-50%) rotate(0deg) translateX(280px); }
  to   { transform: translateY(-50%) rotate(360deg) translateX(280px); }
}
@keyframes electron-2 {
  from { transform: translateY(-50%) rotate(0deg) translateX(280px) rotate(-60deg) scaleY(0.34); }
  to   { transform: translateY(-50%) rotate(360deg) translateX(280px) rotate(-60deg) scaleY(0.34); }
}
@keyframes electron-3 {
  from { transform: translateY(-50%) rotate(120deg) translateX(280px); }
  to   { transform: translateY(-50%) rotate(480deg) translateX(280px); }
}

/* ── Hero content ── */
.hero-content {
  position: relative;
  z-index: 1;
  pointer-events: none;
}
.hero-content a, .hero-content button { pointer-events: all; }

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-family: var(--font-mono);
  font-size: 10px;
  font-weight: 400;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--text-muted);
  border: 1px solid var(--border-mid);
  background: var(--surface);
  padding: 6px 14px;
  border-radius: var(--radius-sm);
  margin-bottom: 36px;
}

.badge-ring {
  width: 8px; height: 8px;
  border-radius: 50%;
  border: 1.5px solid rgba(255,255,255,0.6);
  position: relative;
  flex-shrink: 0;
}
.badge-ring::after {
  content: '';
  position: absolute;
  inset: 1.5px;
  border-radius: 50%;
  background: rgba(255,255,255,0.5);
  animation: core-pulse 2.8s ease-in-out infinite;
}
@keyframes core-pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.3; transform: scale(0.5); }
}

.hero-name {
  font-family: var(--font-display);
  font-size: clamp(60px, 10.5vw, 118px);
  font-weight: 800;
  line-height: 0.94;
  letter-spacing: -0.055em;
  margin-bottom: 28px;
  color: var(--text);
}

.name-outline {
  color: transparent;
  -webkit-text-stroke: 1.5px rgba(255,255,255,0.75);
}

.name-cursor {
  -webkit-text-stroke: 0;
  color: rgba(255,255,255,0.8);
  animation: blink 1.1s step-end infinite;
}
@keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }

.hero-title {
  font-family: var(--font-mono);
  font-size: clamp(13px, 1.8vw, 17px);
  font-weight: 400;
  letter-spacing: 0.04em;
  color: var(--text-secondary);
  margin-bottom: 24px;
}

.title-sep {
  margin: 0 10px;
  color: var(--text-dim);
}

.hero-bio {
  font-size: 15px;
  color: var(--text-muted);
  max-width: 460px;
  line-height: 1.8;
  margin-bottom: 48px;
}

.hero-actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: var(--accent);
  color: var(--bg);
  font-family: var(--font-display);
  font-size: 13px;
  font-weight: 700;
  padding: 12px 24px;
  border-radius: var(--radius-sm);
  letter-spacing: 0.015em;
  transition: opacity var(--transition-base), transform var(--transition-base), box-shadow var(--transition-base);
}
.btn-primary:hover {
  opacity: 0.88;
  transform: translateY(-2px);
  box-shadow: 0 6px 24px rgba(255,255,255,0.12);
}

.btn-ghost {
  display: inline-flex;
  align-items: center;
  font-family: var(--font-display);
  font-size: 13px;
  font-weight: 600;
  color: var(--text-secondary);
  border: 1px solid var(--border-mid);
  padding: 12px 24px;
  border-radius: var(--radius-sm);
  transition: border-color var(--transition-base), color var(--transition-base), background var(--transition-base);
}
.btn-ghost:hover {
  border-color: var(--border-strong);
  color: var(--text);
  background: var(--accent-glow);
}

/* ── Scroll hint ── */
.hero-scroll-hint {
  position: absolute;
  bottom: 36px; right: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  z-index: 1;
}
.scroll-label {
  font-family: var(--font-mono);
  font-size: 8px;
  font-weight: 400;
  letter-spacing: 0.3em;
  color: var(--text-dim);
  writing-mode: vertical-rl;
  text-transform: uppercase;
}
.scroll-track {
  width: 1px;
  height: 52px;
  background: var(--border-mid);
  position: relative;
  overflow: hidden;
}
.scroll-dot {
  position: absolute;
  top: -4px; left: -1.5px;
  width: 4px; height: 4px;
  border-radius: 50%;
  background: white;
  animation: scroll-fall 2.2s ease-in-out infinite;
}
@keyframes scroll-fall {
  0%   { top: -4px; opacity: 1; }
  80%  { opacity: 1; }
  100% { top: calc(100% + 4px); opacity: 0; }
}

/* ── Coordinates ── */
.coord-readout {
  position: absolute;
  bottom: 36px; left: 40px;
  display: flex;
  align-items: center;
  gap: 10px;
  z-index: 1;
}
.coord-mono {
  font-family: var(--font-mono);
  font-size: 9px;
  font-weight: 400;
  letter-spacing: 0.12em;
  color: var(--text-dim);
}
.coord-sep {
  font-family: var(--font-mono);
  font-size: 9px;
  color: var(--border-strong);
}

@media (max-width: 700px) {
  .orbit-bg { opacity: 0.08; right: -160px; }

  .hero {
    flex-direction: column;
    justify-content: center;
    gap: 36px;
  }

  .hero-content {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .hero-badge { margin-bottom: 28px; }
  .hero-name { margin-bottom: 20px; }
  .hero-title { margin-bottom: 18px; }
  .hero-bio { margin-left: auto; margin-right: auto; margin-bottom: 36px; }
  .hero-actions { justify-content: center; }

  /* Scroll hint + coordinates re-flow below the content instead of pinning to viewport corners */
  .hero-scroll-hint,
  .coord-readout {
    position: static;
  }
  .coord-readout { order: 1; }
  .hero-scroll-hint { order: 2; }
}
</style>