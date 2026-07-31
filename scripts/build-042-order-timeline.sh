#!/usr/bin/env bash
set -e

echo "======================================"
echo "BUILD 042"
echo "PREMIUM ORDER TIMELINE"
echo "======================================"


python3 <<'PY'
from pathlib import Path

path = Path("app/account/orders/[id]/page.tsx")

text = path.read_text()


start = text.index(
'<section className="mt-8 rounded-3xl bg-white p-8">'
)

end = text.index(
'</section>',
start
) + len('</section>')


replacement = r'''
<section className="mt-8 rounded-3xl bg-white p-8">

<h2 className="text-xl font-semibold">
Order journey
</h2>


<div className="mt-8 space-y-6">


{order.events.length === 0 ? (

<p className="text-sm text-black/50">
Your order journey will appear here.
</p>

) : (

order.events.map(event => (

<div
key={event.id}
className="flex gap-4"
>


<div className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white">

<Check className="h-5 w-5"/>

</div>


<div>

<p className="font-semibold">
{event.event.replaceAll("_"," ")}
</p>


<p className="text-sm text-black/50">
{event.message}
</p>


<p className="mt-1 text-xs text-black/40">
{event.createdAt.toLocaleDateString("en-AU")}
</p>


</div>


</div>

))

)}


{order.shipment && (

<div className="flex gap-4">

<div className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white">

<Truck className="h-5 w-5"/>

</div>


<div>

<p className="font-semibold">
Shipment
</p>


<p className="text-sm text-black/50">
{order.shipment.carrier || "Carrier"}
</p>


{order.shipment.trackingNumber && (

<a
href={order.shipment.trackingUrl || "#"}
target="_blank"
className="mt-2 inline-block text-sm font-semibold underline"
>
Track:
{order.shipment.trackingNumber}
</a>

)}


</div>

</div>

)}


</div>

</section>
'''


text = text[:start] + replacement + text[end:]


path.write_text(text)

print("Timeline upgraded")

PY


npm run lint || true


echo "======================================"
echo "BUILD 042 COMPLETE"
echo "======================================"

