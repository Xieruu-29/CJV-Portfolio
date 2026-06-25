<template>
  <section id="about" class="about-section" ref="sectionEl">
    <div class="container">
      <span class="section-eyebrow reveal sector-anim">01 — About</span>
      <h2 class="section-title reveal">The Person Behind the Code</h2>

      <div class="about-grid">
        <!-- Profile column -->
        <div class="profile-col reveal">
          <div class="photo-frame" @mouseenter="photoHovered = true" @mouseleave="photoHovered = false">
            <div class="scan-line" :class="{ active: photoHovered }"></div>
            <div class="corner-tl" :class="{ visible: photoHovered }"></div>
            <div class="corner-tr" :class="{ visible: photoHovered }"></div>
            <div class="corner-bl" :class="{ visible: photoHovered }"></div>
            <div class="corner-br" :class="{ visible: photoHovered }"></div>
            <div class="photo-placeholder">
              <img src="/photo.jpg" alt="Chris Jasper Velitario" class="photo-img" />
            </div>
            <div class="photo-overlay" :class="{ visible: photoHovered }">
              <span class="overlay-label">IDENTITY VERIFIED</span>
            </div>
          </div>

          <div class="identity-block">
            <p class="identity-name">Chris Jasper B. Velitario</p>
            <p class="identity-role">Web Developer — IT Support</p>
            <dl class="identity-meta">
              <div class="meta-row" v-for="(item, i) in meta" :key="i"
                   :class="{ active: activeMeta === i }"
                   @mouseenter="activeMeta = i" @mouseleave="activeMeta = -1">
                <dt>{{ item.dt }}</dt>
                <dd>{{ item.dd }}</dd>
              </div>
            </dl>
          </div>
        </div>

        <!-- Bio -->
        <div class="about-text reveal" style="transition-delay: 0.1s">
          <p class="about-para">
            I'm a BSIT graduate from Pamantasan ng Cabuyao (University of Cabuyao) with
            a deep interest in building things that work beautifully, reliably, and at
            scale. My stack spans full-stack web development and IT infrastructure.
          </p>
          <p class="about-para">
            Growing up without the latest tools taught me something valuable: when you
            don't have much, you learn to be clever and resourceful. I ship clean code,
            keep systems stable, and solve problems with whatever's in front of me.
            That's the energy I bring to teams working on a global scale.
          </p>

          <!-- Stats -->
          <div class="about-stats">
            <div class="stat" v-for="(s, i) in stats" :key="s.label">
              <span class="stat-num">{{ displayNums[i] }}</span>
              <span class="stat-label">{{ s.label }}</span>
              <div class="stat-bar">
                <div class="stat-bar-fill" :class="{ filled: statsVisible }"
                     :style="{ width: s.bar + '%', transitionDelay: i * 0.15 + 's' }"></div>
              </div>
            </div>
          </div>

          <!-- Skills -->
          <div class="tag-cloud reveal" style="transition-delay: 0.25s">
            <span class="cloud-label">Technical Skills</span>
            <div class="tags-wrap">
              <span v-for="(tag, i) in tags" :key="tag" class="cloud-tag"
                    :class="{ active: activeTag === i }"
                    :style="{ animationDelay: i * 0.05 + 's' }"
                    @mouseenter="activeTag = i" @mouseleave="activeTag = -1">
                {{ tag }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const sectionEl   = ref(null)
const photoHovered = ref(false)
const activeMeta  = ref(-1)
const activeTag   = ref(-1)
const statsVisible = ref(false)

const meta = [
  { dt: 'Based in', dd: 'Philippines' },
  { dt: 'Degree',   dd: 'BSIT — 2026' },
  { dt: 'Open to',  dd: 'Remote / On-Site / Hybrid' },
]

const tags = ['HTML', 'CSS', 'JavaScript', 'React', 'Laravel', 'MySQL', 'PHP', 'GitHub']

const stats = [
  { num: '3+',   label: 'Projects shipped',  bar: 80,  target: 3,  isText: false },
  { num: 'BSIT', label: '2026 Graduate',      bar: 100, isText: true },
  { num: '6+',   label: 'Certifications',     bar: 60,  target: 6,  isText: false },
]
const displayNums = ref(['0+', '----', '0+'])

const animateCounters = () => {
  statsVisible.value = true
  stats.forEach((s, i) => {
    if (s.isText) {
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
      let iter = 0
      const interval = setInterval(() => {
        displayNums.value[i] = s.num.split('').map((c, ci) => ci < iter ? c : chars[Math.floor(Math.random() * chars.length)]).join('')
        if (iter >= s.num.length) clearInterval(interval)
        iter += 0.5
      }, 60)
    } else {
      let current = 0
      const target = s.target
      const start = performance.now()
      const tick = (now) => {
        const p = Math.min((now - start) / 1200, 1)
        const eased = 1 - Math.pow(1 - p, 3)
        current = Math.round(eased * target)
        displayNums.value[i] = current + '+'
        if (p < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    }
  })
}

onMounted(() => {
  const reveals = sectionEl.value?.querySelectorAll('.reveal') || []
  const ro = new IntersectionObserver(
    (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
    { threshold: 0.1 }
  )
  reveals.forEach(el => ro.observe(el))

  const statsEl = sectionEl.value?.querySelector('.about-stats')
  if (statsEl) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { animateCounters(); obs.disconnect() } })
    }, { threshold: 0.3 })
    obs.observe(statsEl)
  }
})
</script>

