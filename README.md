# COS 106 – Introduction to Web Technologies (Practical Term Project)

**Project Title:** Design and Develop a Responsive Student Portfolio and Academic Management Website  
**Student Name:** Apaokagi Ashraf Abdulquadir  
**Programme:** B.Sc Cybersecurity, MIVA Open University  
**Location:** F.C.T Abuja, Nigeria  
**GitHub Repository:** [https://github.com/JOAT-Official/csc-106-lab](https://github.com/JOAT-Official/csc-106-lab)  

---

## 1. Project Overview
This repository contains a complete, multi-page **Responsive Student Portfolio and Academic Management Website** built with semantic **HTML5**, an external **CSS3** stylesheet (`css/styles.css`), and modular **JavaScript** (`js/main.js`, `js/planner.js`, `js/contact.js`).

It follows a **Minimalist Editorial Monochrome** design system (high-contrast charcoal, warm off-white paper surfaces, architectural hairline borders, and a warm amber accent) with support for both Light and Dark modes.

---

## 2. Multi-Page Structure & Functional Requirements Mapping

| Page | File | Key Functional Elements Implemented |
| :--- | :--- | :--- |
| **1. Homepage** | [`index.html`](./index.html) | Student name (**Apaokagi Ashraf Abdulquadir**), portrait photograph (`assets/profile.jpg`), welcome message, responsive navigation menu, brief biography, and featured projects overview. |
| **2. About Me Page** | [`about.html`](./about.html) | Educational background (**B.Sc Cybersecurity at MIVA Open University**), Current Semester Coursework table (`CSC 106`, `COS 102`, `COS 111`, `MATH 102`, `PHY 108`, `PHY 102`, `GST 112`, `GST 122`), Career Aspirations, Technical Skills & Tools, Work Experience (NITDA, Genius Hub, BetaaWork), Certifications table, Hobbies & Interests, and HTML5 `<audio>` multimedia element. |
| **3. Projects Page** | [`projects.html`](./projects.html) | Displays 4 projects (**Insurafix**, **Local Roots**, **Franchise OS**, and **NITDA M&E Platform**) with custom UI mockup screenshots (`assets/project-*.svg`), detailed descriptions, tech stack tags, interactive Case Study modal, and simulated live/repository links. |
| **4. Academic Planner** | [`planner.html`](./planner.html) | Interactive JavaScript task management system allowing users to **Add tasks**, **Mark tasks as completed**, and **Delete tasks** with `localStorage` persistence and live counters, plus a Weekly Semester Study Timetable (`<table>`). |
| **5. Contact Page** | [`contact.html`](./contact.html) | Direct contact coordinates and an interactive form (**Name**, **Email Address**, **Phone Number**, **Message**) with JavaScript validation ensuring no field is empty, email format is valid, and phone number contains **only digits**. |

---

## 3. Technical Requirements Checklist

### HTML5 Requirements
- **Semantic Elements:** `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<figure>`, `<figcaption>`, `<footer>`.
- **Forms:** Task Planner creation form (`planner.html`) and Contact validation form (`contact.html`).
- **Tables:** Current Semester Coursework & Certifications tables (`about.html`) and Weekly Study Timetable (`planner.html`).
- **Images:** Portrait photograph (`assets/profile.jpg`) and 4 custom SVG UI mockups (`assets/project-*.svg`).
- **Hyperlinks:** Persistent multi-page navigation bar, footer links, resume PDF link, and project links.
- **Lists:** Semantic unordered (`<ul>`) and list items (`<li>`) for navigation, skills, coursework highlights, and dynamic tasks.
- **Multimedia:** HTML5 `<audio controls>` element (`about.html` linked to `assets/audio-intro.wav`).

### CSS3 Requirements
- **External Stylesheet:** [`css/styles.css`](./css/styles.css) linked across all 5 HTML pages.
- **Responsive Design & Mobile-Friendly Interface:** Media queries at `1024px`, `768px` (collapsible mobile menu), and `480px`.
- **CSS Grid & Flexbox:** Used throughout hero layouts, card grids, navigation headers, task rows, and contact columns.
- **Animations & Transitions:** `@keyframes fadeUp` and `@keyframes pulseDot`, plus smooth hover transitions on cards, buttons, and links.
- **Consistent Colour Scheme:** Minimalist Editorial Monochrome using CSS custom properties (`--bg-primary`, `--text-primary`, `--accent-primary`) with Light/Dark theme switching.

### JavaScript Requirements
- **Event Handling & DOM Manipulation:** Implemented across [`js/main.js`](./js/main.js), [`js/planner.js`](./js/planner.js), and [`js/contact.js`](./js/contact.js).
- **Arrays & Functions:** `tasks` array in `js/planner.js` manipulated via modular functions (`addTask`, `toggleTaskCompletion`, `deleteTask`, `renderTasks`, `updateCounters`).
- **Form Validation:** `js/contact.js` validates non-empty inputs, valid email syntax, and strict digits-only phone numbers (`/^\d+$/`).

---

## 4. Local Preview & Deployment (Vercel / GitHub Pages)

### Local Preview
Open [`index.html`](./index.html) directly in any modern browser, or serve the folder locally:
```bash
python -m http.server 8080
```
Then open `http://localhost:8080`.

### Deploying on Vercel
1. Import [`https://github.com/JOAT-Official/csc-106-lab`](https://github.com/JOAT-Official/csc-106-lab) into [Vercel](https://vercel.com/new) (Framework Preset: **Other** / Static HTML).
2. Click **Deploy** — Vercel will automatically serve `index.html` and all static pages at the root domain.
