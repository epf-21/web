import { useSearchParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Eye, Pencil, Trash2, Plus, UserCircle2 } from 'lucide-react'

export default function QuestionManager() {
  const [searchParams] = useSearchParams();
  const age = searchParams.get('age');
  const level = searchParams.get('level');
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([])

  useEffect(() => {
    setQuestions([
      { id: 1, title: 'Organiza los cubiertos' },
      { id: 2, title: 'Organiza los alimentos en el plato' }
    ])
  }, [age, level]);

  const handleClick = () => {
    navigate('/Create-question');
  }
  return (
    <div className="min-h-screen bg-white">
      <header className="flex items-center justify-between px-6 py-6 bg-black-rock-950 shadow-sm">
        <h1 className="text-xl md:text-2xl font-bold text-white">Editor de preguntas interactivas</h1>
        <UserCircle2 className="w-8 h-8 text-white" />
      </header>

      <main className="px-6 py-10">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-black-rock-950 mb-2">
            Preguntas ({age} años - Nivel {level})
          </h2>
        </div>

        <div className="mb-6 flex justify-end">
          <button
            onClick={handleClick}
            className="flex items-center gap-2 bg-black-rock-900 hover:bg-black-rock-950 text-white py-2 px-4 rounded-xl transition shadow-md">
            <Plus className="w-5 h-5" />
            Crear nueva pregunta
          </button>
        </div>

        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {questions.map((q) => (
            <div
              key={q.id}
              className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-2xl px-6 py-4 shadow-sm hover:shadow-md transition"
            >
              <div>
                <h3 className="text-lg font-semibold text-black-rock-950">{q.title}</h3>
              </div>
              <div className="flex gap-2">
                <button className="p-2 rounded-full bg-black-rock-100 text-black-rock-950 hover:bg-black-rock-200 transition transform hover:scale-110">
                  <Eye className="w-5 h-5" />
                </button>
                <button className="p-2 rounded-full bg-black-rock-100 text-black-rock-950 hover:bg-black-rock-200 transition transform hover:scale-110">
                  <Pencil className="w-5 h-5" />
                </button>
                <button className="p-2 rounded-full bg-black-rock-100 text-black-rock-950 hover:bg-black-rock-200 transition transform hover:scale-110">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
