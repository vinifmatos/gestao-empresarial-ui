import { Produto } from '../produto/produto'

export class PedidoItem {
  id: number
  produto: Produto
  quantidade: number
  valor_unitario: number
  valor_total: number
  _destroy: boolean

  constructor(
    id: number = null,
    produto: Produto = null,
    quantidade: number = null,
    valor_unitario: number = null,
    valor_total: number = null,
    _destroy: boolean = false
  ) {
    this.id = id
    this.produto = Object.assign(new Produto, produto)
    this.quantidade = quantidade
    this.valor_unitario = valor_unitario
    this.valor_total = valor_total
    this._destroy = false
  }

  toJSON() {
    return {
      id: this.id,
      produto_id: this.produto.id,
      quantidade: this.quantidade,
      valor_unitario: this.valor_unitario,
      valor_total: this.valor_total,
      _destroy: this._destroy
    }
  }
}
