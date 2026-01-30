import { Divider, Layout } from "antd";
// import ContentCmp from "../components/Content.tsx";
import FooterCmp from "../components/Footer.tsx";
import Header from "../components/new-project/header/Header.tsx";
import SideMenu from "../components/SideMenu.tsx";
import HorizontalFilters from "../components/new-project/header/HorizontalFilters.tsx";

const Home = () => {
  return (
    <Layout className="px-4 sm:px-6 md:px-12 lg:px-32">
      <Header></Header>
      <Divider />
      <Layout>
        <SideMenu></SideMenu>
        <HorizontalFilters />
        {/*<Routing/>*/}
        {/* <ContentCmp></ContentCmp> */}
      </Layout>
      <FooterCmp></FooterCmp>
    </Layout>
  );
};

// function Routing() {
//   return (
//     <>
//       <Routes>
//         {/*<Route element={<PrivateRoutes/>}>*/}
//         <Route path="/purse1" element={<GridImages items={purses} />} />
//         <Route path="/hats" element={<GridImages items={hats} />} />
//         <Route path="/bags" element={<GridImages items={bags} />} />
//         <Route path="/wallets" element={<GridImages items={wallets} />} />
//         <Route
//           path="/adultsberets"
//           element={<GridImages items={adultsBerets} />}
//         />
//         <Route
//           path="/childrenberets"
//           element={<GridImages items={childrenBerets} />}
//         />
//         {/*</Route>*/}
//       </Routes>
//     </>
//   );
// }
export default Home;
