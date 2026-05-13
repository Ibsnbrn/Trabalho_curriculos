import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex-1">
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-6">
            <p className="text-sm uppercase tracking-[0.3em] text-violet-300/80">Faça seu currículo</p>
            <h2 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Crie seu currículo e inspire-se com exemplos prontos.
            </h2>
            <p className="max-w-2xl text-lg leading-8 text-slate-300">
              Um site pensado para quem quer montar um currículo profissional sem complicaçõe. Veja modelos prontos, descubra boas seções e comece já.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/curriculos/criar"
                className="inline-flex items-center justify-center rounded-full bg-violet-500 px-5 py-3 text-sm font-semibold text-black transition hover:bg-violet-400"
              >
                Criar meu currículo
              </Link>
              <Link
                href="/curriculos"
                className="inline-flex items-center justify-center rounded-full border border-violet-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/5"
              >
                Ver currículos prontos
              </Link>
              <a
                href="#o-que-fazemos"
                className="inline-flex items-center justify-center rounded-full border border-violet-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/5"
              >
                Saiba mais
              </a>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-xl shadow-violet-500/10">
            <div className="space-y-5 text-slate-100">
              <div className="rounded-3xl bg-slate-950/80 p-6 shadow-inner shadow-black/30">
                <p className="text-sm uppercase tracking-[0.3em] text-violet-200">Exemplo de currículo</p>
                <h3 className="mt-4 text-2xl font-semibold text-white">Bruna Alves</h3>
                <p className="mt-2 text-sm text-slate-300">Analista de Marketing Digital</p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl bg-slate-900/90 p-5">
                  <p className="text-xs uppercase tracking-[0.2em] text-violet-300">Resumo</p>
                  <p className="mt-3 text-sm leading-6 text-slate-300">
                    Profissional focada em estratégias digitais, com experiência em campanhas de alto impacto.
                  </p>
                </div>
                <div className="rounded-3xl bg-slate-900/90 p-5">
                  <p className="text-xs uppercase tracking-[0.2em] text-violet-300">Habilidades</p>
                  <ul className="mt-3 space-y-2 text-sm text-slate-300">
                    <li>Comunicação</li>
                    <li>SEO</li>
                    <li>Design de apresentações</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="o-que-fazemos" className="border-t border-white/10 bg-slate-950/80 px-6 py-16">
        <div className="mx-auto max-w-6xl space-y-10">
          <div className="space-y-4 text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-violet-300/80">O que oferecemos</p>
            <h2 className="text-3xl font-semibold text-white sm:text-4xl">
              Um site simples para criar e conhecer currículos prontos
            </h2>
            <p className="mx-auto max-w-2xl text-slate-300">
              Aqui você encontra dicas de estrutura, exemplos prontos e um visual escuro moderno para destacar seu currículo.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {[
              {
                title: "Modelo Profissional",
                description: "Currículos prontos para quem busca vagas formais e áreas corporativas.",
              },
              {
                title: "Modelo Criativo",
                description: "Formatação ideal para quem trabalha com design, marketing ou conteúdo.",
              },
              {
                title: "Modelo de Estagiário",
                description: "Exemplos claros para quem está começando a carreira.",
              },
            ].map((item) => (
              <div key={item.title} className="rounded-3xl border border-white/10 bg-white/5 p-6 text-slate-300">
                <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-6">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
