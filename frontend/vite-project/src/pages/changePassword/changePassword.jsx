import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function ChangePassword() {
  // Recuperar el usuario del store
  const username = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordUpdated, setPasswordUpdated] = useState(false); // Estado para controlar el mensaje de contraseña actualizada

  const sendData = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:3000/v1/credentials/changePassword",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username, // Enviar el username en la solicitud
            oldPassword,
            newPassword,
          }),
        }
      );
      console.log("name:", username);
      console.log("HTTP status:", response.status);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `HTTP error! status: ${response.status}, details: ${errorText}`
        );
      }

      const data = await response.json();
      console.log("Response data:", data);

      if (data.message) {
        console.log("Password changed successfully");
        setPasswordUpdated(true); // Actualizar el estado para mostrar el mensaje
      }
    } catch (error) {
      console.error("Error changing password:", error);
    }

    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  return (
    <div>
      <h1>Change Password</h1>
      {passwordUpdated && <p>Password updated successfully</p>}{" "}
      {/* Mostrar el mensaje si passwordUpdated es true */}
      <form onSubmit={sendData}>
        <label>
          Old Password:
          <input
            type="password"
            value={oldPassword}
            onChange={(event) => setOldPassword(event.target.value)}
          />
        </label>
        <br />
        <label>
          New Password:
          <input
            type="password"
            value={newPassword}
            onChange={(event) => setNewPassword(event.target.value)}
          />
        </label>
        <br />
        <button type="submit">Change Password</button>
        <button onClick={() => navigate("/")}>Back</button>
      </form>
    </div>
  );
}

export default ChangePassword;
