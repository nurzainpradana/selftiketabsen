-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 03, 2022 at 08:24 AM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 7.4.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_tpp`
--

-- --------------------------------------------------------

--
-- Table structure for table `tb_approval`
--

CREATE TABLE `tb_approval` (
  `id_approval` int(11) NOT NULL,
  `nama_pegawai` varchar(255) DEFAULT '',
  `nip_pegawai` varchar(255) DEFAULT '',
  `pangkat_golongan` varchar(255) DEFAULT NULL,
  `jabatan` varchar(255) DEFAULT NULL,
  `unit_kerja` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tb_approval`
--

INSERT INTO `tb_approval` (`id_approval`, `nama_pegawai`, `nip_pegawai`, `pangkat_golongan`, `jabatan`, `unit_kerja`) VALUES
(1, 'ALI SADIKIN, S.Pd.I., M.Si\r\n', '19710604 200801 1 002', 'Penata Muda Tk.I / III.b\r\n', 'Verifikator\r\n', 'BKPSDM\r\n'),
(2, 'CECEP SUMITA AGUNG, SE\r\n', '19760716 200801 1 021\r\n', 'Penata Tk.I / III.d\r\n', 'Kepala Subbagian Umum dan Kepegawaian\r\n', 'Kecamatan Setu\r\n'),
(3, 'Drs. JOKO DWIJATMOKO, M.Si\r\n', '19721112 199302 1 001\r\n', 'Pembina Tk.I / IV.b\r\n', 'Camat Setu\r\n', 'Kecamatan Setu\r\n');

-- --------------------------------------------------------

--
-- Table structure for table `tb_besaran_tpp`
--

