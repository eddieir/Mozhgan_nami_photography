import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Check, ArrowUpRight } from 'lucide-react'

const ease = [0.25, 0.46, 0.45, 0.94]

const PLANS = [
  {
    name: 'Essential',
    subtitle: 'Single Session',
    price: '€1,200',
    unit: 'per session',
    desc: 'Ideal for individuals, emerging creatives, and small brands requiring a single focused session.',
    features: [
      'Half-day session (4 hours)',
      'Up to 30 retouched images',
      'Advanced skin retouching',
      'Digital delivery gallery',
      'Standard usage license',
      '1 location or studio',
    ],
    cta: 'Book Essential',
    featured: false,
    accent: false,
  },
  {
    name: 'Signature',
    subtitle: 'Full Campaign',
    price: '€2,800',
    unit: 'per project',
    desc: 'Our most sought-after package for fashion brands, editorial commissions, and campaign productions.',
    features: [
      'Full-day session (8 hours)',
      'Up to 80 retouched images',
      'Premium editorial retouching',
      'AI art direction included',
      'Extended commercial license',
      'Up to 3 locations',
      'Mood board & concept development',
      'Priority 5-day delivery',
    ],
    cta: 'Book Signature',
    featured: true,
    accent: true,
  },
  {
    name: 'Atelier',
    subtitle: 'Bespoke',
    price: 'Custom',
    unit: 'tailored to vision',
    desc: 'For luxury houses, international campaigns, and extended creative partnerships that demand the extraordinary.',
    features: [
      'Multi-day or ongoing production',
      'Unlimited curated images',
      'Full creative & art direction',
      'Advanced AI vision pipeline',
      'All-rights licensing',
      'International locations',
      'Casting & styling consultation',
      'Campaign narrative strategy',
      'Dedicated creative producer',
    ],
    cta: 'Request Proposal',
    featured: false,
    accent: false,
  },
]

export default function Pricing() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="pricing" className="pricing-section" ref={ref}>
      <motion.div
        className="pricing-header"
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, ease }}
      >
        <div>
          <div className="s-eyebrow">Investment</div>
          <h2 className="s-title">Packages &</h2>
          <span className="s-title-italic">Pricing</span>
        </div>
        <p className="pricing-intro">
          Every collaboration begins with a conversation, not a contract.
          These packages are a starting point — each project is shaped entirely
          around your creative ambition and timeline.
        </p>
      </motion.div>

      <div className="pricing-grid">
        {PLANS.map((plan, i) => (
          <motion.div
            key={plan.name}
            className={`pricing-card${plan.featured ? ' pricing-featured' : ''}`}
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 + i * 0.12, ease }}
          >
            {plan.featured && (
              <div className="pricing-badge">Most Popular</div>
            )}

            <div className="pricing-plan-header">
              <div>
                <div className="pricing-plan-name">{plan.name}</div>
                <div className="pricing-plan-subtitle">{plan.subtitle}</div>
              </div>
              <div className="pricing-price-wrap">
                <div className="pricing-price">{plan.price}</div>
                <div className="pricing-unit">{plan.unit}</div>
              </div>
            </div>

            <p className="pricing-desc">{plan.desc}</p>

            <div className="pricing-divider" />

            <ul className="pricing-features">
              {plan.features.map((f) => (
                <li key={f} className="pricing-feature">
                  <Check size={13} strokeWidth={2.5} className="pricing-check" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            <a
              href="#contact"
              className={`pricing-cta${plan.featured ? ' pricing-cta-gold' : ' pricing-cta-ghost'}`}
              style={{ cursor: 'none' }}
            >
              {plan.cta}
              <ArrowUpRight size={14} strokeWidth={2} />
            </a>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="pricing-note"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, delay: 0.55, ease }}
      >
        <span>All packages include full usage rights for the agreed scope.</span>
        <span className="pricing-note-sep">·</span>
        <span>International travel quoted separately.</span>
        <span className="pricing-note-sep">·</span>
        <span>VAT applicable where required.</span>
      </motion.div>
    </section>
  )
}
