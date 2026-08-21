"use client";

import { useEffect, useState } from "react";
import UserTable from "@/components/tables/UserTable";
import UserForm from "@/components/forms/UserForm";
import FormButton from "@/components/ui/FormButton";
import { useAuth } from "@/context/AuthContext";
import {
  listarUsuarios,
  criarUsuario,
  atualizarUsuario,
  removerUsuario,
} from "@/services/usuarios";
import { PerfilUsuario, type Usuario } from "@/lib/types/loja";
import { isAxiosError } from "axios";

type UsuarioFormSubmit = {
  nome: string;
  email: string;
  senha: string;
  perfil: PerfilUsuario;
  ativo: boolean;
};

export default function UsuariosPage() {
  const { perfil, userId } = useAuth();
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingUser, setEditingUser] = useState<Usuario | undefined>(undefined);
  const [showForm, setShowForm] = useState(false);

  async function carregarUsuarios() {
    setLoading(true);
    setError("");
    try {
      const data = await listarUsuarios();
      setUsuarios(data);
    } catch {
      setError("Não foi possível carregar os usuários.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (perfil === PerfilUsuario.ADMIN) {
      carregarUsuarios();
    } else {
      setLoading(false);
    }
  }, [perfil]);

  async function handleSubmit(data: UsuarioFormSubmit) {
    setError("");

    try {
      if (editingUser) {
        const payload: Partial<UsuarioFormSubmit> = { ...data };
        if (!payload.senha) {
          delete payload.senha;
        }
        await atualizarUsuario(editingUser.id, payload);
      } else {
        await criarUsuario(data);
      }
      setShowForm(false);
      setEditingUser(undefined);
      await carregarUsuarios();
    } catch (err) {
      if (isAxiosError(err) && err.response?.status === 401) {
        setError("Sessão expirada. Faça login novamente.");
      } else {
        setError("Não foi possível salvar o usuário.");
      }
    }
  }

  function handleEdit(usuario: Usuario) {
    setEditingUser(usuario);
    setShowForm(true);
  }

  async function handleRemove(usuario: Usuario) {
    const isSelf = userId !== null && usuario.id === userId;
    const confirmMessage = isSelf
      ? `Atenção: você está prestes a excluir a SUA PRÓPRIA conta (${usuario.email}). Isso pode encerrar seu acesso imediatamente. Deseja continuar?`
      : `Remover o usuário "${usuario.nome}"?`;

    if (!window.confirm(confirmMessage)) {
      return;
    }

    setError("");
    try {
      await removerUsuario(usuario.id);
      await carregarUsuarios();
    } catch {
      setError("Não foi possível remover o usuário.");
    }
  }

  function handleNovoUsuario() {
    setEditingUser(undefined);
    setShowForm(true);
  }

  function handleCancel() {
    setShowForm(false);
    setEditingUser(undefined);
  }

  if (perfil !== PerfilUsuario.ADMIN) {
    return (
      <p className="rounded-md bg-red-50 px-4 py-3 text-sm text-red-700">
        Acesso restrito a administradores. Esta é apenas uma restrição visual
        do frontend — o backend não impõe controle de perfil nesta rota.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-brand-navy">Usuários</h2>
        <FormButton variant="primary" onClick={handleNovoUsuario}>
          Novo usuário
        </FormButton>
      </div>

      {error && (
        <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
      )}

      {showForm && (
        <UserForm
          initialData={editingUser}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      )}

      {loading ? (
        <p className="text-sm text-slate-500">Carregando usuários...</p>
      ) : (
        <UserTable usuarios={usuarios} onEdit={handleEdit} onRemove={handleRemove} />
      )}
    </div>
  );
}
