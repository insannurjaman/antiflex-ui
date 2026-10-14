---
name: 'Chamfer UI'
description: 'Precision UI for SaaS teams'
colors:
  canvas: '#ffffff'
  surface: '#ffffff'
  subtle: '#f5f7f9'
  inset: '#fbfcfd'
  foreground: '#131c27'
  muted: '#617083'
  border: '#dce2e8'
  border-strong: '#bac5d0'
  accent: '#06677e'
  accent-hover: '#10313d'
  accent-soft: '#e9f9fc'
  accent-foreground: '#ffffff'
  focus: '#07819c'
  success: '#21754c'
  success-soft: '#eaf7f0'
  warning: '#895915'
  warning-soft: '#fff5e3'
  danger: '#b53649'
  danger-soft: '#ffedef'
  dark-canvas: '#0c131d'
  dark-surface: '#131c27'
  dark-subtle: '#202c3a'
  dark-inset: '#0c131d'
  dark-foreground: '#f5f7f9'
  dark-muted: '#bac5d0'
  dark-border: '#344254'
  dark-border-strong: '#617083'
  dark-accent: '#48cce3'
  dark-accent-hover: '#cdf1f8'
  dark-accent-soft: '#10313d'
  dark-accent-foreground: '#0c131d'
  dark-focus: '#48cce3'
  dark-success: '#61d6a0'
  dark-success-soft: '#153629'
  dark-warning: '#f4c46b'
  dark-warning-soft: '#3b2c16'
  dark-danger: '#ff8d9b'
  dark-danger-soft: '#3d202b'
typography:
  display:
    fontFamily: 'IBM Plex Sans, sans-serif'
    fontSize: '62px'
    fontWeight: 500
    lineHeight: 1.07
    letterSpacing: '-2.2px'
  headline:
    fontFamily: 'IBM Plex Sans, sans-serif'
    fontSize: '42px'
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: '-1.4px'
  title:
    fontFamily: 'IBM Plex Sans, sans-serif'
    fontSize: '28px'
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: '-0.8px'
  body:
    fontFamily: 'IBM Plex Sans, sans-serif'
    fontSize: '14px'
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: 'IBM Plex Sans, sans-serif'
    fontSize: '12px'
    fontWeight: 500
    lineHeight: 1.5
  control:
    fontFamily: 'IBM Plex Sans, sans-serif'
    fontSize: '14px'
    fontWeight: 500
    lineHeight: 1
  code:
    fontFamily: 'IBM Plex Mono, monospace'
    fontSize: '13px'
    fontWeight: 400
    lineHeight: 1.8
  data:
    fontFamily: 'IBM Plex Mono, monospace'
    fontSize: '27px'
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: '-0.7px'
rounded:
  sm: '4px'
  md: '6px'
spacing:
  '1': '4px'
  '2': '8px'
  '3': '12px'
  '4': '16px'
  '5': '20px'
  '6': '24px'
  '8': '32px'
  '10': '40px'
  '12': '48px'
  '16': '64px'
components:
  button-primary:
    backgroundColor: '{colors.accent}'
    textColor: '{colors.accent-foreground}'
    typography: '{typography.control}'
    rounded: '{rounded.sm}'
    padding: '0 16px'
    height: '36px'
  button-secondary:
    backgroundColor: '{colors.surface}'
    textColor: '{colors.foreground}'
    typography: '{typography.control}'
    rounded: '{rounded.sm}'
    padding: '0 16px'
    height: '36px'
  button-ghost:
    backgroundColor: 'transparent'
    textColor: '{colors.muted}'
    typography: '{typography.control}'
    rounded: '{rounded.sm}'
    padding: '0 16px'
    height: '36px'
  button-danger:
    backgroundColor: '{colors.danger-soft}'
    textColor: '{colors.danger}'
    typography: '{typography.control}'
    rounded: '{rounded.sm}'
    padding: '0 16px'
    height: '36px'
  button-primary-hover:
    backgroundColor: '{colors.accent-hover}'
  field:
    backgroundColor: '{colors.surface}'
    textColor: '{colors.foreground}'
    rounded: '{rounded.sm}'
    padding: '0 12px'
    height: '36px'
  badge-accent:
    backgroundColor: '{colors.accent-soft}'
    textColor: '{colors.accent}'
    typography: '{typography.label}'
    rounded: '{rounded.sm}'
    padding: '2px 8px'
  card-outline:
    backgroundColor: '{colors.surface}'
    rounded: '{rounded.md}'
    padding: '20px'
  navigation-active:
    backgroundColor: '{colors.accent-soft}'
    textColor: '{colors.accent}'
    rounded: '{rounded.sm}'
    padding: '7px 10px'
  table-header:
    backgroundColor: '{colors.inset}'
    textColor: '{colors.muted}'
    typography: '{typography.label}'
    padding: '8px 20px'
    height: '40px'
  table-row:
    textColor: '{colors.foreground}'
    padding: '8px 20px'
    height: '52px'
