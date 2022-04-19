const db            = require("../models");
const User          = db.users;
const bcrypt        = require("bcryptjs");
const jwt           = require('jsonwebtoken');
const validator     = require("email-validator");

module.exports = {
    createUser:  (req, res) => {
        const full_name = req.body.full_name;
        const dob = req.body.dob;
        const contact = req.body.contact;
        const user_type = req.body.user_type ? req.body.user_type : 'Customer';
        const email = req.body.email;
        const password = req.body.password;

        if (!validator.validate(email)) {
            return res.status(200).send({
                status: 400,
                message: "Provided email address is invalid"
            });
        } else if (password === '') {
            return res.status(200).send({
                status: 400,
                message: "Password can not be blank"
            });
        } else {
            User.findOne({
                where: {
                    email_address: email
                }
            }).then(async (data) => {
                if (data) {
                    return res.status(200).send({
                        status: 400,
                        message: "User already exist with this email address"
                    });
                } else {
                    const salt = await bcrypt.genSalt(10);
                    const hashedPassword = await bcrypt.hash(req.body.password, salt);

                    let data = {
                        full_name:full_name,
                        dob:dob,
                        contact:contact,
                        email_address: email,
                        password: hashedPassword,
                        user_type:user_type
                    };

                    User.create(data)
                        .then(_data => {
                            res.status(200).send({
                                status: 200,
                                message: "User created successfully"})
                        })
                        .catch(err => {
                            res.status(200).send({
                                status: 500,
                                message: "Some error occurred while creating the user." + err.message})
                        });
                }
            }).catch(err => {
                res.status(200).send({
                    status: 500,
                    message: "Some error occurred while creating the user." + err.message})
            });
        }
    },
    getUsers: (req, res) => {
        let area_id = req.params.id;

        User.findAll().then(async(_data) => {
            res.status(200).send({
                status: 200,
                users: _data
            })
        })
        .catch(err => {
            res.status(200).send({
                status: 500,
                message: "Some error occurred while creating the user." + err.message
            })
        });
    },
    updateUser: (req, res) => {
        let user_id = req.params.id;

        User.findOne({
            user_id : user_id
        }).then(async(_data) => {
            User.update({
                full_name: req.body.full_name,
                dob: req.body.dob,
                contact: req.body.contact,
                user_type: req.body.user_type
            }, {
                where: {
                    user_id : user_id
                }
            }).then(async (_data) => {
                res.status(200).send({
                    status: 200,
                    message: "User updated successfully"
                })
            }).catch(err => {
                res.status(200).send({
                    status: 500,
                    message: "Some error occurred while updating the user." + err.message
                })
            });
        })
        .catch(err => {
            res.status(200).send({
                status: 500,
                message: "Some error occurred while updating the user." + err.message
            })
        });
    },

    deleteUser: (req, res) => {
        let user_id = req.params.id;

        User.findOne({
            where: {
                user_id : user_id
            }
        }).then(async (data) => {
            if (data) {
                User.destroy({
                    where: {user_id : user_id}
                }).then(_data => {
                    return res.status(200).send({
                        status: 200,
                        message: "User deleted successfully"
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
    getCustomers: (req, res) => {
        let area_id = req.params.id;

        User.findAll({
			where: {
                user_type: "Customer"
            },
		}).then(async(_data) => {
            res.status(200).send({
                status: 200,
                users: _data
            })
        })
        .catch(err => {
            res.status(200).send({
                status: 500,
                message: "Some error occurred while creating the user." + err.message
            })
        });
    },
};
