"use client";

import { useEffect, useState } from "react";

import { ConnectButton } from "@rainbow-me/rainbowkit";

import { parseEther } from "viem";

import {
  useAccount,
  useSendTransaction,
} from "wagmi";

export default function CheckoutPage() {
  const [mounted, setMounted] = useState(false);

  const [payment, setPayment] = useState<{
    title: string;
    amount: string;
  } | null>(null);

  useEffect(() => {
    setMounted(true);

    const stored = localStorage.getItem(
      "arczone-current-payment"
    );

    if (stored) {
      setPayment(JSON.parse(stored));
    }
  }, []);

  const { address } = useAccount();

  const {
    sendTransaction,
    isPending,
    isSuccess,
    data: txHash,
  } = useSendTransaction();

  if (!mounted) {
    return null;
  }

  return (
    <main className="min-h-screen bg-[#F5F7FB] flex items-center justify-center p-6">
      <div className="w-full max-w-xl rounded-4xl border border-black/5 bg-white shadow-sm p-5 sm:p-8">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-black/50">
              Powered by
            </p>

            <h1 className="text-3xl font-semibold mt-1">
              ARCZONE
            </h1>
          </div>

          <ConnectButton />
        </div>

        {payment ? (
          <>
            <div className="mt-10">
              <p className="text-sm text-black/50">
                Payment For
              </p>

              <h2 className="text-3xl sm:text-4xl font-semibold mt-2">
                {payment.title}
              </h2>
            </div>

            <div className="mt-8 rounded-4xl bg-neutral-100 p-6">
              <p className="text-sm text-black/50">
                Amount
              </p>

              <h3 className="text-3xl font-semibold mt-2">
                {payment.amount} ETH
              </h3>
            </div>

            <button
              onClick={() => {
                sendTransaction({
                  to: "0x000000000000000000000000000000000000dead",
                  value: parseEther(
                    payment.amount || "0"
                  ),
                });
              }}
              disabled={
                isPending || !address
              }
              className="mt-8 w-full rounded-3xl bg-black text-white py-4 text-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {isPending
                ? "Processing..."
                : "Pay Now"}
            </button>

            {isSuccess && (
              <div className="mt-6 rounded-3xl border border-green-200 bg-green-50 p-5">
                <p className="font-medium text-green-700">
                  Payment Successful
                </p>

                <p className="text-sm text-green-600 mt-2 break-all">
                  {txHash}
                </p>
              </div>
            )}
          </>
        ) : (
          <div className="mt-10 text-center text-black/50">
            No payment found
          </div>
        )}
      </div>
    </main>
  );
}