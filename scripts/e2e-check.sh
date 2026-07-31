#!/usr/bin/env bash
set -euo pipefail

BASE_URL="${1:-http://localhost:3000}"

GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

PASS=0
FAIL=0

check () {
    local NAME="$1"
    local URL="$2"

    printf "%-45s" "$NAME"

    CODE=$(curl -L -s -o /tmp/page.html -w "%{http_code}" "$URL" || echo "000")

    if [[ "$CODE" == "200" ]]; then
        echo -e "${GREEN}PASS${NC}"
        PASS=$((PASS+1))
    else
        echo -e "${RED}FAIL ($CODE)${NC}"
        FAIL=$((FAIL+1))
    fi
}

echo
echo "=========================================="
echo " Salt & Swell Launch Verification"
echo "=========================================="
echo

check "Homepage"                     "$BASE_URL/"
check "Shop"                         "$BASE_URL/shop"
check "Collections"                  "$BASE_URL/collections"
check "About"                        "$BASE_URL/about"
check "Contact"                      "$BASE_URL/contact"
check "Journal"                      "$BASE_URL/journal"
check "Login"                        "$BASE_URL/account/login"
check "Account"                      "$BASE_URL/account"
check "Checkout"                     "$BASE_URL/checkout"

echo
echo "Checking homepage for runtime errors..."

HTML=$(curl -s "$BASE_URL/")

if echo "$HTML" | grep -qi "Application error"; then
    echo -e "${RED}Application error detected${NC}"
    FAIL=$((FAIL+1))
fi

if echo "$HTML" | grep -qi "ReferenceError"; then
    echo -e "${RED}ReferenceError detected${NC}"
    FAIL=$((FAIL+1))
fi

if echo "$HTML" | grep -qi "PrismaClientInitializationError"; then
    echo -e "${RED}Database connection failure${NC}"
    FAIL=$((FAIL+1))
fi

if echo "$HTML" | grep -qi "Cannot reach database"; then
    echo -e "${RED}Database unavailable${NC}"
    FAIL=$((FAIL+1))
fi

echo
echo "Checking API..."

curl -s "$BASE_URL/api/products" >/dev/null \
    && echo -e "${GREEN}Products API OK${NC}" \
    || { echo -e "${RED}Products API Failed${NC}"; FAIL=$((FAIL+1)); }

echo
echo "Checking Next.js build..."

npm run lint >/tmp/lint.log 2>&1 || true

ERRORS=$(grep -c "error" /tmp/lint.log || true)

if [[ "$ERRORS" -eq 0 ]]; then
    echo -e "${GREEN}Lint passed${NC}"
else
    echo -e "${YELLOW}$ERRORS lint errors found${NC}"
fi

echo
echo "Checking production build..."

if npm run build >/tmp/build.log 2>&1 ; then
    echo -e "${GREEN}Build successful${NC}"
else
    echo -e "${RED}Build FAILED${NC}"
    tail -30 /tmp/build.log
    FAIL=$((FAIL+1))
fi

echo
echo "=========================================="
echo "RESULTS"
echo "=========================================="

echo "Passed : $PASS"
echo "Failed : $FAIL"

if [[ "$FAIL" -eq 0 ]]; then
    echo
    echo -e "${GREEN}✔ Launch check PASSED${NC}"
else
    echo
    echo -e "${RED}✖ Launch check FAILED${NC}"
fi
