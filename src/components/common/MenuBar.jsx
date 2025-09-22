import React, { useState } from "react";
import {
  BottomNavigation,
  BottomNavigationAction,
  Paper,
} from "@mui/material";

import HomeIcon from "@mui/icons-material/Person";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import StraightenIcon from "@mui/icons-material/Straighten";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";
import ChecklistIcon from "@mui/icons-material/Checklist";

export default function MenuBar() {
  const [value, setValue] = useState(0);

  return (
    <Paper
      elevation={1}
      sx={{
        width: "100%",
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
      }}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => setValue(newValue)}
        sx={{
          "& .Mui-selected": {
             // selected label + icon
             "& .MuiBottomNavigationAction-label.Mui-selected": {
                color: "green",
             },
          },
          "& .Mui-selected .MuiSvgIcon-root": {
                color: "green", // icon
    },
        }}
      >
        <BottomNavigationAction label="Home" icon={<HomeIcon />} />
        <BottomNavigationAction label="Training" icon={<FitnessCenterIcon />} />
        <BottomNavigationAction label="Measurement" icon={<StraightenIcon />} />
        <BottomNavigationAction label="Hit/Miss" icon={<TrackChangesIcon />} />
        <BottomNavigationAction label="Check Off" icon={<ChecklistIcon />} />
      </BottomNavigation>
    </Paper>
  );
}
