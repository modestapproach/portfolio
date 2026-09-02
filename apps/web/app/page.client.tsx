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
import VariableName from '../components/VariableName';

export default function Page() {
  return <div data-id="root" data-name="Page" style={{
    position: 'relative',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#f6f0e5',
    fontFamily: 'Geist Sans, -apple-system, BlinkMacSystemFont, sans-serif'
  }}>

  <style>{`
    @media (max-width: 768px) and (min-width: 375.02px) {
      [data-id="hero"] { padding: 56px 40px 48px 40px !important; }
      [data-id="hero-title"] { font-size: 34px !important; }
      [data-id="hero-sub"] { font-size: 17px !important; }
      [data-id="work"] { padding: 16px 40px 64px 40px !important; }
      [data-id="footer"] { padding: 24px 40px 32px 40px !important; }
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
  <div data-id="hero" data-name="Hero" style={{
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
    <h2 data-id="hero-title" data-name="Headline" style={{
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
    <p data-id="hero-sub" data-name="Subhead" style={{
        position: 'relative',
        flex: '0 0 auto',
        order: '2',
        fontSize: '19px',
        lineHeight: '1.55',
        color: '#665f4e',
        maxWidth: '640px'
      }}>Seven years helping new products become legible, lovable, and ready to ship. Self-driving cars, IOT, social products, AI — and teaching UX design from scratch.</p>
    <div data-id="hero-facts" data-name="Fact chips" style={{
        position: 'relative',
        flex: '0 0 auto',
        order: '3',
        display: 'flex',
        flexDirection: 'row',
        gap: '10px',
        flexWrap: 'wrap',
        marginTop: '8px'
      }}>
      <p data-id="fact-1" data-name="Fact · years" style={{
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
      <p data-id="fact-2" data-name="Fact · 0-1" style={{
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
      <p data-id="fact-3" data-name="Fact · instructor" style={{
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

  <div data-id="work" data-name="Selected work" style={{
      position: 'relative',
      flex: '0 0 auto',
      order: '1',
      display: 'flex',
      flexDirection: 'column',
      padding: '24px 96px 96px 96px',
      gap: '28px'
    }}>
    <h2 data-id="work-title" data-name="Section title" style={{
        position: 'relative',
        flex: '0 0 auto',
        order: '0',
        fontSize: '15px',
        fontWeight: '600',
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color: '#7d735f'
      }}>Selected work</h2>

    <div data-id="cards" data-name="Project cards" style={{
        position: 'relative',
        flex: '0 0 auto',
        order: '1',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: '24px'
      }}>

      <a data-id="card-dibslist" data-name="Card · Dibslist" href="/work/dibslist" style={{
          position: 'relative',
          flex: '1 1 380px',
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
        <div data-id="dibs-art" data-name="Art" style={{
            position: 'relative',
            flex: '0 0 auto',
            order: '0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '180px',
            backgroundColor: '#4a6c56'
          }}>
          <p data-id="dibs-art-word" data-name="Art word" style={{
              position: 'relative',
              flex: '0 0 auto',
              order: '0',
              fontSize: '52px',
              fontWeight: '700',
              letterSpacing: '-0.02em',
              color: '#f6f0e5'
            }}>Dibslist</p>
        </div>
        <div data-id="dibs-body" data-name="Body" style={{
            position: 'relative',
            flex: '1 0 auto',
            order: '1',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            padding: '22px 24px 26px 24px'
          }}>
          <p data-id="dibs-badge" data-name="Badge" style={{
              position: 'relative',
              flex: '0 0 auto',
              order: '0',
              fontSize: '12px',
              fontWeight: '600',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#4a6c56'
            }}>Object-aware checkout · 2026 concept</p>
          <h3 data-id="dibs-name" data-name="Name" style={{
              position: 'relative',
              flex: '0 0 auto',
              order: '1',
              fontSize: '24px',
              fontWeight: '700',
              color: '#222017'
            }}>Dibslist</h3>
          <p data-id="dibs-desc" data-name="Description" style={{
              position: 'relative',
              flex: '0 0 auto',
              order: '2',
              fontSize: '15px',
              lineHeight: '1.55',
              color: '#665f4e'
            }}>A marketplace thesis built around latent supply: receipts become inventory, and checkout becomes the moment local alternatives appear.</p>
        </div>
      </a>

      <div data-id="card-reef" data-name="Card · Reef" style={{
          position: 'relative',
          flex: '1 1 380px',
          order: '1',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#fffdf9',
          border: '1px solid #22201721',
          borderRadius: '18px',
          overflow: 'hidden'
        }}>
        <div data-id="reef-art" data-name="Art" style={{
            position: 'relative',
            flex: '0 0 auto',
            order: '0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '180px',
            backgroundColor: '#0c1f3f'
          }}>
          <p data-id="reef-art-word" data-name="Art word" style={{
              position: 'relative',
              flex: '0 0 auto',
              order: '0',
              fontSize: '52px',
              fontWeight: '700',
              letterSpacing: '-0.02em',
              color: '#ffd166'
            }}>Reef</p>
        </div>
        <div data-id="reef-body" data-name="Body" style={{
            position: 'relative',
            flex: '1 0 auto',
            order: '1',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            padding: '22px 24px 26px 24px'
          }}>
          <p data-id="reef-badge" data-name="Badge" style={{
              position: 'relative',
              flex: '0 0 auto',
              order: '0',
              fontSize: '12px',
              fontWeight: '600',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#8b3a2b'
            }}>macOS utility · in development</p>
          <h3 data-id="reef-name" data-name="Name" style={{
              position: 'relative',
              flex: '0 0 auto',
              order: '1',
              fontSize: '24px',
              fontWeight: '700',
              color: '#222017'
            }}>Reef</h3>
          <p data-id="reef-desc" data-name="Description" style={{
              position: 'relative',
              flex: '0 0 auto',
              order: '2',
              fontSize: '15px',
              lineHeight: '1.55',
              color: '#665f4e'
            }}>The window manager that gives every app its own Alt-Tab. For people who live in windows all day and want switching to feel instant, physical, and dependable.</p>
        </div>
      </div>

      <div data-id="card-type" data-name="Card · Type experiments" style={{
          position: 'relative',
          flex: '1 1 380px',
          order: '2',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#fffdf9',
          border: '1px solid #22201721',
          borderRadius: '18px',
          overflow: 'hidden'
        }}>
        <div data-id="type-art" data-name="Art" style={{
            position: 'relative',
            flex: '0 0 auto',
            order: '0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '180px',
            backgroundColor: '#e3b3ff'
          }}>
          <p data-id="type-art-word" data-name="Art word" style={{
              position: 'relative',
              flex: '0 0 auto',
              order: '0',
              fontSize: '52px',
              fontWeight: '600',
              letterSpacing: '0em',
              color: '#ff5c33',
              fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace'
            }}>Flow</p>
        </div>
        <div data-id="type-body" data-name="Body" style={{
            position: 'relative',
            flex: '1 0 auto',
            order: '1',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            padding: '22px 24px 26px 24px'
          }}>
          <p data-id="type-badge" data-name="Badge" style={{
              position: 'relative',
              flex: '0 0 auto',
              order: '0',
              fontSize: '12px',
              fontWeight: '600',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#7d1fa0'
            }}>Typography engines · 2026</p>
          <h3 data-id="type-name" data-name="Name" style={{
              position: 'relative',
              flex: '0 0 auto',
              order: '1',
              fontSize: '24px',
              fontWeight: '700',
              color: '#222017'
            }}>Set in advance</h3>
          <p data-id="type-desc" data-name="Description" style={{
              position: 'relative',
              flex: '0 0 auto',
              order: '2',
              fontSize: '15px',
              lineHeight: '1.55',
              color: '#665f4e'
            }}>A variable-font specimen tool generated from font binaries, and a magazine engine that typesets a whole spread — Knuth-Plass line breaking, zero DOM reads — before any of it exists on the page.</p>
        </div>
      </div>

      <div data-id="card-metabob" data-name="Card · Metabob" style={{
          position: 'relative',
          flex: '1 1 380px',
          order: '3',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#fffdf9',
          border: '1px solid #22201721',
          borderRadius: '18px',
          overflow: 'hidden'
        }}>
        <div data-id="meta-art" data-name="Art" style={{
            position: 'relative',
            flex: '0 0 auto',
            order: '0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '180px',
            backgroundColor: '#111111'
          }}>
          <p data-id="meta-art-word" data-name="Art word" style={{
              position: 'relative',
              flex: '0 0 auto',
              order: '0',
              fontSize: '52px',
              fontWeight: '700',
              letterSpacing: '-0.02em',
              color: '#39ff88'
            }}>Metabob</p>
        </div>
        <div data-id="meta-body" data-name="Body" style={{
            position: 'relative',
            flex: '1 0 auto',
            order: '1',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            padding: '22px 24px 26px 24px'
          }}>
          <p data-id="meta-badge" data-name="Badge" style={{
              position: 'relative',
              flex: '0 0 auto',
              order: '0',
              fontSize: '12px',
              fontWeight: '600',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#4a6c56'
            }}>AI developer tool · previously at</p>
          <h3 data-id="meta-name" data-name="Name" style={{
              position: 'relative',
              flex: '0 0 auto',
              order: '1',
              fontSize: '24px',
              fontWeight: '700',
              color: '#222017'
            }}>Metabob</h3>
          <p data-id="meta-desc" data-name="Description" style={{
              position: 'relative',
              flex: '0 0 auto',
              order: '2',
              fontSize: '15px',
              lineHeight: '1.55',
              color: '#665f4e'
            }}>Generative AI for debugging and refactoring code — where the real design work was making complex analysis feel calm and actionable.</p>
        </div>
      </div>

    </div>
  </div>

  <div data-id="footer" data-name="Footer" style={{
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
    <p data-id="footer-name" data-name="Footer name" style={{
        position: 'relative',
        flex: '0 0 auto',
        order: '0',
        fontSize: '14px',
        fontWeight: '600',
        color: '#222017'
      }}>Ted Dessert</p>
    <p data-id="footer-note" data-name="Footer note" style={{
        position: 'relative',
        flex: '0 0 auto',
        order: '1',
        fontSize: '13px',
        color: '#7d735f'
      }}>Designed on my own canvas — this page is real JSX in my repo.</p>
  </div>

</div>;
}
const canvasNodes = <>
  </>;