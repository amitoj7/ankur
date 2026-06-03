import { useEffect, useMemo, useState } from 'react'
import {
  Accessibility,
  Activity,
  AlertTriangle,
  ArrowRight,
  BarChart3,
  Bell,
  Bluetooth,
  Brain,
  Camera,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  Database,
  Eye,
  FileText,
  HeartHandshake,
  Home,
  Languages,
  Lock,
  Map,
  MessageCircle,
  Mic,
  Network,
  Phone,
  QrCode,
  Search,
  Send,
  Settings,
  ShieldCheck,
  SlidersHorizontal,
  Smartphone,
  Sparkles,
  Users,
  Volume2,
  Wifi,
  WifiOff,
} from 'lucide-react'
import './App.css'

const domains = [
  { id: 'physical', label: 'Physical', short: 'Motor', tone: 'mint' },
  { id: 'socio', label: 'Socio-Emotional & Ethical', short: 'Social', tone: 'rose' },
  { id: 'cognitive', label: 'Cognitive', short: 'Cognitive', tone: 'blue' },
  { id: 'language', label: 'Language & Literacy', short: 'Language', tone: 'amber' },
  { id: 'aesthetic', label: 'Aesthetic & Cultural', short: 'Culture', tone: 'violet' },
  { id: 'habits', label: 'Positive Learning Habits', short: 'Habits', tone: 'green' },
]

const localDomainNames = {
  hi: {
    physical: 'शारीरिक',
    socio: 'सामाजिक-भावनात्मक',
    cognitive: 'संज्ञानात्मक',
    language: 'भाषा और साक्षरता',
    aesthetic: 'सौंदर्य और संस्कृति',
    habits: 'सीखने की आदतें',
  },
  mr: {
    physical: 'शारीरिक',
    socio: 'सामाजिक-भावनिक',
    cognitive: 'संज्ञानात्मक',
    language: 'भाषा आणि साक्षरता',
    aesthetic: 'सौंदर्य आणि संस्कृती',
    habits: 'शिकण्याच्या सवयी',
  },
  ta: {
    physical: 'உடல்',
    socio: 'சமூக-உணர்ச்சி',
    cognitive: 'அறிவாற்றல்',
    language: 'மொழி மற்றும் எழுத்தறிவு',
    aesthetic: 'அழகியல் மற்றும் கலாச்சாரம்',
    habits: 'கற்றல் பழக்கங்கள்',
  },
  bn: {
    physical: 'শারীরিক',
    socio: 'সামাজিক-আবেগিক',
    cognitive: 'জ্ঞানীয়',
    language: 'ভাষা ও সাক্ষরতা',
    aesthetic: 'নান্দনিক ও সাংস্কৃতিক',
    habits: 'শেখার অভ্যাস',
  },
  te: {
    physical: 'శారీరక',
    socio: 'సామాజిక-భావోద్వేగ',
    cognitive: 'జ్ఞానాత్మక',
    language: 'భాష మరియు అక్షరాస్యత',
    aesthetic: 'సౌందర్య మరియు సాంస్కృతిక',
    habits: 'సానుకూల అభ్యాస అలవాట్లు',
  },
}

const languages = [
  { id: 'en', label: 'English', native: 'English' },
  { id: 'hi', label: 'Hindi', native: 'हिन्दी' },
  { id: 'mr', label: 'Marathi', native: 'मराठी' },
  { id: 'ta', label: 'Tamil', native: 'தமிழ்' },
  { id: 'bn', label: 'Bengali', native: 'বাংলা' },
  { id: 'te', label: 'Telugu', native: 'తెలుగు' },
]

const copy = {
  en: {
    brand: 'ANKUR',
    brandLocal: 'अंकुर',
    tagline: 'Every child deserves to be seen before they fall behind.',
    worker: 'Worker Console',
    observe: 'Observation Studio',
    profile: 'Child Profile',
    caregiver: 'Caregiver Bridge',
    supervisor: 'Supervisor Portal',
    district: 'District Command',
    ai: 'AI Methodology',
    settings: 'Access & Settings',
    smartFocus: "Today's Smart Focus",
    runAi: 'Run AI Review',
    approveNudge: 'Approve & Send Nudge',
    syncNow: 'Sync Now',
    language: 'Language',
    accessibility: 'Accessibility',
    privacy: 'Privacy',
  },
  hi: {
    brand: 'अंकुर',
    brandLocal: 'ANKUR',
    tagline: 'हर बच्चा पीछे छूटने से पहले देखा जाए।',
    worker: 'कार्यकर्ता कंसोल',
    observe: 'अवलोकन स्टूडियो',
    profile: 'बच्चे की प्रोफाइल',
    caregiver: 'अभिभावक संदेश',
    supervisor: 'सुपरवाइजर पोर्टल',
    district: 'जिला कमांड',
    ai: 'एआई पद्धति',
    settings: 'पहुंच और सेटिंग्स',
    smartFocus: 'आज का स्मार्ट फोकस',
    runAi: 'एआई समीक्षा चलाएं',
    approveNudge: 'स्वीकृत कर संदेश भेजें',
    syncNow: 'सिंक करें',
    language: 'भाषा',
    accessibility: 'सुलभता',
    privacy: 'गोपनीयता',
  },
  mr: {
    brand: 'अंकुर',
    brandLocal: 'ANKUR',
    tagline: 'प्रत्येक मूल मागे पडण्यापूर्वी दिसले पाहिजे.',
    worker: 'कार्यकर्ता कन्सोल',
    observe: 'निरीक्षण स्टुडिओ',
    profile: 'मुलाची प्रोफाइल',
    caregiver: 'पालक संदेश',
    supervisor: 'पर्यवेक्षक पोर्टल',
    district: 'जिल्हा कमांड',
    ai: 'एआय पद्धत',
    settings: 'प्रवेश आणि सेटिंग्ज',
    smartFocus: 'आजचा स्मार्ट फोकस',
    runAi: 'एआय समीक्षा',
    approveNudge: 'मंजूर करून संदेश पाठवा',
    syncNow: 'सिंक करा',
    language: 'भाषा',
    accessibility: 'सुलभता',
    privacy: 'गोपनीयता',
  },
  ta: {
    brand: 'அங்குர்',
    brandLocal: 'ANKUR',
    tagline: 'ஒவ்வொரு குழந்தையும் பின்னால் விடப்படுவதற்கு முன் கவனிக்கப்பட வேண்டும்.',
    worker: 'பணியாளர் கன்சோல்',
    observe: 'கண்காணிப்பு ஸ்டூடியோ',
    profile: 'குழந்தை சுயவிவரம்',
    caregiver: 'பராமரிப்பாளர் செய்தி',
    supervisor: 'மேற்பார்வையாளர் போர்டல்',
    district: 'மாவட்ட கட்டளை',
    ai: 'AI முறை',
    settings: 'அணுகல் மற்றும் அமைப்புகள்',
    smartFocus: 'இன்றைய கவனம்',
    runAi: 'AI மதிப்பாய்வு',
    approveNudge: 'ஒப்புதல் மற்றும் செய்தி',
    syncNow: 'ஒத்திசை',
    language: 'மொழி',
    accessibility: 'அணுகல்',
    privacy: 'தனியுரிமை',
  },
  bn: {
    brand: 'অঙ্কুর',
    brandLocal: 'ANKUR',
    tagline: 'প্রতিটি শিশু পিছিয়ে পড়ার আগে তাকে দেখা দরকার।',
    worker: 'কর্মী কনসোল',
    observe: 'পর্যবেক্ষণ স্টুডিও',
    profile: 'শিশুর প্রোফাইল',
    caregiver: 'অভিভাবক বার্তা',
    supervisor: 'সুপারভাইজার পোর্টাল',
    district: 'জেলা কমান্ড',
    ai: 'AI পদ্ধতি',
    settings: 'অ্যাক্সেস ও সেটিংস',
    smartFocus: 'আজকের স্মার্ট ফোকাস',
    runAi: 'AI পর্যালোচনা',
    approveNudge: 'অনুমোদন ও বার্তা',
    syncNow: 'সিঙ্ক করুন',
    language: 'ভাষা',
    accessibility: 'অ্যাক্সেসিবিলিটি',
    privacy: 'গোপনীয়তা',
  },
  te: {
    brand: 'అంకుర్',
    brandLocal: 'ANKUR',
    tagline: 'ప్రతి పిల్లవాడు వెనుకబడే ముందు గమనించబడాలి.',
    worker: 'వర్కర్ కన్సోల్',
    observe: 'పరిశీలన స్టూడియో',
    profile: 'పిల్ల ప్రొఫైల్',
    caregiver: 'కేర్ గివర్ సందేశం',
    supervisor: 'సూపర్వైజర్ పోర్టల్',
    district: 'జిల్లా కమాండ్',
    ai: 'AI విధానం',
    settings: 'యాక్సెస్ & సెట్టింగులు',
    smartFocus: 'ఈరోజు స్మార్ట్ ఫోకస్',
    runAi: 'AI సమీక్ష',
    approveNudge: 'ఆమోదించి పంపండి',
    syncNow: 'సింక్ చేయండి',
    language: 'భాష',
    accessibility: 'అందుబాటు',
    privacy: 'గోప్యత',
  },
}

