'use client'

import { useState } from 'react'
import Image from 'next/image'

const C = {
  marrom: '#4A2E1F',
  rose: '#E39A7A',
  dourado: '#C9A66B',
  creme: '#F3E8DA',
  marromEscuro: '#2e1a0e',
  marromMedio: '#6b3e26',
}

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
        <div className="text-5xl mb-3">🕊️</div>
        <div className="w-10 h-px mx-auto mb-4" style={{ backgroundColor: C.dourado }} />
        <h2 className="text-xl font-semibold mb-2" style={{ color: C.marrom, fontFamily: 'Georgia, serif' }}>
          Obrigada por compartilhar!
        </h2>
        <p className="text-sm leading-relaxed mb-6" style={{ color: C.marromMedio }}>
          Suas informações foram recebidas com carinho.<br />
          As irmãs entrarão em contato em breve. 🌹
        </p>
        <button
          onClick={onClose}
          className="w-full py-3 rounded-lg font-semibold text-sm tracking-widest uppercase transition-opacity hover:opacity-90"
          style={{ backgroundColor: C.marrom, color: C.creme }}
        >
          Fechar
        </button>
      </div>
    </div>
  )
}

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
    backgroundColor: 'rgba(255,255,255,0.15)',
    color: C.creme,
    fontSize: 14,
    outline: 'none',
    marginBottom: 10,
  }

  const ufs = ['AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO']

  return (
    <main style={{ fontFamily: 'Georgia, serif', backgroundColor: C.creme }}>

      {status === 'success' && <ModalSucesso onClose={() => setStatus('idle')} />}

      {/* ══════════════════════════════════════════
          S1 — HERO com formulário
      ══════════════════════════════════════════ */}
      <section
        id="cadastre-se"
        className="relative min-h-screen flex items-center"
        style={{ backgroundColor: C.marrom }}
      >
        {/* Banner de fundo */}
        <Image src="/banner.jpg" alt="Banner" fill className="object-cover object-center opacity-30" priority />

        {/* Overlay textura */}
        <div className="absolute inset-0" style={{
          background: `linear-gradient(135deg, ${C.marromEscuro}cc 0%, ${C.marrom}99 100%)`
        }} />

        <div className="relative z-10 w-full max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">

          {/* Lado esquerdo — chamada */}
          <div>
            {/* Logo */}
            <div className="mb-6 flex items-center justify-center md:justify-start">
              <div style={{
                width: 90, height: 90,
                border: `2px solid ${C.dourado}`,
                borderRadius: '50%',
                backgroundColor: C.marrom,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                overflow: 'hidden'
              }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/logo.png" alt="Logo CMES" style={{ width: 80, height: 80, objectFit: 'contain' }} />
              </div>
            </div>

            <p style={{ color: C.dourado, letterSpacing: '0.2em', fontSize: 12, textTransform: 'uppercase', marginBottom: 12 }}>
              Irmãs Carmelitas Mensageiras do Espírito Santo
            </p>

            <h1 style={{ color: C.creme, fontSize: 'clamp(2rem, 5vw, 3.2rem)', lineHeight: 1.2, marginBottom: 16, fontStyle: 'italic' }}>
              "Texto aqui"
            </h1>

            <p style={{ color: C.rose, fontSize: 16, marginBottom: 8 }}>
              Texto aqui
            </p>

            {/* Foto polaroid */}
            <div style={{
              marginTop: 32,
              backgroundColor: 'white',
              padding: '10px 10px 28px',
              transform: 'rotate(-3deg)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
              display: 'inline-block',
              maxWidth: 260,
            }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/image1.jpeg" alt="Irmãs" style={{ width: '100%', height: 180, objectFit: 'cover', display: 'block' }} />
            </div>
          </div>

          {/* Lado direito — formulário */}
          <div>
            <h2 style={{ color: C.creme, fontSize: 'clamp(1.2rem, 3vw, 1.6rem)', marginBottom: 24, lineHeight: 1.4 }}>
              Preencha seus dados para entrar em contato com as irmãs
            </h2>

            <form onSubmit={handleSubmit}>
              <input type="text" name="nome" value={form.nome} onChange={handleChange} required
                placeholder="Nome completo *" style={inputStyle} />
              <input type="number" name="idade" value={form.idade} onChange={handleChange} required
                placeholder="Idade *" min={14} max={50} style={inputStyle} />

              <div style={{ display: 'flex', gap: 8 }}>
                <input type="text" name="cidade" value={form.cidade} onChange={handleChange} required
                  placeholder="Cidade *" style={{ ...inputStyle, flex: 1, marginBottom: 10 }} />
                <select name="estado" value={form.estado} onChange={handleChange} required
                  style={{ ...inputStyle, width: 90, marginBottom: 10 }}>
                  <option value="">UF</option>
                  {ufs.map(uf => <option key={uf} value={uf}>{uf}</option>)}
                </select>
              </div>

              <textarea name="sobre" value={form.sobre} onChange={handleChange} required rows={4}
                placeholder="Fale um pouco sobre você *"
                style={{ ...inputStyle, resize: 'none', marginBottom: 16 }} />

              {status === 'error' && (
                <p style={{ color: '#ff8080', fontSize: 13, marginBottom: 12 }}>Erro ao enviar. Tente novamente.</p>
              )}

              <button type="submit" disabled={status === 'loading'}
                style={{
                  width: '100%', padding: '14px', borderRadius: 8, border: 'none',
                  backgroundColor: C.dourado, color: C.marromEscuro,
                  fontWeight: 700, fontSize: 14, letterSpacing: '0.15em',
                  textTransform: 'uppercase', cursor: 'pointer',
                  fontFamily: 'Georgia, serif',
                  opacity: status === 'loading' ? 0.7 : 1,
                }}
              >
                {status === 'loading' ? 'Enviando...' : 'Enviar ✦'}
              </button>

              <p style={{ color: `${C.dourado}99`, fontSize: 11, textAlign: 'center', marginTop: 10 }}>
                Suas informações são confidenciais e serão usadas apenas pelas irmãs.
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          S2 — Frase de impacto + texto + polaroid
      ══════════════════════════════════════════ */}
      <section style={{ backgroundColor: C.creme, padding: '80px 24px' }}>
        <div className="max-w-6xl mx-auto">
          <h2 style={{
            color: C.marrom, fontSize: 'clamp(1.4rem, 3vw, 2.2rem)',
            textAlign: 'center', fontStyle: 'italic', marginBottom: 60, lineHeight: 1.4
          }}>
            "Texto aqui — frase de impacto vocacional"
          </h2>

          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p style={{ color: C.marromMedio, lineHeight: 1.9, fontSize: 16, marginBottom: 16 }}>Texto aqui</p>
              <p style={{ color: C.marromMedio, lineHeight: 1.9, fontSize: 16, marginBottom: 16 }}>Texto aqui</p>
              <p style={{ color: C.marromMedio, lineHeight: 1.9, fontSize: 16, marginBottom: 16 }}>Texto aqui</p>
            </div>

            {/* Foto polaroid */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div style={{
                backgroundColor: 'white',
                padding: '10px 10px 40px',
                transform: 'rotate(2deg)',
                boxShadow: '0 12px 40px rgba(74,46,31,0.25)',
                maxWidth: 320,
              }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/imagem5.jpeg" alt="Comunidade" style={{ width: '100%', height: 240, objectFit: 'cover', objectPosition: 'top' }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          S3 — Chamados (ícones)
      ══════════════════════════════════════════ */}
      <section style={{ backgroundColor: '#e8ddd0', padding: '80px 24px' }}>
        <div className="max-w-5xl mx-auto text-center">
          <h2 style={{ color: C.marrom, fontSize: 'clamp(1.4rem, 3vw, 2rem)', marginBottom: 12, fontStyle: 'italic' }}>
            Uma irmã Carmelita Mensageira é chamada a:
          </h2>
          <div className="w-16 h-px mx-auto mb-12" style={{ backgroundColor: C.dourado }} />

          <div className="grid grid-cols-2 md:grid-cols-3 gap-10">
            {[
              { icon: '✝', text: 'Texto aqui' },
              { icon: '🕊️', text: 'Texto aqui' },
              { icon: '📖', text: 'Texto aqui' },
              { icon: '🌹', text: 'Texto aqui' },
              { icon: '🙏', text: 'Texto aqui' },
              { icon: '⭐', text: 'Texto aqui' },
            ].map((item, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 36, marginBottom: 12 }}>{item.icon}</div>
                <p style={{ color: C.marromMedio, fontSize: 15, lineHeight: 1.5 }}>{item.text}</p>
              </div>
            ))}
          </div>

          <div style={{
            marginTop: 60, display: 'flex', alignItems: 'center',
            justifyContent: 'space-between', flexWrap: 'wrap', gap: 24,
            backgroundColor: C.marrom, borderRadius: 16, padding: '32px 40px',
          }}>
            <h3 style={{ color: C.dourado, fontSize: 'clamp(1rem, 2vw, 1.3rem)', fontStyle: 'italic', maxWidth: 480, margin: 0 }}>
              E, principalmente: texto aqui
            </h3>
            <a href="#cadastre-se" style={{
              backgroundColor: C.dourado, color: C.marromEscuro,
              padding: '12px 28px', borderRadius: 8, textDecoration: 'none',
              fontWeight: 700, fontSize: 14, letterSpacing: '0.1em',
              textTransform: 'uppercase', whiteSpace: 'nowrap',
            }}>
              Quero saber mais!
            </a>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          S4 — Processo vocacional
      ══════════════════════════════════════════ */}
      <section style={{ backgroundColor: C.marrom, padding: '80px 24px' }}>
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 style={{ color: C.dourado, fontSize: 'clamp(1.3rem, 3vw, 1.9rem)', marginBottom: 24, fontStyle: 'italic' }}>
              Qual o processo vocacional das Irmãs Carmelitas?
            </h2>
            <p style={{ color: C.creme, lineHeight: 1.9, fontSize: 15, marginBottom: 16 }}>Texto aqui</p>
            <p style={{ color: C.creme, lineHeight: 1.9, fontSize: 15, marginBottom: 16 }}>Texto aqui</p>
            <p style={{ color: C.creme, lineHeight: 1.9, fontSize: 15 }}>Texto aqui</p>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{
              backgroundColor: 'white', padding: '10px 10px 40px',
              transform: 'rotate(-2deg)',
              boxShadow: '0 12px 40px rgba(0,0,0,0.4)',
              maxWidth: 300,
            }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/imagem4.jpeg" alt="Irmãs" style={{ width: '100%', height: 220, objectFit: 'cover', objectPosition: 'top' }} />
            </div>
          </div>
        </div>

        {/* Etapas */}
        <div className="max-w-5xl mx-auto mt-16">
          <h3 style={{ color: C.creme, textAlign: 'center', marginBottom: 32, letterSpacing: '0.1em', fontSize: 14, textTransform: 'uppercase' }}>
            Etapas do processo vocacional
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {['01. Texto aqui', '02. Texto aqui', '03. Texto aqui', '04. Texto aqui', '05. Texto aqui', '06. Texto aqui'].map((etapa, i) => (
              <div key={i} style={{
                border: `1px solid ${C.dourado}55`,
                borderRadius: 8, padding: '16px 20px',
                color: C.creme, fontSize: 15,
              }}>
                <span style={{ color: C.dourado, fontWeight: 700, marginRight: 8 }}>
                  {etapa.split('.')[0]}.
                </span>
                {etapa.split('. ')[1]}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          S5 — Galeria Masonry
      ══════════════════════════════════════════ */}
      <section style={{ backgroundColor: C.creme, padding: '80px 24px' }}>
        <div className="max-w-5xl mx-auto">
          <h2 style={{ color: C.marrom, textAlign: 'center', fontSize: 'clamp(1.3rem, 3vw, 1.9rem)', fontStyle: 'italic', marginBottom: 8 }}>
            Nossa Comunidade
          </h2>
          <p style={{ color: C.dourado, textAlign: 'center', letterSpacing: '0.2em', fontSize: 11, textTransform: 'uppercase', marginBottom: 48 }}>
            Mulheres com propósito
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: 40,
            padding: '20px 10px 40px',
          }}>
            {[
              { src: '/image1.jpeg', rot: '-4deg', alt: '' },
              { src: '/imagem2.jpeg', rot: '3deg', alt: '' },
              { src: '/imagem3.jpeg', rot: '-2deg', alt: '' },
              { src: '/imagem4.jpeg', rot: '4deg', alt: '' },
              { src: '/imagem5.jpeg', rot: '-3deg', alt: '' },
              { src: '/imagem6.jpeg', rot: '2deg', alt: '' },
            ].map((foto, i) => (
              <PolaroidItem key={i} src={foto.src} alt={foto.alt} rot={foto.rot} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          S6 — Frase com fundo escuro + imagem
      ══════════════════════════════════════════ */}
      <section className="relative" style={{ minHeight: 400, backgroundColor: C.marromEscuro, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 24px' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/imagem6.jpeg" alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.2 }} />
        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: 700 }}>
          <h2 style={{ color: C.creme, fontSize: 'clamp(1.3rem, 3vw, 2rem)', fontStyle: 'italic', lineHeight: 1.6, marginBottom: 16 }}>
            "Sinto que minha missão está prestes a começar: ajudar as almas a amar a Deus."
          </h2>
          <p style={{ color: C.dourado, letterSpacing: '0.15em', fontSize: 13 }}>Santa Teresinha 🌹</p>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          S7 — Sobre as irmãs
      ══════════════════════════════════════════ */}
      <section style={{ backgroundColor: '#d4c5b0', padding: '80px 24px' }}>
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 style={{ color: C.marrom, fontSize: 'clamp(1.3rem, 3vw, 1.9rem)', marginBottom: 24, fontStyle: 'italic' }}>
              Sobre as Irmãs Carmelitas Mensageiras do Espírito Santo
            </h2>
            <p style={{ color: C.marromMedio, lineHeight: 1.9, fontSize: 15 }}>Texto aqui</p>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{
              backgroundColor: 'white', padding: '10px 10px 40px',
              transform: 'rotate(1.5deg)',
              boxShadow: '0 12px 40px rgba(74,46,31,0.25)',
              maxWidth: 300,
            }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/imagem6.jpeg" alt="Irmãs" style={{ width: '100%', height: 220, objectFit: 'cover', objectPosition: 'top' }} />
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ backgroundColor: C.marromEscuro, padding: '40px 24px', textAlign: 'center' }}>
        <div className="w-10 h-px mx-auto mb-6" style={{ backgroundColor: C.dourado }} />
        <p style={{ color: C.creme, fontStyle: 'italic', marginBottom: 4 }}>
          Irmãs Carmelitas Mensageiras do Espírito Santo
        </p>
        <p style={{ color: `${C.dourado}99`, fontSize: 12 }}>rsvocacional.cmes@gmail.com</p>
        <p style={{ color: `${C.dourado}55`, fontSize: 11, marginTop: 24 }}>
          © 2026 — Vocacional Feminino CMES
        </p>
      </footer>
    </main>
  )
}

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
        boxShadow: hovered
          ? '0 20px 50px rgba(74,46,31,0.35)'
          : '0 6px 20px rgba(74,46,31,0.2)',
        cursor: 'pointer',
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        style={{ width: '100%', height: 180, objectFit: 'cover', objectPosition: 'top', display: 'block' }}
      />
      <p style={{
        textAlign: 'center', marginTop: 10, fontSize: 11,
        color: '#9a7a65', fontStyle: 'italic', letterSpacing: '0.05em'
      }}>
        {alt}
      </p>
    </div>
  )
}

function MasonryItem({ src }: { src: string }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      style={{
        breakInside: 'avoid', marginBottom: 12, borderRadius: 10,
        overflow: 'hidden', cursor: 'pointer', position: 'relative',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt="" style={{
        width: '100%', height: 'auto', display: 'block',
        transition: 'transform 0.6s ease',
        transform: hovered ? 'scale(1.05)' : 'scale(1)',
      }} />
    </div>
  )
}
