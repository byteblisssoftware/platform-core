import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/ams-manager/role-manager")({
  component: () => <Outlet />,
});
