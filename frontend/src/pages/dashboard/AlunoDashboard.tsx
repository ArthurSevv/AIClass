import { useState, useEffect } from "react"
import Layout from "../../components/Layout"
import type { Turma } from "../../types/Turma"
import type { Atividade } from "../../types/Atividade"
import { getTurmas } from "../../utils/turmaStorage"
import { getAtividadesPorTurma } from "../../utils/atividadeStorage"
import { useNavigate } from "react-router-dom"

function AlunoDashboard() {
  const navigate = useNavigate()
  const [turmas, setTurmas] = useState<Turma[]>([])
  const [atividadesPorTurma, setAtividadesPorTurma] = useState<{
    [turmaId: string]: Atividade[]
  }>({})

  useEffect(() => {
    const turmasDisponiveis = getTurmas()
    setTurmas(turmasDisponiveis)

    const atividadesMap: { [turmaId: string]: Atividade[] } = {}

    turmasDisponiveis.forEach((turma) => {
      atividadesMap[turma.id] = getAtividadesPorTurma(turma.id)
    })

    setAtividadesPorTurma(atividadesMap)
  }, [])

  return (
    <Layout>
      <h2 className="text-2xl font-bold mb-4">Minhas Turmas e Atividades</h2>

      {turmas.length === 0 && (
        <p className="text-gray-600">Nenhuma turma disponível.</p>
      )}

      {turmas.map((turma) => (
        <div key={turma.id} className="mb-6">
          <h3 className="text-lg font-semibold">
            {turma.nome} — <span className="text-sm text-gray-500">{turma.descricao}</span>
          </h3>

          <ul className="ml-4 mt-2 list-disc">
            {atividadesPorTurma[turma.id]?.length > 0 ? (
              atividadesPorTurma[turma.id].map((atividade) => (
                <li
                    key={atividade.id}
                    className="text-blue-600 cursor-pointer hover:underline"
                    onClick={() =>
                        navigate("/atividade", {
                            state: {
                                atividadeId: atividade.id,
                                titulo: atividade.titulo,
                            },
                        })
                    }
                >
                    <strong>{atividade.titulo}</strong> — {atividade.descricao}
                </li>
              ))
            ) : (
              <li className="text-gray-500">Nenhuma atividade cadastrada.</li>
            )}
          </ul>
        </div>
      ))}
    </Layout>
  )
}

export default AlunoDashboard
