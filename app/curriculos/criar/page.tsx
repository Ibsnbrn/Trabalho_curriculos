"use client";

import { useState } from "react";

type CurriculumData = {
  nome: string;
  profissao: string;
  resumo: string;
  telefone: string;
  email: string;
  endereco: string;
  habilidades: string;
  experiencia: string;
  formacao: string;
  idiomas: string;
  certificacoes: string;
};

const initialData: CurriculumData = {
  nome: "",
  profissao: "",
  resumo: "",
  telefone: "",
  email: "",
  endereco: "",
  habilidades: "",
  experiencia: "",
  formacao: "",
  idiomas: "",
  certificacoes: "",
};

export default function CriarCurriculoPage() {
  const [formData, setFormData] = useState<CurriculumData>(initialData);
  const [showPreview, setShowPreview] = useState(false);

  const updateField = (field: keyof CurriculumData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const habilidadesList = formData.habilidades
    .split(",")
    .map(h => h.trim())
    .filter(Boolean);

  const idiomasList = formData.idiomas
    .split(",")
    .map(i => i.trim())
    .filter(Boolean);

  const certificacoesList = formData.certificacoes
    .split(",")
    .map(c => c.trim())
    .filter(Boolean);

  return (
    <main className="flex-1">
      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="space-y-3">
          <p className="text-sm uppercase tracking-[0.3em] text-violet-200/80">Criar Currículo</p>
          <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Monte seu currículo profissional
          </h1>
          <p className="max-w-3xl text-lg leading-8 text-slate-300">
            Preencha os campos abaixo e veja uma prévia do seu currículo em tempo real.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_0.8fr]">
          {/* Formulário */}
          <div className="space-y-6">
            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-xl shadow-black/20">
              <h2 className="text-2xl font-semibold text-white mb-6">Informações Pessoais</h2>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <label className="text-sm font-medium text-slate-300">Nome Completo</label>
                  <input
                    type="text"
                    value={formData.nome}
                    onChange={(e) => updateField("nome", e.target.value)}
                    className="w-full rounded-lg border border-white/20 bg-black/50 px-4 py-3 text-white placeholder-slate-400 focus:border-violet-500 focus:outline-none"
                    placeholder="Digite seu nome completo"
                  />
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-medium text-slate-300">Profissão</label>
                  <input
                    type="text"
                    value={formData.profissao}
                    onChange={(e) => updateField("profissao", e.target.value)}
                    className="w-full rounded-lg border border-white/20 bg-black/50 px-4 py-3 text-white placeholder-slate-400 focus:border-violet-500 focus:outline-none"
                    placeholder="Ex: Desenvolvedor Front-end"
                  />
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-medium text-slate-300">Resumo Profissional</label>
                  <textarea
                    value={formData.resumo}
                    onChange={(e) => updateField("resumo", e.target.value)}
                    rows={4}
                    className="w-full rounded-lg border border-white/20 bg-black/50 px-4 py-3 text-white placeholder-slate-400 focus:border-violet-500 focus:outline-none"
                    placeholder="Descreva sua experiência e objetivos profissionais"
                  />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="grid gap-2">
                    <label className="text-sm font-medium text-slate-300">Telefone</label>
                    <input
                      type="tel"
                      value={formData.telefone}
                      onChange={(e) => updateField("telefone", e.target.value)}
                      className="w-full rounded-lg border border-white/20 bg-black/50 px-4 py-3 text-white placeholder-slate-400 focus:border-violet-500 focus:outline-none"
                      placeholder="(11) 99999-9999"
                    />
                  </div>
                  <div className="grid gap-2">
                    <label className="text-sm font-medium text-slate-300">E-mail</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => updateField("email", e.target.value)}
                      className="w-full rounded-lg border border-white/20 bg-black/50 px-4 py-3 text-white placeholder-slate-400 focus:border-violet-500 focus:outline-none"
                      placeholder="seu@email.com"
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-medium text-slate-300">Endereço</label>
                  <input
                    type="text"
                    value={formData.endereco}
                    onChange={(e) => updateField("endereco", e.target.value)}
                    className="w-full rounded-lg border border-white/20 bg-black/50 px-4 py-3 text-white placeholder-slate-400 focus:border-violet-500 focus:outline-none"
                    placeholder="Cidade, Estado"
                  />
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-xl shadow-black/20">
              <h2 className="text-2xl font-semibold text-white mb-6">Experiência e Formação</h2>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <label className="text-sm font-medium text-slate-300">Habilidades (separadas por vírgula)</label>
                  <input
                    type="text"
                    value={formData.habilidades}
                    onChange={(e) => updateField("habilidades", e.target.value)}
                    className="w-full rounded-lg border border-white/20 bg-black/50 px-4 py-3 text-white placeholder-slate-400 focus:border-violet-500 focus:outline-none"
                    placeholder="React, JavaScript, CSS, Git"
                  />
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-medium text-slate-300">Experiência Profissional</label>
                  <textarea
                    value={formData.experiencia}
                    onChange={(e) => updateField("experiencia", e.target.value)}
                    rows={6}
                    className="w-full rounded-lg border border-white/20 bg-black/50 px-4 py-3 text-white placeholder-slate-400 focus:border-violet-500 focus:outline-none"
                    placeholder="Descreva suas experiências profissionais, cargos e responsabilidades"
                  />
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-medium text-slate-300">Formação Acadêmica</label>
                  <textarea
                    value={formData.formacao}
                    onChange={(e) => updateField("formacao", e.target.value)}
                    rows={4}
                    className="w-full rounded-lg border border-white/20 bg-black/50 px-4 py-3 text-white placeholder-slate-400 focus:border-violet-500 focus:outline-none"
                    placeholder="Liste seus cursos, graduações e especializações"
                  />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="grid gap-2">
                    <label className="text-sm font-medium text-slate-300">Idiomas (separados por vírgula)</label>
                    <input
                      type="text"
                      value={formData.idiomas}
                      onChange={(e) => updateField("idiomas", e.target.value)}
                      className="w-full rounded-lg border border-white/20 bg-black/50 px-4 py-3 text-white placeholder-slate-400 focus:border-violet-500 focus:outline-none"
                      placeholder="Português (Nativo), Inglês (Avançado)"
                    />
                  </div>
                  <div className="grid gap-2">
                    <label className="text-sm font-medium text-slate-300">Certificações (separadas por vírgula)</label>
                    <input
                      type="text"
                      value={formData.certificacoes}
                      onChange={(e) => updateField("certificacoes", e.target.value)}
                      className="w-full rounded-lg border border-white/20 bg-black/50 px-4 py-3 text-white placeholder-slate-400 focus:border-violet-500 focus:outline-none"
                      placeholder="Certificado Scrum, AWS Cloud"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                className="rounded-full bg-violet-500 px-6 py-3 text-sm font-semibold text-black transition hover:bg-violet-400"
              > <label className="text-sm font-medium text-slate-300">Mandar Curriculo</label>
              </button>
            </div>
          </div>

          {/* Prévia */}
          {showPreview && (
            <div className="space-y-6">
              <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-xl shadow-black/20">
                <h2 className="text-2xl font-semibold text-white mb-6">Prévia do Currículo</h2>
                <div className="rounded-3xl bg-slate-950/80 p-6 space-y-6">
                  {/* Cabeçalho */}
                  <div className="text-center">
                    <h3 className="text-3xl font-bold text-white">{formData.nome || "Seu Nome"}</h3>
                    <p className="text-lg text-violet-300 mt-2">{formData.profissao || "Sua Profissão"}</p>
                  </div>

                  {/* Contato */}
                  {(formData.telefone || formData.email || formData.endereco) && (
                    <div className="border-b border-white/10 pb-4">
                      <h4 className="text-lg font-semibold text-white mb-3">Contato</h4>
                      <div className="grid gap-2 text-sm text-slate-300">
                        {formData.telefone && <p>📞 {formData.telefone}</p>}
                        {formData.email && <p>✉️ {formData.email}</p>}
                        {formData.endereco && <p>📍 {formData.endereco}</p>}
                      </div>
                    </div>
                  )}

                  {/* Resumo */}
                  {formData.resumo && (
                    <div className="border-b border-white/10 pb-4">
                      <h4 className="text-lg font-semibold text-white mb-3">Resumo</h4>
                      <p className="text-sm text-slate-300 leading-6">{formData.resumo}</p>
                    </div>
                  )}

                  {/* Habilidades */}
                  {habilidadesList.length > 0 && (
                    <div className="border-b border-white/10 pb-4">
                      <h4 className="text-lg font-semibold text-white mb-3">Habilidades</h4>
                      <div className="flex flex-wrap gap-2">
                        {habilidadesList.map((habilidade, index) => (
                          <span key={index} className="rounded-full bg-violet-500/20 px-3 py-1 text-xs text-violet-200">
                            {habilidade}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Experiência */}
                  {formData.experiencia && (
                    <div className="border-b border-white/10 pb-4">
                      <h4 className="text-lg font-semibold text-white mb-3">Experiência Profissional</h4>
                      <div className="text-sm text-slate-300 whitespace-pre-line leading-6">
                        {formData.experiencia}
                      </div>
                    </div>
                  )}

                  {/* Formação */}
                  {formData.formacao && (
                    <div className="border-b border-white/10 pb-4">
                      <h4 className="text-lg font-semibold text-white mb-3">Formação Acadêmica</h4>
                      <div className="text-sm text-slate-300 whitespace-pre-line leading-6">
                        {formData.formacao}
                      </div>
                    </div>
                  )}

                  {/* Idiomas */}
                  {idiomasList.length > 0 && (
                    <div className="border-b border-white/10 pb-4">
                      <h4 className="text-lg font-semibold text-white mb-3">Idiomas</h4>
                      <ul className="text-sm text-slate-300 space-y-1">
                        {idiomasList.map((idioma, index) => (
                          <li key={index}>• {idioma}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Certificações */}
                  {certificacoesList.length > 0 && (
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-3">Certificações</h4>
                      <ul className="text-sm text-slate-300 space-y-1">
                        {certificacoesList.map((certificacao, index) => (
                          <li key={index}>• {certificacao}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}