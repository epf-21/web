import { useRef } from "react";
import { Trash2 } from "lucide-react";

export default function ImageUploader({ imageURLS, onSelectChange, removeFile }) {
  const inputRef = useRef(null);

  const handleSelect = (e) => {
    onSelectChange(e);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className="space-y-4 pt-2">
      <h3 className="font-semibold text-xl">Subir imágenes</h3>

      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleSelect}
        ref={inputRef}
        className="w-full p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
      />

      {imageURLS.length > 0 && (
        <div className="relative mt-4">
          <div className="flex gap-4 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 pb-2">
            {imageURLS.map((url, i) => (
              <div
                key={i}
                className="relative min-w-[160px] max-w-[160px] h-[120px] flex-shrink-0 border border-gray-300 rounded-lg overflow-hidden"
              >
                <img
                  src={url}
                  alt={`preview-${i}`}
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => removeFile(i)}
                  className="absolute top-1 right-1 bg-blue-950 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition hover:opacity-100"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}