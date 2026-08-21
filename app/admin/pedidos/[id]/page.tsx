"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import ItemPedidoTable from "@/components/tables/ItemPedidoTable";
import ItemPedidoForm, { type ItemPedidoFormValues } from "@/components/forms/ItemPedidoForm";
import FormButton from "@/components/ui/FormButton";
import { buscarPedidoComItens, atualizarPedido } from "@/services/pedidos";
import {
  criarItemPedido,
  atualizarItemPedido,
  removerItemPedido,
} from "@/services/itensPedido";
import { listarProdutos } from "@/services/produtos";
import { ROUTES } from "@/lib/routes";
import type { Pedido, ItemPedido, Produto } from "@/lib/types/loja";

export default function PedidoDetalhePage() {
  const { id } = useParams<{ id: string }>();
  const pedidoId = Number(id);

  const [pedido, setPedido] = useState<Pedido | null>(null);
  const [itens, setItens] = useState<ItemPedido[]>([]);
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingItem, setEditingItem] = useState<ItemPedido | undefined>(undefined);
  const [showForm, setShowForm] = useState(false);

  async function carregarPedido() {
    setLoading(true);
    setError("");
    try {
      const [pedidoComItens, listaProdutos] = await Promise.all([
        buscarPedidoComItens(pedidoId),
        listarProdutos(),
      ]);

      setProdutos(listaProdutos);
      setItens(pedidoComItens.itens);
      setPedido(pedidoComItens.pedido);

      if (pedidoComItens.total !== pedidoComItens.pedido.total) {
        await atualizarPedido(pedidoId, { total: pedidoComItens.total });
        setPedido((prev) => (prev ? { ...prev, total: pedidoComItens.total } : prev));
      }
    } catch {
      setError("Não foi possível carregar o pedido.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregarPedido();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pedidoId]);

  async function handleSubmit(data: ItemPedidoFormValues) {
    setError("");
    try {
      if (editingItem) {
        await atualizarItemPedido(editingItem.id, data);
      } else {
        await criarItemPedido({ ...data, pedidoId });
      }
      setShowForm(false);
      setEditingItem(undefined);
      await carregarPedido();
    } catch {
      setError("Não foi possível salvar o item. Verifique o estoque disponível.");
    }
  }

  function handleEdit(item: ItemPedido) {
    setEditingItem(item);
    setShowForm(true);
  }

  async function handleRemove(item: ItemPedido) {
    if (
      !window.confirm(
        "Remover este item do pedido? O estoque do produto será devolvido.",
      )
    ) {
      return;
    }

    setError("");
    try {
      await removerItemPedido(item.id);
      await carregarPedido();
    } catch {
      setError("Não foi possível remover o item.");
    }
  }

  function handleNovoItem() {
    setEditingItem(undefined);
    setShowForm(true);
  }

  function handleCancel() {
    setShowForm(false);
    setEditingItem(undefined);
  }

  return (
    <div className="flex flex-col gap-4">
      <p>
        <Link
          href={ROUTES.PEDIDOS}
          className="text-sm font-medium text-brand-navy hover:underline"
        >
          ← Voltar para pedidos
        </Link>
      </p>

      {error && (
        <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
      )}

      {loading || !pedido ? (
        <p className="text-sm text-slate-500">Carregando pedido...</p>
      ) : (
        <>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-brand-navy">
                Pedido {pedido.numero}
              </h2>
              <p className="text-sm text-slate-600">
                Status: {pedido.status} · Total: {pedido.total}
              </p>
            </div>
            <FormButton variant="primary" onClick={handleNovoItem}>
              Adicionar item
            </FormButton>
          </div>

          {showForm && (
            <ItemPedidoForm
              produtos={produtos}
              initialData={editingItem}
              onSubmit={handleSubmit}
              onCancel={handleCancel}
            />
          )}

          <ItemPedidoTable
            itens={itens}
            produtos={produtos}
            onEdit={handleEdit}
            onRemove={handleRemove}
          />
        </>
      )}
    </div>
  );
}
