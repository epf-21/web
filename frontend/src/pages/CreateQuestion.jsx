import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Header from '../components/Header';
import QuestionForm from '../components/QuestionForm';
import ImageUploader from '../components/ImageUploader';
import FeedbackMessage from '../components/FeedbackMessage';
import { useImageUploader } from '../hooks/useImageUploader';
import { useUploadImages } from '../hooks/useUploadImage';
import { useCreateQuestion } from '../hooks/useQuestion';
import { validateQuestion } from '../schemas/question.schema';

export default function CreateQuestion() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const level = searchParams.get('level')?.toUpperCase();

  const [message, setMessage] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [explanation, setExplanation] = useState('');
  const [formErrors, setFormErrors] = useState({})

  const { images, imageURLS, onSelectChange, removeFile } = useImageUploader();

  const { mutateAsync: uploadImages, isPending: isPendingImage } = useUploadImages();
  const { mutate: createQuestion, isPending } = useCreateQuestion();

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    if (formErrors.titulo) {
      setFormErrors(prev => ({ ...prev, titulo: undefined }));
    }
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
    if (formErrors.descripcion) {
      setFormErrors(prev => ({ ...prev, descripcion: undefined }));
    }
  };

  const handleExplanationChange = (e) => {
    setExplanation(e.target.value);
    if (formErrors.explicacion) {
      setFormErrors(prev => ({ ...prev, explicacion: undefined }));
    }
  };


  const handleImageChange = (e) => {
    onSelectChange(e);
    if (formErrors.imagenes) {
      setFormErrors(prev => ({ ...prev, imagenes: undefined }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormErrors({});

    try {
      if (images.length > 10) {
        setMessage({
          type: 'error',
          message: 'Solo puedes subir un maximo de 10 imagenes'
        });
        return;
      }

      const uploadedImages = await uploadImages(images);

      const questionData = {
        titulo: title,
        descripcion: description,
        explicacion: explanation,
        nivel: level,
        imagenes: uploadedImages,
      };

      const result = validateQuestion(questionData);
      if (!result.success) {
        const fieldErrors = {};
        result.error.errors.forEach((err) => {
          fieldErrors[err.path[0]] = err.message;
        });
        setFormErrors(fieldErrors);
        return;
      }
      createQuestion(questionData, {
        onSuccess: (data) => {
          const id = data.data.id;
          setMessage(null);
          navigate(`/configure-question/${id}`);
        },
        onError: () => {
          setMessage({
            type: 'error',
            message: 'Error al crear la pregunta'
          });
        }
      })
    } catch (error) {
      console.error(error);
      setMessage({
        type: 'error',
        message: 'Error al subir las imágenes'
      })
    }

  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="w-full px-6 md:px-12 py-10">
        <h2 className="text-3xl font-bold mb-10 text-black-rock-950 text-center">
          Crear Nueva Pregunta
        </h2>
        <h3 className="text-lg font-semibold mb-4 border-b pb-2">
          Llenar el formulario
        </h3>
        <form onSubmit={handleSubmit} className="space-y-2">
          <QuestionForm
            title={title}
            description={description}
            explanation={explanation}
            onTitleChange={handleTitleChange}
            onInstructionChange={handleDescriptionChange}
            onExplanationChange={handleExplanationChange}
            error={formErrors}
          />
          <ImageUploader
            imageURLS={imageURLS}
            onSelectChange={handleImageChange}
            removeFile={removeFile}
            error={formErrors}
          />

          <div>
            {message && (
              <FeedbackMessage
                type={message.type}
                message={message.message}
              />
            )}
            <button
              type="submit"
              className="px-6 py-3 bg-black-rock-950 text-white rounded-xl text-sm hover:bg-black transition focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              {(isPending || isPendingImage) ? 'Guardando' : 'Guardar'}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}