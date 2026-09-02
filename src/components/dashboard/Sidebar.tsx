import { memo } from "react";
import { Home, Compass, Layers, FolderOpen, Settings, LifeBuoy, LogOut, Sparkles, Calculator, MessagesSquare } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import logoAsset from "@/assets/dashboardLogoAsset";
import type { RoleConfig } from "@/lib/roles";
import { signOut } from "@/lib/auth-bridge";
import { notifyPending } from "@/lib/ui-actions";
import { cn } from "@/lib/utils";
import { RESELLER_CENTER_ORDER, RESELLER_CENTERS } from "@/lib/reseller-extras";

type Props = {
  role: RoleConfig;
  activeModule: string | null;
  onSelectModule: (key: string | null) => void;
};

function SidebarBase({ role, activeModule, onSelectModule }: Props) {
  const navigate = useNavigate();
  async function handleLogout() {
    await signOut();
    navigate({ to: "/", replace: true });
  }

  const isReseller = role.key === "reseller";

  return (
    <aside className="sv-rail hidden lg:flex w-64 shrink-0 flex-col text-sidebar-foreground">
      <div className="px-5 pt-5 pb-4 border-b border-[oklch(0.8_0.12_265_/_0.22)]">

        <div className="flex items-center gap-3">
          <span className="logo-3d h-11 w-11 shrink-0 block">
            <img
              src={logoAsset.url}
              alt="Software Vala"
              className="h-full w-full rounded-full object-cover"
              draggable={false}
            />
          </span>
          <div className="min-w-0">
            <div className="text-sm font-bold tracking-tight leading-tight truncate">
              Software Vala<span className="text-[oklch(0.55_0.22_25)]">™</span>
            </div>
            <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground truncate">
              {role.title}
            </div>
          </div>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto scrollbar-thin px-3 py-4 space-y-6" aria-label="Dashboard navigation">
        <Section title="Menu">
          <NavItem icon={Home} label="Dashboard" active={activeModule === null} onClick={() => onSelectModule(null)} />
          {isReseller && (
            <NavItem icon={Calculator} label="Pricing Engine" active={activeModule === "pricing"} onClick={() => onSelectModule("pricing")} accent />
          )}
          <NavItem icon={Sparkles} label="AI Chat" active={activeModule === "ai-chat"} onClick={() => onSelectModule("ai-chat")} accent />
          <NavItem icon={MessagesSquare} label="Team Chat" onClick={() => navigate({ to: "/chat" })} />
          <NavItem icon={Compass} label="Explore" onClick={() => navigate({ to: "/" })} />
          <NavItem icon={Layers} label="Marketplace" onClick={() => navigate({ to: "/" })} />
          <NavItem
            icon={FolderOpen}
            label="Library"
            onClick={() => onSelectModule(role.modules[0]?.key ?? null)}
          />
        </Section>

        <Section title={`${role.name} Modules`}>
          {role.modules.map((m) => (
            <NavItem
              key={m.key}
              icon={m.icon}
              label={m.label}
              active={activeModule === m.key}
              onClick={() => onSelectModule(m.key)}
            />
          ))}
        </Section>

        {isReseller && (
          <Section title="Reseller Centers">
            {RESELLER_CENTER_ORDER.map((k) => {
              const c = RESELLER_CENTERS[k];
              const key = `center:${k}`;
              return (
                <NavItem
                  key={k}
                  icon={c.icon}
                  label={c.label}
                  active={activeModule === key}
                  onClick={() => onSelectModule(key)}
                />
              );
            })}
          </Section>
        )}

        <Section title="Account">
          <NavItem
            icon={Settings}
            label="Settings"
            onClick={() =>
              onSelectModule(
                role.modules.find((m) => /setting|config|profile/i.test(m.label))?.key ?? null,
              )
            }
          />
          <NavItem
            icon={LifeBuoy}
            label="Support"
            onClick={() =>
              onSelectModule(
                role.modules.find((m) => /support|ticket|help/i.test(m.label))?.key ?? "ai-chat",
              )
            }
          />
          <NavItem icon={LogOut} label="Logout" onClick={handleLogout} />
        </Section>
      </nav>

      <div className="m-3 rounded-xl bg-gradient-brand p-4 text-brand-foreground shadow-glow">
        <div className="text-xs uppercase tracking-wider opacity-80">Upgrade</div>
        <div className="mt-1 font-semibold">Go Pro</div>
        <p className="mt-1 text-xs opacity-80">Unlock advanced analytics & AI tools.</p>
        <button
          type="button"
          onClick={() => notifyPending("Upgrade to Pro", "Plan upgrades run through your existing Software Vala billing account.")}
          className="press-3d focus-ring mt-3 w-full rounded-lg bg-white/15 hover:bg-white/25 transition text-xs font-medium py-2"
        >
          Upgrade now
        </button>
      </div>
    </aside>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  const id = `sv-nav-${title.replace(/\s+/g, "-").toLowerCase()}`;
  return (
    <section aria-labelledby={id}>
      <h2 id={id} className="px-3 pb-2 text-[10px] font-semibold tracking-[0.18em] text-muted-foreground uppercase">
        {title}
      </h2>
      <div className="space-y-1">{children}</div>
    </section>
  );
}

function NavItem({
  icon: Icon, label, active, onClick, accent,
}: { icon: any; label: string; active?: boolean; onClick?: () => void; accent?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      data-active={active ? "true" : "false"}
      aria-current={active ? "page" : undefined}
      className={cn(
        "sv-navitem group focus-ring flex w-full items-center gap-3 rounded-xl px-2.5 py-2 text-sm",
        active ? "text-white font-semibold" : "text-sidebar-foreground/85 hover:text-foreground",
      )}
    >
      <span className="sv-chip grid h-7 w-7 shrink-0 place-items-center rounded-lg transition-transform duration-300 group-hover:scale-110">
        <Icon className="h-3.5 w-3.5" aria-hidden="true" />
      </span>
      <span className="truncate">{label}</span>
      {accent && !active && <Sparkles className="ml-auto h-3 w-3 text-[oklch(0.82_0.15_195)]" aria-hidden="true" />}
      {active && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_10px_2px_oklch(1_0_0/0.6)]" aria-hidden="true" />}
    </button>
  );
}


export const Sidebar = memo(SidebarBase) as typeof SidebarBase;
