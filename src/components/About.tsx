import { Eye, Handshake, TrendingUp } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const VALUES = [
  {
    icon: Eye,
    title: 'Clareza',
    desc: 'A gente explica tudo em linguagem simples. Você entende cada decisão, sem termos técnicos.',
  },
  {
    icon: Handshake,
    title: 'Parceria',
    desc: 'Não somos uma fábrica de sites. Somos parceiros que querem ver o seu negócio crescer.',
  },
  {
    icon: TrendingUp,
    title: 'Resultado',
    desc: 'Cada detalhe é pensado para converter visitantes em clientes. Beleza que vende.',
  },
];

export default function About() {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      id="quem-somos"
      className="section-padding relative"
      style={{ background: 'var(--bg-secondary)' }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <div>
            <p className="reveal text-sm font-semibold text-pastel-lilac mb-4 uppercase tracking-widest">
              Quem somos
            </p>
            <h2 className="reveal heading-lg mb-6" data-delay="80">
              Uma parceira que entende <span className="text-gradient">o seu negócio</span> antes de propor qualquer coisa
            </h2>
            <div className="reveal prose-narrow text-text-secondary text-lg" data-delay="160" style={{ lineHeight: 1.8 }}>
              <p className="mb-4">
                A codeboost nasceu de uma ideia simples: empreendedores não precisam de mais um site bonito que não traz resultado. Precisam de páginas que funcionam como vendedores incansáveis, 24 horas por dia.
              </p>
              <p>
                Por isso, antes de qualquer linha de código, a gente senta com você para entender o seu negócio, o seu público e os seus objetivos. Só depois a gente começa a criar. É assim que entregamos sites que não só aparecem — vendem.
              </p>
            </div>
          </div>

          <div className="grid gap-4">
            {VALUES.map((value, i) => {
              const Icon = value.icon;
              return (
                <div
                  key={value.title}
                  className="reveal glass-card p-6 flex items-start gap-4"
                  data-delay={`${i * 100}`}
                >
                  <div
                    className="flex items-center justify-center w-12 h-12 rounded-xl flex-shrink-0"
                    style={{ background: 'rgba(255, 0, 0, 0.12)' }}
                  >
                    <Icon size={22} className="text-pastel-lilac" />
                  </div>
                  <div>
                    <h3 className="heading-sm mb-1">{value.title}</h3>
                    <p className="text-text-secondary text-sm" style={{ lineHeight: 1.6 }}>{value.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
