-- MySQL dump 10.13  Distrib 8.0.22, for Win64 (x86_64)
--
-- Host: localhost    Database: schoolmanagementsystembd
-- ------------------------------------------------------
-- Server version	8.0.22

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `nonacademics`
--

DROP TABLE IF EXISTS `nonacademics`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `nonacademics` (
  `nonacademicid` varchar(255) NOT NULL,
  `surname` varchar(255) DEFAULT NULL,
  `firstname` varchar(255) DEFAULT NULL,
  `lastname` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `imagepath` varchar(255) DEFAULT NULL,
  `age` int DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  `qualifications` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `resetToken` varchar(255) DEFAULT NULL,
  `resetTokenExpire` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `username` varchar(45) DEFAULT NULL,
  `gender` varchar(45) DEFAULT NULL,
  `addressline1` varchar(45) DEFAULT NULL,
  `addressline2` varchar(45) DEFAULT NULL,
  `addressline3` varchar(45) DEFAULT NULL,
  `city` varchar(45) DEFAULT NULL,
  `mobile` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`nonacademicid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='	';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nonacademics`
--

LOCK TABLES `nonacademics` WRITE;
/*!40000 ALTER TABLE `nonacademics` DISABLE KEYS */;
INSERT INTO `nonacademics` VALUES ('NAC_1','Damith','Anurada','Perera','damith@gamil.com','$2a$12$q7XUvDXZwkDzD5o9YuosaOWRbokrnG3WD2BzQv6M/osuIuvX1Q.4S','image/ST_1.jpg',24,'leave_handler','Graduated from University of Colombo,Pass the general knowledge exam with first class,Diploma for english ','I am the best non academic',NULL,NULL,'2020-11-12 07:13:47','2020-12-26 17:58:29','@_damith','male','No. 6/15','Station Road ','Katukurunda','Kalutara','078-2765643'),('NAC_2','Fernando','Lahiru','Madushan','ulmadushan96@gmail.com','$2a$12$oohPLUrFkF/uKp8EfRyaSusbvscJ2uadmvvyVPa.lA9KR84R.IZxi','image/NAC_2.jpg',24,'admin','Graduated from University of Colombo,Pass the genaral knowledge exam with first class','I am the best non academic',NULL,NULL,'2020-12-17 15:13:53','2020-12-29 22:20:39','@_lahiru','male','No. 6/15','Station Road ','Katukurunda','Kalutara','078-2765643'),('NAC_3','Jayathilaka','Sashika','Himaruwan','sashika96@gmail.com','$2a$12$U/sK90fVdx3CfgLWsZLlhefdxgQORAL70IjPeIOK6/Hr6nh/t/w2e','image/NAC_3.jpg',24,'class_handler','Qualifications are not specified','I am the best non-Academic',NULL,NULL,'2020-12-29 22:14:10','2020-12-29 22:22:31','@_sashika','male','5D 53','Natianal Housing Scheme','Hatan North','Kandy','0771126603'),('NAC_4','Perera','Nadun','Sandeepa','nadun23@gmail.com','$2a$12$YAv04rnmkF4PIovTYSr46OkLgdRbJlb/W2a5AxRcNcvUjJcK1P.Wu',NULL,24,'other','Qualifications are not specified','I am the best non-Academic',NULL,NULL,'2020-12-29 22:16:35','2021-01-01 14:37:38','@_nadun','male','No.451','Kirindiwela Road','Kottawa','Malabe','0783498142');
/*!40000 ALTER TABLE `nonacademics` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-01-08  1:10:54
