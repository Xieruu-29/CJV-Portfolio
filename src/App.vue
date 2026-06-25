<template>
  <NavBar />
  <main>
    <HeroSection />
    <div class="divider"></div>
    <AboutSection />
    <div class="divider"></div>
    <ProjectsSection />
    <div class="divider"></div>
    <CertificationsSection />
  </main>
  <FooterSection />

  <!-- Sucrose — floating portfolio assistant -->
  <SucroseChat />
</template>

<script setup>
import NavBar            from './components/NavBar.vue'
import HeroSection       from './components/HeroSection.vue'
import AboutSection      from './components/AboutSection.vue'
import ProjectsSection   from './components/ProjectsSection.vue'
import CertificationsSection from './components/CertificationsSection.vue'
import FooterSection     from './components/FooterSection.vue'
import SucroseChat       from './components/SucroseChat.vue'
</script>