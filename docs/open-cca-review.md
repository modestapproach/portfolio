# OPEN CCA portfolio draft

Built locally on November 11, 2026. Ted requested publication to teddessert.com on November 12, 2026.

- Case study: `/work/open-cca`
- Homepage: OPEN CCA card in Selected Work, immediately after Dibslist.
- Local preview: `http://localhost:3100/work/open-cca`
- LAN preview on this Mac mini: `http://10.0.0.102:3100/work/open-cca`
- Source: `apps/web/app/work/open-cca/page.client.tsx`
- Media player: `apps/web/components/LocalVideo.tsx`, registered with Revyme.

## Content decisions

The page uses first-person copy for Ted's backend and AI work. It includes no team roster, teammate names, teammate portraits, persona film, or slide 19. Actual product UI, the complete history image set, and the original tech-stack slide provide the imagery. Screens with demo alumni are explicitly captioned as demo profiles.

The six-stage pipeline and failure behavior are editable page elements. Privacy evaluation is highlighted. The page explains seven plain-language rules, default-deny contact sharing, saved per-message decisions, and anonymized Privacy Insights.

The page omits research counts, interview quotes, outcome metrics, sponsorship claims, and generated or uncertain research imagery. The presentation brief governs product mechanics when sources conflict. Model names now appear in an explicitly attributed “Prototype model configuration” panel, using the technical brief's assignments and explaining that Model Settings can override them. “What the prototype taught me” describes implementation decisions; it does not claim measured testing outcomes.

## Expanded history, problem, stack, and AI workflows

The page reuses `components/ImageCarousel.tsx`, the same arrows/dots/swipe/keyboard carousel used by Graphic Design. The shared component is registered in the Revyme manifest; its source is unchanged.

The history carousel includes all 12 history images from the source deck: media from slides 2, 3, 4, all four images from slide 5, both images from slide 6, slides 7 and 8, and the search-listing screenshot from slide 11. Closure announcement slide 12 and legacy slide 13 complete the 14-entry carousel. Images use `contain` so the full archival frame stays visible. Captions distinguish milestone years from photograph dates: graduation and construction photos are from 1926, two campus displays identify 1969 and 1990, and the other student photos remain undated. The Google screenshot says **Temporarily closed**, despite the deck notes calling it permanent; the caption describes the visible archival screenshot and makes no current-status claim.

The problem narrative expands the loss of communal space, shared identity, and distributed community memory. It explains both the recent graduate's need for relevant help and the established alumnus's need to protect time and attention, with explicit directory-search and cold-email friction.

The original tech-stack slide (37) is included, followed by readable cards covering React/Vite/Tailwind/TypeScript/React Router, Convex functions and storage, OpenAI, Retell, Cloudflare hosting, Vitest/Testing Library, and the development tools from the deck. Development tools are separated from the product's runtime responsibilities.

The existing six-stage matching diagram now describes its actual handoffs: viewer context, dual-index search, up to 25 candidates, 2–5 streamed matches, alumni-card references, per-card relevance and privacy checks, rendering, audit logging, and frozen snapshots. Three additional workflow diagrams cover the Retell interview → structured profile path, offerText/seekText → 1,536-dimensional embeddings → scheduled indexing path, and chat intent → JSON privacy patch → before/after card path. The Berlin scenario distinguishes the pitch's availability/mentor-notification scope from the matching flow actually demonstrated in the recording.

## All four approved recordings

| Source | Page asset | Placement |
| --- | --- | --- |
| `media-35-2-68.mp4` | `chat-berlin.mp4` | Main demo; 55 seconds |
| `media-26-1-50.mp4` | `voice-onboarding.mp4` | Large onboarding player; 97 seconds |
| `media-39-1-104.mp4` | `retell-flow.mp4` | Retell question flow; 41 seconds |
| `media-45-1-111.mp4` | `mobile-onboarding.mp4` | Short signup flow; 15 seconds |

Videos are self-hosted H.264/AAC MP4s, use native controls, do not autoplay, and load on demand. The voice recording's embedded English subtitles were extracted to WebVTT and included. Each recording is under 3 MB; each image is under 500 KB. Full-size source originals are not copied into the repository.

