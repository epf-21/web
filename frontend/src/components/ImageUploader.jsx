import { useRef } from "react";
import { useImageUploader } from "../hooks/useImageUploader";
import { Trash2 } from "lucide-react";

export default function ImageUploader() {
  const inputRef = useRef(null);
  const { imageURLS, onSelectChange, removeFile } = useImageUploader();

  const handleSelect = (e) => {
    onSelectChange(e);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg">Subir imágenes</h3>
      <div>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleSelect}
          ref={inputRef}
          className="w-full p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
        />
        {imageURLS.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
            {imageURLS.map((url, i) => (
              <div
                key={i}
                className="relative group border border-gray-300 rounded-md overflow-hidden"
              >
                <img
                  src={url}
                  alt={`preview-${i}`}
                  className="w-full h-32 object-cover"
                />
                <button
                  type="button"
                  onClick={() => removeFile(i)}
                  className="absolute top-1 right-1 bg-blue-950 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}