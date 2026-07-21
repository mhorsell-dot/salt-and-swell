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
  }
}

export async function sendNotification(type: NotificationType, payload: NotificationPayload) {
  const message = buildMessage(type, payload);

  /*
 Future integrations:

 - Resend
 - SendGrid
 - Postmark
 - SMS provider
 - Push notifications

*/

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
