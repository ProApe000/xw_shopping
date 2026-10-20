import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import { useCart } from "../store/cart/CartContext";
import Header from "./Header";
import Footer from "./Footer";
import CartDrawer from "./CartDrawer";
import NavigationEffects from "./NavigationEffects";
export default function SiteLayout({ children }: { children: ReactNode }) {
  const { open } = useCart();
  const content = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (content.current) content.current.inert = open;
  }, [open]);
  return (
    <>
      <div ref={content}>
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <Header />
        <NavigationEffects />
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
        <Footer />
      </div>
      <CartDrawer />
    </>
  );
}
