import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { Product } from "../types/product";
import { money } from "../utils/money";
import { ProductImage } from "./ProductImage";
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
