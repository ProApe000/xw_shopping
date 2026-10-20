import { getProduct } from "../../mock/products";
export type CartItem = { productId: string; option: string; quantity: number };
export type CartAction =
  | { type: "add"; item: CartItem }
  | { type: "quantity"; key: string; quantity: number }
  | { type: "remove"; key: string }
  | { type: "clear" };
export const itemKey = (item: Pick<CartItem, "productId" | "option">) =>
  `${item.productId}:${item.option}`;
export function validItem(value: unknown): value is CartItem {
  if (!value || typeof value !== "object") return false;
  const i = value as CartItem;
  const p = getProduct(i.productId);
  return (
    !!p &&
    p.stock > 0 &&
    Number.isInteger(i.quantity) &&
    i.quantity > 0 &&
    typeof i.option === "string" &&
    (p.options ? p.options.values.includes(i.option) : i.option === "")
  );
}
export function cartReducer(state: CartItem[], action: CartAction): CartItem[] {
  if (action.type === "clear") return [];
  if (action.type === "remove")
    return state.filter((i) => itemKey(i) !== action.key);
  if (action.type === "quantity")
    return state.map((i) => {
      if (itemKey(i) !== action.key || !Number.isInteger(action.quantity))
        return i;
      const other = state
        .filter((j) => j.productId === i.productId && itemKey(j) !== action.key)
        .reduce((n, j) => n + j.quantity, 0);
      return {
        ...i,
        quantity: Math.max(
          1,
          Math.min(action.quantity, getProduct(i.productId)!.stock - other),
        ),
      };
    });
  if (!validItem(action.item)) return state;
  const item = action.item;
  const p = getProduct(item.productId)!;
  const remaining =
    p.stock -
    state
      .filter((i) => i.productId === item.productId)
      .reduce((n, i) => n + i.quantity, 0);
  if (remaining <= 0) return state;
  const quantity = Math.min(item.quantity, remaining);
  return state.some((i) => itemKey(i) === itemKey(item))
    ? state.map((i) =>
        itemKey(i) === itemKey(item)
          ? { ...i, quantity: i.quantity + quantity }
          : i,
      )
    : [...state, { ...item, quantity }];
}
export function restoreCart(raw: string | null): CartItem[] {
  try {
    const parsed: unknown = JSON.parse(raw || "[]");
    return Array.isArray(parsed)
      ? parsed
          .filter(validItem)
          .reduce(
            (state, item) => cartReducer(state, { type: "add", item }),
            [] as CartItem[],
          )
      : [];
  } catch {
    return [];
  }
}
export const shippingFor = (subtotal: number) =>
  subtotal === 0 || subtotal >= 7500 ? 0 : 599;
export function cartTotals(items: CartItem[]) {
  const subtotal = items.reduce(
    (sum, i) => sum + (getProduct(i.productId)?.price || 0) * i.quantity,
    0,
  );
  const shipping = shippingFor(subtotal);
  return { subtotal, shipping, total: subtotal + shipping };
}