<style scoped>
.about-section { background: var(--surface); }

.about-grid {
  display: grid;
  grid-template-columns: 210px 1fr;
  gap: 68px;
  align-items: start;
}

/* ── Photo frame ── */
.photo-frame {
  width: 100%;
  aspect-ratio: 4/5;
  background: var(--surface-2);
  border: 1px solid var(--border-mid);
  position: relative;
  overflow: hidden;
  cursor: pointer;
  transition: border-color var(--transition-base);
  border-radius: var(--radius-md);
}
.photo-frame:hover { border-color: var(--border-strong); }

.scan-line {
  position: absolute;
  left: 0; right: 0; top: 0;
  height: 1.5px;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent);
  z-index: 2;
  opacity: 0;
}
.scan-line.active {
  opacity: 1;
  animation: scan-move 1.8s linear infinite;
}
@keyframes scan-move {
  0%   { top: 0; }
  100% { top: 100%; }
}

.corner-tl, .corner-tr, .corner-bl, .corner-br {
  position: absolute;
  width: 12px; height: 12px;
  border-color: rgba(255,255,255,0.6);
  border-style: solid;
  z-index: 3;
  opacity: 0;
  transition: opacity var(--transition-base), transform var(--transition-base);
}
.corner-tl { top: 8px; left: 8px;   border-width: 1.5px 0 0 1.5px; transform: translate(-3px,-3px); }
.corner-tr { top: 8px; right: 8px;  border-width: 1.5px 1.5px 0 0; transform: translate(3px,-3px); }
.corner-bl { bottom: 8px; left: 8px;  border-width: 0 0 1.5px 1.5px; transform: translate(-3px,3px); }
.corner-br { bottom: 8px; right: 8px; border-width: 0 1.5px 1.5px 0; transform: translate(3px,3px); }
.corner-tl.visible, .corner-tr.visible, .corner-bl.visible, .corner-br.visible {
  opacity: 1; transform: translate(0,0);
}

.photo-placeholder {
  width: 100%; height: 100%;
  position: relative;
  overflow: hidden;
}
.photo-img {
  width: 100%; height: 100%;
  object-fit: cover;
  object-position: center top;
  display: block;
  filter: grayscale(15%);
  transition: transform var(--transition-slow), filter var(--transition-slow);
}
.photo-frame:hover .photo-img {
  transform: scale(1.03);
  filter: grayscale(0%);
}

.photo-overlay {
  position: absolute; inset: 0;
  background: rgba(255,255,255,0.04);
  display: flex; align-items: center; justify-content: center;
  opacity: 0; transition: opacity var(--transition-base);
  z-index: 2;
}
.photo-overlay.visible { opacity: 1; }
.overlay-label {
  font-family: var(--font-mono);
  font-size: 9px; font-weight: 400;
  letter-spacing: 0.25em; text-transform: uppercase;
  color: rgba(255,255,255,0.7);
}

