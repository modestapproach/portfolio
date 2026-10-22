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
<div data-id="root" data-name="Supafeed overview" style={{ position: 'relative', display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center', backgroundColor: '#ffffff' }}>
  <style>{`
    @media (max-width: 1024px) and (min-width: 430.02px) {
      [data-id="cases-grid"] { grid-template-columns: minmax(0, 1fr) !important; }
      [data-id="meta"] { width: calc(100% - 32px) !important; margin-top: -48px !important; grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }
      [data-id="two"] { grid-template-columns: minmax(0, 1fr) !important; }
      [data-id="two-mid"] { flex-direction: row !important; flex-wrap: wrap !important; }
      [data-id="hero-phones"] { gap: 14px !important; height: 330px !important; }
      [data-id="hero-phone-1"], [data-id="hero-phone-3"] { width: 180px !important; }
      [data-id="hero-phone-2"] { width: 220px !important; }
      [data-id="hero-title"] { font-size: 44px !important; }
    }
    @media (max-width: 430px) {
      [data-id="cases-grid"] { grid-template-columns: minmax(0, 1fr) !important; }
      [data-id="meta"] { width: calc(100% - 32px) !important; margin-top: -48px !important; grid-template-columns: repeat(2, minmax(0, 1fr)) !important; padding: 22px 22px 22px 22px !important; gap: 18px !important; }
      [data-id="two"] { grid-template-columns: minmax(0, 1fr) !important; }
      [data-id="two-mid"] { flex-direction: row !important; flex-wrap: wrap !important; }
      [data-id="hero-phones"] { gap: 14px !important; height: 330px !important; }
      [data-id="hero-phone-1"], [data-id="hero-phone-3"] { width: 180px !important; display: none !important; }
      [data-id="hero-phone-2"] { width: 220px !important; }
      [data-id="hero"] { padding: 72px 20px 0px 20px !important; }
      [data-id="hero-title"] { font-size: 32px !important; }
      [data-id="backstage-h"], [data-id="came-in-h"], [data-id="problem-h"], [data-id="taught-h"], [data-id="honest-h"], [data-id="live-h"] { font-size: 27px !important; }
    }
  `}</style>
  <div data-id="hero" data-name="Hero" style={{ position: 'relative', flex: '0 0 auto', order: '0', display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center', padding: '110px 20px 0px 20px', overflow: 'hidden', backgroundImage: 'linear-gradient(rgba(255,255,255,.05) 1px, rgba(0,0,0,0) 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, rgba(0,0,0,0) 1px), radial-gradient(120% 90% at 50% 0%, #3A4CC0 0%, #1E2A78 46%, #0F1540 100%)', backgroundSize: '56px 56px, 56px 56px, 100% 100%' }}>
      <div data-id="hero-brand" data-name="Wordmark" style={{ position: 'relative', flex: '0 0 auto', order: '0', width: '98px', marginBottom: '14px', aspectRatio: '579 / 130', backgroundImage: 'url(/assets/supafeed/wordmark-peach.svg)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }} role="img" aria-label="Supafeed" />
      <h1 data-id="hero-title" data-name="Title" style={{ position: 'relative', flex: '0 0 auto', order: '1', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#ffffff', maxWidth: '820px', fontSize: '52px', lineHeight: '1.08', fontWeight: '700', letterSpacing: '-0.02em', textAlign: 'center', marginBottom: '22px' }}>Designing an app with two users: you, and the AI agent that works for you</h1>
      <div data-id="hero-chips" data-name="Chips" style={{ position: 'relative', flex: '0 0 auto', order: '2', display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '56px' }}>
  <Link data-id="chip-1" data-name="Chip" style={{ position: 'relative', flex: '0 0 auto', order: '0', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', fontSize: '14px', lineHeight: '1.4', color: '#ffffff', padding: '7px 14px 7px 14px', borderRadius: '9999px', backgroundColor: 'rgba(255,255,255,.12)', border: '1px solid rgba(255,255,255,.16)' }} href="#cases">Where an agent’s finds go ↓</Link>
  <Link data-id="chip-2" data-name="Chip" style={{ position: 'relative', flex: '0 0 auto', order: '1', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', fontSize: '14px', lineHeight: '1.4', color: '#ffffff', padding: '7px 14px 7px 14px', borderRadius: '9999px', backgroundColor: 'rgba(255,255,255,.12)', border: '1px solid rgba(255,255,255,.16)' }} href="#cases">Onboarding a user who is a machine ↓</Link>
  <Link data-id="chip-3" data-name="Chip" style={{ position: 'relative', flex: '0 0 auto', order: '2', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', fontSize: '14px', lineHeight: '1.4', color: '#ffffff', padding: '7px 14px 7px 14px', borderRadius: '9999px', backgroundColor: 'rgba(255,255,255,.12)', border: '1px solid rgba(255,255,255,.16)' }} href="#cases">Talking back to your agent ↓</Link>
  </div>
      <div data-id="hero-phones" data-name="Phones" style={{ position: 'relative', flex: '0 0 auto', order: '3', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-start', gap: '28px', height: '420px', overflow: 'hidden' }}>
        <div data-id="hero-phone-1" data-name="Hero phone · Today" style={{ position: 'relative', flex: '0 0 auto', order: '0', display: 'flex', flexDirection: 'column', width: '250px', padding: '9px 9px 9px 9px', borderRadius: '42px', backgroundColor: '#0d0f14', boxShadow: '0 24px 60px rgba(10,14,40,.35)', marginTop: '56px', opacity: '0.92' }}>
          <div data-id="hero-phone-1-img" data-name="Screenshot" style={{ position: 'relative', flex: '0 0 auto', order: '0', width: '100%', borderRadius: '34px', aspectRatio: '900 / 1957', backgroundImage: 'url(/assets/supafeed/ios-today.webp)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }} aria-hidden="true" />
        </div>
        <div data-id="hero-phone-2" data-name="Hero phone · Feed" style={{ position: 'relative', flex: '0 0 auto', order: '1', display: 'flex', flexDirection: 'column', width: '280px', padding: '9px 9px 9px 9px', borderRadius: '42px', backgroundColor: '#0d0f14', boxShadow: '0 24px 60px rgba(10,14,40,.35)' }}>
          <div data-id="hero-phone-2-img" data-name="Screenshot" style={{ position: 'relative', flex: '0 0 auto', order: '0', width: '100%', borderRadius: '34px', aspectRatio: '900 / 1957', backgroundImage: 'url(/assets/supafeed/ios-feed.webp)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }} aria-hidden="true" />
        </div>
        <div data-id="hero-phone-3" data-name="Hero phone · Chat" style={{ position: 'relative', flex: '0 0 auto', order: '2', display: 'flex', flexDirection: 'column', width: '250px', padding: '9px 9px 9px 9px', borderRadius: '42px', backgroundColor: '#0d0f14', boxShadow: '0 24px 60px rgba(10,14,40,.35)', marginTop: '56px', opacity: '0.92' }}>
          <div data-id="hero-phone-3-img" data-name="Screenshot" style={{ position: 'relative', flex: '0 0 auto', order: '0', width: '100%', borderRadius: '34px', aspectRatio: '900 / 1957', backgroundImage: 'url(/assets/supafeed/ios-chat-2.webp)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }} aria-hidden="true" />
        </div>
      </div>
    </div>
  <div data-id="meta" data-name="Project details" style={{ position: 'relative', flex: '0 0 auto', order: '1', display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', width: '100%', maxWidth: '900px', marginTop: '-60px', zIndex: '2', gap: '24px', padding: '30px 36px 30px 36px', backgroundColor: '#ffffff', borderRadius: '20px', boxShadow: '0 1px 2px rgba(20,27,77,.05), 0 8px 28px rgba(20,27,77,.08)' }}>
      <div data-id="meta-role" data-name="Role" style={{ position: 'relative', order: '0', display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <h3 data-id="meta-role-k" data-name="Label" style={{ position: 'relative', flex: '0 0 auto', order: '0', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#4358CD', fontSize: '18px', lineHeight: '1.25', fontWeight: '600' }}>Role</h3>
        <p data-id="meta-role-v" data-name="Value" style={{ position: 'relative', flex: '0 0 auto', order: '1', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#2A2E33', fontSize: '16px', lineHeight: '1.45' }}>Founder and designer: product, UX, interaction and visual design, and the build</p>
      </div>
      <div data-id="meta-team" data-name="Team" style={{ position: 'relative', order: '1', display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <h3 data-id="meta-team-k" data-name="Label" style={{ position: 'relative', flex: '0 0 auto', order: '0', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#4358CD', fontSize: '18px', lineHeight: '1.25', fontWeight: '600' }}>Team</h3>
        <p data-id="meta-team-v" data-name="Value" style={{ position: 'relative', flex: '0 0 auto', order: '1', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#2A2E33', fontSize: '16px', lineHeight: '1.45' }}>Just me, directing coding agents (Claude Code and Codex) for most of the code</p>
      </div>
      <div data-id="meta-timeline" data-name="Timeline" style={{ position: 'relative', order: '2', display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <h3 data-id="meta-timeline-k" data-name="Label" style={{ position: 'relative', flex: '0 0 auto', order: '0', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#4358CD', fontSize: '18px', lineHeight: '1.25', fontWeight: '600' }}>Timeline</h3>
        <p data-id="meta-timeline-v" data-name="Value" style={{ position: 'relative', flex: '0 0 auto', order: '1', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#2A2E33', fontSize: '16px', lineHeight: '1.45' }}>13 days<br />Sep 26 – Oct 8, 2026</p>
      </div>
      <div data-id="meta-stack" data-name="Stack" style={{ position: 'relative', order: '3', display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <h3 data-id="meta-stack-k" data-name="Label" style={{ position: 'relative', flex: '0 0 auto', order: '0', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#4358CD', fontSize: '18px', lineHeight: '1.25', fontWeight: '600' }}>Stack</h3>
        <p data-id="meta-stack-v" data-name="Value" style={{ position: 'relative', flex: '0 0 auto', order: '1', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#2A2E33', fontSize: '16px', lineHeight: '1.45' }}>SwiftUI (iOS 26), React, Convex, Cloudflare Workers, Claude Code, Codex</p>
      </div>
    </div>
  <div data-id="backstage" data-name="Backstage" style={{ position: 'relative', flex: '0 0 auto', order: '2', display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center', padding: '72px 20px 0px 20px' }}>
      <div data-id="backstage-in" data-name="Column" style={{ position: 'relative', flex: '0 0 auto', order: '0', display: 'flex', flexDirection: 'column', width: '100%', maxWidth: '600px', gap: '16px' }}>
        <h2 data-id="backstage-h" data-name="Heading" style={{ position: 'relative', flex: '0 0 auto', order: '0', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#4358CD', fontSize: '32px', lineHeight: '1.15', fontWeight: '700', letterSpacing: '-0.01em' }}>Backstage</h2>
        <p data-id="backstage-p1" data-name="Body" style={{ position: 'relative', flex: '0 0 auto', order: '1', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#2A2E33', fontSize: '18px', lineHeight: '1.6' }}>Everyone I know who uses an AI agent has the same problem. Their agent is good at finding things: a concert on Thursday, a job that fits, a bakery worth the walk. Then it pastes the find into a chat, where it scrolls away with everything else.</p>
        <p data-id="backstage-p2" data-name="Body" style={{ position: 'relative', flex: '0 0 auto', order: '2', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#2A2E33', fontSize: '18px', lineHeight: '1.6' }}>By September 2026, agents like <span style={{ fontWeight: '600', color: '#16191C' }}>OpenClaw</span> (which runs on your own computer), <span style={{ fontWeight: '600', color: '#16191C' }}>Hermes</span> and Meta's <span style={{ fontWeight: '600', color: '#16191C' }}>Muse</span> could browse the web and work on a schedule. What they didn't have was a place to put what they found. So the finding happened, and then the finding got lost.</p>
        <p data-id="backstage-p3" data-name="Body" style={{ position: 'relative', flex: '0 0 auto', order: '3', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#2A2E33', fontSize: '18px', lineHeight: '1.6' }}>Supafeed is that place. Your own agent fills a private feed, a plan for your day and small dashboards. You read them on your phone, and talk back to the agent from the same app.</p>
      </div>
    </div>
  <div data-id="came-in" data-name="Where I came in" style={{ position: 'relative', flex: '0 0 auto', order: '3', display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center', padding: '72px 20px 0px 20px' }}>
      <div data-id="came-in-in" data-name="Column" style={{ position: 'relative', flex: '0 0 auto', order: '0', display: 'flex', flexDirection: 'column', width: '100%', maxWidth: '600px', gap: '16px' }}>
        <h2 data-id="came-in-h" data-name="Heading" style={{ position: 'relative', flex: '0 0 auto', order: '0', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#4358CD', fontSize: '32px', lineHeight: '1.15', fontWeight: '700', letterSpacing: '-0.01em' }}>Where I came in</h2>
        <p data-id="came-in-p1" data-name="Body" style={{ position: 'relative', flex: '0 0 auto', order: '1', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#2A2E33', fontSize: '18px', lineHeight: '1.6' }}>This started as something else. <span style={{ fontWeight: '600', color: '#16191C' }}>ClawParty</span>, which a collaborator and I started in February, was a pre-networking platform: AI agents met each other on their humans' behalf before events. Agents wrote plenty. Nobody, human or agent, needed to read much of it.</p>
        <p data-id="came-in-p2" data-name="Body" style={{ position: 'relative', flex: '0 0 auto', order: '2', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#2A2E33', fontSize: '18px', lineHeight: '1.6' }}>In September I took it over alone and turned it inside out: the agent's posts go to one reader, the person who owns the agent. Everything from that point is my design and my build. I wrote the plans, made the product calls, and directed Claude Code and Codex to write most of the code, checking what shipped on my phone and in the simulator.</p>
      </div>
    </div>
  <div data-id="problem" data-name="The problem" style={{ position: 'relative', flex: '0 0 auto', order: '4', display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center', padding: '72px 20px 0px 20px' }} id="problem">
      <div data-id="problem-in" data-name="Column" style={{ position: 'relative', flex: '0 0 auto', order: '0', display: 'flex', flexDirection: 'column', width: '100%', maxWidth: '600px', gap: '16px' }}>
        <h2 data-id="problem-h" data-name="Heading" style={{ position: 'relative', flex: '0 0 auto', order: '0', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#4358CD', fontSize: '32px', lineHeight: '1.15', fontWeight: '700', letterSpacing: '-0.01em' }}>What was the problem?</h2>
        <p data-id="problem-callout" data-name="Problem statement" style={{ position: 'relative', flex: '0 0 auto', order: '1', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#16191C', fontSize: '24px', lineHeight: '1.35', fontWeight: '600', borderLeft: '4px solid #4358CD', padding: '4px 0px 4px 20px', marginBottom: '10px' }}>People's finds were scattered across chats, and their agents had nowhere better to put them.</p>
        <p data-id="problem-p1" data-name="Body" style={{ position: 'relative', flex: '0 0 auto', order: '2', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#2A2E33', fontSize: '18px', lineHeight: '1.6' }}>Three things kept coming up, in my own use and in everything I read:</p>
        <div data-id="problem-list" data-name="Numbered list" style={{ position: 'relative', flex: '0 0 auto', order: '3', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div data-id="problem-list-1" data-name="Item 1" style={{ position: 'relative', flex: '0 0 auto', order: '0', display: 'flex', flexDirection: 'row', gap: '16px', alignItems: 'flex-start' }}>
            <div data-id="problem-list-1-n" data-name="Number" style={{ position: 'relative', flex: '0 0 auto', order: '0', display: 'flex', flexDirection: 'column', width: '28px', height: '28px', borderRadius: '9999px', backgroundColor: '#EEF1FD', alignItems: 'center', justifyContent: 'center', marginTop: '1px' }}>
              <p data-id="problem-list-1-nt" data-name="Digit" style={{ position: 'relative', flex: '0 0 auto', order: '0', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#4358CD', fontSize: '14px', lineHeight: '1', fontWeight: '700' }}>1</p>
            </div>
            <p data-id="problem-list-1-t" data-name="Text" style={{ position: 'relative', flex: '1 0 0px', order: '1', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#2A2E33', minWidth: '0px', fontSize: '18px', lineHeight: '1.6' }}><span style={{ fontWeight: '600', color: '#16191C' }}>A chat is the wrong shape for a find.</span> An event needs a date, a place, a price and a reminder. A chat message has text.</p>
          </div>
          <div data-id="problem-list-2" data-name="Item 2" style={{ position: 'relative', flex: '0 0 auto', order: '1', display: 'flex', flexDirection: 'row', gap: '16px', alignItems: 'flex-start' }}>
            <div data-id="problem-list-2-n" data-name="Number" style={{ position: 'relative', flex: '0 0 auto', order: '0', display: 'flex', flexDirection: 'column', width: '28px', height: '28px', borderRadius: '9999px', backgroundColor: '#EEF1FD', alignItems: 'center', justifyContent: 'center', marginTop: '1px' }}>
              <p data-id="problem-list-2-nt" data-name="Digit" style={{ position: 'relative', flex: '0 0 auto', order: '0', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#4358CD', fontSize: '14px', lineHeight: '1', fontWeight: '700' }}>2</p>
            </div>
            <p data-id="problem-list-2-t" data-name="Text" style={{ position: 'relative', flex: '1 0 0px', order: '1', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#2A2E33', minWidth: '0px', fontSize: '18px', lineHeight: '1.6' }}><span style={{ fontWeight: '600', color: '#16191C' }}>The agent has no screen of its own.</span> It can only talk. It can't lay out a card, so every find arrives looking like every other message.</p>
          </div>
          <div data-id="problem-list-3" data-name="Item 3" style={{ position: 'relative', flex: '0 0 auto', order: '2', display: 'flex', flexDirection: 'row', gap: '16px', alignItems: 'flex-start' }}>
            <div data-id="problem-list-3-n" data-name="Number" style={{ position: 'relative', flex: '0 0 auto', order: '0', display: 'flex', flexDirection: 'column', width: '28px', height: '28px', borderRadius: '9999px', backgroundColor: '#EEF1FD', alignItems: 'center', justifyContent: 'center', marginTop: '1px' }}>
              <p data-id="problem-list-3-nt" data-name="Digit" style={{ position: 'relative', flex: '0 0 auto', order: '0', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#4358CD', fontSize: '14px', lineHeight: '1', fontWeight: '700' }}>3</p>
            </div>
            <p data-id="problem-list-3-t" data-name="Text" style={{ position: 'relative', flex: '1 0 0px', order: '1', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#2A2E33', minWidth: '0px', fontSize: '18px', lineHeight: '1.6' }}><span style={{ fontWeight: '600', color: '#16191C' }}>Neither side can see the other's work.</span> I couldn't tell what my agent was looking for, how often, or whether it had stopped. It couldn't tell what I'd saved, dismissed or wanted more of.</p>
          </div>
        </div>
        <p data-id="problem-p2" data-name="Body" style={{ position: 'relative', flex: '0 0 auto', order: '4', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#2A2E33', fontSize: '18px', lineHeight: '1.6' }}>The third one turned out to be the real problem. Two parties were working on the same thing with no shared surface.</p>
      </div>
    </div>
  <div data-id="two-users" data-name="Two users" style={{ position: 'relative', flex: '0 0 auto', order: '5', display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center', padding: '72px 20px 0px 20px' }}>
      <div data-id="two-users-in" data-name="Column" style={{ position: 'relative', flex: '0 0 auto', order: '0', display: 'flex', flexDirection: 'column', width: '100%', maxWidth: '1040px', gap: '26px' }}>
        <div data-id="two" data-name="Two users diagram" style={{ position: 'relative', flex: '0 0 auto', order: '0', display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 170px minmax(0, 1fr)', gap: '18px', alignItems: 'center' }}>
          <div data-id="two-person" data-name="The person" style={{ position: 'relative', order: '0', display: 'flex', flexDirection: 'column', gap: '4px', padding: '22px 22px 22px 22px', backgroundColor: '#ffffff', borderRadius: '18px', boxShadow: '0 1px 2px rgba(20,27,77,.05), 0 8px 28px rgba(20,27,77,.08)' }}>
            <h4 data-id="two-person-h" data-name="Title" style={{ position: 'relative', flex: '0 0 auto', order: '0', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#16191C', fontSize: '18px', lineHeight: '1.3', fontWeight: '600' }}>The person</h4>
            <p data-id="two-person-who" data-name="Role" style={{ position: 'relative', flex: '0 0 auto', order: '1', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#666C73', fontSize: '13px', lineHeight: '1.4', marginBottom: '8px' }}>Reads, decides, acts</p>
            <div data-id="two-person-list" data-name="List" style={{ position: 'relative', flex: '0 0 auto', order: '2', display: 'flex', flexDirection: 'column', gap: '4px', paddingLeft: '4px' }}>
              <div data-id="two-person-list-1" data-name="Item 1" style={{ position: 'relative', flex: '0 0 auto', order: '0', display: 'flex', flexDirection: 'row', gap: '12px', alignItems: 'flex-start' }}>
                <p data-id="two-person-list-1-dot" data-name="Bullet" style={{ position: 'relative', flex: '0 0 auto', order: '0', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#4358CD', fontSize: '15px', lineHeight: '1.6' }}>•</p>
                <p data-id="two-person-list-1-t" data-name="Text" style={{ position: 'relative', flex: '1 0 0px', order: '1', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#2A2E33', minWidth: '0px', fontSize: '15px', lineHeight: '1.5' }}>A calm, finite feed they can finish</p>
              </div>
              <div data-id="two-person-list-2" data-name="Item 2" style={{ position: 'relative', flex: '0 0 auto', order: '1', display: 'flex', flexDirection: 'row', gap: '12px', alignItems: 'flex-start' }}>
                <p data-id="two-person-list-2-dot" data-name="Bullet" style={{ position: 'relative', flex: '0 0 auto', order: '0', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#4358CD', fontSize: '15px', lineHeight: '1.6' }}>•</p>
                <p data-id="two-person-list-2-t" data-name="Text" style={{ position: 'relative', flex: '1 0 0px', order: '1', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#2A2E33', minWidth: '0px', fontSize: '15px', lineHeight: '1.5' }}>Things they can act on: a date, a place, a button</p>
              </div>
              <div data-id="two-person-list-3" data-name="Item 3" style={{ position: 'relative', flex: '0 0 auto', order: '2', display: 'flex', flexDirection: 'row', gap: '12px', alignItems: 'flex-start' }}>
                <p data-id="two-person-list-3-dot" data-name="Bullet" style={{ position: 'relative', flex: '0 0 auto', order: '0', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#4358CD', fontSize: '15px', lineHeight: '1.6' }}>•</p>
                <p data-id="two-person-list-3-t" data-name="Text" style={{ position: 'relative', flex: '1 0 0px', order: '1', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#2A2E33', minWidth: '0px', fontSize: '15px', lineHeight: '1.5' }}>To see and steer what the agent is doing</p>
              </div>
              <div data-id="two-person-list-4" data-name="Item 4" style={{ position: 'relative', flex: '0 0 auto', order: '3', display: 'flex', flexDirection: 'row', gap: '12px', alignItems: 'flex-start' }}>
                <p data-id="two-person-list-4-dot" data-name="Bullet" style={{ position: 'relative', flex: '0 0 auto', order: '0', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#4358CD', fontSize: '15px', lineHeight: '1.6' }}>•</p>
                <p data-id="two-person-list-4-t" data-name="Text" style={{ position: 'relative', flex: '1 0 0px', order: '1', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#2A2E33', minWidth: '0px', fontSize: '15px', lineHeight: '1.5' }}>Privacy by default</p>
              </div>
            </div>
          </div>
          <div data-id="two-mid" data-name="Middle" style={{ position: 'relative', order: '1', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
            <p data-id="two-arrow-1" data-name="Arrow label" style={{ position: 'relative', flex: '0 0 auto', order: '0', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#666C73', fontSize: '13px', lineHeight: '1.4', textAlign: 'center' }}>reads and steers →</p>
            <div data-id="two-core" data-name="Supafeed" style={{ position: 'relative', flex: '0 0 auto', order: '1', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', padding: '16px 18px 16px 18px', backgroundColor: '#4358CD', borderRadius: '16px' }}>
              <div data-id="two-core-mark" data-name="Mark" style={{ position: 'relative', flex: '0 0 auto', order: '0', width: '33px', filter: 'brightness(0) invert(1)', aspectRatio: '163 / 90', backgroundImage: 'url(/assets/supafeed/mark.svg)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }} aria-hidden="true" />
              <p data-id="two-core-t" data-name="Label" style={{ position: 'relative', flex: '0 0 auto', order: '1', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#ffffff', fontSize: '15px', lineHeight: '1.35', fontWeight: '600', textAlign: 'center' }}>Supafeed</p>
            </div>
            <p data-id="two-arrow-2" data-name="Arrow label" style={{ position: 'relative', flex: '0 0 auto', order: '2', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#666C73', fontSize: '13px', lineHeight: '1.4', textAlign: 'center' }}>← finds and posts</p>
          </div>
          <div data-id="two-agent" data-name="The agent" style={{ position: 'relative', order: '2', display: 'flex', flexDirection: 'column', gap: '4px', padding: '22px 22px 22px 22px', backgroundColor: '#ffffff', borderRadius: '18px', boxShadow: '0 1px 2px rgba(20,27,77,.05), 0 8px 28px rgba(20,27,77,.08)' }}>
            <h4 data-id="two-agent-h" data-name="Title" style={{ position: 'relative', flex: '0 0 auto', order: '0', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#16191C', fontSize: '18px', lineHeight: '1.3', fontWeight: '600' }}>The agent</h4>
            <p data-id="two-agent-who" data-name="Role" style={{ position: 'relative', flex: '0 0 auto', order: '1', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#666C73', fontSize: '13px', lineHeight: '1.4', marginBottom: '8px' }}>Searches, writes, runs on a schedule</p>
            <div data-id="two-agent-list" data-name="List" style={{ position: 'relative', flex: '0 0 auto', order: '2', display: 'flex', flexDirection: 'column', gap: '4px', paddingLeft: '4px' }}>
              <div data-id="two-agent-list-1" data-name="Item 1" style={{ position: 'relative', flex: '0 0 auto', order: '0', display: 'flex', flexDirection: 'row', gap: '12px', alignItems: 'flex-start' }}>
                <p data-id="two-agent-list-1-dot" data-name="Bullet" style={{ position: 'relative', flex: '0 0 auto', order: '0', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#4358CD', fontSize: '15px', lineHeight: '1.6' }}>•</p>
                <p data-id="two-agent-list-1-t" data-name="Text" style={{ position: 'relative', flex: '1 0 0px', order: '1', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#2A2E33', minWidth: '0px', fontSize: '15px', lineHeight: '1.5' }}>An exact contract it can fill without guessing</p>
              </div>
              <div data-id="two-agent-list-2" data-name="Item 2" style={{ position: 'relative', flex: '0 0 auto', order: '1', display: 'flex', flexDirection: 'row', gap: '12px', alignItems: 'flex-start' }}>
                <p data-id="two-agent-list-2-dot" data-name="Bullet" style={{ position: 'relative', flex: '0 0 auto', order: '0', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#4358CD', fontSize: '15px', lineHeight: '1.6' }}>•</p>
                <p data-id="two-agent-list-2-t" data-name="Text" style={{ position: 'relative', flex: '1 0 0px', order: '1', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#2A2E33', minWidth: '0px', fontSize: '15px', lineHeight: '1.5' }}>Instructions it can read on its own</p>
              </div>
              <div data-id="two-agent-list-3" data-name="Item 3" style={{ position: 'relative', flex: '0 0 auto', order: '2', display: 'flex', flexDirection: 'row', gap: '12px', alignItems: 'flex-start' }}>
                <p data-id="two-agent-list-3-dot" data-name="Bullet" style={{ position: 'relative', flex: '0 0 auto', order: '0', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#4358CD', fontSize: '15px', lineHeight: '1.6' }}>•</p>
                <p data-id="two-agent-list-3-t" data-name="Text" style={{ position: 'relative', flex: '1 0 0px', order: '1', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#2A2E33', minWidth: '0px', fontSize: '15px', lineHeight: '1.5' }}>Clear errors when it gets something wrong</p>
              </div>
              <div data-id="two-agent-list-4" data-name="Item 4" style={{ position: 'relative', flex: '0 0 auto', order: '3', display: 'flex', flexDirection: 'row', gap: '12px', alignItems: 'flex-start' }}>
                <p data-id="two-agent-list-4-dot" data-name="Bullet" style={{ position: 'relative', flex: '0 0 auto', order: '0', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#4358CD', fontSize: '15px', lineHeight: '1.6' }}>•</p>
                <p data-id="two-agent-list-4-t" data-name="Text" style={{ position: 'relative', flex: '1 0 0px', order: '1', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#2A2E33', minWidth: '0px', fontSize: '15px', lineHeight: '1.5' }}>To know what the person liked</p>
              </div>
            </div>
          </div>
        </div>
        <p data-id="two-cap" data-name="Caption" style={{ position: 'relative', flex: '0 0 auto', order: '1', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#666C73', fontSize: '14px', lineHeight: '1.45', textAlign: 'center' }}>Two users, opposite needs. Most of the design decisions below are about which of the two a screen is for.</p>
      </div>
    </div>
  <div data-id="cases" data-name="Three case studies" style={{ position: 'relative', flex: '0 0 auto', order: '6', display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center', padding: '72px 20px 0px 20px' }} id="cases">
  <div data-id="cases-in" data-name="Column" style={{ position: 'relative', flex: '0 0 auto', order: '0', display: 'flex', flexDirection: 'column', width: '100%', maxWidth: '1040px', gap: '16px' }}>
  <h2 data-id="cases-h" data-name="Heading" style={{ position: 'relative', flex: '0 0 auto', order: '0', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#4358CD', fontSize: '32px', lineHeight: '1.15', fontWeight: '700', letterSpacing: '-0.01em' }}>Three problems, three case studies</h2>
  <p data-id="cases-p" data-name="Body" style={{ position: 'relative', flex: '0 0 auto', order: '1', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#2A2E33', fontSize: '18px', lineHeight: '1.6' }}>Supafeed is one product, but it set out to solve three different problems for two different users. Each has its own research, its own hard calls and its own honest gaps, so each gets its own page.</p>
  <div data-id="cases-grid" data-name="Case studies" style={{ position: 'relative', flex: '0 0 auto', order: '2', display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', width: '100%', maxWidth: '1040px', gap: '20px' }}>
  <Link data-id="case-1" data-name="Case · Where an agent’s finds go" style={{ position: 'relative', order: '0', display: 'flex', flexDirection: 'column', overflow: 'hidden', borderRadius: '18px', backgroundColor: '#ffffff', boxShadow: '0 1px 2px rgba(20,27,77,.05), 0 8px 28px rgba(20,27,77,.08)', textDecoration: 'none' }} href="/work/supafeed-feed">
  <div data-id="case-1-art" data-name="Art" style={{ position: 'relative', flex: '0 0 auto', order: '0', width: '100%', height: '190px', backgroundImage: 'url(/assets/supafeed/ios-feed-mid.webp)', backgroundSize: 'cover', backgroundPosition: 'center 38%', backgroundRepeat: 'no-repeat' }} aria-hidden="true" />
  <div data-id="case-1-body" data-name="Body" style={{ position: 'relative', flex: '1 0 auto', order: '1', display: 'flex', flexDirection: 'column', gap: '8px', padding: '18px 20px 22px 20px' }}>
  <p data-id="case-1-k" data-name="Kicker" style={{ position: 'relative', flex: '0 0 auto', order: '0', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#4358CD', fontSize: '14px', lineHeight: '1.4', fontWeight: '600', letterSpacing: '0.02em' }}>Case study 1 · The person’s side</p>
  <h3 data-id="case-1-h" data-name="Title" style={{ position: 'relative', flex: '0 0 auto', order: '1', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#16191C', fontSize: '20px', lineHeight: '1.25', fontWeight: '600' }}>Where an agent’s finds go</h3>
  <p data-id="case-1-p" data-name="Text" style={{ position: 'relative', flex: '0 0 auto', order: '2', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#2A2E33', fontSize: '14px', lineHeight: '1.5' }}>A find is a paragraph until something gives it a shape. Research into where finds live today, and the typed card contract that replaced the chat message.</p>
  <p data-id="case-1-go" data-name="Read" style={{ position: 'relative', flex: '0 0 auto', order: '3', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#4358CD', fontSize: '14px', lineHeight: '1.4', fontWeight: '600', marginTop: '4px' }}>Read the case study →</p>
  </div>
  </Link>
  <Link data-id="case-2" data-name="Case · Onboarding a user who is a machine" style={{ position: 'relative', order: '1', display: 'flex', flexDirection: 'column', overflow: 'hidden', borderRadius: '18px', backgroundColor: '#ffffff', boxShadow: '0 1px 2px rgba(20,27,77,.05), 0 8px 28px rgba(20,27,77,.08)', textDecoration: 'none' }} href="/work/supafeed-agent">
  <div data-id="case-2-art" data-name="Art" style={{ position: 'relative', flex: '0 0 auto', order: '0', width: '100%', height: '190px', backgroundImage: 'url(/assets/supafeed/ios-discovery.webp)', backgroundSize: 'cover', backgroundPosition: 'center 38%', backgroundRepeat: 'no-repeat' }} aria-hidden="true" />
  <div data-id="case-2-body" data-name="Body" style={{ position: 'relative', flex: '1 0 auto', order: '1', display: 'flex', flexDirection: 'column', gap: '8px', padding: '18px 20px 22px 20px' }}>
  <p data-id="case-2-k" data-name="Kicker" style={{ position: 'relative', flex: '0 0 auto', order: '0', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#4358CD', fontSize: '14px', lineHeight: '1.4', fontWeight: '600', letterSpacing: '0.02em' }}>Case study 2 · The agent’s side</p>
  <h3 data-id="case-2-h" data-name="Title" style={{ position: 'relative', flex: '0 0 auto', order: '1', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#16191C', fontSize: '20px', lineHeight: '1.25', fontWeight: '600' }}>Onboarding a user who is a machine</h3>
  <p data-id="case-2-p" data-name="Text" style={{ position: 'relative', flex: '0 0 auto', order: '2', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#2A2E33', fontSize: '14px', lineHeight: '1.5' }}>Setup meant terminal commands and pasted keys, and “connected” was a lie. Designing for an agent that reads the docs, sets itself up, and is only ever as green as the server has seen.</p>
  <p data-id="case-2-go" data-name="Read" style={{ position: 'relative', flex: '0 0 auto', order: '3', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#4358CD', fontSize: '14px', lineHeight: '1.4', fontWeight: '600', marginTop: '4px' }}>Read the case study →</p>
  </div>
  </Link>
  <Link data-id="case-3" data-name="Case · Talking back to your agent" style={{ position: 'relative', order: '2', display: 'flex', flexDirection: 'column', overflow: 'hidden', borderRadius: '18px', backgroundColor: '#ffffff', boxShadow: '0 1px 2px rgba(20,27,77,.05), 0 8px 28px rgba(20,27,77,.08)', textDecoration: 'none' }} href="/work/supafeed-chat">
  <div data-id="case-3-art" data-name="Art" style={{ position: 'relative', flex: '0 0 auto', order: '0', width: '100%', height: '190px', backgroundImage: 'url(/assets/supafeed/ios-chat-2.webp)', backgroundSize: 'cover', backgroundPosition: 'center 38%', backgroundRepeat: 'no-repeat' }} aria-hidden="true" />
  <div data-id="case-3-body" data-name="Body" style={{ position: 'relative', flex: '1 0 auto', order: '1', display: 'flex', flexDirection: 'column', gap: '8px', padding: '18px 20px 22px 20px' }}>
  <p data-id="case-3-k" data-name="Kicker" style={{ position: 'relative', flex: '0 0 auto', order: '0', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#4358CD', fontSize: '14px', lineHeight: '1.4', fontWeight: '600', letterSpacing: '0.02em' }}>Case study 3 · Where the two meet</p>
  <h3 data-id="case-3-h" data-name="Title" style={{ position: 'relative', flex: '0 0 auto', order: '1', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#16191C', fontSize: '20px', lineHeight: '1.25', fontWeight: '600' }}>Talking back to your agent</h3>
  <p data-id="case-3-p" data-name="Text" style={{ position: 'relative', flex: '0 0 auto', order: '2', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#2A2E33', fontSize: '14px', lineHeight: '1.5' }}>A feed is one-way. Hold-to-talk, cards inside chat, questions that look different from permissions, and a status that means a real round trip.</p>
  <p data-id="case-3-go" data-name="Read" style={{ position: 'relative', flex: '0 0 auto', order: '3', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#4358CD', fontSize: '14px', lineHeight: '1.4', fontWeight: '600', marginTop: '4px' }}>Read the case study →</p>
  </div>
  </Link>
  </div>
  </div>
  </div>
  <div data-id="taught" data-name="What this project taught me" style={{ position: 'relative', flex: '0 0 auto', order: '7', display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center', padding: '72px 20px 0px 20px' }}>
      <div data-id="taught-in" data-name="Column" style={{ position: 'relative', flex: '0 0 auto', order: '0', display: 'flex', flexDirection: 'column', width: '100%', maxWidth: '600px', gap: '16px' }}>
        <h2 data-id="taught-h" data-name="Heading" style={{ position: 'relative', flex: '0 0 auto', order: '0', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#4358CD', fontSize: '32px', lineHeight: '1.15', fontWeight: '700', letterSpacing: '-0.01em' }}>What this project taught me</h2>
        <p data-id="taught-p1" data-name="Body" style={{ position: 'relative', flex: '0 0 auto', order: '1', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#2A2E33', fontSize: '18px', lineHeight: '1.6' }}>I set out to design an app for a person. I ended up designing for two users with opposite needs: a person who wants calm, finished things, and an agent that needs exact rules and honest feedback.</p>
        <p data-id="taught-p2" data-name="Body" style={{ position: 'relative', flex: '0 0 auto', order: '2', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#2A2E33', fontSize: '18px', lineHeight: '1.6' }}>My best decisions were about <span style={{ fontWeight: '600', color: '#16191C' }}>what not to show</span>: no guessed facts, no fake "connected," no layout from the agent. The more capable the agent, the more the interface has to be the part that refuses to pretend.</p>
        <p data-id="taught-maxim" data-name="Maxim" style={{ position: 'relative', flex: '0 0 auto', order: '3', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#16191C', fontSize: '28px', lineHeight: '1.25', fontWeight: '700', marginTop: '4px' }}>Design the boundary, not just the screen.</p>
      </div>
    </div>
  <div data-id="honest" data-name="Looking back, honestly" style={{ position: 'relative', flex: '0 0 auto', order: '8', display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center', padding: '72px 20px 0px 20px' }}>
      <div data-id="honest-in" data-name="Column" style={{ position: 'relative', flex: '0 0 auto', order: '0', display: 'flex', flexDirection: 'column', width: '100%', maxWidth: '600px', gap: '16px' }}>
        <h2 data-id="honest-h" data-name="Heading" style={{ position: 'relative', flex: '0 0 auto', order: '0', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#4358CD', fontSize: '32px', lineHeight: '1.15', fontWeight: '700', letterSpacing: '-0.01em' }}>Looking back, honestly</h2>
        <div data-id="honest-tags" data-name="Caveats" style={{ position: 'relative', flex: '0 0 auto', order: '1', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '8px', marginBottom: '6px' }}>
          <p data-id="honest-tag-1" data-name="Caveat" style={{ position: 'relative', flex: '0 0 auto', order: '0', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#8A4A2C', fontSize: '13px', lineHeight: '1.4', fontWeight: '600', backgroundColor: '#FBF0EA', borderRadius: '9999px', padding: '6px 12px 6px 12px' }}>One household</p>
          <p data-id="honest-tag-2" data-name="Caveat" style={{ position: 'relative', flex: '0 0 auto', order: '1', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#8A4A2C', fontSize: '13px', lineHeight: '1.4', fontWeight: '600', backgroundColor: '#FBF0EA', borderRadius: '9999px', padding: '6px 12px 6px 12px' }}>No customers yet</p>
          <p data-id="honest-tag-3" data-name="Caveat" style={{ position: 'relative', flex: '0 0 auto', order: '2', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#8A4A2C', fontSize: '13px', lineHeight: '1.4', fontWeight: '600', backgroundColor: '#FBF0EA', borderRadius: '9999px', padding: '6px 12px 6px 12px' }}>Built with coding agents</p>
          <p data-id="honest-tag-4" data-name="Caveat" style={{ position: 'relative', flex: '0 0 auto', order: '3', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#8A4A2C', fontSize: '13px', lineHeight: '1.4', fontWeight: '600', backgroundColor: '#FBF0EA', borderRadius: '9999px', padding: '6px 12px 6px 12px' }}>OpenClaw chat: my Mac only</p>
          <p data-id="honest-tag-5" data-name="Caveat" style={{ position: 'relative', flex: '0 0 auto', order: '4', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#8A4A2C', fontSize: '13px', lineHeight: '1.4', fontWeight: '600', backgroundColor: '#FBF0EA', borderRadius: '9999px', padding: '6px 12px 6px 12px' }}>Muse chat: our side only</p>
        </div>
        <p data-id="honest-p1" data-name="Body" style={{ position: 'relative', flex: '0 0 auto', order: '2', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#2A2E33', fontSize: '18px', lineHeight: '1.6' }}>This is early. One household uses it (mine), and it has no customers yet. One designer built it in 13 days by directing coding agents; that's how it got this far this fast, and the product calls were mine. OpenClaw chat only works where its connector is installed, which today means my Mac. Muse's chat is designed and our half of it is live, but Muse hasn't built its half yet.</p>
        <p data-id="honest-p2" data-name="Body" style={{ position: 'relative', flex: '0 0 auto', order: '3', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#2A2E33', fontSize: '18px', lineHeight: '1.6' }}>What I'd do differently: put steering on the phone in the first week. The research said to make the agent's plan visible, yet the iPhone could show the agent's posts 12 days before it let you steer what the agent looks for. And I'd put the app in front of five other people before the brand got its third name.</p>
      </div>
    </div>
  <div data-id="live" data-name="See it live" style={{ position: 'relative', flex: '0 0 auto', order: '9', display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center', padding: '72px 20px 0px 20px' }}>
      <div data-id="live-in" data-name="Column" style={{ position: 'relative', flex: '0 0 auto', order: '0', display: 'flex', flexDirection: 'column', width: '100%', maxWidth: '600px', gap: '16px' }}>
        <h2 data-id="live-h" data-name="Heading" style={{ position: 'relative', flex: '0 0 auto', order: '0', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#4358CD', fontSize: '32px', lineHeight: '1.15', fontWeight: '700', letterSpacing: '-0.01em' }}>See it live</h2>
        <p data-id="live-p" data-name="Body" style={{ position: 'relative', flex: '0 0 auto', order: '1', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#2A2E33', fontSize: '18px', lineHeight: '1.6' }}>Supafeed is live at supafeed.app, and the iPhone app is in public beta on TestFlight. The page agents read is public too.</p>
        <div data-id="live-btns" data-name="Buttons" style={{ position: 'relative', flex: '0 0 auto', order: '2', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '12px' }}>
          <Link data-id="live-site" data-name="Button" style={{ position: 'relative', flex: '0 0 auto', order: '0', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 20px 12px 20px', borderRadius: '9999px', fontSize: '15px', lineHeight: '1.2', fontWeight: '600', color: '#ffffff', backgroundColor: '#4358CD', border: '1.5px solid #4358CD' }} href="https://supafeed.app/" target="_blank" rel="noopener">Visit supafeed.app →</Link>
          <Link data-id="live-tf" data-name="Button" style={{ position: 'relative', flex: '0 0 auto', order: '1', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 20px 12px 20px', borderRadius: '9999px', fontSize: '15px', lineHeight: '1.2', fontWeight: '600', color: '#4358CD', border: '1.5px solid #4358CD' }} href="https://testflight.apple.com/join/CJ72G2F8" target="_blank" rel="noopener">Get the iPhone beta</Link>
          <Link data-id="live-md" data-name="Button" style={{ position: 'relative', flex: '0 0 auto', order: '2', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 20px 12px 20px', borderRadius: '9999px', fontSize: '15px', lineHeight: '1.2', fontWeight: '600', color: '#4358CD', border: '1.5px solid #4358CD' }} href="https://supafeed.app/agents.md" target="_blank" rel="noopener">Read agents.md</Link>
        </div>
      </div>
    </div>
  <div data-id="footer" data-name="Footer" style={{ position: 'relative', flex: '0 0 auto', order: '10', display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center', gap: '0px', marginTop: '96px', padding: '72px 20px 56px 20px', backgroundColor: '#F5F5F5' }}>
      <p data-id="footer-l1" data-name="Line 1" style={{ position: 'relative', flex: '0 0 auto', order: '0', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#16191C', fontSize: '26px', lineHeight: '1.2', fontWeight: '600', textAlign: 'center' }}>You read to the end.</p>
      <p data-id="footer-l2" data-name="Line 2" style={{ position: 'relative', flex: '0 0 auto', order: '1', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#8A8F96', fontSize: '26px', lineHeight: '1.2', fontWeight: '600', textAlign: 'center' }}>An agent would have summarized it.</p>
      <div data-id="footer-hi" data-name="Say hi" style={{ position: 'relative', flex: '0 0 auto', order: '2', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: '6px', flexWrap: 'wrap', marginTop: '14px' }}>
        <p data-id="footer-hi-t" data-name="Text" style={{ position: 'relative', flex: '0 0 auto', order: '0', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#666C73', fontSize: '14px', lineHeight: '1.5' }}>Glad you didn't. Say hi:</p>
        <Link data-id="footer-mail" data-name="Email" style={{ position: 'relative', flex: '0 0 auto', order: '1', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', fontSize: '14px', lineHeight: '1.5', color: '#4358CD', textDecoration: 'underline' }} href="mailto:theodoreyd@gmail.com">theodoreyd@gmail.com</Link>
      </div>
      <div data-id="footer-rule" data-name="Rule" style={{ position: 'relative', flex: '0 0 auto', order: '3', width: '100%', maxWidth: '760px', height: '1px', backgroundColor: '#DDDDDD', margin: '40px 0px 40px 0px' }} />
      <p data-id="footer-sig" data-name="Signature" style={{ position: 'relative', flex: '0 0 auto', order: '4', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#16191C', fontSize: '12px', lineHeight: '1.4', textAlign: 'center' }}><span style={{ fontWeight: '700' }}>Ted Dessert</span> © 2026</p>
    </div>
</div>
  );
}
