module.exports = app => {
    const AuthController    = require("../controllers/auth.controller.js");
    const router            = require("express").Router();

    router.post("/register", AuthController.register);
    router.post("/login", AuthController.login);

    app.use('/api/v0/auth', router);
}
