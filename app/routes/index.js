module.exports = app => {
    require("../routes/auth.routes.js") (app);
    require("../routes/user.routes.js") (app);
    require("../routes/area.routes.js") (app);
    require("../routes/rainout-area.routes.js") (app);
    require("../routes/ride.routes.js") (app);
    require("../routes/ride_coaster.routes.js") (app);
    require("../routes/dashboard.routes") (app);
}
