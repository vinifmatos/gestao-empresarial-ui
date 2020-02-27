import { EnderecoCliente } from './endereco-cliente'

export class Cliente {
  id: number
  nome: string
  telefone: string
  email: string
  endereco_cliente: EnderecoCliente

  constructor(
    id: number = null,
    nome: string = '',
    telefone: string = '',
    email: string = '',
    endereco_cliente: EnderecoCliente = new EnderecoCliente()
  ) {
    this.id = id
    this.nome = nome
    this.telefone = telefone
    this.email = email
    this.endereco_cliente = endereco_cliente
  }

  toJSON() {
    return {
      cliente: {
        nome: this.nome,
        telefone: this.telefone,
        email: this.email,
        endereco_cliente_attributes: {
          logradouro: this.endereco_cliente.logradouro,
          numero: this.endereco_cliente.numero,
          complemento: this.endereco_cliente.complemento,
          bairro: this.endereco_cliente.bairro,
          cidade: this.endereco_cliente.cidade,
          cep: this.endereco_cliente.cep
        }
      }
    }
  }

  humanName(count: number = 1) {
    if (count > 1)
      return 'Clientes'
    else
      return 'Cliente'
  }

  className(count: number = 1) {
    if (count > 1)
      return this.humanName(count).toLowerCase()
    else
      return this.humanName(count).toLowerCase()
  }
}
