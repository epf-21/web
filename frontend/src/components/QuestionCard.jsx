import ActionButton from "./ActionButton";

export default function QuestionCard({ question, onPreview, onEdit, onConfig, onDelete, isDeleting }) {
  return (
    <div className="flex items-center justify-between bg-white border border-gray-200 rounded-2xl px-5 py-4 shadow hover:shadow-md transition-all">
      <div className="flex-1 pr-4">
        <h3 className="text-base font-bold text-black-rock-950 truncate">{question.title}</h3>
        <p className="text-sm text-gray-600 mt-1 line-clamp-2">{question.description}</p>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <ActionButton icon="Eye" onClick={() => onPreview(question.id)} />
        <ActionButton icon="Pencil" onClick={() => onEdit(question.id)} />
        <ActionButton icon="Cog" onClick={() => onConfig(question.id)} />
        <ActionButton icon="Trash2" onClick={() => onDelete(question.id)} disabled={isDeleting} />
      </div>
    </div>
  );
}