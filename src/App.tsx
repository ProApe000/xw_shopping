import { useEffect, useRef } from "react";
import { Link, NavLink, Route, Routes, useLocation } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Search, ShoppingBag } from "lucide-react";
import { useCart } from "./CartContext";
import { Brand } from "./components/Shared";
import CartDrawer from "./components/CartDrawer";
import Home from "./Home";
import ProductPage from "./ProductPage";
import Checkout from "./Checkout";
import { products } from "./data";
function NavigationEffects() {
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
export default function App() {
  const { items, open, setOpen } = useCart();
  const location = useLocation();
  const content = useRef<HTMLDivElement>(null);
  const count = items.reduce((sum, i) => sum + i.quantity, 0);
  useEffect(() => {
    if (content.current) content.current.inert = open;
  }, [open]);
  return (
    <>
      <div ref={content}>
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <div className="announcement">
          <span>Small things. Better days.</span>
          <span className="announcement-divider">/</span>
          <span>Free demo shipping on orders $75+</span>
          <ArrowUpRight size={13} />
        </div>
        <header className="site-header wrap">
          <Link to="/" aria-label="Nest and Nomad home">
            <Brand />
          </Link>
          <nav className="main-nav" aria-label="Main navigation">
            <NavLink
              to="/"
              end
              className={
                location.pathname === "/" && !location.search ? "active" : ""
              }
            >
              Shop all
            </NavLink>
            <Link
              to="/?category=Home#collection"
              className={
                new URLSearchParams(location.search).get("category") === "Home"
                  ? "active"
                  : ""
              }
            >
              Home
            </Link>
            <Link
              to="/?category=On+the+Go#collection"
              className={
                new URLSearchParams(location.search).get("category") ===
                "On the Go"
                  ? "active"
                  : ""
              }
            >
              On the Go
            </Link>
            <Link
              to="/?category=Workspace#collection"
              className={
                new URLSearchParams(location.search).get("category") ===
                "Workspace"
                  ? "active"
                  : ""
              }
            >
              Workspace
            </Link>
          </nav>
          <div className="header-actions">
            <Link
              to="/#collection"
              className="icon-button header-search"
              aria-label="Search collection"
              onClick={() =>
                setTimeout(
                  () => document.getElementById("product-search")?.focus(),
                  80,
                )
              }
            >
              <Search size={20} />
            </Link>
            <span className="header-action-divider" />
            <button
              className="bag-button"
              aria-label={`Open shopping bag, ${count} items`}
              aria-expanded={open}
              onClick={() => setOpen(true)}
            >
              <ShoppingBag size={20} />
              <span className="bag-label">Bag</span>
              <span className="bag-count">{count}</span>
            </button>
          </div>
        </header>
        <NavigationEffects />
        <main id="main-content" tabIndex={-1}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products/:slug" element={<ProductPage />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route
              path="*"
              element={
                <div className="page-empty wrap">
                  <span className="eyebrow">A LITTLE OFF THE BEATEN PATH</span>
                  <h1>Let's find your way home.</h1>
                  <p>
                    This page doesn't exist, but good things are just around the
                    corner.
                  </p>
                  <Link className="button primary" to="/">
                    Back to the collection <ArrowRight size={18} />
                  </Link>
                </div>
              }
            />
          </Routes>
        </main>
        <footer className="site-footer">
          <div className="footer-top wrap">
            <div>
              <Link to="/" aria-label="Nest and Nomad home">
                <Brand light />
              </Link>
              <p>Good things for wherever life takes you.</p>
            </div>
            <a href="/#our-story" className="footer-link">
              A more considered everyday <ArrowUpRight size={20} />
            </a>
          </div>
          <div className="footer-bottom wrap">
            <span>© {new Date().getFullYear()} Nest & Nomad</span>
            <span>Demo storefront · No real purchases</span>
            <span>
              United States <span className="footer-dot">·</span> USD $
            </span>
          </div>
        </footer>
      </div>
      <CartDrawer />
    </>
  );
}
