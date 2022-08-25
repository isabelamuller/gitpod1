function formatarValor(valor) {
    return valor.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
  }
  
  // function setSaldo(saldo) {
  //  const saldoConteudo = document.createTextNode('Saldo: ' + formatarValor(saldo));
 //   const saldoElement = document.getElementById('saldo');
 //   saldoElement.replaceChildren(saldoConteudo);
 // }
  
  function criarTransacao(transacao) {
    const linha = document.createElement('tr');
    
    const descricaoElement = document.createElement('td');
    descricaoElement.setAttribute('class', 'coluna-descricao');
    descricaoElement.append(transacao.descricao);
    linha.append(descricaoElement);
    
    const categoriaElement = document.createElement('td');
    categoriaElement.setAttribute('class', 'coluna-categoria');
    categoriaElement.append(transacao.categoria);
    linha.append(categoriaElement);
    
    const valorElement = document.createElement('td');
    valorElement.setAttribute('class', 'coluna-valor');
    valorElement.append(formatarValor(transacao.valor));
    linha.append(valorElement);
    
    return linha;
  }
  
  function setTransacoes(transacoes) {
    const tabelaConteudo = document.createElement('tbody');
    tabelaConteudo.setAttribute('id', 'lista-transacoes-conteudo');
  
    let saldo = 0;
    transacoes.forEach((transacao) => {
      if(transacao.categoria === "despesa") {
        saldo = saldo - transacao.valor;
      }
      if(transacao.categoria === "receita") {
        saldo = saldo + transacao.valor;
      }
    })
      transacoes.saldo = saldo;

    
    document.getElementById('lista-transacoes-conteudo').replaceWith(tabelaConteudo);
  }
  
  async function buscarTransacoes() {
    const response = await fetch('/transacoes');
    const financas = await response.json();
    
    setSaldo(financas.saldo);
    setTransacoes(financas.transacoes);
  }
  
  async function enviarDadosTransacao(descricao, valor, categoria) {
  
    await fetch('/transacoes', requisicao);
    if (valor.indexOf(',') > 0) {
      alert('Você deve digitar números com o símbolo decimal ponto, e não vírgula');
      return;
    }
    
    if (isNaN(valor)) {
      alert('Você deve digitar um número no campo valor!');
      return;
    }
    const transacao = { descricao, categoria, valor: Number(valor) };
    console.log('transacao' + JSON.stringify(transacao));
    const requisicao = {
      method: 'POST',
      body: JSON.stringify(transacao),
    };
  }
  
  async function adicionarDespesa() {
    const descricaoDespesa = window.prompt('Qual a descricao de sua despesa?');
    const valorDespesa = window.prompt('Qual o valor de sua despesa?');
  
    await enviarDadosTransacao(descricaoDespesa, valorDespesa);
    
    buscarTransacoes();
  }
  
  async function adicionarReceita() {
    const descricaoReceita = window.prompt('Qual a descricao de sua receita?');
    const valorReceita = window.prompt('Qual o valor de sua receita?');
  
    await enviarDadosTransacao(descricaoReceita, valorReceita);
    
    buscarTransacoes();
  }
  
  document.getElementById('botao-despesa').addEventListener('click', adicionarDespesa);
  document.getElementById('botao-receita').addEventListener('click', adicionarReceita);
  
  buscarTransacoes();
  
