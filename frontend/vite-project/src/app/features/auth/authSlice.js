import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    logged: false,
    user: null,
    token: null,
  
  },
  reducers: {
    setLogged(state, action) {
      state.logged = action.payload;
    },
    setUser(state, action) {
      state.user = action.payload;
    },
    setToken(state, action) {
      state.token = action.payload;
    },
  },
});

// Exportar las acciones generadas por el slice
export const { setLogged, setUser, setToken } = authSlice.actions;

// Exportar el reducer por defecto
export default authSlice.reducer;
