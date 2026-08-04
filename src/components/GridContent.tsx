import { Row, Col, Pagination, Breadcrumb } from "antd";
import { Content } from "antd/es/layout/layout";
import ControlFilters from "./filters/ControlFilters";
import { routeToFilter } from "./sidemenu/SideMenuFilters";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useSetAtom } from "jotai";
import {
  selectedColorAtom,
  selectedProductAtom,
  totalResultsAtom,
} from "../storageAtoms";
import { products } from "../productData";
import { productType } from "../types";
import { colors } from "./filters/filtersData";
import ColorSelectionWeb from "../pages/productDetails/ColorSelectionWeb";
import { ro } from "../translations";
import { capitalizeFirst, useCanHover } from "../useFunctions";
import ProductImage from "../pages/productDetails/ProductImage";
import {
  useProductImages,
  usePrewarmSwatches,
  EMPTY,
  type Img,
} from "../imageLoaders";

// How many cards resolve their images immediately, and how many more are
// revealed each time the scroll sentinel comes into view.
const INITIAL_COUNT = 8;
const BATCH = 8;

// Module-level so it survives GridContent unmount (grid -> details -> back).
// Keyed by the current view (filters + page) so returning to the same view
// restores how far you'd scrolled/revealed, but navigating to a different
// view starts fresh.
const gridViewState: { key: string; activeCount: number; scrollY: number } = {
  key: "",
  activeCount: INITIAL_COUNT,
  scrollY: 0,
};

