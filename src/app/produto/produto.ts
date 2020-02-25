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
}
