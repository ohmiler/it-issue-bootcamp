---
name: "IT Issue Bootcamp"
description: "A practical VS Code Dark Plus course-book and slide system for a 5-day web application bootcamp."
colors:
  background: "#1e1e1e"
  slide-background: "#1b1b1b"
  panel: "#252526"
  panel-soft: "#2d2d30"
  panel-raised: "#2a2d2e"
  border: "#3c3c3c"
  border-subtle: "#2d2d2d"
  text: "#d4d4d4"
  text-strong: "#ffffff"
  muted: "#858585"
  muted-strong: "#a6a6a6"
  accent: "#007acc"
  accent-strong: "#3794ff"
  accent-soft: "#007acc2e"
  success: "#73c991"
  warning: "#cca700"
  selection: "#264f78"
  code-string: "#ce9178"
typography:
  display:
    fontFamily: "\"IBM Plex Sans Thai\", \"Segoe UI\", Arial, Helvetica, sans-serif"
    fontSize: "3rem"
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: "0"
  slide-display:
    fontFamily: "\"IBM Plex Sans Thai\", \"Segoe UI\", Arial, Helvetica, sans-serif"
    fontSize: "clamp(2rem, 2.9vw, 3.25rem)"
    fontWeight: 400
    lineHeight: 1.3
    letterSpacing: "0"
  slide-body:
    fontFamily: "\"IBM Plex Sans Thai\", \"Segoe UI\", Arial, Helvetica, sans-serif"
    fontSize: "clamp(1.1rem, 1.45vw, 1.45rem)"
    fontWeight: 400
    lineHeight: 1.68
    letterSpacing: "0"
  headline:
    fontFamily: "\"IBM Plex Sans Thai\", \"Segoe UI\", Arial, Helvetica, sans-serif"
    fontSize: "1.45rem"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "0"
  body:
    fontFamily: "\"IBM Plex Sans Thai\", \"Segoe UI\", Arial, Helvetica, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.75
    letterSpacing: "0"
  label:
    fontFamily: "\"IBM Plex Sans Thai\", \"Segoe UI\", Arial, Helvetica, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "0"
  code:
    fontFamily: "\"SFMono-Regular\", Consolas, \"Liberation Mono\", monospace"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.75
  slide-code:
    fontFamily: "\"SFMono-Regular\", Consolas, \"Liberation Mono\", monospace"
    fontSize: "clamp(0.95rem, 1.32vw, 1.3rem)"
    fontWeight: 400
    lineHeight: 1.45
rounded:
  none: "0px"
  sm: "6px"
  md: "8px"
  pill: "999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "20px"
  xxl: "32px"
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.text-strong}"
    rounded: "{rounded.sm}"
    padding: "8px 16px"
  button-primary-hover:
    backgroundColor: "{colors.accent-strong}"
    textColor: "{colors.text-strong}"
  button-secondary:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.text-strong}"
    rounded: "{rounded.sm}"
    padding: "8px 16px"
  nav-active:
    backgroundColor: "{colors.accent-soft}"
    textColor: "{colors.text-strong}"
    rounded: "{rounded.sm}"
    padding: "8px 12px"
  card-default:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.text}"
    rounded: "{rounded.sm}"
    padding: "20px"
  code-block:
    backgroundColor: "{colors.background}"
    textColor: "{colors.text}"
    rounded: "{rounded.md}"
    padding: "16px"
---

# Design System: IT Issue Bootcamp

## 1. Overview

**Creative North Star: "The Instructor Workbench"**

This system should feel like a practical teaching workspace: dark, quiet, code-adjacent, and ready for a 4-hour class session. The visual language borrows the comfort of VS Code Dark Plus without turning the course into a terminal cosplay: it keeps the palette, the activity bar, and the lesson sidebar, but no pretend editor chrome. Reading, diagramming, and following along are the main jobs.

The course-book and slide surfaces share one identity. Document mode supports long-form Thai explanations, checkpoints, code blocks, diagrams, and lesson navigation. Slide mode presents the same MDX content as a full-viewport teaching lens with only the controls needed for live instruction.

