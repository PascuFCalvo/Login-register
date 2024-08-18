import con from "../../database.js";
import bcrypt from "bcrypt";

const changePassword = (req, res) => {
  const { username, oldPassword, newPassword } = req.body; // Asegúrate de enviar el username desde el frontend

  if (!username || !oldPassword || !newPassword) {
    return res.status(400).json({ error: "Faltan campos obligatorios" });
  }

  const query = "SELECT * FROM users WHERE name = ?";
  con.query(query, [username], (err, result) => {
    if (err) {
      console.error("Error al buscar usuario:", err);
      return res.status(500).json({ error: "Error interno del servidor" });
    }

    if (result.length === 0) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    const user = result[0];
    const validPassword = bcrypt.compareSync(oldPassword, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: "Contraseña incorrecta" });
    }

    const encryptedPassword = bcrypt.hashSync(newPassword, 10);
    const updateQuery = "UPDATE users SET password = ? WHERE name = ?";
    con.query(updateQuery, [encryptedPassword, username], (err, result) => {
      if (err) {
        console.error("Error al actualizar contraseña:", err);
        return res.status(500).json({ error: "Error interno del servidor" });
      }

      res.json({ message: "Contraseña actualizada exitosamente" });
    });
  });
};

export default changePassword;
