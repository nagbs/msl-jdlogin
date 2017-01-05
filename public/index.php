<?php
$env = 'development';
// development Section
ini_set('display_errors',0);
error_reporting(0);
/*----------Set App Path & App Environment-------*/
// Define path to application directory
defined('APPLICATION_ENV') || define('APPLICATION_ENV', (getenv('APPLICATION_ENV') ? getenv('APPLICATION_ENV') : $env));

/*----------Set ini memory_limit & Default Timezone -------*/
ini_set('memory_limit','128M');
date_default_timezone_set('America/Phoenix');

/*----------Set Include path to Zend Library and application controllers, modules-------*/
set_include_path ('.' . PATH_SEPARATOR . '../library/' . PATH_SEPARATOR . '../application/models/' . PATH_SEPARATOR . get_include_path());

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

ini_set('session.cookie_domain', SESSION_COOKIE_DOMAIN );
include_once('../application/includes/session_mysql.php');
session_start();


// Define path to application directory
defined('APPLICATION_PATH') || define('APPLICATION_PATH', realpath(dirname(__FILE__) . '/../application'));

set_include_path ('.' . PATH_SEPARATOR . '../library/' . PATH_SEPARATOR . '../application/models/' . PATH_SEPARATOR . get_include_path());

//45.56.122.248 -> eproofjd-qc.2adpro.com
//45.56.122.248 -> jdxproof-qc.2adpro.com
//52.70.138.176 -> eproofjd.2adpro.com
//52.207.79.142 -> jdxproof.com

if( !((substr_count($_SERVER['REQUEST_URI'],'orders/downloadallfiles')!=0
    || substr_count($_SERVER['REQUEST_URI'],'file/download')!=0
	|| substr_count($_SERVER['REQUEST_URI'],'file/filesize')!=0
	|| substr_count($_SERVER['REQUEST_URI'],'file/preview')!=0
	|| substr_count($_SERVER['REQUEST_URI'],'orders/emailproofget')!=0
    || substr_count($_SERVER['REQUEST_URI'],'/profile/contactphoto') != 0
	|| substr_count($_SERVER['REQUEST_URI'],'/Serverstatus/serveravailability') != 0
	|| substr_count($_SERVER['REQUEST_URI'],'/chk_session.php') != 0) 
	&& (stripos($_SERVER['HTTP_REFERER'],'2adpro.com') !== FALSE || stripos($_SERVER['HTTP_REFERER'],'jdxproof.com') !== FALSE
		 || $_SERVER['REMOTE_ADDR'] == '52.207.79.142' || $_SERVER['REMOTE_ADDR'] == '52.70.138.176'
		 || $_SERVER['REMOTE_ADDR'] == '45.56.122.248' || $_SERVER['REMOTE_ADDR'] == '45.56.122.248'))
)
{
                include_once('../application/includes/checksessionstate.php');
}

$_SESSION['system']='JD';

/*----------Instantiate Front Controller and set up controllers directory---------*/
$frontController = Zend_Controller_Front::getInstance();
$frontController->throwExceptions(true);

$frontController->setControllerDirectory('../application/controllers');

header("Connection: Keep-Alive");
header("Keep-Alive: timeout=300");

if(substr_count($_SERVER['REQUEST_URI'],'/view/index')>0)
{
	if(substr_count($_SERVER['REQUEST_URI'],'/auth/')==0)
	{
		//$frontController->registerPlugin(new JD_MyPlugin());		
	}
	
	Zend_Layout::startMvc(array('layoutPath'=>'../application/layouts'));
	
}	
	
try{
	$frontController->dispatch();
}
catch(Zend_Exception $ze)
{
	echo $ze->getMessage();
}
