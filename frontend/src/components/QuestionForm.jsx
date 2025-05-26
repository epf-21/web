import QuestionTextInput from './QuestionTextInput';
export default function QuestionForm({
  title,
  description,
  explanation,
  onTitleChange,
  onInstructionChange,
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
        label="Descripción"
        value={description}
        onChange={onInstructionChange}
        placeholder="Descripción para el usuario"
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