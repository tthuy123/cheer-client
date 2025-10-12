// MenuBar.jsx
import React from "react";
import {
  BottomNavigation,
  BottomNavigationAction,
  Paper,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";

import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import StraightenIcon from "@mui/icons-material/Straighten";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";
import ChecklistIcon from "@mui/icons-material/Checklist";

const navItems = [
  { label: "Home",        icon: <AccountCircleOutlinedIcon />, to: "/home" },
  { label: "Training",    icon: <FitnessCenterIcon />,         to: "/training/strength" },
  { label: "Measurement", icon: <StraightenIcon />,            to: "/measurement/new" },
  { label: "Hit/Miss",    icon: <TrackChangesIcon />,          to: "/hit-miss" },
  { label: "Check Off",   icon: <ChecklistIcon />,             to: "/check-off/new" },
];

export default function MenuBar() {
  const location = useLocation();

  // Map URL -> index để highlight đúng tab
  const currentIndex = React.useMemo(() => {
    const i = navItems.findIndex(item =>
      location.pathname.startsWith(item.to)
    );
    return i === -1 ? 0 : i;
  }, [location.pathname]);

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
        value={currentIndex}
        sx={{
          "& .Mui-selected .MuiSvgIcon-root": {
            color: "green",
          },
          "& .Mui-selected .MuiBottomNavigationAction-label": {
            color: "green",
          },
        }}
      >
        {navItems.map((item) => (
          <BottomNavigationAction
            key={item.to}
            label={item.label}
            icon={item.icon}
            component={Link}
            to={item.to}
          />
        ))}
      </BottomNavigation>
    </Paper>
  );
}
