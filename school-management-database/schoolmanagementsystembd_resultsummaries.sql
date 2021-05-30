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
-- Table structure for table `resultsummaries`
--

DROP TABLE IF EXISTS `resultsummaries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `resultsummaries` (
  `summaryid` int NOT NULL AUTO_INCREMENT,
  `year` int NOT NULL,
  `term` int NOT NULL,
  `average` double NOT NULL,
  `grade` varchar(255) NOT NULL,
  `place` int DEFAULT NULL,
  `message` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`summaryid`),
  KEY `_id` (`_id`),
  CONSTRAINT `resultsummaries_ibfk_1` FOREIGN KEY (`_id`) REFERENCES `students` (`_id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=111 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `resultsummaries`
--

LOCK TABLES `resultsummaries` WRITE;
/*!40000 ALTER TABLE `resultsummaries` DISABLE KEYS */;
INSERT INTO `resultsummaries` VALUES (7,2020,1,64.88888888888889,'10_A',10,'10_A','2020-12-29 00:09:33','2020-12-29 00:09:33','ST_1'),(8,2020,1,83.33333333333333,'11_A',NULL,'This is your Average.Great work,Keep going','2020-12-29 00:09:38','2020-12-31 16:03:27','ST_10'),(9,2020,1,81.33333333333333,'11_A',NULL,NULL,'2020-12-29 00:09:44','2020-12-29 00:11:55','ST_2'),(10,2020,1,71,'11_A',NULL,NULL,'2020-12-29 00:09:48','2020-12-29 00:09:48','ST_3'),(11,2020,1,79.22222222222223,'11_A',NULL,NULL,'2020-12-29 00:09:52','2020-12-29 00:09:52','ST_4'),(12,2020,1,60,'11_A',NULL,NULL,'2020-12-29 00:10:00','2020-12-29 00:10:00','ST_5'),(13,2020,1,73.88888888888889,'11_A',NULL,NULL,'2020-12-29 00:10:03','2020-12-29 00:10:03','ST_6'),(14,2020,1,72.77777777777777,'11_A',NULL,NULL,'2020-12-29 00:10:07','2020-12-29 00:10:07','ST_7'),(15,2020,1,72.55555555555556,'11_A',NULL,NULL,'2020-12-29 00:10:10','2020-12-29 00:10:10','ST_8'),(16,2020,1,69.55555555555556,'11_A',NULL,NULL,'2020-12-29 00:10:16','2020-12-29 00:10:16','ST_9'),(17,2020,2,64.88888888888889,'10_A',9,'You need more commitment','2020-12-29 00:12:48','2020-12-29 00:12:48','ST_1'),(18,2020,2,83.55555555555556,'11_A',NULL,'This is your Average.Great work,Keep going','2020-12-29 00:12:52','2020-12-29 00:55:18','ST_10'),(19,2020,2,76.55555555555556,'11_A',NULL,'This is your Average.Good,You can try to first places','2020-12-29 00:12:54','2020-12-29 00:56:40','ST_2'),(20,2020,2,70.33333333333333,'11_A',NULL,NULL,'2020-12-29 00:12:58','2020-12-29 00:14:14','ST_3'),(21,2020,2,79.22222222222223,'11_A',NULL,NULL,'2020-12-29 00:13:01','2020-12-29 00:13:01','ST_4'),(22,2020,2,60,'11_A',NULL,NULL,'2020-12-29 00:13:06','2020-12-29 00:13:06','ST_5'),(23,2020,2,78.44444444444444,'11_A',NULL,NULL,'2020-12-29 00:13:10','2020-12-29 00:13:49','ST_6'),(24,2020,2,72.77777777777777,'11_A',NULL,NULL,'2020-12-29 00:13:14','2020-12-29 00:13:14','ST_7'),(25,2020,2,72.55555555555556,'11_A',NULL,NULL,'2020-12-29 00:13:19','2020-12-29 00:13:19','ST_8'),(26,2020,2,69.55555555555556,'11_A',NULL,NULL,'2020-12-29 00:13:23','2020-12-29 00:13:23','ST_9'),(27,2020,3,64.88888888888889,'10_A',5,'Some improvement see on you...','2020-12-29 23:05:25','2020-12-29 23:05:25','ST_1'),(28,2021,1,64.88888888888889,'11_A',9,'This is your Average.Good,You can try to first places','2020-12-31 21:49:06','2020-12-31 22:14:38','ST_1'),(29,2021,1,83.55555555555556,'11_A',1,'This is your Average.Great work,Keep going','2020-12-31 21:49:09','2020-12-31 22:07:04','ST_10'),(30,2021,1,76.55555555555556,'11_A',3,'This is your Average.Great work,Keep going','2020-12-31 21:49:14','2020-12-31 22:11:03','ST_2'),(31,2021,1,71,'11_A',7,'This is your Average.Good,You can try to first places','2020-12-31 21:49:17','2020-12-31 22:13:21','ST_3'),(32,2021,1,79.22222222222223,'11_A',2,'This is your Average.Great work,Keep going','2020-12-31 21:49:21','2020-12-31 22:09:33','ST_4'),(33,2021,1,60,'11_A',10,'This is your Average.Good,You can try to first places','2020-12-31 21:49:25','2020-12-31 22:21:06','ST_5'),(34,2021,1,73.88888888888889,'11_A',NULL,'This is your Average.Good,You can try to first places','2020-12-31 21:49:32','2020-12-31 22:03:53','ST_6'),(35,2021,1,72.77777777777777,'11_A',NULL,'This is your Average.Good,You can try to first places','2020-12-31 21:49:37','2020-12-31 22:05:05','ST_7'),(36,2021,1,72.55555555555556,'11_A',6,'This is your Average.Good,You can try to first places','2020-12-31 21:49:41','2020-12-31 22:06:01','ST_8'),(37,2021,1,69.55555555555556,'11_A',8,'This is your Average.Good,You can try to first places','2020-12-31 21:49:45','2020-12-31 22:14:00','ST_9'),(38,2021,2,84.11111111111111,'11_A',2,'Better result than all other terms result,good luck...','2020-12-31 23:32:01','2020-12-31 23:32:01','ST_1'),(39,2021,2,83.55555555555556,'11_A',NULL,NULL,'2020-12-31 23:32:05','2020-12-31 23:32:05','ST_10'),(40,2021,2,76.55555555555556,'11_A',NULL,NULL,'2020-12-31 23:32:08','2020-12-31 23:32:08','ST_2'),(41,2021,2,71,'11_A',NULL,NULL,'2020-12-31 23:32:14','2020-12-31 23:32:14','ST_3'),(42,2021,2,79.22222222222223,'11_A',NULL,NULL,'2020-12-31 23:32:19','2020-12-31 23:32:19','ST_4'),(43,2021,2,60,'11_A',10,'This is your Average.Good,You can try to first places','2020-12-31 23:32:24','2021-01-04 15:13:02','ST_5'),(44,2021,2,73.88888888888889,'11_A',NULL,NULL,'2020-12-31 23:32:27','2020-12-31 23:32:27','ST_6'),(45,2021,2,72.77777777777777,'11_A',NULL,NULL,'2020-12-31 23:32:30','2020-12-31 23:32:30','ST_7'),(46,2021,2,72.55555555555556,'11_A',NULL,NULL,'2020-12-31 23:32:34','2020-12-31 23:32:34','ST_8'),(47,2021,2,69.55555555555556,'11_A',NULL,NULL,'2020-12-31 23:32:38','2020-12-31 23:32:38','ST_9'),(48,2021,3,64.88888888888889,'11_A',7,'Some thing you miss this term... try next time more than this...','2020-12-31 23:32:54','2020-12-31 23:32:54','ST_1'),(49,2021,3,83.55555555555556,'11_A',NULL,NULL,'2020-12-31 23:33:00','2020-12-31 23:33:00','ST_10'),(50,2021,3,76.55555555555556,'11_A',NULL,NULL,'2020-12-31 23:33:19','2020-12-31 23:33:19','ST_2'),(51,2021,3,71,'11_A',NULL,NULL,'2020-12-31 23:33:26','2020-12-31 23:33:26','ST_3'),(52,2021,3,79.22222222222223,'11_A',NULL,NULL,'2020-12-31 23:33:30','2020-12-31 23:33:30','ST_4'),(53,2021,3,60,'11_A',NULL,NULL,'2020-12-31 23:33:37','2020-12-31 23:33:37','ST_5'),(54,2021,3,73.88888888888889,'11_A',NULL,NULL,'2020-12-31 23:33:41','2020-12-31 23:33:41','ST_6'),(55,2021,3,72.77777777777777,'11_A',NULL,NULL,'2020-12-31 23:33:45','2020-12-31 23:33:45','ST_7'),(56,2021,3,72.55555555555556,'11_A',NULL,NULL,'2020-12-31 23:33:49','2020-12-31 23:33:49','ST_8'),(57,2021,3,69.55555555555556,'11_A',NULL,NULL,'2020-12-31 23:33:52','2020-12-31 23:33:52','ST_9'),(58,2021,1,67.33333333333333,'11_B',NULL,NULL,'2021-01-01 00:02:24','2021-01-01 00:02:24','ST_11'),(59,2021,1,69.77777777777777,'11_B',NULL,NULL,'2021-01-01 00:02:28','2021-01-01 00:02:28','ST_12'),(60,2021,1,62.888888888888886,'11_B',NULL,NULL,'2021-01-01 00:02:32','2021-01-01 00:02:32','ST_13'),(61,2021,1,81.55555555555556,'11_B',NULL,NULL,'2021-01-01 00:02:36','2021-01-01 00:02:36','ST_14'),(62,2021,1,70.33333333333333,'11_B',NULL,NULL,'2021-01-01 00:02:40','2021-01-01 00:02:40','ST_15'),(63,2021,2,70.33333333333333,'11_B',NULL,NULL,'2021-01-01 00:02:47','2021-01-01 00:02:47','ST_15'),(64,2021,2,81.55555555555556,'11_B',NULL,NULL,'2021-01-01 00:02:50','2021-01-01 00:02:50','ST_14'),(65,2021,2,62.888888888888886,'11_B',NULL,NULL,'2021-01-01 00:02:54','2021-01-01 00:02:54','ST_13'),(66,2021,2,69.77777777777777,'11_B',NULL,NULL,'2021-01-01 00:02:57','2021-01-01 00:02:57','ST_12'),(67,2021,2,67.33333333333333,'11_B',NULL,NULL,'2021-01-01 00:03:03','2021-01-01 00:03:03','ST_11'),(68,2021,3,67.33333333333333,'11_B',NULL,NULL,'2021-01-01 00:03:18','2021-01-01 00:03:18','ST_11'),(69,2021,3,69.77777777777777,'11_B',NULL,NULL,'2021-01-01 00:03:21','2021-01-01 00:03:21','ST_12'),(70,2021,3,62.888888888888886,'11_B',NULL,NULL,'2021-01-01 00:03:24','2021-01-01 00:03:24','ST_13'),(71,2021,3,75.77777777777777,'11_B',NULL,NULL,'2021-01-01 00:03:27','2021-01-01 00:04:16','ST_14'),(72,2021,3,75.22222222222223,'11_B',NULL,NULL,'2021-01-01 00:03:30','2021-01-01 00:04:28','ST_15'),(73,2021,1,70.33333333333333,'13_MATH',NULL,NULL,'2021-01-01 00:15:05','2021-01-01 00:15:05','ST_16'),(74,2021,1,62.666666666666664,'13_MATH',3,'This is your Average.Great work,Keep going','2021-01-01 00:15:08','2021-01-01 00:39:42','ST_17'),(75,2021,1,62,'13_MATH',4,'This is your Average.Good,You can try to first places','2021-01-01 00:15:11','2021-01-01 00:39:44','ST_18'),(76,2021,1,73.33333333333333,'13_MATH',1,'This is your Average.Great work,Keep going','2021-01-01 00:15:13','2021-01-01 00:39:32','ST_19'),(77,2021,1,51,'13_MATH',5,'This is your Average.Good,You can try to first places','2021-01-01 00:15:16','2021-01-01 00:39:47','ST_20'),(78,2021,2,70.33333333333333,'13_MATH',NULL,NULL,'2021-01-01 00:15:22','2021-01-01 00:15:22','ST_16'),(79,2021,2,62.666666666666664,'13_MATH',NULL,NULL,'2021-01-01 00:15:25','2021-01-01 00:15:25','ST_17'),(80,2021,2,62,'13_MATH',NULL,NULL,'2021-01-01 00:15:29','2021-01-01 00:15:29','ST_18'),(81,2021,2,73.33333333333333,'13_MATH',NULL,NULL,'2021-01-01 00:15:35','2021-01-01 00:15:35','ST_19'),(82,2021,2,51,'13_MATH',NULL,NULL,'2021-01-01 00:15:37','2021-01-01 00:15:37','ST_20'),(83,2021,3,70.33333333333333,'13_MATH',NULL,NULL,'2021-01-01 00:15:42','2021-01-01 00:15:42','ST_16'),(84,2021,3,62.666666666666664,'13_MATH',NULL,NULL,'2021-01-01 00:15:44','2021-01-01 00:15:44','ST_17'),(85,2021,3,62,'13_MATH',NULL,NULL,'2021-01-01 00:15:46','2021-01-01 00:15:46','ST_18'),(86,2021,3,73.33333333333333,'13_MATH',NULL,NULL,'2021-01-01 00:15:48','2021-01-01 00:15:48','ST_19'),(87,2021,3,51,'13_MATH',NULL,NULL,'2021-01-01 00:15:50','2021-01-01 00:15:50','ST_20'),(88,2021,1,70.33333333333333,'13_BIO',2,'This is your Average.Great work,Keep going','2021-01-01 00:20:42','2021-01-01 00:22:11','ST_21'),(89,2021,1,62.666666666666664,'13_BIO',NULL,NULL,'2021-01-01 00:20:48','2021-01-01 00:20:48','ST_22'),(90,2021,1,64.66666666666667,'13_BIO',NULL,NULL,'2021-01-01 00:20:52','2021-01-01 00:20:52','ST_24'),(91,2021,1,73.33333333333333,'13_BIO',1,'This is your Average.Great work,Keep going','2021-01-01 00:20:56','2021-01-01 00:21:32','ST_25'),(92,2021,2,73.33333333333333,'13_BIO',NULL,NULL,'2021-01-01 00:21:04','2021-01-01 00:21:04','ST_25'),(93,2021,2,64.66666666666667,'13_BIO',NULL,NULL,'2021-01-01 00:21:08','2021-01-01 00:21:08','ST_24'),(94,2021,2,62.666666666666664,'13_BIO',NULL,NULL,'2021-01-01 00:21:10','2021-01-01 00:21:10','ST_22'),(95,2021,2,70.33333333333333,'13_BIO',NULL,NULL,'2021-01-01 00:21:13','2021-01-01 00:21:13','ST_21'),(96,2021,1,70.33333333333333,'13_COM',NULL,NULL,'2021-01-01 00:31:31','2021-01-01 00:31:31','ST_31'),(97,2021,1,62.666666666666664,'13_COM',NULL,NULL,'2021-01-01 00:31:35','2021-01-01 00:31:35','ST_32'),(98,2021,1,62,'13_COM',NULL,NULL,'2021-01-01 00:31:38','2021-01-01 00:31:38','ST_33'),(99,2021,1,73.33333333333333,'13_COM',NULL,NULL,'2021-01-01 00:31:41','2021-01-01 00:31:41','ST_34'),(100,2021,1,51,'13_COM',NULL,NULL,'2021-01-01 00:31:45','2021-01-01 00:31:45','ST_35'),(101,2021,2,70.33333333333333,'13_COM',NULL,NULL,'2021-01-01 00:31:52','2021-01-01 00:31:52','ST_31'),(102,2021,2,62.666666666666664,'13_COM',NULL,NULL,'2021-01-01 00:31:56','2021-01-01 00:31:56','ST_32'),(103,2021,2,62,'13_COM',NULL,NULL,'2021-01-01 00:31:59','2021-01-01 00:31:59','ST_33'),(104,2021,2,73.33333333333333,'13_COM',NULL,NULL,'2021-01-01 00:32:02','2021-01-01 00:32:02','ST_34'),(105,2021,2,51,'13_COM',NULL,NULL,'2021-01-01 00:32:05','2021-01-01 00:32:05','ST_35'),(106,2021,3,70.33333333333333,'13_COM',NULL,NULL,'2021-01-01 00:32:11','2021-01-01 00:32:11','ST_31'),(107,2021,3,62.666666666666664,'13_COM',NULL,NULL,'2021-01-01 00:32:15','2021-01-01 00:32:15','ST_32'),(108,2021,3,62,'13_COM',NULL,NULL,'2021-01-01 00:32:18','2021-01-01 00:32:18','ST_33'),(109,2021,3,51,'13_COM',NULL,NULL,'2021-01-01 00:32:23','2021-01-01 00:32:23','ST_35'),(110,2021,3,73.33333333333333,'13_COM',NULL,NULL,'2021-01-01 00:32:31','2021-01-01 00:32:31','ST_34');
/*!40000 ALTER TABLE `resultsummaries` ENABLE KEYS */;
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