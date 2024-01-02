class Inversion {
  constructor(principal, tasaMensual, gananciaDiaria, meses) {
    this.principal = principal;
    this.tasaMensual = tasaMensual / 100; // Convierto a decimal
    this.gananciaDiaria = gananciaDiaria;
    this.meses = meses;
  }

  calcularGanancias() {
    let totalGanancias = 0;

    for (let i = 0; i < this.meses; i++) {
      let gananciasMensuales = this.principal * this.tasaMensual;

      gananciasMensuales += this.gananciaDiaria;

      totalGanancias += gananciasMensuales;

      this.principal += gananciasMensuales;
    }

    return totalGanancias.toFixed(2);
  }
}

function calcularInversion() {
  const montoInversion = parseFloat(document.getElementById('montoInversion').value);
  const tasaMensual = parseFloat(document.getElementById('tasaMensual').value);
  const gananciaDiaria = parseFloat(document.getElementById('gananciaDiaria').value);

  if (isNaN(montoInversion) || isNaN(tasaMensual) || isNaN(gananciaDiaria) || montoInversion < 100000) {
    alert("Por favor, ingrese valores válidos y asegúrese de que la inversión sea de al menos 100,000 pesos.");
    return;
  }

  const inversion = new Inversion(montoInversion, tasaMensual, gananciaDiaria, 12);
  const gananciasTotales = inversion.calcularGanancias();

  document.getElementById('resultados').value = gananciasTotales;
}

function nuevaInversion() {
  document.getElementById('montoInversion').value = '100000';
  document.getElementById('tasaMensual').value = '10';
  document.getElementById('gananciaDiaria').value = '0.24';
  document.getElementById('resultados').value = '';
}