The system explicitly rejects a marketing landing page, a decorative slide template, or a colorful showcase that competes with the lesson content. Visual choices must keep workflow diagrams, code, and checkpoints easy to find.

**Key Characteristics:**
- VS Code Dark Plus surfaces with restrained blue accent use.
- One Thai-first sans family across UI, prose, diagrams, and slides.
- Flat tonal layers, 1px borders, and 6-8px corners.
- Document mode for reading and practice, slide mode for live teaching.
- Controls stay predictable and familiar, not novel.
- Every element that looks interactive works; nothing is there only to imitate an editor.
- Interface text is Thai; English stays only for technical names and code.

## 2. Colors

The palette is a restrained dark product system: near-black background, nested charcoal panels, blue state accents, and semantic colors used only when they carry meaning.

### Primary

- **Workbench Blue**: The primary accent. Use it for primary actions, active navigation, slide progress, diagram edges, and selected states.
- **Instruction Blue**: The brighter accent. Use it for hover states, current lesson emphasis, icons, links, and diagram lines.
- **Soft Selection Blue**: The soft accent fill. Use it for active lesson rows, slide mode links, block selection, and lightweight emphasis.

### Secondary

- **Operational Green**: The success color. Use it for completed checkpoints, positive state icons, and safe confirmations.
- **Review Amber**: The warning color. Use it for warnings, Mermaid render errors, and instructor review callouts.

### Neutral

- **Editor Background**: The page background and code-adjacent base.
- **Slide Canvas**: The full-screen slide background. It is slightly deeper than document background so projected slides feel anchored.
- **Panel Charcoal**: Sidebar, lesson headers, cards, table wrappers, and diagram containers.
- **Soft Panel Charcoal**: Hover surfaces and table headers.
- **Raised Panel Charcoal**: Nested lesson metadata and repeated items.
- **Editor Border**: The default 1px border for panels, tables, code blocks, diagram frames, and slide controls.
- **Text Gray**: The primary body text.
- **Strong White**: Headings, active labels, and text that needs immediate attention.
- **Muted Gray**: Secondary labels. Use it sparingly because low-contrast muted text becomes tiring in long lessons.

### Named Rules

**The Accent-Earns-Its-Place Rule.** Blue is for action, current position, links, and diagrams. Do not use blue as decoration.

**The Dark-Layer Rule.** Depth comes from tonal steps: background, panel, raised panel, soft panel. Do not introduce unrelated tinted neutrals.

## 3. Typography

**Display Font:** IBM Plex Sans Thai with Segoe UI, Arial, Helvetica fallback  
**Body Font:** IBM Plex Sans Thai with Segoe UI, Arial, Helvetica fallback  
**Label/Mono Font:** SFMono-Regular, Consolas, Liberation Mono for code

**Character:** One Thai-first sans family keeps the interface practical and coherent. Weight, spacing, and scale create hierarchy. Font switching is reserved for code.

### Hierarchy

- **Display** (700, 3rem, 1.05): Course and lesson page titles. Use only at the top of a page or major section.
- **Slide Display** (400, clamp(2rem, 2.9vw, 3.25rem), 1.3): Slide headings, about 40px at 1366x768. Keep the line height and top padding (0.12em) Thai-safe so vowels and tone marks are not clipped. `scripts/verify-diagrams.mjs` checks this rule.
- **Slide Body** (400, clamp(1.1rem, 1.45vw, 1.45rem), 1.68): Slide paragraphs, list items, and the action callout, about 20px at 1366x768. The action line must never be smaller than the bullets under it.
- **Headline** (600, 1.45rem, 1.25): MDX section headings and major content divisions.
- **Title** (600, 1.15-1.35rem, 1.3): Card titles, slide subheadings, and compact panel headings.
- **Body** (400, 1rem, 1.75): Thai lesson prose. Keep reading columns comfortable and avoid dense uninterrupted paragraphs.
- **Label** (600, 0.875rem, 1.4, normal tracking): Navigation labels, buttons, checkpoints, and metadata such as "Day 3 / ชั่วโมงที่ 3".
- **Code** (400, 1rem, 1.75): Code blocks and inline code in document mode.
- **Slide Code** (400, clamp(0.95rem, 1.32vw, 1.3rem), 1.45): Code blocks in slide mode, about 18px at 1366x768. The code box is `min(52svh, 25rem)` tall, which shows about 14 lines; longer code is split across slides.

