#!/usr/bin/env bash
set -e

echo "======================================"
echo "BUILD 043B"
echo "CONNECT STRIPE CHECKOUT"
echo "======================================"


python3 <<'PY'
from pathlib import Path

path = Path("app/checkout/CheckoutClient.tsx")

text = path.read_text()


# Add payment intent creation after order creation
old = '''
const orderResponse = await fetch(
      "/api/orders/create",
      {
'''


if old not in text:
    raise Exception("Order create block not found")


# Find where response is processed
marker = '''
const orderData =
      await orderResponse.json();
'''


if marker not in text:
    raise Exception("Order response marker not found")


replacement = marker + '''

    const paymentResponse = await fetch(
      "/api/orders/payment-intent",
      {
        method:"POST",
        headers:{
          "Content-Type":"application/json",
        },
        body:JSON.stringify({
          orderId: orderData.orderId
        })
      }
    );


    const paymentData =
      await paymentResponse.json();


    setOrderId(orderData.orderId);

    setClientSecret(
      paymentData.clientSecret
    );

    setPaymentReady(true);

    setSubmitted(true);
'''


text=text.replace(
marker,
replacement
)



# Replace success message text
text=text.replace(
"Secure online payment will be connected in Build 026B. Your cart has not been cleared or charged.",
"Your order has been created. Complete secure payment below."
)



# Replace payment placeholder
old_payment = '''
<PaymentSection />
'''


new_payment = '''
<PaymentSection />

{clientSecret && (

<div className="mt-8 rounded-[2rem] border border-black/8 bg-white p-6 shadow-[0_18px_60px_rgba(0,0,0,0.05)]">

<h2 className="mb-6 text-xl font-semibold">
Secure payment
</h2>


<StripeProvider clientSecret={clientSecret}>

<StripePaymentForm />

</StripeProvider>


</div>

)}
'''


if old_payment in text:
    text=text.replace(
        old_payment,
        new_payment
    )


path.write_text(text)

print("Stripe checkout connected")

PY


npm run lint || true


echo "======================================"
echo "BUILD 043B COMPLETE"
echo "======================================"

