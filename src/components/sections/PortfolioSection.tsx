import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import ProjectPreview from '@/components/ui/ProjectPreview';
import BrowserMockup from '@/components/ui/BrowserMockup';

const CATEGORIES = ['ALL', 'WEBSITES', 'BRANDING', 'LOCAL SEO', 'AI & SAAS'] as const;
type CategoryFilter = (typeof CATEGORIES)[number];

const projects = [
  {
    id: '01',
    title: 'Healthcare Clinic',
    category: 'Website & Local SEO',
    filterTag: 'WEBSITES',
    description:
      'A premium digital experience designed to increase appointment bookings, build trust, and improve local search visibility.',
    tags: ['Mobile First', 'Conversion Optimized', 'SEO Ready'],
  },
  {
    id: '02',
    title: 'Modern Gym',
    category: 'Brand Identity & Lead Generation',
    filterTag: 'BRANDING',
    description:
      'A bold brand identity and lead-generation system engineered to fill class schedules and grow a modern fitness membership base.',
    tags: ['Brand System', 'Lead Capture', 'High Contrast UI'],
  },
  {
    id: '03',
    title: 'Premium Restaurant',
    category: 'Digital Presence',
    filterTag: 'WEBSITES',
    description:
      'An elegant dining experience translated online — menu storytelling, reservations, and a presence built to match the room.',
    tags: ['Menu Showcase', 'Reservations Ready', 'Local Presence'],
  },
  {
    id: '04',
    title: 'Luxury Real Estate',
    category: 'High-End Property Experience',
    filterTag: 'LOCAL SEO',
    description:
      'A refined property showcase built to make seven-figure listings feel as considered online as they are in person.',
    tags: ['Listing Showcase', 'Editorial Layout', 'Premium Feel'],
  },
  {
    id: '05',
    title: 'AI SaaS Dashboard',
    category: 'Product Website & UI',
    filterTag: 'AI & SAAS',
    description:
      'A product website and dashboard UI designed to make a complex AI platform feel effortless, credible, and fast.',
    tags: ['Product UI', 'Data Visualization', 'Dark Mode Native'],
  },
  {
    id: '06',
    title: 'Formula 1 Team Experience',
    category: 'Interactive Marketing Website',
    filterTag: 'WEBSITES',
    description:
      'A high-energy marketing site concept built to carry motorsport intensity into every scroll, stat, and driver reveal.',
    tags: ['Motion Design', 'Interactive Stats', 'High Energy Brand'],
  },
];

const textContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

const fadeUpVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.19, 1, 0.22, 1] as const } },
};

const labelVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, ease: 'easeOut' as const } },
};

const titleVariants = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.19, 1, 0.22, 1] as const } },
};

const tagsContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const tagVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
};

const browserVariants = {
  hidden: { opacity: 0, y: 44 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.19, 1, 0.22, 1] as const, delay: 0.15 } },
};

function ProjectCaseStudy({
  project,
  index,
}: {
  project: (typeof projects)[number];
  index: number;
}) {
  const reversed = index % 2 === 1;

  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      data-testid={`portfolio-case-${project.id}`}
      className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-10 items-center py-16 md:py-24 border-b border-white/[0.06] last:border-b-0"
    >
      {/* Text column */}
      <motion.div
        variants={textContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-120px' }}
        className={reversed ? 'lg:order-2' : 'lg:order-1'}
      >
        <motion.div variants={labelVariants} className="flex items-center gap-3 mb-6">
          <span className="font-mono text-primary text-xs tracking-[0.25em]">{project.id} /</span>
          <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-white/35 border border-white/15 rounded-full px-2.5 py-1">
            Concept Project
          </span>
        </motion.div>

        <motion.h4 variants={titleVariants} className="font-serif text-4xl md:text-6xl text-white leading-[1.02] mb-5">
          {project.title}
        </motion.h4>

        <motion.p variants={fadeUpVariants} className="font-mono text-xs uppercase tracking-[0.2em] text-primary/80 mb-6">
          {project.category}
        </motion.p>

        <motion.p variants={fadeUpVariants} className="font-sans text-base md:text-lg text-muted-foreground leading-relaxed max-w-lg mb-7">
          {project.description}
        </motion.p>

        <motion.div variants={tagsContainerVariants} className="flex flex-wrap gap-2.5 mb-9">
          {project.tags.map((tag) => (
            <motion.span
              key={tag}
              variants={tagVariants}
              className="font-mono text-[10px] uppercase tracking-widest text-white/60 border border-white/10 bg-white/[0.02] rounded-full px-3 py-1.5"
            >
              {tag}
            </motion.span>
          ))}
        </motion.div>

        <motion.button
          variants={fadeUpVariants}
          onClick={scrollToContact}
          data-testid={`portfolio-cta-${project.id}`}
          className="group/cta inline-flex items-center gap-2 font-mono text-xs tracking-[0.2em] uppercase text-white cursor-hover"
        >
          <span className="relative">
            View Case Study
            <span className="absolute left-0 -bottom-1 h-px w-full bg-primary/80 origin-left scale-x-0 group-hover/cta:scale-x-100 transition-transform duration-400 ease-[cubic-bezier(0.19,1,0.22,1)]" />
          </span>
          <ArrowUpRight
            size={14}
            className="text-primary transition-transform duration-400 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover/cta:translate-x-1 group-hover/cta:-translate-y-1"
          />
        </motion.button>
      </motion.div>

      {/* Browser mockup column */}
      <motion.div
        variants={browserVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-120px' }}
        className={reversed ? 'lg:order-1' : 'lg:order-2'}
      >
        <BrowserMockup>
          <ProjectPreview id={project.id} />
        </BrowserMockup>
      </motion.div>
    </motion.div>
  );
}

export default function PortfolioSection() {
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>('ALL');

  const filteredProjects = projects.filter((project) => {
    if (activeFilter === 'ALL') return true;
    return project.filterTag === activeFilter;
  });

  return (
    <section id="portfolio" className="py-24 bg-transparent">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="mb-10 md:mb-12"
        >
          <h2 className="font-mono text-primary text-sm tracking-widest uppercase mb-4">02 / Portfolio</h2>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h3 className="font-serif text-5xl md:text-7xl text-white italic">The Standard</h3>
            <p className="font-mono text-xs text-white/40 max-w-xs md:text-right leading-relaxed">
              Concept projects — imagined case studies showcasing our craft.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-3 mt-10">
            {CATEGORIES.map((cat) => {
              const isActive = activeFilter === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  data-testid={`portfolio-filter-${cat.toLowerCase().replace(/\s+/g, '-')}`}
                  className={`relative font-mono text-[11px] uppercase tracking-[0.18em] px-5 py-2.5 rounded-full transition-all duration-300 cursor-hover border ${
                    isActive
                      ? 'border-primary text-black bg-primary font-bold shadow-[0_0_20px_rgba(212,175,55,0.3)]'
                      : 'border-white/15 text-white/60 bg-black/40 hover:border-white/35 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div key={activeFilter}>
            {filteredProjects.map((project, index) => (
              <ProjectCaseStudy key={project.id} project={project} index={index} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
