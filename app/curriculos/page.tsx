"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

// Arrays de dados para gerar pessoas aleatórias
const nomes = [
  "Ana", "Bruno", "Carlos", "Diana", "Eduardo", "Fernanda", "Gabriel", "Henrique",
  "Isabela", "João", "Kátia", "Leonardo", "Mariana", "Nicolas", "Olivia", "Paula",
  "Quentin", "Rafael", "Sandra", "Thiago", "Ursula", "Victor", "Wanda", "Xavier",
  "Yasmin", "Zoe", "Adriano", "Beatriz", "Camila", "Diego"
];

const sobrenomes = [
  "Silva", "Santos", "Oliveira", "Costa", "Ferreira", "Gomes", "Martins", "Alves",
  "Pereira", "Carvalho", "Ribeiro", "Mendes", "Dias", "Rocha", "Teixeira", "Sousa",
  "Lopes", "Marques", "Barbosa", "Correa", "Machado", "Castro", "Monteiro", "Neves",
  "Pinto", "Reis", "Rosa", "Santos", "Tavares", "Vieira"
];

const empresas = [
  "Google", "Microsoft", "Apple", "Amazon", "Meta", "Tesla", "Netflix", "Spotify",
  "Adobe", "Figma", "GitHub", "Stripe", "Airbnb", "Uber", "Slack", "Notion"
];

// Função para gerar email aleatório
const gerarEmail = (nome: string, sobrenome: string): string => {
  const dominios = ["gmail.com", "hotmail.com", "outlook.com", "yahoo.com", "empresa.com"];
  const dominio = dominios[Math.floor(Math.random() * dominios.length)];
  return `${nome.toLowerCase()}.${sobrenome.toLowerCase()}@${dominio}`;
};

// Função para gerar telefone aleatório
const gerarTelefone = (): string => {
  const area = Math.floor(Math.random() * 90) + 11;
  const numero1 = Math.floor(Math.random() * 99999) + 1;
  const numero2 = Math.floor(Math.random() * 9999) + 1;
  return `(${area}) ${String(numero1).padStart(5, "0")}-${String(numero2).padStart(4, "0")}`;
};

// Função para gerar idade aleatória
const gerarIdade = (): number => {
  return Math.floor(Math.random() * (65 - 22)) + 22;
};

// Função para selecionar item aleatório de um array
const itemAleatorio = (arr: string[]): string => {
  return arr[Math.floor(Math.random() * arr.length)];
};

