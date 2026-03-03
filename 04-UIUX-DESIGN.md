# UI/UX Design Document
## PDFForge — Online PDF Tool Suite

---

## 1. Design Principles

| Principle | Description |
|-----------|-------------|
| **Simplicity First** | One tool per page, minimal steps to complete task |
| **Trust & Transparency** | Show security badges, file deletion timers |
| **Speed Perception** | Progress bars, skeleton loaders, instant feedback |
| **Accessibility** | WCAG 2.1 AA, keyboard navigation, screen reader support |
| **Mobile-Friendly** | Touch targets ≥ 44px, responsive layouts |

---

## 2. Design System

### 2.1 Color Palette
```
Primary:       #2563EB (Blue 600)     — CTAs, active states
Primary Dark:  #1D4ED8 (Blue 700)     — Hover states
Secondary:     #7C3AED (Violet 600)   — Premium features
Success:       #16A34A (Green 600)    — Completed states
Warning:       #D97706 (Amber 600)    — Limits, warnings
Error:         #DC2626 (Red 600)      — Errors, failures
Background:    #F8FAFC (Slate 50)     — Page background
Surface:       #FFFFFF (White)         — Cards, containers
Text Primary:  #0F172A (Slate 900)    — Headings
Text Secondary:#64748B (Slate 500)    — Descriptions
Border:        #E2E8F0 (Slate 200)    — Dividers, borders
```

### 2.2 Typography
```
Font Family:    Inter (primary), system-ui (fallback)
Heading 1:      36px / 700 / -0.02em
Heading 2:      28px / 700 / -0.01em
Heading 3:      22px / 600
Body:           16px / 400 / leading-relaxed
Body Small:     14px / 400
Caption:        12px / 500
Button:         14px / 600 / uppercase tracking-wide
```

### 2.3 Spacing System
```
4px  — xs   (tight gaps)
8px  — sm   (input padding, small gaps)
12px — md   (between related elements)
16px — lg   (section gaps)
24px — xl   (card padding)
32px — 2xl  (between sections)
48px — 3xl  (major sections)
64px — 4xl  (page sections)
```

### 2.4 Component Library
```
Atoms:
  - Button (primary, secondary, outline, ghost, danger)
  - Input (text, file, select, checkbox, radio)
  - Badge (status, tier, count)
  - Icon (lucide-react set)
  - Spinner / Progress Bar
  - Tooltip
  - Avatar

Molecules:
  - FileCard (thumbnail + name + size + actions)
  - ToolCard (icon + title + description)
  - UploadZone (drag/drop area)
  - ProcessingStatus (progress + status text)
  - PricingCard (tier details)
  - Alert (info, success, warning, error)
  - Navbar
  - Footer

Organisms:
  - ToolPage Layout (upload → configure → process → download)
  - FileList (sortable list of uploaded files)
  - ThumbnailGrid (page previews for PDF)
  - DashboardLayout (sidebar + content)
  - AuthForm (login/register)
```

---

## 3. Page Layouts & Wireframes

### 3.1 Homepage
```
┌───���────────────────────────────────────────────────────────────┐
│  NAVBAR  [Logo]  [Tools ▼]  [Pricing]  [Login]  [Sign Up]     │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│              Every PDF Tool You Need                           │
│              Free, fast, and secure.                           │
│              [Browse All Tools →]                              │
│                                                                │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│  MOST POPULAR TOOLS                                           │
│                                                                │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐     │
│  │ 📄 Merge │  │ ✂️ Split │  │ 📦 Comp- │  │ 🖼️ PDF   │     │
│  │   PDF    │  │   PDF    │  │   ress   │  │  to JPG  │     │
│  │          │  │          │  │          │  │          │     │
│  │ Combine  │  │ Extract  │  │ Reduce   │  │ Convert  │     │
│  │ multiple │  │ pages    │  │ file     │  │ pages to │     │
│  │ PDFs     │  │ easily   │  │ size     │  │ images   │     │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘     │
│                                                                │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐     │
│  │ 🖼️ JPG  │  │ 🔄 Rota- │  │ 💧 Water-│  │ 🔒 Prot- │     │
│  │  to PDF  │  │   te     │  │   mark   │  │   ect    │     │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘     │
│                                                                │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│  WHY CHOOSE PDFFORGE?                                         │
│                                                                │
│  🔒 Secure        ⚡ Fast           🆓 Free                   │
│  Files deleted    Processing in     Core tools                │
│  after 1 hour    seconds           at no cost                 │
│                                                                │
│  📱 Works         🌍 No Install     ☁️ Cloud                  │
│  Everywhere       Required          Ready                     │
│                                                                │
├────────────────────────────────────────────────────────────────┤
│  FOOTER  [About] [Privacy] [Terms] [Contact] [API Docs]       │
└────────────────────────────────────────────────────────────────┘
```

