<?php
ini_set('display_errors','On');
error_reporting(E_ALL);
define('SERVICE_HTTP_PATH','http://jdws.2adpro.com');
require(dirname(__DIR__).'/application/v31/models/JD/RestService.php');
echo dirname(__DIR__).'/application/v31/models/JD/RestService.php';
$restService = new JD_RestService(SERVICE_HTTP_PATH,'kdemo','password',1);
$data = array();
$data =
array('system'=>'SM','site'=>'2adpro demo for Media(Chennai)','field'=>'Ad Category','ord_type'=>'','output_type'=>'','product'=>'');
$restService->requestName = 'fieldvalues';
$restService->requestData = 'Ad Category';
$restService->requestType = 'html';
$restService->responseType = 'json';
$restService->querydata = $data;
$restService->getData();
print_r($restService);
