import { useEffect, useState } from "react"
import { getUsuario } from "../auth/authService"
import type { Usuario } from "../auth/authService"

export function useAuth() {
  const [usuario, setUsuario] = useState<Usuario | null>(null)

  useEffect(() => {
    const user = getUsuario()
    setUsuario(user)
  }, [])

  return { usuario }
}
