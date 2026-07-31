#!/usr/bin/env bash
set -e

echo "======================================"
echo "BUILD 043C"
echo "GUEST CHECKOUT ENABLED"
echo "======================================"


python3 <<'PY'
from pathlib import Path

path = Path("prisma/schema.prisma")

text = path.read_text()

text = text.replace(
"""  customerId String
  customer   Customer @relation(fields: [customerId], references: [id])""",
"""  customerId String?
  customer   Customer? @relation(fields: [customerId], references: [id])"""
)

path.write_text(text)

print("Schema updated")
PY


npx prisma format

npx prisma migrate dev --name optional_customer_checkout || true


python3 <<'PY'
from pathlib import Path

path = Path("app/api/orders/create/route.ts")

text = path.read_text()


old = """if(!token){

return NextResponse.json(
{
error:"Unauthorised"
},
{
status:401
}
);

}"""


new = """let customerId:string | undefined;


if(token){

const customer =
jwt.verify(
token,
process.env.JWT_SECRET || "development-secret"
) as JwtPayload;


customerId = customer.sub;

}"""


text=text.replace(old,new)


text=text.replace(
"""customerId:
customer.sub,""",
"""customerId,"""
)


path.write_text(text)

print("API updated")

PY


echo "======================================"
echo "BUILD 043C COMPLETE"
echo "======================================"

