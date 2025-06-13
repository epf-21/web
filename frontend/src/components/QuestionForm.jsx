import QuestionTextInput from './QuestionTextInput';

export default function QuestionForm({
  title,
  description,
  explanation,
  onTitleChange,
  onInstructionChange,
  onExplanationChange,
  error,
}) {
  return (
    <div className="space-y-8 text-black-rock-950">
      <section className="space-y-4">
        <QuestionTextInput
          label="Título"
          value={title}
          onChange={onTitleChange}
          placeholder="Título de la pregunta"
          error={error.titulo ? error.titulo : null}
        />

        <QuestionTextInput
          label="Descripción"
          value={description}
          onChange={onInstructionChange}
          placeholder="Descripción de la pregunta"
          error={error.descripcion ? error.descripcion : null}
        />

        <QuestionTextInput
          label="Explicación"
          value={explanation}
          onChange={onExplanationChange}
          placeholder="Explicación de la pregunta"
          error={error.explicacion ? error.explicacion : null}
        />
      </section>
    </div>
  );
}
