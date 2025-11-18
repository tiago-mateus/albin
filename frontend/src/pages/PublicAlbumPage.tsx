import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';

const mockPhotos = Array.from({ length: 6 }).map((_, i) => ({ id: i, url: `https://picsum.photos/400?${i}` }));

export default function PublicAlbumPage() {
  const { publicUrl } = useParams();
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="max-w-5xl mx-auto py-10 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold">Álbum público</h1>
            <p className="text-slate-500">Link temporário: {publicUrl}</p>
          </div>
          <a className="bg-black text-white px-4 py-2 rounded" href="#">
            Baixar tudo (ZIP)
          </a>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {mockPhotos.map((photo) => (
            <img key={photo.id} src={photo.url} className="rounded" />
          ))}
        </div>
      </div>
    </div>
  );
}
