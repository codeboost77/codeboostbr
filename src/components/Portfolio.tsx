import { useScrollReveal } from '@/hooks/useScrollReveal';

// ── TROQUE AQUI pelos seus cases reais ──
// As cores dos gradientes são apenas decorativas (SVG), sem imagens externas.
const PROJECTS = [
  {
    title: 'Ateliê Mari Costa',
    type: 'Loja virtual',
    result: '+200% nas vendas online',
    grad: 'linear-gradient(135deg, #800020, #ff0000)',
  },
  {
    title: 'RL Fitness',
    type: 'Landing page',
    result: '3x mais agendamentos',
    grad: 'linear-gradient(135deg, #5e0018, #b9002d)',
  },
  {
    title: 'Doce Lar Confeitaria',
    type: 'Site institucional + pedidos',
    result: 'Pedidos diários no automático',
    grad: 'linear-gradient(135deg, #ff0000, #8b001f)',
  },
  {
    title: 'Consultoria Fernanda',
    type: 'Página de captura',
    result: 'Lista de 500+ contatos',
    grad: 'linear-gradient(135deg, #2b0b12, #800020)',
  },
  {
    title: 'Studio Makena',
    type: 'Portfólio',
    result: 'Agenda cheia em 2 meses',
    grad: 'linear-gradient(135deg, #3a0b13, #c50030)',
  },
  {
    title: 'Empório Natural',
    type: 'Loja virtual',
    result: 'Ticket médio 40% maior',
    grad: 'linear-gradient(135deg, #990026, #27090e)',
  },
];

function PortfolioItem({ project, index }: { project: (typeof PROJECTS)[number]; index: number }) {
  return (
    <div
      className="reveal portfolio-item"
      data-delay={`${(index % 3) * 80}`}
    >
      {/* Decorative background — pure CSS/SVG, no external images */}
      <div className="portfolio-bg" style={{ background: project.grad }} />
      <div
        className="portfolio-bg"
        style={{
          background: 'linear-gradient(180deg, rgba(5,5,5,0.2) 0%, rgba(5,5,5,0.6) 100%)',
        }}
      />

      {/* Faux site preview */}
      <div className="absolute inset-0 flex items-center justify-center opacity-50">
        <div className="w-3/4 rounded-xl overflow-hidden" style={{ background: 'rgba(5,5,5,0.3)' }}>
          <div className="h-2 flex items-center gap-1 px-2 py-1" style={{ background: 'rgba(5,5,5,0.4)' }}>
            <div className="w-1.5 h-1.5 rounded-full bg-white/30" />
            <div className="w-1.5 h-1.5 rounded-full bg-white/30" />
            <div className="w-1.5 h-1.5 rounded-full bg-white/30" />
          </div>
          <div className="p-3 space-y-1.5">
            <div className="h-2 rounded bg-white/20" style={{ width: '60%' }} />
            <div className="h-1.5 rounded bg-white/10" style={{ width: '80%' }} />
            <div className="h-1.5 rounded bg-white/10" style={{ width: '70%' }} />
            <div className="h-4 rounded-full bg-white/20 mt-1" style={{ width: '40%' }} />
          </div>
        </div>
      </div>

      {/* Hover overlay */}
      <div className="portfolio-overlay">
        <p className="text-xs text-pastel-lilac mb-1 uppercase tracking-wider font-semibold">
          {project.type}
        </p>
        <h3 className="heading-sm mb-2">{project.title}</h3>
        <p className="text-pastel-mint text-sm font-medium">{project.result}</p>
      </div>
    </div>
  );
}

export default function Portfolio() {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section ref={ref} id="portfolio" className="section-padding relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <p className="reveal text-sm font-semibold text-pastel-lilac mb-4 uppercase tracking-widest">
            Portfólio
          </p>
          <h2 className="reveal heading-lg mb-6" data-delay="80">
            Projetos que estão <span className="text-gradient">vendendo</span>
          </h2>
          <p className="reveal text-text-secondary text-lg" data-delay="160">
            Veja alguns exemplos de sites que criamos para empreendedores como você.
          </p>
          <p className="reveal text-xs text-text-muted mt-3" data-delay="200">
            Cases de exemplo para substituição pelos projetos reais
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS.map((project, i) => (
            <PortfolioItem key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
