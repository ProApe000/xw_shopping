import { useState } from "react";
import { ArrowUpRight, Minus, Plus, ImageOff } from "lucide-react";
import { Link } from "react-router-dom";
import type { Product } from "../data";
import { money } from "../data";
export function Brand({ light = false }: { light?: boolean }) {
  return (
    <span className={`brand ${light ? "brand-light" : ""}`}>
      <span className="brand-mark" aria-hidden="true">
        ✳
      </span>
      <span>
        nest <span className="brand-amp">&</span> nomad
        <span className="brand-period">.</span>
      </span>
    </span>
  );
}
export function ProductImage({
  image,
  alt,
  className = "",
  eager = false,
}: {
  image: string;
  alt: string;
  className?: string;
  eager?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  return failed ? (
    <div className={`image-fallback ${className}`}>
      <ImageOff size={28} />
      <span>{alt}</span>
    </div>
  ) : (
    <img
      className={className}
      src={`/images/${image}.jpg`}
      alt={alt}
      loading={eager ? "eager" : "lazy"}
      onError={() => setFailed(true)}
    />
  );
}
export function Quantity({
  value,
  max,
  onChange,
  label = "Quantity",
}: {
  value: number;
  max: number;
  onChange: (n: number) => void;
  label?: string;
}) {
  return (
    <div className="quantity" role="group" aria-label={label}>
      <button
        type="button"
        aria-label={`Decrease ${label.toLowerCase()}`}
        disabled={value <= 1}
        onClick={() => onChange(value - 1)}
      >
        <Minus size={14} />
      </button>
      <span aria-live="polite">{value}</span>
      <button
        type="button"
        aria-label={`Increase ${label.toLowerCase()}`}
        disabled={value >= max}
        onClick={() => onChange(value + 1)}
      >
        <Plus size={14} />
      </button>
    </div>
  );
}
export function ProductCard({
  product,
  returnTo,
}: {
  product: Product;
  returnTo: string;
}) {
  return (
    <article className="product-card">
      <Link
        to={`/products/${product.slug}`}
        state={{ returnTo }}
        className="product-photo"
        aria-label={`View ${product.name}`}
      >
        <ProductImage image={product.image} alt={product.name} />
        {product.badge && (
          <span className={`product-badge ${!product.stock ? "sold-out" : ""}`}>
            {product.badge}
          </span>
        )}
        <span className="product-arrow">
          <ArrowUpRight size={20} />
        </span>
      </Link>
      <div className="product-meta">
        <span>{product.category}</span>
        {product.options && (
          <span>{product.options.values.length} options</span>
        )}
      </div>
      <div className="product-title-row">
        <h3>
          <Link to={`/products/${product.slug}`} state={{ returnTo }}>
            {product.name}
          </Link>
        </h3>
        <span>{money(product.price)}</span>
      </div>
      <p>{product.subtitle}</p>
    </article>
  );
}
