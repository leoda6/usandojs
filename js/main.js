// Función para llenar un select con opciones
function fillSelect(elementId, values) {
  const select = document.getElementById(elementId);
  values.forEach(value => {
      const option = document.createElement("option");
      option.value = value;
      option.text = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      select.add(option);
  });
}

// Función para calcular las ganancias
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

// Función para cargar datos desde un archivo JSON local
async function fetchData(url) {
  try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
  } catch (error) {
      console.error("Error fetching data:", error);
  }
}

// Objeto que representa una inversión
class Inversion {
  constructor(principal, tasaMensual, gananciaDiaria, meses) {
      this.principal = principal;
      this.tasaMensual = tasaMensual / 100; // Convierto a decimal
      this.gananciaDiaria = gananciaDiaria;
      this.meses = meses;
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  const app = document.getElementById("app");

  // Cargar datos para los select desde un archivo JSON 
  const montoInversiones = await fetchData("../json/montos.json");
  const tasasMensuales = await fetchData("../json/tasas.json");
  const gananciasDiarias = await fetchData("../json/ganancias.json");

  // Llenar los select
  fillSelect("montoInversion", montoInversiones);
  fillSelect("tasaMensual", tasasMensuales);
  fillSelect("gananciaDiaria", gananciasDiarias);

  // Configurar el evento de clic para calcular la inversión
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

  // Configurar el evento de clic para reiniciar la inversión
  document.getElementById("nuevaInversionBtn").addEventListener("click", () => {
      document.getElementById('montoInversion').value = montoInversiones[0];
      document.getElementById('tasaMensual').value = tasasMensuales[0];
      document.getElementById('gananciaDiaria').value = gananciasDiarias[0];
      document.getElementById('resultados').value = '';
  });
});