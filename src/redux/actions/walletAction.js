export const CONNECT_WALLET = "CONNECT_WALLET";
export const DISCONNECT_WALLET = "DISCONNECT_WALLET";
export const SIGN_WALLET = "SIGN_WALLET";

// Action Creators
export const connectWallet = (address, type) => ({
  type: CONNECT_WALLET,
  payload: { address, type }, // Make sure both address and walletType are included
});

export const disconnectWallet = () => ({
  type: DISCONNECT_WALLET,
});

export const signWallet = () => ({
  type: SIGN_WALLET,
});
