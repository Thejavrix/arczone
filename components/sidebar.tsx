"use client";

import {
  LayoutDashboard,
  CreditCard,
  Repeat,
  Settings,
  PanelLeftClose,
  Menu,
  X,
} from "lucide-react";

import { useState } from "react";

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function Sidebar({
  activeTab,
  setActiveTab,
}: SidebarProps) {
  const [collapsed, setCollapsed] =
    useState(false);

  const [mobileOpen, setMobileOpen] =
    useState(false);

  const navItems = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
    },
    {
      label: "Payments",
      icon: CreditCard,
    },
    {
      label: "Subscriptions",
      icon: Repeat,
      disabled: true,
    },
    {
      label: "Settings",
      icon: Settings,
    },
  ];

  return (
    <>
      {/* MOBILE TOPBAR */}

      <div className="lg:hidden mb-5 flex items-center justify-between rounded-[28px] border border-black/5 bg-white p-5 shadow-sm">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            ARCZONE
          </h1>

          <p className="mt-1 text-xs text-black/40">
            ARC Payment Infrastructure
          </p>
        </div>

        <button
          onClick={() =>
            setMobileOpen(true)
          }
          className="flex h-12 w-12 items-center justify-center rounded-2xl border border-black/5 bg-neutral-100"
        >
          <Menu size={22} />
        </button>
      </div>

      {/* MOBILE OVERLAY */}

      {mobileOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm lg:hidden">
          <div className="h-full w-[82%] max-w-[320px] overflow-y-auto border-r border-black/5 bg-white p-5 shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-semibold tracking-tight">
                  ARCZONE
                </h1>

                <p className="mt-1 text-xs text-black/40">
                  ARC Payment Infrastructure
                </p>
              </div>

              <button
                onClick={() =>
                  setMobileOpen(false)
                }
                className="flex h-11 w-11 items-center justify-center rounded-2xl border border-black/5 bg-neutral-100"
              >
                <X size={20} />
              </button>
            </div>

            <div className="mt-10 flex flex-col gap-3">
              {navItems.map((item) => {
                const Icon = item.icon;

                const active =
                  activeTab === item.label;

                return (
                  <button
                    key={item.label}
                    disabled={item.disabled}
                    onClick={() => {
                      if (item.disabled)
                        return;

                      setActiveTab(
                        item.label
                      );

                      setMobileOpen(
                        false
                      );
                    }}
                    className={`flex items-center ${
  collapsed
    ? "justify-center px-0"
    : "gap-4 px-5"
} rounded-3xl py-4 transition-all w-full ${
  active
    ? "bg-black text-white"
    : item.disabled
    ? "bg-neutral-100 text-black/30"
    : "hover:bg-neutral-100 text-black/70"
}`}
                  >
                    <Icon
  size={20}
  className="shrink-0"
/>

                    <div>
                      <p className="font-medium">
                        {item.label}
                      </p>

                      {item.disabled && (
                        <p className="text-xs mt-1">
                          Coming Soon
                        </p>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="mt-10 rounded-[32px] border border-black/5 bg-neutral-50 p-6">
              <p className="text-sm text-black/40">
                ARC Network
              </p>

              <h3 className="mt-3 text-2xl font-semibold">
                Testnet Active
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-black/50">
                Stablecoin payment infrastructure built on ARC.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* DESKTOP SIDEBAR */}

      <aside
  className={`hidden lg:flex rounded-4xl border border-black/5 bg-white shadow-sm p-5 flex-col transition-[width] duration-300 ${
    collapsed ? "w-22" : "w-65"
  }`}
>
        <div className="flex items-center justify-between">
          {!collapsed && (
            <div>
              <h1 className="text-3xl font-semibold tracking-tight">
                ARCZONE
              </h1>

              <p className="mt-2 text-sm text-black/40">
                ARC Payment Infrastructure
              </p>
            </div>
          )}

          <button
            onClick={() =>
              setCollapsed(!collapsed)
            }
            className="flex h-14 w-14 items-center justify-center rounded-3xl border border-black/5 bg-neutral-100 hover:bg-neutral-200 transition-colors"
          >
            <PanelLeftClose
              size={22}
            />
          </button>
        </div>

        <div className="mt-10 flex flex-col gap-3">
          {navItems.map((item) => {
            const Icon = item.icon;

            const active =
              activeTab === item.label;

            return (
              <button
                key={item.label}
                disabled={item.disabled}
                onClick={() => {
                  if (item.disabled)
                    return;

                  setActiveTab(item.label);
                }}
                className={`flex items-center ${
                  collapsed
                    ? "justify-center"
                    : "gap-4"
                } rounded-3xl px-5 py-4 transition-all ${
                  active
                    ? "bg-black text-white"
                    : item.disabled
                    ? "bg-neutral-100 text-black/30"
                    : "hover:bg-neutral-100 text-black/70"
                }`}
              >
                <Icon size={20} />

                {!collapsed && (
                  <div className="text-left">
                    <p className="font-medium">
                      {item.label}
                    </p>

                    {item.disabled && (
                      <p className="text-xs mt-1">
                        Coming Soon
                      </p>
                    )}
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {!collapsed && (
          <div className="mt-auto rounded-[32px] border border-black/5 bg-neutral-50 p-6">
            <p className="text-sm text-black/40">
              ARC Network
            </p>

            <h3 className="mt-3 text-3xl font-semibold tracking-tight">
              Testnet Active
            </h3>

            <p className="mt-4 text-sm leading-relaxed text-black/50">
              Stablecoin payment infrastructure built on ARC.
            </p>
          </div>
        )}
      </aside>
    </>
  );
}
