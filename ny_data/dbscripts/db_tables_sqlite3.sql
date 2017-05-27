/*
Navicat SQLite Data Transfer

Source Server         : test
Source Server Version : 30714
Source Host           : :0

Target Server Type    : SQLite
Target Server Version : 30714
File Encoding         : 65001

Date: 2017-04-24 20:35:29
*/

PRAGMA foreign_keys = OFF;

-- ----------------------------
-- Table structure for ps
-- ----------------------------
DROP TABLE IF EXISTS "main"."ps";
CREATE TABLE `ps` (`id` INTEGER PRIMARY KEY AUTOINCREMENT, `p` VARCHAR(255), `v` INTEGER, `dt` DATETIME, `no` INTEGER, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL);


DROP VIEW "main"."view_ps";
CREATE VIEW "main"."view_ps" AS 
select p,v, datetime(strftime('%s', dt ),'unixepoch', 'localtime')  as datetime from ps ;