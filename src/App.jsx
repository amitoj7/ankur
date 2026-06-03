import { Component, memo, useEffect, useMemo, useState } from 'react'
import './App.css'

const clamp = (value, min, max) => Math.min(Math.max(value, min), max)

const HINDI = {
  ankur: '\u0905\u0902\u0915\u0941\u0930',
  a: '\u0905',
  hindi: '\u0939\u093f\u0902\u0926\u0940',
}

const domains = [
  { en: 'Physical', hi: '\u0936\u093e\u0930\u0940\u0930\u093f\u0915', score: 78 },
  { en: 'Cognitive', hi: '\u0938\u0902\u091c\u094d\u091e\u093e\u0928\u093e\u0924\u094d\u092e\u0915', score: 62 },
  { en: 'Language & Literacy', hi: '\u092d\u093e\u0937\u093e \u0914\u0930 \u0938\u093e\u0915\u094d\u0937\u0930\u0924\u093e', score: 48 },
  { en: 'Socio-Emotional', hi: '\u0938\u093e\u092e\u093e\u091c\u093f\u0915-\u092d\u093e\u0935\u0928\u093e\u0924\u094d\u092e\u0915', score: 72 },
  { en: 'Aesthetic & Cultural', hi: '\u0938\u094c\u0902\u0926\u0930\u094d\u092f \u0914\u0930 \u0938\u093e\u0902\u0938\u094d\u0915\u0943\u0924\u093f\u0915', score: 66 },
  { en: 'Learning Habits', hi: '\u0938\u0940\u0916\u0928\u0947 \u0915\u0940 \u0906\u0926\u0924\u0947\u0902', score: 54 },
]

const prototypeScreens = [
  'Splash',
  'Worker Home',
  'Voice',
  'Photo',
  'Play',
  'Profile',
  'Recommend',
  'Caregiver',
  'Supervisor',
  'District',
  'Settings',
]

const copy = {
  en: {
    title: 'ANKUR',
    subtitle: 'Developmental intelligence for every Anganwadi child',
    role: 'Select Role',
    workerHome: 'Worker Home',
    focus: 'Daily Smart Focus',
    voice: 'Voice Observation',
    photo: 'Photo Observation',
    play: 'Play Activity',
    profile: 'Child Profile',
    recommend: 'Activity Recommendation',
    caregiver: 'Caregiver View',
    supervisor: 'Supervisor Dashboard',
    district: 'District Analytics',
    settings: 'Settings',
    ask: 'Ask a Question',
    homeActivity: "Today's Home Activity",
    language: 'Language',
  },
  hi: {
    title: HINDI.ankur,
    subtitle: '\u0939\u0930 \u0906\u0902\u0917\u0928\u0935\u093e\u0921\u093c\u0940 \u092c\u091a\u094d\u091a\u0947 \u0915\u0947 \u0932\u093f\u090f \u0935\u093f\u0915\u093e\u0938 \u0938\u092e\u091d',
    role: '\u092d\u0942\u092e\u093f\u0915\u093e \u091a\u0941\u0928\u0947\u0902',
    workerHome: '\u0915\u093e\u0930\u094d\u092f\u0915\u0930\u094d\u0924\u093e \u0939\u094b\u092e',
    focus: '\u0906\u091c \u0915\u093e \u0938\u094d\u092e\u093e\u0930\u094d\u091f \u092b\u094b\u0915\u0938',
    voice: '\u0906\u0935\u093e\u091c \u0905\u0935\u0932\u094b\u0915\u0928',
    photo: '\u092b\u094b\u091f\u094b \u0905\u0935\u0932\u094b\u0915\u0928',
    play: '\u0916\u0947\u0932 \u0917\u0924\u093f\u0935\u093f\u0927\u093f',
    profile: '\u092c\u091a\u094d\u091a\u0947 \u0915\u0940 \u092a\u094d\u0930\u094b\u092b\u093e\u0907\u0932',
    recommend: '\u0917\u0924\u093f\u0935\u093f\u0927\u093f \u0938\u0941\u091d\u093e\u0935',
    caregiver: '\u0905\u092d\u093f\u092d\u093e\u0935\u0915 \u0926\u0943\u0936\u094d\u092f',
    supervisor: '\u0938\u0941\u092a\u0930\u0935\u093e\u0907\u091c\u0930 \u0921\u0948\u0936\u092c\u094b\u0930\u094d\u0921',
    district: '\u091c\u093f\u0932\u093e \u0935\u093f\u0936\u094d\u0932\u0947\u0937\u0923',
    settings: '\u0938\u0947\u091f\u093f\u0902\u0917\u094d\u0938',
    ask: '\u092a\u094d\u0930\u0936\u094d\u0928 \u092a\u0942\u091b\u0947\u0902',
    homeActivity: '\u0906\u091c \u0915\u0940 \u0918\u0930 \u0917\u0924\u093f\u0935\u093f\u0927\u093f',
    language: '\u092d\u093e\u0937\u093e',
  },
}

