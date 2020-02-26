import { Cliente } from '../cliente/shared/cliente'
import { PedidoItem } from './pedido-item'

export class Pedido {
  id: number
  cliente: Cliente
  situacao: string
  prazo_entrega: number
  data_entrega: Date
  data: Date
  pedido_itens: PedidoItem[]

  constructor(
    id: number = null,
    cliente: Cliente = null,
    situacao: string = null,
    prazo_entrega: number = 0,
    data_entrega: Date = null,
    data: Date = null,
    pedido_itens: PedidoItem[] = [],
  ) {
    this.id = id
    this.cliente = Object.assign(new Cliente, cliente)
    this.situacao = situacao
    this.prazo_entrega = prazo_entrega
    this.data_entrega = data_entrega
    this.data = data
    this.pedido_itens = pedido_itens.map(pedido_item => Object.assign(new PedidoItem, pedido_item))
  }

  toJSON() {
    return {
      pedido: {
        cliente_id: this.cliente.id,
        situacao: this.situacao,
        prazo_entrega: this.prazo_entrega,
        data_entrega: this.data_entrega,
        data: this.data,
        pedido_itens_attributes: this.pedido_itens
      }
    }
  }

  humanName(count: number = 1) {
    if (count > 1)
      return 'Pedidos'
    else
      return 'Pedido'
  }

  className(count: number = 1) {
    if (count > 1)
      return this.humanName(count).toLowerCase()
    else
      return this.humanName(count).toLowerCase()
  }
}
