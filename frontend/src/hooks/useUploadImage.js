import { useMutation } from '@tanstack/react-query';
import { uploadImage } from '../services/uploadService';

export const useUploadImages = () => {
  return useMutation({
    mutationFn: async (images) => {
      const uploads = await Promise.all(
        images.map(async (image) => {
          const response = await uploadImage(image);
          return {
            nombre: image.name.split('.')[0],
            url: response.secure_url,
          };
        })
      );
      return uploads;
    }
  });
};

