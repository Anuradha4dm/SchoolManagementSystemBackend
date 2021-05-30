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
-- Table structure for table `classes`
--

DROP TABLE IF EXISTS `classes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `classes` (
  `classid` int NOT NULL AUTO_INCREMENT,
  `year` int NOT NULL,
  `grade` varchar(255) NOT NULL,
  `numofstudents` int DEFAULT NULL,
  `timetable` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`classid`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `classes`
--

LOCK TABLES `classes` WRITE;
/*!40000 ALTER TABLE `classes` DISABLE KEYS */;
INSERT INTO `classes` VALUES (0,2020,'Pending',40,'timetable/tt_13_ART.pdf','2020-09-09 00:00:00','2020-09-09 00:00:00'),(1,2020,'6_A',40,'timetable/tt_6_A.pdf','2020-11-12 07:13:47','2020-11-20 16:13:05'),(2,2020,'6_B',40,'timetable/tt_6_B.pdf','2020-11-12 07:13:47','2020-11-16 12:52:43'),(3,2020,'6_C',40,'timetable/tt_6_C.pdf','2020-09-09 00:00:00','2020-09-09 00:00:00'),(4,2020,'6_D',40,'timetable/tt_6_D.pdf','2020-09-09 00:00:00','2020-09-09 00:00:00'),(5,2020,'6_E',40,'timetable/tt_6_E.pdf','2020-06-09 00:00:00','2020-06-07 00:00:00'),(6,2020,'7_A',40,'timetable/tt_7_A.pdf','2020-06-09 00:00:00','2020-06-09 00:00:00'),(7,2020,'7_B',40,'timetable/tt_7_B.pdf','2020-06-09 00:00:00','2020-08-09 00:00:00'),(8,2020,'7_C',40,'timetable/tt_7_C.pdf','2020-06-09 00:00:00','2020-08-09 00:00:00'),(9,2020,'7_D',40,'timetable/tt_7_D.pdf','2020-06-09 00:00:00','2020-08-09 00:00:00'),(10,2020,'7_E',40,'timetable/tt_7_E.pdf','2020-06-09 00:00:00','2020-08-09 00:00:00'),(11,2020,'8_A',40,'timetable/tt_8_A.pdf','2020-06-09 00:00:00','2020-08-09 00:00:00'),(12,2020,'8_B',40,'timetable/tt_8_B.pdf','2020-06-09 00:00:00','2020-08-09 00:00:00'),(13,2020,'8_C',40,'timetable/tt_8_C.pdf','2020-06-09 00:00:00','2020-08-09 00:00:00'),(14,2020,'8_D',40,'timetable/tt_8_D.pdf','2020-06-09 00:00:00','2020-08-09 00:00:00'),(15,2020,'8_E',40,'timetable/tt_8_E.pdf','2020-06-09 00:00:00','2020-08-09 00:00:00'),(16,2020,'9_A',40,'timetable/tt_9_A.pdf','2020-06-09 00:00:00','2020-08-09 00:00:00'),(17,2020,'9_B',40,'timetable/tt_9_B.pdf','2020-06-09 00:00:00','2020-08-09 00:00:00'),(18,2020,'9_C',40,'timetable/tt_9_C.pdf','2020-06-09 00:00:00','2020-08-09 00:00:00'),(19,2020,'9_D',40,'timetable/tt_9_D.pdf','2020-06-09 00:00:00','2020-08-09 00:00:00'),(20,2020,'9_E',40,'timetable/tt_9_E.pdf','2020-06-09 00:00:00','2020-08-09 00:00:00'),(21,2020,'10_A',40,'timetable/tt_10_A.pdf','2020-06-09 00:00:00','2020-08-09 00:00:00'),(22,2020,'10_B',40,'timetable/tt_10_B.pdf','2020-06-09 00:00:00','2020-08-09 00:00:00'),(23,2020,'10_C',40,'timetable/tt_10_C.pdf','2020-06-09 00:00:00','2020-08-09 00:00:00'),(24,2020,'10_D',40,'timetable/tt_10_D.pdf','2020-06-09 00:00:00','2020-08-09 00:00:00'),(25,2020,'10_E',40,'timetable/tt_10_E.pdf','2020-06-09 00:00:00','2020-08-09 00:00:00'),(26,2020,'11_A',40,'timetable/tt_11_A.pdf','2020-06-09 00:00:00','2020-08-09 00:00:00'),(27,2020,'11_B',40,'timetable/tt_11_B.pdf','2020-06-09 00:00:00','2020-08-09 00:00:00'),(28,2020,'11_C',40,'timetable/tt_11_C.pdf','2020-06-09 00:00:00','2020-08-09 00:00:00'),(29,2020,'11_D',40,'timetable/tt_11_D.pdf','2020-06-09 00:00:00','2020-08-09 00:00:00'),(30,2020,'11_E',40,'timetable/tt_11_E.pdf','2020-06-09 00:00:00','2020-08-09 00:00:00'),(31,2020,'12_MATH',40,'timetable/tt_12_MATH.pdf','2020-06-09 00:00:00','2020-08-09 00:00:00'),(32,2020,'12_BIO',40,'timetable/tt_12_BIO.pdf','2020-06-09 00:00:00','2020-08-09 00:00:00'),(33,2020,'12_TEC',40,'timetable/tt_12_TEC.pdf','2020-06-09 00:00:00','2020-08-09 00:00:00'),(34,2020,'12_COM',40,'timetable/tt_12_COM.pdf','2020-06-09 00:00:00','2020-08-09 00:00:00'),(35,2020,'12_ART',40,'timetable/tt_12_ART.pdf','2020-06-09 00:00:00','2020-08-09 00:00:00'),(36,2020,'13_MATH',40,'timetable/tt_13_MATH.pdf','2020-06-09 00:00:00','2020-08-09 00:00:00'),(37,2020,'13_BIO',40,'timetable/tt_13_BIO.pdf','2020-06-09 00:00:00','2020-08-09 00:00:00'),(38,2020,'13_TEC',40,'timetable/tt_13_TEC.pdf','2020-06-09 00:00:00','2020-08-09 00:00:00'),(39,2020,'13_COM',40,'timetable/tt_13_COM.pdf','2020-06-09 00:00:00','2020-08-09 00:00:00'),(40,2020,'13_ART',40,'timetable/tt_13_ART.pdf','2020-06-09 00:00:00','2020-08-09 00:00:00');
/*!40000 ALTER TABLE `classes` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-01-08  1:10:53
