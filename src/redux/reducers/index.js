import { combineReducers } from 'redux';
import tokenReducer from './tokenReducer';
import swapTransactionReducer from './fetchSwapTransactionReducer';
import walletReducer from "./walletReducer";

const rootReducer = combineReducers({
  tokenReducer, // Add your reducers here
  swapTransactionReducer,
  wallet: walletReducer, 
});

export default rootReducer;