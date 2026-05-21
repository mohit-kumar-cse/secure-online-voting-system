import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";

const authRoutes = ["/", "/login", "/register"];

const MainLayout = () => {
  const { pathname } = useLocation();
  const isAuthPage = authRoutes.includes(pathname);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {!isAuthPage && <Navbar />}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-6">
        <Outlet />
      </main>
      {!isAuthPage && <Footer />}
    </div>
  );
};

export default MainLayout;