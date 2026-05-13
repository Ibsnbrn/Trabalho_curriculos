const examples = [
  {
    title: "Currículo Corporativo",
    role: "Analista Financeiro",
    highlights: [
      "Experiência em relatórios gerenciais e análise de custo.",
      "Melhoria de processos e redução de despesas em 12%.",
    ],
    skills: ["Excel Avançado", "Planejamento Financeiro", "Power BI"],
  },
  {
    title: "Currículo Criativo",
    role: "Designer Gráfico",
    highlights: [
      "Criação de campanhas visuais para redes sociais.",
      "Gestão de identidade visual para marcas de moda.",
    ],
    skills: ["Adobe Photoshop", "Illustrator", "Branding"],
  },
  {
    title: "Currículo de Estágio",
    role: "Desenvolvedor Jr.",
    highlights: [
      "Participação em projetos web usando React.",
      "Desenvolvimento de sites responsivos e testes automatizados.",
    ],
    skills: ["HTML", "CSS", "JavaScript", "Git"],
  },
];

export default function CurriculosPage() {
  return (
    <main className="flex-1">
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="space-y-4">
          <p className="text-sm uppercase tracking-[0.3em] text-violet-300/80">Currículos Prontos</p>
          <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Exemplos de currículos para você usar como referência
          </h1>
          <p className="max-w-3xl text-lg leading-8 text-slate-300">
            Veja modelos já prontos e adapte as seções ao seu perfil profissional. Ideal para quem quer um currículo rápido e bem estruturado.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {examples.map((item) => (
            <article key={item.title} className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-xl shadow-black/20">
              <div className="space-y-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-violet-300">{item.title}</p>
                  <h2 className="mt-3 text-2xl font-semibold text-white">{item.role}</h2>
                </div>
                <div className="space-y-3 text-slate-300">
                  <div>
                    <p className="font-medium text-white">Destaques</p>
                    <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6">
                      {item.highlights.map((highlight) => (
                        <li key={highlight}>{highlight}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-white">Habilidades</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {item.skills.map((skill) => (
                        <span key={skill} className="rounded-full bg-violet-500/10 px-3 py-1 text-xs text-violet-100">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
