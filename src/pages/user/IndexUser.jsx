import { Outlet } from "react-router-dom";
import Header from "../../layouts/user/Header/Header";
import Footer from "../../layouts/user/Footer/Footer";

function IndexUser() {
  return (
    <div className="main-wrapper">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default IndexUser;
