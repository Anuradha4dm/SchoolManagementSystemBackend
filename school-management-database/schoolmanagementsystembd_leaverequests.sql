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
-- Table structure for table `leaverequests`
--

DROP TABLE IF EXISTS `leaverequests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `leaverequests` (
  `leaveid` int NOT NULL AUTO_INCREMENT,
  `leavedate` date NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `allow` tinyint(1) DEFAULT NULL,
  `leavetype` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `teacherTeacherid` varchar(255) DEFAULT NULL,
  `nonacademicNonacademicid` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`leaveid`),
  KEY `teacherTeacherid` (`teacherTeacherid`),
  KEY `nonacademicNonacademicid` (`nonacademicNonacademicid`),
  CONSTRAINT `leaverequests_ibfk_1` FOREIGN KEY (`teacherTeacherid`) REFERENCES `teachers` (`teacherid`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `leaverequests_ibfk_2` FOREIGN KEY (`nonacademicNonacademicid`) REFERENCES `nonacademics` (`nonacademicid`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `leaverequests`
--

LOCK TABLES `leaverequests` WRITE;
/*!40000 ALTER TABLE `leaverequests` DISABLE KEYS */;
INSERT INTO `leaverequests` VALUES (8,'2020-12-18','Urgent short leave',1,1,'2020-12-14 20:36:29','2020-12-14 21:29:06','AC_1',NULL),(11,'2021-01-31','Urgent half day',1,0,'2020-12-29 00:15:01','2020-12-29 23:16:44','AC_20',NULL),(12,'2021-01-01','Urgent Short levae',0,1,'2020-12-29 00:50:50','2020-12-29 00:50:50','AC_1',NULL),(13,'2020-12-31','Urgent leave require',1,2,'2020-12-29 00:52:55','2020-12-29 23:51:25','AC_3',NULL),(14,'2020-12-30','Urgent Leave',1,2,'2020-12-29 01:02:21','2021-01-06 20:38:14','AC_4',NULL),(15,'2020-12-10','Urgent Laeve',1,1,'2020-12-29 23:07:02','2021-01-06 20:47:16','AC_20',NULL),(16,'2020-12-31','Uregnet leave',1,0,'2020-12-29 23:49:02','2021-01-06 20:39:20','AC_20',NULL),(17,'2021-01-10','urgent short leave',1,1,'2021-01-06 20:28:46','2021-01-06 20:47:09','AC_20',NULL),(18,'2021-01-10','urgent short leave',0,0,'2021-01-06 20:28:51','2021-01-06 20:28:51','AC_20',NULL),(19,'2021-01-10','urgent short leave',1,3,'2021-01-06 20:28:55','2021-01-06 20:46:56','AC_20',NULL),(20,'2021-01-10','urgent short leave',1,2,'2021-01-06 20:28:59','2021-01-06 20:47:26','AC_20',NULL),(21,'2021-01-10','urgent short leave',1,4,'2021-01-06 20:29:04','2021-01-06 20:39:42','AC_20',NULL),(22,'2021-01-10','urgent short leave',0,5,'2021-01-06 20:29:10','2021-01-06 20:29:10','AC_20',NULL),(23,'2021-01-11','Urgent half day',0,0,'2021-01-07 14:37:30','2021-01-07 14:37:30','AC_20',NULL);
/*!40000 ALTER TABLE `leaverequests` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-01-08  1:10:57
