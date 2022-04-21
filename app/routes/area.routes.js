module.exports = app => {
    const { getAreas, getArea, createArea, updateArea , deleteArea}
        = require("../controllers/area.controller");
    const verify  = require('./verifyToken');
    const router   = require("express").Router();

    router.get("/", verify, getAreas);
    router.get("/:id", verify, getArea);
    router.post("/", verify, createArea);
    router.put('/:id', verify, updateArea);
    router.delete('/:id', verify, deleteArea);

    app.use('/api/v0/area', router);
}