const children = [
  { name: 'Asha', age: '4y 2m', signal: 'Language expression', risk: 'Medium', score: 62 },
  { name: 'Kabir', age: '5y 1m', signal: 'Fine motor practice', risk: 'Low', score: 78 },
  { name: 'Meena', age: '3y 8m', signal: 'Social turn-taking', risk: 'Watch', score: 55 },
]

const deckSlides = [
  ['ANKUR', 'Phase 1 Hackathon Prototype', 'Every child deserves to be seen before they fall behind.', 'Team name placeholder | Offline-first ECCE developmental copilot'],
  ['The Problem', 'ICDS reality', 'Anganwadi workers carry registers, nutrition duties, preschool activities, home visits, and reporting. Developmental delay signs are often spotted late because observations stay on paper and are hard to synthesize.', 'Pain points: high caseloads, paper register fatigue, limited specialist access, multilingual communities, weak follow-up loops.'],
  ['Our Solution', 'Observe -> Understand -> Act -> Connect', 'ANKUR turns everyday voice notes, activity completion, and local photo checks into six-domain developmental profiles and timely nudges.', 'The product creates a privacy-safe developmental digital twin for each child.'],
  ['AI Architecture', 'On-device pipeline', 'Whisper.cpp / IndicASR -> Gemma 2B classification -> MobileNetV3 TFLite vision -> IndicTrans2 language layer -> Llama 3.2 recommendations.', 'Designed for low bandwidth, local inference, and human-in-the-loop decisions.'],
  ['Key User Flows', 'Three proof points', 'Worker records a Hindi note. Caregiver receives a home nudge. Supervisor checks block-level escalation.', 'Every flow keeps the worker in control and makes the next action simple.'],
  ['Impact & Scale', 'India-scale reach', 'Potential reach: 14 lakh Anganwadi centres and 8 crore children under six.', 'Aligned to POSHAN 2.0 and school readiness goals through earlier developmental visibility.'],
  ['Responsible AI & Equity', 'Built for trust', 'Offline-first, on-device processing, no child photo upload, multilingual UX, low-literacy navigation, differential privacy, and federated learning.', 'Includes USSD fallback and Bluetooth mesh sync for low-connectivity centres.'],
  ['Implementation Plan', 'Three phases', 'Phase 1: prototype. Phase 2: two-district pilot. Phase 3: state rollout.', 'Pilot validates domain tagging, caregiver nudges, supervisor escalation, and privacy-safe analytics.'],
]

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="appShell recovery">
          <section className="screen emptyState" role="alert">
            <Logo />
            <h1>Something needs attention</h1>
            <p>The prototype view could not render. Reload the page to recover the demo state.</p>
            <button className="primary" type="button" onClick={() => window.location.reload()}>
              Reload app
            </button>
          </section>
        </main>
      )
    }
    return this.props.children
  }
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
      // Storage can be unavailable in hardened browser contexts; the in-memory state is still valid.
    }
  }, [key, value])

  return [value, setValue]
}

function Logo() {
  return (
    <div className="logoMark" aria-label="ANKUR logo">
      <span aria-hidden="true">{HINDI.a}</span>
      <div>
        <strong>ANKUR</strong>
        <small>{HINDI.ankur}</small>
      </div>
    </div>
  )
}

function Badge({ children, tone = 'green' }) {
  return <span className={`badge ${tone}`}>{children}</span>
}

