<?php
$host = "adpro-core-db.cpoudns9on4k.us-east-1.rds.amazonaws.com";
$user = "jddmlusr";
$password = "KJdvtqR43";
$database = "jdclient";

define('DB_HOST',"adpro-core-db.cpoudns9on4k.us-east-1.rds.amazonaws.com");
define('DB_USER','jddmlusr');
define('DB_PWD','KJdvtqR43');
define('DB_NAME','jdclient');

define('REPORT_HOST',"localhost");
define('REPORT_USER','jduser');
define('REPORT_PWD','jDcom1u$er');
define('REPORT_DB','jdclient');

mysql_connect($host,$user,$password);
mysql_select_db($database);
