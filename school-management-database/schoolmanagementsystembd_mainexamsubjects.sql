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
-- Table structure for table `mainexamsubjects`
--

DROP TABLE IF EXISTS `mainexamsubjects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mainexamsubjects` (
  `mesubjectid` int NOT NULL AUTO_INCREMENT,
  `mesubjectname` varchar(255) NOT NULL,
  `metype` tinyint(1) NOT NULL,
  `emmandatory` tinyint(1) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `teacherid` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`mesubjectid`),
  KEY `teacherid` (`teacherid`),
  CONSTRAINT `mainexamsubjects_ibfk_1` FOREIGN KEY (`teacherid`) REFERENCES `teachers` (`teacherid`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=60 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mainexamsubjects`
--

LOCK TABLES `mainexamsubjects` WRITE;
/*!40000 ALTER TABLE `mainexamsubjects` DISABLE KEYS */;
INSERT INTO `mainexamsubjects` VALUES (1,'mathematics',0,1,'2020-09-09 00:00:00','2020-09-09 00:00:00','AC_1'),(2,'sinhala',0,1,'2020-09-09 00:00:00','2020-09-09 00:00:00','AC_21'),(3,'science',0,1,'2020-09-09 00:00:00','2020-09-09 00:00:00','AC_3'),(4,'history',0,1,'2020-09-09 00:00:00','2020-09-09 00:00:00','AC_4'),(5,'english',0,1,'2020-09-09 00:00:00','2020-09-09 00:00:00','AC_6'),(6,'religion',0,1,'2020-09-09 00:00:00','2020-09-09 00:00:00','AC_5'),(7,'commerce',0,0,'2020-09-09 00:00:00','2020-09-09 00:00:00','AC_15'),(8,'geography',0,0,'2020-09-09 00:00:00','2020-09-09 00:00:00','AC_22'),(9,'art',0,0,'2020-09-09 00:00:00','2020-09-09 00:00:00','AC_9'),(10,'hindi',0,0,'2020-09-09 00:00:00','2020-09-09 00:00:00','AC_16'),(11,'tamil',0,0,'2020-09-09 00:00:00','2020-09-09 00:00:00','AC_11'),(12,'western_music',0,0,'2020-09-09 00:00:00','2020-09-09 00:00:00','AC_23'),(13,'estern_music',0,0,'2020-09-09 00:00:00','2020-09-09 00:00:00','AC_7'),(14,'art',0,0,'2020-09-09 00:00:00','2020-09-09 00:00:00','AC_9'),(15,'dancing',0,0,'2020-09-09 00:00:00','2020-09-09 00:00:00','AC_8'),(16,'drama',0,0,'2020-09-09 00:00:00','2020-09-09 00:00:00','AC_10'),(17,'english_literature',0,0,'2020-09-09 00:00:00','2020-09-09 00:00:00','AC_19'),(18,'sinhala_literature',0,0,'2020-09-09 00:00:00','2020-09-09 00:00:00','AC_24'),(19,'it',0,0,'2020-09-09 00:00:00','2020-09-09 00:00:00','AC_17'),(20,'health',0,0,'2020-09-09 00:00:00','2020-09-09 00:00:00','AC_13'),(21,'agriculture',0,0,'2020-09-09 00:00:00','2020-09-09 00:00:00','AC_30'),(22,'combine_mathematics',1,1,'2020-09-09 00:00:00','2020-09-09 00:00:00','AC_25'),(23,'physics',1,1,'2020-09-09 00:00:00','2020-09-09 00:00:00','AC_27'),(24,'chemistry',1,1,'2020-09-09 00:00:00','2020-09-09 00:00:00','AC_26'),(25,'information_technology',1,0,'2020-09-09 00:00:00','2020-09-09 00:00:00','AC_28'),(26,'biology',1,1,'2020-09-09 00:00:00','2020-09-09 00:00:00','AC_29'),(29,'agriculture',1,0,'2020-09-09 00:00:00','2020-09-09 00:00:00','AC_30'),(30,'economics',1,0,'2020-09-09 00:00:00','2020-09-09 00:00:00','AC_31'),(31,'business_studies',1,0,'2020-09-09 00:00:00','2020-09-09 00:00:00','AC_40'),(32,'ict',1,0,'2020-09-09 00:00:00','2020-09-09 00:00:00','AC_17'),(33,'statistics',1,0,'2020-09-09 00:00:00','2020-09-09 00:00:00','AC_35'),(34,'accounting',1,1,'2020-09-09 00:00:00','2020-09-09 00:00:00','AC_38'),(36,'roman_civilization',1,0,'2020-09-09 00:00:00','2020-09-09 00:00:00','AC_32'),(37,'home_economics',1,0,'2020-09-09 00:00:00','2020-09-09 00:00:00','AC_33'),(38,'divinity',1,0,'2020-09-09 00:00:00','2020-09-09 00:00:00','AC_34'),(39,'english',1,0,'2020-09-09 00:00:00','2020-09-09 00:00:00','AC_6'),(40,'statistic',1,0,'2020-09-09 00:00:00','2020-09-09 00:00:00','AC_35'),(41,'political_science',1,0,'2020-09-09 00:00:00','2020-09-09 00:00:00','AC_36'),(42,'art',1,0,'2020-09-09 00:00:00','2020-09-09 00:00:00','AC_9'),(43,'french',1,0,'2020-09-09 00:00:00','2020-09-09 00:00:00','AC_37'),(44,'accounts',1,0,'2020-09-09 00:00:00','2020-09-09 00:00:00','AC_38'),(45,'geography',1,0,'2020-09-09 00:00:00','2020-09-09 00:00:00','AC_22'),(46,'logic',1,0,'2020-09-09 00:00:00','2020-09-09 00:00:00','AC_39'),(47,'sinhala',1,0,'2020-09-09 00:00:00','2020-09-09 00:00:00','AC_21'),(48,'hindi',1,0,'2020-09-09 00:00:00','2020-09-09 00:00:00','AC_16'),(49,'engineering_tech',1,0,'2020-09-09 00:00:00','2020-09-09 00:00:00','AC_41'),(50,'bio_system_tech',1,0,'2020-09-09 00:00:00','2020-09-09 00:00:00','AC_42'),(51,'science_for_technology',1,1,'2020-09-09 00:00:00','2020-09-09 00:00:00','AC_43'),(53,'information_technology',1,0,'2020-09-09 00:00:00','2020-09-09 00:00:00','AC_17'),(55,'geography',1,0,'2020-09-09 00:00:00','2020-09-09 00:00:00','AC_22'),(56,'commerce',1,0,'2020-09-09 00:00:00','2020-09-09 00:00:00','AC_15'),(58,'art',1,0,'2020-09-09 00:00:00','2020-09-09 00:00:00','AC_9'),(59,'citizen_education',0,0,'2020-09-09 00:00:00','2020-09-09 00:00:00','AC_31');
/*!40000 ALTER TABLE `mainexamsubjects` ENABLE KEYS */;
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
