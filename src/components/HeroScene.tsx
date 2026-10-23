import { useEffect, useRef, useState } from 'react';
import { Code2, BarChart3 } from 'lucide-react';

/* ---------- símbolos de código flutuando ---------- */
const SYMBOLS = [
  { s: '</>', l: 6, size: 22, dur: 11, delay: 0 },
  { s: '{ }', l: 20, size: 18, dur: 13, delay: 2 },
  { s: '[ ]', l: 34, size: 26, dur: 12, delay: 5 },
  { s: '=>', l: 48, size: 18, dur: 10, delay: 1 },
  { s: '↑', l: 60, size: 28, dur: 9, delay: 3.5 },
  { s: '< >', l: 72, size: 20, dur: 14, delay: 6 },
  { s: '( )', l: 84, size: 18, dur: 11, delay: 4 },
  { s: '++', l: 92, size: 16, dur: 12, delay: 7.5 },
  { s: '{ ↑ }', l: 12, size: 16, dur: 15, delay: 8 },
  { s: '[0]', l: 55, size: 16, dur: 13, delay: 9 },
];

function FloatingSymbols() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-visible" aria-hidden="true">
      {SYMBOLS.map((x, i) => (
        <span
          key={i}
          className="float-sym"
          style={{ left: `${x.l}%`, fontSize: x.size, animationDuration: `${x.dur}s`, animationDelay: `${x.delay}s` }}
        >
          {x.s}
        </span>
      ))}
    </div>
  );
}

/* ---------- efeito de digitação em loop ---------- */
const CODE = ['> build()', '> learn()', '> grow()', '> return success();'];
function useTyping(lines: string[]) {
  const full = lines.join('\n');
  const [n, setN] = useState(0);
  useEffect(() => {
    const done = n >= full.length;
    const t = setTimeout(() => setN(done ? 0 : n + 1), done ? 2600 : full[n] === '\n' ? 260 : 75);
    return () => clearTimeout(t);
  }, [n, full]);
  return full.slice(0, n);
}

/* ---------- contador de crescimento em loop ---------- */
function useLoopCount(target: number, cycle = 6000, rise = 2600) {
  const [v, setV] = useState(0);
  useEffect(() => {
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = (now - start) % cycle;
      const p = Math.min(t / rise, 1);
      setV(Math.round((1 - Math.pow(1 - p, 3)) * target));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, cycle, rise]);
  return v;
}

/* ---------- robô Boost ---------- */
const MESSAGES = ['Oi! Eu sou o Boost 🚀', 'Bora construir seu site?', 'Seu negócio pode crescer!', 'Vamos conversar? 💬'];

function BoostRobot({ eyesRef }: { eyesRef: React.RefObject<SVGGElement> }) {
  return (
    <svg viewBox="0 0 130 170" className="w-full h-full overflow-visible" aria-label="Boost, o robô da Codeboost" role="img">
      <defs>
        <linearGradient id="bodyG" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#2a2a2f" />
          <stop offset="1" stopColor="#101012" />
        </linearGradient>
        <linearGradient id="flameG" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ff4d55" />
          <stop offset="1" stopColor="#800020" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* chama do propulsor ("boost") */}
      <g className="robot-flame">
        <path d="M50 138 Q55 172 60 138Z" fill="url(#flameG)" />
        <path d="M70 138 Q75 172 80 138Z" fill="url(#flameG)" />
      </g>

      {/* antena */}
      <line x1="65" y1="26" x2="65" y2="12" stroke="#b7b7bc" strokeWidth="3" strokeLinecap="round" />
      <circle cx="65" cy="9" r="5" fill="#ff0000" className="robot-antenna" />

      {/* braço esquerdo */}
      <rect x="18" y="82" width="12" height="34" rx="6" fill="#1b1b1f" stroke="#ffffff22" />
      {/* braço direito (acenando) */}
      <g className="robot-wave" style={{ transformOrigin: '106px 86px' }}>
        <rect x="100" y="52" width="12" height="38" rx="6" fill="#1b1b1f" stroke="#ffffff22" />
        <circle cx="106" cy="50" r="7" fill="#ff0000" />
      </g>

      {/* corpo */}
      <rect x="30" y="76" width="70" height="64" rx="16" fill="url(#bodyG)" stroke="#ffffff30" />
      {/* logo no peito: < ↑ > */}
      <g transform="translate(46 94) scale(.9)" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.6">
        <path d="M8 2 1 12l7 10" stroke="#fff" />
        <path d="m22 2 7 10-7 10" stroke="#fff" />
        <path d="M15 20V4m0 0-4 5m4-5 4 5" stroke="#ff0000" className="robot-chest" />
      </g>

      {/* cabeça */}
      <rect x="24" y="26" width="82" height="56" rx="20" fill="url(#bodyG)" stroke="#ffffff40" />
      <rect x="33" y="36" width="64" height="34" rx="14" fill="#050505" stroke="#800020" />
      {/* olhos (seguem o mouse) */}
      <g ref={eyesRef} style={{ transition: 'transform .12s ease-out' }}>
        <g className="robot-eye" style={{ transformOrigin: '52px 53px' }}>
          <circle cx="52" cy="53" r="6.5" fill="#ff0000" />
          <circle cx="50" cy="51" r="2" fill="#fff" />
        </g>
        <g className="robot-eye" style={{ transformOrigin: '78px 53px' }}>
          <circle cx="78" cy="53" r="6.5" fill="#ff0000" />
          <circle cx="76" cy="51" r="2" fill="#fff" />
        </g>
      </g>
      {/* bochechas */}
      <circle cx="40" cy="64" r="2.5" fill="#ff4d55" opacity=".6" />
      <circle cx="90" cy="64" r="2.5" fill="#ff4d55" opacity=".6" />
      {/* orelhas */}
      <rect x="17" y="42" width="8" height="22" rx="4" fill="#800020" />
      <rect x="105" y="42" width="8" height="22" rx="4" fill="#800020" />
    </svg>
  );
}

