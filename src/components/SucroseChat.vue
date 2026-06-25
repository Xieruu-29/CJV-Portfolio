<template>
  <!-- Floating trigger button -->
  <button
    class="sucrose-trigger"
    :class="{ open: isOpen, 'has-unread': hasUnread && !isOpen }"
    @click="toggleChat"
    aria-label="Open Sucrose — Portfolio Assistant"
  >
    <!-- Atom icon (closed state) -->
    <span class="trigger-icon trigger-atom" :class="{ visible: !isOpen }">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">
        <circle cx="12" cy="12" r="2.5"/>
        <ellipse cx="12" cy="12" rx="10" ry="3.5" stroke-opacity="0.75"/>
        <ellipse cx="12" cy="12" rx="10" ry="3.5" stroke-opacity="0.75" transform="rotate(60 12 12)"/>
        <ellipse cx="12" cy="12" rx="10" ry="3.5" stroke-opacity="0.75" transform="rotate(120 12 12)"/>
      </svg>
    </span>
    <!-- X icon (open state) -->
    <span class="trigger-icon trigger-close" :class="{ visible: isOpen }">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
        <path d="M18 6 6 18M6 6l12 12"/>
      </svg>
    </span>
    <!-- Unread dot -->
    <span class="unread-dot" v-if="hasUnread && !isOpen"></span>
  </button>

  <!-- Chat panel -->
  <Transition name="sucrose-panel">
    <div class="sucrose-panel" v-if="isOpen" role="dialog" aria-label="Sucrose — Portfolio Assistant">

      <!-- Panel header -->
      <div class="panel-header">
        <div class="panel-avatar">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">
            <circle cx="12" cy="12" r="2.5"/>
            <ellipse cx="12" cy="12" rx="10" ry="3.5" stroke-opacity="0.8"/>
            <ellipse cx="12" cy="12" rx="10" ry="3.5" stroke-opacity="0.8" transform="rotate(60 12 12)"/>
            <ellipse cx="12" cy="12" rx="10" ry="3.5" stroke-opacity="0.8" transform="rotate(120 12 12)"/>
          </svg>
          <span class="panel-avatar-dot"></span>
        </div>
        <div class="panel-meta">
          <div class="panel-name">Sucrose</div>
          <div class="panel-sub">CJV Portfolio Assistant</div>
        </div>
        <button class="panel-close" @click="toggleChat" aria-label="Close chat">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
            <path d="M18 6 6 18M6 6l12 12"/>
          </svg>
        </button>
      </div>

      <!-- Messages -->
      <div class="panel-messages" ref="messagesEl">

        <!-- Welcome message (always visible) -->
        <div class="msg-row bot">
          <div class="msg-bubble bot-bubble">
            <p>Hi there! I'm <strong>Sucrose</strong>, Chris's portfolio assistant. 👋</p>
            <p>Ask me anything about his work, skills, or how to get in touch.</p>
          </div>
        </div>

        <!-- Quick prompts (shown once) -->
        <div class="quick-prompts" v-if="showQuickPrompts">
          <button
            v-for="q in quickPrompts"
            :key="q"
            class="quick-btn"
            @click="sendQuick(q)"
          >{{ q }}</button>
        </div>

        <!-- Dynamic messages -->
        <div
          v-for="(msg, i) in messages"
          :key="i"
          class="msg-row"
          :class="msg.role"
        >
          <div class="msg-bubble" :class="msg.role + '-bubble'">
            <span v-html="renderMarkdown(msg.content)"></span>
          </div>
        </div>

        <!-- Typing indicator -->
        <div class="msg-row bot" v-if="isLoading">
          <div class="typing-bubble">
            <span class="dot"></span>
            <span class="dot"></span>
            <span class="dot"></span>
          </div>
        </div>
      </div>

      <!-- Input area -->
      <div class="panel-input">
        <textarea
          ref="inputEl"
          v-model="inputText"
          class="chat-input"
          placeholder="Ask about Chris…"
          rows="1"
          @keydown="onKeydown"
          @input="autoResize"
        ></textarea>
        <button
          class="send-btn"
          :disabled="!inputText.trim() || isLoading"
          @click="sendMessage"
          aria-label="Send"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
          </svg>
        </button>
      </div>

    </div>
  </Transition>
</template>

<script setup>
import { ref, nextTick } from 'vue'

const isOpen = ref(false)
const hasUnread = ref(true)
const showQuickPrompts = ref(true)
const messages = ref([])
const inputText = ref('')
const isLoading = ref(false)
const messagesEl = ref(null)
const inputEl = ref(null)

const quickPrompts = [
  'Who is Chris?',
  'What projects has he built?',
  'Tech skills?',
  'Certifications?',
  'Is he open to work?',
  'How to contact him?',
]

