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

export default function Page() {
  return (
<div data-id="root" data-name="Kickback · Strategy and research" style={{ position: 'relative', display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center', backgroundColor: '#ffffff' }}>
  <style>{`
    @media (max-width: 1024px) and (min-width: 430.02px) {
      [data-id="hero-title"] { font-size: 44px !important; }
      [data-id="features-grid"] { grid-template-columns: repeat(3, minmax(0, 1fr)) !important; }
      [data-id="project-grid"] { grid-template-columns: minmax(0, 1fr) !important; }
    }
    @media (max-width: 430px) {
      [data-id="site-nav"] { padding: 16px 20px 16px 20px !important; }
      [data-id="hero"] { padding: 64px 20px 120px 20px !important; }
      [data-id="hero-title"] { font-size: 32px !important; }
      [data-id="problem-grid"] { grid-template-columns: minmax(0, 1fr) !important; }
      [data-id="how-grid"] { grid-template-columns: minmax(0, 1fr) !important; }
      [data-id="features-grid"] { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; gap: 28px 16px !important; }
      [data-id="project-grid"] { grid-template-columns: minmax(0, 1fr) !important; }
      [data-id="project-summary"], [data-id="project-details"] { padding: 22px 22px 22px 22px !important; }
      [data-id="what-h"], [data-id="hack-h"], [data-id="problem-h"], [data-id="solution-h"], [data-id="how-h"], [data-id="research0-h"], [data-id="proto-h"], [data-id="sheet-h"], [data-id="mvp1-h"], [data-id="mvp2-h"], [data-id="mvp3-h"], [data-id="next-h"] { font-size: 27px !important; }
    }
  `}</style>
  <div data-id="site-nav" data-name="Site nav" style={{ position: 'relative', flex: '0 0 auto', order: '0', display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', padding: '22px 40px 22px 40px' }}>
    <Link data-id="site-nav-home" data-name="Back to home" style={{ position: 'relative', flex: '0 0 auto', order: '0', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#16191C', fontSize: '14px', lineHeight: '1.4', fontWeight: '600', padding: '8px 14px 8px 12px', borderRadius: '9999px', border: '1px solid #E3E6EF', backgroundColor: '#ffffff', textDecoration: 'none' }} href="/">← Back to home</Link>
    <div data-id="site-nav-links" data-name="Links" style={{ position: 'relative', flex: '0 0 auto', order: '1', display: 'flex', flexDirection: 'row', gap: '22px', flexWrap: 'wrap' }}>
      <Link data-id="site-nav-work" data-name="Work" style={{ position: 'relative', flex: '0 0 auto', order: '0', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#2A2E33', fontSize: '15px', lineHeight: '1.2', textDecoration: 'none' }} href="/">Work</Link>
      <Link data-id="site-nav-about" data-name="About" style={{ position: 'relative', flex: '0 0 auto', order: '1', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#2A2E33', fontSize: '15px', lineHeight: '1.2', textDecoration: 'none' }} href="/about">About</Link>
      <Link data-id="site-nav-process" data-name="Process" style={{ position: 'relative', flex: '0 0 auto', order: '2', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#2A2E33', fontSize: '15px', lineHeight: '1.2', textDecoration: 'none' }} href="/process">Process</Link>
      <Link data-id="site-nav-blog" data-name="Blog" style={{ position: 'relative', flex: '0 0 auto', order: '3', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#2A2E33', fontSize: '15px', lineHeight: '1.2', textDecoration: 'none' }} href="/blog">Blog</Link>
    </div>
  </div>
  <div data-id="hero" data-name="Hero" style={{ position: 'relative', flex: '0 0 auto', order: '1', display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center', padding: '96px 20px 160px 20px', backgroundImage: 'linear-gradient(rgba(255,255,255,.05) 1px, rgba(0,0,0,0) 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, rgba(0,0,0,0) 1px), radial-gradient(120% 90% at 50% 0%, #3A4CC0 0%, #1E2A78 46%, #0F1540 100%)', backgroundSize: '56px 56px, 56px 56px, 100% 100%' }}>
      <p data-id="hero-eyebrow" data-name="Eyebrow" style={{ position: 'relative', flex: '0 0 auto', order: '0', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#C9D1FF', fontSize: '13px', lineHeight: '1.3', fontWeight: '700', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '16px', textAlign: 'center' }}>Kickback · Strategy and research</p>
      <h1 data-id="hero-title" data-name="Title" style={{ position: 'relative', flex: '0 0 auto', order: '1', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#ffffff', maxWidth: '820px', fontSize: '56px', lineHeight: '1.08', fontWeight: '700', letterSpacing: '-0.02em', textAlign: 'center', marginBottom: '22px' }}>Kickback – A 2D Metaverse</h1>
      <div data-id="hero-chips" data-name="Chips" style={{ position: 'relative', flex: '0 0 auto', order: '2', display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: '10px', flexWrap: 'wrap' }}>
        <Link data-id="chip-overview" data-name="Chip" style={{ position: 'relative', flex: '0 0 auto', order: '0', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', fontSize: '14px', lineHeight: '1.4', color: '#ffffff', padding: '7px 14px 7px 14px', borderRadius: '9999px', backgroundColor: 'rgba(255,255,255,.12)', border: '1px solid rgba(255,255,255,.16)', textDecoration: 'none' }} href="/work/kickback">← Kickback overview</Link>
        <Link data-id="chip-how" data-name="Chip" style={{ position: 'relative', flex: '0 0 auto', order: '1', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', fontSize: '14px', lineHeight: '1.4', color: '#ffffff', padding: '7px 14px 7px 14px', borderRadius: '9999px', backgroundColor: 'rgba(255,255,255,.12)', border: '1px solid rgba(255,255,255,.16)', textDecoration: 'none' }} href="#how">How the bubbles work ↓</Link>
        <Link data-id="chip-mvps" data-name="Chip" style={{ position: 'relative', flex: '0 0 auto', order: '2', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', fontSize: '14px', lineHeight: '1.4', color: '#ffffff', padding: '7px 14px 7px 14px', borderRadius: '9999px', backgroundColor: 'rgba(255,255,255,.12)', border: '1px solid rgba(255,255,255,.16)', textDecoration: 'none' }} href="#mvps">Three MVPs ↓</Link>
      </div>
    </div>
  <div data-id="banner" data-name="Banner" style={{ position: 'relative', flex: '0 0 auto', order: '2', display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center', padding: '0px 20px 0px 20px', marginTop: '-112px' }}>
      <div data-id="banner-card" data-name="Card" style={{ position: 'relative', flex: '0 0 auto', order: '0', display: 'flex', flexDirection: 'column', width: '100%', maxWidth: '1040px', overflow: 'hidden', borderRadius: '20px', backgroundColor: '#4E63E8', boxShadow: '0 1px 2px rgba(20,27,77,.05), 0 8px 28px rgba(20,27,77,.08)' }}>
        <div data-id="banner-img" data-name="Image" style={{ position: 'relative', flex: '0 0 auto', order: '0', width: '100%', aspectRatio: '2000 / 1372', backgroundImage: 'url(/assets/kickback-strategy/banner.webp)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }} role="img" aria-label="The Kickback beta landing page: an iPhone showing video bubbles on a dark canvas, with open seats in the first round of beta testing and a grid of face icons" />
      </div>
    </div>
  <div data-id="what" data-name="What is Kickback" style={{ position: 'relative', flex: '0 0 auto', order: '3', display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center', padding: '72px 20px 0px 20px' }}>
      <div data-id="what-in" data-name="Column" style={{ position: 'relative', flex: '0 0 auto', order: '0', display: 'flex', flexDirection: 'column', width: '100%', maxWidth: '600px', gap: '16px' }}>
        <h2 data-id="what-h" data-name="Heading" style={{ position: 'relative', flex: '0 0 auto', order: '0', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#4358CD', fontSize: '32px', lineHeight: '1.15', fontWeight: '700', letterSpacing: '-0.01em' }}>What is Kickback?</h2>
        <p data-id="what-p1" data-name="Body" style={{ position: 'relative', flex: '0 0 auto', order: '1', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#2A2E33', fontSize: '18px', lineHeight: '1.6' }}>Kickback is a 2D metaverse app. You can simply move around and talk to others in a way that feels less confined than a Zoom meeting.</p>
        <p data-id="what-p2" data-name="Body" style={{ position: 'relative', flex: '0 0 auto', order: '2', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#2A2E33', fontSize: '18px', lineHeight: '1.6' }}>During the quarantine of 2021, I found myself having a lot more time than normal, so I went about trying to solve what I saw as one of the most annoying problems at the time: Zoom meetings. I entered a hackathon with this idea, and ended up getting 1st place. After, I founded a startup and we brought this idea to life.</p>
      </div>
    </div>
  <div data-id="hack" data-name="Hackathon" style={{ position: 'relative', flex: '0 0 auto', order: '4', display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center', padding: '72px 20px 0px 20px' }}>
      <div data-id="hack-in" data-name="Column" style={{ position: 'relative', flex: '0 0 auto', order: '0', display: 'flex', flexDirection: 'column', width: '100%', maxWidth: '600px', gap: '16px' }}>
        <p data-id="hack-k" data-name="Kicker" style={{ position: 'relative', flex: '0 0 auto', order: '0', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#4358CD', fontSize: '14px', lineHeight: '1.4', fontWeight: '600', letterSpacing: '0.02em' }}>Grand Prize Winner</p>
        <h2 data-id="hack-h" data-name="Heading" style={{ position: 'relative', flex: '0 0 auto', order: '1', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#4358CD', fontSize: '32px', lineHeight: '1.15', fontWeight: '700', letterSpacing: '-0.01em' }}>Back to the Living Room Hackathon</h2>
        <p data-id="hack-p" data-name="Body" style={{ position: 'relative', flex: '0 0 auto', order: '2', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#2A2E33', fontSize: '18px', lineHeight: '1.6' }}>A bit into the quarantine, I found this hackathon with $10,000 in prizes, and thought the idea I was working on was a perfect fit, so I put together a team, and after several days of sleepless nights and non-stop work, we submitted the following video, which won us the competition:</p>
        <Link data-id="hack-video" data-name="YouTube video" style={{ position: 'relative', flex: '0 0 auto', order: '3', display: 'flex', flexDirection: 'column', overflow: 'hidden', borderRadius: '18px', backgroundColor: '#ffffff', textDecoration: 'none', marginTop: '8px', boxShadow: '0 1px 2px rgba(20,27,77,.05), 0 8px 28px rgba(20,27,77,.08)' }} href="https://www.youtube.com/watch?v=ZISNQThuj_c" target="_blank" rel="noopener">
          <div data-id="hack-video-thumb" data-name="Thumbnail" style={{ position: 'relative', flex: '0 0 auto', order: '0', display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center', justifyContent: 'center', aspectRatio: '16 / 9', backgroundImage: 'url(/assets/kickback-strategy/video-hackathon.webp)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }} role="img" aria-label="Kickback: hackathon pitch video: YouTube thumbnail">
            <div data-id="hack-video-play" data-name="Play" style={{ position: 'relative', flex: '0 0 auto', order: '0', display: 'flex', flexDirection: 'column', width: '68px', height: '68px', alignItems: 'center', justifyContent: 'center', borderRadius: '9999px', backgroundColor: 'rgba(15,21,64,.78)', boxShadow: '0 8px 24px rgba(0,0,0,.3)' }}>
              <p data-id="hack-video-play-t" data-name="Icon" style={{ position: 'relative', flex: '0 0 auto', order: '0', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#ffffff', fontSize: '24px', lineHeight: '1', marginLeft: '4px' }}>▶</p>
            </div>
          </div>
          <div data-id="hack-video-bar" data-name="Label bar" style={{ position: 'relative', flex: '0 0 auto', order: '1', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: '12px', flexWrap: 'wrap', padding: '14px 18px 14px 18px' }}>
            <p data-id="hack-video-title" data-name="Title" style={{ position: 'relative', flex: '0 0 auto', order: '0', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#16191C', fontSize: '15px', lineHeight: '1.35', fontWeight: '600' }}>Kickback: hackathon pitch video</p>
            <p data-id="hack-video-go" data-name="Watch" style={{ position: 'relative', flex: '0 0 auto', order: '1', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#4358CD', fontSize: '14px', lineHeight: '1.4', fontWeight: '600' }}>Watch on YouTube ↗</p>
          </div>
        </Link>
      </div>
    </div>
  <div data-id="problem" data-name="Problem" style={{ position: 'relative', flex: '0 0 auto', order: '5', display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center', padding: '72px 20px 0px 20px' }}>
      <div data-id="problem-in" data-name="Column" style={{ position: 'relative', flex: '0 0 auto', order: '0', display: 'flex', flexDirection: 'column', width: '100%', maxWidth: '1040px', gap: '20px' }}>
        <h2 data-id="problem-h" data-name="Heading" style={{ position: 'relative', flex: '0 0 auto', order: '0', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#4358CD', fontSize: '32px', lineHeight: '1.15', fontWeight: '700', letterSpacing: '-0.01em' }}>Problem</h2>
        <div data-id="problem-grid" data-name="Images" style={{ position: 'relative', flex: '0 0 auto', order: '1', display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '24px', alignItems: 'start' }}>
          <div data-id="problem-a" data-name="Figure" style={{ position: 'relative', flex: '0 0 auto', order: '0', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div data-id="problem-a-card" data-name="Card" style={{ position: 'relative', flex: '0 0 auto', order: '0', display: 'flex', flexDirection: 'column', overflow: 'hidden', borderRadius: '18px', backgroundColor: '#ffffff', boxShadow: '0 1px 2px rgba(20,27,77,.05), 0 8px 28px rgba(20,27,77,.08)' }}>
            <div data-id="problem-a-img" data-name="Image" style={{ position: 'relative', flex: '0 0 auto', order: '0', width: '100%', aspectRatio: '2000 / 1093', backgroundImage: 'url(/assets/kickback-strategy/problem-zoom-grid.webp)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }} role="img" aria-label="A Zoom grid of participants, all crossed out except one person circled, with the text: Problem: only one person at a time can speak" />
          </div>
          <p data-id="problem-a-cap" data-name="Caption" style={{ position: 'relative', flex: '0 0 auto', order: '1', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#666C73', fontSize: '13px', lineHeight: '1.45', textAlign: 'center' }}>On Zoom, only one person at a time can speak.</p>
        </div>
          <div data-id="problem-b" data-name="Figure" style={{ position: 'relative', flex: '0 0 auto', order: '1', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div data-id="problem-b-card" data-name="Card" style={{ position: 'relative', flex: '0 0 auto', order: '0', display: 'flex', flexDirection: 'column', overflow: 'hidden', borderRadius: '18px', backgroundColor: '#ffffff', boxShadow: '0 1px 2px rgba(20,27,77,.05), 0 8px 28px rgba(20,27,77,.08)' }}>
            <div data-id="problem-b-img" data-name="Image" style={{ position: 'relative', flex: '0 0 auto', order: '0', width: '100%', aspectRatio: '960 / 540', backgroundImage: 'url(/assets/kickback-strategy/one-to-many-vs-many-to-many.webp)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }} role="img" aria-label="One to many, presenter and audience (Clubhouse, Discord, Meet, Zoom), versus many to many, clusters of conversation (Kickback)" />
          </div>
          <p data-id="problem-b-cap" data-name="Caption" style={{ position: 'relative', flex: '0 0 auto', order: '1', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#666C73', fontSize: '13px', lineHeight: '1.45', textAlign: 'center' }}>One to many vs. many to many: presenter and audience, or clusters of conversation.</p>
        </div>
        </div>
        <p data-id="problem-callout" data-name="Problem statement" style={{ position: 'relative', flex: '0 0 auto', order: '2', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#16191C', fontSize: '24px', lineHeight: '1.35', fontWeight: '600', borderLeft: '4px solid #4358CD', padding: '4px 0px 4px 20px', marginTop: '10px' }}>Hosting group events on Zoom is lacking the group dynamic necessary for clusters of side conversations.</p>
      </div>
    </div>
  <div data-id="solution" data-name="Solution" style={{ position: 'relative', flex: '0 0 auto', order: '6', display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center', padding: '72px 20px 0px 20px' }}>
      <div data-id="solution-in" data-name="Column" style={{ position: 'relative', flex: '0 0 auto', order: '0', display: 'flex', flexDirection: 'column', width: '100%', maxWidth: '600px', gap: '16px' }}>
        <h2 data-id="solution-h" data-name="Heading" style={{ position: 'relative', flex: '0 0 auto', order: '0', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#4358CD', fontSize: '32px', lineHeight: '1.15', fontWeight: '700', letterSpacing: '-0.01em' }}>Solution</h2>
        <div data-id="solution-list" data-name="Points" style={{ position: 'relative', flex: '0 0 auto', order: '1', display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <div data-id="solution-1" data-name="Point" style={{ position: 'relative', flex: '0 0 auto', order: '0', display: 'flex', flexDirection: 'row', gap: '16px', alignItems: 'flex-start' }}>
          <div data-id="solution-1-n" data-name="Tick" style={{ position: 'relative', flex: '0 0 auto', order: '0', display: 'flex', flexDirection: 'column', width: '28px', height: '28px', borderRadius: '9999px', backgroundColor: '#EEF1FD', alignItems: 'center', justifyContent: 'center', marginTop: '1px' }}>
            <p data-id="solution-1-nt" data-name="Icon" style={{ position: 'relative', flex: '0 0 auto', order: '0', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#4358CD', fontSize: '14px', lineHeight: '1', fontWeight: '700' }}>✓</p>
          </div>
          <p data-id="solution-1-t" data-name="Text" style={{ position: 'relative', flex: '1 0 0px', order: '1', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#2A2E33', minWidth: '0px', fontSize: '18px', lineHeight: '1.6' }}>Create a way for users to freely move in and out of conversations.</p>
        </div>
        <div data-id="solution-2" data-name="Point" style={{ position: 'relative', flex: '0 0 auto', order: '1', display: 'flex', flexDirection: 'row', gap: '16px', alignItems: 'flex-start' }}>
          <div data-id="solution-2-n" data-name="Tick" style={{ position: 'relative', flex: '0 0 auto', order: '0', display: 'flex', flexDirection: 'column', width: '28px', height: '28px', borderRadius: '9999px', backgroundColor: '#EEF1FD', alignItems: 'center', justifyContent: 'center', marginTop: '1px' }}>
            <p data-id="solution-2-nt" data-name="Icon" style={{ position: 'relative', flex: '0 0 auto', order: '0', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#4358CD', fontSize: '14px', lineHeight: '1', fontWeight: '700' }}>✓</p>
          </div>
          <p data-id="solution-2-t" data-name="Text" style={{ position: 'relative', flex: '1 0 0px', order: '1', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#2A2E33', minWidth: '0px', fontSize: '18px', lineHeight: '1.6' }}>Allow for a mental model of communication that maps to how we are used to conducting ourselves in a real-world party or event.</p>
        </div>
        <div data-id="solution-3" data-name="Point" style={{ position: 'relative', flex: '0 0 auto', order: '2', display: 'flex', flexDirection: 'row', gap: '16px', alignItems: 'flex-start' }}>
          <div data-id="solution-3-n" data-name="Tick" style={{ position: 'relative', flex: '0 0 auto', order: '0', display: 'flex', flexDirection: 'column', width: '28px', height: '28px', borderRadius: '9999px', backgroundColor: '#EEF1FD', alignItems: 'center', justifyContent: 'center', marginTop: '1px' }}>
            <p data-id="solution-3-nt" data-name="Icon" style={{ position: 'relative', flex: '0 0 auto', order: '0', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#4358CD', fontSize: '14px', lineHeight: '1', fontWeight: '700' }}>✓</p>
          </div>
          <p data-id="solution-3-t" data-name="Text" style={{ position: 'relative', flex: '1 0 0px', order: '1', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#2A2E33', minWidth: '0px', fontSize: '18px', lineHeight: '1.6' }}>Allow for mods to create fun events, and give them tools to control the user experience.</p>
        </div>
        </div>
      </div>
    </div>
  <div data-id="how" data-name="How does it work" style={{ position: 'relative', flex: '0 0 auto', order: '7', display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center', padding: '72px 20px 0px 20px' }} id="how">
      <div data-id="how-in" data-name="Column" style={{ position: 'relative', flex: '0 0 auto', order: '0', display: 'flex', flexDirection: 'column', width: '100%', maxWidth: '1040px', gap: '16px' }}>
        <h2 data-id="how-h" data-name="Heading" style={{ position: 'relative', flex: '0 0 auto', order: '0', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#4358CD', fontSize: '32px', lineHeight: '1.15', fontWeight: '700', letterSpacing: '-0.01em' }}>How does it work?</h2>
        <p data-id="how-p" data-name="Body" style={{ position: 'relative', flex: '0 0 auto', order: '1', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#2A2E33', fontSize: '18px', lineHeight: '1.6' }}>I came up with the UI of Kickback by building around two main core concepts.</p>
        <div data-id="how-grid" data-name="Concepts" style={{ position: 'relative', flex: '0 0 auto', order: '2', display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '24px', marginTop: '10px', alignItems: 'start' }}>
          <div data-id="how-1" data-name="Concept" style={{ position: 'relative', flex: '0 0 auto', order: '0', display: 'flex', flexDirection: 'column', overflow: 'hidden', borderRadius: '18px', backgroundColor: '#ffffff', boxShadow: '0 1px 2px rgba(20,27,77,.05), 0 8px 28px rgba(20,27,77,.08)' }}>
          <div data-id="how-1-img" data-name="Image" style={{ position: 'relative', flex: '0 0 auto', order: '0', width: '100%', aspectRatio: '1000 / 682', backgroundImage: 'url(/assets/kickback-strategy/bubble-touch.gif)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }} role="img" aria-label="Two video bubbles, Mary and Gary, overlap; the panel reads: touching equals can hear and talk" />
          <div data-id="how-1-body" data-name="Body" style={{ position: 'relative', flex: '0 0 auto', order: '1', display: 'flex', flexDirection: 'column', gap: '8px', padding: '20px 22px 24px 22px' }}>
            <h3 data-id="how-1-h" data-name="Title" style={{ position: 'relative', flex: '0 0 auto', order: '0', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#16191C', fontSize: '20px', lineHeight: '1.3', fontWeight: '600' }}>If you are touching someone else's bubble, you can hear them talk.</h3>
            <p data-id="how-1-p" data-name="Text" style={{ position: 'relative', flex: '0 0 auto', order: '1', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#2A2E33', fontSize: '16px', lineHeight: '1.55' }}>This interaction mimics how people talk in real life. It is basically a bird's-eye view of the real world.</p>
          </div>
        </div>
          <div data-id="how-2" data-name="Concept" style={{ position: 'relative', flex: '0 0 auto', order: '1', display: 'flex', flexDirection: 'column', overflow: 'hidden', borderRadius: '18px', backgroundColor: '#ffffff', boxShadow: '0 1px 2px rgba(20,27,77,.05), 0 8px 28px rgba(20,27,77,.08)' }}>
          <div data-id="how-2-img" data-name="Image" style={{ position: 'relative', flex: '0 0 auto', order: '0', width: '100%', aspectRatio: '1348 / 920', backgroundImage: 'url(/assets/kickback-strategy/bubble-chain-diagram.webp)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }} role="img" aria-label="Bubbles A, B and C: once C touches B, all three are joined; the panel reads: touching any member of the group equals can hear and talk with everyone" />
          <div data-id="how-2-body" data-name="Body" style={{ position: 'relative', flex: '0 0 auto', order: '1', display: 'flex', flexDirection: 'column', gap: '8px', padding: '20px 22px 24px 22px' }}>
            <h3 data-id="how-2-h" data-name="Title" style={{ position: 'relative', flex: '0 0 auto', order: '0', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#16191C', fontSize: '20px', lineHeight: '1.3', fontWeight: '600' }}>If Person A is touching B, and B is touching C, A and C can hear each other.</h3>
            <p data-id="how-2-p" data-name="Text" style={{ position: 'relative', flex: '0 0 auto', order: '1', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#2A2E33', fontSize: '16px', lineHeight: '1.55' }}>This allows people to create groups of conversation on the fly, without managing who is in a room and who is not.</p>
          </div>
        </div>
        </div>
      </div>
    </div>
  <div data-id="research0" data-name="Initial research" style={{ position: 'relative', flex: '0 0 auto', order: '8', display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center', padding: '72px 20px 0px 20px' }}>
      <div data-id="research0-in" data-name="Column" style={{ position: 'relative', flex: '0 0 auto', order: '0', display: 'flex', flexDirection: 'column', width: '100%', maxWidth: '600px', gap: '16px' }}>
        <h2 data-id="research0-h" data-name="Heading" style={{ position: 'relative', flex: '0 0 auto', order: '0', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#4358CD', fontSize: '32px', lineHeight: '1.15', fontWeight: '700', letterSpacing: '-0.01em' }}>Initial Research</h2>
        <p data-id="research0-p" data-name="Body" style={{ position: 'relative', flex: '0 0 auto', order: '1', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#2A2E33', fontSize: '18px', lineHeight: '1.6' }}>Before I came up with any more thought-out designs, all of this began with one initial hypothesis: that smaller video has big advantages over large-format video.</p>
      </div>
    </div>
  <div data-id="project" data-name="Project" style={{ position: 'relative', flex: '0 0 auto', order: '9', display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center', padding: '72px 20px 0px 20px' }}>
      <div data-id="project-in" data-name="Column" style={{ position: 'relative', flex: '0 0 auto', order: '0', display: 'flex', flexDirection: 'column', width: '100%', maxWidth: '1040px', gap: '16px' }}>
        <div data-id="project-grid" data-name="Summary and details" style={{ position: 'relative', flex: '0 0 auto', order: '0', display: 'grid', gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1fr)', gap: '24px', alignItems: 'start' }}>
          <div data-id="project-summary" data-name="Project summary" style={{ position: 'relative', order: '0', display: 'flex', flexDirection: 'column', padding: '30px 32px 30px 32px', backgroundColor: '#ffffff', borderRadius: '20px', gap: '14px', boxShadow: '0 1px 2px rgba(20,27,77,.05), 0 8px 28px rgba(20,27,77,.08)' }}>
            <h3 data-id="project-summary-h" data-name="Heading" style={{ position: 'relative', flex: '0 0 auto', order: '0', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#16191C', fontSize: '24px', lineHeight: '1.25', fontWeight: '700' }}>Project Summary</h3>
            <p data-id="project-summary-p1" data-name="Body" style={{ position: 'relative', flex: '0 0 auto', order: '1', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#2A2E33', fontSize: '18px', lineHeight: '1.6' }}>After raising a bit of money, we were off to the races to build out our product. We needed to simultaneously build and test. As you might notice, the product is no longer in existence.</p>
            <p data-id="project-summary-p2" data-name="Body" style={{ position: 'relative', flex: '0 0 auto', order: '2', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#2A2E33', fontSize: '18px', lineHeight: '1.6' }}>One thing that we learned was that picking the right tech stack early on is important. We started off using the DOM to render all animations, and had the entire web app built out after 3 months. When we got our first customer, our demo failed during the first test run. That's when we realized that solution wasn't scalable to large groups. We then decided to remake the entire app using HTML canvas, which renders using the GPU instead of the CPU. We were pretty close to finishing that one, but ran out of funding and had to find other work.</p>
            <p data-id="project-summary-p3" data-name="Body" style={{ position: 'relative', flex: '0 0 auto', order: '3', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#2A2E33', fontSize: '18px', lineHeight: '1.6' }}>Over the course of this project, I learned a great deal about what it takes to bring a web app to market from scratch.</p>
            <div data-id="project-tags" data-name="Disciplines" style={{ position: 'relative', flex: '0 0 auto', order: '4', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '8px', marginTop: '6px' }}>
              <p data-id="project-tag-1" data-name="Tag" style={{ position: 'relative', flex: '0 0 auto', order: '0', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#4358CD', fontSize: '13px', lineHeight: '1.4', fontWeight: '600', backgroundColor: '#EEF1FD', borderRadius: '9999px', padding: '6px 12px 6px 12px' }}>Illustration &amp; Brand</p>
              <p data-id="project-tag-2" data-name="Tag" style={{ position: 'relative', flex: '0 0 auto', order: '1', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#4358CD', fontSize: '13px', lineHeight: '1.4', fontWeight: '600', backgroundColor: '#EEF1FD', borderRadius: '9999px', padding: '6px 12px 6px 12px' }}>UX/UI</p>
              <p data-id="project-tag-3" data-name="Tag" style={{ position: 'relative', flex: '0 0 auto', order: '2', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#4358CD', fontSize: '13px', lineHeight: '1.4', fontWeight: '600', backgroundColor: '#EEF1FD', borderRadius: '9999px', padding: '6px 12px 6px 12px' }}>Website</p>
            </div>
          </div>
          <div data-id="project-details" data-name="Project details" style={{ position: 'relative', order: '1', display: 'flex', flexDirection: 'column', padding: '30px 32px 30px 32px', backgroundColor: '#ffffff', borderRadius: '20px', gap: '20px', boxShadow: '0 1px 2px rgba(20,27,77,.05), 0 8px 28px rgba(20,27,77,.08)' }}>
            <h3 data-id="project-details-h" data-name="Heading" style={{ position: 'relative', flex: '0 0 auto', order: '0', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#16191C', fontSize: '24px', lineHeight: '1.25', fontWeight: '700' }}>Project Details</h3>
            <div data-id="project-details-list" data-name="Details" style={{ position: 'relative', flex: '0 0 auto', order: '1', display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div data-id="detail-role" data-name="Role" style={{ position: 'relative', flex: '0 0 auto', order: '0', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <h4 data-id="detail-role-k" data-name="Label" style={{ position: 'relative', flex: '0 0 auto', order: '0', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#4358CD', fontSize: '18px', lineHeight: '1.25', fontWeight: '600' }}>Role</h4>
              <p data-id="detail-role-v" data-name="Value" style={{ position: 'relative', flex: '0 0 auto', order: '1', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#2A2E33', fontSize: '16px', lineHeight: '1.45' }}>Designer, Founder</p>
            </div>
            <div data-id="detail-duration" data-name="Duration" style={{ position: 'relative', flex: '0 0 auto', order: '1', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <h4 data-id="detail-duration-k" data-name="Label" style={{ position: 'relative', flex: '0 0 auto', order: '0', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#4358CD', fontSize: '18px', lineHeight: '1.25', fontWeight: '600' }}>Duration</h4>
              <p data-id="detail-duration-v" data-name="Value" style={{ position: 'relative', flex: '0 0 auto', order: '1', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#2A2E33', fontSize: '16px', lineHeight: '1.45' }}>May 2021 – December 2022</p>
            </div>
            <div data-id="detail-tools" data-name="Tools" style={{ position: 'relative', flex: '0 0 auto', order: '2', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <h4 data-id="detail-tools-k" data-name="Label" style={{ position: 'relative', flex: '0 0 auto', order: '0', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#4358CD', fontSize: '18px', lineHeight: '1.25', fontWeight: '600' }}>Tools</h4>
              <p data-id="detail-tools-v" data-name="Value" style={{ position: 'relative', flex: '0 0 auto', order: '1', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#2A2E33', fontSize: '16px', lineHeight: '1.45' }}>Figma, Webflow, Design Thinking Workshops</p>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  <div data-id="proto" data-name="Figma prototype" style={{ position: 'relative', flex: '0 0 auto', order: '10', display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center', padding: '72px 20px 72px 20px', marginTop: '72px', backgroundImage: 'linear-gradient(180deg, #F4F6FE 0px, #ffffff 520px)' }}>
      <div data-id="proto-in" data-name="Column" style={{ position: 'relative', flex: '0 0 auto', order: '0', display: 'flex', flexDirection: 'column', width: '100%', maxWidth: '1040px', gap: '16px' }}>
        <div data-id="proto-head" data-name="Intro" style={{ position: 'relative', flex: '0 0 auto', order: '0', display: 'flex', flexDirection: 'column', width: '100%', maxWidth: '600px', gap: '16px', alignSelf: 'center' }}>
          <h2 data-id="proto-h" data-name="Heading" style={{ position: 'relative', flex: '0 0 auto', order: '0', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#4358CD', fontSize: '32px', lineHeight: '1.15', fontWeight: '700', letterSpacing: '-0.01em' }}>Figma Prototype 4</h2>
          <p data-id="proto-p" data-name="Body" style={{ position: 'relative', flex: '0 0 auto', order: '1', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#2A2E33', fontSize: '18px', lineHeight: '1.6' }}>If you watched the video, there were quite a bit of features. As we moved forward with the project, we started to narrow down the scope, as well as change the color scheme. This contained the features we needed for our MVP.</p>
        </div>
        <div data-id="features-grid" data-name="Features" style={{ position: 'relative', flex: '0 0 auto', order: '1', display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: '40px 24px', marginTop: '24px' }}>
          <div data-id="feature-tags" data-name="Feature · Tags" style={{ position: 'relative', order: '0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px' }}>
            <div data-id="feature-tags-phone" data-name="Phone" style={{ position: 'relative', flex: '0 0 auto', order: '0', display: 'flex', flexDirection: 'column', width: '100%', maxWidth: '220px', padding: '8px 8px 8px 8px', borderRadius: '36px', backgroundColor: '#0d0f14', boxShadow: '0 24px 60px rgba(10,14,40,.25)' }}>
              <div data-id="feature-tags-img" data-name="Screen recording" style={{ position: 'relative', flex: '0 0 auto', order: '0', width: '100%', borderRadius: '29px', aspectRatio: '377 / 793', backgroundImage: 'url(/assets/kickback-strategy/feature-tags.gif)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }} role="img" aria-label="A dark Kickback canvas where people are browsed and grouped by tags" />
            </div>
            <div data-id="feature-tags-body" data-name="Text" style={{ position: 'relative', flex: '0 0 auto', order: '1', display: 'flex', flexDirection: 'column', width: '100%', gap: '4px' }}>
              <h3 data-id="feature-tags-h" data-name="Title" style={{ position: 'relative', flex: '0 0 auto', order: '0', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#16191C', fontSize: '17px', lineHeight: '1.3', fontWeight: '600', textAlign: 'center' }}>Tags</h3>
              <p data-id="feature-tags-p" data-name="Text" style={{ position: 'relative', flex: '0 0 auto', order: '1', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#2A2E33', fontSize: '15px', lineHeight: '1.5', textAlign: 'center' }}>You can easily switch groups, and can view people by tags.</p>
            </div>
          </div>
          <div data-id="feature-view-map" data-name="Feature · View map" style={{ position: 'relative', order: '1', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px' }}>
            <div data-id="feature-view-map-phone" data-name="Phone" style={{ position: 'relative', flex: '0 0 auto', order: '0', display: 'flex', flexDirection: 'column', width: '100%', maxWidth: '220px', padding: '8px 8px 8px 8px', borderRadius: '36px', backgroundColor: '#0d0f14', boxShadow: '0 24px 60px rgba(10,14,40,.25)' }}>
              <div data-id="feature-view-map-img" data-name="Screen recording" style={{ position: 'relative', flex: '0 0 auto', order: '0', width: '100%', borderRadius: '29px', aspectRatio: '598 / 1296', backgroundImage: 'url(/assets/kickback-strategy/feature-view-map.gif)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }} role="img" aria-label="Opening the map from a group hangout shows every group in the room from above" />
            </div>
            <div data-id="feature-view-map-body" data-name="Text" style={{ position: 'relative', flex: '0 0 auto', order: '1', display: 'flex', flexDirection: 'column', width: '100%', gap: '4px' }}>
              <h3 data-id="feature-view-map-h" data-name="Title" style={{ position: 'relative', flex: '0 0 auto', order: '0', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#16191C', fontSize: '17px', lineHeight: '1.3', fontWeight: '600', textAlign: 'center' }}>View map</h3>
              <p data-id="feature-view-map-p" data-name="Text" style={{ position: 'relative', flex: '0 0 auto', order: '1', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#2A2E33', fontSize: '15px', lineHeight: '1.5', textAlign: 'center' }}>This feature lets users get a bird's-eye view of the room.</p>
            </div>
          </div>
          <div data-id="feature-wayfinders" data-name="Feature · Wayfinders" style={{ position: 'relative', order: '2', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px' }}>
            <div data-id="feature-wayfinders-phone" data-name="Phone" style={{ position: 'relative', flex: '0 0 auto', order: '0', display: 'flex', flexDirection: 'column', width: '100%', maxWidth: '220px', padding: '8px 8px 8px 8px', borderRadius: '36px', backgroundColor: '#0d0f14', boxShadow: '0 24px 60px rgba(10,14,40,.25)' }}>
              <div data-id="feature-wayfinders-img" data-name="Screen recording" style={{ position: 'relative', flex: '0 0 auto', order: '0', width: '100%', borderRadius: '29px', aspectRatio: '598 / 1296', backgroundImage: 'url(/assets/kickback-strategy/feature-wayfinders.gif)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }} role="img" aria-label="Edge markers point toward friends who are off screen on the canvas" />
            </div>
            <div data-id="feature-wayfinders-body" data-name="Text" style={{ position: 'relative', flex: '0 0 auto', order: '1', display: 'flex', flexDirection: 'column', width: '100%', gap: '4px' }}>
              <h3 data-id="feature-wayfinders-h" data-name="Title" style={{ position: 'relative', flex: '0 0 auto', order: '0', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#16191C', fontSize: '17px', lineHeight: '1.3', fontWeight: '600', textAlign: 'center' }}>Wayfinders</h3>
              <p data-id="feature-wayfinders-p" data-name="Text" style={{ position: 'relative', flex: '0 0 auto', order: '1', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#2A2E33', fontSize: '15px', lineHeight: '1.5', textAlign: 'center' }}>Wayfinders help you find your friends easily on a large canvas.</p>
            </div>
          </div>
          <div data-id="feature-share-location" data-name="Feature · Share Location" style={{ position: 'relative', order: '3', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px' }}>
            <div data-id="feature-share-location-phone" data-name="Phone" style={{ position: 'relative', flex: '0 0 auto', order: '0', display: 'flex', flexDirection: 'column', width: '100%', maxWidth: '220px', padding: '8px 8px 8px 8px', borderRadius: '36px', backgroundColor: '#0d0f14', boxShadow: '0 24px 60px rgba(10,14,40,.25)' }}>
              <div data-id="feature-share-location-img" data-name="Screen recording" style={{ position: 'relative', flex: '0 0 auto', order: '0', width: '100%', borderRadius: '29px', aspectRatio: '400 / 870', backgroundImage: 'url(/assets/kickback-strategy/feature-share-location.webp)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }} role="img" aria-label="Sending a friend your location in chat and jumping to it on the canvas" />
            </div>
            <div data-id="feature-share-location-body" data-name="Text" style={{ position: 'relative', flex: '0 0 auto', order: '1', display: 'flex', flexDirection: 'column', width: '100%', gap: '4px' }}>
              <h3 data-id="feature-share-location-h" data-name="Title" style={{ position: 'relative', flex: '0 0 auto', order: '0', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#16191C', fontSize: '17px', lineHeight: '1.3', fontWeight: '600', textAlign: 'center' }}>Share Location</h3>
              <p data-id="feature-share-location-p" data-name="Text" style={{ position: 'relative', flex: '0 0 auto', order: '1', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#2A2E33', fontSize: '15px', lineHeight: '1.5', textAlign: 'center' }}>Message friends with your location.</p>
            </div>
          </div>
          <div data-id="feature-zoom-in-convo" data-name="Feature · Zoom in Convo" style={{ position: 'relative', order: '4', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px' }}>
            <div data-id="feature-zoom-in-convo-phone" data-name="Phone" style={{ position: 'relative', flex: '0 0 auto', order: '0', display: 'flex', flexDirection: 'column', width: '100%', maxWidth: '220px', padding: '8px 8px 8px 8px', borderRadius: '36px', backgroundColor: '#0d0f14', boxShadow: '0 24px 60px rgba(10,14,40,.25)' }}>
              <div data-id="feature-zoom-in-convo-img" data-name="Screen recording" style={{ position: 'relative', flex: '0 0 auto', order: '0', width: '100%', borderRadius: '29px', aspectRatio: '598 / 1296', backgroundImage: 'url(/assets/kickback-strategy/feature-zoom-in-convo.gif)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }} role="img" aria-label="A conversation group enlarged to show bigger video of each person" />
            </div>
            <div data-id="feature-zoom-in-convo-body" data-name="Text" style={{ position: 'relative', flex: '0 0 auto', order: '1', display: 'flex', flexDirection: 'column', width: '100%', gap: '4px' }}>
              <h3 data-id="feature-zoom-in-convo-h" data-name="Title" style={{ position: 'relative', flex: '0 0 auto', order: '0', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#16191C', fontSize: '17px', lineHeight: '1.3', fontWeight: '600', textAlign: 'center' }}>Zoom in Convo</h3>
              <p data-id="feature-zoom-in-convo-p" data-name="Text" style={{ position: 'relative', flex: '0 0 auto', order: '1', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#2A2E33', fontSize: '15px', lineHeight: '1.5', textAlign: 'center' }}>Get a bigger view of the people in your group.</p>
            </div>
          </div>
          <div data-id="feature-workshop-zones" data-name="Feature · Workshop: Zones" style={{ position: 'relative', order: '5', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px' }}>
            <div data-id="feature-workshop-zones-phone" data-name="Phone" style={{ position: 'relative', flex: '0 0 auto', order: '0', display: 'flex', flexDirection: 'column', width: '100%', maxWidth: '220px', padding: '8px 8px 8px 8px', borderRadius: '36px', backgroundColor: '#0d0f14', boxShadow: '0 24px 60px rgba(10,14,40,.25)' }}>
              <div data-id="feature-workshop-zones-img" data-name="Screen recording" style={{ position: 'relative', flex: '0 0 auto', order: '0', width: '100%', borderRadius: '29px', aspectRatio: '460 / 999', backgroundImage: 'url(/assets/kickback-strategy/feature-workshop-zones.webp)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }} role="img" aria-label="A networking mixer with floor zones labelled Business, Engineering and Other, and a broadcast question: What is your skillset?" />
            </div>
            <div data-id="feature-workshop-zones-body" data-name="Text" style={{ position: 'relative', flex: '0 0 auto', order: '1', display: 'flex', flexDirection: 'column', width: '100%', gap: '4px' }}>
              <h3 data-id="feature-workshop-zones-h" data-name="Title" style={{ position: 'relative', flex: '0 0 auto', order: '0', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#16191C', fontSize: '17px', lineHeight: '1.3', fontWeight: '600', textAlign: 'center' }}>Workshop: Zones</h3>
              <p data-id="feature-workshop-zones-p" data-name="Text" style={{ position: 'relative', flex: '0 0 auto', order: '1', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#2A2E33', fontSize: '15px', lineHeight: '1.5', textAlign: 'center' }}>Users can upload an image of zones to put on the floor and run workshops like on the YouTube show Jubilee.</p>
            </div>
          </div>
          <div data-id="feature-workshop-slides" data-name="Feature · Workshop: Slides" style={{ position: 'relative', order: '6', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px' }}>
            <div data-id="feature-workshop-slides-phone" data-name="Phone" style={{ position: 'relative', flex: '0 0 auto', order: '0', display: 'flex', flexDirection: 'column', width: '100%', maxWidth: '220px', padding: '8px 8px 8px 8px', borderRadius: '36px', backgroundColor: '#0d0f14', boxShadow: '0 24px 60px rgba(10,14,40,.25)' }}>
              <div data-id="feature-workshop-slides-img" data-name="Screen recording" style={{ position: 'relative', flex: '0 0 auto', order: '0', width: '100%', borderRadius: '29px', aspectRatio: '598 / 1296', backgroundImage: 'url(/assets/kickback-strategy/feature-workshop-slides.gif)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }} role="img" aria-label="The map view with a slide strip: the host steps through slides that change the room background" />
            </div>
            <div data-id="feature-workshop-slides-body" data-name="Text" style={{ position: 'relative', flex: '0 0 auto', order: '1', display: 'flex', flexDirection: 'column', width: '100%', gap: '4px' }}>
              <h3 data-id="feature-workshop-slides-h" data-name="Title" style={{ position: 'relative', flex: '0 0 auto', order: '0', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#16191C', fontSize: '17px', lineHeight: '1.3', fontWeight: '600', textAlign: 'center' }}>Workshop: Slides</h3>
              <p data-id="feature-workshop-slides-p" data-name="Text" style={{ position: 'relative', flex: '0 0 auto', order: '1', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#2A2E33', fontSize: '15px', lineHeight: '1.5', textAlign: 'center' }}>This feature lets users run workshops by changing the background like a slide show.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  <div data-id="sheet" data-name="Research" style={{ position: 'relative', flex: '0 0 auto', order: '11', display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center', padding: '72px 20px 0px 20px' }}>
      <div data-id="sheet-in" data-name="Column" style={{ position: 'relative', flex: '0 0 auto', order: '0', display: 'flex', flexDirection: 'column', width: '100%', maxWidth: '600px', gap: '16px' }}>
        <h2 data-id="sheet-h" data-name="Heading" style={{ position: 'relative', flex: '0 0 auto', order: '0', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#4358CD', fontSize: '32px', lineHeight: '1.15', fontWeight: '700', letterSpacing: '-0.01em' }}>Research</h2>
        <p data-id="sheet-p" data-name="Body" style={{ position: 'relative', flex: '0 0 auto', order: '1', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#2A2E33', fontSize: '18px', lineHeight: '1.6' }}>Part of my research was looking at every possible competitor to see which niche areas I could plan to take over. I did an extensive analysis of which platforms contain which features.</p>
        <Link data-id="sheet-card" data-name="Spreadsheet link" style={{ position: 'relative', flex: '0 0 auto', order: '2', display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '18px', padding: '20px 22px 20px 22px', marginTop: '8px', backgroundColor: '#ffffff', borderRadius: '18px', textDecoration: 'none', boxShadow: '0 1px 2px rgba(20,27,77,.05), 0 8px 28px rgba(20,27,77,.08)' }} href="https://docs.google.com/spreadsheets/d/e/2PACX-1vRLDFWFjQpAqayiCUmUHWZ7XIz_3HcHpPWBy-8C9Ms3EcQPDBhs3uiqugB6qweU7HqJdYmS6Ff4r4Pe/pubhtml?gid=0&single=true" target="_blank" rel="noopener">
          <div data-id="sheet-icon" data-name="Icon" style={{ position: 'relative', flex: '0 0 auto', order: '0', display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', width: '48px', height: '48px', gap: '3px', padding: '9px 9px 9px 9px', borderRadius: '12px', backgroundColor: '#E6F4EA' }}>
            <div data-id="sheet-cell-0" data-name="Cell" style={{ position: 'relative', order: '0', borderRadius: '2px', backgroundColor: '#1E8E3E' }} />
            <div data-id="sheet-cell-1" data-name="Cell" style={{ position: 'relative', order: '1', borderRadius: '2px', backgroundColor: '#1E8E3E' }} />
            <div data-id="sheet-cell-2" data-name="Cell" style={{ position: 'relative', order: '2', borderRadius: '2px', backgroundColor: '#1E8E3E' }} />
            <div data-id="sheet-cell-3" data-name="Cell" style={{ position: 'relative', order: '3', borderRadius: '2px', backgroundColor: '#81C995' }} />
            <div data-id="sheet-cell-4" data-name="Cell" style={{ position: 'relative', order: '4', borderRadius: '2px', backgroundColor: '#81C995' }} />
            <div data-id="sheet-cell-5" data-name="Cell" style={{ position: 'relative', order: '5', borderRadius: '2px', backgroundColor: '#81C995' }} />
            <div data-id="sheet-cell-6" data-name="Cell" style={{ position: 'relative', order: '6', borderRadius: '2px', backgroundColor: '#81C995' }} />
            <div data-id="sheet-cell-7" data-name="Cell" style={{ position: 'relative', order: '7', borderRadius: '2px', backgroundColor: '#81C995' }} />
            <div data-id="sheet-cell-8" data-name="Cell" style={{ position: 'relative', order: '8', borderRadius: '2px', backgroundColor: '#81C995' }} />
          </div>
          <div data-id="sheet-body" data-name="Text" style={{ position: 'relative', flex: '1 0 0px', order: '1', display: 'flex', flexDirection: 'column', minWidth: '0px', gap: '4px' }}>
            <p data-id="sheet-title" data-name="Title" style={{ position: 'relative', flex: '0 0 auto', order: '0', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#16191C', fontSize: '17px', lineHeight: '1.3', fontWeight: '600' }}>Competitor feature analysis</p>
            <p data-id="sheet-sub" data-name="Subtitle" style={{ position: 'relative', flex: '0 0 auto', order: '1', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#666C73', fontSize: '14px', lineHeight: '1.45' }}>Google Sheet: which platforms contain which features</p>
          </div>
          <p data-id="sheet-go" data-name="Open" style={{ position: 'relative', flex: '0 0 auto', order: '2', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#4358CD', fontSize: '14px', lineHeight: '1.4', fontWeight: '600' }}>Open ↗</p>
        </Link>
      </div>
    </div>
  <div data-id="mvp1" data-name="MVP 1" style={{ position: 'relative', flex: '0 0 auto', order: '12', display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center', padding: '72px 20px 0px 20px' }} id="mvps">
      <div data-id="mvp1-in" data-name="Column" style={{ position: 'relative', flex: '0 0 auto', order: '0', display: 'flex', flexDirection: 'column', width: '100%', maxWidth: '600px', gap: '16px' }}>
        <h2 data-id="mvp1-h" data-name="Heading" style={{ position: 'relative', flex: '0 0 auto', order: '0', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#4358CD', fontSize: '32px', lineHeight: '1.15', fontWeight: '700', letterSpacing: '-0.01em' }}>MVP 1</h2>
        <p data-id="mvp1-p1" data-name="Body" style={{ position: 'relative', flex: '0 0 auto', order: '1', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#2A2E33', fontSize: '18px', lineHeight: '1.6' }}>We built this MVP in Unity. This app could pretty much do everything we wanted feature-wise, but because it was built in Unity, it had one huge drawback: we couldn't make a web app that worked well in a browser. This experience could work well as a desktop app, but when it came to marketing the app, people are not as likely to try out an app if they need to download something, so we figured we would have to change course eventually to create something that could support web app functionality.</p>
        <p data-id="mvp1-p2" data-name="Body" style={{ position: 'relative', flex: '0 0 auto', order: '2', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#2A2E33', fontSize: '18px', lineHeight: '1.6' }}>When it came to our first user test, people really liked the experience. They could all bunch up in one group and have a conversation, or they could split off from the main group and have their own private conversations effortlessly. At 8:23 you can also see the map view in use.</p>
        <Link data-id="mvp1-video" data-name="YouTube video" style={{ position: 'relative', flex: '0 0 auto', order: '3', display: 'flex', flexDirection: 'column', overflow: 'hidden', borderRadius: '18px', backgroundColor: '#ffffff', textDecoration: 'none', marginTop: '8px', boxShadow: '0 1px 2px rgba(20,27,77,.05), 0 8px 28px rgba(20,27,77,.08)' }} href="https://www.youtube.com/watch?v=lr7z7HOifoU" target="_blank" rel="noopener">
          <div data-id="mvp1-video-thumb" data-name="Thumbnail" style={{ position: 'relative', flex: '0 0 auto', order: '0', display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center', justifyContent: 'center', aspectRatio: '16 / 9', backgroundImage: 'url(/assets/kickback-strategy/video-mvp-1.webp)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }} role="img" aria-label="MVP 1: first user test (Unity): YouTube thumbnail">
            <div data-id="mvp1-video-play" data-name="Play" style={{ position: 'relative', flex: '0 0 auto', order: '0', display: 'flex', flexDirection: 'column', width: '68px', height: '68px', alignItems: 'center', justifyContent: 'center', borderRadius: '9999px', backgroundColor: 'rgba(15,21,64,.78)', boxShadow: '0 8px 24px rgba(0,0,0,.3)' }}>
              <p data-id="mvp1-video-play-t" data-name="Icon" style={{ position: 'relative', flex: '0 0 auto', order: '0', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#ffffff', fontSize: '24px', lineHeight: '1', marginLeft: '4px' }}>▶</p>
            </div>
          </div>
          <div data-id="mvp1-video-bar" data-name="Label bar" style={{ position: 'relative', flex: '0 0 auto', order: '1', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: '12px', flexWrap: 'wrap', padding: '14px 18px 14px 18px' }}>
            <p data-id="mvp1-video-title" data-name="Title" style={{ position: 'relative', flex: '0 0 auto', order: '0', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#16191C', fontSize: '15px', lineHeight: '1.35', fontWeight: '600' }}>MVP 1: first user test (Unity)</p>
            <p data-id="mvp1-video-go" data-name="Watch" style={{ position: 'relative', flex: '0 0 auto', order: '1', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#4358CD', fontSize: '14px', lineHeight: '1.4', fontWeight: '600' }}>Watch on YouTube ↗</p>
          </div>
        </Link>
      </div>
    </div>
  <div data-id="mvp2" data-name="MVP 2" style={{ position: 'relative', flex: '0 0 auto', order: '13', display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center', padding: '72px 20px 0px 20px' }}>
      <div data-id="mvp2-in" data-name="Column" style={{ position: 'relative', flex: '0 0 auto', order: '0', display: 'flex', flexDirection: 'column', width: '100%', maxWidth: '600px', gap: '16px' }}>
        <h2 data-id="mvp2-h" data-name="Heading" style={{ position: 'relative', flex: '0 0 auto', order: '0', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#4358CD', fontSize: '32px', lineHeight: '1.15', fontWeight: '700', letterSpacing: '-0.01em' }}>MVP 2</h2>
        <p data-id="mvp2-p" data-name="Body" style={{ position: 'relative', flex: '0 0 auto', order: '1', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#2A2E33', fontSize: '18px', lineHeight: '1.6' }}>Our second MVP was built by our second CTO, and he built it using DOM rendering. The tech wasn't ideal and ultimately crashed when we did our first real-world test. We knew for a fact at that point that DOM rendering wasn't fast enough to support a multi-user chat application with over 20 users.</p>
        <Link data-id="mvp2-video" data-name="YouTube video" style={{ position: 'relative', flex: '0 0 auto', order: '2', display: 'flex', flexDirection: 'column', overflow: 'hidden', borderRadius: '18px', backgroundColor: '#ffffff', textDecoration: 'none', marginTop: '8px', boxShadow: '0 1px 2px rgba(20,27,77,.05), 0 8px 28px rgba(20,27,77,.08)' }} href="https://www.youtube.com/watch?v=rxE1yOiBPeA" target="_blank" rel="noopener">
          <div data-id="mvp2-video-thumb" data-name="Thumbnail" style={{ position: 'relative', flex: '0 0 auto', order: '0', display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center', justifyContent: 'center', aspectRatio: '16 / 9', backgroundImage: 'url(/assets/kickback-strategy/video-mvp-2.webp)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }} role="img" aria-label="MVP 2: DOM-rendered prototype: YouTube thumbnail">
            <div data-id="mvp2-video-play" data-name="Play" style={{ position: 'relative', flex: '0 0 auto', order: '0', display: 'flex', flexDirection: 'column', width: '68px', height: '68px', alignItems: 'center', justifyContent: 'center', borderRadius: '9999px', backgroundColor: 'rgba(15,21,64,.78)', boxShadow: '0 8px 24px rgba(0,0,0,.3)' }}>
              <p data-id="mvp2-video-play-t" data-name="Icon" style={{ position: 'relative', flex: '0 0 auto', order: '0', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#ffffff', fontSize: '24px', lineHeight: '1', marginLeft: '4px' }}>▶</p>
            </div>
          </div>
          <div data-id="mvp2-video-bar" data-name="Label bar" style={{ position: 'relative', flex: '0 0 auto', order: '1', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: '12px', flexWrap: 'wrap', padding: '14px 18px 14px 18px' }}>
            <p data-id="mvp2-video-title" data-name="Title" style={{ position: 'relative', flex: '0 0 auto', order: '0', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#16191C', fontSize: '15px', lineHeight: '1.35', fontWeight: '600' }}>MVP 2: DOM-rendered prototype</p>
            <p data-id="mvp2-video-go" data-name="Watch" style={{ position: 'relative', flex: '0 0 auto', order: '1', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#4358CD', fontSize: '14px', lineHeight: '1.4', fontWeight: '600' }}>Watch on YouTube ↗</p>
          </div>
        </Link>
      </div>
    </div>
  <div data-id="mvp3" data-name="MVP 3" style={{ position: 'relative', flex: '0 0 auto', order: '14', display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center', padding: '72px 20px 0px 20px' }}>
      <div data-id="mvp3-in" data-name="Column" style={{ position: 'relative', flex: '0 0 auto', order: '0', display: 'flex', flexDirection: 'column', width: '100%', maxWidth: '600px', gap: '16px' }}>
        <h2 data-id="mvp3-h" data-name="Heading" style={{ position: 'relative', flex: '0 0 auto', order: '0', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#4358CD', fontSize: '32px', lineHeight: '1.15', fontWeight: '700', letterSpacing: '-0.01em' }}>MVP 3</h2>
        <p data-id="mvp3-p" data-name="Body" style={{ position: 'relative', flex: '0 0 auto', order: '1', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#2A2E33', fontSize: '18px', lineHeight: '1.6' }}>This was our 3rd MVP, built by our second developer. Unfortunately, we ran into problems with the voice API that needed to be fixed before we could do a trial run with our first paid customer, and then we ran out of funding. But the multiplayer movement worked really well, and I'm extremely proud of what we built.</p>
        <Link data-id="mvp3-video" data-name="YouTube video" style={{ position: 'relative', flex: '0 0 auto', order: '2', display: 'flex', flexDirection: 'column', overflow: 'hidden', borderRadius: '18px', backgroundColor: '#ffffff', textDecoration: 'none', marginTop: '8px', boxShadow: '0 1px 2px rgba(20,27,77,.05), 0 8px 28px rgba(20,27,77,.08)' }} href="https://www.youtube.com/watch?v=tScG5YDaeEA" target="_blank" rel="noopener">
          <div data-id="mvp3-video-thumb" data-name="Thumbnail" style={{ position: 'relative', flex: '0 0 auto', order: '0', display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center', justifyContent: 'center', aspectRatio: '16 / 9', backgroundImage: 'url(/assets/kickback-strategy/video-mvp-3.webp)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }} role="img" aria-label="MVP 3: multiplayer movement: YouTube thumbnail">
            <div data-id="mvp3-video-play" data-name="Play" style={{ position: 'relative', flex: '0 0 auto', order: '0', display: 'flex', flexDirection: 'column', width: '68px', height: '68px', alignItems: 'center', justifyContent: 'center', borderRadius: '9999px', backgroundColor: 'rgba(15,21,64,.78)', boxShadow: '0 8px 24px rgba(0,0,0,.3)' }}>
              <p data-id="mvp3-video-play-t" data-name="Icon" style={{ position: 'relative', flex: '0 0 auto', order: '0', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#ffffff', fontSize: '24px', lineHeight: '1', marginLeft: '4px' }}>▶</p>
            </div>
          </div>
          <div data-id="mvp3-video-bar" data-name="Label bar" style={{ position: 'relative', flex: '0 0 auto', order: '1', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: '12px', flexWrap: 'wrap', padding: '14px 18px 14px 18px' }}>
            <p data-id="mvp3-video-title" data-name="Title" style={{ position: 'relative', flex: '0 0 auto', order: '0', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#16191C', fontSize: '15px', lineHeight: '1.35', fontWeight: '600' }}>MVP 3: multiplayer movement</p>
            <p data-id="mvp3-video-go" data-name="Watch" style={{ position: 'relative', flex: '0 0 auto', order: '1', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#4358CD', fontSize: '14px', lineHeight: '1.4', fontWeight: '600' }}>Watch on YouTube ↗</p>
          </div>
        </Link>
      </div>
    </div>
  <div data-id="next" data-name="More Kickback" style={{ position: 'relative', flex: '0 0 auto', order: '15', display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center', padding: '72px 20px 0px 20px' }}>
      <div data-id="next-in" data-name="Column" style={{ position: 'relative', flex: '0 0 auto', order: '0', display: 'flex', flexDirection: 'column', width: '100%', maxWidth: '600px', gap: '16px' }}>
        <h2 data-id="next-h" data-name="Heading" style={{ position: 'relative', flex: '0 0 auto', order: '0', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#4358CD', fontSize: '32px', lineHeight: '1.15', fontWeight: '700', letterSpacing: '-0.01em' }}>More on Kickback</h2>
        <p data-id="next-p" data-name="Body" style={{ position: 'relative', flex: '0 0 auto', order: '1', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#2A2E33', fontSize: '18px', lineHeight: '1.6' }}>This page is the strategy and research behind Kickback. The overview has the product itself.</p>
        <div data-id="next-btns" data-name="Buttons" style={{ position: 'relative', flex: '0 0 auto', order: '2', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '12px' }}>
          <Link data-id="next-overview" data-name="Button" style={{ position: 'relative', flex: '0 0 auto', order: '0', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 20px 12px 20px', borderRadius: '9999px', fontSize: '15px', lineHeight: '1.2', fontWeight: '600', textDecoration: 'none', color: '#ffffff', backgroundColor: '#4358CD', border: '1.5px solid #4358CD' }} href="/work/kickback">← Kickback overview</Link>
          <Link data-id="next-home" data-name="Button" style={{ position: 'relative', flex: '0 0 auto', order: '1', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 20px 12px 20px', borderRadius: '9999px', fontSize: '15px', lineHeight: '1.2', fontWeight: '600', textDecoration: 'none', color: '#4358CD', border: '1.5px solid #4358CD' }} href="/">All work</Link>
        </div>
      </div>
    </div>
  <div data-id="footer" data-name="Footer" style={{ position: 'relative', flex: '0 0 auto', order: '16', display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center', gap: '0px', marginTop: '96px', padding: '72px 20px 56px 20px', backgroundColor: '#F5F5F5' }}>
      <p data-id="footer-l1" data-name="Line 1" style={{ position: 'relative', flex: '0 0 auto', order: '0', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#16191C', fontSize: '26px', lineHeight: '1.2', fontWeight: '600', textAlign: 'center' }}>Thanks for reading.</p>
      <p data-id="footer-l2" data-name="Line 2" style={{ position: 'relative', flex: '0 0 auto', order: '1', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#8A8F96', fontSize: '26px', lineHeight: '1.2', fontWeight: '600', textAlign: 'center' }}>Let's make something.</p>
      <div data-id="footer-hi" data-name="Say hi" style={{ position: 'relative', flex: '0 0 auto', order: '2', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: '6px', flexWrap: 'wrap', marginTop: '14px' }}>
        <Link data-id="footer-mail" data-name="Email" style={{ position: 'relative', flex: '0 0 auto', order: '0', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', fontSize: '14px', lineHeight: '1.5', color: '#4358CD', textDecoration: 'underline' }} href="mailto:theodoreyd@gmail.com">theodoreyd@gmail.com</Link>
      </div>
      <div data-id="footer-rule" data-name="Rule" style={{ position: 'relative', flex: '0 0 auto', order: '3', width: '100%', maxWidth: '760px', height: '1px', backgroundColor: '#DDDDDD', margin: '40px 0px 40px 0px' }} />
      <p data-id="footer-sig" data-name="Signature" style={{ position: 'relative', flex: '0 0 auto', order: '4', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#16191C', fontSize: '12px', lineHeight: '1.4', textAlign: 'center' }}><span style={{ fontWeight: '700' }}>Ted Dessert</span> © 2026</p>
    </div>
</div>
  );
}
