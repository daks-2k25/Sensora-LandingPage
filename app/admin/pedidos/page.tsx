"use client";

import { useEffect, useState } from "react";
import PedidoTable from "@/components/tables/PedidoTable";
import PedidoForm, { type PedidoFormValues } from "@/components/forms/PedidoForm";
import FormButton from "@/components/ui/FormButton";
import {
  listarPedidos,
  criarPedido,
  atualizarPedido,
  removerPedido,
} from "@/services/pedidos";
import type { Pedido } from "@/lib/types/loja";

export default function PedidosPage() {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingPedido, setEditingPedido] = useState<Pedido | undefined>(undefined);
  const [showForm, setShowForm] = useState(false);

  async function carregarPedidos() {
    setLoading(true);
    setError("");
    try {
      const data = await listarPedidos();
      setPedidos(data);
    } catch {
      setError("Não foi possível carregar os pedidos.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregarPedidos();
  }, []);

  async function handleSubmit(data: PedidoFormValues) {
    setError("");
    try {
      if (editingPedido) {
        await atualizarPedido(editingPedido.id, data);
      } else {
        await criarPedido({ ...data, total: 0 });
      }
      setShowForm(false);
      setEditingPedido(undefined);
      await carregarPedidos();
    } catch {
      setError("Não foi possível salvar o pedido.");
    }
  }

  function handleEdit(pedido: Pedido) {
    setEditingPedido(pedido);
    setShowForm(true);
  }

  async function handleRemove(pedido: Pedido) {
    if (
      !window.confirm(
        `Remover o pedido "${pedido.numero}"? Os itens deste pedido serão excluídos e o estoque consumido por eles NÃO será devolvido automaticamente.`,
      )
    ) {
      return;
    }

    setError("");
    try {
      await removerPedido(pedido.id);
      await carregarPedidos();
    } catch {
      setError("Não foi possível remover o pedido.");
    }
  }

  function handleNovoPedido() {
    setEditingPedido(undefined);
    setShowForm(true);
  }

  function handleCancel() {
    setShowForm(false);
    setEditingPedido(undefined);
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-brand-navy">Pedidos</h2>
        <FormButton variant="primary" onClick={handleNovoPedido}>
          Novo pedido
        </FormButton>
      </div>

      {error && (
        <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
      )}

      {showForm && (
        <PedidoForm
          initialData={editingPedido}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      )}

      {loading ? (
        <p className="text-sm text-slate-500">Carregando pedidos...</p>
      ) : (
        <PedidoTable pedidos={pedidos} onEdit={handleEdit} onRemove={handleRemove} />
      )}
    </div>
  );
}
