import con from "./database.js";

const createDatabase = () => {
  con.query("CREATE DATABASE IF NOT EXISTS `users`", (err) => {
    if (err) throw err;
    console.log("Database created");
  });
};

const createTableUsers = () => {
  con.query(
    `CREATE TABLE IF NOT EXISTS \`users\` (
      id INT AUTO_INCREMENT PRIMARY KEY, 
      name VARCHAR(255), 
      password VARCHAR(255)
      FOREIGN KEY (id) REFERENCES profile(user_id) ON DELETE CASCADE ON UPDATE CASCADE
    ) ENGINE=InnoDB`,
    (err) => {
      if (err) throw err;
      console.log("Users table created");
    }
  );
};

const createTableProfile = () => {
  con.query(
    `CREATE TABLE IF NOT EXISTS \`profile\` (
      id INT AUTO_INCREMENT PRIMARY KEY, 
      user_id INT, 
      name VARCHAR(255), 
      surname VARCHAR(255), 
      email VARCHAR(255), 
      phone VARCHAR(255), 
      address VARCHAR(255), 
      city VARCHAR(255), 
      country VARCHAR(255), 
      postal_code VARCHAR(255), 
      profile_picture VARCHAR(255),
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
    ) ENGINE=InnoDB`,
    (err) => {
      if (err) throw err;
      console.log("Profile table created");
    }
  );
};

const launch = () => {
  createDatabase();
  createTableUsers();
  createTableProfile();
};

launch();
