  import { useState,useEffect  } from 'react';
  import { useNavigate, useSearchParams, useParams} from 'react-router-dom';
  import QuestionForm from '../components/QuestionForm';
  import ImageUploader from '../components/ImageUploader';
  import { useImageUploader } from '../hooks/useImageUploader';
  import { useUploadImages } from '../hooks/useUploadImage';
  import { useQuestionById, useUpdateQuestion } from '../hooks/useQuestion';
  import { validateQuestion } from '../schemas/question.schema';
  import Header from '../components/Header';

  export default function EditQuestion() {
    const navigate = useNavigate();

    const [searchParams] = useSearchParams();
    const level = searchParams.get('level')?.toUpperCase();
    const { id } = useParams();
    const { data: question, isLoading, error } = useQuestionById(id);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [explanation, setExplanation] = useState('');
    const [formErrors, setFormErrors] = useState({})
    const { images, imageURLS, onSelectChange, removeFile,setImagesFromURLs} = useImageUploader();
    const { mutateAsync: uploadImages, isPending: isPendingImage } = useUploadImages();
    const { mutate: updateQuestion, isPending } = useUpdateQuestion();
    const [imagenes, setImagenes] = useState([]);
    useEffect(() => {
      if (question && question.images?.length) {
        setTitle(question.title || '');
        setDescription(question.description || '');
        setExplanation(question.explanation || '');
        const urls = question.images.map(img => img.url);
        setImagesFromURLs(urls);
        const imgs = question.images.map(img => ({
          nombre: img.name,
          url: img.url
        }));
        setImagenes(imgs);
      }
    }, [question]);

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
        const imagenesCloudinary = images
          .filter((img) => {
            const url = typeof img === 'string' ? img : img?.url;
            return typeof url === 'string' && url.includes('res.cloudinary.com');
          })
          .map((img) => {
            const url = typeof img === 'string' ? img : img.url;
            const imagenCompleta = imagenes.find(imgOriginal => imgOriginal.url === url);
            return imagenCompleta || { url };
          });
        const imagenesFiltradas = imagenesCloudinary;
        const archivosLocales = images.filter((img) => img instanceof File);
        const uploaded = await uploadImages(archivosLocales);
        const imagenesFinales = [
          ...imagenesFiltradas,
          ...uploaded
        ];
        const questionData = {
          titulo: title,
          descripcion: description,
          explicacion: explanation,
          nivel: level,
          imagenes: imagenesFinales,
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

        updateQuestion({id:id,data:questionData});
      } catch (error) {
        console.error(error);
        alert('Error al subir las imágenes');
      }

    };
    
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main className="w-full px-6 md:px-12 py-10">
          <h2 className="text-3xl font-bold mb-10 text-black-rock-950 text-center">
            Editar Pregunta
          </h2>
          <h3 className="text-lg font-semibold mb-4 border-b pb-2">
            Editar el formulario
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

            <div className="flex justify-start pt-3">
              <button
                type="submit"
                className="px-6 py-3 bg-black-rock-900 text-white rounded-xl text-sm hover:bg-black-rock-950 transition focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                {(isPending || isPendingImage) ? 'Guardando' : 'Guardar'}
              </button>
            </div>
          </form>
        </main>
      </div>
    );
  }