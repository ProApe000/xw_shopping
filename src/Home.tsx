import { useMemo, useRef } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  BriefcaseBusiness,
  House,
  Leaf,
  Package,
  Search,
  SlidersHorizontal,
  Sparkles,
  Truck,
  X,
} from "lucide-react";
import { categories, products } from "./data";
import { ProductCard } from "./components/Shared";
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
      <section className="hero wrap" aria-labelledby="hero-title">
        <div className="hero-copy">
          <span className="eyebrow">
            <span className="little-line" /> LESS, BUT BETTER.
          </span>
          <h1 id="hero-title">
            Good things.
            <br />
            For <em>everyday.</em>
          </h1>
          <p>
            Thoughtfully chosen objects for home, work,
            <br className="desktop-break" /> and wherever life takes you.
          </p>
          <a href="#collection" className="button primary">
            Find your everyday <ArrowUpRight size={19} />
          </a>
          <div className="hero-footnote">
            <span className="mini-star">✳</span>
            <span>A little more intention. A lot more living.</span>
          </div>
        </div>
        <div className="hero-visual">
          <img
            src="/images/hero.jpg"
            alt="A calm, sunlit living room with natural textures and a comfortable sofa"
            fetchPriority="high"
          />
          <span className="hero-corner">THE EVERYDAY EDIT / VOL. 01</span>
          <div className="hero-image-note">
            <span>Make yourself at home.</span>
            <a
              href="/?category=Home#collection"
              aria-label="Explore home goods"
            >
              <ArrowUpRight size={25} />
            </a>
          </div>
        </div>
        <a
          className="hero-scroll"
          href="#collection"
          aria-label="Scroll to collection"
        >
          <ArrowDown size={16} />
        </a>
      </section>
      <div className="benefits wrap">
        <span>
          <Truck /> Free demo shipping on $75+
        </span>
        <span>
          <Sparkles /> A thoughtfully curated collection
        </span>
        <span>
          <Package /> Everyday objects. Lasting appeal.
        </span>
      </div>
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
      <section className="story wrap" id="our-story">
        <div className="story-graphic" aria-hidden="true">
          ✳
        </div>
        <div>
          <span className="eyebrow">FEWER THINGS. MORE MEANING.</span>
          <h2>
            Made for the way
            <br />
            you <em>actually live.</em>
          </h2>
        </div>
        <div className="story-text">
          <p>
            We believe the things you surround yourself with should earn their
            place. Beautiful to look at. A pleasure to use. Ready for the
            everyday.
          </p>
          <p>Welcome to a more considered kind of collection.</p>
          <Link to="/?category=Home#collection" className="text-link">
            Find your next favorite <ArrowUpRight size={18} />
          </Link>
        </div>
      </section>
    </>
  );
}
