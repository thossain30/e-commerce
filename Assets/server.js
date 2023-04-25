const express = require('express');
const routes = require('./routes');
// import sequelize connection
const Sequelize = require('sequelize'); 
require("dotenv").config();
const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.USER,
  process.env.PASS, 
  {
    host: 'localhost',
    dialect: 'mysql',
    Port: 3306
  }
);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// sync sequelize models to the database, then turn on the server
sequelize.sync();
app.listen(PORT, () => {
  console.log(`App listening on port http://localhost:${PORT}`);
});
