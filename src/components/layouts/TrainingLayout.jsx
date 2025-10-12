import MenuBar from "../common/MenuBar";
import TrainingBar from "../Training/TrainingBar";

import { Box } from "@mui/material";
const TrainingLayout = ({ children }) => {

  return (
    <>
      <TrainingBar />
      <Box component="main" sx={{ flexGrow: 1, p: 5, mt: 6, mb: 7 }}>
        {children}
      </Box>
        <MenuBar />
    </>
  );
};

export default TrainingLayout;