const express = require('express')
const TransacoesRep = require('./transacoes-repositorio')

const app = express()

const port = 3000;

app.use(express.static(`${__dirname}/public`))

app.get('/transacoes', (req, res) => {
  const repositorio = new TransacoesRep();
  const transacoes = repositorio.listarTransacoes()
    res.send(transacoes);
})
app.get('/criar-transacao', (req, res) => {
  const repositorio = new TransacoesRep();
  const transacao = {
    valor: 10,
    descricao: "pastel"
  }
  repositorio.criarTransacao(transacao)
  res.status(201).send(transacao); 
})

app.listen(port, () => {
  console.log(`Servidor ouvindo na porta ${port}`);
});