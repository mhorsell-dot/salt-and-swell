import { NotificationPayload, NotificationType } from "./types";

function buildMessage(type: NotificationType, payload: NotificationPayload) {
  switch (type) {
    case "ORDER_PAID":
      return `Hi ${payload.customerName}, your Salt & Swell order ${payload.orderNumber} has been confirmed.`;

    case "ORDER_PACKED":
      return `Hi ${payload.customerName}, your order ${payload.orderNumber} is being prepared.`;

    case "ORDER_SHIPPED":
      return `Hi ${payload.customerName}, your order ${payload.orderNumber} has shipped. Tracking: ${payload.trackingNumber || "available soon"}.`;

    case "ORDER_DELIVERED":
      return `Hi ${payload.customerName}, your order ${payload.orderNumber} has been delivered. Enjoy your Salt & Swell pieces.`;

    case "WISHLIST_BACK_IN_STOCK":
      return `Hi ${payload.customerName}, ${payload.productName} from your wishlist is back in stock.`;

    case "WISHLIST_PRICE_DROP":
      return `Hi ${payload.customerName}, ${payload.productName} from your wishlist is now available for ${payload.productPrice}.`;

    case "WISHLIST_REMINDER":
      return `Hi ${payload.customerName}, ${payload.productName} is still waiting in your Salt & Swell wishlist.`;
  }
}

export async function sendNotification(type: NotificationType, payload: NotificationPayload) {
  const message = buildMessage(type, payload);

  console.log("NOTIFICATION:", {
    type,
    to: payload.customerEmail,
    message,
  });

  return {
    success: true,
    message,
  };
}
