export default function QuestionTextInput({ label, value, onChange, placeholder }) {
  return (
    <div className="space-y-6 text-black-rock-950">
      <label className="block mb-2 text-xl font-semibold text-black-rock-950">
        {label}
      </label>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-4 py-2.5 text-sm bg-gray-100 border-2 border-transparent rounded-xl focus:outline-none focus:border-black-rock-950 focus:bg-white transition"
      />
    </div>
  )
}