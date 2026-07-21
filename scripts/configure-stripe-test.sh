#!/usr/bin/env bash
set -e

echo "======================================"
echo "STRIPE TEST CONFIGURATION"
echo "======================================"

read -p "Paste Stripe publishable key (pk_test_...): " STRIPE_PUBLIC

read -p "Paste Stripe secret key (sk_test_...): " STRIPE_SECRET


if [[ "$STRIPE_PUBLIC" != pk_test_* ]]; then
  echo "❌ Invalid publishable key"
  exit 1
fi


if [[ "$STRIPE_SECRET" != sk_test_* ]]; then
  echo "❌ Invalid secret key"
  exit 1
fi


sed -i "s|NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=.*|NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=$STRIPE_PUBLIC|" .env

sed -i "s|STRIPE_SECRET_KEY=.*|STRIPE_SECRET_KEY=$STRIPE_SECRET|" .env


echo ""
echo "✅ Stripe keys updated"

echo ""
grep STRIPE .env

echo ""
echo "Restart your Next server after this."

