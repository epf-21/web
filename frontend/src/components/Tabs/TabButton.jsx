export default function TabButton({ label, isActive, onClick }) {
  return (
    <button
      className={`p-4 border-b-2  rounded-t-lg hover:cursor-pointer ${isActive
          ? 'text-blue-600 border-blue-600'
          : 'text-gray-500 border-transparent hover:text-gray-600 hover:border-gray-300'
        }`}
      onClick={onClick}
    >
      {label}
    </button>
  )
}