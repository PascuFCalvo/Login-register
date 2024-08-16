import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();

const con = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

con.connect((err) => {
  if (err) throw err;
  console.log("Connected!");
});

export default con;
