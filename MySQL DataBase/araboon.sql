-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 28, 2025 at 01:59 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `araboon`
--

-- --------------------------------------------------------

--
-- Table structure for table `manga`
--

CREATE TABLE `manga` (
  `chapter` int(11) NOT NULL,
  `manga_name` varchar(255) NOT NULL,
  `chapter_file` varchar(255) DEFAULT NULL,
  `rate` decimal(3,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `manga`
--

INSERT INTO `manga` (`chapter`, `manga_name`, `chapter_file`, `rate`) VALUES
(1, 'Disaster Class Necromancer', '6769a86b36ef1.pdf', 8.90),
(1, 'Solo Leveling', '6769a1a5c7d40.pdf', 8.50),
(1, 'Solo Leveling: Ragnarok', '6769a50b23113.pdf', 8.30),
(1, 'Swordmaster’S Youngest Son', '6769a40291e10.pdf', 8.70),
(1, 'The Beginning After the End', '6769a2f3486ea.pdf', 8.60),
(1, 'The Game That I Came From', '6769a6043025a.pdf', 8.20),
(2, 'Solo Leveling', '6769a1afb2a0a.pdf', 8.60),
(2, 'Swordmaster’S Youngest Son', '6769a409b2ed3.pdf', 8.80),
(2, 'The Beginning After the End', '6769a2fbea599.pdf', 8.70),
(2, 'The Game That I Came From', '6769a60ad1f4c.pdf', 8.30),
(3, 'Solo Leveling', '6769a1b83313d.pdf', 8.70),
(3, 'Swordmaster’S Youngest Son', '6769a41112ccb.pdf', 8.90),
(3, 'The Beginning After the End', '6769a306372b3.pdf', 8.70),
(3, 'The Game That I Came From', '6769a610c290e.pdf', 8.50),
(4, 'Solo Leveling', '6769a1c2b8d54.pdf', 9.60),
(4, 'Swordmaster’S Youngest Son', '6769a418215a9.pdf', 9.00),
(4, 'The Beginning After the End', '6769a30ec32e2.pdf', 8.80),
(5, 'Swordmaster’S Youngest Son', '6769a41f88c69.pdf', 9.10),
(5, 'The Beginning After the End', '6769a31904059.pdf', 9.00),
(6, 'Swordmaster’S Youngest Son', '6769a426a5066.pdf', 9.20);

-- --------------------------------------------------------

--
-- Table structure for table `userinfo`
--

CREATE TABLE `userinfo` (
  `username` varchar(50) NOT NULL,
  `views` int(11) DEFAULT 0,
  `notifications` int(11) DEFAULT 0,
  `favorites` int(11) DEFAULT 0,
  `later` int(11) DEFAULT 0,
  `reading` int(11) DEFAULT 0,
  `readed` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `userinfo`
--

INSERT INTO `userinfo` (`username`, `views`, `notifications`, `favorites`, `later`, `reading`, `readed`) VALUES
('abood', 0, 0, 0, 0, 0, 0),
('aws', 0, 0, 0, 0, 0, 0),
('bara', 0, 0, 0, 0, 0, 0),
('darxx03eh', 0, 0, 0, 0, 0, 0),
('hamza', 0, 0, 0, 0, 0, 0),
('mohammed', 0, 0, 0, 0, 0, 0),
('mustafa', 0, 0, 0, 0, 0, 0),
('omar', 0, 0, 0, 0, 0, 0),
('thamer', 0, 0, 0, 0, 0, 0),
('yazan', 0, 0, 0, 0, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `role` enum('admin','member') DEFAULT 'member'
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`username`, `email`, `password`, `image`, `role`) VALUES
('abood', 'abood@gmail.com', '$2y$10$kjXjsULG2ZNEVxvzDtyInOVqgcvHxPJu7wQbn1ufo9w8eKiULDTO2', '6770e2f13cefb.jpg', 'admin'),
('aws', 'aws@outlook.com', '$2y$10$x/PHJy2TSR07hupd.HmcmeFFfxU1fSDodGqBOFRReipEve4Fe2rx2', '6769addeef045.jpg', 'member'),
('bara', 'bara@yahoo.com', '$2y$10$ls97cOZEYUAylAaqcwhr.ulDdgsOLqT1EeE7JWNG9pitMaXgiQfEy', '6769adc029c40.jpg', 'member'),
('darxx03eh', 'darxx03eh@mail.ru', '$2y$10$BbZU0PYr6JpXPTlfEF.MouzUeqpEeiyZHVTiwOhFOhTkeEDA.s1fe', '6766ed7302b95.jpg', 'admin'),
('hamza', 'hamza@gmail.com', '$2y$10$Li5kyuRwtebJmpex90qiO.ouuyx9KQuN0qT7MU1CGLNr483KHq1Na', '6769adea2e2fa.jpg', 'member'),
('mohammed', 'mohammed@gmail.com', '$2y$10$0lx11Vl1QQ0fsUNaqWW3Fe3dhIAw1Wj9YiARRlBOtkq4yluKFaN/G', '6770ebcea3e4b.jpg', 'member'),
('mustafa', 'mustafa@hotmail.com', '$2y$10$QAkO1V8b7hL/EpYw2T8sMOlLCN4wXFrZ/V2UfY2DP10pWnEKWKXgW', '6769adb446f21.jpg', 'member'),
('omar', 'omar@gmail.com', '$2y$10$7ST44zf7UEtAT3g.TXbnyezpQ.vzLYifQBk.0RGjyAfRt0tAi3rqq', '6766f02a11279.jpg', 'member'),
('thamer', 'thamer@gmail.com', '$2y$10$DarSWuvKS0WkGl0JgwbWDOu22xe9h1AA4WmqdhhqezDP3UISHydSy', '6769ada031883.jpg', 'member'),
('yazan', 'yazan@yahoo.com', '$2y$10$8cKH.1eM/0Cd2B.OytCyX.kaWLrWVJrVMwO20lej4RRzpoTIb6PLC', '6769add16ff9f.jpg', 'member');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `manga`
--
ALTER TABLE `manga`
  ADD PRIMARY KEY (`chapter`,`manga_name`);

--
-- Indexes for table `userinfo`
--
ALTER TABLE `userinfo`
  ADD PRIMARY KEY (`username`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `userinfo`
--
ALTER TABLE `userinfo`
  ADD CONSTRAINT `userinfo_ibfk_1` FOREIGN KEY (`username`) REFERENCES `users` (`username`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
