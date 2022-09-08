import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "~/components/Layout";
import LoginPage from "~/pages/LoginPage/LoginPage";
import HomePage from "~/pages/HomePage/HomePage";
import NotFoundPage from "~/pages/NotFoundPage";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route element={<Layout />}>
          <Route path="/home" element={<HomePage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
