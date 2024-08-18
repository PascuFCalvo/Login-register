import con from "../../database.js";

const userUpdate = (req, res) => {
  console.log("Datos recibidos en el cuerpo de la solicitud:", req.body);
  const {
    username,
    surname,
    email,
    phone,
    address,
    city,
    country,
    postalCode,
    profilePicture,
  } = req.body;

  // Verificación inicial de los datos recibidos
  if (!username) {
    return res
      .status(400)
      .json({ error: "El nombre de usuario es obligatorio" });
  }

  // Consulta de actualización directamente sobre el `username`
  const queryUpdate = `
    UPDATE profile 
    SET name = ?, surname = ?, email = ?, phone = ?, address = ?, city = ?, country = ?, postal_code = ?, profile_picture = ?
    WHERE name = ?
  `;
  console.log("Ejecutando consulta de actualización:", queryUpdate);

  con.query(
    queryUpdate,
    [
      username,
      surname,
      email,
      phone,
      address,
      city,
      country,
      postalCode,
      profilePicture,
      username, // Usar el `username` en la cláusula WHERE
    ],
    (err, result) => {
      if (err) {
        console.error("Error al actualizar el perfil:", err);
        return res.status(500).json({ error: "Error interno del servidor" });
      }

      if (result.affectedRows === 0) {
        console.log(
          "No se pudo actualizar el perfil para el nombre de usuario:",
          username
        );
        return res
          .status(404)
          .json({ error: "Perfil no encontrado para actualizar" });
      }

      console.log(
        "Perfil actualizado exitosamente para el nombre de usuario:",
        username
      );
      res.status(200).json({ message: "Perfil actualizado exitosamente" });
    }
  );
};

export default userUpdate;
