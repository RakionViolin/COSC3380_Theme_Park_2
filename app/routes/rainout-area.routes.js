module.exports = app => {
    const { getAreas, getArea, createArea, updateArea , deleteArea, rainOuts, getRainOutAreas}
        = require("../controllers/area.controller");
    const verify  = require('./verifyToken');
    const router   = require("express").Router();

    router.post("/", verify, rainOuts);
    router.get("/", verify, getRainOutAreas);

    app.use('/api/v0/rainout', router);
}
