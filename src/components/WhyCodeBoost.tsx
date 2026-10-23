import { Palette, Smartphone, Heart, MessageSquareText } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const DIFFERENTIALS = [
  {
    icon: Palette,
    title: 'Design pensado para vender',
    desc: 'Cada cor, cada palavra, cada botão tem um propósito: fazer o visitante virar cliente. Beleza não é enfeio — é estratégia.',
  },
  {
    icon: Smartphone,
    title: 'Foco no celular',
    desc: 'A maioria dos seus clientes vai acessar pelo celular. Por isso, todo site é mobile-first: perfeito na tela pequena desde o começo.',
  },
  {
    icon: Heart,
    title: 'Acompanhamento depois da entrega',
    desc: 'Não entregamos e desaparecemos. A gente fica disponível para ajustes e dúvidas nos primeiros 30 dias após o lançamento.',
  },
  {
    icon: MessageSquareText,
    title: 'Comunicação simples',
    desc: 'A gente fala como gente. Sem termos técnicos, sem rodeios. Você entende o que está acontecendo em cada etapa do projeto.',
  },
];

export default function WhyCodeBoost() {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section ref={ref} id="por-que" className="section-padding relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <p className="reveal text-sm font-semibold text-pastel-lilac mb-4 uppercase tracking-widest">
            Por que a Code Boost
          </p>
          <h2 className="reveal heading-lg mb-6" data-delay="80">
            Diferenciais que fazem a <span className="text-gradient">diferença</span>
          </h2>
          <p className="reveal text-text-secondary text-lg" data-delay="160">
            Existem muitos sites por aí. O seu precisa ser diferente — e melhor.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {DIFFERENTIALS.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="reveal glass-card p-8 flex flex-col gap-4"
                data-delay={`${i * 100}`}
              >
                <div
                  className="flex items-center justify-center w-14 h-14 rounded-2xl"
                  style={{ background: 'rgba(255, 0, 0, 0.1)' }}
                >
                  <Icon size={26} className="text-pastel-lilac" />
                </div>
                <h3 className="heading-sm">{item.title}</h3>
                <p className="text-text-secondary text-sm" style={{ lineHeight: 1.7 }}>
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
