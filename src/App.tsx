import { Badge } from '@astryxdesign/core/Badge'
import { Button } from '@astryxdesign/core/Button'
import { Card } from '@astryxdesign/core/Card'
import { Divider } from '@astryxdesign/core/Divider'
import { Grid } from '@astryxdesign/core/Grid'
import { Stack } from '@astryxdesign/core/Stack'
import { Text } from '@astryxdesign/core/Text'
import { Theme } from '@astryxdesign/core/theme'
import {
  Blocks,
  Bot,
  Compass,
  GraduationCap,
  HandHelping,
  Layers3,
  Mail,
  MapPinned,
  Radar,
  Sparkles,
  Workflow,
} from 'lucide-react'
import './App.css'
import { portfolioTheme } from './theme'

const featuredProjects = [
  {
    id: 'dibslist',
    name: 'Dibslist',
    badge: 'Object-aware checkout',
    detail: '2026 concept',
    description:
      'A marketplace thesis built around latent supply: receipts become inventory, and checkout becomes the moment local alternatives appear.',
    href: '#dibslist',
    kind: 'dibslist',
  },
  {
    id: 'reef',
    name: 'Reef',
    badge: 'macOS utility',
    detail: 'Private repo',
    description:
      'A focused desktop product for people who live in windows all day and want app switching to feel instant, physical, and dependable.',
    href: '#reef',
    kind: 'reef',
  },
  {
    id: 'metabob',
    name: 'Metabob',
    badge: 'AI developer tool',
    detail: 'Previously at',
    description:
      'Generative AI for debugging and refactoring code, where the real design work was making complex analysis feel calm and actionable.',
    href: 'https://metabob.com',
    kind: 'metabob',
  },
] as const

const heroFacts = [
  '7 years in product design',
  '0-1 product work',
  'Self-driving cars, IOT, social, and AI',
  'Former UX instructor for middle and high school students',
] as const

const dibslistHighlights = [
  'Shape the portfolio story around a new market category, not just a feature set.',
  'Turn a dense systems idea into a checkout experience people can understand in seconds.',
  'Bridge product strategy, extension UX, and the supply-side inventory story.',
] as const

const reefHighlights = [
  'Bind applications to number keys and switch through windows with an Alt-Tab-like rhythm.',
  'Support profiles, browser-profile awareness, instant switching, and keyboard-first control.',
  'Package a power-user idea in a way that still feels lightweight and obvious on day one.',
] as const

const processPoints = [
  {
    title: 'Strategy that ships',
    body:
      'I like early-stage products where the design work has to clarify what the product is, not just what it looks like.',
    icon: <Compass size={16} strokeWidth={2} />,
  },
  {
    title: 'Systems over screens',
    body:
      'My best work usually comes from turning messy product logic into reusable flows, patterns, and decision points.',
    icon: <Workflow size={16} strokeWidth={2} />,
  },
  {
    title: 'Cross-functional by default',
    body:
      'I enjoy talking to users, shaping roadmaps with founders, and staying close to engineering while the thing becomes real.',
    icon: <Layers3 size={16} strokeWidth={2} />,
  },
  {
    title: 'Teacher brain',
    body:
      'I led UX design instruction for younger students, which made me better at pacing, explaining, and creating confidence on teams.',
    icon: <GraduationCap size={16} strokeWidth={2} />,
  },
] as const

const testimonials = [
  {
    name: 'Massi Genta',
    role: 'Founder, Metabob',
    image: '/images/massi.jpeg',
    quote:
      'Ted created designs that stayed clean, simple, and stylish while matching the product focus. He brought steady curiosity, creativity, and a great attitude for teamwork.',
    href: 'https://www.linkedin.com/in/massimiliano-g-b58965a5/',
  },
  {
    name: 'Shanni Liu',
    role: 'Senior Product Manager',
    image: '/images/shanni.jpeg',
    quote:
      'He combined thoughtful curriculum design with unusually strong student engagement. People felt comfortable, capable, and excited to participate in the work.',
    href: 'https://www.linkedin.com/in/shanniedu/',
  },
] as const

