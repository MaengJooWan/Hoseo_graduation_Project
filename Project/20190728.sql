-- --------------------------------------------------------
-- 호스트:                          127.0.0.1
-- 서버 버전:                        8.0.16 - MySQL Community Server - GPL
-- 서버 OS:                        Win64
-- HeidiSQL 버전:                  10.1.0.5464
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- fiveg 데이터베이스 구조 내보내기
CREATE DATABASE IF NOT EXISTS `fiveg` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `fiveg`;

-- 테이블 fiveg.monthly_receiving_volume 구조 내보내기
CREATE TABLE IF NOT EXISTS `monthly_receiving_volume` (
  `year` varchar(50) DEFAULT NULL,
  `num` varchar(50) DEFAULT NULL,
  `num1` varchar(50) DEFAULT NULL,
  `num2` varchar(50) DEFAULT NULL,
  `num3` varchar(50) DEFAULT NULL,
  `num4` varchar(50) DEFAULT NULL,
  `num5` varchar(50) DEFAULT NULL,
  `num6` varchar(50) DEFAULT NULL,
  `num7` varchar(50) DEFAULT NULL,
  `num8` varchar(50) DEFAULT NULL,
  `num9` varchar(50) DEFAULT NULL,
  `num10` varchar(50) DEFAULT NULL,
  `num11` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 테이블 데이터 fiveg.monthly_receiving_volume:~0 rows (대략적) 내보내기
/*!40000 ALTER TABLE `monthly_receiving_volume` DISABLE KEYS */;
INSERT IGNORE INTO `monthly_receiving_volume` (`year`, `num`, `num1`, `num2`, `num3`, `num4`, `num5`, `num6`, `num7`, `num8`, `num9`, `num10`, `num11`) VALUES
	('2019', '50500', '50541', '5204532', '45645', '54677', '13245', '43434', '789789', '546343', '1314', '456547', '25564'),
	('2018', '40524', '50541', '5204532', '45645', '54677', '13245', '43434', '789789', '546343', '1314', '456547', '25564');
/*!40000 ALTER TABLE `monthly_receiving_volume` ENABLE KEYS */;

-- 테이블 fiveg.notice 구조 내보내기
CREATE TABLE IF NOT EXISTS `notice` (
  `TITLE` varchar(100) DEFAULT NULL,
  `CONTENT` varchar(500) DEFAULT NULL,
  `WRITER` varchar(50) DEFAULT NULL,
  `DATE` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 테이블 데이터 fiveg.notice:~10 rows (대략적) 내보내기
/*!40000 ALTER TABLE `notice` DISABLE KEYS */;
INSERT IGNORE INTO `notice` (`TITLE`, `CONTENT`, `WRITER`, `DATE`) VALUES
	('공지사항', '내용입니다.', '관리자', '2019-07-13'),
	('공지사항', '내용입니다.', '관리자', '2019-07-15'),
	('공지사항', '내용입니다.', '관리자', '2019-07-14'),
	('공지사항', '내용입니다.', '관리자', '2019-07-16'),
	('공지사항', '내용입니다.', '관리자', '2019-07-17'),
	('공지사항', '내용입니다.', '관리자', '2019-07-11'),
	('공지사항', '내용입니다.', '관리자', '2019-07-10'),
	('공지사항', '내용입니다.', '관리자', '2019-07-09'),
	('공지사항', '내용입니다.', '관리자', '2019-07-08'),
	('공지사항', '내용입니다.', '관리자', '2019-07-07');
/*!40000 ALTER TABLE `notice` ENABLE KEYS */;

-- 테이블 fiveg.orders_item 구조 내보내기
CREATE TABLE IF NOT EXISTS `orders_item` (
  `name` varchar(100) DEFAULT NULL,
  `quantity` varchar(100) DEFAULT NULL,
  `company` varchar(100) DEFAULT NULL,
  `explanation` varchar(500) DEFAULT NULL,
  `img_name` varchar(500) DEFAULT NULL,
  `file_name` varchar(500) DEFAULT NULL,
  `inspector` varchar(100) DEFAULT NULL,
  `approver` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 테이블 데이터 fiveg.orders_item:~1 rows (대략적) 내보내기
/*!40000 ALTER TABLE `orders_item` DISABLE KEYS */;
INSERT IGNORE INTO `orders_item` (`name`, `quantity`, `company`, `explanation`, `img_name`, `file_name`, `inspector`, `approver`) VALUES
	('사과', '205', '푸르츠', '사과 발주 내용입니다.', '12.jpg', '김민수_분산형 수중관측 제어망 주간담당 업무보고_190510.hwp', '방문자', 'ms6681');
/*!40000 ALTER TABLE `orders_item` ENABLE KEYS */;

-- 테이블 fiveg.user 구조 내보내기
CREATE TABLE IF NOT EXISTS `user` (
  `ID` varchar(50) DEFAULT NULL,
  `PWD` varchar(100) DEFAULT NULL,
  `EMAIL` varchar(50) DEFAULT NULL,
  `NAME` varchar(50) DEFAULT NULL,
  `CHECK_E` varchar(5) DEFAULT NULL,
  `POWER` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 테이블 데이터 fiveg.user:~1 rows (대략적) 내보내기
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT IGNORE INTO `user` (`ID`, `PWD`, `EMAIL`, `NAME`, `CHECK_E`, `POWER`) VALUES
	('ms6681', 'jk8681', 'plusstep_@naver.com', '김민수', '1', 1),
	('ms8681', 'jk8681', 'plusstep_@naver.com', '김민수', '1', 1);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;

-- 테이블 fiveg.warehousing 구조 내보내기
CREATE TABLE IF NOT EXISTS `warehousing` (
  `large_category` varchar(50) DEFAULT NULL COMMENT '대분류',
  `small_category` varchar(50) DEFAULT NULL COMMENT '소분류',
  `name` varchar(50) DEFAULT NULL COMMENT '이름',
  `unique_number` varchar(50) DEFAULT NULL COMMENT '고유번호',
  `quantity` varchar(50) DEFAULT NULL COMMENT '수량',
  `quantity_plus` varchar(50) DEFAULT NULL,
  `quantity_minus` varchar(50) DEFAULT NULL,
  `receiving_date` date DEFAULT NULL COMMENT '입고날짜',
  `effective_date` date DEFAULT NULL,
  `forwarding_date` date DEFAULT NULL COMMENT '출고날짜',
  `explanation` varchar(5000) DEFAULT NULL COMMENT '설명',
  `inspector` varchar(50) DEFAULT NULL,
  `item_inspection` int(11) DEFAULT NULL COMMENT '품질체크'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 테이블 데이터 fiveg.warehousing:~8 rows (대략적) 내보내기
/*!40000 ALTER TABLE `warehousing` DISABLE KEYS */;
INSERT IGNORE INTO `warehousing` (`large_category`, `small_category`, `name`, `unique_number`, `quantity`, `quantity_plus`, `quantity_minus`, `receiving_date`, `effective_date`, `forwarding_date`, `explanation`, `inspector`, `item_inspection`) VALUES
	('과일', '국내과일', '감귤', '000001', '152', '50', '32', '2019-07-16', '2019-07-16', '2019-07-18', '난 이거얏', 'ms6681', 1),
	('과일', '국내과일', '사과', '000002', '100', '10', '45', '2019-07-15', '2019-07-15', '2019-07-15', '체크되지 못했습니다.', NULL, 0),
	('과일', '국내과일', '배', '000003', '700', '30', '231', '2019-07-14', '2019-07-14', '2019-07-15', '체크되지 못했습니다.', NULL, 0),
	('과일', '국내과일', '수박', '000004', '250', '112', '50', '2019-07-13', '2019-07-13', '2019-07-15', '체크되지 못했습니다.', NULL, 0),
	('과일', '국내과일', '참외', '000005', '500', '75', '54', '2019-07-12', '2019-07-12', '2019-07-14', '참외가 참 맛있네요.', 'ms6681', 1),
	('과일', '국내과일', '딸기', '000006', '800', '123', '65', '2019-07-11', '2019-07-11', '2019-07-17', '체크되지 못했습니다.', NULL, 0),
	('과일', '국내과일', '포도', '000007', '300', '475', '88', '2019-07-10', '2019-07-19', '2019-07-13', '체크되지 못했습니다.', NULL, 0),
	('과일', '국내과일', '사과', '000008', '100', NULL, NULL, '2019-07-18', '2019-07-18', NULL, '체크되지 못했습니다.', NULL, 0),
	(NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
/*!40000 ALTER TABLE `warehousing` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
