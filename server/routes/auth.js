const express = require("express");
const router = express.Router();
const passport = require("passport");
const authController = require("../controllers/auth");

// @desc Local Auth
// @route Get /auth
router.get(
    "/",
    passport.authenticate("local", {
        failureRedirect: "/",
    },
    ),
    (req, res) => {
        res.redirect("/");
    }
);

// @desc Login
// @route Get /auth/login
router.get("/login", authController.getLogin);

// @desc Login
// @route post /auth/login
router.post("/login", authController.postLogin);

// authController.postLogin

// @desc Logout
// @route Get /auth/logout
router.get("/logout", authController.logout);

// @desc Login
// @route post /auth/login
router.post("/signup", authController.postSignup);


module.exports = router