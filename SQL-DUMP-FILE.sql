-- --------------------------------------------------------
-- Host:                         us-cdbr-east-05.cleardb.net
-- Server version:               5.6.50-log - MySQL Community Server (GPL)
-- Server OS:                    Linux
-- HeidiSQL Version:             11.2.0.6213
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for heroku_0fab399232beb7b
DROP DATABASE IF EXISTS `heroku_0fab399232beb7b`;
CREATE DATABASE IF NOT EXISTS `heroku_0fab399232beb7b` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `heroku_0fab399232beb7b`;

-- Dumping structure for table heroku_0fab399232beb7b.areas
DROP TABLE IF EXISTS `areas`;
CREATE TABLE IF NOT EXISTS `areas` (
  `Area_ID` int(11) NOT NULL AUTO_INCREMENT,
  `Area_Name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`Area_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=75 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Data exporting was unselected.

-- Dumping structure for table heroku_0fab399232beb7b.maintenances
DROP TABLE IF EXISTS `maintenances`;
CREATE TABLE IF NOT EXISTS `maintenances` (
  `Maintenance_ID` int(11) NOT NULL AUTO_INCREMENT,
  `Worker_ID` int(11) NOT NULL,
  `Date_Started` datetime NOT NULL,
  `Date_Completed` datetime NOT NULL,
  `Rides_coaster_ID` int(11) DEFAULT NULL,
  `ridesCoasterRideCoasterID` int(11) DEFAULT NULL,
  `userUserId` int(11) DEFAULT NULL,
  PRIMARY KEY (`Maintenance_ID`),
  KEY `Worker_ID` (`Worker_ID`),
  KEY `Rides_coaster_ID` (`Rides_coaster_ID`),
  KEY `ridesCoasterRideCoasterID` (`ridesCoasterRideCoasterID`),
  KEY `userUserId` (`userUserId`),
  CONSTRAINT `maintenances_ibfk_1` FOREIGN KEY (`Worker_ID`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `maintenances_ibfk_2` FOREIGN KEY (`Rides_coaster_ID`) REFERENCES `rides_coasters` (`Ride_coaster_ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `maintenances_ibfk_3` FOREIGN KEY (`ridesCoasterRideCoasterID`) REFERENCES `rides_coasters` (`Ride_coaster_ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `maintenances_ibfk_4` FOREIGN KEY (`userUserId`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=75 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Data exporting was unselected.

-- Dumping structure for table heroku_0fab399232beb7b.rainouts
DROP TABLE IF EXISTS `rainouts`;
CREATE TABLE IF NOT EXISTS `rainouts` (
  `Rainout_ID` int(11) NOT NULL AUTO_INCREMENT,
  `Date_` datetime NOT NULL,
  `Area_ID` int(11) NOT NULL,
  PRIMARY KEY (`Rainout_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=95 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Data exporting was unselected.

-- Dumping structure for table heroku_0fab399232beb7b.rides
DROP TABLE IF EXISTS `rides`;
CREATE TABLE IF NOT EXISTS `rides` (
  `Ride_ID` int(11) NOT NULL AUTO_INCREMENT,
  `Date_` datetime NOT NULL,
  `Number_of_Passenger` int(11) NOT NULL,
  `Ride_coaster_ID` int(11) NOT NULL,
  `ridesCoasterRideCoasterID` int(11) DEFAULT NULL,
  PRIMARY KEY (`Ride_ID`),
  KEY `Ride_coaster_ID` (`Ride_coaster_ID`),
  KEY `ridesCoasterRideCoasterID` (`ridesCoasterRideCoasterID`),
  CONSTRAINT `rides_ibfk_1` FOREIGN KEY (`Ride_coaster_ID`) REFERENCES `rides_coasters` (`Ride_coaster_ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `rides_ibfk_2` FOREIGN KEY (`ridesCoasterRideCoasterID`) REFERENCES `rides_coasters` (`Ride_coaster_ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=364 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Data exporting was unselected.

-- Dumping structure for table heroku_0fab399232beb7b.rides_coasters
DROP TABLE IF EXISTS `rides_coasters`;
CREATE TABLE IF NOT EXISTS `rides_coasters` (
  `Ride_coaster_ID` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `Type` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `Price` int(11) NOT NULL,
  `Capacity` int(11) NOT NULL,
  `Area_ID` int(11) NOT NULL,
  `Date_opened` datetime NOT NULL,
  `areaAreaID` int(11) DEFAULT NULL,
  PRIMARY KEY (`Ride_coaster_ID`),
  KEY `Area_ID` (`Area_ID`),
  KEY `areaAreaID` (`areaAreaID`),
  CONSTRAINT `rides_coasters_ibfk_1` FOREIGN KEY (`Area_ID`) REFERENCES `areas` (`Area_ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `rides_coasters_ibfk_2` FOREIGN KEY (`areaAreaID`) REFERENCES `areas` (`Area_ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Triggers `free_ticket`
--
DELIMITER $$
CREATE TRIGGER `free_ticket` BEFORE INSERT ON `tickets` FOR EACH ROW
BEGIN
  IF (NEW.Number_of_Passenger > 4) THEN

INSERT INTO rides
 SET Date_= NEW.admission_date, Number_of_Passenger = 1,
Ride_coaster_ID = NEW.Rides_coaster_ID, ridesCoasterRideCoasterID = NEW.ridesCoasterRideCoasterID;
  END IF;
$$
DELIMITER ;

-- Dumping structure for table heroku_0fab399232beb7b.tickets
DROP TABLE IF EXISTS `tickets`;
CREATE TABLE IF NOT EXISTS `tickets` (
  `Ticket_ID` int(11) NOT NULL AUTO_INCREMENT,
  `admission_date` datetime NOT NULL,
  `Number_of_Passenger` int(11) NOT NULL,
  `Price` int(11) NOT NULL,
  `customer_ID` int(11) NOT NULL,
  `Rides_coaster_ID` int(11) NOT NULL,
  `ridesCoasterRideCoasterID` int(11) DEFAULT NULL,
  `userUserId` int(11) DEFAULT NULL,
  PRIMARY KEY (`Ticket_ID`),
  KEY `customer_ID` (`customer_ID`),
  KEY `Rides_coaster_ID` (`Rides_coaster_ID`),
  KEY `ridesCoasterRideCoasterID` (`ridesCoasterRideCoasterID`),
  KEY `userUserId` (`userUserId`),
  CONSTRAINT `tickets_ibfk_1` FOREIGN KEY (`customer_ID`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `tickets_ibfk_2` FOREIGN KEY (`Rides_coaster_ID`) REFERENCES `rides_coasters` (`Ride_coaster_ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `tickets_ibfk_3` FOREIGN KEY (`ridesCoasterRideCoasterID`) REFERENCES `rides_coasters` (`Ride_coaster_ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `tickets_ibfk_4` FOREIGN KEY (`userUserId`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=304 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Triggers `after_buy_ticket`
--
DELIMITER $$
CREATE TRIGGER `after_buy_ticket` AFTER INSERT ON `tickets` FOR EACH ROW
INSERT INTO rides
 SET Date_= NEW.admission_date, Number_of_Passenger = NEW.Number_of_Passenger,
Ride_coaster_ID = NEW.Rides_coaster_ID, ridesCoasterRideCoasterID = NEW.ridesCoasterRideCoasterID;;

$$
DELIMITER ;

-- --------------------------------------------------------


-- Dumping structure for table heroku_0fab399232beb7b.users
DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `full_name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `dob` datetime NOT NULL,
  `contact` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `email_address` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `user_type` enum('Admin','Employee','Customer') COLLATE utf8_unicode_ci NOT NULL DEFAULT 'Employee',
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email_address` (`email_address`)
) ENGINE=InnoDB AUTO_INCREMENT=144 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Data exporting was unselected.

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
