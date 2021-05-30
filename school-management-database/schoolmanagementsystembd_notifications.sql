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
-- Table structure for table `notifications`
--

DROP TABLE IF EXISTS `notifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notifications` (
  `notificationid` int NOT NULL AUTO_INCREMENT,
  `type` int NOT NULL,
  `from` varchar(255) DEFAULT NULL,
  `expire` datetime DEFAULT NULL,
  `message` varchar(255) NOT NULL,
  `publisher` varchar(255) DEFAULT NULL,
  `to` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `attachmentpath` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `teacherTeacherid` varchar(255) DEFAULT NULL,
  `studentId` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`notificationid`),
  KEY `teacherTeacherid` (`teacherTeacherid`),
  KEY `studentId` (`studentId`),
  CONSTRAINT `notifications_ibfk_1` FOREIGN KEY (`teacherTeacherid`) REFERENCES `teachers` (`teacherid`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `notifications_ibfk_2` FOREIGN KEY (`studentId`) REFERENCES `students` (`_id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notifications`
--

LOCK TABLES `notifications` WRITE;
/*!40000 ALTER TABLE `notifications` DISABLE KEYS */;
INSERT INTO `notifications` VALUES (33,2,NULL,'2021-01-09 20:38:15','Your request on 2020-12-30 is accepted.  ',NULL,'AC_4','Allow Leave Request',NULL,'2021-01-06 20:38:15','2021-01-06 20:38:15','AC_4',NULL),(34,2,NULL,'2021-01-09 20:39:20','Your request on 2020-12-31 is accepted.  ',NULL,'AC_20','Allow Leave Request',NULL,'2021-01-06 20:39:20','2021-01-06 20:39:20','AC_20',NULL),(35,2,NULL,'2021-01-09 20:39:43','Your request on 2020-12-31 is accepted.  ',NULL,'AC_20','Allow Leave Request',NULL,'2021-01-06 20:39:43','2021-01-06 20:39:43','AC_20',NULL),(36,2,NULL,'2021-01-09 20:46:56','Your request on 2021-01-10 is accepted.  ',NULL,'AC_20','Allow Leave Request',NULL,'2021-01-06 20:46:56','2021-01-06 20:46:56','AC_20',NULL),(37,2,NULL,'2021-01-09 20:47:09','Your request on 2021-01-10 is accepted.  ',NULL,'AC_20','Allow Leave Request',NULL,'2021-01-06 20:47:09','2021-01-06 20:47:09','AC_20',NULL),(38,2,NULL,'2021-01-09 20:47:16','Your request on 2021-01-10 is accepted.  ',NULL,'AC_20','Allow Leave Request',NULL,'2021-01-06 20:47:16','2021-01-06 20:47:16','AC_20',NULL),(39,2,NULL,'2021-01-09 20:47:26','Your request on 2021-01-10 is accepted.  ',NULL,'AC_20','Allow Leave Request',NULL,'2021-01-06 20:47:26','2021-01-06 20:47:26','AC_20',NULL);
/*!40000 ALTER TABLE `notifications` ENABLE KEYS */;
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
