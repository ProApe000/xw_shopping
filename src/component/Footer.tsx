import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Brand } from "./Brand";
export default function Footer() {
  return (
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
  );
}
