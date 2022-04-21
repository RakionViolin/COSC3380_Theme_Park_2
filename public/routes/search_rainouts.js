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
    connection = mysql.createConnection(db_config); 
                                             

    connection.connect(function(err) {             
        if(err) {                                   
            console.log('error when connecting to db:', err);
            setTimeout(handleDisconnect, 2000); 
            }                                    
        });                                  
                              
    connection.on('error', function(err) {
        console.log('db error', err);
        if(err.code === 'PROTOCOL_CONNECTION_LOST') {
            handleDisconnect();                        
            } else {                                    
            throw err;                               
            }
        }); 
}

handleDisconnect();

/* GET home page */
router.get('/', (req, res, next) => {
    connection.query('SELECT Rainout_ID, Date_, Area_name, rainouts.Area_ID  FROM rainouts, areas WHERE rainouts.Area_ID = areas.Area_ID;', (error, rows) => {
        if(error) throw error;
    
        if(!error) {
            console.log(rows);
            res.render('../views/search_rainouts', {rows})
        
        }
    })
});

module.exports = router;