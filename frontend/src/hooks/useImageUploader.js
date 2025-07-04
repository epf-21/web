import { useEffect, useState } from 'react';

export function useImageUploader() {
  const [images, setImages] = useState([]);
  const [imageURLS, setImageURLs] = useState([]);

  useEffect(() => {
    const newImageUrls = images.map((image) => {
      if (image instanceof File) {
        return URL.createObjectURL(image);
      }
      return image;
    });
    setImageURLs(newImageUrls);

    return () => {
      newImageUrls.forEach((url) => URL.revokeObjectURL(url));
    }
  }, [images]);

  const onSelectChange = (e) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const fileList = Array.from(e.target.files);
    setImages((prev) => [...prev, ...fileList]);
  }
  const removeFile = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };
  const setImagesFromURLs = (urls) => {
    setImages(urls);
  };

  return {
    images,
    imageURLS,
    onSelectChange,
    removeFile,
    setImagesFromURLs
  }
}