const SYSTEM_PROMPT = `You are Sucrose, a warm and knowledgeable AI assistant for Chris Jasper Velitario's portfolio. You help employers, recruiters, and collaborators learn about Chris and his work.

Your personality: Friendly, professional, concise. You're enthusiastic about Chris's work but not salesy. You give specific, factual answers grounded in the portfolio data below. If something isn't in the data, say so politely rather than inventing details.

=== PORTFOLIO DATA ===

PERSONAL INFO:
- Full name: Chris Jasper B. Velitario
- Identity: CJV
- Role: Web Developer / IT Support
- Location: Philippines (Cabuyao / Sta. Rosa / Calamba area, Laguna)
- Degree: Bachelor of Science in Information Technology (BSIT), 2026 graduate from Pamantasan ng Cabuyao (University of Cabuyao)
- Open to: Remote, On-Site, and Hybrid work — working globally
- Email: velitariochrisjasper69@gmail.com
- Status: Seeking full-time roles, freelance projects, and collaborations

BIO:
Chris is a BSIT graduate with a deep interest in building things that work beautifully, reliably, and at scale. His stack spans full-stack web development and IT infrastructure. Growing up without the latest tools taught him to be clever and resourceful. He ships clean code, keeps systems stable, and solves problems with whatever's in front of him.

TAGLINE:
"Aspiring Full-Stack Developer building clean, performant digital systems from the frontend to the server room. An IT graduate from the Philippines, driven to make an impact on the global stage."

TECHNICAL SKILLS:
HTML, CSS, JavaScript, React, Laravel, PHP, MySQL, GitHub, IT Support, Network fundamentals

PROJECTS (3 shipped):

1. Web-Based Patient Information and Clinic Operations System
   - Client: Clinica Laguna Multispecialty Center
   - Description: Secure full-stack clinic management system replacing manual workflows — covers patient records, scheduling, billing, inventory, and analytics.
   - Stack: HTML, CSS, JavaScript, React, Laravel, PHP, MySQL, Railway
   - Live: https://clinica-system.vercel.app/

2. Family Planning Informational System
   - Client: Brgy. Banaybanay
   - Description: Frontend awareness platform for family planning and reproductive health education.
   - Stack: HTML, CSS, JavaScript, React
   - Live: https://informational-system-family-plannin.vercel.app/

3. CCS Comprehensive Profiling System
   - Client: College of Computer Studies
   - Description: Full-stack profiling and data management for student and faculty info with role-based access.
   - Stack: React, Laravel, PHP, MySQL, Railway
   - Live: https://ccs-comprehensive-profiling-system.vercel.app/login

CERTIFICATIONS (6 total):
1. Introduction to Cybersecurity — Cisco Networking Academy, Jan 2026
2. Ethical Hacker — Cisco Networking Academy, Apr 2026
3. JavaScript Essentials 1 — Cisco Networking Academy, Apr 2026
4. Networking Basics — Cisco Networking Academy, Apr 2026
5. Google Analytics Certification — Google, Apr 2026
6. HubSpot Data Integrations Certified — HubSpot Academy, Apr 2026

SOCIAL / LINKS:
- GitHub: https://github.com/Xieruu-29
- LinkedIn: https://www.linkedin.com/in/velitario-chris-jasper-28033a3a1/
- Facebook: https://www.facebook.com/jasper.velitario.7
- Credly: https://www.credly.com/users/chris-jasper-velitario

PORTFOLIO TECH: Built with Vue.js and Vite.

=== END DATA ===

INSTRUCTIONS:
- Answer based on the data above only.
- Be concise. Use short paragraphs or bullet points.
- Share links naturally when relevant.
- For salary/HR questions, direct them to contact Chris via email.
- Never invent details not listed above.
- Keep responses under 160 words unless a detailed breakdown is needed.
- Use **bold** for emphasis. Use bullet points when listing things.`

function toggleChat() {
  isOpen.value = !isOpen.value
  if (isOpen.value) {
    hasUnread.value = false
    nextTick(() => {
      inputEl.value?.focus()
      scrollToBottom()
    })
  }
}

function scrollToBottom() {
  nextTick(() => {
    if (messagesEl.value) {
      messagesEl.value.scrollTop = messagesEl.value.scrollHeight
    }
  })
}

function autoResize(e) {
  const el = e.target
  el.style.height = 'auto'
  el.style.height = Math.min(el.scrollHeight, 100) + 'px'
}

function onKeydown(e) {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault()
    sendMessage()
  }
}

function sendQuick(text) {
  showQuickPrompts.value = false
  inputText.value = text
  sendMessage()
}

function renderMarkdown(text) {
  return text
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/\[([^\]]+)\]\((https?:\/\/[^\)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
    .replace(/(https?:\/\/[^\s<]+)/g, '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>')
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/(<li>[\s\S]*?<\/li>)/g, (m) => `<ul>${m}</ul>`)
    .split('\n\n').map(p => {
      p = p.trim()
      if (!p) return ''
      if (p.startsWith('<ul>')) return p
      return `<p>${p.replace(/\n/g, '<br>')}</p>`
    }).join('')
}

