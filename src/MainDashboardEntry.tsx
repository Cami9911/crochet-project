import { Divider, Layout } from "antd";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import FooterCmp from "./components/Footer";
import ProductDetails from "./pages/ProductDetails";

const MainDashboardEntry = () => {
  return (
    <Layout className="px-4 sm:px-6 md:px-12 lg:px-32">
      <div className="bg-white-bg sticky top-0 z-1000 ">
        <Header></Header>
        <Divider className="mb-2! mt-0! sm:my-6!" />
      </div>
      <Layout>
        <Routing />
      </Layout>
      <FooterCmp></FooterCmp>
    </Layout>
  );
};

function Routing() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/product-details" element={<ProductDetails />} />
    </Routes>
  );
}
export default MainDashboardEntry;