const defaultChildren = [
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
      { id: 'a1', at: 'Today', text: 'Repeated two words during story circle.', domains: ['language', 'socio'] },
      { id: 'a2', at: 'Yesterday', text: 'Sorted red and yellow blocks with peer support.', domains: ['cognitive', 'habits'] },
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
    observations: [{ id: 'r1', at: 'Today', text: 'Shared lunch but struggled to hold his crayon.', domains: ['socio', 'physical'] }],
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
    observations: [{ id: 'p1', at: 'May 31', text: 'Stayed quiet during group rhyme and did not respond to name twice.', domains: ['language', 'socio'] }],
  },
]

const defaultBootstrap = {
  domains,
  children: defaultChildren,
  syncQueue: 23,
  stats: {
    centres: '14 lakh',
    children: '8 crore',
    paperRegisters: '5+',
    referralDropoff: '70%',
    feedbackTools: '₹0',
    pilotChildren: '~1,250',
  },
  modelStack: [
    { model: 'Whisper.cpp', job: 'Offline speech-to-text', ram: '<1GB', offline: true },
    { model: 'AI4Bharat IndicASR', job: 'Regional dialect recognition', ram: '<1GB', offline: true },
    { model: 'Gemma 2B 4-bit', job: 'Six-domain classifier and concern flags', ram: '<2GB', offline: true },
    { model: 'MobileNetV3 TFLite', job: 'On-device artifact/photo signals', ram: '<10MB', offline: true },
    { model: 'Llama 3.2 3B LoRA', job: 'Activity recommendations', ram: '<3GB', offline: true },
    { model: 'IndicTrans2', job: '22-language caregiver output', ram: '<2GB', offline: true },
  ],
  connectivityTiers: [
    { id: '4g', label: '4G / WiFi', detail: 'Full sync and supervisor portal' },
    { id: '2g', label: '2G burst', detail: 'Background delta sync only' },
    { id: 'whatsapp', label: 'WhatsApp only', detail: 'Caregiver bridge without app install' },
    { id: 'bluetooth', label: 'Bluetooth mesh', detail: 'Worker-to-worker peer sync' },
    { id: 'ussd', label: 'USSD *987#', detail: 'Feature phone fallback' },
  ],
  supervisor: { block: 'Rampur block', flaggedThisWeek: 3, awcCoverage: 91, syncGaps: 3, referralsOpen: 24 },
  districtBlocks: [
    { id: 'rampur', name: 'Rampur', risk: 72, coverage: 91 },
    { id: 'narela', name: 'Narela', risk: 64, coverage: 83 },
    { id: 'sevapur', name: 'Sevapur', risk: 49, coverage: 94 },
    { id: 'banshi', name: 'Banshi', risk: 57, coverage: 87 },
    { id: 'kotra', name: 'Kotra', risk: 39, coverage: 78 },
  ],
}

const sampleObservations = [
  'Asha listened to the story and repeated two words, but did not speak a full sentence.',
  'Rohan shared his lunch with Meena but struggled to hold his crayon during drawing time.',
  'Priya counted three blocks, then waited for her turn and matched the red shapes.',
  'मीना ने रंगोली में दो रंग चुने और गाना सुनकर हाथ से ताल दी।',
]

const localActivities = {
  physical: { title: 'Crayon Garden Lines', duration: '8 minutes', steps: ['Draw three standing lines.', 'Add one round flower.', 'Trace the lines slowly.'] },
  socio: { title: 'Turn-Taking Snack Circle', duration: '10 minutes', steps: ['Pass one object.', 'Name the friend receiving it.', 'Praise waiting and sharing.'] },
  cognitive: { title: 'Kitchen Count Match', duration: '7 minutes', steps: ['Place five objects.', 'Count aloud.', 'Match each object to one dot.'] },
  language: { title: 'Two-Word Treasure Hunt', duration: '10 minutes', steps: ['Find a familiar object.', 'Say two words together.', 'Repeat with three objects.'] },
  aesthetic: { title: 'Festival Pattern Tray', duration: '12 minutes', steps: ['Create a simple pattern.', 'Copy one part.', 'Name a colour or shape.'] },
  habits: { title: 'Finish-One-Thing Mat', duration: '6 minutes', steps: ['Place one task on a mat.', 'Use start and done signals.', 'Mark completion.'] },
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max)
}

function getDomainLabel(id, locale = 'en', useShort = false) {
  const domain = domains.find((item) => item.id === id)
  if (!domain) return id
  if (locale !== 'en' && localDomainNames[locale]?.[id]) return localDomainNames[locale][id]
  return useShort ? domain.short : domain.label
}

function useStoredPreference(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      return window.localStorage.getItem(key) || initialValue
    } catch {
      return initialValue
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(key, value)
    } catch {
      // In-memory state remains usable when storage is unavailable.
    }
  }, [key, value])

  return [value, setValue]
}

async function apiRequest(path, options = {}) {
  const response = await fetch(path, {
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    ...options,
  })

  if (!response.ok) {
    const payload = await response.json().catch(() => ({}))
    throw new Error(payload.error || `Request failed: ${response.status}`)
  }

  return response.json()
}

