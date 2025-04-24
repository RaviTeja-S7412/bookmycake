-- phpMyAdmin SQL Dump
-- version 4.8.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 24, 2025 at 11:45 AM
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
-- Table structure for table `tbl_cart`
--

CREATE TABLE `tbl_cart` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `product_info` text NOT NULL,
  `product_price` varchar(15) NOT NULL,
  `weight` varchar(15) NOT NULL,
  `flavor` varchar(155) NOT NULL,
  `delivery_date` date NOT NULL,
  `delivery_time` time NOT NULL,
  `message` text NOT NULL,
  `egg_option` varchar(15) NOT NULL,
  `type` varchar(55) NOT NULL COMMENT 'prop/product',
  `created_date` datetime NOT NULL,
  `updated_date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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
(1, 'Christmas Specials', 'categories/1739971144652.jpg', 'christmas-specials', 1, 0, '2025-02-19 18:49:04', '0000-00-00 00:00:00'),
(2, 'Indian Fusion Cakes', 'categories/1739971175821.jpg', 'indian-fusion-cakes', 1, 0, '2025-02-19 18:49:35', '0000-00-00 00:00:00'),
(3, 'Photo Cakes', 'categories/1739971191085.jpg', 'photo-cakes', 1, 0, '2025-02-19 18:49:51', '0000-00-00 00:00:00'),
(4, 'Falvor', 'categories/1739971220030.jpg', 'falvor', 1, 0, '2025-02-19 18:50:20', '0000-00-00 00:00:00'),
(5, 'Desserts', 'categories/1739971257157.jpg', 'desserts', 1, 0, '2025-02-19 18:50:57', '0000-00-00 00:00:00'),
(6, 'Designer Cakes', 'categories/1739971280549.jpg', 'designer-cakes', 1, 0, '2025-02-19 18:51:20', '0000-00-00 00:00:00'),
(7, 'Anniversary', 'categories/1739971297141.jpg', 'anniversary', 1, 0, '2025-02-19 18:51:37', '0000-00-00 00:00:00'),
(8, 'Birthday', 'categories/1739971309125.jpg', 'birthday', 1, 0, '2025-02-19 18:51:49', '0000-00-00 00:00:00'),
(9, 'Props', 'categories/1739971321684.jpg', 'props', 1, 0, '2025-02-19 18:52:01', '0000-00-00 00:00:00'),
(10, 'Corporate Cakes', 'categories/1739971391820.jpg', 'corporate-cakes', 1, 0, '2025-02-19 18:53:11', '0000-00-00 00:00:00');

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
(1, 6, 29, 'Spiderman cakes', 'categories/1739978748105.jpg', 'spiderman-cakes', 1, 0, '2025-02-19 20:55:48', '0000-00-00 00:00:00'),
(2, 6, 29, 'Chota Bheem Cakes', 'categories/1739978778808.jpg', 'chota-bheem-cakes', 1, 0, '2025-02-19 20:56:18', '0000-00-00 00:00:00'),
(3, 6, 29, 'Mickey Mouse Cakes', 'categories/1739978906696.jpg', 'mickey-mouse-cakes', 1, 0, '2025-02-19 20:58:26', '0000-00-00 00:00:00'),
(4, 6, 29, 'Cartoon Character Cakes', 'categories/1739978935393.jpg', 'cartoon-character-cakes', 1, 0, '2025-02-19 20:58:55', '0000-00-00 00:00:00');

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
(1, 3, 1, 'Photo Cake Square - Yellow', 'photo-cake-square-yellow', 'products/1740053201737.jpg', 'Square Shaped Custom Photo cake is for any occasion you like. Be it a Birthday or an Anniversary - Photo cake is always in fashion. The Cake is part of our mini designer birthday/ anniversary cake series. Available in all flavors with customizable Photo.\r\n\r\nThe photo can be shared over WhatsApp: 9990026799 or email: \"hello@bookmycake.co\" The cake is sure to win the heart of your loved ones. The cake will have yellow whipped cream borders to go along with your photo.', '', '', '', '[{\"kg\":\"0.5\",\"price\":\"750\"},{\"kg\":\"1\",\"price\":\"1500\"},{\"kg\":\"2\",\"price\":\"3000\"},{\"kg\":\"3\",\"price\":\"4500\"}]', '[\"Pineapple\",\"Chocolate\",\"Butter Scotch\",\"Black Forest\",\"Blueberry\",\"Strawberry\"]', 'true', 'true', 25, 1, 0, '2025-02-20 17:36:41', '0000-00-00 00:00:00'),
(2, 3, 1, 'Photo Cake Heart - Red', 'photo-cake-heart-red', 'products/1740053414817.jpg', 'Heart Shaped Custom Photo cake is for any occasion you like. Be it a Birthday or an Anniversary - Photo cake is always in fashion. The Cake is part of our mini designer birthday/ anniversary cake series. Available in all flavors with customizable Photo.\r\n\r\nThe photo can be shared over WhatsApp: 9990026799 or email: \"hello@bookmycake.co\" The cake is sure to win the heart of your loved ones. The cake will have red whipped cream borders to go along with your photo.', '', '', '', '[{\"kg\":\"0.5\",\"price\":\"750\"},{\"kg\":\"1\",\"price\":\"1500\"},{\"kg\":\"2\",\"price\":\"3000\"},{\"kg\":\"3\",\"price\":\"4500\"}]', '[\"Pineapple\",\"Chocolate\",\"Butter Scotch\",\"Black Forest\",\"Blueberry\",\"Strawberry\"]', 'true', 'true', 10, 1, 0, '2025-02-20 17:40:14', '0000-00-00 00:00:00'),
(3, 3, 2, 'Happy Birthday Princess Poster Cake', 'happy-birthday-princess-poster-cake', 'products/1740053594620.jpg', 'Happy birthday princess cake in minimum of 500 gms. Cake is available in pineapple eggless flavor by default but flavor can be changed while ordering, made to order fresh. Zero storage cake straight from our kitchen to your home.', '', '', '', '[{\"kg\":\"0.5\",\"price\":\"625\"},{\"kg\":\"1\",\"price\":\"1063\"},{\"kg\":\"1.5\",\"price\":\"1595\"},{\"kg\":\"2\",\"price\":\"2126\"}]', '[\"Pineapple\",\"Chocolate\",\"Butter Scotch\",\"Black forest\",\"Blueberry\",\"Strawberry\",\"Fruit\",\"Red Velvet\"]', 'true', 'true', 10, 1, 0, '2025-02-20 17:43:14', '0000-00-00 00:00:00'),
(4, 3, 2, 'Mickey Mouse Cake', 'mickey-mouse-cake', 'products/1740053815113.jpg', 'Mickey Mouse Photo Cake is part of our kids mini designer birthday cake series. Available in all flavors with customizable message. The cake has a mickey mouse face in edible photo on top of the cake along with happy birthday and age number.', '', '', '', '[{\"kg\":\"0.5\",\"price\":\"625\"},{\"kg\":\"1\",\"price\":\"1063\"},{\"kg\":\"1.5\",\"price\":\"1595\"},{\"kg\":\"2\",\"price\":\"2126\"},{\"kg\":\"2.5\",\"price\":\"2658\"},{\"kg\":\"3\",\"price\":\"3190\"}]', '[\"Pineapple\",\"Chocolate\",\"Butter Scotch\",\"Black Forest\",\"Blueberry\",\"Strawberry\"]', 'true', 'true', 12, 1, 0, '2025-02-20 17:46:55', '0000-00-00 00:00:00'),
(5, 4, 3, 'Exotic Pineapple Cake', 'exotic-pineapple-cake', 'products/1740054264494.jpg', 'Exotic Pineapple Cake is loaded with juicy pineapple chunks both inside and outside. This cake is no less than a designer cake with dry fruit - pista badam garnishing on the sides and a disk of juicy pineapple chunks on top of the cake. Our one of the tastiest and hottest selling cakes.', '', '', '', '[{\"kg\":\"0.5\",\"price\":\"550\"},{\"kg\":\"1\",\"price\":\"1050\"},{\"kg\":\"1.5\",\"price\":\"1550\"},{\"kg\":\"2\",\"price\":\"2050\"},{\"kg\":\"2.5\",\"price\":\"2550\"},{\"kg\":\"3\",\"price\":\"3000\"}]', '[\"\"]', 'true', 'false', 10, 1, 0, '2025-02-20 17:54:24', '0000-00-00 00:00:00'),
(6, 4, 3, 'Pineapple Cake', 'pineapple-cake', 'products/1740054371848.jpg', 'Pineapple Cake eggless', '', '', '', '[{\"kg\":\"0.5\",\"price\":\"500\"},{\"kg\":\"1\",\"price\":\"900\"},{\"kg\":\"1.5\",\"price\":\"1300\"},{\"kg\":\"2\",\"price\":\"1700\"},{\"kg\":\"2.5\",\"price\":\"2100\"},{\"kg\":\"3\",\"price\":\"2500\"}]', '[\"\"]', 'true', 'false', 5, 1, 0, '2025-02-20 17:56:11', '0000-00-00 00:00:00'),
(7, 4, 4, 'Dark Chocolate Fantasy Cake', 'dark-chocolate-fantasy-cake', 'products/1740054510860.jpg', 'This cake is fully loaded with dark chocolate. Made fresh on order with extra chocolaty layers within the chocolate cake, topped with beautiful Chocolate curls garnishing. A dream come true for chocolate lovers. Beware of extra chocolaty awesomeness!', '', '', '', '[{\"kg\":\"0.5\",\"price\":\"688\"},{\"kg\":\"1\",\"price\":\"1063\"},{\"kg\":\"1.5\",\"price\":\"1905\"},{\"kg\":\"2\",\"price\":\"2126\"},{\"kg\":\"2.5\",\"price\":\"2658\"},{\"kg\":\"3\",\"price\":\"3189\"}]', '[\"\"]', 'true', 'false', 6, 1, 0, '2025-02-20 17:58:30', '0000-00-00 00:00:00'),
(8, 4, 4, 'Dark Chocolate Overload Party Cake', 'dark-chocolate-overload-party-cake', 'products/1740054655544.jpg', '\r\nLego Dark Chocolate Cake\r\nRegular priceRs. 700.00\r\nSize\r\n0.5 kg 1 kg 1.5 kg 2 kg 2.5 kg 3 kg 3.5 kg 4 kg\r\nQuantity\r\nDecrease quantity for Lego Dark Chocolate Cake\r\n1\r\nIncrease quantity for Lego Dark Chocolate Cake\r\n\r\nAdd to cart Get 20% off\r\nThis cake is fully loaded with dark chocolate. Made fresh on order with extra chocolaty layers within the chocolate cake. Lego Cake is part of our kids mini designer birthday cake series. The cake has a Lego action figures edible photo on top of the cake.', '', '', '', '[{\"kg\":\"0.5\",\"price\":\"700\"},{\"kg\":\"1\",\"price\":\"1300\"},{\"kg\":\"1.5\",\"price\":\"2000\"},{\"kg\":\"2\",\"price\":\"2600\"},{\"kg\":\"2.5\",\"price\":\"3200\"},{\"kg\":\"3\",\"price\":\"3800\"}]', '[\"\"]', 'true', 'false', 15, 1, 0, '2025-02-20 18:00:55', '0000-00-00 00:00:00'),
(9, 4, 5, 'Choco Vanilla Cake', 'choco-vanilla-cake', 'products/1740054766831.jpg', 'The right blend of chocolate and vanilla to get the best of both chocolate cake and vanilla cake.', '', '', '', '[{\"kg\":\"0.5\",\"price\":\"525\"},{\"kg\":\"1\",\"price\":\"875\"},{\"kg\":\"1.5\",\"price\":\"1313\"},{\"kg\":\"2\",\"price\":\"1750\"},{\"kg\":\"2.5\",\"price\":\"2188\"},{\"kg\":\"3\",\"price\":\"2625\"}]', '[\"\"]', 'true', 'false', 5, 1, 0, '2025-02-20 18:02:46', '0000-00-00 00:00:00'),
(10, 4, 5, 'Choco Chip Choco Vanilla Cake', 'choco-chip-choco-vanilla-cake', 'products/1740054864863.jpg', 'Chocolate vanilla cake with modest amount of chocolate chips decorated along with chocolate truffle on top. Made fresh on order.', '', '', '', '[{\"kg\":\"0.5\",\"price\":\"500\"},{\"kg\":\"1\",\"price\":\"900\"},{\"kg\":\"1.5\",\"price\":\"1300\"},{\"kg\":\"2\",\"price\":\"1700\"},{\"kg\":\"2.5\",\"price\":\"2100\"},{\"kg\":\"3\",\"price\":\"2500\"}]', '[\"\"]', 'true', 'false', 15, 1, 0, '2025-02-20 18:04:24', '0000-00-00 00:00:00'),
(11, 4, 6, 'Black Forest S1', 'black-forest-s1', 'products/1740054971561.jpg', 'Black Forest S1 eggless', '', '', '', '[{\"kg\":\"0.5\",\"price\":\"500\"},{\"kg\":\"1\",\"price\":\"900\"},{\"kg\":\"1.5\",\"price\":\"1300\"},{\"kg\":\"2\",\"price\":\"1700\"}]', '[\"\"]', 'true', 'false', 5, 1, 0, '2025-02-20 18:06:11', '0000-00-00 00:00:00'),
(12, 4, 6, 'Black Forest Cake d3', 'black-forest-cake-d3', 'products/1740055078679.jpg', 'This yummy black forest cake is made in a classic design with loads of chocolate flakes, chocolate rolls, and cherries and beautiful liquid chocolate dripping and black and white chocolate squares on the sides. Under all this awesomeness there is an amazing black forest cake with it\'s classic taste and loaded with finely chopped cherries and strawberry crush mixed with whipped vanilla cream. Made fresh on order.', '', '', '', '[{\"kg\":\"0.5\",\"price\":\"500\"},{\"kg\":\"1\",\"price\":\"900\"},{\"kg\":\"1.5\",\"price\":\"1300\"},{\"kg\":\"2\",\"price\":\"1700\"}]', '[\"\"]', 'true', 'false', 4, 1, 0, '2025-02-20 18:07:58', '0000-00-00 00:00:00'),
(13, 4, 7, 'Butterscotch cake', 'butterscotch-cake', 'products/1740055143895.jpg', 'Butterscotch cake eggless', '', '', '', '[{\"kg\":\"0.5\",\"price\":\"500\"},{\"kg\":\"1\",\"price\":\"900\"},{\"kg\":\"1.5\",\"price\":\"1300\"},{\"kg\":\"2\",\"price\":\"1700\"}]', '[\"\"]', 'true', 'false', 2, 1, 0, '2025-02-20 18:09:03', '0000-00-00 00:00:00'),
(14, 4, 7, 'Butterscotch Almond Cake', 'butterscotch-almond-cake', 'products/1740055224996.jpg', 'Butterscotch cake loaded with almond flakes. Made fresh on order.', '', '', '', '[{\"kg\":\"0.5\",\"price\":\"650\"},{\"kg\":\"1\",\"price\":\"1150\"},{\"kg\":\"1.5\",\"price\":\"1650\"},{\"kg\":\"2\",\"price\":\"2150\"}]', '[\"\"]', 'true', 'false', 6, 1, 0, '2025-02-20 18:10:24', '0000-00-00 00:00:00'),
(15, 4, 8, 'Strawberry Forest Cake', 'strawberry-forest-cake', 'products/1740055292389.jpg', 'A berry-licious strawberry flavored cake topped with cherry forest garnishing.', '', '', '', '[{\"kg\":\"0.5\",\"price\":\"500\"},{\"kg\":\"1\",\"price\":\"900\"},{\"kg\":\"1.5\",\"price\":\"1300\"},{\"kg\":\"2\",\"price\":\"1700\"}]', '[\"\"]', 'true', 'false', 6, 1, 0, '2025-02-20 18:11:32', '0000-00-00 00:00:00'),
(16, 4, 8, 'Strawberry Cake d2', 'strawberry-cake-d2', 'products/1740055346180.jpg', 'Strawberry filling cake. Strawberries will be topped based on availability and season.', '', '', '', '[{\"kg\":\"0.5\",\"price\":\"500\"},{\"kg\":\"1\",\"price\":\"900\"},{\"kg\":\"1.5\",\"price\":\"1300\"},{\"kg\":\"2\",\"price\":\"1700\"}]', '[\"\"]', 'true', 'false', 8, 1, 0, '2025-02-20 18:12:26', '0000-00-00 00:00:00'),
(17, 4, 9, 'Red Velvet Heart Cake', 'red-velvet-heart-cake', 'products/1740055448774.jpg', 'Special design for your special one. This heart shaped red velvet cake is a beautiful and tasty treat for any romantic occasion.', '', '', '', '[{\"kg\":\"0.5\",\"price\":\"650\"},{\"kg\":\"1\",\"price\":\"1200\"},{\"kg\":\"1.5\",\"price\":\"1800\"},{\"kg\":\"2\",\"price\":\"2400\"}]', '[\"\"]', 'true', 'false', 6, 1, 0, '2025-02-20 18:14:08', '0000-00-00 00:00:00'),
(18, 4, 9, 'Red Velvet Classic', 'red-velvet-classic', 'products/1740055594974.jpg', 'Enjoy our gourmet red velvet cake made with fine quality ingredients and designed with whipped cream frosting. This cake is made fresh on order.', '', '', '', '[{\"kg\":\"0.5\",\"price\":\"688\"},{\"kg\":\"1\",\"price\":\"1063\"},{\"kg\":\"1.5\",\"price\":\"1595\"},{\"kg\":\"2\",\"price\":\"2126\"}]', '[\"\"]', 'true', 'false', 5, 1, 0, '2025-02-20 18:16:34', '0000-00-00 00:00:00'),
(19, 4, 10, 'Blueberry Cheese Cake', 'blueberry-cheese-cake', 'products/1740055687998.JPG', 'Soft Cheese cake baked with crunchy graham cracker base, topped with blueberry pulp. This berry berry delicious cake is made fresh on order.', '', '', '', '[{\"kg\":\"0.5\",\"price\":\"750\"},{\"kg\":\"1\",\"price\":\"1250\"},{\"kg\":\"1.5\",\"price\":\"1875\"},{\"kg\":\"2\",\"price\":\"2500\"}]', '[\"\"]', 'true', 'false', 8, 1, 0, '2025-02-20 18:18:08', '0000-00-00 00:00:00'),
(20, 4, 10, 'Berries Blast Cake d1', 'berries-blast-cake-d1', 'products/1740055835701.jpg', 'One layer of strawberry filling and one layer of blueberry and topped with blueberry pulp. This berry berry delicious cake is made fresh on order.', '', '', '', '[{\"kg\":\"0.5\",\"price\":\"588\"},{\"kg\":\"1\",\"price\":\"938\"},{\"kg\":\"1.5\",\"price\":\"1407\"},{\"kg\":\"2\",\"price\":\"1876\"}]', '[\"\"]', 'true', 'false', 9, 1, 0, '2025-02-20 18:20:35', '0000-00-00 00:00:00'),
(21, 4, 11, 'Fresh Fruit Cake d2', 'fresh-fruit-cake-d2', 'products/1740056055981.jpg', 'Fresh fruit cake is made with soft vanilla cream and fruits filled in between vanilla sponge layers and topped with lots of fruits', '', '', '', '[{\"kg\":\"0.5\",\"price\":\"588\"},{\"kg\":\"1\",\"price\":\"938\"},{\"kg\":\"1.5\",\"price\":\"1407\"},{\"kg\":\"2\",\"price\":\"1876\"}]', '[\"\"]', 'true', 'false', 6, 1, 0, '2025-02-20 18:24:15', '0000-00-00 00:00:00'),
(22, 4, 11, 'Classic Mango Cake', 'classic-mango-cake', 'products/1740056136244.jpg', 'Made fresh on order. This mango flavored cake is sure to take you to mango heaven and back.', '', '', '', '[{\"kg\":\"0.5\",\"price\":\"600\"},{\"kg\":\"1\",\"price\":\"950\"},{\"kg\":\"1.5\",\"price\":\"1375\"},{\"kg\":\"2\",\"price\":\"1900\"}]', '[\"\"]', 'true', 'false', 8, 1, 0, '2025-02-20 18:25:36', '0000-00-00 00:00:00'),
(23, 4, 12, 'Basque Cheese Cake', 'basque-cheese-cake', 'products/1740056234333.jpg', 'Basque style Cheese cake with burnt cheese top, Spanish delicacy brought to perfection in India. Our chef\'s special and highly recommended. ', '', '', '', '[{\"kg\":\"0.5\",\"price\":\"750\"},{\"kg\":\"1\",\"price\":\"1250\"},{\"kg\":\"1.5\",\"price\":\"1875\"},{\"kg\":\"2\",\"price\":\"2500\"}]', '[\"\"]', 'true', 'false', 5, 1, 0, '2025-02-20 18:27:14', '0000-00-00 00:00:00'),
(24, 4, 12, 'Mango Cheese Cake', 'mango-cheese-cake', 'products/1740056303221.jpg', 'Soft Cheese cake baked with crunchy graham cracker base, topped with Mango pulp, garnished with freshly diced mangoes. This delicious cake is made fresh on order.', '', '', '', '[{\"kg\":\"0.5\",\"price\":\"750\"},{\"kg\":\"1\",\"price\":\"1450\"},{\"kg\":\"1.5\",\"price\":\"2150\"},{\"kg\":\"2\",\"price\":\"2850\"}]', '[\"\"]', 'true', 'false', 8, 1, 0, '2025-02-20 18:28:23', '0000-00-00 00:00:00'),
(25, 4, 13, 'Kaju Barfi Cake', 'kaju-barfi-cake', 'products/1740056382934.jpg', 'Tender, soft and tasty Kaju Barfi cake with added dry fruits. Desi Indian fusion flavors that will melt in your mouth. Our one of the top selling cakes to impress your Indian palate. Most loved by families and friends in get together.', '', '', '', '[{\"kg\":\"0.5\",\"price\":\"650\"},{\"kg\":\"1\",\"price\":\"1150\"},{\"kg\":\"1.5\",\"price\":\"1650\"},{\"kg\":\"2\",\"price\":\"2150\"}]', '[\"\"]', 'true', 'false', 12, 1, 0, '2025-02-20 18:29:42', '0000-00-00 00:00:00'),
(26, 4, 13, 'Gulab Jamun Cake', 'gulab-jamun-cake', 'products/1740056459964.jpg', 'Tender, soft and tasty Gulab jamun cake with loads of dry fruits. Desi Indian fusion flavors that will melt in your mouth. Our one of the top selling cakes to impress your Indian palate. Most loved by families and friends in get together.', '', '', '', '[{\"kg\":\"0.5\",\"price\":\"600\"},{\"kg\":\"1\",\"price\":\"1000\"},{\"kg\":\"1.5\",\"price\":\"1500\"},{\"kg\":\"2\",\"price\":\"2000\"}]', '[\"\"]', 'true', 'false', 10, 1, 0, '2025-02-20 18:30:59', '0000-00-00 00:00:00'),
(28, 4, 14, ' Mango Delight Cake', 'mango-delight-cake', 'products/1740056558399.jpg', 'Made fresh on order. This mango flavored cake is sure to take you to mango heaven and back.', '', '', '', '[{\"kg\":\"0.5\",\"price\":\"600\"},{\"kg\":\"1\",\"price\":\"950\"},{\"kg\":\"1.5\",\"price\":\"1375\"},{\"kg\":\"2\",\"price\":\"1900\"}]', '[\"\"]', 'true', 'false', 15, 1, 0, '2025-02-20 18:32:38', '0000-00-00 00:00:00'),
(29, 4, 14, 'Mango forever heart Cake d1', 'mango-forever-heart-cake-d1', 'products/1740131348896.jpg', 'Mango Heart cake eggless', '', '', '', '[{\"kg\":\"0.5\",\"price\":\"650\"},{\"kg\":\"1\",\"price\":\"1125\"},{\"kg\":\"1.5\",\"price\":\"1688\"},{\"kg\":\"2\",\"price\":\"2250\"}]', '[\"\"]', 'true', 'false', 8, 1, 0, '2025-02-21 15:19:08', '0000-00-00 00:00:00'),
(30, 4, 15, 'Coffee Mocha Cake', 'coffee-mocha-cake', 'products/1740131452961.jpg', 'Made with finest coffee and coffee flavored cake base for the coffee lover in you', '', '', '', '[{\"kg\":\"0.5\",\"price\":\"680\"},{\"kg\":\"1\",\"price\":\"1200\"},{\"kg\":\"1.5\",\"price\":\"1800\"},{\"kg\":\"2\",\"price\":\"2400\"}]', '[\"\"]', 'true', 'false', 9, 1, 0, '2025-02-21 15:20:52', '0000-00-00 00:00:00'),
(31, 4, 15, 'Choco Mocha Cake', 'choco-mocha-cake', 'products/1740131524914.jpg', 'Coffee mocha flavored chocolate cake', '', '', '', '[{\"kg\":\"0.5\",\"price\":\"680\"},{\"kg\":\"1\",\"price\":\"1200\"},{\"kg\":\"1.5\",\"price\":\"1800\"},{\"kg\":\"2\",\"price\":\"2400\"}]', '[\"\"]', 'true', 'false', 6, 1, 0, '2025-02-21 15:22:04', '0000-00-00 00:00:00'),
(32, 4, 16, 'Dry Fruit Mix Cake', 'dry-fruit-mix-cake', 'products/1740131654130.jpg', 'Indian Fusion Cake made with Cashews (Kaju), Almonds (Badam), and walnuts (Akhrot) to impress the Indian in you. It is best for traditional Indian celebrations.', '', '', '', '[{\"kg\":\"0.5\",\"price\":\"600\"},{\"kg\":\"1\",\"price\":\"900\"},{\"kg\":\"1.5\",\"price\":\"1400\"},{\"kg\":\"2\",\"price\":\"1800\"}]', '[\"\"]', 'true', 'false', 12, 1, 0, '2025-02-21 15:24:14', '0000-00-00 00:00:00'),
(33, 4, 16, 'Honey Almond Cake', 'honey-almond-cake', 'products/1740131805592.jpg', 'Vanilla cake made with assorted California almonds placed moderately both inside and outside the cake. Garnished with the goodness of honey.', '', '', '', '[{\"kg\":\"0.5\",\"price\":\"600\"},{\"kg\":\"1\",\"price\":\"1150\"},{\"kg\":\"1.5\",\"price\":\"1650\"},{\"kg\":\"2\",\"price\":\"2150\"}]', '[\"\"]', 'true', 'false', 2, 1, 0, '2025-02-21 15:26:45', '0000-00-00 00:00:00');

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
(1, 3, 'Custom Photo Cakes', 'categories/1739975285146.jpg', 'custom-photo-cakes', 1, 1, 0, '2025-02-19 19:58:05', '0000-00-00 00:00:00'),
(2, 3, 'Kids Photo Cakes', 'categories/1739975317992.jpg', 'kids-photo-cakes', 1, 1, 0, '2025-02-19 19:58:37', '0000-00-00 00:00:00'),
(3, 4, 'Pineapple Cakes', 'categories/1739975345828.jpg', 'pineapple-cakes', 1, 1, 0, '2025-02-19 19:59:05', '0000-00-00 00:00:00'),
(4, 4, 'Chocolate Cakes', 'categories/1739975368756.jpg', 'chocolate-cakes', 1, 1, 0, '2025-02-19 19:59:28', '0000-00-00 00:00:00'),
(5, 4, 'Vanilla Cakes', 'categories/1739975386979.jpg', 'vanilla-cakes', 1, 1, 0, '2025-02-19 19:59:46', '0000-00-00 00:00:00'),
(6, 4, 'Black Forest Cakes', 'categories/1739975409782.jpg', 'black-forest-cakes', 1, 1, 0, '2025-02-19 20:00:09', '0000-00-00 00:00:00'),
(7, 4, 'Butterscotch cakes', 'categories/1739975432134.jpg', 'butterscotch-cakes', 1, 1, 0, '2025-02-19 20:00:32', '0000-00-00 00:00:00'),
(8, 4, 'Strawberry Cakes', 'categories/1739975450133.jpg', 'strawberry-cakes', 1, 1, 0, '2025-02-19 20:00:50', '0000-00-00 00:00:00'),
(9, 4, 'Red Velvet Cakes', 'categories/1739975474862.jpg', 'red-velvet-cakes', 1, 1, 0, '2025-02-19 20:01:14', '0000-00-00 00:00:00'),
(10, 4, 'Blueberry Cakes', 'categories/1739975494365.jpg', 'blueberry-cakes', 1, 1, 0, '2025-02-19 20:01:34', '0000-00-00 00:00:00'),
(11, 4, 'Fruit Cakes', 'categories/1739975521853.jpg', 'fruit-cakes', 1, 1, 0, '2025-02-19 20:02:01', '0000-00-00 00:00:00'),
(12, 4, 'Cheese Cakes', 'categories/1739975614461.jpg', 'cheese-cakes', 1, 1, 0, '2025-02-19 20:03:34', '0000-00-00 00:00:00'),
(13, 4, 'Indian Fusion Cakes', 'categories/1739975704062.jpg', 'indian-fusion-cakes', 1, 1, 0, '2025-02-19 20:05:04', '0000-00-00 00:00:00'),
(14, 4, 'Mango Cakes', 'categories/1739975730037.jpg', 'mango-cakes', 1, 1, 0, '2025-02-19 20:05:30', '0000-00-00 00:00:00'),
(15, 4, 'Coffee Mocha Cakes', 'categories/1739975788413.jpg', 'coffee-mocha-cakes', 1, 1, 0, '2025-02-19 20:06:28', '0000-00-00 00:00:00'),
(16, 4, 'Dry Fruit Cakes', 'categories/1739975808926.jpg', 'dry-fruit-cakes', 1, 1, 0, '2025-02-19 20:06:48', '0000-00-00 00:00:00'),
(17, 5, 'Pastries', 'categories/1739975837532.jpg', 'pastries', 1, 1, 0, '2025-02-19 20:07:17', '0000-00-00 00:00:00'),
(18, 5, 'Puddings', 'categories/1739975854611.jpg', 'puddings', 1, 1, 0, '2025-02-19 20:07:34', '0000-00-00 00:00:00'),
(19, 5, 'Jar Cakes', 'categories/1739975877035.jpg', 'jar-cakes', 1, 1, 0, '2025-02-19 20:07:57', '0000-00-00 00:00:00'),
(20, 5, 'Tea Cakes', 'categories/1739975895173.jpg', 'tea-cakes', 1, 1, 0, '2025-02-19 20:08:15', '0000-00-00 00:00:00'),
(21, 6, 'Pinata Cakes', 'categories/1739975921476.jpg', 'pinata-cakes', 1, 1, 0, '2025-02-19 20:08:41', '0000-00-00 00:00:00'),
(22, 6, 'Mini Designer cakes', 'categories/1739975989514.jpg', 'mini-designer-cakes', 1, 1, 0, '2025-02-19 20:09:49', '0000-00-00 00:00:00'),
(23, 6, 'Pull Me Cakes', 'categories/1739976025242.jpg', 'pull-me-cakes', 1, 1, 0, '2025-02-19 20:10:25', '0000-00-00 00:00:00'),
(24, 6, 'Minion Cakes', 'categories/1739976045315.jpg', 'minion-cakes', 1, 1, 0, '2025-02-19 20:10:45', '0000-00-00 00:00:00'),
(25, 6, 'Baby Shower Cakes', 'categories/1739977309742.jpg', 'baby-shower-cakes', 1, 1, 0, '2025-02-19 20:31:49', '0000-00-00 00:00:00'),
(26, 6, 'Jungle Theme Cakes', 'categories/1739977337806.jpg', 'jungle-theme-cakes', 1, 1, 0, '2025-02-19 20:32:17', '0000-00-00 00:00:00'),
(27, 6, 'Princess Cakes', 'categories/1739977360062.jpg', 'princess-cakes', 1, 1, 0, '2025-02-19 20:32:40', '0000-00-00 00:00:00'),
(28, 6, 'Tier Cakes', 'categories/1739977386558.jpg', 'tier-cakes', 1, 1, 0, '2025-02-19 20:33:06', '0000-00-00 00:00:00'),
(29, 6, 'Cartoon Cakes', 'categories/1739977417277.jpg', 'cartoon-cakes', 1, 1, 0, '2025-02-19 20:33:37', '0000-00-00 00:00:00'),
(30, 6, 'Barbie Cakes', 'categories/1739977434087.jpg', 'barbie-cakes', 1, 1, 0, '2025-02-19 20:33:54', '0000-00-00 00:00:00'),
(31, 6, 'PUBG Cakes', 'categories/1739977454551.jpg', 'pubg-cakes', 1, 1, 0, '2025-02-19 20:34:14', '0000-00-00 00:00:00'),
(32, 6, 'Number Cakes', 'categories/1739977472662.jpg', 'number-cakes', 1, 1, 0, '2025-02-19 20:34:32', '0000-00-00 00:00:00'),
(33, 6, 'Rainbow Cakes', 'categories/1739977493662.jpg', 'rainbow-cakes', 1, 1, 0, '2025-02-19 20:34:53', '0000-00-00 00:00:00'),
(34, 6, 'Cricket Theme Cakes', 'categories/1739977513431.jpg', 'cricket-theme-cakes', 1, 1, 0, '2025-02-19 20:35:13', '0000-00-00 00:00:00'),
(35, 6, 'Super Hero Cakes', 'categories/1739977536415.jpg', 'super-hero-cakes', 1, 1, 0, '2025-02-19 20:35:36', '0000-00-00 00:00:00'),
(36, 6, 'Miniature Cakes', 'categories/1739977555045.jpg', 'miniature-cakes', 1, 1, 0, '2025-02-19 20:35:55', '0000-00-00 00:00:00'),
(37, 6, 'Car Cakes', 'categories/1739977573460.jpg', 'car-cakes', 1, 1, 0, '2025-02-19 20:36:13', '0000-00-00 00:00:00'),
(38, 6, 'Alphabet Cakes', 'categories/1739977593462.jpg', 'alphabet-cakes', 1, 1, 0, '2025-02-19 20:36:33', '0000-00-00 00:00:00'),
(39, 7, '1st Anniversary', 'categories/1739977636131.jpg', '1st-anniversary', 1, 1, 0, '2025-02-19 20:37:16', '0000-00-00 00:00:00'),
(40, 7, '25thAnniversary', 'categories/1739977655011.jpg', '25thanniversary', 1, 1, 0, '2025-02-19 20:37:35', '0000-00-00 00:00:00'),
(41, 7, '50thAnniversary', 'categories/1739977671986.jpg', '50thanniversary', 1, 1, 0, '2025-02-19 20:37:51', '0000-00-00 00:00:00'),
(42, 7, 'Heart Shape Cakes', 'categories/1739977688610.jpg', 'heart-shape-cakes', 1, 1, 0, '2025-02-19 20:38:08', '0000-00-00 00:00:00'),
(43, 7, 'Parents Anniversary', 'categories/1739977709432.jpg', 'parents-anniversary', 1, 1, 0, '2025-02-19 20:38:29', '0000-00-00 00:00:00'),
(44, 7, 'Couple Anniversary', 'categories/1739977730145.jpg', 'couple-anniversary', 1, 1, 0, '2025-02-19 20:38:50', '0000-00-00 00:00:00'),
(45, 8, '1st birthday cake', 'categories/1739977755727.jpg', '1st-birthday-cake', 1, 1, 0, '2025-02-19 20:39:15', '0000-00-00 00:00:00'),
(46, 8, 'Cakes for Her', 'categories/1739977775791.jpg', 'cakes-for-her', 1, 1, 0, '2025-02-19 20:39:35', '0000-00-00 00:00:00'),
(47, 8, 'Cakes for Kids', 'categories/1739977793630.jpg', 'cakes-for-kids', 1, 1, 0, '2025-02-19 20:39:53', '0000-00-00 00:00:00'),
(48, 8, 'Cakes for Him', 'categories/1739977813808.jpg', 'cakes-for-him', 1, 1, 0, '2025-02-19 20:40:13', '0000-00-00 00:00:00'),
(49, 8, 'Birthday Photo cakes', 'categories/1739977838046.jpg', 'birthday-photo-cakes', 1, 1, 0, '2025-02-19 20:40:38', '0000-00-00 00:00:00'),
(50, 8, 'Bomb Cake Collection', 'categories/1739977854694.jpg', 'bomb-cake-collection', 1, 1, 0, '2025-02-19 20:40:54', '0000-00-00 00:00:00'),
(51, 8, 'Half Cakes', 'categories/1739977874678.jpg', 'half-cakes', 1, 1, 0, '2025-02-19 20:41:14', '0000-00-00 00:00:00'),
(52, 9, 'Gifting', 'categories/1739977907248.jpg', 'gifting', 1, 1, 0, '2025-02-19 20:41:47', '0000-00-00 00:00:00'),
(53, 9, 'Candles & Toppers', 'categories/1739977932870.jpg', 'candles-toppers', 1, 1, 0, '2025-02-19 20:42:12', '0000-00-00 00:00:00'),
(54, 9, 'Caps', 'categories/1739977951494.jpg', 'caps', 1, 1, 0, '2025-02-19 20:42:31', '0000-00-00 00:00:00'),
(55, 9, 'Soft Toys', 'categories/1739977968958.jpg', 'soft-toys', 1, 1, 0, '2025-02-19 20:42:48', '0000-00-00 00:00:00'),
(56, 9, 'Action Figures', 'categories/1739977988374.jpg', 'action-figures', 1, 1, 0, '2025-02-19 20:43:08', '0000-00-00 00:00:00'),
(57, 9, 'Flowers', 'categories/1739978012478.jpg', 'flowers', 1, 1, 0, '2025-02-19 20:43:32', '0000-00-00 00:00:00'),
(58, 9, 'Balloons & Banners', 'categories/1739978038646.jpg', 'balloons-banners', 1, 1, 0, '2025-02-19 20:43:58', '0000-00-00 00:00:00'),
(59, 9, 'Goggles', 'categories/1739978060550.jpg', 'goggles', 1, 1, 0, '2025-02-19 20:44:20', '0000-00-00 00:00:00'),
(60, 9, 'Fun Props', 'categories/1739978077151.jpg', 'fun-props', 1, 1, 0, '2025-02-19 20:44:37', '0000-00-00 00:00:00'),
(61, 9, 'Greeting Cards', 'categories/1739978095951.jpg', 'greeting-cards', 1, 1, 0, '2025-02-19 20:44:55', '0000-00-00 00:00:00');

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
-- AUTO_INCREMENT for table `tbl_cart`
--
ALTER TABLE `tbl_cart`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_categories`
--
ALTER TABLE `tbl_categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `tbl_child_categories`
--
ALTER TABLE `tbl_child_categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `tbl_products`
--
ALTER TABLE `tbl_products`
  MODIFY `id` int(25) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT for table `tbl_sub_categories`
--
ALTER TABLE `tbl_sub_categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=62;

--
-- AUTO_INCREMENT for table `tbl_users`
--
ALTER TABLE `tbl_users`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
