import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "~/pages/LoginPage/LoginPage";
import HomePage from "~/pages/HomePage/HomePage";
import Layout from "~/components/Layout";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route element={<Layout />}>
          <Route path="/home" element={<HomePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
