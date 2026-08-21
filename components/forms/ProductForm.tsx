"use client";

// Portado de frontend/components/forms/ProductForm.js — mesmo schema,
// mesmo comportamento. Só tipado.
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import FormButton from "@/components/ui/FormButton";
import type { Produto } from "@/lib/types/loja";

const productSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  descricao: z.string().optional(),
  preco: z.coerce
    .number({ error: "Preço é obrigatório" })
    .positive("Preço deve ser maior que zero"),
  quantidade: z.coerce
    .number({ error: "Quantidade é obrigatória" })
    .int("Quantidade deve ser um número inteiro")
    .min(0, "Quantidade não pode ser negativa"),
});

type ProductFormInput = z.input<typeof productSchema>;
export type ProductFormValues = z.output<typeof productSchema>;

function toDefaultValues(produto?: Produto): ProductFormInput {
  return {
    nome: produto?.nome ?? "",
    descricao: produto?.descricao ?? "",
    preco: produto?.preco ?? "",
    quantidade: produto?.quantidade ?? ("" as unknown as number),
  };
}

const inputClass =
  "rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-brand-navy focus:outline-none focus:ring-1 focus:ring-brand-navy";
const labelClass = "text-sm font-medium text-slate-700";
const errorClass = "text-sm text-red-600";

type ProductFormProps = {
  initialData?: Produto;
  onSubmit: (data: ProductFormValues) => void | Promise<void>;
  onCancel?: () => void;
};

export default function ProductForm({ initialData, onSubmit, onCancel }: ProductFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormInput, unknown, ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: toDefaultValues(initialData),
  });

  useEffect(() => {
    reset(toDefaultValues(initialData));
  }, [initialData, reset]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 rounded-lg border border-slate-200 bg-white p-4 shadow-sm"
    >
      <div className="flex flex-col gap-1">
        <label htmlFor="nome" className={labelClass}>
          Nome
        </label>
        <input id="nome" type="text" className={inputClass} {...register("nome")} />
        {errors.nome && <p className={errorClass}>{errors.nome.message}</p>}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="descricao" className={labelClass}>
          Descrição
        </label>
        <input
          id="descricao"
          type="text"
          className={inputClass}
          {...register("descricao")}
        />
        {errors.descricao && (
          <p className={errorClass}>{errors.descricao.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="preco" className={labelClass}>
          Preço
        </label>
        <input
          id="preco"
          type="number"
          step="0.01"
          className={inputClass}
          {...register("preco")}
        />
        {errors.preco && <p className={errorClass}>{errors.preco.message}</p>}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="quantidade" className={labelClass}>
          Quantidade (estoque)
        </label>
        <input
          id="quantidade"
          type="number"
          className={inputClass}
          {...register("quantidade")}
        />
        {errors.quantidade && (
          <p className={errorClass}>{errors.quantidade.message}</p>
        )}
      </div>

      <div className="flex gap-2">
        <FormButton type="submit" variant="primary" disabled={isSubmitting}>
          {initialData ? "Salvar edição" : "Criar produto"}
        </FormButton>

        {onCancel && (
          <FormButton type="button" variant="ghost" onClick={onCancel}>
            Cancelar
          </FormButton>
        )}
      </div>
    </form>
  );
}
