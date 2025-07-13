import { useState } from "react"
import { login } from "../auth/authService"
import { useNavigate } from "react-router-dom"

function Login() {
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [erro, setErro] = useState("")
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const usuario = login(email, senha)
    if (usuario) {
      if (usuario.perfil === "aluno") {
        navigate("/dashboard/aluno")
      } else {
        navigate("/dashboard/professor")
      }
    } else {
      setErro("Credenciais inválidas")
    }
  }

  return (
    <div className="max-w-md mx-auto mt-20 bg-white shadow p-8 rounded">
      <h2 className="text-2xl mb-4 font-bold">Login</h2>
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
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Entrar
        </button>
      </form>
    </div>
  )
}

export default Login
