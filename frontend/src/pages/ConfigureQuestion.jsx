import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import domtoimage from 'dom-to-image-more'
import DragDrop from '../components/DragDrop';
import Header from '../components/Header';
import { useQuestionById, useUpdateMainImage, useUpdateImages} from "../hooks/useQuestion";
import { uploadImage } from '../services/uploadService';
import { useCreateSolutions } from '../hooks/useSolutions';
import FeedbackMessage from '../components/FeedbackMessage';

export default function ConfigureQuestion() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: question, isLoading, error } = useQuestionById(id);
  const updateMainImageMutation = useUpdateMainImage();
  const createSolutionsMutation = useCreateSolutions();
  const updateImagesMutation = useUpdateImages();

  const mainImageRef = useRef(null);
  const [message, setMessage] = useState(null);
  const [showBorders, setShowborders] = useState(false);
  const [draggableItems, setDraggableItems] = useState([])
  const [droppedItems, setDroppedItems] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!question) return;

    const processedItems = question.images.map((img) => ({
      id: img.id,
      name: img.name,
      imageUrl: img.url,
      x: img.x,
      y: img.y,
      width: img.width,
      height: img.height,
      group: img.group,
    }));
    const sortedByGroup = [...processedItems].sort((a, b) => a.group - b.group);

    setDroppedItems(sortedByGroup.filter((x) => x.group !== 0));
    console.log(droppedItems);
    setDraggableItems(sortedByGroup.filter((x) => x.group === 0));
  }, [question]);

  if (isLoading) return <p className="text-gray-500 m-4">Cargando pregunta...</p>;
  if (error) return <p className="text-gray-500 m-4">No se pudo cargar la Pregunta.</p>;

  const getPermutations = (arr) => {
    const permutations = [];
    function permute(current, remaining) {
      if (remaining.length === 0) {
        permutations.push(current);
        return;
      }

      for (let i = 0; i < remaining.length; i++) {
        const next = current.concat(remaining[i]);
        const rest = remaining.slice(0, i).concat(remaining.slice(i + 1));
        permute(next, rest);
      }
    }
    permute([], arr);
    return permutations;
  }

  const getAllAnswers = (allItems) => {
    const allAnswers = []
    const grouppedItems = []
    const items = [...allItems]
    items.sort((a, b) => a.group - b.group);
    for (let i = 0; i < items.length; i++) {
      const group = items.filter((x) => x.group === (i + 1))
      if (group.length > 1) {
        grouppedItems.push({ 'group': i + 1, 'elements': group })
      }
    }
    for (let i = 0; i < grouppedItems.length; i++) {
      const permutations = getPermutations(grouppedItems[i].elements)
      const g = grouppedItems[i].group
      for (let j = 0; j < permutations.length; j++) {
        const answersIds = []
        let c = 0
        for (let k = 0; k < items.length; k++) {
          if (items[k].group === g) {
            answersIds.push(permutations[j][c].id)
            c++
          } else {
            answersIds.push(items[k].id)
          }
        }
        allAnswers.push(answersIds)
      }
    }
    if (allAnswers.length === 0) {
      const singleAnswer = []
      items.map(item =>
        singleAnswer.push(item.id)
      )
      allAnswers.push(singleAnswer)
    }
    setAnswers(allAnswers)
  }

  const captureAndUploadMainImage = async () => {
    try {
      if (!mainImageRef.current) {
        throw new Error('No se pudo capturar la imagen principal');
      }

      const tempElement = mainImageRef.current.cloneNode(true);

      tempElement.style.border = 'none';
      tempElement.querySelectorAll('*').forEach(child => {
        child.style.border = 'none';
        child.className = child.className.replace(/border[^\s]*/g, '');
      });

      tempElement.style.position = 'absolute';
      tempElement.style.left = '-9999px';
      tempElement.style.top = '-9999px';
      document.body.appendChild(tempElement);

      const blob = await domtoimage.toBlob(tempElement, {
        quality: 0.9,
        width: tempElement.offsetWidth * 2,
        height: tempElement.offsetHeight * 2,
        style: {
          transform: 'scale(2)',
          transformOrigin: 'top left'
        }
      });

      document.body.removeChild(tempElement);

      const file = new File([blob], `main-image-${question.id}.png`, {
        type: 'image/png'
      });

      const uploadResult = await uploadImage(file);
      return uploadResult.secure_url;

    } catch (error) {
      console.error('Error al capturar/subir imagen:', error);
      throw error;
    }
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);

      if (droppedItems.length === 0) {
        setMessage({
          type: 'error',
          message: 'Debes agregar al menos un elemento a la imagen principal'
        });
        return;
      }

      if (answers.length === 0) {
        setMessage({
          type: 'error',
          message: 'No hay respuestas configuradas'
        });
        return;
      }

      if (showBorders) {
        setMessage({
          type: 'error',
          message: 'Debes quitar la opción --mostrar bordes-- antes de guardar'
        });
        return;
      }

      const mainImageUrl = await captureAndUploadMainImage();

      const updateData = {
        imagenPrincipal: mainImageUrl,
      };

      await updateMainImageMutation.mutateAsync({
        id: question.id,
        mainImage: updateData
      });

      await updateImagesMutation.mutateAsync({
        id: question.id,
        images: [...draggableItems, ...droppedItems]
      });

      await createSolutionsMutation.mutateAsync({
        id: question.id,
        allAnswers: answers
      });
      setMessage(null);
      navigate(`/preview/${question.id}`);

    } catch (error) {
      console.error('Error al guardar:', error);
      setMessage({
        type: 'error',
        message: 'Error al guardar la configuración. Inténtalo de nuevo.'
      });
    } finally {
      setIsSaving(false);
    }
  };


  return (
    <div className="min-h-screen">
      <Header />
      <div className="bg-gray-50 px-8 py-6">
        <div className="mb-4 border-b pb-2 border-black-rock-950">
          <h1 className="text-xl font-bold text-black-rock-950">{question.title}</h1>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="mb-4">
              <h2 className="text-lg font-medium text-gray-900 mb-2">Descripción</h2>
              <p className="text-base text-gray-700">{question.description}</p>
            </div>

            <div>
              <DragDrop
                ref={mainImageRef}
                draggableItems={draggableItems}
                droppedItems={droppedItems}
                setDraggableItems={setDraggableItems}
                setDroppedItems={setDroppedItems}
                getAllAnswers={getAllAnswers}
                showBorders={showBorders}
                setShowborders={setShowborders}
              />
            </div>

            <div className="py-2 rounded-md">
              <h2 className="text-lg font-medium text-gray-900 mb-2">Explicación</h2>
              <p className="text-sm text-gray-700">{question.explanation}</p>
            </div>

            <div className="py-2 rounded-md">
              <h2 className="text-lg font-medium text-gray-900 mb-2">Vista previa respuestas</h2>
              <ol className='list-decimal pl-4'>
                {answers.map((arr, i) => (
                  <li key={i}>
                    {arr.map((id, j) => {
                      const item = droppedItems.find((x) => x.id === id)
                      if (item) {
                        return (
                          <div key={j} className="w-12 h-12 inline-block mx-1 bg-gray-300 rounded-sm">
                            <img src={item.imageUrl} alt={item.name} className='max-w-12 max-h-12' />
                          </div>
                        )
                      }
                    }
                    )}

                  </li>
                ))}
              </ol>
            </div>

            <div>
              {message && (
                <FeedbackMessage
                  type={message.type}
                  message={message.message}
                />
              )}
              <button
                onClick={handleSave}
                disabled={isSaving || updateMainImageMutation.isPending}
                className=" cursor-pointer px-6 py-3 bg-black-rock-950 text-white rounded-xl text-sm hover:bg-black transition focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSaving || updateMainImageMutation.isPending ? 'Guardando...' : 'Guardar'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}