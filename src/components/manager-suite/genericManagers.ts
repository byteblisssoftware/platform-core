// Blueprints for every Control Panel role that has no bespoke console yet.
// Each blueprint renders through the shared ManagerWorkspace shell so the
// sidebar entry always opens a real, working surface.
import {
  Activity, AlertTriangle, BarChart3, Bell, Bot, Box, Boxes, Brain, Building2,
  Calendar, ClipboardCheck, Coins, CreditCard, Cpu, Database, DollarSign,
  FileSignature, FileText, Flag, Gauge, Globe2, GraduationCap, HardDrive,
  Headphones, HeartHandshake, Inbox, Key, LayoutDashboard, LifeBuoy, ListTodo,
  Megaphone, MessagesSquare, Percent, Receipt, Rocket, Scale, Server, Settings,
  Shield, ShieldCheck, Sparkles, Star, Target, Terminal, Timer, TrendingUp,
  UserCheck, Users, Wallet, Workflow, Zap,
  type LucideIcon,
} from "lucide-react";

import type { NavGroup, NavItem } from "@/components/creator/navigation";
import type { ExecRole } from "./executiveFeed";

export interface ManagerBlueprint {
  slug: string;
  brand: string;
  brandMark: string;
  title: string;
  subtitle: string;
  execRole: ExecRole;
  primary: NavItem[];
  groups: NavGroup[];
}

type Item = [string, LucideIcon];
const nav = (items: Item[]): NavItem[] => items.map(([label, icon]) => ({ label, icon }));
const group = (label: string, items: Item[]): NavGroup => ({ label, items: nav(items) });

const COMMON = group("Operations", [
  ["Reports", BarChart3],
  ["Notifications", Bell],
  ["Team & Roles", Users],
  ["Settings", Settings],
]);

function make(
  slug: string,
  brand: string,
  brandMark: string,
  title: string,
  subtitle: string,
  execRole: ExecRole,
  groups: NavGroup[],
): ManagerBlueprint {
  const all = [...groups, COMMON];
  const primary: NavItem[] = [
    { label: "Command Console", icon: LayoutDashboard },
    ...all[0]!.items.slice(0, 4),
  ];
  return { slug, brand, brandMark, title, subtitle, execRole, primary, groups: all };
}

