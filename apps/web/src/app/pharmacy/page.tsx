'use client';

import React, { useState, useEffect } from 'react';
import { 
  Pill, 
  Search, 
  Upload, 
  ShoppingCart, 
  CheckCircle2, 
  ShieldCheck, 
  Clock, 
  FileText,
  Truck
} from 'lucide-react';
import { Medicine } from '@/types';

export default function PharmacyPage() {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState<{ [id: string]: number }>({});
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [prescriptionUploaded, setPrescriptionUploaded] = useState(false);

  useEffect(() => {
    fetch('/api/v1/pharmacy')
      .then((res) => res.json())
      .then((json) => {
        if (json.success) setMedicines(json.data);
      })
      .catch((err) => console.error(err));
  }, []);

  const addToCart = (medId: string) => {
    setCart((prev) => ({ ...prev, [medId]: (prev[medId] || 0) + 1 }));
  };

  const removeFromCart = (medId: string) => {
    setCart((prev) => {
      const updated = { ...prev };
      delete updated[medId];
      return updated;
    });
  };

  const totalCartCount = Object.values(cart).reduce((a, b) => a + b, 0);

  const calculateTotal = () => {
    let total = 0;
    Object.keys(cart).forEach((medId) => {
      const item = medicines.find((m) => m.id === medId);
      if (item) total += item.price * cart[medId];
    });
    return total.toFixed(2);
  };

  const handleCheckout = async () => {
    if (totalCartCount === 0) return;
    try {
      const items = Object.keys(cart).map((medId) => {
        const item = medicines.find((m) => m.id === medId)!;
        return {
          medicineId: medId,
          medicineName: item.name,
          quantity: cart[medId],
          price: item.price,
        };
      });

      const res = await fetch('/api/v1/pharmacy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items,
          totalAmount: Number(calculateTotal()),
          prescriptionUrl: prescriptionUploaded ? 'https://medstart.health/rx/demo.pdf' : undefined,
        }),
      });

      const json = await res.json();
      if (json.success) {
        setOrderSuccess(true);
        setCart({});
        setTimeout(() => setOrderSuccess(false), 3000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-16">
      {/* Header Banner */}
      <div className="bg-gradient-to-b from-emerald-950 via-slate-900 to-slate-950 border-b border-emerald-900/40 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs uppercase font-extrabold tracking-widest px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
              24/7 ONLINE PHARMACY & DELIVERY
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Certified Digital Pharmacy</h1>
            <p className="text-sm text-slate-400 max-w-xl">
              Order authentic prescription & OTC medicines with fast 2-hour doorstep delivery.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <label className="cursor-pointer px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-bold flex items-center gap-2 transition-all">
              <Upload className="w-4 h-4 text-emerald-400" />
              <span>{prescriptionUploaded ? '✓ Rx Uploaded' : 'Upload Prescription'}</span>
              <input
                type="file"
                className="hidden"
                onChange={() => setPrescriptionUploaded(true)}
              />
            </label>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Medicine Storefront */}
        <div className="lg:col-span-2 space-y-6">
          {/* Search bar */}
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3.5 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Search medicine name, brand, or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900/90 border border-slate-800 rounded-2xl pl-11 pr-4 py-2.5 text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {orderSuccess && (
            <div className="p-4 rounded-2xl bg-emerald-950/90 border border-emerald-500/60 text-emerald-300 text-xs font-bold flex items-center gap-2 animate-in fade-in">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span>Order placed successfully! Delivery partner assigned for express 2-hour dispatch.</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {medicines
              .filter((m) => m.name.toLowerCase().includes(searchQuery.toLowerCase()) || m.category.toLowerCase().includes(searchQuery.toLowerCase()))
              .map((med) => (
                <div key={med.id} className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between space-y-4">
                  <div className="flex gap-4">
                    <img src={med.imageUrl} alt={med.name} className="w-16 h-16 rounded-xl object-cover border border-slate-700" />
                    <div>
                      <h3 className="font-extrabold text-white text-base">{med.name}</h3>
                      <p className="text-xs text-emerald-400 font-semibold">{med.brand}</p>
                      <p className="text-[11px] text-slate-400 mt-1">{med.dosage}</p>
                    </div>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed">{med.description}</p>

                  <div className="flex items-center justify-between border-t border-slate-800 pt-3">
                    <div>
                      <span className="text-lg font-extrabold text-white">${med.price.toFixed(2)}</span>
                      {med.requiresPrescription && (
                        <span className="block text-[10px] text-amber-400 font-bold">Rx Required</span>
                      )}
                    </div>

                    <button
                      onClick={() => addToCart(med.id)}
                      className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 transition-all"
                    >
                      <ShoppingCart className="w-4 h-4" /> Add to Cart
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Cart Drawer & Order Summary */}
        <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl space-y-6 shadow-2xl h-fit">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <h2 className="font-extrabold text-white text-lg flex items-center gap-2">
              <ShoppingCart className="w-5 h-5 text-emerald-400" /> Cart ({totalCartCount})
            </h2>
            <span className="text-xs text-emerald-400 font-mono font-bold flex items-center gap-1">
              <Truck className="w-4 h-4" /> 2-Hour Delivery
            </span>
          </div>

          {totalCartCount === 0 ? (
            <p className="text-xs text-slate-500 py-6 text-center">Your pharmacy cart is empty.</p>
          ) : (
            <div className="space-y-3">
              {Object.keys(cart).map((medId) => {
                const med = medicines.find((m) => m.id === medId);
                if (!med) return null;
                return (
                  <div key={medId} className="flex items-center justify-between bg-slate-950 p-3 rounded-xl text-xs">
                    <div>
                      <h4 className="font-bold text-white">{med.name}</h4>
                      <p className="text-slate-400">${med.price} x {cart[medId]}</p>
                    </div>
                    <button
                      onClick={() => removeFromCart(medId)}
                      className="text-red-400 hover:text-red-300 font-bold"
                    >
                      Remove
                    </button>
                  </div>
                );
              })}

              <div className="border-t border-slate-800 pt-3 space-y-2 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Subtotal:</span>
                  <span className="text-slate-200">${calculateTotal()}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Express Delivery Fee:</span>
                  <span className="text-emerald-400 font-bold">FREE</span>
                </div>
                <div className="flex justify-between text-sm font-extrabold text-white border-t border-slate-800 pt-2">
                  <span>Total Amount:</span>
                  <span className="text-emerald-400">${calculateTotal()}</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 text-white font-extrabold text-xs shadow-lg shadow-emerald-600/30 transition-all hover:scale-[1.02]"
              >
                Place Pharmacy Order
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
