import { useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import Icon from '../components/Icon';
import Header from '../components/Header';
import QuestionCard from '../components/QuestionCard';
import Loading from '../components/Loading';
import Error from '../components/Error';
import { useAuthStore } from '../stores/useAuthStore';
import { useDeleteQuestion, useQuestionByLevel } from '../hooks/useQuestion';

export default function QuestionManager() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const age = searchParams.get('age');
  const level = searchParams.get('level');
  const levelUpper = level?.toUpperCase();

  const { token } = useAuthStore();

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

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="px-6 py-10">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-black-rock-950 mb-2">
            Preguntas ({age} años - Nivel {level})
          </h2>
        </div>

        <div className="mb-6 flex justify-start">
          <button
            onClick={handleClick}
            className="flex items-center gap-2 bg-black-rock-950 hover:bg-black text-white py-2 px-4 rounded-xl transition shadow-md cursor-pointer">
            <Icon name="Plus" />
            Crear nueva pregunta
          </button>
        </div>
        {
          isLoading && <Loading />
        }
        {
          error && <Error message="Error al cargar las preguntas" />
        }

        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {data && data.map((question) => (
            <QuestionCard
              key={question.id}
              question={question}
              onPreview={() => navigate(`/preview/${question.id}`)}              
              onEdit={() => navigate(`/edit-question/${question.id}?level=${level}`)}
              onConfig={() => navigate(`/configure-question/${question.id}`)}
              onDelete={() => deleteQuestion(question.id)}
              isDeleting={isPending}
            />
          ))}
        </div>
      </main>
    </div>
  )
}
