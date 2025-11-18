export default function Navbar() {
  return (
    <header className="border-b bg-white">
      <div className="max-w-6xl mx-auto flex items-center justify-between py-4 px-4">
        <a href="/" className="font-bold text-xl">
          ALBIN
        </a>
        <nav className="flex items-center gap-4 text-sm">
          <a href="/dashboard">Dashboard</a>
          <a href="/albums/new">Criar álbum</a>
          <a href="/billing">Planos</a>
          <a href="/login" className="bg-black text-white px-3 py-1 rounded">
            Login
          </a>
        </nav>
      </div>
    </header>
  );
}
