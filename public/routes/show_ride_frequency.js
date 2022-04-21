const express = require('express')
var router = express.Router();

const mysql = require('mysql');


// connection detail
/*const connection = mysql.createConnection({
    host: 'us-cdbr-east-05.cleardb.net',
    user: 'b052c9e9d7c49d',
    password: '64931555',
    database: 'heroku_0fab399232beb7b'
})*/


var db_config = {
    host: 'us-cdbr-east-05.cleardb.net',
      user: 'b052c9e9d7c49d',
      password: '64931555',
      database: 'heroku_0fab399232beb7b'
  };
  
var connection;

function handleDisconnect() {
    connection = mysql.createConnection(db_config); // Recreate the connection, since
                                                // the old one cannot be reused.

    connection.connect(function(err) {              // The server is either down
        if(err) {                                     // or restarting (takes a while sometimes).
            console.log('error when connecting to db:', err);
            setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
            }                                     // to avoid a hot loop, and to allow our node script to
        });                                     // process asynchronous requests in the meantime.
                                        // If you're also serving http, display a 503 error.
    connection.on('error', function(err) {
        console.log('db error', err);
        if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
            handleDisconnect();                         // lost due to either server restart, or a
            } else {                                      // connnection idle timeout (the wait_timeout
            throw err;                                  // server variable configures this)
            }
        }); 
}

handleDisconnect();

/* GET home page */
router.get('/', (req, res, next) => {
    connection.query('SELECT * FROM rides', (error, rows) => {
        if(error) throw error;
    
        if(!error) {
            console.log(rows);
            res.render('../views/show_ride_frequency', {rows})
        
        }
    })
});

module.exports = router;