import React from "react";
import { Toolbar, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { disconnectWallet } from "../redux/actions/walletAction";
import MenuList from "./MenuList";

function MenuBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Retrieve connection and verification status from Redux
  const { isConnected, isSigned } = useSelector((state) => state.wallet);

  // Handle wallet disconnection
  function handleDisconnect() {
    dispatch(disconnectWallet());
    window.location.reload(); // Reload the page to reset state
  }

  return (
    <div className="userbar-background" style={{ backgroundColor: "#191919" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "flex-end" }}>
        {/* If connected and verified, show the MenuList */}
        {isConnected && isSigned ? (
          <MenuList onDisconnect={handleDisconnect} />
        ) : (
          // Show the Connect button if not connected or verified
          <Button
            variant="outlined"
            onClick={() => navigate("/walletconnect")}
            sx={{
              color: "white",
              borderColor: "white",
              borderRadius: "10px",
              "&:hover": {
                borderColor: "white",
                backgroundColor: "rgba(255, 255, 255, 0.1)",
              },
            }}
          >
            CONNECT
          </Button>
        )}
      </Toolbar>
    </div>
  );
}

export default MenuBar;
