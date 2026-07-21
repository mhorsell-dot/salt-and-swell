export type NotificationType = "ORDER_PAID" | "ORDER_PACKED" | "ORDER_SHIPPED" | "ORDER_DELIVERED";

export type NotificationPayload = {
  customerEmail: string;
  customerName: string;
  orderNumber: string;
  trackingNumber?: string | null;
};