const RadarChart = memo(function RadarChart({ lang }) {
  const points = useMemo(() => {
    const center = 120
    const maxRadius = 82
    return domains
      .map((domain, index) => {
        const angle = -Math.PI / 2 + (index * Math.PI * 2) / domains.length
        const radius = (domain.score / 100) * maxRadius
        return `${center + Math.cos(angle) * radius},${center + Math.sin(angle) * radius}`
      })
      .join(' ')
  }, [])

  return (
    <figure className="radarWrap">
      <svg className="radar" viewBox="0 0 240 240" role="img" aria-labelledby="radar-title radar-desc">
        <title id="radar-title">Six-domain developmental radar chart</title>
        <desc id="radar-desc">Asha has strongest physical and socio-emotional scores, with language and literacy needing support.</desc>
        {[30, 55, 82].map((radius) => (
          <polygon
            key={radius}
            points={domains
              .map((_, index) => {
                const angle = -Math.PI / 2 + (index * Math.PI * 2) / domains.length
                return `${120 + Math.cos(angle) * radius},${120 + Math.sin(angle) * radius}`
              })
              .join(' ')}
          />
        ))}
        {domains.map((domain, index) => {
          const angle = -Math.PI / 2 + (index * Math.PI * 2) / domains.length
          return (
            <g key={domain.en}>
              <line x1="120" y1="120" x2={120 + Math.cos(angle) * 88} y2={120 + Math.sin(angle) * 88} />
              <text x={120 + Math.cos(angle) * 108} y={124 + Math.sin(angle) * 108}>
                {domain.en.split(' ')[0]}
              </text>
            </g>
          )
        })}
        <polygon className="radarFill" points={points} />
        <circle cx="120" cy="120" r="4" />
      </svg>
      <figcaption className="domainList">
        {domains.map((domain) => (
          <span key={domain.en}>
            {lang === 'hi' ? domain.hi : domain.en}
            <strong>{domain.score}%</strong>
          </span>
        ))}
      </figcaption>
    </figure>
  )
})

function ShellButton({ icon, label, active, onClick }) {
  return (
    <button className={active ? 'navButton active' : 'navButton'} onClick={onClick} type="button" aria-current={active ? 'page' : undefined}>
      <span aria-hidden="true">{icon}</span>
      <span className="navLabel">{label}</span>
    </button>
  )
}

function PrototypeNav({ current, setCurrent }) {
  return (
    <nav className="screenRail" aria-label="Prototype screens">
      {prototypeScreens.map((screen, index) => (
        <button
          key={screen}
          className={current === index ? 'screenDot active' : 'screenDot'}
          onClick={() => setCurrent(index)}
          type="button"
          aria-current={current === index ? 'step' : undefined}
        >
          <span aria-hidden="true">{index + 1}</span>
          {screen}
        </button>
      ))}
    </nav>
  )
}

function ScreenHeader({ title, meta, badge = 'Six ECCE domains' }) {
  return (
    <header className="screenHeader">
      <div>
        <h2>{title}</h2>
        <p>{meta}</p>
      </div>
      <Badge>{badge}</Badge>
    </header>
  )
}

function Splash({ lang, setScreen }) {
  return (
    <section className="screen splash" aria-labelledby="splash-title">
      <div className="titleCluster">
        <Logo />
        <h1 id="splash-title">{copy[lang].title}</h1>
        <p className="tagline">Every child deserves to be seen before they fall behind.</p>
        <p>{copy[lang].subtitle}</p>
      </div>
      <div className="roleGrid" aria-label={copy[lang].role}>
        {[
          ['Worker', 'Daily observations and activity support', 1],
          ['Caregiver', 'Home nudges in local language', 7],
          ['Supervisor', 'Escalations and block trends', 8],
          ['District', 'Risk clusters and resource planning', 9],
        ].map(([role, desc, target]) => (
          <button className="roleCard interactiveCard" key={role} onClick={() => setScreen(target)} type="button">
            <span className="roleIcon" aria-hidden="true">{role[0]}</span>
            <strong>{role}</strong>
            <small>{desc}</small>
          </button>
        ))}
      </div>
      <Badge tone="amber">Developmental Digital Twin | Offline-first</Badge>
    </section>
  )
}

