"use client";

import { useEffect, useState } from "react";
import ClientTable from "@/components/tables/ClientTable";
import ClientForm, { type ClientFormValues } from "@/components/forms/ClientForm";
import FormButton from "@/components/ui/FormButton";
import {
  listarClientes,
  criarCliente,
  atualizarCliente,
  removerCliente,
} from "@/services/clientes";
import type { Cliente } from "@/lib/types/loja";

export default function ClientesPage() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingClient, setEditingClient] = useState<Cliente | undefined>(undefined);
  const [showForm, setShowForm] = useState(false);

  async function carregarClientes() {
    setLoading(true);
    setError("");
    try {
      const data = await listarClientes();
      setClientes(data);
    } catch {
      setError("Não foi possível carregar os clientes.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregarClientes();
  }, []);

  async function handleSubmit(data: ClientFormValues) {
    setError("");
    try {
      if (editingClient) {
        await atualizarCliente(editingClient.id, data);
      } else {
        await criarCliente(data);
      }
      setShowForm(false);
      setEditingClient(undefined);
      await carregarClientes();
    } catch {
      setError("Não foi possível salvar o cliente.");
    }
  }

  function handleEdit(cliente: Cliente) {
    setEditingClient(cliente);
    setShowForm(true);
  }

  async function handleRemove(cliente: Cliente) {
    if (!window.confirm(`Remover o cliente "${cliente.nome}"?`)) {
      return;
    }

    setError("");
    try {
      await removerCliente(cliente.id);
      await carregarClientes();
    } catch {
      setError("Não foi possível remover o cliente.");
    }
  }

  function handleNovoCliente() {
    setEditingClient(undefined);
    setShowForm(true);
  }

  function handleCancel() {
    setShowForm(false);
    setEditingClient(undefined);
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-brand-navy">Clientes</h2>
        <FormButton variant="primary" onClick={handleNovoCliente}>
          Novo cliente
        </FormButton>
      </div>

      {error && (
        <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
      )}

      {showForm && (
        <ClientForm
          initialData={editingClient}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      )}

      {loading ? (
        <p className="text-sm text-slate-500">Carregando clientes...</p>
      ) : (
        <ClientTable clientes={clientes} onEdit={handleEdit} onRemove={handleRemove} />
      )}
    </div>
  );
}
