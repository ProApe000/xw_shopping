import { cartTotals, itemKey } from "../../../store/cart/cart";
import type { CartItem } from "../../../store/cart/cart";
import { getProduct } from "../../../mock/products";
import { money } from "../../../utils/money";
import { ProductImage } from "../../../component";
export default function OrderSummary({ items }: { items: CartItem[] }) {
  const { subtotal, shipping, total } = cartTotals(items);
  return (
    <>
      <div className="order-items">
        {items.map((item) => {
          const p = getProduct(item.productId)!;
          return (
            <div className="order-item" key={itemKey(item)}>
              <div className="order-image">
                <ProductImage image={p.image} alt={p.name} />
                <span>{item.quantity}</span>
              </div>
              <div>
                <strong>{p.name}</strong>
                <p>{item.option || p.category}</p>
              </div>
              <span>{money(p.price * item.quantity)}</span>
            </div>
          );
        })}
      </div>
      <div className="order-totals">
        <div className="total-line">
          <span>Subtotal</span>
          <span>{money(subtotal)}</span>
        </div>
        <div className="total-line">
          <span>Demo shipping</span>
          <span>{shipping ? money(shipping) : "Free"}</span>
        </div>
        <div className="total-line grand-total">
          <span>
            Total <small>USD</small>
          </span>
          <span>{money(total)}</span>
        </div>
        <p className="fine-print">
          $5.99 shipping · free on $75+
          <br />
          Taxes are not calculated in this demo.
        </p>
      </div>
    </>
  );
}
