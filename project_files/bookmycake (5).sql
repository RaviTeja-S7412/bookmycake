-- phpMyAdmin SQL Dump
-- version 4.8.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 03, 2025 at 11:55 AM
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
-- Table structure for table `tbl_areas`
--

CREATE TABLE `tbl_areas` (
  `id` int(5) NOT NULL,
  `city_id` varchar(225) NOT NULL,
  `area_name` varchar(125) NOT NULL,
  `status` int(11) NOT NULL,
  `created_date` datetime NOT NULL,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_areas`
--

INSERT INTO `tbl_areas` (`id`, `city_id`, `area_name`, `status`, `created_date`, `updated_at`) VALUES
(1, '1', 'Sec 1', 1, '2025-04-15 18:10:16', '2025-04-17 10:47:00'),
(2, '1', 'Sec 2', 1, '2025-04-15 18:10:57', '2025-04-17 10:53:22'),
(3, '1', 'Sec 3', 1, '2025-04-15 18:10:57', '2025-04-17 10:53:22'),
(4, '1', 'Sec 4', 1, '2025-04-15 18:10:57', '2025-05-29 08:33:34');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_cart`
--

CREATE TABLE `tbl_cart` (
  `id` int(11) NOT NULL,
  `product_id` varchar(55) NOT NULL,
  `user_id` varchar(55) NOT NULL,
  `product_info` text NOT NULL,
  `product_price` varchar(15) NOT NULL,
  `qty` bigint(20) NOT NULL,
  `weight` varchar(15) DEFAULT NULL,
  `flavor` varchar(155) DEFAULT NULL,
  `delivery_date` date NOT NULL,
  `delivery_time` varchar(55) NOT NULL,
  `message` text,
  `type` varchar(55) NOT NULL COMMENT 'prop/product',
  `user_type` varchar(15) NOT NULL,
  `created_date` datetime NOT NULL,
  `updated_date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_cart`
--

INSERT INTO `tbl_cart` (`id`, `product_id`, `user_id`, `product_info`, `product_price`, `qty`, `weight`, `flavor`, `delivery_date`, `delivery_time`, `message`, `type`, `user_type`, `created_date`, `updated_date`) VALUES
(3, '4', 'GUEST_925', '[{\"id\":44,\"product_id\":4,\"sku\":\"\",\"weight\":1000,\"unit\":\"kg\",\"price\":1000,\"flavor\":\"Exotic Pineapple\",\"eggoption\":\"Egg\",\"stock\":0,\"created_at\":\"2025-05-29T08:40:21.000Z\"}]', '1000', 1, '1000', 'Exotic Pineapple', '2025-06-02', '3PM-5PM', 'hjhbjh', 'product', 'guest', '2025-06-02 13:39:14', '0000-00-00 00:00:00'),
(12, '3', 'GUEST_925', '', '79', 1, NULL, NULL, '0000-00-00', '', NULL, 'prop', 'guest', '2025-06-02 16:19:14', '0000-00-00 00:00:00'),
(13, '2', 'GUEST_925', '', '49', 1, NULL, NULL, '0000-00-00', '', NULL, 'prop', 'guest', '2025-06-02 16:19:14', '0000-00-00 00:00:00'),
(14, '10', 'GUEST_925', '', '249', 1, NULL, NULL, '0000-00-00', '', NULL, 'prop', 'guest', '2025-06-02 16:37:47', '0000-00-00 00:00:00'),
(15, '6', 'GUEST_925', '[{\"id\":58,\"product_id\":6,\"sku\":\"\",\"weight\":1000,\"unit\":\"kg\",\"price\":500,\"flavor\":\"Chocolate Truffle\",\"eggoption\":\"Egg\",\"stock\":0,\"created_at\":\"2025-05-29T09:26:22.000Z\"}]', '500', 1, '1000', 'Chocolate Truffle', '2025-06-02', '9PM-11PM', '', 'product', 'guest', '2025-06-02 19:28:10', '0000-00-00 00:00:00'),
(16, '5', 'GUEST_925', '', '99', 1, NULL, NULL, '0000-00-00', '', NULL, 'prop', 'guest', '2025-06-02 19:28:20', '0000-00-00 00:00:00'),
(17, '6', 'GUEST_7390', '[{\"id\":58,\"product_id\":6,\"sku\":\"\",\"weight\":1000,\"unit\":\"kg\",\"price\":500,\"flavor\":\"Chocolate Truffle\",\"eggoption\":\"Egg\",\"stock\":0,\"created_at\":\"2025-05-29T09:26:22.000Z\"}]', '500', 2, '1000', 'Chocolate Truffle', '2025-06-03', '3PM-5PM', '', 'product', 'guest', '2025-06-03 12:25:38', '2025-06-03 13:34:06'),
(29, '4', 'GUEST_7390', '[{\"id\":42,\"product_id\":4,\"sku\":\"\",\"weight\":500,\"unit\":\"kg\",\"price\":1000,\"flavor\":\"Chocolate Truffle\",\"eggoption\":\"Egg\",\"stock\":0,\"created_at\":\"2025-05-29T08:40:21.000Z\"}]', '1000', 1, '500', 'Chocolate Truffle', '2025-06-03', '5PM-7PM', '', 'product', 'guest', '2025-06-03 14:59:51', '0000-00-00 00:00:00'),
(30, '3', 'GUEST_7390', '', '79', 1, NULL, NULL, '0000-00-00', '', NULL, 'prop', 'guest', '2025-06-03 14:59:56', '0000-00-00 00:00:00');

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
(1, 'Desserts', 'categories/1748504640190.jpg', 'desserts', 1, 0, '2025-05-29 12:59:31', '2025-05-29 13:14:00'),
(2, 'Cakes By Flavour', 'categories/1748504724606.jpg', 'cakes-by-flavour', 1, 0, '2025-05-29 13:12:26', '2025-05-29 13:15:24'),
(3, 'Cakes By Occasion', 'categories/1748505040769.jpg', 'cakes-by-occasion', 1, 0, '2025-05-29 13:20:40', '0000-00-00 00:00:00'),
(4, 'Anniversary Cake', 'categories/1748505108935.jpg', 'anniversary-cake', 1, 0, '2025-05-29 13:21:48', '0000-00-00 00:00:00'),
(5, 'Birthday Cakes by Relation', 'categories/1748505844968.jpg', 'birthday-cakes-by-relation', 1, 0, '2025-05-29 13:24:05', '2025-05-29 13:34:04');

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

-- --------------------------------------------------------

--
-- Table structure for table `tbl_cities`
--

CREATE TABLE `tbl_cities` (
  `id` int(5) NOT NULL,
  `city_name` varchar(225) NOT NULL,
  `status` int(11) NOT NULL,
  `created_date` datetime NOT NULL,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_cities`
--

INSERT INTO `tbl_cities` (`id`, `city_name`, `status`, `created_date`, `updated_at`) VALUES
(1, 'Gurgaon', 1, '2025-04-14 11:35:05', '2025-04-17 10:44:34');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_products`
--

CREATE TABLE `tbl_products` (
  `id` int(25) NOT NULL,
  `category_id` int(11) NOT NULL,
  `sub_category_id` int(11) NOT NULL,
  `customer_type` varchar(225) DEFAULT 'retail',
  `product_name` varchar(255) NOT NULL,
  `route` varchar(255) NOT NULL,
  `product_image` text NOT NULL,
  `product_description` text,
  `ingredients` text,
  `nutritional_info` text,
  `shipping` text,
  `options` text NOT NULL,
  `status` int(11) NOT NULL,
  `deleted` int(11) NOT NULL,
  `created_date` datetime NOT NULL,
  `updated_date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_products`
--

INSERT INTO `tbl_products` (`id`, `category_id`, `sub_category_id`, `customer_type`, `product_name`, `route`, `product_image`, `product_description`, `ingredients`, `nutritional_info`, `shipping`, `options`, `status`, `deleted`, `created_date`, `updated_date`) VALUES
(1, 1, 0, 'retail', 'Cheesecake Jars', 'cheesecake-jars', 'products/1748506676037.jpg', 'A Pack of Jar cakes which are made with in house signature recipe which not only look lovely but also taste so heavenly that it will just melt your heart.', 'Eggless Blueberry Baked Cheesecake Jar: A new recipe, full of juicy blueberries, a hint of lemon, and topped with ultra creamy cream cheese frosting.', 'Eggless Blueberry Baked Cheesecake Jar: A new recipe, full of juicy blueberries, a hint of lemon, and topped with ultra creamy cream cheese frosting.', 'A Pack of Jar cakes which are made with in house signature recipe which not only look lovely but also taste so heavenly that it will just melt your heart.', '[\"weight\",\"flavor\",\"egg\"]', 1, 0, '2025-05-29 13:47:56', '2025-05-29 13:50:27'),
(2, 1, 0, 'retail', 'Tiramisu and Banoffee Pie', 'tiramisu-and-banoffee-pie', 'products/1748507281532.jpg', 'A Pack of Jar cakes which are made with in house signature recipe which not only look lovely but also taste so heavenly that it will just melt your heart.', 'Tiramisu Jar Cake [Contains Egg]: A Coffee-Flavoured Italian Dessert. It Is Made Of Ladyfingers Dipped In Coffee, Layered With A Whipped Mixture Of Eggs, Sugar, And Mascarpone Cheese, Kahlua, Flavoured With Cocoa. [Contains Alcohol]', 'Tiramisu Jar Cake [Contains Egg]: A Coffee-Flavoured Italian Dessert. It Is Made Of Ladyfingers Dipped In Coffee, Layered With A Whipped Mixture Of Eggs, Sugar, And Mascarpone Cheese, Kahlua, Flavoured With Cocoa. [Contains Alcohol]', 'A Pack of Jar cakes which are made with in house signature recipe which not only look lovely but also taste so heavenly that it will just melt your heart.', '[\"weight\",\"flavor\",\"egg\"]', 1, 0, '2025-05-29 13:58:01', '2025-05-29 18:16:58'),
(3, 2, 0, 'retail', 'Pineapple Cakes', 'pineapple-cakes', 'products/1748507650598.jpg', 'For all the chocolate lovers out there. The truffle is prepared from a rich ganache of chocolate dark compound to provide it a thick and sweet texture to compliment the sponge of the cake.', 'For all the chocolate lovers out there. The truffle is prepared from a rich ganache of chocolate dark compound to provide it a thick and sweet texture to compliment the sponge of the cake.', 'For all the chocolate lovers out there. The truffle is prepared from a rich ganache of chocolate dark compound to provide it a thick and sweet texture to compliment the sponge of the cake.', 'For all the chocolate lovers out there. The truffle is prepared from a rich ganache of chocolate dark compound to provide it a thick and sweet texture to compliment the sponge of the cake.', '[\"weight\",\"flavor\",\"egg\"]', 1, 0, '2025-05-29 14:04:10', '0000-00-00 00:00:00'),
(4, 2, 0, 'retail', 'Fresh Fruit Cake', 'fresh-fruit-cake', 'products/1748508021251.jpg', 'A blend of all the seasonal fruits mixed with delicious pastry custard to be blended in between the vanilla sponge of the cake. The smoothness and lightness of this cake makes it completely melt in the mouth leaving a real tropical delight on your taste buds.', 'A blend of all the seasonal fruits mixed with delicious pastry custard to be blended in between the vanilla sponge of the cake. The smoothness and lightness of this cake makes it completely melt in the mouth leaving a real tropical delight on your taste buds.', 'A blend of all the seasonal fruits mixed with delicious pastry custard to be blended in between the vanilla sponge of the cake. The smoothness and lightness of this cake makes it completely melt in the mouth leaving a real tropical delight on your taste buds.', 'A blend of all the seasonal fruits mixed with delicious pastry custard to be blended in between the vanilla sponge of the cake. The smoothness and lightness of this cake makes it completely melt in the mouth leaving a real tropical delight on your taste buds.', '[\"weight\",\"flavor\",\"egg\"]', 1, 0, '2025-05-29 14:10:21', '0000-00-00 00:00:00'),
(5, 3, 0, 'retail', 'Mothers Day Cakes', 'mothers-day-cakes', 'products/1748510524180.jpg', 'A message cake for mom where she will find secret message hidden in cake', 'A message cake for mom where she will find secret message hidden in cake', 'A message cake for mom where she will find secret message hidden in cake', 'A message cake for mom where she will find secret message hidden in cake', '[\"weight\",\"flavor\",\"egg\"]', 1, 0, '2025-05-29 14:52:04', '0000-00-00 00:00:00'),
(6, 4, 0, 'retail', 'Heart Shaped Anniversary', 'heart-shaped-anniversary', 'products/1748510782210.jpg', 'A Heart Shape photo cake made with your favorite character to make birthday party a bit extra special', 'A Heart Shape photo cake made with your favorite character to make birthday party a bit extra special', 'A Heart Shape photo cake made with your favorite character to make birthday party a bit extra special', 'A Heart Shape photo cake made with your favorite character to make birthday party a bit extra special', '[\"weight\",\"flavor\",\"egg\"]', 1, 0, '2025-05-29 14:56:22', '0000-00-00 00:00:00'),
(7, 5, 0, 'retail', 'Custom Floral Cake', 'custom-floral-cake', 'products/1748510993496.jpg', 'This beautiful cake is more than a cake. It\'s a personification of beauty and happiness that you are going to celebrate. Be it any occasion, be it anyone. Such cake can bring a joyous smile to their face', 'This beautiful cake is more than a cake. It\'s a personification of beauty and happiness that you are going to celebrate. Be it any occasion, be it anyone. Such cake can bring a joyous smile to their face', 'This beautiful cake is more than a cake. It\'s a personification of beauty and happiness that you are going to celebrate. Be it any occasion, be it anyone. Such cake can bring a joyous smile to their face', 'This beautiful cake is more than a cake. It\'s a personification of beauty and happiness that you are going to celebrate. Be it any occasion, be it anyone. Such cake can bring a joyous smile to their face', '[\"weight\",\"flavor\",\"egg\"]', 1, 0, '2025-05-29 14:59:53', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_product_option`
--

CREATE TABLE `tbl_product_option` (
  `id` int(5) NOT NULL,
  `product_id` int(10) NOT NULL,
  `sku` varchar(125) NOT NULL,
  `weight` int(10) NOT NULL,
  `unit` varchar(125) NOT NULL,
  `price` int(125) NOT NULL,
  `flavor` varchar(225) NOT NULL,
  `eggoption` varchar(125) NOT NULL,
  `stock` int(11) NOT NULL,
  `created_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_product_option`
--

INSERT INTO `tbl_product_option` (`id`, `product_id`, `sku`, `weight`, `unit`, `price`, `flavor`, `eggoption`, `stock`, `created_at`) VALUES
(6, 1, '', 1000, 'kg', 1500, 'Chocolate Truffle', 'Eggless', 0, '2025-05-29 13:47:56'),
(7, 1, '', 2000, 'kg', 3000, 'Chocolate Truffle', 'Eggless', 0, '2025-05-29 13:47:56'),
(8, 1, '', 500, 'kg', 1000, 'Exotic Pineapple', 'Eggless', 0, '2025-05-29 13:47:56'),
(9, 1, '', 1000, 'kg', 2000, 'Exotic Pineapple', 'Egg', 0, '2025-05-29 13:47:56'),
(10, 1, '', 2000, 'kg', 800, 'Caramel Butterscotch', 'Eggless', 0, '2025-05-29 13:47:56'),
(11, 1, '', 1000, 'kg', 1600, 'Caramel Butterscotch', 'Egg', 0, '2025-05-29 13:47:56'),
(12, 1, '', 1000, 'kg', 1200, 'Black Forest', 'Eggless', 0, '2025-05-29 13:47:56'),
(13, 1, '', 2000, 'kg', 2400, 'Black Forest', 'Eggless', 0, '2025-05-29 13:47:56'),
(14, 1, '', 1000, 'kg', 1000, 'Blue Berry', 'Egg', 0, '2025-05-29 13:47:56'),
(15, 1, '', 2000, 'kg', 2000, 'Blue Berry', 'Egg', 0, '2025-05-29 13:47:56'),
(16, 1, '', 500, 'kg', 600, 'Pineapple', 'Eggless', 0, '2025-05-29 13:47:56'),
(17, 1, '', 1000, 'kg', 1200, 'Pineapple', 'Eggless', 0, '2025-05-29 13:47:56'),
(18, 2, '', 500, 'kg', 500, 'Chocolate Truffle', 'Egg', 0, '2025-05-29 13:58:01'),
(19, 2, '', 1000, 'kg', 1200, 'Chocolate Truffle', 'Eggless', 0, '2025-05-29 13:58:01'),
(20, 2, '', 1000, 'kg', 1200, 'Exotic Pineapple', 'Egg', 0, '2025-05-29 13:58:01'),
(21, 2, '', 2000, 'kg', 2400, 'Exotic Pineapple', 'Egg', 0, '2025-05-29 13:58:01'),
(22, 2, '', 1000, 'kg', 1000, 'Caramel Butterscotch', 'Egg', 0, '2025-05-29 13:58:01'),
(23, 2, '', 1500, 'kg', 1500, 'Caramel Butterscotch', 'Eggless', 0, '2025-05-29 13:58:01'),
(24, 2, '', 500, 'kg', 600, 'Black Forest', 'Eggless', 0, '2025-05-29 13:58:01'),
(25, 2, '', 1000, 'kg', 1200, 'Black Forest', 'Egg', 0, '2025-05-29 13:58:01'),
(26, 2, '', 1000, 'kg', 1200, 'Blue Berry', 'Egg', 0, '2025-05-29 13:58:01'),
(27, 2, '', 1500, 'kg', 1600, 'Blue Berry', 'Eggless', 0, '2025-05-29 13:58:01'),
(28, 2, '', 1000, 'kg', 1000, 'Pineapple', 'Egg', 0, '2025-05-29 13:58:01'),
(29, 2, '', 2000, 'kg', 2000, 'Pineapple', 'Egg', 0, '2025-05-29 13:58:01'),
(30, 3, '', 1000, 'kg', 500, 'Chocolate Truffle', 'Egg', 0, '2025-05-29 14:04:10'),
(31, 3, '', 1500, 'kg', 1000, 'Chocolate Truffle', 'Egg', 0, '2025-05-29 14:04:10'),
(32, 3, '', 1000, 'kg', 1000, 'Exotic Pineapple', 'Egg', 0, '2025-05-29 14:04:10'),
(33, 3, '', 2000, 'kg', 2000, 'Exotic Pineapple', 'Egg', 0, '2025-05-29 14:04:10'),
(34, 3, '', 500, 'kg', 1000, 'Caramel Butterscotch', 'Eggless', 0, '2025-05-29 14:04:10'),
(35, 3, '', 1000, 'kg', 1500, 'Caramel Butterscotch', 'Eggless', 0, '2025-05-29 14:04:10'),
(36, 3, '', 1000, 'kg', 800, 'Black Forest', 'Egg', 0, '2025-05-29 14:04:10'),
(37, 3, '', 2000, 'kg', 1600, 'Black Forest', 'Egg', 0, '2025-05-29 14:04:10'),
(38, 3, '', 1000, 'kg', 500, 'Blue Berry', 'Egg', 0, '2025-05-29 14:04:10'),
(39, 3, '', 1500, 'kg', 800, 'Blue Berry', 'Egg', 0, '2025-05-29 14:04:10'),
(40, 3, '', 500, 'kg', 600, 'Pineapple', 'Egg', 0, '2025-05-29 14:04:10'),
(41, 3, '', 1000, 'kg', 1200, 'Pineapple', 'Egg', 0, '2025-05-29 14:04:10'),
(42, 4, '', 500, 'kg', 1000, 'Chocolate Truffle', 'Egg', 0, '2025-05-29 14:10:21'),
(43, 4, '', 1000, 'kg', 1500, 'Chocolate Truffle', 'Egg', 0, '2025-05-29 14:10:21'),
(44, 4, '', 1000, 'kg', 1000, 'Exotic Pineapple', 'Egg', 0, '2025-05-29 14:10:21'),
(45, 4, '', 2000, 'kg', 2000, 'Exotic Pineapple', 'Egg', 0, '2025-05-29 14:10:21'),
(46, 4, '', 1000, 'kg', 1000, 'Caramel Butterscotch', 'Egg', 0, '2025-05-29 14:10:21'),
(47, 4, '', 1500, 'kg', 1500, 'Caramel Butterscotch', 'Egg', 0, '2025-05-29 14:10:21'),
(48, 4, '', 500, 'kg', 600, 'Black Forest', 'Egg', 0, '2025-05-29 14:10:21'),
(49, 4, '', 1000, 'kg', 1200, 'Black Forest', 'Egg', 0, '2025-05-29 14:10:21'),
(50, 4, '', 1000, 'kg', 800, 'Blue Berry', 'Egg', 0, '2025-05-29 14:10:21'),
(51, 4, '', 1500, 'kg', 1600, 'Blue Berry', 'Egg', 0, '2025-05-29 14:10:21'),
(52, 4, '', 1000, 'kg', 1000, 'Pineapple', 'Eggless', 0, '2025-05-29 14:10:21'),
(53, 4, '', 2000, 'kg', 2000, 'Pineapple', 'Egg', 0, '2025-05-29 14:10:21'),
(54, 5, '', 1000, 'kg', 500, 'Chocolate Truffle', 'Egg', 0, '2025-05-29 14:52:04'),
(55, 5, '', 2000, 'kg', 1000, 'Chocolate Truffle', 'Eggless', 0, '2025-05-29 14:52:04'),
(56, 5, '', 500, 'kg', 800, 'Exotic Pineapple', 'Eggless', 0, '2025-05-29 14:52:04'),
(57, 5, '', 1000, 'kg', 1600, 'Exotic Pineapple', 'Egg', 0, '2025-05-29 14:52:04'),
(58, 6, '', 1000, 'kg', 500, 'Chocolate Truffle', 'Egg', 0, '2025-05-29 14:56:22'),
(59, 6, '', 1500, 'kg', 800, 'Chocolate Truffle', 'Egg', 0, '2025-05-29 14:56:22'),
(60, 6, '', 1000, 'kg', 1000, 'Exotic Pineapple', 'Eggless', 0, '2025-05-29 14:56:22'),
(61, 6, '', 2000, 'kg', 2000, 'Exotic Pineapple', 'Egg', 0, '2025-05-29 14:56:22'),
(62, 6, '', 500, 'kg', 800, 'Caramel Butterscotch', 'Egg', 0, '2025-05-29 14:56:22'),
(63, 6, '', 1000, 'kg', 1600, 'Caramel Butterscotch', 'Eggless', 0, '2025-05-29 14:56:22'),
(64, 7, '', 500, 'kg', 1000, 'Exotic Pineapple', 'Eggless', 0, '2025-05-29 14:59:53'),
(65, 7, '', 1000, 'kg', 2000, 'Exotic Pineapple', 'Egg', 0, '2025-05-29 14:59:53'),
(66, 7, '', 1000, 'kg', 800, 'Caramel Butterscotch', 'Egg', 0, '2025-05-29 14:59:53'),
(67, 7, '', 1500, 'kg', 1600, 'Caramel Butterscotch', 'Egg', 0, '2025-05-29 14:59:53'),
(68, 7, '', 1000, 'kg', 1000, 'Pineapple', 'Egg', 0, '2025-05-29 14:59:53'),
(69, 7, '', 2000, 'kg', 2000, 'Pineapple', 'Eggless', 0, '2025-05-29 14:59:53');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_props`
--

CREATE TABLE `tbl_props` (
  `id` int(5) NOT NULL,
  `prop_cat_id` varchar(225) NOT NULL,
  `prop_name` varchar(225) NOT NULL,
  `prop_image` varchar(225) NOT NULL,
  `price` varchar(225) NOT NULL,
  `is_popular` tinyint(1) NOT NULL DEFAULT '0',
  `stock` varchar(225) NOT NULL,
  `status` int(11) NOT NULL,
  `created_date` datetime NOT NULL,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_props`
--

INSERT INTO `tbl_props` (`id`, `prop_cat_id`, `prop_name`, `prop_image`, `price`, `is_popular`, `stock`, `status`, `created_date`, `updated_at`) VALUES
(2, '1', 'Number Candles', 'props/1744876805684.jpg', '49', 0, '', 1, '2025-04-17 13:30:05', '2025-04-17 08:00:05'),
(3, '1', 'Single Red Rose', 'props/1744876853543.jpg', '79', 0, '', 1, '2025-04-17 13:30:53', '2025-04-17 08:00:53'),
(4, '2', 'Magic Candles Set', 'props/1744876929036.jpg', '59', 0, '', 1, '2025-04-17 13:32:09', '2025-04-17 08:02:09'),
(5, '2', 'One Flower Candle', 'props/1744876961486.jpg', '99', 0, '', 1, '2025-04-17 13:32:41', '2025-04-17 08:02:41'),
(6, '3', '12 Red Roses Bunch', 'props/1744877045829.jpg', '499', 0, '', 1, '2025-04-17 13:34:05', '2025-04-17 08:04:05'),
(7, '3', '12 Mixed Roses', 'props/1744877065780.jpg', '499', 0, '', 1, '2025-04-17 13:34:25', '2025-04-17 08:04:25'),
(8, '4', '5 Nestle Kitkat 12gm', 'props/1744877138765.jpg', '129', 0, '', 1, '2025-04-17 13:35:38', '2025-04-17 08:05:38'),
(9, '4', 'Chocolate Basket', 'props/1744877159790.jpg', '599', 0, '', 1, '2025-04-17 13:35:59', '2025-04-17 08:05:59'),
(10, '4', 'B\'day Foil Balloon', 'props/1744877248948.jpg', '249', 0, '10', 1, '2025-04-17 13:37:28', '2025-05-19 11:24:48'),
(11, '5', '6 Inch Teddy Bear', 'props/1744877273413.jpg', '299', 1, '20', 1, '2025-04-17 13:37:53', '2025-04-17 12:49:20');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_prop_category`
--

CREATE TABLE `tbl_prop_category` (
  `id` int(5) NOT NULL,
  `category_name` varchar(225) NOT NULL,
  `status` int(11) NOT NULL,
  `created_date` datetime NOT NULL,
  `updated_date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_prop_category`
--

INSERT INTO `tbl_prop_category` (`id`, `category_name`, `status`, `created_date`, `updated_date`) VALUES
(1, 'Cake Toppers', 1, '2025-04-15 15:06:41', '2025-04-15 15:06:41'),
(2, 'Candles', 1, '2025-04-15 15:06:41', '2025-04-15 15:06:41'),
(3, 'Flowers', 1, '2025-04-15 15:07:42', '2025-04-15 15:07:42'),
(4, 'Chocolates', 1, '2025-04-15 15:07:42', '2025-04-15 15:07:42'),
(5, 'More Addons', 1, '2025-04-16 12:21:00', '2025-04-16 12:21:00');

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
-- Indexes for table `tbl_areas`
--
ALTER TABLE `tbl_areas`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_cart`
--
ALTER TABLE `tbl_cart`
  ADD PRIMARY KEY (`id`);

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
-- Indexes for table `tbl_cities`
--
ALTER TABLE `tbl_cities`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_products`
--
ALTER TABLE `tbl_products`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `product_name` (`product_name`);

--
-- Indexes for table `tbl_product_option`
--
ALTER TABLE `tbl_product_option`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_props`
--
ALTER TABLE `tbl_props`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_prop_category`
--
ALTER TABLE `tbl_prop_category`
  ADD PRIMARY KEY (`id`);

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
-- AUTO_INCREMENT for table `tbl_areas`
--
ALTER TABLE `tbl_areas`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `tbl_cart`
--
ALTER TABLE `tbl_cart`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `tbl_categories`
--
ALTER TABLE `tbl_categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `tbl_child_categories`
--
ALTER TABLE `tbl_child_categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_cities`
--
ALTER TABLE `tbl_cities`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `tbl_products`
--
ALTER TABLE `tbl_products`
  MODIFY `id` int(25) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `tbl_product_option`
--
ALTER TABLE `tbl_product_option`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=70;

--
-- AUTO_INCREMENT for table `tbl_props`
--
ALTER TABLE `tbl_props`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `tbl_prop_category`
--
ALTER TABLE `tbl_prop_category`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `tbl_sub_categories`
--
ALTER TABLE `tbl_sub_categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_users`
--
ALTER TABLE `tbl_users`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
