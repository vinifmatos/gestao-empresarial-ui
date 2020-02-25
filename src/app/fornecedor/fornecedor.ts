export class Fornecedor {
  id: number
  nome: string
  telefone: string
  email: string

  constructor(id: number = null, nome: string = '', telefone: string = '', email: string = '') {
    this.id = id
    this.nome = nome
    this.telefone = telefone
    this.email = email
  }

  toJSON() {
    return {
      nome: this.nome,
      telefone: this.telefone,
      email: this.email
    }
  }

  humanName(count: number = 1) {
    if (count > 1)
      return 'Fornecedores'
    else
      return 'Fornecedor'
  }

  className(count: number = 1) {
    if (count > 1)
      return this.humanName(count).toLowerCase()
    else
      return this.humanName(count).toLowerCase()
  }
}
