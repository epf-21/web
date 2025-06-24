export default function FeedbackMessage({ type, message }) {
  const colorClass = type === 'error'
    ? 'text-red-600'
    : 'text-green-600'
  return (
    <p className={`mb-2 text-sm font-medium ${colorClass}`}>
      {message}
    </p>
  )
}