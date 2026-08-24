import { Link, useRouterState } from "@tanstack/react-router";
import { useState } from "react";
import {
  LayoutDashboard, Trophy, Shield, Award, Zap, ArrowUpCircle, Crown,
  Target, Compass, Swords, Gift, PackageCheck, BarChart3, LineChart,
  Bell, ScrollText, Star, Sparkles, Settings, ChevronLeft, ChevronRight,
  MessageSquare, Gem, Landmark,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { SHOWCASES } from "@/lib/ams/museum";
import { COLLECTION_TYPES } from "@/lib/ams/signature-collection";

type Item = { to: string; label: string; icon: React.ComponentType<{ className?: string }>; num: string };

const NAV: Item[] = [
  { num: "01", to: "/ams-manager",              label: "Command Center", icon: LayoutDashboard },
  { num: "02", to: "/ams-manager/achievements",  label: "Achievements",   icon: Trophy },
  { num: "03", to: "/ams-manager/badges",        label: "Badges",         icon: Shield },
  { num: "04", to: "/ams-manager/trophies",      label: "Trophies",       icon: Award },
  { num: "05", to: "/ams-manager/xp",            label: "XP",             icon: Zap },
  { num: "06", to: "/ams-manager/levels",        label: "Levels",         icon: ArrowUpCircle },
  { num: "07", to: "/ams-manager/ranks",         label: "Ranks",          icon: Crown },
  { num: "08", to: "/ams-manager/missions",      label: "Missions",       icon: Target },
  { num: "09", to: "/ams-manager/quests",        label: "Quests",         icon: Compass },
  { num: "10", to: "/ams-manager/challenges",    label: "Challenges",     icon: Swords },
  { num: "11", to: "/ams-manager/rewards",       label: "Rewards",        icon: Gift },
  { num: "12", to: "/ams-manager/claims",        label: "Claims",         icon: PackageCheck },
  { num: "13", to: "/ams-manager/leaderboards",  label: "Leaderboards",   icon: BarChart3 },
  { num: "14", to: "/ams-manager/analytics",     label: "Analytics",      icon: LineChart },
  { num: "15", to: "/ams-manager/notifications", label: "Notifications",  icon: Bell },
  { num: "16", to: "/ams-manager/audit",         label: "Audit Logs",     icon: ScrollText },
  { num: "17", to: "/ams-manager/hall-of-fame",  label: "Hall of Fame",   icon: Star },
  { num: "18", to: "/ams-manager/ai",            label: "AI Center",      icon: Sparkles },
  { num: "19", to: "/ams-manager/chat",          label: "Chat",           icon: MessageSquare },
  { num: "20", to: "/ams-manager/museum",        label: "Museums",        icon: Landmark },
  { num: "21", to: "/ams-manager/collection",     label: "Collections",    icon: Crown },
  { num: "22", to: "/ams-manager/settings",      label: "Settings",       icon: Settings },
];

const VAULTS: { to: string; label: string }[] = [
  { to: "/ams-manager/trophy-vault",           label: "Trophies" },
  { to: "/ams-manager/award-vault",            label: "Awards" },
  { to: "/ams-manager/achievement-vault",      label: "Achievements" },
  { to: "/ams-manager/badge-vault",            label: "Badges" },
  { to: "/ams-manager/certificate-vault",      label: "Certificates" },
  { to: "/ams-manager/passport-vault",         label: "Digital Passports" },
  { to: "/ams-manager/membership-vault",       label: "Membership Cards" },
  { to: "/ams-manager/rank-vault",             label: "Rank Emblems" },
  { to: "/ams-manager/verification-vault",     label: "Verification Shields" },
  { to: "/ams-manager/reputation-vault",       label: "Reputation Medals" },
  { to: "/ams-manager/trust-seal-vault",       label: "Trust Seals" },
  { to: "/ams-manager/recognition-coin-vault", label: "Recognition Coins" },
  { to: "/ams-manager/xp-crystal-vault",       label: "XP Crystals" },
  { to: "/ams-manager/reward-chest-vault",     label: "Reward Chests" },
  { to: "/ams-manager/honor-coin-vault",       label: "Honor Coins" },
  { to: "/ams-manager/legacy-medal-vault",     label: "Legacy Medals" },
  { to: "/ams-manager/identity-card-vault",    label: "Identity Cards" },
  { to: "/ams-manager/license-card-vault",     label: "License Cards" },
  { to: "/ams-manager/founder-seal-vault",     label: "Founder Seals" },
  { to: "/ams-manager/hall-of-fame-vault",     label: "Hall of Fame" },
];


export function LeftSidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "sticky top-14 hidden md:flex shrink-0 flex-col border-r border-border/60 bg-background/60 backdrop-blur-xl transition-[width]",
        collapsed ? "w-14" : "w-56",
      )}
      style={{ height: "calc(100vh - 3.5rem)" }}
    >
      <div className="flex-1 overflow-y-auto py-3">
        <nav className="flex flex-col gap-0.5 px-2">
          {NAV.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                title={collapsed ? item.label : undefined}
                className={cn(
                  "group flex items-center gap-2.5 rounded-md px-2.5 py-2 text-xs font-medium transition-colors",
                  active
                    ? "bg-trophy/10 text-trophy"
                    : "text-muted-foreground hover:bg-muted/40 hover:text-foreground",
                )}
              >
                <span
                  className={cn(
                    "font-mono text-[9px] tabular-nums opacity-50 group-hover:opacity-100",
                    active && "opacity-100",
                    collapsed && "hidden",
                  )}
                >
                  {item.num}
                </span>
                <Icon className={cn("h-4 w-4 shrink-0", active && "text-trophy")} />
                {!collapsed && <span className="truncate">{item.label}</span>}
                {active && !collapsed && (
                  <span className="ml-auto h-1.5 w-1.5 rounded-full bg-trophy glow-trophy" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="mt-4 px-2">
          {!collapsed && (
            <div className="px-1 pb-1.5 text-[9px] font-mono uppercase tracking-[0.25em] text-muted-foreground/60">
              3D Collectible Vaults
            </div>
          )}
          <nav className="flex flex-col gap-0.5">
            {VAULTS.map((v) => {
              const active = pathname === v.to;
              return (
                <Link
                  key={v.to}
                  to={v.to}
                  title={collapsed ? v.label : undefined}
                  className={cn(
                    "flex items-center gap-2.5 rounded-md px-2.5 py-1.5 text-xs transition-colors",
                    active
                      ? "bg-trophy/10 text-trophy"
                      : "text-muted-foreground hover:bg-muted/40 hover:text-foreground",
                  )}
                >
                  <Gem className={cn("h-3.5 w-3.5 shrink-0", active && "text-trophy")} />
                  {!collapsed && <span className="truncate">{v.label}</span>}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="mt-4 px-2">
          {!collapsed && (
            <div className="px-1 pb-1.5 text-[9px] font-mono uppercase tracking-[0.25em] text-muted-foreground/60">
              Museums &amp; Galleries
            </div>
          )}
          <nav className="flex flex-col gap-0.5">
            {SHOWCASES.map((s) => {
              const active = pathname === `/museum/${s.slug}`;
              return (
                <Link
                  key={s.slug}
                  to="/ams-manager/museum/$showcase"
                  params={{ showcase: s.slug }}
                  title={collapsed ? s.title : undefined}
                  className={cn(
                    "flex items-center gap-2.5 rounded-md px-2.5 py-1.5 text-xs transition-colors",
                    active
                      ? "bg-trophy/10 text-trophy"
                      : "text-muted-foreground hover:bg-muted/40 hover:text-foreground",
                  )}
                >
                  <Landmark className={cn("h-3.5 w-3.5 shrink-0", active && "text-trophy")} />
                  {!collapsed && <span className="truncate">{s.title}</span>}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="mt-4 px-2">
          {!collapsed && (
            <div className="px-1 pb-1.5 text-[9px] font-mono uppercase tracking-[0.25em] text-muted-foreground/60">
              Signature Collections
            </div>
          )}
          <nav className="flex flex-col gap-0.5">
            {COLLECTION_TYPES.map((t) => {
              const active = pathname === `/collection/${t.slug}`;
              return (
                <Link
                  key={t.slug}
                  to="/ams-manager/collection/$type"
                  params={{ type: t.slug }}
                  title={collapsed ? t.title : undefined}
                  className={cn(
                    "flex items-center gap-2.5 rounded-md px-2.5 py-1.5 text-xs transition-colors",
                    active
                      ? "bg-trophy/10 text-trophy"
                      : "text-muted-foreground hover:bg-muted/40 hover:text-foreground",
                  )}
                >
                  <Crown className={cn("h-3.5 w-3.5 shrink-0", active && "text-trophy")} />
                  {!collapsed && <span className="truncate">{t.title.replace("Signature ", "")}</span>}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>



      <button
        onClick={() => setCollapsed((v) => !v)}
        className="flex items-center justify-center gap-1.5 border-t border-border/60 py-2 text-[10px] uppercase tracking-wider text-muted-foreground hover:bg-muted/40 hover:text-foreground"
      >
        {collapsed ? <ChevronRight className="h-3.5 w-3.5" /> : (
          <><ChevronLeft className="h-3.5 w-3.5" /> Collapse</>
        )}
      </button>
    </aside>
  );
}
