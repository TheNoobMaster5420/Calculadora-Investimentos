
document.getElementById("calcularButton").addEventListener("click", function () {
  const capitalInicial = parseFloat(document.getElementById("capitalInicial").value);
  const taxaJuros = parseFloat(document.getElementById("taxaJuros").value) / 100;
  const aporteMensal = parseFloat(document.getElementById("aporteMensal").value);
  const meses = parseInt(document.getElementById("meses").value);

  let montante = capitalInicial;
  const historico = [];

  for (let mes = 1; mes <= meses; mes++) {
    montante = montante * (1 + taxaJuros) + aporteMensal;
    historico.push({ mes, valor: montante });
  }

  document.getElementById("montanteFinal").textContent =
    `Montante Final: R$${montante.toFixed(2)}`;

  const historicoElement = document.getElementById("historico");
  historicoElement.innerHTML = '';
  historico.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `Mês ${item.mes}: R$${item.valor.toFixed(2)}`;
    historicoElement.appendChild(li);
  });

  document.getElementById("resultados").classList.remove("hidden");

  const canvas = document.getElementById("grafico");
  if (canvas.chart) {
    canvas.chart.destroy();
  }

  const ctx = canvas.getContext("2d");
  canvas.chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: historico.map(h => `Mês ${h.mes}`),
      datasets: [{
        label: 'Crescimento do Montante',
        data: historico.map(h => h.valor),
        borderColor: '#3b82f6',
        backgroundColor: '#3b82f6',
        fill: false,
        tension: 0.2
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: false
        }
      }
    }
  });
});
