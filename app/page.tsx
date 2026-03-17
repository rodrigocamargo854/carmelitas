'use client'

import { useState } from 'react'
import Image from 'next/image'

// Paleta oficial das Irmãs Carmelitas Mensageiras do Espírito Santo
const C = {
  marrom: '#4A2E1F',
  rose: '#E39A7A',
  dourado: '#C9A66B',
  creme: '#F3E8DA',
  marromEscuro: '#2e1a0e',
  marromMedio: '#6b3e26',
  cremeMedio: '#e8ddd0',
}

// ─── COMPONENTE MODAL DE SUCESSO ─────────────────────────────────────────────
function ModalSucesso({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.65)' }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-sm rounded-2xl p-8 text-center shadow-2xl"
        style={{ backgroundColor: C.creme, border: `2px solid ${C.dourado}` }}
        onClick={e => e.stopPropagation()}
      >
        <div style={{ fontSize: 48, marginBottom: 12 }}>🕊️</div>
        <div className="w-10 h-px mx-auto mb-5" style={{ backgroundColor: C.dourado }} />
        <h2 style={{ color: C.marrom, fontFamily: "'Playfair Display', serif", fontSize: 22, marginBottom: 8 }}>
          Obrigada por compartilhar!
        </h2>
        <p style={{ color: C.marromMedio, fontSize: 14, lineHeight: 1.7, marginBottom: 24 }}>
          Suas informações foram recebidas com carinho.<br />
          As irmãs entrarão em contato em breve.
        </p>
        <button
          onClick={onClose}
          style={{
            width: '100%', padding: '12px', borderRadius: 8, border: 'none',
            backgroundColor: C.marrom, color: C.creme,
            fontFamily: "'Lato', sans-serif", fontWeight: 700,
            fontSize: 13, letterSpacing: '0.15em', textTransform: 'uppercase' as const,
            cursor: 'pointer',
          }}
        >
          Fechar
        </button>
      </div>
    </div>
  )
}

// ─── COMPONENTE POLAROID ──────────────────────────────────────────────────────
function PolaroidItem({ src, alt, rot }: { src: string; alt: string; rot: string }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        backgroundColor: 'white',
        padding: '8px 8px 32px',
        transform: hovered ? 'scale(1.05) rotate(0deg)' : `rotate(${rot})`,
        transition: 'transform 0.4s ease, box-shadow 0.4s ease',
        boxShadow: hovered ? '0 20px 50px rgba(74,46,31,0.35)' : '0 6px 20px rgba(74,46,31,0.18)',
        cursor: 'pointer',
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} style={{ width: '100%', height: 180, objectFit: 'cover', objectPosition: 'center', display: 'block' }} />
      <p style={{ textAlign: 'center', marginTop: 10, fontSize: 11, color: '#9a7a65', fontStyle: 'italic', fontFamily: "'Lato', sans-serif" }}>
        {alt}
      </p>
    </div>
  )
}

