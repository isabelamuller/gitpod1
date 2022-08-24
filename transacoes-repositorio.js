const transacoes = {
        transacoes: [
          {
            valor: 10, 
            descricao: "pastel"
          },
          {
            valor: 3,
            descricao: "doce"
          }
        ]
      }
      class TransacoesRep {
    
    listarTransacoes() {
        return transacoes

    }
    criarTransacao(transacao) {
        const lista = transacoes.transacoes;
        lista.push(transacao)
    }
}

module.exports = TransacoesRep;