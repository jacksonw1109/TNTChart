import React, { useState } from "react";
import { Menu, MenuItem, Avatar, Typography, Box, Divider, Chip } from "@mui/material";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import PersonIcon from "@mui/icons-material/Person";
import LinkIcon from "@mui/icons-material/Link";
import FlagIcon from "@mui/icons-material/Flag";
import { useSelector, useDispatch } from "react-redux";
import { disconnectWallet } from "../redux/actions/walletAction";
import { useNavigate } from "react-router-dom";

function MenuList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Retrieve wallet connection state from Redux
  const { isConnected, walletAddress } = useSelector((state) => state.wallet);

  const [anchorEl, setAnchorEl] = useState(null);

  // Format wallet address for display
  const formattedAddress = walletAddress
    ? `${walletAddress.substring(0, 6)}...${walletAddress.substring(walletAddress.length - 4)}`
    : "";

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDisconnect = () => {
    dispatch(disconnectWallet()); // Dispatch disconnect action
    handleMenuClose(); // Close the menu
    navigate("/walletconnect"); // Redirect to home page
  };

  return (
    <div className="userbar-background" style={{ backgroundColor: "#191919" }}>
      {/* Show menu if connected */}
      {isConnected ? (
        <div>
          <Box
            onClick={handleMenuOpen}
            sx={{ cursor: "pointer", display: "flex", alignItems: "center" }}
          >
            <Avatar alt="User Avatar" sx={{ bgcolor: "gray", marginRight: "8px", height: "35px", width: "35px" }} />
            <Typography variant="body1" sx={{ color: "white" }}>
              {formattedAddress}
            </Typography>
          </Box>

          {/* Dropdown menu */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            PaperProps={{
              sx: {
                backgroundColor: "#191919",
                color: "white",
                width: "250px",
                borderRadius: "8px",
              },
            }}
          >
            {/* User information */}
            <Box sx={{ display: "flex", alignItems: "center", p: 2 }}>
              <Avatar alt="User Avatar" sx={{ bgcolor: "gray", marginRight: "8px" }} />
              <Box>
                <Typography variant="body1" fontWeight="bold">
                  {formattedAddress}
                </Typography>
              </Box>
            </Box>

            <Divider />

            <MenuItem onClick={handleMenuClose}>
              <PersonIcon sx={{ marginRight: "10px" }} />
              User area
            </MenuItem>

            <MenuItem onClick={handleMenuClose}>
              <FlagIcon sx={{ marginRight: "10px" }} />
              Your plan
              <Chip
                label="Free"
                size="small"
                sx={{ marginLeft: "auto", color: "white", bgcolor: "#5cb85c" }}
              />
            </MenuItem>

            <MenuItem onClick={handleMenuClose}>
              <LinkIcon sx={{ marginRight: "10px" }} />
              Switch Account
            </MenuItem>

            <Divider />

            <MenuItem onClick={handleDisconnect}>
              <PowerSettingsNewIcon sx={{ marginRight: "10px", color: "red" }} />
              Disconnect wallet
            </MenuItem>
          </Menu>
        </div>
      ) : (
        // Show this message if not connected
        <Typography variant="body1" sx={{ color: "white", textAlign: "center" }}>
          Wallet not connected
        </Typography>
      )}
    </div>
  );
}

export default MenuList;
