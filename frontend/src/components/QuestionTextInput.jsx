export default function QuestionTextInput({ label, value, onChange, placeholder, isTextArea = false }) {
  return (
    <div>
      <label className="block mb-2 text-sm font-semibold text-gray-900">
        {label}
      </label>
      {
        isTextArea ? (
          <textarea
            value={value}
            onChange={onChange}
            className="w-full p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            placeholder={placeholder}
          />
        ) : (
          <input
            type="text"
            value={value}
            onChange={onChange}
            className="w-full p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            placeholder={placeholder}
          />
        )
      }
    </div>
  )
}