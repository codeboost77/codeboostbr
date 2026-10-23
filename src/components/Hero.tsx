import { ArrowRight } from 'lucide-react';
import HeroScene from '@/components/HeroScene';

function AnimatedWords({ text, delayBase = 0 }: { text: string; delayBase?: number }) {
  return <>{text.split(' ').map((word, i) => <span key={i} className="hero-word" style={{ animationDelay: `${delayBase + i * 110}ms` }}>{word}&nbsp;</span>)}</>;
}

export default function Hero() {
  const scrollTo = (href: string) => document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-24 pb-16 px-6 md:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-[1.05fr_.95fr] gap-10 lg:gap-6 items-center">
        <div className="text-center lg:text-left">
          <div className="hero-cascade inline-flex items-center gap-3 mb-7" style={{ animationDelay: '150ms' }}><span className="w-8 h-px bg-[#ff0000]" /><span className="code-line">higher skills · brighter opportunities</span></div>
          <h1 className="heading-xl mb-7"><AnimatedWords text="Construa. Aprenda." delayBase={400} /><br /><span className="text-gradient"><AnimatedWords text="Cresça." delayBase={1150} /></span></h1>
          <p className="hero-cascade text-lg text-text-secondary max-w-xl mx-auto lg:mx-0 mb-8" style={{ animationDelay: '1900ms', lineHeight: 1.7 }}>A Codeboost cria sites e experiências digitais que transformam ideias em oportunidades — com clareza, estratégia e movimento.</p>
          <div className="hero-cascade flex flex-col sm:flex-row gap-4 justify-center lg:justify-start" style={{ animationDelay: '2200ms' }}><button onClick={() => scrollTo('#contato')} className="btn-primary">Começar uma conversa <ArrowRight size={18} /></button><button onClick={() => scrollTo('#servicos')} className="btn-secondary">Conhecer a Codeboost</button></div>
          <div className="hero-cascade flex items-center justify-center lg:justify-start gap-6 mt-9 text-xs text-text-muted" style={{ animationDelay: '2450ms' }}><span className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-[#ff0000] rounded-full" /> estratégia</span><span>design</span><span>resultado</span></div>
        </div>
        <div className="hero-cascade" style={{ animationDelay: '1700ms' }}><HeroScene /></div>
      </div>
    </section>
  );
}
