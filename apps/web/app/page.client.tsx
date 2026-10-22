'use client';

/** @canvas {
  "viewports": [
    { "id": "desktop", "label": "Desktop", "width": 1440, "height": 900, "isPrimary": true, "order": 0 },
    { "id": "tablet", "label": "Tablet", "width": 768, "height": "auto", "isPrimary": false, "order": 1 },
    { "id": "mobile", "label": "Mobile", "width": 375, "height": "auto", "isPrimary": false, "order": 2 }
  ],
  "positions": {
    "desktop": { "x": 0, "y": 0 },
    "tablet": { "x": 1600, "y": 0 },
    "mobile": { "x": 2528, "y": 0 }
  }
} */

import React from 'react';
import Link from 'next/link';
import VariableName from '../components/VariableName';

export default function Page() {
  return <div data-id="root" data-name="Page" style={{
    position: 'relative',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    fontFamily: 'Geist Sans, -apple-system, BlinkMacSystemFont, sans-serif'
  }}>

  <style>{`
    @media (max-width: 768px) and (min-width: 375.02px) {
      [data-id="hero"] { padding: 56px 40px 48px 40px !important; }
      [data-id="hero-title"] { font-size: 34px !important; }
      [data-id="hero-sub"] { font-size: 17px !important; }
      [data-id="work"] { padding: 16px 40px 64px 40px !important; }
      [data-id="footer"] { padding: 24px 40px 32px 40px !important; }
      [data-id="footer-name"], [data-id="footer-note"] { flex: 0 1 auto !important; min-width: 0 !important; }
    }
    @media (max-width: 375px) {
      [data-id="hero"] { padding: 32px 24px 28px 24px !important; }
      [data-id="hero-title"] { font-size: 27px !important; }
      [data-id="hero-sub"] { font-size: 16px !important; }
      [data-id="work"] { padding: 8px 24px 40px 24px !important; }
      [data-id="cards"] { gap: 16px !important; }
      [data-id="footer"] { flex-direction: column !important; align-items: stretch !important; justify-content: flex-start !important; gap: 6px !important; padding: 20px 24px 28px 24px !important; }
    }
`}</style>
  <div data-id="hero" data-name="Hero" style={{ width: 'auto', height: 'auto',
      position: 'relative',
      flex: '0 0 auto',
      order: '0',
      display: 'flex',
      flexDirection: 'column',
      padding: '96px 96px 72px 96px',
      gap: '28px'
    }}>
    <VariableName data-id="hero-name" data-name="Ted Dessert · variable" text="Ted Dessert" baseWeight={280} peakWeight={700} radius={200} fontSize={92} color="#222017" style={{
        position: 'relative',
        flex: '0 0 auto',
        order: '0'
      }} />
    <h2 data-id="hero-title" data-name="Headline" style={{ width: 'auto', height: 'auto',
        position: 'relative',
        flex: '0 0 auto',
        order: '1',
        fontSize: '44px',
        lineHeight: '1.1',
        fontWeight: '600',
        letterSpacing: '-0.015em',
        color: '#3a3527',
        maxWidth: '820px'
      }}>Product designer for ambitious software with weird edges and real constraints.</h2>
    <p data-id="hero-sub" data-name="Subhead" style={{ width: 'auto', height: 'auto',
        position: 'relative',
        flex: '0 0 auto',
        order: '2',
        fontSize: '19px',
        lineHeight: '1.55',
        color: '#665f4e',
        maxWidth: '640px'
      }}>Seven years helping new products become legible, lovable, and ready to ship. Self-driving cars, IOT, social products, AI — and teaching UX design from scratch.</p>
    <div data-id="hero-facts" data-name="Fact chips" style={{ width: 'auto', height: 'auto',
        position: 'relative',
        flex: '0 0 auto',
        order: '3',
        display: 'flex',
        flexDirection: 'row',
        gap: '10px',
        flexWrap: 'wrap',
        marginTop: '8px'
      }}>
      <p data-id="fact-1" data-name="Fact · years" style={{ width: 'auto', height: 'auto',
          position: 'relative',
          flex: '0 0 auto',
          order: '0',
          fontSize: '13px',
          color: '#3a3527',
          backgroundColor: '#ffffff',
          border: '1px solid #22201721',
          borderRadius: '999px',
          padding: '8px 16px'
        }}>7 years in product design</p>
      <p data-id="fact-2" data-name="Fact · 0-1" style={{ width: 'auto', height: 'auto',
          position: 'relative',
          flex: '0 0 auto',
          order: '1',
          fontSize: '13px',
          color: '#3a3527',
          backgroundColor: '#ffffff',
          border: '1px solid #22201721',
          borderRadius: '999px',
          padding: '8px 16px'
        }}>0-1 product work</p>
      <p data-id="fact-3" data-name="Fact · instructor" style={{ width: 'auto', height: 'auto',
          position: 'relative',
          flex: '0 0 auto',
          order: '2',
          fontSize: '13px',
          color: '#3a3527',
          backgroundColor: '#ffffff',
          border: '1px solid #22201721',
          borderRadius: '999px',
          padding: '8px 16px'
        }}>Former UX instructor</p>
    </div>
  </div>

  <div data-id="work" data-name="Selected work" style={{ width: 'auto', height: 'auto',
      position: 'relative',
      flex: '0 0 auto',
      order: '1',
      display: 'flex',
      flexDirection: 'column',
      padding: '24px 96px 96px 96px',
      gap: '28px'
    }}>
    <h2 data-id="work-title" data-name="Section title" style={{ width: 'auto', height: 'auto',
        position: 'relative',
        flex: '0 0 auto',
        order: '0',
        fontSize: '15px',
        fontWeight: '600',
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color: '#7d735f'
      }}>Selected work</h2>

    <div data-id="cards" data-name="Project cards" style={{ width: 'auto', height: 'auto',
        position: 'relative',
        flex: '0 0 auto',
        order: '1',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: '24px'
      }}>

      <Link data-id="card-supafeed" data-name="Card · Supafeed" href="/work/supafeed" style={{ width: 'auto', height: 'auto',
          position: 'relative',
          flex: '1 1 280px',
          order: '0',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#fffdf9',
          border: '1px solid #22201721',
          borderRadius: '18px',
          overflow: 'hidden',
          textDecoration: 'none',
          color: 'inherit'
        }}>
        <div data-id="supafeed-art" data-name="Art" role="img" aria-label="Supafeed: the Feed, Today and agent chat on iPhone" style={{ width: 'auto',
            position: 'relative',
            flex: '0 0 auto',
            order: '0',
            height: '180px',
            backgroundImage: 'url(/assets/supafeed/card.webp)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }} />
        <div data-id="supafeed-body" data-name="Body" style={{ width: 'auto', height: 'auto',
            position: 'relative',
            flex: '1 0 auto',
            order: '1',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            padding: '22px 24px 26px 24px'
          }}>
          <p data-id="supafeed-badge" data-name="Badge" style={{ width: 'auto', height: 'auto',
              position: 'relative',
              flex: '0 0 auto',
              order: '0',
              fontSize: '12px',
              fontWeight: '600',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#4358CD'
            }}>Overview · AI agents · iOS + web · 2026</p>
          <h3 data-id="supafeed-name" data-name="Name" style={{ width: 'auto', height: 'auto',
              position: 'relative',
              flex: '0 0 auto',
              order: '1',
              fontSize: '24px',
              fontWeight: '700',
              color: '#222017'
            }}>Supafeed: the project</h3>
          <p data-id="supafeed-desc" data-name="Description" style={{ width: 'auto', height: 'auto',
              position: 'relative',
              flex: '0 0 auto',
              order: '2',
              fontSize: '15px',
              lineHeight: '1.55',
              color: '#665f4e'
            }}>One product, two users: a person and the AI agent that works for them. The overview of the project, and the way into its three case studies.</p>
        </div>
      </Link>

<Link data-id="card-feed" data-name="Card · Where an agent’s finds go" href="/work/supafeed-feed" style={{ width: 'auto', height: 'auto',
          position: 'relative',
          flex: '1 1 280px',
          order: '1',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#fffdf9',
          border: '1px solid #22201721',
          borderRadius: '18px',
          overflow: 'hidden',
          textDecoration: 'none',
          color: 'inherit'
        }}>
        <div data-id="feed-art" data-name="Art" role="img" aria-label="Supafeed feed: typed cards for an event, a place and a product" style={{ width: 'auto',
            position: 'relative',
            flex: '0 0 auto',
            order: '0',
            height: '180px',
            backgroundImage: 'url(/assets/supafeed/ios-feed-mid.webp)',
            backgroundSize: 'cover',
            backgroundPosition: 'center 38%',
            backgroundRepeat: 'no-repeat'
          }} />
        <div data-id="feed-body" data-name="Body" style={{ width: 'auto', height: 'auto',
            position: 'relative',
            flex: '1 0 auto',
            order: '1',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            padding: '22px 24px 26px 24px'
          }}>
          <p data-id="feed-badge" data-name="Badge" style={{ width: 'auto', height: 'auto',
              position: 'relative',
              flex: '0 0 auto',
              order: '0',
              fontSize: '12px',
              fontWeight: '600',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#4358CD'
            }}>Case study 1 · The person’s side</p>
          <h3 data-id="feed-name" data-name="Name" style={{ width: 'auto', height: 'auto',
              position: 'relative',
              flex: '0 0 auto',
              order: '1',
              fontSize: '24px',
              fontWeight: '700',
              color: '#222017'
            }}>Where an agent’s finds go</h3>
          <p data-id="feed-desc" data-name="Description" style={{ width: 'auto', height: 'auto',
              position: 'relative',
              flex: '0 0 auto',
              order: '2',
              fontSize: '15px',
              lineHeight: '1.55',
              color: '#665f4e'
            }}>A find is a paragraph until something gives it a shape. Research into where finds live today, and the typed card contract that replaced the chat message.</p>
        </div>
      </Link>

<Link data-id="card-agent" data-name="Card · Onboarding a user who is a machine" href="/work/supafeed-agent" style={{ width: 'auto', height: 'auto',
          position: 'relative',
          flex: '1 1 280px',
          order: '2',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#fffdf9',
          border: '1px solid #22201721',
          borderRadius: '18px',
          overflow: 'hidden',
          textDecoration: 'none',
          color: 'inherit'
        }}>
        <div data-id="agent-art" data-name="Art" role="img" aria-label="Supafeed: editing what the agent looks for" style={{ width: 'auto',
            position: 'relative',
            flex: '0 0 auto',
            order: '0',
            height: '180px',
            backgroundImage: 'url(/assets/supafeed/ios-discovery.webp)',
            backgroundSize: 'cover',
            backgroundPosition: 'center 38%',
            backgroundRepeat: 'no-repeat'
          }} />
        <div data-id="agent-body" data-name="Body" style={{ width: 'auto', height: 'auto',
            position: 'relative',
            flex: '1 0 auto',
            order: '1',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            padding: '22px 24px 26px 24px'
          }}>
          <p data-id="agent-badge" data-name="Badge" style={{ width: 'auto', height: 'auto',
              position: 'relative',
              flex: '0 0 auto',
              order: '0',
              fontSize: '12px',
              fontWeight: '600',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#4358CD'
            }}>Case study 2 · The agent’s side</p>
          <h3 data-id="agent-name" data-name="Name" style={{ width: 'auto', height: 'auto',
              position: 'relative',
              flex: '0 0 auto',
              order: '1',
              fontSize: '24px',
              fontWeight: '700',
              color: '#222017'
            }}>Onboarding a user who is a machine</h3>
          <p data-id="agent-desc" data-name="Description" style={{ width: 'auto', height: 'auto',
              position: 'relative',
              flex: '0 0 auto',
              order: '2',
              fontSize: '15px',
              lineHeight: '1.55',
              color: '#665f4e'
            }}>Setup meant terminal commands and pasted keys, and “connected” was a lie. Designing for an agent that reads the docs, sets itself up, and is only ever as green as the server has seen.</p>
        </div>
      </Link>

<Link data-id="card-chat" data-name="Card · Talking back to your agent" href="/work/supafeed-chat" style={{ width: 'auto', height: 'auto',
          position: 'relative',
          flex: '1 1 280px',
          order: '3',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#fffdf9',
          border: '1px solid #22201721',
          borderRadius: '18px',
          overflow: 'hidden',
          textDecoration: 'none',
          color: 'inherit'
        }}>
        <div data-id="chat-art" data-name="Art" role="img" aria-label="Supafeed: a chat with the agent showing cards and a question" style={{ width: 'auto',
            position: 'relative',
            flex: '0 0 auto',
            order: '0',
            height: '180px',
            backgroundImage: 'url(/assets/supafeed/ios-chat-2.webp)',
            backgroundSize: 'cover',
            backgroundPosition: 'center 38%',
            backgroundRepeat: 'no-repeat'
          }} />
        <div data-id="chat-body" data-name="Body" style={{ width: 'auto', height: 'auto',
            position: 'relative',
            flex: '1 0 auto',
            order: '1',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            padding: '22px 24px 26px 24px'
          }}>
          <p data-id="chat-badge" data-name="Badge" style={{ width: 'auto', height: 'auto',
              position: 'relative',
              flex: '0 0 auto',
              order: '0',
              fontSize: '12px',
              fontWeight: '600',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#4358CD'
            }}>Case study 3 · Where the two meet</p>
          <h3 data-id="chat-name" data-name="Name" style={{ width: 'auto', height: 'auto',
              position: 'relative',
              flex: '0 0 auto',
              order: '1',
              fontSize: '24px',
              fontWeight: '700',
              color: '#222017'
            }}>Talking back to your agent</h3>
          <p data-id="chat-desc" data-name="Description" style={{ width: 'auto', height: 'auto',
              position: 'relative',
              flex: '0 0 auto',
              order: '2',
              fontSize: '15px',
              lineHeight: '1.55',
              color: '#665f4e'
            }}>A feed is one-way. Hold-to-talk, cards inside chat, questions that look different from permissions, and a status that means a real round trip.</p>
        </div>
      </Link>

      

    </div>
  </div>

  <div data-id="footer" data-name="Footer" style={{ width: 'auto', height: 'auto',
      position: 'relative',
      flex: '0 0 auto',
      order: '2',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '28px 96px 40px 96px',
      borderTop: '1px solid #22201721'
    }}>
    <p data-id="footer-name" data-name="Footer name" style={{ width: 'auto', height: 'auto',
        position: 'relative',
        flex: '0 0 auto',
        order: '0',
        fontSize: '14px',
        fontWeight: '600',
        color: '#222017'
      }}>Ted Dessert</p>
    <p data-id="footer-note" data-name="Footer note" style={{ width: 'auto', height: 'auto',
        position: 'relative',
        flex: '0 0 auto',
        order: '1',
        fontSize: '13px',
        color: '#7d735f'
      }}>Designed on my own canvas. This page is real code in my repo.</p>
  </div>

</div>;
}

const canvasNodes = <>
  </>;