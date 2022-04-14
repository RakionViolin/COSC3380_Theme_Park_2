const db     = require("../models");
const Area   = db.area;
const Rainout   = db.rainouts;

module.exports = {
    createArea: (req, res) => {
        const name = req.body.area_name;

        if(name === ''){
            return res.status(400).send({
                message:"Area name can not be blank"
            });
        }else{
            Area.findOne({
                where: {
                    Area_Name: name
                }
            }).then(_data => {
                if(_data){
                    res.status(200).send({
                        status: 400,
                        message:"Area already exist with this name"
                    })
                }else{
                    let data = {
                        Area_Name: name
                    }
                    Area.create(data).then(_data => {
                        res.status(200).send({
                            status: 200,
                            message: "Area stored successfully"
                        })
                    })
                    .catch(err => {
                        res.status(200).send({
                            status: 500,
                            message: "Some error occurred while creating the area." + err.message
                        })
                    });
                }

            })
            .catch(err => {
                res.status(200).send({
                    status: 500,
                    message: "Some error occurred while creating the area." + err.message
                })
            });
        }
    },

    getArea: (req, res) => {
        let area_id = req.params.id;

        Area.findOne({
            Area_ID : area_id
        }).then(async(_data) => {
            res.status(200).send({
                status: 200,
                area: _data
            })
        })
        .catch(err => {
            res.status(200).send({
                status: 500,
                message: "Some error occurred while creating the area." + err.message
            })
        });
    },

    getAreas: (req, res) => {
        Area.findAll().then(async(_data) => {
            res.status(200).send({
                status: 200,
                areas: _data
            })
        })
            .catch(err => {
                res.status(200).send({
                    status: 500,
                    message: "Some error occurred while creating the user." + err.message
                })
            });
    },

    updateArea: (req, res) => {
        let area_id = req.params.id;
        const name = req.body.area_name;

        if(name === ''){
            return res.status(200).send({
                status: 500,
                message:"Area name can not be blank"
            });
        }else {
            Area.findOne({
                Area_ID : area_id
            }).then(async(_data) => {
                Area.update({
                    Area_Name: req.body.area_name
                }, {
                    where: {
                        Area_ID : area_id
                    }
                }).then(async (_data) => {
                    res.status(200).send({
                        status: 200,
                        message: "Area updated successfully"
                    })
                }).catch(err => {
                    res.status(200).send({
                        status: 500,
                        message: "Some error occurred while updating the area." + err.message
                    })
                });
            })
            .catch(err => {
                res.status(200).send({
                    status: 500,
                    message: "Some error occurred while updating the area." + err.message
                })
            });
        }
    },

    deleteArea: (req, res) => {
        let area_id = req.params.id;
        Area.findOne({
            where: {
                Area_ID : area_id
            }
        }).then(async (data) => {
            if (data) {
                Area.destroy({
                    where: {Area_ID : area_id}
                }).then(_data => {
                    return res.status(200).send({
                        status: 200,
                        message: "Area deleted successfully"
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

    rainOuts: (req, res) => {
        let data = {
            Date_: req.body.date,
            Area_ID: req.body.area_id
        }

        Rainout.create(data).then(_data => {
            res.status(200).send({
                status: 200,
                message: "Rainout Area added successfully"
            })
        })
        .catch(err => {
            res.status(200).send({
                status: 500,
                message: "Some error occurred while creating the user." + err.message
            })
        });
    },

    getRainOutAreas: (req, res) => {
        Rainout.findAll().then(async(_data) => {
            res.status(200).send({
                status: 200,
                areas: _data
            })
        })
            .catch(err => {
                res.status(200).send({
                    status: 500,
                    message: "Some error occurred while getting the rainout areas." + err.message
                })
            });
    },
}
