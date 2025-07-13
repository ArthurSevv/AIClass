import type { Turma } from "../types/Turma"

const KEY = "turmas"

export function getTurmas(): Turma[] {
  return JSON.parse(localStorage.getItem(KEY) || "[]")
}

export function salvarTurma(turma: Turma) {
  const turmas = getTurmas()
  turmas.push(turma)
  localStorage.setItem(KEY, JSON.stringify(turmas))
}

export function removerTurma(id: string) {
  const turmas = getTurmas().filter((t) => t.id !== id)
  localStorage.setItem(KEY, JSON.stringify(turmas))
}
