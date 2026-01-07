export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-black">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-lg mb-6">Страница не найдена</p>
      <a
        href="/"
        className="px-4 py-2  text-white rounded hover:bg-gray-800 transition"
      >
        На главную
      </a>
    </div>
  );
}