The chat source uses non-square pixels (1280 × 1080, sample aspect ratio 3:2, displayed as 16:9). Its compressed video and poster normalize to 1280 × 720 with square pixels. Do not set the player to 32:27 based on the source's coded dimensions.

Source discrepancy: the package describes media-45 as SMS/mobile onboarding, but the footage shows a signup form. The page calls it “Mobile onboarding” and makes no texting claim.

## Copy to confirm before publishing

- The title “OPEN CCA” and slug `/work/open-cca` are working choices from the PRD.
- Role is conservatively “Backend & AI”; confirm whether to use “Backend Lead & AI.”
- Timeline says “2026 · Prototype”; the package's March–April dates need confirmation before adding a specific project span.
- The deck's privacy-model label conflicts with its own notes and the technical brief. The page attributes GPT-4o privacy and GPT-5-mini matching/relevance/update assignments to the technical brief; confirm any current runtime configuration before claiming those are the live production models.
- The product link points to `https://alumni-project.com/`; the draft does not claim current production or sponsorship status.
- Research photos, quantitative results, exact research methods, and performance claims need source confirmation before inclusion.

## Validation

- Revyme oracle: zero page violations. The editor parser recognizes the page, shared history carousel, workflow and stack sections, and all four video instances.
- Production Next.js build: passed, including static generation of `/work/open-cca`.
- Headless Chrome: no page errors or horizontal overflow at 1440, 1024, 768, 430, and 390 px. All four recordings reached playback with no media error. The voice player's English caption track is present.
- Expanded-page browser check: all 14 carousel entries are present; all 17 page images decode; arrows, dots, keyboard navigation, and wraparound work. The expanded content has no horizontal overflow at those same five widths, and all four video players remain present.
- Homepage card links to `/work/open-cca`; return links target the homepage's Selected Work anchor.
- Standalone TypeScript check reports an existing `.next/types/app/layout.ts` error because the shared layout exports `siteConfig`. No new-file errors were reported. The repository's production build skips type validation.
- Existing unrelated changes in `.claude/launch.json`, `_meta/page-camera.json`, and the graphic-design page were preserved. No deployment, push, commit, or branch creation was performed in the portfolio repository.

## Source bundle

Original: `/Users/ted/Downloads/cca-network-portfolio.zip`.

Read-only extraction: `/tmp/cca-network-handoff/cca-network-portfolio/`.

Story: `PRD.md`, Keynote `deck-text.txt`, and Boundary Broker source HTML. Mechanics: `sources/alumni-project/PRESENTATION_BRIEF.md`. Fail-safe behavior: Wonderschool alumni pipeline/failsafe slides. Hero: Boundary Broker `app-chat-results.jpg`. Audit trail: Keynote `image-30-2-57.png`. Complete history assets: `public/assets/open-cca/history/`, ordered with source filenames preserved. Stack slide: Keynote `slides/slide-37.png` → `tech-stack-slide.webp`.

## Alumni Globe recording

Added the newly received `~/Downloads/open-cca-globe-demo.mov` as the fifth demo, within the main-demo section at `#alumni-globe`. The 20-second clip shows globe city markers and a selected city's alumni panel. The page labels the profiles and counts as a demo dataset. Converted to a web-ready H.264 MP4 with fast-start metadata at `assets/open-cca/alumni-globe.mp4`; the poster is `alumni-globe-poster.webp`. Native controls and on-demand loading use the existing LocalVideo component. All four earlier recordings remain.

## Synthetic-user testing section

Ted confirmed creating 100 synthetic users to test agentic matching. Added `#synthetic-users` before implementation lessons, with all four supplied November 11 screenshots (directory, complete profile, profile detail, privacy detail), full-frame WebP images, and links to open them at full size. The section includes Ted's seven privacy preferences verbatim and explains contextual matching and per-channel permission checks. It identifies fictional profiles/contact data and distinguishes test population from research participants or active users; it claims no measured accuracy or live-user validation.

Readability revision: removed the zoomed-out complete-profile screenshot from the synthetic-user section at Ted’s request. The directory and two detailed screenshots remain. All seven privacy labels before the colon are bold.

## Publication scope

Publish OPEN CCA at `/work/open-cca` and its Selected Work card on the homepage through the existing deploy-web workflow. Preserve unrelated local Graphic Design, camera-state, and launch-configuration edits.
