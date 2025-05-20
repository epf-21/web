import TabButton from "./TabButton";

export default function Tabs({ activeTab, onTabClick }) {
  const tabs = [
    { id: 'tab1', label: 'Pregunta' },
    { id: 'tab2', label: 'Subir Imágenes' },
  ]

  return (
    <div className="flex border-b border-gray-200">
      {
        tabs.map(tab => (
          <TabButton
            key={tab.id}
            label={tab.label}
            isActive={activeTab === tab.id}
            onClick={() => onTabClick(tab.id)}
          />
        ))
      }
    </div>
  )
}