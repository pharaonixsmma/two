/* ═══════════════════════════════════════════════════════════════
   WorkSection — Premium editorial services showcase
   Four alternating full-bleed sections, each with its own
   dedicated live preview, line-by-line text reveals & 3D tilt.
════════════════════════════════════════════════════════════════ */

import { useRef, useCallback, useState } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import ServicePreview, { ServicePreviewStyles } from '@/components/ui/ServicePreview';

/* ─── Scroll helper ───────────────────────────────────────────── */
function scrollTo(href: string) {
  const el = document.querySelector(href);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

/* ─── Easing ──────────────────────────────────────────────────── */
const EXPO = [0.16, 1, 0.3, 1] as [number, number, number, number];

/* ─── Service data ────────────────────────────────────────────── */
const services = [
  {
    id: '01',
    num: '01',
    title: ['Website', 'Design'],
    category: 'Custom Web Presence',
    description:
      'Premium websites built to convert. Crafted entirely around your brand — every pixel positioned to turn first-time visitors into loyal customers.',
    outcomes: [
      'Conversion-optimised design',
      'Mobile-first performance',
      'SEO-ready architecture',
    ],
    cta: 'Build My Website',
    flip: false,
  },
  {
    id: '02',
    num: '02',
    title: ['Brand', 'Identity'],
    category: 'Strategy & Branding',
    description:
      'A complete brand system — logo, typography, colour, and guidelines — that makes your business unforgettable from the very first impression.',
    outcomes: [
      'Logo & visual identity system',
      'Brand guidelines & assets',
      'Print & digital collateral',
    ],
    cta: 'Build My Brand',
    flip: true,
  },
  {
    id: '03',
    num: '03',
    title: ['AI &', 'Automation'],
    category: 'Growth Systems',
    description:
      'Intelligent workflows that capture leads, qualify prospects, and keep your business running 24/7 — without adding headcount or complexity.',
    outcomes: [
      'Lead capture automation',
      '24/7 AI customer support',
      'Custom workflow systems',
    ],
    cta: 'Automate My Business',
    flip: false,
  },
  {
    id: '04',
    num: '04',
    title: ['Digital', 'Marketing'],
    category: 'Performance & Growth',
    description:
      'Data-driven campaigns across every channel — Google, Meta, email, and beyond — engineered for measurable revenue growth.',
    outcomes: [
      'Multi-channel campaign strategy',
      'Revenue-focused ad management',
      'Analytics & monthly reporting',
    ],
    cta: 'Grow My Revenue',
    flip: true,
  },
] as const;

const additionalServices = [
  'Graphic Design',
  'Digital Advertising',
  'Local SEO',
  'Customer Support Automation',
  'Booking Automation',
  'AI Consultation',
];

/* ─── 3D Tilt card ────────────────────────────────────────────── */
function TiltCard({ serviceId }: { serviceId: string }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const springX = useSpring(rawX, { damping: 40, stiffness: 260, mass: 0.75 });
  const springY = useSpring(rawY, { damping: 40, stiffness: 260, mass: 0.75 });

  const rotateY = useTransform(springX, [-0.5, 0.5], [-6, 6]);
  const rotateX = useTransform(springY, [-0.5, 0.5], [4, -4]);
  const boxShadow = useTransform(
    springY,
    [-0.5, 0, 0.5],
    [
      '0 0 0 1px rgba(212,175,55,0.09), 0 40px 80px rgba(0,0,0,0.85)',
      '0 0 0 1px rgba(212,175,55,0.05), 0 24px 56px rgba(0,0,0,0.65)',
      '0 0 0 1px rgba(212,175,55,0.09), 0 40px 80px rgba(0,0,0,0.85)',
    ]
  );

  const [hl, setHl] = useState({ x: 50, y: 35 });

  const onMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      const r = cardRef.current.getBoundingClientRect();
      const nx = (e.clientX - r.left) / r.width - 0.5;
      const ny = (e.clientY - r.top) / r.height - 0.5;
      rawX.set(nx);
      rawY.set(ny);
      setHl({ x: (nx + 0.5) * 100, y: (ny + 0.5) * 100 });
    },
    [rawX, rawY]
  );

  const onLeave = useCallback(() => {
    rawX.set(0);
    rawY.set(0);
  }, [rawX, rawY]);

  return (
    <div
      ref={cardRef}
      style={{ perspective: '1100px' }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d', boxShadow }}
        className="relative rounded-[22px] overflow-hidden border border-white/[0.06] aspect-[4/3] bg-[#080808]"
      >
        {/* Static edge highlight */}
        <div className="absolute inset-0 rounded-[22px] bg-gradient-to-br from-white/[0.05] via-transparent to-transparent pointer-events-none z-10" />

        {/* Cursor-tracking glass reflection */}
        <div
          className="absolute inset-0 pointer-events-none z-20 rounded-[22px]"
          style={{
            background: `radial-gradient(ellipse 65% 50% at ${hl.x}% ${hl.y}%, rgba(255,255,255,0.06) 0%, transparent 55%)`,
            transition: 'background 0.06s linear',
          }}
        />

        {/* Preview */}
        <div className="absolute inset-0">
          <ServicePreview id={serviceId} />
        </div>
      </motion.div>
    </div>
  );
}

/* ─── Service block ───────────────────────────────────────────── */
type Service = (typeof services)[number];

