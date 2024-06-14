-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 14, 2024 at 06:11 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.1.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `discussion_forum_app`
--

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `comment_id` int(11) NOT NULL,
  `post_id` int(11) NOT NULL,
  `sender_id` int(11) NOT NULL,
  `sender_name` varchar(25) NOT NULL,
  `comment_text` text NOT NULL,
  `upload_time` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`comment_id`, `post_id`, `sender_id`, `sender_name`, `comment_text`, `upload_time`) VALUES
(4, 12, 25, 'Divanda Firdaus', 'halo juga', '2024-06-12 17:14:34'),
(5, 13, 25, 'Divanda Firdaus', 'nguwaworrr', '2024-06-13 12:36:57');

-- --------------------------------------------------------

--
-- Table structure for table `communities`
--

CREATE TABLE `communities` (
  `community_id` int(11) NOT NULL,
  `community_name` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  `created_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `communities`
--

INSERT INTO `communities` (`community_id`, `community_name`, `description`, `created_at`) VALUES
(1, 'Web Dev', 'Kumpulan Para Sepuh Web Dev', '2024-06-13 14:35:48'),
(2, 'Android Developer', 'Menyala Abangkuhhh', '2024-06-13 16:41:43');

-- --------------------------------------------------------

--
-- Table structure for table `community_comments`
--

CREATE TABLE `community_comments` (
  `id` int(11) NOT NULL,
  `topic_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `user_name` varchar(50) NOT NULL,
  `comment_text` text NOT NULL,
  `created_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `community_comments`
--

INSERT INTO `community_comments` (`id`, `topic_id`, `user_id`, `user_name`, `comment_text`, `created_at`) VALUES
(1, 1, 25, 'Divanda Firdaus', 'a', '2024-06-14 22:19:10'),
(2, 1, 25, 'Divanda Firdaus', 'jbh', '2024-06-14 22:19:39'),
(3, 3, 25, 'Divanda Firdaus', 'gimana', '2024-06-14 22:31:04');

-- --------------------------------------------------------

--
-- Table structure for table `community_topics`
--

CREATE TABLE `community_topics` (
  `topic_id` int(11) NOT NULL,
  `community_id` int(11) NOT NULL,
  `sender_id` int(11) NOT NULL,
  `sender_name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `created_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `community_topics`
--

INSERT INTO `community_topics` (`topic_id`, `community_id`, `sender_id`, `sender_name`, `description`, `created_at`) VALUES
(1, 1, 25, 'Divanda Firdaus', 'k', '2024-06-14 20:48:22'),
(3, 1, 25, 'Divanda Firdaus', 'tolonggg', '2024-06-14 22:30:53'),
(6, 2, 26, 'Acong', 'yes', '2024-06-14 23:09:59'),
(7, 1, 25, 'Divanda Firdaus', 'test', '2024-06-14 23:10:37'),
(8, 2, 25, 'Divanda Firdaus', 'ok', '2024-06-14 23:11:01');

-- --------------------------------------------------------

--
-- Table structure for table `content`
--

CREATE TABLE `content` (
  `content_id` int(11) NOT NULL,
  `sender_id` int(11) NOT NULL,
  `sender_name` varchar(25) NOT NULL,
  `content_text` text NOT NULL,
  `category` varchar(25) NOT NULL,
  `upload_time` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `content`
--

INSERT INTO `content` (`content_id`, `sender_id`, `sender_name`, `content_text`, `category`, `upload_time`) VALUES
(7, 25, 'Divanda Firdaus', 'Masalah Login dan Register menggunakan Express Js', 'BE', '2024-06-10 21:42:27'),
(8, 25, 'Divanda Firdaus', 'Enaknya Makan Apa Hari Ini?', 'General', '2024-06-11 23:19:00'),
(9, 25, 'Divanda Firdaus', 'Halo saya Divanda Firdaus', 'General', '2024-06-11 23:44:08'),
(10, 25, 'Divanda Firdaus', 'Test Postingan', 'General', '2024-06-11 23:46:41'),
(11, 26, 'Acong', 'Halo saya acong', 'General', '2024-06-12 08:02:18'),
(12, 26, 'Acong', 'hallo', 'General', '2024-06-12 11:18:29'),
(13, 25, 'Divanda Firdaus', 'halo semua', 'General', '2024-06-12 12:20:46'),
(14, 25, 'Divanda Firdaus', 'jdhsakdsa', 'General', '2024-06-13 12:36:44');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL,
  `email` varchar(50) NOT NULL,
  `username` varchar(35) NOT NULL,
  `password` text NOT NULL,
  `created_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `email`, `username`, `password`, `created_at`) VALUES