function createLocalAnalysis({ child, text, mode }) {
  const normalized = text.toLowerCase()
  const scores = {
    physical: /crayon|hold|grip|jump|clay|block|पकड़|कूद/.test(normalized) ? 2 : 0,
    socio: /share|shared|turn|friend|peer|lunch|cry|साझा|दोस्त/.test(normalized) ? 2 : 0,
    cognitive: /count|sort|match|number|shape|गिन|मिलान|रंग/.test(normalized) ? 2 : 0,
    language: /word|sentence|story|rhyme|speak|repeat|name|कहानी|शब्द|वाक्य/.test(normalized) ? 2 : 0,
    aesthetic: /song|draw|dance|music|festival|rangoli|गीत|चित्र|रंगोली/.test(normalized) ? 2 : 0,
    habits: /focus|finish|wait|try|routine|complete|ध्यान|पूरा|इंतजार/.test(normalized) ? 2 : 0,
  }
  const sorted = Object.entries(scores)
    .filter(([, score]) => score > 0)
    .sort((a, b) => b[1] - a[1])
  const primaryDomain = sorted[0]?.[0] || 'language'
  const secondaryDomain = sorted[1]?.[0] || (primaryDomain === 'language' ? 'socio' : 'language')
  const confidence = mode === 'voice' ? 0.87 : 0.81
  const activity = localActivities[primaryDomain]

  return {
    id: `local-${Date.now()}`,
    childId: child.id,
    transcript: text,
    inputMode: mode,
    primaryDomain,
    confidence,
    schoolReadinessSignal: Math.round((child.readiness + child.attendance) / 2),
    tags: [
      { domainId: primaryDomain, label: getDomainLabel(primaryDomain), confidence },
      { domainId: secondaryDomain, label: getDomainLabel(secondaryDomain), confidence: confidence - 0.13 },
    ],
    concern: {
      level: child.domains[primaryDomain] < 50 ? 'Review' : child.domains[primaryDomain] < 62 ? 'Watch' : 'None',
      explanation: `${child.name}'s ${getDomainLabel(primaryDomain).toLowerCase()} signal is reviewed before any escalation.`,
    },
    activity,
    caregiverMessage: `${activity.title}: use objects already at home and praise every attempt.`,
    modelTrace: ['Offline fallback mode', 'On-device classifier simulated', 'Human review required', 'Metadata queued locally'],
  }
}

function mergeChildWithAnalysis(child, analysis) {
  const nextDomains = { ...child.domains }
  analysis.tags.forEach((tag) => {
    nextDomains[tag.domainId] = clamp(nextDomains[tag.domainId] + (tag.domainId === analysis.primaryDomain ? 3 : 1), 0, 96)
  })
  const readiness = Math.round(Object.values(nextDomains).reduce((sum, value) => sum + value, 0) / domains.length)
  const lowest = Object.entries(nextDomains).sort((a, b) => a[1] - b[1])[0]

  return {
    ...child,
    domains: nextDomains,
    readiness,
    risk: lowest[1] < 45 ? 'Review' : lowest[1] < 60 ? 'Watch' : 'Low',
    primaryGap: getDomainLabel(lowest[0]),
    lastSeen: 'Just now',
    observations: [
      { id: analysis.id, at: 'Just now', text: analysis.transcript, domains: analysis.tags.map((tag) => tag.domainId) },
      ...child.observations,
    ].slice(0, 5),
  }
}

function Logo() {
  return (
    <div className="brandMark" aria-label="ANKUR">
      <EtchingSeedling compact />
      <div>
        <strong>ANKUR</strong>
        <span>अंकुर</span>
      </div>
    </div>
  )
}

function EtchingSeedling({ compact = false }) {
  return (
    <svg className={compact ? 'seedling compact' : 'seedling'} viewBox="0 0 160 160" role="img" aria-label="Seedling emerging from earth">
      <defs>
        <pattern id="hatch" patternUnits="userSpaceOnUse" width="8" height="8" patternTransform="rotate(28)">
          <line x1="0" y1="0" x2="0" y2="8" />
        </pattern>
      </defs>
      <path className="earth" d="M22 112c22 16 94 16 116 0-13 29-108 30-116 0Z" />
      <path className="earthHatch" d="M22 112c22 16 94 16 116 0-13 29-108 30-116 0Z" />
      <path className="stem" d="M79 111C77 88 80 64 82 44" />
      <path className="leaf left" d="M79 66C47 47 30 45 22 59c16 19 39 19 57 7Z" />
      <path className="leaf right" d="M83 58c28-25 49-27 57-12-13 22-38 26-57 12Z" />
      <path className="sprout" d="M83 41c8-16 20-22 31-18-4 17-15 26-31 18Z" />
    </svg>
  )
}

function Badge({ children, tone = 'green' }) {
  return <span className={`badge ${tone}`}>{children}</span>
}

function IconStat({ icon: Icon, label, value, detail, tone = 'green' }) {
  return (
    <article className={`statTile ${tone}`}>
      <Icon aria-hidden="true" />
      <span>{label}</span>
      <strong>{value}</strong>
      {detail && <small>{detail}</small>}
    </article>
  )
}

function DomainRadar({ scores, locale }) {
  const points = useMemo(() => {
    const center = 112
    const radius = 78
    return domains
      .map((domain, index) => {
        const angle = -Math.PI / 2 + (index * Math.PI * 2) / domains.length
        const value = scores[domain.id] || 0
        return `${center + Math.cos(angle) * radius * (value / 100)},${center + Math.sin(angle) * radius * (value / 100)}`
      })
      .join(' ')
  }, [scores])

  return (
    <figure className="radarFigure">
      <svg viewBox="0 0 224 224" role="img" aria-labelledby="radarTitle radarDesc">
        <title id="radarTitle">Six domain developmental radar</title>
        <desc id="radarDesc">Radar chart showing child development scores across six ECCE domains.</desc>
        {[28, 52, 78].map((radius) => (
          <polygon
            key={radius}
            className="radarGrid"
            points={domains
              .map((_, index) => {
                const angle = -Math.PI / 2 + (index * Math.PI * 2) / domains.length
                return `${112 + Math.cos(angle) * radius},${112 + Math.sin(angle) * radius}`
              })
              .join(' ')}
          />
        ))}
        {domains.map((domain, index) => {
          const angle = -Math.PI / 2 + (index * Math.PI * 2) / domains.length
          return (
            <g key={domain.id}>
              <line x1="112" y1="112" x2={112 + Math.cos(angle) * 84} y2={112 + Math.sin(angle) * 84} />
              <text x={112 + Math.cos(angle) * 101} y={116 + Math.sin(angle) * 101}>
                {getDomainLabel(domain.id, locale, true)}
              </text>
            </g>
          )
        })}
        <polygon className="radarFill" points={points} />
        <circle cx="112" cy="112" r="4" />
      </svg>
      <figcaption className="domainLegend">
        {domains.map((domain) => (
          <span key={domain.id}>
            {getDomainLabel(domain.id, locale, true)}
            <strong>{scores[domain.id] || 0}%</strong>
          </span>
        ))}
      </figcaption>
    </figure>
  )
}

