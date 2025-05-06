export default function TabButton({ label, isActive, onClick }) {
  return (
    <button
      className={`px-6 py-3 font-medium text-sm focus:outline-none ${isActive
          ? 'bg-blue-500 text-white'
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      onClick={onClick}
    >
      {label}
    </button>
  )
}