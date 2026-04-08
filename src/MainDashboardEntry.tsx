import { Divider, Layout } from "antd";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import FooterCmp from "./components/Footer";
import ProductDetails from "./pages/productDetails/ProductDetails";

const MainDashboardEntry = () => {
  return (
    <Layout>
      <div className="bg-white-bg sticky top-0 z-1000 ">
        <Header></Header>
        <Divider className="mb-2! mt-0! sm:my-6!" />
      </div>
      <Layout className="">
        <Routing />
      </Layout>
      <FooterCmp></FooterCmp>
    </Layout>
  );
};

function Routing() {
  return (
    <Routes>
      <Route path="*" element={<Home />} />
      <Route path="/product-details/:id" element={<ProductDetails />} />
    </Routes>
  );
}
export default MainDashboardEntry;
