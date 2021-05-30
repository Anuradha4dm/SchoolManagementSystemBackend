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
-- Table structure for table `mainexamdetails`
--

DROP TABLE IF EXISTS `mainexamdetails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mainexamdetails` (
  `indexnumber` int NOT NULL,
  `meyear` int NOT NULL,
  `metype` tinyint(1) NOT NULL,
  `stream` varchar(255) DEFAULT NULL,
  `zscore` decimal(10,6) DEFAULT NULL,
  `districtrank` int DEFAULT NULL,
  `islandrank` int DEFAULT NULL,
  `shy` int NOT NULL,
  `acount` int DEFAULT NULL,
  `bcount` int DEFAULT NULL,
  `ccount` int DEFAULT NULL,
  `scount` int DEFAULT NULL,
  `wcount` int DEFAULT NULL,
  `addresultdone` tinyint(1) DEFAULT '0',
  `class` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `studentid` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`indexnumber`),
  KEY `studentid` (`studentid`),
  CONSTRAINT `mainexamdetails_ibfk_1` FOREIGN KEY (`studentid`) REFERENCES `students` (`_id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mainexamdetails`
--

LOCK TABLES `mainexamdetails` WRITE;
/*!40000 ALTER TABLE `mainexamdetails` DISABLE KEYS */;
INSERT INTO `mainexamdetails` VALUES (20100001,2010,0,NULL,NULL,0,0,1,9,0,0,0,0,1,'11_A','2020-12-29 12:35:09','2020-12-29 13:28:00','ST_1'),(20100002,2010,0,NULL,NULL,0,0,1,4,2,2,1,0,1,'11_A','2020-12-29 12:54:31','2020-12-29 13:30:20','ST_2'),(20100003,2010,0,NULL,NULL,0,0,1,4,2,2,1,0,1,'11_A','2020-12-29 12:55:16','2020-12-29 13:30:51','ST_3'),(20100004,2010,0,NULL,NULL,0,0,1,0,1,4,1,3,1,'11_A','2020-12-29 12:55:51','2020-12-29 13:31:32','ST_4'),(20100005,2010,0,NULL,NULL,0,0,1,4,4,1,0,0,1,'11_A','2020-12-29 12:57:04','2020-12-29 13:31:58','ST_5'),(20100006,2010,0,NULL,NULL,0,0,1,1,1,6,1,0,1,'11_A','2020-12-29 12:57:30','2020-12-29 13:32:23','ST_6'),(20100007,2010,0,NULL,NULL,0,0,1,0,0,0,0,9,1,'11_A','2020-12-29 12:58:03','2020-12-29 13:32:59','ST_7'),(20100008,2010,0,NULL,NULL,0,0,1,4,1,2,2,0,1,'11_A','2020-12-29 12:59:24','2020-12-29 13:33:27','ST_8'),(20100009,2010,0,NULL,NULL,0,0,1,3,2,2,1,1,1,'11_A','2020-12-29 13:00:22','2020-12-29 13:33:54','ST_9'),(20100010,2010,0,NULL,NULL,0,0,1,9,0,0,0,0,1,'11_A','2020-12-29 12:43:13','2020-12-29 13:34:10','ST_10'),(20100011,2010,0,NULL,NULL,0,0,1,2,1,3,2,1,1,'11_B','2020-12-29 12:45:32','2020-12-29 13:50:03','ST_11'),(20100012,2010,0,NULL,NULL,0,0,1,9,0,0,0,0,1,'11_B','2020-12-29 12:46:59','2020-12-29 13:50:33','ST_12'),(20100013,2010,0,NULL,NULL,0,0,1,9,0,0,0,0,1,'11_B','2020-12-29 12:47:34','2020-12-29 13:50:51','ST_13'),(20100014,2010,0,NULL,NULL,0,0,1,0,9,0,0,0,1,'11_B','2020-12-29 12:53:11','2020-12-29 13:51:16','ST_14'),(20100015,2010,0,NULL,NULL,0,0,1,0,0,9,0,0,1,'11_B','2020-12-29 12:53:54','2020-12-29 13:51:49','ST_15'),(20110001,2011,0,NULL,NULL,0,0,1,9,0,0,0,0,1,'11_A','2020-12-29 13:55:54','2020-12-29 14:07:18','ST_1'),(20110002,2011,0,NULL,NULL,0,0,1,3,4,1,1,0,1,'11_A','2020-12-29 13:57:56','2020-12-29 14:08:48','ST_2'),(20110003,2011,0,NULL,NULL,0,0,1,9,0,0,0,0,1,'11_A','2020-12-29 13:58:11','2020-12-29 14:09:18','ST_3'),(20110004,2011,0,NULL,NULL,0,0,1,1,3,1,2,2,1,'11_A','2020-12-29 13:58:29','2020-12-29 14:09:47','ST_4'),(20110005,2011,0,NULL,NULL,0,0,1,9,0,0,0,0,1,'11_A','2020-12-29 13:58:47','2020-12-29 14:10:05','ST_5'),(20110006,2011,0,NULL,NULL,0,0,1,9,0,0,0,0,1,'11_A','2020-12-29 13:59:03','2020-12-29 14:10:28','ST_6'),(20110007,2011,0,NULL,NULL,0,0,1,9,0,0,0,0,1,'11_A','2020-12-29 13:59:18','2020-12-29 14:10:58','ST_7'),(20110008,2011,0,NULL,NULL,0,0,1,0,0,9,0,0,1,'11_A','2020-12-29 13:59:34','2020-12-29 14:11:23','ST_8'),(20110009,2011,0,NULL,NULL,0,0,1,0,9,0,0,0,1,'11_A','2020-12-29 13:59:59','2020-12-29 14:11:42','ST_9'),(20110010,2011,0,NULL,NULL,0,0,1,4,0,2,2,1,1,'11_A','2020-12-29 13:56:11','2020-12-29 14:12:09','ST_10'),(20110011,2011,0,NULL,NULL,0,0,1,4,0,1,2,2,1,'11_B','2020-12-29 13:56:26','2020-12-29 14:12:32','ST_11'),(20110012,2011,0,NULL,NULL,0,0,1,3,1,2,3,0,1,'11_B','2020-12-29 13:56:44','2020-12-29 14:13:00','ST_12'),(20110013,2011,0,NULL,NULL,0,0,1,3,6,0,0,0,1,'11_B','2020-12-29 13:57:13','2020-12-29 14:13:21','ST_13'),(20110014,2011,0,NULL,NULL,0,0,1,1,2,4,2,0,1,'11_B','2020-12-29 13:57:25','2020-12-29 14:13:43','ST_14'),(20110015,2011,0,NULL,NULL,0,0,1,0,0,0,0,9,1,'11_B','2020-12-29 13:57:40','2020-12-29 14:14:10','ST_15'),(20120001,2012,0,NULL,NULL,0,0,1,8,1,0,0,0,1,'11_A','2020-12-29 14:19:43','2020-12-29 14:31:05','ST_1'),(20120002,2012,0,NULL,NULL,0,0,1,6,2,0,0,1,1,'11_A','2020-12-29 14:22:01','2020-12-29 14:31:53','ST_2'),(20120003,2012,0,NULL,NULL,0,0,1,7,2,0,0,0,1,'11_A','2020-12-29 14:22:18','2020-12-29 14:35:48','ST_3'),(20120004,2012,0,NULL,NULL,0,0,1,1,7,0,1,0,1,'11_A','2020-12-29 14:22:28','2020-12-29 14:36:36','ST_4'),(20120005,2012,0,NULL,NULL,0,0,1,0,5,0,4,0,1,'11_A','2020-12-29 14:22:45','2020-12-29 14:37:15','ST_5'),(20120006,2012,0,NULL,NULL,0,0,1,1,0,8,0,0,1,'11_A','2020-12-29 14:22:56','2020-12-29 14:38:07','ST_6'),(20120007,2012,0,NULL,NULL,0,0,1,1,1,7,0,0,1,'11_A','2020-12-29 14:23:10','2020-12-29 14:38:37','ST_7'),(20120008,2012,0,NULL,NULL,0,0,1,0,0,5,4,0,1,'11_A','2020-12-29 14:23:23','2020-12-29 14:39:24','ST_8'),(20120009,2012,0,NULL,NULL,0,0,1,0,0,1,8,0,1,'11_A','2020-12-29 14:23:35','2020-12-29 14:40:15','ST_9'),(20120010,2012,0,NULL,NULL,0,0,1,9,0,0,0,0,1,'11_A','2020-12-29 14:20:20','2020-12-29 14:40:48','ST_10'),(20120011,2012,0,NULL,NULL,0,0,1,1,1,0,1,6,1,'11_B','2020-12-29 14:20:42','2020-12-29 14:43:05','ST_11'),(20120012,2012,0,NULL,NULL,0,0,1,0,1,1,0,7,1,'11_B','2020-12-29 14:20:56','2020-12-29 14:43:45','ST_12'),(20120013,2012,0,NULL,NULL,0,0,1,0,0,0,1,8,1,'11_B','2020-12-29 14:21:20','2020-12-29 14:44:15','ST_13'),(20120014,2012,0,NULL,NULL,0,0,1,3,3,2,1,0,1,'11_B','2020-12-29 14:21:34','2020-12-29 14:44:41','ST_14'),(20120015,2012,0,NULL,NULL,0,0,1,2,3,3,1,0,1,'11_B','2020-12-29 14:21:46','2020-12-29 14:45:03','ST_15'),(20130001,2013,0,NULL,NULL,0,0,1,9,0,0,0,0,1,'11_A','2020-12-29 14:46:43','2020-12-29 14:54:14','ST_1'),(20130002,2013,0,NULL,NULL,0,0,1,0,0,0,9,0,1,'11_A','2020-12-29 14:48:26','2020-12-29 14:55:09','ST_2'),(20130003,2013,0,NULL,NULL,0,0,1,0,7,2,0,0,1,'11_A','2020-12-29 14:48:47','2020-12-29 14:55:39','ST_3'),(20130004,2013,0,NULL,NULL,0,0,1,5,3,1,0,0,1,'11_A','2020-12-29 14:49:04','2020-12-29 14:57:32','ST_4'),(20130005,2013,0,NULL,NULL,0,0,1,1,3,3,2,0,1,'11_A','2020-12-29 14:49:19','2020-12-29 14:58:14','ST_5'),(20130006,2013,0,NULL,NULL,0,0,1,0,0,7,2,0,1,'11_A','2020-12-29 14:49:34','2020-12-29 14:58:55','ST_6'),(20130007,2013,0,NULL,NULL,0,0,1,2,3,3,1,0,1,'11_A','2020-12-29 14:49:50','2020-12-29 14:59:43','ST_7'),(20130008,2013,0,NULL,NULL,0,0,1,1,2,3,2,1,1,'11_A','2020-12-29 14:50:04','2020-12-29 15:00:21','ST_8'),(20130009,2013,0,NULL,NULL,0,0,1,4,5,0,0,0,1,'11_A','2020-12-29 14:50:19','2020-12-29 15:00:47','ST_9'),(20130010,2013,0,NULL,NULL,0,0,1,2,1,3,3,0,1,'11_A','2020-12-29 14:47:00','2020-12-29 15:01:26','ST_10'),(20130011,2013,0,NULL,NULL,0,0,1,0,3,4,2,0,1,'11_B','2020-12-29 14:47:16','2020-12-29 15:01:59','ST_11'),(20130012,2013,0,NULL,NULL,0,0,1,9,0,0,0,0,1,'11_B','2020-12-29 14:47:29','2020-12-29 15:02:29','ST_12'),(20130013,2013,0,NULL,NULL,0,0,1,9,0,0,0,0,1,'11_B','2020-12-29 14:47:57','2020-12-29 15:02:57','ST_13'),(20130014,2013,0,NULL,NULL,0,0,1,0,0,5,3,1,1,'11_B','2020-12-29 14:47:42','2020-12-29 15:03:36','ST_14'),(20130015,2013,0,NULL,NULL,0,0,1,2,4,2,1,0,1,'11_B','2020-12-29 14:48:11','2020-12-29 15:04:08','ST_15'),(20140001,2014,0,NULL,NULL,0,0,1,9,0,0,0,0,1,'11_A','2020-12-29 15:06:00','2020-12-29 15:16:20','ST_1'),(20140002,2014,0,NULL,NULL,0,0,1,4,2,2,1,0,1,'11_A','2020-12-29 15:14:07','2020-12-29 15:16:37','ST_2'),(20140003,2014,0,NULL,NULL,0,0,1,0,0,0,9,0,1,'11_A','2020-12-29 15:14:19','2020-12-29 15:17:10','ST_3'),(20140004,2014,0,NULL,NULL,0,0,1,0,3,1,5,0,1,'11_A','2020-12-29 15:14:32','2020-12-29 15:17:56','ST_4'),(20140005,2014,0,NULL,NULL,0,0,1,1,1,1,6,0,1,'11_A','2020-12-29 15:14:45','2020-12-29 15:18:31','ST_5'),(20140006,2014,0,NULL,NULL,0,0,1,0,1,1,1,6,1,'11_A','2020-12-29 15:14:56','2020-12-29 15:19:16','ST_6'),(20140007,2014,0,NULL,NULL,0,0,1,1,3,0,0,5,1,'11_A','2020-12-29 15:15:08','2020-12-29 15:36:23','ST_7'),(20140008,2014,0,NULL,NULL,0,0,1,5,2,2,0,0,1,'11_A','2020-12-29 15:15:19','2020-12-29 15:37:43','ST_8'),(20140009,2014,0,NULL,NULL,0,0,1,0,4,3,2,0,1,'11_A','2020-12-29 15:15:31','2020-12-29 15:38:11','ST_9'),(20140010,2014,0,NULL,NULL,0,0,1,9,0,0,0,0,1,'11_A','2020-12-29 15:09:05','2020-12-29 15:38:27','ST_10'),(20140011,2014,0,NULL,NULL,0,0,1,3,1,1,3,1,1,'11_B','2020-12-29 15:12:08','2020-12-29 15:38:54','ST_11'),(20140012,2014,0,NULL,NULL,0,0,1,2,5,2,0,0,1,'11_B','2020-12-29 15:12:54','2020-12-29 15:39:18','ST_12'),(20140013,2014,0,NULL,NULL,0,0,1,1,0,5,2,1,1,'11_B','2020-12-29 15:13:21','2020-12-29 15:39:41','ST_13'),(20140014,2014,0,NULL,NULL,0,0,1,1,2,4,0,2,1,'11_B','2020-12-29 15:13:38','2020-12-29 15:40:00','ST_14'),(20140015,2014,0,NULL,NULL,0,0,1,0,0,7,0,2,1,'11_B','2020-12-29 15:13:49','2020-12-29 15:40:31','ST_15'),(20150001,2015,0,NULL,NULL,0,0,1,1,3,4,1,0,1,'11_A','2020-12-29 15:41:28','2020-12-29 15:45:56','ST_1'),(20150002,2015,0,NULL,NULL,0,0,1,3,3,3,0,0,1,'11_A','2020-12-29 15:43:25','2020-12-29 15:46:21','ST_2'),(20150003,2015,0,NULL,NULL,0,0,1,4,4,0,1,0,1,'11_A','2020-12-29 15:43:54','2020-12-29 15:46:44','ST_3'),(20150004,2015,0,NULL,NULL,0,0,1,3,6,0,0,0,1,'11_A','2020-12-29 15:44:12','2020-12-29 15:47:05','ST_4'),(20150005,2015,0,NULL,NULL,0,0,1,3,6,0,0,0,1,'11_A','2020-12-29 15:44:29','2020-12-29 15:47:26','ST_5'),(20150006,2015,0,NULL,NULL,0,0,1,5,2,1,0,1,1,'11_A','2020-12-29 15:44:49','2020-12-29 15:47:45','ST_6'),(20150007,2015,0,NULL,NULL,0,0,1,5,2,1,0,1,1,'11_A','2020-12-29 15:45:00','2020-12-29 15:48:07','ST_7'),(20150008,2015,0,NULL,NULL,0,0,1,3,2,1,0,2,1,'11_A','2020-12-29 15:45:12','2020-12-29 15:48:20','ST_8'),(20150009,2015,0,NULL,NULL,0,0,1,2,3,3,1,0,1,'11_A','2020-12-29 15:45:25','2020-12-29 15:48:43','ST_9'),(20150010,2015,0,NULL,NULL,0,0,1,9,0,0,0,0,1,'11_A','2020-12-29 15:41:59','2020-12-29 15:49:02','ST_10'),(20150011,2015,0,NULL,NULL,0,0,1,1,3,3,1,1,1,'11_B','2020-12-29 15:42:12','2020-12-29 15:49:47','ST_11'),(20150012,2015,0,NULL,NULL,0,0,1,3,1,0,5,0,1,'11_B','2020-12-29 15:42:32','2020-12-29 15:50:09','ST_12'),(20150013,2015,0,NULL,NULL,0,0,1,2,4,1,1,1,1,'11_B','2020-12-29 15:42:49','2020-12-29 15:50:31','ST_13'),(20150014,2015,0,NULL,NULL,0,0,1,1,4,2,1,1,1,'11_B','2020-12-29 15:43:01','2020-12-29 15:50:49','ST_14'),(20150015,2015,0,NULL,NULL,0,0,1,2,2,2,3,0,1,'11_B','2020-12-29 15:43:12','2020-12-29 15:51:12','ST_15'),(20160001,2016,0,NULL,NULL,0,0,1,1,8,0,0,0,1,'11_A','2020-12-29 15:52:02','2020-12-29 15:55:28','ST_1'),(20160002,2016,0,NULL,NULL,0,0,1,8,1,0,0,0,1,'11_A','2020-12-29 15:53:36','2020-12-29 15:55:38','ST_2'),(20160003,2016,0,NULL,NULL,0,0,1,7,0,1,1,0,1,'11_A','2020-12-29 15:53:51','2020-12-29 15:55:50','ST_3'),(20160004,2016,0,NULL,NULL,0,0,1,3,3,2,1,0,1,'11_A','2020-12-29 15:54:01','2020-12-29 15:56:03','ST_4'),(20160005,2016,0,NULL,NULL,0,0,1,5,4,0,0,0,1,'11_A','2020-12-29 15:54:14','2020-12-29 15:56:19','ST_5'),(20160006,2016,0,NULL,NULL,0,0,1,8,1,0,0,0,1,'11_A','2020-12-29 15:54:25','2020-12-29 15:56:37','ST_6'),(20160007,2016,0,NULL,NULL,0,0,1,2,0,3,1,3,1,'11_A','2020-12-29 15:54:35','2020-12-29 15:56:56','ST_7'),(20160008,2016,0,NULL,NULL,0,0,1,7,1,0,0,1,1,'11_A','2020-12-29 15:54:46','2020-12-29 15:57:20','ST_8'),(20160009,2016,0,NULL,NULL,0,0,1,2,3,3,1,0,1,'11_A','2020-12-29 15:54:57','2020-12-29 15:57:46','ST_9'),(20160010,2016,0,NULL,NULL,0,0,1,0,0,9,0,0,1,'11_A','2020-12-29 15:52:23','2020-12-29 15:58:08','ST_10'),(20160011,2016,0,NULL,NULL,0,0,1,0,0,3,5,1,1,'11_B','2020-12-29 15:52:36','2020-12-29 15:58:28','ST_11'),(20160012,2016,0,NULL,NULL,0,0,1,0,0,2,3,4,1,'11_B','2020-12-29 15:52:47','2020-12-29 15:58:48','ST_12'),(20160013,2016,0,NULL,NULL,0,0,1,0,9,0,0,0,1,'11_B','2020-12-29 15:52:59','2020-12-29 15:59:09','ST_13'),(20160014,2016,0,NULL,NULL,0,0,1,0,0,0,9,0,1,'11_B','2020-12-29 15:53:12','2020-12-29 15:59:33','ST_14'),(20160015,2016,0,NULL,NULL,0,0,1,3,2,3,1,0,1,'11_B','2020-12-29 15:53:22','2020-12-29 15:59:48','ST_15'),(20170001,2017,0,NULL,NULL,0,0,1,9,0,0,0,0,1,'11_A','2020-12-29 16:00:35','2020-12-29 16:03:59','ST_1'),(20170002,2017,0,NULL,NULL,0,0,1,8,0,1,0,0,1,'11_A','2020-12-29 16:02:08','2020-12-29 16:04:14','ST_2'),(20170003,2017,0,NULL,NULL,0,0,1,2,2,5,0,0,1,'11_A','2020-12-29 16:02:21','2020-12-29 16:04:32','ST_3'),(20170004,2017,0,NULL,NULL,0,0,1,2,5,2,0,0,1,'11_A','2020-12-29 16:02:33','2020-12-29 16:04:49','ST_4'),(20170005,2017,0,NULL,NULL,0,0,1,0,4,5,0,0,1,'11_A','2020-12-29 16:02:48','2020-12-29 16:05:05','ST_5'),(20170006,2017,0,NULL,NULL,0,0,1,0,9,0,0,0,1,'11_A','2020-12-29 16:02:59','2020-12-29 16:05:25','ST_6'),(20170007,2017,0,NULL,NULL,0,0,1,0,7,1,0,1,1,'11_A','2020-12-29 16:03:11','2020-12-29 16:05:38','ST_7'),(20170008,2017,0,NULL,NULL,0,0,1,7,1,1,0,0,1,'11_A','2020-12-29 16:03:24','2020-12-29 16:05:51','ST_8'),(20170009,2017,0,NULL,NULL,0,0,1,1,1,6,0,1,1,'11_A','2020-12-29 16:03:33','2020-12-29 16:06:05','ST_9'),(20170010,2017,0,NULL,NULL,0,0,1,0,2,7,0,0,1,'11_A','2020-12-29 16:00:47','2020-12-29 16:06:28','ST_10'),(20170011,2017,0,NULL,NULL,0,0,1,3,3,3,0,0,1,'11_B','2020-12-29 16:01:00','2020-12-29 16:06:45','ST_11'),(20170012,2017,0,NULL,NULL,0,0,1,0,4,4,1,0,1,'11_B','2020-12-29 16:01:14','2020-12-29 16:06:56','ST_12'),(20170013,2017,0,NULL,NULL,0,0,1,0,2,0,0,7,1,'11_B','2020-12-29 16:01:32','2020-12-29 16:07:12','ST_13'),(20170014,2017,0,NULL,NULL,0,0,1,0,0,9,0,0,1,'11_B','2020-12-29 16:01:41','2020-12-29 16:07:31','ST_14'),(20170015,2017,0,NULL,NULL,0,0,1,0,4,2,2,1,1,'11_B','2020-12-29 16:01:55','2020-12-29 16:07:44','ST_15'),(20180001,2018,0,NULL,NULL,0,0,1,1,3,5,0,0,1,'11_A','2020-12-29 16:09:25','2020-12-29 16:13:24','ST_1'),(20180002,2018,0,NULL,NULL,0,0,1,1,4,4,0,0,1,'11_A','2020-12-29 16:11:01','2020-12-29 16:13:39','ST_2'),(20180003,2018,0,NULL,NULL,0,0,1,9,0,0,0,0,1,'11_A','2020-12-29 16:11:22','2020-12-29 16:13:52','ST_3'),(20180004,2018,0,NULL,NULL,0,0,1,0,0,3,6,0,1,'11_A','2020-12-29 16:11:36','2020-12-29 16:14:03','ST_4'),(20180005,2018,0,NULL,NULL,0,0,1,1,0,8,0,0,1,'11_A','2020-12-29 16:11:50','2020-12-29 16:14:16','ST_5'),(20180006,2018,0,NULL,NULL,0,0,1,0,0,6,3,0,1,'11_A','2020-12-29 16:12:01','2020-12-29 16:14:32','ST_6'),(20180007,2018,0,NULL,NULL,0,0,1,9,0,0,0,0,1,'11_A','2020-12-29 16:12:14','2020-12-29 16:14:55','ST_7'),(20180008,2018,0,NULL,NULL,0,0,1,2,2,2,3,0,1,'11_A','2020-12-29 16:12:27','2020-12-29 16:15:06','ST_8'),(20180009,2018,0,NULL,NULL,0,0,1,0,1,6,1,1,1,'11_A','2020-12-29 16:12:38','2020-12-29 16:15:20','ST_9'),(20180010,2018,0,NULL,NULL,0,0,1,0,4,2,2,1,1,'11_A','2020-12-29 16:09:38','2020-12-29 16:15:33','ST_10'),(20180011,2018,0,NULL,NULL,0,0,1,2,3,1,3,0,1,'11_B','2020-12-29 16:09:54','2020-12-29 16:15:50','ST_11'),(20180012,2018,0,NULL,NULL,0,0,1,1,1,3,2,2,1,'11_B','2020-12-29 16:10:06','2020-12-29 16:16:05','ST_12'),(20180013,2018,0,NULL,NULL,0,0,1,0,5,4,0,0,1,'11_B','2020-12-29 16:10:15','2020-12-29 16:16:20','ST_13'),(20180014,2018,0,NULL,NULL,0,0,1,5,2,1,1,0,1,'11_B','2020-12-29 16:10:32','2020-12-29 16:16:34','ST_14'),(20180015,2018,0,NULL,NULL,0,0,1,3,5,1,0,0,1,'11_B','2020-12-29 16:10:48','2020-12-29 16:16:50','ST_15'),(20181016,2018,1,'Physical',1.101000,156,2314,1,1,1,0,1,0,1,'13_MATH','2020-12-29 20:51:43','2020-12-29 21:04:14','ST_16'),(20181017,2018,1,'Physical',0.881000,353,3618,1,0,0,2,1,0,1,'13_MATH','2020-12-29 20:51:53','2020-12-29 21:04:42','ST_17'),(20181018,2018,1,'Physical',2.870000,12,120,1,3,0,0,0,0,1,'13_MATH','2020-12-29 20:52:01','2020-12-29 21:05:14','ST_18'),(20181019,2018,1,'Physical',0.991000,246,1875,1,0,1,1,1,0,1,'13_MATH','2020-12-29 20:52:08','2020-12-29 21:05:53','ST_19'),(20181020,2018,1,'Physical',0.001000,765,6871,1,0,0,0,0,3,1,'13_MATH','2020-12-29 20:52:17','2020-12-29 21:06:46','ST_20'),(20181021,2018,1,'Biology',2.700000,85,259,1,3,0,0,0,0,1,'13_BIO','2020-12-29 20:52:32','2020-12-29 21:07:17','ST_21'),(20181022,2018,1,'Biology',1.500000,179,1456,1,1,1,0,1,0,1,'13_BIO','2020-12-29 20:52:41','2020-12-29 21:07:50','ST_22'),(20181024,2018,1,'Biology',2.001000,120,456,1,0,3,0,0,0,1,'13_BIO','2020-12-29 20:52:48','2020-12-29 21:08:24','ST_24'),(20181025,2018,1,'Biology',1.500000,298,1109,1,0,2,1,0,0,1,'13_BIO','2020-12-29 20:52:55','2020-12-29 21:09:02','ST_25'),(20181031,2018,1,'Commerce',2.901000,1,10,1,3,0,0,0,0,1,'13_COM','2020-12-29 21:01:24','2020-12-29 21:09:40','ST_31'),(20181032,2018,1,'Commerce',1.500000,200,1230,1,1,1,1,0,0,1,'13_COM','2020-12-29 21:01:55','2020-12-29 21:10:12','ST_32'),(20181033,2018,1,'Commerce',1.600000,176,990,1,1,1,1,0,0,1,'13_COM','2020-12-29 21:02:03','2020-12-29 21:11:28','ST_33'),(20181034,2018,1,'Commerce',1.900000,141,600,1,2,1,0,0,0,1,'13_COM','2020-12-29 21:02:11','2020-12-29 21:11:49','ST_34'),(20181035,2018,1,'Commerce',2.400000,91,250,1,3,0,0,0,0,1,'13_COM','2020-12-29 21:02:21','2020-12-29 21:12:21','ST_35'),(20190001,2019,0,NULL,NULL,0,0,1,9,0,0,0,0,1,'11_A','2020-12-29 16:17:50','2020-12-29 16:29:36','ST_1'),(20190002,2019,0,NULL,NULL,0,0,1,3,5,1,0,0,1,'11_A','2020-12-29 16:19:54','2020-12-29 16:34:58','ST_2'),(20190003,2019,0,NULL,NULL,0,0,1,2,2,4,1,0,1,'11_A','2020-12-29 16:20:08','2020-12-29 16:35:42','ST_3'),(20190004,2019,0,NULL,NULL,0,0,1,0,9,0,0,0,1,'11_A','2020-12-29 16:20:19','2020-12-29 16:36:05','ST_4'),(20190005,2019,0,NULL,NULL,0,0,1,9,0,0,0,0,1,'11_A','2020-12-29 16:20:35','2020-12-29 16:36:32','ST_5'),(20190006,2019,0,NULL,NULL,0,0,1,1,1,2,4,1,1,'11_A','2020-12-29 16:20:44','2020-12-29 16:37:34','ST_6'),(20190007,2019,0,NULL,NULL,0,0,1,0,0,0,9,0,1,'11_A','2020-12-29 16:20:53','2020-12-29 16:37:51','ST_7'),(20190008,2019,0,NULL,NULL,0,0,1,3,3,3,0,0,1,'11_A','2020-12-29 16:21:16','2020-12-29 16:38:29','ST_8'),(20190009,2019,0,NULL,NULL,0,0,1,0,6,0,1,2,1,'11_A','2020-12-29 16:21:26','2020-12-29 16:39:29','ST_9'),(20190010,2019,0,NULL,NULL,0,0,1,7,0,0,2,0,1,'11_A','2020-12-29 16:18:34','2020-12-29 16:40:26','ST_10'),(20190011,2019,0,NULL,NULL,0,0,1,9,0,0,0,0,1,'11_B','2020-12-29 16:18:54','2020-12-31 19:53:43','ST_11'),(20190012,2019,0,NULL,NULL,0,0,1,8,0,1,0,0,1,'11_B','2020-12-29 16:43:53','2020-12-29 16:46:10','ST_12'),(20190013,2019,0,NULL,NULL,0,0,1,5,1,2,1,0,1,'11_B','2020-12-29 16:19:20','2020-12-29 16:42:02','ST_13'),(20190014,2019,0,NULL,NULL,0,0,1,0,0,5,1,3,1,'11_B','2020-12-29 16:19:08','2020-12-29 16:42:50','ST_14'),(20190015,2019,0,NULL,NULL,0,0,1,1,8,0,0,0,1,'11_B','2020-12-29 16:19:40','2020-12-29 16:43:23','ST_15'),(20191016,2019,1,'Physical',2.890000,23,87,1,3,0,0,0,0,1,'13_MATH','2020-12-29 20:10:05','2020-12-29 20:13:57','ST_16'),(20191017,2019,1,'Physical',1.240000,129,1345,1,1,1,1,0,0,1,'13_MATH','2020-12-29 20:10:20','2020-12-29 20:20:33','ST_17'),(20191018,2019,1,'Physical',1.330000,119,1100,1,0,2,1,0,0,1,'13_MATH','2020-12-29 20:10:34','2020-12-29 20:21:19','ST_18'),(20191019,2019,1,'Physical',0.821000,358,3823,1,0,0,3,0,0,1,'13_MATH','2020-12-29 20:10:45','2020-12-29 20:23:51','ST_19'),(20191020,2019,1,'Physical',2.990000,14,56,1,3,0,0,0,0,1,'13_MATH','2020-12-29 20:10:56','2020-12-29 20:24:42','ST_20'),(20191021,2019,1,'Biology',2.456000,100,256,1,1,2,0,0,0,1,'13_BIO','2020-12-29 20:12:29','2020-12-29 20:27:50','ST_21'),(20191022,2019,1,'Biology',0.923000,300,2456,1,1,0,1,1,0,1,'13_BIO','2020-12-29 20:12:54','2020-12-29 20:28:33','ST_22'),(20191024,2019,1,'Biology',2.900000,2,25,1,3,0,0,0,0,1,'13_BIO','2020-12-29 20:13:02','2020-12-29 20:29:42','ST_24'),(20191025,2019,1,'Biology',2.300000,46,128,1,2,1,0,0,0,1,'13_BIO','2020-12-29 20:13:11','2020-12-29 20:30:12','ST_25'),(20191031,2019,1,'Commerce',2.700000,7,49,1,3,0,0,0,0,1,'13_COM','2020-12-29 20:35:10','2020-12-29 20:36:44','ST_31'),(20191032,2019,1,'Commerce',1.800000,134,3567,1,0,3,0,0,0,1,'13_COM','2020-12-29 20:35:24','2020-12-29 20:37:24','ST_32'),(20191033,2019,1,'Commerce',2.400000,78,450,1,3,0,0,0,0,1,'13_COM','2020-12-29 20:35:32','2020-12-29 20:37:59','ST_33'),(20191034,2019,1,'Commerce',0.320000,689,9635,1,0,0,1,1,1,1,'13_COM','2020-12-29 20:35:46','2020-12-29 20:39:06','ST_34'),(20191035,2019,1,'Commerce',1.200000,456,2563,1,1,1,1,0,0,1,'13_COM','2020-12-29 20:35:54','2020-12-29 20:39:47','ST_35'),(20200001,2020,0,NULL,NULL,0,0,1,9,0,0,0,0,1,'11_A','2020-12-31 19:47:22','2020-12-31 20:50:42','ST_1'),(20200002,2020,0,NULL,NULL,0,0,1,9,0,0,0,0,1,'11_A','2020-12-31 19:55:35','2020-12-31 20:51:06','ST_2'),(20200003,2020,0,NULL,NULL,0,0,1,2,5,1,1,0,1,'11_A','2020-12-31 19:55:47','2020-12-31 20:52:43','ST_3'),(20200004,2020,0,NULL,NULL,0,0,1,3,2,3,1,0,1,'11_A','2020-12-31 19:55:57','2020-12-31 20:53:10','ST_4'),(20200005,2020,0,NULL,NULL,0,0,1,1,5,2,1,0,1,'11_A','2020-12-31 19:56:11','2020-12-31 20:53:32','ST_5'),(20200006,2020,0,NULL,NULL,0,0,1,2,3,2,2,0,1,'11_A','2020-12-31 19:56:41','2020-12-31 20:53:56','ST_6'),(20200007,2020,0,NULL,NULL,0,0,1,3,1,3,2,0,1,'11_A','2020-12-31 19:57:07','2020-12-31 20:54:17','ST_7'),(20200008,2020,0,NULL,NULL,0,0,1,5,2,1,1,0,1,'11_A','2020-12-31 19:57:16','2020-12-31 20:54:32','ST_8'),(20200009,2020,0,NULL,NULL,0,0,1,9,0,0,0,0,1,'11_A','2020-12-31 19:57:28','2020-12-31 20:52:21','ST_9'),(20200010,2020,0,NULL,NULL,0,0,1,9,0,0,0,0,1,'11_A','2020-12-31 19:54:04','2020-12-31 20:51:23','ST_10'),(20200011,2020,0,NULL,NULL,0,0,1,0,6,3,0,0,1,'11_B','2020-12-31 19:54:20','2020-12-31 20:54:50','ST_11'),(20200012,2020,0,NULL,NULL,0,0,1,4,2,1,2,0,1,'11_B','2020-12-31 19:54:34','2020-12-31 20:55:23','ST_12'),(20200013,2020,0,NULL,NULL,0,0,1,0,0,9,0,0,1,'11_B','2020-12-31 19:54:45','2020-12-31 20:55:36','ST_13'),(20200014,2020,0,NULL,NULL,0,0,1,1,2,1,4,1,1,'11_B','2020-12-31 19:54:56','2020-12-31 20:55:51','ST_14'),(20200015,2020,0,NULL,NULL,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,0,'11_B','2020-12-31 19:55:18','2020-12-31 19:55:18','ST_15'),(20200034,2020,1,'Commerce',2.200000,19,127,1,3,0,0,0,0,1,'13_COM','2020-12-31 20:01:31','2021-01-07 15:02:34','ST_34'),(20201016,2020,1,'Physical',2.300000,89,135,1,2,0,1,0,0,1,'13_MATH','2020-12-31 19:57:57','2021-01-07 14:47:09','ST_16'),(20201017,2020,1,'Physical',2.600000,37,98,1,3,0,0,0,0,1,'13_MATH','2020-12-31 19:58:29','2021-01-07 14:47:51','ST_17'),(20201018,2020,1,'Physical',2.900000,2,23,1,3,0,0,0,0,1,'13_MATH','2020-12-31 19:58:48','2021-01-07 14:48:12','ST_18'),(20201019,2020,1,'Physical',2.700000,45,124,1,2,0,1,0,0,1,'13_MATH','2020-12-31 19:59:02','2021-01-07 14:52:35','ST_19'),(20201020,2020,1,'Physical',2.100000,42,234,1,0,3,0,0,0,1,'13_MATH','2020-12-31 19:59:17','2021-01-07 14:54:49','ST_20'),(20201021,2020,1,'Biology',1.400000,43,222,1,0,0,3,0,0,1,'13_BIO','2020-12-31 19:59:36','2021-01-07 14:58:30','ST_21'),(20201022,2020,1,'Biology',2.100000,40,227,1,1,2,0,0,0,1,'13_BIO','2020-12-31 19:59:50','2021-01-07 14:59:36','ST_22'),(20201024,2020,1,'Biology',2.300000,55,227,1,1,1,1,0,0,1,'13_BIO','2020-12-31 20:00:14','2021-01-07 15:00:09','ST_24'),(20201025,2020,1,'Biology',0.800000,111,2327,1,0,0,0,3,0,1,'13_BIO','2020-12-31 20:00:28','2021-01-07 15:01:24','ST_25'),(20201031,2020,1,'Commerce',1.900000,39,217,1,0,1,2,0,0,1,'13_COM','2020-12-31 20:00:44','2021-01-07 15:03:13','ST_31'),(20201032,2020,1,'Commerce',1.000000,32,216,1,0,1,2,0,0,1,'13_COM','2020-12-31 20:00:58','2021-01-07 15:03:55','ST_32'),(20201033,2020,1,'Commerce',1.100000,33,219,1,0,0,3,0,0,1,'13_COM','2020-12-31 20:01:14','2021-01-07 15:04:29','ST_33'),(20201035,2020,1,'Commerce',1.600000,35,220,1,1,2,0,0,0,1,'13_COM','2020-12-31 20:01:43','2021-01-07 15:05:07','ST_35');
/*!40000 ALTER TABLE `mainexamdetails` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-01-08  1:10:59