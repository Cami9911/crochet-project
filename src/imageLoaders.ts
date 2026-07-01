import { useEffect, useState } from "react";

export type Img = { src: string; srcset: string };
export const EMPTY: Img = { src: "", srcset: "" };

// ---- Lazy globs (NO `eager`) ----------------------------------------------
// Each glob returns a map of loader FUNCTIONS. Nothing is transformed by sharp
// until a loader is actually called. One glob per distinct query shape used in
// the app. Absolute "/src/assets" paths so this works regardless of where the
// importing component lives.

// Multi-width srcset for grid cards
const srcsetGlob = import.meta.glob<string>(
  "/src/assets/*.{png,jpg,jpeg,webp}",
  {
    import: "default",
    query: { w: "300;500;800;1200", format: "webp", as: "srcset" },
  },
);

// Mid-width single src (the <img src> fallback for grid cards)
const fallbackGlob = import.meta.glob<string>(
  "/src/assets/*.{png,jpg,jpeg,webp}",
  { import: "default", query: { w: "500", format: "webp" } },
);

// Thumbnail single src (mobile color selector)
const thumbGlob = import.meta.glob<string>(
  "/src/assets/*.{png,jpg,jpeg,webp}",
  { import: "default", query: { w: "400", format: "webp" } },
);

// Small swatch single src (web color selector)
const swatchGlob = import.meta.glob<string>(
  "/src/assets/*.{png,jpg,jpeg,webp}",
  { import: "default", query: { w: "200", format: "webp" } },
);

// Large detail image single src (product detail main images, web)
const largeGlob = import.meta.glob<string>(
  "/src/assets/*.{png,jpg,jpeg,webp}",
  { import: "default", query: { w: "1400", format: "webp" } },
);

// Full detail image single src (product detail carousel, mobile)
const fullGlob = import.meta.glob<string>("/src/assets/*.{png,jpg,jpeg,webp}", {
  import: "default",
  query: { w: "1200", format: "webp" },
});

// Detail thumbnail single src (product detail gallery thumbs)
const detailThumbGlob = import.meta.glob<string>(
  "/src/assets/*.{png,jpg,jpeg,webp}",
  { import: "default", query: { w: "600", format: "webp" } },
);

// ---- filename -> loader maps ----------------------------------------------
type Loader = () => Promise<string>;

function byFilename(glob: Record<string, Loader>): Record<string, Loader> {
  const out: Record<string, Loader> = {};
  for (const path in glob) out[path.split("/").pop()!] = glob[path];
  return out;
}

const srcsetMap = byFilename(srcsetGlob);
const fallbackMap = byFilename(fallbackGlob);
const thumbMap = byFilename(thumbGlob);
const swatchMap = byFilename(swatchGlob);
const largeMap = byFilename(largeGlob);
const fullMap = byFilename(fullGlob);
const detailThumbMap = byFilename(detailThumbGlob);

// ---- Generic single-src resolver -------------------------------------------
function useSingleSrc(
  map: Record<string, Loader>,
  filenames: (string | undefined)[],
): Record<string, string> {
  const [resolved, setResolved] = useState<Record<string, string>>({});
  const key = filenames.filter(Boolean).join("|"); // stable dep

  useEffect(() => {
    let cancelled = false;
    const names = key ? key.split("|") : [];

    Promise.all(
      names.map(async (name) => {
        const loader = map[name];
        return [name, loader ? await loader() : ""] as const;
      }),
    ).then((entries) => {
      // merge so previously resolved srcs stay available (avoids blank flashes
      // when the requested set changes, e.g. on hover)
      if (!cancelled) {
        setResolved((prev) => ({ ...prev, ...Object.fromEntries(entries) }));
      }
    });

    return () => {
      cancelled = true;
    };
  }, [key, map]);

  return resolved;
}

// ---- Hooks -----------------------------------------------------------------

