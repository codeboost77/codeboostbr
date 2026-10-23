import { useEffect, useRef, useState } from 'react';
import { MessageCircle, Search, Palette, Rocket, ArrowRight } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const STEPS = [
  {
    icon: MessageCircle,
    title: 'Conversa',
    desc: 'A gente conversa sobre o seu negócio, seus objetivos e seus desafios. Sem compromisso, sem pressão.',
    delivers: 'Você sai com clareza sobre os próximos passos, mesmo se não fechar com a gente.',
  },
  {
    icon: Search,
    title: 'Entendimento',
    desc: 'Mergulhamos no seu público, seus concorrentes e sua mensagem. Entendemos o que faz o seu cliente comprar.',
    delivers: 'Uma estratégia clara de como o site vai funcionar para vender por você.',
  },
  {
    icon: Palette,
    title: 'Criação',
    desc: 'Aí sim a gente coloca a mão na massa. Design, copy, programação — tudo pensado para converter.',
    delivers: 'Um site pronto, bonito e funcional, revisado e testado em celular e computador.',
  },
  {
    icon: Rocket,
    title: 'Lançamento e acompanhamento',
    desc: 'Colocamos no ar e ficamos de olho. Acompanhamos os primeiros dias para garantir que tudo funciona.',
    delivers: 'Seu site no ar, rodando, e suporte para ajustes nos primeiros 30 dias.',
  },
];

export default function HowWeWork() {
  const ref = useScrollReveal<HTMLDivElement>();
  const sectionRef = useRef<HTMLElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const onScroll = () => {
      const rect = section.getBoundingClientRect();
      const viewportH = window.innerHeight;
      const totalScroll = rect.height - viewportH;

      if (rect.top <= viewportH * 0.3 && rect.bottom >= viewportH * 0.3) {
        const scrolled = viewportH * 0.3 - rect.top;
        const rawProgress = Math.max(0, Math.min(1, scrolled / totalScroll));
        setProgress(rawProgress);

        const stepIndex = Math.min(
          STEPS.length - 1,
          Math.floor(rawProgress * STEPS.length)
        );
        setActiveStep(stepIndex);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const ActiveIcon = STEPS[activeStep].icon;

  const scrollToContact = () => {
    const el = document.querySelector('#contato');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={sectionRef}
      id="como-trabalhamos"
      className="section-padding relative"
      style={{ background: 'var(--bg-secondary)' }}
    >
      <div ref={ref} className="max-w-7xl mx-auto">
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <p className="reveal text-sm font-semibold text-pastel-lilac mb-4 uppercase tracking-widest">
            Como trabalhamos
          </p>
          <h2 className="reveal heading-lg mb-6" data-delay="80">
            Do primeiro oi ao <span className="text-gradient">site no ar</span>
          </h2>
          <p className="reveal text-text-secondary text-lg" data-delay="160">
            Um caminho claro e sem complicação, do começo ao fim. Você sempre sabe onde estamos e o que vem depois.
          </p>
        </div>

        <div className="grid lg:grid-cols-[300px_1fr] gap-8 lg:gap-16">
          {/* Step list + progress line */}
          <div className="relative">
            {/* Vertical progress track */}
            <div
              className="absolute left-[19px] top-2 bottom-2 w-[2px] rounded-full"
              style={{ background: 'rgba(255,255,255,0.08)' }}
            >
              <div
                className="step-progress-fill absolute top-0 left-0 w-full rounded-full"
                style={{ height: `${progress * 100}%` }}
              />
            </div>

            <div className="flex flex-col gap-6">
              {STEPS.map((step, i) => {
                const Icon = step.icon;
                const isActive = i === activeStep;
                const isDone = i < activeStep;
                return (
                  <button
                    key={step.title}
                    onClick={() => {
                      const section = sectionRef.current;
                      if (!section) return;
                      const targetY = section.offsetTop + (i / STEPS.length) * (section.offsetHeight - window.innerHeight) + 50;
                      window.scrollTo({ top: targetY, behavior: 'smooth' });
                    }}
                    className="flex items-center gap-4 text-left group"
                  >
                    <div
                      className="flex items-center justify-center w-10 h-10 rounded-full flex-shrink-0 transition-all duration-500"
                      style={{
                        background: isActive || isDone ? 'var(--grad-pastel)' : 'rgba(18, 18, 20, 0.9)',
                        border: isActive || isDone ? 'none' : '1px solid var(--border-glass)',
                        transform: isActive ? 'scale(1.15)' : 'scale(1)',
                      }}
                    >
                      <Icon
                        size={18}
                        color={isActive || isDone ? '#ffffff' : 'var(--text-secondary)'}
                        strokeWidth={2}
                      />
                    </div>
                    <div>
                      <p
                        className="font-display font-semibold text-base transition-colors duration-300"
                        style={{ color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)' }}
                      >
                        {step.title}
                      </p>
                      <p className="text-xs text-text-muted">Etapa {i + 1} de {STEPS.length}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Content panel with crossfade */}
          <div className="relative min-h-[340px]">
            <div
              key={activeStep}
              className="step-panel step-panel-enter glass-card p-8 lg:p-10"
              style={{ animation: 'none' }}
            >
              <div
                className="flex items-center justify-center w-16 h-16 rounded-2xl mb-6"
                style={{ background: 'rgba(255, 0, 0, 0.1)' }}
              >
                <ActiveIcon size={28} className="text-pastel-lilac" />
              </div>

              <h3 className="heading-md mb-4">{STEPS[activeStep].title}</h3>
              <p className="text-text-secondary text-lg mb-8 prose-narrow" style={{ lineHeight: 1.7 }}>
                {STEPS[activeStep].desc}
              </p>

              <div
                className="rounded-2xl p-5"
                style={{ background: 'rgba(128, 0, 32, 0.12)', border: '1px solid rgba(255, 0, 0, 0.22)' }}
              >
                <p className="text-sm text-pastel-mint font-semibold mb-1">O que você recebe</p>
                <p className="text-text-secondary text-sm" style={{ lineHeight: 1.6 }}>
                  {STEPS[activeStep].delivers}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA after steps */}
        <div className="reveal text-center mt-16" data-delay="100">
          <p className="text-text-secondary mb-5 text-lg">
            Pronto para começar pela primeira etapa?
          </p>
          <button onClick={scrollToContact} className="btn-primary">
            Agendar uma conversa
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
