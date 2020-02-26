export class Produto {
  id: number
  descricao: string
  preco: number

  constructor(id: number = null, descricao: string = '', preco: number = 0) {
    this.id = id
    this.descricao = descricao
    this.preco = preco
  }

  toJSON() {
    return {
      produto: {
        descricao: this.descricao,
        preco: this.preco
      }
    }
  }

  humanName(count: number = 1) {
    if (count > 1)
      return 'Produtos'
    else
      return 'Produto'
  }

  className(count: number = 1) {
    if (count > 1)
      return this.humanName(count).toLowerCase()
    else
      return this.humanName(count).toLowerCase()
  }
}
