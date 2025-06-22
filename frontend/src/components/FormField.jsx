import Icon from "./Icon";

export default function FormField({
  label,
  name,
  type = 'text',
  value,
  onChange,
  placeholder,
  icon,
  rightIcon,
  error,
  className = '',
  ...props
}) {
  return (
    <div className={className}>
      <label
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
      </label>

      <div className="relative">
        <Icon name={icon} className="absolute left-3 top-2.5 text-gray-400" />
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black-rock-950"
          placeholder={placeholder}
          {...props}
        />
        {rightIcon}
      </div>
      {error && (
        <p className="text-sm text-red-500 mt-1">{error}</p>
      )}
    </div>
  );
}