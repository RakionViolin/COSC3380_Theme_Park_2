const verify = require("./verifyToken");
const {maintenance} = require("../controllers/maintenance.controller");
module.exports = app => {
    const verify = require("./verifyToken");
    const { myPurchase, createTicket, allPurchased, searchPurchased, siteSummary, searchSiteSummary} = require("../controllers/dashboard.controller");
    const { maintenance, getMaintenance, UpdateMaintenance, deleteMaintenance} = require("../controllers/maintenance.controller");

    const router   = require("express").Router();

    router.get("/all-purchase", verify, allPurchased);
    router.post("/search-purchase", verify, searchPurchased);
    router.get("/site-summary", verify, siteSummary);
    router.post("/search-site-summary", verify, searchSiteSummary);
    router.get("/purchase", verify, myPurchase);
    router.post("/purchase", verify, createTicket);
    router.post("/maintenance", verify, maintenance);
    router.get("/maintenance", verify, getMaintenance);
    router.put("/maintenance/:id", verify, UpdateMaintenance);
    router.delete("/maintenance/:id", verify, deleteMaintenance);

    app.use('/api/v0/dashboard', router);
}
