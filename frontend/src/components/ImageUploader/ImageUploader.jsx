import { useState,useEffect } from "react"
export default function ImageUploader() {  
  const [images, setImages] = useState([]);
  const [imageURLS, setImageURLs] = useState([]);
  useEffect(() => {
    if (images.length < 1) return
    const newImageUrls = [];      
    images.forEach((image) =>{
      console.log(image)
      const objectUrl = URL.createObjectURL(image)
      newImageUrls.push(objectUrl)
      // liberar memoria
      return () => URL.revokeObjectURL(objectUrl)
    })
    setImageURLs(newImageUrls);
  }, [images]);
  const onSelectChange = e => {
      if (!e.target.files || e.target.files.length === 0) return
      setImages([...e.target.files]);
  }
  const removeFile = (i) => {
    const files = images.filter((_, index) => index !== i);            
    setImages([...files]);
  };
  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg">Subir imágenes</h3>
      <div>        
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={onSelectChange}
          className="w-full p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"          
        />
        <ul className="divide-y divide-gray-200">        
        {images.map((image,i) => (
        <li className="flex items-center gap-2 py-3" key={i} >
          <img src={imageURLS[i]} alt="not fount" className="w-16" />
          <p className="text-gray-900 w-sm">{image.name}</p>
          <p className="text-gray-500 w-16">{Math.floor(image.size/1024)} Kb</p>
          <button type="button" 
          className="px-3 py-2 text-xs font-medium text-center text-gray-900 border border-gray-300 bg-white rounded-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100"
          onClick={() => {removeFile(i);}} >
            Remove
          </button>
        </li>
        ))}
        </ul>
        <button className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-md text-sm px-5 py-2.5 text-center me-2 my-2">
          Subir Archivos</button>
      </div>
    </div>    
  );  
}