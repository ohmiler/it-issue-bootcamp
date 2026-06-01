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
    fontSize: "clamp(2.45rem, 4.2vw, 4.25rem)"
    fontWeight: 400
    lineHeight: 1.28
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
  button-slide:
    backgroundColor: "{colors.accent-soft}"
    textColor: "{colors.text-strong}"
    rounded: "{rounded.sm}"
    padding: "8px 12px"
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

This system should feel like a practical teaching workspace: dark, quiet, code-adjacent, and ready for a 4-hour class session. The visual language borrows the comfort of VS Code Dark Plus without turning the course into a terminal cosplay. Reading, diagramming, and following along are the main jobs.

The course-book and slide surfaces share one identity. Document mode supports long-form Thai explanations, checkpoints, code blocks, diagrams, and lesson navigation. Slide mode presents the same MDX content as a full-viewport teaching lens with only the controls needed for live instruction.

The system explicitly rejects a marketing landing page, a decorative slide template, or a colorful showcase that competes with the lesson content. Visual choices must keep workflow diagrams, code, and checkpoints easy to find.

**Key Characteristics:**
- VS Code Dark Plus surfaces with restrained blue accent use.
- One Thai-first sans family across UI, prose, diagrams, and slides.
- Flat tonal layers, 1px borders, and 6-8px corners.
- Document mode for reading and practice, slide mode for live teaching.
- Controls stay predictable and familiar, not novel.

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
- **Slide Display** (400, clamp(2.45rem, 4.2vw, 4.25rem), 1.28): Slide headings. This is the only fluid type role because projection and viewport size matter during teaching. Keep the line height and top padding Thai-safe so vowels and tone marks are not clipped.
- **Headline** (600, 1.45rem, 1.25): MDX section headings and major content divisions.
- **Title** (600, 1.15-1.35rem, 1.3): Card titles, slide subheadings, and compact panel headings.
- **Body** (400, 1rem, 1.75): Thai lesson prose. Keep reading columns comfortable and avoid dense uninterrupted paragraphs.
- **Label** (600, 0.875rem, 1.4, normal tracking): Navigation labels, buttons, checkpoints, and metadata. Uppercase is allowed only for short system labels such as Day or Hour.
- **Code** (400, 1rem, 1.75): Code blocks and inline code.

### Named Rules

**The Thai-First Rule.** IBM Plex Sans Thai is the primary voice. Do not introduce a display face or decorative font for lesson UI.

**The Slide Exception Rule.** Fluid type belongs to slide headings only. Product UI labels, navigation, and document prose stay fixed and predictable.

## 4. Elevation

This system is flat by default. Depth is conveyed through tonal layers, borders, and state changes rather than ambient shadows. Document mode should feel like an editor and notebook. Slide mode uses full-viewport canvas and overlay controls, not floating cards.

### Shadow Vocabulary

- **None at rest** (`box-shadow: none`): The default for panels, navigation, code blocks, tables, diagrams, and slide frames.

### Named Rules

**The No-Ghost-Card Rule.** Do not pair 1px borders with large soft shadows. Use borders and tonal surfaces instead.

**The Overlay-Only Rule.** Blur and translucent gradients are allowed on slide topbar and controls because they protect readability over the full-screen slide canvas. Do not use glass effects as decoration elsewhere.

## 5. Components

### Buttons

- **Shape:** Compact rectangular controls with gently curved corners (6px radius). Icon buttons use 8px radius.
- **Primary:** Workbench Blue background, Strong White text, 8px by 16px padding, 600 label weight.
- **Slide Mode Button:** Soft Selection Blue background, Workbench Blue border, Strong White text, 8px by 12px padding.
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

### Inputs / Fields

- **Style:** Learner project examples should mirror the same vocabulary: dark panel fill, 1px border, 6px radius, clear label above or near the field.
- **Focus:** Instruction Blue border or outline. Never rely on color alone without visible focus geometry.
- **Error / Disabled:** Error states should be explicit in text. Disabled controls should reduce opacity but remain legible.

### Navigation

- **Sidebar:** 320px desktop rail, Panel Charcoal background, 1px right border, sticky at desktop.
- **Lesson Links:** 14px labels, 8px by 12px padding, 6px radius. Active links use Soft Selection Blue fill and Workbench Blue border.
- **Top Links:** Simple breadcrumb-style links with hover color moving to Instruction Blue.
- **Pager:** Two bordered cards at the end of a lesson, with directional icons and hover border state.

### Lesson Prose

Lesson prose is the signature component. Headings, paragraphs, lists, code blocks, diagrams, and tables must stay readable as one continuous teaching flow. Bullets use Instruction Blue markers. Tables are wrapped in a scroll container with a visible border. Inline code uses Soft Panel Charcoal background and Code String text. Mermaid is appropriate for compact sequence diagrams and document-friendly diagrams; wide teaching flows should use the reusable Teaching Flow Diagram component so slide mode can switch from horizontal to stacked layouts without shrinking text.

### Slide Deck

Slide mode is a full-viewport teaching surface. The slide canvas is 100vw by 100svh with content padded away from fixed overlays. Slide headings should contain only the content title; slide position stays in the topbar beside the Document action. Dense document sections can use `{/* slide-break: Title */}` to split the same MDX into smaller teaching beats in slide mode without fragmenting the document page. Workflow diagrams must remain readable when projected: keep wide Teaching Flow Diagrams horizontal on projector-sized screens, stack them on mobile, and reserve Mermaid for diagrams that keep legible geometry at slide size. Topbar and controls use fixed positioning, translucent dark gradients, 14px backdrop blur, and 1px borders. Slide controls are familiar, icon-led, and minimal.

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
