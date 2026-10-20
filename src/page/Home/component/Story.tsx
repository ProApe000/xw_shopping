import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
export default function Story() {
  return (
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
  );
}
