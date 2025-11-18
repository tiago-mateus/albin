import Navbar from '../components/Navbar';
import CardAlbum from '../components/CardAlbum';
import ButtonUpgradePlan from '../components/ButtonUpgradePlan';

const mockAlbums = [
  { id: '1', title: 'Viagem', description: 'Praia', status: 'active', downloads: 12 },
  { id: '2', title: 'Evento', description: 'Casamento', status: 'expired', downloads: 50 },
];

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="max-w-5xl mx-auto py-10 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Dashboard</h1>
            <p className="text-slate-600">Uso do plano Free: 1/1 álbuns, 75MB/100MB</p>
          </div>
          <ButtonUpgradePlan />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mockAlbums.map((album) => (
            <CardAlbum key={album.id} album={album} />
          ))}
        </div>
      </div>
    </div>
  );
}
