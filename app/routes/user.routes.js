module.exports = app => {
    const { createUser, getUsers, getCustomers, updateUser, deleteUser, getWorkers}
        = require("../controllers/user.controller");
    const verify  = require('./verifyToken');
    const router   = require("express").Router();

    router.get("/", verify, getUsers);
    router.get("/customers", verify, getCustomers);
    router.get("/workers", verify, getWorkers);
    router.post("/", verify, createUser);
    router.put('/:id', verify, updateUser);
    router.delete('/:id', verify, deleteUser);

    app.use('/api/v0/user', router);
}
