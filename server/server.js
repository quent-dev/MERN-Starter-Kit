const express = require("express");
const path = require("path");
const app = express();
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const flash = require("express-flash");
const connectDB = require("./config/database");
const morgan = require("morgan");
const passport = require("passport");

//Use .env file in config folder
require("dotenv").config({ path: "./config/.env" });
const authRoutes = require("./routes/auth");

// Enable CORS for client origin only
const cors = require('cors');
const corsOptions = {
   origin : ['http://localhost:3000', 'https://localhost:3000'],
}
app.use(cors(corsOptions))

//Logging
app.use(morgan('dev'));

//Body Parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Setup Sessions - stored in MongoDB
app.use(
  session({
    secret: process.env.SESSION_SECRET || "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

// Passport config
require("./config/passport")(passport);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Render React as View
app.use(express.static(path.join(__dirname, "..", "client", "build")));

//Use flash messages for errors, info, ect...
app.use(flash());

//Setup Routes For Which The Server Is Listening
app.use("/auth", authRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

// error handler
app.use((err, req, res, next) => {
  const { status = 500, message = "Server error", stack } = err;
  console.log(stack);
  res.status(status).json({ message });
});

//Connect To Database
connectDB().then(() => {
  //Server Running
  app.listen(process.env.PORT, () => {
    console.log(
      `Server is running on ${process.env.PORT}, you better catch it!`
    );
  });
});

// Removed this from package.json
// "concurrently \"node dev-mongo\" \"nodemon server.js\""
