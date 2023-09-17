CREATE DATABASE IF NOT EXISTS `notes`;
USE `notes`;
CREATE TABLE IF NOT EXISTS `notes` (
  `NoteID` bigint NOT NULL AUTO_INCREMENT,
  `Title` varchar(255) NOT NULL,
  `Content` text NOT NULL,
  `Type` varchar(255) NOT NULL,
  `UserID` bigint NOT NULL,
  `Active` int NOT NULL DEFAULT '1',
  `DateCreated` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `DateModified` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `Deleted` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`NoteID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `users` (
  `UserID` bigint NOT NULL AUTO_INCREMENT,
  `FullName` varchar(255) NOT NULL,
  `Email` varchar(255) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `Role` varchar(255) NOT NULL,
  `Active` int NOT NULL DEFAULT '1',
  `DateCreated` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `DateModified` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `Deleted` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`UserID`),
  UNIQUE KEY `Email` (`Email`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