function DomainBars({ scores, locale }) {
  return (
    <div className="domainBars" aria-label="Domain scores">
      {domains.map((domain) => (
        <div className="domainBar" key={domain.id}>
          <span>{getDomainLabel(domain.id, locale)}</span>
          <strong>{scores[domain.id]}%</strong>
          <div aria-hidden="true">
            <i style={{ width: `${scores[domain.id]}%` }} />
          </div>
        </div>
      ))}
    </div>
  )
}

function App() {
  const [locale, setLocale] = useStoredPreference('ankur-locale', 'en')
  const [theme, setTheme] = useStoredPreference('ankur-theme', 'light')
  const [contrast, setContrast] = useStoredPreference('ankur-contrast', 'normal')
  const [fontScale, setFontScale] = useStoredPreference('ankur-font-scale', '100')
  const [reducedMotion, setReducedMotion] = useStoredPreference('ankur-reduced-motion', 'false')
  const [activeView, setActiveView] = useStoredPreference('ankur-view', 'worker')
  const [bootstrap, setBootstrap] = useState(defaultBootstrap)
  const [children, setChildren] = useState(defaultChildren)
  const [selectedChildId, setSelectedChildId] = useState('asha')
  const [syncQueue, setSyncQueue] = useState(defaultBootstrap.syncQueue)
  const [apiMode, setApiMode] = useState('checking')
  const [announcement, setAnnouncement] = useState('')
  const [analysis, setAnalysis] = useState(null)
  const [nudge, setNudge] = useState(null)

  const text = copy[locale] || copy.en
  const selectedChild = children.find((child) => child.id === selectedChildId) || children[0]

  useEffect(() => {
    document.documentElement.lang = locale
    document.documentElement.dataset.theme = theme
    document.documentElement.dataset.contrast = contrast
    document.documentElement.dataset.motion = reducedMotion === 'true' ? 'reduced' : 'full'
    document.documentElement.style.setProperty('--font-scale', `${Number(fontScale) / 100}`)
  }, [locale, theme, contrast, fontScale, reducedMotion])

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [activeView])

  useEffect(() => {
    let cancelled = false

    async function loadBootstrap() {
      try {
        const payload = await apiRequest('/api/bootstrap')
        if (cancelled) return
        setBootstrap(payload)
        setChildren(payload.children)
        setSyncQueue(payload.syncQueue)
        setApiMode('live')
      } catch {
        if (cancelled) return
        setApiMode('offline')
      }
    }

    loadBootstrap()
    return () => {
      cancelled = true
    }
  }, [])

  const updateChild = (child) => {
    setChildren((current) => current.map((item) => (item.id === child.id ? child : item)))
  }

  const announce = (message) => {
    setAnnouncement('')
    window.setTimeout(() => setAnnouncement(message), 25)
  }

  const runObservation = async ({ childId, text: observationText, mode }) => {
    const child = children.find((item) => item.id === childId)
    if (!child) return null

    try {
      const payload = await apiRequest('/api/observations/classify', {
        method: 'POST',
        body: JSON.stringify({ childId, text: observationText, locale, mode }),
      })
      setAnalysis(payload.analysis)
      updateChild(payload.child)
      setSyncQueue(payload.syncQueue)
      setApiMode('live')
      setActiveView('observe')
      announce(`AI review ready for ${payload.child.name}.`)
      return payload.analysis
    } catch {
      const localAnalysis = createLocalAnalysis({ child, text: observationText, mode })
      const updatedChild = mergeChildWithAnalysis(child, localAnalysis)
      setAnalysis(localAnalysis)
      updateChild(updatedChild)
      setSyncQueue((current) => current + 1)
      setApiMode('offline')
      setActiveView('observe')
      announce(`Offline AI review ready for ${updatedChild.name}.`)
      return localAnalysis
    }
  }

  const sendNudge = async () => {
    if (!analysis) return

    try {
      const payload = await apiRequest('/api/recommendations/nudge', {
        method: 'POST',
        body: JSON.stringify({ childId: selectedChild.id, activityTitle: analysis.activity.title, locale }),
      })
      setNudge(payload.nudge)
      setSyncQueue(payload.syncQueue)
      announce(`Caregiver nudge queued for ${selectedChild.caregiver}.`)
    } catch {
      const fallback = {
        id: `nudge-${Date.now()}`,
        caregiver: selectedChild.caregiver,
        channel: 'Offline queue',
        fallback: 'USSD *987# summary available',
        message: analysis.caregiverMessage,
        status: 'queued_locally',
      }
      setNudge(fallback)
      setSyncQueue((current) => current + 1)
      announce(`Offline caregiver nudge queued for ${selectedChild.caregiver}.`)
    }
  }

  const syncNow = async () => {
    try {
      const payload = await apiRequest('/api/sync', { method: 'POST', body: JSON.stringify({}) })
      setSyncQueue(payload.syncQueue)
      setApiMode('live')
      announce(`${payload.synced} queued events synced.`)
    } catch {
      announce('Sync will retry when a network burst is available.')
    }
  }

  const navItems = [
    { id: 'worker', label: text.worker, icon: Home },
    { id: 'observe', label: text.observe, icon: Mic },
    { id: 'profile', label: text.profile, icon: Search },
    { id: 'caregiver', label: text.caregiver, icon: MessageCircle },
    { id: 'supervisor', label: text.supervisor, icon: Users },
    { id: 'district', label: text.district, icon: Map },
    { id: 'ai', label: text.ai, icon: Brain },
    { id: 'settings', label: text.settings, icon: Settings },
  ]

  return (
    <main className="appShell">
      <a className="skipLink" href="#workspace">
        Skip to main content
      </a>
      <aside className="sidebar" aria-label="Primary navigation">
        <Logo />
        <div className="sideStatus" aria-label="System status">
          <Badge tone={apiMode === 'live' ? 'green' : apiMode === 'checking' ? 'blue' : 'amber'}>
            {apiMode === 'live' ? 'API live' : apiMode === 'checking' ? 'Checking API' : 'Offline mode'}
          </Badge>
          <span>{syncQueue} queued events</span>
        </div>
        <nav>
          {navItems.map(({ id, label, icon: Icon }) => (
            <button
              className={activeView === id ? 'navButton active' : 'navButton'}
              key={id}
              type="button"
              onClick={() => setActiveView(id)}
              aria-current={activeView === id ? 'page' : undefined}
            >
              <Icon aria-hidden="true" />
              <span>{label}</span>
            </button>
          ))}
        </nav>
        <button className="syncButton" type="button" onClick={syncNow}>
          <Wifi aria-hidden="true" />
          {text.syncNow}
        </button>
      </aside>

      <section id="workspace" className="workspace" tabIndex="-1">
        <div className="srOnly" role="status" aria-live="polite">
          {announcement}
        </div>
        <TopBar
          locale={locale}
          setLocale={setLocale}
          selectedChild={selectedChild}
          children={children}
          setSelectedChildId={setSelectedChildId}
          apiMode={apiMode}
          syncQueue={syncQueue}
          text={text}
        />

        {activeView === 'worker' && (
          <WorkerConsole
            bootstrap={bootstrap}
            children={children}
            locale={locale}
            selectedChild={selectedChild}
            setSelectedChildId={setSelectedChildId}
            setActiveView={setActiveView}
            text={text}
          />
        )}
        {activeView === 'observe' && (
          <ObservationStudio
            children={children}
            selectedChild={selectedChild}
            selectedChildId={selectedChildId}
            setSelectedChildId={setSelectedChildId}
            locale={locale}
            text={text}
            runObservation={runObservation}
            analysis={analysis}
            sendNudge={sendNudge}
            nudge={nudge}
          />
        )}
        {activeView === 'profile' && <ChildProfile child={selectedChild} locale={locale} analysis={analysis} setActiveView={setActiveView} text={text} />}
        {activeView === 'caregiver' && <CaregiverBridge child={selectedChild} locale={locale} setLocale={setLocale} analysis={analysis} nudge={nudge} sendNudge={sendNudge} text={text} />}
        {activeView === 'supervisor' && <SupervisorPortal bootstrap={bootstrap} children={children} locale={locale} announce={announce} />}
        {activeView === 'district' && <DistrictCommand bootstrap={bootstrap} />}
        {activeView === 'ai' && <AiMethodology bootstrap={bootstrap} />}
        {activeView === 'settings' && (
          <SettingsPanel
            locale={locale}
            setLocale={setLocale}
            theme={theme}
            setTheme={setTheme}
            contrast={contrast}
            setContrast={setContrast}
            fontScale={fontScale}
            setFontScale={setFontScale}
            reducedMotion={reducedMotion}
            setReducedMotion={setReducedMotion}
            bootstrap={bootstrap}
            text={text}
          />
        )}
      </section>
    </main>
  )
}

