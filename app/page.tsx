'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { LANGS, translations, type Lang } from './translations'

const C = {
  marrom: '#5a2904',
  rose: '#d59d89',
  dourado: '#d9ac6e',
  creme: '#ffead0',
  marromEscuro: '#2d1b0e',
  marromMedio: '#5a2904',
  cremeMedio: '#fef9f3',
}

function Reveal({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(40px)',
        transition: 'opacity 0.8s ease, transform 0.8s ease',
      }}
    >
      {children}
    </div>
  )
}

function GalleryItem({ src, alt, onOpen, objectPosition = 'center' }: { src: string; alt: string; onOpen: () => void; objectPosition?: string }) {
  return (
    <div onClick={onOpen} style={{ cursor: 'pointer', borderRadius: 10, overflow: 'hidden', boxShadow: '0 4px 16px rgba(74,46,31,0.15)' }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} style={{ width: '100%', height: 220, objectFit: 'cover', objectPosition, display: 'block' }} />
    </div>
  )
}

function Lightbox({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) {
  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.85)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 20, zIndex: 2000, cursor: 'zoom-out',
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} style={{ maxWidth: '100%', maxHeight: '90vh', objectFit: 'contain', borderRadius: 8 }} />
    </div>
  )
}

function LangSwitcher({ lang, setLang }: { lang: Lang; setLang: (l: Lang) => void }) {
  const [open, setOpen] = useState(false)
  const current = LANGS.find((l) => l.code === lang)!

  return (
    <div style={{ position: 'fixed', top: 16, right: 16, zIndex: 1000, fontFamily: "'Poppins', sans-serif" }}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        style={{
          display: 'flex', alignItems: 'center', gap: 6,
          backgroundColor: 'rgba(45,27,14,0.85)', border: '1px solid #d9ac6e55',
          borderRadius: 20, padding: '6px 12px', color: '#ffead0',
          fontSize: 13, fontWeight: 700, cursor: 'pointer',
        }}
      >
        <span>{current.flag}</span>
        <span>{current.label}</span>
      </button>
      {open && (
        <div style={{
          position: 'absolute', top: '110%', right: 0,
          backgroundColor: '#2d1b0e', border: '1px solid #d9ac6e55',
          borderRadius: 12, overflow: 'hidden', minWidth: 100,
          boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
        }}>
          {LANGS.map((l) => (
            <button
              key={l.code}
              type="button"
              onClick={() => { setLang(l.code); setOpen(false) }}
              style={{
                display: 'flex', alignItems: 'center', gap: 8, width: '100%',
                padding: '10px 14px', border: 'none',
                backgroundColor: l.code === lang ? '#5a290455' : 'transparent',
                color: '#ffead0', fontSize: 13, fontWeight: l.code === lang ? 700 : 400,
                cursor: 'pointer', textAlign: 'left',
              }}
            >
              <span>{l.flag}</span>
              <span>{l.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

const LANG_MAP: Record<string, Lang> = { pt: 'pt', es: 'es', fr: 'fr', it: 'it' }

export default function Home() {
  const [lang, setLang] = useState<Lang>('pt')
  const t = translations[lang]

  useEffect(() => {
    const saved = window.localStorage.getItem('lang') as Lang | null
    if (saved && LANG_MAP[saved]) {
      setLang(saved)
      return
    }
    const browserLang = navigator.language.slice(0, 2).toLowerCase()
    if (LANG_MAP[browserLang]) setLang(LANG_MAP[browserLang])
  }, [])

  function changeLang(l: Lang) {
    setLang(l)
    window.localStorage.setItem('lang', l)
  }

  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null)
  const [form, setForm] = useState({ nome: '', idade: '', cidade: '', sobre: '' })
  const [enviado, setEnviado] = useState(false)
  const [enviando, setEnviando] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const formValid = form.nome.trim() !== '' && form.idade.trim() !== '' && form.cidade.trim() !== ''

  function handleFormChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const whatsappMessage = `Olá! Meu nome é ${form.nome}, tenho ${form.idade} anos e moro em ${form.cidade}.${form.sobre ? ` Sobre mim: ${form.sobre}` : ''}`
  const contatoHref = `${t.links.contato}?text=${encodeURIComponent(whatsappMessage)}`

  async function handleEnviar() {
    if (!formValid || enviando) return
    setEnviando(true)
    try {
      await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
    } catch {
      // envio silencioso — não bloqueia o fluxo do WhatsApp
    } finally {
      setEnviando(false)
      setEnviado(true)
    }
  }

  const etapaNums = ['01', '02', '03', '04', '05', '06', '07', '08']
  const etapas = t.etapas.map((e, i) => ({ num: etapaNums[i], titulo: e.titulo, desc: e.desc }))

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '12px 16px',
    borderRadius: 10,
    border: `1px solid ${C.dourado}55`,
    backgroundColor: `${C.creme}dd`,
    color: C.marromEscuro,
    fontFamily: "'Poppins', sans-serif",
    fontSize: 14,
    outline: 'none',
  }

  const ctaCardStyle: React.CSSProperties = {
    flex: 1,
    minWidth: 0,
    width: '100%',
    borderRadius: 14,
    padding: 'clamp(14px, 4vw, 28px) clamp(14px, 4vw, 24px)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 16,
    textDecoration: 'none',
    cursor: 'pointer',
    transition: 'transform 0.2s, box-shadow 0.2s',
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Parisienne&family=Poppins:wght@300;400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        option { background: ${C.marrom}; color: ${C.creme}; }
        .cta-card:hover { transform: translateY(-4px); box-shadow: 0 16px 40px rgba(0,0,0,0.35) !important; }
        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 8px 28px rgba(217,172,110,0.55); }
          50% { box-shadow: 0 8px 40px rgba(217,172,110,0.95); }
        }
        .pulse-btn { animation: pulseGlow 1.8s ease-in-out infinite; }
        .pulse-btn:hover { transform: translateY(-4px) scale(1.02); }
      `}</style>

      <LangSwitcher lang={lang} setLang={changeLang} />

      <main style={{ fontFamily: "'Poppins', sans-serif", backgroundColor: C.creme }}>

        {/* ══ S1 — HERO ══ */}
        <section id="inicio" style={{ position: 'relative', minHeight: '100vh', backgroundColor: C.marrom, display: 'flex', alignItems: 'center' }}>
          <Image src="/banner.jpg" alt="Banner" fill style={{ objectFit: 'cover', objectPosition: 'center', opacity: 0.25 }} priority />
          <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(135deg, ${C.marromEscuro}dd 0%, ${C.marrom}bb 100%)` }} />

          <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: 1100, margin: '0 auto', padding: 'clamp(40px, 8vw, 80px) 20px' }}>

            {/* Logo acima, largura toda */}
            <div style={{ marginBottom: 40, display: 'flex', justifyContent: 'center' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo-novo.png"
                alt="Carmelitas Mensageiras do Espírito Santo"
                style={{ width: '100%', maxWidth: 900, height: 'auto', mixBlendMode: 'screen', display: 'block' }}
              />
            </div>

            {/* Citação centralizada, largura toda */}
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <h1 style={{ color: C.creme, fontFamily: "'Parisienne', cursive", fontSize: 'clamp(1.8rem, 4vw, 3rem)', lineHeight: 1.2, marginBottom: 16 }}>
                {t.heroQuote}
              </h1>
              <div style={{ width: 48, height: 2, backgroundColor: C.dourado, margin: '0 auto' }} />
            </div>

            {/* Grid duas colunas */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: 'clamp(32px, 5vw, 64px)', alignItems: 'center' }}>

              {/* Esquerda */}
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div style={{ display: 'inline-block', backgroundColor: 'white', padding: '6px 6px 22px', transform: 'rotate(-3deg)', boxShadow: '0 8px 32px rgba(0,0,0,0.4)', maxWidth: 'clamp(200px, 55vw, 460px)', width: '100%' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/image1.jpeg" alt="Irmãs" style={{ width: '100%', height: 'auto', display: 'block' }} />
                </div>
              </div>

              {/* Direita — inscrição live + CTA */}
              <div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 20 }}>
                  <a
                    href={contatoHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cta-card"
                    style={{
                      ...ctaCardStyle,
                      backgroundColor: '#25D366',
                      boxShadow: '0 8px 24px rgba(37,211,102,0.25)',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="https://cdn-icons-png.flaticon.com/512/733/733585.png" alt="WhatsApp" style={{ width: 'clamp(28px, 8vw, 36px)', height: 'clamp(28px, 8vw, 36px)' }} />
                      <div style={{ textAlign: 'left' }}>
                        <p style={{ color: 'white', fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 'clamp(14px, 3.8vw, 16px)', letterSpacing: '0.05em' }}>{t.heroWhatsappTitle}</p>
                        <p style={{ color: 'rgba(255,255,255,0.85)', fontFamily: "'Poppins', sans-serif", fontSize: 'clamp(12px, 3.2vw, 13px)' }}>{t.heroWhatsappSub}</p>
                      </div>
                    </div>
                  </a>

                  {!showForm && (
                    <button
                      type="button"
                      onClick={() => setShowForm(true)}
                      className="pulse-btn"
                      style={{
                        ...ctaCardStyle,
                        border: 'none',
                        background: `linear-gradient(135deg, ${C.dourado} 0%, #f0c896 100%)`,
                        boxShadow: '0 8px 28px rgba(217,172,110,0.55)',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <span style={{ fontSize: 'clamp(24px, 7vw, 32px)' }}>🔥</span>
                        <div style={{ textAlign: 'left' }}>
                          <p style={{ color: C.marromEscuro, fontFamily: "'Poppins', sans-serif", fontWeight: 800, fontSize: 'clamp(15px, 4vw, 17px)', letterSpacing: '0.03em' }}>{t.pulseTitle}</p>
                          <p style={{ color: C.marromEscuro, fontFamily: "'Poppins', sans-serif", fontSize: 'clamp(12px, 3.2vw, 13px)', opacity: 0.8 }}>{t.pulseSub}</p>
                        </div>
                      </div>
                    </button>
                  )}
                </div>

                {showForm && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 20 }}>
                    <input
                      type="text" name="nome" value={form.nome} onChange={handleFormChange} required
                      placeholder={t.formNamePh}
                      style={inputStyle}
                    />
                    <div style={{ display: 'flex', gap: 12 }}>
                      <input
                        type="number" name="idade" value={form.idade} onChange={handleFormChange} required min={14} max={80}
                        placeholder={t.formAgePh}
                        style={{ ...inputStyle, flex: 1 }}
                      />
                      <input
                        type="text" name="cidade" value={form.cidade} onChange={handleFormChange} required
                        placeholder={t.formCityPh}
                        style={{ ...inputStyle, flex: 2 }}
                      />
                    </div>
                    <textarea
                      name="sobre" value={form.sobre} onChange={handleFormChange} rows={3}
                      placeholder={t.formAboutPh}
                      style={{ ...inputStyle, resize: 'none' as const }}
                    />
                    {!formValid && (
                      <p style={{ color: `${C.dourado}bb`, fontSize: 12, fontStyle: 'italic', fontFamily: "'Poppins', sans-serif" }}>
                        {t.formHint}
                      </p>
                    )}

                    <button
                      type="button"
                      onClick={handleEnviar}
                      disabled={!formValid || enviando}
                      style={{
                        padding: '12px 20px',
                        borderRadius: 10,
                        border: 'none',
                        backgroundColor: enviado ? `${C.dourado}55` : C.dourado,
                        color: C.marromEscuro,
                        fontFamily: "'Poppins', sans-serif",
                        fontWeight: 700,
                        fontSize: 14,
                        letterSpacing: '0.05em',
                        cursor: formValid && !enviando ? 'pointer' : 'not-allowed',
                        opacity: formValid ? 1 : 0.5,
                      }}
                    >
                      {enviando ? t.formSending : enviado ? t.formSent : t.formSend}
                    </button>
                    {enviado && (
                      <p style={{ color: C.marrom, fontSize: 12, fontFamily: "'Poppins', sans-serif" }}>
                        {t.formSentMsg}
                      </p>
                    )}

                    <a
                      href={formValid ? t.links.grupo : undefined}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-disabled={!formValid}
                      onClick={(e) => { if (!formValid) e.preventDefault() }}
                      className="cta-card"
                      style={{
                        ...ctaCardStyle,
                        backgroundColor: '#2563eb',
                        border: '2px solid #2563eb',
                        boxShadow: '0 8px 24px rgba(37,99,235,0.4)',
                        opacity: formValid ? 1 : 0.45,
                        cursor: formValid ? 'pointer' : 'not-allowed',
                        pointerEvents: formValid ? 'auto' : 'none',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <span style={{ fontSize: 'clamp(24px, 7vw, 32px)' }}>🕊️</span>
                        <div style={{ textAlign: 'left' }}>
                          <p style={{ color: 'white', fontFamily: "'Poppins', sans-serif", fontWeight: 800, fontSize: 'clamp(14px, 3.8vw, 16px)', letterSpacing: '0.05em' }}>{t.groupTitle}</p>
                          <p style={{ color: 'rgba(255,255,255,0.85)', fontFamily: "'Poppins', sans-serif", fontSize: 'clamp(12px, 3.2vw, 13px)' }}>{t.groupSub}</p>
                        </div>
                      </div>
                    </a>
                  </div>
                )}

                <p style={{ color: `${C.dourado}88`, fontSize: 11, textAlign: 'center', marginTop: 20, fontStyle: 'italic', fontFamily: "'Poppins', sans-serif" }}>
                  {t.confidentialNote}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ══ S2 — Quem Somos ══ */}
        <Reveal>
        <section id="quem-somos" style={{ backgroundColor: C.creme, padding: 'clamp(48px, 8vw, 100px) 20px' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 56 }}>
              <p style={{ color: C.dourado, fontSize: 11, letterSpacing: '0.25em', textTransform: 'uppercase', fontFamily: "'Poppins', sans-serif", marginBottom: 12 }}>{t.quemSomosLabel}</p>
              <h2 style={{ color: C.marrom, fontFamily: "'Parisienne', cursive", fontSize: 'clamp(1.4rem, 3vw, 2.2rem)', lineHeight: 1.5 }}>
                {t.quemSomosTitleL1}<br />{t.quemSomosTitleL2}
              </h2>
              <div style={{ width: 48, height: 2, backgroundColor: C.dourado, margin: '24px auto 0' }} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: 'clamp(24px, 5vw, 64px)', alignItems: 'center' }}>
              <div>
                <p style={{ color: C.marromMedio, lineHeight: 1.9, fontSize: 'clamp(14px, 3.5vw, 16px)', marginBottom: 16 }}>
                  {t.quemSomosP1}
                </p>
                <p style={{ color: C.marromMedio, lineHeight: 1.9, fontSize: 'clamp(14px, 3.5vw, 16px)', marginBottom: 16 }}>
                  {t.quemSomosP2}
                </p>
                <p style={{ color: C.marromMedio, lineHeight: 1.9, fontSize: 'clamp(14px, 3.5vw, 16px)', marginBottom: 24 }}>
                  {t.quemSomosP3}
                </p>
                <p style={{ color: C.marrom, fontFamily: "'Parisienne', cursive", fontSize: 15, marginBottom: 8 }}>{t.pilaresTitle}</p>
                {t.pilares.map((p, i) => (
                  <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 8 }}>
                    <span style={{ color: C.dourado, fontWeight: 700, flexShrink: 0 }}>—</span>
                    <p style={{ color: C.marromMedio, fontSize: 'clamp(13px, 3.2vw, 15px)', lineHeight: 1.7 }}>{p}</p>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div style={{ backgroundColor: 'white', padding: '10px 10px 40px', transform: 'rotate(2deg)', boxShadow: '0 12px 40px rgba(74,46,31,0.2)', maxWidth: 'clamp(220px, 70vw, 320px)', width: '100%' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/imagem5.jpeg" alt="Comunidade" style={{ width: '100%', height: 'clamp(160px, 45vw, 240px)', objectFit: 'cover', objectPosition: 'center', display: 'block' }} />
                </div>
              </div>
            </div>
          </div>
        </section>
        </Reveal>

        {/* ══ S3 — O que é preciso ══ */}
        <Reveal>
        <section style={{ backgroundColor: C.cremeMedio, padding: 'clamp(48px, 8vw, 100px) 20px' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 64 }}>
              <h2 style={{ color: C.marrom, fontFamily: "'Parisienne', cursive", fontSize: 'clamp(1.4rem, 3vw, 2rem)', marginBottom: 12 }}>
                {t.oQuePrecisoTitle}
              </h2>
              <div style={{ width: 48, height: 2, backgroundColor: C.dourado, margin: '0 auto' }} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '2px' }}>
              {t.oQuePrecisoItems.map((text, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'flex-start', gap: 'clamp(12px, 4vw, 20px)',
                  padding: 'clamp(20px, 5vw, 28px) clamp(16px, 4vw, 24px)',
                  borderLeft: `3px solid ${i % 2 === 0 ? C.dourado : C.rose}`,
                  backgroundColor: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.3)',
                }}>
                  <span style={{ fontSize: 20, lineHeight: 1, flexShrink: 0, minWidth: 28, color: i % 2 === 0 ? C.dourado : C.rose }}>
                    ✝
                  </span>
                  <p style={{ color: C.marromMedio, fontSize: 'clamp(13px, 3.2vw, 15px)', lineHeight: 1.7, paddingTop: 4 }}>{text}</p>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 64, backgroundColor: C.marrom, borderRadius: 16, padding: 'clamp(24px, 5vw, 32px) clamp(20px, 5vw, 40px)', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 24 }}>
              <h3 style={{ color: C.dourado, fontFamily: "'Parisienne', cursive", fontSize: 'clamp(1rem, 2vw, 1.3rem)', maxWidth: 500, textAlign: 'left' }}>
                {t.quoteAlegria}
              </h3>
              <a href={t.links.queroSaberMais} target="_blank" rel="noopener noreferrer"
                style={{ backgroundColor: C.dourado, color: C.marromEscuro, padding: '12px 28px', borderRadius: 8, textDecoration: 'none', fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 13, letterSpacing: '0.15em', textTransform: 'uppercase' as const, whiteSpace: 'nowrap' }}>
                {t.queroSaberMais}
              </a>
            </div>
          </div>
        </section>
        </Reveal>

        {/* ══ S4 — Processo vocacional ══ */}
        <Reveal>
        <section style={{ backgroundColor: C.marrom, padding: 'clamp(48px, 8vw, 100px) 20px' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 80, maxWidth: 700, margin: '0 auto 80px' }}>
              <h2 style={{ color: C.dourado, fontFamily: "'Parisienne', cursive", fontSize: 'clamp(1.3rem, 3vw, 2rem)', marginBottom: 24 }}>
                {t.caminhoTitle}
              </h2>
              <p style={{ color: `${C.creme}cc`, lineHeight: 1.9, fontSize: 15 }}>
                {t.caminhoSub}
              </p>
            </div>

            <h3 style={{ color: C.creme, fontFamily: "'Poppins', sans-serif", textAlign: 'center', marginBottom: 56, fontSize: 12, letterSpacing: '0.25em', textTransform: 'uppercase' }}>
              {t.etapasLabel}
            </h3>

            <style>{`
              @media (max-width: 640px) {
                .timeline-row { flex-direction: row !important; justify-content: flex-start !important; }
                .timeline-spacer { display: none !important; }
                .timeline-card { max-width: 100% !important; }
                .timeline-line { display: none !important; }
              }
            `}</style>

            <div style={{ position: 'relative' }}>
              <div className="timeline-line" style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: 2, backgroundColor: `${C.dourado}44`, transform: 'translateX(-50%)' }} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
                {etapas.map((etapa, i) => (
                  <div key={i} className="timeline-row" style={{ display: 'flex', alignItems: 'flex-start', gap: 20, justifyContent: i % 2 === 0 ? 'flex-start' : 'flex-end' }}>
                    {i % 2 === 0 ? (
                      <>
                        <div className="timeline-card" style={{ flex: 1, maxWidth: 420, backgroundColor: `${C.creme}11`, border: `1px solid ${C.dourado}33`, borderRadius: 12, padding: 'clamp(14px, 4vw, 20px) clamp(16px, 4vw, 24px)' }}>
                          <p style={{ color: C.dourado, fontFamily: "'Poppins', sans-serif", fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase' as const, marginBottom: 4 }}>{t.etapaWord} {etapa.num}</p>
                          <h4 style={{ color: C.creme, fontFamily: "'Parisienne', cursive", fontSize: 'clamp(15px, 4vw, 17px)', marginBottom: 6 }}>{etapa.titulo}</h4>
                          <p style={{ color: `${C.creme}99`, fontSize: 'clamp(12.5px, 3.2vw, 14px)', lineHeight: 1.7 }}>{etapa.desc}</p>
                        </div>
                        <div style={{ width: 'clamp(32px, 8vw, 44px)', height: 'clamp(32px, 8vw, 44px)', borderRadius: '50%', backgroundColor: C.dourado, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 'clamp(11px, 2.5vw, 13px)', color: C.marromEscuro, zIndex: 1 }}>
                          {etapa.num}
                        </div>
                        <div className="timeline-spacer" style={{ flex: 1 }} />
                      </>
                    ) : (
                      <>
                        <div className="timeline-spacer" style={{ flex: 1 }} />
                        <div style={{ width: 'clamp(32px, 8vw, 44px)', height: 'clamp(32px, 8vw, 44px)', borderRadius: '50%', backgroundColor: C.dourado, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 'clamp(11px, 2.5vw, 13px)', color: C.marromEscuro, zIndex: 1 }}>
                          {etapa.num}
                        </div>
                        <div className="timeline-card" style={{ flex: 1, maxWidth: 420, backgroundColor: `${C.creme}11`, border: `1px solid ${C.dourado}33`, borderRadius: 12, padding: 'clamp(14px, 4vw, 20px) clamp(16px, 4vw, 24px)' }}>
                          <p style={{ color: C.dourado, fontFamily: "'Poppins', sans-serif", fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase' as const, marginBottom: 4 }}>{t.etapaWord} {etapa.num}</p>
                          <h4 style={{ color: C.creme, fontFamily: "'Parisienne', cursive", fontSize: 'clamp(15px, 4vw, 17px)', marginBottom: 6 }}>{etapa.titulo}</h4>
                          <p style={{ color: `${C.creme}99`, fontSize: 'clamp(12.5px, 3.2vw, 14px)', lineHeight: 1.7 }}>{etapa.desc}</p>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        </Reveal>

        {/* ══ S5 — Galeria ══ */}
        <Reveal>
        <section style={{ backgroundColor: C.creme, padding: 'clamp(48px, 8vw, 100px) 20px' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 20, padding: '10px' }}>
              {[
                { src: '/1.jpeg', alt: 'Foto 1', objectPosition: 'center' },
                { src: '/2.jpeg', alt: 'Foto 2', objectPosition: 'top' },
                { src: '/3.jpeg', alt: 'Foto 3', objectPosition: 'center' },
                { src: '/4.jpeg', alt: 'Foto 4', objectPosition: 'center' },
              ].map((foto, i) => (
                <GalleryItem key={i} src={foto.src} alt={foto.alt} objectPosition={foto.objectPosition} onOpen={() => setLightbox(foto)} />
              ))}
            </div>
          </div>
        </section>
        </Reveal>

        {lightbox && (
          <Lightbox src={lightbox.src} alt={lightbox.alt} onClose={() => setLightbox(null)} />
        )}

        {/* ══ S6 — Frase Santa Teresinha ══ */}
        <Reveal>
        <section style={{ position: 'relative', minHeight: 420, backgroundColor: C.marromEscuro, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'clamp(48px, 8vw, 100px) 20px' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/imagem6.jpeg" alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', opacity: 0.2 }} />
          <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: 680 }}>
            <div style={{ width: 32, height: 2, backgroundColor: C.dourado, margin: '0 auto 24px' }} />
            <h2 style={{ color: C.creme, fontFamily: "'Parisienne', cursive", fontSize: 'clamp(1.3rem, 3vw, 2rem)', lineHeight: 1.6, marginBottom: 16 }}>
              {t.teresinhaQuote}
            </h2>
            <p style={{ color: C.dourado, fontFamily: "'Poppins', sans-serif", fontSize: 13, letterSpacing: '0.15em' }}>
              {t.teresinhaName}
            </p>
          </div>
        </section>
        </Reveal>

        {/* ══ S7 — Contatos ══ */}
        <Reveal>
        <section style={{ backgroundColor: '#d4c5b0', padding: 'clamp(48px, 8vw, 100px) 20px' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: 16, justifyContent: 'center' }}>
            {[
              { label: t.contatoIrmas, href: t.links.contatoIrmas },
              { label: t.contatoMasculino, href: t.links.contatoMasculino },
              { label: t.contatoRamoSecular, href: t.links.contatoRamoSecular },
            ].map((item, i) => (
              <a key={i} href={item.href} target="_blank" rel="noopener noreferrer"
                style={{
                  display: 'inline-block', padding: '14px 32px', borderRadius: 8,
                  border: `1px solid ${C.dourado}`,
                  backgroundColor: i === 0 ? C.marrom : 'transparent',
                  color: i === 0 ? C.dourado : C.marrom,
                  fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 13,
                  letterSpacing: '0.15em', textTransform: 'uppercase' as const, textDecoration: 'none',
                }}>
                {item.label}
              </a>
            ))}
          </div>
        </section>
        </Reveal>

        {/* FOOTER */}
        <footer style={{ backgroundColor: C.marromEscuro, padding: '48px 24px', textAlign: 'center' }}>
          <div style={{ width: 32, height: 2, backgroundColor: C.dourado, margin: '0 auto 20px' }} />
          <p style={{ color: C.creme, fontFamily: "'Parisienne', cursive", fontSize: 16, marginBottom: 6 }}>
            {t.footerName}
          </p>
          <p style={{ color: `${C.dourado}99`, fontFamily: "'Poppins', sans-serif", fontSize: 12, marginBottom: 24 }}>
            rsvocacional.cmes@gmail.com
          </p>
          <p style={{ color: `${C.dourado}44`, fontFamily: "'Poppins', sans-serif", fontSize: 11 }}>
            {t.footerCopy}
          </p>
        </footer>

        {/* WhatsApp fixo */}
        <a href={t.links.whatsappFixo} target="_blank" rel="noopener noreferrer"
          style={{ position: 'fixed', bottom: 'clamp(16px, 4vw, 24px)', right: 'clamp(16px, 4vw, 24px)', width: 'clamp(48px, 12vw, 56px)', height: 'clamp(48px, 12vw, 56px)', borderRadius: '50%', backgroundColor: '#25D366', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 16px rgba(0,0,0,0.25)', zIndex: 999 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://cdn-icons-png.flaticon.com/512/733/733585.png" alt="WhatsApp" style={{ width: 32, height: 32 }} />
        </a>

      </main>
    </>
  )
}
