"use client";

import Link from "next/link";

import {
  ArrowRight,
  ShieldCheck,
  Zap,
  Globe,
  CreditCard,
  Wallet,
  BarChart3,
  Clock3,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-[#F5F7FB] overflow-hidden text-black">
      <section className="relative px-6 lg:px-12 pt-6">
        <div className="absolute top-[-120px] right-[-120px] h-[350px] w-[350px] rounded-full bg-black/[0.04] blur-3xl" />

        <nav className="relative z-10 flex items-center justify-between rounded-[32px] border border-black/5 bg-white/80 backdrop-blur-xl px-6 py-4 shadow-sm">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">
              ARCZONE
            </h1>

            <p className="text-xs text-black/40 mt-1">
              ARC Payment Infrastructure
            </p>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm text-black/60">
            <a href="#features">
              Features
            </a>

            <a href="#vision">
              Vision
            </a>

            <a href="#roadmap">
              Roadmap
            </a>
          </div>

          <Link
            href="/dashboard"
            className="rounded-2xl bg-black text-white px-5 py-3 text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Launch App
          </Link>
        </nav>

        <div className="relative z-10 pt-24 pb-20 max-w-7xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-black/5 bg-white px-4 py-2 text-sm shadow-sm">
            <Sparkles size={16} />

            Built on ARC Testnet
          </div>

          <div className="mt-10 grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-5xl md:text-7xl font-semibold tracking-tight leading-[0.95]">
                Crypto
                Payments
                Built For
                <span className="block text-black/40">
                  ARC.
                </span>
              </h2>

              <p className="mt-8 text-lg text-black/55 leading-relaxed max-w-xl">
                ARCZONE is a next-generation
                crypto payment infrastructure
                platform built for merchants,
                creators, and internet-native
                businesses.
              </p>

              <p className="mt-4 text-lg text-black/55 leading-relaxed max-w-xl">
                Create payment links,
                receive instant ARC payments,
                manage merchant analytics,
                and power the future of
                decentralized commerce.
              </p>

              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <Link
                  href="/"
                  className="inline-flex items-center justify-center gap-2 rounded-3xl bg-black text-white px-7 py-4 text-base font-medium hover:opacity-90 transition-opacity"
                >
                  Open Dashboard

                  <ArrowRight size={18} />
                </Link>

                <button className="rounded-3xl border border-black/10 bg-white px-7 py-4 text-base font-medium hover:bg-neutral-50 transition-colors">
                  Explore Features
                </button>
              </div>

              <div className="mt-12 grid grid-cols-3 gap-6 max-w-lg">
                <div>
                  <h3 className="text-3xl font-semibold">
                    0%
                  </h3>

                  <p className="mt-2 text-sm text-black/50">
                    Platform Fees
                  </p>
                </div>

                <div>
                  <h3 className="text-3xl font-semibold">
                    Instant
                  </h3>

                  <p className="mt-2 text-sm text-black/50">
                    Settlement
                  </p>
                </div>

                <div>
                  <h3 className="text-3xl font-semibold">
                    ARC
                  </h3>

                  <p className="mt-2 text-sm text-black/50">
                    Native
                  </p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="rounded-[40px] border border-black/5 bg-white p-8 shadow-2xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-black/40">
                      Merchant Revenue
                    </p>

                    <h3 className="text-4xl font-semibold mt-2">
                      12,430 ARC
                    </h3>
                  </div>

                  <div className="rounded-3xl bg-black text-white p-4">
                    <BarChart3 size={28} />
                  </div>
                </div>

                <div className="mt-10 grid grid-cols-2 gap-4">
                  <div className="rounded-3xl bg-neutral-100 p-5">
                    <p className="text-sm text-black/40">
                      Payments
                    </p>

                    <h4 className="mt-3 text-2xl font-semibold">
                      482
                    </h4>
                  </div>

                  <div className="rounded-3xl bg-neutral-100 p-5">
                    <p className="text-sm text-black/40">
                      Success Rate
                    </p>

                    <h4 className="mt-3 text-2xl font-semibold">
                      99.2%
                    </h4>
                  </div>
                </div>

                <div className="mt-8 rounded-[32px] border border-black/5 bg-neutral-50 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-black/40">
                        Payment Request
                      </p>

                      <h4 className="mt-2 text-2xl font-semibold">
                        24 ARC
                      </h4>
                    </div>

                    <div className="rounded-2xl bg-green-100 px-3 py-2 text-sm font-medium text-green-700">
                      Paid
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-between text-sm text-black/50">
                    <span>
                      Network
                    </span>

                    <span>
                      ARC Testnet
                    </span>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-8 -left-8 rounded-[32px] border border-black/5 bg-white p-6 shadow-xl hidden lg:block">
                <div className="flex items-center gap-4">
                  <div className="rounded-2xl bg-black text-white p-4">
                    <Wallet size={24} />
                  </div>

                  <div>
                    <p className="text-sm text-black/40">
                      Wallet Connected
                    </p>

                    <h4 className="font-semibold mt-1">
                      ARC Wallet
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="features"
        className="px-6 lg:px-12 py-24"
      >
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl">
            <p className="text-sm text-black/40">
              Features
            </p>

            <h2 className="mt-4 text-5xl font-semibold tracking-tight leading-tight">
              Everything needed to
              power modern crypto
              commerce.
            </h2>
          </div>

          <div className="mt-16 grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {[
              {
                icon: CreditCard,
                title:
                  "Hosted Payment Links",
                description:
                  "Create and share ARC-native payment links instantly.",
              },
              {
                icon: Wallet,
                title:
                  "Wallet Infrastructure",
                description:
                  "Native wallet connectivity with ARC settlement.",
              },
              {
                icon: ShieldCheck,
                title:
                  "Secure Settlement",
                description:
                  "Onchain payment tracking and transaction verification.",
              },
              {
                icon: BarChart3,
                title:
                  "Merchant Analytics",
                description:
                  "Track revenue, payments, and settlement activity.",
              },
              {
                icon: Clock3,
                title:
                  "Payment Expiry",
                description:
                  "Create temporary and expiring payment requests.",
              },
              {
                icon: Globe,
                title:
                  "Future Crosschain",
                description:
                  "Upcoming multi-chain payment routing into ARC.",
              },
            ].map((feature, index) => {
              const Icon = feature.icon;

              return (
                <div
                  key={index}
                  className="rounded-[32px] border border-black/5 bg-white p-8 shadow-sm hover:shadow-xl transition-all"
                >
                  <div className="rounded-3xl bg-neutral-100 w-fit p-4">
                    <Icon size={24} />
                  </div>

                  <h3 className="mt-8 text-2xl font-semibold tracking-tight">
                    {feature.title}
                  </h3>

                  <p className="mt-4 text-black/55 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section
        id="vision"
        className="px-6 lg:px-12 py-24"
      >
        <div className="max-w-7xl mx-auto rounded-[48px] border border-black/5 bg-black text-white p-10 lg:p-16 overflow-hidden relative">
          <div className="absolute top-0 right-0 h-[300px] w-[300px] rounded-full bg-white/10 blur-3xl" />

          <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-sm text-white/50">
                Vision
              </p>

              <h2 className="mt-4 text-5xl font-semibold tracking-tight leading-tight">
                The payment layer for
                the ARC ecosystem.
              </h2>
            </div>

            <div>
              <p className="text-lg text-white/70 leading-relaxed">
                ARCZONE is designed to
                become a complete payment
                infrastructure stack for
                decentralized internet
                businesses.
              </p>

              <div className="mt-10 space-y-5">
                {[
                  "Merchant payment infrastructure",
                  "Crosschain settlement routing",
                  "Subscription billing systems",
                  "Stablecoin payment rails",
                  "Embedded checkout SDKs",
                  "Real-time merchant analytics",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle2 size={18} />

                    <span className="text-white/80">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="roadmap"
        className="px-6 lg:px-12 py-24"
      >
        <div className="max-w-7xl mx-auto">
          <p className="text-sm text-black/40">
            Roadmap
          </p>

          <h2 className="mt-4 text-5xl font-semibold tracking-tight">
            What’s coming next.
          </h2>

          <div className="mt-16 grid md:grid-cols-2 xl:grid-cols-4 gap-6">
            {[
              "Crosschain ARC settlement",
              "Subscription infrastructure",
              "Merchant API & SDK",
              "Mobile payment apps",
              "Invoice generation",
              "Webhook integrations",
              "Stablecoin routing",
              "Advanced analytics",
            ].map((item, index) => (
              <div
                key={index}
                className="rounded-[32px] border border-black/5 bg-white p-8 shadow-sm"
              >
                <div className="text-sm text-black/40">
                  0{index + 1}
                </div>

                <h3 className="mt-6 text-xl font-semibold leading-snug">
                  {item}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="px-6 lg:px-12 py-10 border-t border-black/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-5 md:items-center md:justify-between">
          <div>
            <h3 className="text-xl font-semibold">
              ARCZONE
            </h3>

            <p className="mt-2 text-sm text-black/40">
              ARC-native payment infrastructure.
            </p>
          </div>

          
        </div>
        <div className="mt-12 flex items-center justify-center">
  <p className="text-xs text-black tracking-wide">
    Built by JAVRIX
  </p>
</div>
      </footer>
    </main>
  );
}

