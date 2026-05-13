export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-6 sm:flex-row sm:items-center sm:justify-between">
        <p>Faça currículos rápidos, bonitos e práticos com exemplos profissionais.</p>
        <p className="text-sm">© {new Date().getFullYear()} Fazer Currículos</p>
      </div>
    </footer>
  );
}
