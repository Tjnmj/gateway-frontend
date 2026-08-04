"use client";
import { useState } from "react";
import { apiFetch } from "@/lib/api";

const CONFIG = {
  mpesa: { name: "M-PESA Express", sub: "Instant STK Push", tag: "KENYA", accent: "border-green-500 text-green-600" },
  airtel: { name: "Airtel Money", sub: "Instant Prompt", tag: "KENYA", accent: "border-red-500 text-red-600" },
};

export default function MobileMoneyCheckout({
  method,
  onBack,
}: {
  method: "mpesa" | "airtel";
  onBack: () => void;
}) {
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("");
  const cfg = CONFIG[method];

  const handlePay = async () => {
    setStatus("Processing...");
    try {
      const res = await apiFetch("/payments/collect/", {
        method: "POST",
        body: JSON.stringify({ method, amount, payer_ref: phone }),
      });
      setStatus(`Sent — check your phone. Ref: ${res.reference}`);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Something went wrong";
      setStatus(`Failed: ${message}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow p-6">
        <h1 className="text-lg font-bold mb-1">Secure Checkout</h1>
        <p className="text-sm text-gray-500 mb-4">Choose your preferred payment method</p>

        <div className={`border rounded-lg p-4 ${cfg.accent}`}>
          <div className="flex justify-between items-center mb-3">
            <div>
              <p className="font-semibold text-gray-900">{cfg.name}</p>
              <p className="text-xs text-gray-500">{cfg.sub}</p>
            </div>
            <span className="text-xs font-medium">{cfg.tag}</span>
          </div>

          <input
            type="tel"
            placeholder="Phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full p-3 rounded border border-gray-300 mb-3 text-gray-900"
          />
          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-3 rounded border border-gray-300 mb-3 text-gray-900"
          />

          <button
            onClick={handlePay}
            className={`w-full py-3 rounded-lg font-semibold text-white ${
              method === "mpesa" ? "bg-green-600" : "bg-red-600"
            }`}
          >
            Pay {amount ? `KES ${amount}` : ""} Now
          </button>
        </div>

        <button onClick={onBack} className="w-full mt-4 py-3 rounded-lg border border-gray-300 text-gray-700">
          Back
        </button>

        {status && <p className="mt-4 text-sm text-center text-gray-600">{status}</p>}
      </div>
    </div>
  );
}