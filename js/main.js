class Inversion {
  constructor(principal, tasaMensual, gananciaDiaria, meses) {
    this.principal = principal;
    this.tasaMensual = tasaMensual;
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

    return totalGanancias;
  }
}

// Función para preguntar al usuario si desea calcular otra inversión
function calcularOtraInversion() {
  let respuesta = prompt("¿Desea calcular otra inversión? (Sí/No)").toLowerCase();
  return respuesta === 'sí' || respuesta === 'si';
}

// Bucle para permitir cálculos múltiples
do {
  let principalInversion = prompt("¿Qué monto desea invertir?");
  principalInversion = parseFloat(principalInversion);

  const inversion = new Inversion(principalInversion, 0.24, 0.80, 12);

  const gananciasTotales = inversion.calcularGanancias();

  console.log(`Ganancias totales después de ${inversion.meses} meses: $${gananciasTotales.toFixed(2)}`);

} while (calcularOtraInversion());