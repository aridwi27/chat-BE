-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 16, 2021 at 04:14 AM
-- Server version: 10.4.17-MariaDB
-- PHP Version: 8.0.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `chat`
--

-- --------------------------------------------------------

--
-- Table structure for table `chat`
--

CREATE TABLE `chat` (
  `id` int(11) NOT NULL,
  `from_id` varchar(255) NOT NULL,
  `to_id` varchar(255) NOT NULL,
  `message` varchar(255) NOT NULL,
  `date` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `chat`
--

INSERT INTO `chat` (`id`, `from_id`, `to_id`, `message`, `date`) VALUES
(1, '12', '13', 'uy', '2021-03-14 15:04:56'),
(2, '12', '13', 'kenapa bro', '2021-03-14 15:05:06'),
(3, '12', '13', 'asdasdaqweeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeasdasdaqweeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeasdasdaqweeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeasdasdaqweeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee', '2021-03-14 15:10:02'),
(4, '13', '12', 'yy', '2021-03-14 15:22:33'),
(5, '13', '12', 'asdasd', '2021-03-14 15:22:35'),
(6, '13', '12', 'asdad', '2021-03-14 15:23:51'),
(7, '13', '12', 'sda', '2021-03-14 15:23:54'),
(8, '12', '13', 'sdsf', '2021-03-14 15:24:08'),
(9, '12', '13', 'sdfsdf', '2021-03-14 15:24:10'),
(10, '12', '13', 'asdasd', '2021-03-14 15:24:31'),
(11, '12', '13', 'asdasdasdasd', '2021-03-14 15:25:06'),
(12, '12', '13', 'too', '2021-03-14 15:26:03'),
(13, '12', '13', 'asdasd', '2021-03-14 15:26:12'),
(14, '12', '13', 'asd', '2021-03-14 15:32:50'),
(15, '12', '13', 'uy', '2021-03-14 15:34:04'),
(16, '12', '13', 'sdf', '2021-03-14 15:34:06'),
(17, '13', '12', 'ou', '2021-03-14 15:34:22'),
(18, '13', '12', 'asd', '2021-03-14 15:34:23'),
(19, '12', '13', 'uy', '2021-03-14 15:36:15'),
(20, '12', '13', 'tes', '2021-03-14 16:17:37'),
(21, '13', '12', 'oyy', '2021-03-14 16:17:50'),
(22, '12', '14', 'uy', '2021-03-14 22:22:55'),
(23, '12', '15', 'uy', '2021-03-14 22:40:19'),
(24, '12', '14', 'oy', '2021-03-14 23:07:34'),
(25, '12', '13', 'yoo', '2021-03-15 03:45:40');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `room_id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `lat` varchar(255) DEFAULT NULL,
  `lng` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `room_id`, `name`, `username`, `email`, `password`, `phone`, `image`, `lat`, `lng`) VALUES
(12, '17596', 'sumail', 'aridwi', 'admin@chat.com', '$2b$10$AL9ypE1pV53WxKszCd5iju4ml7XOX/a4Zu/c2oYleQ8UvUYe69oEK', '0878997919758', '1615750842842.jpg', '1.760595', '103.861682'),
(13, '16296', 'gledish', 'gld27', 'users@chat.com', '$2b$10$0Z4TNIG5dDKBFd6lMtZT2.h3sDFRzI9zhd9vYlwewtNA/coVA/TFO', '087899719758', '1613950545996.jpg', '-6.288874635165933', '106.59805984950626'),
(14, '11710', 'sukma', 'sukma', 'sukma@chat.com', '$2b$10$BU9ay17LzqeDm6HPOT0Xr.m7X50vrukeAi/q4LC6YtsWB7.wEU.BO', '08126316236', NULL, NULL, NULL),
(15, '17000', 'jeki', 'jeki', 'jeki@chat.com', '$2b$10$aPciR7gENIW.rN.XXyZCTuBOH.h2ebJpGcUzWvjOPKmzq2PycWSrS', '', NULL, NULL, NULL),
(16, '17323', 'blacky', 'blacky', 'blacky@chat.com', '$2b$10$4GcLEoPQSkUIB6Q5uB1b0uyAW8.P.2NTTDSjSnGPrXTVQqH5sOHVq', '', NULL, NULL, NULL),
(17, '13988', 'rtz', 'rtz', 'rtz@gmail.com', '$2b$10$inRBqVNDO5oAhX2v5fUS5OCBoR01RkTvbUF107hmgIcXvdY8Y4WRy', '', '1613963980826.jpg', '-5.133848477459154', '119.49891283812849'),
(18, '13304', 'ramlah', 'ramlah', 'ramlah@chat.com', '$2b$10$U5hv37Qwv8T/cQgUh3ElRufomWZtXXa8Nr1ezGCyDSFxH38wVmYuq', '', '1613966542912.jpg', '15.22445719417412', '100.51977685819647');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `chat`
--
ALTER TABLE `chat`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `chat`
--
ALTER TABLE `chat`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
