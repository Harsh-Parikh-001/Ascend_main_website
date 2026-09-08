import { useEffect, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { AnimatePresence, motion } from 'motion/react'
import logoColor from './assets/brand/logo-color.png'
import logoMark from './assets/brand/logo-mark.png'
import portAerial from './assets/brand/port-aerial.jpg'
import truckImage from './assets/brand/ascend-truck.jpg'
import { ContactForm } from './components/ContactForm'
import { Header } from './components/Header'
import { ArrowIcon, RouteArrow } from './components/Icons'
import { capabilities, industries, navItems, processSteps, promises } from './content'
import './App.css'

gsap.registerPlugin(ScrollTrigger, useGSAP)

function App() {
  const appRef = useRef<HTMLDivElement>(null)
  const industryRailRef = useRef<HTMLDivElement>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [navSolid, setNavSolid] = useState(false)
  const [activeCapability, setActiveCapability] = useState(0)

  useEffect(() => {
    const onScroll = () => setNavSolid(window.scrollY > 32)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  useGSAP(
    () => {
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (reducedMotion) return

      const intro = gsap.timeline({ defaults: { ease: 'power3.out' } })
      intro
        .from('.site-header', { y: -28, opacity: 0, duration: 0.8, clearProps: 'transform,opacity' })
        .from('[data-hero-reveal]', { yPercent: 110, duration: 1.05, stagger: 0.12 }, '-=0.42')
        .from('.hero-copy', { y: 24, opacity: 0, duration: 0.75 }, '-=0.48')
        .from('.hero-actions', { y: 18, opacity: 0, duration: 0.65 }, '-=0.45')
        .from('.hero-visual', { clipPath: 'inset(100% 0 0 0)', duration: 1.2 }, '-=1.12')
        .fromTo('.hero-route-path', { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1.25, ease: 'power2.inOut' }, '-=0.72')
        .from('.hero-node', { scale: 0, transformOrigin: 'center', duration: 0.35, stagger: 0.1 }, '-=0.25')

      gsap.to('.hero-image', {
        yPercent: 10,
        ease: 'none',
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
      })

      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((element) => {
        gsap.from(element, {
          y: 54,
          opacity: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: element, start: 'top 86%', once: true },
        })
      })

      gsap.utils.toArray<SVGPathElement>('.network-route').forEach((route, index) => {
        gsap.fromTo(route, { strokeDashoffset: 1 }, {
          strokeDashoffset: 0,
          duration: 1.4,
          delay: index * 0.12,
          ease: 'power2.inOut',
          scrollTrigger: { trigger: '#network', start: 'top 65%', once: true },
        })
      })

      const matchMedia = gsap.matchMedia()
      matchMedia.add('(min-width: 768px)', () => {
        const track = document.querySelector<HTMLElement>('.process-track')
        if (!track) return

        const distance = () => Math.max(0, track.scrollWidth - window.innerWidth + window.innerWidth * 0.12)
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: '#process',
            start: 'top top',
            end: () => `+=${distance() + window.innerHeight * 2.2}`,
            scrub: 0.7,
            pin: '.process-sticky',
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        })

        timeline
          .to('.process-progress-fill', { scaleX: 1, ease: 'none' }, 0)
          .to(track, { x: () => -distance(), ease: 'none' }, 0)
      })

      return () => matchMedia.revert()
    },
    { scope: appRef },
  )

  const scrollIndustries = (direction: 1 | -1) => {
    industryRailRef.current?.scrollBy({ left: direction * 440, behavior: 'smooth' })
  }

  return (
    <div className="site" ref={appRef}>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Header
        menuOpen={menuOpen}
        navSolid={navSolid}
        onToggleMenu={() => setMenuOpen((open) => !open)}
        onCloseMenu={() => setMenuOpen(false)}
      />

      <main id="main-content">
        <section className="hero" id="top">
          <div className="hero-grid" aria-hidden="true" />
          <div className="hero-content">
            <p className="hero-eyebrow">India <span /> China <span /> The World</p>
            <h1>
              <span className="text-mask"><span data-hero-reveal>India’s bridge</span></span>
              <span className="text-mask"><span data-hero-reveal>to <em>global trade.</em></span></span>
            </h1>
            <p className="hero-copy">Ascend connects Indian enterprises with verified manufacturers across China—managing the path from requirement to delivery.</p>
            <div className="hero-actions">
              <a className="button button--yellow" href="#contact"><span>Start a sourcing project</span><ArrowIcon /></a>
              <a className="text-link text-link--light" href="#process"><span>Explore the trade journey</span><ArrowIcon /></a>
            </div>
          </div>

          <div className="hero-visual">
            <img className="hero-image" src={portAerial} alt="Aerial view of a shipping container terminal" />
            <div className="hero-visual-shade" />
            <div className="hero-coordinate hero-coordinate--top">IN / 26.7271° N</div>
            <div className="hero-coordinate hero-coordinate--bottom">CN / 31.2304° N</div>
          </div>

          <svg className="hero-route" viewBox="0 0 1000 390" preserveAspectRatio="none" aria-hidden="true">
            <path className="hero-route-ghost" pathLength="1" d="M0 300 C220 290 205 72 452 104 S715 390 1000 92" />
            <path className="hero-route-path" pathLength="1" d="M0 300 C220 290 205 72 452 104 S715 390 1000 92" />
            <circle className="hero-node" cx="448" cy="104" r="6" />
            <circle className="hero-node" cx="758" cy="283" r="6" />
          </svg>

          <div className="hero-footer">
            <span>Scroll to follow the route</span><span className="scroll-line" /><span>01 — 08</span>
          </div>
        </section>

        <section className="manifesto" aria-labelledby="manifesto-title">
          <div className="section-kicker" data-reveal><span>01</span> Who we are</div>
          <div className="manifesto-heading" data-reveal>
            <h2 id="manifesto-title">A clearer path through <span>global trade.</span></h2>
            <img src={logoMark} alt="" aria-hidden="true" />
          </div>
          <div className="manifesto-copy" data-reveal>
            <p>Ascend Trade Commercial was founded on a simple belief: Indian businesses deserve a partner who understands both sides of the border.</p>
            <p>We connect Indian enterprises with verified manufacturers across China, handling every step from supplier discovery to last-mile delivery. And when the time comes for Indian brands to reach global customers, we open that door too.</p>
          </div>
        </section>

        <section className="metrics" aria-label="Ascend at a glance">
          <div className="metrics-intro" data-reveal>
            <p className="micro-label">By the numbers</p>
            <p>One connected pathway. Built to move with your ambition.</p>
          </div>
          <div className="metric-grid">
            {[
              ['500+', 'Verified suppliers'],
              ['3', 'Core service pillars'],
              ['12', 'Step sourcing process'],
              ['2', 'Trade directions'],
            ].map(([value, label]) => (
              <div className="metric" key={label} data-reveal><strong>{value}</strong><span>{label}</span></div>
            ))}
          </div>
        </section>

        <section className="capabilities section-dark" id="capabilities" aria-labelledby="capabilities-title">
          <div className="section-heading section-heading--light" data-reveal>
            <div className="section-kicker"><span>02</span> Capabilities</div>
            <h2 id="capabilities-title">Complexity, managed.</h2>
            <p>Three connected service pillars bring the full sourcing pathway under one accountable partner.</p>
          </div>

          <div className="capability-panels" data-reveal>
            {capabilities.map((capability, index) => {
              const active = activeCapability === index
              return (
                <motion.button
                  type="button"
                  key={capability.number}
                  className={`capability-panel ${active ? 'capability-panel--active' : ''}`}
                  onMouseEnter={() => setActiveCapability(index)}
                  onFocus={() => setActiveCapability(index)}
                  onClick={() => setActiveCapability(index)}
                  layout
                  transition={{ layout: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }}
                  aria-pressed={active}
                >
                  <span className="capability-number">{capability.number}</span>
                  <span className="capability-title">{capability.title}</span>
                  <AnimatePresence initial={false}>
                    {active && (
                      <motion.span className="capability-content" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} transition={{ duration: 0.35, delay: 0.12 }}>
                        <span className="capability-label">{capability.label}</span>
                        <span className="capability-copy">{capability.copy}</span>
                        <span className="capability-list">{capability.points.map((point) => <span key={point}>{point}</span>)}</span>
                      </motion.span>
                    )}
                  </AnimatePresence>
                  <span className="capability-icon"><ArrowIcon /></span>
                </motion.button>
              )
            })}
          </div>
        </section>

        <section className="process" id="process" aria-labelledby="process-title">
          <div className="process-sticky">
            <div className="process-header">
              <div>
                <div className="section-kicker"><span>03</span> The trade journey</div>
                <h2 id="process-title">The Ascend Network</h2>
              </div>
              <p>Requirement to delivery.<br />One visible route.</p>
            </div>
            <div className="process-progress" aria-hidden="true"><span className="process-progress-fill" /></div>
            <div className="process-track">
              {processSteps.map((step, index) => (
                <article className="process-card" key={step.number}>
                  <div className="process-card-top"><span>{step.number}</span><RouteArrow /></div>
                  <div className={`process-visual process-visual--${index + 1}`} aria-hidden="true">
                    <span className="process-orbit" /><span className="process-core" /><span className="process-grid-lines" />
                  </div>
                  <h3>{step.title}</h3>
                  <p>{step.copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="vision" aria-labelledby="vision-title">
          <div className="vision-image" data-reveal>
            <img src={truckImage} alt="Ascend branded freight truck moving along a highway" />
            <span>Factory floor</span><span>Warehouse door</span>
          </div>
          <div className="vision-content" data-reveal>
            <div className="section-kicker"><span>04</span> Our vision</div>
            <h2 id="vision-title">Two directions.<br /><em>One mission.</em></h2>
            <p>We start where India stands: connecting Indian buyers to the manufacturing strength of China, and helping Indian brands carry their story to markets across South Asia, the Middle East, Europe, and beyond.</p>
            <p className="vision-statement">We bring the world to India today, and carry India to the world tomorrow.</p>
            <p className="vision-note">This isn’t just trade facilitation.<br />It’s nation-building.</p>
          </div>
        </section>

        <section className="industries" id="industries" aria-labelledby="industries-title">
          <div className="section-heading" data-reveal>
            <div className="section-kicker"><span>05</span> Industries</div>
            <h2 id="industries-title">Built around what business needs next.</h2>
            <div className="rail-controls" aria-label="Industry carousel controls">
              <button type="button" onClick={() => scrollIndustries(-1)} aria-label="Previous industries"><ArrowIcon /></button>
              <button type="button" onClick={() => scrollIndustries(1)} aria-label="Next industries"><ArrowIcon /></button>
            </div>
          </div>

          <div className="industry-rail" ref={industryRailRef} data-reveal>
            {industries.map((industry) => (
              <motion.article className="industry-card" key={industry.name} whileHover={{ y: -8 }} transition={{ duration: 0.3 }}>
                <div className={`industry-art ${industry.tone}`}>
                  {industry.tone === 'image-port' && <img src={portAerial} alt="Shipping containers at a global port" />}
                  {industry.tone === 'image-truck' && <img src={truckImage} alt="Freight truck on a highway" />}
                  {!industry.tone.startsWith('image') && <div className="industry-diagram" aria-hidden="true"><span /><span /><span /><span /><span /></div>}
                  <span className="industry-index">{industry.index}</span>
                </div>
                <div className="industry-card-copy"><h3>{industry.name}</h3><p>{industry.copy}</p></div>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="network section-dark" id="network" aria-labelledby="network-title">
          <div className="network-copy" data-reveal>
            <div className="section-kicker"><span>06</span> Global bridge</div>
            <h2 id="network-title">A pathway of opportunity.</h2>
            <p>The route Ascend creates between businesses and global markets.</p>
            <div className="network-legend"><span><i /> Established direction</span><span><i /> Future opportunity</span></div>
          </div>

          <div className="network-map" data-reveal>
            <div className="network-grid" aria-hidden="true" />
            <svg viewBox="0 0 800 600" role="img" aria-label="Trade network connecting India, China and global markets">
              <defs>
                <filter id="route-glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="5" result="blur" />
                  <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
              </defs>
              <path className="map-land" d="M90 164l57-41 64 3 35 45 69 18 48 46-14 46-62 5-22 66-60 7-27-42-52-5-28-55-46-30zm355 27 34-53 80-31 108 27 32 56-16 50-62 7-31 48-57-9-25-50-43-20zm108 194 38-34 73 8 44 55-21 55-68 17-61-30-15-49z" />
              <path className="network-route network-route--main" pathLength="1" d="M312 350 C365 294 397 233 505 218" />
              <path className="network-route" pathLength="1" d="M312 350 C218 308 183 233 145 188" />
              <path className="network-route network-route--future" pathLength="1" d="M505 218 C618 240 661 342 628 408" />
              <path className="network-route network-route--future" pathLength="1" d="M312 350 C363 458 470 478 628 408" />
              <g className="map-pin map-pin--india"><circle cx="312" cy="350" r="10" /><circle cx="312" cy="350" r="22" /><text x="287" y="392">INDIA</text></g>
              <g className="map-pin map-pin--china"><circle cx="505" cy="218" r="10" /><circle cx="505" cy="218" r="22" /><text x="475" y="260">CHINA</text></g>
              <g className="map-pin"><circle cx="145" cy="188" r="7" /><text x="100" y="160">EUROPE</text></g>
              <g className="map-pin"><circle cx="628" cy="408" r="7" /><text x="592" y="450">WORLD</text></g>
            </svg>
            <div className="network-map-caption"><span>IN</span><RouteArrow /><span>CN</span><RouteArrow /><span>GL</span></div>
          </div>
        </section>

        <section className="promise" aria-labelledby="promise-title">
          <div className="promise-title" data-reveal>
            <div className="section-kicker"><span>07</span> The Ascend promise</div>
            <h2 id="promise-title">Confidence is built into the route.</h2>
          </div>
          <div className="promise-list">
            {promises.map((promise) => (
              <article key={promise.number} data-reveal><span>{promise.number}</span><h3>{promise.title}</h3><p>{promise.copy}</p></article>
            ))}
          </div>
        </section>

        <section className="contact" id="contact" aria-labelledby="contact-title">
          <div className="contact-intro" data-reveal>
            <div className="section-kicker"><span>08</span> Contact us</div>
            <h2 id="contact-title">Start your pathway to the right supply partner.</h2>
            <p>Tell us what you are looking to source. We’ll start with the requirement and map the right way forward.</p>

            <div className="contact-person"><span className="contact-monogram">KS</span><div><strong>Krish Sanwalka</strong><span>Founder & CEO</span></div></div>
            <div className="contact-direct">
              <a href="tel:+919242391574"><span>Call</span>+91 92423 91574</a>
              <a href="mailto:ascendtradecommercial@ascendco.in"><span>Email</span>ascendtradecommercial@ascendco.in</a>
              <p><span>Base</span>Siliguri, West Bengal, India</p>
            </div>
          </div>
          <ContactForm />
        </section>
      </main>

      <footer className="footer">
        <div className="footer-top">
          <a href="#top" className="footer-logo"><img src={logoColor} alt="Ascend Trade Commercial Pvt Ltd" /></a>
          <p>India <span>·</span> China <span>·</span> The World</p>
        </div>
        <div className="footer-grid">
          <div className="footer-statement">The route from complexity<br />to <em>confidence.</em></div>
          <div className="footer-links"><span>Navigate</span>{navItems.map((item) => <a href={item.href} key={item.href}>{item.label}</a>)}</div>
          <div className="footer-links"><span>Connect</span><a href="tel:+919242391574">+91 92423 91574</a><a href="mailto:ascendtradecommercial@ascendco.in">Email us</a><a href="https://www.ascendco.in">ascendco.in</a></div>
        </div>
        <div className="footer-bottom">
          <span>Ascend Trade Commercial Pvt Ltd</span><span>Siliguri, West Bengal, India</span><a href="#top">Back to top ↑</a>
        </div>
      </footer>
    </div>
  )
}

export default App
