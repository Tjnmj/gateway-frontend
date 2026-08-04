"use client";
import { useState } from "react";
import MobileMoneyCheckout from "@/components/MobileMoneyCheckout";
import CardCheckout from "@/components/CardCheckout";

type Method = "mpesa" | "airtel" | "card" | "paypal" | "bitcoin" | "bank" | null;

const METHODS: { id: Method; label: string; badge: string; color: string }[] = [
  { id: "mpesa", label: "Pay with M-Pesa", badge: "M-PESA", color: "bg-green-600" },
  { id: "airtel", label: "Pay with Airtel Money", badge: "AIRTEL", color: "bg-red-600" },
  { id: "card", label: "Credit / Debit Card", badge: "VISA/MC", color: "bg-slate-600" },
  { id: "paypal", label: "PayPal", badge: "PAYPAL", color: "bg-blue-700" },
  { id: "bitcoin", label: "Bitcoin", badge: "BTC", color: "bg-orange-500" },
  { id: "bank", label: "Bank Transfer", badge: "BANK", color: "bg-gray-500" },
];

export default function Home() {
  const [selected, setSelected] = useState<Method>(null);

  if (selected === "mpesa" || selected === "airtel") {
    return <MobileMoneyCheckout method={selected} onBack={() => setSelected(null)} />;
  }
  if (selected === "card") {
    return <CardCheckout onBack={() => setSelected(null)} />;
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white px-4 py-8">
      <h1 className="text-center text-lg font-semibold mb-6">Choose Payment Method</h1>
      <div className="max-w-md mx-auto divide-y divide-neutral-800 border border-neutral-800 rounded-lg overflow-hidden">
        {METHODS.map((m) => (
          <button
            key={m.id}
            onClick={() => setSelected(m.id)}
            className="w-full flex items-center justify-between px-4 py-4 hover:bg-neutral-900 transition"
          >
            <span className="text-sm">{m.label}</span>
            <span className={`text-xs px-2 py-1 rounded ${m.color} text-white`}>{m.badge}</span>
          </button>
        ))}
      </div>
    </div>
  );
}