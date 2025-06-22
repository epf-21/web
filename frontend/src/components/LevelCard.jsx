import Icon from './Icon';

export default function LevelCard({ age, level, label, icon, onClick }) {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer p-6 rounded-2xl bg-black-rock-950 text-white transition-all duration-200 transform hover:scale-105 "
    >
      <div className="flex items-center justify-center mb-5 bg-white/10 p-4 rounded-full w-16 h-16 mx-auto ">
        <Icon name={icon} className="w-8 h-8 text-white" />
      </div>
      <h3 className="text-xl font-semibold text-center">{label}</h3>
      <p className="text-sm text-gray-300 text-center mt-1">
        Edad: {age} &bull; Nivel: {level}
      </p>
    </div>
  );
}
