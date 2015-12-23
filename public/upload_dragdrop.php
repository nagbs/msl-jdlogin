<?php
/**
 * PHP Real Ajax Uploader
 * Copyright @Alban Xhaferllari
 * albanx@gmail.com
 * www.albanx.com
 */
ini_set('memory_limit','1024M');
ini_set("display_errors",0);
error_reporting(E_ALL);//remove notice for json invalidation

set_include_path ('.' . PATH_SEPARATOR . '../library/' . PATH_SEPARATOR . '../application/models/' . PATH_SEPARATOR . get_include_path());

include_once('../conf/db_tables.php');
include_once('../conf/conf.php');

$file_name = (isset($_SERVER['HTTP_X_FILENAME']) ? $_SERVER['HTTP_X_FILENAME'] : false);

$path = TEMP_JOBS_PATH.$_SERVER['HTTP_X_TMPPATH'];


if(!is_dir($path))
{
	mkdir($path, 0777, true);
}

if ($file_name) 
{
	$pattern='/[^a-zA-Z0-9._-]/i';

        $file_name = preg_replace($pattern, '_', $file_name);
	// AJAX call
	file_put_contents($path .'/'. $file_name,file_get_contents('php://input'));	
	exit();
}
