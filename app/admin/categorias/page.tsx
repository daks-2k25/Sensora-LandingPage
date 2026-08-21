"use client";

import { useEffect, useState } from "react";
import CategoryTable from "@/components/tables/CategoryTable";
import CategoryForm, { type CategoryFormValues } from "@/components/forms/CategoryForm";
import FormButton from "@/components/ui/FormButton";
import {
  listarCategorias,
  criarCategoria,
  atualizarCategoria,
  removerCategoria,
} from "@/services/categorias";
import type { Categoria } from "@/lib/types/loja";

export default function CategoriasPage() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingCategory, setEditingCategory] = useState<Categoria | undefined>(undefined);
  const [showForm, setShowForm] = useState(false);

  async function carregarCategorias() {
    setLoading(true);
    setError("");
    try {
      const data = await listarCategorias();
      setCategorias(data);
    } catch {
      setError("Não foi possível carregar as categorias.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregarCategorias();
  }, []);

  async function handleSubmit(data: CategoryFormValues) {
    setError("");
    try {
      if (editingCategory) {
        await atualizarCategoria(editingCategory.id, data);
      } else {
        await criarCategoria(data);
      }
      setShowForm(false);
      setEditingCategory(undefined);
      await carregarCategorias();
    } catch {
      setError("Não foi possível salvar a categoria.");
    }
  }

  function handleEdit(categoria: Categoria) {
    setEditingCategory(categoria);
    setShowForm(true);
  }

  async function handleRemove(categoria: Categoria) {
    if (!window.confirm(`Remover a categoria "${categoria.nome}"?`)) {
      return;
    }

    setError("");
    try {
      await removerCategoria(categoria.id);
      await carregarCategorias();
    } catch {
      setError("Não foi possível remover a categoria.");
    }
  }

  function handleNovaCategoria() {
    setEditingCategory(undefined);
    setShowForm(true);
  }

  function handleCancel() {
    setShowForm(false);
    setEditingCategory(undefined);
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-brand-navy">Categorias</h2>
        <FormButton variant="primary" onClick={handleNovaCategoria}>
          Nova categoria
        </FormButton>
      </div>

      {error && (
        <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
      )}

      {showForm && (
        <CategoryForm
          initialData={editingCategory}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      )}

      {loading ? (
        <p className="text-sm text-slate-500">Carregando categorias...</p>
      ) : (
        <CategoryTable categorias={categorias} onEdit={handleEdit} onRemove={handleRemove} />
      )}
    </div>
  );
}
