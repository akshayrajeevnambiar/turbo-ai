export const retiredProductSlugs: string[];
export function isRetiredProduct(kind: unknown, slug: unknown): boolean;
export function isRetiredProductPath(value: unknown): boolean;
export function sanitizeRetiredText(value: unknown): string;
export function sanitizeRetiredMedia(value: unknown): string;
export function sanitizeRetiredMarkdown(value: unknown): string;
export function sanitizePublishedEntry<T extends object>(entry: T): T;
