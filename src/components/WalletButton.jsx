import React from "react";
import "./style.css";

export const WalletButton = () => {
  return (
    <div className="walletbutton-background">
      <appkit-button  
        balance="hide"
        size="md"
        label="Connect"
      />

    </div>
  )
};
