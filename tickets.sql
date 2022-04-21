-- Adminer 4.8.1 MySQL 10.6.4-MariaDB dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

DROP TABLE IF EXISTS `tickets`;
CREATE TABLE `tickets` (
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

INSERT INTO `tickets` (`Ticket_ID`, `admission_date`, `Number_of_Passenger`, `Price`, `customer_ID`, `Rides_coaster_ID`, `ridesCoasterRideCoasterID`, `userUserId`) VALUES
(1,	'2022-04-19 00:00:00',	5,	2,	1,	2,	2,	1),
(2,	'2022-04-19 00:00:00',	5,	2,	1,	2,	2,	1),
(9,	'2022-04-19 00:00:00',	6,	24,	1,	2,	2,	1);

DELIMITER ;;

CREATE TRIGGER `free_ticket` BEFORE INSERT ON `tickets` FOR EACH ROW
BEGIN
  IF (NEW.Number_of_Passenger > 4) THEN

INSERT INTO rides
 SET Date_= NEW.admission_date, Number_of_Passenger = 1,
Ride_coaster_ID = NEW.Rides_coaster_ID, ridesCoasterRideCoasterID = NEW.ridesCoasterRideCoasterID;
  END IF;
      
END;;

CREATE TRIGGER `after_buy_ticket` AFTER INSERT ON `tickets` FOR EACH ROW
INSERT INTO rides
 SET Date_= NEW.admission_date, Number_of_Passenger = NEW.Number_of_Passenger,
Ride_coaster_ID = NEW.Rides_coaster_ID, ridesCoasterRideCoasterID = NEW.ridesCoasterRideCoasterID;;

DELIMITER ;

-- 2022-04-21 10:26:43