const examples = [
  {
    nome: itemAleatorio(nomes),
    sobrenome: itemAleatorio(sobrenomes),
    idade: gerarIdade(),
    profissao: "Analista Financeiro",
    email: gerarEmail(itemAleatorio(nomes), itemAleatorio(sobrenomes)),
    telefone: gerarTelefone(),
    title: "Currículo Corporativo",
    role: "Analista Financeiro",
    highlights: [
      "Experiência em relatórios gerenciais e análise de custo.",
      "Melhoria de processos e redução de despesas em 12%.",
    ],
    skills: ["Excel Avançado", "Planejamento Financeiro", "Power BI"],
  },
  {
    nome: itemAleatorio(nomes),
    sobrenome: itemAleatorio(sobrenomes),
    idade: gerarIdade(),
    profissao: "Designer Gráfico",
    email: gerarEmail(itemAleatorio(nomes), itemAleatorio(sobrenomes)),
    telefone: gerarTelefone(),
    title: "Currículo Criativo",
    role: "Designer Gráfico",
    highlights: [
      "Criação de campanhas visuais para redes sociais.",
      "Gestão de identidade visual para marcas de moda.",
    ],
    skills: ["Adobe Photoshop", "Illustrator", "Branding"],
  },
  {
    nome: itemAleatorio(nomes),
    sobrenome: itemAleatorio(sobrenomes),
    idade: gerarIdade(),
    profissao: "Desenvolvedor Jr.",
    email: gerarEmail(itemAleatorio(nomes), itemAleatorio(sobrenomes)),
    telefone: gerarTelefone(),
    title: "Currículo de Estágio",
    role: "Desenvolvedor Jr.",
    highlights: [
      "Participação em projetos web usando React.",
      "Desenvolvimento de sites responsivos e testes automatizados.",
    ],
    skills: ["HTML", "CSS", "JavaScript", "Git"],
  },
  {
    nome: itemAleatorio(nomes),
    sobrenome: itemAleatorio(sobrenomes),
    idade: gerarIdade(),
    profissao: "Desenvolvedor Full Stack Sênior",
    email: gerarEmail(itemAleatorio(nomes), itemAleatorio(sobrenomes)),
    telefone: gerarTelefone(),
    title: "Currículo Full Stack",
    role: "Desenvolvedor Full Stack Sênior",
    highlights: [
      "8+ anos de experiência em desenvolvimento web e mobile.",
      "Liderança de equipes e arquitetura de sistemas escaláveis.",
    ],
    skills: ["React", "Node.js", "TypeScript", "PostgreSQL", "AWS"],
  },
  {
    nome: itemAleatorio(nomes),
    sobrenome: itemAleatorio(sobrenomes),
    idade: gerarIdade(),
    profissao: "Especialista em Marketing Digital",
    email: gerarEmail(itemAleatorio(nomes), itemAleatorio(sobrenomes)),
    telefone: gerarTelefone(),
    title: "Currículo Marketing Digital",
    role: "Especialista em Marketing Digital",
    highlights: [
      "Gestão de campanhas com ROI acima de 300%.",
      "Estratégia de crescimento em redes sociais e SEO.",
    ],
    skills: ["Google Ads", "Meta Ads", "Analytics", "Content Strategy"],
  },
  {
    nome: itemAleatorio(nomes),
    sobrenome: itemAleatorio(sobrenomes),
    idade: gerarIdade(),
    profissao: "Designer de Experiência do Usuário",
    email: gerarEmail(itemAleatorio(nomes), itemAleatorio(sobrenomes)),
    telefone: gerarTelefone(),
    title: "Currículo UX/UI Designer",
    role: "Designer de Experiência do Usuário",
    highlights: [
      "Redesign de aplicativos com aumento de 45% em engajamento.",
      "Pesquisa de usuário e prototipagem de alta fidelidade.",
    ],
    skills: ["Figma", "Prototyping", "Research", "Wireframing"],
  },
  {
    nome: itemAleatorio(nomes),
    sobrenome: itemAleatorio(sobrenomes),
    idade: gerarIdade(),
    profissao: "Gerente de Projetos PMO",
    email: gerarEmail(itemAleatorio(nomes), itemAleatorio(sobrenomes)),
    telefone: gerarTelefone(),
    title: "Currículo Gerente de Projetos",
    role: "Gerente de Projetos PMO",
    highlights: [
      "Entrega de 20+ projetos multidisciplinares no prazo.",
      "Certificação PMP e experiência com Scrum e Kanban.",
    ],
    skills: ["MS Project", "Agile", "Scrum", "Leadership", "Stakeholder Management"],
  },
  {
    nome: itemAleatorio(nomes),
    sobrenome: itemAleatorio(sobrenomes),
    idade: gerarIdade(),
    profissao: "Cientista de Dados",
    email: gerarEmail(itemAleatorio(nomes), itemAleatorio(sobrenomes)),
    telefone: gerarTelefone(),
    title: "Currículo Cientista de Dados",
    role: "Cientista de Dados",
    highlights: [
      "Desenvolvimento de modelos de ML com 92% de acurácia.",
      "Análise preditiva para otimização de processos de negócio.",
    ],
    skills: ["Python", "Machine Learning", "SQL", "Tableau", "BigData"],
  },
  {
    nome: itemAleatorio(nomes),
    sobrenome: itemAleatorio(sobrenomes),
    idade: gerarIdade(),
    profissao: "Engenheiro DevOps",
    email: gerarEmail(itemAleatorio(nomes), itemAleatorio(sobrenomes)),
    telefone: gerarTelefone(),
    title: "Currículo DevOps",
    role: "Engenheiro DevOps",
    highlights: [
      "Implementação de CI/CD reduzindo time to deploy em 80%.",
      "Infraestrutura cloud e containerização com Docker e Kubernetes.",
    ],
    skills: ["Docker", "Kubernetes", "AWS", "CI/CD", "Linux"],
  },
  {
    nome: itemAleatorio(nomes),
    sobrenome: itemAleatorio(sobrenomes),
    idade: gerarIdade(),
    profissao: "QA Engineer - Automação de Testes",
    email: gerarEmail(itemAleatorio(nomes), itemAleatorio(sobrenomes)),
    telefone: gerarTelefone(),
    title: "Currículo QA Automation",
    role: "QA Engineer - Automação de Testes",
    highlights: [
      "Cobertura de testes automatizados de 85% em aplicações web.",
      "Redução de bugs em produção através de testes estratégicos.",
    ],
    skills: ["Selenium", "Jest", "Cypress", "Test Automation", "Bug Tracking"],
  },
];

