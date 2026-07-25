import { useState } from 'react';
import { ArrowRight, Phone, Mail, Instagram, Twitter } from 'lucide-react';
import { motion } from 'framer-motion';
import logoUrl from '@assets/logo-optimized.webp';

const SERVICES = [
  'Website Development',
  'Social Media Management',
  'Digital Advertising',
  'Graphic Design',
  'Local SEO',
  'AI & Automation',
  'Customer Support Automation',
  'Booking Automation',
  'Not sure — advise me'
];

interface FormData {
  name: string;
  businessName: string;
  phone: string;
  email: string;
  service: string;
}

const contactItems = [
  {
    icon: Phone,
    label: '+91 78279 63592',
    href: 'tel:+917827963592',
    type: 'tel' as const,
  },
  {
    icon: Phone,
    label: '+91 90152 41000',
    href: 'tel:+919015241000',
    type: 'tel' as const,
  },
  {
    icon: Mail,
    label: 'pharaonix.smma@gmail.com',
    href: 'mailto:pharaonix.smma@gmail.com',
    type: 'mail' as const,
  },
];

const socialItems = [
  {
    icon: Instagram,
    label: 'Instagram',
    handle: '@pharaonix.smma',
    href: 'https://www.instagram.com/pharaonix.smma',
  },
  {
    icon: Twitter,
    label: 'X (Twitter)',
    handle: '@pharaonix_smma',
    href: 'https://x.com/pharaonix_smma',
  },
];