export const MANAGER_BLUEPRINTS: Record<string, ManagerBlueprint> = {
  ceo: make("ceo", "CEO Office", "CE", "CEO Dashboard",
    "Company-wide objectives, board reporting and executive decisions.", "marketplace", [
    group("Executive", [
      ["Objectives", Target], ["Board Reports", FileText], ["Approvals", ClipboardCheck],
      ["Escalations", AlertTriangle], ["Performance Review", Gauge], ["Calendar", Calendar],
    ]),
    group("Business", [
      ["Revenue", TrendingUp], ["Growth Plan", Rocket], ["Departments", Building2], ["Risk Register", Shield],
    ]),
  ]),

  "vala-ai": make("vala-ai", "Vala AI", "AI", "Vala AI Management",
    "Agents, prompts, jobs, queues and model routing for the Vala AI platform.", "marketplace", [
    group("AI Platform", [
      ["Agents", Bot], ["Prompts", Sparkles], ["Jobs", Workflow], ["Queue", ListTodo],
      ["Models", Brain], ["Training Data", Database],
    ]),
    group("Governance", [
      ["Usage & Cost", Coins], ["Safety Rules", ShieldCheck], ["Audit Trail", FileText],
    ]),
  ]),

  "server-manager": make("server-manager", "Servers", "SV", "Server Manager",
    "Nodes, deployments, uptime, backups and infrastructure alerts.", "marketplace", [
    group("Infrastructure", [
      ["Nodes", Server], ["Deployments", Rocket], ["Uptime", Activity], ["Resources", Cpu],
      ["Storage", HardDrive], ["Backups", Database],
    ]),
    group("Reliability", [
      ["Incidents", AlertTriangle], ["Alerts", Bell], ["Maintenance", Settings], ["Access Keys", Key],
    ]),
  ]),

  "api-ai-manager": make("api-ai-manager", "AI API", "AP", "AI API Manager",
    "Providers, API keys, quotas, routing and consumption analytics.", "marketplace", [
    group("API Control", [
      ["Providers", Zap], ["API Keys", Key], ["Quotas", Gauge], ["Routing Rules", Workflow],
      ["Usage Events", Activity], ["Billing", CreditCard],
    ]),
    group("Quality", [
      ["Latency", Timer], ["Errors", AlertTriangle], ["Sandbox", Terminal],
    ]),
  ]),

  "product-manager": make("product-manager", "Products", "PR", "Product Manager",
    "Product catalog, releases, roadmap and update requests.", "marketplace", [
    group("Product", [
      ["Products", Box], ["Releases", Rocket], ["Roadmap", Target], ["Update Requests", ClipboardCheck],
      ["Feedback", MessagesSquare], ["Pricing", DollarSign],
    ]),
    group("Delivery", [
      ["Backlog", ListTodo], ["QA Checks", ShieldCheck], ["Documentation", FileText],
    ]),
  ]),

  "demo-manager": make("demo-manager", "Demos", "DM", "Demo Manager",
    "Demo URLs, scheduling, health checks and conversion tracking.", "marketplace", [
    group("Demos", [
      ["Demo Library", Terminal], ["Demo Requests", Inbox], ["Scheduling", Calendar],
      ["Health Checks", Activity], ["Conversions", Percent], ["Live Software", Boxes],
    ]),
  ]),

  "task-manager": make("task-manager", "Tasks", "TK", "Task Manager",
    "Workstreams, assignments, deadlines and delivery tracking.", "marketplace", [
    group("Work", [
      ["Tasks", ListTodo], ["Sprints", Workflow], ["Assignments", Users], ["Deadlines", Timer],
      ["Blockers", AlertTriangle], ["Completed", ClipboardCheck],
    ]),
  ]),

  "assist-manager": make("assist-manager", "Assist", "AS", "Assist Manager",
    "Assisted onboarding, live sessions and customer enablement.", "marketplace", [
    group("Assist", [
      ["Sessions", LifeBuoy], ["Onboarding", UserCheck], ["Playbooks", FileText],
      ["Schedule", Calendar], ["Feedback", MessagesSquare],
    ]),
  ]),

  "ams-manager": make("ams-manager", "AMS", "AM", "AMS Manager",
    "Asset management system: inventory, allocation and lifecycle.", "marketplace", [
    group("Assets", [
      ["Inventory", Boxes], ["Allocation", Users], ["Maintenance", Settings],
      ["Vendors", Building2], ["Depreciation", TrendingUp], ["Audits", ShieldCheck],
    ]),
  ]),

  "marketing-manager": make("marketing-manager", "Marketing", "MK", "Marketing Manager",
    "Campaigns, channels, budgets and creative performance.", "marketplace", [
    group("Marketing", [
      ["Campaigns", Megaphone], ["Channels", Globe2], ["Creatives", Sparkles],
      ["Budget", Wallet], ["Attribution", BarChart3], ["Calendar", Calendar],
    ]),
  ]),

  "lead-manager": make("lead-manager", "Leads", "LD", "Lead Manager",
    "Pipeline, qualification, follow-ups and conversion.", "lead", [
    group("Pipeline", [
      ["Leads", Target], ["Qualification", ClipboardCheck], ["Follow-ups", Timer],
      ["Deals", Receipt], ["Sources", Globe2], ["Conversion", Percent],
    ]),
  ]),

  "sales-support": make("sales-support", "Sales & Support", "SS", "Sales & Support",
    "Sales desk and support operations in one console.", "marketplace", [
    group("Desk", [
      ["Tickets", Headphones], ["Orders", Receipt], ["Escalations", AlertTriangle],
      ["SLA Monitor", Timer], ["Knowledge Base", FileText], ["CSAT", Star],
    ]),
  ]),

  "customer-support": make("customer-support", "Support", "CS", "Customer Support",
    "Customer tickets, chat queues, SLAs and satisfaction.", "marketplace", [
    group("Support", [
      ["Tickets", Headphones], ["Chat Queue", MessagesSquare], ["Escalations", AlertTriangle],
      ["Macros", FileText], ["CSAT", Star], ["Customers", HeartHandshake],
    ]),
  ]),

  "continent-admin": make("continent-admin", "Continent", "CT", "Continent Admin",
    "Continent-level operations, country heads and regional targets.", "franchise", [
    group("Geo", [
      ["Continents", Globe2], ["Countries", Flag], ["Regional Targets", Target],
      ["Country Heads", Users], ["Compliance", Scale], ["Expansion", Rocket],
    ]),
  ]),

  "country-head": make("country-head", "Country", "CO", "Country Admin",
    "Country operations, partners, revenue and local compliance.", "franchise", [
    group("Country", [
      ["Overview", Flag], ["Partners", Building2], ["Revenue", TrendingUp],
      ["Local Compliance", Scale], ["Teams", Users], ["Events", Calendar],
    ]),
  ]),

  "finance-manager": make("finance-manager", "Finance", "FN", "Finance Manager",
    "Ledger, invoices, payouts, wallets and financial controls.", "finance", [
    group("Finance", [
      ["Ledger", FileText], ["Invoices", Receipt], ["Payouts", Wallet],
      ["Wallets", Coins], ["Subscriptions", CreditCard], ["Taxes", Percent],
    ]),
    group("Control", [
      ["Budgets", Gauge], ["Reconciliation", ClipboardCheck], ["Audit Trail", ShieldCheck],
    ]),
  ]),

  "legal-manager": make("legal-manager", "Legal", "LG", "Legal Manager",
    "Contracts, policies, disputes and regulatory compliance.", "marketplace", [
    group("Legal", [
      ["Contracts", FileSignature], ["Policies", FileText], ["Disputes", Scale],
      ["Compliance", ShieldCheck], ["Licenses", Key], ["Approvals", ClipboardCheck],
    ]),
  ]),

  "pro-manager": make("pro-manager", "Pro", "PM", "Pro Manager",
    "Pro plan accounts, entitlements, renewals and success.", "marketplace", [
    group("Pro Program", [
      ["Pro Accounts", Star], ["Entitlements", ShieldCheck], ["Renewals", Timer],
      ["Upgrades", Rocket], ["Success Plans", GraduationCap], ["Billing", CreditCard],
    ]),
  ]),

  "pro-user": make("pro-user", "Pro User", "PU", "Pro User Dashboard",
    "Your Pro workspace: subscriptions, usage, downloads and support.", "marketplace", [
    group("My Workspace", [
      ["My Products", Box], ["Subscription", CreditCard], ["Usage", Activity],
      ["Downloads", Boxes], ["Invoices", Receipt], ["Support", Headphones],
    ]),
  ]),

  "basic-user": make("basic-user", "Basic User", "BU", "Basic User Dashboard",
    "Your workspace: orders, downloads, profile and support.", "marketplace", [
    group("My Workspace", [
      ["My Orders", Receipt], ["Downloads", Boxes], ["Profile", UserCheck],
      ["Support", Headphones], ["Upgrade", Rocket],
    ]),
  ]),

  security: make("security", "Security", "SC", "Security Center",
    "Access control, sessions, threats and security audits.", "marketplace", [
    group("Security", [
      ["Access Control", Shield], ["Sessions", Activity], ["Threats", AlertTriangle],
      ["Audit Log", FileText], ["API Keys", Key], ["Policies", ShieldCheck],
    ]),
  ]),

  settings: make("settings", "Settings", "ST", "Platform Settings",
    "Global platform configuration, branding, and integrations.", "marketplace", [
    group("Configuration", [
      ["General", Settings], ["Branding", Sparkles], ["Integrations", Workflow],
      ["Email", Inbox], ["Localization", Globe2], ["Feature Flags", Flag],
    ]),
  ]),
};

export function getBlueprint(slug: string): ManagerBlueprint | null {
  return MANAGER_BLUEPRINTS[slug] ?? null;
}
