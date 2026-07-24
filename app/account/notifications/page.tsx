import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { Bell, CheckCircle, Package, Truck, CreditCard, Waves } from "lucide-react";

export const dynamic = "force-dynamic";


function getNotificationStyle(event: string) {

  if (event.includes("PAID")) {
    return {
      icon: CreditCard,
      title: "Payment Confirmed",
    };
  }


  if (event.includes("SHIP")) {
    return {
      icon: Truck,
      title: "Your Order Is On The Way",
    };
  }


  if (event.includes("PACK")) {
    return {
      icon: Package,
      title: "Preparing Your Gear",
    };
  }


  if (event.includes("DELIVER")) {
    return {
      icon: Waves,
      title: "Delivered",
    };
  }


  return {
    icon: CheckCircle,
    title: "Journey Update",
  };
}



async function getNotifications() {

  const token = (await cookies()).get("salt_swell_token")?.value;


  if (!token) {
    redirect("/account/login");
  }


  const decoded = jwt.verify(
    token,
    process.env.JWT_SECRET || "development-secret",
  ) as {
    sub: string;
  };


  return prisma.orderEvent.findMany({

    where: {
      order: {
        customerId: decoded.sub,
      },
    },


    include: {
      order: true,
    },


    orderBy: {
      createdAt: "desc",
    },

  });

}



export default async function NotificationsPage() {

  const notifications = await getNotifications();


  return (

    <main className="min-h-screen bg-[#f4f1ea] px-5 py-16">

      <div className="mx-auto max-w-4xl">


        <div className="flex items-center gap-3">

          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#182321] text-white">
            <Bell className="h-5 w-5"/>
          </div>


          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-black/40">
              Salt & Swell
            </p>

            <h1 className="text-4xl font-semibold tracking-tight">
              Your Journey Updates
            </h1>
          </div>

        </div>



        <p className="mt-5 text-black/50">
          Follow every step of your Salt & Swell order journey.
        </p>



        <div className="mt-10 space-y-5">


          {notifications.length === 0 ? (

            <div className="rounded-[2rem] bg-white p-10 text-center">
              No journey updates yet.
            </div>


          ) : (


            notifications.map((notification)=>{

              const style = getNotificationStyle(notification.event);

              const Icon = style.icon;


              return (

                <Link

                  key={notification.id}

                  href={`/account/orders/${notification.orderId}`}

                  className="block rounded-[2rem] bg-white p-7 transition hover:shadow-lg"

                >

                  <div className="flex gap-5">


                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#182321] text-white">

                      <Icon className="h-6 w-6"/>

                    </div>



                    <div>

                      <h2 className="text-lg font-semibold">

                        {style.title}

                      </h2>


                      <p className="mt-2 text-sm leading-6 text-black/55">

                        {notification.message}

                      </p>


                      <div className="mt-4 flex items-center gap-3 text-xs uppercase tracking-[0.15em] text-black/35">

                        <span>
                          Order {notification.order.orderNumber}
                        </span>

                        <span>
                          •
                        </span>

                        <span>
                          {notification.createdAt.toLocaleDateString("en-AU")}
                        </span>

                      </div>


                    </div>


                  </div>


                </Link>

              );

            })


          )}


        </div>


      </div>


    </main>

  );

}
