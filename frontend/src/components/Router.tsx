import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";

import useUserStore from "~/store/userStore";
import Layout from "~/components/Layout";
import LoginPage from "~/pages/LoginPage/LoginPage";
import HomePage from "~/pages/HomePage/HomePage";
import CodePage from "~/pages/CodePage/CodePage";
import NotFoundPage from "~/pages/NotFoundPage";

// Helper Component
interface Props {
  children: React.ReactNode;
}

const PrivateRoute = () => {
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);

  return !isAuthenticated ? <Navigate to="/" /> : <Outlet />;
};

// Main Component
const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route element=<PrivateRoute />>
          <Route element={<Layout />}>
              <Route path="/home" element={<HomePage />} />
              <Route path="/code" element={<CodePage />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
