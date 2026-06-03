# ANKUR

ANKUR is an offline-first developmental intelligence prototype for the ICDS and Anganwadi ecosystem. It helps frontline workers observe children during everyday activities, turn those observations into six-domain developmental signals, recommend simple follow-up activities, and share privacy-conscious insights with caregivers, supervisors, and district teams.

The prototype is built as an interactive React + Vite application and includes a product walkthrough, pitch deck, demo script, and role-based screens for workers, caregivers, supervisors, and administrators.

## Why ANKUR

Early childhood development gaps are often noticed too late because observations are scattered across registers, memory, home visits, and limited specialist access. ANKUR demonstrates how a lightweight digital companion can help Anganwadi workers capture meaningful signals earlier and convert them into practical next steps.

The product concept focuses on:

- Offline-first workflows for low-connectivity centers
- Simple observation capture through voice, photo, and play activity flows
- Six-domain developmental profiles for every child
- Local-language caregiver nudges
- Supervisor escalation views and district-level analytics
- Privacy-preserving design with local processing as a core principle

## Prototype Highlights

- **Role-based experience**: Worker, caregiver, supervisor, district, and settings views.
- **Bilingual interface**: English and Hindi content paths for key user flows.
- **Voice observation flow**: Simulates Hindi note capture, on-device tagging, and activity recommendation.
- **Photo observation flow**: Demonstrates privacy-safe local analysis for fine motor signals.
- **Child profile**: Includes six-domain radar visualization, readiness progress, and timeline.
- **Personalized recommendations**: Suggests home and center activities based on developmental signals.
- **Supervisor dashboard**: Shows block-level coverage, escalation, and sync indicators.
- **District analytics**: Presents aggregate risk clusters and resource-planning suggestions.
- **Built-in deck and script**: Includes hackathon-ready pitch slides and a guided demo narrative.

## Tech Stack

- React 19
- Vite 8
- JavaScript
- CSS
- ESLint

## Getting Started

### Prerequisites

- Node.js 20 or newer
- npm

### Installation

```bash
npm install
```

### Run Locally

```bash
npm run dev
```

The app will start on the local Vite development server. Open the URL shown in your terminal, usually:

```text
http://localhost:5173
```

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

## Application Sections

| Section | Purpose |
| --- | --- |
| Prototype | Main interactive product walkthrough |
| Deck | Hackathon pitch deck embedded inside the app |
| Demo Script | Scene-by-scene presenter script |
| About ANKUR | Product summary and positioning |

## Product Concept

ANKUR is designed around the loop:

```text
Observe -> Understand -> Act -> Connect
```

1. **Observe**: Capture everyday developmental signals through voice notes, photos, and activity completion.
2. **Understand**: Convert observations into domain-level insights with worker review.
3. **Act**: Recommend practical, age-appropriate activities for the center and home.
4. **Connect**: Share updates with caregivers and escalate patterns to supervisors.

## Responsible AI Direction

This repository is a frontend prototype, but the product narrative is grounded in a responsible AI architecture:

- On-device or edge-first processing wherever possible
- Human-in-the-loop review for developmental flags
- No child photo upload in the intended workflow
- Differential privacy for aggregate analytics
- Multilingual and low-literacy interaction patterns
- Offline sync and fallback channels for low-connectivity environments

## Repository Structure

```text
ANKUR/
|-- public/          Static assets
|-- src/             React application source
|   |-- assets/      Images and SVG assets
|   |-- App.jsx      Main prototype experience
|   |-- App.css      Application styling
|   |-- index.css    Global styles
|   `-- main.jsx     React entry point
|-- package.json     Scripts and dependencies
|-- vite.config.js   Vite configuration
`-- README.md        Project documentation
```

## Status

ANKUR is currently a hackathon/prototype implementation. It demonstrates the intended product experience and interaction model, not a production backend or deployed AI pipeline.

## License

See the repository license for usage terms.
