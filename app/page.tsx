'use client'

import { useState } from 'react'
import Image from 'next/image'

const C = {
  marrom: '#5a2904',
  rose: '#d59d89',
  dourado: '#d9ac6e',
  creme: '#ffead0',
  marromEscuro: '#2d1b0e',
  marromMedio: '#5a2904',
  cremeMedio: '#fef9f3',
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
      <p style={{ textAlign: 'center', marginTop: 10, fontSize: 11, color: '#9a7a65', fontStyle: 'italic', fontFamily: "'Poppins', sans-serif" }}>
        {alt}
      </p>
    </div>
  )
}

export default function Home() {
  const etapas = [
    { num: '01', titulo: 'Primeiros Contatos', desc: 'Primeiros contatos com o Instituto.' },
    { num: '02', titulo: 'Discernimento', desc: 'Tempo de discernimento por parte das Irmãs.' },
    { num: '03', titulo: 'Acompanhamento Vocacional', desc: 'Início do Acompanhamento Vocacional no Instituto — sempre em fevereiro. A jovem participa de retiros e é acompanhada pessoalmente por uma Irmã. Havendo afinidade com o carisma, pode ser convidada a uma experiência de 15 dias em uma de nossas comunidades.' },
    { num: '04', titulo: 'Aspirantado', desc: 'Início do caminho formativo dentro do Instituto. Período de adaptação à vida de oração e comunitária, com duração de um ano, podendo ser prolongado.' },
    { num: '05', titulo: 'Postulantado', desc: 'A jovem é inserida de modo mais profundo no cotidiano das Irmãs, realizando apostolado externo e experiências nas comunidades de missão. Duração de 18 meses.' },
    { num: '06', titulo: 'Noviciado', desc: 'Começa com o Rito de Iniciação à Vida Religiosa, quando recebe o hábito do Instituto. O primeiro ano é de recolhimento e oração; ao concluí-lo, a noviça faz estágio nas comunidades de missão.' },
    { num: '07', titulo: 'Juniorato', desc: 'Com a Profissão dos Votos Temporários, a irmã consagra sua vida a Cristo. Dedica-se à oração e ao apostolado, amadurecendo sua identidade de Carmelita Mensageira. Duração de 5 a 9 anos.' },
    { num: '08', titulo: 'Profissão Perpétua', desc: 'Após longo caminho, a irmã faz sua opção definitiva de consagrar-se a Cristo em uma vida casta, pobre e obediente, segundo o carisma das CMES.' },
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
        @import url('https://fonts.googleapis.com/css2?family=Parisienne&family=Poppins:wght@300;400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        option { background: ${C.marrom}; color: ${C.creme}; }
        .cta-card:hover { transform: translateY(-4px); box-shadow: 0 16px 40px rgba(0,0,0,0.35) !important; }
      `}</style>

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
                style={{ width: '100%', maxWidth: 700, height: 'auto', mixBlendMode: 'screen', display: 'block' }}
              />
            </div>

            {/* Grid duas colunas */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: 'clamp(32px, 5vw, 64px)', alignItems: 'center' }}>

              {/* Esquerda */}
              <div>
               
                <h1 style={{ color: C.creme, fontFamily: "'Parisienne', cursive", fontSize: 'clamp(1.8rem, 4vw, 3rem)', lineHeight: 1.2, marginBottom: 16 }}>
                  "Responder ao chamado de Deus é uma aventura, mas vale a pena correr o risco"
                </h1>
                <div style={{ width: 48, height: 2, backgroundColor: C.dourado, marginBottom: 20 }} />
                

                <div style={{ marginTop: 40, display: 'inline-block', backgroundColor: 'white', padding: '8px 8px 28px', transform: 'rotate(-3deg)', boxShadow: '0 8px 32px rgba(0,0,0,0.4)', maxWidth: 240 }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/image1.jpeg" alt="Irmãs" style={{ width: '100%', height: 160, objectFit: 'cover', objectPosition: 'center', display: 'block' }} />
                </div>
              </div>

              {/* Direita — duas caixas CTA */}
              <div>
                <h2 style={{ color: C.creme, fontFamily: "'Parisienne', cursive", fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)', marginBottom: 32, lineHeight: 1.4 }}>
                  Sinta-se chamada? Entre em contato conosco!
                </h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <a
                    href="https://wa.me/554799380438"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cta-card"
                    style={{ ...ctaCardStyle, backgroundColor: '#25D366', boxShadow: '0 8px 24px rgba(37,211,102,0.25)' }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="https://cdn-icons-png.flaticon.com/512/733/733585.png" alt="WhatsApp" style={{ width: 36, height: 36 }} />
                      <div style={{ textAlign: 'left' }}>
                        <p style={{ color: 'white', fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 16, letterSpacing: '0.05em' }}>Entre em Contato</p>
                        <p style={{ color: 'rgba(255,255,255,0.85)', fontFamily: "'Poppins', sans-serif", fontSize: 13 }}>Fale com as irmãs pelo WhatsApp</p>
                      </div>
                    </div>
                  </a>

                  <a
                    href="https://chat.whatsapp.com/C0UAbKQnc7DBcUnKcXkK2R?s=cl&p=a&mlu=4"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cta-card"
                    style={{ ...ctaCardStyle, backgroundColor: `${C.dourado}22`, border: `2px solid ${C.dourado}`, boxShadow: '0 8px 24px rgba(0,0,0,0.2)' }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <span style={{ fontSize: 32 }}>🕊️</span>
                      <div style={{ textAlign: 'left' }}>
                        <p style={{ color: C.dourado, fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 16, letterSpacing: '0.05em' }}>Live Vocacional</p>
                        <p style={{ color: C.creme, fontFamily: "'Poppins', sans-serif", fontSize: 13, opacity: 0.85 }}>Entre no Grupo</p>
                      </div>
                    </div>
                  </a>
                </div>

                <p style={{ color: `${C.dourado}88`, fontSize: 11, textAlign: 'center', marginTop: 20, fontStyle: 'italic', fontFamily: "'Poppins', sans-serif" }}>
                  Suas informações são confidenciais e serão usadas apenas pelas irmãs.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ══ S2 — Quem Somos ══ */}
        <section id="quem-somos" style={{ backgroundColor: C.creme, padding: 'clamp(48px, 8vw, 100px) 20px' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 56 }}>
              <p style={{ color: C.dourado, fontSize: 11, letterSpacing: '0.25em', textTransform: 'uppercase', fontFamily: "'Poppins', sans-serif", marginBottom: 12 }}>Quem somos</p>
              <h2 style={{ color: C.marrom, fontFamily: "'Parisienne', cursive", fontSize: 'clamp(1.4rem, 3vw, 2.2rem)', lineHeight: 1.5 }}>
                Chamadas a contemplar para evangelizar,<br />à luz do Espírito Santo
              </h2>
              <div style={{ width: 48, height: 2, backgroundColor: C.dourado, margin: '24px auto 0' }} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: 'clamp(24px, 5vw, 64px)', alignItems: 'center' }}>
              <div>
                <p style={{ color: C.marromMedio, lineHeight: 1.9, fontSize: 16, marginBottom: 16 }}>
                  Chamadas a viver segundo o Espírito, em oração e ação apostólica, contemplar para evangelizar, à luz do Espírito Santo, afim de sermos contemplativas no meio do povo, em um mundo secularizado e pobre.
                </p>
                <p style={{ color: C.marromMedio, lineHeight: 1.9, fontSize: 16, marginBottom: 16 }}>
                  Formadas na unção do Espírito Santo, para levar o Evangelho que salva, cura e liberta, nossa vocação é um dom, que nos convida à íntima e misteriosa união com Deus na imolação da vida, na oração contemplativa, no silêncio e na solidão, que nos abre para o louvor, a acolhida e a manifestação de seus dons e carismas. Abastecidas nesta fonte, Ele nos envia a evangelizar, onde e como for preciso.
                </p>
                <p style={{ color: C.marromMedio, lineHeight: 1.9, fontSize: 16, marginBottom: 24 }}>
                  Enraizado no carisma Teresiano, somos fruto da urgência e necessidade de evangelizar quem vive longe Dele e do exercício de sua fé batismal, imersas em seus sofrimentos e angústias.
                </p>
                <p style={{ color: C.marrom, fontFamily: "'Parisienne', cursive", fontSize: 15, marginBottom: 8 }}>Três pilares sustentam nossa espiritualidade:</p>
                {['Espiritualidade carmelitana', 'Adoração eucarística reparadora, feita cotidianamente', 'Espiritualidade carismática, no louvor e abertura a seus dons e carismas'].map((p, i) => (
                  <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 8 }}>
                    <span style={{ color: C.dourado, fontWeight: 700, flexShrink: 0 }}>—</span>
                    <p style={{ color: C.marromMedio, fontSize: 15, lineHeight: 1.7 }}>{p}</p>
                  </div>
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

        {/* ══ S3 — O que é preciso ══ */}
        <section style={{ backgroundColor: C.cremeMedio, padding: 'clamp(48px, 8vw, 100px) 20px' }}>
          <div style={{ maxWidth: 1000, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 64 }}>
              <h2 style={{ color: C.marrom, fontFamily: "'Parisienne', cursive", fontSize: 'clamp(1.4rem, 3vw, 2rem)', marginBottom: 12 }}>
                O que é preciso para ser uma Carmelita Mensageira?
              </h2>
              <div style={{ width: 48, height: 2, backgroundColor: C.dourado, margin: '0 auto' }} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '2px' }}>
              {[
                { num: 'I', text: 'Desejo de entrega a Deus, sentindo-se chamada ao seguimento radical de Cristo.' },
                { num: 'II', text: 'Amor ao Carmelo e aos santos Carmelitas, desejo de buscar a comunhão com Deus por meio da oração, do silêncio, da solidão e da imolação pela Igreja.' },
                { num: 'III', text: 'Zelo Eucarístico, atração pela adoração reparadora cotidiana.' },
                { num: 'IV', text: 'Abertura aos dons carismáticos, no louvor e na súplica contínua por um novo derramamento do Espírito Santo na Igreja.' },
                { num: 'V', text: 'Capacidade para entregar-se a Deus na simplicidade cotidiana de uma pequena comunidade fraterna unida pela caridade.' },
                { num: 'VI', text: 'Ardor apostólico, desejo de evangelizar, de modo especial os batizados que não vivem o seu batismo.' },
              ].map((item, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'flex-start', gap: 20,
                  padding: '28px 24px',
                  borderLeft: `3px solid ${i % 2 === 0 ? C.dourado : C.rose}`,
                  backgroundColor: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.3)',
                }}>
                  <span style={{ fontFamily: "'Parisienne', cursive", fontSize: 28, fontWeight: 700, color: i % 2 === 0 ? C.dourado : C.rose, lineHeight: 1, flexShrink: 0, minWidth: 36 }}>
                    {item.num}
                  </span>
                  <p style={{ color: C.marromMedio, fontSize: 15, lineHeight: 1.7, paddingTop: 4 }}>{item.text}</p>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 64, backgroundColor: C.marrom, borderRadius: 16, padding: '32px 40px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 24 }}>
              <h3 style={{ color: C.dourado, fontFamily: "'Parisienne', cursive", fontSize: 'clamp(1rem, 2vw, 1.3rem)', maxWidth: 500, textAlign: 'left' }}>
                "A alegria, essa festa do coração possuído por Deus Amor, deve caracterizar a vida de uma Carmelita Mensageira"
              </h3>
              <a href="https://wa.me/554799380438" target="_blank" rel="noopener noreferrer"
                style={{ backgroundColor: C.dourado, color: C.marromEscuro, padding: '12px 28px', borderRadius: 8, textDecoration: 'none', fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 13, letterSpacing: '0.15em', textTransform: 'uppercase' as const, whiteSpace: 'nowrap' }}>
                Quero saber mais
              </a>
            </div>
          </div>
        </section>

        {/* ══ S4 — Processo vocacional ══ */}
        <section style={{ backgroundColor: C.marrom, padding: 'clamp(48px, 8vw, 100px) 20px' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: 'clamp(24px, 5vw, 64px)', alignItems: 'center', marginBottom: 80 }}>
              <div>
                <h2 style={{ color: C.dourado, fontFamily: "'Parisienne', cursive", fontSize: 'clamp(1.3rem, 3vw, 2rem)', marginBottom: 24 }}>
                  O caminho para se tornar Carmelita Mensageira
                </h2>
                <p style={{ color: `${C.creme}cc`, lineHeight: 1.9, fontSize: 15, marginBottom: 14 }}>
                  Cada vocação é única e acompanhada de perto pelas Irmãs. O processo é gradual, respeitando o tempo de cada pessoa e o ritmo do Espírito Santo.
                </p>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div style={{ backgroundColor: 'white', padding: '10px 10px 40px', transform: 'rotate(-2deg)', boxShadow: '0 12px 40px rgba(0,0,0,0.4)', maxWidth: 300 }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/imagem4.jpeg" alt="Irmãs" style={{ width: '100%', height: 220, objectFit: 'cover', objectPosition: 'center', display: 'block' }} />
                </div>
              </div>
            </div>

            <h3 style={{ color: C.creme, fontFamily: "'Poppins', sans-serif", textAlign: 'center', marginBottom: 56, fontSize: 12, letterSpacing: '0.25em', textTransform: 'uppercase' }}>
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
                          <p style={{ color: C.dourado, fontFamily: "'Poppins', sans-serif", fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase' as const, marginBottom: 4 }}>Etapa {etapa.num}</p>
                          <h4 style={{ color: C.creme, fontFamily: "'Parisienne', cursive", fontSize: 17, marginBottom: 6 }}>{etapa.titulo}</h4>
                          <p style={{ color: `${C.creme}99`, fontSize: 14, lineHeight: 1.7 }}>{etapa.desc}</p>
                        </div>
                        <div style={{ width: 44, height: 44, borderRadius: '50%', backgroundColor: C.dourado, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 13, color: C.marromEscuro, zIndex: 1 }}>
                          {etapa.num}
                        </div>
                        <div className="timeline-spacer" style={{ flex: 1 }} />
                      </>
                    ) : (
                      <>
                        <div className="timeline-spacer" style={{ flex: 1 }} />
                        <div style={{ width: 44, height: 44, borderRadius: '50%', backgroundColor: C.dourado, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 13, color: C.marromEscuro, zIndex: 1 }}>
                          {etapa.num}
                        </div>
                        <div className="timeline-card" style={{ flex: 1, maxWidth: 420, backgroundColor: `${C.creme}11`, border: `1px solid ${C.dourado}33`, borderRadius: 12, padding: '20px 24px' }}>
                          <p style={{ color: C.dourado, fontFamily: "'Poppins', sans-serif", fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase' as const, marginBottom: 4 }}>Etapa {etapa.num}</p>
                          <h4 style={{ color: C.creme, fontFamily: "'Parisienne', cursive", fontSize: 17, marginBottom: 6 }}>{etapa.titulo}</h4>
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

        {/* ══ S5 — Galeria polaroid ══ */}
        <section style={{ backgroundColor: C.creme, padding: 'clamp(48px, 8vw, 100px) 20px' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <h2 style={{ color: C.marrom, fontFamily: "'Parisienne', cursive", fontSize: 'clamp(1.3rem, 3vw, 2rem)', textAlign: 'center', marginBottom: 8 }}>
              Nossa Comunidade
            </h2>
            <p style={{ color: C.dourado, textAlign: 'center', fontSize: 11, letterSpacing: '0.25em', textTransform: 'uppercase', fontFamily: "'Poppins', sans-serif", marginBottom: 56 }}>
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
            <h2 style={{ color: C.creme, fontFamily: "'Parisienne', cursive", fontSize: 'clamp(1.3rem, 3vw, 2rem)', lineHeight: 1.6, marginBottom: 16 }}>
              "Sinto que minha missão está prestes a começar: ajudar as almas a amar a Deus."
            </h2>
            <p style={{ color: C.dourado, fontFamily: "'Poppins', sans-serif", fontSize: 13, letterSpacing: '0.15em' }}>
              Santa Teresinha do Menino Jesus
            </p>
          </div>
        </section>

        {/* ══ S7 — Sobre as irmãs + duas caixas ══ */}
        <section style={{ backgroundColor: '#d4c5b0', padding: 'clamp(48px, 8vw, 100px) 20px' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: 'clamp(24px, 5vw, 64px)', alignItems: 'center', marginBottom: 56 }}>
              <div>
                <h2 style={{ color: C.marrom, fontFamily: "'Parisienne', cursive", fontSize: 'clamp(1.3rem, 3vw, 2rem)', marginBottom: 24 }}>
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

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, justifyContent: 'center', marginTop: 8 }}>
              {[
                { label: 'Para as Irmãs', href: 'https://wa.me/554799380438' },
                { label: 'Para o Ramo Secular', href: 'https://wa.me/554799380438' },
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
          </div>
        </section>

        {/* FOOTER */}
        <footer style={{ backgroundColor: C.marromEscuro, padding: '48px 24px', textAlign: 'center' }}>
          <div style={{ width: 32, height: 2, backgroundColor: C.dourado, margin: '0 auto 20px' }} />
          <p style={{ color: C.creme, fontFamily: "'Parisienne', cursive", fontSize: 16, marginBottom: 6 }}>
            Irmãs Carmelitas Mensageiras do Espírito Santo
          </p>
          <p style={{ color: `${C.dourado}99`, fontFamily: "'Poppins', sans-serif", fontSize: 12, marginBottom: 24 }}>
            rsvocacional.cmes@gmail.com
          </p>
          <p style={{ color: `${C.dourado}44`, fontFamily: "'Poppins', sans-serif", fontSize: 11 }}>
            © 2026 — Vocacional Feminino CMES
          </p>
        </footer>

        {/* WhatsApp fixo */}
        <a href="https://wa.me/554799380438" target="_blank" rel="noopener noreferrer"
          style={{ position: 'fixed', bottom: 24, right: 24, width: 56, height: 56, borderRadius: '50%', backgroundColor: '#25D366', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 16px rgba(0,0,0,0.25)', zIndex: 999 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://cdn-icons-png.flaticon.com/512/733/733585.png" alt="WhatsApp" style={{ width: 32, height: 32 }} />
        </a>

      </main>
    </>
  )
}
