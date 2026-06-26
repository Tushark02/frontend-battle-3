import { useState, useEffect, useRef } from 'react'

// ── Color tokens ──────────────────────────────────────────────
const C = {
  forsythia: '#FFC801',
  saffron:   '#FF9932',
  teal:      '#114C5A',
  noir:      '#172B36',
  arctic:    '#F1F6F4',
  mint:      '#D9E8E2',
}

// ── SVG icons ─────────────────────────────────────────────────
const Icon = ({ name, size = 20, color = 'currentColor', style = {} }) => {
  const paths = {
    'arrow-path': <path fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"/>,
    'arrow-trending-up': <path fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 0 1 5.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"/>,
    'chart-pie': <><path fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z"/><path fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z"/></>,
    'chevron-down': <path fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m19.5 8.25-7.5 7.5-7.5-7.5"/>,
    'chevron-up': <path fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m4.5 15.75 7.5-7.5 7.5 7.5"/>,
    'cog': <><path fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 0 1 1.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 0 1-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 0 1-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 0 1 .12-1.45l.773-.773a1.125 1.125 0 0 1 1.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894Z"/><path fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/></>,
    'cube': <path fill={color} d="M8.372 1.349a.75.75 0 0 0-.744 0l-4.81 2.748L8 7.131l5.182-3.034zM14 5.357L8.75 8.43v6.005l4.872-2.784A.75.75 0 0 0 14 11zm-6.75 9.078V8.43L2 5.357V11c0 .27.144.518.378.651z"/>,
    'link': <path fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"/>,
    'search': <path fill={color} d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"/>,
    'x-mark': <path fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12"/>,
  }
  const vb = name === 'cube' ? '0 0 16 16' : name === 'search' ? '0 0 20 20' : '0 0 24 24'
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox={vb} style={style}>
      {paths[name]}
    </svg>
  )
}

// ── Custom Cursor Hook ────────────────────────────────────────
function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 })
  const [hidden, setHidden] = useState(true)

  useEffect(() => {
    const handleMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY })
      if (hidden) setHidden(false)
    }
    const handleLeave = () => setHidden(true)
    
    window.addEventListener('mousemove', handleMove)
    document.addEventListener('mouseleave', handleLeave)
    return () => {
      window.removeEventListener('mousemove', handleMove)
      document.removeEventListener('mouseleave', handleLeave)
    }
  }, [hidden])

  if (hidden) return null

  return (
    <div 
      className="cursor"
      style={{
        transform: `translate3d(${position.x - 10}px, ${position.y - 10}px, 0)`,
      }}
    />
  )
}

// ── Counter Hook for Stats ───────────────────────────────────
function AnimatedCounter({ target, suffix = '', decimals = 0 }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let startTime = null
    const duration = 1600 // Animation duration in milliseconds

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      
      // Easing function outQuad
      const easeProgress = progress * (2 - progress)
      const currentVal = easeProgress * target

      setCount(currentVal)

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [target])

  return (
    <span>
      {count.toFixed(decimals)}
      {suffix}
    </span>
  )
}

// ── Pricing matrix ────────────────────────────────────────────
const PRICING_MATRIX = {
  tiers: [
    { id: 'starter', name: 'Starter', baseUSD: 29, features: ['5 Automations', '10k API calls/mo', 'Basic Analytics', 'Email Support'] },
    { id: 'pro',     name: 'Pro',     baseUSD: 79, features: ['Unlimited Automations', '500k API calls/mo', 'Advanced Analytics', 'Priority Support', 'Custom Integrations'] },
    { id: 'enterprise', name: 'Enterprise', baseUSD: 199, features: ['Everything in Pro', 'Unlimited API calls', 'Real-time Analytics', 'Dedicated Support', 'SLA Guarantee', 'Custom Contracts'] },
  ],
  currencies: {
    USD: { symbol: '$', tariff: 1.00 },
    INR: { symbol: '₹', tariff: 83.5 },
    EUR: { symbol: '€', tariff: 0.92 },
  },
  annualDiscount: 0.80,
}

