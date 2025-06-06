import axios from 'axios';
import { UPLOAD_PRESET, CLOUD_NAME } from '../constants/claudinary';

export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', UPLOAD_PRESET)
  const { data } = await axios.post(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, formData);
  return data;
}
