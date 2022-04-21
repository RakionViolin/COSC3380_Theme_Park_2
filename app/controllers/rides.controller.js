const db = require("../../app/config/db.config");

module.exports = {
    createRide: (req, res) => {
        const Date_ = req.body.date;
        const Number_of_Passenger = req.body.number_of_passengers;

        let data = {
            Date_,
            Number_of_Passenger
        };

        let query = "INSERT INTO rides SET ?";

        db.query(query, data, (err, results) => {
            if (err) {
                return res.status(500).send(err);
            }

            let id = results.insertId;

            let query2 = `SELECT * FROM rides WHERE Ride_ID='${id}'`;

            db.query(query2, async(err, results) => {
                if(err){
                    return res.status(400).send({
                        message:"Something went wrong! Please try again later 2"
                    });
                }

                let row = results[0];

                return res.status(200).send({
                    rides: row
                });
            });
        });

    },
    allRides: (req, res) => {
        //  get all rides
        let query = "SELECT * FROM rides";

        db.query(query, (err, results) => {
                if (err) {
                    return res.status(500).send(err);
                }
                return res.status(200).send({
                    rides: results
                });
            }
        );

    },
    getRide: (req, res) => {
        let Ride_ID = req.params.id;

        let query = "SELECT * FROM rides WHERE Ride_ID = ?";

        db.query(query, Ride_ID, (err, results) => {
                if (err) {
                    return res.status(500).send(err);
                }
                return res.status(200).send({
                    ride: results
                });
            }
        );
    },
    updateRide: (req, res) => {
        let Ride_ID = req.params.id;
        const Date_ = req.body.date;
        const Number_of_Passenger = req.body.number_of_passengers;

        let data = {
            Date_,
            Number_of_Passenger
        };

        if (Ride_ID !== '') {
            let query = "UPDATE rides SET ? WHERE Ride_ID = ?";
            db.query(query, [data, Ride_ID], (err, results) => {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    return res.status(200).send({
                        ride: data
                    });
                }
            );
        } else {
            return res.status(400).send({
                message: "Ride ID is required"
            });
        }

    },
    deleteRide: (req, res) => {
        let Ride_ID = req.params.id;

        let query = "DELETE FROM rides WHERE Ride_ID = ?";

        db.query(query, Ride_ID, (err, results) => {
                if (err) {
                    return res.status(500).send(err);
                }
                return res.status(200).send({
                    message: "Ride deleted successfully"
                });
            }
        );

    },
}
