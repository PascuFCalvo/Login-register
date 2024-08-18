import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setLogged,
  setUser,
  setToken,
} from "../../app/features/auth/authSlice";
import "./login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validateName = (name) => {
    if (name.length < 3) {
      setErrorMessage("Name must be at least 3 characters long");
      return false;
    }
    return true;
  };

  const validatePassword = (password) => {
    if (password.length < 3) {
      setErrorMessage("Password must be at least 3 characters long");
      return false;
    }
    return true;
  };

  const sendData = async (event) => {
    event.preventDefault();

    setErrorMessage("");

    if (!validateName(username) || !validatePassword(password)) {
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:3000/v1/credentials/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        }
      );

      const data = await response.json();
      console.log("Response data:", data);

      if (data.success) {
        dispatch(setLogged(true));
        dispatch(setUser(data.user.name));
        dispatch(setToken(data.token));

        console.log("Login successful:", data.user.name);
        navigate("/mainpage");
      } else {
        setErrorMessage("Login failed: " + data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("An error occurred. Please try again.");
    }
  };

  return (
    <>
      <form onSubmit={sendData}>
        <label>
          Name:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="submit">Login</button>
        <button onClick={() => navigate("/")}>Volver</button>
      </form>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}{" "}
    </>
  );
}

export default Login;