---

# Design System: Chamfer UI

## Overview

**Creative North Star: "Precision UI for SaaS teams"**

Chamfer UI is a technical, compact system for SaaS designers and React developers. Cool neutral surfaces, restrained cyan, thin borders, and IBM Plex typography make controls and operational data easy to inspect. The original chamfered mark anchors the identity.

The visual thesis is precision across design and code. Semantic tokens own color roles and theme changes; reusable components own repeated geometry and states. This document records the implemented React and documentation styles. Matching Figma remains a product commitment; the prepared import scripts have not run, so live Figma tokens and layouts are not verified.

**Key Characteristics:**

- Technical, compact operational interfaces.
- Cool neutrals with restrained cyan and separate status colors.
- IBM Plex Sans for interface text; IBM Plex Mono for code and data.
- Flat surfaces, thin borders, small control and card corners.
- Native semantics, visible keyboard focus, reduced-motion support.

## Colors

The palette pairs cool, lightly tinted neutrals with a restrained cyan action color. Unprefixed frontmatter colors are the light theme; `dark-` entries are the corresponding dark-theme role mappings. The implemented CSS switches these roles through `data-theme`.

### Primary

- **Action Cyan** (`accent`, `accent-hover`): primary buttons, actionable links, active navigation, and the brand mark.
- **Cyan Tint** (`accent-soft`): selected navigation and accent badges.
- **Action Foreground** (`accent-foreground`): legible text and icons on the solid action color.
- **Focus Cyan** (`focus`): keyboard focus outlines, distinct from resting borders.

### Neutral

- **Canvas and Surface** (`canvas`, `surface`): page background and component surfaces. They coincide in light mode; dark mode separates the deepest canvas from raised surface tone without adding a shadow.
- **Subtle and Inset** (`subtle`, `inset`): quiet hover areas, code containers, table headers, and sidebar backgrounds.
- **Ink and Muted Ink** (`foreground`, `muted`): primary information and supporting text.
- **Thin and Strong Border** (`border`, `border-strong`): structural divisions and the more visible outline around controls.

Green, amber, and red are semantic status pairs (`success`, `warning`, `danger` and their `-soft` backgrounds), not additional brand accents. Every role has an explicit dark counterpart in the frontmatter.

**The Semantic Color Rule.** Use the semantic role for each surface, text, border, action, and status; switch the role mapping with the theme rather than hardcoding a light-mode color into a component.

**The Task Accent Rule.** Use cyan for primary actions, active navigation, links, focus, and the identity mark. Use green, amber, and red to communicate status.

## Typography

**Display and Body Font:** IBM Plex Sans, with a sans-serif fallback.  
**Code and Data Font:** IBM Plex Mono, with a monospace fallback.

The typography is clear and utilitarian. Regular text carries reading content, medium weight establishes hierarchy, and mono distinguishes code and measured information. The built font imports include Sans weights 400, 500, and 600 and Mono weights 400 and 500.

### Hierarchy

- **Display:** the landing headline uses the frontmatter display role; at widths up to 1100px it becomes 50px, and up to 767px it becomes 44px with tighter tracking relaxed to -1.5px.
- **Headline:** documentation titles use the headline role; the mobile size is 34px.
- **Title:** dashboard headings use the title role, becoming 25px on mobile and 32px from 1500px. Repeated specimen headings also use the 28px size, with their own inherited line height.
- **Section headings:** documentation sections use 23px with -0.5px tracking; overview sections use 24px with -0.6px tracking, reducing to 22px on mobile. Panel headings remain compact at 15px, medium weight.
- **Body:** the base interface uses the body role. Documentation reading paragraphs expand line height to 1.8 and cap at 70ch; introductory copy uses 17px/1.7, becoming 15px on mobile.
- **Label and Control:** badges and table headers use the label role. Default buttons use the control role; small buttons use 12px. Fields retain 14px, regular weight, and line height 1.5.
- **Code:** code blocks use the code role; inline code is 0.85em of its surrounding text.
- **Data:** repeated metric values use the data role, reducing to 23px at widths up to 1100px. Amounts and identifiers use Mono at their contextual table size.

**The Plex Role Rule.** Use Sans for reading and controls. Use Mono for code, token names, aligned amounts, and operational metrics.

## Layout

Use a compact spacing rhythm grounded in the frontmatter scale: small gaps within a control, larger gaps between related groups, and generous section divisions. Repeated controls align on 32px, 36px, or 44px heights. Cards default to 20px internal padding, with 12px and 24px alternatives.

The documentation shell uses a 240px sidebar and a flexible content column within a 1440px container. The article column caps at 930px. The reusable application shell uses a 224px sidebar, a 64px topbar, and a flexible main region capped at 1500px; the default main padding is 32px. The landing container caps at 1240px. These are surface-specific implementations, not mandatory dimensions for every future screen.

