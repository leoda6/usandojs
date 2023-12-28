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

let respuesta = "si";
do {
  let principalInversion = prompt("¿Qué monto desea invertir? (Mínimo 100,000 pesos)");
  principalInversion = parseFloat(principalInversion);

  //la inversión sea de al menos 100,000 pesos
  if (principalInversion < 100000) {
    alert("La inversión debe ser de al menos 100,000 pesos. Intente nuevamente.");
    continue;
  }

  const inversion = new Inversion(principalInversion, 0.10, 0.80, 12);
  inversiones.push(inversion); // Almacenar la inversión en el array

  const gananciasTotales = inversion.calcularGanancias();

  console.log(`Ganancias totales después de ${inversion.meses} meses: $${gananciasTotales.toFixed(2)}`);

  respuesta = prompt("¿Desea calcular otra inversión? (Sí/No)").toLowerCase();
} while (respuesta === "si" || respuesta === "sí");

// Obtener la inversión con mayor ganancia
if (inversiones.length > 0) {
  const inversionMayorGanancia = inversiones.reduce((prev, current) =>
    prev.calcularGanancias() > current.calcularGanancias() ? prev : current
  );

  console.log(`La inversión con mayor ganancia fue de $${inversionMayorGanancia.calcularGanancias().toFixed(2)}`);
} else {
  console.log("No se realizaron inversiones.");
}