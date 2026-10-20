import {
  ArrowDown,
  ArrowUpRight,
  Truck,
  Sparkles,
  Package,
} from "lucide-react";
export default function Hero() {
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
    </>
  );
}
