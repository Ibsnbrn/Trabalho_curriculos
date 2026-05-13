"use client";

import { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

type Experiencia = {
  empresa: string;
  cargo: string;
  dataInicio: string;
  dataFim?: string;
  descricao: string;
};

type Formacao = {
  instituicao: string;
  curso: string;
  dataInicio: string;
  dataFim?: string;
  status: string;
};

const experienciaSchema = yup.object().shape({
  empresa: yup.string().required("Empresa é obrigatória"),
  cargo: yup.string().required("Cargo é obrigatório"),
  dataInicio: yup.string().required("Data de início é obrigatória"),
  dataFim: yup.string(),
  descricao: yup.string().required("Descrição é obrigatória"),
});

const formacaoSchema = yup.object().shape({
  instituicao: yup.string().required("Instituição é obrigatória"),
  curso: yup.string().required("Curso é obrigatório"),
  dataInicio: yup.string().required("Data de início é obrigatória"),
  dataFim: yup.string(),
  status: yup.string().required("Status é obrigatório"),
});

const schema = yup.object().shape({
  nome: yup.string().required("Nome é obrigatório"),
  profissao: yup.string().required("Profissão é obrigatória"),
  resumo: yup.string().required("Resumo é obrigatório"),
  telefone: yup.string().required("Telefone é obrigatório"),
  email: yup.string().email("E-mail inválido").required("E-mail é obrigatório"),
  endereco: yup.string().required("Endereço é obrigatório"),
  habilidades: yup.string().required("Habilidades são obrigatórias"),
  experiencia: yup.array().of(experienciaSchema).min(1, "Pelo menos uma experiência é obrigatória").required(),
  formacao: yup.array().of(formacaoSchema).min(1, "Pelo menos uma formação é obrigatória").required(),
  idiomas: yup.string().optional(),
  certificacoes: yup.string().optional(),
});

type CurriculumData = {
  nome: string;
  profissao: string;
  resumo: string;
  telefone: string;
  email: string;
  endereco: string;
  habilidades: string;
  experiencia: Experiencia[];
  formacao: Formacao[];
  idiomas?: string;
  certificacoes?: string;
};

const initialData: CurriculumData = {
  nome: "",
  profissao: "",
  resumo: "",
  telefone: "",
  email: "",
  endereco: "",
  habilidades: "",
  experiencia: [{ empresa: "", cargo: "", dataInicio: "", dataFim: "", descricao: "" }],
  formacao: [{ instituicao: "", curso: "", dataInicio: "", dataFim: "", status: "" }],
  idiomas: "",
  certificacoes: "",
};

export default function CriarCurriculoPage() {
  const [showPreview, setShowPreview] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<CurriculumData>({
    resolver: yupResolver(schema) as any,
    defaultValues: initialData,
  });

  // Carregar dados do localStorage ao montar o componente
  useEffect(() => {
    const modeloSalvo = localStorage.getItem("modeloCurriculo");
    if (modeloSalvo) {
      try {
        const dados = JSON.parse(modeloSalvo);
        reset(dados);
        localStorage.removeItem("modeloCurriculo"); // Limpar após usar
      } catch (error) {
        console.error("Erro ao carregar modelo:", error);
      }
    }
  }, [reset]);

  const {
    fields: experienciaFields,
    append: appendExperiencia,
    remove: removeExperiencia,
  } = useFieldArray({
    control,
    name: "experiencia",
  });

  const {
    fields: formacaoFields,
    append: appendFormacao,
    remove: removeFormacao,
  } = useFieldArray({
    control,
    name: "formacao",
  });

  const watchedData = watch();

  const habilidadesList = watchedData.habilidades
    ?.split(",")
    .map((h) => h.trim())
    .filter(Boolean) || [];

  const idiomasList = watchedData.idiomas
    ?.split(",")
    .map((i) => i.trim())
    .filter(Boolean) || [];

  const certificacoesList = watchedData.certificacoes
    ?.split(",")
    .map((c) => c.trim())
    .filter(Boolean) || [];

  const onSubmit = (data: CurriculumData) => {
    console.log("Dados do formulário:", data);
    // Aqui você pode enviar os dados para uma API ou processar como necessário
  };

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
                    {...register("nome")}
                    className="w-full rounded-lg border border-white/20 bg-black/50 px-4 py-3 text-white placeholder-slate-400 focus:border-violet-500 focus:outline-none"
                    placeholder="Digite seu nome completo"
                  />
                  {errors.nome && <p className="text-red-400 text-sm">{errors.nome.message}</p>}
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-medium text-slate-300">Profissão</label>
                  <input
                    type="text"
                    {...register("profissao")}
                    className="w-full rounded-lg border border-white/20 bg-black/50 px-4 py-3 text-white placeholder-slate-400 focus:border-violet-500 focus:outline-none"
                    placeholder="Ex: Desenvolvedor Front-end"
                  />
                  {errors.profissao && <p className="text-red-400 text-sm">{errors.profissao.message}</p>}
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-medium text-slate-300">Resumo Profissional</label>
                  <textarea
                    {...register("resumo")}
                    rows={4}
                    className="w-full rounded-lg border border-white/20 bg-black/50 px-4 py-3 text-white placeholder-slate-400 focus:border-violet-500 focus:outline-none"
                    placeholder="Descreva sua experiência e objetivos profissionais"
                  />
                  {errors.resumo && <p className="text-red-400 text-sm">{errors.resumo.message}</p>}
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="grid gap-2">
                    <label className="text-sm font-medium text-slate-300">Telefone</label>
                    <input
                      type="tel"
                      {...register("telefone")}
                      className="w-full rounded-lg border border-white/20 bg-black/50 px-4 py-3 text-white placeholder-slate-400 focus:border-violet-500 focus:outline-none"
                      placeholder="(11) 99999-9999"
                    />
                    {errors.telefone && <p className="text-red-400 text-sm">{errors.telefone.message}</p>}
                  </div>
                  <div className="grid gap-2">
                    <label className="text-sm font-medium text-slate-300">E-mail</label>
                    <input
                      type="email"
                      {...register("email")}
                      className="w-full rounded-lg border border-white/20 bg-black/50 px-4 py-3 text-white placeholder-slate-400 focus:border-violet-500 focus:outline-none"
                      placeholder="seu@email.com"
                    />
                    {errors.email && <p className="text-red-400 text-sm">{errors.email.message}</p>}
                  </div>
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-medium text-slate-300">Endereço</label>
                  <input
                    type="text"
                    {...register("endereco")}
                    className="w-full rounded-lg border border-white/20 bg-black/50 px-4 py-3 text-white placeholder-slate-400 focus:border-violet-500 focus:outline-none"
                    placeholder="Cidade, Estado"
                  />
                  {errors.endereco && <p className="text-red-400 text-sm">{errors.endereco.message}</p>}
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
                    {...register("habilidades")}
                    className="w-full rounded-lg border border-white/20 bg-black/50 px-4 py-3 text-white placeholder-slate-400 focus:border-violet-500 focus:outline-none"
                    placeholder="React, JavaScript, CSS, Git"
                  />
                  {errors.habilidades && (
                    <p className="text-red-400 text-sm">{errors.habilidades.message}</p>
                  )}
                </div>

                {/* Experiência Profissional */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-slate-300">Experiência Profissional</label>
                    <button
                      type="button"
                      onClick={() =>
                        appendExperiencia({
                          empresa: "",
                          cargo: "",
                          dataInicio: "",
                          dataFim: "",
                          descricao: "",
                        })
                      }
                      className="text-violet-400 hover:text-violet-300 text-sm"
                    >
                      + Adicionar Experiência
                    </button>
                  </div>
                  {experienciaFields.map((field, index) => (
                    <div key={field.id} className="border border-white/10 rounded-lg p-4 space-y-3">
                      <div className="flex justify-between items-center">
                        <h4 className="text-white font-medium">Experiência {index + 1}</h4>
                        {experienciaFields.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeExperiencia(index)}
                            className="text-red-400 hover:text-red-300 text-sm"
                          >
                            Remover
                          </button>
                        )}
                      </div>
                      <div className="grid gap-3 sm:grid-cols-2">
                        <div className="grid gap-2">
                          <label className="text-xs font-medium text-slate-400">Empresa</label>
                          <input
                            type="text"
                            {...register(`experiencia.${index}.empresa`)}
                            className="w-full rounded border border-white/20 bg-black/50 px-3 py-2 text-white placeholder-slate-400 focus:border-violet-500 focus:outline-none text-sm"
                            placeholder="Nome da empresa"
                          />
                          {errors.experiencia?.[index]?.empresa && (
                            <p className="text-red-400 text-xs">
                              {errors.experiencia[index]?.empresa?.message}
                            </p>
                          )}
                        </div>
                        <div className="grid gap-2">
                          <label className="text-xs font-medium text-slate-400">Cargo</label>
                          <input
                            type="text"
                            {...register(`experiencia.${index}.cargo`)}
                            className="w-full rounded border border-white/20 bg-black/50 px-3 py-2 text-white placeholder-slate-400 focus:border-violet-500 focus:outline-none text-sm"
                            placeholder="Seu cargo"
                          />
                          {errors.experiencia?.[index]?.cargo && (
                            <p className="text-red-400 text-xs">
                              {errors.experiencia[index]?.cargo?.message}
                            </p>
                          )}
                        </div>
                        <div className="grid gap-2">
                          <label className="text-xs font-medium text-slate-400">Data de Início</label>
                          <input
                            type="month"
                            {...register(`experiencia.${index}.dataInicio`)}
                            className="w-full rounded border border-white/20 bg-black/50 px-3 py-2 text-white placeholder-slate-400 focus:border-violet-500 focus:outline-none text-sm"
                          />
                          {errors.experiencia?.[index]?.dataInicio && (
                            <p className="text-red-400 text-xs">
                              {errors.experiencia[index]?.dataInicio?.message}
                            </p>
                          )}
                        </div>
                        <div className="grid gap-2">
                          <label className="text-xs font-medium text-slate-400">Data de Fim (opcional)</label>
                          <input
                            type="month"
                            {...register(`experiencia.${index}.dataFim`)}
                            className="w-full rounded border border-white/20 bg-black/50 px-3 py-2 text-white placeholder-slate-400 focus:border-violet-500 focus:outline-none text-sm"
                          />
                        </div>
                      </div>
                      <div className="grid gap-2">
                        <label className="text-xs font-medium text-slate-400">Descrição</label>
                        <textarea
                          {...register(`experiencia.${index}.descricao`)}
                          rows={3}
                          className="w-full rounded border border-white/20 bg-black/50 px-3 py-2 text-white placeholder-slate-400 focus:border-violet-500 focus:outline-none text-sm"
                          placeholder="Descreva suas responsabilidades e conquistas"
                        />
                        {errors.experiencia?.[index]?.descricao && (
                          <p className="text-red-400 text-xs">
                            {errors.experiencia[index]?.descricao?.message}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                  {errors.experiencia && typeof errors.experiencia === "object" && "message" in errors.experiencia && (
                    <p className="text-red-400 text-sm">{errors.experiencia.message}</p>
                  )}
                </div>

                {/* Formação Acadêmica */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-slate-300">Formação Acadêmica</label>
                    <button
                      type="button"
                      onClick={() =>
                        appendFormacao({
                          instituicao: "",
                          curso: "",
                          dataInicio: "",
                          dataFim: "",
                          status: "",
                        })
                      }
                      className="text-violet-400 hover:text-violet-300 text-sm"
                    >
                      + Adicionar Formação
                    </button>
                  </div>
                  {formacaoFields.map((field, index) => (
                    <div key={field.id} className="border border-white/10 rounded-lg p-4 space-y-3">
                      <div className="flex justify-between items-center">
                        <h4 className="text-white font-medium">Formação {index + 1}</h4>
                        {formacaoFields.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeFormacao(index)}
                            className="text-red-400 hover:text-red-300 text-sm"
                          >
                            Remover
                          </button>
                        )}
                      </div>
                      <div className="grid gap-3 sm:grid-cols-2">
                        <div className="grid gap-2">
                          <label className="text-xs font-medium text-slate-400">Instituição</label>
                          <input
                            type="text"
                            {...register(`formacao.${index}.instituicao`)}
                            className="w-full rounded border border-white/20 bg-black/50 px-3 py-2 text-white placeholder-slate-400 focus:border-violet-500 focus:outline-none text-sm"
                            placeholder="Nome da instituição"
                          />
                          {errors.formacao?.[index]?.instituicao && (
                            <p className="text-red-400 text-xs">
                              {errors.formacao[index]?.instituicao?.message}
                            </p>
                          )}
                        </div>
                        <div className="grid gap-2">
                          <label className="text-xs font-medium text-slate-400">Curso</label>
                          <input
                            type="text"
                            {...register(`formacao.${index}.curso`)}
                            className="w-full rounded border border-white/20 bg-black/50 px-3 py-2 text-white placeholder-slate-400 focus:border-violet-500 focus:outline-none text-sm"
                            placeholder="Nome do curso"
                          />
                          {errors.formacao?.[index]?.curso && (
                            <p className="text-red-400 text-xs">
                              {errors.formacao[index]?.curso?.message}
                            </p>
                          )}
                        </div>
                        <div className="grid gap-2">
                          <label className="text-xs font-medium text-slate-400">Data de Início</label>
                          <input
                            type="month"
                            {...register(`formacao.${index}.dataInicio`)}
                            className="w-full rounded border border-white/20 bg-black/50 px-3 py-2 text-white placeholder-slate-400 focus:border-violet-500 focus:outline-none text-sm"
                          />
                          {errors.formacao?.[index]?.dataInicio && (
                            <p className="text-red-400 text-xs">
                              {errors.formacao[index]?.dataInicio?.message}
                            </p>
                          )}
                        </div>
                        <div className="grid gap-2">
                          <label className="text-xs font-medium text-slate-400">Data de Conclusão (opcional)</label>
                          <input
                            type="month"
                            {...register(`formacao.${index}.dataFim`)}
                            className="w-full rounded border border-white/20 bg-black/50 px-3 py-2 text-white placeholder-slate-400 focus:border-violet-500 focus:outline-none text-sm"
                          />
                        </div>
                      </div>
                      <div className="grid gap-2">
                        <label className="text-xs font-medium text-slate-400">Status</label>
                        <select
                          {...register(`formacao.${index}.status`)}
                          className="w-full rounded border border-white/20 bg-black/50 px-3 py-2 text-white placeholder-slate-400 focus:border-violet-500 focus:outline-none text-sm"
                        >
                          <option value="">Selecione o status</option>
                          <option value="Concluído">Concluído</option>
                          <option value="Em andamento">Em andamento</option>
                          <option value="Trancado">Trancado</option>
                          <option value="Incompleto">Incompleto</option>
                        </select>
                        {errors.formacao?.[index]?.status && (
                          <p className="text-red-400 text-xs">
                            {errors.formacao[index]?.status?.message}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                  {errors.formacao && typeof errors.formacao === "object" && "message" in errors.formacao && (
                    <p className="text-red-400 text-sm">{errors.formacao.message}</p>
                  )}
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="grid gap-2">
                    <label className="text-sm font-medium text-slate-300">Idiomas (separados por vírgula)</label>
                    <input
                      type="text"
                      {...register("idiomas")}
                      className="w-full rounded-lg border border-white/20 bg-black/50 px-4 py-3 text-white placeholder-slate-400 focus:border-violet-500 focus:outline-none"
                      placeholder="Português (Nativo), Inglês (Avançado)"
                    />
                  </div>
                  <div className="grid gap-2">
                    <label className="text-sm font-medium text-slate-300">Certificações (separadas por vírgula)</label>
                    <input
                      type="text"
                      {...register("certificacoes")}
                      className="w-full rounded-lg border border-white/20 bg-black/50 px-4 py-3 text-white placeholder-slate-400 focus:border-violet-500 focus:outline-none"
                      placeholder="Certificado Scrum, AWS Cloud"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setShowPreview(!showPreview)}
                className="rounded-full border border-violet-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-violet-500/10"
              >
                {showPreview ? "Ocultar Prévia" : "Mostrar Prévia"}
              </button>
              <button
                type="button"
                onClick={handleSubmit(onSubmit)}
                className="rounded-full bg-violet-500 px-6 py-3 text-sm font-semibold text-black transition hover:bg-violet-400"
              >
                Enviar Currículo
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
                    <h3 className="text-3xl font-bold text-white">{watchedData.nome || "Seu Nome"}</h3>
                    <p className="text-lg text-violet-300 mt-2">{watchedData.profissao || "Sua Profissão"}</p>
                  </div>

                  {/* Contato */}
                  {(watchedData.telefone || watchedData.email || watchedData.endereco) && (
                    <div className="border-b border-white/10 pb-4">
                      <h4 className="text-lg font-semibold text-white mb-3">Contato</h4>
                      <div className="grid gap-2 text-sm text-slate-300">
                        {watchedData.telefone && <p>📞 {watchedData.telefone}</p>}
                        {watchedData.email && <p>✉️ {watchedData.email}</p>}
                        {watchedData.endereco && <p>📍 {watchedData.endereco}</p>}
                      </div>
                    </div>
                  )}

                  {/* Resumo */}
                  {watchedData.resumo && (
                    <div className="border-b border-white/10 pb-4">
                      <h4 className="text-lg font-semibold text-white mb-3">Resumo</h4>
                      <p className="text-sm text-slate-300 leading-6">{watchedData.resumo}</p>
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
                  {watchedData.experiencia && watchedData.experiencia.length > 0 && watchedData.experiencia.some(exp => exp.empresa || exp.cargo || exp.descricao) && (
                    <div className="border-b border-white/10 pb-4">
                      <h4 className="text-lg font-semibold text-white mb-3">Experiência Profissional</h4>
                      <div className="space-y-4">
                        {watchedData.experiencia.map((exp, index) => (
                          <div key={index} className="text-sm text-slate-300">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <p className="font-medium text-white">{exp.cargo || "Cargo"}</p>
                                <p className="text-violet-300">{exp.empresa || "Empresa"}</p>
                              </div>
                              <div className="text-xs text-slate-400">
                                {exp.dataInicio && <span>{exp.dataInicio}</span>}
                                {exp.dataInicio && exp.dataFim && <span> - </span>}
                                {exp.dataFim && <span>{exp.dataFim}</span>}
                                {!exp.dataFim && exp.dataInicio && <span> - Presente</span>}
                              </div>
                            </div>
                            {exp.descricao && (
                              <p className="leading-6 whitespace-pre-line">{exp.descricao}</p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Formação */}
                  {watchedData.formacao && watchedData.formacao.length > 0 && watchedData.formacao.some(form => form.instituicao || form.curso) && (
                    <div className="border-b border-white/10 pb-4">
                      <h4 className="text-lg font-semibold text-white mb-3">Formação Acadêmica</h4>
                      <div className="space-y-3">
                        {watchedData.formacao.map((form, index) => (
                          <div key={index} className="text-sm text-slate-300">
                            <div className="flex justify-between items-start">
                              <div>
                                <p className="font-medium text-white">{form.curso || "Curso"}</p>
                                <p className="text-violet-300">{form.instituicao || "Instituição"}</p>
                              </div>
                              <div className="text-xs text-slate-400">
                                {form.dataInicio && <span>{form.dataInicio}</span>}
                                {form.dataInicio && form.dataFim && <span> - </span>}
                                {form.dataFim && <span>{form.dataFim}</span>}
                                {!form.dataFim && form.dataInicio && <span> - Presente</span>}
                                {form.status && <span className="ml-2 text-violet-300">({form.status})</span>}
                              </div>
                            </div>
                          </div>
                        ))}
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