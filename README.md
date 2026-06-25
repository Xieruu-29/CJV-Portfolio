# Personal Portfolio — Vite + Vue 3

A clean, dark-mode personal portfolio built with Vite and Vue 3. Ready to deploy on Vercel.

## Quick Start

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Customizing Your Info

All content is in the `<script setup>` blocks of each component. No config files — just edit directly.

| Section | File |
|---|---|
| Hero (name, bio, links) | `src/components/HeroSection.vue` |
| Experience | `src/components/ExperienceSection.vue` |
| Projects | `src/components/ProjectsSection.vue` |
| Skills | `src/components/SkillsSection.vue` |
| Education | `src/components/EducationSection.vue` |
| Certifications | `src/components/CertificationsSection.vue` |
| Testimonials | `src/components/TestimonialsSection.vue` |
| Contact / Footer | `src/components/FooterSection.vue` |

### Things to update
- Replace `John Doe` with your real name (HeroSection, NavBar, FooterSection, index.html title)
- Replace `you@email.com` with your email in FooterSection
- Update all social links (`yourusername`) in HeroSection and FooterSection
- Replace all placeholder content with your real experience, projects, certifications, and testimonials

## Deploying to Vercel

1. Push to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project → Import your repo
3. Framework: **Vite** (auto-detected)
4. Click Deploy — done!

No extra configuration needed.

## Build

```bash
npm run build   # outputs to /dist
npm run preview # preview the production build
```
