---
version: 1.0
name: INTROVERT OS Design System
description: A quiet editorial interaction system for a personal digital room. The interface behaves like a private environment rather than a portfolio: observation, spatial exploration, photography, and restrained system feedback form the visual language. UI recedes; images, objects, whitespace, and state changes carry the story.

colors:
  canvas: "#F3F1EC"
  ink: "#171717"
  muted: "#77736C"
  accent: "#FF5A36"
  border: "#D8D5CE"
  dark: "#111111"
  dark-muted: "#B7B3AA"
  dark-border: "#2C2C2C"
  white: "#FFFFFF"
  warm-surface: "#EAE7DF"
  accent-soft: "#FFE4DC"
  overlay: "rgba(17,17,17,0.72)"

typography:
  display:
    fontFamily: "Inter, Noto Sans SC, system-ui, sans-serif"
    fontSize: 64px
    fontWeight: 500
    lineHeight: 1.02
    letterSpacing: -0.055em
  display-mobile:
    fontFamily: "Inter, Noto Sans SC, system-ui, sans-serif"
    fontSize: 40px
    fontWeight: 500
    lineHeight: 1.05
    letterSpacing: -0.045em
  lead:
    fontFamily: "Inter, Noto Sans SC, system-ui, sans-serif"
    fontSize: 22px
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: -0.015em
  body:
    fontFamily: "Inter, Noto Sans SC, system-ui, sans-serif"
    fontSize: 15px
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: -0.005em
  ui:
    fontFamily: "IBM Plex Mono, SFMono-Regular, monospace"
    fontSize: 11px
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: 0.08em
  caption:
    fontFamily: "IBM Plex Mono, SFMono-Regular, monospace"
    fontSize: 10px
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: 0.1em

spacing:
  hairline: 1px
  xs: 8px
  sm: 12px
  md: 20px
  lg: 32px
  xl: 56px
  section: 120px
  room-gutter: clamp(20px, 4vw, 64px)

radius:
  none: 0px
  subtle: 2px
  small: 6px
  medium: 12px

components:
  system-bar:
    background: transparent
    height: 56px
    padding: "0 {spacing.room-gutter}"
    borderBottom: "1px solid {colors.border}"
  nav-link:
    typography: "{typography.ui}"
    color: "{colors.muted}"
    activeColor: "{colors.ink}"
    hoverColor: "{colors.accent}"
  quiet-entry:
    background: transparent
    border: "1px solid {colors.border}"
    color: "{colors.ink}"
    padding: "14px 18px"
    radius: "{radius.none}"
  object:
    background: transparent
    border: "1px solid {colors.border}"
    radius: "{radius.subtle}"
    shadow: none
  metadata:
    typography: "{typography.caption}"
    color: "{colors.muted}"
  battery:
    typography: "{typography.ui}"
    color: "{colors.ink}"
    accentColor: "{colors.accent}"
  photo-frame:
    border: none
    radius: 0px
    shadow: none
  fullscreen:
    background: "{colors.dark}"
    color: "{colors.white}"

---

## 1. Visual Theme & Atmosphere

INTROVERT OS is a **digital room, not a landing page**. It should feel like entering a quiet studio after the door closes: warm paper, soft daylight, precise objects, small traces of use, and enough empty space to think.

The visual language combines editorial photography, restrained desktop-system references, and subtle physical-space metaphors. Retro-computer cues are structural rather than decorative: monospace metadata, status labels, thin rules, object names, and system states. Never imitate a literal old operating system.

The emotional sequence is: **arrive → observe → discover → understand → leave**.

The page should communicate: “This person does not speak loudly, but their world is rich.”

### Visual hierarchy
1. Photography and spatial composition.
2. Large quiet typography.
3. Interactive objects and states.
4. Metadata / system labels.
5. Navigation chrome.

UI must never compete with the image or the room.

## 2. Color Palette & Roles

- **Canvas `#F3F1EC`** — default warm paper background.
- **Ink `#171717`** — primary text and object outlines.
- **Muted `#77736C`** — metadata, secondary text, inactive navigation.
- **Accent `#FF5A36`** — rare signal color for active states, progress, hover, and important actions. Never use as a large surface.
- **Border `#D8D5CE`** — hairlines and object boundaries.
- **Dark `#111111`** — solitude / low-energy mode and fullscreen photography.
- **Warm Surface `#EAE7DF`** — subtle room planes and object interiors.
- **Accent Soft `#FFE4DC`** — rare selected-state background.

No gradients are part of the base system. No glassmorphism. No neon. No purple AI aesthetic. No rainbow palette.

## 3. Typography Rules

Use a modern neutral sans for expressive text and IBM Plex Mono for system language. Chinese fallback is Noto Sans SC.

Display typography is large but not monumental. Avoid oversized marketing headlines that consume the whole viewport. Sentence case is preferred for human copy. Uppercase is reserved for system labels, navigation, metadata, and states.

Use generous line-height in Chinese copy. Keep metadata compact and technical.

Do not mix more than two type families. Do not use decorative display fonts.

## 4. Component Stylings

### System bar
A thin persistent status layer. It contains INTROVERT OS, minimal navigation, and SOCIAL BATTERY. It should feel like the top edge of a private system, not a SaaS navbar.

### Interactive objects
Objects have physical presence through position, proportion, image texture, and subtle translation — not through cards, shadows, or excessive 3D. Hover reveals a small label and a tiny amount of movement. Click changes the environment or opens a mode.

