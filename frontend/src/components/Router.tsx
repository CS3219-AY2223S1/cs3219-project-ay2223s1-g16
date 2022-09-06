import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "~/pages/LoginPage/LoginPage";
import HomePage from "~/pages/HomePage/HomePage";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
