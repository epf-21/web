export default function Button({
  children,
  type = 'button',
  disabled = false,
  isLoading = false,
  loadingText = 'Cargando...',
  className = '',
  ...props
}) {
  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      className={`px-4 py-2 bg-black-rock-950 text-white rounded-xl hover:bg-black transition-all cursor-pointer ${className}`}
      {...props}
    >
      {isLoading ? loadingText : children}
    </button>
  )
}