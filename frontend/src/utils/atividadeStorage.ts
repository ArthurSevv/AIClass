import type { Atividade } from "../types/Atividade"

const KEY = "atividades"

export function getAtividades(): Atividade[] {
  return JSON.parse(localStorage.getItem(KEY) || "[]")
}

export function getAtividadesPorTurma(turmaId: string): Atividade[] {
  return getAtividades().filter((a) => a.turmaId === turmaId)
}

export function salvarAtividade(atividade: Atividade) {
  const atividades = getAtividades()
  atividades.push(atividade)
  localStorage.setItem(KEY, JSON.stringify(atividades))
}

export function removerAtividade(id: string) {
  const atividades = getAtividades().filter((a) => a.id !== id)
  localStorage.setItem(KEY, JSON.stringify(atividades))
}
