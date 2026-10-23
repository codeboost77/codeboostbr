import { useEffect, useState } from 'react';
import { Menu, X, MessageCircle } from 'lucide-react';
import { useScrollPosition } from '@/hooks/useScrollPosition';

const NAV_LINKS = [
  { label: 'Serviços', href: '#servicos' },
  { label: 'Como trabalhamos', href: '#como-trabalhamos' },
  { label: 'Resultados', href: '#resultados' },
  { label: 'Dúvidas', href: '#duvidas' },
  { label: 'Contato', href: '#contato' },
];

function BrandMark({ light = true }: { light?: boolean }) {
  return (
    <svg width="34" height="28" viewBox="0 0 34 28" fill="none" aria-hidden="true">
      <path d="M10 3 2 14l8 11" stroke={light ? '#fff' : '#050505'} strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="m24 3 8 11-8 11" stroke={light ? '#fff' : '#050505'} strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M17 24V5m0 0-5 6m5-6 5 6" stroke="#ff0000" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Header() {
  const scrolled = useScrollPosition(30);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-500" style={{ background: scrolled ? 'rgba(5,5,5,.84)' : 'transparent', backdropFilter: scrolled ? 'blur(18px)' : 'none', borderBottom: scrolled ? '1px solid rgba(255,255,255,.1)' : '1px solid transparent' }}>
      <nav className="max-w-7xl mx-auto px-6 md:px-8 flex items-center justify-between h-16 md:h-20">
        <a href="#hero" onClick={(e) => handleNavClick(e, '#hero')} className="flex items-center gap-2.5 text-lg font-bold tracking-tight">
          <BrandMark />
          <span className="lowercase">code<span style={{ color: 'var(--brand-red)' }}>boost</span></span>
        </a>

        <ul className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((link) => <li key={link.href}><a href={link.href} onClick={(e) => handleNavClick(e, link.href)} className="nav-link">{link.label}</a></li>)}
        </ul>

        <a href="#contato" onClick={(e) => handleNavClick(e, '#contato')} className="hidden lg:inline-flex btn-primary text-sm" style={{ padding: '.65rem 1.15rem' }}>
          <MessageCircle size={16} /> Fale com a gente
        </a>

        <button className="lg:hidden text-text-primary p-2" onClick={() => setMenuOpen((v) => !v)} aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'} aria-expanded={menuOpen}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      <div className={`mobile-menu lg:hidden ${menuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-inner">
          <ul className="flex flex-col gap-1 px-6 pb-8 pt-2" style={{ background: 'rgba(5,5,5,.97)', backdropFilter: 'blur(18px)' }}>
            {NAV_LINKS.map((link) => <li key={link.href}><a href={link.href} onClick={(e) => handleNavClick(e, link.href)} className="block py-3 text-text-secondary hover:text-text-primary transition-colors">{link.label}</a></li>)}
            <li className="mt-3"><a href="#contato" onClick={(e) => handleNavClick(e, '#contato')} className="btn-primary justify-center w-full"><MessageCircle size={16} /> Fale com a gente</a></li>
          </ul>
        </div>
      </div>
    </header>
  );
}
