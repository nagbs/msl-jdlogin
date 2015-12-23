<?php
ini_set('display_errors',0);
error_reporting(E_ALL);

define('SERVICE_HTTP_PATH','http://svc.qc.2adpro.com');

set_include_path(get_include_path().PATH_SEPARATOR.'/home/manoj/htdocs/jd3ws/public/restclients');

include_once('models/RestService.php');

$restService = new RestService(SERVICE_HTTP_PATH,'managetest','509104445e353');

$data = array();

$data = array("FROM_TO_DATE"=>"2013-04-25 00:00:00::2013-05-09 23:59:59",
				"Date Type" => "Submit Date",
				"Report"=>"AdDetail");

$restService->requestName = 'report';
$restService->requestData = '';
$restService->requestType = 'html';
$restService->responseType = 'json';
$restService->requestParams = $data;

$restService->listData();


$orders = $restService->response->Orders;

$filename = "Ad_detail_report.xls";

header("Pragma: no-cache");
header("Content-Type: application/vnd.ms-excel");
header("Content-Disposition: attachment; filename=$filename");
header("Expires: 0");

$header = "Corporate\tSite\tTrackingNo\tJobNo\tOrderType\tAdvertiser\tNew/Revision\tRevisionCount\tSubmitDate\tDueDate\tStatus\tAdCategory\tSubmittedBy\t";
$header .= "PublicationTitle\tDeliveryOption\tPrintProduct\tPrintType\tPrintAdditionalVersions\tWebProduct\tWebType\tWebAdditionalVersions\tMobileProduct\ttMobileType\tMobileAdditionalVersions\n";
echo $header;
foreach($orders as $jobno => $jDetails)
{
	$jobDetails = $jDetails->Orders->$jobno;
	
	$row = $jobDetails->OrderInformation->Corporate."\t";
	$row .= $jobDetails->OrderInformation->Site."\t";
	$row .= $jobDetails->OrderInformation->Tracking_No."\t";
	$row .= $jobno."\t";
	$row .= $jobDetails->OrderInformation->Order_Type."\t";
	$row .= $jobDetails->OrderInformation->Advertiser."\t";
	
	if($jobDetails->OrderInformation->RevisionCount==0)
	{
		$row .= "NewOrder"."\t";
	}
	else
	{
		$row .= "Revision"."\t";
	}
	
	
	$row .= $jobDetails->OrderInformation->RevisionCount."\t";
	$row .= $jobDetails->OrderInformation->Submit_Date."\t";
	$row .= $jobDetails->OrderInformation->Due_Date."\t";
	$row .= $jobDetails->OrderInformation->Status."\t";
	$row .= $jobDetails->OrderInformation->Ad_Category."\t";
	
	$row .= $jobDetails->OrderInformation->Submit_by."\t";
	$row .= $jobDetails->OrderInformation->Publication_Title."\t";
	$row .= $jobDetails->OrderInformation->Delivery_Date."\t";
	
	$row .= $jobDetails->PrintSpecifications->{1}->Product."\t";
	$row .= $jobDetails->PrintSpecifications->{1}->Type."\t";
	$row .= $jobDetails->PrintSpecifications->{1}->Additional_Versions."\t";
	$row .= $jobDetails->DigitalSpecifications->{1}->Product."\t";
	$row .= $jobDetails->DigitalSpecifications->{1}->Type."\t";
	$row .= $jobDetails->DigitalSpecifications->{1}->Additional_Versions."\t";
	
	$row .= $jobDetails->MobileSpecifications->{1}->Product."\t";
	$row .= $jobDetails->MobileSpecifications->{1}->Type."\t";
	$row .= $jobDetails->MobileSpecifications->{1}->Additional_Versions."\t";
	
	$row .= "\n";
	
	echo $row;
}