function TopBar({ locale, setLocale, selectedChild, children, setSelectedChildId, apiMode, syncQueue, text }) {
  return (
    <header className="topBar">
      <div>
        <p className="eyebrow">Sevapur AWC 04 · ICDS child development tracking</p>
        <h1>{text.brand}</h1>
        <p>{text.tagline}</p>
      </div>
      <div className="topControls" aria-label="Workspace controls">
        <label>
          <span>{text.language}</span>
          <select value={locale} onChange={(event) => setLocale(event.target.value)}>
            {languages.map((language) => (
              <option key={language.id} value={language.id}>
                {language.label} · {language.native}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span>Child</span>
          <select value={selectedChild.id} onChange={(event) => setSelectedChildId(event.target.value)}>
            {children.map((child) => (
              <option key={child.id} value={child.id}>
                {child.name} · {child.age}
              </option>
            ))}
          </select>
        </label>
        <div className="statusCluster" aria-label="Live status">
          <Badge tone={apiMode === 'live' ? 'green' : 'amber'}>{apiMode === 'live' ? 'Backend connected' : 'Offline ready'}</Badge>
          <Badge tone="blue">{syncQueue} sync queue</Badge>
        </div>
      </div>
    </header>
  )
}

function WorkerConsole({ bootstrap, children, locale, selectedChild, setSelectedChildId, setActiveView, text }) {
  const watchCount = children.filter((child) => child.risk !== 'Low').length
  const averageReadiness = Math.round(children.reduce((sum, child) => sum + child.readiness, 0) / children.length)

  return (
    <section className="viewGrid workerView" aria-labelledby="worker-title">
      <div className="heroPanel">
        <div className="heroCopy">
          <Badge tone="amber">Holistic Child Development Tracking</Badge>
          <h2 id="worker-title">{text.smartFocus}</h2>
          <p>
            Observe everyday moments, review AI signals, approve the next action, and keep child records moving even without
            connectivity.
          </p>
          <div className="heroActions">
            <button className="primaryButton" type="button" onClick={() => setActiveView('observe')}>
              <Mic aria-hidden="true" />
              Record observation
            </button>
            <button className="secondaryButton" type="button" onClick={() => setActiveView('caregiver')}>
              <MessageCircle aria-hidden="true" />
              Caregiver nudge
            </button>
          </div>
        </div>
        <EtchingSeedling />
      </div>

      <div className="statGrid">
        <IconStat icon={Users} label="Children" value="42" detail="25 active today" />
        <IconStat icon={Bell} label="Watchlist" value={watchCount} detail="Human review first" tone="amber" />
        <IconStat icon={ClipboardCheck} label="Coverage" value="91%" detail="6-domain observations" tone="blue" />
        <IconStat icon={Sparkles} label="Readiness" value={`${averageReadiness}%`} detail="Living score" tone="violet" />
      </div>

      <section className="panel focusPanel" aria-labelledby="focus-title">
        <div className="sectionHeader">
          <div>
            <p className="eyebrow">Priority queue</p>
            <h3 id="focus-title">Children to notice today</h3>
          </div>
          <Badge tone="green">AI-ranked, worker-controlled</Badge>
        </div>
        <div className="childList">
          {children.map((child) => (
            <button
              className={child.id === selectedChild.id ? 'childRow active' : 'childRow'}
              key={child.id}
              type="button"
              onClick={() => {
                setSelectedChildId(child.id)
                setActiveView('profile')
              }}
            >
              <span className="avatar" aria-hidden="true">
                {child.name[0]}
              </span>
              <span>
                <strong>{child.name}</strong>
                <small>
                  {child.primaryGap} · {child.age} · last seen {child.lastSeen}
                </small>
              </span>
              <Badge tone={child.risk === 'Low' ? 'green' : child.risk === 'Review' ? 'rose' : 'amber'}>{child.risk}</Badge>
              <ChevronRight aria-hidden="true" />
            </button>
          ))}
        </div>
      </section>

      <section className="panel chartPanel" aria-labelledby="map-title">
        <div className="sectionHeader">
          <div>
            <p className="eyebrow">{selectedChild.name} · developmental twin</p>
            <h3 id="map-title">Six-domain map</h3>
          </div>
          <Badge tone="blue">{selectedChild.readiness}% school-readiness signal</Badge>
        </div>
        <DomainRadar scores={selectedChild.domains} locale={locale} />
      </section>

      <section className="panel actionPanel" aria-labelledby="actions-title">
        <div className="sectionHeader">
          <div>
            <p className="eyebrow">Act tomorrow</p>
            <h3 id="actions-title">Recommended operating loop</h3>
          </div>
        </div>
        <div className="flowStrip">
          {[
            ['Observe', 'Voice, photo, play-grid', Mic],
            ['Understand', '6-domain AI tags', Brain],
            ['Act', 'Activity or referral', Activity],
            ['Connect', 'Caregiver + supervisor', Network],
          ].map(([title, detail, Icon], index) => (
            <article key={title} className="flowStep">
              <Icon aria-hidden="true" />
              <strong>{title}</strong>
              <span>{detail}</span>
              {index < 3 && <ArrowRight aria-hidden="true" />}
            </article>
          ))}
        </div>
        <div className="evidenceGrid">
          <strong>{bootstrap.stats.centres}</strong>
          <span>Anganwadi centres</span>
          <strong>{bootstrap.stats.children}</strong>
          <span>children under 6</span>
          <strong>{bootstrap.stats.referralDropoff}</strong>
          <span>referral drop-off to close</span>
        </div>
      </section>
    </section>
  )
}

function ObservationStudio({ children, selectedChildId, setSelectedChildId, locale, text, runObservation, analysis, sendNudge, nudge }) {
  const [mode, setMode] = useState('voice')
  const [observationText, setObservationText] = useState(sampleObservations[0])
  const [isRunning, setIsRunning] = useState(false)

  const handleRun = async () => {
    if (observationText.trim().length < 8) return
    setIsRunning(true)
    await runObservation({ childId: selectedChildId, text: observationText.trim(), mode })
    setIsRunning(false)
  }

  return (
    <section className="viewGrid observeView" aria-labelledby="observe-title">
      <section className="panel capturePanel">
        <div className="sectionHeader">
          <div>
            <p className="eyebrow">Worker input · on-device first</p>
            <h2 id="observe-title">{text.observe}</h2>
          </div>
          <Badge tone="amber">Human review required</Badge>
        </div>

        <div className="modePicker" role="group" aria-label="Observation mode">
          {[
            ['voice', 'Voice', Mic],
            ['photo', 'Photo', Camera],
            ['play', 'Play grid', Activity],
          ].map(([id, label, Icon]) => (
            <button className={mode === id ? 'modeButton active' : 'modeButton'} key={id} type="button" onClick={() => setMode(id)}>
              <Icon aria-hidden="true" />
              {label}
            </button>
          ))}
        </div>

        <label className="fieldGroup">
          <span>Child</span>
          <select value={selectedChildId} onChange={(event) => setSelectedChildId(event.target.value)}>
            {children.map((child) => (
              <option key={child.id} value={child.id}>
                {child.name} · {child.age} · {child.homeLanguage}
              </option>
            ))}
          </select>
        </label>

        <label className="fieldGroup">
          <span>Observation transcript</span>
          <textarea value={observationText} onChange={(event) => setObservationText(event.target.value)} rows={7} />
        </label>

        <div className="sampleStack">
          {sampleObservations.map((sample) => (
            <button key={sample} type="button" onClick={() => setObservationText(sample)}>
              {sample}
            </button>
          ))}
        </div>

        <div className="captureFooter">
          <button className="primaryButton" type="button" onClick={handleRun} disabled={isRunning || observationText.trim().length < 8}>
            <Brain aria-hidden="true" />
            {isRunning ? 'Reviewing...' : text.runAi}
          </button>
          <p>
            {mode === 'photo'
              ? 'Photo signal is extracted locally; the image is discarded before sync.'
              : 'Audio stays local; only developmental metadata joins the sync queue.'}
          </p>
        </div>
      </section>

      <section className="analysisBoard" aria-live="polite" aria-labelledby="analysis-title">
        <div className="sectionHeader">
          <div>
            <p className="eyebrow">AI output</p>
            <h3 id="analysis-title">Review packet</h3>
          </div>
          {analysis && <Badge tone="green">{Math.round(analysis.confidence * 100)}% confidence</Badge>}
        </div>

        {!analysis ? (
          <div className="emptyState">
            <Brain aria-hidden="true" />
            <strong>No review yet</strong>
            <p>Run the AI review to generate domain tags, an explanation, and a caregiver-ready activity.</p>
          </div>
        ) : (
          <>
            <div className="tagGrid">
              {analysis.tags.map((tag) => (
                <Badge key={tag.domainId} tone={domains.find((domain) => domain.id === tag.domainId)?.tone || 'green'}>
                  {getDomainLabel(tag.domainId, locale)} · {Math.round(tag.confidence * 100)}%
                </Badge>
              ))}
            </div>
            <div className="explainBlock">
              <AlertTriangle aria-hidden="true" />
              <div>
                <strong>{analysis.concern.level === 'None' ? 'No escalation' : `${analysis.concern.level} flag`}</strong>
                <p>{analysis.concern.explanation}</p>
              </div>
            </div>
            <div className="activitySheet">
              <p className="eyebrow">Generated activity</p>
              <h3>{analysis.activity.title}</h3>
              <span>{analysis.activity.duration}</span>
              <ol>
                {analysis.activity.steps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            </div>
            <div className="traceList" aria-label="Model trace">
              {analysis.modelTrace.map((item) => (
                <span key={item}>
                  <CheckCircle2 aria-hidden="true" />
                  {item}
                </span>
              ))}
            </div>
            <button className="primaryButton fullWidth" type="button" onClick={sendNudge}>
              <Send aria-hidden="true" />
              {text.approveNudge}
            </button>
            {nudge && (
              <div className="nudgeReceipt">
                <strong>{nudge.status.replaceAll('_', ' ')}</strong>
                <p>{nudge.message}</p>
                <small>
                  {nudge.channel} · {nudge.fallback}
                </small>
              </div>
            )}
          </>
        )}
      </section>
    </section>
  )
}

function ChildProfile({ child, locale, analysis, setActiveView, text }) {
  return (
    <section className="viewGrid profileView" aria-labelledby="profile-title">
      <section className="panel profileHero">
        <div className="profileIdentity">
          <span className="avatar large" aria-hidden="true">
            {child.name[0]}
          </span>
          <div>
            <p className="eyebrow">{child.age} · {child.homeLanguage} home language</p>
            <h2 id="profile-title">{child.name}</h2>
            <p>
              Caregiver: {child.caregiver} · attendance {child.attendance}% · last seen {child.lastSeen}
            </p>
          </div>
        </div>
        <div className="readinessGauge" role="img" aria-label={`School-readiness signal ${child.readiness}%`}>
          <span style={{ '--score': `${child.readiness}%` }} />
          <strong>{child.readiness}%</strong>
          <small>School-readiness signal</small>
        </div>
      </section>

      <section className="panel">
        <div className="sectionHeader">
          <div>
            <p className="eyebrow">Developmental domains</p>
            <h3>Profile map</h3>
          </div>
          <Badge tone={child.risk === 'Low' ? 'green' : child.risk === 'Review' ? 'rose' : 'amber'}>{child.risk}</Badge>
        </div>
        <DomainRadar scores={child.domains} locale={locale} />
      </section>

      <section className="panel">
        <div className="sectionHeader">
          <div>
            <p className="eyebrow">Observation coverage</p>
            <h3>Domain evidence</h3>
          </div>
        </div>
        <DomainBars scores={child.domains} locale={locale} />
      </section>

      <section className="panel timelinePanel">
        <div className="sectionHeader">
          <div>
            <p className="eyebrow">Reviewed moments</p>
            <h3>Observation history</h3>
          </div>
          <button className="secondaryButton" type="button" onClick={() => setActiveView('observe')}>
            <Mic aria-hidden="true" />
            Add note
          </button>
        </div>
        <ol className="timeline">
          {child.observations.map((observation) => (
            <li key={observation.id}>
              <span>{observation.at}</span>
              <p>{observation.text}</p>
              <div>
                {observation.domains.map((domainId) => (
                  <Badge key={domainId} tone={domains.find((domain) => domain.id === domainId)?.tone || 'green'}>
                    {getDomainLabel(domainId, locale, true)}
                  </Badge>
                ))}
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="panel governancePanel">
        <ShieldCheck aria-hidden="true" />
        <h3>{text.privacy} guardrails</h3>
        <p>Concern flags are explanations, not diagnoses. The worker or supervisor confirms every escalation before referral.</p>
        {analysis && <Badge tone="blue">Latest model trace available</Badge>}
      </section>
    </section>
  )
}

function CaregiverBridge({ child, locale, setLocale, analysis, nudge, sendNudge, text }) {
  const message = nudge?.message || analysis?.caregiverMessage || 'Practice two-word phrases during cooking, cleaning, or play. Praise every attempt.'

  return (
    <section className="viewGrid caregiverView" aria-labelledby="caregiver-title">
      <section className="phonePanel" aria-labelledby="caregiver-title">
        <div className="phoneTop">
          <span>{child.caregiver}</span>
          <Badge tone="green">{child.homeLanguage}</Badge>
        </div>
        <div className="messageBubble">
          <p id="caregiver-title">{message}</p>
        </div>
        <div className="phoneActions">
          <button type="button">
            <CheckCircle2 aria-hidden="true" />
            Done
          </button>
          <button type="button">
            <Volume2 aria-hidden="true" />
            Voice
          </button>
          <button type="button">
            <Phone aria-hidden="true" />
            Call
          </button>
        </div>
      </section>

      <section className="panel">
        <div className="sectionHeader">
          <div>
            <p className="eyebrow">Family communication</p>
            <h2>{text.caregiver}</h2>
          </div>
          <Badge tone="amber">WhatsApp + IVR + USSD</Badge>
        </div>
        <div className="languageGrid">
          {languages.map((language) => (
            <button className={locale === language.id ? 'languageCard active' : 'languageCard'} key={language.id} type="button" onClick={() => setLocale(language.id)}>
              <Languages aria-hidden="true" />
              <strong>{language.native}</strong>
              <span>{language.label}</span>
            </button>
          ))}
        </div>
        <button className="primaryButton" type="button" onClick={sendNudge} disabled={!analysis}>
          <Send aria-hidden="true" />
          Queue caregiver message
        </button>
      </section>

      <section className="panel consentPanel">
        <div className="sectionHeader">
          <div>
            <p className="eyebrow">Consent</p>
            <h3>Plain-language data choices</h3>
          </div>
          <Lock aria-hidden="true" />
        </div>
        <div className="consentRows">
          {[
            ['Photos never leave the device', Eye],
            ['Caregiver can receive voice instead of text', Volume2],
            ['Aggregate analytics use differential privacy', ShieldCheck],
            ['Full audit trail for supervisor access', FileText],
          ].map(([label, Icon]) => (
            <span key={label}>
              <Icon aria-hidden="true" />
              {label}
            </span>
          ))}
        </div>
      </section>
    </section>
  )
}

function SupervisorPortal({ bootstrap, children, announce }) {
  const flagged = children.filter((child) => child.risk !== 'Low')

  return (
    <section className="viewGrid supervisorView" aria-labelledby="supervisor-title">
      <section className="panel widePanel">
        <div className="sectionHeader">
          <div>
            <p className="eyebrow">{bootstrap.supervisor.block} · CDPO view</p>
            <h2 id="supervisor-title">Early warning and referral queue</h2>
          </div>
          <Badge tone="rose">{bootstrap.supervisor.flaggedThisWeek} children flagged this week</Badge>
        </div>
        <div className="statGrid compact">
          <IconStat icon={BarChart3} label="Coverage" value={`${bootstrap.supervisor.awcCoverage}%`} />
          <IconStat icon={WifiOff} label="Sync gaps" value={bootstrap.supervisor.syncGaps} tone="amber" />
          <IconStat icon={HeartHandshake} label="Open referrals" value={bootstrap.supervisor.referralsOpen} tone="rose" />
          <IconStat icon={ShieldCheck} label="Reviewed flags" value="100%" tone="blue" />
        </div>
      </section>

      <section className="panel">
        <div className="sectionHeader">
          <div>
            <p className="eyebrow">Escalation review</p>
            <h3>Human-confirmed queue</h3>
          </div>
        </div>
        <div className="escalationList">
          {flagged.map((child) => (
            <article key={child.id} className="escalationRow">
              <span className="avatar" aria-hidden="true">
                {child.name[0]}
              </span>
              <div>
                <strong>{child.name}</strong>
                <p>
                  {child.primaryGap} · readiness {child.readiness}% · last seen {child.lastSeen}
                </p>
                <Badge tone={child.risk === 'Review' ? 'rose' : 'amber'}>{child.risk}</Badge>
              </div>
              <button type="button" onClick={() => announce(`Referral pathway opened for ${child.name}.`)}>
                Initiate referral
              </button>
            </article>
          ))}
        </div>
      </section>

      <section className="panel">
        <div className="sectionHeader">
          <div>
            <p className="eyebrow">Worker coverage</p>
            <h3>AWC heatmap</h3>
          </div>
        </div>
        <div className="heatmap" role="img" aria-label="Coverage heatmap for thirty Anganwadi centres">
          {Array.from({ length: 30 }).map((_, index) => (
            <span className={`heat h${index % 5}`} key={`heat-${index}`} />
          ))}
        </div>
        <div className="coverageBars">
          {children.map((child) => (
            <div key={child.id}>
              <span>{child.name}</span>
              <i style={{ width: `${child.readiness}%` }} />
              <strong>{child.readiness}%</strong>
            </div>
          ))}
        </div>
      </section>

      <section className="panel referralPanel">
        <div className="sectionHeader">
          <div>
            <p className="eyebrow">Referral template</p>
            <h3>Action surfaced immediately</h3>
          </div>
        </div>
        <ol className="actionList">
          <li>Review observation history across workers.</li>
          <li>Confirm concern explanation and confidence score.</li>
          <li>Generate caregiver consent note in family language.</li>
          <li>Route to block-level ECCE or NHM contact.</li>
        </ol>
      </section>
    </section>
  )
}

function DistrictCommand({ bootstrap }) {
  return (
    <section className="viewGrid districtView" aria-labelledby="district-title">
      <section className="panel widePanel">
        <div className="sectionHeader">
          <div>
            <p className="eyebrow">Privacy-preserving aggregate analytics</p>
            <h2 id="district-title">District command center</h2>
          </div>
          <Badge tone="green">Differential privacy enabled</Badge>
        </div>
        <div className="blockMap" role="img" aria-label="District block risk map">
          {bootstrap.districtBlocks.map((block) => (
            <article key={block.id} style={{ '--risk': `${block.risk}%` }}>
              <strong>{block.name}</strong>
              <span>Risk {block.risk}%</span>
              <small>Coverage {block.coverage}%</small>
            </article>
          ))}
        </div>
      </section>

      <section className="panel">
        <div className="sectionHeader">
          <div>
            <p className="eyebrow">Resource planning</p>
            <h3>Recommended interventions</h3>
          </div>
        </div>
        <div className="resourceList">
          <span>Deploy story kits to Rampur and Narela blocks.</span>
          <span>Schedule mentoring visit for 11 low-sync AWCs.</span>
          <span>Push fine-motor activity pack before monsoon disruption.</span>
        </div>
      </section>

      <section className="panel">
        <div className="sectionHeader">
          <div>
            <p className="eyebrow">Scale story</p>
            <h3>ICDS-ready impact frame</h3>
          </div>
        </div>
        <div className="impactMatrix">
          <span>
            <strong>{bootstrap.stats.centres}</strong>
            centres
          </span>
          <span>
            <strong>{bootstrap.stats.children}</strong>
            children
          </span>
          <span>
            <strong>{bootstrap.stats.pilotChildren}</strong>
            phase-2 pilot children
          </span>
          <span>
            <strong>₹0</strong>
            AI licensing cost
          </span>
        </div>
      </section>

      <section className="panel governancePanel">
        <Database aria-hidden="true" />
        <h3>District data residency</h3>
        <p>Child records stay inside the administrative boundary responsible for the child. Model improvement uses federated learning, not raw data export.</p>
      </section>
    </section>
  )
}

function AiMethodology({ bootstrap }) {
  return (
    <section className="aiView" aria-labelledby="ai-title">
      <section className="panel widePanel">
        <div className="sectionHeader">
          <div>
            <p className="eyebrow">Six open-source models · one offline pipeline</p>
            <h2 id="ai-title">AI approach and technical feasibility</h2>
          </div>
          <Badge tone="amber">Zero cloud dependency</Badge>
        </div>
        <div className="pipelineGrid">
          {[
            ['Input vectors', 'Voice note, photo artifact, play grid, caregiver IVR', Mic],
            ['On-device speech & vision', 'Whisper.cpp, IndicASR, MobileNetV3 TFLite', Smartphone],
            ['Classification intelligence', 'Gemma 2B maps six ECCE domains and concern flags', Brain],
            ['Generation & communication', 'Llama 3.2 LoRA and IndicTrans2 produce local-language nudges', Languages],
          ].map(([title, detail, Icon], index) => (
            <article key={title} className="pipelineNode">
              <Icon aria-hidden="true" />
              <strong>{title}</strong>
              <p>{detail}</p>
              {index < 3 && (
                <span className="arrowLabel">
                  {index === 0 ? 'Opus audio + 2KB metadata' : index === 1 ? 'Quantized on-device inference' : 'Delta sync on 2G burst'}
                </span>
              )}
            </article>
          ))}
        </div>
      </section>

      <section className="modelGrid" aria-label="Model stack">
        {bootstrap.modelStack.map((model) => (
          <article className="modelCard" key={model.model}>
            <span>
              <Brain aria-hidden="true" />
              {model.ram}
            </span>
            <h3>{model.model}</h3>
            <p>{model.job}</p>
            <Badge tone={model.offline ? 'green' : 'amber'}>{model.offline ? 'Runs offline' : 'Needs network'}</Badge>
          </article>
        ))}
      </section>

      <section className="panel evalPanel">
        <div className="sectionHeader">
          <div>
            <p className="eyebrow">Evaluation plan</p>
            <h3>Accuracy is measured task-by-task</h3>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>Task</th>
              <th>Metric</th>
              <th>Target</th>
              <th>Human guardrail</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Speech transcription', 'Word Error Rate', '<15% on regional dialects', 'Worker can edit transcript'],
              ['Domain classification', 'Macro F1', '>0.82 across six domains', 'Confidence visible'],
              ['Concern detection', 'Recall priority', 'Early flag, human confirms', 'No diagnosis language'],
              ['Activity recommendation', 'Usefulness rating', '>4/5 in pilot', 'Worker approves before send'],
              ['Caregiver relevance', 'Response rate', 'Measured in pilot', 'Language and IVR fallback'],
            ].map((row) => (
              <tr key={row[0]}>
                {row.map((cell) => (
                  <td key={cell}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </section>
  )
}

function SettingsPanel({ locale, setLocale, theme, setTheme, contrast, setContrast, fontScale, setFontScale, reducedMotion, setReducedMotion, bootstrap, text }) {
  return (
    <section className="viewGrid settingsView" aria-labelledby="settings-title">
      <section className="panel">
        <div className="sectionHeader">
          <div>
            <p className="eyebrow">Regional language support</p>
            <h2 id="settings-title">{text.settings}</h2>
          </div>
          <Languages aria-hidden="true" />
        </div>
        <label className="fieldGroup">
          <span>{text.language}</span>
          <select value={locale} onChange={(event) => setLocale(event.target.value)}>
            {languages.map((language) => (
              <option key={language.id} value={language.id}>
                {language.label} · {language.native}
              </option>
            ))}
          </select>
        </label>
        <p>Prototype language packs include English, Hindi, Marathi, Tamil, Bengali, and Telugu. Architecture supports all 22 scheduled Indian languages through IndicTrans2.</p>
      </section>

      <section className="panel">
        <div className="sectionHeader">
          <div>
            <p className="eyebrow">Low-literacy and low-vision controls</p>
            <h3>{text.accessibility}</h3>
          </div>
          <Accessibility aria-hidden="true" />
        </div>
        <label className="fieldGroup">
          <span>Theme</span>
          <select value={theme} onChange={(event) => setTheme(event.target.value)}>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </label>
        <label className="fieldGroup">
          <span>Contrast</span>
          <select value={contrast} onChange={(event) => setContrast(event.target.value)}>
            <option value="normal">Normal</option>
            <option value="high">High contrast</option>
          </select>
        </label>
        <label className="fieldGroup">
          <span>Font scale {fontScale}%</span>
          <input type="range" min="90" max="130" step="5" value={fontScale} onChange={(event) => setFontScale(event.target.value)} />
        </label>
        <label className="toggleRow">
          <input type="checkbox" checked={reducedMotion === 'true'} onChange={(event) => setReducedMotion(String(event.target.checked))} />
          <span>Reduce motion</span>
        </label>
      </section>

      <section className="panel connectivityPanel">
        <div className="sectionHeader">
          <div>
            <p className="eyebrow">Offline readiness</p>
            <h3>Connectivity tiers</h3>
          </div>
          <WifiOff aria-hidden="true" />
        </div>
        <div className="tierList">
          {bootstrap.connectivityTiers.map((tier, index) => {
            const Icon = [Wifi, WifiOff, MessageCircle, Bluetooth, QrCode][index] || Network
            return (
              <span key={tier.id}>
                <Icon aria-hidden="true" />
                <strong>{tier.label}</strong>
                <small>{tier.detail}</small>
              </span>
            )
          })}
        </div>
      </section>

      <section className="panel">
        <div className="sectionHeader">
          <div>
            <p className="eyebrow">Responsible AI</p>
            <h3>{text.privacy}</h3>
          </div>
          <ShieldCheck aria-hidden="true" />
        </div>
        <div className="consentRows">
          {[
            ['Human confirms all concern flags', CheckCircle2],
            ['Confidence scores visible on every output', SlidersHorizontal],
            ['No child photo upload', Camera],
            ['No diagnosis language', AlertTriangle],
            ['Federated learning for district model improvement', Database],
          ].map(([label, Icon]) => (
            <span key={label}>
              <Icon aria-hidden="true" />
              {label}
            </span>
          ))}
        </div>
      </section>
    </section>
  )
}

export default App
