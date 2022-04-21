-- Adminer 4.8.1 MySQL 10.6.4-MariaDB dump

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
