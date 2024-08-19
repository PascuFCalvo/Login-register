import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function UpdateProfile() {
  const [username, setUsername] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [profilePicture, setProfilePicture] = useState("");

  const navigate = useNavigate();
  const oldUsername = useSelector((state) => state.auth.user); // Se asume que es el username, no el ID

  // Función para obtener los datos completos del usuario
  const getCompleteUser = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/v1/users/getCompleteUser/${oldUsername}`, // Se asume que oldUsername es el username
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorDetails = await response.text();
        throw new Error(
          `Error fetching complete user: ${response.status} - ${errorDetails}`
        );
      }

      const data = await response.json();

      // Actualizar los estados con los datos del usuario
      setUsername(data.username);
      setSurname(data.surname);
      setEmail(data.email);
      setPhone(data.phone);
      setAddress(data.address);
      setCity(data.city);
      setCountry(data.country);
      setPostalCode(data.postal_code);
      setProfilePicture(data.profile_picture);
    } catch (error) {
      console.error("Error fetching complete user:", error);
    }
  };

  // Cargar los datos del usuario cuando se monta el componente
  useEffect(() => {
    if (oldUsername) {
      getCompleteUser();
    }
  }, [oldUsername]);

  // Función para enviar los datos actualizados del perfil
  const sendData = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:3000/v1/credentials/update",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            surname,
            email,
            phone,
            address,
            city,
            country,
            postalCode,
            profilePicture,
          }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `HTTP error! status: ${response.status}, details: ${errorText}`
        );
      }

      const data = await response.json();
      console.log("Response data:", data);

      if (data.success) {
        console.log("Profile updated successfully");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <>
      <form onSubmit={sendData}>
        <h1>Your profile</h1>
        <label>Username:</label>
        <input
          type="text"
          placeholder={oldUsername}
          value={oldUsername}
          onChange={(event) => setUsername(event.target.value)}
        />
        <label>Surname:</label>
        <input
          type="text"
          placeholder={surname}
          value={surname}
          onChange={(event) => setSurname(event.target.value)}
        />
        <label>Email:</label>
        <input
          type="email"
          placeholder={email}
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <label>Phone:</label>
        <input
          type="text"
          placeholder={phone}
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
        />
        <label>Address:</label>
        <input
          type="text"
          placeholder={address}
          value={address}
          onChange={(event) => setAddress(event.target.value)}
        />
        <label>City:</label>
        <input
          type="text"
          placeholder={city}
          value={city}
          onChange={(event) => setCity(event.target.value)}
        />
        <label>Country:</label>
        <input
          type="text"
          placeholder={country}
          value={country}
          onChange={(event) => setCountry(event.target.value)}
        />
        <label>Postal Code:</label>
        <input
          type="text"
          placeholder={postalCode}
          value={postalCode}
          onChange={(event) => setPostalCode(event.target.value)}
        />
        <label>Profile Picture:</label>
        <input
          type="text"
          placeholder={profilePicture}
          value={profilePicture}
          onChange={(event) => setProfilePicture(event.target.value)}
        />
        <button onClick={() => navigate("/changePassword")}>
          Change Password
        </button>
        <button type="submit">Complete Profile</button>
        <button onClick={() => navigate("/mainPage")}>Volver</button>
      </form>
    </>
  );
}

export default UpdateProfile;
