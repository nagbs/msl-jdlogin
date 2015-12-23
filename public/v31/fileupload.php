<?php 
ini_set('display_errors',0);
error_reporting(0);
/**
 * This file is upload xls/xlsx files
 * 
 * 
 */
//echo $_SERVER['DOCUMENT_ROOT'];exit;
$fileName = $_FILES["file"]["name"];
$tempName =  $_FILES["file"]["tmp_name"];
//$upload_dir = $_SERVER['DOCUMENT_ROOT'];// . "/images/bulkOrderFiles/" . $fileName;
$upload_dir = '/mnt/das/2adpro.com/jd3/prod/data/uploads/'.$fileName;
$moveResult = move_uploaded_file($tempName,$upload_dir);
if ($moveResult == true) {
	$result = "SUCCESS";
	chmod($upload_dir, 0777);
} else {
	$result = "ERROR";
}

?>
<script type="text/javascript">
window.parent.showMessage('<?php echo $result;?>');
</script>
