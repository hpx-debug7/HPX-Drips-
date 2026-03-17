'use client';

import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { Product, CartItem, CartState } from '@/types';

type CartAction =
  | { type: 'ADD_ITEM'; payload: { product: Product; size: string } }
  | { type: 'REMOVE_ITEM'; payload: { id: string; size: string } }
  | { type: 'UPDATE_QTY'; payload: { id: string; size: string; quantity: number } }
  | { type: 'TOGGLE_DRAWER' }
  | { type: 'CLEAR_CART' }
  | { type: 'HYDRATE'; payload: CartState };

const initialState: CartState = {
  items: [],
  isOpen: false,
};

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { product, size } = action.payload;
      const existingItemIndex = state.items.findIndex(
        (item) => item.product.id === product.id && item.size === size
      );

      if (existingItemIndex > -1) {
        const newItems = [...state.items];
        newItems[existingItemIndex].quantity += 1;
        return { ...state, items: newItems };
      }
      return { ...state, items: [...state.items, { product, size, quantity: 1 }] };
    }
    case 'REMOVE_ITEM': {
      return {
        ...state,
        items: state.items.filter(
          (item) => !(item.product.id === action.payload.id && item.size === action.payload.size)
        ),
      };
    }
    case 'UPDATE_QTY': {
      const { id, size, quantity } = action.payload;
      if (quantity <= 0) {
        return cartReducer(state, { type: 'REMOVE_ITEM', payload: { id, size } });
      }
      return {
        ...state,
        items: state.items.map((item) =>
          item.product.id === id && item.size === size ? { ...item, quantity } : item
        ),
      };
    }
    case 'TOGGLE_DRAWER':
      return { ...state, isOpen: !state.isOpen };
    case 'CLEAR_CART':
      return { ...state, items: [] };
    case 'HYDRATE':
      return { ...state, ...action.payload, isOpen: false };
    default:
      return state;
  }
}

const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
  addItem: (product: Product, size: string) => void;
  removeItem: (id: string, size: string) => void;
  updateQty: (id: string, size: string, quantity: number) => void;
  toggleDrawer: () => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
} | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('hpx-cart');
      if (saved) {
        try {
          dispatch({ type: 'HYDRATE', payload: JSON.parse(saved) });
        } catch (e) {
          console.error("Failed to parse cart", e);
        }
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined' && state !== initialState) {
      localStorage.setItem('hpx-cart', JSON.stringify({ items: state.items }));
    }
  }, [state, state.items]);

  const addItem = (product: Product, size: string) => dispatch({ type: 'ADD_ITEM', payload: { product, size } });
  const removeItem = (id: string, size: string) => dispatch({ type: 'REMOVE_ITEM', payload: { id, size } });
  const updateQty = (id: string, size: string, quantity: number) => dispatch({ type: 'UPDATE_QTY', payload: { id, size, quantity } });
  const toggleDrawer = () => dispatch({ type: 'TOGGLE_DRAWER' });
  const clearCart = () => dispatch({ type: 'CLEAR_CART' });

  const cartCount = state.items.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = state.items.reduce((total, item) => total + item.product.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        state,
        dispatch,
        addItem,
        removeItem,
        updateQty,
        toggleDrawer,
        clearCart,
        cartCount,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
