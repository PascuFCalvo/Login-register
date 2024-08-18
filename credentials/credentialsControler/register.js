import bcrypt from "bcrypt";
import con from "../../database.js";
import { v4 as uuidv4 } from "uuid";

// Función de registro de usuario
const userRegister = (req, res) => {
  const { username, password } = req.body;
  const uuid = uuidv4();
  // Verificar que los campos necesarios estén presentes
  if (!username || !password) {
    return res.status(400).json({ error: "Faltan campos obligatorios" });
  }

  // Encriptar la contraseña
  const encriptedPassword = bcrypt.hashSync(password, 10);

  // Insertar en la tabla `users`
  const query1 = "INSERT INTO users (name, password) VALUES (?, ?)";
  con.query(query1, [username, encriptedPassword], (err, result) => {
    if (err) {
      console.error("Error al registrar usuario en `users`:", err); // Log detallado del error
      return res.status(500).json({ error: "Error interno del servidor" });
    }

    // Si el registro en `users` es exitoso, insertar en la tabla `profiles`
    const query2 = "INSERT INTO profile (user_id, name) VALUES (?, ?)";
    con.query(query2, [uuid, username], (err, result) => {
      if (err) {
        console.error("Error al registrar perfil en `profiles`:", err); // Log detallado del error
        return res.status(500).json({ error: "Error interno del servidor" });
      }

      // Enviar una respuesta de éxito después de ambas inserciones exitosas
      res.status(201).json({ message: "Usuario registrado exitosamente" });
    });
  });
};

export default userRegister;
