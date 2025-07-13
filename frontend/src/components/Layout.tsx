import type { ReactNode } from "react"
import { useNavigate } from "react-router-dom"
import { getUsuario, logout } from "../auth/authService"

interface Props {
  children: ReactNode
}

function Layout({ children }: Props) {
  const usuario = getUsuario()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">AIClass</h1>
        <div className="flex gap-4 items-center">
          <span>{usuario?.email}</span>
          <button
            onClick={handleLogout}
            className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-100"
          >
            Sair
          </button>
        </div>
      </header>
      <main className="p-6">{children}</main>
    </div>
  )
}

export default Layout