// ─── PÁGINA PRINCIPAL ─────────────────────────────────────────────────────────
export default function Home() {
  const [form, setForm] = useState({ nome: '', idade: '', cidade: '', estado: '', sobre: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error()
      setStatus('success')
      setForm({ nome: '', idade: '', cidade: '', estado: '', sobre: '' })
    } catch {
      setStatus('error')
    }
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '12px 16px',
    borderRadius: 8,
    border: `1px solid ${C.dourado}88`,
    backgroundColor: 'rgba(255,255,255,0.12)',
    color: C.creme,
    fontSize: 14,
    outline: 'none',
    marginBottom: 10,
    fontFamily: "'Lato', sans-serif",
  }

  const ufs = ['AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO']

  // Etapas do processo vocacional
  // SUBSTITUIR pelos textos reais fornecidos pela irmã
  const etapas = [
    { num: '01', titulo: 'Primeiro Contato', desc: 'SUBSTITUIR — Texto sobre o primeiro contato com a comunidade.' },
    { num: '02', titulo: 'Acompanhamento', desc: 'SUBSTITUIR — Texto sobre o período de acompanhamento vocacional.' },
    { num: '03', titulo: 'Discernimento', desc: 'SUBSTITUIR — Texto sobre o tempo de discernimento espiritual.' },
    { num: '04', titulo: 'Postulância', desc: 'SUBSTITUIR — Texto sobre o período de postulância.' },
    { num: '05', titulo: 'Noviciado', desc: 'SUBSTITUIR — Texto sobre o noviciado e formação.' },
    { num: '06', titulo: 'Votos', desc: 'SUBSTITUIR — Texto sobre os votos temporários e perpétuos.' },
  ]

  return (
    <>
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Lato:wght@300;400;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::placeholder { color: ${C.creme}88 !important; }
        option { background: ${C.marrom}; color: ${C.creme}; }
      `}</style>

      <main style={{ fontFamily: "'Lato', sans-serif", backgroundColor: C.creme }}>

        {status === 'success' && <ModalSucesso onClose={() => setStatus('idle')} />}

        {/* ══════════════════════════════════════════
            S1 — HERO com formulário
        ══════════════════════════════════════════ */}
        <section id="cadastre-se" style={{ position: 'relative', minHeight: '100vh', backgroundColor: C.marrom, display: 'flex', alignItems: 'center' }}>
          <Image src="/banner.jpg" alt="Banner" fill style={{ objectFit: 'cover', objectPosition: 'center', opacity: 0.25 }} priority />
          <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(135deg, ${C.marromEscuro}dd 0%, ${C.marrom}bb 100%)` }} />

          <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: 1100, margin: '0 auto', padding: 'clamp(40px, 8vw, 80px) 20px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: 'clamp(32px, 5vw, 64px)', alignItems: 'center' }}>

            {/* Lado esquerdo */}
            <div>
              {/* Logo */}
              <div style={{ marginBottom: 24, display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{ width: 80, height: 80, border: `2px solid ${C.dourado}`, borderRadius: '50%', backgroundColor: C.marrom, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', flexShrink: 0 }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/logo.png" alt="Logo CMES" style={{ width: 72, height: 72, objectFit: 'contain' }} />
                </div>
                <div>
                  <p style={{ color: C.dourado, fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', lineHeight: 1.6, fontFamily: "'Lato', sans-serif" }}>
                    Irmãs Carmelitas<br />Mensageiras do Espírito Santo
                  </p>
                </div>
              </div>

              {/* SUBSTITUIR — frase de chamada principal do hero */}
              <p style={{ color: C.dourado, fontSize: 11, letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: 12, fontFamily: "'Lato', sans-serif" }}>
                Vocacional Feminino
              </p>
              <h1 style={{ color: C.creme, fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.8rem, 4vw, 3rem)', lineHeight: 1.2, marginBottom: 16, fontStyle: 'italic' }}>
                {/* SUBSTITUIR pela frase de chamada principal */}
                "Responder ao chamado de Deus é uma aventura, mas vale a pena correr o risco"
              </h1>
              <div style={{ width: 48, height: 2, backgroundColor: C.dourado, marginBottom: 20 }} />
              <p style={{ color: C.rose, fontSize: 16, lineHeight: 1.7 }}>
                Deus tem um chamado único para cada pessoa. Será que Ele está chamando você?
              </p>

              {/* Foto polaroid */}
              <div style={{ marginTop: 40, display: 'inline-block', backgroundColor: 'white', padding: '8px 8px 28px', transform: 'rotate(-3deg)', boxShadow: '0 8px 32px rgba(0,0,0,0.4)', maxWidth: 240 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/image1.jpeg" alt="Irmãs" style={{ width: '100%', height: 160, objectFit: 'cover', objectPosition: 'center', display: 'block' }} />
              </div>
            </div>

            {/* Lado direito — formulário */}
            <div>
              <h2 style={{ color: C.creme, fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)', marginBottom: 24, lineHeight: 1.4 }}>
                Preencha seus dados e entre em contato com as irmãs
              </h2>

              <form onSubmit={handleSubmit}>
                <input type="text" name="nome" value={form.nome} onChange={handleChange} required placeholder="Nome completo *" style={inputStyle} />
                <input type="number" name="idade" value={form.idade} onChange={handleChange} required placeholder="Idade *" min={14} max={50} style={inputStyle} />

                <div style={{ display: 'flex', gap: 8 }}>
                  <input type="text" name="cidade" value={form.cidade} onChange={handleChange} required placeholder="Cidade *" style={{ ...inputStyle, flex: 1 }} />
                  <select name="estado" value={form.estado} onChange={handleChange} required style={{ ...inputStyle, width: 90 }}>
                    <option value="">UF</option>
                    {ufs.map(uf => <option key={uf} value={uf}>{uf}</option>)}
                  </select>
                </div>

                <textarea name="sobre" value={form.sobre} onChange={handleChange} required rows={4}
                  placeholder="Fale um pouco sobre você *"
                  style={{ ...inputStyle, resize: 'none' }} />

                {status === 'error' && (
                  <p style={{ color: '#ff8080', fontSize: 13, marginBottom: 12 }}>Erro ao enviar. Tente novamente.</p>
                )}

                <button type="submit" disabled={status === 'loading'} style={{
                  width: '100%', padding: '14px', borderRadius: 8, border: 'none',
                  backgroundColor: C.dourado, color: C.marromEscuro,
                  fontFamily: "'Lato', sans-serif", fontWeight: 700,
                  fontSize: 13, letterSpacing: '0.2em', textTransform: 'uppercase' as const,
                  cursor: 'pointer', opacity: status === 'loading' ? 0.7 : 1,
                  transition: 'opacity 0.2s',
                }}>
                  {status === 'loading' ? 'Enviando...' : 'Enviar'}
                </button>

                <p style={{ color: `${C.dourado}88`, fontSize: 11, textAlign: 'center', marginTop: 10, fontStyle: 'italic' }}>
                  Suas informações são confidenciais e serão usadas apenas pelas irmãs.
                </p>
              </form>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            S2 — Frase + texto + polaroid
        ══════════════════════════════════════════ */}
        <section style={{ backgroundColor: C.creme, padding: 'clamp(48px, 8vw, 100px) 20px' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            {/* SUBSTITUIR pela frase de impacto da seção */}
            <h2 style={{ color: C.marrom, fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.4rem, 3vw, 2.2rem)', textAlign: 'center', fontStyle: 'italic', marginBottom: 64, lineHeight: 1.5 }}>
              "SUBSTITUIR — frase de impacto sobre vocação e chamado de Deus"
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: 'clamp(24px, 5vw, 64px)', alignItems: 'center' }}>
              <div>
                {/* SUBSTITUIR pelos 3 parágrafos de texto desta seção */}
                {['SUBSTITUIR — primeiro parágrafo desta seção sobre vocação.', 'SUBSTITUIR — segundo parágrafo sobre o chamado e discernimento.', 'SUBSTITUIR — terceiro parágrafo sobre a missão das irmãs.'].map((txt, i) => (
                  <p key={i} style={{ color: C.marromMedio, lineHeight: 1.9, fontSize: 16, marginBottom: 16 }}>{txt}</p>
                ))}
              </div>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div style={{ backgroundColor: 'white', padding: '10px 10px 40px', transform: 'rotate(2deg)', boxShadow: '0 12px 40px rgba(74,46,31,0.2)', maxWidth: 320 }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/imagem5.jpeg" alt="Comunidade" style={{ width: '100%', height: 240, objectFit: 'cover', objectPosition: 'center', display: 'block' }} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            S3 — Chamados (layout editorial)
        ══════════════════════════════════════════ */}
        <section style={{ backgroundColor: C.cremeMedio, padding: 'clamp(48px, 8vw, 100px) 20px' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto' }}>

            <div style={{ textAlign: 'center', marginBottom: 64 }}>
              <h2 style={{ color: C.marrom, fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontStyle: 'italic', marginBottom: 12 }}>
                Toda Carmelita Mensageira é chamada a:
              </h2>
              <div style={{ width: 48, height: 2, backgroundColor: C.dourado, margin: '0 auto' }} />
            </div>

            {/* Grid editorial com número romano + linha + texto */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '2px' }}>
              {[
                { num: 'I', text: 'Contemplar para evangelizar à luz do Espírito Santo' },
                { num: 'II', text: 'Viver a íntima e misteriosa união com Deus na oração' },
                { num: 'III', text: 'Ser esposa de Cristo e mãe das almas' },
                { num: 'IV', text: 'Imolar-se pela Igreja com alegria e disponibilidade' },
                { num: 'V', text: 'Levar o amor de Deus às almas pelo testemunho de vida' },
                { num: 'VI', text: 'Ser mensageira do Espírito Santo no mundo' },
              ].map((item, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'flex-start', gap: 20,
                  padding: '28px 24px',
                  borderLeft: `3px solid ${i % 2 === 0 ? C.dourado : C.rose}`,
                  backgroundColor: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.3)',
                }}>
                  <span style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: 28, fontWeight: 700,
                    color: i % 2 === 0 ? C.dourado : C.rose,
                    lineHeight: 1, flexShrink: 0, minWidth: 36,
                  }}>
                    {item.num}
                  </span>
                  <p style={{ color: C.marromMedio, fontSize: 15, lineHeight: 1.7, paddingTop: 4 }}>
                    {item.text}
                  </p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div style={{ marginTop: 64, backgroundColor: C.marrom, borderRadius: 16, padding: '32px 40px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 24 }}>
              <h3 style={{ color: C.dourado, fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1rem, 2vw, 1.3rem)', fontStyle: 'italic', maxWidth: 500, textAlign: 'left' }}>
                "A alegria, essa festa do coração possuído por Deus Amor, deve caracterizar a vida de uma Carmelita Mensageira"
              </h3>
              <a href="#cadastre-se" style={{ backgroundColor: C.dourado, color: C.marromEscuro, padding: '12px 28px', borderRadius: 8, textDecoration: 'none', fontFamily: "'Lato', sans-serif", fontWeight: 700, fontSize: 13, letterSpacing: '0.15em', textTransform: 'uppercase' as const, whiteSpace: 'nowrap' }}>
                Quero saber mais
              </a>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            S4 — Processo vocacional + linha do tempo
        ══════════════════════════════════════════ */}
        <section style={{ backgroundColor: C.marrom, padding: 'clamp(48px, 8vw, 100px) 20px' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: 'clamp(24px, 5vw, 64px)', alignItems: 'center', marginBottom: 80 }}>
              <div>
                {/* SUBSTITUIR pelo título desta seção */}
                <h2 style={{ color: C.dourado, fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.3rem, 3vw, 2rem)', marginBottom: 24, fontStyle: 'italic' }}>
                  SUBSTITUIR — título sobre o processo vocacional
                </h2>
                {/* SUBSTITUIR pelos 3 parágrafos desta seção */}
                {['SUBSTITUIR — parágrafo 1 sobre o processo.', 'SUBSTITUIR — parágrafo 2 sobre o acompanhamento.', 'SUBSTITUIR — parágrafo 3 sobre a jornada individual.'].map((txt, i) => (
                  <p key={i} style={{ color: `${C.creme}cc`, lineHeight: 1.9, fontSize: 15, marginBottom: 14 }}>{txt}</p>
                ))}
              </div>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div style={{ backgroundColor: 'white', padding: '10px 10px 40px', transform: 'rotate(-2deg)', boxShadow: '0 12px 40px rgba(0,0,0,0.4)', maxWidth: 300 }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/imagem4.jpeg" alt="Irmãs" style={{ width: '100%', height: 220, objectFit: 'cover', objectPosition: 'center', display: 'block' }} />
                </div>
              </div>
            </div>

            {/* LINHA DO TEMPO */}
            <h3 style={{ color: C.creme, fontFamily: "'Lato', sans-serif", textAlign: 'center', marginBottom: 56, fontSize: 12, letterSpacing: '0.25em', textTransform: 'uppercase' }}>
              Etapas do processo vocacional
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
                        <div className="timeline-card" style={{ flex: 1, maxWidth: 420, backgroundColor: `${C.creme}11`, border: `1px solid ${C.dourado}33`, borderRadius: 12, padding: '20px 24px' }}>
                          <p style={{ color: C.dourado, fontFamily: "'Lato', sans-serif", fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase' as const, marginBottom: 4 }}>Etapa {etapa.num}</p>
                          <h4 style={{ color: C.creme, fontFamily: "'Playfair Display', serif", fontSize: 17, marginBottom: 6 }}>{etapa.titulo}</h4>
                          <p style={{ color: `${C.creme}99`, fontSize: 14, lineHeight: 1.7 }}>{etapa.desc}</p>
                        </div>
                        <div style={{ width: 44, height: 44, borderRadius: '50%', backgroundColor: C.dourado, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontFamily: "'Lato', sans-serif", fontWeight: 700, fontSize: 13, color: C.marromEscuro, zIndex: 1 }}>
                          {etapa.num}
                        </div>
                        <div className="timeline-spacer" style={{ flex: 1 }} />
                      </>
                    ) : (
                      <>
                        <div className="timeline-spacer" style={{ flex: 1 }} />
                        <div style={{ width: 44, height: 44, borderRadius: '50%', backgroundColor: C.dourado, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontFamily: "'Lato', sans-serif", fontWeight: 700, fontSize: 13, color: C.marromEscuro, zIndex: 1 }}>
                          {etapa.num}
                        </div>
                        <div className="timeline-card" style={{ flex: 1, maxWidth: 420, backgroundColor: `${C.creme}11`, border: `1px solid ${C.dourado}33`, borderRadius: 12, padding: '20px 24px' }}>
                          <p style={{ color: C.dourado, fontFamily: "'Lato', sans-serif", fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase' as const, marginBottom: 4 }}>Etapa {etapa.num}</p>
                          <h4 style={{ color: C.creme, fontFamily: "'Playfair Display', serif", fontSize: 17, marginBottom: 6 }}>{etapa.titulo}</h4>
                          <p style={{ color: `${C.creme}99`, fontSize: 14, lineHeight: 1.7 }}>{etapa.desc}</p>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            S5 — Galeria polaroid
        ══════════════════════════════════════════ */}
        <section style={{ backgroundColor: C.creme, padding: 'clamp(48px, 8vw, 100px) 20px' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <h2 style={{ color: C.marrom, fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.3rem, 3vw, 2rem)', textAlign: 'center', fontStyle: 'italic', marginBottom: 8 }}>
              Nossa Comunidade
            </h2>
            <p style={{ color: C.dourado, textAlign: 'center', fontSize: 11, letterSpacing: '0.25em', textTransform: 'uppercase', fontFamily: "'Lato', sans-serif", marginBottom: 56 }}>
              Mulheres com propósito
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 40, padding: '10px' }}>
              {[
                { src: '/image1.jpeg', rot: '-4deg', alt: 'Irmãs em oração' },
                { src: '/imagem2.jpeg', rot: '3deg', alt: 'Adoração' },
                { src: '/imagem3.jpeg', rot: '-2deg', alt: 'Contemplação' },
                { src: '/imagem4.jpeg', rot: '4deg', alt: 'Comunidade' },
                { src: '/imagem5.jpeg', rot: '-3deg', alt: 'Missão' },
                { src: '/imagem6.jpeg', rot: '2deg', alt: 'Fraternidade' },
              ].map((foto, i) => (
                <PolaroidItem key={i} src={foto.src} alt={foto.alt} rot={foto.rot} />
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            S6 — Frase com fundo + imagem
        ══════════════════════════════════════════ */}
        <section style={{ position: 'relative', minHeight: 420, backgroundColor: C.marromEscuro, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'clamp(48px, 8vw, 100px) 20px' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/imagem6.jpeg" alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', opacity: 0.2 }} />
          <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: 680 }}>
            <div style={{ width: 32, height: 2, backgroundColor: C.dourado, margin: '0 auto 24px' }} />
            <h2 style={{ color: C.creme, fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.3rem, 3vw, 2rem)', fontStyle: 'italic', lineHeight: 1.6, marginBottom: 16 }}>
              "Sinto que minha missão está prestes a começar: ajudar as almas a amar a Deus."
            </h2>
            <p style={{ color: C.dourado, fontFamily: "'Lato', sans-serif", fontSize: 13, letterSpacing: '0.15em' }}>
              Santa Teresinha do Menino Jesus
            </p>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            S7 — Sobre as irmãs
        ══════════════════════════════════════════ */}
        <section style={{ backgroundColor: '#d4c5b0', padding: 'clamp(48px, 8vw, 100px) 20px' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: 'clamp(24px, 5vw, 64px)', alignItems: 'center' }}>
            <div>
              {/* SUBSTITUIR pelo título desta seção */}
              <h2 style={{ color: C.marrom, fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.3rem, 3vw, 2rem)', marginBottom: 24, fontStyle: 'italic' }}>
                SUBSTITUIR — título sobre as irmãs
              </h2>
              {/* SUBSTITUIR pelo texto sobre a congregação */}
              <p style={{ color: C.marromMedio, lineHeight: 1.9, fontSize: 15 }}>
                SUBSTITUIR — texto sobre a história, missão e carisma das Irmãs Carmelitas Mensageiras do Espírito Santo.
              </p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div style={{ backgroundColor: 'white', padding: '10px 10px 40px', transform: 'rotate(1.5deg)', boxShadow: '0 12px 40px rgba(74,46,31,0.2)', maxWidth: 300 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/imagem6.jpeg" alt="Irmãs" style={{ width: '100%', height: 220, objectFit: 'cover', objectPosition: 'center', display: 'block' }} />
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer style={{ backgroundColor: C.marromEscuro, padding: '48px 24px', textAlign: 'center' }}>
          <div style={{ width: 32, height: 2, backgroundColor: C.dourado, margin: '0 auto 20px' }} />
          <p style={{ color: C.creme, fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontSize: 16, marginBottom: 6 }}>
            Irmãs Carmelitas Mensageiras do Espírito Santo
          </p>
          <p style={{ color: `${C.dourado}99`, fontFamily: "'Lato', sans-serif", fontSize: 12, marginBottom: 24 }}>
            rsvocacional.cmes@gmail.com
          </p>
          <p style={{ color: `${C.dourado}44`, fontFamily: "'Lato', sans-serif", fontSize: 11 }}>
            © 2026 — Vocacional Feminino CMES
          </p>
        </footer>
{/* WhatsApp fixo */}
<a
  href="https://wa.me/554799380438"
  target="_blank"
  rel="noopener noreferrer"
  style={{
    position: 'fixed',
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: '50%',
    backgroundColor: '#25D366',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 4px 16px rgba(0,0,0,0.25)',
    zIndex: 999,
  }}
>
  {/* eslint-disable-next-line @next/next/no-img-element */}
  <img
    src="https://cdn-icons-png.flaticon.com/512/733/733585.png"
    alt="WhatsApp"
    style={{ width: 32, height: 32 }}
  />
</a>
      </main>
    </>
  )
}
