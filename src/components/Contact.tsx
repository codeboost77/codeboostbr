import { useState } from 'react';
import { Send, MessageCircle, Mail, Instagram, CheckCircle2, ArrowRight } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

// ── TROQUE AQUI pelos seus contatos reais ──
const WHATSAPP_URL = 'https://wa.me/5538999617452'; // ← Substitua pelo seu WhatsApp
const EMAIL = 'contato@codeboost.com.br'; // ← Substitua pelo seu e-mail
const INSTAGRAM_URL = 'https://instagram.com/codeboost'; // ← Substitua pelo seu Instagram
const INSTAGRAM_HANDLE = '@codeboost';

const SERVICE_OPTIONS = [
  'Página de venda / Landing page',
  'Loja virtual',
  'Site institucional / Portfólio',
  'Página de captura de contatos',
  'Otimização de site existente',
  'Ainda não sei / Quero conversar',
];

interface FormData {
  nome: string;
  email: string;
  whatsapp: string;
  servico: string;
  mensagem: string;
}

interface FormErrors {
  nome?: string;
  email?: string;
  whatsapp?: string;
  mensagem?: string;
}

function ContactCard({
  icon: Icon,
  label,
  value,
  href,
  accent,
}: {
  icon: typeof MessageCircle;
  label: string;
  value: string;
  href: string;
  accent: string;
}) {
  return (
    <a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      className="glass-card p-5 flex items-center gap-4 group"
    >
      <div
        className="flex items-center justify-center w-12 h-12 rounded-xl flex-shrink-0"
        style={{ background: `${accent}15` }}
      >
        <Icon size={22} style={{ color: accent }} />
      </div>
      <div className="min-w-0">
        <p className="text-xs text-text-muted">{label}</p>
        <p className="text-sm font-medium text-text-primary truncate group-hover:text-pastel-lilac transition-colors">
          {value}
        </p>
      </div>
      <ArrowRight
        size={16}
        className="ml-auto text-text-muted opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300"
      />
    </a>
  );
}

