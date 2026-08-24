import {
  LayoutDashboard, UsersRound, BookMarked, Fingerprint, Trophy, Award, Shield,
  Ribbon, CreditCard, Crown, Zap, ArrowUpCircle, Target, Gift, BarChart3, Star,
  Archive, Layers, LineChart, Settings, Bell, ScrollText, Sparkles, MessageSquare,
  Landmark, Coins, Gem, Package, Medal, IdCard, FileBadge, Stamp, ShieldCheck,
  Swords, Flag, Ticket, Building2,
} from "lucide-react";

export type NavItem = {
  to: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
};

export type NavGroup = { label: string; items: NavItem[] };

/** Always-visible top-level entries. */
export const primaryNav: NavItem[] = [
  { to: "/ams-manager/ams-manager", label: "Command Center", icon: LayoutDashboard },
  { to: "/ams-manager/ams", label: "AMS Tickets", icon: Ticket },
];

export const navGroups: NavGroup[] = [
  {
    label: "Identity",
    items: [
      { to: "/ams-manager/role-manager", label: "Role Manager", icon: UsersRound },
      { to: "/ams-manager/passport", label: "Passport", icon: BookMarked },
      { to: "/ams-manager/identity", label: "Identity", icon: Fingerprint },
    ],
  },
  {
    label: "Recognition",
    items: [
      { to: "/ams-manager/achievements", label: "Achievements", icon: Trophy },
      { to: "/ams-manager/awards", label: "Awards", icon: Award },
      { to: "/ams-manager/badges", label: "Badges", icon: Shield },
      { to: "/ams-manager/trophies", label: "Trophies", icon: Trophy },
      { to: "/ams-manager/certificates", label: "Certificates", icon: Ribbon },
      { to: "/ams-manager/hall-of-fame", label: "Hall of Fame", icon: Star },
      { to: "/ams-manager/legacy", label: "Legacy", icon: Archive },
      { to: "/ams-manager/collections", label: "Collections", icon: Layers },
      { to: "/ams-manager/trophy-gallery", label: "Trophy Gallery", icon: Landmark },
      { to: "/ams-manager/role-showcase", label: "Role Rooms", icon: Crown },
      { to: "/ams-manager/museum", label: "Museum", icon: Building2 },
    ],
  },
  {
    label: "Progression",
    items: [
      { to: "/ams-manager/xp", label: "XP", icon: Zap },
      { to: "/ams-manager/levels", label: "Levels", icon: ArrowUpCircle },
      { to: "/ams-manager/ranks", label: "Ranks", icon: Crown },
      { to: "/ams-manager/developer-progression", label: "Dev Progression", icon: ArrowUpCircle },
      { to: "/ams-manager/author-progression", label: "Author Progression", icon: ArrowUpCircle },
      { to: "/ams-manager/vendor-progression", label: "Vendor Progression", icon: ArrowUpCircle },
    ],
  },
  {
    label: "Engagement",
    items: [
      { to: "/ams-manager/missions", label: "Missions", icon: Target },
      { to: "/ams-manager/quests", label: "Quests", icon: Flag },
      { to: "/ams-manager/challenges", label: "Challenges", icon: Swords },
    ],
  },
  {
    label: "Rewards",
    items: [
      { to: "/ams-manager/rewards", label: "Rewards", icon: Gift },
      { to: "/ams-manager/claims", label: "Claims", icon: Package },
    ],
  },
  {
    label: "Insights",
    items: [
      { to: "/ams-manager/leaderboards", label: "Leaderboard", icon: BarChart3 },
      { to: "/ams-manager/analytics", label: "Analytics", icon: LineChart },
    ],
  },
  {
    label: "Vaults",
    items: [
      { to: "/ams-manager/passport-vault", label: "Passport Vault", icon: BookMarked },
      { to: "/ams-manager/achievement-vault", label: "Achievement Vault", icon: Trophy },
      { to: "/ams-manager/award-vault", label: "Award Vault", icon: Award },
      { to: "/ams-manager/badge-vault", label: "Badge Vault", icon: Shield },
      { to: "/ams-manager/trophy-vault", label: "Trophy Vault", icon: Trophy },
      { to: "/ams-manager/trophy-stages", label: "Trophy Stages", icon: Landmark },
      { to: "/ams-manager/certificate-vault", label: "Certificate Vault", icon: Ribbon },
      { to: "/ams-manager/membership-vault", label: "Membership Vault", icon: CreditCard },
      { to: "/ams-manager/rank-vault", label: "Rank Vault", icon: Crown },
      { to: "/ams-manager/verification-vault", label: "Verification Vault", icon: ShieldCheck },
      { to: "/ams-manager/reputation-vault", label: "Reputation Vault", icon: Star },
      { to: "/ams-manager/trust-seal-vault", label: "Trust Seal Vault", icon: Stamp },
      { to: "/ams-manager/recognition-coin-vault", label: "Recognition Coins", icon: Coins },
      { to: "/ams-manager/xp-crystal-vault", label: "XP Crystals", icon: Gem },
      { to: "/ams-manager/reward-chest-vault", label: "Reward Chests", icon: Package },
      { to: "/ams-manager/honor-coin-vault", label: "Honor Coins", icon: Coins },
      { to: "/ams-manager/legacy-medal-vault", label: "Legacy Medals", icon: Medal },
      { to: "/ams-manager/identity-card-vault", label: "Identity Cards", icon: IdCard },
      { to: "/ams-manager/license-card-vault", label: "License Cards", icon: FileBadge },
      { to: "/ams-manager/founder-seal-vault", label: "Founder Seals", icon: Stamp },
      { to: "/ams-manager/hall-of-fame-vault", label: "Hall of Fame Vault", icon: Star },
    ],
  },
];

/** Pinned to the bottom of the sidebar. */
export const bottomNav: NavItem[] = [
  { to: "/ams-manager/chat", label: "Chat", icon: MessageSquare },
  { to: "/ams-manager/ai", label: "AI Center", icon: Sparkles },
  { to: "/ams-manager/notifications", label: "Notifications", icon: Bell },
  { to: "/ams-manager/audit", label: "Audit Logs", icon: ScrollText },
  { to: "/ams-manager/settings", label: "Settings", icon: Settings },
];

const ALL: { item: NavItem; group: string }[] = [
  ...primaryNav.map((item) => ({ item, group: "Command Center" })),
  ...navGroups.flatMap((g) => g.items.map((item) => ({ item, group: g.label }))),
  ...bottomNav.map((item) => ({ item, group: "System" })),
];

/** Longest-prefix match so nested routes still resolve to their module. */
export function navMetaForPath(pathname: string) {
  if (pathname === "/") return { label: "Command Center", group: "Overview", icon: LayoutDashboard };
  let best: { item: NavItem; group: string } | null = null;
  for (const entry of ALL) {
    if (entry.item.to === "/") continue;
    if (pathname === entry.item.to || pathname.startsWith(entry.item.to + "/")) {
      if (!best || entry.item.to.length > best.item.to.length) best = entry;
    }
  }
  if (!best) return null;
  return { label: best.item.label, group: best.group, icon: best.item.icon };
}
