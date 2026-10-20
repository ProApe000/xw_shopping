import { describe, it, expect } from "vitest";
import {
  cartReducer,
  cartTotals,
  restoreCart,
  itemKey,
  shippingFor,
} from "./cart";
import type { CartItem } from "./cart";
const mug: CartItem = { productId: "p1", option: "300 ml", quantity: 1 };
describe("cart and inventory", () => {
  it("merges matching variants and separates different variants", () => {
    let state = cartReducer([], { type: "add", item: mug });
    state = cartReducer(state, { type: "add", item: { ...mug, quantity: 2 } });
    state = cartReducer(state, {
      type: "add",
      item: { ...mug, option: "450 ml" },
    });
    expect(state).toEqual([
      { ...mug, quantity: 3 },
      { ...mug, option: "450 ml" },
    ]);
  });
  it("caps total inventory across variants when adding and changing quantity", () => {
    let state = cartReducer([], {
      type: "add",
      item: { ...mug, quantity: 10 },
    });
    state = cartReducer(state, {
      type: "add",
      item: { ...mug, option: "450 ml", quantity: 8 },
    });
    expect(state.map((i) => i.quantity)).toEqual([10, 2]);
    expect(
      cartReducer(state, { type: "quantity", key: itemKey(mug), quantity: 99 }),
    ).toEqual(state);
    expect(cartReducer(state, { type: "add", item: mug })).toEqual(state);
  });
  it("rejects missing variants, unknown products, invalid quantities and sold-out products", () => {
    for (const item of [
      { ...mug, option: "" },
      { ...mug, productId: "missing" },
      { ...mug, quantity: -1 },
      { ...mug, quantity: 1.5 },
      { productId: "p11", option: "", quantity: 1 },
    ])
      expect(cartReducer([], { type: "add", item })).toEqual([]);
  });
  it("keeps quantity positive, removes individual lines and clears checkout", () => {
    expect(
      cartReducer([mug], { type: "quantity", key: itemKey(mug), quantity: 0 }),
    ).toEqual([mug]);
    expect(cartReducer([mug], { type: "remove", key: itemKey(mug) })).toEqual(
      [],
    );
    expect(cartReducer([mug], { type: "clear" })).toEqual([]);
  });
  it("recovers from corrupt storage and sanitizes restored inventory", () => {
    expect(restoreCart("broken")).toEqual([]);
    expect(restoreCart('{"unexpected":true}')).toEqual([]);
    expect(
      restoreCart(
        JSON.stringify([
          null,
          { ...mug, quantity: 9 },
          { ...mug, quantity: 9 },
          { productId: "p11", option: "", quantity: 1 },
        ]),
      ),
    ).toEqual([{ ...mug, quantity: 12 }]);
  });
});
describe("integer-cent pricing", () => {
  it("does not charge shipping for an empty bag", () =>
    expect(cartTotals([])).toEqual({ subtotal: 0, shipping: 0, total: 0 }));
  it("charges $5.99 below $75 and sums quantities", () =>
    expect(cartTotals([{ ...mug, quantity: 3 }])).toEqual({
      subtotal: 7200,
      shipping: 599,
      total: 7799,
    }));
  it("offers free shipping at exactly $75, but not one cent below", () => {
    expect(shippingFor(7500)).toBe(0);
    expect(shippingFor(7499)).toBe(599);
  });
  it("offers free shipping above the threshold", () =>
    expect(cartTotals([{ ...mug, quantity: 4 }])).toEqual({
      subtotal: 9600,
      shipping: 0,
      total: 9600,
    }));
});
