import { useSearchParams, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import Icon from '../components/Icon';
import { useAuthStore } from '../stores/useAuthStore';
import { useDeleteQuestion, useQuestionByLevel } from '../hooks/useQuestion';
import Header from '../components/Header';

export default function QuestionManager() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const age = searchParams.get('age');
  const level = searchParams.get('level');
  const levelUpper = level?.toUpperCase();

  const { token, user, logout } = useAuthStore();

  useEffect(() => {
    if (!level || !age || !token) {
      navigate('/');
    }
  }, [level, age, token, navigate])


  const { data, isLoading, error } = useQuestionByLevel({ level: levelUpper, enabled: !!level && !!token })

  const { mutate: deleteQuestion, isPending } = useDeleteQuestion();

  const handleClick = () => {
    navigate(`/create-question?age=${age}&level=${level}`);
  }
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-white">
      <Header
        user={user}
        logout={handleLogout}
        login={() => navigate('/login')}
      />

      <main className="px-6 py-10">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-black-rock-950 mb-2">
            Preguntas ({age} años - Nivel {level})
          </h2>
        </div>

        <div className="mb-6 flex justify-start">
          <button
            onClick={handleClick}
            className="flex items-center gap-2 bg-black-rock-900 hover:bg-black-rock-950 text-white py-2 px-4 rounded-xl transition shadow-md">
            <Icon name="Plus" />
            Crear nueva pregunta
          </button>
        </div>
        {
          isLoading && <p className="text-black-rock-950"> Cargando Preguntas</p>
        }
        {
          error && <p className="text-red-500">Error al cargar preguntas</p>
        }

        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {data && data.map((q) => (
            <div
              key={q.id}
              className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-2xl px-6 py-4 shadow-sm hover:shadow-md transition"
            >
              <div>
                <h3 className="text-lg font-semibold text-black-rock-950">{q.title}</h3>
                <p className="text-sm text-gray-600">{q.description}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => navigate('/preview')}
                  className="p-2 rounded-full bg-black-rock-100 text-black-rock-950 hover:bg-black-rock-200 transition transform hover:scale-110">
                  <Icon name="Eye" />
                </button>
                <button className="p-2 rounded-full bg-black-rock-100 text-black-rock-950 hover:bg-black-rock-200 transition transform hover:scale-110">
                  <Icon name="Pencil" />
                </button>
                <button
                  onClick={() => deleteQuestion(q.id)}
                  disabled={isPending}
                  className="p-2 rounded-full bg-black-rock-100 text-black-rock-950 hover:bg-black-rock-200 transition transform hover:scale-110">
                  <Icon name="Trash2" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
