<?php
ini_set('display_errors',1);
error_reporting(E_ALL);

function restcall($url,$vars) {
 $headers = array(
 	'Accept : application/json',
 	'Content-Type : application/json'
 );
 
 $postvars = array('data'=>json_encode($vars));
 $data = http_build_query($postvars);
 
//$data = $vars;
 
 $handle = curl_init();
 curl_setopt($handle, CURLOPT_URL, $url);
 curl_setopt($handle, CURLOPT_HTTPHEADER, $headers);
 curl_setopt($handle, CURLOPT_RETURNTRANSFER, true); 
 
 curl_setopt($handle, CURLOPT_CUSTOMREQUEST, "PUT");
 curl_setopt($handle, CURLOPT_POSTFIELDS, $data);
 
 $response = curl_exec($handle);
 //print_r($response);
 $code = curl_getinfo($handle, CURLINFO_CONTENT_TYPE);
 return $response;
}

$input = array("Name" => "Manoj Kumar",
				"Details" => array("Age" => 28, "Occupation" => "IT/Software" ));

//$input = json_encode($input);

$result = restCall("http://jd3services.localhost/index/1/json",$input);
//echo "<pre>";
header("Content-Type:application/json");
echo $result;
//print_r(json_decode($result));
?>