At widths up to 1100px, secondary dashboard panels stack and headings reflow. At widths up to 767px, documentation and application navigation become disclosure menus, split specimens stack, and metrics become two columns. The application topbar becomes 56px and main padding becomes 20px vertically and 16px horizontally. Wide data tables retain a horizontal scroll container instead of compressing columns beyond readability. From 1500px, the dashboard main padding grows to 40px vertically and 48px horizontally.

## Elevation & Depth

The shipped interface is flat. Depth comes from neutral surface changes, thin dividers, and spacing; cards, code blocks, specimen panels, and navigation do not use box shadows. A declared low-elevation token exists in the token package but is unused in these surfaces, so it is not part of this recorded shadow vocabulary.

**The Flat Surface Rule.** Separate surfaces with neutral tone, spacing, and thin borders. Do not introduce shadows into the existing resting card and shell patterns.

## Shapes

Controls, navigation items, and badges use small corners from `rounded.sm`; cards and recurring container panels use `rounded.md`. The shape language stays compact rather than pill-like. Thin (1px) borders divide table rows, outline fields and cards, and separate shell regions. Circular customer and profile avatars are an established exception to rectangular controls.

The original identity mark uses chamfered outer corners and an inset geometric opening. Preserve the mark's geometry when scaling it. Ordinary cards keep their simple corner radii; the chamfer is an identity asset, not a clipping requirement for every container.

## Components

### Buttons

Compact, explicit actions. The primary, secondary, ghost, and danger variants share the small control radius, medium Sans text, and consistent size heights. Small buttons use 12px text and 12px horizontal padding; medium uses 14px text and 16px padding; large uses 14px text and 20px padding. All use an 8px icon/text gap and 16px icons.

Primary hover changes to `accent-hover`. Secondary and ghost hover use `subtle`. Danger buttons pair `danger-soft` with `danger`, adding a danger border on hover. Disabled and loading buttons use 0.5 opacity and a not-allowed cursor. Loading disables the button and exposes busy state. Button focus uses a 2px focus outline with a 3px offset. State transitions use 120ms; reduced-motion preferences remove them.

### Chips

Badges communicate a readable status rather than behave as toggle controls. The neutral, accent, success, warning, and danger variants pair semantic text with a corresponding quiet background. The default size is the frontmatter label role with 2px vertical and 8px horizontal padding. The compact badge variant uses 11px with 1px vertical and 6px horizontal padding.

### Cards / Containers

Quiet group boundaries. Outline cards use `surface` and a thin `border`; subtle cards use `subtle`. Both use the card corner radius and offer no padding, small, default, or large padding. Keep shadows out of these resting patterns. Tables and previews may use a bordered outer container with overflow clipped to the same card geometry.

### Inputs / Fields

A visible label sits above a flat surface control with the stronger border and small corners. Fields share the button size heights and default to 12px horizontal padding. Placeholder and supporting text use `muted`. Focus on any control child creates a 2px outline with a 3px offset around the field wrapper. Errors change the border and help text to `danger` and preserve the label/help relationship; disabled inputs dim their wrapper to 0.5 opacity. Native selects follow the same compact field treatment.

### Navigation

Documentation sidebar links use 13px Sans, 7px vertical and 10px horizontal padding, and small corners. Resting links are muted; hover adds a subtle background and foreground text; the current link uses cyan tint, cyan text, and medium weight. Header navigation uses a thin cyan underline for the current section. Mobile header links scroll horizontally; sidebar and application navigation use explicit menu disclosure controls. General links and navigation controls keep a visible 2px keyboard focus outline with a 4px offset.

### Tables and Application Shell

Tables are full-width and left-aligned, with subdued 12px medium-weight headers at 40px height and 14px body rows at 52px height. Cells use 8px vertical and 20px horizontal padding with thin row dividers. Hover uses `inset`; final body rows omit the bottom border. Keep native table semantics, captions, and header scope.

The application shell separates navigation and content with thin borders. Its mobile menu exposes expanded state, closes on a navigation link, and returns focus to its trigger on Escape. Skeletons pulse at 1.5s and loading spinners rotate at 0.8s; both stop animating for reduced-motion preferences.

## Do's and Don'ts

### Do:

- **Do** use semantic colors so every component follows the light and dark theme mappings.
- **Do** preserve the small control corners and slightly larger card corners defined in the frontmatter.
- **Do** keep labels, helper text, error text, and keyboard focus connected to the control they explain.
- **Do** use Plex Mono for technical names, code, and data that benefits from alignment.
- **Do** reflow compact grids and reveal mobile navigation without hiding the page content.

### Don't:

- **Don't** enlarge the cyan accent into a decorative background treatment across ordinary panels.
- **Don't** replace flat bordered cards with elevated, heavily rounded containers.
- **Don't** replace the approved chamfered identity mark or the Plex font pairing.
- **Don't** communicate success, warning, or error with color alone; retain a readable label.
- **Don't** treat the prepared Figma import as evidence of a verified live Figma system.
