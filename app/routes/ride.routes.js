module.exports = app => {
    const { getRide, allRides, createRide, updateRide, deleteRide}
        = require("../controllers/rides.controller");
    const verify  = require('./verifyToken');
    const router   = require("express").Router();

    router.get("/", verify, allRides);
    router.get("/:id", verify, getRide);
    router.post("/", verify, createRide);
    router.put('/:id', verify, updateRide);
    router.delete('/:id', verify, deleteRide);

    app.use('/api/v0/ride', router);
}
