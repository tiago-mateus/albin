import { useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

export default function CreateAlbumPage() {
  const [title, setTitle] = useState('');
  const [expiresAt, setExpiresAt] = useState('7d');
  const [message, setMessage] = useState('');

  const submit = async () => {
    const expires = expiresAt === '24h' ? 1 : expiresAt === '30d' ? 30 : 7;
    await axios.post('/api/albums', { userId: 'demo-user', title, expiresAt: new Date(Date.now() + expires * 24 * 60 * 60 * 1000) });
    setMessage('Álbum criado. Faça upload das fotos!');
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="max-w-xl mx-auto py-10 space-y-4">
        <h2 className="text-2xl font-semibold">Criar Álbum</h2>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Nome do álbum"
          className="w-full border px-3 py-2 rounded"
        />
        <select value={expiresAt} onChange={(e) => setExpiresAt(e.target.value)} className="w-full border px-3 py-2 rounded">
          <option value="24h">Expira em 24h</option>
          <option value="7d">Expira em 7 dias</option>
          <option value="30d">Expira em 30 dias</option>
        </select>
        <button onClick={submit} className="bg-black text-white px-4 py-2 rounded w-full">
          Criar
        </button>
        {message && <p className="text-green-600">{message}</p>}
      </div>
    </div>
  );
}
