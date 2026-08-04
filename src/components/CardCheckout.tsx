"use client";
import { useState } from "react";
import { apiFetch } from "@/lib/api";

export default function CardCheckout({ onBack }: { onBack: () => void }) {
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("");

  const handleDeposit = async () => {
    setStatus("Processing...");
    try {
      const res = await apiFetch("/payments/collect/", {
        method: "POST",
        body: JSON.stringify({ method: "card", amount, payer_ref: cardNumber }),
      });
      setStatus(`Deposit initiated. Ref: ${res.reference}`);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Something went wrong";
      setStatus(`Failed: ${message}`);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white px-4 py-8">
      <div className="max-w-md mx-auto">
        <button onClick={onBack} className="mb-4 text-neutral-400">← Back</button>
        <h1 className="text-center text-lg font-semibold mb-1">Deposit</h1>
        <p className="text-center text-sm text-neutral-400 mb-6">Credit / Debit Card</p>

        <div className="space-y-4">
          <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-4">
            <label className="text-xs text-neutral-500">Card number</label>
            <input
              type="text"
              placeholder="•••• •••• •••• ••••"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              className="w-full bg-transparent outline-none mt-1 text-white placeholder-neutral-600"
            />
          </div>

          <div className="flex gap-3">
            <div className="flex-1 bg-neutral-900 border border-neutral-800 rounded-lg p-4">
              <label className="text-xs text-neutral-500">Expiry date</label>
              <input
                type="text"
                placeholder="MM / YY"
                value={expiry}
                onChange={(e) => setExpiry(e.target.value)}
                className="w-full bg-transparent outline-none mt-1 text-white placeholder-neutral-600"
              />
            </div>
            <div className="flex-1 bg-neutral-900 border border-neutral-800 rounded-lg p-4">
              <label className="text-xs text-neutral-500">CVC/CVV</label>
              <input
                type="text"
                placeholder="•••"
                value={cvc}
                onChange={(e) => setCvc(e.target.value)}
                className="w-full bg-transparent outline-none mt-1 text-white placeholder-neutral-600"
              />
            </div>
          </div>

          <p className="text-xs text-neutral-500 text-center">
            The card should belong to you and be in your name
          </p>

          <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-4">
            <label className="text-xs text-neutral-500">Deposit Amount</label>
            <input
              type="number"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full bg-transparent outline-none mt-1 text-white placeholder-neutral-600"
            />
          </div>

          <button
            onClick={handleDeposit}
            className="w-full py-3 rounded-lg bg-blue-700 font-semibold text-white"
          >
            Deposit
          </button>

          {status && <p className="text-sm text-center text-neutral-400">{status}</p>}
        </div>
      </div>
    </div>
  );
}