'use client';

/** @canvas {
  "viewports": [
    { "id": "desktop", "label": "Desktop", "width": 1440, "height": "auto", "isPrimary": true, "order": 0 },
    { "id": "tablet", "label": "Tablet", "width": 1024, "height": "auto", "isPrimary": false, "order": 1 },
    { "id": "mobile", "label": "Mobile", "width": 430, "height": "auto", "isPrimary": false, "order": 2 }
  ],
  "positions": {
    "desktop": { "x": 0, "y": 0 },
    "tablet": { "x": 1560, "y": 0 },
    "mobile": { "x": 2704, "y": 0 }
  }
} */
import React from 'react';
import Link from 'next/link';
import VideoEmbed from '../../../components/VideoEmbed';
import ImageCarousel from '../../../components/ImageCarousel';
import LottiePlayer from '../../../components/LottiePlayer';
export default function Page() {
  return <div data-id="root" data-name="Graphic design" style={{
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#ffffff'
  }}>
  <style>{`
    @media (max-width: 1024px) and (min-width: 430.02px) {
      [data-id="gd-title"] { font-size: 40px !important; }
    }
    @media (max-width: 430px) {
      [data-id="site-nav"] { padding: 16px 20px 16px 20px !important; }
      [data-id="gd-title"] { font-size: 34px !important; }
      [data-id="gd-head"] { padding: 32px 20px 0px 20px !important; }
      [data-id="vd-hai"], [data-id="vd-hyt"], [data-id="vd-h0"], [data-id="vd-h1"], [data-id="vd-h2"], [data-id="vd-h3"], [data-id="vd-h4"], [data-id="vd-h5"], [data-id="vd-h6"], [data-id="vd-mb-process-h"], [data-id="vd-mb-product-h"] { font-size: 20px !important; }
    }
  `}</style>
  <div data-id="site-nav" data-name="Site nav" style={{
      position: 'relative',
      flex: '0 0 auto',
      order: '0',
      display: 'flex',
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: '12px',
      padding: '22px 40px 22px 40px'
    }}>
    <Link data-id="site-nav-home" data-name="Back to home" style={{
        position: 'relative',
        flex: '0 0 auto',
        order: '0',
        fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif',
        color: '#16191C',
        fontSize: '14px',
        lineHeight: '1.4',
        fontWeight: '600',
        padding: '8px 14px 8px 12px',
        borderRadius: '9999px',
        border: '1px solid #E3E6EF',
        backgroundColor: '#ffffff',
        textDecoration: 'none'
      }} href="/">← Back to home</Link>
    <div data-id="site-nav-links" data-name="Links" style={{
        position: 'relative',
        flex: '0 0 auto',
        order: '1',
        display: 'flex',
        flexDirection: 'row',
        gap: '22px',
        flexWrap: 'wrap'
      }}>
      <Link data-id="site-nav-work" data-name="Work" style={{
          position: 'relative',
          flex: '0 0 auto',
          order: '0',
          fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif',
          color: '#2A2E33',
          fontSize: '15px',
          lineHeight: '1.2',
          textDecoration: 'none'
        }} href="/">Work</Link>
      <Link data-id="site-nav-about" data-name="About" style={{
          position: 'relative',
          flex: '0 0 auto',
          order: '1',
          fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif',
          color: '#2A2E33',
          fontSize: '15px',
          lineHeight: '1.2',
          textDecoration: 'none'
        }} href="/about">About</Link>
      <Link data-id="site-nav-process" data-name="Process" style={{
          position: 'relative',
          flex: '0 0 auto',
          order: '2',
          fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif',
          color: '#2A2E33',
          fontSize: '15px',
          lineHeight: '1.2',
          textDecoration: 'none'
        }} href="/process">Process</Link>
      <Link data-id="site-nav-blog" data-name="Blog" style={{
          position: 'relative',
          flex: '0 0 auto',
          order: '3',
          fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif',
          color: '#2A2E33',
          fontSize: '15px',
          lineHeight: '1.2',
          textDecoration: 'none'
        }} href="/blog">Blog</Link>
    </div>
  </div>
  <div data-id="gd-head" data-name="Header" style={{
      position: 'relative',
      flex: '0 0 auto',
      order: '1',
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      alignItems: 'center',
      padding: '56px 20px 0px 20px'
    }}>
    <div data-id="gd-head-in" data-name="Column" style={{
        position: 'relative',
        flex: '0 0 auto',
        order: '0',
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        maxWidth: '600px',
        gap: '16px'
      }}>
      <p data-id="gd-kicker" data-name="Kicker" style={{
          position: 'relative',
          flex: '0 0 auto',
          order: '1',
          fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif',
          color: '#4358CD',
          fontSize: '14px',
          lineHeight: '1.4',
          fontWeight: '600',
          letterSpacing: '0.02em'
        }}>Earlier work · graphics, illustration, motion and video</p>
      <h1 data-id="gd-title" data-name="Title" style={{
          position: 'relative',
          flex: '0 0 auto',
          order: '2',
          fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif',
          color: '#16191C',
          fontSize: '48px',
          lineHeight: '1.08',
          fontWeight: '700',
          letterSpacing: '-0.02em'
        }}>Graphic design</h1>
      <p data-id="gd-intro" data-name="Intro" style={{
          position: 'relative',
          flex: '0 0 auto',
          order: '3',
          fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif',
          color: '#2A2E33',
          fontSize: '18px',
          lineHeight: '1.6'
        }}>Alongside product design, I do illustration and make the graphics, animation and video that explain a product when words and still images can't: a web animation for Metabob, the launch video for my Gift App, the Kickstarter video for KromaKicks, and the company video for Artisense.</p>
      <div data-id="gd-chips" data-name="Tools" style={{
          position: 'relative',
          flex: '0 0 auto',
          order: '4',
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: '8px'
        }}>
        <p data-id="gd-chip-1" data-name="Chip" style={{
            position: 'relative',
            flex: '0 0 auto',
            order: '0',
            fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif',
            color: '#4358CD',
            fontSize: '13px',
            lineHeight: '1.4',
            fontWeight: '600',
            backgroundColor: '#EEF1FD',
            borderRadius: '9999px',
            padding: '6px 12px 6px 12px'
          }}>After Effects</p>
        <p data-id="gd-chip-2" data-name="Chip" style={{
            position: 'relative',
            flex: '0 0 auto',
            order: '1',
            fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif',
            color: '#4358CD',
            fontSize: '13px',
            lineHeight: '1.4',
            fontWeight: '600',
            backgroundColor: '#EEF1FD',
            borderRadius: '9999px',
            padding: '6px 12px 6px 12px'
          }}>Lottie</p>
        <p data-id="gd-chip-3" data-name="Chip" style={{
            position: 'relative',
            flex: '0 0 auto',
            order: '2',
            fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif',
            color: '#4358CD',
            fontSize: '13px',
            lineHeight: '1.4',
            fontWeight: '600',
            backgroundColor: '#EEF1FD',
            borderRadius: '9999px',
            padding: '6px 12px 6px 12px'
          }}>Motion tracking</p>
        <p data-id="gd-chip-4" data-name="Chip" style={{
            position: 'relative',
            flex: '0 0 auto',
            order: '3',
            fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif',
            color: '#4358CD',
            fontSize: '13px',
            lineHeight: '1.4',
            fontWeight: '600',
            backgroundColor: '#EEF1FD',
            borderRadius: '9999px',
            padding: '6px 12px 6px 12px'
          }}>Video editing</p>
      </div>
    </div>
  </div>
  <div data-id="sec-visual-design" data-name="Projects" style={{
      position: 'relative',
      flex: '0 0 auto',
      order: '2',
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      alignItems: 'center',
      padding: '40px 20px 0px 20px',
      scrollMarginTop: '16px'
    }}>
    <div data-id="visual-design-in" data-name="Column" style={{
        position: 'relative',
        flex: '0 0 auto',
        order: '0',
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        maxWidth: '1040px',
        alignItems: 'center',
        gap: '16px'
      }}>
      <div data-id="vd-gai" data-name="AI Club poster" style={{
          position: 'relative',
          flex: '0 0 auto',
          order: '0',
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          alignItems: 'center',
          gap: '16px'
        }}>
        <div data-id="vd-projai" data-name="Project" style={{
            position: 'relative',
            flex: '0 0 auto',
            order: '0',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '10px',
            width: '100%',
            maxWidth: '600px'
          }}>
          <p data-id="vd-projai-k" data-name="Label" style={{
              position: 'relative',
              flex: '0 0 auto',
              order: '0',
              fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif',
              color: '#666C73',
              fontSize: '13px',
              lineHeight: '1.4',
              fontWeight: '600',
              letterSpacing: '0.06em',
              textTransform: 'uppercase'
            }}>Project</p>
          <p data-id="vd-projai-v" data-name="Project name" style={{
              position: 'relative',
              flex: '0 0 auto',
              order: '1',
              fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif',
              fontSize: '14px',
              lineHeight: '1.4',
              fontWeight: '600',
              color: '#4358CD',
              backgroundColor: '#EEF1FD',
              borderRadius: '9999px',
              padding: '5px 12px 5px 12px'
            }}>AI Club</p>
        </div>
        <h3 data-id="vd-hai" data-name="Subheading" style={{
            position: 'relative',
            flex: '0 0 auto',
            order: '1',
            fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif',
            color: '#16191C',
            fontSize: '22px',
            lineHeight: '1.3',
            fontWeight: '600',
            width: '100%',
            maxWidth: '600px'
          }}>AI Club risograph poster</h3>
        <p data-id="vd-pai" data-name="Body" style={{
            position: 'relative',
            flex: '0 0 auto',
            order: '2',
            fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif',
            color: '#2A2E33',
            fontSize: '18px',
            lineHeight: '1.6',
            width: '100%',
            maxWidth: '600px'
          }}>A risograph poster I designed for the AI Club, with a QR code to join.</p>
        <div data-id="vd-figai" data-name="Figure" style={{
            position: 'relative',
            flex: '0 0 auto',
            order: '3',
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            maxWidth: '640px',
            gap: '10px',
            margin: '12px 0px 12px 0px'
          }}>
          <div data-id="vd-figai-card" data-name="Card" style={{
              position: 'relative',
              flex: '0 0 auto',
              order: '0',
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              padding: '12px 12px 12px 12px',
              backgroundColor: '#ffffff',
              borderRadius: '18px',
              boxShadow: '0 1px 2px rgba(20,27,77,.05), 0 8px 28px rgba(20,27,77,.08)'
            }}>
            <div data-id="vd-figai-img" data-name="Image" style={{
                position: 'relative',
                flex: '0 0 auto',
                order: '0',
                width: '100%',
                borderRadius: '10px',
                aspectRatio: '2286 / 2576',
                backgroundImage: 'url(/assets/graphic-design/ai-club-risograph-poster.webp)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }} role="img" aria-label="Hand holding the AI Club risograph poster: a green A and I with white figures on an orange background, the word club written across it, and a QR code at the bottom" />
          </div>
          <p data-id="vd-figai-cap" data-name="Caption" style={{
              position: 'relative',
              flex: '0 0 auto',
              order: '1',
              fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif',
              color: '#666C73',
              fontSize: '14px',
              lineHeight: '1.45',
              textAlign: 'center'
            }}>The AI Club risograph poster</p>
        </div>
      </div>
      <div data-id="vd-gyt" data-name="Onari video" style={{
          position: 'relative',
          flex: '0 0 auto',
          order: '1',
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          alignItems: 'center',
          gap: '16px',
          padding: '40px 0px 0px 0px',
          borderTop: '1px solid #E8EAF0',
          marginTop: '24px'
        }}>
        <div data-id="vd-projyt" data-name="Project" style={{
            position: 'relative',
            flex: '0 0 auto',
            order: '0',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '10px',
            width: '100%',
            maxWidth: '600px'
          }}>
          <p data-id="vd-projyt-k" data-name="Label" style={{
              position: 'relative',
              flex: '0 0 auto',
              order: '0',
              fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif',
              color: '#666C73',
              fontSize: '13px',
              lineHeight: '1.4',
              fontWeight: '600',
              letterSpacing: '0.06em',
              textTransform: 'uppercase'
            }}>Project</p>
          <Link data-id="vd-projyt-v" data-name="Project link" style={{
              position: 'relative',
              flex: '0 0 auto',
              order: '1',
              fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif',
              fontSize: '14px',
              lineHeight: '1.4',
              fontWeight: '600',
              color: '#4358CD',
              backgroundColor: '#EEF1FD',
              borderRadius: '9999px',
              padding: '5px 12px 5px 12px',
              textDecoration: 'none'
            }} href="https://youtu.be/lQc8seUO15g" target="_blank" rel="noopener">Watch on YouTube ↗</Link>
        </div>
        <h3 data-id="vd-hyt" data-name="Subheading" style={{
            position: 'relative',
            flex: '0 0 auto',
            order: '1',
            fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif',
            color: '#16191C',
            fontSize: '22px',
            lineHeight: '1.3',
            fontWeight: '600',
            width: '100%',
            maxWidth: '600px'
          }}>Onari</h3>
        <VideoEmbed data-id="vd-onari-video" data-name="Onari video" src="https://www.youtube.com/embed/lQc8seUO15g" title="Onari (YouTube)" aspectRatio="16 / 9" style={{
            position: 'relative',
            flex: '0 0 auto',
            order: '3',
            width: '100%',
            maxWidth: '800px',
            margin: '12px 0px 12px 0px'
          }} />
      </div>
      <div data-id="vd-g0" data-name="Whole Foods kiosk deck" style={{
          position: 'relative',
          flex: '0 0 auto',
          order: '2',
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          alignItems: 'center',
          gap: '16px',
          padding: '40px 0px 0px 0px',
          borderTop: '1px solid #E8EAF0',
          marginTop: '24px'
        }}>
        <div data-id="vd-proj0" data-name="Project" style={{
            position: 'relative',
            flex: '0 0 auto',
            order: '0',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '10px',
            width: '100%',
            maxWidth: '600px'
          }}>
          <p data-id="vd-proj0-k" data-name="Label" style={{
              position: 'relative',
              flex: '0 0 auto',
              order: '0',
              fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif',
              color: '#666C73',
              fontSize: '13px',
              lineHeight: '1.4',
              fontWeight: '600',
              letterSpacing: '0.06em',
              textTransform: 'uppercase'
            }}>Project</p>
          <Link data-id="vd-proj0-v" data-name="Project link" style={{
              position: 'relative',
              flex: '0 0 auto',
              order: '1',
              fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif',
              fontSize: '14px',
              lineHeight: '1.4',
              fontWeight: '600',
              color: '#4358CD',
              backgroundColor: '#EEF1FD',
              borderRadius: '9999px',
              padding: '5px 12px 5px 12px',
              textDecoration: 'none'
            }} href="https://www.figma.com/slides/ljH3AX3COzSD48RKRLqsqh/Whole-Foods---Self-checkout-kiosks-Deck?node-id=1-27" target="_blank" rel="noopener">Open in Figma ↗</Link>
        </div>
        <h3 data-id="vd-h0" data-name="Subheading" style={{
            position: 'relative',
            flex: '0 0 auto',
            order: '1',
            fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif',
            color: '#16191C',
            fontSize: '22px',
            lineHeight: '1.3',
            fontWeight: '600',
            width: '100%',
            maxWidth: '600px'
          }}>Whole Foods self-checkout kiosks</h3>
        <p data-id="vd-p0" data-name="Body" style={{
            position: 'relative',
            flex: '0 0 auto',
            order: '2',
            fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif',
            color: '#2A2E33',
            fontSize: '18px',
            lineHeight: '1.6',
            width: '100%',
            maxWidth: '600px'
          }}>A slide deck on self-checkout kiosks for Whole Foods.</p>
        <VideoEmbed data-id="vd-wf-deck" data-name="Whole Foods kiosk deck" src="https://embed.figma.com/slides/ljH3AX3COzSD48RKRLqsqh/Whole-Foods---Self-checkout-kiosks-Deck?node-id=1-27&embed-host=share" title="Whole Foods self-checkout kiosks deck (Figma Slides)" aspectRatio="16 / 9" style={{
            position: 'relative',
            flex: '0 0 auto',
            order: '3',
            width: '100%',
            maxWidth: '1040px',
            margin: '12px 0px 12px 0px'
          }} />
      </div>
      <div data-id="vd-g1" data-name="Metabob web animation" style={{
          position: 'relative',
          flex: '0 0 auto',
          order: '3',
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          alignItems: 'center',
          gap: '16px',
          padding: '40px 0px 0px 0px',
          borderTop: '1px solid #E8EAF0',
          marginTop: '24px'
        }}>
        <div data-id="vd-proj1" data-name="Project" style={{
            position: 'relative',
            flex: '0 0 auto',
            order: '0',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '10px',
            width: '100%',
            maxWidth: '600px'
          }}>
          <p data-id="vd-proj1-k" data-name="Label" style={{
              position: 'relative',
              flex: '0 0 auto',
              order: '0',
              fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif',
              color: '#666C73',
              fontSize: '13px',
              lineHeight: '1.4',
              fontWeight: '600',
              letterSpacing: '0.06em',
              textTransform: 'uppercase'
            }}>Project</p>
          <Link data-id="vd-proj1-v" data-name="Project link" style={{
              position: 'relative',
              flex: '0 0 auto',
              order: '1',
              fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif',
              fontSize: '14px',
              lineHeight: '1.4',
              fontWeight: '600',
              color: '#4358CD',
              backgroundColor: '#EEF1FD',
              borderRadius: '9999px',
              padding: '5px 12px 5px 12px',
              textDecoration: 'none'
            }} href="https://metabob.com" target="_blank" rel="noopener">Metabob AI ↗</Link>
        </div>
        <div data-id="vd-mb-logo" data-name="Logo" style={{
            position: 'relative',
            flex: '0 0 auto',
            order: '1',
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            maxWidth: '1040px',
            gap: '10px',
            margin: '4px 0px 20px 0px'
          }}>
          <div data-id="vd-mb-logo-card" data-name="Card" style={{
              position: 'relative',
              flex: '0 0 auto',
              order: '0',
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              padding: '12px 12px 12px 12px',
              backgroundColor: '#ffffff',
              borderRadius: '18px',
              boxShadow: '0 1px 2px rgba(20,27,77,.05), 0 8px 28px rgba(20,27,77,.08)'
            }}>
            <div data-id="vd-mb-logo-img" data-name="Image" style={{
                position: 'relative',
                flex: '0 0 auto',
                order: '0',
                width: '100%',
                borderRadius: '10px',
                aspectRatio: '1578 / 1440',
                backgroundImage: 'url(/assets/graphic-design/metabob-logo.webp)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }} role="img" aria-label="The Metabob logo, a blue-to-green bearded face with glasses beside the Metabob wordmark, shown at five sizes" />
          </div>
          <p data-id="vd-mb-logo-cap" data-name="Caption" style={{
              position: 'relative',
              flex: '0 0 auto',
              order: '1',
              fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif',
              color: '#666C73',
              fontSize: '14px',
              lineHeight: '1.45',
              textAlign: 'center'
            }}>The Metabob logo at five sizes</p>
        </div>
        <h3 data-id="vd-h1" data-name="Subheading" style={{
            position: 'relative',
            flex: '0 0 auto',
            order: '2',
            fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif',
            color: '#16191C',
            fontSize: '22px',
            lineHeight: '1.3',
            fontWeight: '600',
            width: '100%',
            maxWidth: '600px'
          }}>Metabob website design and animation</h3>
        <p data-id="vd-p1" data-name="Body" style={{
            position: 'relative',
            flex: '0 0 auto',
            order: '3',
            fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif',
            color: '#2A2E33',
            fontSize: '18px',
            lineHeight: '1.6',
            width: '100%',
            maxWidth: '600px'
          }}>I designed the Metabob website and created its animations. We were having a problem with people not immediately understanding what our product did from looking at our website. Words weren’t cutting it and still images couldn’t quite capture what we did, so I created this animation in After Effects and converted it to the Lottie web animation format.</p>
        <div data-id="vd-fig1" data-name="Figure" style={{
            position: 'relative',
            flex: '0 0 auto',
            order: '4',
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            maxWidth: '1040px',
            gap: '10px',
            margin: '12px 0px 12px 0px'
          }}>
          <LottiePlayer data-id="vd-fig1-anim" data-name="Code editor animation" src="/assets/graphic-design/lottie/metabob-code-editor.json" label="Metabob web animation: a code editor where Metabob highlights a problem and finishes its analysis" aspectRatio="443 / 300" background="#ffffff" stillFrame={300} radius={18} style={{
              position: 'relative',
              flex: '0 0 auto',
              order: '0',
              width: '100%'
            }} />
          <p data-id="vd-fig1-cap" data-name="Caption" style={{
              position: 'relative',
              flex: '0 0 auto',
              order: '1',
              fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif',
              color: '#666C73',
              fontSize: '14px',
              lineHeight: '1.45',
              textAlign: 'center'
            }}>The Metabob web animation, playing live as a Lottie</p>
        </div>
        <div data-id="vd-fig1b" data-name="Dashboard animation" style={{
            position: 'relative',
            flex: '0 0 auto',
            order: '5',
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            maxWidth: '1040px',
            gap: '10px',
            margin: '12px 0px 12px 0px'
          }}>
          <LottiePlayer data-id="vd-fig1b-anim" data-name="Dashboard animation" src="/assets/graphic-design/lottie/metabob-dashboard.json" label="Metabob dashboard animation: stat cards for bugs identified, marked important, fixed and code quality, each explained in turn" aspectRatio="1799 / 1080" background="#2B2B2B" stillFrame={500} radius={18} style={{
              position: 'relative',
              flex: '0 0 auto',
              order: '0',
              width: '100%'
            }} />
          <p data-id="vd-fig1b-cap" data-name="Caption" style={{
              position: 'relative',
              flex: '0 0 auto',
              order: '1',
              fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif',
              color: '#666C73',
              fontSize: '14px',
              lineHeight: '1.45',
              textAlign: 'center'
            }}>Dashboard animation explaining each Metabob stat card</p>
        </div>
        <div data-id="vd-mb-process" data-name="Logo process" style={{
            position: 'relative',
            flex: '0 0 auto',
            order: '6',
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            maxWidth: '1040px',
            gap: '14px',
            margin: '28px 0px 12px 0px',
            alignItems: 'center'
          }}>
          <h3 data-id="vd-mb-process-h" data-name="Subheading" style={{
              position: 'relative',
              flex: '0 0 auto',
              order: '0',
              fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif',
              color: '#16191C',
              fontSize: '22px',
              lineHeight: '1.3',
              fontWeight: '600',
              width: '100%',
              maxWidth: '600px'
            }}>Metabob logo design process</h3>
          <ImageCarousel data-id="vd-mb-carousel" data-name="Logo process carousel" label="Metabob logo design process" aspectRatio="1940 / 1458" radius={18} images="/assets/graphic-design/metabob-logo-process/metabob-logo-process-01.webp,/assets/graphic-design/metabob-logo-process/metabob-logo-process-02.webp,/assets/graphic-design/metabob-logo-process/metabob-logo-process-03.webp,/assets/graphic-design/metabob-logo-process/metabob-logo-process-04.webp,/assets/graphic-design/metabob-logo-process/metabob-logo-process-05.webp,/assets/graphic-design/metabob-logo-process/metabob-logo-process-06.webp,/assets/graphic-design/metabob-logo-process/metabob-logo-process-07.webp,/assets/graphic-design/metabob-logo-process/metabob-logo-process-08.webp,/assets/graphic-design/metabob-logo-process/metabob-logo-process-09.webp,/assets/graphic-design/metabob-logo-process/metabob-logo-process-10.webp" captions="The starting point: a hand-drawn sketch|Tracing the sketch into a vector shape|The simplified vector next to the original drawing|Refining the face: glasses, beard and hair|First variations with the wordmark|Comparing variations side by side, including color|The full exploration board|The team vote: green dots on the favorites|Trying the chosen mark in color and in context|The final Metabob logo" style={{
              position: 'relative',
              flex: '0 0 auto',
              order: '1',
              width: '100%'
            }} />
        </div>
        <div data-id="vd-mb-product" data-name="Web app design" style={{
            position: 'relative',
            flex: '0 0 auto',
            order: '7',
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            maxWidth: '1040px',
            gap: '14px',
            margin: '28px 0px 12px 0px',
            alignItems: 'center'
          }}>
          <h3 data-id="vd-mb-product-h" data-name="Subheading" style={{
              position: 'relative',
              flex: '0 0 auto',
              order: '0',
              fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif',
              color: '#16191C',
              fontSize: '22px',
              lineHeight: '1.3',
              fontWeight: '600',
              width: '100%',
              maxWidth: '600px'
            }}>Metabob web app design</h3>
          <ImageCarousel data-id="vd-mb-product-carousel" data-name="Web app design carousel" label="Metabob web app design screens" aspectRatio="16 / 10" fit="contain" background="#0D0C01" radius={18} images="/assets/graphic-design/metabob-product/metabob-product-02.webp,/assets/graphic-design/metabob-product/metabob-product-03.webp,/assets/graphic-design/metabob-product/metabob-product-04.webp,/assets/graphic-design/metabob-product/metabob-product-05.webp,/assets/graphic-design/metabob-product/metabob-product-06.webp,/assets/graphic-design/metabob-product/metabob-product-01.webp,/assets/graphic-design/metabob-product/metabob-product-07.webp" captions="Dashboard change: quality and security at a glance per repo|Building blocks: stats panel, side nav and contributor cards|Adding a repository, with selected and hover states|Onboarding: pick a repo, then choose the metrics you care about|Problem review: filters, flagged code and what to do with each problem|The main flow: repo dashboard into the problem review screens|Two user flows: viewing the most severe problems, and turning a problem into an issue" style={{
              position: 'relative',
              flex: '0 0 auto',
              order: '1',
              width: '100%'
            }} />
        </div>
      </div>
      <div data-id="vd-g2" data-name="Modest Approach business card" style={{
          position: 'relative',
          flex: '0 0 auto',
          order: '4',
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          alignItems: 'center',
          gap: '16px',
          padding: '40px 0px 0px 0px',
          borderTop: '1px solid #E8EAF0',
          marginTop: '24px'
        }}>
        <div data-id="vd-proj2" data-name="Project" style={{
            position: 'relative',
            flex: '0 0 auto',
            order: '0',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '10px',
            width: '100%',
            maxWidth: '600px'
          }}>
          <p data-id="vd-proj2-k" data-name="Label" style={{
              position: 'relative',
              flex: '0 0 auto',
              order: '0',
              fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif',
              color: '#666C73',
              fontSize: '13px',
              lineHeight: '1.4',
              fontWeight: '600',
              letterSpacing: '0.06em',
              textTransform: 'uppercase'
            }}>Project</p>
          <p data-id="vd-proj2-v" data-name="Project name" style={{
              position: 'relative',
              flex: '0 0 auto',
              order: '1',
              fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif',
              fontSize: '14px',
              lineHeight: '1.4',
              fontWeight: '600',
              color: '#4358CD',
              backgroundColor: '#EEF1FD',
              borderRadius: '9999px',
              padding: '5px 12px 5px 12px'
            }}>Modest Approach</p>
        </div>
        <h3 data-id="vd-h2" data-name="Subheading" style={{
            position: 'relative',
            flex: '0 0 auto',
            order: '1',
            fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif',
            color: '#16191C',
            fontSize: '22px',
            lineHeight: '1.3',
            fontWeight: '600',
            width: '100%',
            maxWidth: '600px'
          }}>Modest Approach business card</h3>
        <p data-id="vd-p2" data-name="Body" style={{
            position: 'relative',
            flex: '0 0 auto',
            order: '2',
            fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif',
            color: '#2A2E33',
            fontSize: '18px',
            lineHeight: '1.6',
            width: '100%',
            maxWidth: '600px'
          }}>The front and back of the Modest Approach card. The MA mark is built from a few simple triangles, and the back crops it large in white over the blue.</p>
        <div data-id="vd-fig2" data-name="Figure" style={{
            position: 'relative',
            flex: '0 0 auto',
            order: '3',
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            maxWidth: '1040px',
            gap: '10px',
            margin: '12px 0px 12px 0px'
          }}>
          <div data-id="vd-fig2-card" data-name="Card" style={{
              position: 'relative',
              flex: '0 0 auto',
              order: '0',
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              padding: '12px 12px 12px 12px',
              backgroundColor: '#ffffff',
              borderRadius: '18px',
              boxShadow: '0 1px 2px rgba(20,27,77,.05), 0 8px 28px rgba(20,27,77,.08)'
            }}>
            <div data-id="vd-fig2-img" data-name="Image" style={{
                position: 'relative',
                flex: '0 0 auto',
                order: '0',
                width: '100%',
                borderRadius: '10px',
                aspectRatio: '1584 / 1250',
                backgroundImage: 'url(/assets/graphic-design/modest-approach-business-card.webp)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }} role="img" aria-label="Front and back of the Modest Approach business card" />
          </div>
          <p data-id="vd-fig2-cap" data-name="Caption" style={{
              position: 'relative',
              flex: '0 0 auto',
              order: '1',
              fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif',
              color: '#666C73',
              fontSize: '14px',
              lineHeight: '1.45',
              textAlign: 'center'
            }}>Modest Approach business card, front and back</p>
        </div>
        <div data-id="vd-fig2p" data-name="Process figure" style={{
            position: 'relative',
            flex: '0 0 auto',
            order: '4',
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            maxWidth: '1040px',
            gap: '10px',
            margin: '12px 0px 12px 0px'
          }}>
          <div data-id="vd-fig2p-card" data-name="Card" style={{
              position: 'relative',
              flex: '0 0 auto',
              order: '0',
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              padding: '12px 12px 12px 12px',
              backgroundColor: '#ffffff',
              borderRadius: '18px',
              boxShadow: '0 1px 2px rgba(20,27,77,.05), 0 8px 28px rgba(20,27,77,.08)'
            }}>
            <div data-id="vd-fig2p-img" data-name="Image" style={{
                position: 'relative',
                flex: '0 0 auto',
                order: '0',
                width: '100%',
                borderRadius: '10px',
                aspectRatio: '2000 / 1391',
                backgroundImage: 'url(/assets/graphic-design/modest-approach-logo-process.webp)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }} role="img" aria-label="Sketch board of Modest Approach logo explorations" />
          </div>
          <p data-id="vd-fig2p-cap" data-name="Caption" style={{
              position: 'relative',
              flex: '0 0 auto',
              order: '1',
              fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif',
              color: '#666C73',
              fontSize: '14px',
              lineHeight: '1.45',
              textAlign: 'center'
            }}>Logo design process: spacing tests, shape studies and the variations that led to the MA mark</p>
        </div>
        <div data-id="vd-fig2k" data-name="Knife figure" style={{
            position: 'relative',
            flex: '0 0 auto',
            order: '5',
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            maxWidth: '1040px',
            gap: '10px',
            margin: '12px 0px 12px 0px'
          }}>
          <div data-id="vd-fig2k-card" data-name="Card" style={{
              position: 'relative',
              flex: '0 0 auto',
              order: '0',
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              padding: '12px 12px 12px 12px',
              backgroundColor: '#ffffff',
              borderRadius: '18px',
              boxShadow: '0 1px 2px rgba(20,27,77,.05), 0 8px 28px rgba(20,27,77,.08)'
            }}>
            <div data-id="vd-fig2k-img" data-name="Image" style={{
                position: 'relative',
                flex: '0 0 auto',
                order: '0',
                width: '100%',
                borderRadius: '10px',
                aspectRatio: '2000 / 1500',
                backgroundImage: 'url(/assets/graphic-design/modest-approach-knife-engraving.webp)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }} role="img" aria-label="Modest Approach logo engraved on a steel knife blade, with Made in San Francisco below it" />
          </div>
          <p data-id="vd-fig2k-cap" data-name="Caption" style={{
              position: 'relative',
              flex: '0 0 auto',
              order: '1',
              fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif',
              color: '#666C73',
              fontSize: '14px',
              lineHeight: '1.45',
              textAlign: 'center'
            }}>The mark engraved on a Modest Approach knife blade, made in San Francisco</p>
        </div>
        <div data-id="vd-fig2v" data-name="Knife video" style={{
            position: 'relative',
            flex: '0 0 auto',
            order: '6',
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            maxWidth: '1040px',
            gap: '10px',
            margin: '12px 0px 12px 0px'
          }}>
          <div data-id="vd-fig2v-card" data-name="Card" style={{
              position: 'relative',
              flex: '0 0 auto',
              order: '0',
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              padding: '12px 12px 12px 12px',
              backgroundColor: '#ffffff',
              borderRadius: '18px',
              boxShadow: '0 1px 2px rgba(20,27,77,.05), 0 8px 28px rgba(20,27,77,.08)'
            }}>
            <video data-id="vd-fig2v-video" data-name="Video" src="/assets/graphic-design/modest-approach-knife.mp4" poster="/assets/graphic-design/modest-approach-knife-poster.webp" autoPlay muted loop playsInline aria-label="A steel knife whose handle spells KNIFE, on a white surface" style={{
                position: 'relative',
                flex: '0 0 auto',
                order: '0',
                width: '100%',
                height: 'auto',
                aspectRatio: '16 / 9',
                borderRadius: '10px',
                objectFit: 'cover',
                display: 'block'
              }} />
          </div>
          <p data-id="vd-fig2v-cap" data-name="Caption" style={{
              position: 'relative',
              flex: '0 0 auto',
              order: '1',
              fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif',
              color: '#666C73',
              fontSize: '14px',
              lineHeight: '1.45',
              textAlign: 'center'
            }}>A name knife from the Modest Approach shop: the handle spells the word</p>
        </div>
      </div>
      <div data-id="vd-g3" data-name="Gift app video" style={{
          position: 'relative',
          flex: '0 0 auto',
          order: '5',
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          alignItems: 'center',
          gap: '16px',
          padding: '40px 0px 0px 0px',
          borderTop: '1px solid #E8EAF0',
          marginTop: '24px'
        }}>
        <div data-id="vd-proj3" data-name="Project" style={{
            position: 'relative',
            flex: '0 0 auto',
            order: '0',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '10px',
            width: '100%',
            maxWidth: '600px'
          }}>
          <p data-id="vd-proj3-k" data-name="Label" style={{
              position: 'relative',
              flex: '0 0 auto',
              order: '0',
              fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif',
              color: '#666C73',
              fontSize: '13px',
              lineHeight: '1.4',
              fontWeight: '600',
              letterSpacing: '0.06em',
              textTransform: 'uppercase'
            }}>Project</p>
          <Link data-id="vd-proj3-v" data-name="Project link" style={{
              position: 'relative',
              flex: '0 0 auto',
              order: '1',
              fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif',
              fontSize: '14px',
              lineHeight: '1.4',
              fontWeight: '600',
              color: '#4358CD',
              backgroundColor: '#EEF1FD',
              borderRadius: '9999px',
              padding: '5px 12px 5px 12px',
              textDecoration: 'none'
            }} href="/work/gift-app">Gift App →</Link>
        </div>
        <h3 data-id="vd-h3" data-name="Subheading" style={{
            position: 'relative',
            flex: '0 0 auto',
            order: '1',
            fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif',
            color: '#16191C',
            fontSize: '22px',
            lineHeight: '1.3',
            fontWeight: '600',
            width: '100%',
            maxWidth: '600px'
          }}>Gift app (skip to 30 seconds)</h3>
        <p data-id="vd-p3" data-name="Body" style={{
            position: 'relative',
            flex: '0 0 auto',
            order: '2',
            fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif',
            color: '#2A2E33',
            fontSize: '18px',
            lineHeight: '1.6',
            width: '100%',
            maxWidth: '600px'
          }}>This is the video for my senior design project. I motion tracked a screen recording of the prototype I created over the phone, and I had to re-enact all the button presses to make the video believable. I also created all the animations in the transitions from scratch.</p>
        <VideoEmbed data-id="vd-gift-video" data-name="Gift App video" src="https://player.vimeo.com/video/161241328" title="GiftAd (Vimeo)" aspectRatio="16 / 9" style={{
            position: 'relative',
            flex: '0 0 auto',
            order: '3',
            width: '100%',
            maxWidth: '760px',
            margin: '12px 0px 12px 0px'
          }} />
      </div>
      <div data-id="vd-g4" data-name="KromaKicks video" style={{
          position: 'relative',
          flex: '0 0 auto',
          order: '6',
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          alignItems: 'center',
          gap: '16px',
          padding: '40px 0px 0px 0px',
          borderTop: '1px solid #E8EAF0',
          marginTop: '24px'
        }}>
        <div data-id="vd-proj4" data-name="Project" style={{
            position: 'relative',
            flex: '0 0 auto',
            order: '0',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '10px',
            width: '100%',
            maxWidth: '600px'
          }}>
          <p data-id="vd-proj4-k" data-name="Label" style={{
              position: 'relative',
              flex: '0 0 auto',
              order: '0',
              fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif',
              color: '#666C73',
              fontSize: '13px',
              lineHeight: '1.4',
              fontWeight: '600',
              letterSpacing: '0.06em',
              textTransform: 'uppercase'
            }}>Project</p>
          <Link data-id="vd-proj4-v" data-name="Project link" style={{
              position: 'relative',
              flex: '0 0 auto',
              order: '1',
              fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif',
              fontSize: '14px',
              lineHeight: '1.4',
              fontWeight: '600',
              color: '#4358CD',
              backgroundColor: '#EEF1FD',
              borderRadius: '9999px',
              padding: '5px 12px 5px 12px',
              textDecoration: 'none'
            }} href="https://www.kickstarter.com/projects/kromakicks/kroma-kicks-dancewear-reimagined" target="_blank" rel="noopener">KromaKicks ↗</Link>
        </div>
        <h3 data-id="vd-h4" data-name="Subheading" style={{
            position: 'relative',
            flex: '0 0 auto',
            order: '1',
            fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif',
            color: '#16191C',
            fontSize: '22px',
            lineHeight: '1.3',
            fontWeight: '600',
            width: '100%',
            maxWidth: '600px'
          }}>KromaKicks</h3>
        <p data-id="vd-p4" data-name="Body" style={{
            position: 'relative',
            flex: '0 0 auto',
            order: '2',
            fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif',
            color: '#2A2E33',
            fontSize: '18px',
            lineHeight: '1.6',
            width: '100%',
            maxWidth: '600px'
          }}>This was the Kickstarter video for the product I built from scratch along with some of my friends.</p>
        <VideoEmbed data-id="vd-ks-video" data-name="KromaKicks Kickstarter video" src="https://www.kickstarter.com/projects/kromakicks/kroma-kicks-dancewear-reimagined/widget/video.html" title="Kroma Kicks: Dancewear Reimagined (Kickstarter video)" aspectRatio="16 / 9" style={{
            position: 'relative',
            flex: '0 0 auto',
            order: '3',
            width: '100%',
            maxWidth: '760px',
            margin: '12px 0px 12px 0px'
          }} />
        <div data-id="vd-ks-site" data-name="Website preview" style={{
            position: 'relative',
            flex: '0 0 auto',
            order: '4',
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            maxWidth: '560px',
            gap: '10px',
            margin: '12px 0px 12px 0px'
          }}>
          <Link data-id="vd-ks-site-card" data-name="Browser" href="https://www.kickstarter.com/projects/kromakicks/kroma-kicks-dancewear-reimagined" target="_blank" rel="noopener" style={{
              position: 'relative',
              flex: '0 0 auto',
              order: '0',
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              overflow: 'hidden',
              backgroundColor: '#ffffff',
              borderRadius: '14px',
              border: '1px solid #E8EAF0',
              boxShadow: '0 1px 2px rgba(20,27,77,.05), 0 8px 28px rgba(20,27,77,.08)',
              textDecoration: 'none'
            }}>
            <div data-id="vd-ks-site-bar" data-name="Browser bar" style={{
                position: 'relative',
                flex: '0 0 auto',
                order: '0',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: '6px',
                width: '100%',
                padding: '10px 14px 10px 14px',
                backgroundColor: '#F4F5F8',
                borderBottom: '1px solid #E8EAF0'
              }}>
              <div data-id="vd-ks-site-dot1" data-name="Dot" style={{
                  position: 'relative',
                  flex: '0 0 auto',
                  order: '0',
                  width: '10px',
                  height: '10px',
                  borderRadius: '9999px',
                  backgroundColor: '#FF5F57'
                }} />
              <div data-id="vd-ks-site-dot2" data-name="Dot" style={{
                  position: 'relative',
                  flex: '0 0 auto',
                  order: '1',
                  width: '10px',
                  height: '10px',
                  borderRadius: '9999px',
                  backgroundColor: '#FEBC2E'
                }} />
              <div data-id="vd-ks-site-dot3" data-name="Dot" style={{
                  position: 'relative',
                  flex: '0 0 auto',
                  order: '2',
                  width: '10px',
                  height: '10px',
                  borderRadius: '9999px',
                  backgroundColor: '#28C840'
                }} />
              <p data-id="vd-ks-site-url" data-name="Address" style={{
                  position: 'relative',
                  flex: '1 0 0px',
                  order: '3',
                  width: '0px',
                  margin: '0px 0px 0px 10px',
                  padding: '4px 10px 4px 10px',
                  backgroundColor: '#ffffff',
                  borderRadius: '6px',
                  fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif',
                  color: '#666C73',
                  fontSize: '12px',
                  lineHeight: '1.4',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}>kickstarter.com/projects/kromakicks/kroma-kicks-dancewear-reimagined</p>
            </div>
            <div data-id="vd-ks-site-img" data-name="Image" style={{
                position: 'relative',
                flex: '0 0 auto',
                order: '1',
                width: '100%',
                aspectRatio: '1030 / 1348',
                backgroundImage: 'url(/assets/graphic-design/kromakicks-kickstarter-page.webp)',
                backgroundSize: 'cover',
                backgroundPosition: 'top center',
                backgroundRepeat: 'no-repeat'
              }} role="img" aria-label="The KromaKicks Kickstarter page: what you're getting, with a labelled diagram of the Kroma Kicks" />
          </Link>
          <p data-id="vd-ks-site-cap" data-name="Caption" style={{
              position: 'relative',
              flex: '0 0 auto',
              order: '1',
              fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif',
              color: '#666C73',
              fontSize: '14px',
              lineHeight: '1.45',
              textAlign: 'center'
            }}>A section of the KromaKicks Kickstarter page</p>
        </div>
      </div>
      <div data-id="vd-g5" data-name="Artisense company video" style={{
          position: 'relative',
          flex: '0 0 auto',
          order: '7',
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          alignItems: 'center',
          gap: '16px',
          padding: '40px 0px 0px 0px',
          borderTop: '1px solid #E8EAF0',
          marginTop: '24px'
        }}>
        <div data-id="vd-proj5" data-name="Project" style={{
            position: 'relative',
            flex: '0 0 auto',
            order: '0',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '10px',
            width: '100%',
            maxWidth: '600px'
          }}>
          <p data-id="vd-proj5-k" data-name="Label" style={{
              position: 'relative',
              flex: '0 0 auto',
              order: '0',
              fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif',
              color: '#666C73',
              fontSize: '13px',
              lineHeight: '1.4',
              fontWeight: '600',
              letterSpacing: '0.06em',
              textTransform: 'uppercase'
            }}>Project</p>
          <Link data-id="vd-proj5-v" data-name="Project link" style={{
              position: 'relative',
              flex: '0 0 auto',
              order: '1',
              fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif',
              fontSize: '14px',
              lineHeight: '1.4',
              fontWeight: '600',
              color: '#4358CD',
              backgroundColor: '#EEF1FD',
              borderRadius: '9999px',
              padding: '5px 12px 5px 12px',
              textDecoration: 'none'
            }} href="https://artisense.ai" target="_blank" rel="noopener">Artisense ↗</Link>
        </div>
        <h3 data-id="vd-h5" data-name="Subheading" style={{
            position: 'relative',
            flex: '0 0 auto',
            order: '1',
            fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif',
            color: '#16191C',
            fontSize: '22px',
            lineHeight: '1.3',
            fontWeight: '600',
            width: '100%',
            maxWidth: '600px'
          }}>Company video (2017)</h3>
        <p data-id="vd-p5" data-name="Body" style={{
            position: 'relative',
            flex: '0 0 auto',
            order: '2',
            fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif',
            color: '#2A2E33',
            fontSize: '18px',
            lineHeight: '1.6',
            width: '100%',
            maxWidth: '600px'
          }}>This video was used as an onboarding video for Artisense. It was necessary because we were finding the topic of SLAM too complicated to explain by other means. I had to come up with the entire script, get the best-looking footage from the scientists, and edit the video. Funny story: two years after leaving the company, the next time I visited, everyone knew my name because of this video.</p>
        <VideoEmbed data-id="vd-artisense-video" data-name="Artisense company video" src="https://player.vimeo.com/video/226210207" title="Inside look at Artisense (Vimeo)" aspectRatio="16 / 9" style={{
            position: 'relative',
            flex: '0 0 auto',
            order: '3',
            width: '100%',
            maxWidth: '760px',
            margin: '12px 0px 12px 0px'
          }} />
      </div>
      <div data-id="vd-g6" data-name="Hand-crafted notes" style={{
          position: 'relative',
          flex: '0 0 auto',
          order: '8',
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          alignItems: 'center',
          gap: '16px',
          padding: '40px 0px 0px 0px',
          borderTop: '1px solid #E8EAF0',
          marginTop: '24px'
        }}>
        <div data-id="vd-proj6" data-name="Project" style={{
            position: 'relative',
            flex: '0 0 auto',
            order: '0',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '10px',
            width: '100%',
            maxWidth: '600px'
          }}>
          <p data-id="vd-proj6-k" data-name="Label" style={{
              position: 'relative',
              flex: '0 0 auto',
              order: '0',
              fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif',
              color: '#666C73',
              fontSize: '13px',
              lineHeight: '1.4',
              fontWeight: '600',
              letterSpacing: '0.06em',
              textTransform: 'uppercase'
            }}>Project</p>
          <Link data-id="vd-proj6-v" data-name="Project link" style={{
              position: 'relative',
              flex: '0 0 auto',
              order: '1',
              fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif',
              fontSize: '14px',
              lineHeight: '1.4',
              fontWeight: '600',
              color: '#4358CD',
              backgroundColor: '#EEF1FD',
              borderRadius: '9999px',
              padding: '5px 12px 5px 12px',
              textDecoration: 'none'
            }} href="/work/gift-app">Gift App →</Link>
        </div>
        <h3 data-id="vd-h6" data-name="Subheading" style={{
            position: 'relative',
            flex: '0 0 auto',
            order: '1',
            fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif',
            color: '#16191C',
            fontSize: '22px',
            lineHeight: '1.3',
            fontWeight: '600',
            width: '100%',
            maxWidth: '600px'
          }}>Hand-crafted notes</h3>
        <p data-id="vd-p6" data-name="Body" style={{
            position: 'relative',
            flex: '0 0 auto',
            order: '2',
            fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif',
            color: '#2A2E33',
            fontSize: '18px',
            lineHeight: '1.6',
            width: '100%',
            maxWidth: '600px'
          }}>Premium hand-written and hand-drawn notes I made, the starting point for the Gift App.</p>
        <ImageCarousel data-id="vd-notes-carousel" data-name="Notes carousel" label="Hand-crafted note examples" aspectRatio="3 / 2" fit="contain" background="#F4F2EE" radius={18} images="/assets/gift-app/hero-note.webp,/assets/gift-app/note-photo-0409.webp,/assets/gift-app/note-photo-0437.webp,/assets/gift-app/note-photo-0370.webp,/assets/gift-app/note-photo-0410.webp,/assets/gift-app/note-photo-0500.webp,/assets/gift-app/note-photo-0415.webp,/assets/gift-app/note-photo-0434.webp,/assets/gift-app/note-photo-0526.webp,/assets/gift-app/note-photo-0447.webp,/assets/gift-app/note-photo-0465.webp" captions="" style={{
            position: 'relative',
            flex: '0 0 auto',
            order: '3',
            width: '100%',
            maxWidth: '1040px',
            margin: '12px 0px 12px 0px'
          }} />
      </div>
    </div>
  </div>
  <div data-id="footer" data-name="Footer" style={{
      position: 'relative',
      flex: '0 0 auto',
      order: '3',
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      alignItems: 'center',
      gap: '0px',
      marginTop: '96px',
      padding: '72px 20px 56px 20px',
      backgroundColor: '#F5F5F5'
    }}>
    <p data-id="footer-l1" data-name="Line 1" style={{
        position: 'relative',
        flex: '0 0 auto',
        order: '0',
        fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif',
        color: '#16191C',
        fontSize: '26px',
        lineHeight: '1.2',
        fontWeight: '600',
        textAlign: 'center'
      }}>Thanks for reading.</p>
    <p data-id="footer-l2" data-name="Line 2" style={{
        position: 'relative',
        flex: '0 0 auto',
        order: '1',
        fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif',
        color: '#8A8F96',
        fontSize: '26px',
        lineHeight: '1.2',
        fontWeight: '600',
        textAlign: 'center'
      }}>Let's make something.</p>
    <div data-id="footer-hi" data-name="Say hi" style={{
        position: 'relative',
        flex: '0 0 auto',
        order: '2',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '6px',
        flexWrap: 'wrap',
        marginTop: '14px'
      }}>
      <Link data-id="footer-mail" data-name="Email" style={{
          position: 'relative',
          flex: '0 0 auto',
          order: '0',
          fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif',
          fontSize: '14px',
          lineHeight: '1.5',
          color: '#4358CD',
          textDecoration: 'underline'
        }} href="mailto:theodoreyd@gmail.com">theodoreyd@gmail.com</Link>
    </div>
    <div data-id="footer-rule" data-name="Rule" style={{
        position: 'relative',
        flex: '0 0 auto',
        order: '3',
        width: '100%',
        maxWidth: '760px',
        height: '1px',
        backgroundColor: '#DDDDDD',
        margin: '40px 0px 40px 0px'
      }} />
    <p data-id="footer-sig" data-name="Signature" style={{
        position: 'relative',
        flex: '0 0 auto',
        order: '4',
        fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif',
        color: '#16191C',
        fontSize: '12px',
        lineHeight: '1.4',
        textAlign: 'center'
      }}><span style={{
          fontWeight: '700'
        }}>Ted Dessert</span> © 2026</p>
  </div>
</div>;
}