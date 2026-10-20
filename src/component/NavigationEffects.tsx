import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { products } from "../mock/products";
export default function NavigationEffects() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      requestAnimationFrame(() =>
        document
          .getElementById(hash.slice(1))
          ?.scrollIntoView({ behavior: "instant" }),
      );
    } else window.scrollTo({ top: 0, behavior: "instant" });
    document.getElementById("main-content")?.focus({ preventScroll: true });
  }, [pathname, hash]);
  useEffect(() => {
    document.title =
      pathname === "/checkout"
        ? "Checkout — Nest & Nomad"
        : pathname.startsWith("/products/")
          ? `${products.find((product) => `/products/${product.slug}` === pathname)?.name || "Product not found"} — Nest & Nomad`
          : "Nest & Nomad — Good things, everyday.";
  }, [pathname]);
  return null;
}
