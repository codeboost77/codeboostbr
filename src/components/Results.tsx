import { useState, useEffect, useRef } from 'react';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useCountUp } from '@/hooks/useCountUp';

// ── TROQUE AQUI pelos seus números reais ──
const STATS = [
  { value: 47, suffix: '+', label: 'Projetos entregues' },
  { value: 92, suffix: '%', label: 'Clientes que voltaram' },
  { value: 30, suffix: ' dias', label: 'Acompanhamento após entrega' },
  { value: 100, suffix: '%', label: 'Mobile-first' },
];

// ── TROQUE AQUI pelos depoimentos reais (marque como exemplo) ──
const TESTIMONIALS = [
  {
    name: 'Mariana Costa',
    role: 'Artesã — Ateliê Mari Costa',
    text: 'A Code Boost entendeu meu negócio melhor do que eu mesma. Minhas vendas online triplicaram em dois meses depois do novo site.',
    isExample: true,
  },
  {
    name: 'Rafael Lima',
    role: 'Personal trainer — RL Fitness',
    text: 'Eu não entendia nada de tecnologia. Eles explicaram tudo de um jeito que eu conseguia seguir. Site lindo e funcional.',
    isExample: true,
  },
  {
    name: 'Juliana Reis',
    role: 'Confeitaria — Doce Lar',
    text: 'O site que eles fizeram virou minha principal ferramenta de vendas. Recebo pedidos todo dia pelo site, sem precisar de plataforma.',
    isExample: true,
  },
];

function StatItem({ stat }: { stat: (typeof STATS)[number] }) {
  const { count, ref } = useCountUp(stat.value);

  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} className="text-center">
      <div className="heading-lg text-gradient mb-1">
        {count}{stat.suffix}
      </div>
      <p className="text-text-secondary text-sm">{stat.label}</p>
    </div>
  );
}

export default function Results() {
  const ref = useScrollReveal<HTMLElement>();
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  const next = () => setActiveTestimonial((v) => (v + 1) % TESTIMONIALS.length);
  const prev = () => setActiveTestimonial((v) => (v - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);

  useEffect(() => {
    const interval = setInterval(next, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      ref={ref}
      id="resultados"
      className="section-padding relative"
      style={{ background: 'var(--bg-secondary)' }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <p className="reveal text-sm font-semibold text-pastel-lilac mb-4 uppercase tracking-widest">
            Resultados
          </p>
          <h2 className="reveal heading-lg mb-6" data-delay="80">
            Números que falam <span className="text-gradient">por si</span>
          </h2>
          <p className="reveal text-text-secondary text-lg" data-delay="160">
            A gente mede o sucesso pela diferença que faz no seu negócio, não pela quantidade de sites entregues.
          </p>
        </div>

        {/* Stats */}
        <div className="reveal grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20" data-delay="100">
          {STATS.map((stat) => (
            <StatItem key={stat.label} stat={stat} />
          ))}
        </div>

        {/* Testimonials */}
        <div className="reveal" data-delay="150">
          <h3 className="heading-md text-center mb-12">O que dizem sobre a gente</h3>

          <div className="relative max-w-3xl mx-auto">
            <div className="overflow-hidden">
              <div
                ref={trackRef}
                className="testimonial-track"
                style={{ transform: `translateX(-${activeTestimonial * 100}%)` }}
              >
                {TESTIMONIALS.map((t) => (
                  <div key={t.name} className="w-full flex-shrink-0 px-1">
                    <div className="glass-card p-8 lg:p-10">
                      <Quote size={32} className="text-pastel-lilac mb-4 opacity-60" />
                      {t.isExample && (
                        <span
                          className="inline-block text-xs px-2 py-1 rounded-full mb-4"
                          style={{ background: 'rgba(255, 227, 207, 0.12)', color: 'var(--pastel-peach)' }}
                        >
                          Exemplo — substitua pelo depoimento real
                        </span>
                      )}
                      <p className="text-text-primary text-lg mb-6 font-display italic" style={{ lineHeight: 1.7 }}>
                        "{t.text}"
                      </p>
                      <div className="flex items-center gap-3">
                        <div
                          className="w-12 h-12 rounded-full flex items-center justify-center font-display font-bold text-sm"
                          style={{ background: 'var(--grad-pastel-soft)', color: '#1A1530' }}
                        >
                          {t.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                        </div>
                        <div>
                          <p className="font-semibold text-sm">{t.name}</p>
                          <p className="text-xs text-text-muted">{t.role}</p>
                        </div>
                        <div className="ml-auto flex gap-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star key={i} size={14} className="text-pastel-peach" fill="currentColor" />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                onClick={prev}
                className="flex items-center justify-center w-10 h-10 rounded-full glass-card"
                aria-label="Depoimento anterior"
              >
                <ChevronLeft size={20} className="text-text-secondary" />
              </button>
              <div className="flex gap-2">
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveTestimonial(i)}
                    className="rounded-full transition-all duration-300"
                    style={{
                      width: i === activeTestimonial ? '24px' : '8px',
                      height: '8px',
                      background: i === activeTestimonial ? 'var(--grad-pastel)' : 'rgba(255,255,255,0.15)',
                    }}
                    aria-label={`Ir para depoimento ${i + 1}`}
                  />
                ))}
              </div>
              <button
                onClick={next}
                className="flex items-center justify-center w-10 h-10 rounded-full glass-card"
                aria-label="Próximo depoimento"
              >
                <ChevronRight size={20} className="text-text-secondary" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