/** Grid cards: resolves { src, srcset } for each filename. */
export function useProductImages(
  filenames: (string | undefined)[],
): Record<string, Img> {
  const [map, setMap] = useState<Record<string, Img>>({});
  const key = filenames.filter(Boolean).join("|");

  useEffect(() => {
    let cancelled = false;
    const names = key ? key.split("|") : [];

    Promise.all(
      names.map(async (name) => {
        const ss = srcsetMap[name];
        const fb = fallbackMap[name];
        if (!ss || !fb) return [name, EMPTY] as const;
        const [src, srcset] = await Promise.all([fb(), ss()]);
        return [name, { src, srcset } as Img] as const;
      }),
    ).then((entries) => {
      if (!cancelled) {
        setMap((prev) => ({ ...prev, ...Object.fromEntries(entries) }));
      }
    });

    return () => {
      cancelled = true;
    };
  }, [key]);

  return map;
}

/** Mobile color selector: single 400px src per filename. */
export function useThumbnails(
  filenames: (string | undefined)[],
): Record<string, string> {
  return useSingleSrc(thumbMap, filenames);
}

/** Web color selector: single 200px src per filename. */
export function useSwatches(
  filenames: (string | undefined)[],
): Record<string, string> {
  return useSingleSrc(swatchMap, filenames);
}

/** Product detail main images (web): single 1400px src per filename. */
export function useLargeImages(
  filenames: (string | undefined)[],
): Record<string, string> {
  return useSingleSrc(largeMap, filenames);
}

/** Product detail carousel (mobile): single 1200px src per filename. */
export function useFullImages(
  filenames: (string | undefined)[],
): Record<string, string> {
  return useSingleSrc(fullMap, filenames);
}

/** Product detail gallery thumbnails: single 600px src per filename. */
export function useDetailThumbs(
  filenames: (string | undefined)[],
): Record<string, string> {
  return useSingleSrc(detailThumbMap, filenames);
}

// ---- Swatch prewarming -----------------------------------------------------
// Pull swatch bytes into the browser cache BEFORE a grid card is hovered, so
// ColorSelectionWeb's <img> hits cache and paints instantly instead of showing
// a fetch waterfall on first hover.
//
// This is safe to call broadly: swatches are 200px webp, so both the fetch and
// the decode are cheap. Note this is the OPPOSITE case to the large detail
// images, where prewarming didn't help — there the delay was decode latency,
// which a prefetch can't fix. Here the delay is purely the fetch, so prewarming
// removes it entirely.

const warmedSwatches = new Set<string>();

export async function prewarmSwatches(
  filenames: (string | undefined)[],
): Promise<void> {
  const names = filenames.filter((n): n is string => Boolean(n));

  await Promise.all(
    names.map(async (name) => {
      if (warmedSwatches.has(name)) return;
      const loader = swatchMap[name];
      if (!loader) return;
      warmedSwatches.add(name);
      try {
        const url = await loader(); // resolve hashed URL (caches the chunk too)
        const img = new Image();
        img.decoding = "async";
        img.src = url; // fetch into cache
        if (typeof img.decode === "function") {
          await img.decode().catch(() => {}); // decode into cache; ignore aborts
        }
      } catch {
        warmedSwatches.delete(name); // allow a retry on next call
      }
    }),
  );
}

/**
 * Prewarm swatches for the given filenames during idle time. Call this from a
 * grid card (which is always mounted) with the product's color-variant
 * firstImages, so the swatches are cached before the card is hovered.
 */
export function usePrewarmSwatches(filenames: (string | undefined)[]): void {
  const key = filenames.filter(Boolean).join("|");

  useEffect(() => {
    if (!key) return;
    const names = key.split("|");

    const ric: (cb: () => void) => number =
      (
        window as unknown as {
          requestIdleCallback?: (cb: () => void) => number;
        }
      ).requestIdleCallback ?? ((cb) => window.setTimeout(cb, 200));
    const cic: (handle: number) => void =
      (window as unknown as { cancelIdleCallback?: (handle: number) => void })
        .cancelIdleCallback ?? ((handle) => window.clearTimeout(handle));

    const handle = ric(() => {
      prewarmSwatches(names);
    });

    return () => cic(handle);
  }, [key]);
}