function ServiceBlock({ service }: { service: Service }) {
  const { flip } = service;

  /* Text column */
  const TextCol = (
    <div className="flex flex-col justify-center">
      {/* Numeral — small gold index */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.55, ease: EXPO }}
        className="font-mono text-primary/75 text-[11px] tracking-[0.3em] uppercase mb-4"
      >
        {service.num}
      </motion.p>

      {/* Category — dominant editorial heading */}
      <motion.h4
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7, ease: EXPO, delay: 0.07 }}
        className="font-mono text-[1.375rem] md:text-[1.75rem] lg:text-[2rem] text-white uppercase tracking-[0.05em] leading-[1.1] mb-12 md:mb-14"
      >
        {service.category}
      </motion.h4>

      {/* Title — line by line reveal */}
      <div className="mb-12 md:mb-14 overflow-hidden">
        {service.title.map((line, i) => (
          <div key={i} className="overflow-hidden">
            <motion.h3
              initial={{ y: '105%', opacity: 0 }}
              whileInView={{ y: '0%', opacity: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.9, ease: EXPO, delay: 0.08 + i * 0.12 }}
              className="font-serif text-[clamp(3.5rem,7vw,7.5rem)] text-white italic leading-[0.9] tracking-tight"
            >
              {line}
            </motion.h3>
          </div>
        ))}
      </div>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.75, ease: EXPO, delay: 0.22 }}
        className="font-sans text-base md:text-[1.0625rem] text-white/55 leading-[1.75] mb-10"
      >
        {service.description}
      </motion.p>

      {/* Outcomes */}
      <ul className="mb-12 space-y-[18px]">
        {service.outcomes.map((outcome, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55, ease: EXPO, delay: 0.3 + i * 0.09 }}
            className="flex items-center gap-4"
          >
            <span className="w-6 h-px bg-primary/55 flex-shrink-0" />
            <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-white/50">
              {outcome}
            </span>
          </motion.li>
        ))}
      </ul>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.65, ease: EXPO, delay: 0.45 }}
      >
        <button
          onClick={() => scrollTo('#contact')}
          className="group inline-flex items-center gap-3 font-mono text-[11px] tracking-[0.18em] uppercase text-primary border border-primary/40 rounded-full px-7 py-3.5 hover:bg-primary hover:text-black hover:-translate-y-0.5 hover:shadow-[0_10px_28px_rgba(212,175,55,0.28)] transition-all duration-300 cursor-hover"
        >
          {service.cta}
          <ArrowUpRight
            size={13}
            className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </button>
      </motion.div>
    </div>
  );

  /* Preview column */
  const PreviewCol = (
    <motion.div
      initial={{ opacity: 0, y: 36, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 1.05, ease: EXPO, delay: flip ? 0 : 0.1 }}
    >
      <TiltCard serviceId={service.id} />
    </motion.div>
  );

  return (
    <div className="border-t border-white/[0.06] py-24 md:py-32 lg:py-40">
      {/*
        Desktop: two-column grid, alternating order.
        Mobile: always text first, then preview beneath.
      */}
      <div className="grid grid-cols-1 md:[grid-template-columns:44fr_56fr] gap-10 md:gap-12 lg:gap-14 items-center">
        {/* Mobile order is always text (order-1) then preview (order-2).
            Desktop flips via md:order-* when flip=true. */}
        <div className={`order-1 ${flip ? 'md:order-2' : 'md:order-1'}`}>
          {TextCol}
        </div>
        <div className={`order-2 ${flip ? 'md:order-1' : 'md:order-2'}`}>
          {PreviewCol}
        </div>
      </div>
    </div>
  );
}

/* ─── Main section ────────────────────────────────────────────── */
export default function WorkSection() {
  return (
    <section id="services" className="bg-transparent overflow-hidden">
      <ServicePreviewStyles />

      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* ── Section header ─────────────────────────────────── */}
        <div className="pt-24 md:pt-32 pb-4">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.75, ease: EXPO }}
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-6"
          >
            <div>
              <p className="font-mono text-primary text-[10px] tracking-[0.28em] uppercase mb-5">
                01 / Services
              </p>
              <h2 className="font-serif text-5xl md:text-7xl text-white italic leading-none">
                Built to Grow
              </h2>
            </div>
            <button
              onClick={() => scrollTo('#contact')}
              data-testid="services-cta"
              className="self-start md:self-auto flex items-center gap-2 font-mono text-[11px] tracking-[0.2em] uppercase text-white/45 hover:text-primary transition-colors duration-300 cursor-hover"
            >
              Start a Project <ArrowUpRight size={14} />
            </button>
          </motion.div>
        </div>

        {/* ── Four alternating editorial showcases ───────────── */}
        {services.map((service) => (
          <ServiceBlock key={service.id} service={service} />
        ))}

        {/* ── Additional services grid ───────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.65, ease: 'easeOut' }}
          className="py-20 md:py-24 border-t border-white/[0.06]"
        >
          <p className="font-mono text-primary text-[10px] tracking-[0.28em] uppercase mb-10">
            Also available
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-0">
            {additionalServices.map((s) => (
              <div
                key={s}
                className="group flex items-center gap-3 py-[18px] border-b border-white/[0.05] hover:border-primary/20 transition-colors duration-300 cursor-hover pr-4"
              >
                <span className="w-1 h-1 rounded-full bg-primary/35 group-hover:bg-primary flex-shrink-0 transition-colors duration-300" />
                <span className="font-sans text-sm text-white/45 group-hover:text-white/85 transition-colors duration-300">
                  {s}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
