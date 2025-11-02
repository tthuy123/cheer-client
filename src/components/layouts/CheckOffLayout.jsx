import CheckOffBar from "../Checkoff/CheckOffBar";
import MenuBar from "../common/MenuBar";

import { Box } from "@mui/material";
const CheckOffLayout = ({ children }) => {

  return (
    <>
      <CheckOffBar />
      <Box component="main" sx={{ flexGrow: 1, p: 5, mt: 6, mb: 7 }}>
        {children}
      </Box>
        <MenuBar />
    </>
  );
};

export default CheckOffLayout;