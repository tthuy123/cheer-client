import React from "react";
import MenuBar from "../common/MenuBar";
import TopBar  from "../common/TopBar";

import { Box } from "@mui/material";
const MainLayout = ({ children }) => {

  return (
    <>
      <TopBar />
      <Box component="main" sx={{ flexGrow: 1, p: 5, mt: 2, mb: 7 }}>
        {children}
      </Box>
        <MenuBar />
    </>
  );
};

export default MainLayout;
