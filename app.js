// requirements
const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const expressSession  = require("express-session");
const flash = require('connect-flash');
const cors = require('cors');
const bodyParser = require('body-parser')
const productsRoutes = require("./routes/product.routes");
const authPages = require("./routes/authpage.routes")
const indexRouter = require("./routes/index");
const authController = require("./routes/auth.routes")
const requestValidationMiddleware = require("./middlewares/setHeader");
const conenctionMongoDb = require("./config/mongooseConnection");
const app = express();

// Middlewares
app.set("view engine", "ejs");
app.use(express.json());
app.use(cookieParser());
app.use(express.static("public"));
app.use(morgan('dev'));
app.use(flash());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
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
app.use(requestValidationMiddleware);

// call database connection
conenctionMongoDb();

// setup apis
app.use("/",indexRouter);
app.use('/auth',authController)
app.use("/auth", authPages);
app.use("/products", productsRoutes);
// app.use("/users", usersRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