### 3.2 Tool Page (e.g., Merge PDF) — 4-Step Flow
```
STEP 1: UPLOAD
┌────────────────────────────────────────────────────────────────┐
│  Merge PDF                                                     │
│  Combine multiple PDF files into one document.                │
│                                                                │
│  ┌────────────────────────────────────────────────────────┐   │
│  │                                                        │   │
│  │          ┌──────────────────┐                          │   │
│  │          │  📁 Drop files   │                          │   │
│  │          │     here or      │                          │   │
│  │          │  [Browse Files]  │                          │   │
│  │          └──────────────────┘                          │   │
│  │                                                        │   │
│  │        Supports: PDF  •  Max: 25MB per file           │   │
│  │        (Upgrade to Pro for 100MB)                      │   │
│  └────────────────────────────────────────────────────────┘   │
│                                                                │
│  🔒 Your files are secure and deleted after 1 hour.           │
└────────────────────────────────────────────────────────────────┘

STEP 2: CONFIGURE (after files uploaded)
┌────────────────────────────────────────────────────────────────┐
│  Merge PDF — 3 files selected                                 │
│                                                                │
│  Drag to reorder:                                             │
│  ┌────────────────────────────────────────────────────────┐   │
│  │  ☰  📄 document-1.pdf          2.3 MB    [✕]         │   │
│  ├────────────────────────────────────────────────────────┤   │
│  │  ☰  📄 report-final.pdf        5.1 MB    [✕]         │   │
│  ├────────────────────────────────────────────────────────┤   │
│  │  ☰  📄 appendix.pdf            1.8 MB    [✕]         │   │
│  └────────────────────────────────────────────────────────┘   │
│                                                                │
│  [+ Add More Files]                                           │
│                                                                │
│                              [🔄 Merge PDFs]                  │
└────────────────────────────────────────────────────────────────┘

STEP 3: PROCESSING
┌────────────────────────────────────────────────────────────────┐
│  Merge PDF — Processing...                                    │
│                                                                │
│  ┌────────────────────────────────────────────────────────┐   │
│  │                                                        │   │
│  │              🔄 Merging your files...                  │   │
│  │                                                        │   │
│  │         ████████████████░░░░░░░░░░  65%               │   │
│  │                                                        │   │
│  │              Estimated: 3 seconds                      │   │
│  │                                                        │   │
│  └────────────────────────────────────────────────────────┘   │
└────────────────────────────────────────────────────────────────┘

STEP 4: DOWNLOAD
┌───────────────────���────────────────────────────────────────────┐
│  Merge PDF — Complete! ✅                                     │
│                                                                │
│  ┌────────────────────────────────────────────────────────┐   │
│  │                                                        │   │
│  │                   ✅ Merge Complete!                   │   │
│  │                                                        │   │
│  │    📄 merged-document.pdf                              │   │
│  │    Size: 9.2 MB  •  Pages: 24                          │   │
│  │                                                        │   │
│  │              [⬇️ Download PDF]                         │   │
│  │                                                        │   │
│  │    ☁️ Save to Drive  •  📧 Email Link                 │   │
│  │                                                        │   │
│  └────────────────────────────────────────────────────────┘   │
│                                                                │
│  ⏱️ File will be deleted in 59 minutes.                       │
│                                                                │
│  [Start Over]  [Try Another Tool →]                           │
└────────────────────────────────────────────────────────────────┘
```

