// calculamos ganancias
function calcularGanancias(principal, tasa, gananciaDiaria, meses) {
    let totalGanancias = 0;
  
    for (let i = 0; i < meses; i++) {
      let gananciasMensuales = principal * tasa;
  
      gananciasMensuales += gananciaDiaria;
  
      totalGanancias += gananciasMensuales;
  
      principal += gananciasMensuales;
    }
  
    return totalGanancias;
  }
 
  let principalInversion= prompt("¿Que monto desea invertir?");
  principalInversion = parseFloat(principalInversion);
  //let principalInicial = 100; // Numero de inversion
  const tasaMensual = 0.24; // 24% de interés mensual
  const gananciaDiaria = 0.80; // Ganancia diaria
  const mesesInversion = 12; // Número de meses de inversión
  
  // Calculo ganancias totales
  const gananciasTotales = calcularGanancias(principalInversion, tasaMensual, gananciaDiaria, mesesInversion);

  console.log(`Ganancias totales después de ${mesesInversion} meses: $${gananciasTotales.toFixed(2)}`);