CREATE TABLE `tb_besaran_tpp` (
  `id_besaran_tpp` int(11) NOT NULL,
  `id_jabatan` int(11) DEFAULT NULL,
  `beban_kerja` int(11) DEFAULT 0,
  `prestasi_kerja` int(11) DEFAULT NULL,
  `kondisi_kerja` int(11) DEFAULT NULL,
  `kelangkaan_profesi` int(11) DEFAULT NULL,
  `tambahan_tpp` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tb_besaran_tpp`
--

INSERT INTO `tb_besaran_tpp` (`id_besaran_tpp`, `id_jabatan`, `beban_kerja`, `prestasi_kerja`, `kondisi_kerja`, `kelangkaan_profesi`, `tambahan_tpp`) VALUES
(2, 2, 8715000, 11205000, 4980000, 0, 0),
(3, 1, 11340000, 14580000, 6480000, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `tb_capaian_kerja`
--

CREATE TABLE `tb_capaian_kerja` (
  `id_capaian_kinerja` int(30) NOT NULL,
  `periode` varchar(7) DEFAULT '',
  `id_pegawai` int(30) DEFAULT NULL,
  `nilai_produktivitas_kerja` int(5) DEFAULT NULL,
  `id_approval` int(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tb_capaian_kerja`
--

INSERT INTO `tb_capaian_kerja` (`id_capaian_kinerja`, `periode`, `id_pegawai`, `nilai_produktivitas_kerja`, `id_approval`) VALUES
(3, '2022-09', 18, 99, NULL),
(4, '2022-08', 18, 97, NULL),
(5, '2022-10', 2, 100, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `tb_jabatan`
--

CREATE TABLE `tb_jabatan` (
  `id_jabatan` int(11) NOT NULL,
  `nama_jabatan` varchar(255) DEFAULT NULL,
  `unit_kerja` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tb_jabatan`
--

INSERT INTO `tb_jabatan` (`id_jabatan`, `nama_jabatan`, `unit_kerja`) VALUES
(1, 'CAMAT', 'KECAMATAN SETU'),
(2, 'SEKRETARIS KECAMATAN', 'KECAMATAN SETU'),
(3, 'KEPALA SUBBAGIAN PERENCANAAN DAN KEUANGAN', 'KECAMATAN SETU'),
(4, 'BENDAHARA', 'KECAMATAN SETU'),
(5, 'ANALIS PERENCANAAN, EVALUASI DAN PELAPORAN', 'KECAMATAN SETU'),
(6, 'PENATA LAPORAN KEUANGAN', 'KECAMATAN SETU'),
(7, 'KEPALA SUBBAGIAN UMUM DAN KEPEGAWAIAN', 'KECAMATAN SETU'),
(8, 'PENGADMINISTRASI UMUM', 'KECAMATAN SETU'),
(9, 'PENGELOLA KEPEGAWAIAN', 'KECAMATAN SETU'),
(10, 'PENYUSUN KEBUTUHAN BARANG INVENTARIS', 'KECAMATAN SETU'),
(11, 'PRANATA KEARSIPAN', 'KECAMATAN SETU'),
(12, 'PENGELOLA PERJALANAN DINAS', 'KECAMATAN SETU'),
(13, 'KEPALA SEKSI PEMERINTAHAN', 'KECAMATAN SETU'),
(14, 'PENGELOLA ADMINISTRASI PEMERINTAHAN', 'KECAMATAN SETU'),
(15, 'PENGELOLA KEKAYAAN DESA DAN ADMINISTRASI DESA', 'KECAMATAN SETU'),
(16, 'PENGELOLA KEAMANAN DAN KETERTIBAN', 'KECAMATAN SETU'),
(17, 'KEPALA SEKSI EKONOMI DAN PEMBANGUNAN', 'KECAMATAN SETU'),
(18, 'KEPALA SEKSI PEMBERDAYAAN MASYARAKAT DAN DESA', 'KECAMATAN SETU'),
(19, 'PENGELOLA PEMBERDAYAAN MASYARAKAT DAN KELEMBAGAAN', 'KECAMATAN SETU'),
(20, 'PENYUSUN RENCANA PENGUATAN KELEMBAGAAN MASYARAKAT', 'KECAMATAN SETU'),
(21, 'KEPALA SEKSI PELAYANAN PUBLIK', 'KECAMATAN SETU'),
(22, 'PENGOLAH DATA PELAYANAN', 'KECAMATAN SETU'),
(23, 'VERIFIKATOR', 'BKPSDM'),
(24, 'ADMIN UMUM DAN KEPEGAWAIAN', 'KECAMATAN SETU'),
(25, 'ADMIN KEUANGAN', 'KECAMATAN SETU');

-- --------------------------------------------------------

--
-- Table structure for table `tb_pegawai`
--

CREATE TABLE `tb_pegawai` (
  `id_pegawai` int(11) NOT NULL,
  `user_id` varchar(255) DEFAULT NULL,
  `nip_pegawai` varchar(255) DEFAULT NULL,
  `nama` varchar(50) DEFAULT '',
  `id_jabatan` int(11) DEFAULT NULL,
  `level` int(11) DEFAULT NULL,
  `password` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tb_pegawai`
--

INSERT INTO `tb_pegawai` (`id_pegawai`, `user_id`, `nip_pegawai`, `nama`, `id_jabatan`, `level`, `password`) VALUES
(2, 'jdwijatmoko', '19721112 199302 1 001', 'Drs. JOKO DWOJATMOKO, M.Si', 1, NULL, 'd41d8cd98f00b204e9800998ecf8427e'),
(3, NULL, NULL, 'MUHAMMAD ALI AMRAN, S.Si, M.Si', 2, NULL, NULL),
(4, NULL, NULL, 'FAISAL RAHMAN, ST, MM', 3, NULL, NULL),
(5, NULL, NULL, 'ACE HERYANTO, S.IP', 4, NULL, NULL),
(6, NULL, NULL, 'IRVAN SOMANTHA. S.Sos', 5, NULL, NULL),
(7, NULL, NULL, 'IIN INAYAH, S.AP', 6, NULL, NULL),
(8, 'csagung', '19760716 200801 1 021\r\n', 'CECEP SUMITA AGUNG, SE', 7, 4, '82c5a8bf67d3b913eeac3016ac7e6a90'),
(9, NULL, NULL, 'MISAR AR', 8, NULL, NULL),
(10, NULL, NULL, 'SANDI KARTAWIJAYA', 8, NULL, NULL),
(11, NULL, NULL, 'DIAH SAVITRI, ST, MM', 9, NULL, NULL),
(12, NULL, NULL, 'SUHANTA', 10, NULL, NULL),
(13, NULL, NULL, 'DUDI ROHMAN ROHMAT', 11, NULL, NULL),
(14, NULL, NULL, 'MULYADI ', 12, NULL, NULL),
(15, NULL, NULL, 'KUSNADI, S.AP, M.Si', 13, NULL, NULL),
(16, NULL, NULL, 'ANITA KARTINIYANTI, SE, M.Si', 14, NULL, NULL),
(17, NULL, NULL, 'NABAN BININ SAEN, S.IP', 14, NULL, NULL),
(18, NULL, NULL, 'AHMAD REPA\'I, S.IP', 15, NULL, NULL),
(19, NULL, NULL, 'RASMAN', 16, NULL, NULL),
(20, NULL, NULL, 'HENDRA HERMANTO', 16, NULL, NULL),
(21, NULL, NULL, 'RONY RAMDHONY, SE', 16, NULL, NULL),
(22, NULL, NULL, 'EKO JANUARTO, ST', 17, NULL, NULL),
(23, NULL, NULL, 'Dra.ERNIATI', 18, NULL, NULL),
(24, NULL, NULL, 'YULFIDA, S.AP', 19, NULL, NULL),
(25, NULL, NULL, 'IRVAN HERMAWAN, A.Md', 19, NULL, NULL),
(26, NULL, NULL, 'NURUL IMAN, SE', 20, NULL, NULL),
(27, NULL, NULL, 'YAYA SUTARYA, S.AP', 21, NULL, NULL),
(28, NULL, NULL, 'TIUR MAIDA, SE', 22, NULL, NULL),
(29, NULL, '19710604 200801 1 002\r\n', 'ALI SADIKIN, S.Pd.I., M.Si\r\n', 23, NULL, NULL),
(30, 'esabilla', NULL, 'ELLA SABILLA', 24, 1, '82c5a8bf67d3b913eeac3016ac7e6a90'),
(31, 'nkhairunnisa', NULL, 'NISRINA KHAIRUNNISA', 25, 2, '82c5a8bf67d3b913eeac3016ac7e6a90'),
(36, 'nzainpradana', '123', 'Nur Zain', NULL, NULL, NULL),
(37, 'nzainpradana', '123', 'Nur Zain', NULL, NULL, NULL),
(38, 'nzainpradana', '123', 'Nur Zain Pradana', NULL, NULL, NULL),
(39, 'nzainpradana', '123', 'Nur Zain', 1, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `tb_periode`
--

CREATE TABLE `tb_periode` (
  `id_periode` int(30) NOT NULL,
  `tahun` int(10) DEFAULT NULL,
  `bulan` varchar(15) DEFAULT NULL,
  `jumlah_hari_kerja` int(2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tb_rekapitulasi_presensi`
--

CREATE TABLE `tb_rekapitulasi_presensi` (
  `id_rekapitulasi_presensi` int(30) NOT NULL,
  `periode` varchar(7) DEFAULT '',
  `id_pegawai` int(30) DEFAULT NULL,
  `jumlah_hari_kerja` int(10) DEFAULT NULL,
  `jumlah_tidak_hadir` int(2) DEFAULT NULL,
  `jumlah_dl_pc` int(10) DEFAULT NULL,
  `jumlah_tidak_hadir_rapat` int(10) DEFAULT NULL,
  `total_pengurangan_tpp` int(10) DEFAULT NULL,
  `nilai_disiplin_kerja` int(5) DEFAULT NULL,
  `id_approval` int(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tb_rekapitulasi_presensi`
--

INSERT INTO `tb_rekapitulasi_presensi` (`id_rekapitulasi_presensi`, `periode`, `id_pegawai`, `jumlah_hari_kerja`, `jumlah_tidak_hadir`, `jumlah_dl_pc`, `jumlah_tidak_hadir_rapat`, `total_pengurangan_tpp`, `nilai_disiplin_kerja`, `id_approval`) VALUES
(1, '2022-09', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(2, '2022-09', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(3, '2022-09', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(4, '2022-09', NULL, 22, 0, NULL, 0, 0, 100, NULL),
(5, '2022-09', NULL, 22, 0, NULL, 0, 0, 100, NULL),
(6, '2022-09', 5, 22, 0, NULL, 0, 0, 100, NULL),
(8, '2022-10', 18, 22, 2, 10, 3, 600000, 70, NULL),
(9, '2022-10', 2, 22, 0, 0, 0, 0, 100, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `tb_tpp`
--

CREATE TABLE `tb_tpp` (
  `id_tpp` int(30) NOT NULL,
  `periode` varchar(7) DEFAULT '',
  `id_pegawai` int(30) DEFAULT NULL,
  `tpp_beban_kerja` int(20) DEFAULT 0,
  `tpp_prestasi_kerja` int(20) DEFAULT 0,
  `tpp_kondisi_kerja` int(20) DEFAULT 0,
  `tpp_kelangkaan_profesi` int(20) DEFAULT 0,
  `total_tpp` int(20) DEFAULT 0,
  `nilai_disiplin_kerja` int(5) DEFAULT 0,
  `nilai_produktivitas_kerja` int(5) DEFAULT 0,
  `dis_kerja_beban_kerja` int(11) NOT NULL DEFAULT 0,
  `dis_kerja_prestasi_kerja` int(11) NOT NULL DEFAULT 0,
  `dis_kerja_kondisi_kerja` int(11) NOT NULL DEFAULT 0,
  `dis_kerja_kelangkaan_profesi` int(11) NOT NULL DEFAULT 0,
  `dis_kerja_diterima` int(11) NOT NULL DEFAULT 0,
  `prod_kerja_beban_kerja` int(11) NOT NULL DEFAULT 0,
  `prod_kerja_prestasi_kerja` int(11) NOT NULL DEFAULT 0,
  `prod_kerja_kondisi_kerja` int(11) NOT NULL DEFAULT 0,
  `prod_kerja_kelangkaan_profesi` int(11) NOT NULL DEFAULT 0,
  `prod_kerja_diterima` int(11) NOT NULL DEFAULT 0,
  `tambahan_tpp` int(20) DEFAULT 0,
  `pengurangan_tpp` int(11) DEFAULT 0,
  `jumlah_tpp_diterima` int(11) DEFAULT 0,
  `id_approval` int(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tb_tpp`
--

INSERT INTO `tb_tpp` (`id_tpp`, `periode`, `id_pegawai`, `tpp_beban_kerja`, `tpp_prestasi_kerja`, `tpp_kondisi_kerja`, `tpp_kelangkaan_profesi`, `total_tpp`, `nilai_disiplin_kerja`, `nilai_produktivitas_kerja`, `dis_kerja_beban_kerja`, `dis_kerja_prestasi_kerja`, `dis_kerja_kondisi_kerja`, `dis_kerja_kelangkaan_profesi`, `dis_kerja_diterima`, `prod_kerja_beban_kerja`, `prod_kerja_prestasi_kerja`, `prod_kerja_kondisi_kerja`, `prod_kerja_kelangkaan_profesi`, `prod_kerja_diterima`, `tambahan_tpp`, `pengurangan_tpp`, `jumlah_tpp_diterima`, `id_approval`) VALUES
(1, '2022-10', 2, 11340000, 14580000, 6480000, 0, 32400000, 100, 100, 4536000, 5832000, 2592000, 0, 12960000, 6804000, 8748000, 3888000, 0, 19440000, 0, 0, 64800000, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `user_log`
--

CREATE TABLE `user_log` (
  `id` int(11) NOT NULL,
  `datetime` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  `module` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tb_approval`
--
ALTER TABLE `tb_approval`
  ADD PRIMARY KEY (`id_approval`);

--
-- Indexes for table `tb_besaran_tpp`
--
ALTER TABLE `tb_besaran_tpp`
  ADD PRIMARY KEY (`id_besaran_tpp`);

--
-- Indexes for table `tb_capaian_kerja`
--
ALTER TABLE `tb_capaian_kerja`
  ADD PRIMARY KEY (`id_capaian_kinerja`);

--
-- Indexes for table `tb_jabatan`
--
ALTER TABLE `tb_jabatan`
  ADD PRIMARY KEY (`id_jabatan`);

--
-- Indexes for table `tb_pegawai`
--
ALTER TABLE `tb_pegawai`
  ADD PRIMARY KEY (`id_pegawai`);

--
-- Indexes for table `tb_periode`
--
ALTER TABLE `tb_periode`
  ADD PRIMARY KEY (`id_periode`);

--
-- Indexes for table `tb_rekapitulasi_presensi`
--
ALTER TABLE `tb_rekapitulasi_presensi`
  ADD PRIMARY KEY (`id_rekapitulasi_presensi`);

--
-- Indexes for table `tb_tpp`
--
ALTER TABLE `tb_tpp`
  ADD PRIMARY KEY (`id_tpp`);

--
-- Indexes for table `user_log`
--
ALTER TABLE `user_log`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tb_approval`
--
ALTER TABLE `tb_approval`
  MODIFY `id_approval` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `tb_besaran_tpp`
--
ALTER TABLE `tb_besaran_tpp`
  MODIFY `id_besaran_tpp` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `tb_capaian_kerja`
--
ALTER TABLE `tb_capaian_kerja`
  MODIFY `id_capaian_kinerja` int(30) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `tb_jabatan`
--
ALTER TABLE `tb_jabatan`
  MODIFY `id_jabatan` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `tb_pegawai`
--
ALTER TABLE `tb_pegawai`
  MODIFY `id_pegawai` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT for table `tb_periode`
--
ALTER TABLE `tb_periode`
  MODIFY `id_periode` int(30) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tb_rekapitulasi_presensi`
--
ALTER TABLE `tb_rekapitulasi_presensi`
  MODIFY `id_rekapitulasi_presensi` int(30) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `tb_tpp`
--
ALTER TABLE `tb_tpp`
  MODIFY `id_tpp` int(30) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `user_log`
--
ALTER TABLE `user_log`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
