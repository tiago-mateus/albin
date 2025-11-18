import { Link } from 'react-router-dom';

export default function CardAlbum({ album }: { album: { id: string; title: string; description?: string; status: string; downloads: number } }) {
  return (
    <div className="border rounded p-4 bg-white shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">{album.title}</h3>
          <p className="text-slate-600 text-sm">{album.description}</p>
        </div>
        <span className={`text-xs px-2 py-1 rounded ${album.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-slate-200 text-slate-600'}`}>
          {album.status}
        </span>
      </div>
      <p className="text-sm text-slate-500 mt-2">Downloads: {album.downloads}</p>
      <div className="flex gap-2 mt-4 text-sm">
        <Link className="bg-black text-white px-3 py-1 rounded" to={`/albums/${album.id}/upload`}>
          Upload
        </Link>
        <a className="underline" href={`/a/${album.id}`}>
          Link público
        </a>
      </div>
    </div>
  );
}