async function sendMessage() {
  const text = inputText.value.trim()
  if (!text || isLoading.value) return

  showQuickPrompts.value = false
  inputText.value = ''
  if (inputEl.value) {
    inputEl.value.style.height = 'auto'
  }

  messages.value.push({ role: 'user', content: text })
  scrollToBottom()
  isLoading.value = true

  const history = messages.value.map(m => ({
    role: m.role === 'user' ? 'user' : 'assistant',
    content: m.content
  }))

  try {
    // ✅ FIXED: calls your own Vercel proxy instead of Anthropic directly
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        system: SYSTEM_PROMPT,
        messages: history
      })
    })

    if (!res.ok) {
      const err = await res.json().catch(() => ({}))
      throw new Error(err.error?.message || `Error ${res.status}`)
    }

    const data = await res.json()
    const reply = data.content.filter(b => b.type === 'text').map(b => b.text).join('')
    messages.value.push({ role: 'assistant', content: reply })

  } catch (e) {
    messages.value.push({
      role: 'assistant',
      content: "Sorry, I couldn't connect right now. Please try again or reach Chris directly at **velitariochrisjasper69@gmail.com**."
    })
  } finally {
    isLoading.value = false
    scrollToBottom()
    nextTick(() => inputEl.value?.focus())
  }
}
</script>

<style scoped>
/* ── Trigger button ── */
.sucrose-trigger {
  position: fixed;
  bottom: 28px;
  right: 28px;
  z-index: 999;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: var(--surface-2);
  border: 1px solid var(--border-mid);
  color: var(--text);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--shadow-lg);
  transition: transform 0.22s cubic-bezier(0.34, 1.56, 0.64, 1),
              border-color var(--transition-base),
              background var(--transition-base),
              box-shadow var(--transition-base);
}

.sucrose-trigger:hover {
  border-color: var(--border-strong);
  background: var(--surface-3);
  box-shadow: var(--shadow-lg), 0 0 24px rgba(255,255,255,0.08);
  transform: scale(1.06);
}

.sucrose-trigger.open {
  background: var(--surface-3);
  border-color: var(--border-strong);
}

/* Icon transitions */
.trigger-icon {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transform: scale(0.7) rotate(-20deg);
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.trigger-icon.visible {
  opacity: 1;
  transform: scale(1) rotate(0deg);
}

/* Unread dot */
.unread-dot {
  position: absolute;
  top: 6px;
  right: 6px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #ffffff;
  border: 2px solid var(--bg);
  animation: dot-pulse 2.4s ease-in-out infinite;
}

@keyframes dot-pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(0.85); }
}

/* ── Chat panel ── */
.sucrose-panel {
  position: fixed;
  bottom: 96px;
  right: 28px;
  z-index: 998;
  width: 360px;
  max-height: 540px;
  display: flex;
  flex-direction: column;
  background: var(--surface);
  border: 1px solid var(--border-mid);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg), 0 0 60px rgba(0,0,0,0.6);
  overflow: hidden;
}

/* Panel transition */
.sucrose-panel-enter-active {
  transition: opacity 0.25s ease, transform 0.28s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.sucrose-panel-leave-active {
  transition: opacity 0.18s ease, transform 0.18s ease;
}
.sucrose-panel-enter-from,
.sucrose-panel-leave-to {
  opacity: 0;
  transform: translateY(16px) scale(0.96);
}

/* ── Header ── */
.panel-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  border-bottom: 1px solid var(--border);
  flex-shrink: 0;
}

.panel-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: var(--surface-2);
  border: 1px solid var(--border-mid);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-secondary);
  flex-shrink: 0;
  position: relative;
}

.panel-avatar-dot {
  position: absolute;
  bottom: 0; right: 0;
  width: 9px; height: 9px;
  border-radius: 50%;
  background: #4ade80;
  border: 2px solid var(--surface);
}

.panel-meta { flex: 1; }

.panel-name {
  font-family: var(--font-display);
  font-size: 13px;
  font-weight: 700;
  color: var(--text);
  letter-spacing: -0.01em;
}

.panel-sub {
  font-family: var(--font-mono);
  font-size: 9px;
  color: var(--text-dim);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-top: 2px;
}

.panel-close {
  width: 28px;
  height: 28px;
  border-radius: var(--radius-sm);
  background: transparent;
  border: 1px solid transparent;
  color: var(--text-dim);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color var(--transition-base), border-color var(--transition-base), background var(--transition-base);
}

.panel-close:hover {
  color: var(--text);
  border-color: var(--border-mid);
  background: var(--accent-glow);
}

