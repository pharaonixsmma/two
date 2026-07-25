/* ═══════════════════════════════════════════════════════════════
   ServicePreview — premium realistic miniature product previews
════════════════════════════════════════════════════════════════ */

const G     = '#D4AF37';
const G_DIM = 'rgba(212,175,55,0.12)';
const G_MID = 'rgba(212,175,55,0.38)';
const G_STR = 'rgba(212,175,55,0.65)';
const W_HI  = 'rgba(255,255,255,0.88)';
const W_MID = 'rgba(255,255,255,0.48)';
const W_LO  = 'rgba(255,255,255,0.18)';
const W_XLO = 'rgba(255,255,255,0.07)';
const BG    = '#080808';
const BG1   = '#0d0d0d';
const BG2   = '#131313';
const BG3   = '#181818';

/* ══════════════════════════════════════════════════════════════
   01 — WEBSITE DESIGN
   Premium agency landing page — floating nav, editorial hero,
   project cards, testimonial, footer.
══════════════════════════════════════════════════════════════ */

function WebsitePageContent() {
  const projects = [
    { bg: 'linear-gradient(135deg,#1a0e00 0%,#3d2800 100%)', cat: 'E-Commerce', name: 'LuxeStore' },
    { bg: 'linear-gradient(135deg,#07071a 0%,#12123a 100%)', cat: 'SaaS',       name: 'FlowDesk' },
    { bg: 'linear-gradient(135deg,#0a0a0a 0%,#1e1e1e 100%)', cat: 'Agency',    name: 'CreativeX' },
    { bg: 'linear-gradient(135deg,#001a0f 0%,#002a1a 100%)', cat: 'Finance',   name: 'Wealthr' },
  ];

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif' }}>
      {/* ── Hero ── */}
      <div style={{ padding: '18px 14px 14px', background: 'linear-gradient(155deg,#090909 0%,#1a1300 100%)', position: 'relative', overflow: 'hidden' }}>
        {/* Decorative orb */}
        <div style={{ position: 'absolute', right: 10, top: 10, width: 70, height: 70, borderRadius: '50%', background: 'radial-gradient(circle, rgba(212,175,55,0.14) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ fontSize: 5, letterSpacing: 2.5, color: G_STR, textTransform: 'uppercase', fontFamily: 'monospace', marginBottom: 7, animation: 'svcFadeIn 0.4s ease both' }}>Premium Digital Studio · Est. 2020</div>
        <div style={{ fontSize: 22, fontStyle: 'italic', color: W_HI, lineHeight: 1.02, fontFamily: 'Georgia, serif', fontWeight: 400, animation: 'svcSlideUp 0.45s ease both 0.05s' }}>FROM VISION</div>
        <div style={{ fontSize: 22, fontStyle: 'italic', color: G, lineHeight: 1.02, marginBottom: 9, fontFamily: 'Georgia, serif', fontWeight: 400, animation: 'svcSlideUp 0.45s ease both 0.1s' }}>TO VICTORY.</div>
        <div style={{ fontSize: 5.5, color: W_MID, lineHeight: 1.6, marginBottom: 11, maxWidth: 150, animation: 'svcFadeIn 0.5s ease both 0.2s' }}>
          Premium websites, AI systems &amp; brand identities engineered to grow your business.
        </div>
        <div style={{ display: 'flex', gap: 6, animation: 'svcSlideUp 0.5s ease both 0.28s' }}>
          <div style={{ background: G, borderRadius: 20, padding: '4px 10px', boxShadow: '0 4px 12px rgba(212,175,55,0.3)', animation: 'svcBtnGlow 3s ease-in-out infinite' }}>
            <span style={{ fontSize: 5.5, fontWeight: 700, color: '#000', letterSpacing: 1.2, fontFamily: 'monospace' }}>START PROJECT</span>
          </div>
          <div style={{ border: `1px solid ${W_LO}`, borderRadius: 20, padding: '4px 10px' }}>
            <span style={{ fontSize: 5.5, color: W_MID, letterSpacing: 1, fontFamily: 'monospace' }}>VIEW WORK</span>
          </div>
        </div>
      </div>

      {/* ── Featured Projects ── */}
      <div style={{ padding: '10px 14px', background: BG1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <span style={{ fontSize: 4.5, letterSpacing: 2, color: G_STR, textTransform: 'uppercase', fontFamily: 'monospace' }}>Selected Work</span>
          <span style={{ fontSize: 4.5, color: W_LO, fontFamily: 'monospace' }}>04 Projects ↗</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 5 }}>
          {projects.map((p, i) => (
            <div key={i} style={{ borderRadius: 8, overflow: 'hidden', border: `1px solid ${W_XLO}`, animation: `svcSlideUp ${0.32 + i * 0.07}s ease-out both ${0.05 * i}s` }}>
              <div style={{ height: 34, background: p.bg, position: 'relative' }}>
                <div style={{ position: 'absolute', top: 5, right: 5, width: 15, height: 15, borderRadius: '50%', background: G_DIM, border: `1px solid ${G_MID}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ width: 5, height: 5, borderRadius: '50%', background: G, opacity: 0.75 }} />
                </div>
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 10, background: 'linear-gradient(to top, rgba(13,13,13,0.8), transparent)' }} />
              </div>
              <div style={{ background: BG2, padding: '5px 7px' }}>
                <div style={{ fontSize: 4, color: G_STR, letterSpacing: 1.2, textTransform: 'uppercase', fontFamily: 'monospace', marginBottom: 2 }}>{p.cat}</div>
                <div style={{ fontSize: 7.5, color: W_HI, fontFamily: 'Georgia, serif', fontStyle: 'italic' }}>{p.name}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Testimonial ── */}
      <div style={{ margin: '0 14px 10px', padding: '9px 10px', borderRadius: 8, background: BG3, border: `1px solid ${G_DIM}`, animation: 'svcFadeIn 0.6s ease both 0.3s' }}>
        <div style={{ display: 'flex', gap: 1.5, marginBottom: 5 }}>
          {[1,2,3,4,5].map(i => <span key={i} style={{ fontSize: 7, color: G, lineHeight: 1 }}>★</span>)}
        </div>
        <div style={{ fontSize: 5.5, color: W_MID, lineHeight: 1.6, marginBottom: 7, fontStyle: 'italic' }}>
          "PHARAONIX delivered beyond expectations. Revenue increased 3× in under 6 months."
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <div style={{ width: 18, height: 18, borderRadius: '50%', background: `linear-gradient(135deg, ${G}, #4a3508)`, flexShrink: 0 }} />
          <div>
            <div style={{ fontSize: 5.5, color: W_HI, fontWeight: 600, fontFamily: 'monospace', letterSpacing: 0.5 }}>Rahul Sharma</div>
            <div style={{ fontSize: 4.5, color: W_LO, fontFamily: 'monospace' }}>CEO · TechVenture India</div>
          </div>
        </div>
      </div>

      {/* ── Footer ── */}
      <div style={{ padding: '8px 14px', borderTop: `1px solid ${W_XLO}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#050505' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <div style={{ width: 12, height: 12, borderRadius: '50%', background: `linear-gradient(135deg, ${G}, #8a6e1a)` }} />
          <span style={{ fontSize: 6, fontWeight: 700, color: G, letterSpacing: 2.5, fontFamily: 'monospace' }}>PHARAONIX</span>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          {['Privacy','Terms','Contact'].map(l => (
            <span key={l} style={{ fontSize: 4.5, color: W_XLO, fontFamily: 'monospace', letterSpacing: 0.5 }}>{l}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

export function WebDesignPreview() {
  return (
    <div style={{ width: '100%', height: '100%', background: BG, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* Floating nav */}
      <div style={{ flexShrink: 0, zIndex: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '7px 14px', background: 'rgba(8,8,8,0.9)', backdropFilter: 'blur(16px)', borderBottom: `1px solid ${W_XLO}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <div style={{ width: 14, height: 14, borderRadius: '50%', background: `linear-gradient(135deg, ${G}, #8a6e1a)` }} />
          <span style={{ fontSize: 6, fontWeight: 700, color: G, letterSpacing: 2.5, fontFamily: 'monospace' }}>PHARAONIX</span>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          {['Work','Services','About'].map(l => (
            <span key={l} style={{ fontSize: 5, color: W_MID, letterSpacing: 1, textTransform: 'uppercase', fontFamily: 'monospace' }}>{l}</span>
          ))}
        </div>
        <div style={{ background: G, borderRadius: 20, padding: '3px 9px' }}>
          <span style={{ fontSize: 5, fontWeight: 700, color: '#000', letterSpacing: 1.2, fontFamily: 'monospace' }}>START</span>
        </div>
      </div>
      {/* Scrolling page content */}
      <div style={{ flex: 1, overflow: 'hidden' }}>
        <div className="svc-scroll-site">
          <WebsitePageContent />
          <WebsitePageContent />
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   02 — BRAND IDENTITY
   Professional branding case study — logo lockup, palette,
   typography, business card, social preview.
══════════════════════════════════════════════════════════════ */

export function BrandIdentityPreview() {
  const palette = [
    { hex: '#0a0a0a', label: 'Obsidian' },
    { hex: '#D4AF37', label: 'Gold'     },
    { hex: '#FFFFFF', label: 'Pure'     },
    { hex: '#1e1e1e', label: 'Noir'     },
    { hex: '#8a6e1a', label: 'Bronze'   },
  ];

  return (
    <div style={{ width: '100%', height: '100%', background: BG1, display: 'flex', flexDirection: 'column', overflow: 'hidden', fontFamily: 'system-ui, sans-serif' }}>
      {/* Header */}
      <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '7px 14px', borderBottom: `1px solid ${W_XLO}`, background: BG }}>
        <span style={{ fontSize: 5, letterSpacing: 2.5, color: G_STR, textTransform: 'uppercase', fontFamily: 'monospace' }}>Brand Identity — Case Study</span>
        <span style={{ fontSize: 4.5, color: W_LO, fontFamily: 'monospace' }}>PHARAONIX Studio</span>
      </div>

      <div style={{ flex: 1, overflow: 'hidden', padding: '10px 14px', display: 'flex', flexDirection: 'column', gap: 9 }}>
        {/* Logo lockup */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, animation: 'svcFadeIn 0.5s ease both' }}>
          {/* Monogram mark */}
          <div style={{ width: 44, height: 44, borderRadius: 10, background: `linear-gradient(145deg, #1a1400, #2a2000)`, border: `1px solid ${G_MID}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: `0 4px 16px rgba(212,175,55,0.2)` }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <polygon points="12,2 22,8 22,16 12,22 2,16 2,8" stroke={G} strokeWidth="1" fill="none" />
              <text x="12" y="16" textAnchor="middle" fill={G} fontSize="10" fontFamily="Georgia,serif" fontStyle="italic">P</text>
            </svg>
          </div>
          {/* Wordmark */}
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: W_HI, letterSpacing: 5, fontFamily: 'monospace', lineHeight: 1, marginBottom: 3 }}>PHARAONIX</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 20, height: 0.5, background: G_MID }} />
              <span style={{ fontSize: 4.5, color: G_MID, letterSpacing: 2, textTransform: 'uppercase', fontFamily: 'monospace' }}>Digital Excellence</span>
              <div style={{ width: 20, height: 0.5, background: G_MID }} />
            </div>
          </div>
        </div>

        {/* Color palette */}
        <div style={{ animation: 'svcSlideUp 0.45s ease both 0.1s' }}>
          <div style={{ fontSize: 4.5, letterSpacing: 2, color: W_LO, textTransform: 'uppercase', fontFamily: 'monospace', marginBottom: 5 }}>Brand Palette</div>
          <div style={{ display: 'flex', gap: 4 }}>
            {palette.map((c, i) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 3 }}>
                <div style={{ height: 22, borderRadius: 5, background: c.hex, border: i === 2 ? `1px solid ${W_LO}` : `1px solid rgba(255,255,255,0.04)` }} />
                <div style={{ fontSize: 4, color: W_LO, fontFamily: 'monospace', textAlign: 'center', whiteSpace: 'nowrap' }}>{c.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Typography specimens */}
        <div style={{ display: 'flex', gap: 8, animation: 'svcSlideUp 0.45s ease both 0.18s' }}>
          <div style={{ flex: 1, background: BG3, borderRadius: 7, padding: '8px 9px', border: `1px solid ${W_XLO}` }}>
            <div style={{ fontSize: 4.5, letterSpacing: 1.5, color: W_LO, fontFamily: 'monospace', marginBottom: 4 }}>Display</div>
            <div style={{ fontSize: 20, color: W_HI, fontFamily: 'Georgia, serif', fontStyle: 'italic', lineHeight: 1 }}>Aa</div>
            <div style={{ fontSize: 4.5, color: G_STR, fontFamily: 'monospace', marginTop: 4, letterSpacing: 1 }}>Cormorant</div>
          </div>
          <div style={{ flex: 1, background: BG3, borderRadius: 7, padding: '8px 9px', border: `1px solid ${W_XLO}` }}>
            <div style={{ fontSize: 4.5, letterSpacing: 1.5, color: W_LO, fontFamily: 'monospace', marginBottom: 4 }}>Body</div>
            <div style={{ fontSize: 12, color: W_HI, fontFamily: 'system-ui, sans-serif', fontWeight: 400, lineHeight: 1.2 }}>Aa</div>
            <div style={{ fontSize: 4.5, color: G_STR, fontFamily: 'monospace', marginTop: 5, letterSpacing: 1 }}>Space Grotesk</div>
          </div>
          <div style={{ flex: 1, background: BG3, borderRadius: 7, padding: '8px 9px', border: `1px solid ${W_XLO}` }}>
            <div style={{ fontSize: 4.5, letterSpacing: 1.5, color: W_LO, fontFamily: 'monospace', marginBottom: 4 }}>Mono</div>
            <div style={{ fontSize: 11, color: W_HI, fontFamily: 'monospace', lineHeight: 1.2 }}>Aa</div>
            <div style={{ fontSize: 4.5, color: G_STR, fontFamily: 'monospace', marginTop: 5, letterSpacing: 1 }}>Space Mono</div>
          </div>
        </div>

        {/* Business card + social row */}
        <div style={{ display: 'flex', gap: 8, animation: 'svcSlideUp 0.5s ease both 0.26s' }}>
          {/* Business card */}
          <div style={{ flex: 2, borderRadius: 8, background: `linear-gradient(145deg, #111000, #1e1800)`, border: `1px solid ${G_MID}`, padding: '8px 10px', boxShadow: `0 6px 20px rgba(0,0,0,0.6), 0 0 0 1px rgba(212,175,55,0.08)`, position: 'relative', overflow: 'hidden' }}>
            {/* Card texture line */}
            <div style={{ position: 'absolute', top: 0, right: 0, width: 40, height: 40, background: 'radial-gradient(circle, rgba(212,175,55,0.08) 0%, transparent 70%)' }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 6 }}>
              <div style={{ width: 18, height: 18, borderRadius: 4, background: `linear-gradient(135deg, ${G}, #8a6e1a)`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span style={{ fontSize: 9, color: '#000', fontFamily: 'Georgia, serif', fontStyle: 'italic', fontWeight: 700 }}>P</span>
              </div>
              <span style={{ fontSize: 6.5, fontWeight: 700, color: G, letterSpacing: 2, fontFamily: 'monospace' }}>PHARAONIX</span>
            </div>
            <div style={{ fontSize: 5.5, color: W_HI, fontFamily: 'monospace', marginBottom: 2 }}>Arjun Mehta</div>
            <div style={{ fontSize: 4.5, color: G_MID, fontFamily: 'monospace', marginBottom: 4 }}>Creative Director</div>
            <div style={{ height: 0.5, background: G_DIM, marginBottom: 4 }} />
            <div style={{ fontSize: 4, color: W_LO, fontFamily: 'monospace', lineHeight: 1.6 }}>
              <div>arjun@pharaonix.in</div>
              <div>+91 98765 43210</div>
            </div>
          </div>

          {/* Social squares */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 5 }}>
            {[
              { bg: 'linear-gradient(135deg,#1a1200,#3d2800)', label: 'Instagram' },
              { bg: 'linear-gradient(135deg,#070714,#14143a)', label: 'LinkedIn' },
            ].map((s, i) => (
              <div key={i} style={{ flex: 1, borderRadius: 6, background: s.bg, border: `1px solid ${W_XLO}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 3 }}>
                <div style={{ width: 18, height: 18, borderRadius: 4, background: G_DIM, border: `1px solid ${G_STR}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: G_MID }} />
                </div>
                <span style={{ fontSize: 4, color: W_LO, fontFamily: 'monospace', letterSpacing: 1 }}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   03 — AI AUTOMATION
   Realistic SaaS workflow builder — node graph, integrations,
   chat panel, live metrics.
══════════════════════════════════════════════════════════════ */

const AI_NODES = [
  { id: 'trigger',  x: 18,  y: 45,  label: 'Lead Form',    icon: '⚡', color: G },
  { id: 'crm',      x: 95,  y: 18,  label: 'CRM Sync',     icon: '⬡',  color: '#60a5fa' },
  { id: 'email',    x: 95,  y: 72,  label: 'Email Flow',   icon: '✉',  color: '#4ade80' },
  { id: 'ai',       x: 175, y: 45,  label: 'AI Qualifier', icon: '◈',  color: G },
  { id: 'slack',    x: 255, y: 18,  label: 'Slack Alert',  icon: '◉',  color: '#f59e0b' },
  { id: 'close',    x: 255, y: 72,  label: 'Close Deal',   icon: '✓',  color: '#34d399' },
];

const AI_EDGES = [
  ['trigger', 'crm'],
  ['trigger', 'email'],
  ['crm',     'ai'],
  ['email',   'ai'],
  ['ai',      'slack'],
  ['ai',      'close'],
];

function getNodeCenter(id: string) {
  const n = AI_NODES.find(n => n.id === id)!;
  return { x: n.x + 36, y: n.y + 14 };
}

function AINetworkGraph() {
  const animDurs = [2.4, 2.8, 3.1, 2.6, 3.3, 2.9];
  return (
    <svg width="100%" height="100%" viewBox="0 0 330 110" preserveAspectRatio="xMidYMid meet" style={{ overflow: 'visible' }}>
      <defs>
        <marker id="arrowG" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill={G} fillOpacity="0.5" />
        </marker>
        <marker id="arrowB" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="#60a5fa" fillOpacity="0.5" />
        </marker>
        <filter id="nodeGlow2">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Edges */}
      {AI_EDGES.map(([a, b], i) => {
        const s = getNodeCenter(a), e = getNodeCenter(b);
        const mx = (s.x + e.x) / 2;
        return (
          <g key={i}>
            <path d={`M${s.x},${s.y} C${mx},${s.y} ${mx},${e.y} ${e.x},${e.y}`}
              stroke={G} strokeWidth="0.8" fill="none" strokeOpacity="0.2"
              markerEnd="url(#arrowG)"
            />
            {/* Flowing dot */}
            <circle r="2" fill={G} opacity="0.9" filter="url(#nodeGlow2)">
              <animateMotion dur={`${animDurs[i]}s`} repeatCount="indefinite"
                path={`M${s.x},${s.y} C${mx},${s.y} ${mx},${e.y} ${e.x},${e.y}`}
              />
              <animate attributeName="opacity" values="0;1;1;0" dur={`${animDurs[i]}s`} repeatCount="indefinite" />
            </circle>
          </g>
        );
      })}

      {/* Node cards */}
      {AI_NODES.map((n, i) => (
        <g key={n.id} style={{ animation: `svcSlideUp 0.4s ease both ${i * 0.06}s` }}>
          {/* Card bg */}
          <rect x={n.x} y={n.y} width="72" height="28" rx="5"
            fill={BG3} stroke={n.color} strokeWidth="0.6" strokeOpacity="0.5" />
          {/* Icon circle */}
          <circle cx={n.x + 10} cy={n.y + 14} r="6" fill={n.color} fillOpacity="0.15" />
          <text x={n.x + 10} y={n.y + 17} textAnchor="middle" fontSize="6" fill={n.color} fontFamily="system-ui">{n.icon}</text>
          {/* Label */}
          <text x={n.x + 21} y={n.y + 11} fontSize="4.5" fill={W_HI} fontFamily="monospace" letterSpacing="0.5">{n.label}</text>
          {/* Status dot */}
          <circle cx={n.x + 21} cy={n.y + 19} r="2" fill="#4ade80">
            <animate attributeName="opacity" values="1;0.4;1" dur={`${1.5 + i * 0.3}s`} repeatCount="indefinite" />
          </circle>
          <text x={n.x + 25} y={n.y + 21.5} fontSize="4" fill="#4ade80" fontFamily="monospace" fillOpacity="0.8">Active</text>
          {/* Pulse ring */}
          <circle cx={n.x + 10} cy={n.y + 14} r="6" fill="none" stroke={n.color} strokeWidth="1" strokeOpacity="0">
            <animate attributeName="r" values="6;14" dur={`${2 + i * 0.4}s`} repeatCount="indefinite" begin={`${i * 0.3}s`} />
            <animate attributeName="stroke-opacity" values="0.6;0" dur={`${2 + i * 0.4}s`} repeatCount="indefinite" begin={`${i * 0.3}s`} />
          </circle>
        </g>
      ))}
    </svg>
  );
}

export function AIAutomationPreview() {
  const metrics = [
    { label: 'Leads Today',  val: '247', delta: '↑ 23%', color: '#4ade80' },
    { label: 'Emails Sent',  val: '1.2K', delta: '↑ 18%', color: '#60a5fa' },
    { label: 'Deals Closed', val: '14',   delta: '↑ 40%', color: G },
    { label: 'Uptime',       val: '99.9%', delta: '✓ Live', color: '#4ade80' },
  ];

  return (
    <div style={{ width: '100%', height: '100%', background: '#060610', display: 'flex', flexDirection: 'column', overflow: 'hidden', fontFamily: 'system-ui, sans-serif' }}>
      {/* Header */}
      <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '7px 12px', background: '#08081a', borderBottom: `1px solid rgba(255,255,255,0.06)` }}>
        <div>
          <div style={{ fontSize: 6.5, fontWeight: 700, color: W_HI, fontFamily: 'monospace', letterSpacing: 1 }}>Automation Studio</div>
          <div style={{ fontSize: 4.5, color: W_LO, fontFamily: 'monospace' }}>Lead Acquisition Workflow</div>
        </div>
        <div style={{ display: 'flex', gap: 5 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 3, background: 'rgba(74,222,128,0.1)', border: '1px solid rgba(74,222,128,0.3)', borderRadius: 20, padding: '2px 6px' }}>
            <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#4ade80', animation: 'svcPulse 1.5s ease-in-out infinite' }} />
            <span style={{ fontSize: 4.5, color: '#4ade80', fontFamily: 'monospace' }}>LIVE</span>
          </div>
          <div style={{ display: 'flex', gap: 3 }}>
            {['Edit','Run'].map(l => (
              <div key={l} style={{ background: W_XLO, borderRadius: 4, padding: '2px 6px', border: `1px solid ${W_XLO}` }}>
                <span style={{ fontSize: 4.5, color: W_MID, fontFamily: 'monospace' }}>{l}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Workflow canvas */}
      <div style={{ flex: 1, position: 'relative', background: `radial-gradient(ellipse at 50% 50%, rgba(212,175,55,0.02) 0%, transparent 70%), #060610`, backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)`, backgroundSize: '14px 14px' }}>
        <AINetworkGraph />
      </div>

      {/* Metrics footer */}
      <div style={{ flexShrink: 0, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 0, borderTop: `1px solid rgba(255,255,255,0.05)`, background: '#08081a' }}>
        {metrics.map((m, i) => (
          <div key={i} style={{ padding: '7px 10px', borderRight: i < 3 ? `1px solid rgba(255,255,255,0.05)` : 'none', animation: `svcNumberIn 0.5s ease both ${0.1 + i * 0.07}s` }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: m.color, fontFamily: 'monospace', lineHeight: 1, marginBottom: 2 }}>{m.val}</div>
            <div style={{ fontSize: 4, color: W_LO, fontFamily: 'monospace', marginBottom: 1 }}>{m.label}</div>
            <div style={{ fontSize: 4, color: m.color, fontFamily: 'monospace', opacity: 0.8 }}>{m.delta}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   04 — DIGITAL MARKETING
   Premium analytics dashboard — KPI cards, animated bar chart,
   campaign table, audience breakdown ring.
══════════════════════════════════════════════════════════════ */

const BAR_HEIGHTS = [42, 58, 35, 72, 88, 55, 78, 64, 95, 70];
const CAMPAIGNS = [
  { name: 'Diwali Sale 2024',  ch: 'Google', spend: '₹48K', roas: '4.2×', status: 'live'    },
  { name: 'Brand Awareness',   ch: 'Meta',   spend: '₹22K', roas: '2.8×', status: 'paused'  },
  { name: 'Retargeting Q4',    ch: 'Email',  spend: '₹8K',  roas: '6.1×', status: 'live'    },
];
const STATUS_COLORS: Record<string, string> = { live: '#4ade80', paused: '#f59e0b', ended: '#ef4444' };

export function DigitalMarketingPreview() {
  const kpis = [
    { label: 'Revenue',     val: '₹2.4L', delta: '+34%',   color: G      },
    { label: 'ROAS',        val: '3.2×',  delta: '+0.8',   color: '#60a5fa' },
    { label: 'CTR',         val: '4.7%',  delta: '+1.2pp', color: '#4ade80' },
    { label: 'Conversions', val: '1,284', delta: '+22%',   color: G      },
  ];

  return (
    <div style={{ width: '100%', height: '100%', background: '#07070f', display: 'flex', flexDirection: 'column', overflow: 'hidden', fontFamily: 'system-ui, sans-serif' }}>
      {/* Header */}
      <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '7px 12px', background: '#09090f', borderBottom: `1px solid rgba(255,255,255,0.06)` }}>
        <div>
          <div style={{ fontSize: 6.5, fontWeight: 700, color: W_HI, fontFamily: 'monospace', letterSpacing: 1 }}>Performance Dashboard</div>
          <div style={{ fontSize: 4.5, color: W_LO, fontFamily: 'monospace' }}>Q3 2024 · All Campaigns</div>
        </div>
        <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
          {['7D','30D','90D'].map((d, i) => (
            <div key={d} style={{ padding: '2px 6px', borderRadius: 4, background: i === 1 ? G : 'transparent', border: i === 1 ? 'none' : `1px solid ${W_XLO}` }}>
              <span style={{ fontSize: 4.5, color: i === 1 ? '#000' : W_LO, fontFamily: 'monospace', fontWeight: i === 1 ? 700 : 400 }}>{d}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ flex: 1, overflow: 'hidden', padding: '8px 12px', display: 'flex', flexDirection: 'column', gap: 7 }}>
        {/* KPI cards */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 5 }}>
          {kpis.map((k, i) => (
            <div key={i} style={{ background: BG3, border: `1px solid ${W_XLO}`, borderRadius: 7, padding: '6px 7px', animation: `svcNumberIn 0.5s ease both ${i * 0.07}s` }}>
              <div style={{ fontSize: 4.5, color: W_LO, fontFamily: 'monospace', marginBottom: 3, letterSpacing: 0.5 }}>{k.label}</div>
              <div style={{ fontSize: 10, fontWeight: 700, color: k.color, fontFamily: 'monospace', lineHeight: 1, marginBottom: 2 }}>{k.val}</div>
              <div style={{ fontSize: 4, color: '#4ade80', fontFamily: 'monospace' }}>{k.delta}</div>
            </div>
          ))}
        </div>

        {/* Chart + Audience row */}
        <div style={{ display: 'flex', gap: 7, flex: 1, minHeight: 0 }}>
          {/* Bar chart */}
          <div style={{ flex: 3, background: BG3, borderRadius: 8, border: `1px solid ${W_XLO}`, padding: '7px 9px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={{ fontSize: 4.5, color: W_MID, fontFamily: 'monospace' }}>Revenue Trend</span>
              <span style={{ fontSize: 4, color: G_STR, fontFamily: 'monospace' }}>₹ Monthly</span>
            </div>
            <div style={{ flex: 1, display: 'flex', alignItems: 'flex-end', gap: 3, minHeight: 0 }}>
              {BAR_HEIGHTS.map((h, i) => (
                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', height: '100%' }}>
                  <div style={{
                    width: '100%',
                    height: `${h}%`,
                    background: i === 8 ? G : i === 9 ? G_STR : 'rgba(212,175,55,0.25)',
                    borderRadius: '3px 3px 0 0',
                    transformOrigin: 'bottom',
                    animation: `svcBarGrow 0.6s ease-out both ${0.08 + i * 0.06}s`,
                    boxShadow: i === 8 ? `0 0 8px rgba(212,175,55,0.4)` : 'none',
                  }} />
                </div>
              ))}
            </div>
            {/* X-axis labels */}
            <div style={{ display: 'flex', gap: 3, marginTop: 4 }}>
              {['J','F','M','A','M','J','J','A','S','O'].map((l, i) => (
                <div key={i} style={{ flex: 1, textAlign: 'center', fontSize: 4, color: i >= 8 ? G_STR : W_XLO, fontFamily: 'monospace' }}>{l}</div>
              ))}
            </div>
          </div>

          {/* Audience ring */}
          <div style={{ flex: 2, background: BG3, borderRadius: 8, border: `1px solid ${W_XLO}`, padding: '7px 9px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: 4.5, color: W_MID, fontFamily: 'monospace', marginBottom: 6 }}>Audience</div>
            {/* SVG ring chart */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1 }}>
              <svg width="48" height="48" viewBox="0 0 36 36" style={{ flexShrink: 0 }}>
                {/* Background ring */}
                <circle cx="18" cy="18" r="14" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="4" />
                {/* Organic (52%) */}
                <circle cx="18" cy="18" r="14" fill="none" stroke={G} strokeWidth="4"
                  strokeDasharray="45.5 42.6" strokeDashoffset="22"
                  style={{ animation: 'svcRingGrow 0.8s ease-out both 0.1s', transformOrigin: '18px 18px' }}
                />
                {/* Paid (30%) */}
                <circle cx="18" cy="18" r="14" fill="none" stroke="#60a5fa" strokeWidth="4"
                  strokeDasharray="26.4 61.7" strokeDashoffset="66.5"
                  style={{ animation: 'svcRingGrow 0.8s ease-out both 0.25s', transformOrigin: '18px 18px' }}
                />
                {/* Social (18%) */}
                <circle cx="18" cy="18" r="14" fill="none" stroke="#4ade80" strokeWidth="4"
                  strokeDasharray="15.8 72.3" strokeDashoffset="40.1"
                  style={{ animation: 'svcRingGrow 0.8s ease-out both 0.4s', transformOrigin: '18px 18px' }}
                />
                <text x="18" y="18" textAnchor="middle" dominantBaseline="middle" fill={W_MID} fontSize="4.5" fontFamily="monospace">52%</text>
                <text x="18" y="23" textAnchor="middle" fill={W_LO} fontSize="3" fontFamily="monospace">organic</text>
              </svg>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {[{ c: G, l: 'Organic', v: '52%' }, { c: '#60a5fa', l: 'Paid', v: '30%' }, { c: '#4ade80', l: 'Social', v: '18%' }].map((s, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 3, animation: `svcFadeIn 0.4s ease both ${0.1 + i * 0.08}s` }}>
                    <div style={{ width: 5, height: 5, borderRadius: 1, background: s.c, flexShrink: 0 }} />
                    <span style={{ fontSize: 4, color: W_LO, fontFamily: 'monospace' }}>{s.l}</span>
                    <span style={{ fontSize: 4.5, color: W_MID, fontFamily: 'monospace', marginLeft: 2 }}>{s.v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Campaign table */}
        <div style={{ background: BG3, borderRadius: 8, border: `1px solid ${W_XLO}`, overflow: 'hidden', flexShrink: 0 }}>
          {/* Table header */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr', padding: '5px 9px', borderBottom: `1px solid ${W_XLO}`, background: '#0f0f1a' }}>
            {['Campaign','Channel','Spend','ROAS','Status'].map(h => (
              <span key={h} style={{ fontSize: 4, color: W_LO, fontFamily: 'monospace', letterSpacing: 0.5 }}>{h}</span>
            ))}
          </div>
          {CAMPAIGNS.map((c, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr', padding: '5px 9px', borderBottom: i < 2 ? `1px solid ${W_XLO}` : 'none', animation: `svcSlideUp 0.4s ease both ${i * 0.07}s` }}>
              <span style={{ fontSize: 4.5, color: W_MID, fontFamily: 'monospace', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.name}</span>
              <span style={{ fontSize: 4.5, color: W_LO, fontFamily: 'monospace' }}>{c.ch}</span>
              <span style={{ fontSize: 4.5, color: W_MID, fontFamily: 'monospace' }}>{c.spend}</span>
              <span style={{ fontSize: 4.5, color: G, fontFamily: 'monospace' }}>{c.roas}</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <div style={{ width: 4, height: 4, borderRadius: '50%', background: STATUS_COLORS[c.status] }} />
                <span style={{ fontSize: 4, color: STATUS_COLORS[c.status], fontFamily: 'monospace', textTransform: 'capitalize' }}>{c.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Default export: pick by id ── */
export default function ServicePreview({ id }: { id: string }) {
  if (id === '01') return <WebDesignPreview />;
  if (id === '02') return <BrandIdentityPreview />;
  if (id === '03') return <AIAutomationPreview />;
  if (id === '04') return <DigitalMarketingPreview />;
  return null;
}

/* ── CSS keyframes injected once ── */
export function ServicePreviewStyles() {
  return (
    <style>{`
      /* ─ Scroll animations ─ */
      @keyframes svcScrollSite {
        0%   { transform: translateY(0); }
        100% { transform: translateY(-50%); }
      }
      .svc-scroll-site {
        animation: svcScrollSite 18s linear infinite;
        will-change: transform;
      }
      .svc-scroll-site:hover { animation-play-state: paused; }

      /* ─ Entrance animations ─ */
      @keyframes svcSlideUp {
        from { opacity: 0; transform: translateY(8px); }
        to   { opacity: 1; transform: translateY(0);   }
      }
      @keyframes svcFadeIn {
        from { opacity: 0; }
        to   { opacity: 1; }
      }
      @keyframes svcNumberIn {
        from { opacity: 0; transform: translateY(5px) scale(0.95); }
        to   { opacity: 1; transform: translateY(0)   scale(1);    }
      }

      /* ─ Bar chart growth ─ */
      @keyframes svcBarGrow {
        from { transform: scaleY(0); opacity: 0.3; }
        to   { transform: scaleY(1); opacity: 1;   }
      }

      /* ─ Ring chart ─ */
      @keyframes svcRingGrow {
        from { stroke-dashoffset: 88; opacity: 0; }
      }

      /* ─ Node pulse ─ */
      @keyframes svcPulse {
        0%, 100% { opacity: 1;   transform: scale(1);   }
        50%       { opacity: 0.5; transform: scale(1.2); }
      }

      /* ─ CTA glow ─ */
      @keyframes svcBtnGlow {
        0%, 100% { box-shadow: 0 4px 12px rgba(212,175,55,0.25); }
        50%       { box-shadow: 0 4px 22px rgba(212,175,55,0.55); }
      }
    `}</style>
  );
}
