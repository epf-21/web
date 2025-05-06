import QuestionTextInput from './QuestionTextInput';
import AnswerInputList from './AnswerInputList';

export default function QuestionForm({
  title,
  instruction,
  correctAnswers,
  explanation,
  onTitleChange,
  onInstructionChange,
  onAnswerChange,
  onAddAnswer,
  onExplanationChange,
}) {
  return (
    <div className="space-y-4">
      <QuestionTextInput
        label="Título"
        value={title}
        onChange={onTitleChange}
        placeholder="Título de la pregunta"
      />

      <QuestionTextInput
        label="Instrucciones"
        value={instruction}
        onChange={onInstructionChange}
        placeholder="Instrucción para el usuario"
        isTextArea
      />

      <AnswerInputList
        answers={correctAnswers}
        onAnswerChange={onAnswerChange}
        onAddAnswer={onAddAnswer}
        placeholder="Añade las respues correctas"
      />

      <QuestionTextInput
        label="Explicación"
        value={explanation}
        onChange={onExplanationChange}
        placeholder="Explicación de la respuesta correcta"
      />
    </div>
  )
}