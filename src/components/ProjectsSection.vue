<template>
  <section id="projects" class="projects-section" ref="sectionEl">
    <div class="container">
      <span class="section-eyebrow reveal sector-anim">02 — Projects</span>
      <h2 class="section-title reveal">What I've Built</h2>
      <p class="section-subtitle reveal">Team Projects and Solo Projects</p>

      <div class="projects-grid">
        <div v-for="(project, i) in projects" :key="i"
          class="flip-card-wrap reveal"
          :style="{ transitionDelay: i * 80 + 'ms' }">
          <div class="flip-card"
            :class="{ flipped: flipped[i] }"
            @mouseenter="flipped[i] = true"
            @mouseleave="flipped[i] = false"
            @touchstart.prevent="flipped[i] = !flipped[i]">
          <div class="flip-inner">
            <!-- Front -->
            <div class="flip-front">
              <!-- Subtle star cluster BG per card -->
              <div class="card-galaxy" aria-hidden="true">
                <span v-for="n in 12" :key="n" class="card-star"
                  :style="{ top: Math.random() * 100 + '%', left: Math.random() * 100 + '%', opacity: Math.random() * 0.4 + 0.1, width: Math.random() * 2 + 1 + 'px', height: Math.random() * 2 + 1 + 'px' }">
                </span>
              </div>
              <div class="project-top">
                <div class="project-index">{{ String(i + 1).padStart(2, '0') }}</div>
                <div class="project-links">
                  <a v-if="project.live" :href="project.live" target="_blank" rel="noopener noreferrer" class="icon-link" title="Live demo">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/></svg>
                  </a>
                </div>
              </div>
              <h3 class="project-name">{{ project.name }}</h3>
              <p class="project-desc">{{ project.description }}</p>
              <div class="flip-hint">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 2v6h-6M3 12a9 9 0 0115-6.7L21 8M3 22v-6h6M21 12a9 9 0 01-15 6.7L3 16"/></svg>
                Hover to see stack
              </div>
            </div>

            <!-- Back -->
            <div class="flip-back">
              <p class="back-label">Tech Stack</p>
              <div class="stack-list">
                <span v-for="tech in project.stack" :key="tech" class="stack-item">
                  <span class="stack-bullet"></span>{{ tech }}
                </span>
              </div>
              <div class="back-links">
                <a v-if="project.live" :href="project.live" target="_blank" rel="noopener noreferrer" class="back-link">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/></svg>
                  Live Demo
                </a>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const sectionEl = ref(null)
const flipped = ref([false, false, false])

const projects = [
  {
    name: 'Web-Based Patient Information and Clinic Operations System',
    description: 'A secure, full-stack clinic management system developed for Clinica Laguna Multispecialty Center. It replaces manual, paper-based workflows with an automated platform covering patient records, appointment scheduling, billing, inventory tracking, and data-driven analytics.',
    stack: ['HTML', 'CSS', 'JavaScript', 'React', 'Laravel', 'PHP', 'MySQL', 'Railway'],
    github: null,
    live: 'https://clinica-system.vercel.app/',
  },
  {
    name: 'Family Planning Informational System',
    description: 'A frontend awareness platform serving Brgy. Banaybanay that provides the youth and couples with accessible guidance on family planning methods and reproductive health education, promoting informed decision-making through an engaging and user-friendly interface.',
    stack: ['HTML', 'CSS', 'JavaScript', 'React'],
    github: null,
    live: 'https://informational-system-family-plannin.vercel.app/',
  },
  {
    name: 'CCS Comprehensive Profiling System',
    description: 'A full-stack profiling and data management system for the College of Computer Studies. It streamlines the collection, organization, and retrieval of student and faculty information through a structured, role-based platform built for operational efficiency.',
    stack: ['React', 'Laravel', 'PHP', 'MySQL', 'Railway'],
    github: null,
    live: 'https://ccs-comprehensive-profiling-system.vercel.app/login',
  },
]