function WorkerHome({ lang, setScreen }) {
  return (
    <section className="screen" aria-labelledby="worker-title">
      <ScreenHeader title={copy[lang].workerHome} meta="Sevapur AWC 04 | Tuesday morning" />
      <div className="heroBand" role="status" aria-live="polite">
        <div>
          <Badge>Offline ready</Badge>
          <h2 id="worker-title">{copy[lang].focus}</h2>
          <p>Top three children selected from recent observations, missed activities, and readiness signals.</p>
        </div>
        <div className="syncPill">Last sync 18 min ago</div>
      </div>
      <div className="grid two">
        <div className="panel">
          <h3>Priority children</h3>
          {children.map((child) => (
            <button className="childRow interactiveRow" key={child.name} onClick={() => setScreen(5)} type="button">
              <span className="avatar" aria-hidden="true">{child.name[0]}</span>
              <span>
                <strong>{child.name}</strong>
                <small>{child.signal} | {child.age} | readiness {child.score}%</small>
              </span>
              <Badge tone={child.risk === 'Low' ? 'green' : 'amber'}>{child.risk}</Badge>
            </button>
          ))}
        </div>
        <div className="panel quickPanel">
          <h3>Quick Observation</h3>
          <div className="quickGrid" aria-label="Quick observation actions">
            <button onClick={() => setScreen(2)} type="button" aria-label="Start voice observation">Mic<span>Voice</span></button>
            <button onClick={() => setScreen(3)} type="button" aria-label="Start photo observation">Cam<span>Photo</span></button>
            <button onClick={() => setScreen(4)} type="button" aria-label="Open play activity">Play<span>Activity</span></button>
          </div>
          <dl className="summaryStrip">
            <div><dt>Children</dt><dd>42</dd></div>
            <div><dt>Follow-up</dt><dd>7</dd></div>
            <div><dt>Coverage</dt><dd>91%</dd></div>
          </dl>
        </div>
      </div>
    </section>
  )
}

function VoiceScreen({ lang, setScreen, announce }) {
  return (
    <section className="screen" aria-labelledby="voice-title">
      <ScreenHeader title={copy[lang].voice} meta="Hindi note | processed on device" badge="Confidence 87%" />
      <div className="observationLayout">
        <div className="micPanel">
          <button className="micButton" type="button" aria-label="Record voice observation">Mic</button>
          <div className="wave" aria-hidden="true">{Array.from({ length: 18 }).map((_, i) => <span key={i} style={{ '--delay': `${i * 45}ms` }} />)}</div>
          <p id="voice-title">"Asha kahani sunte waqt do shabd dohrati hai, par poora vakya nahi bol paati."</p>
        </div>
        <div className="panel">
          <h3>Live AI Tags</h3>
          <div className="tagStack">
            <Badge tone="amber">Language & Literacy detected</Badge>
            <Badge>Socio-Emotional secondary signal</Badge>
            <Badge tone="slate">Human review recommended</Badge>
          </div>
          <div className="signalCard">
            <strong>Signal</strong>
            <p>Expressive language may need guided sentence-building play.</p>
          </div>
          <button
            className="primary"
            onClick={() => {
              announce('Observation saved. Activity recommendation opened.')
              setScreen(6)
            }}
            type="button"
          >
            Save & Suggest
          </button>
        </div>
      </div>
    </section>
  )
}

function PhotoScreen() {
  return (
    <section className="screen" aria-labelledby="photo-title">
      <ScreenHeader title="Photo Observation" meta="No upload | edge vision model" badge="Privacy-safe" />
      <div className="observationLayout">
        <div className="cameraBox" role="img" aria-label="Camera preview placeholder with local analysis scan">
          <div className="scanLine" aria-hidden="true" />
          <span id="photo-title">Camera frame</span>
          <small>Analysing on device...</small>
        </div>
        <div className="panel" aria-live="polite">
          <div className="shimmer" aria-hidden="true" />
          <h3>Developmental Signal Extracted</h3>
          <p>Child holds crayon with emerging tripod grip and copies a curved line with support.</p>
          <div className="tagStack inlineTags">
            <Badge>Physical: fine motor</Badge>
            <Badge tone="amber">Confidence 81%</Badge>
          </div>
          <p className="privacyNote">Photo processed locally, not uploaded.</p>
        </div>
      </div>
    </section>
  )
}

