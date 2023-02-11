/*
Navicat MySQL Data Transfer

Source Server         : LOCALHOST
Source Server Version : 100417
Source Host           : localhost:3306
Source Database       : db_selftiketabsen

Target Server Type    : MYSQL
Target Server Version : 100417
File Encoding         : 65001

Date: 2023-02-11 08:48:42
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for tb_pegawai
-- ----------------------------
DROP TABLE IF EXISTS `tb_pegawai`;
CREATE TABLE `tb_pegawai` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `NIK` varchar(255) DEFAULT NULL,
  `nama_pegawai` varchar(255) DEFAULT '',
  `id_unit` int(11) DEFAULT NULL,
  `status` int(1) DEFAULT 1,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tb_pegawai
-- ----------------------------
INSERT INTO `tb_pegawai` VALUES ('1', 'K00001', 'Admin', '1', '1');
INSERT INTO `tb_pegawai` VALUES ('6', 'K00002', 'Pegawai 1', '2', '1');
INSERT INTO `tb_pegawai` VALUES ('8', 'K00003', 'Pegawai 2', '3', '1');
INSERT INTO `tb_pegawai` VALUES ('9', 'K00004', 'Manager 1', '2', '1');
INSERT INTO `tb_pegawai` VALUES ('10', 'K00005', 'Manager 2', '3', '1');

-- ----------------------------
-- Table structure for tb_tiket
-- ----------------------------
DROP TABLE IF EXISTS `tb_tiket`;
CREATE TABLE `tb_tiket` (
  `id` int(11) NOT NULL,
  `nomor_tiket` varchar(255) DEFAULT NULL,
  `id_pegawai` int(11) DEFAULT NULL,
  `id_unit` int(255) DEFAULT NULL,
  `alasan` varchar(255) DEFAULT NULL,
  `tanggal` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  `lokasi` varchar(255) DEFAULT NULL,
  `evident` varchar(255) DEFAULT NULL,
  `status` varchar(1) DEFAULT 'P',
  `manager` varchar(255) DEFAULT NULL,
  `manager_status` varchar(1) DEFAULT NULL,
  `manager_date` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tb_tiket
-- ----------------------------

-- ----------------------------
-- Table structure for tb_unit
-- ----------------------------
DROP TABLE IF EXISTS `tb_unit`;
CREATE TABLE `tb_unit` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nama_unit` varchar(255) DEFAULT NULL,
  `status` int(11) DEFAULT 1,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tb_unit
-- ----------------------------
INSERT INTO `tb_unit` VALUES ('1', 'Maintenance', '1');
INSERT INTO `tb_unit` VALUES ('2', 'Shared Service', '1');
INSERT INTO `tb_unit` VALUES ('3', 'Kontruksi', '1');
INSERT INTO `tb_unit` VALUES ('4', 'Assurance', '1');
INSERT INTO `tb_unit` VALUES ('7', 'IT Programmer', null);

-- ----------------------------
-- Table structure for tb_user
-- ----------------------------
DROP TABLE IF EXISTS `tb_user`;
CREATE TABLE `tb_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_pegawai` int(11) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `password` text DEFAULT NULL,
  `level` int(11) DEFAULT NULL COMMENT '1 -> Pegawai, 2 -> Manager, 3 -> Admin',
  `status` int(11) DEFAULT 1,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tb_user
-- ----------------------------
INSERT INTO `tb_user` VALUES ('1', '1', 'admin', '21232f297a57a5a743894a0e4a801fc3', '1', '1');
INSERT INTO `tb_user` VALUES ('4', '9', 'manager1', 'c240642ddef994358c96da82c0361a58', '2', '1');

-- ----------------------------
-- View structure for v_user
-- ----------------------------
DROP VIEW IF EXISTS `v_user`;
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost`  VIEW `v_user` AS SELECT u.*, p.nama_pegawai, case level when 1 then 'Pegawai' when 2 then 'Manager' when 3 then 'Administrator' end level_desc 
FROM tb_user u
LEFT JOIN tb_pegawai p ON p.id = u.id_pegawai ;
SET FOREIGN_KEY_CHECKS=1;
