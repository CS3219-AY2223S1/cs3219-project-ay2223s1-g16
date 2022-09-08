import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

import NavBar from "~/components/NavBar";

const Layout = () => {
  return (
    <Box>
      <NavBar />
      <Outlet />
    </Box>
  );
};

export default Layout;
