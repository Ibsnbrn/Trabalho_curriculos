import Nav from "../Nav_bar/Nav";

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-violet-500 via-fuchsia-900 to-indigo-500 text-white shadow-lg">
      <div className="mx-auto flex max-w-6xl flex-col gap-1 px-1 py-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="max-w-2xl"> 
          <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            Construa currículos profissionais com confiança
          </h1>
          <p className="mt-3 text-sm text-violet-200/90 sm:text-base">
            Use o site para criar seu currículo, obter inspiração e ver exemplos prontos prontos para o mercado.
          </p>
        </div>
        <Nav />
      </div>
    </header>
  );
}
