import { useState } from "react";
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
        console.log("Profile updated successfully");
      }
    } catch (error) {
      console.error("Error registering:", error);
    }
  };

  return (
    <>
      <form onSubmit={sendData}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
        <input
          type="text"
          placeholder="Surname"
          value={surname}
          onChange={(event) => setSurname(event.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <input
          type="text"
          placeholder="Phone"
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
        />
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(event) => setAddress(event.target.value)}
        />
        <input
          type="text"
          placeholder="City"
          value={city}
          onChange={(event) => setCity(event.target.value)}
        />
        <input
          type="text"
          placeholder="Country"
          value={country}
          onChange={(event) => setCountry(event.target.value)}
        />
        <input
          type="text"
          placeholder="Postal Code"
          value={postalCode}
          onChange={(event) => setPostalCode(event.target.value)}
        />
        <input
          type="text"
          placeholder="Profile Picture"
          value={profilePicture}
          onChange={(event) => setProfilePicture(event.target.value)}
        />
        <button onClick={() => navigate("/changePassword")}>
          Change Password
        </button>
        <button type="submit">Complete Profile</button>
        <button onClick={() => navigate("/mainPage")}>volver</button>
      </form>
    </>
  );
}

export default UpdateProfile;
