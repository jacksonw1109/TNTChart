// MainPage.js
import React from "react";
import { Header } from "./Header";
import Footer from "./Footer";
import WalletConnect from "./WalletConnect";

const WalletConnectPage = () => {
  return (
    <div>
      <Header />
      <WalletConnect />
      <Footer />
    </div>
  );
};

export default WalletConnectPage;
