import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginRegister from "./pages/login-register/loginRegister";
import Login from "./pages/login/login";
import Register from "./pages/register/register";
import Start from "./pages/start/start";
import MainPage from "./pages/mainpage/mainpage";

export default function RouterApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Start />}></Route>
        <Route path="/credentials" element={<LoginRegister />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/mainpage" element={<MainPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
