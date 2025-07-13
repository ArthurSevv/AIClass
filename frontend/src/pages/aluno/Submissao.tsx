import { useState } from "react"
import { useLocation } from "react-router-dom"
import Layout from "../../components/Layout"
import CodeEditor from "../../components/CodeEditor"
import { corrigirCodigo } from "../../utils/iaSimulada"

function Submissao() {
  const location = useLocation()
  const { atividadeId, titulo } = location.state || {}
  const [codigo, setCodigo] = useState("")
  const [feedback, setFeedback] = useState("")

  const handleEnviar = () => {
    const resposta = corrigirCodigo(codigo)
    setFeedback(resposta)
  }

  return (
    <Layout>
      <h2 className="text-2xl font-bold mb-4">Atividade: {titulo}</h2>

      <CodeEditor codigo={codigo} setCodigo={setCodigo} />

      <button
        onClick={handleEnviar}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Enviar para Correção
      </button>

      {feedback && (
        <div className="mt-6 p-4 bg-gray-100 border rounded whitespace-pre-line">
          <strong>Feedback:</strong>
          <p>{feedback}</p>
        </div>
      )}
    </Layout>
  )
}

export default Submissao
