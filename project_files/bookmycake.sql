-- phpMyAdmin SQL Dump
-- version 4.8.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 18, 2025 at 01:27 PM
-- Server version: 10.1.34-MariaDB
-- PHP Version: 7.1.20

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bookmycake`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbl_categories`
--

CREATE TABLE `tbl_categories` (
  `id` int(11) NOT NULL,
  `category_name` varchar(255) NOT NULL,
  `category_image` text NOT NULL,
  `route` varchar(255) NOT NULL,
  `status` int(11) NOT NULL,
  `deleted` int(11) NOT NULL,
  `created_date` datetime NOT NULL,
  `updated_date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_categories`
--

INSERT INTO `tbl_categories` (`id`, `category_name`, `category_image`, `route`, `status`, `deleted`, `created_date`, `updated_date`) VALUES
(8, 'Category 2', 'categories/1736428735155.jpg', 'category-2', 1, 0, '2025-01-08 21:04:23', '2025-01-09 18:48:55'),
(9, 'Category 1', 'categories/1736428727852.jpg', 'category-1', 1, 0, '2025-01-08 21:10:57', '2025-01-09 18:48:47'),
(10, 'Category 3', 'categories/1736428714280.png', 'category-3', 1, 0, '2025-01-09 18:39:27', '2025-01-20 18:21:04'),
(11, 'Anniversary 5', 'categories/1738317926407.webp', 'anniversary-5', 1, 0, '2025-01-31 15:35:26', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_child_categories`
--

CREATE TABLE `tbl_child_categories` (
  `id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `sub_category_id` int(11) NOT NULL,
  `child_category_name` varchar(255) NOT NULL,
  `child_category_image` text NOT NULL,
  `route` varchar(255) NOT NULL,
  `status` int(11) NOT NULL,
  `deleted` int(11) NOT NULL,
  `created_date` datetime NOT NULL,
  `updated_date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_child_categories`
--

INSERT INTO `tbl_child_categories` (`id`, `category_id`, `sub_category_id`, `child_category_name`, `child_category_image`, `route`, `status`, `deleted`, `created_date`, `updated_date`) VALUES
(1, 9, 1, 'child category 1', 'categories/1737456093284.jpg', 'child-category-1', 1, 0, '2025-01-21 16:11:33', '0000-00-00 00:00:00'),
(2, 9, 5, 'child 1', 'categories/1738844661260.png', 'child-1', 1, 0, '2025-02-06 17:54:21', '2025-02-06 18:04:23');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_products`
--

CREATE TABLE `tbl_products` (
  `id` int(25) NOT NULL,
  `category_id` int(11) NOT NULL,
  `sub_category_id` int(11) NOT NULL,
  `product_name` varchar(255) NOT NULL,
  `route` varchar(255) NOT NULL,
  `product_image` text NOT NULL,
  `product_description` text,
  `ingredients` text,
  `nutritional_info` text,
  `shipping` text,
  `product_size` text NOT NULL COMMENT '[{"size": "1","weight": "kg", "price": "350"}]',
  `product_flavor` text NOT NULL COMMENT '[ "butterscotch"]',
  `is_size` varchar(15) NOT NULL,
  `is_flavor` varchar(15) NOT NULL,
  `stock` int(11) NOT NULL,
  `status` int(11) NOT NULL,
  `deleted` int(11) NOT NULL,
  `created_date` datetime NOT NULL,
  `updated_date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_products`
--

INSERT INTO `tbl_products` (`id`, `category_id`, `sub_category_id`, `product_name`, `route`, `product_image`, `product_description`, `ingredients`, `nutritional_info`, `shipping`, `product_size`, `product_flavor`, `is_size`, `is_flavor`, `stock`, `status`, `deleted`, `created_date`, `updated_date`) VALUES
(2, 0, 0, 'dfbsjhk', 'dfbsjhk', 'products/1739358535371.jpg', 'desc', '<p>ingre	</p>', '<p>nutri</p>', 'shippi', '[{\"kg\":\"0.5\",\"price\":\"500\"},{\"kg\":\"1\",\"price\":\"1000\"}]', '[\"Black forest\",\"Black forest 1\"]', '0', '0', 10, 1, 0, '2025-02-12 16:38:55', '0000-00-00 00:00:00'),
(4, 0, 0, 'sfdsdf', 'sfdsdf', 'products/1739358918536.jpg', 'sdfsd', '<p>sdfsd</p>', '<p>sdfsd</p>', 'dfgsdfgsd', '[{\"kg\":\"1\",\"price\":\"11\"}]', '[\"dfsdfs\"]', '0', '0', 232, 1, 0, '2025-02-12 16:45:18', '0000-00-00 00:00:00'),
(6, 0, 0, 'fghfht', 'fghfht', 'products/1739359222776.jpg', '', '', '', '', '[{\"kg\":\"1\",\"price\":\"111\"}]', '[\"cgdfgdf\"]', 'true', 'true', 12, 1, 0, '2025-02-12 16:50:23', '0000-00-00 00:00:00'),
(7, 9, 0, 'safsf', 'safsf', 'products/1739363716980.jpg', 'sdfsdf', '<p>sdfs</p>', '<p>sdf</p>', 'sdfsd', '[{\"kg\":\"1\",\"price\":\"11\"}]', '[\"dsfsdf\"]', 'true', 'true', 33, 1, 0, '2025-02-12 18:05:16', '2025-02-12 18:47:41'),
(11, 9, 1, 'p1', 'p1', 'products/1739364004644.jpg', 'sdfsdf', '<p>sdfs</p>', '<p>sdf</p>', 'sdfsd', '[{\"kg\":\"1\",\"price\":\"11\"}]', '[\"dsfsdf\"]', 'true', 'true', 33, 1, 0, '2025-02-12 18:10:04', '2025-02-12 18:48:43');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_sub_categories`
--

CREATE TABLE `tbl_sub_categories` (
  `id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `sub_category_name` varchar(255) NOT NULL,
  `sub_category_image` text NOT NULL,
  `route` varchar(255) NOT NULL,
  `status` int(11) NOT NULL,
  `isCategoryshow` int(11) NOT NULL,
  `deleted` int(11) NOT NULL,
  `created_date` datetime NOT NULL,
  `updated_date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_sub_categories`
--

INSERT INTO `tbl_sub_categories` (`id`, `category_id`, `sub_category_name`, `sub_category_image`, `route`, `status`, `isCategoryshow`, `deleted`, `created_date`, `updated_date`) VALUES
(1, 9, 'Sub Category 1', 'categories/1737454173445.jpg', 'sub-category-1', 1, 1, 0, '2025-01-21 15:25:22', '2025-01-21 15:39:33'),
(5, 9, 'Sub Category 2', 'categories/1737458999704.jpg', 'sub-category-2', 1, 0, 0, '2025-01-21 16:59:59', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_users`
--

CREATE TABLE `tbl_users` (
  `id` int(5) NOT NULL,
  `first_name` varchar(55) NOT NULL,
  `last_name` varchar(155) NOT NULL,
  `email` varchar(55) NOT NULL,
  `mobile_number` bigint(15) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` int(2) NOT NULL,
  `status` varchar(10) NOT NULL DEFAULT 'Active',
  `deleted` int(2) NOT NULL DEFAULT '0',
  `registered_date` datetime NOT NULL,
  `last_logged_in` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_users`
--

INSERT INTO `tbl_users` (`id`, `first_name`, `last_name`, `email`, `mobile_number`, `password`, `role`, `status`, `deleted`, `registered_date`, `last_logged_in`) VALUES
(1, 'Super Admin', 'Admin', 'superadmin@bmc.com', 0, '$2b$10$.ApTmewQQakf.UjDb5y0AuGjE7tcBYu.Kv2ZBUFPLSMYYDT7PdnT.', 1, 'Active', 0, '2024-12-22 18:30:00', '2024-12-22 21:50:09');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbl_categories`
--
ALTER TABLE `tbl_categories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `category_name` (`category_name`);

--
-- Indexes for table `tbl_child_categories`
--
ALTER TABLE `tbl_child_categories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `child_category_name` (`child_category_name`);

--
-- Indexes for table `tbl_products`
--
ALTER TABLE `tbl_products`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `product_name` (`product_name`);

--
-- Indexes for table `tbl_sub_categories`
--
ALTER TABLE `tbl_sub_categories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `sub_category_name` (`sub_category_name`);

--
-- Indexes for table `tbl_users`
--
ALTER TABLE `tbl_users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tbl_categories`
--
ALTER TABLE `tbl_categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `tbl_child_categories`
--
ALTER TABLE `tbl_child_categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `tbl_products`
--
ALTER TABLE `tbl_products`
  MODIFY `id` int(25) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `tbl_sub_categories`
--
ALTER TABLE `tbl_sub_categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `tbl_users`
--
ALTER TABLE `tbl_users`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
