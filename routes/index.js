const express = require("express");
const passport = require("passport");

const router = express.Router();
const homeController = require("../controllers/home_controller");
const app = express();
console.log("router loaded");

router.get("/", homeController.home);
router.use("/users", require("./users"));
router.use("/student", require("./students"));
router.use("/interview", require("./interview"));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);
// for any further routes, access from here
// router.use('/routerName', require('./routerfile));

module.exports = router;