/* ── Messages ── */
.panel-messages {
  flex: 1;
  overflow-y: auto;
  padding: 14px 14px 8px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  scroll-behavior: smooth;
}

.panel-messages::-webkit-scrollbar { width: 3px; }
.panel-messages::-webkit-scrollbar-thumb { background: var(--border-mid); border-radius: 3px; }

/* ── Bubbles ── */
.msg-row {
  display: flex;
  animation: msg-in 0.22s ease;
}

@keyframes msg-in {
  from { opacity: 0; transform: translateY(6px); }
  to { opacity: 1; transform: translateY(0); }
}

.msg-row.user { justify-content: flex-end; }
.msg-row.bot  { justify-content: flex-start; }

.msg-bubble {
  max-width: 88%;
  padding: 9px 12px;
  border-radius: var(--radius-md);
  font-size: 13px;
  line-height: 1.65;
}

.bot-bubble {
  background: var(--surface-2);
  border: 1px solid var(--border);
  color: var(--text);
  border-bottom-left-radius: 4px;
}

.user-bubble {
  background: var(--accent-glow-strong);
  border: 1px solid var(--border-mid);
  color: var(--text);
  border-bottom-right-radius: 4px;
}

.msg-bubble :deep(p) { margin-bottom: 7px; }
.msg-bubble :deep(p:last-child) { margin-bottom: 0; }
.msg-bubble :deep(strong) { color: var(--text); font-weight: 600; }
.msg-bubble :deep(em) { color: var(--text-secondary); font-style: normal; }
.msg-bubble :deep(ul) { padding-left: 16px; margin: 6px 0; }
.msg-bubble :deep(li) { margin-bottom: 4px; color: var(--text-muted); }
.msg-bubble :deep(li)::marker { color: var(--text-secondary); }
.msg-bubble :deep(a) {
  color: var(--text-secondary);
  text-decoration: underline;
  text-underline-offset: 3px;
  transition: color var(--transition-base);
}
.msg-bubble :deep(a):hover { color: var(--text); }

/* ── Quick prompts ── */
.quick-prompts {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  padding: 2px 0 4px;
}

.quick-btn {
  font-family: var(--font-mono);
  font-size: 9.5px;
  letter-spacing: 0.03em;
  color: var(--text-dim);
  background: var(--surface-2);
  border: 1px solid var(--border);
  padding: 5px 10px;
  border-radius: var(--radius-full);
  cursor: pointer;
  transition: color var(--transition-base),
              border-color var(--transition-base),
              background var(--transition-base);
}

.quick-btn:hover {
  color: var(--text);
  border-color: var(--border-strong);
  background: var(--accent-glow);
}

/* ── Typing indicator ── */
.typing-bubble {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 10px 14px;
  background: var(--surface-2);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  border-bottom-left-radius: 4px;
  width: fit-content;
}

.dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--text-dim);
  animation: dot-bounce 1.3s ease-in-out infinite;
}

.dot:nth-child(2) { animation-delay: 0.16s; }
.dot:nth-child(3) { animation-delay: 0.32s; }

@keyframes dot-bounce {
  0%, 80%, 100% { opacity: 0.2; transform: scale(0.8); }
  40% { opacity: 0.8; transform: scale(1); }
}

/* ── Input ── */
.panel-input {
  display: flex;
  align-items: flex-end;
  gap: 8px;
  padding: 10px 12px;
  border-top: 1px solid var(--border);
  flex-shrink: 0;
}

.chat-input {
  flex: 1;
  background: var(--surface-2);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  color: var(--text);
  font-family: var(--font-display);
  font-size: 12.5px;
  padding: 8px 10px;
  resize: none;
  outline: none;
  line-height: 1.55;
  min-height: 36px;
  max-height: 100px;
  overflow-y: auto;
  transition: border-color var(--transition-base);
}

.chat-input::placeholder { color: var(--text-dim); }
.chat-input:focus { border-color: var(--border-strong); }
.chat-input::-webkit-scrollbar { width: 3px; }
.chat-input::-webkit-scrollbar-thumb { background: var(--border-mid); border-radius: 3px; }

.send-btn {
  width: 34px;
  height: 34px;
  border-radius: var(--radius-sm);
  background: var(--text);
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--bg);
  flex-shrink: 0;
  transition: opacity var(--transition-base), transform var(--transition-base);
}

.send-btn:hover:not(:disabled) {
  opacity: 0.85;
  transform: scale(1.05);
}

.send-btn:disabled {
  opacity: 0.22;
  cursor: not-allowed;
  transform: none;
}

/* ── Responsive ── */
@media (max-width: 480px) {
  .sucrose-panel {
    right: 12px;
    bottom: 84px;
    width: calc(100vw - 24px);
    max-height: 480px;
  }

  .sucrose-trigger {
    right: 16px;
    bottom: 20px;
  }
}
</style>