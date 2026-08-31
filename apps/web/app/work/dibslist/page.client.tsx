'use client';

/** @canvas {
  "viewports": [
    { "id": "desktop", "label": "Desktop", "width": 1440, "height": 900, "isPrimary": true, "order": 0 }
  ],
  "positions": {
    "desktop": { "x": 0, "y": 0 }
  }
} */

import React from 'react';

export default function Page() {
  return (
<div data-id="root" data-name="Dibslist case study" style={{
  position: 'relative', width: '100%',
  display: 'flex', flexDirection: 'column',
  backgroundColor: '#f6f0e5',
  fontFamily: 'Geist Sans, -apple-system, BlinkMacSystemFont, sans-serif'
}}>

  <div data-id="cs-top" data-name="Top bar" style={{ position: 'relative', flex: '0 0 auto', order: '0', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: '28px 96px' }}>
    <a data-id="cs-back" data-name="Back link" href="/" style={{ position: 'relative', flex: '0 0 auto', order: '0', fontSize: '14px', fontWeight: '600', color: '#4a6c56', textDecoration: 'none' }}>← Ted Dessert</a>
    <p data-id="cs-crumb" data-name="Crumb" style={{ position: 'relative', flex: '0 0 auto', order: '1', fontSize: '13px', color: '#7d735f' }}>Selected work / Dibslist</p>
  </div>

  <div data-id="cs-hero" data-name="Case hero" style={{ position: 'relative', flex: '0 0 auto', order: '1', display: 'flex', flexDirection: 'column', gap: '20px', padding: '40px 96px 56px 96px' }}>
    <p data-id="cs-badge" data-name="Badge" style={{ position: 'relative', flex: '0 0 auto', order: '0', fontSize: '13px', fontWeight: '600', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#4a6c56' }}>Object-aware checkout · 2026 concept</p>
    <h1 data-id="cs-title" data-name="Title" style={{ position: 'relative', flex: '0 0 auto', order: '1', fontSize: '64px', lineHeight: '1.04', fontWeight: '700', letterSpacing: '-0.02em', color: '#222017', maxWidth: '880px' }}>Dibslist</h1>
    <p data-id="cs-deck" data-name="Deck" style={{ position: 'relative', flex: '0 0 auto', order: '2', fontSize: '21px', lineHeight: '1.5', color: '#665f4e', maxWidth: '700px' }}>A marketplace thesis built around latent supply: receipts become inventory, and checkout becomes the moment local alternatives appear.</p>
    <div data-id="cs-meta" data-name="Meta row" style={{ position: 'relative', flex: '0 0 auto', order: '3', display: 'flex', flexDirection: 'row', gap: '48px', marginTop: '16px' }}>
      <div data-id="meta-role" data-name="Meta · role" style={{ position: 'relative', flex: '0 0 auto', order: '0', display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <p data-id="meta-role-k" data-name="Label" style={{ position: 'relative', flex: '0 0 auto', order: '0', fontSize: '12px', fontWeight: '600', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#7d735f' }}>Role</p>
        <p data-id="meta-role-v" data-name="Value" style={{ position: 'relative', flex: '0 0 auto', order: '1', fontSize: '15px', color: '#222017' }}>Founding designer</p>
      </div>
      <div data-id="meta-year" data-name="Meta · year" style={{ position: 'relative', flex: '0 0 auto', order: '1', display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <p data-id="meta-year-k" data-name="Label" style={{ position: 'relative', flex: '0 0 auto', order: '0', fontSize: '12px', fontWeight: '600', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#7d735f' }}>Year</p>
        <p data-id="meta-year-v" data-name="Value" style={{ position: 'relative', flex: '0 0 auto', order: '1', fontSize: '15px', color: '#222017' }}>2026</p>
      </div>
      <div data-id="meta-status" data-name="Meta · status" style={{ position: 'relative', flex: '0 0 auto', order: '2', display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <p data-id="meta-status-k" data-name="Label" style={{ position: 'relative', flex: '0 0 auto', order: '0', fontSize: '12px', fontWeight: '600', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#7d735f' }}>Status</p>
        <p data-id="meta-status-v" data-name="Value" style={{ position: 'relative', flex: '0 0 auto', order: '1', fontSize: '15px', color: '#222017' }}>Concept → prototype</p>
      </div>
    </div>
  </div>

  <div data-id="cs-cover" data-name="Cover" style={{ position: 'relative', flex: '0 0 auto', order: '2', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '420px', margin: '0 96px', borderRadius: '22px', backgroundColor: '#4a6c56', overflow: 'hidden' }}>
    <p data-id="cs-cover-word" data-name="Cover word" style={{ position: 'relative', flex: '0 0 auto', order: '0', fontSize: '96px', fontWeight: '700', letterSpacing: '-0.03em', color: '#f6f0e5' }}>Dibslist</p>
  </div>

  <div data-id="cs-body" data-name="Narrative" style={{ position: 'relative', flex: '0 0 auto', order: '3', display: 'flex', flexDirection: 'column', gap: '56px', padding: '72px 96px 96px 96px', maxWidth: '860px' }}>

    <div data-id="sec-thesis" data-name="Section · thesis" style={{ position: 'relative', flex: '0 0 auto', order: '0', display: 'flex', flexDirection: 'column', gap: '14px' }}>
      <h2 data-id="sec-thesis-t" data-name="Heading" style={{ position: 'relative', flex: '0 0 auto', order: '0', fontSize: '28px', fontWeight: '700', color: '#222017' }}>The thesis: supply is already in your pocket</h2>
      <p data-id="sec-thesis-p" data-name="Body" style={{ position: 'relative', flex: '0 0 auto', order: '1', fontSize: '17px', lineHeight: '1.65', color: '#3a3527' }}>Everything you buy leaves a receipt, and every receipt describes an object you now own. Dibslist treats those receipts as latent marketplace inventory: the things people would sell if listing them took zero effort. The design problem was never the listing form — it was the moment of intent.</p>
    </div>

    <div data-id="sec-checkout" data-name="Section · checkout" style={{ position: 'relative', flex: '0 0 auto', order: '1', display: 'flex', flexDirection: 'column', gap: '14px' }}>
      <h2 data-id="sec-checkout-t" data-name="Heading" style={{ position: 'relative', flex: '0 0 auto', order: '0', fontSize: '28px', fontWeight: '700', color: '#222017' }}>Checkout as the marketplace's front door</h2>
      <p data-id="sec-checkout-p" data-name="Body" style={{ position: 'relative', flex: '0 0 auto', order: '1', fontSize: '17px', lineHeight: '1.65', color: '#3a3527' }}>The core interaction inverts shopping: at the moment you are about to buy something new, Dibslist surfaces the same object owned nearby — cheaper, closer, already broken in. Checkout becomes a fork in the road, and the marketplace grows precisely where demand is proven, one intercepted purchase at a time.</p>
    </div>

    <div data-id="sec-craft" data-name="Section · craft" style={{ position: 'relative', flex: '0 0 auto', order: '2', display: 'flex', flexDirection: 'column', gap: '14px' }}>
      <h2 data-id="sec-craft-t" data-name="Heading" style={{ position: 'relative', flex: '0 0 auto', order: '0', fontSize: '28px', fontWeight: '700', color: '#222017' }}>What the design work actually was</h2>
      <p data-id="sec-craft-p" data-name="Body" style={{ position: 'relative', flex: '0 0 auto', order: '1', fontSize: '17px', lineHeight: '1.65', color: '#3a3527' }}>Object-first information architecture instead of listing-first. Trust surfaces for buying from a person, not a store. And a checkout interception that had to feel like a gift, not an ambush — the difference between the two is about forty pixels and one sentence of copy.</p>
    </div>

    <a data-id="cs-next" data-name="Next link" href="/" style={{ position: 'relative', flex: '0 0 auto', order: '3', fontSize: '15px', fontWeight: '600', color: '#8b3a2b', textDecoration: 'none', marginTop: '8px' }}>← Back to all work</a>
  </div>

</div>
  );
}
