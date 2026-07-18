"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type CartItem = {
  cartId: string;
  productId: string;
  productSlug: string;
  productName: string;
  variantId: string;
  size: string;
  colour: string;
  sku: string;
  price: number;
  quantity: number;
  inventory: number;
  imageUrl: string;
};

type AddCartItem = Omit<CartItem, "cartId">;

type CartContextValue = {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  isOpen: boolean;
  addItem: (item: AddCartItem) => void;
  removeItem: (cartId: string) => void;
  updateQuantity: (cartId: string, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
};

const STORAGE_KEY = "salt-and-swell-cart-v1";

const CartContext = createContext<CartContextValue | null>(null);

function makeCartId(productId: string, variantId: string): string {
  return `${productId}:${variantId}`;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    try {
      const storedCart = window.localStorage.getItem(STORAGE_KEY);

      if (storedCart) {
        const parsed = JSON.parse(storedCart) as CartItem[];

        if (Array.isArray(parsed)) {
          setItems(parsed);
        }
      }
    } catch (error) {
      console.error("Unable to restore cart:", error);
    } finally {
      setHasLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!hasLoaded) {
      return;
    }

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [hasLoaded, items]);

  const addItem = useCallback((item: AddCartItem) => {
    const cartId = makeCartId(item.productId, item.variantId);

    setItems((currentItems) => {
      const existing = currentItems.find(
        (currentItem) => currentItem.cartId === cartId,
      );

      if (!existing) {
        return [
          ...currentItems,
          {
            ...item,
            cartId,
            quantity: Math.min(item.quantity, item.inventory),
          },
        ];
      }

      return currentItems.map((currentItem) => {
        if (currentItem.cartId !== cartId) {
          return currentItem;
        }

        return {
          ...currentItem,
          quantity: Math.min(
            currentItem.quantity + item.quantity,
            currentItem.inventory,
          ),
        };
      });
    });

    setIsOpen(true);
  }, []);

  const removeItem = useCallback((cartId: string) => {
    setItems((currentItems) =>
      currentItems.filter((item) => item.cartId !== cartId),
    );
  }, []);

  const updateQuantity = useCallback((cartId: string, quantity: number) => {
    setItems((currentItems) =>
      currentItems.map((item) => {
        if (item.cartId !== cartId) {
          return item;
        }

        return {
          ...item,
          quantity: Math.max(1, Math.min(quantity, item.inventory)),
        };
      }),
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const itemCount = useMemo(
    () => items.reduce((total, item) => total + item.quantity, 0),
    [items],
  );

  const subtotal = useMemo(
    () => items.reduce((total, item) => total + item.price * item.quantity, 0),
    [items],
  );

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      itemCount,
      subtotal,
      isOpen,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
    }),
    [
      items,
      itemCount,
      subtotal,
      isOpen,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider.");
  }

  return context;
}
