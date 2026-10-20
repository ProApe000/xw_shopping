import "./style.css";
import { Link, useParams } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { products } from "../../mock/products";
import ProductDetail from "./component/ProductDetail";
export default function ProductPage() {
  const { slug } = useParams();
  const product = products.find((p) => p.slug === slug);
  return product ? (
    <ProductDetail key={product.id} id={product.id} />
  ) : (
    <div className="page-empty wrap">
      <h1>This little find is missing.</h1>
      <p>
        That product may have moved. There are more good things to discover.
      </p>
      <Link className="button primary" to="/">
        Explore the collection <ArrowRight size={18} />
      </Link>
    </div>
  );
}
