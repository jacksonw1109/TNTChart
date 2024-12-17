import React, { useState, useEffect } from "react";
import Web3 from "web3";
import { Button, Dialog, DialogTitle, DialogContent, Box, Typography, CircularProgress } from "@mui/material";
import { useDispatch } from "react-redux";
import { connectWallet } from "../redux/actions/walletAction"; 

// 导入图标
import MetaMaskIcon from "../assets/img/MetaMask.png";
import PhantomIcon from "../assets/img/Phantom.png";

const WalletConnector = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [walletStatus, setWalletStatus] = useState({
    metaMask: false,
    phantom: false,
  });
  const [loading, setLoading] = useState(false); 
  const dispatch = useDispatch();

  useEffect(() => {
    const detectWallets = () => {
      setWalletStatus({
        metaMask: Boolean(window.ethereum && window.ethereum.isMetaMask),
        phantom: Boolean(window.solana && window.solana.isPhantom),
      });
    };
    detectWallets();
  }, []);


  const handleError = (error) => {
    console.error("Wallet connection error:", error);
    if (error.code === 4001) {
      alert("You rejected the connection request. Please try again.");
    } else if (error.code === -32002) {
      alert("Connection request already pending. Please open your wallet and approve the request.");
    } else {
      alert(`Unexpected error occurred: ${error.message || "Unknown error"}. Please try again.`);
    }
  };

  const connectMetaMask = async () => {
    try {
      if (!window.ethereum || !window.ethereum.isMetaMask) {
        alert("MetaMask is not installed. Please install it and try again.");
        return;
      }

      setLoading(true); 

      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      dispatch(connectWallet(accounts[0], "MetaMask"));

      setModalOpen(false);
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const connectPhantom = async () => {
    try {
      console.log("Connecting Phantom wallet...");
      if (!window.solana || !window.solana.isPhantom) {
          alert("Phantom Wallet is not installed. Please install it and try again.");
          return;
      }

      setLoading(true);

      const response = await window.solana.connect({ onlyIfTrusted: false });
      console.log("Connected Phantom account:", response.publicKey.toString());

      // Update Redux state
      dispatch(connectWallet(response.publicKey.toString(), "Phantom"));
      setModalOpen(false); // Close Modal
    } catch (error) {
      if (error.code === 4001) {
        alert("Connection request rejected. Please try again.");
      } else {
        console.error("Phantom connection error:", error);
        alert("An error occurred. Please try again or reset Phantom permissions.");
      }
    } finally {
      setLoading(false);
    }
  };
  

  const wallets = [
    { name: "MetaMask", icon: MetaMaskIcon, status: walletStatus.metaMask, onClick: connectMetaMask },
    { name: "Phantom", icon: PhantomIcon, status: walletStatus.phantom, onClick: connectPhantom },
  ];

  return (
    <>
      <Button
        variant="contained"
        onClick={() => setModalOpen(true)}
        sx={{
          textAlign: "center",
          backgroundColor: "#1976d2", 
          color: "white", 
          cursor: "pointer",
          "&:hover": {
            backgroundColor: "#1565c0",
          },
        }}
      >
        CONNECT WALLET
      </Button>


      <Dialog open={modalOpen} onClose={() => setModalOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ textAlign: "center", fontWeight: "bold" }}>Connect Wallet</DialogTitle>
        <DialogContent>
          {loading ? (
            <Box display="flex" justifyContent="center" alignItems="center" height="200px">
              <CircularProgress />
            </Box>
          ) : (
            wallets.map((wallet, index) => (
              <Box
                key={index}
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                p={2}
                mb={2}
                borderRadius={1}
                onClick={wallet.status ? wallet.onClick : null}
                sx={{
                  backgroundColor: "#f9f9f9",
                  cursor: wallet.status ? "pointer" : "not-allowed",
                  opacity: wallet.status ? 1 : 0.5,
                  "&:hover": wallet.status ? { backgroundColor: "#e0e0e0" } : {},
                }}
              >
                <Box display="flex" alignItems="center">
                  <img src={wallet.icon} alt={wallet.name} width="40" height="40" />
                  <Typography ml={2} variant="body1">
                    {wallet.name}
                  </Typography>
                </Box>
                <Typography variant="caption" color={wallet.status ? "green" : "red"}>
                  {wallet.status ? "INSTALLED" : "NOT INSTALLED"}
                </Typography>
              </Box>
            ))
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default WalletConnector;
