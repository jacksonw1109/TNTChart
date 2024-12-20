// MainPage.js
import React from "react";
import MainComponent from "./MainComponent";
import { Header } from "./Header";
import { TokenList } from "./TokenList";
import Footer from "./Footer";
import { WalletButton } from './WalletButton'

const MainPage = () => {
  return (
    <div>
      <WalletButton />
      <Header />
      <TokenList />
      <MainComponent />
      <Footer />
    </div>
  );
};

export default MainPage;
