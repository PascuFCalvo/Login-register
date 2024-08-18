import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./register.css";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
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
      // Cambiado a 3 caracteres como estándar
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
        "http://localhost:3000/v1/credentials/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        }
      );

      console.log("HTTP status:", response.status);

      if (!response.ok) {
        const errorText = await response.text(); // Obtén el texto del error del servidor
        throw new Error(
          `HTTP error! status: ${response.status}, details: ${errorText}`
        );
      }

      const data = await response.json();
      console.log("Response data:", data);

      if (data.success) {
        navigate("/"); // Redirige al inicio si el registro fue exitoso
      } else {
        setErrorMessage(data.message || "Registration failed");
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage(
        `An error occurred during registration: ${error.message}`
      );
    }
  };

  return (
    <>
      <form onSubmit={sendData}>
        <h1>Register</h1>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <button type="submit">Register</button>
        <button onClick={() => navigate("/")}>Cancel</button>
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      </form>
    </>
  );
}

export default Register;
