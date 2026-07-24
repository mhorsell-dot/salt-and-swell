import { Resend } from "resend";
import { render } from "@react-email/components";
import OrderUpdate from "./templates/OrderUpdate";


const resend = new Resend(process.env.RESEND_API_KEY);


export async function sendOrderEmail({
  email,
  customerName,
  orderNumber,
  title,
  message,
}:{
  email:string;
  customerName:string;
  orderNumber:string;
  title:string;
  message:string;
}) {


  if (!process.env.RESEND_API_KEY) {

    console.log("EMAIL PREVIEW", {
      email,
      title,
      message,
    });

    return;

  }


  const html = await render(
    OrderUpdate({
      customerName,
      orderNumber,
      title,
      message,
    })
  );


  await resend.emails.send({

    from:"Salt & Swell <orders@saltandswell.com.au>",

    to:email,

    subject:`${title} | Salt & Swell`,

    html,

  });

}
