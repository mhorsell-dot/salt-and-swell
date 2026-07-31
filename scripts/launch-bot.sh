#!/usr/bin/env bash

set +e

GREEN="\033[0;32m"
RED="\033[0;31m"
YELLOW="\033[1;33m"
NC="\033[0m"

FAILED=0

run () {

    NAME="$1"
    CMD="$2"

    echo
    echo "=================================================="
    echo "$NAME"
    echo "=================================================="

    eval "$CMD"

    STATUS=$?

    if [ $STATUS -eq 0 ]; then
        echo -e "${GREEN}PASS${NC}"
    else
        echo -e "${RED}FAIL${NC}"
        FAILED=1
    fi

}

echo
echo "=========================================="
echo " Salt & Swell Launch QA Bot"
echo "=========================================="

run "Docker" \
"docker compose ps"

run "Database" \
"docker exec salt-and-swell-postgres pg_isready"

run "Prisma" \
"npx prisma db pull"

run "TypeScript" \
"npx tsc --noEmit"

run "Lint" \
"npm run lint"

run "Production Build" \
"npm run build"

run "Smoke Test" \
"npx playwright test tests/e2e/smoke.spec.ts"

run "Crawler" \
"npx playwright test tests/e2e/crawler.spec.ts"

run "Interaction" \
"npx playwright test tests/e2e/interaction.spec.ts"

run "Navigation" \
"npx playwright test tests/e2e/navigation.spec.ts"

run "Shop" \
"npx playwright test tests/e2e/shop.spec.ts"

run "Collections" \
"npx playwright test tests/e2e/collections.spec.ts"

run "Products" \
"npx playwright test tests/e2e/product.spec.ts"

run "Cart" \
"npx playwright test tests/e2e/cart.spec.ts"

run "Checkout" \
"npx playwright test tests/e2e/checkout.spec.ts"

run "Account" \
"npx playwright test tests/e2e/account.spec.ts"

run "Admin" \
"npx playwright test tests/e2e/admin.spec.ts"

run "API" \
"npx playwright test tests/e2e/api.spec.ts"

run "Accessibility" \
"npx playwright test tests/e2e/accessibility.spec.ts"

echo

if [ $FAILED -eq 0 ]; then

echo -e "${GREEN}"
echo "#########################################"
echo "#                                       #"
echo "#      READY FOR DEPLOYMENT ✅          #"
echo "#                                       #"
echo "#########################################"
echo -e "${NC}"

else

echo -e "${RED}"
echo "#########################################"
echo "#                                       #"
echo "#     DEPLOYMENT BLOCKED ❌             #"
echo "#                                       #"
echo "#########################################"
echo -e "${NC}"

fi

echo

echo "Opening Playwright Report..."

npx playwright show-report reports/playwright-report

