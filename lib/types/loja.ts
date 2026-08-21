// Tipos da camada lógica da Loja, portados de frontend/services e frontend/lib
// (projeto JS original) e conferidos contra os DTOs/entities reais do
// backend (src/*/dto, src/usuarios/entities/usuario.entity.ts,
// prisma/schema.prisma) para bater exatamente com o que a API espera e
// devolve — nada aqui foi inventado.
//
// Nota sobre preço/total: os services do backend (produtos.service.ts,
// pedidos.service.ts, itens-pedido.service.ts) normalizam explicitamente
// todo campo Decimal do Prisma com Number(...) antes de devolver a
// resposta (ver paraPedido/paraProduto/paraItemPedido) — os campos
// monetários de entidade são `number` tanto nas rotas internas quanto na
// pública, batendo com as classes Produto/Pedido/ItemPedido em
// backend/src/*/entities/*.entity.ts.

export enum PerfilUsuario {
  ADMIN = "ADMIN",
  VENDEDOR = "VENDEDOR",
  CLIENTE = "CLIENTE",
}

export enum StatusPedido {
  PENDENTE = "PENDENTE",
  PAGO = "PAGO",
  CANCELADO = "CANCELADO",
}

export type JwtPayload = {
  sub: number;
  email: string;
  perfil: PerfilUsuario;
  iat?: number;
  exp?: number;
};

export type AuthResponse = {
  access_token: string;
};

export type LoginPayload = {
  email: string;
  senha: string;
};

export type RegisterPayload = {
  nome: string;
  email: string;
  senha: string;
};

export type CategoriaResumo = {
  id: number;
  nome: string;
  slug: string;
};

export type Categoria = {
  id: number;
  nome: string;
  slug: string;
  descricao?: string | null;
};

export type CreateCategoriaPayload = {
  nome: string;
  descricao?: string;
};

export type UpdateCategoriaPayload = Partial<CreateCategoriaPayload>;

export type Produto = {
  id: number;
  nome: string;
  slug: string;
  descricao?: string | null;
  preco: number;
  quantidade: number;
  imagemUrl?: string | null;
  aroma?: string | null;
  ativo: boolean;
  destaque: boolean;
  categoriaId?: number | null;
  categoria?: CategoriaResumo | null;
};

export type CreateProdutoPayload = {
  nome: string;
  descricao?: string;
  aroma?: string;
  imagemUrl?: string;
  ativo?: boolean;
  categoriaId?: number;
  preco: number;
  quantidade: number;
};

export type UpdateProdutoPayload = Partial<CreateProdutoPayload>;

export type Cliente = {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  cpf: string;
  endereco: string;
};

export type CreateClientePayload = {
  nome: string;
  email: string;
  telefone: string;
  cpf: string;
  endereco: string;
};

export type UpdateClientePayload = Partial<CreateClientePayload>;

export type Pedido = {
  id: number;
  numero: string;
  data: string;
  status: StatusPedido;
  total: number;
  stripeSessionId?: string | null;
  clienteEmail?: string | null;
  clienteNome?: string | null;
  usuarioId?: number | null;
};

export type CreatePedidoPayload = {
  numero: string;
  data: string;
  status?: StatusPedido;
  total: number;
};

export type UpdatePedidoPayload = Partial<CreatePedidoPayload>;

export type ItemPedido = {
  id: number;
  pedidoId: number;
  produtoId: number;
  quantidade: number;
  precoUnitario: number;
  subtotal: number;
};

// Formato real de GET /pedidos/:id/itens (ver backend/src/pedidos/entities/
// pedido-com-itens.entity.ts e pedidos.service.ts#buscarPedidoComItens) —
// objeto aninhado, não achatado: { pedido, itens, total }. `total` aqui é o
// total recalculado a partir dos itens (number), distinto de `pedido.total`
// (persistido no banco, string) — a página de detalhe usa a diferença entre
// os dois para saber se precisa sincronizar o total do pedido.
export type PedidoComItens = {
  pedido: Pedido;
  itens: ItemPedido[];
  total: number;
};

export type CreateItemPedidoPayload = {
  pedidoId: number;
  produtoId: number;
  quantidade: number;
  precoUnitario: number;
};

export type UpdateItemPedidoPayload = Partial<CreateItemPedidoPayload>;

export type Usuario = {
  id: number;
  nome: string;
  email: string;
  perfil: PerfilUsuario;
  ativo: boolean;
};

export type CreateUsuarioPayload = {
  nome: string;
  email: string;
  senha: string;
  perfil: PerfilUsuario;
  ativo?: boolean;
};

export type UpdateUsuarioPayload = Partial<CreateUsuarioPayload>;
