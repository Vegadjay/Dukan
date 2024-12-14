const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const expressSession = require("express-session");
const cors = require("cors");
const flash = require("connect-flash");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const methodOverride = require('method-override');
const helmet = require("helmet");
const productsRoutes = require("./routes/product.routes");
const authPages = require("./routes/authpage.routes");
const indexRouter = require("./routes/index");
const authController = require("./controllers/authController");
const userShopRoutes = require("./routes/userspage.routes");
const ownersRoutes = require("./routes/ownes.routes");
const shopController = require("./controllers/shopController");
const authMiddleware = require("./middlewares/authMiddleware");
const setHeader = require("./middlewares/setHeader");
const connectionMongoDb = require("./config/mongooseConnection");
dotenv.config();
const app = express();

// Middlewares
app.set("view engine", "ejs");
app.use(express.json());
app.use(cookieParser());
app.use(express.static("public"));
app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  expressSession({
    resave: false,
    saveUninitialized: false,
    secret: process.env.EXPRESS_SESSION_SECRET,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
    },
  })
);

app.use(flash());

// Call database connection
(async () => {
  try {
    await connectionMongoDb();
    console.log("MongoDB connected successfully.");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
})();

// Public routes (no auth required)
app.use("/", indexRouter);
app.use("/auth/pages", authPages);
app.use("/api/auth", setHeader, authController);

// Protected routes (auth required)
app.use(authMiddleware);
app.use("/products", productsRoutes);
app.use("/users", userShopRoutes);
app.use("/owners", ownersRoutes);
app.use("/shop", shopController);


// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("Error occurred:", err);
  if (res.headersSent) {
    return next(err);
  }
  res.status(500).render("/error");
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
