export default function Error({ message = 'Ha ocurrido un error' }) {
  return (
    <div className="flex items-center justify-center text-black pt-8">
      <span>{message}</span>
    </div>
  )
}