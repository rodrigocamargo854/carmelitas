import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const body = await req.json()
    console.log('body recebido:', body)

  const { nome, idade, cidade, estado, sobre } = body

  if (!nome || !idade || !cidade || !estado || !sobre) {
    return NextResponse.json({ error: 'Campos obrigatórios faltando.' }, { status: 400 })
  }

  const APPS_SCRIPT_URL = process.env.APPS_SCRIPT_URL

  if (!APPS_SCRIPT_URL) {
    return NextResponse.json({ error: 'URL do Apps Script não configurada.' }, { status: 500 })
  }

  const res = await fetch(APPS_SCRIPT_URL, {
  method: 'POST',
  redirect: 'follow',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ nome, idade, cidade, estado, sobre }),
})

console.log('Status:', res.status)
console.log('Body:', await res.text())
  if (!res.ok) {
    return NextResponse.json({ error: 'Erro ao salvar na planilha.' }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
