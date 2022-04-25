# COSC_3380_Theme_Park_Team12
In this project, we included SQL_DUMP_FILE, frontend, backend as the requirement.

- The SQL_DUMP_FILE has 2 triggers:
   .Trigger 1 'after_buy_ticket'(line 100-113): This trigger is inserting into rides table when a new ticket is created by user. This is to get the newly inserted
 row from tickets table,and prepare query for insert into rides and execute
   .Trigger 2 'free_ticket'(line 137-147): This trigger is for 1 free ticket, if the number of passenger is 5 or more.
 


To install this project, here is an instruction to run it locally:

A. For Windows: 
1. Download, and install XAMPP(https://www.apachefriends.org/download.html)
2. Click "Run" Apache, and Mysql
3. Open a browser, enter this directory: http://127.0.0.1/phpmyadmin
4. Create new database with ANYNAME and put it in this collation: utf8_unicode_ci
5. Unzip the github file, and go to this directory ...\COSC_3380_Theme_Park_Team12-main\app\config
6. Replace the content with this lines (Note: change DB with DB name you created above):

module.exports = {
    HOST: 'localhost',
    USER: 'root',
    PASSWORD: '',
    DB: 'node_restapi3',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 50000000000
    }
};

8. Run cmd in this directory : ...\COSC_3380_Theme_Park_Team12-main
9. In the cmd screen, run this command: npm install
10. After installing, run this command for backend: "node server.js" 
11. Open new cmd screen in same directory, run this command for frontend: "npm start"
12. Go to the Web browser: enter this directory : http://127.0.0.1:8080/
13. Complete installation
