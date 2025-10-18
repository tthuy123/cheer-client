import MeasurementBar from "../Measurement/NewMeasurement/MeasurementBar";
import MenuBar from "../common/MenuBar";

import { Box } from "@mui/material";
const MeasurementLayout = ({ children }) => {

  return (
    <>
      <MeasurementBar />
      <Box component="main" sx={{ flexGrow: 1, p: 5, mt: 6, mb: 7 }}>
        {children}
      </Box>
        <MenuBar />
    </>
  );
};

export default MeasurementLayout;