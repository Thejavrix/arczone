"use client";

import { useEffect, useState } from "react";

import { ConnectButton } from "@rainbow-me/rainbowkit";

import {
  useAccount,
  useBalance,
} from "wagmi";

import { Sidebar } from "@/components/sidebar";

import { GlassCard } from "@/components/glass-card";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";

import { toast } from "sonner";

import QRCode from "react-qr-code";

import { supabase } from "@/lib/supabase";

export default function Home() {
  const [mounted, setMounted] =
    useState(false);

    

  const [activeTab, setActiveTab] =
    useState("dashboard");

  const [open, setOpen] =
    useState(false);

  const [title, setTitle] =
    useState("");

  const [amount, setAmount] =
    useState("");

  const [note, setNote] =
    useState("");

  const [customerEmail, setCustomerEmail] =
    useState("");

  const [expiry, setExpiry] =
    useState("1h");

  const [savedPayments, setSavedPayments] =
    useState<any[]>([]);

  const [selectedPayment, setSelectedPayment] =
    useState<any>(null);

  const [merchantName, setMerchantName] =
    useState("ARC Merchant");

  const [merchantLogo, setMerchantLogo] =
    useState("");

  const [defaultExpiry, setDefaultExpiry] =
    useState("1h");

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    async function loadPayments() {
      const { data, error } =
        await supabase
          .from("payments")
          .select("*")
          .order("created_at", {
            ascending: false,
          });

      if (!error && data) {
        setSavedPayments(data);
      }
    }

    loadPayments();
  }, []);

  useEffect(() => {
    const interval = setInterval(
      async () => {
        const { data } =
          await supabase
            .from("payments")
            .select("*")
            .order("created_at", {
              ascending: false,
            });

        if (data) {
          setSavedPayments(data);
        }
      },
      5000
    );

    return () =>
      clearInterval(interval);
  }, []);

  const { address, chain } =
    useAccount();

  const { data: balance } =
    useBalance({
      address,
    });

  const totalRevenue =
    savedPayments
      .filter(
        (p) =>
          p.status ===
          "completed"
      )
      .reduce(
        (acc, p) =>
          acc + Number(p.amount),
        0
      );

  const completedPayments =
    savedPayments.filter(
      (p) =>
        p.status ===
        "completed"
    ).length;

  const pendingPayments =
    savedPayments.filter(
      (p) =>
        p.status !==
        "completed"
    ).length;

  if (!mounted) {
    return null;
  }

  return (
    <main className="flex flex-col lg:flex-row min-h-screen p-3 lg:p-4 gap-4 bg-[#F5F7FB]">
      <div className="lg:hidden mb-5 flex items-center justify-between rounded-[28px] border border-black/5 bg-white p-5 shadow-sm">
  <div>
    <h1 className="text-2xl font-semibold tracking-tight">
      ARCZONE
    </h1>

    <p className="mt-1 text-xs text-black/40">
      ARC Payment Infrastructure
    </p>
  </div>

  <ConnectButton />
</div>
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      

      <section className="flex-1 rounded-4xl border border-black/5 bg-white shadow-sm p-5 sm:p-8 overflow-hidden">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm text-black/50">
              Welcome back
            </p>

            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight mt-1">
              {merchantName}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <Dialog
              open={open}
              onOpenChange={setOpen}
            >
              <DialogTrigger asChild>
                <button className="rounded-2xl bg-black text-white px-5 py-3 font-medium hover:opacity-90 transition-opacity">
                  Create Payment
                </button>
              </DialogTrigger>

              <DialogContent className="rounded-[36px] border border-black/5 bg-white/95 backdrop-blur-xl shadow-2xl p-0 overflow-hidden max-w-md">
                <div className="p-6">
                  <DialogHeader className="space-y-1">
                    <DialogTitle className="text-2xl font-semibold tracking-tight">
                      Create Payment
                    </DialogTitle>

                    <p className="text-sm text-black/50">
                      Create an ARC payment link.
                    </p>
                  </DialogHeader>

                  <div className="mt-6 flex flex-col gap-4">
                    <div>
                      <p className="text-sm font-medium text-black/60 mb-2">
                        Payment Title
                      </p>

                      <Input
                        placeholder="Coffee"
                        value={title}
                        onChange={(e) =>
                          setTitle(
                            e.target.value
                          )
                        }
                        className="h-12 rounded-2xl border-black/10 bg-neutral-50 px-4 text-sm shadow-none"
                      />
                    </div>

                    <div>
                      <p className="text-sm font-medium text-black/60 mb-2">
                        Amount
                      </p>

                      <Input
                        placeholder="1"
                        type="number"
                        value={amount}
                        onChange={(e) =>
                          setAmount(
                            e.target.value
                          )
                        }
                        className="h-12 rounded-2xl border-black/10 bg-neutral-50 px-4 text-sm shadow-none"
                      />
                    </div>

                    <div>
                      <p className="text-sm font-medium text-black/60 mb-2">
                        Customer Email
                        <span className="ml-1 text-black/30">
                          (optional)
                        </span>
                      </p>

                      <Input
                        placeholder="customer@email.com"
                        value={customerEmail}
                        onChange={(e) =>
                          setCustomerEmail(
                            e.target.value
                          )
                        }
                        className="h-12 rounded-2xl border-black/10 bg-neutral-50 px-4 text-sm shadow-none"
                      />
                    </div>

                    <div>
                      <p className="text-sm font-medium text-black/60 mb-2">
                        Payment Note
                      </p>

                      <textarea
                        placeholder="Payment details..."
                        value={note}
                        onChange={(e) =>
                          setNote(
                            e.target.value
                          )
                        }
                        className="min-h-[90px] w-full rounded-2xl border border-black/10 bg-neutral-50 px-4 py-3 text-sm outline-none resize-none"
                      />
                    </div>

                    <div>
                      <p className="text-sm font-medium text-black/60 mb-2">
                        Link Expiry
                      </p>

                      <select
                        value={expiry}
                        onChange={(e) =>
                          setExpiry(
                            e.target.value
                          )
                        }
                        className="h-12 w-full rounded-2xl border border-black/10 bg-neutral-50 px-4 text-sm outline-none"
                      >
                        <option value="10m">
                          10 Minutes
                        </option>

                        <option value="1h">
                          1 Hour
                        </option>

                        <option value="24h">
                          24 Hours
                        </option>

                        <option value="never">
                          Never
                        </option>
                      </select>
                    </div>

                    <button
                      onClick={async () => {
                        if (!address) {
                          toast.error(
                            "Connect wallet first"
                          );

                          return;
                        }

                        const slug =
                          title
                            .toLowerCase()
                            .replace(
                              /\s+/g,
                              "-"
                            ) +
                          "-" +
                          Math.floor(
                            Math.random() *
                              10000
                          );

                        const expiresAt =
                          new Date();

                        if (
                          expiry === "10m"
                        ) {
                          expiresAt.setMinutes(
                            expiresAt.getMinutes() +
                              10
                          );
                        }

                        if (
                          expiry === "1h"
                        ) {
                          expiresAt.setHours(
                            expiresAt.getHours() +
                              1
                          );
                        }

                        if (
                          expiry === "24h"
                        ) {
                          expiresAt.setHours(
                            expiresAt.getHours() +
                              24
                          );
                        }

                        const paymentData =
                          {
                            title,
                            amount,
                            slug,
                            note,
                            customer_email:
                              customerEmail,
                            merchant_address:
                              address,
                            status:
                              "pending",
                            expires_at:
                              expiry ===
                              "never"
                                ? null
                                : expiresAt.toISOString(),
                          };

                        const {
                          error,
                        } =
                          await supabase
                            .from(
                              "payments"
                            )
                            .insert(
                              paymentData
                            );

                        if (error) {
                          console.error(
                            error
                          );

                          toast.error(
                            "Failed to create payment"
                          );

                          return;
                        }

                        setSavedPayments(
                          (prev) => [
                            paymentData,
                            ...prev,
                          ]
                        );

                        setSelectedPayment(
                          paymentData
                        );

                        setOpen(false);

                        setTitle("");
                        setAmount("");
                        setNote("");
                        setCustomerEmail(
                          ""
                        );

                        toast.success(
                          "Payment created"
                        );
                      }}
                      className="mt-2 h-12 rounded-2xl bg-black text-white text-sm font-semibold transition-all hover:opacity-95"
                    >
                      Continue
                    </button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            <ConnectButton />
          </div>
        </div>

        {activeTab === "dashboard" && (
          <>
            <div className="grid md:grid-cols-3 gap-5 mt-10">
              <GlassCard
                title="Wallet Balance"
                value={
                  balance
                    ? `${parseFloat(
                        balance.formatted
                      ).toFixed(
                        4
                      )} ${balance.symbol}`
                    : "0"
                }
              />

              <GlassCard
                title="Wallet Address"
                value={
                  address
                    ? `${address.slice(
                        0,
                        6
                      )}...${address.slice(
                        -4
                      )}`
                    : "Not Connected"
                }
              />

              <GlassCard
                title="Network"
                value={
                  chain?.name ||
                  "No Network"
                }
              />
            </div>

            <div className="grid md:grid-cols-3 gap-5 mt-5">
              <GlassCard
                title="Revenue"
                value={`${totalRevenue} ARC`}
              />

              <GlassCard
                title="Completed"
                value={String(
                  completedPayments
                )}
              />

              <GlassCard
                title="Pending"
                value={String(
                  pendingPayments
                )}
              />
            </div>

            {selectedPayment && (
              <div className="mt-8 rounded-4xl border border-black/5 bg-white p-6 shadow-sm">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                  <div>
                    <p className="text-sm text-black/50">
                      Payment Created
                    </p>

                    <h3 className="text-3xl font-semibold mt-2">
                      {
                        selectedPayment.title
                      }
                    </h3>

                    <p className="text-black/60 mt-2">
                      {
                        selectedPayment.amount
                      } ARC
                    </p>

                    {selectedPayment.note && (
                      <div className="mt-4 rounded-3xl bg-neutral-100 p-4">
                        <p className="text-sm text-black/50">
                          Note
                        </p>

                        <p className="mt-2 text-sm text-black/80">
                          {
                            selectedPayment.note
                          }
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="bg-white p-3 rounded-3xl border border-black/5 self-start">
                    <QRCode
                      size={120}
                      value={`${window.location.origin}/pay/${selectedPayment.slug}`}
                    />
                  </div>
                </div>

                <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <input
                    readOnly
                    value={`${window.location.origin}/pay/${selectedPayment.slug}`}
                    className="flex-1 rounded-2xl border border-black/10 bg-neutral-50 px-4 py-3 outline-none text-sm"
                  />

                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(
                        `${window.location.origin}/pay/${selectedPayment.slug}`
                      );

                      toast.success(
                        "Payment link copied"
                      );
                    }}
                    className="rounded-2xl bg-black text-white px-5 py-3 text-sm font-medium"
                  >
                    Copy
                  </button>
                </div>
              </div>
            )}
          </>
        )}

        {activeTab === "payments" && (
          <div className="mt-8 rounded-[32px] border border-black/5 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-black/50">
                  ARC Payments
                </p>

                <h2 className="text-3xl font-semibold mt-1">
                  Payments
                </h2>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3">
              {savedPayments.length ===
              0 ? (
                <div className="h-40 flex items-center justify-center text-black/40">
                  No payments yet
                </div>
              ) : (
                savedPayments.map(
                  (
                    payment,
                    index
                  ) => (
                    <div
                      key={index}
                      className="rounded-3xl border border-black/5 bg-neutral-50 p-5"
                    >
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                        <div>
                          <h3 className="font-semibold text-lg">
                            {
                              payment.title
                            }
                          </h3>

                          <p className="text-black/50 mt-1 text-sm">
                            {
                              payment.amount
                            } ARC
                          </p>

                          {payment.note && (
                            <p className="mt-3 text-sm text-black/70">
                              {
                                payment.note
                              }
                            </p>
                          )}
                        </div>

                        <div className="flex items-center gap-3">
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-medium ${
                              payment.status ===
                              "completed"
                                ? "bg-green-100 text-green-700"
                                : "bg-yellow-100 text-yellow-700"
                            }`}
                          >
                            {
                              payment.status
                            }
                          </span>

                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(
                                `${window.location.origin}/pay/${payment.slug}`
                              );

                              toast.success(
                                "Payment link copied"
                              );
                            }}
                            className="rounded-2xl bg-black text-white px-4 py-2 text-sm"
                          >
                            Copy Link
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                )
              )}
            </div>
          </div>
        )}

        {activeTab ===
          "settings" && (
          <div className="mt-8 rounded-[32px] border border-black/5 bg-white p-8 shadow-sm">
            <p className="text-sm text-black/50">
              Merchant Settings
            </p>

            <h2 className="text-3xl font-semibold mt-2">
              Settings
            </h2>

            <div className="mt-8 grid gap-5">
              <div className="rounded-3xl border border-black/5 bg-neutral-50 p-5">
                <p className="text-sm text-black/50">
                  Merchant Display Name
                </p>

                <Input
                  value={merchantName}
                  onChange={(e) =>
                    setMerchantName(
                      e.target.value
                    )
                  }
                  placeholder="CoffeeShop"
                  className="mt-4 h-12 rounded-2xl border-black/10 bg-white"
                />
              </div>

              <div className="rounded-3xl border border-black/5 bg-neutral-50 p-5">
                <p className="text-sm text-black/50">
                  Merchant Logo URL
                </p>

                <Input
                  value={merchantLogo}
                  onChange={(e) =>
                    setMerchantLogo(
                      e.target.value
                    )
                  }
                  placeholder="https://..."
                  className="mt-4 h-12 rounded-2xl border-black/10 bg-white"
                />

                {merchantLogo && (
                  <img
                    src={merchantLogo}
                    alt="Logo"
                    className="mt-4 h-14 w-14 rounded-2xl object-cover border border-black/5"
                  />
                )}
              </div>

              <div className="rounded-3xl border border-black/5 bg-neutral-50 p-5">
                <p className="text-sm text-black/50">
                  Default Link Expiry
                </p>

                <select
                  value={defaultExpiry}
                  onChange={(e) =>
                    setDefaultExpiry(
                      e.target.value
                    )
                  }
                  className="mt-4 h-12 w-full rounded-2xl border border-black/10 bg-white px-4 outline-none"
                >
                  <option value="10m">
                    10 Minutes
                  </option>

                  <option value="1h">
                    1 Hour
                  </option>

                  <option value="24h">
                    24 Hours
                  </option>
                </select>
              </div>

              <div className="rounded-3xl border border-black/5 bg-neutral-50 p-5">
                <p className="text-sm text-black/50">
                  Wallet Address
                </p>

                <p className="mt-3 break-all text-sm font-medium">
                  {address}
                </p>

                <button
                  onClick={() => {
                    navigator.clipboard.writeText(
                      address || ""
                    );

                    toast.success(
                      "Wallet copied"
                    );
                  }}
                  className="mt-4 rounded-2xl bg-black text-white px-4 py-2 text-sm"
                >
                  Copy Wallet
                </button>
              </div>
            </div>
          </div>
        )}
        
      </section>
    </main>
    
  );
}
