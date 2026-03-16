'use client'

import { useState } from 'react'
import Image from 'next/image'

const fotos = [
  { src: '/image1.jpeg', alt: '', tall: true },
  { src: '/imagem5.jpeg', alt: '', tall: false },
  { src: '/imagem2.jpeg', alt: '', tall: true },
  { src: '/imagem6.jpeg', alt: '', tall: false },
  { src: '/imagem3.jpeg', alt: '', tall: false },
]

function MasonryItem({ foto }: { foto: { src: string; alt: string } }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      className="break-inside-avoid relative overflow-hidden rounded-xl cursor-pointer mb-3 md:mb-4"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={foto.src}
        alt={foto.alt}
        style={{
          width: '100%',
          height: 'auto',
          display: 'block',
          transition: 'transform 0.7s ease-out',
          transform: hovered ? 'scale(1.05)' : 'scale(1)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(74,46,31,0.7) 0%, transparent 60%)',
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.5s',
          display: 'flex',
          alignItems: 'flex-end',
          padding: '1rem',
        }}
      >
        <span style={{ color: '#C9A66B', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          {foto.alt}
        </span>
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

  const inputStyle = {
    border: '1px solid #C9A66B88',
    backgroundColor: '#FDF6EE',
    color: '#4A2E1F',
  }

  return (
    <main className="min-h-screen" style={{ backgroundColor: '#F3E8DA' }}>

      {/* HERO */}
      <header
        className="relative min-h-[360px] sm:min-h-[440px] md:min-h-[520px] flex flex-col items-center justify-center px-4 py-12 text-center overflow-hidden"
        style={{ backgroundColor: '#4A2E1F' }}
      >
        <Image
          src="/banner.jpg"
          alt="Irmãs Carmelitas"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0" style={{ backgroundColor: 'rgba(74,46,31,0.72)' }} />

        <div className="relative z-10 flex flex-col items-center w-full max-w-lg mx-auto">
      <div
  className="mb-5 flex items-center justify-center rounded-full flex-shrink-0 overflow-hidden"
  style={{ 
    width: 100, 
    height: 100, 
    backgroundColor: '#f2e8e8f6',
    border: '2px solid #C9A66B'
  }}
>
  
</div>

          <p className="text-xs sm:text-sm tracking-widest uppercase mb-2 px-2" style={{ color: '#dfb46a' }}>
            Irmãs Carmelitas Mensageiras do Espírito Santo
          </p>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight" style={{ color: '#F3E8DA' }}>
            Vocacional Feminino
          </h1>
          <div className="w-12 h-px mx-auto mt-4" style={{ backgroundColor: '#C9A66B' }} />
          <p className="mt-4 text-sm sm:text-base italic px-2 leading-relaxed" style={{ color: '#E39A7A' }}>
            "Responder o chamado de Deus é uma aventura, mas vale a pena correr o risco"
          </p>
        </div>
      </header>

      <div className="flex items-center justify-center py-7 px-6">
        <div className="h-px flex-1" style={{ backgroundColor: '#C9A66B44' }} />
        <span className="mx-3 text-xs tracking-widest uppercase" style={{ color: '#C9A66B' }}>Vocacional</span>
        <div className="h-px flex-1" style={{ backgroundColor: '#C9A66B44' }} />
      </div>

      <section className="w-full max-w-xl mx-auto px-4 pb-16">
        <div className="rounded-2xl shadow-sm p-5 sm:p-8" style={{ backgroundColor: '#fff8f2', border: '1px solid #C9A66B33' }}>
          {status === 'success' ? (
            <div className="text-center py-10">
              <div className="text-5xl mb-4">🕊️</div>
              <h2 className="text-xl font-semibold mb-2" style={{ color: '#4A2E1F' }}>Obrigada por compartilhar!</h2>
              <p className="text-sm leading-relaxed" style={{ color: '#7a5a45' }}>
                Suas informações foram recebidas.<br />As irmãs entrarão em contato em breve.
              </p>
              <button onClick={() => setStatus('idle')} className="mt-6 text-sm underline" style={{ color: '#E39A7A' }}>
                Enviar outra resposta
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h2 className="text-base sm:text-lg font-semibold text-center mb-5" style={{ color: '#4A2E1F' }}>
                Preencha suas informações
              </h2>

              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: '#4A2E1F' }}>
                  Nome completo <span style={{ color: '#E39A7A' }}>*</span>
                </label>
                <input type="text" name="nome" value={form.nome} onChange={handleChange} required
                  placeholder="Seu nome completo" className="w-full px-4 py-3 rounded-lg text-sm outline-none" style={inputStyle} />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: '#4A2E1F' }}>
                  Idade <span style={{ color: '#E39A7A' }}>*</span>
                </label>
                <input type="number" name="idade" value={form.idade} onChange={handleChange} required min={14} max={50}
                  placeholder="Sua idade" className="w-full px-4 py-3 rounded-lg text-sm outline-none" style={inputStyle} />
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-1" style={{ color: '#4A2E1F' }}>
                    Cidade <span style={{ color: '#E39A7A' }}>*</span>
                  </label>
                  <input type="text" name="cidade" value={form.cidade} onChange={handleChange} required
                    placeholder="Sua cidade" className="w-full px-4 py-3 rounded-lg text-sm outline-none" style={inputStyle} />
                </div>
                <div className="sm:w-28">
                  <label className="block text-sm font-medium mb-1" style={{ color: '#4A2E1F' }}>
                    Estado <span style={{ color: '#E39A7A' }}>*</span>
                  </label>
                  <select name="estado" value={form.estado} onChange={handleChange} required
                    className="w-full px-3 py-3 rounded-lg text-sm outline-none" style={inputStyle}>
                    <option value="">UF</option>
                    {['AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG',
                      'PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO'].map(uf => (
                      <option key={uf} value={uf}>{uf}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: '#4A2E1F' }}>
                  Fale um pouco sobre você <span style={{ color: '#E39A7A' }}>*</span>
                </label>
                <textarea name="sobre" value={form.sobre} onChange={handleChange} required rows={5}
                  placeholder="Conte um pouco sobre sua história, sua fé, seus sonhos..."
                  className="w-full px-4 py-3 rounded-lg text-sm outline-none resize-none" style={inputStyle} />
              </div>

              {status === 'error' && (
                <p className="text-sm text-center" style={{ color: '#c0392b' }}>Ocorreu um erro ao enviar. Tente novamente.</p>
              )}

              <button type="submit" disabled={status === 'loading'}
                className="w-full py-4 rounded-lg font-semibold text-sm tracking-wide transition-opacity active:scale-95 hover:opacity-90 disabled:opacity-60"
                style={{ backgroundColor: '#4A2E1F', color: '#F3E8DA' }}>
                {status === 'loading' ? 'Enviando...' : 'Enviar ✦'}
              </button>

              <p className="text-xs text-center leading-relaxed" style={{ color: '#C9A66B' }}>
                Suas informações são confidenciais e serão usadas apenas pelas irmãs.
              </p>
            </form>
          )}
        </div>
      </section>

      <section className="w-full max-w-5xl mx-auto px-4 pb-20">
        <div className="flex items-center justify-center mb-10">
          <div className="h-px flex-1" style={{ backgroundColor: '#C9A66B44' }} />
          <div className="mx-6 text-center">
            <p className="text-xs tracking-wider mt-1" style={{ color: '#C9A66B' }}></p>
          </div>
          <div className="h-px flex-1" style={{ backgroundColor: '#C9A66B44' }} />
        </div>

       

        <p className="text-center text-sm italic mt-10" style={{ color: '#C9A66B' }}>
          
        </p>
      </section>

      {/* FOOTER */}
      <footer className="text-center pb-10 px-4 text-xs space-y-1 border-t" style={{ color: '#9a7a65', borderColor: '#C9A66B33', paddingTop: '2rem' }}>
        <p className="font-medium" style={{ color: '#4A2E1F' }}>Irmãs Carmelitas Mensageiras do Espírito Santo</p>
        <p>rsvocacional.cmes@gmail.com</p>
      </footer>
    </main>
  )
}
