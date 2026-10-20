import { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Check, ShoppingBag, Truck, X } from "lucide-react";
import { useCart } from "../store/cart/CartContext";
import { cartTotals, itemKey } from "../store/cart/cart";
import { getProduct } from "../mock/products";
import { money } from "../utils/money";
import { ProductImage, Quantity } from "./index";
export default function CartDrawer() {
  const { open, setOpen, items, dispatch, storageWarning } = useCart();
  const dialog = useRef<HTMLDivElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const navigate = useNavigate();
  const { subtotal, shipping, total } = cartTotals(items);
  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButton.current?.focus();
    const keydown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "Tab") {
        const focusable = Array.from(
          dialog.current?.querySelectorAll<HTMLElement>(
            'button:not([disabled]), a[href], input, select, textarea, [tabindex="0"]',
          ) || [],
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };
    document.addEventListener("keydown", keydown);
    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener("keydown", keydown);
      requestAnimationFrame(() => {
        if (previous?.isConnected) previous.focus({ preventScroll: true });
      });
    };
  }, [open, setOpen]);
  if (!open) return null;
  return (
    <div className="cart-layer">
      <div className="cart-backdrop" onClick={() => setOpen(false)} />
      <div
        className="cart-drawer"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
        ref={dialog}
      >
        <div className="cart-header">
          <div>
            <span className="eyebrow">YOUR EVERYDAY FINDS</span>
            <h2 id="cart-title">
              Your bag{" "}
              <span>({items.reduce((sum, i) => sum + i.quantity, 0)})</span>
            </h2>
          </div>
          <button
            ref={closeButton}
            className="icon-button"
            aria-label="Close bag"
            onClick={() => setOpen(false)}
          >
            <X />
          </button>
        </div>
        {items.length ? (
          <>
            <div className="shipping-progress">
              <p>
                {subtotal >= 7500 ? (
                  <>
                    <Check size={16} /> Your demo order qualifies for free
                    shipping.
                  </>
                ) : (
                  <>
                    <Truck size={16} /> You're {money(7500 - subtotal)} away
                    from free shipping.
                  </>
                )}
              </p>
              <div>
                <span style={{ width: `${Math.min(100, subtotal / 75)}%` }} />
              </div>
            </div>
            <div className="cart-items">
              {items.map((item) => {
                const p = getProduct(item.productId)!;
                const max =
                  p.stock -
                  items
                    .filter(
                      (i) =>
                        i.productId === p.id && itemKey(i) !== itemKey(item),
                    )
                    .reduce((n, i) => n + i.quantity, 0);
                return (
                  <div className="cart-item" key={itemKey(item)}>
                    <Link
                      to={`/products/${p.slug}`}
                      onClick={() => setOpen(false)}
                    >
                      <ProductImage image={p.image} alt={p.name} />
                    </Link>
                    <div className="cart-item-content">
                      <Link
                        to={`/products/${p.slug}`}
                        onClick={() => setOpen(false)}
                      >
                        {p.name}
                      </Link>
                      <p>{item.option || p.category}</p>
                      <strong>{money(p.price * item.quantity)}</strong>
                      <div className="cart-item-actions">
                        <Quantity
                          value={item.quantity}
                          max={max}
                          label={`${p.name} quantity`}
                          onChange={(quantity) =>
                            dispatch({
                              type: "quantity",
                              key: itemKey(item),
                              quantity,
                            })
                          }
                        />
                        <button
                          className="text-button"
                          onClick={() =>
                            dispatch({ type: "remove", key: itemKey(item) })
                          }
                          aria-label={`Remove ${p.name}`}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="cart-bottom">
              <div className="total-line">
                <span>Subtotal</span>
                <span>{money(subtotal)}</span>
              </div>
              <div className="total-line muted">
                <span>Demo shipping</span>
                <span>{shipping ? money(shipping) : "Free"}</span>
              </div>
              <div className="total-line grand-total">
                <span>
                  Total <small>USD</small>
                </span>
                <span>{money(total)}</span>
              </div>
              <button
                className="button primary full"
                onClick={() => {
                  setOpen(false);
                  navigate("/checkout");
                }}
              >
                Continue to checkout <ArrowRight size={18} />
              </button>
              <p className="fine-print">
                Demo store · No payment or actual delivery
              </p>
            </div>
          </>
        ) : (
          <div className="empty-cart">
            <ShoppingBag size={42} strokeWidth={1} />
            <h3>A little room for good things.</h3>
            <p>
              Your bag is empty. Find something that makes your everyday a
              little better.
            </p>
            <button
              className="button primary"
              onClick={() => {
                setOpen(false);
                navigate("/#collection");
              }}
            >
              Explore the collection <ArrowRight size={17} />
            </button>
          </div>
        )}
        {storageWarning && (
          <p className="storage-warning" role="status">
            Your browser could not save your bag. It will last for this visit
            only.
          </p>
        )}
      </div>
    </div>
  );
}
