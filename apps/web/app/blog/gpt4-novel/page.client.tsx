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
<div data-id="root" data-name="How to write a Novel with ChatGPT 4" style={{ position: 'relative', display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center', backgroundColor: '#ffffff' }}>
  <style>{`
    @media (max-width: 1024px) and (min-width: 430.02px) {
      [data-id="post-title"] { font-size: 40px !important; }
    }
    @media (max-width: 430px) {
      [data-id="site-nav"] { padding: 16px 20px 16px 20px !important; }
      [data-id="post-title"] { font-size: 32px !important; }
      [data-id="post-head"] { padding: 32px 20px 0px 20px !important; }
      [data-id="post-body"] { padding: 40px 20px 0px 20px !important; }
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
      <p data-id="post-meta" data-name="Kicker" style={{ position: 'relative', flex: '0 0 auto', order: '1', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#4358CD', fontSize: '14px', lineHeight: '1.4', fontWeight: '600', letterSpacing: '0.02em' }}>March 17, 2023 · AI</p>
      <h1 data-id="post-title" data-name="Title" style={{ position: 'relative', flex: '0 0 auto', order: '2', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#16191C', fontSize: '48px', lineHeight: '1.1', fontWeight: '700', letterSpacing: '-0.02em' }}>How to write a Novel with ChatGPT 4</h1>
      <p data-id="post-author" data-name="Author" style={{ position: 'relative', flex: '0 0 auto', order: '3', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#666C73', fontSize: '15px', lineHeight: '1.4' }}>By <span style={{ fontWeight: '600', color: '#16191C' }}>Ted Dessert</span></p>
      <div data-id="post-cover-wrap" data-name="Cover" style={{ position: 'relative', flex: '0 0 auto', order: '4', display: 'flex', flexDirection: 'column', width: '100%', marginTop: '18px' }}>
        <Link data-id="video" data-name="YouTube video" style={{ position: 'relative', flex: '0 0 auto', order: '0', display: 'flex', flexDirection: 'column', width: '100%', overflow: 'hidden', borderRadius: '18px', backgroundColor: '#ffffff', boxShadow: '0 1px 2px rgba(20,27,77,.05), 0 8px 28px rgba(20,27,77,.08)', textDecoration: 'none' }} href="https://www.youtube.com/watch?v=gTphyWyNVMI" target="_blank" rel="noopener">
          <div data-id="video-thumb" data-name="Thumbnail" style={{ position: 'relative', flex: '0 0 auto', order: '0', width: '100%', aspectRatio: '1280 / 720', backgroundImage: 'url(/assets/blog/gpt4-novel-video.webp)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }} role="img" aria-label="Video thumbnail: Chat GPT 4" />
          <div data-id="video-body" data-name="Body" style={{ position: 'relative', flex: '0 0 auto', order: '1', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px', padding: '16px 22px 18px 22px' }}>
            <p data-id="video-t" data-name="Title" style={{ position: 'relative', flex: '1 0 0px', order: '0', minWidth: '0px', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#16191C', fontSize: '16px', lineHeight: '1.4', fontWeight: '600' }}>How to write an entire Novel with the new ChatGPT 4</p>
            <p data-id="video-go" data-name="Watch" style={{ position: 'relative', flex: '0 0 auto', order: '1', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#4358CD', fontSize: '14px', lineHeight: '1.4', fontWeight: '600' }}>Watch on YouTube →</p>
          </div>
        </Link>
      </div>
    </div>
  </div>
  <div data-id="post-body" data-name="Post body" style={{ position: 'relative', flex: '0 0 auto', order: '2', display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center', padding: '56px 20px 0px 20px' }}>
    <div data-id="post-body-in" data-name="Column" style={{ position: 'relative', flex: '0 0 auto', order: '0', display: 'flex', flexDirection: 'column', width: '100%', maxWidth: '600px', gap: '16px' }}>
      <p data-id="p1" data-name="Body" style={{ position: 'relative', flex: '0 0 auto', order: '0', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#2A2E33', fontSize: '18px', lineHeight: '1.6' }}>So I've been working on a prompt for generating novels with ChatGPT, and so far, it's been a pretty enjoyable process.</p>
      <p data-id="p2" data-name="Body" style={{ position: 'relative', flex: '0 0 auto', order: '1', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#2A2E33', fontSize: '18px', lineHeight: '1.6' }}>This technique uses 3 prompts:<br />1st – Sets up the chapters<br />2nd – Tells the story of the first chapter<br />3rd – Tells the story of all the other chapters</p>
      <p data-id="p3" data-name="Body" style={{ position: 'relative', flex: '0 0 auto', order: '2', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#2A2E33', fontSize: '18px', lineHeight: '1.6' }}>I linked the prompts in a GitHub gist, and included the GPT-3 and GPT-4 model versions of the stories so you can compare and contrast the outputs.</p>
      <div data-id="links" data-name="Links" style={{ position: 'relative', flex: '0 0 auto', order: '3', display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <div data-id="links-1" data-name="Item 1" style={{ position: 'relative', flex: '0 0 auto', order: '0', display: 'flex', flexDirection: 'row', gap: '12px', alignItems: 'flex-start' }}>
          <p data-id="links-1-dot" data-name="Bullet" style={{ position: 'relative', flex: '0 0 auto', order: '0', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#4358CD', fontSize: '18px', lineHeight: '1.6' }}>•</p>
          <div data-id="links-1-c" data-name="Content" style={{ position: 'relative', order: '1', flex: '1 0 0px', minWidth: '0px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <p data-id="links-1-l" data-name="Label" style={{ position: 'relative', flex: '0 0 auto', order: '0', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#2A2E33', fontSize: '18px', lineHeight: '1.6' }}>Link to the 3 prompts:</p>
            <Link data-id="links-1-a" data-name="Link" style={{ position: 'relative', flex: '0 0 auto', order: '1', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#4358CD', fontSize: '16px', lineHeight: '1.5', textDecoration: 'underline', wordBreak: 'break-all' }} href="https://gist.github.com/DonjiKong/b98bcc47c76e1c983acd8e0032693987" target="_blank" rel="noopener">https://gist.github.com/DonjiKong/b98bcc47c76e1c983acd8e0032693987</Link>
          </div>
        </div>
        <div data-id="links-2" data-name="Item 2" style={{ position: 'relative', flex: '0 0 auto', order: '1', display: 'flex', flexDirection: 'row', gap: '12px', alignItems: 'flex-start' }}>
          <p data-id="links-2-dot" data-name="Bullet" style={{ position: 'relative', flex: '0 0 auto', order: '0', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#4358CD', fontSize: '18px', lineHeight: '1.6' }}>•</p>
          <div data-id="links-2-c" data-name="Content" style={{ position: 'relative', order: '1', flex: '1 0 0px', minWidth: '0px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <p data-id="links-2-l" data-name="Label" style={{ position: 'relative', flex: '0 0 auto', order: '0', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#2A2E33', fontSize: '18px', lineHeight: '1.6' }}>GPT-3 story:</p>
            <Link data-id="links-2-a" data-name="Link" style={{ position: 'relative', flex: '0 0 auto', order: '1', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#4358CD', fontSize: '16px', lineHeight: '1.5', textDecoration: 'underline', wordBreak: 'break-all' }} href="https://gist.github.com/DonjiKong/54cb23c9a80a9681f9d575109c458578" target="_blank" rel="noopener">https://gist.github.com/DonjiKong/54cb23c9a80a9681f9d575109c458578</Link>
          </div>
        </div>
        <div data-id="links-3" data-name="Item 3" style={{ position: 'relative', flex: '0 0 auto', order: '2', display: 'flex', flexDirection: 'row', gap: '12px', alignItems: 'flex-start' }}>
          <p data-id="links-3-dot" data-name="Bullet" style={{ position: 'relative', flex: '0 0 auto', order: '0', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#4358CD', fontSize: '18px', lineHeight: '1.6' }}>•</p>
          <div data-id="links-3-c" data-name="Content" style={{ position: 'relative', order: '1', flex: '1 0 0px', minWidth: '0px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <p data-id="links-3-l" data-name="Label" style={{ position: 'relative', flex: '0 0 auto', order: '0', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#2A2E33', fontSize: '18px', lineHeight: '1.6' }}>GPT-4 story:</p>
            <Link data-id="links-3-a" data-name="Link" style={{ position: 'relative', flex: '0 0 auto', order: '1', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#4358CD', fontSize: '16px', lineHeight: '1.5', textDecoration: 'underline', wordBreak: 'break-all' }} href="https://gist.github.com/DonjiKong/d0536811d19262399a4ab865a482a31c" target="_blank" rel="noopener">https://gist.github.com/DonjiKong/d0536811d19262399a4ab865a482a31c</Link>
          </div>
        </div>
        <div data-id="links-4" data-name="Item 4" style={{ position: 'relative', flex: '0 0 auto', order: '3', display: 'flex', flexDirection: 'row', gap: '12px', alignItems: 'flex-start' }}>
          <p data-id="links-4-dot" data-name="Bullet" style={{ position: 'relative', flex: '0 0 auto', order: '0', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#4358CD', fontSize: '18px', lineHeight: '1.6' }}>•</p>
          <div data-id="links-4-c" data-name="Content" style={{ position: 'relative', order: '1', flex: '1 0 0px', minWidth: '0px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <p data-id="links-4-l" data-name="Label" style={{ position: 'relative', flex: '0 0 auto', order: '0', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#2A2E33', fontSize: '18px', lineHeight: '1.6' }}>YouTube video going over how the prompt works in more depth:</p>
            <Link data-id="links-4-a" data-name="Link" style={{ position: 'relative', flex: '0 0 auto', order: '1', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#4358CD', fontSize: '16px', lineHeight: '1.5', textDecoration: 'underline', wordBreak: 'break-all' }} href="https://youtu.be/gTphyWyNVMI" target="_blank" rel="noopener">https://youtu.be/gTphyWyNVMI</Link>
          </div>
        </div>
      </div>
      <p data-id="p4" data-name="Body" style={{ position: 'relative', flex: '0 0 auto', order: '4', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#2A2E33', fontSize: '18px', lineHeight: '1.6' }}>I'm curious how all of you would remix this prompt to create better results. Reach out to me on Twitter or in the YouTube comments on the video.</p>
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
