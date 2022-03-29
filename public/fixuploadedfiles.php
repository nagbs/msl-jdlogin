<?php
ini_set('display_errors',0);
error_reporting(0);
chdir(dirname(__file__));
include_once('../conf/credentials.php');

mysql_connect(CLIENT_DB_HOST,CLIENT_DB_USER,CLIENT_DB_PASSWORD);
mysql_select_db(CLIENT_DB_NAME);


$jobs_sql = "SELECT om_job_no, concat(om_site_id,'/',date_format(om_submit_dt,'%Y%m%d'),'/',om_job_no,'/output/',if(om_ord_type=1,'print','web'),'/V',oof_version,'/R',oof_revision) as filepath, oof_filename,om_ord_type, oof_uploaded_time
FROM `order_output_files`
join orders_main_info on (om_job_no = oof_job_no)
join orders_main on (ord_job_no = oof_job_no)
WHERE oof_uploaded_time >= '2013-10-16 00:00:00' and oof_filename not in ('','_2.','_4.','_1.','_12.')
ORDER BY `order_output_files`.`oof_uploaded_time` DESC";

$jobs_res = mysql_query($jobs_sql);

$file_source_path = "/data/jobs";

$temp_file_path = "/var/www/jd3/prod/data/uploads";

?>
<table border="1" cellspacing="0" cellpadding="0">
<tr>
<th>JobNo</th>
<th>File</th>
<th>PhysicalFile</th>
<th>UploadedTime</th>
<th>PhysicalFileTime</th>
<th>FilePath</th>
</tr>

<?

while($jobs_row = mysql_fetch_array($jobs_res))
{
	extract($jobs_row);

	$destination_file_path = $file_source_path.'/'.$filepath;

	if(!file_exists($destination_file_path.'/'.$oof_filename))
        {

		$physical_file = array();

		chdir($temp_file_path);
		$find_file = "locate \"$oof_filename\"";
		exec($find_file, $physical_file);

	?>
	<tr>
		<td><? echo $om_job_no;?></td>
		<td><? echo $oof_filename;?></td>
		<td><? echo $physical_file[0];?></td>
		<td><? echo $oof_uploaded_time;?></td>
		<td><? echo date('Y-m-d H:i:s',filemtime($physical_file[0]));?></td>
		<td><? echo $filepath;?>
	</tr>
	<?
		/*$mkdir_cmd = "mkdir -p $destination_file_path";

		exec($mkdir_cmd);

		$physical_file_path = $physical_file[0];


		$cpy_cmd = "cp \"$physical_file_path\" $destination_file_path";
		exec($cpy_cmd);
		exec("chmod -R 777 $destination_file_path");*/
	}
}
?>
</table>
