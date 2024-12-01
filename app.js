// requirements
const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const expressSession  = require("express-session");
const flash = require('connect-flash');
const cors = require('cors');
const ownerRoutes = require("./routes/owner.routes");
const productsRoutes = require("./routes/product.routes");
const usersRoutes = require("./routes/users.routes");
const indexRouter = require("./routes/index");
const conenctionMongoDb = require("./config/mongoose-connection");
const app = express();

// Middlewares
app.set("view engine", "ejs");
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(morgan('dev'));
app.use(flash());
app.use(cors());
app.use(
  expressSession({
    resave: false,
    saveUninitialized: false,
    secret: process.env.EXPRESS_SESSION_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
      sameSite: 'None' 
    }
  })
);
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ error: err.message });
});



// call database connection
conenctionMongoDb();

// setup apis
app.use("/",indexRouter)
app.use("/owners", ownerRoutes);
app.use("/products", productsRoutes);
app.use("/users", usersRoutes);


// Start the server
const PORT = process.env.PORT || 3000; // Configurable port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
