import Navbar from '../components/Navbar';
import ButtonUpgradePlan from '../components/ButtonUpgradePlan';

export default function App() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Navbar />
      <main className="max-w-5xl mx-auto py-20 text-center space-y-6">
        <h1 className="text-4xl font-bold">ALBIN - Compartilhe álbuns monetizados</h1>
        <p className="text-lg text-slate-600">Uploads rápidos, links temporários e limites claros para gerar upgrade.</p>
        <div className="flex justify-center gap-4 mt-6">
          <a className="bg-black text-white px-4 py-2 rounded" href="/login">
            Entrar
          </a>
          <ButtonUpgradePlan />
        </div>
      </main>
    </div>
  );
}