onMounted(() => {
  const reveals = sectionEl.value?.querySelectorAll('.reveal') || []
  const ro = new IntersectionObserver(
    (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
    { threshold: 0.1 }
  )
  reveals.forEach(el => ro.observe(el))
})
</script>

<style scoped>
.projects-section { background: var(--bg-2); }

.section-title { margin-bottom: 10px; }

.section-subtitle {
  font-family: var(--font-display);
  font-size: 15px;
  font-weight: 500;
  letter-spacing: -0.01em;
  color: var(--text-muted);
  margin-bottom: 44px;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 18px;
}

.flip-card-wrap {
  min-height: 340px;
  height: auto;
}

.flip-card {
  width: 100%;
  height: 100%;
  min-height: 340px;
  perspective: 1200px;
  cursor: pointer;
}

.flip-inner {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 340px;
  transform-style: preserve-3d;
  transition: transform 0.65s cubic-bezier(0.4, 0, 0.2, 1);
}
.flip-card.flipped .flip-inner { transform: rotateY(180deg); }

.flip-front, .flip-back {
  position: absolute;
  inset: 0;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-mid);
  padding: 24px;
  display: flex;
  flex-direction: column;
  transition: border-color var(--transition-base), box-shadow var(--transition-base);
}

.flip-front {
  background: var(--surface);
}

.flip-back {
  transform: rotateY(180deg);
  background: var(--surface-2);
  border-color: var(--border-strong);
}

/* Card stars */
.card-galaxy {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
  border-radius: inherit;
}
.card-star {
  position: absolute;
  border-radius: 50%;
  background: white;
  display: block;
}

.project-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 18px;
  position: relative;
  z-index: 1;
}

.project-index {
  font-family: var(--font-mono);
  font-size: 11px; font-weight: 400;
  letter-spacing: 0.1em;
  color: var(--text-dim);
}

.project-links { display: flex; gap: 10px; }
.icon-link {
  color: var(--text-dim);
  transition: color var(--transition-base);
  pointer-events: all;
  z-index: 10;
  position: relative;
}
.icon-link:hover { color: var(--text); }

.project-name {
  font-family: var(--font-display);
  font-size: 15px; font-weight: 700;
  letter-spacing: -0.02em;
  margin-bottom: 10px; color: var(--text);
  position: relative; z-index: 1;
}

.project-desc {
  font-size: 12.5px; color: var(--text-muted);
  line-height: 1.68; flex: 1;
  position: relative; z-index: 1;
  text-align: justify;
}

.flip-hint {
  display: flex; align-items: center; gap: 6px;
  font-family: var(--font-mono);
  font-size: 9px; font-weight: 400;
  letter-spacing: 0.1em; text-transform: uppercase;
  color: var(--text-dim); margin-top: 14px;
  position: relative; z-index: 1;
}

/* Back side */
.back-label {
  font-family: var(--font-mono);
  font-size: 9px; font-weight: 400;
  letter-spacing: 0.2em; text-transform: uppercase;
  color: var(--text-muted); margin-bottom: 16px;
}

.stack-list {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px 12px;
  flex: 1;
  align-content: start;
}

.stack-item {
  font-family: var(--font-display);
  font-size: 12.5px; font-weight: 500;
  color: var(--text); display: flex; align-items: center; gap: 8px;
}

.stack-bullet {
  width: 4px; height: 4px; border-radius: 50%;
  background: var(--text-muted); flex-shrink: 0;
}

.back-links {
  display: flex; gap: 14px;
  margin-top: 16px; padding-top: 16px;
  border-top: 1px solid var(--border);
}

.back-link {
  display: flex; align-items: center; gap: 6px;
  font-family: var(--font-display);
  font-size: 12px; font-weight: 600;
  color: var(--text-secondary);
  transition: color var(--transition-base);
  pointer-events: all; z-index: 10; position: relative;
}
.back-link:hover { color: var(--text); }
</style>