export default function Contact() {
  const ref = useScrollReveal<HTMLElement>();
  const [formData, setFormData] = useState<FormData>({
    nome: '',
    email: '',
    whatsapp: '',
    servico: '',
    mensagem: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.nome.trim()) {
      newErrors.nome = 'Conta pra gente como você se chama';
    } else if (formData.nome.trim().length < 2) {
      newErrors.nome = 'Nome muito curto';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'A gente precisa do seu e-mail para responder';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Esse e-mail parece estar incompleto';
    }

    if (!formData.whatsapp.trim()) {
      newErrors.whatsapp = 'A gente prefere conversar por WhatsApp';
    } else if (!/^[0-9\s+()-]{8,}$/.test(formData.whatsapp)) {
      newErrors.whatsapp = 'Número inválido';
    }

    if (!formData.mensagem.trim()) {
      newErrors.mensagem = 'Conte um pouquinho sobre o seu negócio';
    } else if (formData.mensagem.trim().length < 10) {
      newErrors.mensagem = 'Pode escrever um pouco mais?';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      // Aqui você pode integrar com Supabase ou outro backend para salvar a mensagem.
      // Por enquanto, apenas exibimos a confirmação visual.
      setSubmitted(true);
    }
  };

  const resetForm = () => {
    setFormData({ nome: '', email: '', whatsapp: '', servico: '', mensagem: '' });
    setErrors({});
    setSubmitted(false);
  };

  return (
    <section ref={ref} id="contato" className="section-padding relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <p className="reveal text-sm font-semibold text-pastel-lilac mb-4 uppercase tracking-widest">
            Contato
          </p>
          <h2 className="reveal heading-lg mb-6" data-delay="80">
            Conta pra gente sobre <span className="text-gradient">o seu negócio</span>
          </h2>
          <p className="reveal text-text-secondary text-lg" data-delay="160">
            Sem compromisso, sem pressão. A gente só quer entender o que você precisa e ver se a gente consegue ajudar.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1fr_360px] gap-8 lg:gap-12">
          {/* Form */}
          <div className="reveal glass-card p-8 lg:p-10" data-delay="100">
            {submitted ? (
              <div className="success-anim flex flex-col items-center justify-center text-center py-12">
                <div
                  className="flex items-center justify-center w-20 h-20 rounded-full mb-6"
                  style={{ background: 'rgba(255, 0, 0, 0.12)' }}
                >
                  <CheckCircle2 size={40} className="text-pastel-mint" />
                </div>
                <h3 className="heading-md mb-3">Mensagem enviada!</h3>
                <p className="text-text-secondary mb-8 max-w-md" style={{ lineHeight: 1.7 }}>
                  Obrigado, {formData.nome.split(' ')[0]}! Recebemos a sua mensagem e vamos responder em breve. Se preferir, chame a gente agora no WhatsApp para conversar mais rápido.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-primary">
                    <MessageCircle size={18} />
                    Falar no WhatsApp
                  </a>
                  <button onClick={resetForm} className="btn-secondary">
                    Enviar outra mensagem
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
                <div>
                  <label htmlFor="nome" className="form-label">Nome</label>
                  <input
                    type="text"
                    id="nome"
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    placeholder="Como você se chama?"
                    className={`form-input ${errors.nome ? 'form-input-error' : ''}`}
                    aria-invalid={!!errors.nome}
                    aria-describedby={errors.nome ? 'error-nome' : undefined}
                  />
                  {errors.nome && <p id="error-nome" className="form-error-msg" role="alert">{errors.nome}</p>}
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="email" className="form-label">E-mail</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="seu@email.com"
                      className={`form-input ${errors.email ? 'form-input-error' : ''}`}
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? 'error-email' : undefined}
                    />
                    {errors.email && <p id="error-email" className="form-error-msg" role="alert">{errors.email}</p>}
                  </div>

                  <div>
                    <label htmlFor="whatsapp" className="form-label">WhatsApp</label>
                    <input
                      type="tel"
                      id="whatsapp"
                      name="whatsapp"
                      value={formData.whatsapp}
                      onChange={handleChange}
                      placeholder="(11) 99999-9999"
                      className={`form-input ${errors.whatsapp ? 'form-input-error' : ''}`}
                      aria-invalid={!!errors.whatsapp}
                      aria-describedby={errors.whatsapp ? 'error-whatsapp' : undefined}
                    />
                    {errors.whatsapp && <p id="error-whatsapp" className="form-error-msg" role="alert">{errors.whatsapp}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="servico" className="form-label">Tipo de serviço</label>
                  <select
                    id="servico"
                    name="servico"
                    value={formData.servico}
                    onChange={handleChange}
                    className="form-input form-select"
                  >
                    <option value="">Selecione uma opção</option>
                    {SERVICE_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="mensagem" className="form-label">Mensagem</label>
                  <textarea
                    id="mensagem"
                    name="mensagem"
                    value={formData.mensagem}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Conte sobre o seu negócio, o que você quer alcançar e como a gente pode ajudar."
                    className={`form-input resize-none ${errors.mensagem ? 'form-input-error' : ''}`}
                    aria-invalid={!!errors.mensagem}
                    aria-describedby={errors.mensagem ? 'error-mensagem' : undefined}
                  />
                  {errors.mensagem && <p id="error-mensagem" className="form-error-msg" role="alert">{errors.mensagem}</p>}
                </div>

                <button type="submit" className="btn-primary self-start mt-2">
                  <Send size={16} />
                  Enviar mensagem
                </button>
              </form>
            )}
          </div>

          {/* Contact cards */}
          <div className="reveal flex flex-col gap-4" data-delay="200">
            <p className="text-text-secondary text-sm mb-1">
              Prefere falar direto? Escolha o canal que for melhor para você:
            </p>

            {/* TROQUE O LINK ABAIXO pelo seu WhatsApp */}
            <ContactCard
              icon={MessageCircle}
              label="WhatsApp"
              value="Chamar agora"
              href={WHATSAPP_URL}
              accent="var(--brand-red)"
            />

            {/* TROQUE O E-MAIL ABAIXO pelo seu endereço */}
            <ContactCard
              icon={Mail}
              label="E-mail"
              value={EMAIL}
              href={`mailto:${EMAIL}`}
              accent="var(--brand-white)"
            />

            {/* TROQUE O LINK ABAIXO pelo seu Instagram */}
            <ContactCard
              icon={Instagram}
              label="Instagram"
              value={INSTAGRAM_HANDLE}
              href={INSTAGRAM_URL}
              accent="var(--brand-red)"
            />

            <div
              className="glass-card p-5 mt-2"
              style={{ background: 'rgba(128, 0, 32, 0.08)' }}
            >
              <p className="text-sm text-text-secondary" style={{ lineHeight: 1.7 }}>
                <span className="text-pastel-mint font-semibold">Dica:</span> A gente costuma responder em até 24 horas. Mas pelo WhatsApp a conversa é mais rápida.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
