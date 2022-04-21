const db            = require("../models");
const Maintenance   = db.maintenance;
const RideCoaster   = db.rides_coaster;


module.exports = {
    maintenance: (req, res) => {
        //Create row for maintenance table

        let data = {
            Worker_ID: req.user.user_id,
            Date_Started: req.body.Date_Started,
            Date_Completed: req.body.Date_Completed,
            Rides_coaster_ID: req.body.Rides_Coaster_ID,
            ridesCoasterRideCoasterID : req.body.Rides_Coaster_ID,
            userUserId: req.user.user_id,
        };

        Maintenance.create(data).then(_data => {
            res.status(200).send({
                status: 200,
                message: "Maintenance stored successfully"
            })
        })
            .catch(err => {
                res.status(200).send({
                    status: 500,
                    message: "Some error occurred while creating the user." + err.message
                })
            });
    },
    getMaintenance: (req, res) => {
        let user_id = req.user.user_id;

        Maintenance.findAll({
            where: {
                Worker_ID: user_id
            },
            include: [{
                model: RideCoaster, as: 'coaster',
            }],
        }).then(async (data) => {
            return res.status(200).send({
                status: 200,
                maintenances: data
            });
        }).catch(err => {
            res.status(200).send({
                status: 500,
                message: "Some error occurred while creating the user." + err.message
            })
        });
    },
    UpdateMaintenance: (req, res) => {
        let id = req.params.id;
        let user_id = req.user.user_id;

        Maintenance.findOne({
            where: {
                Maintenance_ID: id
            }
        }).then(async (data) => {
            if (data) {
                Maintenance.update({
                    Date_Started: req.body.Date_Started,
                    Date_Completed: req.body.Date_Completed,
                    Rides_Coaster_ID: req.body.Rides_coaster_ID,
                    ridesCoasterRideCoasterID : req.body.Rides_coaster_ID,
                    userUserId: user_id,
                }, {
                    where: {
                        Maintenance_ID: id
                    }
                }).then(async (_data) => {
                    res.status(200).send({
                        status: 200,
                        message: "Maintenance updated successfully"
                    })
                }).catch(err => {
                    res.status(200).send({
                        status: 500,
                        message: "Some error occurred while creating the user." + err.message
                    })
                });

            } else {
                res.status(200).send({
                    status: 500,
                    message: "Invalid request submitted"
                })
            }
        }).catch(err => {
            res.status(200).send({
                status: 500,
                message: "Some error occurred while creating the user." + err.message
            })
        });
    },
    deleteMaintenance: (req, res) => {
        Maintenance.findOne({
            where: {
                Maintenance_ID: req.params.id
            }
        }).then(async (data) => {
            if (data) {
                Maintenance.destroy({
                    where: {Maintenance_ID: req.params.id}
                }).then(_data => {
                    return res.status(200).send({
                        message: "Maintenance deleted successfully"
                    });
                })
                    .catch(err => {
                        res.status(200).send({
                            status: 500,
                            message: err.message})
                    });
            } else {
                return res.status(200).send({
                    status: 500,
                    message: "Something went wrong! Please try again later"
                });
            }

        })
            .catch(err => {
                return res.status(200).send({
                    status: 500,
                    message: "Something went wrong! Please try again later"
                });
            });
    }
}
