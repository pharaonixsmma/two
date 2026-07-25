import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import logoUrl from '@assets/logo-optimized.webp';

export default function FloatingNav() {
  const { scrollY } = useScroll();
  const [activeSection, setActiveSection] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);

  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ['rgba(10, 10, 10, 0)', 'rgba(10, 10, 10, 0.5)']
  );

  const backdropBlur = useTransform(
    scrollY,
    [0, 100],
    ['blur(0px)', 'blur(28px)']
  );

  const borderColor = useTransform(
    scrollY,
    [0, 100],
    ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0.08)']
  );

  const boxShadow = useTransform(
    scrollY,
    [0, 100],
    ['0 0 0 rgba(0, 0, 0, 0)', '0 12px 40px rgba(0, 0, 0, 0.35)']
  );

  const links = [
    { name: 'Services', href: '#services' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'About', href: '#about' },
    { name: 'Process', href: '#process' },
    { name: 'Contact', href: '#contact' },
  ];

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setMenuOpen(false);
  };

  useEffect(() => {
    const sections = ['home', 'services', 'portfolio', 'about', 'process', 'contact'];
    const handleScroll = () => {
      let current = '';
      sections.forEach(section => {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 3 && rect.bottom >= 0) {
            current = section;
          }
        }
      });
      if (current && current !== activeSection) {
        setActiveSection(current);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection]);

  return (
    <>
      <motion.nav
        className="fixed top-5 md:top-6 left-1/2 -translate-x-1/2 z-50 rounded-[24px] px-3 md:px-5 py-2.5 md:py-3 flex items-center gap-3 md:gap-8 transition-[background-color,backdrop-filter,border-color,box-shadow] duration-[400ms] ease-out"
        style={{
          backgroundColor,
          backdropFilter: backdropBlur,
          WebkitBackdropFilter: backdropBlur,
          border: '1px solid',
          borderColor,
          boxShadow,
        }}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <button
          onClick={() => scrollTo('#home')}
          className="flex items-center gap-2 cursor-hover"
          data-testid="nav-logo"
        >
          <img
            src={logoUrl}
            alt="PHARAONIX logo"
            width={32}
            height={32}
            className="w-7 h-7 md:w-8 md:h-8 object-contain rounded-full"
          />
          <span className="font-mono font-bold text-sm tracking-widest text-primary hidden sm:block">PHARAONIX</span>
        </button>

        <div className="hidden md:flex items-center gap-7">
          {links.map((link) => {
            const isActive = activeSection === link.name.toLowerCase();
            return (
              <button
                key={link.name}
                onClick={() => scrollTo(link.href)}
                data-testid={`nav-link-${link.name.toLowerCase()}`}
                className="group relative font-sans text-xs uppercase tracking-[0.22em] py-1"
              >
                <span
                  className={`transition-colors duration-300 ${
                    isActive ? 'text-primary' : 'text-white/65 group-hover:text-white'
                  }`}
                >
                  {link.name}
                </span>
                <span
                  className={`absolute left-0 -bottom-0.5 h-px bg-primary transition-all duration-300 ease-out ${
                    isActive ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </button>
            );
          })}
        </div>

        <button
          onClick={() => scrollTo('#contact')}
          data-testid="nav-cta"
          className="hidden md:flex items-center gap-2 border border-primary/70 text-primary font-mono text-xs font-bold tracking-widest uppercase px-5 py-2 rounded-full hover:bg-primary hover:text-black hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(212,175,55,0.35)] transition-all duration-300 cursor-hover"
        >
          Start a Project
        </button>

        <button
          className="md:hidden text-white/70 hover:text-primary transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          data-testid="nav-mobile-toggle"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          <div className="flex flex-col gap-1.5 w-5">
            <span className={`block h-px bg-current transition-all duration-300 origin-center ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block h-px bg-current transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block h-px bg-current transition-all duration-300 origin-center ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </div>
        </button>
      </motion.nav>

      {menuOpen && (
        <motion.div
          className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {links.map((link) => (
            <button
              key={link.name}
              onClick={() => scrollTo(link.href)}
              className="font-serif italic text-4xl text-white hover:text-primary transition-colors"
            >
              {link.name}
            </button>
          ))}
          <button
            onClick={() => scrollTo('#contact')}
            className="mt-4 border border-primary/70 text-primary font-mono text-sm font-bold tracking-widest uppercase px-8 py-4 rounded-full hover:bg-primary hover:text-black transition-colors duration-300"
          >
            Start a Project
          </button>
        </motion.div>
      )}
    </>
  );
}
