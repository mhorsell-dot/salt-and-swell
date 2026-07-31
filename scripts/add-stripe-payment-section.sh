#!/usr/bin/env bash
set -e

echo "======================================"
echo "BUILD 036C STEP 3"
echo "ADD STRIPE PAYMENT SECTION"
echo "======================================"

python3 <<'PY'
from pathlib import Path

path = Path("app/checkout/CheckoutClient.tsx")

text = path.read_text()

target = '''              <button
                type="submit"
                className="mt-7 flex h-14 w-full items-center justify-center gap-2 rounded-full bg-[#171715] px-6 text-xs font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-black/80 focus:outline-none focus:ring-4 focus:ring-black/10"
              >
                Continue to payment
                <ChevronRight className="h-4 w-4" />
              </button>
'''

insert = '''              {paymentReady && clientSecret && (
                <div className="mt-8 rounded-3xl border border-black/10 bg-white p-6">
                  <h3 className="text-lg font-semibold">
                    Payment details
                  </h3>

                  <div className="mt-5">
                    <StripeProvider clientSecret={clientSecret}>
                      <StripePaymentForm />
                    </StripeProvider>
                  </div>
                </div>
              )}

''' + target


if target not in text:
    raise Exception("Payment button section not found")

text = text.replace(
    target,
    insert
)

path.write_text(text)

print("Stripe payment section added successfully")

PY


echo ""
echo "Running lint check..."
npm run lint || true

echo ""
echo "======================================"
echo "STEP 3 COMPLETE"
echo "======================================"
