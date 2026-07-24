import { NotificationPayload, NotificationType } from "./types";
import { sendOrderEmail } from "@/features/email";


function buildMessage(
  type: NotificationType,
  payload: NotificationPayload,
) {

  const name = payload.customerName.split(" ")[0];


  switch (type) {

    case "ORDER_PAID":
      return `
Hi ${name},

Your Salt & Swell journey has begun.

Order ${payload.orderNumber} has been confirmed and our team is preparing your coastal essentials.

We'll keep you updated as your order moves through its journey.

Thank you for supporting Salt & Swell.
      `.trim();


    case "ORDER_PACKED":
      return `
Hi ${name},

Your Salt & Swell pieces are being carefully prepared.

Order ${payload.orderNumber} has been packed and is ready for its next step.

Adventure is almost on the way.
      `.trim();


    case "ORDER_SHIPPED":
      return `
Hi ${name},

Your Salt & Swell order is on the way.

Order ${payload.orderNumber} has left our studio.

Tracking:
${payload.trackingNumber || "Tracking details coming soon"}

We can't wait for you to enjoy your new pieces.
      `.trim();


    case "ORDER_DELIVERED":
      return `
Hi ${name},

Your Salt & Swell order has arrived.

We hope your new pieces become part of your next coastal adventure.

Thanks for joining the Salt & Swell community.
      `.trim();


    case "WISHLIST_BACK_IN_STOCK":
      return `
Hi ${name},

Good news.

${payload.productName} from your wishlist is back in stock.
      `.trim();


    case "WISHLIST_PRICE_DROP":
      return `
Hi ${name},

${payload.productName} from your wishlist is now available at a new price.
      `.trim();


    case "WISHLIST_REMINDER":
      return `
Hi ${name},

${payload.productName} is still waiting in your Salt & Swell wishlist.
      `.trim();

  }
}



function emailTitle(type: NotificationType) {

  switch(type){

    case "ORDER_PAID":
      return "Your order has been confirmed 🌊";

    case "ORDER_PACKED":
      return "Your order is being prepared";

    case "ORDER_SHIPPED":
      return "Your order is on the way";

    case "ORDER_DELIVERED":
      return "Your order has arrived";

    default:
      return "Salt & Swell update";

  }

}



export async function sendNotification(
  type: NotificationType,
  payload: NotificationPayload,
) {

  const message = buildMessage(type, payload);



  console.log("🌊 SALT & SWELL NOTIFICATION", {
    type,
    to: payload.customerEmail,
    message,
  });



  /*
  if (
    type.startsWith("ORDER_")
    && payload.customerEmail
    && payload.orderNumber
  ) {

    await sendOrderEmail({

      email: payload.customerEmail,

      customerName: payload.customerName,

      orderNumber: payload.orderNumber,

      title: emailTitle(type),

      message,

    });

  }
  */



  return {
    success: true,
    message,
  };

}
