import { Link, useRouterState } from "@tanstack/react-router";
import { MessageSquare } from "lucide-react";

/**
 * Floating entry point into the enterprise chat workspace.
 * Rendered on every dashboard/manager console — hidden on the public homepage
 * and inside the chat app itself.
 */
export function ChatLauncher() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const hidden =
    pathname === "/" ||
    pathname.startsWith("/chat") ||
    pathname.startsWith("/apply") ||
    pathname.startsWith("/verify") ||
    pathname.startsWith("/api");

  if (hidden) return null;

  return (
    <Link
      to="/chat"
      aria-label="Open team chat"
      className="fixed bottom-6 right-6 z-[60] inline-flex h-12 items-center gap-2 rounded-full px-4 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5 active:translate-y-0"
      style={{
        backgroundImage:
          "linear-gradient(120deg, oklch(0.6 0.2 275), oklch(0.66 0.17 300) 55%, oklch(0.84 0.15 80))",
        boxShadow: "0 18px 45px -18px oklch(0.6 0.2 275 / 0.65)",
      }}
    >
      <MessageSquare className="h-4 w-4" />
      <span className="hidden sm:inline">Team Chat</span>
    </Link>
  );
}
