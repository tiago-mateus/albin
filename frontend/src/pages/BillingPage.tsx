import { useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import ButtonUpgradePlan from '../components/ButtonUpgradePlan';

export default function BillingPage() {
  const [message, setMessage] = useState('');

  const checkout = async (plan: 'pro' | 'premium') => {
    const session = await axios.post('/api/billing/checkout', { userId: 'demo-user', plan });
    setMessage(`Sessão criada: ${session.data.id}. Redirecione para Stripe Checkout.`);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="max-w-3xl mx-auto py-10 space-y-4">
        <h2 className="text-2xl font-semibold">Planos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border p-4 rounded">
            <h3 className="text-xl font-semibold">Pro</h3>
            <p className="text-slate-600">20 álbuns, 10GB</p>
            <button onClick={() => checkout('pro')} className="bg-black text-white px-3 py-2 rounded mt-3 w-full">
              Assinar Pro
            </button>
          </div>
          <div className="border p-4 rounded">
            <h3 className="text-xl font-semibold">Premium</h3>
            <p className="text-slate-600">100 álbuns, 50GB</p>
            <button onClick={() => checkout('premium')} className="bg-black text-white px-3 py-2 rounded mt-3 w-full">
              Assinar Premium
            </button>
          </div>
        </div>
        <ButtonUpgradePlan />
        {message && <p className="text-green-600">{message}</p>}
      </div>
    </div>
  );
}
