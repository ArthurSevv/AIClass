import { useState } from "react"
import { useNavigate } from "react-router-dom"
import type { Perfil } from "../auth/authService"

function Cadastro() {
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [perfil, setPerfil] = useState<Perfil>("aluno")
  const [erro, setErro] = useState("")
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !senha) {
      setErro("Preencha todos os campos")
      return
    }

    const novoUsuario = { email, senha, perfil }
    const usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]")
    const jaExiste = usuarios.find((u: any) => u.email === email)

    if (jaExiste) {
      setErro("Usuário já cadastrado")
      return
    }

    usuarios.push(novoUsuario)
    localStorage.setItem("usuarios", JSON.stringify(usuarios))
    navigate("/") // redireciona para login
  }

  return (
    <div className="max-w-md mx-auto mt-20 bg-white shadow p-8 rounded">
      <h2 className="text-2xl mb-4 font-bold">Cadastro</h2>
      {erro && <div className="text-red-500 mb-2">{erro}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          className="w-full p-2 border rounded"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />

        <div className="flex gap-4">
          <label className="flex items-center gap-1">
            <input
              type="radio"
              value="aluno"
              checked={perfil === "aluno"}
              onChange={() => setPerfil("aluno")}
            />
            Aluno
          </label>
          <label className="flex items-center gap-1">
            <input
              type="radio"
              value="professor"
              checked={perfil === "professor"}
              onChange={() => setPerfil("professor")}
            />
            Professor
          </label>
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Criar Conta
        </button>
      </form>
    </div>
  )
}

export default Cadastro
