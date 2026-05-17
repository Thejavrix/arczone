"use client";

import {
  useEffect,
  useState,
} from "react";

import { ConnectButton } from "@rainbow-me/rainbowkit";

import { parseEther } from "viem";

import { toast } from "sonner";

import {
  useAccount,
  useChainId,
  useSendTransaction,
  useSwitchChain,
} from "wagmi";

import { supabase } from "@/lib/supabase";

import { useParams } from "next/navigation";

export default function PayPage() {
  const [mounted, setMounted] =
    useState(false);

  const [localTxHash, setLocalTxHash] =
    useState<
      `0x${string}` | undefined
    >();

  const [payment, setPayment] =
    useState<{
      title: string;
      amount: string;
      slug: string;
      merchant_address: string;
      status?: string;
      expires_at?: string | null;
      tx_hash?: string;
      payer_address?: string;
      note?: string;
    } | null>(null);

  const params = useParams();

  const currentSlug =
    params.slug;

  useEffect(() => {
    async function loadPayment() {
      setMounted(true);

      const { data, error } =
        await supabase
          .from("payments")
          .select("*")
          .eq("slug", currentSlug)
          .single();

      if (!error && data) {
        setPayment(data);
      }
    }

    loadPayment();
  }, [currentSlug]);

  const { address } = useAccount();

  const chainId = useChainId();

  const { switchChain } =
    useSwitchChain();

  const isWrongNetwork =
    chainId !== 5042002;

  const {
    sendTransactionAsync,
    isPending,
  } = useSendTransaction();

  const isExpired = Boolean(
    payment?.expires_at &&
      new Date(
        payment.expires_at
      ) < new Date()
  );

  if (!mounted) {
    return null;
  }

  return (
    <main className="min-h-screen bg-[#F5F7FB] flex items-center justify-center p-6">
      <div className="w-full max-w-xl rounded-4xl border border-black/5 bg-white shadow-sm p-8">
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

              <h2 className="text-4xl font-semibold mt-2">
                {payment.title}
              </h2>

              {payment.note && (
                <div className="mt-4 rounded-3xl bg-neutral-100 p-5">
                  <p className="text-sm text-black/50">
                    Note
                  </p>

                  <p className="mt-2 text-black/80">
                    {payment.note}
                  </p>
                </div>
              )}
            </div>

            <div className="mt-8 rounded-4xl bg-neutral-100 p-6">
              <p className="text-sm text-black/50">
                Amount
              </p>

              <h3 className="text-3xl font-semibold mt-2">
                {payment.amount} ARC
              </h3>
            </div>

            {isWrongNetwork ? (
              <button
                onClick={() =>
                  switchChain({
                    chainId: 5042002,
                  })
                }
                className="mt-8 w-full rounded-3xl bg-orange-500 text-white py-4 text-lg font-medium hover:opacity-90 transition-opacity"
              >
                Switch to ARC
              </button>
            ) : (
              <button
                onClick={async () => {
                  if (!payment)
                    return;

                  try {
                    const hash =
                      await sendTransactionAsync({
                        to:
                          payment.merchant_address as `0x${string}`,

                        value: parseEther(
                          String(
                            payment.amount ??
                              "0"
                          )
                        ),
                      });

                    setLocalTxHash(hash);

                    const currentPayment =
                      payment;

                    const { error } =
                      await supabase
                        .from(
                          "payments"
                        )
                        .update({
                          status:
                            "completed",

                          tx_hash:
                            hash,

                          payer_address:
                            address,

                          completed_at:
                            new Date().toISOString(),
                        })
                        .eq(
                          "slug",
                          currentPayment.slug
                        );

                    if (error) {
                      toast.error(
                        "Failed to update payment"
                      );

                      return;
                    }

                    setPayment({
                      ...currentPayment,
                      status:
                        "completed",
                      tx_hash:
                        hash,
                    });

                    toast.success(
                      "Payment completed"
                    );
                  } catch (err) {
                    console.error(err);

                    toast.error(
                      "Payment failed"
                    );
                  }
                }}
                disabled={
                  isPending ||
                  !address ||
                  payment.status ===
                    "completed" ||
                  isExpired
                }
                className="mt-8 w-full rounded-3xl bg-black text-white py-4 text-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {isExpired
                  ? "Payment Expired"
                  : payment.status ===
                    "completed"
                  ? "Payment Completed"
                  : isPending
                  ? "Processing..."
                  : "Pay Now"}
              </button>
            )}

            {payment.status ===
              "completed" && (
              <div className="mt-6 rounded-3xl border border-green-200 bg-green-50 p-5">
                <p className="font-medium text-green-700">
                  Payment Successful
                </p>

                <div className="mt-6 rounded-3xl border border-black/5 bg-white p-5 shadow-sm">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">
                      Receipt
                    </h3>

                    <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                      Paid
                    </span>
                  </div>

                  <div className="mt-5 space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-black/50">
                        Payment
                      </span>

                      <span className="font-medium">
                        {payment.title}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-black/50">
                        Amount
                      </span>

                      <span className="font-medium">
                        {payment.amount} ARC
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-black/50">
                        Network
                      </span>

                      <span className="font-medium">
                        ARC Testnet
                      </span>
                    </div>

                    <div className="border-t border-black/5 pt-3">
                      <p className="text-xs text-black/40">
                        Transaction Hash
                      </p>

                      <p className="mt-2 break-all text-xs text-black/70">
                        {localTxHash}
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        window.open(
                          `https://explorer.testnet.arc.network/tx/${localTxHash}`,
                          "_blank"
                        );
                      }}
                      className="mt-2 w-full rounded-2xl bg-black text-white py-3 text-sm font-medium"
                    >
                      View on Explorer
                    </button>
                  </div>
                </div>

                <p className="text-sm text-green-600 mt-2 break-all">
                  {localTxHash}
                </p>
              </div>
            )}
          </>
        ) : (
          <div className="mt-10 text-center text-black/50">
            Payment not found
          </div>
        )}
      </div>
    </main>
  );
}