const GridContent: React.FC = () => {
  const canHover = useCanHover();

  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [hoveredProductKey, setHoveredProductKey] = useState<string | null>(
    null,
  );
  const pageSize = 20;
  const currentPage = Number(searchParams.get("page")) || 1;

  const setCurrentPage = (page: number) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (page <= 1) next.delete("page");
      else next.set("page", String(page));
      return next;
    });
  };

  const setTotalResults = useSetAtom(totalResultsAtom);
  const setSelectedProduct = useSetAtom(selectedProductAtom);
  const setSelectedColor = useSetAtom(selectedColorAtom);

  const { pathname } = useLocation();

  const selectedColors = searchParams.getAll("color");
  const selectedSizes = searchParams.getAll("size");
  const selectedHandles = searchParams.getAll("handle");
  const selectedStyles = searchParams.getAll("style");
  const selectedStock = searchParams.getAll("stock");
  const selectedCategories = searchParams.getAll("category");
  const selectedSort = searchParams.get("sort");

  const filteredProducts = useMemo(() => {
    const routePredicate = routeToFilter[pathname] ?? (() => true);

    const result = products.filter((p) => {
      const okRoute = routePredicate(p);

      const filterColors =
        selectedColors.length === 0 || selectedColors.includes(p.color);

      const filterSizes =
        selectedSizes.length === 0 || selectedSizes.includes(p.size);

      const filterHandles =
        selectedHandles.length === 0 || selectedHandles.includes(p.handle);

      const filterStyles =
        selectedStyles.length === 0 || selectedStyles.includes(p.style);

      const filterStock =
        selectedStock.length === 0 || selectedStock.includes(p.stock);

      const filterCategories =
        selectedCategories.length === 0 ||
        selectedCategories.includes(p.category);

      return (
        okRoute &&
        filterColors &&
        filterSizes &&
        filterHandles &&
        filterStyles &&
        filterStock &&
        filterCategories
      );
    });

    if (selectedSort === "newest") {
      const toTime = (d?: string) => {
        if (!d) return 0;
        const [day, month, year] = d.split(".").map(Number);
        return new Date(year, month - 1, day).getTime();
      };
      result.sort((a, b) => toTime(b.date) - toTime(a.date));
    }

    return result;
  }, [
    pathname,
    selectedColors,
    selectedSizes,
    selectedHandles,
    selectedStyles,
    selectedStock,
    selectedCategories,
    selectedSort,
  ]);

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredProducts.slice(start, start + pageSize);
  }, [filteredProducts, currentPage]);

  const filtersKey = useMemo(() => {
    const p = new URLSearchParams(searchParams);
    p.delete("page");
    return `${pathname}?${p.toString()}`;
  }, [pathname, searchParams]);

  // Identifies "this exact view". Same key on remount => back-navigation, so
  // we restore. Different key => real page/filter change, so we reset.
  const viewKey = `${filtersKey}|page=${currentPage}`;

  // --- Lazy reveal ----------------------------------------------------------
  // Only the first `activeCount` cards render (and therefore only their images
  // resolve). A sentinel after the last active card grows this as the user
  // scrolls, so images beyond the first 8 aren't transformed/fetched until
  // they're approached. Seeded from the module store so a return visit keeps
  // however many were already revealed.
  const [activeCount, setActiveCount] = useState(() =>
    gridViewState.key === viewKey ? gridViewState.activeCount : INITIAL_COUNT,
  );

  // Keep the module store in sync with the live value.
  useEffect(() => {
    gridViewState.key = viewKey;
    gridViewState.activeCount = activeCount;
  }, [viewKey, activeCount]);

  // Reset ONLY on a genuine view change (not on remount). On the first render
  // prevViewKey === viewKey, so back-navigation doesn't trip this.
  const prevViewKey = useRef(viewKey);
  useEffect(() => {
    if (prevViewKey.current !== viewKey) {
      prevViewKey.current = viewKey;
      setActiveCount(INITIAL_COUNT);
      gridViewState.scrollY = 0;
      window.scrollTo(0, 0);
    }
  }, [viewKey]);

  // Restore scroll position on mount when returning to the same view.
  const mountViewKey = useRef(viewKey);
  useLayoutEffect(() => {
    if (
      gridViewState.key === mountViewKey.current &&
      gridViewState.scrollY > 0
    ) {
      window.scrollTo(0, gridViewState.scrollY);
    }
    // Run once on mount only.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const activeProducts = useMemo(
    () => paginatedProducts.slice(0, activeCount),
    [paginatedProducts, activeCount],
  );

  const sentinelRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    if (activeCount >= paginatedProducts.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setActiveCount((c) => Math.min(c + BATCH, paginatedProducts.length));
        }
      },
      // Start loading the next batch ~200px before the sentinel is on screen.
      { rootMargin: "200px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [activeCount, paginatedProducts.length]);

  // Only the filenames of ACTIVE cards. Hover image skipped when !canHover,
  // so on mobile it's never transformed or fetched.
  const wantedFilenames = useMemo(() => {
    const out: string[] = [];
    activeProducts.forEach((p) => {
      if (p.firstImage) out.push(p.firstImage);
      if (canHover && p.secondImage) out.push(p.secondImage);
    });
    return out;
  }, [activeProducts, canHover]);

  const imgMap = useProductImages(wantedFilenames);
  const getImg = (filename?: string): Img =>
    (filename && imgMap[filename]) || EMPTY;

  // Prewarm the swatches ColorSelectionWeb will show on hover, so they are
  // cached before any card is hovered (no fetch waterfall / pop-in). Matches
  // ColorSelectionWeb: family is resolved from the full `products` list, so
  // off-page color variants are included. Only warms swatches for ACTIVE cards,
  // so it grows with the scroll reveal rather than warming the whole page up
  // front. Skipped entirely when !canHover, since the swatch overlay only ever
  // appears on hover-capable devices.
  const swatchPrewarmFilenames = useMemo(() => {
    if (!canHover) return [];

    const seenFamily = new Set<string>();
    const seenFile = new Set<string>();
    const out: string[] = [];

    activeProducts.forEach((p) => {
      const uniqueID = p.key.split("F00")[0];
      if (seenFamily.has(uniqueID)) return;
      seenFamily.add(uniqueID);

      products
        .filter((v) => v.key.split("F00")[0] === uniqueID)
        .forEach((v) => {
          if (v.firstImage && !seenFile.has(v.firstImage)) {
            seenFile.add(v.firstImage);
            out.push(v.firstImage);
          }
        });
    });

    return out;
  }, [activeProducts, canHover]);

  usePrewarmSwatches(swatchPrewarmFilenames);

  const goToDetails = (key: string) => {
    // Save scroll position before leaving so we can restore it on the way back.
    gridViewState.scrollY = window.scrollY;

    const product = products.find((p) => p.key === key) ?? null;
    setSelectedProduct(product);
    setSelectedColor(product?.color);

    navigate(`/product-details/${key}`);
    window.scrollTo(0, 0);
  };

  const prevFiltersKey = useRef(filtersKey);
  useEffect(() => {
    if (prevFiltersKey.current !== filtersKey) {
      prevFiltersKey.current = filtersKey;

      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          next.delete("page");
          return next;
        },
        { replace: true },
      );
    }
  }, [filtersKey, setSearchParams]);

  useEffect(() => {
    setTotalResults(filteredProducts.length);
  }, [filteredProducts.length, setTotalResults]);

  return (
    <Content className="relative px-0.5">
      <ControlFilters />
      {(selectedCategories.length > 0 || pathname !== "/") && (
        <Breadcrumb
          separator=">"
          className="py-2! sm:mb-6! px-4! sm:px-2! md:px-12! xl:px-40!"
          items={[
            {
              title: <a href="/">{"<"} Toate produsele</a>,
            },
          ]}
        />
      )}
      <Row gutter={{ xs: 4, sm: 4, md: 4, lg: 4, xl: 16 }} className="">
        {activeProducts?.map(
          (
            { key, firstImage, secondImage, style, color, category, name },
            index,
          ) => {
            const isHovered = canHover && hoveredProductKey === key;

            const primary = getImg(firstImage);
            const second = getImg(secondImage);

            const uniqueID = key?.split("F00")[0];

            const productColors = uniqueID
              ? filteredProducts
                  .filter((p) => p.key.split("F00")[0] === uniqueID)
                  .map((p: productType) => p.color)
              : [];

            return (
              <Col
                className="gutter-row mb-4 lg:min-h-90! xl:min-h-97.5! 2xl:min-h-132.5!"
                span={12}
                lg={{ span: 6 }}
                key={key}
                onClick={() => goToDetails(key)}
                onMouseEnter={
                  canHover ? () => setHoveredProductKey(key) : undefined
                }
                onMouseLeave={
                  canHover ? () => setHoveredProductKey(null) : undefined
                }
              >
                <ProductImage
                  primary={primary}
                  hover={second}
                  isHovered={isHovered}
                  canHover={canHover}
                  alt={name ?? "product"}
                  eager={index < 4}
                />
                <div className="pl-3 lg:pl-0">
                  {name ? (
                    <p className="font-semibold">{name}</p>
                  ) : (
                    <p className="font-semibold">
                      {capitalizeFirst(ro.categories[category])}{" "}
                      {ro.styles[style]}
                    </p>
                  )}

                  {isHovered ? (
                    <ColorSelectionWeb
                      hoverProductKey={hoveredProductKey || ""}
                    />
                  ) : (
                    <>
                      <div className="mt-2">
                        Culoare · {capitalizeFirst(ro.colors[color])}
                      </div>
                      <div className="mt-2 flex items-center gap-1">
                        {productColors?.map((color: string, index: number) => {
                          const colorCode = colors.find(
                            (c) => c.name === color,
                          )?.code;

                          return (
                            <span
                              key={index}
                              className="inline-block h-3 w-3 rounded-full border border-gray-300 cursor-pointer"
                              style={{ backgroundColor: colorCode }}
                            />
                          );
                        })}
                      </div>
                    </>
                  )}
                </div>
              </Col>
            );
          },
        )}
      </Row>

      {activeCount < paginatedProducts.length && (
        <div ref={sentinelRef} aria-hidden className="h-1 w-full" />
      )}

      <Pagination
        current={currentPage}
        total={filteredProducts.length}
        pageSize={pageSize}
        onChange={(page) => {
          setCurrentPage(page);
          window.scrollTo(0, 0);
        }}
        showSizeChanger={false}
        className="flex justify-center lg:justify-end"
      />
    </Content>
  );
};

export default GridContent;
