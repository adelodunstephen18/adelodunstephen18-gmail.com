export function formatNaira(amount: number): string {
  return '₦' + amount.toLocaleString('en-NG');
}

export function generateAppointmentId(): string {
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  return `AGW-${randomNum}`;
}

export function buildWhatsAppRepairMessage(appointment: {
  id: string;
  customerName: string;
  customerPhone: string;
  deviceType: string;
  issueDescription: string;
  appointmentDate: string;
  appointmentTime: string;
  serviceType: string;
  urgency: string;
}): string {
  const text = `Hello CEO Stephen / Adelod Game World! 🎮🔧\n\nI want to book a repair service:\n- *Ticket ID*: ${appointment.id}\n- *Customer*: ${appointment.customerName}\n- *Phone*: ${appointment.customerPhone}\n- *Device*: ${appointment.deviceType}\n- *Issue*: ${appointment.issueDescription}\n- *Date & Time*: ${appointment.appointmentDate} at ${appointment.appointmentTime}\n- *Service Option*: ${appointment.serviceType}\n- *Urgency*: ${appointment.urgency}\n\nPlease confirm availability at Shop 32 Zion Samsung Building, Dugbe, Ibadan. Thank you!`;
  return `https://wa.me/2349033363437?text=${encodeURIComponent(text)}`;
}

export function buildWhatsAppOrderMessage(order: {
  orderId: string;
  items: Array<{ name: string; quantity: number; price: number }>;
  total: number;
  customerName: string;
  phone: string;
  deliveryMethod: string;
  address?: string;
}): string {
  const itemsList = order.items.map(i => `• ${i.name} (x${i.quantity}) - ${formatNaira(i.price * i.quantity)}`).join('\n');
  const text = `Hello Adelod Game World! 🛍️🎮\n\nI want to place an order from your website:\n*Order Ref*: ${order.orderId}\n*Customer*: ${order.customerName}\n*Phone*: ${order.phone}\n*Delivery Method*: ${order.deliveryMethod}\n${order.address ? `*Address*: ${order.address}\n` : ''}\n*Items Ordered*:\n${itemsList}\n\n*Total Amount*: ${formatNaira(order.total)}\n\nPlease send payment/pickup details. Thank you!`;
  return `https://wa.me/2349033363437?text=${encodeURIComponent(text)}`;
}

export function buildWhatsAppTradeInMessage(quote: {
  category: string;
  model: string;
  condition: string;
  estimatedRange: string;
  notes?: string;
}): string {
  const text = `Hello Adelod Game World! 🤝💰\n\nI want to sell/trade-in my gaming gear at your Dugbe shop:\n- *Device*: ${quote.category} (${quote.model})\n- *Condition*: ${quote.condition}\n- *Estimated Value*: ${quote.estimatedRange}\n${quote.notes ? `- *Notes*: ${quote.notes}\n` : ''}\nWhen can I bring it to Shop 32 Zion Samsung Building, Dugbe, Ibadan for physical inspection and cash payout?`;
  return `https://wa.me/2349033363437?text=${encodeURIComponent(text)}`;
}
