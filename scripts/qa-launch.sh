#!/usr/bin/env bash
set -e

echo "===================================="
echo " Salt & Swell QA Launch"
echo "===================================="

echo
echo "Docker..."
docker compose ps

echo
echo "Database..."
docker exec salt-and-swell-postgres pg_isready

echo
echo "Prisma..."
npx prisma db pull >/dev/null

echo
echo "TypeScript..."
npx tsc --noEmit

echo
echo "Lint..."
npm run lint

echo
echo "Build..."
npm run build

echo
echo "Running Playwright..."

npx playwright test tests/e2e/smoke.spec.ts
npx playwright test tests/e2e/navigation.spec.ts
npx playwright test tests/e2e/buttons.spec.ts
npx playwright test tests/e2e/shop.spec.ts
npx playwright test tests/e2e/product.spec.ts
npx playwright test tests/e2e/collections.spec.ts
npx playwright test tests/e2e/cart.spec.ts
npx playwright test tests/e2e/checkout.spec.ts
npx playwright test tests/e2e/account.spec.ts
npx playwright test tests/e2e/admin.spec.ts
npx playwright test tests/e2e/api.spec.ts
npx playwright test tests/e2e/accessibility.spec.ts

echo
echo "Opening report..."

npx playwright show-report reports/playwright-report

echo
echo "===================================="
echo " QA COMPLETE"
echo "===================================="
