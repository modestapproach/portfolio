# Splitting the Supafeed case study into three

Every block on `apps/web/app/work/supafeed/page.client.tsx` (by `data-id`), and where it goes.
Case 1 = Where an agent's finds go. Case 2 = Onboarding a user who is a machine. Case 3 = Talking back to your agent.

| Block (data-id) | Goes to | Note |
| --- | --- | --- |
| hero | all three, rewritten | One phone each: Feed/Board (1), status screen (2), chat (3). |
| meta | all three | Same role/timeline/stack line in each. |
| backstage | overview | Two paragraphs. The third ("Supafeed is that place") becomes the overview's one-liner. |
| stats | cut | 391K/33/17/4,096: keep the 4,096 fact as a sentence in case 3's research. |
| came-in | overview | ClawParty origin, "turned it inside out". |
| contrib | cut | Fold into each case's two-sentence intro ("I designed and built…"). |
| impact | cut | Numbers without process. One line in overview if any. |
| problem | overview, then split | The three-item list: item on finds in chats → 1, agent as second user → 2, nowhere to answer → 3. |
| two-users | overview | The thread that ties the three together. Each case opens by naming which user it serves. |
| journey | 1 (frame) and 3 (steps) | The journey map's "arrives in chat / scrolls away" steps open case 1; the "can't act / can't answer" steps open case 3. |
| rs1-shots (chat app teardown) | 3 | Mobbin placeholders live here. |
| rs2-shots (OpenClaw app teardown) | 2 | "Setup starts in a terminal" is case 2's problem statement. |
| rs3-fig (capability matrix) | 1 | Rows about keeping details, filtering, caught-up. |
| hx-fig (heuristic review) | 1 primary; "feedback about status" row referenced in 2 | |
| rs4-fig (positioning map) | 1 | |
| rs5-scroll (affinity map, 41 needs) | 2 | Eleven needs about the agent doing the work. |
| rs6-fig (proto-persona) | 2 | |
| rs7-fig (seven references) | cut | Keep Linear's "agent task states" line in 2, Readwise "finite digest" line in 1. |
| rs8 (second AI as red team) | 2 | Tag-is-a-label rule; key-free pairing. |
| philosophy | cut | One of the five rules can caption a screen in each case. |
| system, system-fig | 2 | "The app only claims what it can see" is case 2's thesis. Shrink the diagram. |
| features | cut | Section header only. |
| f1 (typed cards), ba (before/after), f1-explore, anatomy, f1-gallery, f1-calls | 1 | The whole feature. "Who draws the interface" exploration stays. |
| agents (onboarding), steps, f2-docs, f2-paths | 2 | |
| f3 (edit discovery), f3-gallery | 2 | Honest status and "the app can't run the schedule". |
| native (talk to your agent), f4-gallery | 3 | Bar built twice, gesture bug, ready means proven, permission vs question. |
| design-system | cut | One wordmark line in overview. |
| evening | split by bug | "when to send" → 3, "when to switch" → 3, "when to let an event go" → 1. Rest cut. |
| taught | overview, one paragraph each | "What not to show" sentence belongs to 2. |
| honest | overview, plus one honest line per case | Connector only on my Mac → 3; steering late → 2; one household → overview. |
| live | overview and footer of each | |
| sources | split by case | Each case carries only its own citations. |
| footer | all | |

Missing per case: 1 needs Boards/Today/dashboards process (currently one sentence); 3 needs real chat screenshots (marketing/demo-assets in clawparty-main has them); 2 is a cut-and-reorder.
