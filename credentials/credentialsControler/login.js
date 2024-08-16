import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import con from "../../database.js";

const userLogin = (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
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

    const token = jwt.sign({ id: user.id }, "secreto", {
      expiresIn: 86400,
    });
    console.log("Usuario logueado:", user.name);
    console.log("Token:", token);
    res.json({ token });
  });
};

export default userLogin;
