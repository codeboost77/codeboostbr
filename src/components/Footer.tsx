import { Instagram, MessageCircle, Mail, ArrowUp, Heart } from 'lucide-react';
import { useScrollPosition } from '@/hooks/useScrollPosition';

const WHATSAPP_URL = 'https://wa.me/5538999615472';
const EMAIL = 'contato@codeboost.com.br';
const INSTAGRAM_URL = 'https://instagram.com/codeboost';
const FOOTER_LINKS = [
  { label: 'Serviços', href: '#servicos' }, { label: 'Como trabalhamos', href: '#como-trabalhamos' }, { label: 'Resultados', href: '#resultados' }, { label: 'Portfólio', href: '#portfolio' }, { label: 'Dúvidas', href: '#duvidas' }, { label: 'Contato', href: '#contato' },
];

function BrandMark() {
  return <svg width="34" height="28" viewBox="0 0 34 28" fill="none" aria-hidden="true"><path d="M10 3 2 14l8 11M24 3l8 11-8 11" stroke="#fff" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" /><path d="M17 24V5m0 0-5 6m5-6 5 6" stroke="#ff0000" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

export default function Footer() {
  const scrolled = useScrollPosition(400);
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => { e.preventDefault(); document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' }); };
  return (
    <footer className="relative pt-20 pb-8 px-6 md:px-8" style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-glass)' }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12 mb-16">
          <div><a href="#hero" onClick={(e) => handleNavClick(e, '#hero')} className="flex items-center gap-2.5 text-lg font-bold tracking-tight mb-4"><BrandMark /><span>code<span style={{ color: 'var(--brand-red)' }}>boost</span></span></a><p className="text-text-secondary text-sm max-w-xs" style={{ lineHeight: 1.7 }}>Construir, aprender e crescer. Experiências digitais para marcas que querem ir mais longe.</p></div>
          <div><p className="text-sm font-semibold mb-4 text-text-primary uppercase tracking-widest">Navegação</p><ul className="grid grid-cols-2 gap-2">{FOOTER_LINKS.map((link) => <li key={link.href}><a href={link.href} onClick={(e) => handleNavClick(e, link.href)} className="text-sm text-text-secondary hover:text-text-primary transition-colors">{link.label}</a></li>)}</ul></div>
          <div><p className="text-sm font-semibold mb-4 text-text-primary uppercase tracking-widest">Fale com a gente</p><div className="flex gap-3 mb-4"><a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-11 h-11 rounded-xl glass-card" aria-label="WhatsApp"><MessageCircle size={18} className="text-pastel-pink" /></a><a href={`mailto:${EMAIL}`} className="flex items-center justify-center w-11 h-11 rounded-xl glass-card" aria-label="E-mail"><Mail size={18} className="text-pastel-blue" /></a><a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-11 h-11 rounded-xl glass-card" aria-label="Instagram"><Instagram size={18} className="text-pastel-pink" /></a></div><p className="text-xs text-text-muted">Resposta em até 24 horas</p></div>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8" style={{ borderTop: '1px solid var(--border-glass)' }}><p className="text-xs text-text-muted flex items-center gap-1.5 text-center sm:text-left">© {new Date().getFullYear()} codeboost — Feito com <Heart size={12} className="text-pastel-pink" fill="currentColor" /> para quem constrói o futuro</p><p className="text-xs text-text-muted">Todos os direitos reservados</p></div>
      </div>
      <button onClick={scrollToTop} className={`back-to-top fixed bottom-6 right-6 z-40 flex items-center justify-center w-12 h-12 rounded-full ${scrolled ? 'visible' : ''}`} style={{ background: 'var(--brand-red)', boxShadow: '0 4px 20px rgba(255,0,0,.3)' }} aria-label="Voltar ao topo"><ArrowUp size={20} color="#fff" strokeWidth={2.5} /></button>
    </footer>
  );
}
