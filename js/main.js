document.addEventListener("DOMContentLoaded", async () => {

  function fillSelect(elementId, values) {
    const select = document.getElementById(elementId);
    values.forEach(value => {
      const option = document.createElement("option");
      option.value = value;
      option.text = value.toLocaleString();
      select.add(option);
    });
  }


  function calcularGanancias(inversion) {
    let totalGanancias = 0;

    for (let i = 0; i < inversion.meses; i++) {
      let gananciasMensuales = inversion.principal * inversion.tasaMensual;
      gananciasMensuales += inversion.gananciaDiaria;
      totalGanancias += gananciasMensuales;
      inversion.principal += gananciasMensuales;
    }

    return totalGanancias.toFixed(2);
  }

  
  async function fetchData(url) {
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  
  class Inversion {
    constructor(principal, tasaMensual, gananciaDiaria, meses) {
      this.principal = principal;
      this.tasaMensual = tasaMensual / 100;
      this.gananciaDiaria = gananciaDiaria;
      this.meses = meses;
    }
  }

 
  const montoInversiones = await fetchData("../json/montos.json");
  const tasasMensuales = await fetchData("../json/tasas.json");
  const gananciasDiarias = await fetchData("../json/ganancias.json");

  fillSelect("montoInversion", montoInversiones);
  fillSelect("tasaMensual", tasasMensuales);
  fillSelect("gananciaDiaria", gananciasDiarias);

  document.getElementById("calcularBtn").addEventListener("click", () => {
    const montoInversion = parseFloat(document.getElementById('montoInversion').value);
    const tasaMensual = parseFloat(document.getElementById('tasaMensual').value);
    const gananciaDiaria = parseFloat(document.getElementById('gananciaDiaria').value);

    if (isNaN(montoInversion) || isNaN(tasaMensual) || isNaN(gananciaDiaria) || montoInversion < 100000) {
      alert("Por favor, ingrese valores válidos y asegúrese de que la inversión sea de al menos 100,000 pesos.");
      return;
    }

    const inversion = new Inversion(montoInversion, tasaMensual, gananciaDiaria, 12);
    const gananciasTotales = calcularGanancias(inversion);

    document.getElementById('resultados').value = gananciasTotales;
  });


  document.getElementById("nuevaInversionBtn").addEventListener("click", () => {
    document.getElementById('montoInversion').value = montoInversiones[0];
    document.getElementById('tasaMensual').value = tasasMensuales[0];
    document.getElementById('gananciaDiaria').value = gananciasDiarias[0];
    document.getElementById('resultados').value = '';
  });
});


document.addEventListener("DOMContentLoaded", async () => {

  document.getElementById("convertirBtn").addEventListener("click", () => {
    const montoConversion = parseFloat(document.getElementById('montoConversion').value);
    const monedaOrigen = document.getElementById('monedaOrigen').value;
    const monedaDestino = document.getElementById('monedaDestino').value;

    if (isNaN(montoConversion) || !monedaOrigen || !monedaDestino) {
      alert("Por favor, ingrese un monto válido y seleccione las monedas de origen y destino.");
      return;
    }

    const tasaCambio = obtenerTasaCambio(monedaOrigen, monedaDestino);
    const resultadoConversion = montoConversion * tasaCambio;

    document.getElementById('resultadoConversion').value = resultadoConversion.toLocaleString();
  });

  function obtenerTasaCambio(monedaOrigen, monedaDestino) {
    
    const tasas = {
      usd: {
        eur: 0.93,
        brl: 5.25,
        arg: 829,
      },
      eur: {
        usd: 1.07,
        brl: 5.37,
        arg: 890,
      },
      brl: {
        usd: 0.20,
        eur: 0.19,
        arg: 165,
      },
      arg: {
        usd: 1200,
        eur: 1250,
        brl: 165,
      },
    };

    return tasas[monedaOrigen][monedaDestino] || 1; 
  }
});