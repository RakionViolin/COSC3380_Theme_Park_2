const db            = require("../models");
const Ticket        = db.tickets;
const Rides         = db.rides;
const RideCoaster   = db.rides_coaster;
const Maintenance   = db.maintenance;
const User          = db.users;
//const { Op }        = db.Sequelize;
const { Op } = require('sequelize');
module.exports = {
    myPurchase: (req, res) => {
        let user_id = req.user.user_id;

        Ticket.findAll({
            where: {
                customer_ID: user_id
            },
            include: [{
                model: RideCoaster, as: 'tickets',
            }],
        }).then(async (data) => {
            return res.status(200).send({
                status: 200,
                tickets: data
            });
        }).catch(err => {
            res.status(200).send({
                status: 500,
                message: "Some error occurred while creating the user." + err.message})
        });
    },
    createTicket: (req, res) => {
        let data = {
            Rides_coaster_ID: req.body.rides_coaster,
            customer_ID: req.user.user_id,
            Price: req.body.price,
            admission_date: req.body.admission_date,
            ridesCoasterRideCoasterID: req.body.rides_coaster,
            userUserId : req.user.user_id
        };

        Ticket.create(data).then(_data => {

            if(_data){
                let rides = {
                    Date_: req.body.admission_date,
                    Number_of_Passenger: req.body.no_of_passenger,
                    Ride_coaster_ID:req.body.rides_coaster,
                    ridesCoasterRideCoasterID : req.body.rides_coaster,
                }

                Rides.create(rides).then(__data => {
                    res.status(200).send({
                        status: 200,
                        message: "Ticket purchased done successfully"
                    })
                })
                    .catch(err => {
                        res.status(200).send({
                            status: 500,
                            message: "Some error occurred while creating the ticket." + err.message})
                    });
            }
        })
        .catch(err => {
            res.status(200).send({
                status: 500,
                message: "Some error occurred while creating the user." + err.message})
        });

    },
	
    allPurchased: (req, res) => {
        var currentdate = new Date();
        var datetime = currentdate.getFullYear() +'-'+ (currentdate.getMonth()+1) +'-' + currentdate.getDate();
        let start = datetime+' 00:00:00';
        let end  = datetime+' 23:59:59';
        console.log(start, end)
        Ticket.findAll({
            where: {
                admission_date: {
                    [Op.between] :  [start, end]
                }
            },
            include: [{
                model: RideCoaster, as: 'tickets',
            },{
                model: User, as: 'Customer',
            }
            ],
        }).then(async (data) => {
            return res.status(200).send({
                status: 200,
                tickets: data
            });
        }).catch(err => {
            res.status(200).send({
                status: 500,
                message: "Some error occurred while creating the user." + err.message})
        });
    },
	
	searchPurchased: (req, res) => {
        let whereQuery = {};
        let whereQuery2 = {};
        
        if(req.body.date_from && req.body.date_from!=''){
            start = req.body.date_from+' 00:00:00';
        }
        if(req.body.date_to && req.body.date_to!=''){
            end = req.body.date_to+' 23:59:59';
        }
        if(req.body.customer &&  req.body.customer!=''){
            whereQuery.customer_ID = req.body.customer;
        }
        if(req.body.rides_coaster &&  req.body.rides_coaster!=''){
            whereQuery.Rides_coaster_ID = req.body.rides_coaster;
        }
        if(req.body.area &&  req.body.area!=''){
            whereQuery2.Area_ID = req.body.area;
        }

        if(req.body.date_from && req.body.date_to &&  req.body.date_from!='' &&  req.body.date_to!=''){
            Ticket.findAll({
                where: whereQuery,
                where: {
                    admission_date: {
                        [Op.between] :  [start, end]
                    }
                },
                include: [{
                    model: RideCoaster, as: 'tickets',
                    where: whereQuery2,
                },{
                    model: User, as: 'Customer',
                }
                ],
            }).then(async (data) => {
                return res.status(200).send({
                    status: 200,
                    tickets: data
                });
            }).catch(err => {
                res.status(200).send({
                    status: 500,
                    message: "Some error occurred while creating the user." + err.message})
            });
        }else if(req.body.date_from &&  req.body.date_from!=''){
            Ticket.findAll({
                where: whereQuery,
                where: {
                    admission_date: {
                        [Op.gte]: start
                    }
                },
                include: [{
                    model: RideCoaster, as: 'tickets',
                    where: whereQuery2,
                },{
                    model: User, as: 'Customer',
                }
                ],
            }).then(async (data) => {
                return res.status(200).send({
                    status: 200,
                    tickets: data
                });
            }).catch(err => {
                res.status(200).send({
                    status: 500,
                    message: "Some error occurred while creating the user." + err.message})
            });
        }else if(req.body.date_to &&  req.body.date_to!=''){
            Ticket.findAll({
                where: whereQuery,
                where: {
                    admission_date: {
                        [Op.lte]: end
                    }
                },
                include: [{
                    model: RideCoaster, as: 'tickets',
                    where: whereQuery2,
                },{
                    model: User, as: 'Customer',
                }
                ],
            }).then(async (data) => {
                return res.status(200).send({
                    status: 200,
                    tickets: data
                });
            }).catch(err => {
                res.status(200).send({
                    status: 500,
                    message: "Some error occurred while creating the user." + err.message})
            });
        }else{
            Ticket.findAll({
                where: whereQuery,
                include: [{
                    model: RideCoaster, as: 'tickets',
                    where: whereQuery2,
                },{
                    model: User, as: 'Customer',
                }
                ],
            }).then(async (data) => {
                return res.status(200).send({
                    status: 200,
                    tickets: data
                });
            }).catch(err => {
                res.status(200).send({
                    status: 500,
                    message: "Some error occurred while creating the user." + err.message})
            });
        }
	},
	
	siteSummary: (req, res) => {
		User.count({
			where: {
                user_type: "Customer"
            },
		}).then(async(customers) => {
            Rides.count().then(async(rides) => {
                Maintenance.count().then(async(maintenances) => {
                    User.count({
                        where: {
                            user_type: "Employee"
                        },
                    }).then(async(employees) => {
                        Ticket.findAll().then(async(tickets) => {
                            let price = 0;
                            let ticket = 0;
                            let evg_price = 0;
                            tickets.forEach((item) => {
                                ticket++;
                                price += item.Price;
                            });

                            if(ticket > 0){
                                evg_price = price/ticket;
                            }

                            return res.status(200).send({
                                status: 200,
                                customers: customers,
                                rides: rides,
                                maintenances: maintenances,
                                employees: employees,
                                avg_ticket_price: evg_price,
                            });
                        })
                        .catch(err => {
                            res.status(200).send({
                                status: 500,
                                message: "Some error occurred while fetching emplyees." + err.message
                            })
                        });
                    })
                    .catch(err => {
                        res.status(200).send({
                            status: 500,
                            message: "Some error occurred while fetching emplyees." + err.message
                        })
                    });
                })
                .catch(err => {
                    res.status(200).send({
                        status: 500,
                        message: "Some error occurred while fetching maintenances." + err.message
                    })
                });
            })
            .catch(err => {
                res.status(200).send({
                    status: 500,
                    message: "Some error occurred while fetching rides." + err.message
                })
            });
        })
        .catch(err => {
            res.status(200).send({
                status: 500,
                message: "Some error occurred while fetching customers." + err.message
            })
        });
	},
	
	searchSiteSummary: (req, res) => {
        const startedDate = req.body.date_from;console.log(startedDate);
        const endDate = req.body.date_to;console.log(endDate);

        const from = new Date(startedDate);
        const to = new Date(endDate);
        
        if(startedDate == ''){
            res.status(200).send({
                status: 500,
                message: "Date from can not be null"})
        }else if(endDate == ''){
            res.status(200).send({
                status: 500,
                message: "Date to can not be null"})
        }else{
            User.count({
                where: {
                    user_type: "Customer"
                },
            }).then(async(customers) => {
                Rides.count({
                    where: {
                        "Date_" : {[Op.between] : [from , to ]}
                    },
                }).then(async(rides) => {
                    Maintenance.count({
                        where: {
                            "Date_Started" : {[Op.between] : [from , to ]}
                        },
                    }).then(async(maintenances) => {
                        User.count({
                            where: {
                                user_type: "Employee"
                            },
                        }).then(async(employees) => {
                            Ticket.findAll({
                                where: {
                                    "admission_date" : {[Op.between] : [from , to ]}
                                },
                            }).then(async(tickets) => {
                                let price = 0;
                                let ticket = 0;
                                let evg_price = 0;
                                tickets.forEach((item) => {
                                    ticket++;
                                    price += item.Price;
                                });

                                if(ticket > 0){
                                    evg_price = price/ticket;
                                }

                                return res.status(200).send({
                                    status: 200,
                                    customers: customers,
                                    rides: rides,
                                    maintenances: maintenances,
                                    employees: employees,
                                    avg_ticket_price: evg_price,
                                });
                            })
                            .catch(err => {
                                res.status(200).send({
                                    status: 500,
                                    message: "Some error occurred while fetching emplyees." + err.message
                                })
                            });
                        })
                        .catch(err => {
                            res.status(200).send({
                                status: 500,
                                message: "Some error occurred while fetching emplyees." + err.message
                            })
                        });
                    })
                    .catch(err => {
                        res.status(200).send({
                            status: 500,
                            message: "Some error occurred while fetching maintenances." + err.message
                        })
                    });
                })
                .catch(err => {
                    res.status(200).send({
                        status: 500,
                        message: "Some error occurred while fetching rides." + err.message
                    })
                });
            })
            .catch(err => {
                res.status(200).send({
                    status: 500,
                    message: "Some error occurred while fetching customers." + err.message
                })
            });
        }
	}
}