/* ---------- cena principal ---------- */
export default function HeroScene() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const eyesRef = useRef<SVGGElement>(null);
  const robotRef = useRef<HTMLDivElement>(null);
  const [msg, setMsg] = useState(0);
  const typed = useTyping(CODE);
  const growth = useLoopCount(184);

  // mensagens do robô
  useEffect(() => {
    const id = setInterval(() => setMsg((m) => (m + 1) % MESSAGES.length), 3400);
    return () => clearInterval(id);
  }, []);

  // inclinação 3D da cena + olhos do robô seguem o mouse
  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const onMove = (e: MouseEvent) => {
      const nx = e.clientX / window.innerWidth - 0.5;
      const ny = e.clientY / window.innerHeight - 0.5;
      if (sceneRef.current) sceneRef.current.style.transform = `perspective(1100px) rotateY(${nx * 9}deg) rotateX(${-ny * 7}deg)`;
      const r = robotRef.current?.getBoundingClientRect();
      if (r && eyesRef.current) {
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 3);
        const d = Math.hypot(dx, dy) || 1;
        const k = Math.min(d / 200, 1) * 5;
        eyesRef.current.style.transform = `translate(${(dx / d) * k}px, ${(dy / d) * k}px)`;
      }
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <div className="relative w-full max-w-[520px] h-[460px] mx-auto origin-top scale-[.72] -mb-28 sm:scale-100 sm:mb-0">
      <FloatingSymbols />

      <div ref={sceneRef} className="absolute inset-0" style={{ transition: 'transform .25s ease-out', transformStyle: 'preserve-3d' }}>
        {/* painel principal */}
        <div className="absolute inset-x-4 top-8 bottom-4 rounded-xl border border-white/10 bg-[#101012] shadow-2xl rotate-[-3deg] overflow-hidden scan-panel">
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
            <div className="flex gap-1.5"><i className="w-2 h-2 rounded-full bg-[#800020]" /><i className="w-2 h-2 rounded-full bg-[#ff0000]" /><i className="w-2 h-2 rounded-full bg-white/30" /></div>
            <span className="code-line text-[9px]">build › learn › grow</span>
          </div>
          <div className="p-7 md:p-10">
            <div className="code-line mb-5">&gt; performance_report<span className="caret" /></div>
            <div className="h-6 w-3/4 rounded bg-white/10 mb-4 shimmer" />
            <div className="h-3 w-full rounded bg-white/5 mb-2 shimmer" />
            <div className="h-3 w-5/6 rounded bg-white/5 mb-6 shimmer" />

            {/* gráfico: barras crescendo + linha com seta */}
            <div className="relative h-32 border-b border-white/10 px-3">
              <div className="absolute inset-x-3 bottom-0 flex items-end gap-2 h-full">
                {['#800020', '#990027', '#bb0030', '#df0038', '#ff0000'].map((c, i) => (
                  <div key={c} className="w-1/6 rounded-t bar-grow" style={{ height: `${25 + i * 18}%`, background: c, animationDelay: `${i * 0.18}s` }} />
                ))}
              </div>
              <svg className="absolute inset-0 w-full h-full overflow-visible" viewBox="0 0 300 128" preserveAspectRatio="none" aria-hidden="true">
                <path className="line-draw" d="M10 110 C50 100 70 84 105 78 S160 56 190 40 S250 14 285 8" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
                <g className="arrow-tip">
                  <path d="M272 22 L287 7 L267 9 M287 7 L285 27" fill="none" stroke="#ff0000" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </g>
              </svg>
            </div>
            <div className="flex justify-between text-[10px] text-white/40 mt-3"><span>jan</span><span>fev</span><span>mar</span><span>abr</span><span>mai</span></div>
          </div>
        </div>

        {/* card de crescimento */}
        <div className="absolute right-0 top-0" style={{ transform: 'rotate(6deg)' }}>
          <div className="float-card w-48 p-5 preview-card">
            <div className="flex items-center gap-2 mb-4"><BarChart3 size={17} className="text-[#ff0000]" /><span className="text-xs text-text-secondary">Crescimento</span></div>
            <div className="text-3xl font-bold tabular-nums">+{growth}<span className="text-[#ff0000]">%</span></div>
            <div className="text-[10px] text-text-muted mt-1">conversões este mês</div>
          </div>
        </div>

        {/* card de código digitando */}
        <div className="absolute left-0 bottom-4" style={{ transform: 'rotate(-5deg)' }}>
          <div className="float-card-delayed w-52 p-4 preview-card">
            <div className="flex items-center gap-2 mb-3"><Code2 size={16} className="text-[#ff0000]" /><span className="text-xs text-text-secondary">codeboost</span></div>
            <pre className="code-line text-[10px] leading-loose whitespace-pre min-h-[5.2em] normal-case tracking-[.14em]">{typed}<span className="caret" /></pre>
          </div>
        </div>

        {/* robô Boost */}
        <div ref={robotRef} className="absolute right-2 bottom-0 w-[118px] h-[154px] robot-float" style={{ transform: 'translateZ(40px)' }}>
          <div key={msg} className="robot-bubble" role="status">{MESSAGES[msg]}</div>
          <BoostRobot eyesRef={eyesRef} />
          <div className="robot-shadow" />
        </div>
      </div>
    </div>
  );
}
