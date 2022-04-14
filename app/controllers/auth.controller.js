const db            = require("../models");
const User          = db.users;
const bcrypt        = require("bcryptjs");
const jwt           = require('jsonwebtoken');
const validator     = require("email-validator");

exports.register = (req, res) => {
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
                    full_name,
                    dob,
                    contact,
                    email_address: email,
                    password: hashedPassword,
                    user_type
                };

                User.create(data)
                    .then(_data => {
                        return gerUserCreateResponse(_data, res);
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
};

exports.login = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    if(!validator.validate(email)){
        return res.status(200).send({
            status: 400,
            message:"Provided email address is invalid"
        });
    }else if(password === ''){
        return res.status(200).send({
            status: 400,
            message:"Password can not be blank"
        });
    }else{
        User.findOne({
            where:{
                email_address:email
            }
        }).then(async (data) => {
            const validPassword = await bcrypt.compare(req.body.password, data.password);
            if(!validPassword)
                return res.status(200).send({
                    status: 400,
                    message:"Invalid password or user does not exist"
                });

            else{
                return gerUserCreateResponse(data, res);
            }
        }).catch(err => {
            return res.status(200).send({
                status: 400,
                message:"Invalid email or user does not exist"
            });
        });
    }
};

function gerUserCreateResponse(data, res){
    const token = jwt.sign({user_id:data.user_id, email_address: data.email_address}, 'SECRET_KEY');
    const user = {
        user_id: data.user_id,
        email_address: data.email_address,
        full_name: data.full_name ? data.full_name : '',
        DOB: data.DOB ? data.DOB : '',
        contact: data.contact ? data.contact : '',
        user_type: data.user_type ? data.user_type : ''
    }

    return res.status(200).header('Authorization').send({
        status: 200,
        accessToken: token,
        user: user
    });
}
