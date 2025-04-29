import TemplateCard from '../components/TemplateCard';

const templates = [
  { id: 1, name: "Arrastrar y soltar", description: "Organiza elementos arrastrándolos", path: '/Arrastrar-Soltar' },
  { id: 2, name: "Selecciona Respuesta", description: "Elige la respuesta correcta entre varias opciones.", path: '/Seleccionar-Respuesta' },
  { id: 3, name: "Ordenar Elementos", description: "Ordena los elementos en el orden correcto.", path: '/Ordenar-Elementos' },
];

export default function Home() {

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Elige una plantilla</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => (
          <TemplateCard
            key={template.id}
            name={template.name}
            description={template.description}
            path={template.path}
          />
        ))}
      </div>
    </div>
  );
}
