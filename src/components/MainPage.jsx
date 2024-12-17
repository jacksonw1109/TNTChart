// MainPage.js
import React from "react";
import MainComponent from "./MainComponent";
import { Header } from "./Header";
import { TokenList } from "./TokenList";
import Footer from "./Footer";
import MenuBar from "./MenuBar";

const MainPage = () => {
  return (
    <div>
      <Header />
      <MenuBar />
      <TokenList />
      <MainComponent />
      <Footer />
    </div>
  );
};

export default MainPage;
