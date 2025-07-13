export type Perfil = "aluno" | "professor"

export interface Usuario {
  email: string
  perfil: Perfil
}

// Simula login na "API"
export function login(email: string, senha: string): Usuario | null {
  const usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]")

  const user = usuarios.find(
    (u: any) => u.email === email && u.senha === senha
  )

  if (user) {
    const dados = { email: user.email, perfil: user.perfil as Perfil }
    localStorage.setItem("usuario", JSON.stringify(dados))
    return dados
  }

  return null
}

export function logout() {
  localStorage.removeItem("usuario")
}

export function getUsuario(): Usuario | null {
  const data = localStorage.getItem("usuario")
  return data ? JSON.parse(data) : null
}
