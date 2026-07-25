import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import ProjectPreview from '@/components/ui/ProjectPreview';
import BrowserMockup from '@/components/ui/BrowserMockup';

const projects = [
  {
    id: '01',
    title: 'Healthcare Clinic',
    category: 'Website & Local SEO',
    description:
      'A premium digital experience designed to increase appointment bookings, build trust, and improve local search visibility.',
    tags: ['Mobile First', 'Conversion Optimized', 'SEO Ready'],
  },
  {
    id: '02',
    title: 'Modern Gym',
    category: 'Brand Identity & Lead Generation',
    description:
      'A bold brand identity and lead-generation system engineered to fill class schedules and grow a modern fitness membership base.',
    tags: ['Brand System', 'Lead Capture', 'High Contrast UI'],
  },
  {
    id: '03',
    title: 'Premium Restaurant',
    category: 'Digital Presence',
    description:
      'An elegant dining experience translated online — menu storytelling, reservations, and a presence built to match the room.',
    tags: ['Menu Showcase', 'Reservations Ready', 'Local Presence'],
  },
  {
    id: '04',
    title: 'Luxury Real Estate',
    category: 'High-End Property Experience',
    description:
      'A refined property showcase built to make seven-figure listings feel as considered online as they are in person.',
    tags: ['Listing Showcase', 'Editorial Layout', 'Premium Feel'],
  },
  {
    id: '05',
    title: 'AI SaaS Dashboard',
    category: 'Product Website & UI',
    description:
      'A product website and dashboard UI designed to make a complex AI platform feel effortless, credible, and fast.',
    tags: ['Product UI', 'Data Visualization', 'Dark Mode Native'],
  },
  {
    id: '06',
    title: 'Formula 1 Team Experience',
    category: 'Interactive Marketing Website',
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
    <div
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
    </div>
  );
}

export default function PortfolioSection() {
  return (
    <section id="portfolio" className="py-24 bg-transparent">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="mb-8 md:mb-10"
        >
          <h2 className="font-mono text-primary text-sm tracking-widest uppercase mb-4">02 / Portfolio</h2>
          <div className="flex items-end justify-between">
            <h3 className="font-serif text-5xl md:text-7xl text-white italic">The Standard</h3>
            <p className="hidden md:block font-mono text-xs text-white/30 max-w-xs text-right leading-relaxed">
              Concept projects — imagined case studies showcasing our craft, not completed client work.
            </p>
          </div>
        </motion.div>

        <div>
          {projects.map((project, index) => (
            <ProjectCaseStudy key={project.id} project={project} index={index} />
          ))}
        </div>

        <p className="md:hidden mt-4 font-mono text-xs text-white/30 text-center leading-relaxed">
          Concept projects — imagined case studies showcasing our craft, not completed client work.
        </p>
      </div>
    </section>
  );
}
