<?php
ini_set('display_errors',0);
error_reporting(0);
mysql_connect("192.168.100.187",'clientaccess','clientpwd');
mysql_select_db("2adpro");


$jobs_sql = "SELECT om_job_no, concat(om_site_id,'/',date_format(om_submit_dt,'%Y%m%d'),'/',om_job_no,'/input/') as filepath, oif_filename,om_ord_type, oif_date
FROM `order_input_files`
join orders_main_info on (om_job_no = oif_job_no and om_creation_source='1')
join orders_main on (ord_job_no = oif_job_no and ord_is_jd3_order='1')
WHERE oif_date >= '2013-12-01 00:00:00' and oif_date<='2013-12-14 00:00:00'
ORDER BY `oif_date` DESC";

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

	if(!file_exists($destination_file_path.'/'.stripslashes($oif_filename)))
        {

		$physical_file = array();

		chdir($temp_file_path);
		$find_file = "locate \"$oif_filename\"";
		exec($find_file, $physical_file);

	?>
	<tr>
		<td><? echo $om_job_no;?></td>
		<td><? echo $oif_filename;?></td>
		<td><? echo $physical_file[0];?></td>
		<td><? echo $oif_date;?></td>
		<td><? echo date('Y-m-d H:i:s',filemtime($physical_file[0]));?></td>
		<td><? echo $filepath;?>
	</tr>
	<?
	
	}
}
?>
</table>
