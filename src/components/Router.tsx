import { BrowserRouter, Route, Routes } from "react-router";
import ProductDetail from "./product-detail";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/product/:slug" element={<ProductDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
