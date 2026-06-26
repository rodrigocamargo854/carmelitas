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
  cremeMedio: '#e8ddd0',
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

export default function Home() {
  const etapas = [
    { num: '01', titulo: 'Primeiro Contato'},
    { num: '02', titulo: 'Acompanhamento'},
    { num: '03', titulo: 'Discernimento'},
    { num: '04', titulo: 'Postulância'},
    { num: '05', titulo: 'Noviciado'},
    { num: '06', titulo: 'Votos' },
  ]

  const ctaCardStyle: React.CSSProperties = {
    flex: 1,
    minWidth: 220,
    borderRadius: 14,
    padding: '28px 24px',
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
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Lato:wght@300;400;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        option { background: ${C.marrom}; color: ${C.creme}; }
        .cta-card:hover { transform: translateY(-4px); box-shadow: 0 16px 40px rgba(0,0,0,0.35) !important; }
      `}</style>

      <main style={{ fontFamily: "'Lato', sans-serif", backgroundColor: C.creme }}>

        {/* ══ S1 — HERO ══ */}
        <section id="inicio" style={{ position: 'relative', minHeight: '100vh', backgroundColor: C.marrom, display: 'flex', alignItems: 'center' }}>
          <Image src="/banner.jpg" alt="Banner" fill style={{ objectFit: 'cover', objectPosition: 'center', opacity: 0.25 }} priority />
          <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(135deg, ${C.marromEscuro}dd 0%, ${C.marrom}bb 100%)` }} />

          <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: 1100, margin: '0 auto', padding: 'clamp(40px, 8vw, 80px) 20px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: 'clamp(32px, 5vw, 64px)', alignItems: 'center' }}>

            {/* Esquerda */}
            <div>
              <div style={{ marginBottom: 24 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/retina.png"
                  alt="Carmelitas Mensageiras do Espírito Santo"
                  style={{
                    width: 'clamp(200px, 40vw, 360px)',
                    height: 'auto',
                    mixBlendMode: 'screen',
                    display: 'block',
                  }}
                />
              </div>

              <p style={{ color: C.dourado, fontSize: 11, letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: 12, fontFamily: "'Lato', sans-serif" }}>
                Vocacional Feminino
              </p>
              <h1 style={{ color: C.creme, fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.8rem, 4vw, 3rem)', lineHeight: 1.2, marginBottom: 16, fontStyle: 'italic' }}>
                "Responder ao chamado de Deus é uma aventura, mas vale a pena correr o risco"
              </h1>
              <div style={{ width: 48, height: 2, backgroundColor: C.dourado, marginBottom: 20 }} />
              <p style={{ color: C.rose, fontSize: 16, lineHeight: 1.7 }}>
                Deus tem um chamado único para cada pessoa. Será que Ele está chamando você?
              </p>

              <div style={{ marginTop: 40, display: 'inline-block', backgroundColor: 'white', padding: '8px 8px 28px', transform: 'rotate(-3deg)', boxShadow: '0 8px 32px rgba(0,0,0,0.4)', maxWidth: 240 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/image1.jpeg" alt="Irmãs" style={{ width: '100%', height: 160, objectFit: 'cover', objectPosition: 'center', display: 'block' }} />
              </div>
            </div>

            {/* Direita — duas caixas CTA */}
            <div>
              <h2 style={{ color: C.creme, fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)', marginBottom: 32, lineHeight: 1.4 }}>
                Sinta-se chamada? Entre em contato conosco!
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {/* Card 1 — WhatsApp contato */}
                <a
                  href="https://wa.me/554799380438"
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
                    <img src="https://cdn-icons-png.flaticon.com/512/733/733585.png" alt="WhatsApp" style={{ width: 36, height: 36 }} />
                    <div style={{ textAlign: 'left' }}>
                      <p style={{ color: 'white', fontFamily: "'Lato', sans-serif", fontWeight: 700, fontSize: 16, letterSpacing: '0.05em' }}>Entre em Contato</p>
                      <p style={{ color: 'rgba(255,255,255,0.85)', fontFamily: "'Lato', sans-serif", fontSize: 13 }}>Fale com as irmãs pelo WhatsApp</p>
                    </div>
                  </div>
                </a>

                {/* Card 2 — Grupo Live Vocacional */}
                <a
                  href="https://chat.whatsapp.com/C0UAbKQnc7DBcUnKcXkK2R?s=cl&p=a&mlu=4"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cta-card"
                  style={{
                    ...ctaCardStyle,
                    backgroundColor: `${C.dourado}22`,
                    border: `2px solid ${C.dourado}`,
                    boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span style={{ fontSize: 32 }}>🕊️</span>
                    <div style={{ textAlign: 'left' }}>
                      <p style={{ color: C.dourado, fontFamily: "'Lato', sans-serif", fontWeight: 700, fontSize: 16, letterSpacing: '0.05em' }}>Live Vocacional</p>
                      <p style={{ color: C.creme, fontFamily: "'Lato', sans-serif", fontSize: 13, opacity: 0.85 }}>Entre no Grupo</p>
                    </div>
                  </div>
                </a>
              </div>

              <p style={{ color: `${C.dourado}88`, fontSize: 11, textAlign: 'center', marginTop: 20, fontStyle: 'italic', fontFamily: "'Lato', sans-serif" }}>
                Suas informações são confidenciais e serão usadas apenas pelas irmãs.
              </p>
            </div>
          </div>
        </section>

        {/* ══ S2 — Quem Somos (texto + polaroid) ══ */}
        <section id="quem-somos" style={{ backgroundColor: C.creme, padding: 'clamp(48px, 8vw, 100px) 20px' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <h2 style={{ color: C.marrom, fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.4rem, 3vw, 2.2rem)', textAlign: 'center', fontStyle: 'italic', marginBottom: 64, lineHeight: 1.5 }}>
              "SUBSTITUIR — frase de impacto sobre vocação e chamado de Deus"
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: 'clamp(24px, 5vw, 64px)', alignItems: 'center' }}>
              <div>
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

        {/* ══ S3 — Chamados ══ */}
        <section style={{ backgroundColor: C.cremeMedio, padding: 'clamp(48px, 8vw, 100px) 20px' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto' }}>

            <div style={{ textAlign: 'center', marginBottom: 64 }}>
              <h2 style={{ color: C.marrom, fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontStyle: 'italic', marginBottom: 12 }}>
                Toda Carmelita Mensageira é chamada a:
              </h2>
              <div style={{ width: 48, height: 2, backgroundColor: C.dourado, margin: '0 auto' }} />
            </div>

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
                  <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 700, color: i % 2 === 0 ? C.dourado : C.rose, lineHeight: 1, flexShrink: 0, minWidth: 36 }}>
                    {item.num}
                  </span>
                  <p style={{ color: C.marromMedio, fontSize: 15, lineHeight: 1.7, paddingTop: 4 }}>{item.text}</p>
                </div>
              ))}
            </div>

            {/* CTA → WhatsApp */}
            <div style={{ marginTop: 64, backgroundColor: C.marrom, borderRadius: 16, padding: '32px 40px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 24 }}>
              <h3 style={{ color: C.dourado, fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1rem, 2vw, 1.3rem)', fontStyle: 'italic', maxWidth: 500, textAlign: 'left' }}>
                "A alegria, essa festa do coração possuído por Deus Amor, deve caracterizar a vida de uma Carmelita Mensageira"
              </h3>
              <a
                href="https://wa.me/554799380438"
                target="_blank"
                rel="noopener noreferrer"
                style={{ backgroundColor: C.dourado, color: C.marromEscuro, padding: '12px 28px', borderRadius: 8, textDecoration: 'none', fontFamily: "'Lato', sans-serif", fontWeight: 700, fontSize: 13, letterSpacing: '0.15em', textTransform: 'uppercase' as const, whiteSpace: 'nowrap' }}
              >
                Quero saber mais
              </a>
            </div>
          </div>
        </section>

        {/* ══ S4 — Processo vocacional + linha do tempo ══ */}
        <section style={{ backgroundColor: C.marrom, padding: 'clamp(48px, 8vw, 100px) 20px' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: 'clamp(24px, 5vw, 64px)', alignItems: 'center', marginBottom: 80 }}>
              <div>
                <h2 style={{ color: C.dourado, fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.3rem, 3vw, 2rem)', marginBottom: 24, fontStyle: 'italic' }}>
                  SUBSTITUIR — título sobre o processo vocacional
                </h2>
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
                          <p style={{ color: `${C.creme}99`, fontSize: 14, lineHeight: 1.7 }}>{etapa.titulo}</p>
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
                          <p style={{ color: `${C.creme}99`, fontSize: 14, lineHeight: 1.7 }}>{etapa.titulo}</p>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══ S5 — Galeria polaroid ══ */}
        <section style={{ backgroundColor: C.creme, padding: 'clamp(48px, 8vw, 100px) 20px' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <h2 style={{ color: C.marrom, fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.3rem, 3vw, 2rem)', textAlign: 'center', fontStyle: 'italic', marginBottom: 8 }}>
              Nossa Comunidade
            </h2>
            <p style={{ color: C.dourado, textAlign: 'center', fontSize: 11, letterSpacing: '0.25em', textTransform: 'uppercase', fontFamily: "'Lato', sans-serif", marginBottom: 56 }}>
              Fotos do cotidiano
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

        {/* ══ S6 — Frase Santa Teresinha ══ */}
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

        {/* ══ S7 — Sobre as irmãs + duas caixas ══ */}
        <section style={{ backgroundColor: '#d4c5b0', padding: 'clamp(48px, 8vw, 100px) 20px' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: 'clamp(24px, 5vw, 64px)', alignItems: 'center', marginBottom: 56 }}>
              <div>
                <h2 style={{ color: C.marrom, fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.3rem, 3vw, 2rem)', marginBottom: 24, fontStyle: 'italic' }}>
                  SUBSTITUIR — título sobre as irmãs
                </h2>
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

            {/* Duas caixas — Irmãs e Ramo Secular */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, justifyContent: 'center', marginTop: 8 }}>
              {[
                { label: 'Para as Irmãs', href: 'https://wa.me/554799380438' },
                { label: 'Para o Ramo Secular', href: 'https://wa.me/554799380438' },
              ].map((item, i) => (
                <a
                  key={i}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-block',
                    padding: '14px 32px',
                    borderRadius: 8,
                    border: `1px solid ${C.dourado}`,
                    backgroundColor: i === 0 ? C.marrom : 'transparent',
                    color: i === 0 ? C.dourado : C.marrom,
                    fontFamily: "'Lato', sans-serif",
                    fontWeight: 700,
                    fontSize: 13,
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase' as const,
                    textDecoration: 'none',
                  }}
                >
                  {item.label}
                </a>
              ))}
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
            position: 'fixed', bottom: 24, right: 24,
            width: 56, height: 56, borderRadius: '50%',
            backgroundColor: '#25D366',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 16px rgba(0,0,0,0.25)', zIndex: 999,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://cdn-icons-png.flaticon.com/512/733/733585.png" alt="WhatsApp" style={{ width: 32, height: 32 }} />
        </a>

      </main>
    </>
  )
}
