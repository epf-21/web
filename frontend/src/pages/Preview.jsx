import { useParams } from 'react-router-dom';
import PreviewPanel from '../components/PreviewPanel';
export default function Preview() {
  const { id } = useParams();
  return (
    <>
      <PreviewPanel id={id} />
    </>
  )
}