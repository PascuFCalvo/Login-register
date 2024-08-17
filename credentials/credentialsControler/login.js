import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import con from "../../database.js";

const userLogin = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
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
    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: "Contraseña incorrecta" });
    }

    const token = jwt.sign({ username: user.name }, "secreto", {
      expiresIn: 86400, // 24 horas
    });

    // Elimina el campo de contraseña y asegúrate de devolver solo los datos necesarios del usuario
    delete user.password;

    // Crear un objeto limpio para la respuesta del usuario
    const userData = {
      name: user.name,
    };

    res.json({
      success: true,
      token,
      user: userData,
    });
  });
};

export default userLogin;
