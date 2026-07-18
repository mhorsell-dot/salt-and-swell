"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type CartItemInput = {
  productId: string;
  variantId: string;
  slug: string;
  name: string;
  price: number;
  imageUrl: string;
  size?: string | null;
  colour?: string | null;
  sku?: string | null;
  quantity: number;
  inventory: number;
};

export type CartItem = CartItemInput & {
  cartId: string;
};

type CartContextValue = {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  isOpen: boolean;
  isHydrated: boolean;
  lastAddedCartId: string | null;
  addItem: (item: CartItemInput) => void;
  updateQuantity: (cartId: string, quantity: number) => void;
  removeItem: (cartId: string) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "salt-and-swell-cart-v2";

function createCartId(productId: string, variantId: string): string {
  return `${productId}:${variantId}`;
}

function sanitiseStoredItems(value: unknown): CartItem[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .filter((item): item is CartItem => {
      if (!item || typeof item !== "object") {
        return false;
      }

      const candidate = item as Partial<CartItem>;

      return Boolean(
        candidate.productId &&
        candidate.variantId &&
        candidate.slug &&
        candidate.name &&
        typeof candidate.price === "number" &&
        typeof candidate.quantity === "number" &&
        typeof candidate.inventory === "number",
      );
    })
    .map((item) => ({
      ...item,
      cartId: item.cartId || createCartId(item.productId, item.variantId),
      quantity: Math.max(
        1,
        Math.min(
          Math.floor(item.quantity),
          Math.max(1, Math.floor(item.inventory)),
        ),
      ),
      inventory: Math.max(0, Math.floor(item.inventory)),
    }))
    .filter((item) => item.inventory > 0);
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const [lastAddedCartId, setLastAddedCartId] = useState<string | null>(null);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);

      if (stored) {
        setItems(sanitiseStoredItems(JSON.parse(stored)));
      }
    } catch (error) {
      console.error("Unable to restore cart:", error);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!isHydrated) {
      return;
    }

    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (error) {
      console.error("Unable to save cart:", error);
    }
  }, [items, isHydrated]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  const addItem = useCallback((input: CartItemInput) => {
    if (input.inventory <= 0 || input.quantity <= 0) {
      return;
    }

    const cartId = createCartId(input.productId, input.variantId);

    setItems((currentItems) => {
      const existing = currentItems.find((item) => item.cartId === cartId);

      if (!existing) {
        return [
          ...currentItems,
          {
            ...input,
            cartId,
            quantity: Math.min(input.quantity, input.inventory),
          },
        ];
      }

      return currentItems.map((item) =>
        item.cartId === cartId
          ? {
              ...item,
              ...input,
              cartId,
              quantity: Math.min(
                item.quantity + input.quantity,
                input.inventory,
              ),
            }
          : item,
      );
    });

    setLastAddedCartId(cartId);
    setIsOpen(true);

    window.setTimeout(() => {
      setLastAddedCartId((current) => (current === cartId ? null : current));
    }, 2200);
  }, []);

  const updateQuantity = useCallback((cartId: string, quantity: number) => {
    setItems((currentItems) =>
      currentItems.map((item) =>
        item.cartId === cartId
          ? {
              ...item,
              quantity: Math.max(
                1,
                Math.min(Math.floor(quantity), item.inventory),
              ),
            }
          : item,
      ),
    );
  }, []);

  const removeItem = useCallback((cartId: string) => {
    setItems((currentItems) =>
      currentItems.filter((item) => item.cartId !== cartId),
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const openCart = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeCart = useCallback(() => {
    setIsOpen(false);
  }, []);

  const toggleCart = useCallback(() => {
    setIsOpen((current) => !current);
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
      isHydrated,
      lastAddedCartId,
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
      openCart,
      closeCart,
      toggleCart,
    }),
    [
      items,
      itemCount,
      subtotal,
      isOpen,
      isHydrated,
      lastAddedCartId,
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
      openCart,
      closeCart,
      toggleCart,
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