function App() {
  return (
    <Theme theme={portfolioTheme} mode="light">
      <div className="page-shell">
        <header className="topbar">
          <div className="section-shell topbar-inner">
            <a className="brand-link" href="#hero">
              <span className="brand-mark" />
              <span>Ted Dessert</span>
            </a>
            <nav className="topnav" aria-label="Primary">
              <a href="#work">Work</a>
              <a href="#dibslist">Dibslist</a>
              <a href="#reef">Reef</a>
              <a href="#about">About</a>
              <a href="#contact">Contact</a>
            </nav>
          </div>
        </header>

        <main>
          <section className="hero-section" id="hero">
            <div className="section-shell hero-layout">
              <Stack gap={3} className="hero-copy">
                <Badge
                  label="Ted Dessert, aka Donji"
                  variant="teal"
                  icon={<Sparkles size={12} strokeWidth={2} />}
                />
                <Text type="display-1" as="h1" className="hero-title">
                  Product designer for ambitious software with weird edges and real constraints.
                </Text>
                <Text type="large" as="p" color="secondary" className="hero-summary">
                  I have spent the last seven years helping new products become legible, lovable,
                  and ready to ship. My background spans self-driving cars, IOT, social products,
                  AI, and teaching UX design from scratch.
                </Text>

                <div className="hero-actions">
                  <Button
                    label="See selected work"
                    href="#work"
                    variant="primary"
                    icon={<Blocks size={16} strokeWidth={2} />}
                  />
                  <Button
                    label="Email Ted"
                    href="mailto:theodoreyd@gmail.com"
                    variant="secondary"
                    icon={<Mail size={16} strokeWidth={2} />}
                  />
                </div>

                <div className="hero-facts" aria-label="Ted Dessert experience highlights">
                  {heroFacts.map(fact => (
                    <span key={fact} className="hero-fact">
                      {fact}
                    </span>
                  ))}
                </div>
              </Stack>

              <div className="hero-stage">
                <div className="hero-stage-visual">
                  <div className="hero-stage-surface">
                    <div className="hero-stage-pillrow">
                      <span>Metabob</span>
                      <span>Kickback</span>
                      <span>Artisense</span>
                    </div>
                    <div className="hero-stage-grid">
                      <div className="hero-stage-metric">
                        <strong>0-1</strong>
                        <span>Products shaped through strategy, flows, and close engineering work.</span>
                      </div>
                      <div className="hero-stage-track">
                        <div className="track-row">
                          <span>AI tools</span>
                          <strong>Metabob</strong>
                        </div>
                        <div className="track-row">
                          <span>Object systems</span>
                          <strong>Dibslist</strong>
                        </div>
                        <div className="track-row">
                          <span>Desktop utility</span>
                          <strong>Reef</strong>
                        </div>
                      </div>
                    </div>
                  </div>
                  <img
                    className="hero-hand"
                    src="/images/hero-hand-sign.png"
                    alt=""
                    aria-hidden="true"
                  />
                </div>

                <div className="hero-stage-panel">
                  <div className="eyebrow-row">
                    <span className="eyebrow">Current focus</span>
                    <span className="eyebrow-detail">teddessert.com refresh</span>
                  </div>
                  <Text type="display-3" as="h2" className="panel-title">
                    Clear stories for products that are still becoming themselves.
                  </Text>
                  <div className="panel-list">
                    <div className="panel-list-item">
                      <Bot size={18} strokeWidth={2} />
                      <div>
                        <strong>Dibslist</strong>
                        <span>Object-aware checkout for the internet</span>
                      </div>
                    </div>
                    <div className="panel-list-item">
                      <Radar size={18} strokeWidth={2} />
                      <div>
                        <strong>Reef</strong>
                        <span>The macOS window manager that gives every app its own Alt-Tab</span>
                      </div>
                    </div>
                    <div className="panel-list-item">
                      <HandHelping size={18} strokeWidth={2} />
                      <div>
                        <strong>How I work</strong>
                        <span>Research, systems thinking, product strategy, and close dev pairing</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="section-band" id="work">
            <div className="section-shell">
              <div className="section-heading">
                <Text type="label" as="p" className="section-kicker">
                  Selected work
                </Text>
                <Text type="display-3" as="h2" className="section-title">
                  A tighter set of projects, each with a different kind of product story.
                </Text>
              </div>

              <Grid columns={{ minWidth: 290, max: 3 }} gap={3}>
                {featuredProjects.map(project => (
                  <Card key={project.id} padding={0} minHeight={430}>
                    <article className="project-card">
                      <div className={`project-media project-media-${project.kind}`}>
                        {project.kind === 'dibslist' ? (
                          <div className="project-media-dibslist">
                            <div className="mini-browser">
                              <span />
                              <span />
                              <span />
                            </div>
                            <div className="mini-product-card">
                              <div className="mini-product-thumb" />
                              <div className="mini-product-copy">
                                <span>Standing desk lamp</span>
                                <small>Amazon product page</small>
                              </div>
                            </div>
                            <div className="mini-offers">
                              <div className="mini-offer">
                                <strong>3 local matches</strong>
                                <small>Borrow, buy used, or message owner</small>
                              </div>
                              <div className="mini-offer muted">
                                <span>Receipt import</span>
                                <span>Private inventory</span>
                                <span>Checkout check</span>
                              </div>
                            </div>
                          </div>
                        ) : null}

                        {project.kind === 'reef' ? (
                          <img
                            src="/images/reef-banner.jpg"
                            alt="Reef product banner"
                            className="project-image"
                          />
                        ) : null}

                        {project.kind === 'metabob' ? (
                          <div className="project-media-metabob">
                            <div className="code-line code-line-long" />
                            <div className="code-line code-line-mid" />
                            <div className="code-line code-line-short" />
                            <div className="code-note">
                              <span>AI debugging</span>
                              <small>Explain, refactor, fix</small>
                            </div>
                          </div>
                        ) : null}
                      </div>

                      <div className="project-body">
                        <div className="project-meta">
                          <Badge label={project.badge} variant="neutral" />
                          <Text type="supporting" as="p">
                            {project.detail}
                          </Text>
                        </div>
                        <Text type="large" as="h3" weight="semibold">
                          {project.name}
                        </Text>
                        <Text type="body" as="p" color="secondary">
                          {project.description}
                        </Text>
                        <a className="inline-link" href={project.href}>
                          Go deeper
                        </a>
                      </div>
                    </article>
                  </Card>
                ))}
              </Grid>
            </div>
          </section>

          <section className="spotlight-section" id="dibslist">
            <div className="section-shell spotlight-grid">
              <div className="spotlight-copy">
                <Badge
                  label="Dibslist"
                  variant="green"
                  icon={<MapPinned size={12} strokeWidth={2} />}
                />
                <Text type="display-2" as="h2" className="spotlight-title">
                  Before you buy new, check if someone nearby already has it.
                </Text>
                <Text type="large" as="p" color="secondary">
                  Dibslist is an object-aware checkout layer for the internet. The challenge is not
                  only making the flow look good - it is making a new market behavior feel
                  trustworthy, local, and easy to understand fast.
                </Text>

                <div className="spotlight-points">
                  {dibslistHighlights.map(point => (
                    <div key={point} className="spotlight-point">
                      <span className="spotlight-point-mark" />
                      <Text type="body" as="p">
                        {point}
                      </Text>
                    </div>
                  ))}
                </div>

                <div className="spotlight-actions">
                  <Button
                    label="Open dibslist.org"
                    href="https://dibslist.org/"
                    target="_blank"
                    rel="noreferrer"
                    variant="primary"
                  />
                  <Button
                    label="Open app waitlist"
                    href="https://dibslist.app"
                    target="_blank"
                    rel="noreferrer"
                    variant="secondary"
                  />
                </div>
              </div>

              <div className="spotlight-visual">
                <div className="dibslist-mock">
                  <div className="dibslist-mock-top">
                    <span className="mock-label">amazon.com</span>
                    <span className="mock-label active">dibslist extension</span>
                  </div>

                  <div className="dibslist-mock-grid">
                    <div className="mock-product">
                      <div className="mock-thumbnail" />
                      <div className="mock-copy">
                        <strong>Desk lamp</strong>
                        <span>Most of what we buy already exists nearby.</span>
                        <div className="mock-pills">
                          <Badge label="Receipt import" variant="neutral" />
                          <Badge label="Inventory graph" variant="teal" />
                        </div>
                      </div>
                    </div>

                    <div className="mock-offers-panel">
                      <div className="mock-offers-header">
                        <strong>3 local alternatives</strong>
                        <small>within one mile</small>
                      </div>
                      <div className="mock-offers-list">
                        <div className="mock-offer-row">
                          <span>Borrow from nearby owner</span>
                          <small>Available tonight</small>
                        </div>
                        <div className="mock-offer-row">
                          <span>Buy used</span>
                          <small>68% lower than new</small>
                        </div>
                        <div className="mock-offer-row">
                          <span>Make offer</span>
                          <small>Private message flow</small>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="section-band reef-band" id="reef">
            <div className="section-shell spotlight-grid reef-grid">
              <div className="reef-media">
                <img src="/images/reef-banner.jpg" alt="Reef banner" className="reef-image" />
                <div className="reef-note reef-note-top">Profiles for different ways of working</div>
                <div className="reef-note reef-note-bottom">
                  Fast enough to disappear into muscle memory
                </div>
              </div>

              <div className="spotlight-copy">
                <Badge
                  label="Reef"
                  variant="purple"
                  icon={<Workflow size={12} strokeWidth={2} />}
                />
                <Text type="display-2" as="h2" className="spotlight-title">
                  A macOS utility that gives every app its own Alt-Tab.
                </Text>
                <Text type="large" as="p" color="secondary">
                  Reef is a sharp little product: keyboard-first, power-user friendly, and full of
                  nuanced states around bindings, profiles, browser windows, and instant switching.
                </Text>

                <div className="spotlight-points">
                  {reefHighlights.map(point => (
                    <div key={point} className="spotlight-point">
                      <span className="spotlight-point-mark" />
                      <Text type="body" as="p">
                        {point}
                      </Text>
                    </div>
                  ))}
                </div>

                <div className="spotlight-actions">
                  <Button
                    label="Visit getreef.app"
                    href="https://getreef.app"
                    target="_blank"
                    rel="noreferrer"
                    variant="primary"
                  />
                  <Button
                    label="View GitHub repo"
                    href="https://github.com/modestapproach/Reef"
                    target="_blank"
                    rel="noreferrer"
                    variant="secondary"
                  />
                </div>
              </div>
            </div>
          </section>

          <section className="section-band" id="about">
            <div className="section-shell about-grid">
              <div className="about-copy">
                <Text type="label" as="p" className="section-kicker">
                  About
                </Text>
                <Text type="display-3" as="h2" className="section-title">
                  I like making new products feel grounded before the team loses momentum.
                </Text>
                <Text type="large" as="p" color="secondary">
                  I love creating products from 0 to 1. That has shown up again and again in my
                  work: talking to users, mapping the real constraints, and then turning all of
                  that into interfaces developers can build and people can trust.
                </Text>
                <Text type="body" as="p" color="secondary">
                  Previously at Metabob, Kickback, and Artisense. I have also taught UX design to
                  younger students, helping them take an app idea from blank Figma file to working
                  concept.
                </Text>
              </div>

              <div className="process-panel">
                {processPoints.map(point => (
                  <div key={point.title} className="process-row">
                    <div className="process-icon">{point.icon}</div>
                    <div>
                      <Text type="large" as="h3" weight="semibold">
                        {point.title}
                      </Text>
                      <Text type="body" as="p" color="secondary">
                        {point.body}
                      </Text>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="section-band testimonials-band">
            <div className="section-shell">
              <div className="section-heading">
                <Text type="label" as="p" className="section-kicker">
                  Testimonials
                </Text>
                <Text type="display-3" as="h2" className="section-title">
                  People tend to describe the same mix: curiosity, calm, and follow-through.
                </Text>
              </div>

              <Grid columns={{ minWidth: 320, max: 2 }} gap={3}>
                {testimonials.map(testimonial => (
                  <Card key={testimonial.name} minHeight={280}>
                    <article className="testimonial-card">
                      <div className="testimonial-head">
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="testimonial-image"
                        />
                        <div>
                          <Text type="large" as="h3" weight="semibold">
                            {testimonial.name}
                          </Text>
                          <Text type="supporting" as="p">
                            {testimonial.role}
                          </Text>
                        </div>
                      </div>
                      <Divider />
                      <Text type="body" as="p" color="secondary" className="testimonial-quote">
                        {testimonial.quote}
                      </Text>
                      <a className="inline-link" href={testimonial.href} target="_blank" rel="noreferrer">
                        View profile
                      </a>
                    </article>
                  </Card>
                ))}
              </Grid>
            </div>
          </section>

          <section className="contact-band" id="contact">
            <div className="section-shell contact-grid">
              <div>
                <Text type="label" as="p" className="section-kicker contact-kicker">
                  General enquiries
                </Text>
                <Text type="display-2" as="h2" className="contact-title">
                  Let&apos;s make the next product feel inevitable.
                </Text>
                <div className="contact-details">
                  <a href="mailto:theodoreyd@gmail.com">theodoreyd@gmail.com</a>
                  <a href="tel:+13104873540">310-487-3540</a>
                </div>
              </div>

              <div className="contact-actions-panel">
                <Button
                  label="LinkedIn"
                  href="https://www.linkedin.com/in/donji"
                  target="_blank"
                  rel="noreferrer"
                  variant="primary"
                />
                <Button
                  label="Twitter"
                  href="https://www.twitter.com/DonjiKong"
                  target="_blank"
                  rel="noreferrer"
                  variant="secondary"
                />
                <Button
                  label="YouTube"
                  href="https://www.youtube.com/@DonjiKong"
                  target="_blank"
                  rel="noreferrer"
                  variant="ghost"
                />
              </div>
            </div>
          </section>
        </main>
      </div>
    </Theme>
  )
}

export default App
