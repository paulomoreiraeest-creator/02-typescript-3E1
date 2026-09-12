export interface PerfilUsuario {
  readonly id: string;
  nombreCompleto: string;
  correo: string;
  telefono?: string;
  rol: "ADMIN" | "DOCENTE" | "ESTUDIANTE";
}

export const usuarioEjemplo: PerfilUsuario = {
  id: "UETS-2026-001",
  nombreCompleto: "Paulo Andrés Moreira Elías",
  correo: "paulo.moreirae.est@uets.edu.ec",
  rol: "ESTUDIANTE"
};

export function formatearPerfilUsuario(usuario: PerfilUsuario): string {
  let formatear:string = `[PERFIL] ${usuario.id} (${usuario.rol}): ${usuario.nombreCompleto} - ${usuario.correo}`;
  return formatear;
}

export interface ProductoItem {
  readonly id: string;
  titulo: string;
  precio: number;
  disponible: boolean;
  descuentoPorcentaje?: number;
}

export function calcularPrecioFinal(producto: ProductoItem): number {
  if (!producto.disponible) {
    return 0;
  }
  if (producto.descuentoPorcentaje !== undefined && producto.descuentoPorcentaje > 0) {
    let descuento = producto.precio * (producto.descuentoPorcentaje / 100);
    let precioFinal = producto.precio - descuento;
    return Number(precioFinal.toFixed(2));
  }
  return Number(producto.precio.toFixed(2));
}
