import { Link, NavLink, useLocation } from "react-router-dom";
import { ArrowUpRight, Search, ShoppingBag } from "lucide-react";
import { useCart } from "../store/cart/CartContext";
import { Brand } from "./Brand";
export default function Header() {
  const { items, open, setOpen } = useCart();
  const location = useLocation();
  const count = items.reduce((sum, item) => sum + item.quantity, 0);
  return (
    <>
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
    </>
  );
}
