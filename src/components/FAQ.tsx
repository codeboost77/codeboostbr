import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const FAQ_ITEMS = [
  {
    q: 'Qual é o prazo de entrega?',
    a: 'Depende do tipo de projeto. Uma landing page costuma ficar pronta em 1 a 2 semanas. Sites mais completos, como lojas virtuais, podem levar de 3 a 5 semanas. A gente define o prazo exato junto com você na primeira conversa, sem surpresas.',
  },
  {
    q: 'Como funciona o pagamento?',
    a: 'A gente trabalha com uma entrada para começar e o restante na entrega. Você pode parcelar. Os detalhes ficam claros antes de qualquer compromisso, combinados na primeira conversa.',
  },
  {
    q: 'Preciso entender de tecnologia?',
    a: 'Não, para nada. A Code Boost foi feita justamente para quem não entende de tecnologia. A gente cuida de tudo e te explica em linguagem simples. Você foca no seu negócio, a gente foca no site.',
  },
  {
    q: 'Posso pedir ajustes depois que o site estiver pronto?',
    a: 'Sim. Todos os projetos incluem 30 dias de acompanhamento após a entrega, com ajustes inclusos. Depois desse período, a gente oferece planos de manutenção para quem quiser continuar com suporte.',
  },
  {
    q: 'Vocês cuidam de domínio e hospedagem?',
    a: 'Sim, a gente resolve tudo para você: registro do domínio (o endereço do seu site), hospedagem e configuração. Você não precisa se preocupar com nada disso. Se já tiver um domínio, a gente migra.',
  },
  {
    q: 'Como eu começo?',
    a: 'É simples: preencha o formulário aqui embaixo ou chame a gente no WhatsApp. A gente conversa sobre o seu negócio, entende o que você precisa e te diz honestamente se a gente é a parceira certa para você.',
  },
];

function FaqItem({ item, index }: { item: (typeof FAQ_ITEMS)[number]; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="reveal glass-card overflow-hidden"
      data-delay={`${index * 60}`}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-4 p-6 text-left"
        aria-expanded={open}
      >
        <span className="font-display font-semibold text-base lg:text-lg">{item.q}</span>
        <span className="flex-shrink-0">
          {open ? (
            <Minus size={20} className="text-pastel-lilac" />
          ) : (
            <Plus size={20} className="text-text-secondary" />
          )}
        </span>
      </button>
      <div className={`accordion-content ${open ? 'open' : ''}`}>
        <div className="accordion-inner">
          <p className="px-6 pb-6 text-text-secondary text-sm" style={{ lineHeight: 1.7 }}>
            {item.a}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function FAQ() {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      id="duvidas"
      className="section-padding relative"
      style={{ background: 'var(--bg-secondary)' }}
    >
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <p className="reveal text-sm font-semibold text-pastel-lilac mb-4 uppercase tracking-widest">
            Dúvidas
          </p>
          <h2 className="reveal heading-lg mb-6" data-delay="80">
            Perguntas <span className="text-gradient">frequentes</span>
          </h2>
          <p className="reveal text-text-secondary text-lg" data-delay="160">
            Se ainda tiver dúvidas depois, é só chamar a gente no WhatsApp.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          {FAQ_ITEMS.map((item, i) => (
            <FaqItem key={item.q} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
