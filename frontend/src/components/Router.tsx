import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";

import useUserStore from "~/store/userStore";
import Layout from "~/components/Layout";
import LoginPage from "~/pages/LoginPage/LoginPage";
import HomePage from "~/pages/HomePage/HomePage";
import RoomPage from "~/pages/RoomPage/RoomPage";
import NotFoundPage from "~/pages/NotFoundPage";
import AccountPage from "~/pages/AccountPage/AccountPage";

const PrivateRoute = () => {
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);

  return !isAuthenticated ? <Navigate to="/login" /> : <Outlet />;
};

// Main Component
const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route element={<PrivateRoute />}>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/room" element={<RoomPage />} />
            <Route path="/account" element={<AccountPage />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
