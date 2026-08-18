import { createFileRoute, redirect } from "@tanstack/react-router";

import { ManagerWorkspace, type SectionEntry } from "@/components/manager-suite/ManagerWorkspace";
import { makeWall } from "@/components/manager-suite/makeWall";
import { getBlueprint, type ManagerBlueprint } from "@/components/manager-suite/genericManagers";

function buildRegistry(bp: ManagerBlueprint): Record<string, SectionEntry> {
  const out: Record<string, SectionEntry> = {};
  const console = makeWall({
    scope: `${bp.slug}-command-console`,
    entity: "item",
    eyebrow: bp.brand,
    title: `${bp.title} — Command Console`,
    subtitle: bp.subtitle,
    icon: bp.primary[0]!.icon,
  });
  out["Command Console"] = console;
  out["Dashboard"] = console;

  for (const group of bp.groups) {
    for (const item of group.items) {
      if (out[item.label]) continue;
      out[item.label] = makeWall({
        scope: `${bp.slug}-${item.label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
        entity: "record",
        eyebrow: group.label,
        title: item.label,
        subtitle: `${item.label} operations for ${bp.title} — create, filter, act and export.`,
        icon: item.icon,
      });
    }
  }
  return out;
}

export const Route = createFileRoute("/manager/$slug")({
  beforeLoad: ({ params }) => {
    if (!getBlueprint(params.slug)) throw redirect({ to: "/control-panel" });
  },
  head: ({ params }) => {
    const bp = getBlueprint(params.slug);
    const title = bp ? `${bp.title} — Software Vala` : "Manager — Software Vala";
    const description = bp?.subtitle ?? "Software Vala manager console.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: GenericManagerPage,
});

function GenericManagerPage() {
  const { slug } = Route.useParams();
  const bp = getBlueprint(slug)!;
  const registry = buildRegistry(bp);

  return (
    <ManagerWorkspace
      key={bp.slug}
      primary={bp.primary}
      groups={bp.groups}
      registry={registry}
      brand={bp.brand}
      brandMark={bp.brandMark}
      initial="Command Console"
      role={bp.execRole}
    />
  );
}
