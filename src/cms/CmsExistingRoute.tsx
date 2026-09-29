import type { ReactNode } from "react";
import { cmsPublicEnabled } from "./client";
import { CmsNotFound, CmsUnavailable } from "./CmsContentPage";
import { CmsPageContext, usePublishedEntry } from "./hooks";
import type { ContentKind } from "./types";
import { useParams } from "react-router-dom";
import { CmsExtraContent } from "./CmsExtraContent";

export function CmsExistingRoute({ kind, slug, children, appendContent = true }: { kind: ContentKind; slug?: string; children: ReactNode; appendContent?: boolean }) {
  const params = useParams();
  const { entry, loading, failed } = usePublishedEntry(kind, slug || params.slug);
  if (cmsPublicEnabled && loading) return <main data-cms-loading className="min-h-screen bg-[#020617] pt-40 text-center text-slate-300">Loading…</main>;
  if (cmsPublicEnabled && failed) return <CmsUnavailable />;
  if (cmsPublicEnabled && !entry) return <CmsNotFound />;
  return <CmsPageContext.Provider value={entry}>{children}{appendContent && <CmsExtraContent entry={entry} />}</CmsPageContext.Provider>;
}
