import Link from "next/link";

export default function Nav() {
  return (
    <nav className="flex flex-wrap items-center justify-start gap-3 text-sm font-semibold text-white sm:justify-end">
      <Link
        href="/"
        className="rounded-full border border-white/20 bg-white/10 px-4 py-2 transition hover:bg-white/20"
      >
        Início
      </Link>
      <Link
        href="/curriculos/criar"
        className="rounded-full border border-white/20 bg-white/10 px-4 py-2 transition hover:bg-white/20"
      >
        Criar Currículo
      </Link>
  
    </nav>
  );
}
