import "./style.css";
import Hero from "./component/Hero";
import Story from "./component/Story";
import { useMemo, useRef } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import {
  ArrowRight,
  BriefcaseBusiness,
  House,
  Leaf,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { categories, products } from "../../mock/products";
import { ProductCard } from "../../component";
export default function Home() {
  const [params, setParams] = useSearchParams();
  const location = useLocation();
  const input = useRef<HTMLInputElement>(null);
  const query = params.get("q") || "";
  const category =
    categories.find((c) => c === params.get("category")) || "All goods";
  const sort = ["price-asc", "price-desc"].includes(params.get("sort") || "")
    ? params.get("sort")!
    : "featured";
  const update = (key: string, value: string) => {
    const next = new URLSearchParams(params);
    if (!value || value === "All goods" || value === "featured")
      next.delete(key);
    else next.set(key, value);
    setParams(next, { replace: true, preventScrollReset: true });
  };
  const filtered = useMemo(
    () =>
      products
        .filter(
          (p) =>
            (category === "All goods" || p.category === category) &&
            `${p.name} ${p.subtitle} ${p.category} ${p.description}`
              .toLowerCase()
              .includes(query.trim().toLowerCase()),
        )
        .sort((a, b) =>
          sort === "price-asc"
            ? a.price - b.price
            : sort === "price-desc"
              ? b.price - a.price
              : 0,
        ),
    [category, query, sort],
  );
  const returnTo = `${location.pathname}${location.search}#collection`;
  return (
    <>
      <Hero />
      <section
        id="collection"
        className="collection wrap"
        aria-labelledby="collection-title"
      >
        <div className="section-heading">
          <div>
            <span className="eyebrow">THE GOOD STUFF</span>
            <h2 id="collection-title">
              Meet your everyday essentials<span>.</span>
            </h2>
          </div>
          <p>Useful. Beautiful. Anything but ordinary.</p>
        </div>
        <div className="collection-toolbar">
          <div className="category-tabs" aria-label="Product categories">
            {["All goods", ...categories].map((c, i) => {
              const Icon = [SlidersHorizontal, House, BriefcaseBusiness, Leaf][
                i
              ];
              return (
                <button
                  key={c}
                  className={category === c ? "active" : ""}
                  onClick={() => update("category", c)}
                  aria-pressed={category === c}
                >
                  <Icon size={15} />
                  {c}
                </button>
              );
            })}
          </div>
          <div className="collection-controls">
            <div className="search-field">
              <Search size={17} />
              <input
                ref={input}
                id="product-search"
                aria-label="Search products"
                placeholder="Find something good..."
                value={query}
                onChange={(e) => update("q", e.target.value)}
              />
              {query && (
                <button
                  aria-label="Clear search"
                  onClick={() => {
                    update("q", "");
                    input.current?.focus();
                  }}
                >
                  <X size={15} />
                </button>
              )}
            </div>
            <label className="sort-control">
              <span>Sort:</span>
              <select
                aria-label="Sort products"
                value={sort}
                onChange={(e) => update("sort", e.target.value)}
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Price: low to high</option>
                <option value="price-desc">Price: high to low</option>
              </select>
            </label>
          </div>
        </div>
        <div className="results-row">
          <span role="status">
            {filtered.length} thoughtfully chosen{" "}
            {filtered.length === 1 ? "essential" : "essentials"}
          </span>
          {(query || category !== "All goods" || sort !== "featured") && (
            <button
              className="text-button"
              onClick={() =>
                setParams({}, { replace: true, preventScrollReset: true })
              }
            >
              Clear filters <X size={12} />
            </button>
          )}
        </div>
        {filtered.length ? (
          <div className="product-grid">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} returnTo={returnTo} />
            ))}
          </div>
        ) : (
          <div className="empty-results">
            <Search size={36} strokeWidth={1} />
            <h3>Nothing here just yet.</h3>
            <p>Try another search or give your filters a fresh start.</p>
            <button
              className="button primary"
              onClick={() =>
                setParams({}, { replace: true, preventScrollReset: true })
              }
            >
              Explore all goods <ArrowRight size={17} />
            </button>
          </div>
        )}
      </section>
      <Story />
    </>
  );
}
