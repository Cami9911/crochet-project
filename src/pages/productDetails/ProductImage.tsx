type Img = { src: string; srcset: string };

const SIZES = "(min-width: 992px) 25vw, 50vw";

// Reserve the same space the loaded image will occupy so the placeholder ->
// image swap doesn't shift layout. Set this to your product images' real
// aspect ratio (e.g. aspect-square, aspect-[3/4], aspect-[4/5]).
const ASPECT = "aspect-[3/4]";

const ProductImage: React.FC<{
  primary: Img;
  hover: Img;
  isHovered: boolean;
  alt: string;
  eager: boolean;
  canHover: boolean;
}> = ({ primary, hover, isHovered, alt, eager, canHover }) => {
  const hasPrimary = !!(primary.src || primary.srcset);
  const hasHover = canHover && !!(hover.src || hover.srcset);

  return (
    <div
      className={`relative bg-gray-100 ${
        hasPrimary ? "" : `${ASPECT} animate-pulse`
      }`}
    >
      {/* base layer — a plain gray box until the src resolves, so we never
          render <img src=""> (which paints the broken-image icon). */}
      {hasPrimary && (
        <img
          alt={alt}
          className="block w-full h-auto cursor-pointer"
          src={primary.src}
          srcSet={primary.srcset}
          sizes={SIZES}
          loading={eager ? "eager" : "lazy"}
          {...{ fetchpriority: eager ? "high" : "auto" }}
          decoding="async"
        />
      )}
      {/* hover layer — always in DOM once resolved, fetched as it nears
          viewport, revealed via opacity */}
      {hasHover && (
        <img
          alt=""
          aria-hidden
          className="absolute inset-0 w-full h-auto cursor-pointer transition-opacity duration-150 ease-out"
          style={{ opacity: isHovered ? 1 : 0 }}
          src={hover.src}
          srcSet={hover.srcset}
          sizes={SIZES}
          loading="lazy"
          decoding="async"
        />
      )}
    </div>
  );
};

export default ProductImage;
