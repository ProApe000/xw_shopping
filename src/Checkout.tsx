import { useRef, useState } from "react";
import type { FormEvent } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CircleCheck,
  Info,
  LockKeyhole,
  ShoppingBag,
} from "lucide-react";
import { useCart } from "./CartContext";
import { cartTotals, itemKey } from "./cart";
import type { CartItem } from "./cart";
import { getProduct, money } from "./data";
import { ProductImage } from "./components/Shared";
type Field =
  | "firstName"
  | "lastName"
  | "email"
  | "address"
  | "apartment"
  | "city"
  | "state"
  | "zip";
const fields: {
  key: Field;
  label: string;
  autocomplete: string;
  placeholder: string;
  full?: boolean;
  optional?: boolean;
}[] = [
  {
    key: "firstName",
    label: "First name",
    autocomplete: "given-name",
    placeholder: "Alex",
  },
  {
    key: "lastName",
    label: "Last name",
    autocomplete: "family-name",
    placeholder: "Morgan",
  },
  {
    key: "email",
    label: "Email address",
    autocomplete: "email",
    placeholder: "alex@example.com",
    full: true,
  },
  {
    key: "address",
    label: "Street address",
    autocomplete: "address-line1",
    placeholder: "123 Oak Street",
    full: true,
  },
  {
    key: "apartment",
    label: "Apartment, suite, etc.",
    autocomplete: "address-line2",
    placeholder: "Apartment 4B",
    full: true,
    optional: true,
  },
  {
    key: "city",
    label: "City",
    autocomplete: "address-level2",
    placeholder: "Portland",
  },
  {
    key: "state",
    label: "State",
    autocomplete: "address-level1",
    placeholder: "Oregon",
  },
  {
    key: "zip",
    label: "ZIP code",
    autocomplete: "postal-code",
    placeholder: "97201",
  },
];
export default function Checkout() {
  const { items, dispatch, setOpen } = useCart();
  const [values, setValues] = useState<Record<Field, string>>({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    zip: "",
  });
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [order, setOrder] = useState<{ id: string; items: CartItem[] } | null>(
    null,
  );
  const submitted = useRef(false);
  const form = useRef<HTMLFormElement>(null);
  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!items.length || submitted.current) return;
    const nextErrors: Partial<Record<Field, string>> = {};
    fields.forEach((field) => {
      if (!field.optional && !values[field.key].trim())
        nextErrors[field.key] =
          `Please enter your ${field.label.toLowerCase()}.`;
    });
    if (
      values.email.trim() &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())
    )
      nextErrors.email = "Please enter a valid email address.";
    if (values.zip.trim() && !/^\d{5}(-\d{4})?$/.test(values.zip.trim()))
      nextErrors.zip = "Enter a 5-digit ZIP code, or ZIP+4.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      form.current
        ?.querySelector<HTMLInputElement>(
          `[name="${Object.keys(nextErrors)[0]}"]`,
        )
        ?.focus();
      return;
    }
    submitted.current = true;
    setOrder({
      id: `NN-${crypto.randomUUID().slice(0, 8).toUpperCase()}`,
      items: items.map((i) => ({ ...i })),
    });
    dispatch({ type: "clear" });
    setValues({
      firstName: "",
      lastName: "",
      email: "",
      address: "",
      apartment: "",
      city: "",
      state: "",
      zip: "",
    });
    window.scrollTo({ top: 0 });
    requestAnimationFrame(() =>
      document.getElementById("order-title")?.focus(),
    );
  };
  if (order)
    return (
      <section className="success-page wrap">
        <div className="success-icon">
          <Check size={32} />
        </div>
        <span className="eyebrow">A LITTLE SOMETHING TO LOOK FORWARD TO</span>
        <h1 id="order-title" tabIndex={-1}>
          Good things are in your bag.
        </h1>
        <p>
          Your demo order is complete. Thanks for taking a little wander with
          us.
        </p>
        <div className="demo-notice">
          <Info size={19} />
          <span>
            This was a simulated order. You have not been charged, nothing will
            be shipped, and no confirmation email will be sent.
          </span>
        </div>
        <div className="success-summary">
          <div className="success-order-heading">
            <span>Demo order</span>
            <strong>{order.id}</strong>
          </div>
          <OrderSummary items={order.items} />
        </div>
        <Link to="/" className="button primary">
          Keep exploring <ArrowRight size={18} />
        </Link>
      </section>
    );
  if (!items.length)
    return (
      <div className="page-empty wrap">
        <ShoppingBag size={45} strokeWidth={1} />
        <h1>Your next favorite is waiting.</h1>
        <p>Add a little something to your bag before checking out.</p>
        <Link className="button primary" to="/#collection">
          Explore all goods <ArrowRight size={18} />
        </Link>
      </div>
    );
  return (
    <div className="checkout-page wrap">
      <Link to="/#collection" className="back-link">
        <ArrowLeft size={15} /> Continue exploring
      </Link>
      <div className="checkout-heading">
        <span className="eyebrow">JUST ONE MORE LITTLE STEP</span>
        <h1>Make it yours.</h1>
        <p>Your everyday, a little more considered.</p>
      </div>
      <div className="checkout-grid">
        <div>
          <div className="demo-notice">
            <Info size={20} />
            <div>
              <strong>A practice checkout, from start to finish.</strong>
              <p>
                No payment, delivery, or email. Use sample details to explore —
                your address stays in this page only.
              </p>
            </div>
          </div>
          <form ref={form} onSubmit={submit} noValidate>
            <h2>Your details</h2>
            <p className="form-description">
              US shipping only in this demo. All fields required unless marked
              optional.
            </p>
            <div className="form-grid">
              {fields.map((field) => (
                <div
                  key={field.key}
                  className={`form-field ${field.full ? "field-full" : ""}`}
                >
                  <label htmlFor={field.key}>
                    {field.label}
                    {field.optional && <span> (optional)</span>}
                  </label>
                  <input
                    id={field.key}
                    name={field.key}
                    type={field.key === "email" ? "email" : "text"}
                    autoComplete={field.autocomplete}
                    inputMode={field.key === "zip" ? "numeric" : undefined}
                    required={!field.optional}
                    placeholder={field.placeholder}
                    value={values[field.key]}
                    aria-invalid={!!errors[field.key]}
                    aria-describedby={
                      errors[field.key] ? `${field.key}-error` : undefined
                    }
                    onChange={(e) => {
                      setValues({ ...values, [field.key]: e.target.value });
                      if (errors[field.key])
                        setErrors({ ...errors, [field.key]: undefined });
                    }}
                  />
                  {errors[field.key] && (
                    <span id={`${field.key}-error`} className="field-error">
                      {errors[field.key]}
                    </span>
                  )}
                </div>
              ))}
              <div className="form-field">
                <label htmlFor="country">Country</label>
                <input
                  id="country"
                  value="United States"
                  readOnly
                  autoComplete="country-name"
                />
              </div>
            </div>
            <div className="checkout-shipping">
              <TruckIcon />
              <div>
                <strong>Standard demo shipping</strong>
                <p>
                  {cartTotals(items).shipping
                    ? "$5.99 · Free on orders $75+"
                    : "Free · Your order is $75+"}
                </p>
              </div>
              <CircleCheck size={19} />
            </div>
            <button className="button primary full" type="submit">
              Place demo order <ArrowRight size={18} />
            </button>
            <p className="fine-print">
              <LockKeyhole size={13} /> No payment details needed. No actual
              order is placed.
            </p>
          </form>
        </div>
        <aside className="checkout-summary">
          <div className="summary-heading">
            <h2>Your good finds</h2>
            <button className="text-button" onClick={() => setOpen(true)}>
              Edit bag
            </button>
          </div>
          <OrderSummary items={items} />
        </aside>
      </div>
    </div>
  );
}
function TruckIcon() {
  return <ShoppingBag size={24} strokeWidth={1.5} />;
}
function OrderSummary({ items }: { items: CartItem[] }) {
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
