import ActionButton from "./ActionButton";

export default function QuestionCard({ question, onPreview, onEdit, onDelete, isDeleting }) {
  return (
    <div
      className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-2xl px-6 py-4 shadow-sm hover:shadow-md transition"
    >
      <div>
        <h3 className="text-lg font-semibold text-black-rock-950">{question.title}</h3>
        <p className="text-sm text-gray-600">{question.description}</p>
      </div>
      <div className="flex gap-2">
        <ActionButton
          icon="Eye"
          onClick={() => onPreview(question.id)}
        />
        <ActionButton
          icon="Pencil"
          onClick={() => onEdit(question.id)}
        />
        <ActionButton
          icon="Trash2"
          onClick={() => onDelete(question.id)}
          disabled={isDeleting}
        />
      </div>
    </div>
  );
}