function PlayScreen({ setScreen, announce }) {
  const [completed, setCompleted] = useState(['Asha', 'Kabir', 'Meena'])
  const toggleChild = (name) => {
    setCompleted((current) => (current.includes(name) ? current.filter((child) => child !== name) : [...current, name]))
  }

  return (
    <section className="screen" aria-labelledby="play-title">
      <ScreenHeader title="Play Activity" meta="Activity: Story Stones" />
      <div className="grid two">
        <div className="activityHero">
          <span aria-hidden="true">Play</span>
          <h2 id="play-title">Story Stones Circle</h2>
          <p>Children pick a picture stone and add one sentence to a group story.</p>
          <Badge tone="amber">Language + socio-emotional signal</Badge>
        </div>
        <div className="panel">
          <h3>Mark Completed</h3>
          {['Asha', 'Kabir', 'Meena', 'Rohan', 'Farida'].map((name) => {
            const checked = completed.includes(name)
            return (
              <label className="checkRow" key={name}>
                <input type="checkbox" checked={checked} onChange={() => toggleChild(name)} />
                <span>{name}</span>
                <small>{checked ? 'Completed' : 'Needs another turn'}</small>
              </label>
            )
          })}
          <button
            className="primary"
            onClick={() => {
              announce(`${completed.length} child profiles updated.`)
              setScreen(5)
            }}
            type="button"
          >
            Update Profiles
          </button>
        </div>
      </div>
    </section>
  )
}

function ProfileScreen({ lang, setScreen }) {
  return (
    <section className="screen" aria-labelledby="profile-title">
      <ScreenHeader title={copy[lang].profile} meta="Asha | 4y 2m | Sevapur AWC 04" />
      <div className="profileGrid">
        <div className="panel chartPanel">
          <RadarChart lang={lang} />
        </div>
        <div className="panel">
          <h3 id="profile-title">Developmental Twin</h3>
          <Badge tone="amber">Concern flag: expressive language</Badge>
          <label className="readinessLabel" htmlFor="readiness">School readiness 64%</label>
          <progress id="readiness" className="readiness" value="64" max="100">64%</progress>
          <div className="timeline">
            <p><strong>Today</strong> Repeated two words during story activity.</p>
            <p><strong>Yesterday</strong> Completed sorting game with peer support.</p>
            <p><strong>May 29</strong> Fine motor grip improving.</p>
          </div>
          <button className="primary" onClick={() => setScreen(6)} type="button">Suggest Activity</button>
        </div>
      </div>
    </section>
  )
}

function RecommendationScreen({ announce }) {
  const [sendHome, setSendHome] = useState(true)
  return (
    <section className="screen" aria-labelledby="recommend-title">
      <ScreenHeader title="Activity Recommendation" meta="Personalised for Asha" />
      <div className="recommendCard">
        <Badge>Targets Language & Literacy</Badge>
        <h2 id="recommend-title">Two-Word Treasure Hunt</h2>
        <p>Ask Asha to find familiar objects and say two-word phrases: "red cup", "big ball", "my bag".</p>
        <div className="difficulty">
          <span>Difficulty</span><strong>Gentle</strong><span>10 minutes</span>
        </div>
        <label className="toggle">
          <input
            type="checkbox"
            checked={sendHome}
            onChange={(event) => {
              setSendHome(event.target.checked)
              announce(event.target.checked ? 'Home nudge enabled.' : 'Home nudge paused.')
            }}
          />
          Send home nudge via WhatsApp / IVR
        </label>
        <div className="fallbacks">
          <Badge tone="amber">USSD fallback</Badge>
          <Badge>Bluetooth mesh sync</Badge>
        </div>
      </div>
    </section>
  )
}

