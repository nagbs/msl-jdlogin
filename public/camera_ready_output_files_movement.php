<?php
ini_set("display_errors",1);
error_reporting(E_ALL);

//set_include_path ('.' . PATH_SEPARATOR . '../library/' . PATH_SEPARATOR . '../application/models/' . PATH_SEPARATOR . get_include_path());
//set_include_path(get_include_path().PATH_SEPARATOR.'/var/www/svn/jd/library/'.PATH_SEPARATOR.'/var/www/svn/jd/application/models/'. PATH_SEPARATOR . get_include_path());

define('SERVICE_HTTP_PATH','http://jdws.2adpro.com');
define('JOBS_PATH', '/mnt/das/2adpro.com/sources/jobs/');
define('TEMP_JOBS_PATH', '/mnt/das/2adpro.com/jd3/prod/data/uploads/');

include_once('/mnt/das/2adpro.com/jd3/prod/public/restclients/models/RestService.php');


$query_data['form_action'] = "CameraReadyOrders"; 

$rest_obj = new RestService(SERVICE_HTTP_PATH, 'demouser1', '51ac731a0aba2');
$rest_obj->requestName = 'orders';
$rest_obj->requestData = '1';
$rest_obj->requestType = "html";
$rest_obj->responseType = "json";
$rest_obj->querydata = $query_data;
$rest_obj->getData();
$rest_obj->response;
$return = (array) $rest_obj->response;

$tmpZipDir = TEMP_JOBS_PATH;
foreach($return as $jobdetails)
{
	$zipName_original = $jobdetails->TrackingNo.'.zip';
	$rand=md5(microtime().rand(0,999999));
	$zipName=$rand."_".$zipName_original;

	//$tmpJobPath =  TEMP_JOBS_PATH.$jobdetails->JobNo."_".$rand.'/'.$jobdetails->JobNo;

	//$copy_all_files_cmd = "cd $jobdetails->JobInputPath/* $tmpJobPath/";
	//exec($copy_all_files_cmd);

	$tempzipname = TEMP_JOBS_PATH.$zipName;
	$copy_dir_path = JOBS_PATH.$jobdetails->JobFilePath.'/input/';
	$zip_cmd = "cd $copy_dir_path && zip -r $tempzipname *";
	exec($zip_cmd);
	chmod($tempzipname,0777);

	$to_path = JOBS_PATH.$jobdetails->JobFilePath.'/output';
        if (!is_dir($to_path))
        {
       		mkdir($to_path,0777);
                chmod($to_path,0777);
                chown($to_path,"$owner");
        }

	$to_path = JOBS_PATH.$jobdetails->JobFilePath.'/output/'.$jobdetails->JobOrderType;
        if (!is_dir($to_path))
        {
                mkdir($to_path,0777);
                chmod($to_path,0777);
                chown($to_path,"$owner");
        }

	$to_path = JOBS_PATH.$jobdetails->JobFilePath.'/output/'.$jobdetails->JobOrderType.'/V1';
        if (!is_dir($to_path))
        {
                mkdir($to_path,0777);
                chmod($to_path,0777);
                chown($to_path,"$owner");
        }

	$to_path = JOBS_PATH.$jobdetails->JobFilePath.'/output/'.$jobdetails->JobOrderType.'/V1/R0';
        if (!is_dir($to_path))
        {
                mkdir($to_path,0777);
                chmod($to_path,0777);
                chown($to_path,"$owner");
        }

	$to_path = $to_path.'/'.$zipName_original;
	$move_dir = "mv $tempzipname $to_path";
        exec($move_dir);


	$remove_dir = "rm -rf $tempzipname";	
	exec($remove_dir);
}
exit();
?>