function computePrice(baseUSD, currency, isAnnual) {
  const { tariff, symbol } = PRICING_MATRIX.currencies[currency]
  const multiplier = isAnnual ? PRICING_MATRIX.annualDiscount : 1
  const raw = baseUSD * tariff * multiplier
  const rounded = currency === 'INR' ? Math.round(raw) : raw.toFixed(2)
  return { symbol, value: rounded }
}

// ── Pricing section ───────────────────────────────────────────
function PricingSection() {
  const [isAnnual, setIsAnnual] = useState(false)
  const [currency, setCurrency] = useState('USD')
  const priceRefs = useRef({})

  useEffect(() => {
    PRICING_MATRIX.tiers.forEach(tier => {
      const ref = priceRefs.current[tier.id]
      if (ref) {
        const { symbol, value } = computePrice(tier.baseUSD, currency, isAnnual)
        ref.textContent = `${symbol}${value}`
      }
    })
  }, [isAnnual, currency])

  return (
    <section id="pricing" style={{ backgroundColor: C.noir, padding: '100px 24px', position: 'relative' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <p style={{ color: C.forsythia, fontFamily: 'JetBrains Mono, monospace', fontSize: 13, letterSpacing: 3, textTransform: 'uppercase', textAlign: 'center', marginBottom: 12 }}>Pricing</p>
        <h2 style={{ color: '#fff', fontFamily: 'JetBrains Mono, monospace', fontSize: 'clamp(28px,4vw,42px)', fontWeight: 700, textAlign: 'center', marginBottom: 48 }}>
          Simple, Transparent Pricing
        </h2>

        {/* Controls */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 24, marginBottom: 48, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, backgroundColor: 'rgba(17, 76, 90, 0.6)', backdropFilter: 'blur(8px)', borderRadius: 40, padding: '6px 16px', border: '1px solid rgba(255,255,255,0.05)' }}>
            <span style={{ color: !isAnnual ? C.forsythia : C.mint, fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 600, cursor: 'pointer', transition: 'color 180ms ease-out' }}
              onClick={() => setIsAnnual(false)}>Monthly</span>
            <div onClick={() => setIsAnnual(v => !v)}
              style={{ width: 44, height: 24, backgroundColor: isAnnual ? C.forsythia : '#ffffff30', borderRadius: 12, cursor: 'pointer', position: 'relative', transition: 'background 200ms ease-out' }}>
              <div style={{ width: 18, height: 18, backgroundColor: '#fff', borderRadius: '50%', position: 'absolute', top: 3, left: isAnnual ? 23 : 3, transition: 'left 200ms ease-out' }} />
            </div>
            <span style={{ color: isAnnual ? C.forsythia : C.mint, fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 600, cursor: 'pointer', transition: 'color 180ms ease-out' }}
              onClick={() => setIsAnnual(true)}>Annual <span style={{ color: C.saffron, fontSize: 11 }}>-20%</span></span>
          </div>

          <div style={{ display: 'flex', gap: 8 }}>
            {Object.keys(PRICING_MATRIX.currencies).map(cur => (
              <button key={cur} onClick={() => setCurrency(cur)}
                style={{ padding: '6px 16px', borderRadius: 20, border: 'none', cursor: 'pointer', fontFamily: 'JetBrains Mono, monospace', fontSize: 13, fontWeight: 600, transition: 'all 180ms ease-out',
                  backgroundColor: currency === cur ? C.forsythia : 'rgba(255,255,255,0.08)',
                  color: currency === cur ? C.noir : C.mint }}>
                {cur}
              </button>
            ))}
          </div>
        </div>

        {/* Tier cards with Glassmorphism */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
          {PRICING_MATRIX.tiers.map((tier, i) => {
            const { symbol, value } = computePrice(tier.baseUSD, currency, isAnnual)
            return (
              <div key={tier.id}
                style={{ 
                  backgroundColor: i === 1 ? 'rgba(17, 76, 90, 0.25)' : 'rgba(255, 255, 255, 0.03)', 
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  borderRadius: 20, 
                  padding: '36px 28px',
                  border: i === 1 ? `2px solid ${C.forsythia}` : '1px solid rgba(255, 255, 255, 0.08)',
                  boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
                  position: 'relative', 
                  transition: 'transform 300ms ease-in-out, box-shadow 300ms ease-in-out' 
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-6px)'
                  e.currentTarget.style.boxShadow = i === 1 ? `0 12px 40px 0 rgba(255, 200, 1, 0.15)` : '0 12px 40px 0 rgba(0, 0, 0, 0.5)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 8px 32px 0 rgba(0, 0, 0, 0.37)'
                }}>
                {i === 1 && <div style={{ position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%)', backgroundColor: C.forsythia, color: C.noir, fontSize: 11, fontWeight: 700, padding: '4px 16px', borderRadius: 20, fontFamily: 'JetBrains Mono, monospace', letterSpacing: 1 }}>MOST POPULAR</div>}
                <p style={{ color: C.mint, fontFamily: 'Inter, sans-serif', fontSize: 13, marginBottom: 8 }}>{tier.name}</p>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 4 }}>
                  <span ref={el => priceRefs.current[tier.id] = el}
                    style={{ color: '#fff', fontFamily: 'JetBrains Mono, monospace', fontSize: 36, fontWeight: 700 }}>
                    {symbol}{value}
                  </span>
                </div>
                <p style={{ color: C.mint, fontSize: 12, fontFamily: 'Inter, sans-serif', marginBottom: 28 }}>per month{isAnnual ? ', billed annually' : ''}</p>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px', display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {tier.features.map((f, j) => (
                    <li key={j} style={{ display: 'flex', alignItems: 'center', gap: 10, color: C.arctic, fontFamily: 'Inter, sans-serif', fontSize: 14 }}>
                      <span style={{ color: C.forsythia, fontSize: 16 }}>✓</span> {f}
                    </li>
                  ))}
                </ul>
                <button style={{ width: '100%', padding: '14px', borderRadius: 12, border: 'none', cursor: 'pointer', fontFamily: 'JetBrains Mono, monospace', fontSize: 14, fontWeight: 700, transition: 'all 180ms ease-out',
                  backgroundColor: i === 1 ? C.forsythia : 'rgba(255,255,255,0.1)',
                  color: i === 1 ? C.noir : '#fff' }}
                  onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
                  onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
                  Get Started
                </button>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ── Bento Grid / Accordion features ───────────────────────────
const FEATURES = [
  { icon: 'arrow-trending-up', title: 'Predictive Analytics', desc: 'ML models that forecast pipeline trends and surface revenue risks before they become problems.', span: 'col' },
  { icon: 'arrow-path',        title: 'Workflow Automation', desc: 'Connect any tool, trigger any action. Build complex multi-step automations with zero code.', span: 'row' },
  { icon: 'chart-pie',         title: 'Unified Data Layer',  desc: 'One schema to rule all your data sources. Query across warehouses, CRMs, and APIs simultaneously.', span: '' },
  { icon: 'cog',               title: 'AI Orchestration',    desc: 'Deploy, monitor, and scale LLM agents across your stack with full observability built in.', span: '' },
  { icon: 'cube',              title: '3D Data Modeling',    desc: 'Visualize relationships between entities in interactive 3D space. Spot patterns invisible in flat tables.', span: '' },
  { icon: 'link',              title: 'API Mesh',            desc: 'Auto-generated GraphQL layer over every integration. One endpoint, all your data.', span: 'col' },
]

function BentoAccordion() {
  const [activeIndex, setActiveIndex] = useState(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
    const handler = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])

  if (isMobile) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {FEATURES.map((f, i) => (
          <div key={i} style={{ borderRadius: 14, overflow: 'hidden', border: `1px solid ${activeIndex === i ? C.forsythia : '#ffffff15'}`, transition: 'border-color 300ms ease-in-out' }}>
            <button onClick={() => setActiveIndex(activeIndex === i ? null : i)}
              style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 20px', backgroundColor: activeIndex === i ? C.teal : '#ffffff08', border: 'none', cursor: 'pointer', transition: 'background 300ms ease-in-out' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <Icon name={f.icon} size={20} color={activeIndex === i ? C.forsythia : C.mint} />
                <span style={{ color: '#fff', fontFamily: 'JetBrains Mono, monospace', fontSize: 15, fontWeight: 600 }}>{f.title}</span>
              </div>
              <Icon name={activeIndex === i ? 'chevron-up' : 'chevron-down'} size={18} color={C.mint} />
            </button>
            <div style={{ maxHeight: activeIndex === i ? 200 : 0, overflow: 'hidden', transition: 'max-height 350ms ease-in-out' }}>
              <p style={{ padding: '16px 20px', color: C.mint, fontFamily: 'Inter, sans-serif', fontSize: 14, lineHeight: 1.6, margin: 0 }}>{f.desc}</p>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
      {FEATURES.map((f, i) => (
        <div key={i}
          onMouseEnter={() => setActiveIndex(i)}
          onMouseLeave={() => setActiveIndex(null)}
          style={{
            gridColumn: f.span === 'col' ? 'span 1' : 'span 1',
            gridRow: f.span === 'row' ? 'span 2' : 'span 1',
            backgroundColor: activeIndex === i ? C.teal : '#ffffff08',
            border: `1px solid ${activeIndex === i ? C.forsythia : '#ffffff15'}`,
            borderRadius: 20, padding: '32px 28px', cursor: 'default',
            transition: 'background 200ms ease-out, border-color 200ms ease-out, transform 200ms ease-out',
            transform: activeIndex === i ? 'translateY(-4px)' : 'translateY(0)',
          }}>
          <div style={{ width: 48, height: 48, borderRadius: 12, backgroundColor: activeIndex === i ? C.forsythia + '25' : '#ffffff10', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20, transition: 'background 200ms ease-out' }}>
            <Icon name={f.icon} size={24} color={activeIndex === i ? C.forsythia : C.mint} />
          </div>
          <h3 style={{ color: '#fff', fontFamily: 'JetBrains Mono, monospace', fontSize: 17, fontWeight: 700, marginBottom: 12 }}>{f.title}</h3>
          <p style={{ color: C.mint, fontFamily: 'Inter, sans-serif', fontSize: 14, lineHeight: 1.65, margin: 0 }}>{f.desc}</p>
        </div>
      ))}
    </div>
  )
}

// ── Social proof ──────────────────────────────────────────────
const TESTIMONIALS = [
  { name: 'Priya Sharma', role: 'CTO, Finstack', quote: 'NeuralFlow cut our data pipeline build time from 3 weeks to 2 days. The AI orchestration layer is genuinely magic.' },
  { name: 'Marcus Webb', role: 'VP Eng, Loopback', quote: 'We replaced 4 internal tools with NeuralFlow. Our team velocity is up 60% in the first quarter.' },
  { name: 'Aiko Tanaka', role: 'Data Lead, Synthex', quote: 'The predictive analytics surfaced a churn risk we would have missed entirely. Saved us ~$200k ARR.' },
]

// ── Main App Component ────────────────────────────────────────
export default function App() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700&family=Inter:wght@400;500;600&display=swap');
        
        *, *::before, *::after { 
          box-sizing: border-box; 
          margin: 0; 
          padding: 0; 
          cursor: none; /* Hide default hardware pointer system-wide */
        }
        
        html { scroll-behavior: smooth; }
        body { background: ${C.noir}; overflow-x: hidden; }

        /* Custom Glowing Cursor Properties */
        .cursor {
          width: 20px;
          height: 20px;
          background: #FFC801;
          border-radius: 50%;
          position: fixed;
          pointer-events: none;
          z-index: 9999;
          transition: transform 0.1s ease-out;
          mix-blend-mode: difference;
          box-shadow: 0 0 20px #FFC801, 0 0 40px #FFC801;
        }

        /* Animated Mesh Gradient Keyframes */
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .animated-hero {
          background: linear-gradient(-45deg, #172B36, #114C5A, #0d1a1f, #1d3d47);
          background-size: 400% 400%;
          animation: gradientShift 15s ease infinite;
        }

        /* Hero Text Entrance Animations */
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(32px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .hero-animate { animation: fadeUp 480ms ease-out both; }
        .hero-animate-1 { animation-delay: 80ms; }
        .hero-animate-2 { animation-delay: 180ms; }
        .hero-animate-3 { animation-delay: 280ms; }

        /* Infinite Scrolling Marquee Animation */
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .ticker-wrap {
          width: 100%;
          overflow: hidden;
          background: #FFC801;
          padding: 14px 0;
          display: flex;
          white-space: nowrap;
          border-top: 1px solid rgba(0,0,0,0.1);
          border-bottom: 1px solid rgba(0,0,0,0.1);
        }
        .ticker-track {
          display: flex;
          gap: 40px;
          animation: marquee 25s linear infinite;
        }
        .ticker-item {
          font-family: 'JetBrains Mono', monospace;
          font-weight: 700;
          font-size: 14px;
          color: #172B36;
          text-transform: uppercase;
          letter-spacing: 2px;
          display: flex;
          align-items: center;
          gap: 16px;
        }

        @media (max-width: 640px) {
          .nav-links { display: none !important; }
          .hero-title { font-size: clamp(32px, 8vw, 52px) !important; }
          *, *::before, *::after { cursor: auto; } /* Restore cursor for mobile devices */
          .cursor { display: none; }
        }
      `}</style>

      {/* Render custom cursor element */}
      <CustomCursor />

      {/* ── NAVBAR ── */}
      <header style={{ position: 'fixed', top: 0, width: '100%', zIndex: 100, backgroundColor: 'rgba(23, 43, 54, 0.8)', backdropFilter: 'blur(12px)', borderBottom: `1px solid rgba(255,255,255,0.06)` }}>
        <nav style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Icon name="cube" size={22} color={C.forsythia} />
            <span style={{ color: '#fff', fontFamily: 'JetBrains Mono, monospace', fontSize: 18, fontWeight: 700 }}>NeuralFlow</span>
          </div>
          <ul className="nav-links" style={{ display: 'flex', gap: 32, listStyle: 'none' }}>
            {['Features', 'Pricing', 'Testimonials'].map(item => (
              <li key={item}>
                <a href={`#${item.toLowerCase()}`} style={{ color: C.mint, fontFamily: 'Inter, sans-serif', fontSize: 14, textDecoration: 'none', transition: 'color 150ms ease-out' }}
                  onMouseEnter={e => e.target.style.color = C.forsythia}
                  onMouseLeave={e => e.target.style.color = C.mint}>{item}</a>
              </li>
            ))}
          </ul>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button style={{ padding: '10px 22px', borderRadius: 10, border: `1px solid ${C.forsythia}`, backgroundColor: 'transparent', color: C.forsythia, fontFamily: 'JetBrains Mono, monospace', fontSize: 13, fontWeight: 600, cursor: 'none', transition: 'all 180ms ease-out' }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = C.forsythia; e.currentTarget.style.color = C.noir }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = C.forsythia }}>
              Get Started
            </button>
          </div>
        </nav>
      </header>

      <main>
        {/* ── HERO ── */}
        <header id="hero" className="animated-hero" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '120px 24px 80px', position: 'relative', overflow: 'hidden' }}>
          {/* Background overlay blending factors */}
          <div style={{ position: 'absolute', width: 600, height: 600, borderRadius: '50%', background: `radial-gradient(circle, ${C.teal}30 0%, transparent 70%)`, top: '10%', left: '5%', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', width: 400, height: 400, borderRadius: '50%', background: `radial-gradient(circle, ${C.forsythia}15 0%, transparent 70%)`, bottom: '10%', right: '5%', pointerEvents: 'none' }} />

          <div className="hero-animate hero-animate-1" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, backgroundColor: 'rgba(17, 76, 90, 0.6)', backdropFilter: 'blur(4px)', borderRadius: 20, padding: '6px 16px', marginBottom: 28, border: '1px solid rgba(255,255,255,0.05)' }}>
            <Icon name="arrow-trending-up" size={14} color={C.forsythia} />
            <span style={{ color: C.forsythia, fontFamily: 'JetBrains Mono, monospace', fontSize: 12, fontWeight: 600, letterSpacing: 1 }}>AI-POWERED DATA AUTOMATION</span>
          </div>

          <h1 className="hero-title hero-animate hero-animate-2"
            style={{ color: '#fff', fontFamily: 'JetBrains Mono, monospace', fontSize: 'clamp(36px,6vw,72px)', fontWeight: 700, lineHeight: 1.1, maxWidth: 900, marginBottom: 24 }}>
            Automate Everything.<br />
            <span style={{ background: `linear-gradient(90deg, ${C.forsythia}, ${C.saffron})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Move at Machine Speed.
            </span>
          </h1>

          <p className="hero-animate hero-animate-3"
            style={{ color: C.mint, fontFamily: 'Inter, sans-serif', fontSize: 'clamp(16px,2vw,20px)', lineHeight: 1.7, maxWidth: 600, marginBottom: 48 }}>
            NeuralFlow is the AI automation platform that connects your data, tools, and workflows — so your team ships faster and your models work harder.
          </p>

          <div className="hero-animate hero-animate-3" style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 80 }}>
            <button style={{ padding: '16px 36px', borderRadius: 12, border: 'none', background: `linear-gradient(135deg, ${C.forsythia}, ${C.saffron})`, color: C.noir, fontFamily: 'JetBrains Mono, monospace', fontSize: 15, fontWeight: 700, cursor: 'none', transition: 'opacity 180ms ease-out' }}
              onMouseEnter={e => e.currentTarget.style.opacity = '0.88'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
              Start Free Trial
            </button>
            <button style={{ padding: '16px 36px', borderRadius: 12, border: `1px solid #ffffff25`, backgroundColor: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(8px)', color: '#fff', fontFamily: 'Inter, sans-serif', fontSize: 15, cursor: 'none', transition: 'border-color 180ms ease-out' }}
              onMouseEnter={e => e.currentTarget.style.borderColor = C.forsythia}
              onMouseLeave={e => e.currentTarget.style.borderColor = '#ffffff25'}>
              Watch Demo
            </button>
          </div>

          {/* Stats Row with Live Counter Animations */}
          <div style={{ display: 'flex', gap: 48, flexWrap: 'wrap', justifyContent: 'center', position: 'relative', zIndex: 2 }}>
            {[
              { val: 500, suffix: 'M+', label: 'API calls daily' },
              { val: 99.99, suffix: '%', label: 'Uptime SLA', decimals: 2 },
              { val: 10, suffix: 'x', label: 'Faster deployment' },
              { val: 500, suffix: 'ms', label: 'Time to Interactive', prefix: '< ' }
            ].map((stat, idx) => (
              <div key={idx} style={{ textAlign: 'center', minWidth: 140 }}>
                <div style={{ color: C.forsythia, fontFamily: 'JetBrains Mono, monospace', fontSize: 28, fontWeight: 700 }}>
                  {stat.prefix || ''}
                  <AnimatedCounter target={stat.val} suffix={stat.suffix} decimals={stat.decimals || 0} />
                </div>
                <div style={{ color: C.mint, fontFamily: 'Inter, sans-serif', fontSize: 13, marginTop: 4 }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </header>

        {/* ── SCROLLING TICKER MARQUEE ── */}
        <div className="ticker-wrap">
          <div className="ticker-track">
            {[...Array(4)].map((_, outerIdx) => (
              <div key={outerIdx} style={{ display: 'flex', gap: 40 }}>
                <div className="ticker-item"><span>✦</span> MULTI-STEP AUTOMATION</div>
                <div className="ticker-item"><span>✦</span> 99.99% RUNTIME SLA</div>
                <div className="ticker-item"><span>✦</span> LLM OBSERVABILITY LAYER</div>
                <div className="ticker-item"><span>✦</span> LIVE 3D DATA MODELING</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── FEATURES ── */}
        <section id="features" style={{ backgroundColor: C.noir, padding: '100px 24px' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <p style={{ color: C.forsythia, fontFamily: 'JetBrains Mono, monospace', fontSize: 13, letterSpacing: 3, textTransform: 'uppercase', textAlign: 'center', marginBottom: 12 }}>Features</p>
            <h2 style={{ color: '#fff', fontFamily: 'JetBrains Mono, monospace', fontSize: 'clamp(26px,4vw,42px)', fontWeight: 700, textAlign: 'center', marginBottom: 12 }}>
              Built for Engineering Excellence
            </h2>
            <p style={{ color: C.mint, fontFamily: 'Inter, sans-serif', fontSize: 16, textAlign: 'center', maxWidth: 540, margin: '0 auto 56px' }}>
              Every feature designed to eliminate bottlenecks and amplify your team's output.
            </p>
            <BentoAccordion />
          </div>
        </section>

        {/* ── PRICING ── */}
        <PricingSection />

        {/* ── TESTIMONIALS ── */}
        <section id="testimonials" style={{ backgroundColor: C.teal, padding: '100px 24px' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <p style={{ color: C.forsythia, fontFamily: 'JetBrains Mono, monospace', fontSize: 13, letterSpacing: 3, textTransform: 'uppercase', textAlign: 'center', marginBottom: 12 }}>Social Proof</p>
            <h2 style={{ color: '#fff', fontFamily: 'JetBrains Mono, monospace', fontSize: 'clamp(26px,4vw,42px)', fontWeight: 700, textAlign: 'center', marginBottom: 56 }}>
              Teams shipping faster with NeuralFlow
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
              {TESTIMONIALS.map((t, i) => (
                <div key={i} style={{ backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: 20, padding: '32px 28px', border: '1px solid rgba(255,255,255,0.1)', transition: 'transform 200ms ease-out' }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
                  <div style={{ color: C.forsythia, fontSize: 28, marginBottom: 16 }}>❝</div>
                  <p style={{ color: C.arctic, fontFamily: 'Inter, sans-serif', fontSize: 15, lineHeight: 1.7, marginBottom: 24 }}>{t.quote}</p>
                  <div>
                    <div style={{ color: '#fff', fontFamily: 'JetBrains Mono, monospace', fontSize: 14, fontWeight: 600 }}>{t.name}</div>
                    <div style={{ color: C.mint, fontFamily: 'Inter, sans-serif', fontSize: 13 }}>{t.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* ── FOOTER ── */}
      <footer style={{ backgroundColor: '#0d1a1f', padding: '40px 24px', textAlign: 'center', borderTop: `1px solid rgba(255,255,255,0.06)` }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 16 }}>
          <Icon name="cube" size={18} color={C.forsythia} />
          <span style={{ color: '#fff', fontFamily: 'JetBrains Mono, monospace', fontSize: 16, fontWeight: 700 }}>NeuralFlow</span>
        </div>
        <p style={{ color: C.mint, fontFamily: 'Inter, sans-serif', fontSize: 13 }}>© 2026 NeuralFlow. All rights reserved.</p>
      </footer>
    </>
  )
}
