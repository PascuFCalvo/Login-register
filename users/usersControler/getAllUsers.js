import con from "../../database.js";

const getAllUsers = (req, res) => {
  const query = "SELECT * FROM users";
  con.query(query, (err, result) => {
    if (err) {
      console.error("Error al buscar usuarios:", err);
      return res.status(500).json({ error: "Error interno del servidor" });
    }

    res.json(result);
  });
};

export default getAllUsers;
