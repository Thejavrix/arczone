"use client";

import { useState } from "react";

import {
  LayoutDashboard,
  CreditCard,
  Repeat,
  Settings,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";

const items = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
  },

  {
    id: "payments",
    label: "Payments",
    icon: CreditCard,
  },

  {
    id: "subscriptions",
    label: "Subscriptions",
    icon: Repeat,
  },

  {
    id: "settings",
    label: "Settings",
    icon: Settings,
  },
];

export function Sidebar({
  activeTab,
  setActiveTab,
}: {
  activeTab: string;

  setActiveTab: (
    tab: string
  ) => void;
}) {
  const [collapsed, setCollapsed] =
    useState(false);

  return (
    <aside
      className={`rounded-4xl border border-black/5 bg-white shadow-sm p-5 flex flex-col transition-all duration-300 ${
        collapsed
          ? "w-full lg:w-22"
          : "w-full lg:w-65"
      }`}
    >
      <div className="flex items-center justify-between">
        {!collapsed && (
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">
              ARCZONE
            </h1>

            <p className="text-xs text-black/40 mt-1">
              ARC Payment Infrastructure
            </p>
          </div>
        )}

        <button
          onClick={() =>
            setCollapsed(!collapsed)
          }
          className="h-10 w-10 rounded-2xl bg-neutral-100 border border-black/5 flex items-center justify-center hover:bg-neutral-200 transition-colors"
        >
          {collapsed ? (
            <PanelLeftOpen size={18} />
          ) : (
            <PanelLeftClose size={18} />
          )}
        </button>
      </div>

      <div className="mt-10 flex flex-col gap-2">
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <SidebarItem
              key={item.id}
              icon={
                <Icon size={18} />
              }
              label={item.label}
              active={
                activeTab ===
                item.id
              }
              collapsed={
                collapsed
              }
              onClick={() =>
                setActiveTab(
                  item.id
                )
              }
            />
          );
        })}
      </div>

      {!collapsed && (
        <div className="mt-auto pt-6">
          <div className="rounded-3xl border border-black/5 bg-neutral-50 p-4">
            <p className="text-xs text-black/40">
              ARC Network
            </p>

            <h3 className="mt-2 font-semibold">
              Testnet Active
            </h3>

            <p className="mt-2 text-xs text-black/50 leading-relaxed">
              Stablecoin payment
              infrastructure built
              on ARC.
            </p>
          </div>
        </div>
      )}
    </aside>
  );
}

function SidebarItem({
  icon,
  label,
  active,
  collapsed,
  onClick,
}: {
  icon: React.ReactNode;

  label: string;

  active?: boolean;

  collapsed?: boolean;

  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center ${
        collapsed
          ? "justify-center"
          : "gap-3"
      } rounded-2xl px-4 py-3 transition-all ${
        active
          ? "bg-black text-white shadow-sm"
          : "hover:bg-neutral-100 text-black/70"
      }`}
    >
      {icon}

      {!collapsed && (
        <span className="font-medium">
          {label}
        </span>
      )}
    </button>
  );
}