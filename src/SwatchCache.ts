import { useEffect, useState } from "react";

/**
 * Swatch cache (w200) for ColorSelectionWeb's color-variant thumbnails.
 *
 * Module-level cache shared across every mount: a swatch resolved once (on the
 * details page, or on a grid-card hover) is then available synchronously
 * everywhere else. `useSwatchUrl` reads it synchronously and falls back to an
 * on-demand `warmSwatch` when a swatch hasn't been seen yet.
 */

const swatchW200Loaders = import.meta.glob<string>(
  "/src/assets/*.{png,jpg,jpeg,webp}",
  { import: "default", query: { w: "200", format: "webp" } },
);

const swatchCache = new Map<string, string>();
const swatchInflight = new Map<string, Promise<string | undefined>>();

/** Synchronous read — returns the URL only if it has already been warmed. */
export function getSwatchUrl(filename?: string): string | undefined {
  return filename ? swatchCache.get(filename) : undefined;
}

/** Resolve (and byte-preload) one swatch, deduping concurrent calls. */
export function warmSwatch(filename?: string): Promise<string | undefined> {
  if (!filename) return Promise.resolve(undefined);

  const cached = swatchCache.get(filename);
  if (cached) return Promise.resolve(cached);

  const existing = swatchInflight.get(filename);
  if (existing) return existing;

  const loader = swatchW200Loaders[`/src/assets/${filename}`];
  if (!loader) return Promise.resolve(undefined);

  const p = loader()
    .then((url) => {
      swatchCache.set(filename, url);
      swatchInflight.delete(filename);
      // Preload the bytes so the real <img> paints with no network on hover.
      const img = new Image();
      img.decoding = "async";
      img.src = url;
      return url;
    })
    .catch(() => {
      swatchInflight.delete(filename);
      return undefined;
    });

  swatchInflight.set(filename, p);
  return p;
}

/** Read a swatch URL synchronously, warming it on demand if it wasn't prewarmed. */
export function useSwatchUrl(filename?: string): string | undefined {
  const [url, setUrl] = useState<string | undefined>(() =>
    getSwatchUrl(filename),
  );

  useEffect(() => {
    const cached = getSwatchUrl(filename);
    if (cached) {
      setUrl(cached);
      return;
    }
    let alive = true;
    warmSwatch(filename).then((u) => {
      if (alive) setUrl(u);
    });
    return () => {
      alive = false;
    };
  }, [filename]);

  return url;
}
