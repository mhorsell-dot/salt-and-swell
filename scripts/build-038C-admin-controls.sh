#!/usr/bin/env bash
set -e

echo "======================================"
echo "BUILD 038C"
echo "ADMIN ORDER CONTROLS UI"
echo "======================================"


mkdir -p components/admin/orders


cat > components/admin/orders/OrderFulfilmentControls.tsx <<'TSX'
"use client";

import { useState } from "react";
import { PackageCheck, Truck } from "lucide-react";


export default function OrderFulfilmentControls({
  orderId,
  currentStatus,
}:{
  orderId:string;
  currentStatus:string;
}){


const [carrier,setCarrier] = useState("");
const [trackingNumber,setTrackingNumber] = useState("");
const [trackingUrl,setTrackingUrl] = useState("");

const [loading,setLoading] = useState(false);
const [message,setMessage] = useState("");



async function updateStatus(status:string){

setLoading(true);

await fetch(
`/api/admin/orders/${orderId}/status`,
{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
status
})
}
);


setMessage(
`Order updated to ${status}`
);

setLoading(false);

window.location.reload();

}



async function saveShipment(){

setLoading(true);


await fetch(
`/api/admin/orders/${orderId}/shipment`,
{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
carrier,
trackingNumber,
trackingUrl
})
}
);


setMessage(
"Shipment updated"
);


setLoading(false);

window.location.reload();

}



return (

<div className="mt-8 rounded-3xl bg-white p-8">


<h2 className="text-xl font-semibold">
Fulfilment
</h2>


<p className="mt-2 text-sm text-black/50">
Current status: {currentStatus}
</p>



<div className="mt-6 flex flex-wrap gap-3">


<button
disabled={loading}
onClick={()=>updateStatus("PACKED")}
className="flex items-center gap-2 rounded-full bg-black px-5 py-3 text-xs font-semibold uppercase tracking-wider text-white"
>

<PackageCheck className="h-4 w-4"/>

Mark Packed

</button>



<button
disabled={loading}
onClick={()=>updateStatus("SHIPPED")}
className="flex items-center gap-2 rounded-full border border-black px-5 py-3 text-xs font-semibold uppercase tracking-wider"
>

<Truck className="h-4 w-4"/>

Mark Shipped

</button>


</div>



<div className="mt-8 space-y-4">


<input
placeholder="Carrier"
value={carrier}
onChange={(e)=>setCarrier(e.target.value)}
className="h-12 w-full rounded-xl border border-black/10 px-4"
/>


<input
placeholder="Tracking number"
value={trackingNumber}
onChange={(e)=>setTrackingNumber(e.target.value)}
className="h-12 w-full rounded-xl border border-black/10 px-4"
/>


<input
placeholder="Tracking URL"
value={trackingUrl}
onChange={(e)=>setTrackingUrl(e.target.value)}
className="h-12 w-full rounded-xl border border-black/10 px-4"
/>



<button
disabled={loading}
onClick={saveShipment}
className="rounded-full bg-[#171715] px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white"
>

Save Shipment

</button>


</div>



{message && (
<p className="mt-5 text-sm text-green-700">
{message}
</p>
)}


</div>

)

}
TSX


python3 <<'PY'
from pathlib import Path

path = Path("app/admin/orders/[id]/page.tsx")

text = path.read_text()


text = text.replace(
'import prisma from "@/lib/prisma";',
'import prisma from "@/lib/prisma";\nimport OrderFulfilmentControls from "@/components/admin/orders/OrderFulfilmentControls";'
)


target = '''
</div>


</div>

</main>
'''


replacement = '''
</div>


<OrderFulfilmentControls
  orderId={order.id}
  currentStatus={order.status}
/>


</div>

</main>
'''


if target not in text:
    raise Exception("Injection point not found")


text=text.replace(
target,
replacement
)


path.write_text(text)

print("Admin controls injected")

PY


npm run lint || true


echo "======================================"
echo "BUILD 038C COMPLETE"
echo "======================================"

