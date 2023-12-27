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

// Array para almacenar inversiones
let inversiones = [];

// Función para preguntar al usuario si desea calcular otra inversión
function calcularOtraInversion() {
  let respuesta = prompt("¿Desea calcular otra inversión? (Sí/No)").toLowerCase();
  return respuesta === 'sí' || respuesta === 'si';
}

// Bucle para cálculos
do {
  let principalInversion = prompt("¿Qué monto desea invertir? (Mínimo 100,000 pesos)");
  principalInversion = parseFloat(principalInversion);

  // Asegurar que la inversión sea de al menos 100,000 pesos
  if (principalInversion < 100000) {
    alert("La inversión debe ser de al menos 100,000 pesos. Intente nuevamente.");
    continue;
  }

  const inversion = new Inversion(principalInversion, 0.10, 0.80, 12);
  inversiones.push(inversion); // Almacenar la inversión en el array

  const gananciasTotales = inversion.calcularGanancias();

  console.log(`Ganancias totales después de ${inversion.meses} meses: $${gananciasTotales.toFixed(2)}`);

} while (calcularOtraInversion());

// Obtener la inversión con mayor ganancia
const inversionMayorGanancia = inversiones.find(inversion => inversion.calcularGanancias() === Math.max(...inversiones.map(inv => inv.calcularGanancias())));

console.log(`La inversión con mayor ganancia fue de $${inversionMayorGanancia.calcularGanancias().toFixed(2)}`);