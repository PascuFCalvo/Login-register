import con from "../../database.js";

const getCompleteUser = (req, res) => {
  const query = "SELECT * FROM profile WHERE name = ?";
  con.query(query, [req.params.username], (err, result) => {
    if (err) {
      res.status(500).send("Failed to get user");
      return;
    }
    if (result.length === 0) {
      res.status(404).send("User not found");
      return;
    }
    res.send(result[0]);
  });
};

export default getCompleteUser;
