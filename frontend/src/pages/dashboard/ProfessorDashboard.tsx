import { useEffect, useState } from "react"
import Layout from "../../components/Layout"
import type { Turma } from "../../types/Turma"
import { getTurmas, salvarTurma, removerTurma } from "../../utils/turmaStorage"
import {
  getAtividadesPorTurma,
  salvarAtividade,
  removerAtividade,
} from "../../utils/atividadeStorage"
import type { Atividade } from "../../types/Atividade"
import { v4 as uuidv4 } from "uuid"

function ProfessorDashboard() {
    const [turmas, setTurmas] = useState<Turma[]>([])
    const [nome, setNome] = useState("")
    const [descricao, setDescricao] = useState("")
    const [atividadeTitulo, setAtividadeTitulo] = useState("")
    const [atividadeDescricao, setAtividadeDescricao] = useState("")
    const [turmaSelecionada, setTurmaSelecionada] = useState<string | null>(null)
    const [atividades, setAtividades] = useState<Atividade[]>([])


  useEffect(() => {
    setTurmas(getTurmas())
  }, [])

  const handleCriar = () => {
    if (!nome || !descricao) return

    const novaTurma: Turma = {
      id: uuidv4(),
      nome,
      descricao,
    }

    salvarTurma(novaTurma)
    setTurmas(getTurmas())
    setNome("")
    setDescricao("")
  }

  const handleRemover = (id: string) => {
    removerTurma(id)
    setTurmas(getTurmas())
  }

  return (
    <Layout>
      <h2 className="text-2xl font-bold mb-4">Gerenciamento de Turmas</h2>

      <div className="mb-6 space-y-2">
        <input
          type="text"
          placeholder="Nome da Turma"
          className="border p-2 w-full rounded"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <input
          type="text"
          placeholder="Descrição"
          className="border p-2 w-full rounded"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />
        <button
          onClick={handleCriar}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Criar Turma
        </button>
      </div>

      <h3 className="text-lg font-semibold mb-2">Turmas Criadas:</h3>
      <ul className="space-y-2">
        {turmas.map((turma) => (
          <li
            key={turma.id}
            className="p-4 bg-white shadow rounded flex justify-between items-center"
          >
            <div>
              <strong>{turma.nome}</strong>
              <p className="text-sm text-gray-600">{turma.descricao}</p>
            </div>
            <button
                onClick={() => {
                    setTurmaSelecionada(turma.id)
                    setAtividades(getAtividadesPorTurma(turma.id))
                }}
                className="text-blue-500 hover:underline mr-4"
            >
                Ver Atividades
            </button>
            <button
                onClick={() => handleRemover(turma.id)}
                className="text-red-500 hover:underline"
            >
                Remover
            </button>
        {turmaSelecionada && (
            <div className="mt-8">
                <h3 className="text-xl font-bold mb-2">
                    Atividades da Turma {turmas.find(t => t.id === turmaSelecionada)?.nome}
                </h3>

                <div className="space-y-2 mb-4">
                    <input
                    type="text"
                    placeholder="Título da Atividade"
                    className="w-full p-2 border rounded"
                    value={atividadeTitulo}
                    onChange={(e) => setAtividadeTitulo(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Descrição"
                    className="w-full p-2 border rounded"
                    value={atividadeDescricao}
                    onChange={(e) => setAtividadeDescricao(e.target.value)}
                />
                <button
                    onClick={() => {
                    if (!atividadeTitulo || !atividadeDescricao) return

                    const nova: Atividade = {
                        id: uuidv4(),
                        titulo: atividadeTitulo,
                        descricao: atividadeDescricao,
                        turmaId: turmaSelecionada,
                    }

                    salvarAtividade(nova)
                    setAtividades(getAtividadesPorTurma(turmaSelecionada))
                    setAtividadeTitulo("")
                    setAtividadeDescricao("")
                    }}
                    className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                >
                    Adicionar Atividade
                </button>
            </div>

            <ul className="space-y-2">
                {atividades.map((a) => (
                    <li
                        key={a.id}
                        className="p-4 bg-gray-100 rounded flex justify-between items-center"
                    >
                        <div>
                            <strong>{a.titulo}</strong>
                            <p className="text-sm text-gray-600">{a.descricao}</p>
                        </div>
                        <button
                            onClick={() => {
                            removerAtividade(a.id)
                            setAtividades(getAtividadesPorTurma(turmaSelecionada))
                            }}
                            className="text-red-500 hover:underline"
                        >
                            Remover
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )}

          </li>
        ))}
      </ul>
    </Layout>
  )
}

export default ProfessorDashboard
