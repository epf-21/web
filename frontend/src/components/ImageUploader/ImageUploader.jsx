import { useState,useEffect } from "react"
export default function ImageUploader({ onImageChange }) {
  const [selectedFile, setSelectedFile] = useState()
  const [preview, setPreview] = useState()
  useEffect(() => {
    if (!selectedFile) {
        setPreview(undefined)
        return
    }
    const objectUrl = URL.createObjectURL(selectedFile)
        setPreview(objectUrl)
        // liberar memoria
        return () => URL.revokeObjectURL(objectUrl)
    }, [selectedFile])

    const onSelectChange = e => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined)
            return
        }
        setSelectedFile(e.target.files[0])
    }
  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg">Subir imágenes</h3>
      <div>
        <label className="block mb-2 text-sm font-semibold text-gray-900">
          Imagen
        </label>
        <img src={preview} className="max-w-xs"/>
        <input
          type="file"
          onChange={onSelectChange}
          className="w-full p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          accept="image/*"
        />
        <button className="text-gray-900 bg-gray-100 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">Subir Archivo</button>
      </div>
    </div>
  );
}