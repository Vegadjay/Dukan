const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const ownerRoutes = require("./routes/owner.routes");
const productsRoutes = require("./routes/product.routes");
const usersRoutes = require("./routes/users.routes");
const indexRputer = require("./routes/index");

const app = express();

// Middlewares
app.set("view engine", "ejs");
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(morgan('dev'));

// setup apis
app.use("/",indexRputer)
app.use("/owners", ownerRoutes);
app.use("/product", productsRoutes);
app.use("/user", usersRoutes);


// Start the server
const PORT = process.env.PORT || 3000; // Configurable port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
