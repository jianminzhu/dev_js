 
CREATE TABLE `ps` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `p` varchar(255) DEFAULT NULL,
  `v` int(11) DEFAULT NULL,
  `dt` datetime DEFAULT NULL,
  `no` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `v_dt` (`v`,`dt`)
) ENGINE=InnoDB AUTO_INCREMENT=4444 DEFAULT CHARSET=utf8


CREATE  
    VIEW  `view_ps` 
    AS
(SELECT
  `ps`.`p` AS `p`,
  `ps`.`v` AS `v`,
  CONVERT_TZ(`ps`.`dt`,'-08:00','+00:00') AS `DATETIME`
FROM `ps`
ORDER BY CONVERT_TZ(`ps`.`dt`,'-08:00','+00:00')DESC);
  