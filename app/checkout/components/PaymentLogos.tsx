export default function PaymentLogos() {

  const methods = [
    "Visa",
    "Mastercard",
    "Amex",
    "Apple Pay",
    "Google Pay",
    "PayPal",
  ];

  return (

    <div className="mt-6">

      <p className="text-xs uppercase tracking-[0.28em] text-black/40">
        Accepted Payments
      </p>

      <div className="mt-4 flex flex-wrap gap-3">

        {methods.map(method => (

          <div
            key={method}
            className="rounded-xl border border-black/8 bg-white px-4 py-3 text-sm"
          >
            {method}
          </div>

        ))}

      </div>

    </div>

  );

}
