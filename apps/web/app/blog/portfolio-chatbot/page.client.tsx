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
<div data-id="root" data-name="Portfolio Chatbot" style={{ position: 'relative', display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center', backgroundColor: '#ffffff' }}>
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
      <p data-id="post-meta" data-name="Kicker" style={{ position: 'relative', flex: '0 0 auto', order: '1', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#4358CD', fontSize: '14px', lineHeight: '1.4', fontWeight: '600', letterSpacing: '0.02em' }}>July 12, 2023 · AI</p>
      <h1 data-id="post-title" data-name="Title" style={{ position: 'relative', flex: '0 0 auto', order: '2', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#16191C', fontSize: '48px', lineHeight: '1.1', fontWeight: '700', letterSpacing: '-0.02em' }}>Portfolio Chatbot</h1>
      <p data-id="post-author" data-name="Author" style={{ position: 'relative', flex: '0 0 auto', order: '3', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#666C73', fontSize: '15px', lineHeight: '1.4' }}>By <span style={{ fontWeight: '600', color: '#16191C' }}>Ted Dessert</span></p>
      <div data-id="post-cover-wrap" data-name="Cover" style={{ position: 'relative', flex: '0 0 auto', order: '4', display: 'flex', flexDirection: 'column', width: '100%', marginTop: '18px' }}>
        <div data-id="cover" data-name="Cover card" style={{ position: 'relative', flex: '0 0 auto', order: '0', display: 'flex', flexDirection: 'column', width: '100%', overflow: 'hidden', borderRadius: '18px', backgroundColor: '#ffffff', boxShadow: '0 1px 2px rgba(20,27,77,.05), 0 8px 28px rgba(20,27,77,.08)', maxWidth: '560px', alignSelf: 'center' }}>
          <div data-id="cover-img" data-name="Cover image" style={{ position: 'relative', flex: '0 0 auto', order: '0', width: '100%', aspectRatio: '780 / 639', backgroundImage: 'url(/assets/blog/portfolio-chatbot-cover.webp)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }} role="img" aria-label="Portfolio chatbot" />
        </div>
      </div>
    </div>
  </div>
  <div data-id="post-body" data-name="Post body" style={{ position: 'relative', flex: '0 0 auto', order: '2', display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center', padding: '56px 20px 0px 20px' }}>
    <div data-id="post-body-in" data-name="Column" style={{ position: 'relative', flex: '0 0 auto', order: '0', display: 'flex', flexDirection: 'column', width: '100%', maxWidth: '600px', gap: '16px' }}>
      <p data-id="p1" data-name="Body" style={{ position: 'relative', flex: '0 0 auto', order: '0', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#2A2E33', fontSize: '18px', lineHeight: '1.6' }}>My goal was to create an interactive portfolio chatbot, providing a new way for people to engage with my portfolio. To try it out, click on the robot face at the bottom right.</p>
      <p data-id="p2" data-name="Body" style={{ position: 'relative', flex: '0 0 auto', order: '1', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#2A2E33', fontSize: '18px', lineHeight: '1.6' }}>This was built using a vector database and the OpenAI API for the backend, with Streamlit for the frontend. Although I learned much of this from a tutorial, I took the time to understand the Python code and customized the frontend to a new chat interface, which I deployed on my website. In addition, I engineered the prompts to generate improved responses.</p>
      <p data-id="p3" data-name="Body" style={{ position: 'relative', flex: '0 0 auto', order: '2', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#2A2E33', fontSize: '18px', lineHeight: '1.6' }}>Streamlit, the frontend, is an intuitive Python framework that simplifies the creation of single-page applications. Langchain is a library that facilitates app development using large language models (LLMs), like ChatGPT, GPT-3, and GPT-4. Besides simplifying the process, Langchain also provides tools for vectorizing data, enabling GPT-3 to process large volumes of information which it then organizes and stores in a vector database. Moreover, Langchain allows you to create agents, which are programs capable of executing code snippets, such as API requests, in response to specific prompts.</p>
      <p data-id="p4" data-name="Body" style={{ position: 'relative', flex: '0 0 auto', order: '3', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#2A2E33', fontSize: '18px', lineHeight: '1.6' }}>In the past, for a voice-activated bot to execute a command like "set a 10-minute timer," it had to be hard-coded to listen for those exact words. However, with agents, bots can understand more abstract instructions. For example, if you say, "I need to take the lasagna out of the oven in ten minutes," the bot will still set a 10-minute timer using the agent feature.</p>
      <p data-id="p5" data-name="Body" style={{ position: 'relative', flex: '0 0 auto', order: '4', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#2A2E33', fontSize: '18px', lineHeight: '1.6' }}>Vector databases are an exciting piece of technology. They power features like search recommendations on platforms like Amazon, and allow chatbots to sift through extensive data to provide a response. You could think of vector databases as a book for a robot. Usually, when you ask ChatGPT a question, your prompt can't be too long due to a character limit. Vector databases help overcome this limitation by storing information as vectors, across multiple dimensions. For instance, the word "dog" will have a closer distance to "cat" than "car." So, when you enter a prompt, the program scans the database looking for words closest to the provided prompt, retrieves the most relevant paragraph chunks, and includes those chunks in the prompt sent to OpenAI's GPT-3 LLM.</p>
      <p data-id="p6" data-name="Body" style={{ position: 'relative', flex: '0 0 auto', order: '5', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#2A2E33', fontSize: '18px', lineHeight: '1.6' }}>For this bot, I extracted all the text and linked pages, and also spent a few hours writing to fill the bot with sufficient content. Next, I plan to add a Langchain agent that identifies questions my bot cannot answer, which will help me determine what to add to my vector database. The way this will work is by setting the bot to record the prompt prior to an answer along the lines of "I don't know." The responses will need to be stored in a database, possibly SQL, which I'm still learning to program. Once stored, I'll create another Streamlit app to display these responses.</p>
      <p data-id="p7" data-name="Body" style={{ position: 'relative', flex: '0 0 auto', order: '6', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#2A2E33', fontSize: '18px', lineHeight: '1.6' }}>I also plan to add this explanation to the bot, so if anyone inquires about the bot's creation, it can either provide a link to this page or give a direct answer. Recently, I gained access to the GPT-4 API, so I'll be updating the bot with that LLM.</p>
      <p data-id="p8" data-name="Body" style={{ position: 'relative', flex: '0 0 auto', order: '7', fontFamily: 'Work Sans, -apple-system, BlinkMacSystemFont, sans-serif', color: '#2A2E33', fontSize: '18px', lineHeight: '1.6' }}>One challenge I encountered was that the GitHub repo contains my keys to the OpenAI API and Pinecone API, so I haven't been able to publicly post it. Fortunately, I discovered that Streamlit provides a secure place to store keys, which can be safely injected into a public repo without exposure. This is something I'll need to set up before I can publish and share my project.</p>
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
