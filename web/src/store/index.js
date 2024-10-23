import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./modules/rootReducer";

const store = configureStore({
  reducer: rootReducer,
  // Ative apenas no ambiente de desenvolvimento
  devTools: process.env.NODE_ENV !== 'production', 
});

export default store;
