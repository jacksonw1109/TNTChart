import { CONNECT_WALLET, DISCONNECT_WALLET, SIGN_WALLET } from "../actions/walletAction";

const initialState = {
  isConnected: false,
  isSigned: false,
  walletAddress: "",
  walletType: "", 
};

const walletReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONNECT_WALLET:
      return {
        ...state,
        isConnected: true,
        walletAddress: action.payload.address,  // Correctly set the wallet address
        walletType: action.payload.type,  // Correctly set the wallet type
      };

    case DISCONNECT_WALLET:
      return {
        ...state,
        isConnected: false,
        isSigned: false,
        walletAddress: "",
        walletType: "",  // Reset wallet type when disconnecting
      };

    case SIGN_WALLET:
      return {
        ...state,
        isSigned: true,
      };

    default:
      return state;
  }
};

export default walletReducer;
