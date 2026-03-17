'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/lib/cart-store';
import { CartItem } from '@/components/cart/CartItem';
import { Button } from '@/components/ui/Button';

export default function CartPage() {
  const { state, cartTotal } = useCart();
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);

  const { items } = state;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.toUpperCase() === 'HPXDRIPS20') {
      setCouponApplied(true);
    } else {
      alert("Invalid coupon code");
    }
  };

  const discountAmount = couponApplied ? cartTotal * 0.2 : 0;
  const subtotalAfterDiscount = cartTotal - discountAmount;
  
  const shipping = subtotalAfterDiscount >= 999 || items.length === 0 ? 0 : 99;
  const gst = subtotalAfterDiscount * 0.18;
  const finalTotal = subtotalAfterDiscount + shipping + gst;

  if (items.length === 0) {
    return (
      <div className="bg-brand-black min-h-screen pt-40 px-4 flex flex-col items-center text-center pb-24">
        <div className="text-8xl opacity-20 mb-8 grayscale">🛒</div>
        <h1 className="font-display font-black text-4xl md:text-5xl text-white uppercase tracking-tighter mb-8">
          YOUR CART IS EMPTY
        </h1>
        <Link href="/products" className="inline-block">
          <Button variant="acid-fill">START SHOPPING →</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-brand-black min-h-screen pt-32 px-4 md:px-8 pb-24 max-w-[1440px] mx-auto w-full">
      <h1 className="font-display font-black text-4xl md:text-5xl text-white uppercase tracking-tighter mb-10">
        YOUR CART
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
        {/* Items Column */}
        <div className="lg:col-span-2 space-y-2">
          {items.map(item => (
            <CartItem key={`${item.product.id}-${item.size}`} item={item} />
          ))}
        </div>

        {/* Summary Column */}
        <div className="lg:col-span-1">
          <div className="bg-zinc-900 rounded-2xl p-6 md:p-8 sticky top-24 border border-zinc-800">
            <h2 className="font-display font-black text-white text-xl uppercase tracking-widest mb-6 border-b border-zinc-800 pb-4">
              ORDER SUMMARY
            </h2>

            <div className="space-y-4 font-display font-bold text-sm">
              <div className="flex justify-between text-zinc-300">
                <span>Subtotal</span>
                <span>₹{cartTotal.toLocaleString('en-IN')}</span>
              </div>
              
              {couponApplied && (
                <div className="flex justify-between text-brand-acid">
                  <span>Discount (20%)</span>
                  <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
                </div>
              )}

              <div className="flex justify-between text-zinc-300">
                <span>Shipping</span>
                {shipping === 0 ? (
                  <span className="text-brand-acid uppercase">Free</span>
                ) : (
                  <span>₹{shipping.toLocaleString('en-IN')}</span>
                )}
              </div>

              <div className="flex justify-between text-zinc-300">
                <span>GST (18%)</span>
                <span>₹{gst.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
              </div>

              <div className="border-t border-zinc-800 pt-4 mt-4 flex justify-between items-end">
                <span className="text-zinc-100 text-lg">Total</span>
                <span className="font-black text-white text-2xl">
                  ₹{finalTotal.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                </span>
              </div>
            </div>

            <form onSubmit={handleApplyCoupon} className="mt-8 flex gap-2">
              <input 
                type="text" 
                placeholder="COUPON CODE"
                value={couponCode}
                onChange={e => setCouponCode(e.target.value)}
                disabled={couponApplied}
                className="flex-1 bg-brand-black border border-zinc-700 rounded-lg px-4 py-3 text-white font-display text-sm focus:border-brand-acid outline-none transition-colors disabled:opacity-50 uppercase"
              />
              <button 
                type="submit"
                disabled={!couponCode || couponApplied}
                className="bg-zinc-800 text-white border border-zinc-700 px-6 font-display font-bold text-xs uppercase tracking-widest rounded-lg hover:border-brand-acid hover:text-brand-acid transition-colors disabled:opacity-50"
              >
                APPLY
              </button>
            </form>
            
            {couponApplied && (
              <p className="text-brand-acid font-display font-bold text-xs tracking-wider mt-3">
                20% OFF APPLIED ✓
              </p>
            )}

            <button className="w-full bg-brand-acid text-black font-display font-black text-sm tracking-widest uppercase py-4 rounded-xl mt-8 hover:bg-brand-acid-dark active:scale-[0.98] transition-all duration-150">
              PROCEED TO CHECKOUT
            </button>
            
            <div className="mt-4 text-center">
              <Link href="/products" className="text-zinc-500 font-display font-bold text-xs hover:text-white transition-colors uppercase tracking-widest">
                CONTINUE SHOPPING
              </Link>
            </div>

            <div className="flex justify-center gap-2 mt-8 flex-wrap">
              {['VISA', 'MASTERCARD', 'UPI', 'COD', 'EMI'].map(method => (
                <span key={method} className="border border-zinc-700 text-zinc-500 text-[10px] font-display font-bold px-2.5 py-1 rounded tracking-wider bg-brand-black">
                  {method}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