function CaregiverView({ lang, setLang, announce }) {
  const nextLang = lang === 'en' ? 'hi' : 'en'
  return (
    <section className="screen" aria-labelledby="caregiver-title">
      <ScreenHeader title={copy[lang].caregiver} meta="Asha's family view" />
      <div className="toolbarLine">
        <button
          className="chip"
          onClick={() => {
            setLang(nextLang)
            announce(`Language switched to ${nextLang === 'hi' ? 'Hindi' : 'English'}.`)
          }}
          type="button"
        >
          {nextLang === 'hi' ? HINDI.hindi : 'English'}
        </button>
      </div>
      <div className="grid two">
        <div className="panel progressCard">
          <h3 id="caregiver-title">{copy[lang].profile}</h3>
          <strong>Good progress in sharing, sorting, and movement.</strong>
          <p>Practice speaking in short phrases during daily routines.</p>
        </div>
        <div className="panel">
          <h3>{copy[lang].homeActivity}</h3>
          <p>Two-Word Treasure Hunt at home before dinner.</p>
          <button className="primary" type="button" onClick={() => announce('Voice question mode opened.')}>{copy[lang].ask}</button>
        </div>
      </div>
    </section>
  )
}

function SupervisorDashboard() {
  return (
    <section className="screen" aria-labelledby="supervisor-title">
      <ScreenHeader title="Supervisor Dashboard" meta="Rampur block | CDPO view" />
      <div className="metricGrid" aria-label="Block-level trends">
        {['Language watchlist 18%', 'Coverage 91%', 'Sync gaps 3 AWCs', 'Escalations 24'].map((metric) => <div className="metric" key={metric}>{metric}</div>)}
      </div>
      <div className="grid two">
        <div className="panel">
          <h3 id="supervisor-title">Children Needing Escalation</h3>
          {children.map((child) => <div className="childRow static" key={child.name}><span className="avatar" aria-hidden="true">{child.name[0]}</span><strong>{child.name}</strong><Badge tone="amber">{child.signal}</Badge></div>)}
        </div>
        <div className="panel">
          <h3>Worker Coverage Heatmap</h3>
          <div className="heatTiles" role="img" aria-label="Coverage heatmap showing mixed coverage across thirty Anganwadi centres">
            {Array.from({ length: 30 }).map((_, i) => <span className={`heat h${i % 4}`} key={i} />)}
          </div>
          <div className="bars" aria-label="AWC comparison bar chart">
            {['AWC 04', 'AWC 12', 'AWC 18', 'AWC 21'].map((label, i) => <p key={label}><span style={{ width: `${92 - i * 13}%` }} aria-hidden="true" />{label}</p>)}
          </div>
        </div>
      </div>
    </section>
  )
}

function DistrictAnalytics() {
  return (
    <section className="screen" aria-labelledby="district-title">
      <ScreenHeader title="District Analytics" meta="State ECCE team | privacy-preserving aggregates" />
      <div className="districtGrid">
        <div className="mapPanel" role="img" aria-label="District heatmap with risk clusters highlighted">
          {Array.from({ length: 42 }).map((_, i) => <span className={`districtCell d${i % 5}`} key={i} />)}
        </div>
        <div className="panel">
          <h3 id="district-title">Risk Clusters</h3>
          <div className="tagStack inlineTags">
            <Badge tone="amber">Language delay cluster: 6 blocks</Badge>
            <Badge>Fine motor support: 3 blocks</Badge>
          </div>
          <div className="trendLine" role="img" aria-label="Three-month trend line improving gradually"><span /></div>
          <div className="resourceCard">Deploy story kits and speech-play modules to Rampur and Narela blocks.</div>
          <div className="resourceCard">Schedule mobile mentoring visit for 11 low-sync AWCs.</div>
        </div>
      </div>
    </section>
  )
}

