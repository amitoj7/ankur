import cors from 'cors'
import express from 'express'
import morgan from 'morgan'
import { randomUUID } from 'node:crypto'
import { existsSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const PORT = Number(process.env.PORT || 8787)
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const clientDistPath = path.resolve(__dirname, '../dist')
const clientIndexPath = path.join(clientDistPath, 'index.html')

const domains = [
  { id: 'physical', label: 'Physical', short: 'Motor' },
  { id: 'socio', label: 'Socio-Emotional & Ethical', short: 'Social' },
  { id: 'cognitive', label: 'Cognitive', short: 'Cognitive' },
  { id: 'language', label: 'Language & Literacy', short: 'Language' },
  { id: 'aesthetic', label: 'Aesthetic & Cultural', short: 'Culture' },
  { id: 'habits', label: 'Positive Learning Habits', short: 'Habits' },
]

const children = [
  {
    id: 'asha',
    name: 'Asha',
    age: '4y 2m',
    caregiver: 'Sunita Devi',
    homeLanguage: 'Hindi',
    risk: 'Watch',
    primaryGap: 'Expressive language',
    readiness: 64,
    attendance: 92,
    lastSeen: 'Today',
    domains: { physical: 78, socio: 72, cognitive: 62, language: 48, aesthetic: 66, habits: 54 },
    observations: [
      {
        id: 'obs-asha-1',
        at: 'Today',
        text: 'Repeated two words during story circle, then pointed instead of completing the sentence.',
        domains: ['language', 'socio'],
      },
      {
        id: 'obs-asha-2',
        at: 'Yesterday',
        text: 'Sorted red and yellow blocks with peer support.',
        domains: ['cognitive', 'habits'],
      },
    ],
  },
  {
    id: 'rohan',
    name: 'Rohan',
    age: '5y 1m',
    caregiver: 'Kavita',
    homeLanguage: 'Marathi',
    risk: 'Low',
    primaryGap: 'Fine motor practice',
    readiness: 76,
    attendance: 88,
    lastSeen: 'Today',
    domains: { physical: 58, socio: 84, cognitive: 70, language: 74, aesthetic: 69, habits: 71 },
    observations: [
      {
        id: 'obs-rohan-1',
        at: 'Today',
        text: 'Shared lunch with a younger child but struggled to hold his crayon steadily.',
        domains: ['socio', 'physical'],
      },
    ],
  },
  {
    id: 'priya',
    name: 'Priya',
    age: '3y 8m',
    caregiver: 'Rekha',
    homeLanguage: 'Bengali',
    risk: 'Review',
    primaryGap: 'Language unobserved',
    readiness: 52,
    attendance: 79,
    lastSeen: '2 days ago',
    domains: { physical: 64, socio: 57, cognitive: 59, language: 38, aesthetic: 61, habits: 48 },
    observations: [
      {
        id: 'obs-priya-1',
        at: 'May 31',
        text: 'Stayed near the worker during group rhyme and did not respond to name twice.',
        domains: ['language', 'socio'],
      },
    ],
  },
]

let syncQueue = 23
const nudgeLog = []

const keywordMap = {
  physical: [
    'crayon',
    'hold',
    'jump',
    'walk',
    'motor',
    'grip',
    'clay',
    'blocks',
    'दौड़',
    'पकड़',
    'पेन्सिल',
    'कूद',
  ],
  socio: ['share', 'shared', 'turn', 'friend', 'peer', 'lunch', 'cry', 'comfort', 'emotion', 'साझा', 'दोस्त', 'रोया'],
  cognitive: ['count', 'sort', 'match', 'number', 'shape', 'solve', 'remember', 'classify', 'गिन', 'मिलान', 'रंग'],
  language: ['word', 'sentence', 'story', 'rhyme', 'name', 'speak', 'repeat', 'listen', 'letter', 'कहानी', 'शब्द', 'वाक्य', 'नाम'],
  aesthetic: ['song', 'draw', 'dance', 'clay', 'music', 'festival', 'colour', 'rangoli', 'गीत', 'चित्र', 'रंगोली'],
  habits: ['focus', 'finish', 'wait', 'try', 'routine', 'clean', 'attention', 'complete', 'ध्यान', 'पूरा', 'इंतजार'],
}

const activityByDomain = {
  physical: {
    title: 'Crayon Garden Lines',
    duration: '8 minutes',
    steps: ['Draw three standing lines as stems.', 'Add one round flower on each stem.', 'Ask the child to trace slowly once more.'],
  },
  socio: {
    title: 'Turn-Taking Snack Circle',
    duration: '10 minutes',
    steps: ['Give each child one object to pass.', 'Name the friend receiving it.', 'Praise waiting, sharing, and gentle hands.'],
  },
  cognitive: {
    title: 'Kitchen Count Match',
    duration: '7 minutes',
    steps: ['Place five familiar objects.', 'Ask the child to count aloud.', 'Match each object with one drawn dot.'],
  },
  language: {
    title: 'Two-Word Treasure Hunt',
    duration: '10 minutes',
    steps: ['Find a familiar object.', 'Say two words together, such as red cup.', 'Repeat with three objects and celebrate attempts.'],
  },
  aesthetic: {
    title: 'Festival Pattern Tray',
    duration: '12 minutes',
    steps: ['Create a simple leaf or rangoli pattern.', 'Ask the child to copy one part.', 'Let the child name a colour or shape.'],
  },
  habits: {
    title: 'Finish-One-Thing Mat',
    duration: '6 minutes',
    steps: ['Place one small task on a mat.', 'Use a start and done signal.', 'Let the child mark completion with a sticker.'],
  },
}

const caregiverMessages = {
  en: 'Today, practice {activity}. Use objects already at home and praise every attempt.',
  hi: 'आज {activity} करें। घर की चीज़ों से खेलें और हर कोशिश की तारीफ करें।',
  mr: 'आज {activity} करा. घरातील वस्तू वापरा आणि प्रत्येक प्रयत्नाचे कौतुक करा.',
  ta: 'இன்று {activity} பயிற்சி செய்யுங்கள். வீட்டிலுள்ள பொருட்களை பயன்படுத்தி ஒவ்வொரு முயற்சியையும் பாராட்டுங்கள்.',
  bn: 'আজ {activity} অনুশীলন করুন। ঘরের জিনিস ব্যবহার করুন এবং প্রতিটি চেষ্টার প্রশংসা করুন।',
  te: 'ఈ రోజు {activity} చేయండి. ఇంట్లో ఉన్న వస్తువులు వాడి ప్రతి ప్రయత్నాన్ని ప్రశంసించండి.',
}

const modelStack = [
  { model: 'Whisper.cpp', job: 'Offline speech-to-text', ram: '<1GB', offline: true },
  { model: 'AI4Bharat IndicASR', job: 'Regional dialect recognition', ram: '<1GB', offline: true },
  { model: 'Gemma 2B 4-bit', job: 'Six-domain classifier and concern flags', ram: '<2GB', offline: true },
  { model: 'MobileNetV3 TFLite', job: 'On-device artifact/photo signals', ram: '<10MB', offline: true },
  { model: 'Llama 3.2 3B LoRA', job: 'Activity recommendations', ram: '<3GB', offline: true },
  { model: 'IndicTrans2', job: '22-language caregiver output', ram: '<2GB', offline: true },
]

const connectivityTiers = [
  { id: '4g', label: '4G / WiFi', detail: 'Full sync and supervisor portal' },
  { id: '2g', label: '2G burst', detail: 'Background delta sync only' },
  { id: 'whatsapp', label: 'WhatsApp only', detail: 'Caregiver bridge without app install' },
  { id: 'bluetooth', label: 'Bluetooth mesh', detail: 'Worker-to-worker peer sync' },
  { id: 'ussd', label: 'USSD *987#', detail: 'Feature phone fallback' },
]

function clone(value) {
  return JSON.parse(JSON.stringify(value))
}

function scoreText(text) {
  const normalized = String(text || '').toLowerCase()
  const scores = Object.fromEntries(domains.map((domain) => [domain.id, 0]))

  for (const [domain, keywords] of Object.entries(keywordMap)) {
    for (const keyword of keywords) {
      if (normalized.includes(keyword.toLowerCase())) {
        scores[domain] += 1
      }
    }
  }

  if (!Object.values(scores).some(Boolean)) {
    scores.language = 1
    scores.habits = 1
  }

  return scores
}

function classifyObservation({ text, child, locale = 'en', mode = 'voice' }) {
  const scores = scoreText(text)
  const sorted = Object.entries(scores)
    .filter(([, score]) => score > 0)
    .sort((a, b) => b[1] - a[1])

  const primaryDomain = sorted[0][0]
  const secondaryDomain = sorted[1]?.[0] || (primaryDomain === 'language' ? 'socio' : 'language')
  const domainAverage = Object.values(child.domains).reduce((sum, value) => sum + value, 0) / domains.length
  const childDomainScore = child.domains[primaryDomain]
  const confidence = Math.min(0.94, 0.72 + sorted[0][1] * 0.07 + (mode === 'voice' ? 0.03 : 0))
  const concernLevel = childDomainScore < 50 ? 'Review' : childDomainScore < 62 ? 'Watch' : 'None'
  const activity = activityByDomain[primaryDomain]
  const domainLabel = domains.find((domain) => domain.id === primaryDomain)?.label || primaryDomain

  return {
    id: randomUUID(),
    childId: child.id,
    transcript: text,
    inputMode: mode,
    primaryDomain,
    confidence,
    schoolReadinessSignal: Math.round((domainAverage * 0.7 + child.attendance * 0.3) * 10) / 10,
    tags: [
      { domainId: primaryDomain, label: domainLabel, confidence },
      {
        domainId: secondaryDomain,
        label: domains.find((domain) => domain.id === secondaryDomain)?.label || secondaryDomain,
        confidence: Math.max(0.58, confidence - 0.12),
      },
    ],
    concern: {
      level: concernLevel,
      explanation:
        concernLevel === 'None'
          ? 'No escalation needed. Continue observing this signal during routine play.'
          : `${child.name}'s ${domainLabel.toLowerCase()} score is ${childDomainScore}%, so ANKUR asks for human review before escalation.`,
    },
    activity,
    caregiverMessage: (caregiverMessages[locale] || caregiverMessages.en).replace('{activity}', activity.title),
    modelTrace: [
      'Audio kept local as an Opus packet',
      'Transcript classified on-device',
      'Confidence score exposed for human review',
      'Only metadata joins sync queue',
    ],
  }
}

function updateChildProfile(child, analysis) {
  const nextDomains = { ...child.domains }
  for (const tag of analysis.tags) {
    nextDomains[tag.domainId] = Math.min(96, nextDomains[tag.domainId] + (tag.domainId === analysis.primaryDomain ? 3 : 1))
  }

  const readiness = Math.round(Object.values(nextDomains).reduce((sum, value) => sum + value, 0) / domains.length)
  const lowestDomain = Object.entries(nextDomains).sort((a, b) => a[1] - b[1])[0]
  const risk = lowestDomain[1] < 45 ? 'Review' : lowestDomain[1] < 60 ? 'Watch' : 'Low'

  return {
    ...child,
    domains: nextDomains,
    readiness,
    risk,
    primaryGap: domains.find((domain) => domain.id === lowestDomain[0])?.label || child.primaryGap,
    lastSeen: 'Just now',
    observations: [
      {
        id: analysis.id,
        at: 'Just now',
        text: analysis.transcript,
        domains: analysis.tags.map((tag) => tag.domainId),
      },
      ...child.observations,
    ].slice(0, 5),
  }
}

const app = express()

app.use(cors())
app.use(express.json({ limit: '1mb' }))
app.use(morgan('tiny'))

app.get('/api/health', (req, res) => {
  res.json({ ok: true, service: 'ankur-api', syncQueue })
})

app.get('/api/bootstrap', (req, res) => {
  res.json({
    generatedAt: new Date().toISOString(),
    domains,
    children: clone(children),
    syncQueue,
    stats: {
      centres: '14 lakh',
      children: '8 crore',
      paperRegisters: '5+',
      referralDropoff: '70%',
      feedbackTools: '₹0',
      pilotChildren: '~1,250',
    },
    modelStack,
    connectivityTiers,
    supervisor: {
      block: 'Rampur block',
      flaggedThisWeek: 3,
      awcCoverage: 91,
      syncGaps: 3,
      referralsOpen: 24,
    },
    districtBlocks: [
      { id: 'rampur', name: 'Rampur', risk: 72, coverage: 91 },
      { id: 'narela', name: 'Narela', risk: 64, coverage: 83 },
      { id: 'sevapur', name: 'Sevapur', risk: 49, coverage: 94 },
      { id: 'banshi', name: 'Banshi', risk: 57, coverage: 87 },
      { id: 'kotra', name: 'Kotra', risk: 39, coverage: 78 },
    ],
  })
})

app.post('/api/observations/classify', (req, res, next) => {
  try {
    const { childId, text, locale, mode } = req.body || {}
    const childIndex = children.findIndex((child) => child.id === childId)

    if (childIndex < 0) {
      res.status(404).json({ error: 'Child not found' })
      return
    }

    if (!text || String(text).trim().length < 8) {
      res.status(400).json({ error: 'Observation text is too short' })
      return
    }

    const analysis = classifyObservation({ text: String(text).trim(), child: children[childIndex], locale, mode })
    children[childIndex] = updateChildProfile(children[childIndex], analysis)
    syncQueue += 1

    res.json({
      analysis,
      child: clone(children[childIndex]),
      syncQueue,
    })
  } catch (error) {
    next(error)
  }
})

app.post('/api/recommendations/nudge', (req, res, next) => {
  try {
    const { childId, activityTitle, locale = 'en' } = req.body || {}
    const child = children.find((item) => item.id === childId)

    if (!child) {
      res.status(404).json({ error: 'Child not found' })
      return
    }

    const message = (caregiverMessages[locale] || caregiverMessages.en).replace('{activity}', activityTitle || 'today\'s activity')
    const nudge = {
      id: randomUUID(),
      childId,
      caregiver: child.caregiver,
      channel: 'WhatsApp, with IVR fallback',
      fallback: 'USSD *987# summary available',
      message,
      status: 'queued_for_next_sync',
      createdAt: new Date().toISOString(),
    }

    nudgeLog.unshift(nudge)
    syncQueue += 1

    res.json({ nudge, syncQueue, recentNudges: nudgeLog.slice(0, 5) })
  } catch (error) {
    next(error)
  }
})

app.post('/api/sync', (req, res) => {
  const synced = syncQueue
  syncQueue = 0
  res.json({
    synced,
    syncQueue,
    transport: '2G delta packet',
    detail: 'Observation metadata, caregiver nudge status, and supervisor review events synced.',
  })
})

if (existsSync(clientIndexPath)) {
  app.use(express.static(clientDistPath))

  app.get(/^(?!\/api\/).*/, (req, res) => {
    res.sendFile(clientIndexPath)
  })
} else {
  app.get('/', (req, res) => {
    res.status(200).json({
      service: 'ankur-api',
      status: 'frontend build missing',
      fix: 'Run npm run build before npm start, or use npm start to build and serve in production.',
    })
  })
}

app.use((req, res) => {
  res.status(404).json({ error: 'Not found' })
})

app.use((error, req, res, next) => {
  if (res.headersSent) {
    next(error)
    return
  }

  res.status(500).json({ error: 'ANKUR API error', detail: error.message })
})

const server = app.listen(PORT, () => {
  console.log(`ANKUR API listening on http://localhost:${PORT}`)
})

server.on('error', (error) => {
  console.error('ANKUR API failed to start:', error)
  process.exitCode = 1
})
