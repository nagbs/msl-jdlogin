<?php
chdir(dirname(__file__));
include_once('../conf/credentials.php');

mysql_connect(CLIENT_DB_HOST,CLIENT_DB_USER,CLIENT_DB_PASSWORD);
mysql_select_db(CLIENT_DB_NAME);

$jobs_sql = "select om_job_no, pub_name, om_revision_cnt from orders_main_info 
		join publishers on (pub_id = om_site_id and pub_corp_id='3')
			where om_submit_dt>'2013-10-01 00:00:00' and om_revision_cnt>0";

$jobs_res = mysql_query($jobs_sql);

?>
<table border="1" cellspacing="0" cellpadding="0">
<tr>
<th>JobNo</th>
<th>JobRevision</th>
<th>FileRevision</th>
<th>RevisionsAvail</th>
</tr>
<?

while($jobs_row = mysql_fetch_array($jobs_res))
{
	extract($jobs_row);

	$job_revision = $om_revision_cnt+1;

	$check_job_files_sql = "select distinct oof_revision from order_output_files where oof_job_no='$om_job_no'";
	
	$check_job_files_res = mysql_query($check_job_files_sql);

	$file_revision = array();

	while($job_files_row = mysql_fetch_array($check_job_files_res))
	{
		$file_revision[] = $job_files_row['oof_revision']; 
	}

	$file_revision_cnt = count($file_revision);

	if($file_revision_cnt != $job_revision)
	{
?>
		<tr>
			<td><? echo $om_job_no;?></td>
			<td><? echo $job_revision;?></td>
			<td><? echo $file_revision_cnt;?></td>
			<td><? echo implode(",",$file_revision);?></td>
		</tr>
<?
	}
}
?>
</table>
