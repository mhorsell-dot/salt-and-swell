#!/usr/bin/env bash
set -e

echo "======================================"
echo "BUILD 036D"
echo "CHECKOUT FORM BINDING"
echo "======================================"


python3 <<'PY'
from pathlib import Path

path = Path("app/checkout/CheckoutClient.tsx")

text = path.read_text()


old = '''    const orderResponse = await fetch(
      "/api/orders/create",
      {
        method: "POST",
        headers:{
          "Content-Type":"application/json",
        },
        body: JSON.stringify({
          items,
          email:"",
          phone:"",
          shipping:{
            firstName:"",
            lastName:"",
            address1:"",
            city:"",
            state:"",
            postcode:"",
            country:"Australia",
          }
        })
      }
    );'''


new = '''    const formData =
      new FormData(event.currentTarget);

    const checkoutCustomer = {
      firstName:
        String(formData.get("firstName") || ""),

      lastName:
        String(formData.get("lastName") || ""),

      email:
        String(formData.get("email") || ""),

      phone:
        String(formData.get("phone") || ""),
    };


    const shippingDetails = {
      firstName:
        String(formData.get("firstName") || ""),

      lastName:
        String(formData.get("lastName") || ""),

      address1:
        String(formData.get("address") || ""),

      address2:
        String(formData.get("addressLine2") || ""),

      city:
        String(formData.get("suburb") || ""),

      state:
        String(formData.get("state") || ""),

      postcode:
        String(formData.get("postcode") || ""),

      country:
        String(formData.get("country") || "Australia"),
    };


    const orderResponse = await fetch(
      "/api/orders/create",
      {
        method: "POST",
        headers:{
          "Content-Type":"application/json",
        },
        body: JSON.stringify({
          items,

          email:
            checkoutCustomer.email,

          phone:
            checkoutCustomer.phone,

          shipping:
            shippingDetails,
        })
      }
    );'''


if old not in text:
    raise Exception("Checkout payload section not found")


text = text.replace(old,new)

path.write_text(text)

print("Checkout form binding complete")

PY


npm run lint || true

echo "======================================"
echo "BUILD 036D COMPLETE"
echo "======================================"
