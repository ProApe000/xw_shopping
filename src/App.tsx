import { Route, Routes } from "react-router-dom";
import SiteLayout from "./component/SiteLayout";
import Home from "./page/Home";
import ProductPage from "./page/Product";
import Checkout from "./page/Checkout";
import NotFound from "./page/NotFound";
export default function App() {
  return (
    <SiteLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/:slug" element={<ProductPage />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </SiteLayout>
  );
}
