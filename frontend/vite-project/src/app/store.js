import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice"; // Asegúrate de que la ruta es correcta

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