### Named Rules

**The Thai-First Rule.** IBM Plex Sans Thai is the primary voice. Do not introduce a display face or decorative font for lesson UI.

**The Slide Exception Rule.** Fluid type belongs to slide mode only (headings, body, and code). Product UI labels, navigation, and document prose stay fixed and predictable.

**The Thai Interface Rule.** Buttons, labels, navigation, page titles, and screen-reader labels are written in Thai. Lesson titles shown in the UI come from each lesson's "Day N - ชั่วโมงที่ N: ..." line in its MDX file, so a title changes in one place.

## 4. Elevation

This system is flat by default. Depth is conveyed through tonal layers, borders, and state changes rather than ambient shadows. Document mode should feel like an editor and notebook. Slide mode uses full-viewport canvas and overlay controls, not floating cards.

### Shadow Vocabulary

- **None at rest** (`box-shadow: none`): The default for panels, navigation, code blocks, tables, diagrams, and slide frames.
- **Popover** (`0 12px 32px rgba(0, 0, 0, 0.45)`): Only for menus that float over content, such as the slide picker.

### Named Rules

**The No-Ghost-Card Rule.** Do not pair 1px borders with large soft shadows on cards or panels. Use borders and tonal surfaces instead. A floating popover is the one exception, because it must read as above the page.

**The Overlay-Only Rule.** Blur and translucent gradients are allowed on slide topbar and controls because they protect readability over the full-screen slide canvas. Do not use glass effects as decoration elsewhere.

## 5. Components

### Buttons

- **Shape:** Compact rectangular controls with gently curved corners (6px radius). Icon buttons use 8px radius.
- **Primary:** Workbench Blue background, Strong White text, 8px by 16px padding, 600 label weight.
- **Slide Mode Button:** The "เปิดสไลด์" button in the lesson header uses the Primary style. In slide mode, the "เอกสาร" command and the "ต่อ Day N / ชั่วโมงที่ N" link use the Secondary style.
- **Hover / Focus:** Shift border or background toward Instruction Blue. Keep transitions at 150-180ms and avoid motion beyond state feedback.
- **Secondary:** Panel background with Editor Border and Strong White text.

### Chips

- **Style:** The system does not use decorative chips as a core primitive. Status-like labels should use semantic color only when they express state, not ornament.

### Cards / Containers

- **Corner Style:** Small radius (6px on cards, 8px on tables, diagrams, and code blocks).
- **Background:** Panel Charcoal for primary containers; Raised Panel Charcoal for nested repeated items.
- **Shadow Strategy:** No shadows at rest. Use border and tonal difference.
- **Border:** 1px Editor Border or Border Subtle.
- **Internal Padding:** 12px for compact list links, 16px for code and diagrams, 20px for lesson headers and day cards.

### Code Blocks

- **Copy Button:** Every code block except `text` blocks has a small "คัดลอก" button in its top-right corner that changes to "คัดลอกแล้ว" after copying. It stays visible, not hover-only, because beginners will not look for it.
- **Changed Code:** `CodeChange` blocks mark added lines in green with `+` and removed lines in red with `−`. The markers are not selectable, and the copy button copies only the lines to keep. A block where every line is removed has no copy button.

### Inputs / Fields

- **Style:** Learner project examples should mirror the same vocabulary: dark panel fill, 1px border, 6px radius, clear label above or near the field.
- **Focus:** Instruction Blue border or outline. Never rely on color alone without visible focus geometry.
- **Error / Disabled:** Error states should be explicit in text. Disabled controls should reduce opacity but remain legible.

### Navigation

