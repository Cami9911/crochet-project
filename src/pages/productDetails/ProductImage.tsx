type Img = { src: string; srcset: string };

const SIZES = "(min-width: 992px) 25vw, 50vw";

const ProductImage: React.FC<{
  primary: Img;
  hover: Img;
  isHovered: boolean;
  alt: string;
  eager: boolean;
}> = ({ primary, hover, isHovered, alt, eager }) => {
  const hasHover = !!(hover.src || hover.srcset);

  return (
    <div className="relative bg-gray-100">
      {/* base layer — always visible */}
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
      {/* hover layer — always in DOM, fetched as it nears viewport, revealed via opacity */}
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