export default function CurriculosPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [filteredCurrículos, setFilteredCurrículos] = useState(examples);

  // Função para usar um modelo de currículo
  const usarComoModelo = (example: any) => {
    const dadosModelo = {
      nome: example.nome,
      profissao: example.profissao,
      email: example.email,
      telefone: example.telefone,
      resumo: `Profissional com experiência em ${example.role}. ${example.highlights[0] || ""}`,
      endereco: "São Paulo, SP",
      habilidades: example.skills.join(", "),
      idiomas: "Português (Nativo), Inglês (Intermediário)",
      certificacoes: "",
      experiencia: [
        {
          empresa: "Empresa Atual",
          cargo: example.role,
          dataInicio: "2023-01",
          dataFim: "",
          descricao: example.highlights.join("\n"),
        },
      ],
      formacao: [
        {
          instituicao: "Universidade",
          curso: "Graduação em Tecnologia",
          dataInicio: "2019-01",
          dataFim: "2023-12",
          status: "Concluído",
        },
      ],
    };
    localStorage.setItem("modeloCurriculo", JSON.stringify(dadosModelo));
    router.push("/curriculos/criar");
  };

  // Debounce para a busca (300ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Filtrar currículos baseado no termo de busca
  useEffect(() => {
    if (debouncedSearchTerm.trim() === "") {
      setFilteredCurrículos(examples);
    } else {
      const lowerCaseSearch = debouncedSearchTerm.toLowerCase();
      const filtered = examples.filter((curriculo) =>
        curriculo.title.toLowerCase().includes(lowerCaseSearch) ||
        curriculo.role.toLowerCase().includes(lowerCaseSearch) ||
        (curriculo.nome?.toLowerCase().includes(lowerCaseSearch) ?? false) ||
        (curriculo.sobrenome?.toLowerCase().includes(lowerCaseSearch) ?? false) ||
        (curriculo.profissao?.toLowerCase().includes(lowerCaseSearch) ?? false)
      );
      setFilteredCurrículos(filtered);
    }
  }, [debouncedSearchTerm]);

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

        {/* Barra de Busca */}
        <div className="mt-8 flex items-center gap-3">
          <div className="flex-1">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por nome, cargo, profissão ou tipo de currículo..."
              className="w-full rounded-lg border border-white/20 bg-black/50 px-4 py-3 text-white placeholder-slate-400 focus:border-violet-500 focus:outline-none transition"
            />
          </div>
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-sm font-medium text-white transition hover:bg-white/20"
            >
              Limpar
            </button>
          )}
        </div>

        {/* Resultado da Busca */}
        {searchTerm && (
          <p className="mt-4 text-sm text-slate-300">
            {filteredCurrículos.length} resultado{filteredCurrículos.length !== 1 ? "s" : ""} encontrado{filteredCurrículos.length !== 1 ? "s" : ""}
          </p>
        )}

        {/* Grid de Currículos */}
        {filteredCurrículos.length > 0 ? (
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {filteredCurrículos.map((item) => (
              <article
                key={item.title}
                className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-xl shadow-black/20 transition hover:border-violet-500/30 hover:bg-white/10"
              >
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
                          <span
                            key={skill}
                            className="rounded-full bg-violet-500/10 px-3 py-1 text-xs text-violet-100"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => usarComoModelo(item)}
                    className="mt-6 w-full rounded-lg bg-violet-500 px-4 py-2 text-sm font-semibold text-black transition hover:bg-violet-400"
                  >
                    Usar como Modelo
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="mt-12 flex flex-col items-center justify-center rounded-[2rem] border border-dashed border-white/20 bg-white/5 py-16">
            <p className="text-lg font-semibold text-white">Nenhum currículo encontrado</p>
            <p className="mt-2 text-slate-300">
              Tente buscar por outro termo ou{" "}
              <button
                onClick={() => setSearchTerm("")}
                className="text-violet-300 hover:text-violet-200 underline"
              >
                limpar a busca
              </button>
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
