import type { ReactNode } from "react";
import { cmsPublicEnabled } from "./client";
import { CmsNotFound, CmsUnavailable } from "./CmsContentPage";
import { CmsProductContext, usePublishedEntry } from "./hooks";

export function CmsProductRoute({ slug, children }: { slug: string; children: ReactNode }) {
  const { entry, loading, failed } = usePublishedEntry("product", slug);
  if (cmsPublicEnabled && loading) return <main data-cms-loading className="min-h-screen bg-[#020617] pt-40 text-center text-slate-300">Loading product…</main>;
  if (cmsPublicEnabled && failed) return <CmsUnavailable />;
  if (cmsPublicEnabled && !entry) return <CmsNotFound />;
  return <CmsProductContext.Provider value={entry}>{children}</CmsProductContext.Provider>;
}
