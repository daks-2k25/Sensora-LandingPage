"use client";

import { useEffect, useState } from "react";
import ProductTable from "@/components/tables/ProductTable";
import ProductForm, { type ProductFormValues } from "@/components/forms/ProductForm";
import FormButton from "@/components/ui/FormButton";
import {
  listarProdutos,
  criarProduto,
  atualizarProduto,
  removerProduto,
} from "@/services/produtos";
import type { Produto } from "@/lib/types/loja";

export default function ProdutosPage() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingProduct, setEditingProduct] = useState<Produto | undefined>(undefined);
  const [showForm, setShowForm] = useState(false);

  async function carregarProdutos() {
    setLoading(true);
    setError("");
    try {
      const data = await listarProdutos();
      setProdutos(data);
    } catch {
      setError("Não foi possível carregar os produtos.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregarProdutos();
  }, []);

  async function handleSubmit(data: ProductFormValues) {
    setError("");
    try {
      if (editingProduct) {
        await atualizarProduto(editingProduct.id, data);
      } else {
        await criarProduto(data);
      }
      setShowForm(false);
      setEditingProduct(undefined);
      await carregarProdutos();
    } catch {
      setError("Não foi possível salvar o produto.");
    }
  }

  function handleEdit(produto: Produto) {
    setEditingProduct(produto);
    setShowForm(true);
  }

  async function handleRemove(produto: Produto) {
    if (!window.confirm(`Remover o produto "${produto.nome}"?`)) {
      return;
    }

    setError("");
    try {
      await removerProduto(produto.id);
      await carregarProdutos();
    } catch {
      setError("Não foi possível remover o produto.");
    }
  }

  function handleNovoProduto() {
    setEditingProduct(undefined);
    setShowForm(true);
  }

  function handleCancel() {
    setShowForm(false);
    setEditingProduct(undefined);
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-brand-navy">Produtos</h2>
        <FormButton variant="primary" onClick={handleNovoProduto}>
          Novo produto
        </FormButton>
      </div>

      {error && (
        <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
      )}

      {showForm && (
        <ProductForm
          initialData={editingProduct}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      )}

      {loading ? (
        <p className="text-sm text-slate-500">Carregando produtos...</p>
      ) : (
        <ProductTable produtos={produtos} onEdit={handleEdit} onRemove={handleRemove} />
      )}
    </div>
  );
}