export default function ContactSection() {
  const [form, setForm] = useState<FormData>({ name: '', businessName: '', phone: '', email: '', service: '' });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const validate = () => {
    const e: Partial<FormData> = {};
    if (form.name.length < 2) e.name = 'Name must be at least 2 characters';
    if (form.businessName.length < 2) e.businessName = 'Business name must be at least 2 characters';
    if (!/^\+?[\d\s\-]{8,}$/.test(form.phone)) e.phone = 'Enter a valid phone number';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email address';
    if (!form.service) e.service = 'Please select a service';
    return e;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    const subject = encodeURIComponent(`New Enquiry from ${form.name} — ${form.service}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nBusiness: ${form.businessName}\nPhone: ${form.phone}\nEmail: ${form.email}\nService: ${form.service}`
    );
    window.open(`mailto:pharaonix.smma@gmail.com?subject=${subject}&body=${body}`, '_blank');
    setSubmitted(true);
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  return (
    <section id="contact" className="relative pt-20 md:pt-24 pb-12 bg-transparent overflow-hidden">
      {/* Background gold glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[500px] bg-primary/15 blur-[120px] rounded-[100%] translate-y-1/2 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">

          {/* ─── Left column: headline + Connect With Us ─── */}
          <div>
            <h2 className="font-mono text-primary text-xs md:text-sm tracking-widest uppercase mb-5 md:mb-6">05 / Contact</h2>
            <h3 className="font-serif italic font-light text-[clamp(2.4rem,7vw,5.5rem)] leading-[0.95] text-white mb-6 md:mb-8">
              Let's create<br />
              something<br />
              extraordinary
            </h3>
            <p className="font-sans text-muted-foreground text-base md:text-lg mb-10 md:mb-12 leading-relaxed max-w-sm">
              Whether you have a specific project in mind or just want to know what's possible — book a free consultation and we'll map out the path.
            </p>

            {/* ─── Connect With Us ─── */}
            <div>
              <p className="font-mono text-primary text-xs tracking-[0.25em] uppercase mb-5">Connect With Us</p>

              {/* Phone & Email */}
              <div className="space-y-3 mb-8">
                {contactItems.map((item) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    whileHover={{ x: 4 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                    className="group flex items-center gap-3 w-fit cursor-hover"
                    data-testid={`contact-link-${item.type}`}
                  >
                    <span className="flex items-center justify-center w-8 h-8 rounded-full border border-white/10 group-hover:border-primary/50 group-hover:bg-primary/10 transition-all duration-300 flex-shrink-0">
                      <item.icon size={14} className="text-primary" />
                    </span>
                    <span className="font-mono text-xs md:text-sm text-white/60 group-hover:text-white transition-colors duration-300 break-all">
                      {item.label}
                    </span>
                  </motion.a>
                ))}
              </div>

              {/* Social buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                {socialItems.map((social) => (
                  <motion.a
                    key={social.href}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.03, y: -2 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                    data-testid={`social-link-${social.label.toLowerCase().replace(/\s+/g, '-')}`}
                    className="group relative flex items-center gap-3 px-5 py-3 rounded-sm border border-white/10 bg-background/40 hover:border-primary/40 hover:bg-primary/5 transition-all duration-300 cursor-hover overflow-hidden"
                    style={{
                      boxShadow: 'none',
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLElement).style.boxShadow = '0 0 24px rgba(212,175,55,0.18)';
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                    }}
                  >
                    {/* Subtle gold shimmer on hover */}
                    <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none" />

                    <span className="relative z-10 flex items-center justify-center w-7 h-7 rounded-full bg-white/5 group-hover:bg-primary/15 transition-colors duration-300 flex-shrink-0">
                      <social.icon size={14} className="text-primary" />
                    </span>
                    <div className="relative z-10 flex flex-col leading-none">
                      <span className="font-sans text-xs font-semibold text-white group-hover:text-primary transition-colors duration-300">{social.label}</span>
                      <span className="font-mono text-[10px] text-white/35 mt-0.5">{social.handle}</span>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>
          </div>

          {/* ─── Right column: consultation form ─── */}
          <div>
            {submitted ? (
              <div className="flex flex-col items-start gap-6 py-12">
                <div className="w-16 h-16 rounded-full border-2 border-primary flex items-center justify-center">
                  <ArrowRight className="text-primary" size={24} />
                </div>
                <h4 className="font-serif italic text-3xl text-white">Enquiry sent.</h4>
                <p className="font-sans text-muted-foreground leading-relaxed">
                  We'll review your details and reach out within 24 hours to schedule your free consultation.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setForm({ name: '', businessName: '', phone: '', email: '', service: '' });
                  }}
                  className="font-mono text-xs text-primary uppercase tracking-widest hover:text-white transition-colors"
                >
                  Send another enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5" noValidate>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
                  <div>
                    <label htmlFor="contact-name" className="sr-only">Your name</label>
                    <input
                      id="contact-name"
                      type="text"
                      placeholder="Your name"
                      aria-label="Your name"
                      aria-invalid={!!errors.name}
                      value={form.name}
                      onChange={e => handleChange('name', e.target.value)}
                      data-testid="contact-input-name"
                      className={`w-full bg-background/60 border ${errors.name ? 'border-red-500/50' : 'border-white/10'} text-white placeholder:text-white/30 font-sans text-sm px-4 md:px-5 py-3 md:py-4 rounded-sm focus:outline-none focus:border-primary/50 transition-colors`}
                    />
                    {errors.name && <p className="font-mono text-xs text-red-400/80 mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="contact-business" className="sr-only">Business name</label>
                    <input
                      id="contact-business"
                      type="text"
                      placeholder="Business name"
                      aria-label="Business name"
                      aria-invalid={!!errors.businessName}
                      value={form.businessName}
                      onChange={e => handleChange('businessName', e.target.value)}
                      data-testid="contact-input-business"
                      className={`w-full bg-background/60 border ${errors.businessName ? 'border-red-500/50' : 'border-white/10'} text-white placeholder:text-white/30 font-sans text-sm px-4 md:px-5 py-3 md:py-4 rounded-sm focus:outline-none focus:border-primary/50 transition-colors`}
                    />
                    {errors.businessName && <p className="font-mono text-xs text-red-400/80 mt-1">{errors.businessName}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
                  <div>
                    <label htmlFor="contact-phone" className="sr-only">Phone number</label>
                    <input
                      id="contact-phone"
                      type="tel"
                      placeholder="Phone number"
                      aria-label="Phone number"
                      aria-invalid={!!errors.phone}
                      value={form.phone}
                      onChange={e => handleChange('phone', e.target.value)}
                      data-testid="contact-input-phone"
                      className={`w-full bg-background/60 border ${errors.phone ? 'border-red-500/50' : 'border-white/10'} text-white placeholder:text-white/30 font-sans text-sm px-4 md:px-5 py-3 md:py-4 rounded-sm focus:outline-none focus:border-primary/50 transition-colors`}
                    />
                    {errors.phone && <p className="font-mono text-xs text-red-400/80 mt-1">{errors.phone}</p>}
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="sr-only">Email address</label>
                    <input
                      id="contact-email"
                      type="email"
                      placeholder="Email address"
                      aria-label="Email address"
                      aria-invalid={!!errors.email}
                      value={form.email}
                      onChange={e => handleChange('email', e.target.value)}
                      data-testid="contact-input-email"
                      className={`w-full bg-background/60 border ${errors.email ? 'border-red-500/50' : 'border-white/10'} text-white placeholder:text-white/30 font-sans text-sm px-4 md:px-5 py-3 md:py-4 rounded-sm focus:outline-none focus:border-primary/50 transition-colors`}
                    />
                    {errors.email && <p className="font-mono text-xs text-red-400/80 mt-1">{errors.email}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-service" className="sr-only">Select a service</label>
                  <select
                    id="contact-service"
                    value={form.service}
                    onChange={e => handleChange('service', e.target.value)}
                    aria-label="Select a service"
                    aria-invalid={!!errors.service}
                    data-testid="contact-select-service"
                    className={`w-full bg-background/60 border ${errors.service ? 'border-red-500/50' : 'border-white/10'} text-white font-sans text-sm px-4 md:px-5 py-3 md:py-4 rounded-sm focus:outline-none focus:border-primary/50 transition-colors appearance-none cursor-pointer`}
                  >
                    <option value="" className="bg-[#171717]">Select a service</option>
                    {SERVICES.map(s => (
                      <option key={s} value={s} className="bg-[#171717]">{s}</option>
                    ))}
                  </select>
                  {errors.service && <p className="font-mono text-xs text-red-400/80 mt-1">{errors.service}</p>}
                </div>

                <button
                  type="submit"
                  data-testid="contact-submit"
                  className="group relative w-full px-8 py-4 md:py-5 rounded-sm bg-primary text-black font-mono text-sm tracking-widest uppercase overflow-hidden flex items-center justify-center gap-3 hover:text-black transition-colors"
                >
                  <div className="absolute inset-0 bg-white translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]" />
                  <span className="relative z-10 font-bold">Book Free Consultation</span>
                  <ArrowRight className="relative z-10 flex-shrink-0" size={16} />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* ─── Footer bar ─── */}
        <div className="mt-16 md:mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6">
          <div className="flex items-center gap-3 flex-wrap justify-center md:justify-start">
            <img
              src={logoUrl}
              alt="PHARAONIX logo"
              width={32}
              height={32}
              loading="lazy"
              className="w-7 h-7 md:w-8 md:h-8 rounded-full object-contain flex-shrink-0"
            />
            <span className="font-mono text-sm text-primary tracking-widest font-bold">PHARAONIX</span>
            <span className="font-mono text-xs text-white/30 tracking-wider">— From Vision to Victory.</span>
          </div>
          <div className="font-sans text-xs text-muted-foreground uppercase tracking-widest text-center md:text-right">
            © {new Date().getFullYear()} PHARAONIX. All rights reserved.
          </div>
        </div>
      </div>
    </section>
  );
}
