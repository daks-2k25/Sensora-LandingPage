// Portado de frontend/components/tables/ProductTable.js — mesmo
// comportamento e colunas.
import FormButton from "@/components/ui/FormButton";
import type { Produto } from "@/lib/types/loja";

type ProductTableProps = {
  produtos: Produto[];
  onEdit: (produto: Produto) => void;
  onRemove: (produto: Produto) => void;
};

export default function ProductTable({ produtos, onEdit, onRemove }: ProductTableProps) {
  if (!produtos || produtos.length === 0) {
    return <p className="text-sm text-slate-500">Nenhum produto cadastrado.</p>;
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="bg-brand-navy text-white">
            <th className="px-4 py-2 font-medium">Nome</th>
            <th className="px-4 py-2 font-medium">Preço</th>
            <th className="px-4 py-2 font-medium">Estoque</th>
            <th className="px-4 py-2 font-medium">Ações</th>
          </tr>
        </thead>
        <tbody>
          {produtos.map((produto) => (
            <tr key={produto.id} className="border-t border-slate-200 hover:bg-slate-50">
              <td className="px-4 py-2">{produto.nome}</td>
              <td className="px-4 py-2">{produto.preco}</td>
              <td className="px-4 py-2">{produto.quantidade}</td>
              <td className="px-4 py-2">
                <div className="flex gap-2">
                  <FormButton variant="secondary" onClick={() => onEdit(produto)}>
                    Editar
                  </FormButton>
                  <FormButton variant="danger" onClick={() => onRemove(produto)}>
                    Remover
                  </FormButton>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