### Entry buttons
Three quiet-entry choices are transparent, rectangular, and separated by hairlines. They should look like invitations rather than CTAs.

### Photography
Images are treated as editorial artifacts. Use asymmetric compositions, mixed aspect ratios, full-bleed moments, generous margins, and metadata. Never default to a uniform three-column card grid.

### Social Battery
Persistent but visually quiet. Percentage is secondary to the small battery indicator. The system responds to behavior by changing the site's tempo and density.

### Fullscreen viewer
Photography opens into a dark, distraction-free viewer. Metadata sits near the image but never overlays the focal subject unless unavoidable.

## 5. Layout Principles

- Desktop uses an editorial 12-column mental grid with wide outer gutters.
- Prefer asymmetric placement over centered card grids.
- Use empty space as an active compositional element.
- Keep major sections visually distinct without boxed containers.
- The Digital Room should read as one environment, with objects positioned at different scales.
- Never fill empty space simply because it exists.
- Use hairlines sparingly to imply structure.
- Page transitions should feel like moving between rooms rather than switching routes.

### Suggested spacing
Micro: 8–12px. Object spacing: 20–32px. Section spacing: 80–120px. Hero whitespace can exceed the normal spacing scale when it improves atmosphere.

## 6. Depth & Elevation

Default elevation is **none**. Surfaces are distinguished through whitespace, border, contrast, and scale rather than shadows.

Allowed depth cues:
- 1px hairlines.
- Very subtle object translation on hover.
- Image crop and scale changes.
- Layered room planes with near-identical warm colors.
- A restrained dark overlay for modal/fullscreen states.

Do not use floating glass cards, heavy drop shadows, blur, glowing edges, or 3D UI panels.

## 7. Do's and Don'ts

### Do
- Let photography lead.
- Make interaction discoverable through behavior, not instructional labels.
- Use short sentences and fragments.
- Preserve quietness when the user does nothing.
- Make social energy a real system state, not just decorative text.
- Use subtle cursor labels on desktop.
- Provide keyboard equivalents for all object interactions.
- Respect `prefers-reduced-motion`.

### Don't
- Build Hero → About → Skills → Portfolio → Contact.
- Make the room look like a game or metaverse.
- Use many rounded cards.
- Use neon, rainbow gradients, AI-purple gradients, or glow.
- Turn every object into a button-shaped UI element.
- Animate continuously without purpose.
- Hide essential navigation behind mystery.
- Use “I am passionate about...” corporate portfolio copy.
- Let AIGC visually overpower photography.

## 8. Responsive Behavior

### Desktop ≥ 1024px
The room is spatial. Objects can be distributed across a wide canvas. Mouse movement creates 2–8px parallax. Custom cursor is enabled.

### Tablet 768–1023px
Reduce spatial spread and parallax. Preserve asymmetric editorial composition, but keep objects closer to a readable flow.

### Mobile < 768px
Do not scale the desktop room down. Convert the room into a **digital diary**: vertically stacked object chapters, tactile tap targets, larger image crops, fewer simultaneous elements, and no custom cursor. The first screen remains quiet. Navigation becomes a compact system strip.

Touch targets should be at least 44×44px. Hover-only information must have a tap or focus equivalent.

## 9. Interaction Principles

Interaction is the narrative language of INTROVERT OS.

### Social Battery
Initial value: 82%.
- Photography +3.
- Quiet mode +5.
- Music +2.
- AI visuals +3.
- Contact -8.
- Social links -15.
- Rapid repeated interaction -2.

Clamp between 0–100. Avoid punishing normal exploration. The system should feel playful and observational, not like a game score.

Battery state modifies tempo:
- 80–100: normal.
- 60–80: animation duration +10%.
- 40–60: reduce decorative UI.
- 20–40: increase whitespace and slow transitions.
- 0–20: enter LOW SOCIAL ENERGY overlay.

### Motion
Default motion uses 450–700ms ease-out transitions. Room object parallax is subtle. Page transitions use opacity + translate + clip-path only when it creates spatial continuity. Never stack multiple large transforms simultaneously.

### Hidden interactions
Lamp changes room warmth. Notebook reveals a random thought. Computer opens a hidden creative-system panel. Empty-space hover may reveal “你发现了这里。” These discoveries must remain optional and non-blocking.

## 10. Agent Prompt Guide

When implementing any new screen, preserve these invariants:

1. Build an editorial digital room, not a marketing landing page.
2. Use `#F3F1EC` as the primary canvas and `#171717` as primary ink.
3. Reserve `#FF5A36` for small signals and active states.
4. Use Inter + Noto Sans SC for human copy; IBM Plex Mono for system labels.
5. Prefer hairlines, whitespace, scale, cropping, and asymmetry over cards and shadows.
6. Photography is the first visual layer; AIGC is secondary.
7. Every interaction must have a narrative reason.
8. Keep motion slow, short, and purposeful; honor reduced motion.
9. On mobile, redesign as a vertical digital diary rather than shrinking desktop.
10. If a proposed UI looks like SaaS, gaming UI, cyberpunk, or an AI dashboard, reject it and simplify.

### Quick token reference
Canvas `#F3F1EC` · Ink `#171717` · Muted `#77736C` · Accent `#FF5A36` · Border `#D8D5CE` · Dark `#111111`.
