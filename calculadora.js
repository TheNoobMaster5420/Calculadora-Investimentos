
document.getElementById("calcularButton").addEventListener("click", function() {
  // Pegando os valores dos inputs
  const capitalInicial = parseFloat(document.getElementById("capitalInicial").value);
  const taxaJuros = parseFloat(document.getElementById("taxaJuros").value) / 100;
  const aporteMensal = parseFloat(document.getElementById("aporteMensal").value);
  const meses = parseInt(document.getElementById("meses").value);

  let montante = capitalInicial;
  const historico = [];

  // Calculando os valores mês a mês
  for (let mes = 1; mes <= meses; mes++) {
    montante = montante * (1 + taxaJuros) + aporteMensal;
    historico.push({ mes, valor: montante });
  }

  // Exibindo o resultado final
  const montanteFinal = document.getElementById("montanteFinal");
  montanteFinal.textContent = `Montante Final: R$${montante.toFixed(2)}`;

  // Exibindo o histórico dos meses
  const historicoElement = document.getElementById("historico");
  historicoElement.innerHTML = '';
  historico.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `Mês ${item.mes}: R$${item.valor.toFixed(2)}`;
    historicoElement.appendChild(li);
  });

  // Exibindo o gráfico
  const ctx = document.getElementById('grafico').getContext('2d');
  const grafico = new Chart(ctx, {
    type: 'line',
    data: {
      labels: historico.map(item => `Mês ${item.mes}`),
      datasets: [{
        label: 'Crescimento do Montante',
        data: historico.map(item => item.valor),
        borderColor: '#1e3a8a',
        fill: false,
        borderWidth: 2
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: false
        }
      }
    }
  });

  // Mostrando os resultados
  document.getElementById("resultados").classList.remove("hidden");
});
    