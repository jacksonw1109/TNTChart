import React, { useState } from "react";
import { Button } from "@mui/material";
import Web3 from "web3";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signWallet } from "../redux/actions/walletAction"; // Import Signature Action

const WalletVerifier = () => {
  const [loading, setLoading] = useState(false); // Button loading state
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Retrieve wallet connection state from Redux
  const { isConnected, walletType } = useSelector((state) => state.wallet); // Include walletType and currentAddress

  // Handle wallet signature verification
  const handleSignWallet = async () => {
    if (!isConnected) {
      alert("Please connect a wallet first.");
      return;
    }

    try {
      setLoading(true);

      if (walletType === "MetaMask") {
        // MetaMask signature process
        if (!window.ethereum) {
          alert("Ethereum provider not detected. Please install MetaMask.");
          return;
        }
        const metamaskProvider = window.ethereum.providers
          ? window.ethereum.providers.find((provider) => provider.isMetaMask)
          : window.ethereum;
        if (!metamaskProvider) {
          alert("MetaMask provider not found. Please install MetaMask.");
          return;
        }
        const accounts = await metamaskProvider.request({ method: "eth_requestAccounts" });
        if (!accounts || accounts.length === 0) {
          throw new Error("No account authorized. Please connect your MetaMask wallet.");
        }
        const userAddress = accounts[0];
        // use metamaskProvider to sign the message
        const web3 = new Web3(metamaskProvider);
        const message = "Please sign this message to prove wallet ownership."; // Message for signature

        // Directly use the walletAddress (currentAddress) for signing
        const signature = await web3.eth.personal.sign(message, userAddress, "");
        // save signature to the backend

      } else if (walletType === "Phantom") {
        // Phantom wallet signature process
        if (!window.solana || !window.solana.isPhantom) {
          alert("Phantom wallet not detected. Please install Phantom.");
          return;
        }
        try {
          const response = await window.solana.connect();
          const userAddress = response.publicKey.toString();
          console.log("Phantom wallet connected. Address:", userAddress);

          const message = "Please sign this message to prove wallet ownership.";
          const encodedMessage = new TextEncoder().encode(message);

          const { signature } = await window.solana.signMessage(encodedMessage, "utf8");

          const signatureHex = Array.from(signature)
            .map((byte) => byte.toString(16).padStart(2, "0"))
            .join("");

          // save signature to the backend
        } catch (error) {
          if (error.message.includes("User rejected")) {
            alert("Signature request was rejected by the user.");
          } else {
            alert(`Phantom signing failed: ${error.message}`);
          }
          return;
        }

      } else {
        alert("Unsupported wallet type. Please connect a supported wallet.");
        return;
      }

      // Dispatch Redux action to update wallet verification status
      dispatch(signWallet());
      // Delay before redirecting to the home page
      setTimeout(() => {
        navigate("/");
      }, 300);
    } catch (error) {
      console.error("Signing error:", error);
      alert("Wallet signing failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Render nothing if wallet is not connected
  if (!isConnected) {
    return null;
  }

  return (
    <Button
      variant="contained"
      disabled={loading} // Disable button during loading
      color="secondary"
      sx={{
        backgroundColor: "#1976d2",
        color: "#fff",
        "&:hover": {
          backgroundColor: "#1565c0",
        },
        "&.Mui-disabled": {
          backgroundColor: "#e0e0e0",
          color: "#a0a0a0",
        },
      }}
      onClick={handleSignWallet}
    >
      {loading ? "Signing..." : "Sign Wallet"}
    </Button>
  );
};

export default WalletVerifier;
