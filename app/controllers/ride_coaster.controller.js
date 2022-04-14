const db            = require("../models");
const RidesCoaster  = db.rides_coaster;
const Ticket        = db.tickets;
const Area          = db.area;

module.exports = {
    createRideCoaster: (req, res) => {
        RidesCoaster.findOne({
            where: {
                Name: req.body.name
            }
        }).then(_data => {
            if(_data){
                res.status(200).send({
                    status: 400,
                    message:"Rider Coaster already exist with this name"
                })
            }else{
                let data = {
                    Name: req.body.name,
                    Type : req.body.type,
                    Price: req.body.price,
                    Capacity: req.body.capacity,
                    Area_ID: req.body.area,
                    areaAreaID: req.body.area,
                    Date_opened: req.body.date_opened
                };
                RidesCoaster.create(data).then(_data => {
                    res.status(200).send({
                        status: 200,
                        message: "Rider Coaster stored successfully"
                    })
                })
                .catch(err => {
                    res.status(200).send({
                        status: 500,
                        message: "Some error occurred while creating the user." + err.message
                    })
                });
            }

        })
        .catch(err => {
            res.status(200).send({
                status: 500,
                message: "Some error occurred while creating the user." + err.message
            })
        });
    },

    allRideCoasters: (req, res) => {
        // get all rides_coaster
        RidesCoaster.findAll({
            include: [{
             model: Area, as: 'area',
            }],
        })
            .then(async (data) => {
                return res.status(200).send({
                    status: 200,
                    rides_coaster: data
                });
            }).catch(err => {
            return res.status(200).send({
                status: 400,
                message:"Something went wrong! Please try later "+ err.message
            });
        });
    },

    getRideCoaster: (req, res) => {
        let ride_id = req.params.id;

        // get all rides_coaster
        RidesCoaster.findAll({
            where: {
                Ride_coaster_ID: ride_id
            },
            include: [{
                model: Area, as: 'area',
            }],
        })
            .then(async (data) => {
                return res.status(200).send({
                    status: 200,
                    rides_coaster: data
                });
            }).catch(err => {
            return res.status(200).send({
                status: 400,
                message:"Something went wrong! Please try later"
            });
        });
    },

    updateRideCoaster: (req, res) => {
        let ride_id = req.params.id;
        RidesCoaster.findOne({
            Ride_coaster_ID: ride_id
        }).then(async(_data) => {
            RidesCoaster.update({
                Name: req.body.name,
                Type: req.body.type,
                Price: req.body.price,
                Capacity: req.body.capacity,
                Area_ID: req.body.area,
                areaAreaID: req.body.area,
                Date_opened: req.body.date_opened
            }, {
                where: {
                    Ride_coaster_ID: ride_id
                }
            }).then(async (_data) => {
                res.status(200).send({
                    status: 200,
                    message: "Rider Coaster updated successfully"
                })
            }).catch(err => {
                res.status(200).send({
                    status: 500,
                    message: "Some error occurred while updating the Rider Coaster." + err.message
                })
            });
        })
        .catch(err => {
            res.status(200).send({
                status: 500,
                message: "Some error occurred while updating the Rider Coaster." + err.message
            })
        });
    },

    deleteRideCoaster: (req, res) => {
        let ride_id = req.params.id;

        RidesCoaster.findOne({
            where: {
                Ride_coaster_ID: ride_id
            }
        }).then(async (data) => {
            if (data) {
                RidesCoaster.destroy({
                    where: {Ride_coaster_ID: ride_id}
                }).then(_data => {
                    return res.status(200).send({
                        status: 200,
                        message: "Rider Coaster deleted successfully"
                    });
                })
                    .catch(err => {
                        res.status(200).send({
                            status: 500,message: err.message})
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
    },
}
