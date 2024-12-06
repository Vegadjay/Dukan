const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const expressSession = require("express-session");
const flash = require('connect-flash');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require("dotenv");
const helmet = require("helmet");
const productsRoutes = require("./routes/product.routes");
const authPages = require("./routes/authpage.routes");
const indexRouter = require("./routes/index");
const authController = require("./routes/auth.routes");
const setHeader = require("./middlewares/setHeader")
const connectionMongoDb = require("./config/mongooseConnection");

dotenv.config();
const app = express();

// Middlewares
app.set("view engine", "ejs");
app.use(express.json());
app.use(cookieParser());
app.use(express.static("public"));
app.use(morgan('dev'));
app.use(helmet());
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
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax'
    }
  })
);
app.use(flash());
// Call database connection
connectionMongoDb();


// Setup APIs
app.use("/", indexRouter);
app.use('/api/auth',setHeader,authController);
app.use("/auth/pages", authPages);
app.use("/products", productsRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ message: "Something went wrong!" });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
