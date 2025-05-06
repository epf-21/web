export default function ImageUploader({ onImageChange }) {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg">Subir imágenes</h3>
      <div>
        <label className="block mb-2 text-sm font-semibold text-gray-900">
          Imagen
        </label>
        <input
          type="file"
          onChange={onImageChange}
          className="w-full p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          accept="image/*"
        />

      </div>
    </div>
  );
}