- **Title Bar:** A thin bar with the "IT Issue Bootcamp" mark that links home. No menus, window buttons, file tabs, or status bar.
- **Activity Bar:** Icon links for หน้าแรก (house), คำศัพท์ (book), and แนวทางต่อยอด (lightbulb), plus a link to the first lesson at the bottom. Each icon has a Thai tooltip, and only the current section is highlighted.
- **Sidebar:** A 17-20rem rail titled "บทเรียน", Panel Charcoal background, 1px right border. From 1021px wide, the page is fixed to the viewport height so the sidebar and the lesson content scroll separately, and the sidebar scrolls to the open lesson. Below 1021px the sidebar is hidden.
- **Lesson Links:** Grouped under "Day N" with the day's title. Each link shows a small "ชั่วโมงที่ N" label above the Thai lesson title. Active links use Soft Selection Blue fill and Workbench Blue border.
- **Lesson Outline:** Under the open lesson, the sidebar lists its slides as anchor links (`#slide-N`) and highlights the slide being read. Below 1021px the same list appears as a collapsible "สไลด์ในชั่วโมงนี้" box under the lesson header.
- **Breadcrumbs:** A real trail such as "หน้าแรก / Day 3 / ชั่วโมงที่ 3". Only earlier steps are links; the current page is plain text.
- **Pager:** Two bordered cards at the end of a lesson ("ชั่วโมงก่อนหน้า" and "ชั่วโมงถัดไป"), with directional icons and hover border state.

### Lesson Prose

Lesson prose is the signature component. Headings, paragraphs, lists, code blocks, diagrams, and tables must stay readable as one continuous teaching flow. Bullets use Instruction Blue markers. Tables are wrapped in a scroll container with a visible border. Inline code uses Soft Panel Charcoal background and Code String text. Mermaid is appropriate for compact sequence diagrams and document-friendly diagrams; wide teaching flows should use the reusable Teaching Flow Diagram component so slide mode can switch from horizontal to stacked layouts without shrinking text.

### Slide Deck

Slide mode is a full-viewport teaching surface. The slide canvas is 100vw by 100svh with content padded away from fixed overlays. Slide headings should contain only the content title. The topbar shows the Thai lesson title, the "เอกสาร" command, which returns to the same slide in the document, and the slide counter. The counter is a button that opens a slide picker for jumping to any slide. On the last slide, the next button becomes a "ต่อ Day N / ชั่วโมงที่ N" link to the next hour's slides. The arrow-key hint is plain text, not a bordered box, and is hidden on narrow screens. Dense document sections can use `{/* slide-break: Title */}` to split the same MDX into smaller teaching beats in slide mode without fragmenting the document page. Workflow diagrams must remain readable when projected: keep wide Teaching Flow Diagrams horizontal on projector-sized screens, stack them on mobile, and reserve Mermaid for diagrams that keep legible geometry at slide size. Topbar and controls use fixed positioning, translucent dark gradients, 14px backdrop blur, and 1px borders. Slide controls are familiar, icon-led, and minimal.

## 6. Do's and Don'ts

### Do:

- **Do** preserve the VS Code Dark Plus palette: Editor Background, Panel Charcoal, Text Gray, Strong White, and Workbench Blue.
- **Do** use the accent only for action, current position, links, diagrams, progress, and semantic state.
- **Do** keep long Thai prose readable with comfortable line height, clear heading scale, and predictable spacing.
- **Do** make slide mode feel like the same content in a live-teaching format, not a separate deck with separate copy.
- **Do** keep diagrams, tables, and code blocks visible, bordered, and easy to scan.
- **Do** respect reduced motion and keep transitions limited to state feedback.

### Don't:

- **Don't** make the site feel like a marketing landing page.
- **Don't** make the site feel like a decorative slide template.
- **Don't** make the site feel like a colorful showcase that competes with the lesson content.
- **Don't** hide core workflow diagrams, code, or checkpoints behind visual flourishes.
- **Don't** introduce ornamental layouts, noisy effects, generic course-platform styling, or dense pages where learners cannot tell what to do next.
- **Don't** use gradient text, oversized rounded cards, side-stripe borders, or large soft drop shadows.
- **Don't** add imitation editor chrome: fake menus, window buttons, file names such as `hour-1.mdx`, file tabs, status bars, or collapse chevrons that do not collapse.
