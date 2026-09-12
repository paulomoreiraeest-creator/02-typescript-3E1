export type MetodoPago = "EFECTIVO" | "TRANSFERENCIA" | "TARJETA_DIGITAL";
export type EstadoPedido = "PENDIENTE" | "PAGADO" | "EN_CAMINO" | "ENTREGADO";

export interface ItemMenu {
  readonly id: string;
  nombre: string;
  precioUnitario: number;
  categoria: "SNACKS" | "BEBIDAS" | "ALMUERZOS" | "PAPELERIA";
  disponible: boolean;
}

export interface LineaDetalle {
  producto: ItemMenu;
  cantidad: number;
  notasEspeciales?: string;
}

export interface PedidoMovil {
  readonly numeroOrden: string;
  cliente: {
    nombre: string;
    cursoParalelo: string;
  };
  detalles: LineaDetalle[];
  metodoPago: MetodoPago;
  estado: EstadoPedido;
}

export interface ResumenFinanciero {
  subtotal: number;
  descuentoEstudiantil: number;
  iva15: number;
  totalPagar: number;
}

export function calcularTotalesPedido(pedido: PedidoMovil): ResumenFinanciero {
  let subtotal = 0;
  for(let item of pedido.detalles){
    subtotal += item.producto.precioUnitario*item.cantidad;
  }

  let descuentoEstudiantil = 0;
  if(subtotal>=10.00){
    descuentoEstudiantil = subtotal*0.10;
  }

  let baseImponible = subtotal-descuentoEstudiantil;
  let iva15 = baseImponible*0.15;
  let totalPagar = baseImponible+iva15;

  return {
    subtotal: Number(subtotal.toFixed(2)),
    descuentoEstudiantil : Number(descuentoEstudiantil.toFixed(2)),
    iva15 : Number(iva15.toFixed(2)),
    totalPagar : Number(totalPagar.toFixed(2))
  };
}

export function imprimirTicketDigital(pedido: PedidoMovil): void {
  const totales = calcularTotalesPedido(pedido);

  console.log("╔══════════════════════════════════════════════════════════════╗");
  console.log("║           📱 BAR SALESIANO UETS - RECIBO DIGITAL             ║");
  console.log("╠══════════════════════════════════════════════════════════════╣");
  console.log(`║ Orden #: ${pedido.numeroOrden.padEnd(52)}║`);
  console.log(`║ Cliente: ${(pedido.cliente.nombre + " (" + pedido.cliente.cursoParalelo + ")").padEnd(52)}║`);
  console.log(`║ Pago:    ${pedido.metodoPago.padEnd(52)}║`);
  console.log("╟──────────────────────────────────────────────────────────────╢");
  console.log("║ ITEMS DEL PEDIDO:                                            ║");

  pedido.detalles.forEach((item, idx) => {
    const totalItem = (item.producto.precioUnitario * item.cantidad).toFixed(2);
    const linea = `${idx + 1}. [${item.cantidad}x] ${item.producto.nombre} - $${totalItem}`;
    console.log(`║ ${linea.padEnd(61)}║`);
  });

  console.log("╟──────────────────────────────────────────────────────────────╢");
  console.log(`║ Subtotal:               $${totales.subtotal.toFixed(2).padStart(35)} ║`);
  console.log(`║ Descuento Estudiantil: -$${totales.descuentoEstudiantil.toFixed(2).padStart(35)} ║`);
  console.log(`║ IVA (15%):              $${totales.iva15.toFixed(2).padStart(35)} ║`);
  console.log("╠══════════════════════════════════════════════════════════════╣");
  console.log(`║ 💳 TOTAL A PAGAR:       $${totales.totalPagar.toFixed(2).padStart(35)} ║`);
  console.log("╚══════════════════════════════════════════════════════════════╝\n");
}
