const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");
const connectDb = require("./config/mongoose-connection");
const ownerRoutes = require("./routes/owner.routes");
const productsRoutes = require("./routes/product.routes");
const usersRoutes = require("./routes/users.routes");

const app = express();

// Middlewares
app.set("view engine", "ejs");
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public"))); // Serve static files

// Connect to the database
connectDb()
  .then(() => console.log("Database connected successfully"))
  .catch((err) => console.error("Database connection failed:", err));



// setup apis
app.use("/owners", ownerRoutes);
app.use("/product", productsRoutes);
app.use("/user", usersRoutes);



// Routes
app.get("/", (req, res) => {
  res.send("Hello World From Backend");
});

// Start the server
const PORT = process.env.PORT || 3000; // Configurable port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
