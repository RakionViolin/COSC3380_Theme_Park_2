const express   = require("express"),
    bodyParser  = require("body-parser"),
    cors        = require("cors"),   
    path        = require('path'),
    app         = express();

    require('dotenv').config();

    var corsOptions = {
        origin: "*"
    };
    
    app.use(cors(corsOptions));
    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", '*');
        res.header("Access-Control-Request-Method", "POST");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });

    app.use(express.static(__dirname + '/public'));
    
    app.options('*', cors(corsOptions));
    
    // parse requests of content-type - application/json
    app.use(bodyParser.json());
    
    // parse requests of content-type - application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({ extended: true })); 

    // simple route
    app.get("/", (req, res) => {
        console.log(__dirname);
        res.sendFile(path.join(__dirname+'/public/index.html'));
    });

    const db = require("./app/models");//include models

    db.sequelize.sync().then(function() {
        console.log('Nice! Database looks fine');
    }).catch(function(err) {
        console.log(err, "Something went wrong with the Database Update!");
    });

    //Include route
    require("./app/routes")(app);

    // set port, listen for requests
    const PORT = process.env.PORT || 8080;
    
const mysql = require('mysql')
const morgan = require('morgan')
//const bodyParser = require('body-parser')
const { Prohairesis} = require('prohairesis')
//const path = require('path')
//const port = process.env.PORT || 5000
//const app = express()

// connection detail

//var connection;
//function connectDb() {
//   connection = mysql.createConnection({
//        host: 'us-cdbr-east-05.cleardb.net',
//        user: 'bfd83253f0d499',
//        password: '1f65e11b',
//        database: 'heroku_c329452859c091c'
//    });
//  connection.on('error', connectDb()); // probably worth adding timeout / throttle / etc
//}

const mySQLstring = "mysql://bfd83253f0d499:1f65e11b@us-cdbr-east-05.cleardb.net/heroku_c329452859c091c?reconnect=true"
const database = new Prohairesis(mySQLstring);

//var homepage = require('./public/routes/index')
var ride_freq = require('./public/routes/show_ride_frequency');
var rainouts = require('./public/routes/show_rainouts');
var rainout_report = require('./public/routes/report_rainout');
var maintenance_report = require('./public/routes/report_maintenance');
var ridden_ride_report = require('./public/routes/report_ridden_ride');
var admission_report = require('./public/routes/report_admission');

var success = require('./public/routes/success');

app.set("views", path.join(__dirname, "public/views"))
app.set('view engine', 'ejs')

//app.use('/', homepage);
app.use('/ride_frequency', ride_freq);
app.use('/rainouts', rainouts);
app.use('/report_rainout', rainout_report);
app.use('/report_maintenance', maintenance_report);
app.use('/report_ridden_ride', ridden_ride_report);
app.use('/report_admission', admission_report);

app.use('/success', success);

app
    .use("/public",express.static(__dirname + "/public"))
    .use(morgan('dev'))

    .use(bodyParser.urlencoded({ extended: false}))
    .use(bodyParser.json())

app.post('/rainout', async (req, res) => {
    const body = req.body;
    await database.execute(`
        INSERT INTO rainouts (
            Date_, 
            Area_Id
        ) VALUES (
            @date, 
            @area_id
        )
    `, {
        area_id: body.areaID,
        date: body.rainoutDate,        
    });

    res.redirect('/success');
})

app.post('/maintenance', async (req, res) => {
    
    const body = req.body;
    await database.execute(`
        INSERT INTO maintenance (
	        Worker_ID,
	        Date_Started,
	        Date_Completed,
	        Rides_Coaster_ID
        ) VALUES (
	        @employee_ID,
	        @startingDate,
	        @completionDate,
	        @rollerCoaster_ID
        )
    `, {
        employee_ID: body.employee_ID,
        startingDate: body.startingDate, 
        completionDate: body.completionDate, 
        rollerCoaster_ID: body.rollerCoaster_ID,        
    });
    res.redirect('/success');
})

app.post('/admision', async (req, res) => {
    
    const body = req.body;
    await database.execute(`
        INSERT INTO admission (
	        admission_date,
	        holiday,
	        total_admission,
	        daily_pass,
            annual_pass,
            senior_pass,
            children_pass,
            online_purchase,
            onsite_purchase,

        ) VALUES (
	        @admission_date,
	        @holiday,
	        @total_admission,
	        @daily_pass,
            @annual_pass,
            @senior_pass,
            @children_pass,
            @online_purchase,
            @onsite_purchase,
        )
    `, {
        date_: body.admissionDate,
        holiday: body.holiday,
        total_admission: body.admission,
        daily_pass: body.dailyPass,
        annual_pass: body.annualPass,
        senior_pass: body.seniorPass,
        children_pass: body.childrenPass,
        online_purchase: body.onlineSold,
        onsite_purchase: body.onsiteSold        
    });
    res.redirect('/success');
})

app.post('/ridden_ride', async (req, res) => {
    
    const body = req.body;
    await database.execute(`
        INSERT INTO rides (
	        roller_coaster_ID,
	        Date_,
	        Time_,
	        Number_of_passenger

        ) VALUES (
	        @rideID,
	        @rideDate,
	        @rideTime,
	        @NumOfPassenger
        )
    `, {
        rideID: body.rideID,
        rideDate: body.rideDate,
        rideTime: body.rideTime,
        NumOfPassenger: body.numberOfPassengers,      
    });
    res.redirect('/success');
})





    

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
//app.listen(port);