### 3.3 Split PDF Tool — Page Selector
```
┌────────────────────────────────────────────────────────────────┐
│  Split PDF — Select pages to extract                          │
│                                                                │
│  Mode: (●) By Range  ( ) Extract Pages  ( ) Every N Pages    │
│                                                                │
│  ┌────────────────────────────────────────────────────────┐   │
│  │  Page Thumbnails                                       │   │
│  │                                                        │   │
│  │  ┌────┐  ┌────┐  ┌────┐  ┌────┐  ┌────┐  ┌────┐    │   │
│  │  │ ✅ │  │ ✅ │  │ ✅ │  │    │  │    │  │    │    │   │
│  │  │ P1 │  │ P2 │  │ P3 │  │ P4 │  │ P5 │  │ P6 │    │   │
│  │  └────┘  └────┘  └────┘  └────┘  └────┘  └────┘    │   │
│  │                                                        │   │
│  │  ┌────┐  ┌────┐  ┌────┐  ┌────┐                      │   │
│  │  │    │  │ ✅ │  │    │  │ ✅ │                      │   │
│  │  │ P7 │  │ P8 │  │ P9 │  │P10 │                      │   │
│  │  └────┘  └────┘  └────┘  └────┘                      │   │
│  │                                                        │   │
│  └────────────────────────────────────────────────────────┘   │
│                                                                │
│  Range: [1-3, 8, 10          ]                                │
│                                                                │
│  Selected: 5 pages  •  Output: 1 PDF                          │
│                                                                │
│                               [✂️ Split PDF]                  │
└────────────────────────────────────────────────────────────────┘
```

### 3.4 Compress PDF — Quality Options
```
┌──────────────────────────────────���─────────────────────────────┐
│  Compress PDF                                                  │
│                                                                │
│  📄 large-report.pdf (45.2 MB)                                │
│                                                                │
│  Choose compression level:                                    │
│                                                                │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐        │
│  │   📗 Low     │  │  📙 Medium   │  │   📕 High    │        │
│  │              │  │  (Selected)  │  │              │        │
│  │  Best        │  │  Good        │  │  Maximum     │        │
│  │  Quality     │  │  Balance     │  │  Compression │        │
│  │              │  │              │  │              │        │
│  │  ~20% less   │  │  ~50% less   │  │  ~75% less   │        │
│  └──────────────┘  └──────────────┘  └──────────────┘        │
│                                                                │
│                         [📦 Compress PDF]                     │
└────────────────────────────────────────────────────────────────┘
```

### 3.5 Dashboard — Job History
```
┌────────────────────────────────────────────────────────────────┐
│  NAVBAR  [Logo]  [Tools ▼]  [Pricing]  [👤 John ▼]           │
├───────────┬────────────────────────────────────────────────────┤
│           │                                                    │
│ SIDEBAR   │  Recent Jobs                                      │
│           │                                                    │
│ Dashboard │  ┌────────────────────────────────────────────┐   │
│ History   │  │ ✅ Merge PDF     3 files    2 min ago      │   │
│ Settings  │  │    Output: merged.pdf (9.2MB) [⬇️]         │   │
│ Subscrip. │  ├────────────────────────────────────────────┤   │
│           │  │ ✅ Compress      1 file     15 min ago     │   │
│ ───────── │  │    45.2MB → 12.1MB (-73%) [⬇️]            │   │
│           │  ├────────────────────────────────────────────┤   │
│ USAGE     │  │ ❌ PDF→JPG       1 file     1 hour ago    │   │
│ 7/10 ops  │  │    Error: File corrupted                   │   │
│ today     │  ├────────────────────────────────────────────┤   │
│           │  │ ✅ Split PDF     1 file     3 hours ago    │   │
│ [Upgrade] │  │    Extracted 5 pages [⬇️]                  │   │
│           │  └────────────────────────────────────────────┘   │
│           │                                                    │
│           │  Usage This Month                                 │
│           │  ████████████░░░░░░  37/100 operations            │
│           │                                                    │
└───────────┴────────────────────────────────────────────────────┘
```

