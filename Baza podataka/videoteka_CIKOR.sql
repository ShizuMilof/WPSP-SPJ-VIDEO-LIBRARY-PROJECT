-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: database:3306
-- Generation Time: Jul 14, 2023 at 02:39 PM
-- Server version: 8.0.33
-- PHP Version: 8.1.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `videoteka`
--

-- --------------------------------------------------------

--
-- Table structure for table `filmovi`
--

CREATE TABLE `filmovi` (
  `film_id` int NOT NULL,
  `film_sifra` char(9) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `naziv` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `opis` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` tinyint NOT NULL,
  `godina_izlaska` year NOT NULL,
  `trajanje` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `poster` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `zanr` varchar(12) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `kolicina` varchar(3) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `statistika` int DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `filmovi`
--

INSERT INTO `filmovi` (`film_id`, `film_sifra`, `naziv`, `opis`, `status`, `godina_izlaska`, `trajanje`, `poster`, `zanr`, `kolicina`, `statistika`) VALUES
(1, '', 'Fast IX', 'Film about cars', 1, '2023', '1', 'https://m.media-amazon.com/images/M/MV5BNzZmOTU1ZTEtYzVhNi00NzQxLWI5ZjAtNWNhNjEwY2E3YmZjXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_FMjpg_UX1000_.jpg', 'Drama', '11', 70),
(2, '', 'Murder Mys', 'Man fight bee', 1, '2001', '2', 'https://xdn.tf.rs/2020/07/23/1595493066378-misterija-ubistva-film-prevod.jpg', 'Akcija', '11', 50),
(4, '', 'Broe', 'Bro', 1, '2023', '4', 'https://www.laptop.hr/images/srpanj21/akcijskintflxFB.jpg', 'Akcija', '11', 25),
(5, '', 'Grandpa', 'Grandpa ', 1, '2001', '4', 'https://grabancijas.com/wp-content/uploads/2022/11/savage-salvation-poster-otvorna-400x340.webp', 'Drama', '13', 14),
(6, '', 'Man vs Bee', 'Birds fly', 1, '2023', '1', 'https://m.media-amazon.com/images/M/MV5BMGExOWU4YmItMjkxOC00NjdjLTk2ZWEtZGViMGM1ZGFhZmQxXkEyXkFqcGdeQXVyODQyOTY2OTA@._V1_FMjpg_UX1000_.jpg', 'Komedija', '16', 7),
(7, '', 'Hunter', 'Birds fly', 1, '2023', '1', 'https://www.muzika.hr/wp-content/uploads/2023/01/Havoc-2.jpg', 'Horor', '16', 8),
(100, '', 'Home Alone 2', 'Home Alone 2', 1, '2001', '3', 'https://wannabemagazine.com/wp-content/uploads/2011/12/Slika26.jpg', 'Komedija', '13', 28),
(101, '', 'Shining', 'AUTI 2', 1, '2023', '4', 'https://www.jurjevic.com.hr/5652/img_Blistava-plakat-filma-grafike-i-grafika-na-platnu-bez-1/imgs.jpg', 'Akcija', '14', 14),
(102, '', 'Wednesday', 'TRE', 1, '2023', '6', 'https://static.posters.cz/image/750/posteri/wednesday-downpour-i154094.jpg', 'Komedija', '30', 3),
(103, '', 'Joker', 'Joker', 1, '2001', '2.5', 'https://www.lamia.com.hr/storage/5_126639_Joker-poster-art-platna-klasi%C4%8Dnih-plakata-filmova_pic.jpg', 'Komedija', '23', 2),
(106, '', 'RETER', 'TE', 1, '2001', '1', 'https://m.media-amazon.com/images/M/MV5BMGExOWU4YmItMjkxOC00NjdjLTk2ZWEtZGViMGM1ZGFhZmQxXkEyXkFqcGdeQXVyODQyOTY2OTA@._V1_FMjpg_UX1000_.jpg', 'Komedija', '39', 1);

-- --------------------------------------------------------

--
-- Table structure for table `gledatelji`
--

CREATE TABLE `gledatelji` (
  `oib` char(11) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `ime` varchar(14) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `prezime` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `spol` enum('M','Ž') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `datum_rod` date NOT NULL,
  `statistika` int DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `gledatelji`
--

INSERT INTO `gledatelji` (`oib`, `ime`, `prezime`, `spol`, `datum_rod`, `statistika`) VALUES
('1', 'Martin', 'Čikor', 'M', '2001-06-01', 4),
('10', 'Dino', 'Marić', 'M', '2023-05-24', 3),
('11', 'Martin', 'Marić', 'M', '2023-07-12', 0),
('12', 'Mirko', 'Marković', 'M', '2023-06-21', 9),
('13', 'Ivana', 'Sertić', 'Ž', '2023-07-04', 12),
('14', 'Iva', 'Župan', 'Ž', '2023-07-27', 4),
('2', 'Ivana', 'Knol', 'Ž', '2023-07-10', 5),
('3', 'Žan', 'Kiš', 'M', '2023-07-12', 3),
('4', 'Ivan', 'Benke', 'M', '2022-04-06', 14),
('5', 'Ante', 'Antunović', 'M', '2023-07-27', 15),
('6', 'Jan', 'Čuhnil', 'M', '2023-07-05', 3),
('7', 'Meri', 'Furdić', 'Ž', '2023-07-04', 4),
('8', 'Alen', 'Grafina', 'M', '2023-05-24', 2),
('9', 'Boro', 'Majdan', 'M', '2023-07-05', 0);

-- --------------------------------------------------------

--
-- Table structure for table `tagovi`
--

CREATE TABLE `tagovi` (
  `film_id` int NOT NULL,
  `zanr_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `zanrovi`
--

CREATE TABLE `zanrovi` (
  `zanr_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `zapisi`
--

CREATE TABLE `zapisi` (
  `zapis_id` int NOT NULL,
  `film_id` int NOT NULL,
  `gledatelj_id` char(11) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `vrijeme_izdavanja` datetime DEFAULT NULL,
  `vrijeme_povratka` datetime DEFAULT NULL,
  `akcija` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `zapisi`
--

INSERT INTO `zapisi` (`zapis_id`, `film_id`, `gledatelj_id`, `vrijeme_izdavanja`, `vrijeme_povratka`, `akcija`) VALUES
(459, 1, '5', '2023-07-12 21:51:26', '2023-07-13 22:21:36', 'Povrat'),
(460, 2, '5', '2023-07-12 21:51:28', '2023-07-13 22:21:40', 'Povrat'),
(461, 5, '5', '2023-07-12 21:51:30', '2023-07-13 22:21:59', 'Povrat'),
(462, 6, '5', '2023-07-12 21:51:34', '2023-07-13 22:22:00', 'Povrat'),
(463, 2, '4', '2023-07-12 21:51:40', '2023-07-13 22:22:35', 'Povrat'),
(464, 6, '4', '2023-07-12 21:51:44', '2023-07-13 22:22:36', 'Povrat'),
(465, 7, '1', '2023-07-12 21:51:49', NULL, 'Izdavanje'),
(466, 100, '1', '2023-07-12 21:51:52', NULL, 'Izdavanje'),
(467, 1, '5', '2023-07-12 22:25:33', '2023-07-13 22:21:36', 'Povrat'),
(468, 2, '6', '2023-07-13 21:00:53', NULL, 'Izdavanje'),
(469, 6, '6', '2023-07-13 21:00:56', NULL, 'Izdavanje'),
(470, 7, '6', '2023-07-13 21:00:59', NULL, 'Izdavanje'),
(471, 6, '7', '2023-07-13 21:01:04', NULL, 'Izdavanje'),
(472, 100, '7', '2023-07-13 21:01:08', NULL, 'Izdavanje'),
(473, 1, '7', '2023-07-13 21:01:10', NULL, 'Izdavanje'),
(474, 102, '7', '2023-07-13 21:01:13', NULL, 'Izdavanje'),
(475, 2, '8', '2023-07-13 21:01:19', NULL, 'Izdavanje'),
(476, 7, '8', '2023-07-13 21:01:22', NULL, 'Izdavanje'),
(477, 5, '3', '2023-07-13 21:01:27', NULL, 'Izdavanje'),
(478, 7, '3', '2023-07-13 21:01:29', NULL, 'Izdavanje'),
(479, 100, '3', '2023-07-13 21:01:32', NULL, 'Izdavanje'),
(480, 4, '10', '2023-07-13 21:01:37', NULL, 'Izdavanje'),
(481, 2, '10', '2023-07-13 21:01:42', NULL, 'Izdavanje'),
(482, 100, '10', '2023-07-13 21:01:45', NULL, 'Izdavanje'),
(483, 1, '14', '2023-07-13 21:01:53', NULL, 'Izdavanje'),
(484, 4, '14', '2023-07-13 21:01:57', NULL, 'Izdavanje'),
(485, 100, '14', '2023-07-13 21:02:00', NULL, 'Izdavanje'),
(486, 103, '14', '2023-07-13 21:02:02', NULL, 'Izdavanje'),
(487, 2, '13', '2023-07-13 21:02:08', '2023-07-14 08:16:50', 'Povrat'),
(488, 7, '13', '2023-07-13 21:02:10', NULL, 'Izdavanje'),
(489, 2, '12', '2023-07-13 21:02:16', NULL, 'Izdavanje'),
(490, 100, '12', '2023-07-13 21:02:18', NULL, 'Izdavanje'),
(491, 6, '12', '2023-07-13 21:02:22', NULL, 'Izdavanje'),
(492, 1, '13', '2023-07-13 21:37:31', NULL, 'Izdavanje'),
(493, 1, '5', '2023-07-13 22:22:04', NULL, 'Izdavanje'),
(494, 4, '5', '2023-07-13 22:22:06', '2023-07-13 22:22:13', 'Povrat'),
(495, 4, '5', '2023-07-13 22:22:09', '2023-07-13 22:22:13', 'Povrat'),
(496, 2, '5', '2023-07-13 22:22:12', NULL, 'Izdavanje'),
(497, 4, '5', '2023-07-13 22:22:16', NULL, 'Izdavanje'),
(498, 5, '5', '2023-07-13 22:22:20', NULL, 'Izdavanje'),
(499, 6, '5', '2023-07-13 22:22:22', NULL, 'Izdavanje'),
(500, 7, '5', '2023-07-13 22:22:25', NULL, 'Izdavanje'),
(501, 100, '5', '2023-07-13 22:22:28', NULL, 'Izdavanje'),
(502, 1, '4', '2023-07-13 22:22:39', NULL, 'Izdavanje'),
(503, 2, '4', '2023-07-13 22:22:41', NULL, 'Izdavanje'),
(504, 4, '4', '2023-07-13 22:22:44', NULL, 'Izdavanje'),
(505, 5, '4', '2023-07-13 22:22:48', NULL, 'Izdavanje'),
(506, 7, '4', '2023-07-13 22:22:50', NULL, 'Izdavanje'),
(507, 102, '4', '2023-07-13 22:22:54', NULL, 'Izdavanje');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `filmovi`
--
ALTER TABLE `filmovi`
  ADD PRIMARY KEY (`film_id`);

--
-- Indexes for table `gledatelji`
--
ALTER TABLE `gledatelji`
  ADD PRIMARY KEY (`oib`);

--
-- Indexes for table `tagovi`
--
ALTER TABLE `tagovi`
  ADD KEY `fk2_tagovi_zanr_id_idx` (`zanr_id`),
  ADD KEY `fk2_tagovi_film_id_idx` (`film_id`);

--
-- Indexes for table `zanrovi`
--
ALTER TABLE `zanrovi`
  ADD PRIMARY KEY (`zanr_id`);

--
-- Indexes for table `zapisi`
--
ALTER TABLE `zapisi`
  ADD PRIMARY KEY (`zapis_id`),
  ADD KEY `fk2_zapisi_gledatelj_id_idx` (`gledatelj_id`),
  ADD KEY `fk1_zapisi_film_id_idx` (`film_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `filmovi`
--
ALTER TABLE `filmovi`
  MODIFY `film_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=108;

--
-- AUTO_INCREMENT for table `zapisi`
--
ALTER TABLE `zapisi`
  MODIFY `zapis_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=508;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tagovi`
--
ALTER TABLE `tagovi`
  ADD CONSTRAINT `fk2_tagovi_film_id` FOREIGN KEY (`film_id`) REFERENCES `filmovi` (`film_id`),
  ADD CONSTRAINT `fk2_tagovi_zanr_id` FOREIGN KEY (`zanr_id`) REFERENCES `zanrovi` (`zanr_id`);

--
-- Constraints for table `zapisi`
--
ALTER TABLE `zapisi`
  ADD CONSTRAINT `fk1_zapisi_film_id` FOREIGN KEY (`film_id`) REFERENCES `filmovi` (`film_id`),
  ADD CONSTRAINT `fk2_zapisi_gledatelj_id` FOREIGN KEY (`gledatelj_id`) REFERENCES `gledatelji` (`oib`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
