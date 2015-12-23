<?php
$env = 'development';
// development Section
ini_set('display_errors',0);
error_reporting(0);

/*----------Set App Path & App Environment-------*/
// Define path to application directory
defined('APPLICATION_ENV') || define('APPLICATION_ENV', (getenv('APPLICATION_ENV') ? getenv('APPLICATION_ENV') : $env));

/*----------Set Include path to Zend Library and application controllers, modules-------*/
set_include_path ('.' . PATH_SEPARATOR . '../library/' . PATH_SEPARATOR . '../application/models/' . PATH_SEPARATOR . get_include_path());

include_once('../conf/db.conf.php');
include_once('../conf/db_tables.php');
include_once('../conf/conf.php');

/*----------Include and register autoload *  Zend Loader-------*/
include "Zend/Loader/Autoloader.php";
$autoloader = Zend_Loader_Autoloader::getInstance();
$autoloader->registerNamespace(array('Zend_', 'JD_', 'JD2_', 'PHPExcel', 'PHPExcel_'));

/*----------Initialize Database---------------------*/
$pdoParams = array(
    PDO::MYSQL_ATTR_USE_BUFFERED_QUERY => true
);
//To Set Configuration value...
$config  = new Zend_Config_Ini("../application/configs/application.ini", APPLICATION_ENV);
$configArray = $config->toArray();
$adapter = $configArray['resources']['db']['adapter'];
$params = $configArray['resources']['db']['params'];
$params['driver_options'] = $pdoParams;

$params = array(
    'host'           => DB_HOST,
    'username'       => DB_USER,
    'password'       => DB_PWD,
    'dbname'         => DB_NAME,
    'driver_options' => $pdoParams
);

$db = Zend_Db::factory('Pdo_Mysql', $params);
Zend_Db_Table::setDefaultAdapter($db);

//ini_set('session.cookie_domain', '' );
include_once('../application/includes/session_mysql.php');
session_start();

// Define path to application directory
defined('APPLICATION_PATH') || define('APPLICATION_PATH', realpath(dirname(__FILE__) . '/../application'));

set_include_path ('.' . PATH_SEPARATOR . '../library/' . PATH_SEPARATOR . '../application/models/' . PATH_SEPARATOR . get_include_path());

//include_once('../application/includes/checksessionstate.php');
//print_r($_SESSION); exit;
if($_SESSION['UserId'] != '')
{
	echo "0";
}
else
{
	echo "1";
}
?>
