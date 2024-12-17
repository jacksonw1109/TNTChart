import React from "react";
import { Box, Typography, Paper, Button } from "@mui/material";
import { useSelector } from "react-redux";
import WalletConnector from "./WalletConnector";
import WalletVerifier from "./WalletVerifier";

const WalletConnect = () => {
  // Retrieve wallet state from Redux
  const { isConnected, isSigned, walletAddress } = useSelector((state) => state.wallet);

  const handleBackToHome = () => {
    // Logic to navigate back to the home page
    // This could be a redirect or a state update, depending on your routing setup
    window.location.href = "/"; // Example of redirecting to the home page
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "63vh",
        backgroundColor: "#121212",
        color: "#ffffff",
        padding: 3, // Add padding
      }}
    >
      {/* Title section */}
      <Typography variant="h4" sx={{ mb: 2, fontWeight: "bold" }}>
        User Account
      </Typography>
      <Typography variant="subtitle1" sx={{ mb: 4 }}>
        {walletAddress || "Please connect your wallet"}
      </Typography>

      {/* Step 1 and Step 2 layout */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row", // Horizontal layout
          gap: 3, // Spacing between steps
          justifyContent: "center",
          alignItems: "flex-start", // Align items at the top
          width: "100%",
          maxWidth: "900px", // Max container width
        }}
      >
        {/* Step 1 - Connect Wallet */}
        <Paper
          sx={{
            flex: 1,
            p: 3,
            borderRadius: "10px",
            textAlign: "center",
            backgroundColor: "#1e1e1e",
            color: "#ffffff",
          }}
        >
          <Typography variant="h5" fontWeight="bold">
            STEP 1
          </Typography>
          <Typography variant="subtitle1" sx={{ mb: 2 }}>
            Connect your wallet
          </Typography>
          <Typography variant="body2" sx={{ mb: 3 }}>
            Connect your wallet to access new features and tools.
          </Typography>
          <Box
            sx={{
              height: "38px", // Fixed button height
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {isConnected ? (
              <Button
                variant="contained"
                disabled
                sx={{
                  textAlign: "center",
                  backgroundColor: "grey", 
                  color: "white",
                  "&.Mui-disabled": {
                    backgroundColor: "grey",
                    color: "white",
                  },
                }}
              >
                ✅ Connected
              </Button>
            ) : (
              <WalletConnector />
            )}
          </Box>
        </Paper>

        {/* Step 2 - Sign Wallet */}
        <Paper
          sx={{
            flex: 1,
            p: 3,
            borderRadius: "10px",
            textAlign: "center",
            backgroundColor: "#1e1e1e",
            color: "#ffffff",
          }}
        >
          <Typography variant="h5" fontWeight="bold">
            STEP 2
          </Typography>
          <Typography variant="subtitle1" sx={{ mb: 2 }}>
            Sign your wallet
          </Typography>
          <Typography variant="body2" sx={{ mb: 3 }}>
            By signing your wallet, we will validate ownership.
          </Typography>
          <Box
            sx={{
              height: "38px", // Fixed button height
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {isSigned ? (
              <Button
                variant="contained"
                disabled
                sx={{
                  textAlign: "center",
                  backgroundColor: "grey",
                  color: "white",
                  "&.Mui-disabled": {
                    backgroundColor: "grey",
                    color: "white",
                  },
                }}
              >
                ✅ Signed
              </Button>
            ) : (
              <WalletVerifier />
            )}
          </Box>
        </Paper>
      </Box>

      {/* Back to Home Button */}
      <Button
        variant="outlined"
        onClick={handleBackToHome}
        sx={{
          marginTop: 4,
          color: "#ffffff",
          borderColor: "#ffffff",
          "&:hover": {
            backgroundColor: "#ffffff",
            color: "#121212",
          },
        }}
      >
        Back To Home
      </Button>
    </Box>
  );
};

export default WalletConnect;