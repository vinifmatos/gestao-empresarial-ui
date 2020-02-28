import { Cliente } from '../cliente/cliente'
import { PedidoItem } from './pedido-item'

export class Pedido {
  id: number
  cliente: Cliente
  situacao: string
  prazo_entrega: number
  data_entrega: string
  data: string
  pedido_itens: PedidoItem[]
  readonly SITUACOES = {
    em_aberto: 'Em aberto',
    cancelado: 'Cancelado',
    em_andamento: 'Em andamento',
    pronto_entrega: 'Pronto para entrega',
    finalizado: 'Finalizado'
  }

  constructor(
    id: number = null,
    cliente: Cliente = null,
    situacao: string = 'em_aberto',
    prazo_entrega: number = 0,
    data_entrega: string = null,
    data: string = null,
    pedido_itens: PedidoItem[] = [],
  ) {
    this.id = id
    this.cliente = Object.assign(new Cliente, cliente)
    this.situacao = situacao
    this.prazo_entrega = prazo_entrega
    this.data_entrega = this.parseData(data_entrega)
    this.data = this.parseData(data)
    this.pedido_itens = pedido_itens.map(pedido_item => Object.assign(new PedidoItem, pedido_item))
  }

  toJSON() {
    var pedido: { [k: string]: any } = {}
    pedido.cliente_id = this.cliente.id
    pedido.situacao = this.situacao
    pedido.prazo_entrega = this.prazo_entrega
    pedido.data = this.data
    pedido.pedido_itens_attributes = this.pedido_itens
    if (!this.data_entrega)
      pedido.data_entrega = this.data_entrega

    return { pedido: pedido }
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

  private parseData(data) {
    if (!data)
      return
    var d = data.split('-')
    return `${d[2]}/${d[1]}/${d[0]}`
  }

  situacaoFormatada() {
    return this.SITUACOES[this.situacao]
  }
}
