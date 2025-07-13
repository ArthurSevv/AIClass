import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Cadastro from './pages/Cadastro'
import AlunoDashboard from './pages/dashboard/AlunoDashboard'
import ProfessorDashboard from './pages/dashboard/ProfessorDashboard'
import Submissao from "./pages/aluno/Submissao"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/dashboard/aluno" element={<AlunoDashboard />} />
        <Route path="/dashboard/professor" element={<ProfessorDashboard />} />
        <Route path="/atividade" element={<Submissao />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