### 3.6 Pricing Page
```
┌────────────────────────────────────────────────────────────────┐
│                                                                │
│           Choose the right plan for you                        │
│                                                                │
│  ┌───────────────┐  ┌───────────────┐  ┌───────────────┐     │
│  │     FREE      │  │   ⭐ PRO      │  │   BUSINESS    │     │
│  │               │  │   POPULAR     │  │               │     │
│  │    $0/mo      │  │   $9/mo       │  │   $29/mo      │     │
│  │               │  │               │  │               │     │
│  │ ✅ 5 tools    │  │ ✅ All tools  │  │ ✅ All tools  │     │
│  │ ✅ 25MB max   │  │ ✅ 100MB max  │  │ ✅ 250MB max  │     │
│  │ ✅ 10 ops/day │  │ ✅ Unlimited  │  │ ✅ Unlimited  │     │
│  │ ❌ Batch      │  │ ✅ Batch (10) │  │ ✅ Batch (50) │     │
│  │ ❌ OCR        │  │ ❌ OCR        │  │ ✅ OCR        │     │
│  │ ❌ API        │  │ ✅ API (100)  │  │ ✅ API (5000) │     │
│  │               │  │               │  │               │     │
│  │ [Get Started] │  │ [Upgrade Now] │  │ [Contact Us]  │     │
│  └───────────────┘  └───────────────┘  └───────────────┘     │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

---

## 4. Interaction Patterns

### 4.1 Upload States
```
State Machine:

  IDLE ──(drop/click)──▶ VALIDATING ──(valid)──▶ UPLOADING ──(done)──▶ READY
    ▲                       │                       │                     │
    │                    (invalid)               (error)              (remove)
    │                       │                       │                     │
    │                       ▼                       ▼                     │
    └──────────────── ERROR_STATE ◀────────────────┘◀────────────────────┘
```

### 4.2 Drag & Drop Behavior
```
- Hover with files: Blue dashed border + "Drop files here" overlay
- Drop valid files: Green flash + file cards appear
- Drop invalid files: Red flash + error toast with reason
- Multiple drops: Append to existing file list
- Max files reached: Disable drop + show limit message
```

### 4.3 Progress Indication
```
Upload Phase:    Linear progress bar (0-100%)
Queue Phase:     Pulsing animation + "Waiting in queue..."
Processing:      Indeterminate spinner + step text
                 ("Merging page 3 of 10...")
Complete:        Checkmark animation + download button
Error:           Shake animation + error details + retry button
```

---

## 5. Responsive Breakpoints

| Breakpoint | Width | Layout Changes |
|-----------|-------|---------------|
| Mobile | < 640px | Single column, full-width cards, bottom nav |
| Tablet | 640-1024px | 2-column tool grid, side-by-side file list |
| Desktop | 1024-1280px | 3-column tool grid, spacious layout |
| Wide | > 1280px | 4-column tool grid, max-width container |

### 5.1 Mobile Considerations
```
- Upload: Full-screen dropzone on tap
- File list: Swipe to delete
- Thumbnails: 2 columns instead of 5
- Navigation: Hamburger menu with slide-out drawer
- Download: Full-width CTA button
- Processing: Full-screen modal with progress
```

---

## 6. Animation & Micro-interactions

| Element | Animation | Duration |
|---------|-----------|----------|
| Page transition | Fade in | 200ms |
| Tool card hover | Scale 1.02 + shadow | 150ms |
| File card add | Slide in from right | 300ms |
| File card remove | Slide out + collapse | 250ms |
| Drag reorder | Lift + shadow | Real-time |
| Progress bar | Smooth width transition | Continuous |
| Download ready | Checkmark draw animation | 500ms |
| Error shake | Horizontal shake | 300ms |
| Toast notification | Slide in from top-right | 300ms |
| Button click | Scale 0.97 | 100ms |

---

## 7. Accessibility Requirements

| Requirement | Implementation |
|-------------|---------------|
| Keyboard Navigation | All interactive elements focusable, logical tab order |
| Screen Reader | ARIA labels on icons, live regions for status updates |
| Color Contrast | Minimum 4.5:1 for text, 3:1 for UI components |
| Focus Indicators | Visible focus ring (2px solid blue) |
| Error Messages | Associated with inputs via aria-describedby |
| Motion | Respect prefers-reduced-motion |
| Text Scaling | UI works up to 200% text size |
| Alt Text | Descriptive alt for all meaningful images |
| Touch Targets | Minimum 44x44px on mobile |
| Language | lang attribute on html element |