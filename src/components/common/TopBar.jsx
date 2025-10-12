import React, { useState } from "react";
import { AppBar, Toolbar, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";

const TopBar = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="fixed" bottom={0} left={0} right={0} sx={{ backgroundColor: "#257951" }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Cheer Trainer
        </Typography>

        {/* User Menu */}
        <div>
          <IconButton
            size="large"
            aria-label="user menu"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <MenuIcon /> {/* Hoặc AccountCircle */}
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>Subscription and Billing</MenuItem>
            <MenuItem onClick={handleClose}>Team Management</MenuItem>
            <MenuItem onClick={handleClose}>Privacy Policy</MenuItem>
            <MenuItem onClick={handleClose}>Terms and Conditions</MenuItem>
            <MenuItem onClick={handleClose}>About Us</MenuItem>
            <MenuItem onClick={handleClose} sx={{ color: "red" }}>
              Logout
            </MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
