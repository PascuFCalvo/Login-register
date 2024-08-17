import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setLogged,
  setUser,
  setToken,
} from "../../app/features/auth/authSlice";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Hook para navegar sin recargar la página

  const validateName = (name) => {
    if (name.length < 3) {
      console.log("Name must be at least 3 characters long");
      return false;
    }
    return name.toUpperCase();
  };

  const validatePassword = (password) => {
    if (password.length < 3) {
      console.log("Password must be at least 8 characters long");
      return false;
    }
    return true;
  };

  const sendData = async (event) => {
    event.preventDefault(); // Prevenir el comportamiento predeterminado del formulario

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
        dispatch(setUser(data.user.name)); // Ahora envías el objeto completo de usuario
        dispatch(setToken(data.token)); // Guardas el token en el estado global

        console.log("Login successful:", data.user.name);
        setTimeout(() => {
          navigate("/mainpage"); // Redirige a la página principal
        }, 1000);
      } else {
        console.log("Login failed:", data.message);
      }
    } catch (error) {
      console.error("Error:", error);
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
      </form>
    </>
  );
}

export default Login;
