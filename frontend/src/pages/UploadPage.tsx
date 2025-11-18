import { useParams } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import ModalUpload from '../components/ModalUpload';

export default function UploadPage() {
  const { id } = useParams();
  const [files, setFiles] = useState<File[]>([]);
  const [message, setMessage] = useState('');

  const upload = async () => {
    for (const file of files) {
      const presign = await axios.post(`/api/photos/${id}/presign`, { fileName: file.name });
      await axios.put(presign.data.uploadUrl, file, { headers: { 'Content-Type': file.type } });
      await axios.post(`/api/photos/${id}`, { url_original: presign.data.fileUrl, size_kb: Math.round(file.size / 1024) });
    }
    setMessage('Upload concluído. Thumbnails e ZIP serão gerados automaticamente.');
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="max-w-3xl mx-auto py-10 space-y-4">
        <h2 className="text-2xl font-semibold">Upload para álbum {id}</h2>
        <ModalUpload onFilesSelected={setFiles} />
        <button onClick={upload} className="bg-black text-white px-4 py-2 rounded">
          Enviar fotos
        </button>
        {message && <p className="text-green-600">{message}</p>}
      </div>
    </div>
  );
}
