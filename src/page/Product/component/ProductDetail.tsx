import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ArrowLeft,
  Check,
  ChevronRight,
  Package,
  ShoppingBag,
  Truck,
} from "lucide-react";
import { getProduct, products } from "../../../mock/products";
import { money } from "../../../utils/money";
import { useCart } from "../../../store/cart/CartContext";
import { ProductCard, ProductImage, Quantity } from "../../../component";
export default function ProductDetail({ id }: { id: string }) {
  const p = getProduct(id)!;
  const { items, dispatch, setOpen } = useCart();
  const [option, setOption] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const location = useLocation();
  const savedReturn = (location.state as { returnTo?: string } | null)
    ?.returnTo;
  const returnTo =
    savedReturn?.startsWith("/?") || savedReturn === "/#collection"
      ? savedReturn
      : "/#collection";
  const remaining =
    p.stock -
    items
      .filter((i) => i.productId === p.id)
      .reduce((n, i) => n + i.quantity, 0);
  const canAdd = remaining > 0 && (!p.options || !!option);
  const actualQuantity = Math.max(1, Math.min(quantity, remaining));
  useEffect(() => {
    if (!added) return;
    const timer = window.setTimeout(() => setAdded(false), 3000);
    return () => clearTimeout(timer);
  }, [added]);
  const add = () => {
    if (!canAdd) return;
    dispatch({
      type: "add",
      item: { productId: p.id, option, quantity: actualQuantity },
    });
    setAdded(true);
    setOpen(true);
  };
  const label = !p.stock
    ? "Back soon"
    : !remaining
      ? "All available items in your bag"
      : p.options && !option
        ? `Choose ${p.options.name.toLowerCase()}`
        : added
          ? "Added to your bag"
          : "Add to bag";
  return (
    <div className="detail-page wrap">
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link to={returnTo}>
          <ArrowLeft size={14} /> All goods
        </Link>
        <ChevronRight size={12} />
        <Link to={`/?category=${encodeURIComponent(p.category)}#collection`}>
          {p.category}
        </Link>
        <ChevronRight size={12} />
        <span>{p.name}</span>
      </nav>
      <div className="product-detail">
        <div className="detail-image">
          <ProductImage image={p.image} alt={p.name} eager />
          {p.badge && <span className="product-badge">{p.badge}</span>}
          <span className="image-caption">
            The Nest & Nomad everyday collection
          </span>
        </div>
        <div className="detail-copy">
          <span className="eyebrow">
            {p.category.toUpperCase()} / EVERYDAY, CONSIDERED
          </span>
          <h1>{p.name}</h1>
          <p className="detail-tagline">{p.subtitle}</p>
          <div className="detail-price">
            {money(p.price)} <span>USD</span>
          </div>
          <p className="detail-description">{p.description}</p>
          {p.options && (
            <fieldset className="variant-picker">
              <legend>
                {p.options.name}
                <span>{option || "Select an option"}</span>
              </legend>
              <div>
                {p.options.values.map((value) => (
                  <button
                    type="button"
                    key={value}
                    className={option === value ? "selected" : ""}
                    aria-pressed={option === value}
                    onClick={() => setOption(value)}
                  >
                    {value}
                    {option === value && <Check size={14} />}
                  </button>
                ))}
              </div>
            </fieldset>
          )}
          <div className={`stock-status ${!p.stock ? "unavailable" : ""}`}>
            <span />
            {!p.stock
              ? "Currently out of stock — a good thing worth waiting for."
              : remaining === 0
                ? "You have all available stock in your bag."
                : remaining <= 3
                  ? `Only ${remaining} left for your everyday.`
                  : "In stock and ready for your everyday."}
          </div>
          <div className="detail-purchase">
            <Quantity
              value={actualQuantity}
              max={remaining}
              onChange={setQuantity}
            />
            <button className="button primary" onClick={add} disabled={!canAdd}>
              {added ? <Check size={18} /> : <ShoppingBag size={18} />}
              {label}
            </button>
          </div>
          <div className="detail-delivery">
            <span>
              <Truck size={18} /> Demo shipping: $5.99 · free on $75+
            </span>
            <span>
              <Package size={18} /> Demo store · No actual payment or delivery
            </span>
          </div>
          <details className="product-disclosure" open>
            <summary>The little details</summary>
            <ul>
              {p.details.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
          </details>
          <details className="product-disclosure">
            <summary>Shipping & returns</summary>
            <p>
              This is a demonstration store. Shipping is simulated at $5.99 per
              order, or free for orders of $75 or more. No products are
              dispatched, and no payment or returns are processed.
            </p>
          </details>
        </div>
      </div>
      <div className="mobile-purchase">
        <div>
          <strong>{money(p.price)}</strong>
          <span>{option || p.name}</span>
        </div>
        <button className="button primary" disabled={!canAdd} onClick={add}>
          {label} <ShoppingBag size={17} />
        </button>
      </div>
      <section className="related">
        <div className="section-heading">
          <div>
            <span className="eyebrow">GOOD COMPANY</span>
            <h2>A few more everyday favorites.</h2>
          </div>
        </div>
        <div className="product-grid">
          {products
            .filter(
              (other) => other.id !== p.id && other.category === p.category,
            )
            .slice(0, 3)
            .map((other) => (
              <ProductCard key={other.id} product={other} returnTo={returnTo} />
            ))}
        </div>
      </section>
    </div>
  );
}
