import { useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const submit = async () => {
    await axios.post('/api/auth/supabase', { email, name });
    setMessage('Login iniciado. Verifique seu email ou continue no app.');
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="max-w-md mx-auto py-10 space-y-4">
        <h2 className="text-2xl font-semibold">Login / Cadastro</h2>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full border px-3 py-2 rounded"
        />
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nome"
          className="w-full border px-3 py-2 rounded"
        />
        <button onClick={submit} className="bg-black text-white px-4 py-2 rounded w-full">
          Entrar com Supabase
        </button>
        {message && <p className="text-green-600">{message}</p>}
      </div>
    </div>
  );
}
