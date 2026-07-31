export type NotificationType =
  | "ORDER_PAID"
  | "ORDER_PACKED"
  | "ORDER_SHIPPED"
  | "ORDER_DELIVERED"
  | "WISHLIST_BACK_IN_STOCK"
  | "WISHLIST_PRICE_DROP"
  | "WISHLIST_REMINDER";

export type NotificationPayload = {
  customerEmail: string;
  customerName: string;
  orderNumber?: string;
  trackingNumber?: string | null;

  productName?: string;
  productPrice?: number;
};
