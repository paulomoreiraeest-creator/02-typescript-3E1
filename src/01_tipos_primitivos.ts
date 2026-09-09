export const nombreEstudiante: string = "Andres Moreira";
export const edadEstudiante: number = 17;
export const promedioObjetivo: number = 9;
export let estaMatriculado: boolean = true;

export function obtenerResumenPersonal(): string {
  let formato:string = `👤 Estudiante: ${nombreEstudiante} | 🎂 Edad: ${edadEstudiante} años | 🎯 Meta: ${promedioObjetivo}/10 | 📋 Estado: ${estaMatriculado ? "MATRICULADO" : "NO_MATRICULADO"}`;
  return formato;
}

export function calcularPromedio(notas: readonly number[]): number {
  if (notas.length == 0) {
    return 0;
  }
  let suma = notas.reduce((acc, nota) => acc + nota, 0);
  return Number((suma / notas.length).toFixed(2));
}

export function formatearFichaEstudiante(nombre: string, edad: number, paralelo: "E1" | "E2", activo: boolean): string {
  let formato:string =`[FICHA UETS] ${nombre.toUpperCase()} (${edad} años) - Paralelo: ${paralelo} - Estado: ${activo ? "MATRICULADO" : "RETIRADO"}`;
  return formato;
}
