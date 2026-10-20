import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
export default function NotFound() {
  return (
    <div className="page-empty wrap">
      <span className="eyebrow">A LITTLE OFF THE BEATEN PATH</span>
      <h1>Let's find your way home.</h1>
      <p>
        This page doesn't exist, but good things are just around the corner.
      </p>
      <Link className="button primary" to="/">
        Back to the collection <ArrowRight size={18} />
      </Link>
    </div>
  );
}
