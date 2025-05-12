import { useEffect, useState } from 'react';

export function useImageUploader() {
  const [images, setImages] = useState([]);
  const [imageURLS, setImageURLs] = useState([]);

  useEffect(() => {
    if (images.length < 1) return

    const newImageUrls = images.map((image) => URL.createObjectURL(image));
    setImageURLs(newImageUrls);

    return () => {
      newImageUrls.forEach((url) => URL.revokeObjectURL(url));
    }
  }, [images]);

  const onSelectChange = (e) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const fileList = Array.from(e.target.files);
    setImages(fileList);
  }
  const removeFile = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  return {
    images,
    imageURLS,
    onSelectChange,
    removeFile,
  }
}
