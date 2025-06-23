import Icon from './Icon';

export default function ActionButton({ icon, onClick, disabled = false }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="p-2 rounded-full bg-black-rock-100 text-black-rock-950 hover:bg-black-rock-200 transition transform hover:scale-110 cursor-pointer">
      <Icon name={icon} />
    </button>
  );
}