import { useNavigate } from 'react-router-dom';

export default function TemplateCard({ name, description, path }) {
  const navigate = useNavigate();

  return (
    <div
      className="border rounded-xl p-6 hover:shadow-lg cursor-pointer transition"
      onClick={() => navigate(path)}
    >
      <h2 className="text-xl font-semibold mb-2">
        {name}
      </h2>
      <p className="text-gray-600">
        {description}
      </p>
    </div>
  );
}