(25, 'divandaf@gmail.com', 'Divanda Firdaus', '$2b$10$dT2/Sadnbya2cTY4J0k3buxWp73Z89gnuOi20NRzD/2YsNvbMjCya', '2024-06-10 21:37:31'),
(26, 'acong@gmail.com', 'Acong', '$2b$10$GoUC9wNSe2b4YYpWyTdrCeEEAEINwBt85xjLTLxx9oyiA3WSBBTIm', '2024-06-12 08:01:53');

-- --------------------------------------------------------

--
-- Table structure for table `usercommunities`
--

CREATE TABLE `usercommunities` (
  `user_id` int(11) NOT NULL,
  `community_id` int(11) NOT NULL,
  `joined_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `usercommunities`
--

INSERT INTO `usercommunities` (`user_id`, `community_id`, `joined_at`) VALUES
(25, 1, '2024-06-13 21:40:32'),
(25, 2, '2024-06-14 23:10:54'),
(26, 2, '2024-06-14 22:55:00');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`comment_id`),
  ADD KEY `user_comment` (`sender_id`),
  ADD KEY `content_to commend` (`post_id`);

--
-- Indexes for table `communities`
--
ALTER TABLE `communities`
  ADD PRIMARY KEY (`community_id`);

--
-- Indexes for table `community_comments`
--
ALTER TABLE `community_comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `topic_id` (`topic_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `community_topics`
--
ALTER TABLE `community_topics`
  ADD PRIMARY KEY (`topic_id`),
  ADD KEY `community_id` (`community_id`),
  ADD KEY `sender_id` (`sender_id`);

--
-- Indexes for table `content`
--
ALTER TABLE `content`
  ADD PRIMARY KEY (`content_id`),
  ADD KEY `user_to_content` (`sender_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`);

--
-- Indexes for table `usercommunities`
--
ALTER TABLE `usercommunities`
  ADD PRIMARY KEY (`user_id`,`community_id`),
  ADD KEY `community_id` (`community_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `comment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `communities`
--
ALTER TABLE `communities`
  MODIFY `community_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `community_comments`
--
ALTER TABLE `community_comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `community_topics`
--
ALTER TABLE `community_topics`
  MODIFY `topic_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `content`
--
ALTER TABLE `content`
  MODIFY `content_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `content_to commend` FOREIGN KEY (`post_id`) REFERENCES `content` (`content_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user_comment` FOREIGN KEY (`sender_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `community_comments`
--
ALTER TABLE `community_comments`
  ADD CONSTRAINT `community_comments_ibfk_1` FOREIGN KEY (`topic_id`) REFERENCES `community_topics` (`topic_id`),
  ADD CONSTRAINT `community_comments_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`);

--
-- Constraints for table `community_topics`
--
ALTER TABLE `community_topics`
  ADD CONSTRAINT `community_topics_ibfk_1` FOREIGN KEY (`community_id`) REFERENCES `communities` (`community_id`),
  ADD CONSTRAINT `community_topics_ibfk_2` FOREIGN KEY (`sender_id`) REFERENCES `user` (`user_id`);

--
-- Constraints for table `content`
--
ALTER TABLE `content`
  ADD CONSTRAINT `user_to_content` FOREIGN KEY (`sender_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE;

--
-- Constraints for table `usercommunities`
--
ALTER TABLE `usercommunities`
  ADD CONSTRAINT `usercommunities_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `usercommunities_ibfk_2` FOREIGN KEY (`community_id`) REFERENCES `communities` (`community_id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
