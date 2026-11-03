import { useEffect, useState } from "react";
import { cmsClient, cmsPublicEnabled } from "./client";
import { sanitizeRetiredMedia, sanitizeRetiredText } from "../content/retiredProducts.mjs";

interface SiteSettings { siteName: string; defaultOg: string }
const fallback: SiteSettings = { siteName: "Turbo AI", defaultOg: "" };
let cached: Promise<SiteSettings> | null = null;

export function useCmsSiteSettings() {
  const [settings, setSettings] = useState(fallback);
  useEffect(() => {
    if (!cmsPublicEnabled || !cmsClient) return;
    cached ||= (async () => {
      const { data, error } = await cmsClient.from("cms_settings").select("key,value")
        .in("key", ["site_name", "default_og_image"]);
        if (error) throw error;
        return (data ?? []).reduce((current, row) => {
          if (row.key === "site_name") current.siteName = sanitizeRetiredText(row.value) || fallback.siteName;
          if (row.key === "default_og_image") current.defaultOg = sanitizeRetiredMedia(row.value);
          return current;
        }, { ...fallback });
      })().catch(() => fallback);
    void cached.then(setSettings);
  }, []);
  return settings;
}