function Settings({ lang, setLang, theme, setTheme, highContrast, setHighContrast, fontScale, setFontScale, announce }) {
  return (
    <section className="screen" aria-labelledby="settings-title">
      <ScreenHeader title={copy[lang].settings} meta="Privacy, sync, roles, and accessibility" />
      <div className="settingsGrid">
        <div className="panel">
          <h3 id="settings-title">{copy[lang].language}</h3>
          <label className="fieldLabel" htmlFor="language-select">App language</label>
          <select id="language-select" value={lang} onChange={(event) => setLang(event.target.value)}>
            <option value="en">English</option>
            <option value="hi">Hindi / {HINDI.hindi}</option>
          </select>
          <Badge tone="amber">Regional packs ready</Badge>
        </div>
        <div className="panel">
          <h3>Appearance</h3>
          <label className="fieldLabel" htmlFor="theme-select">Theme</label>
          <select id="theme-select" value={theme} onChange={(event) => setTheme(event.target.value)}>
            <option value="system">System</option>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
          <label className="toggle">
            <input type="checkbox" checked={highContrast === 'true'} onChange={(event) => setHighContrast(String(event.target.checked))} />
            High contrast mode
          </label>
          <label className="fieldLabel" htmlFor="font-scale">Font scale: {fontScale}%</label>
          <input id="font-scale" type="range" min="90" max="125" step="5" value={fontScale} onChange={(event) => setFontScale(event.target.value)} />
        </div>
        <div className="panel">
          <h3>Offline Sync</h3>
          <p>23 observations queued. Next sync when network is stable.</p>
          <button className="secondary" type="button" onClick={() => announce('Manual sync queued for the next available network.')}>Retry sync</button>
          <Badge>End-to-end encrypted</Badge>
        </div>
        <div className="panel">
          <h3>Data Privacy Controls</h3>
          <label className="toggle"><input type="checkbox" defaultChecked /> On-device photo analysis only</label>
          <label className="toggle"><input type="checkbox" defaultChecked /> Differential privacy for district analytics</label>
        </div>
      </div>
    </section>
  )
}

function Prototype({ lang, setLang, settings, announce }) {
  const [screen, setScreenValue] = useState(0)
  const setScreen = (index) => setScreenValue(clamp(index, 0, prototypeScreens.length - 1))
  const screens = [
    <Splash lang={lang} setScreen={setScreen} />,
    <WorkerHome lang={lang} setScreen={setScreen} />,
    <VoiceScreen lang={lang} setScreen={setScreen} announce={announce} />,
    <PhotoScreen />,
    <PlayScreen setScreen={setScreen} announce={announce} />,
    <ProfileScreen lang={lang} setScreen={setScreen} />,
    <RecommendationScreen announce={announce} />,
    <CaregiverView lang={lang} setLang={setLang} announce={announce} />,
    <SupervisorDashboard />,
    <DistrictAnalytics />,
    <Settings lang={lang} setLang={setLang} {...settings} announce={announce} />,
  ]

  return (
    <div className="prototypeWrap">
      <PrototypeNav current={screen} setCurrent={setScreen} />
      <div className="screenStage">{screens[screen]}</div>
    </div>
  )
}

function Deck() {
  const [slide, setSlide] = useState(0)
  const [title, eyebrow, body, detail] = deckSlides[slide]
  const goToSlide = (delta) => setSlide((current) => clamp(current + delta, 0, deckSlides.length - 1))

  return (
    <section className="deckView" aria-labelledby="deck-title">
      <div className="slideCard">
        <Badge tone="amber">Slide {slide + 1} / {deckSlides.length}</Badge>
        <p className="eyebrow">{eyebrow}</p>
        <h1 id="deck-title">{title}</h1>
        <p className="slideBody">{body}</p>
        <p className="slideDetail">{detail}</p>
        {slide === 3 && <Pipeline />}
        {slide === 7 && <Timeline />}
      </div>
      <div className="deckControls">
        <button onClick={() => goToSlide(-1)} type="button" disabled={slide === 0}>Prev</button>
        <button onClick={() => goToSlide(1)} type="button" disabled={slide === deckSlides.length - 1}>Next</button>
      </div>
    </section>
  )
}

function Pipeline() {
  return <div className="pipeline" aria-label="AI architecture pipeline">{['Voice', 'ASR', 'Classify', 'Vision', 'Translate', 'Recommend'].map((step) => <span key={step}>{step}</span>)}</div>
}

function Timeline() {
  return <div className="timelineViz" aria-label="Implementation timeline">{['Prototype', '2-district pilot', 'State rollout'].map((step) => <span key={step}>{step}</span>)}</div>
}

