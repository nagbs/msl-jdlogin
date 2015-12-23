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
include_once('../application/v31/models/JD/CommonFunctions.php');

$path = TEMP_JOBS_PATH.$_POST['tmp_folder_path'];

$common_fn_obj = new JD_CommonFunctions();

if(!is_dir($path))
{
	mkdir($path, 0777, true);
}

foreach($_FILES['file']['name'] as $file_key => $file_name)
{
	//$file_name = str_replace("[","_",$file_name);
	//$file_name = str_replace("]","_",$file_name);

	$file_name = str_replace("'", '_', $file_name);

	$pattern='/[^a-zA-Z0-9._-]/i';

	$file_name = preg_replace($pattern, '_', $file_name);
/*
if(substr_count($file_name,'C__fakepath_')>0)
{
	$file_name = str_replace('C__fakepath_','',$file_name);
}
*/
	$file = $path.'/'.$file_name;

	$log_content = "Before moving to temp path\n File name:".$file."\n";
	$common_fn_obj->fileUploadLog($log_content);

	move_uploaded_file($_FILES['file']['tmp_name'][$file_key], $file);


?>
<html>
<body>
<script type="text/javascript">
window.parent.setSize('<?php echo $_POST['APC_UPLOAD_PROGRESS'];?>','<?php echo $_FILES['file']['size'][$file_key];?>');
</script>
</body>
</html>
<?
}

?>
