import { useRef } from 'react';
import {
  Rocket,
  ShoppingCart,
  Building2,
  Mail,
  Wrench,
  ArrowRight,
} from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const SERVICES = [
  {
    icon: Rocket,
    title: 'Páginas de venda e landing pages',
    desc: 'Páginas únicas criadas para converter visitantes em clientes, com copy persuasiva e design que conduz à ação.',
    forWho: 'Para quem tem um produto ou serviço para divulgar',
  },
  {
    icon: ShoppingCart,
    title: 'Lojas virtuais',
    desc: 'E-commerces completos e fáceis de gerenciar, prontos para receber pedidos e vender no automático.',
    forWho: 'Para quem quer vender produtos pela internet',
  },
  {
    icon: Building2,
    title: 'Sites institucionais e portfólios',
    desc: 'Sites que transmitem credibilidade e mostram o seu trabalho de forma profissional e organizada.',
    forWho: 'Para quem precisa transmitir confiança e autoridade',
  },
  {
    icon: Mail,
    title: 'Páginas de captura de contatos',
    desc: 'Páginas focadas em coletar contatos de potenciais clientes para nutrir e converter depois.',
    forWho: 'Para quem quer construir uma lista de interessados',
  },
  {
    icon: Wrench,
    title: 'Otimização de sites existentes',
    desc: 'Avaliamos o seu site atual e melhoramos o que precisa para ele vender mais e carregar mais rápido.',
    forWho: 'Para quem já tem um site que não está trazendo resultado',
  },
];

function ServiceCard({
  service,
  index,
}: {
  service: (typeof SERVICES)[number];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const Icon = service.icon;

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  };

  return (
    <div
      ref={cardRef}
      className="reveal glass-card card-glow p-7 flex flex-col"
      data-delay={`${(index % 3) * 100}`}
      onMouseMove={onMouseMove}
    >
      <div
        className="flex items-center justify-center w-14 h-14 rounded-2xl mb-5"
        style={{ background: 'rgba(255, 0, 0, 0.1)' }}
      >
        <Icon size={26} className="text-pastel-lilac" />
      </div>
      <h3 className="heading-sm mb-3">{service.title}</h3>
      <p className="text-text-secondary text-sm mb-4 flex-1" style={{ lineHeight: 1.6 }}>
        {service.desc}
      </p>
      <div className="pt-4 border-t" style={{ borderColor: 'var(--border-glass)' }}>
        <p className="text-xs text-text-muted">
          <span className="text-pastel-mint font-medium">Indicado para:</span>{' '}
          {service.forWho}
        </p>
      </div>
    </div>
  );
}

export default function Services() {
  const ref = useScrollReveal<HTMLElement>();

  const scrollToContact = () => {
    const el = document.querySelector('#contato');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={ref}
      id="servicos"
      className="section-padding relative"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <p className="reveal text-sm font-semibold text-pastel-lilac mb-4 uppercase tracking-widest">
            Serviços
          </p>
          <h2 className="reveal heading-lg mb-6" data-delay="80">
            O que a gente <span className="text-gradient">cria para você</span>
          </h2>
          <p className="reveal text-text-secondary text-lg" data-delay="160">
            Cada projeto é feito sob medida, pensado para o seu negócio e o seu público. Veja como podemos ajudar.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </div>

        {/* CTA after services */}
        <div className="reveal text-center mt-12" data-delay="200">
          <p className="text-text-secondary mb-5 text-lg">
            Não sabe qual é o ideal para você? A gente ajuda a descobrir.
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
