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
<div data-id="root" data-name="My Portfolio TLDR" style={{ position: 'relative', display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center', backgroundColor: '#ffffff' }}>
  <style>{`
    @media (max-width: 1024px) and (min-width: 430.02px) {
      [data-id="post-title"] { font-size: 40px !important; }
    }
    @media (max-width: 430px) {
      [data-id="site-nav"] { padding: 16px 20px 16px 20px !important; }
      [data-id="post-title"] { font-size: 32px !important; }
      [data-id="post-head"] { padding: 32px 20px 0px 20px !important; }
      [data-id="post-body"] { padding: 40px 20px 0px 20px !important; }
      [data-id="testimonials"] { flex-direction: column !important; }
      [data-id="testimonial-1"] { flex: 0 0 auto !important; width: 100% !important; }
      [data-id="testimonial-2"] { flex: 0 0 auto !important; width: 100% !important; }
      [data-id="quote"] { font-size: 19px !important; }
      [data-id="about-h"] { font-size: 23px !important; }
    }
  `}</style>
  <div data-id="site-nav" data-name="Site nav" style={{ position: 'relative', flex: '0 0 auto', order: '0', display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', padding: '22px 40px 22px 40px' }}>
    <Link data-id="site-nav-home" data-name="Home" style={{ position: 'relative', flex: '0 0 auto', order: '0', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#16191C', fontSize: '17px', lineHeight: '1.2', fontWeight: '700', textDecoration: 'none' }} href="/">Ted Dessert</Link>
    <div data-id="site-nav-links" data-name="Links" style={{ position: 'relative', flex: '0 0 auto', order: '1', display: 'flex', flexDirection: 'row', gap: '22px', flexWrap: 'wrap' }}>
      <Link data-id="site-nav-work" data-name="Work" style={{ position: 'relative', flex: '0 0 auto', order: '0', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#2A2E33', fontSize: '15px', lineHeight: '1.2', textDecoration: 'none' }} href="/">Work</Link>
      <Link data-id="site-nav-about" data-name="About" style={{ position: 'relative', flex: '0 0 auto', order: '1', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#2A2E33', fontSize: '15px', lineHeight: '1.2', textDecoration: 'none' }} href="/about">About</Link>
      <Link data-id="site-nav-process" data-name="Process" style={{ position: 'relative', flex: '0 0 auto', order: '2', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#2A2E33', fontSize: '15px', lineHeight: '1.2', textDecoration: 'none' }} href="/process">Process</Link>
      <Link data-id="site-nav-blog" data-name="Blog" style={{ position: 'relative', flex: '0 0 auto', order: '3', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#2A2E33', fontSize: '15px', lineHeight: '1.2', textDecoration: 'none' }} href="/blog">Blog</Link>
    </div>
  </div>
  <div data-id="post-head" data-name="Post header" style={{ position: 'relative', flex: '0 0 auto', order: '1', display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center', padding: '56px 20px 0px 20px' }}>
    <div data-id="post-head-in" data-name="Column" style={{ position: 'relative', flex: '0 0 auto', order: '0', display: 'flex', flexDirection: 'column', width: '100%', maxWidth: '760px', gap: '14px' }}>
      <Link data-id="back-top" data-name="All posts" style={{ position: 'relative', flex: '0 0 auto', order: '0', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#4358CD', fontSize: '15px', lineHeight: '1.4', fontWeight: '600', textDecoration: 'none' }} href="/blog">← All posts</Link>
      <p data-id="post-meta" data-name="Kicker" style={{ position: 'relative', flex: '0 0 auto', order: '1', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#4358CD', fontSize: '14px', lineHeight: '1.4', fontWeight: '600', letterSpacing: '0.02em' }}>April 1, 2023 · Product</p>
      <h1 data-id="post-title" data-name="Title" style={{ position: 'relative', flex: '0 0 auto', order: '2', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#16191C', fontSize: '48px', lineHeight: '1.1', fontWeight: '700', letterSpacing: '-0.02em' }}>My Portfolio TLDR</h1>
      <p data-id="post-author" data-name="Author" style={{ position: 'relative', flex: '0 0 auto', order: '3', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#666C73', fontSize: '15px', lineHeight: '1.4' }}>By <span style={{ fontWeight: '600', color: '#16191C' }}>Ted Dessert</span></p>
      <div data-id="post-cover-wrap" data-name="Cover" style={{ position: 'relative', flex: '0 0 auto', order: '4', display: 'flex', flexDirection: 'column', width: '100%', marginTop: '18px' }}>
        <div data-id="cover" data-name="Cover card" style={{ position: 'relative', flex: '0 0 auto', order: '0', display: 'flex', flexDirection: 'column', width: '100%', overflow: 'hidden', borderRadius: '18px', backgroundColor: '#ffffff', boxShadow: '0 1px 2px rgba(20,27,77,.05), 0 8px 28px rgba(20,27,77,.08)' }}>
          <div data-id="cover-img" data-name="Cover image" style={{ position: 'relative', flex: '0 0 auto', order: '0', width: '100%', aspectRatio: '1074 / 702', backgroundImage: 'url(/assets/blog/my-portfolio-tldr-cover.webp)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }} role="img" aria-label="Two dancers wearing glowing Kromakicks" />
        </div>
      </div>
    </div>
  </div>
  <div data-id="post-body" data-name="Post body" style={{ position: 'relative', flex: '0 0 auto', order: '2', display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center', padding: '56px 20px 0px 20px' }}>
    <div data-id="post-body-in" data-name="Column" style={{ position: 'relative', flex: '0 0 auto', order: '0', display: 'flex', flexDirection: 'column', width: '100%', maxWidth: '600px', gap: '16px' }}>
      <p data-id="p1" data-name="Body" style={{ position: 'relative', flex: '0 0 auto', order: '0', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#2A2E33', fontSize: '18px', lineHeight: '1.6' }}>Hello, this is a brief overview of what I think is my most important work.</p>
      <h2 data-id="about-h" data-name="Heading" style={{ position: 'relative', flex: '0 0 auto', order: '1', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#4358CD', fontSize: '26px', lineHeight: '1.2', fontWeight: '700', letterSpacing: '-0.01em', marginTop: '20px' }}>A little about me</h2>
      <p data-id="p2" data-name="Body" style={{ position: 'relative', flex: '0 0 auto', order: '2', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#2A2E33', fontSize: '18px', lineHeight: '1.6' }}>Over the years, I got to work on some of the most exciting products, each one at the genesis of the company. Some notable products I worked on were <span style={{ fontWeight: '600', color: '#16191C' }}>Artisense</span>, a self-driving car sensor company that was acquired, where I was the first employee; <span style={{ fontWeight: '600', color: '#16191C' }}>Kromakicks</span>, a motion-reactive light-up rave wear product I created and launched from scratch; and <span style={{ fontWeight: '600', color: '#16191C' }}>Metabob</span>, an AI company that I helped start that raised over 3 million dollars, and is still going strong.</p>
      <p data-id="quote" data-name="Pull quote" style={{ position: 'relative', flex: '0 0 auto', order: '3', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#16191C', fontSize: '22px', lineHeight: '1.4', fontWeight: '600', borderLeft: '4px solid #4358CD', padding: '4px 0px 4px 20px', margin: '8px 0px 8px 0px' }}>But the crown jewel in my journey so far has been the response I received from Kromakicks. None of my projects had actual fans who just loved everything about the product like that project.</p>
      <h3 data-id="shots-h" data-name="Subheading" style={{ position: 'relative', flex: '0 0 auto', order: '4', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#16191C', fontSize: '20px', lineHeight: '1.3', fontWeight: '600', marginTop: '16px' }}>Here are some screenshots:</h3>
      <div data-id="viral" data-name="Viral campaign" style={{ position: 'relative', flex: '0 0 auto', order: '5', display: 'flex', flexDirection: 'column', width: '100%', gap: '12px', margin: '12px 0px 12px 0px' }}>
        <div data-id="viral-card" data-name="Card" style={{ position: 'relative', flex: '0 0 auto', order: '0', display: 'flex', flexDirection: 'column', width: '100%', overflow: 'hidden', borderRadius: '18px', backgroundColor: '#ffffff', boxShadow: '0 1px 2px rgba(20,27,77,.05), 0 8px 28px rgba(20,27,77,.08)' }}>
          <div data-id="viral-img" data-name="Screenshot" style={{ position: 'relative', flex: '0 0 auto', order: '0', width: '100%', aspectRatio: '1024 / 877', backgroundImage: 'url(/assets/blog/kromakicks-viral.webp)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }} role="img" aria-label="Kromakicks posts with tens of thousands of views" />
        </div>
        <p data-id="viral-cap" data-name="Caption" style={{ position: 'relative', flex: '0 0 auto', order: '1', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#666C73', fontSize: '14px', lineHeight: '1.45', textAlign: 'center' }}>Our product marketing campaign went viral</p>
      </div>
      <div data-id="testimonials" data-name="Testimonials" style={{ position: 'relative', flex: '0 0 auto', order: '6', display: 'flex', flexDirection: 'row', width: '100%', gap: '16px', alignItems: 'flex-start', margin: '4px 0px 12px 0px' }}>
        <div data-id="testimonial-1" data-name="Comments 1" style={{ position: 'relative', order: '0', display: 'flex', flexDirection: 'column', overflow: 'hidden', borderRadius: '18px', backgroundColor: '#ffffff', boxShadow: '0 1px 2px rgba(20,27,77,.05), 0 8px 28px rgba(20,27,77,.08)', flex: '1 0 0px', minWidth: '0px' }}>
          <div data-id="testimonial-1-img" data-name="Screenshot" style={{ position: 'relative', flex: '0 0 auto', order: '0', width: '100%', aspectRatio: '680 / 731', backgroundImage: 'url(/assets/blog/kromakicks-testimonial-1.webp)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }} role="img" aria-label="Instagram comments about Kromakicks" />
        </div>
        <div data-id="testimonial-2" data-name="Comments 2" style={{ position: 'relative', order: '1', display: 'flex', flexDirection: 'column', overflow: 'hidden', borderRadius: '18px', backgroundColor: '#ffffff', boxShadow: '0 1px 2px rgba(20,27,77,.05), 0 8px 28px rgba(20,27,77,.08)', flex: '1 0 0px', minWidth: '0px' }}>
          <div data-id="testimonial-2-img" data-name="Screenshot" style={{ position: 'relative', flex: '0 0 auto', order: '0', width: '100%', aspectRatio: '680 / 1222', backgroundImage: 'url(/assets/blog/kromakicks-testimonial-2.webp)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }} role="img" aria-label="More Instagram comments about Kromakicks" />
        </div>
      </div>
      <p data-id="p3" data-name="Body" style={{ position: 'relative', flex: '0 0 auto', order: '7', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#2A2E33', fontSize: '18px', lineHeight: '1.6' }}>We created a product from scratch that people who used it, and people who just saw it, LOVED. It was really a great feeling to truly innovate and be recognized by the public, a feeling that I've been chasing ever since.</p>
      <p data-id="p4" data-name="Body" style={{ position: 'relative', flex: '0 0 auto', order: '8', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#2A2E33', fontSize: '18px', lineHeight: '1.6' }}>My only wish for that project is that we could have figured the manufacturing out so we could have brought the product price point down to something people would be willing to buy it for, but that's a story for another time. This is one of my motivations for seeking out work at companies with more resources and reach.</p>
      <p data-id="p5" data-name="Body" style={{ position: 'relative', flex: '0 0 auto', order: '9', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#2A2E33', fontSize: '18px', lineHeight: '1.6' }}>If you are wondering what my intentions are for working at your company, it's to make this happen for a product under your roof that actually makes it to the hands of millions. I want people to not only find the things I create to be useful, but also deeply loved.</p>
      <h3 data-id="video-h" data-name="Subheading" style={{ position: 'relative', flex: '0 0 auto', order: '10', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#16191C', fontSize: '20px', lineHeight: '1.3', fontWeight: '600', marginTop: '16px' }}>Here is the video of our Kickstarter going over our product:</h3>
      <Link data-id="kickstarter" data-name="Kickstarter video" style={{ position: 'relative', flex: '0 0 auto', order: '11', display: 'flex', flexDirection: 'column', width: '100%', overflow: 'hidden', borderRadius: '18px', backgroundColor: '#ffffff', boxShadow: '0 1px 2px rgba(20,27,77,.05), 0 8px 28px rgba(20,27,77,.08)', textDecoration: 'none', margin: '12px 0px 12px 0px' }} href="https://www.kickstarter.com/projects/kromakicks/kroma-kicks-dancewear-reimagined" target="_blank" rel="noopener">
        <div data-id="kickstarter-body" data-name="Body" style={{ position: 'relative', flex: '0 0 auto', order: '0', display: 'flex', flexDirection: 'column', gap: '6px', padding: '18px 22px 20px 22px' }}>
          <p data-id="kickstarter-k" data-name="Kicker" style={{ position: 'relative', flex: '0 0 auto', order: '0', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#4358CD', fontSize: '14px', lineHeight: '1.4', fontWeight: '600', letterSpacing: '0.02em' }}>Kickstarter · Video</p>
          <p data-id="kickstarter-t" data-name="Title" style={{ position: 'relative', flex: '0 0 auto', order: '1', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#16191C', fontSize: '20px', lineHeight: '1.3', fontWeight: '600' }}>Kroma Kicks: Dancewear Reimagined</p>
          <p data-id="kickstarter-go" data-name="Watch" style={{ position: 'relative', flex: '0 0 auto', order: '2', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#4358CD', fontSize: '14px', lineHeight: '1.4', fontWeight: '600', marginTop: '4px' }}>Watch on Kickstarter →</p>
        </div>
      </Link>
    </div>
  </div>
  <div data-id="post-end" data-name="Back" style={{ position: 'relative', flex: '0 0 auto', order: '3', display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center', padding: '56px 20px 0px 20px' }}>
    <div data-id="post-end-in" data-name="Column" style={{ position: 'relative', flex: '0 0 auto', order: '0', display: 'flex', flexDirection: 'column', width: '100%', maxWidth: '600px', borderTop: '1px solid #E6E8EB', padding: '28px 0px 0px 0px' }}>
      <Link data-id="back-bottom" data-name="All posts" style={{ position: 'relative', flex: '0 0 auto', order: '0', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#4358CD', fontSize: '16px', lineHeight: '1.4', fontWeight: '600', textDecoration: 'none' }} href="/blog">← All posts</Link>
    </div>
  </div>
  <div data-id="footer" data-name="Footer" style={{ position: 'relative', flex: '0 0 auto', order: '4', display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center', gap: '0px', marginTop: '96px', padding: '72px 20px 56px 20px', backgroundColor: '#F5F5F5' }}>
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
