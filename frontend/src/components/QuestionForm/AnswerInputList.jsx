export default function AnswerInputList({ answers, onAnswerChange, onAddAnswer, placeholder }) {
  return (
    <div>
      <label className="block mb-2 text-sm font-semibold text-gray-900">
        Respuestas Correctas
      </label>
      {
        answers.map((item, index) => (
          <input
            key={index}
            value={item}
            onChange={(e) => onAnswerChange(index, e.target.value)}
            className="w-full p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            placeholder={placeholder}
          />

        ))}
      <button
        type="button"
        onClick={onAddAnswer}
        className="py-2 px-5 text-sm font-medium text-gray-900 bg-gray-100 rounded-lg border border-gray-200 hover:bg-gray-200 focus:outline-none focus:ring-4 focus:ring-gray-100"

      >
        Agregar Respuesta
      </button>
    </div>
  )
}