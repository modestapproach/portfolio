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
<div data-id="root" data-name="Blog" style={{ position: 'relative', display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center', backgroundColor: '#ffffff' }}>
  <style>{`
    @media (max-width: 1024px) and (min-width: 430.02px) {
      [data-id="blog-grid"] { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }
    }
    @media (max-width: 430px) {
      [data-id="site-nav"] { padding: 16px 20px 16px 20px !important; }
      [data-id="blog-grid"] { grid-template-columns: minmax(0, 1fr) !important; }
      [data-id="blog-title"] { font-size: 34px !important; }
      [data-id="blog-head"] { padding: 40px 20px 0px 20px !important; }
      [data-id="blog-list"] { padding: 32px 20px 0px 20px !important; }
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
  <div data-id="blog-head" data-name="Header" style={{ position: 'relative', flex: '0 0 auto', order: '1', display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center', padding: '72px 20px 0px 20px' }}>
    <div data-id="blog-head-in" data-name="Column" style={{ position: 'relative', flex: '0 0 auto', order: '0', display: 'flex', flexDirection: 'column', width: '100%', maxWidth: '1040px', gap: '12px' }}>
      <p data-id="blog-k" data-name="Kicker" style={{ position: 'relative', flex: '0 0 auto', order: '0', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#4358CD', fontSize: '14px', lineHeight: '1.4', fontWeight: '600', letterSpacing: '0.02em' }}>Blog</p>
      <h1 data-id="blog-title" data-name="Title" style={{ position: 'relative', flex: '0 0 auto', order: '1', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#16191C', fontSize: '48px', lineHeight: '1.1', fontWeight: '700', letterSpacing: '-0.02em' }}>Latest blogs & news</h1>
      <p data-id="blog-sub" data-name="Intro" style={{ position: 'relative', flex: '0 0 auto', order: '2', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#2A2E33', fontSize: '18px', lineHeight: '1.6' }}>A blog about UX design & AI.</p>
    </div>
  </div>
  <div data-id="blog-list" data-name="Posts" style={{ position: 'relative', flex: '0 0 auto', order: '2', display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center', padding: '48px 20px 0px 20px' }}>
    <div data-id="blog-grid" data-name="Post cards" style={{ position: 'relative', flex: '0 0 auto', order: '0', display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', width: '100%', maxWidth: '1040px', gap: '20px' }}>
      <Link data-id="post-1" data-name="Post · Portfolio Chatbot" style={{ position: 'relative', flex: '0 0 auto', order: '0', display: 'flex', flexDirection: 'column', overflow: 'hidden', borderRadius: '18px', backgroundColor: '#ffffff', boxShadow: '0 1px 2px rgba(20,27,77,.05), 0 8px 28px rgba(20,27,77,.08)', textDecoration: 'none' }} href="/blog/portfolio-chatbot">
        <div data-id="post-1-art" data-name="Cover" style={{ position: 'relative', flex: '0 0 auto', order: '0', width: '100%', aspectRatio: '16 / 10', backgroundImage: 'url(/assets/blog/portfolio-chatbot-cover.webp)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }} aria-hidden="true" />
        <div data-id="post-1-body" data-name="Body" style={{ position: 'relative', order: '1', flex: '1 0 auto', display: 'flex', flexDirection: 'column', gap: '8px', padding: '18px 20px 22px 20px' }}>
          <p data-id="post-1-k" data-name="Kicker" style={{ position: 'relative', flex: '0 0 auto', order: '0', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#4358CD', fontSize: '14px', lineHeight: '1.4', fontWeight: '600', letterSpacing: '0.02em' }}>AI · July 12, 2023</p>
          <h2 data-id="post-1-h" data-name="Title" style={{ position: 'relative', flex: '0 0 auto', order: '1', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#16191C', fontSize: '22px', lineHeight: '1.25', fontWeight: '600' }}>Portfolio Chatbot</h2>
          <p data-id="post-1-p" data-name="Excerpt" style={{ position: 'relative', flex: '0 0 auto', order: '2', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#2A2E33', fontSize: '15px', lineHeight: '1.5' }}>In this article I go over how I built it, how the underlying tech works, and what I plan on doing with it in the near future.</p>
          <p data-id="post-1-go" data-name="Read" style={{ position: 'relative', flex: '0 0 auto', order: '3', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#4358CD', fontSize: '14px', lineHeight: '1.4', fontWeight: '600', marginTop: '4px' }}>Read post →</p>
        </div>
      </Link>
      <Link data-id="post-2" data-name="Post · My Portfolio TLDR" style={{ position: 'relative', flex: '0 0 auto', order: '1', display: 'flex', flexDirection: 'column', overflow: 'hidden', borderRadius: '18px', backgroundColor: '#ffffff', boxShadow: '0 1px 2px rgba(20,27,77,.05), 0 8px 28px rgba(20,27,77,.08)', textDecoration: 'none' }} href="/blog/my-portfolio-tldr">
        <div data-id="post-2-art" data-name="Cover" style={{ position: 'relative', flex: '0 0 auto', order: '0', width: '100%', aspectRatio: '16 / 10', backgroundImage: 'url(/assets/blog/my-portfolio-tldr-cover.webp)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }} aria-hidden="true" />
        <div data-id="post-2-body" data-name="Body" style={{ position: 'relative', order: '1', flex: '1 0 auto', display: 'flex', flexDirection: 'column', gap: '8px', padding: '18px 20px 22px 20px' }}>
          <p data-id="post-2-k" data-name="Kicker" style={{ position: 'relative', flex: '0 0 auto', order: '0', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#4358CD', fontSize: '14px', lineHeight: '1.4', fontWeight: '600', letterSpacing: '0.02em' }}>Product · April 1, 2023</p>
          <h2 data-id="post-2-h" data-name="Title" style={{ position: 'relative', flex: '0 0 auto', order: '1', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#16191C', fontSize: '22px', lineHeight: '1.25', fontWeight: '600' }}>My Portfolio TLDR</h2>
          <p data-id="post-2-go" data-name="Read" style={{ position: 'relative', flex: '0 0 auto', order: '2', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#4358CD', fontSize: '14px', lineHeight: '1.4', fontWeight: '600', marginTop: '4px' }}>Read post →</p>
        </div>
      </Link>
      <Link data-id="post-3" data-name="Post · How to write a Novel with ChatGPT 4" style={{ position: 'relative', flex: '0 0 auto', order: '2', display: 'flex', flexDirection: 'column', overflow: 'hidden', borderRadius: '18px', backgroundColor: '#ffffff', boxShadow: '0 1px 2px rgba(20,27,77,.05), 0 8px 28px rgba(20,27,77,.08)', textDecoration: 'none' }} href="/blog/gpt4-novel">
        <div data-id="post-3-art" data-name="Cover" style={{ position: 'relative', flex: '0 0 auto', order: '0', width: '100%', aspectRatio: '16 / 10', backgroundImage: 'url(/assets/blog/gpt4-novel-video.webp)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }} aria-hidden="true" />
        <div data-id="post-3-body" data-name="Body" style={{ position: 'relative', order: '1', flex: '1 0 auto', display: 'flex', flexDirection: 'column', gap: '8px', padding: '18px 20px 22px 20px' }}>
          <p data-id="post-3-k" data-name="Kicker" style={{ position: 'relative', flex: '0 0 auto', order: '0', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#4358CD', fontSize: '14px', lineHeight: '1.4', fontWeight: '600', letterSpacing: '0.02em' }}>AI · March 17, 2023</p>
          <h2 data-id="post-3-h" data-name="Title" style={{ position: 'relative', flex: '0 0 auto', order: '1', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#16191C', fontSize: '22px', lineHeight: '1.25', fontWeight: '600' }}>How to write a Novel with ChatGPT 4</h2>
          <p data-id="post-3-go" data-name="Read" style={{ position: 'relative', flex: '0 0 auto', order: '2', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#4358CD', fontSize: '14px', lineHeight: '1.4', fontWeight: '600', marginTop: '4px' }}>Read post →</p>
        </div>
      </Link>
    </div>
  </div>
  <div data-id="footer" data-name="Footer" style={{ position: 'relative', flex: '0 0 auto', order: '3', display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center', gap: '0px', marginTop: '96px', padding: '72px 20px 56px 20px', backgroundColor: '#F5F5F5' }}>
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
