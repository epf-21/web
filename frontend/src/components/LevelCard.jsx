import Icon from './Icon';

export default function LevelCard({ age, level, label, icon, onClick }) {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer p-6 rounded-2xl bg-black-rock-950 text-white hover:scale-105 transform transition-all duration-200 shadow-xl border border-black-rock-900"
    >
      <div className="flex items-center justify-center mb-4 bg-white/10 p-3 rounded-full">
        <Icon name={icon} className="mr-2" />
      </div>
      <h3 className="text-lg font-semibold text-center">{label}</h3>
      <p className="text-sm text-gray-300 text-center mt-1">
        Edad: {age} &bull; Nivel: {level}
      </p>
    </div>
  );
}