/* ── Identity ── */
.identity-block { padding: 18px 0 0; }
.identity-name {
  font-family: var(--font-display);
  font-size: 15px; font-weight: 700;
  letter-spacing: -0.025em; color: var(--text); margin-bottom: 4px;
}
.identity-role {
  font-family: var(--font-mono);
  font-size: 10px; font-weight: 400;
  color: var(--text-muted); letter-spacing: 0.04em;
  margin-bottom: 18px; line-height: 1.5;
}
.identity-meta {
  display: flex; flex-direction: column; gap: 0;
  border-top: 1px solid var(--border);
}
.meta-row {
  display: flex; justify-content: space-between; align-items: baseline;
  padding: 8px 4px; border-bottom: 1px solid var(--border); gap: 8px;
  cursor: default;
  transition: background var(--transition-base);
  border-radius: var(--radius-xs);
}
.meta-row.active { background: var(--accent-glow); }
.meta-row dt {
  font-family: var(--font-mono);
  font-size: 9px; font-weight: 400;
  letter-spacing: 0.1em; text-transform: uppercase;
  color: var(--text-dim); flex-shrink: 0;
}
.meta-row.active dt { color: var(--text-secondary); }
.meta-row dd {
  font-family: var(--font-display);
  font-size: 11px; font-weight: 500;
  color: var(--text-muted); text-align: right;
}
.meta-row.active dd { color: var(--text); }

/* ── Bio ── */
.about-para {
  font-size: 15px; line-height: 1.82;
  color: var(--text-muted); margin-bottom: 20px;
}

/* ── Stats ── */
.about-stats {
  display: flex; gap: 36px;
  margin-top: 36px; padding-top: 32px;
  border-top: 1px solid var(--border);
}
.stat { display: flex; flex-direction: column; gap: 4px; }
.stat-num {
  font-family: var(--font-mono);
  font-size: 26px; font-weight: 700;
  letter-spacing: -0.04em; color: var(--text); line-height: 1;
  font-variant-numeric: tabular-nums;
}
.stat-label {
  font-size: 10px; font-weight: 400;
  color: var(--text-dim); letter-spacing: 0.06em;
  font-family: var(--font-mono);
}
.stat-bar {
  height: 1px; background: var(--border-mid);
  margin-top: 8px; overflow: hidden; width: 56px;
}
.stat-bar-fill {
  height: 100%; background: var(--text);
  width: 0; transition: width 1.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.stat-bar-fill.filled { }

/* ── Tags ── */
.tag-cloud {
  margin-top: 32px; padding-top: 28px;
  border-top: 1px solid var(--border);
}
.cloud-label {
  display: block;
  font-family: var(--font-mono);
  font-size: 9px; font-weight: 400;
  letter-spacing: 0.18em; text-transform: uppercase;
  color: var(--text-dim); margin-bottom: 14px;
}
.tags-wrap { display: flex; flex-wrap: wrap; gap: 8px; }
.cloud-tag {
  font-family: var(--font-mono);
  font-size: 11px; font-weight: 400;
  letter-spacing: 0.04em;
  color: var(--text-muted);
  background: var(--surface-2);
  border: 1px solid var(--border-mid);
  padding: 5px 12px;
  border-radius: var(--radius-xs);
  cursor: default;
  transition: color var(--transition-base), border-color var(--transition-base), background var(--transition-base), transform var(--transition-base);
  animation: tag-in 0.45s ease both;
}
@keyframes tag-in {
  from { opacity: 0; transform: translateY(6px); }
  to   { opacity: 1; transform: translateY(0); }
}
.cloud-tag.active {
  color: var(--text);
  border-color: var(--border-strong);
  background: var(--accent-glow);
  transform: translateY(-2px);
}

@media (max-width: 700px) {
  .about-grid { grid-template-columns: 1fr; gap: 40px; }
  .profile-col { max-width: 210px; }
  .about-stats { flex-wrap: wrap; gap: 24px; }
}
</style>
