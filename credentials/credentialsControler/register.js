import bcrypt from "bcrypt";
import con from "../../database.js";
import bodyParser from "body-parser";

// Función de registro de usuario
const userRegister = (req, res) => {
  // Asegurarse de que req.body no esté vacío
  const username = req.body.username;
  const password = req.body.password;
  // Verificar que los campos necesarios estén presentes
  if (!username || !password) {
    return res.status(400).json({ error: "Faltan campos obligatorios" });
  }

  // Encriptar la contraseña
  const encriptedPassword = bcrypt.hashSync(password, 10);

  // Consulta SQL segura con parámetros
  const query = "INSERT INTO users (name, password) VALUES (?, ?)";
  con.query(query, [username, encriptedPassword], (err, result) => {
    if (err) {
      // Manejar errores adecuadamente
      console.error("Error al registrar usuario:", err);
      return res.status(500).json({ error: "Error interno del servidor" });
    }

    // Responder con éxito
    res.status(201).json({ message: "Usuario registrado exitosamente" });
  });
};

export default userRegister;