function DemoScript() {
  return (
    <article className="scriptDoc" aria-labelledby="script-title">
      <h1 id="script-title">ANKUR Demo Flow</h1>
      {[
        ['Scene 1', 'Worker opens ANKUR and sees the Daily Smart Focus list with three children selected for attention.'],
        ['Scene 2', 'Worker records a Hindi voice note. The waveform pulses, transcription appears, and Language & Literacy is auto-tagged with confidence.'],
        ['Scene 3', "Worker opens Asha's profile, reviews the six-domain radar chart, school readiness bar, and expressive-language concern flag."],
        ['Scene 4', 'ANKUR suggests Two-Word Treasure Hunt and sends a home nudge through WhatsApp or IVR with USSD fallback.'],
        ['Scene 5', 'Supervisor checks the block dashboard, sees children needing escalation, and identifies AWC coverage gaps.'],
        ['Scene 6', 'District admin views aggregate heatmaps, risk clusters, three-month trends, and resource allocation suggestions.'],
      ].map(([scene, text]) => <section key={scene}><h2>{scene}</h2><p>{text}</p></section>)}
    </article>
  )
}

function About() {
  return (
    <section className="aboutView" aria-labelledby="about-title">
      <Logo />
      <h1 id="about-title">ANKUR: Every child seen early</h1>
      <p>ANKUR is a premium, offline-first developmental intelligence platform for ICDS ecosystems. It supports Anganwadi workers, caregivers, supervisors, district administrators, and state ECCE teams across six developmental domains.</p>
      <div className="pillarGrid">
        {['Observe', 'Understand', 'Act', 'Connect'].map((pillar) => <div className="pillar" key={pillar}>{pillar}</div>)}
      </div>
    </section>
  )
}

function AppContent() {
  const [tab, setTab] = useStoredPreference('ankur-tab', 'prototype')
  const [lang, setLang] = useStoredPreference('ankur-language', 'en')
  const [theme, setTheme] = useStoredPreference('ankur-theme', 'system')
  const [highContrast, setHighContrast] = useStoredPreference('ankur-high-contrast', 'false')
  const [fontScale, setFontScale] = useStoredPreference('ankur-font-scale', '100')
  const [announcement, setAnnouncement] = useState('')

  const safeTab = ['prototype', 'deck', 'script', 'about'].includes(tab) ? tab : 'prototype'
  const safeLang = lang === 'hi' ? 'hi' : 'en'
  const announce = (message) => setAnnouncement(message)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.documentElement.dataset.contrast = highContrast === 'true' ? 'high' : 'normal'
    document.documentElement.style.setProperty('--font-scale', `${Number(fontScale) / 100}`)
  }, [theme, highContrast, fontScale])

  return (
    <main className="appShell">
      <a className="skipLink" href="#main-content">Skip to main content</a>
      <aside className="sidebar" aria-label="Primary">
        <Logo />
        <nav aria-label="Main sections">
          <ShellButton icon="P" label="Prototype" active={safeTab === 'prototype'} onClick={() => setTab('prototype')} />
          <ShellButton icon="D" label="Deck" active={safeTab === 'deck'} onClick={() => setTab('deck')} />
          <ShellButton icon="S" label="Demo Script" active={safeTab === 'script'} onClick={() => setTab('script')} />
          <ShellButton icon="A" label="About ANKUR" active={safeTab === 'about'} onClick={() => setTab('about')} />
        </nav>
        <button className="languageMini" onClick={() => setLang(safeLang === 'en' ? 'hi' : 'en')} type="button">
          {safeLang === 'en' ? HINDI.hindi : 'English'}
        </button>
      </aside>
      <section id="main-content" className="content" tabIndex="-1">
        <div className="srOnly" role="status" aria-live="polite">{announcement}</div>
        {safeTab === 'prototype' && (
          <Prototype
            lang={safeLang}
            setLang={setLang}
            announce={announce}
            settings={{ theme, setTheme, highContrast, setHighContrast, fontScale, setFontScale }}
          />
        )}
        {safeTab === 'deck' && <Deck />}
        {safeTab === 'script' && <DemoScript />}
        {safeTab === 'about' && <About />}
      </section>
    </main>
  )
}

export default function App() {
  return (
    <ErrorBoundary>
      <AppContent />
    </ErrorBoundary>
  )
}
