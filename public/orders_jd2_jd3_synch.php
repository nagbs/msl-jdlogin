<?php
include_once('/mnt/das/2adpro.com/jd3/prod3/conf/db.conf.php');
ini_set('display_errors',1);
error_reporting(E_ALL);

function safeEscapeString($string)
{

	if (get_magic_quotes_gpc()) {return $string; }

	else { return mysql_real_escape_string($string); }

}

function getProductId($site_id, $prd_id, $ord_type)
{
	$get_product_name_sql = "select prd_desc prd_name from products where prd_id='$prd_id' and prd_pub_id='$site_id' and ord_type='$ord_type'";
	
	$get_product_name_res = mysql_query($get_product_name_sql);
	
	$product_name = mysql_result($get_product_name_res, 0, 'prd_name');
	
	$get_product_id_sql = "select sp_id from site_products where sp_name='$product_name' and sp_site_id='$site_id' and sp_order_type='$ord_type'";
	
	$get_product_id_res = mysql_query($get_product_id_sql);
	
	$product_id = mysql_result($get_product_id_res, 0, 'sp_id');
	
	return $product_id;
}

function getProductType($site_id, $product_id, $ord_type, $new_product_id, $product_type)
{
	$product_type_name_sql = "select description from printorders_type_desc where pub_id='$site_id' and prod_id='$product_id' and id='$product_type'";
	
	$product_type_name_res = mysql_query($product_type_name_sql);
	
	$product_type_name = mysql_result($product_type_name_res, 0, 'description');
	
	$product_type_id_sql = "select ppt_id from print_product_types where ppt_name='$product_type_name' and ppt_product_id='$new_product_id'";
	
	$product_type_id_res = mysql_query($product_type_id_sql);
	
	$product_type_id = mysql_result($product_type_id_res, 0, 'ppt_id');
	
	return $product_type_id;
}

function getWebProductType($site_id, $product_id, $ord_type, $new_product_id, $product_type, $multimedia)
{
	$product_type_name_sql = "select description from weborders_type_desc where wt_pub_id='$site_id' and wt_prod_id='$product_id' and find_in_set('$multimedia',wt_multimedia) and id='$product_type'";

	$product_type_name_res = mysql_query($product_type_name_sql);

	$product_type_name = mysql_result($product_type_name_res, 0, 'description');

	$product_type_id_sql = "select wpt_id from web_product_types_ref where wpt_desc='$product_type_name' and wpt_product_id='$new_product_id'";

	$product_type_id_res = mysql_query($product_type_id_sql);

	$product_type_id = mysql_result($product_type_id_res, 0, 'wpt_id');

	return $product_type_id;
}

/*$orders_sql = "select * from orders_main o
				join orders_detail od on (od.ord_job_no = o.ord_job_no)
				where (o.ord_modified_dt != ord_jd3_synch_dt || ord_jd3_synch_dt is null)
				order by o.ord_job_no";*/
$orders_sql = "select * from orders_main o join orders_detail od on (od.ord_job_no = o.ord_job_no) 
			where o.ord_submit_dt>='2013-05-16 00:00:00' and (o.ord_modified_dt != o.ord_jd3_synch_dt || o.ord_jd3_synch_dt is null)
			order by o.ord_modified_dt desc";

$orders_res = mysql_query($orders_sql);

//echo "<pre>";

$order_fields_array = array();

/*$order_fields_array['ord_job_no'] = array("orders_main_info","om_job_no");
$order_fields_array['ord_adv_id'] = array("orders_main_info","om_job_no");
$order_fields_array['ord_pub_id'] = array("orders_main_info","om_job_no");
$order_fields_array['ord_custord_no'] = array("orders_main_info","om_job_no");
$order_fields_array['ord_type'] = array("orders_main_info","om_job_no");
$order_fields_array['ord_ad_category'] = array("orders_main_info","om_job_no");
$order_fields_array['ord_tag_file'] = array("orders_main_info","om_job_no");
$order_fields_array['ord_tag_file_download_status'] = array("orders_main_info","om_job_no");
$order_fields_array['ord_tag_file_custftp_hitcount'] = array("orders_main_info","om_job_no");
$order_fields_array['ord_orvernight_sub_dlv_opt'] = array("orders_main_info","om_job_no");
$order_fields_array['ord_dlv_id'] = array("orders_main_info","om_job_no");
$order_fields_array['ord_dlv_text'] = array("orders_main_info","om_job_no");
$order_fields_array['ord_dlv_time'] = array("orders_main_info","om_job_no");
$order_fields_array['ord_instr'] = array("orders_main_info","om_job_no");
$order_fields_array['ord_submit_dt'] = array("orders_main_info","om_job_no");
$order_fields_array['ord_actual_submit_dt'] = array("orders_main_info","om_job_no");
$order_fields_array['ord_status'] = array("orders_main_info","om_job_no");
$order_fields_array['ord_submit_by'] = array("orders_main_info","om_job_no");
$order_fields_array['ord_sales_person'] = array("orders_main_info","om_job_no");
$order_fields_array['ord_due_dt'] = array("orders_main_info","om_job_no");
$order_fields_array['ord_complete_dt'] = array("orders_main_info","om_job_no");
$order_fields_array['ord_run_dt'] = array("orders_main_info","om_job_no");
$order_fields_array['ord_spec_ad'] = array("orders_main_info","om_job_no");
$order_fields_array['ord_shell_ad'] = array("orders_main_info","om_job_no");
$order_fields_array['ord_use_shell'] = array("orders_main_info","om_job_no");
$order_fields_array['ord_shell_job_no'] = array("orders_main_info","om_job_no");
$order_fields_array['ord_is_live_ad'] = array("orders_main_info","om_job_no");
$order_fields_array['ord_live_ad_tracking_no'] = array("orders_main_info","om_job_no");
$order_fields_array['ord_thru_interface'] = array("orders_main_info","om_job_no");
$order_fields_array['ord_revision_cnt'] = array("orders_main_info","om_job_no");
$order_fields_array['ord_jobno_picked_frm'] = array("orders_main_info","om_job_no");
$order_fields_array['ord_jobno_picked_frm_trackno'] = array("orders_main_info","om_job_no");
$order_fields_array['ord_output_downloaded'] = array("orders_main_info","om_job_no");
$order_fields_array['ord_rtl_shopping_cart_id'] = array("orders_main_info","om_job_no");
$order_fields_array['ord_retail_ad_flag'] = array("orders_main_info","om_job_no");
$order_fields_array['ord_retail_package_id'] = array("orders_main_info","om_job_no");
$order_fields_array['ord_is_custom_quote_job'] = array("orders_main_info","om_job_no");
$order_fields_array['ord_wf_status'] = array("orders_main_info","om_job_no");
$order_fields_array['ord_sprovider_id'] = array("orders_main_info","om_job_no");
$order_fields_array['ord_asset_flag'] = array("orders_main_info","om_job_no");
$order_fields_array['ord_is_details_changed'] = array("orders_main_info","om_job_no");
$order_fields_array['ord_is_details_updated_towf'] = array("orders_main_info","om_job_no");
$order_fields_array['ord_ftp_pubcode'] = array("orders_main_info","om_job_no");
$order_fields_array['ord_proof_date'] = array("orders_main_info","om_job_no");
$order_fields_array['ord_publish_date'] = array("orders_main_info","om_job_no");
$order_fields_array['ord_modified_dt'] = array("orders_main_info","om_job_no");
$order_fields_array['ord_archive'] = array("orders_main_info","om_job_no");
$order_fields_array['file_store_location'] = array("orders_main_info","om_job_no");
$order_fields_array['ord_publication_title'] = array("orders_main_info","om_job_no");
*/

while($orders_row = mysql_fetch_array($orders_res))
{
	//print_r($orders_row);
	//echo $orders_row['ord_job_no']."<br>"; exit();
	extract($orders_row);
	
	$ord_custord_no = safeEscapeString($ord_custord_no);
	
	if($file_store_location=='L') $file_store_location = 'J';
	
	$om_ord_type = $ord_type;
	
	if($om_ord_type=='3')
	{
		$om_ord_type = "1,2";
	}
	
	if($ord_sprovider_id=='' or $ord_sprovider_id==0)
	{
		$ord_sprovider_id = 'null';
	}
	
	$ord_custom_quote_desc = safeEscapeString($ord_custom_quote_desc);
	$ord_customer_feedback = safeEscapeString($ord_customer_feedback);
	$ord_prod_comments = safeEscapeString($ord_prod_comments);

	if($ord_dlv_id=='' || $ord_dlv_id=='0')
	{
		$ord_dlv_id='2';
	}

	$check_job_exists_sql = "select * from orders_main_info where om_job_no='$ord_job_no' ";
	
	$check_job_exists_res = mysql_query($check_job_exists_sql);
	
	if(mysql_num_rows($check_job_exists_res)==0 && $ord_is_jd3_order==0)
	{
		$orders_main_insert_sql = "insert into orders_main_info 
									(om_job_no, om_custord_no, om_site_id, om_ord_type, om_dlv_id, om_submit_dt, om_actual_submit_dt, om_dlv_dt
									, om_dlv_time, om_due_dt, om_proof_dt, om_publish_dt, om_run_dt, om_tag_file_exists, om_tag_file_download_status
									, om_tag_file_custftp_hitcount, om_submit_by, om_pickedup_job_no, om_pickedup_track_no, om_rtl_shopping_cart_id
									, om_rtl_ad_flag, om_rtl_package_id, om_order_dtls_changed, om_ord_dtls_changed_to_wf, om_ftp_pubcode, om_modified_dt
									, om_archived, om_filestore_location, om_status, om_wf_status, om_studio_id, om_creation_source, om_is_live_ad
									, om_live_ad_tracking_no, om_revision_cnt, om_is_output_downloaded, om_is_visuals_archived, om_is_visual_asset
									, om_custom_quote_order, om_custom_quote_price, om_custom_quote_description,om_feedback_rating,om_feedback_comments
									,om_studio_user_assigned_to,om_production_comments, om_ftp_status, om_ftp_time)
									VALUES
									('$ord_job_no', '$ord_custord_no', '$ord_pub_id', '$om_ord_type', '$ord_dlv_id', '$ord_submit_dt', '$ord_actual_submit_dt'
									, '$ord_dlv_dt', '$ord_dlv_time', '$ord_due_dt', '$ord_proof_date', '$ord_publish_date', '$ord_run_dt', '$ord_tag_file'
									, '$ord_tag_file_download_status', '$ord_tag_file_custftp_hitcount', '$ord_submit_by', '$ord_jobno_picked_frm', '$ord_jobno_picked_frm_trackno'
									, '$ord_rtl_shopping_cart_id', '$ord_retail_ad_flag', '$ord_retail_package_id', '$ord_is_details_changed', '$ord_is_details_updated_towf'
									, '$ord_ftp_pubcode', '$ord_modified_dt', '$ord_archive', '$file_store_location', '$ord_status', '$ord_wf_status'
									, $ord_sprovider_id, '$ord_thru_interface', '$ord_is_live_ad', '$ord_live_ad_tracking_no', '$ord_revision_cnt', '$ord_output_downloaded'
									, '$ord_archive', '$ord_asset_flag', '$ord_is_custom_quote_job','$ord_custom_quote_price','$ord_custom_quote_desc'
									, '$ord_feedback_rating', '$ord_customer_feedback', '$ord_user_assigned_to','$ord_prod_comments', '$ord_ftp_status','$ord_ftp_time')";
		mysql_query($orders_main_insert_sql) or print("Could not insert into Orders_main :". mysql_error());
	}	
	else
	{
		$orders_main_update_sql = "update orders_main_info SET 
									  om_custord_no='".$ord_custord_no."'
									, om_site_id='".$ord_pub_id."'
									, om_ord_type='".$om_ord_type."'
									, om_dlv_id='".$ord_dlv_id."'
									, om_submit_dt='".$ord_submit_dt."'
									, om_actual_submit_dt='".$ord_actual_submit_dt."'
									, om_dlv_dt='".$ord_dlv_dt."'
									, om_dlv_time='".$ord_dlv_time."'
									, om_due_dt='".$ord_due_dt."'
									, om_proof_dt='".$ord_proof_date."'
									, om_publish_dt='".$ord_publish_date."'
									, om_run_dt='".$ord_run_dt."'
									, om_tag_file_exists='".$ord_tag_file."'
									, om_tag_file_download_status='".$ord_tag_file_download_status."'
									, om_tag_file_custftp_hitcount='".$ord_tag_file_custftp_hitcount."'
									, om_submit_by='".$ord_submit_by."'
									, om_pickedup_job_no='".$ord_jobno_picked_frm."'
									, om_pickedup_track_no='".$ord_jobno_picked_frm_trackno."'
									, om_rtl_shopping_cart_id='".$ord_rtl_shopping_cart_id."'
									, om_rtl_ad_flag='".$ord_retail_ad_flag."'
									, om_rtl_package_id='".$ord_retail_package_id."'
									, om_order_dtls_changed='".$ord_is_details_changed."'
									, om_ord_dtls_changed_to_wf='".$ord_is_details_updated_towf."'
									, om_ftp_pubcode='".$ord_ftp_pubcode."'
									, om_modified_dt='".$ord_modified_dt."'
									, om_archived='".$ord_archive."'
									, om_filestore_location='".$file_store_location."'
									, om_status='".$ord_status."'
									, om_wf_status='".$ord_wf_status."'
									, om_studio_id=".$ord_sprovider_id."
									, om_creation_source='".$ord_thru_interface."'
									, om_is_live_ad='".$ord_is_live_ad."'
									, om_live_ad_tracking_no='".$ord_live_ad_tracking_no."'
									, om_revision_cnt='".$ord_revision_cnt."'
									, om_is_output_downloaded='".$ord_output_downloaded."'
									, om_is_visuals_archived='".$ord_archive."'
									, om_is_visual_asset='".$ord_asset_flag."'
									, om_custom_quote_order='".$ord_is_custom_quote_job."'
									, om_custom_quote_price='$ord_custom_quote_price'
									, om_custom_quote_description='$ord_custom_quote_desc'
									, om_feedback_rating='$ord_feedback_rating'
									, om_feedback_comments='$ord_customer_feedback'
									, om_studio_user_assigned_to='$ord_user_assigned_to'
									, om_production_comments='$ord_prod_comments'
									, om_ftp_status='$ord_ftp_status'
									, om_ftp_time='$ord_ftp_time'
									where om_job_no='$ord_job_no'";
		mysql_query($orders_main_update_sql);
	}

	$ord_publication_title = safeEscapeString($ord_publication_title);
	$ord_sales_person = safeEscapeString($ord_sales_person);
	
	$publication_title 	= array("JobNo" => $ord_job_no, "Field" => '6', "Value" => $ord_publication_title, "OrderType" => 0, "Version" => 0);
	
	$sales_person 	= array("JobNo" => $ord_job_no, "Field" => '5', "Value" => $ord_sales_person, "OrderType" => 0, "Version" => 0);
	
	$ad_category 	= array("JobNo" => $ord_job_no, "Field" => '7', "Value" => $ord_ad_category, "OrderType" => 0, "Version" => 0);
	
	$advertiser 	= array("JobNo" => $ord_job_no, "Field" => '4', "Value" => $ord_adv_id, "OrderType" => 0, "Version" => 0);

	
	$shell_ad	= array("JobNo" => $ord_job_no, "Field" => '17', "Value" => $ord_shell_ad, "OrderType" => 0, "Version" => 0);

	$use_shell	= array("JobNo" => $ord_job_no, "Field" => '18', "Value" => $ord_use_shell, "OrderType" => 0, "Version" => 0);

	$use_shell_job_no = array("JobNo" => $ord_job_no, "Field" => '19', "Value" => $ord_shell_job_no, "OrderType" => 0, "Version" => 0);
	
	//Orders Details Insert
	
	//Delete Entries

	if($ord_is_jd3_order=='0'){
	
	$order_detail_text_delete = "delete from orders_detail_text where odt_job_no='$ord_job_no'";
	mysql_query($order_detail_text_delete);
	
	$order_detail_spec_delete = "delete from orders_detail_spec where ods_job_no='$ord_job_no'";
	mysql_query($order_detail_spec_delete);
	
	$order_details_delete = "delete from orders_details where od_job_no='$ord_job_no'";
	mysql_query($order_details_delete);
	
	$order_status_logs_delete = "delete from order_status_logs where osl_job_no='$ord_job_no'";
	mysql_query($order_status_logs_delete);
	
	$revision_cycle_logs_delete = "delete from revision_cycle_logs where rcl_job_no='$ord_job_no'";
	mysql_query($revision_cycle_logs_delete);
	
	$order_input_files_delete = "delete from order_input_files where oif_job_no='$ord_job_no'";
	mysql_query($order_input_files_delete);
	
	$order_output_files_delete = "delete from order_output_files where oof_job_no='$ord_job_no'";
	mysql_query($order_output_files_delete);
	
	//Insert into advertisers
	
	$advertise_select_sql = "select * from customer_clients where cc_site_id='$ord_pub_id' and cc_id='$ord_adv_id' ";
	$advertise_select_res = mysql_query($advertise_select_sql);
	
	if(mysql_num_rows($advertise_select_res)==0)
	{
		$insert_adv_sql =  "insert into customer_clients (cc_id,cc_site_id, cc_name) (select adv_id,adv_pub_id, adv_name from advertisers
		where adv_pub_id='$ord_pub_id' and adv_id='$ord_adv_id')";
		mysql_query($insert_adv_sql);
	}

	//Orders Details Insert
	
	//Publication Title
	$insert_into_orders_details_sql = "insert into orders_detail_text (odt_job_no, odt_field_id, odt_field_value, odt_order_type, odt_version)
	VALUES
	('$ord_job_no','".$publication_title['Field']."','".$publication_title['Value']."','".$publication_title['OrderType']."','".$publication_title['Version']."')";
	
	mysql_query($insert_into_orders_details_sql) or print("Could not insert into Orders_details_text :". mysql_error());
	
	//Sales Person
	
	$insert_into_orders_details_sql = "insert into orders_detail_text (odt_job_no, odt_field_id, odt_field_value, odt_order_type, odt_version)
	VALUES
	('$ord_job_no','".$sales_person['Field']."','".$sales_person['Value']."','".$sales_person['OrderType']."','".$sales_person['Version']."')";
	
	mysql_query($insert_into_orders_details_sql) or print("Could not insert into Orders_details_text :". mysql_error());
	
	//Ad Category
	
	$insert_into_orders_details_sql = "insert into orders_details (od_job_no, od_field_id, od_field_value, od_order_type, od_version)
	VALUES
	('$ord_job_no','".$ad_category['Field']."','".$ad_category['Value']."','".$ad_category['OrderType']."','".$ad_category['Version']."')";
	
	mysql_query($insert_into_orders_details_sql) or print("Could not insert into Orders_details :". mysql_error());
	
	//Advertiser
	
	$insert_into_orders_details_sql = "insert into orders_details (od_job_no, od_field_id, od_field_value, od_order_type, od_version)
	VALUES
	('$ord_job_no','".$advertiser['Field']."','".$advertiser['Value']."','".$advertiser['OrderType']."','".$advertiser['Version']."')";
	
	mysql_query($insert_into_orders_details_sql) or print("Could not insert into Orders_details :". mysql_error());
	
	
	//Spec Ad
	$insert_into_orders_details_sql = "insert into orders_details (od_job_no, od_field_id, od_field_value, od_order_type, od_version)
	VALUES
	('$ord_job_no','10','$ord_spec_ad','0','0')";
	
	mysql_query($insert_into_orders_details_sql) or print("Could not insert into Orders_details :". mysql_error());


	//Shell Ad

	$insert_into_orders_details_sql = "insert into orders_details (od_job_no, od_field_id, od_field_value, od_order_type, od_version)
        VALUES
        ('$ord_job_no','".$shell_ad['Field']."','".$shell_ad['Value']."','".$shell_ad['OrderType']."','".$shell_ad['Version']."')";

        mysql_query($insert_into_orders_details_sql) or print("Could not insert into Orders_details :". mysql_error());


	//Use Shell

        $insert_into_orders_details_sql = "insert into orders_details (od_job_no, od_field_id, od_field_value, od_order_type, od_version)
        VALUES
        ('$ord_job_no','".$use_shell['Field']."','".$use_shell['Value']."','".$use_shell['OrderType']."','".$use_shell['Version']."')";

        mysql_query($insert_into_orders_details_sql) or print("Could not insert into Orders_details :". mysql_error());


	//Use Shell Job

        $insert_into_orders_details_sql = "insert into orders_details (od_job_no, od_field_id, od_field_value, od_order_type, od_version)
        VALUES
        ('$ord_job_no','".$use_shell_job_no['Field']."','".$use_shell_job_no['Value']."','".$use_shell_job_no['OrderType']."','".$use_shell_job_no['Version']."')";

        mysql_query($insert_into_orders_details_sql) or print("Could not insert into Orders_details :". mysql_error());
	
	$prod_comments = safeEscapeString($ord_prod_comments);
	
	
	if($ord_type=='1' || $ord_type=='3')/*** Print Orders ***/
	{
		$product_id = $ord_prd_id;
		$site_id = $ord_pub_id;
		
		$prd_id = getProductId($site_id,$product_id ,'1');
		
		$product_type = $ord_print_type;
		
		$prd_type = getProductType($site_id, $product_id, '1', $prd_id, $product_type);
		
		$ord_spec_instr = safeEscapeString($ord_instr). " <br /> " . safeEscapeString($ord_spec_instr);
		
		$ord_print_color_code1 = substr($ord_print_color_code1,1);
		$ord_print_color_code2 = substr($ord_print_color_code2,1);
		$ord_print_color_code3 = substr($ord_print_color_code3,1);
		
		
		$orders_details_array["Product"] 		= array("JobNo" => $ord_job_no, "Field" => '22', "Value" => $prd_id, "OrderType" => 1, "Version" => 1);
		$orders_details_array["Type"] 			= array("JobNo" => $ord_job_no, "Field" => '25', "Value" => $prd_type, "OrderType" => 1, "Version" => 1);
		$orders_detail_spec_array["Width"] 		= array("JobNo" => $ord_job_no, "Field" => '26', "Value" => $ord_print_width, "OrderType" => 1, "Version" => 1);
		$orders_detail_spec_array["WidthInches"] = array("JobNo" => $ord_job_no, "Field" => '84', "Value" => $ord_print_width_inches, "OrderType" => 1, "Version" => 1);
		$orders_detail_spec_array["Depth"] 		= array("JobNo" => $ord_job_no, "Field" => '27', "Value" => $ord_print_depth_lines, "OrderType" => 1, "Version" => 1);
		$orders_detail_spec_array["DepthInches"] = array("JobNo" => $ord_job_no, "Field" => '85', "Value" => $ord_print_depth, "OrderType" => 1, "Version" => 1);
		$orders_details_array["ColorType"] 		= array("JobNo" => $ord_job_no, "Field" => '31', "Value" => $ord_print_color_type, "OrderType" => 1, "Version" => 1);
		$orders_details_array["SpotColor1"] 	= array("JobNo" => $ord_job_no, "Field" => '50', "Value" => $ord_print_color_code1, "OrderType" => 1, "Version" => 1);
		$orders_details_array["SpotColor2"] 	= array("JobNo" => $ord_job_no, "Field" => '51', "Value" => $ord_print_color_code2, "OrderType" => 1, "Version" => 1);
		$orders_details_array["SpotColor3"] 	= array("JobNo" => $ord_job_no, "Field" => '52', "Value" => $ord_print_color_code3, "OrderType" => 1, "Version" => 1);
		$orders_details_array["TwoSidedAd"] 	= array("JobNo" => $ord_job_no, "Field" => '28', "Value" => $ord_is_twosided_ad, "OrderType" => 1, "Version" => 1);
		$orders_details_array["MultiPageAd"] 	= array("JobNo" => $ord_job_no, "Field" => '29', "Value" => $ord_is_multipage_ad, "OrderType" => 1, "Version" => 1);
		$orders_details_array["NoOfPages"] 		= array("JobNo" => $ord_job_no, "Field" => '30', "Value" => $ord_number_of_pages, "OrderType" => 1, "Version" => 1);
		
		$orders_details_array["ArtisticDiscretion"] = array("JobNo" => $ord_job_no, "Field" => '32', "Value" => $ord_print_discretion, "OrderType" => 1, "Version" => 1);
		$orders_details_array["ChangeColor"] 	= array("JobNo" => $ord_job_no, "Field" => '46', "Value" => $ord_print_change_color, "OrderType" => 1, "Version" => 1);
		$orders_details_array["AddNewElements"] = array("JobNo" => $ord_job_no, "Field" => '47', "Value" => $ord_print_add_elements, "OrderType" => 1, "Version" => 1);
		$orders_details_array["ResizeElements"] = array("JobNo" => $ord_job_no, "Field" => '48', "Value" => $ord_print_resize_elements, "OrderType" => 1, "Version" => 1);
		
		$orders_details_array["NoOfVersions"] 	= array("JobNo" => $ord_job_no, "Field" => '23', "Value" => ($ord_print_versions-1), "OrderType" => 1, "Version" => 1);
		$orders_details_array["IsSizeChangeOnly"] = array("JobNo" => $ord_job_no, "Field" => '24', "Value" => $ord_is_size_changes, "OrderType" => 1, "Version" => 1);
		
		$orders_detail_txt_array["Instructions"] 	= array("JobNo" => $ord_job_no, "Field" => '21', "Value" => $ord_spec_instr, "OrderType" => 1, "Version" => 1);
		
		$orders_details_array["CopyTranslateReq"] = array("JobNo" => $ord_job_no, "Field" => '8', "Value" => $is_print_copy_translate_req, "OrderType" => 1, "Version" => 1);		
		$orders_details_array["CoypTranslateLang"] = array("JobNo" => $ord_job_no, "Field" => '9', "Value" => $ord_print_copy_translate, "OrderType" => 1, "Version" => 1);
		
		
		foreach($orders_details_array as $field_type => $field_details)
		{
			$field_details['Value'] = safeEscapeString($field_details['Value']);
		
			$insert_into_orders_details_sql = "insert into orders_details (od_job_no, od_field_id, od_field_value, od_order_type, od_version)
												VALUES
												('$ord_job_no','".$field_details['Field']."','".$field_details['Value']."','".$field_details['OrderType']."','".$field_details['Version']."')";
			
			mysql_query($insert_into_orders_details_sql) or print("Could not insert into Orders_details :". mysql_error());
		
		}
		
		foreach($orders_detail_spec_array as $field_type => $field_details)
		{
			$field_details['Value'] = safeEscapeString($field_details['Value']);
		
			$insert_into_orders_details_sql = "insert into orders_detail_spec (ods_job_no, ods_field_id, ods_field_value, ods_order_type, ods_version)
			VALUES
			('$ord_job_no','".$field_details['Field']."','".$field_details['Value']."','".$field_details['OrderType']."','".$field_details['Version']."')";
				
			mysql_query($insert_into_orders_details_sql) or print("Could not insert into Orders_details_spec :". mysql_error());
		
		}
		
		foreach($orders_detail_txt_array as $field_type => $field_details)
		{
			$field_details['Value'] = safeEscapeString($field_details['Value']);
		
			$insert_into_orders_details_sql = "insert into orders_detail_text (odt_job_no, odt_field_id, odt_field_value, odt_order_type, odt_version)
			VALUES
			('$ord_job_no','".$field_details['Field']."','".$field_details['Value']."','".$field_details['OrderType']."','".$field_details['Version']."')";
				
			mysql_query($insert_into_orders_details_sql) or print("Could not insert into Orders_details_txt :". mysql_error());		
		}
		
		if($ord_print_versions>1 && $ord_is_size_changes=='1')
		{
			$get_multiversion_details_sql = "select omvs_version, omvs_print_width, omvs_print_width_inches, omvs_print_depth, omvs_print_depth_lines from ord_multi_ver_spec
			where omvs_job_no='$ord_job_no' and omvs_ord_type='1' ";
				
			$get_multiversion_details_res = mysql_query($get_multiversion_details_sql);
				
			while($multiversion_details_row = mysql_fetch_array($get_multiversion_details_res))
			{
				
				if($multiversion_details_row['omvs_version']==1) continue;
				
				$type 		= array("JobNo" => $ord_job_no, "Field" => '25', "Value" => $prd_type, "OrderType" => 1, "Version" => $multiversion_details_row['omvs_version']);
				$width 		= array("JobNo" => $ord_job_no, "Field" => '26', "Value" => $multiversion_details_row['omvs_print_width'], "OrderType" => 1, "Version" => $multiversion_details_row['omvs_version']);
				$widthinches = array("JobNo" => $ord_job_no, "Field" => '84', "Value" => $multiversion_details_row['omvs_print_width_inches'], "OrderType" => 1, "Version" => $multiversion_details_row['omvs_version']);
				$depth 		= array("JobNo" => $ord_job_no, "Field" => '27', "Value" => $multiversion_details_row['omvs_print_depth_lines'], "OrderType" => 1, "Version" => $multiversion_details_row['omvs_version']);
				$depthinches = array("JobNo" => $ord_job_no, "Field" => '85', "Value" => $multiversion_details_row['omvs_print_depth'], "OrderType" => 1, "Version" => $multiversion_details_row['omvs_version']);
				
				//Type
				$insert_into_orders_details_sql = "insert into orders_details (od_job_no, od_field_id, od_field_value, od_order_type, od_version)
				VALUES
				('$ord_job_no','".$type['Field']."','".$type['Value']."','".$type['OrderType']."','".$type['Version']."')";
				
				mysql_query($insert_into_orders_details_sql) or print("Could not insert into Orders_details :". mysql_error());
				
				//Width
				$insert_into_orders_details_sql = "insert into orders_detail_spec (ods_job_no, ods_field_id, ods_field_value, ods_order_type, ods_version)
				VALUES
				('$ord_job_no','".$width['Field']."','".$width['Value']."','".$width['OrderType']."','".$width['Version']."')";
				
				mysql_query($insert_into_orders_details_sql) or print("Could not insert into Orders_details_spec :". mysql_error());
				
				//WidthInches
				
				$insert_into_orders_details_sql = "insert into orders_detail_spec (ods_job_no, ods_field_id, ods_field_value, ods_order_type, ods_version)
				VALUES
				('$ord_job_no','".$widthinches['Field']."','".$widthinches['Value']."','".$widthinches['OrderType']."','".$widthinches['Version']."')";
				
				mysql_query($insert_into_orders_details_sql) or print("Could not insert into Orders_details_spec :". mysql_error());
				
				//Depth
				
				$insert_into_orders_details_sql = "insert into orders_detail_spec (ods_job_no, ods_field_id, ods_field_value, ods_order_type, ods_version)
				VALUES
				('$ord_job_no','".$depth['Field']."','".$depth['Value']."','".$depth['OrderType']."','".$depth['Version']."')";
				
				mysql_query($insert_into_orders_details_sql) or print("Could not insert into Orders_details_spec :". mysql_error());
				
				//DepthInches
				
				$insert_into_orders_details_sql = "insert into orders_detail_spec (ods_job_no, ods_field_id, ods_field_value, ods_order_type, ods_version)
				VALUES
				('$ord_job_no','".$depthinches['Field']."','".$depthinches['Value']."','".$depthinches['OrderType']."','".$depthinches['Version']."')";
				
				mysql_query($insert_into_orders_details_sql) or print("Could not insert into Orders_details_spec :". mysql_error());
				
			}
		}		
	}

	if($ord_type=='2' || $ord_type=='3') /*** Web Orders ***/
	{
		$product_id = $ord_prd_id;
		$site_id = $ord_pub_id;
		
		$prd_id = getProductId($site_id,$product_id ,'2');
		
		$multimedia = $ord_web_multimedia;
		
		//	ord_web_richmedia_type, ord_web_richmedia_platform
		
		if($multimedia=='S')
		{
			$w_multimedia = 1;
			$w_web_output_type = '';
		}
		else if($multimedia=='D')
		{
			$w_multimedia = 2;
			if($ord_web_output_type=='G')
			{
				$w_web_output_type = 1;
			}
			else if($ord_web_output_type=='F')
			{
				$w_web_output_type = 2;
			}
			else if($ord_web_output_type=='B')
			{
				$w_web_output_type = 3;
			}
		}
		else if($multimedia=='R')
		{
			$w_multimedia = 3;
			
			
		}

		
		
		
		$product_type = $ord_web_type;
		
		$wprd_type = getWebProductType($site_id, $product_id, '2', $prd_id, $product_type, $multimedia);
		
		$ord_web_spec_instr = safeEscapeString($ord_web_spec_instr);

		$orders_details_array = array();
		$orders_detail_spec_array = array();
		$orders_detail_txt_array = array();
		
		$orders_details_array["WebProduct"] 		= array("JobNo" => $ord_job_no, "Field" => '49', "Value" => $prd_id, "OrderType" => 2, "Version" => 1);
		$orders_details_array["WebMultimedia"] 		= array("JobNo" => $ord_job_no, "Field" => '35', "Value" => $w_multimedia, "OrderType" => 2, "Version" => 1);

		if($multimedia!='R')
		{
			$orders_details_array["WebOutputType"] 		= array("JobNo" => $ord_job_no, "Field" => '36', "Value" => $w_web_output_type, "OrderType" => 2, "Version" => 1);
			$orders_details_array["WebType"] 			= array("JobNo" => $ord_job_no, "Field" => '37', "Value" => $wprd_type, "OrderType" => 2, "Version" => 1);		
		}
		else 
		{
			if($ord_web_richmedia_platform=='A')
			{
				$ord_web_richmedia_platform = '4';
			}
			else if($ord_web_richmedia_platform=='P')
			{
				$ord_web_richmedia_platform = '5';
			}
			else if($ord_web_richmedia_platform=='E')
			{
				$ord_web_richmedia_platform = '6';
			}
			else if($ord_web_richmedia_platform=='O')
			{
				$ord_web_richmedia_platform = '7';
			}
			
			$orders_details_array["RichMediaType"] 		= array("JobNo" => $ord_job_no, "Field" => '86', "Value" => $ord_web_richmedia_type, "OrderType" => 2, "Version" => 1);
			$orders_details_array["RichMediaPlatform"] 	= array("JobNo" => $ord_job_no, "Field" => '87', "Value" => $ord_web_richmedia_platform, "OrderType" => 2, "Version" => 1);
			
			$orders_details_array["CreativeAttached"] 	= array("JobNo" => $ord_job_no, "Field" => '88', "Value" => $ord_convert_supplied_creative, "OrderType" => 2, "Version" => 1);
		}
		
		$orders_details_array["WebArtisticDiscretion"] 			= array("JobNo" => $ord_job_no, "Field" => '41', "Value" => $ord_web_discretion, "OrderType" => 2, "Version" => 1);
		$orders_details_array["ChangeColor"] 	= array("JobNo" => $ord_job_no, "Field" => '53', "Value" => $ord_web_change_color, "OrderType" => 2, "Version" => 1);
		$orders_details_array["AddNewElements"] = array("JobNo" => $ord_job_no, "Field" => '54', "Value" => $ord_web_add_elements, "OrderType" => 2, "Version" => 1);
		$orders_details_array["ResizeElements"] = array("JobNo" => $ord_job_no, "Field" => '55', "Value" => $ord_web_resize_elements, "OrderType" => 2, "Version" => 1);
		$orders_details_array["WebCopyTranslationRequired"] = array("JobNo" => $ord_job_no, "Field" => '78', "Value" => $is_web_copy_translate_req, "OrderType" => 2, "Version" => 1);
		$orders_details_array["WebCopyTranslationLanguate"] = array("JobNo" => $ord_job_no, "Field" => '79', "Value" => $ord_web_copy_translate_lang, "OrderType" => 2, "Version" => 1);
		
		$orders_detail_spec_array["WebWidth"] 			= array("JobNo" => $ord_job_no, "Field" => '38', "Value" => $ord_web_width, "OrderType" => 2, "Version" => 1);
		$orders_detail_spec_array["WebHeight"] 			= array("JobNo" => $ord_job_no, "Field" => '39', "Value" => $ord_web_height, "OrderType" => 2, "Version" => 1);
		
		$orders_detail_txt_array["WebLandingURL"] 			= array("JobNo" => $ord_job_no, "Field" => '40', "Value" => $ord_web_landing_uri, "OrderType" => 2, "Version" => 1);
		$orders_detail_txt_array["Instructions"] 			= array("JobNo" => $ord_job_no, "Field" => '43', "Value" => $ord_web_spec_instr, "OrderType" => 2, "Version" => 1);
		
		$orders_details_array["NoOfVersions"] 	= array("JobNo" => $ord_job_no, "Field" => '33', "Value" => ($ord_web_versions-1), "OrderType" => 2, "Version" => 1);
		$orders_details_array["IsSizeChangeOnly"] = array("JobNo" => $ord_job_no, "Field" => '34', "Value" => $ord_web_is_size_changes, "OrderType" => 2, "Version" => 1);
		
		foreach($orders_details_array as $field_type => $field_details)
		{
			$field_details['Value'] = safeEscapeString($field_details['Value']);
		
			$insert_into_orders_details_sql = "insert into orders_details (od_job_no, od_field_id, od_field_value, od_order_type, od_version)
			VALUES
			('$ord_job_no','".$field_details['Field']."','".$field_details['Value']."','".$field_details['OrderType']."','".$field_details['Version']."')";
				
			mysql_query($insert_into_orders_details_sql) or print("Could not insert into Orders_details :". mysql_error());
		
		}
		
		foreach($orders_detail_spec_array as $field_type => $field_details)
		{
			$field_details['Value'] = safeEscapeString($field_details['Value']);
		
			$insert_into_orders_details_sql = "insert into orders_detail_spec (ods_job_no, ods_field_id, ods_field_value, ods_order_type, ods_version)
			VALUES
			('$ord_job_no','".$field_details['Field']."','".$field_details['Value']."','".$field_details['OrderType']."','".$field_details['Version']."')";
		
			mysql_query($insert_into_orders_details_sql) or print("Could not insert into Orders_details_spec :". mysql_error());
		
		}
		
		foreach($orders_detail_txt_array as $field_type => $field_details)
		{
			$field_details['Value'] = safeEscapeString($field_details['Value']);
		
			$insert_into_orders_details_sql = "insert into orders_detail_text (odt_job_no, odt_field_id, odt_field_value, odt_order_type, odt_version)
			VALUES
			('$ord_job_no','".$field_details['Field']."','".$field_details['Value']."','".$field_details['OrderType']."','".$field_details['Version']."')";
		
			mysql_query($insert_into_orders_details_sql) or print("Could not insert into Orders_details_txt :". mysql_error());
		}
		
		if($ord_web_versions>1 && $ord_web_is_size_changes=='1')
		{
			$get_multiversion_details_sql = "select omvs_version, omvs_web_type, omvs_web_width, omvs_web_height from ord_multi_ver_spec where omvs_job_no='$ord_job_no' and omvs_ord_type='2' ";
		
			$get_multiversion_details_res = mysql_query($get_multiversion_details_sql);
		
			while($multiversion_details_row = mysql_fetch_array($get_multiversion_details_res))
			{
		
				if($multiversion_details_row['omvs_version']==1) continue;
				
				$wprd_type = getWebProductType($site_id, $product_id, '2', $new_product_id, $product_type, $multimedia);
		
				$type 	= array("JobNo" => $ord_job_no, "Field" => '37', "Value" => $multiversion_details_row['omvs_web_type'], "OrderType" => 2, "Version" => $multiversion_details_row['omvs_version']);
				$width	= array("JobNo" => $ord_job_no, "Field" => '38', "Value" => $multiversion_details_row['omvs_web_width'], "OrderType" => 2, "Version" => $multiversion_details_row['omvs_version']);
				$height = array("JobNo" => $ord_job_no, "Field" => '39', "Value" => $multiversion_details_row['omvs_web_height'], "OrderType" => 2, "Version" => $multiversion_details_row['omvs_version']);
				
		
				//Type
				$insert_into_orders_details_sql = "insert into orders_details (od_job_no, od_field_id, od_field_value, od_order_type, od_version)
					VALUES ('$ord_job_no','".$type['Field']."','".$type['Value']."','".$type['OrderType']."','".$type['Version']."')";
		
				mysql_query($insert_into_orders_details_sql) or print("Could not insert into Orders_details :". mysql_error());
		
				//Width
				$insert_into_orders_details_sql = "insert into orders_detail_spec (ods_job_no, ods_field_id, ods_field_value, ods_order_type, ods_version)
					VALUES ('$ord_job_no','".$width['Field']."','".$width['Value']."','".$width['OrderType']."','".$width['Version']."')";
						
				mysql_query($insert_into_orders_details_sql) or print("Could not insert into Orders_details_spec :". mysql_error());
		
				//Height
				$insert_into_orders_details_sql = "insert into orders_detail_spec (ods_job_no, ods_field_id, ods_field_value, ods_order_type, ods_version)
					VALUES ('$ord_job_no','".$height['Field']."','".$height['Value']."','".$height['OrderType']."','".$height['Version']."')";
		
				mysql_query($insert_into_orders_details_sql) or print("Could not insert into Orders_details_spec :". mysql_error());
			}
		}
	}
	}
	
	//Order Input & Output Files copy
	
	$order_files_fetch_sql = "select ord_fil_type, ord_seq_no, ord_file_loc, ord_file_ext, ord_file_ver, ord_file_rev, ord_upload_time 
							from orderfiles where ord_job_no='$ord_job_no'";
	
	$order_files_fetch_res = mysql_query($order_files_fetch_sql);
	
	$output_file_array = array();
	$layout_file_array = array();
	$input_file_array = array();
	
	while($order_files_fetch_row = mysql_fetch_array($order_files_fetch_res))
	{
		if(substr($order_files_fetch_row['ord_fil_type'],0,1)=='O')
		{
			$output_file_array[] = array("file_order_type" => substr($order_files_fetch_row['ord_fil_type'],1)
										, "revision" =>  $order_files_fetch_row['ord_file_rev']
										, "version"  => $order_files_fetch_row['ord_file_ver']
										, "file_name" => $order_files_fetch_row['ord_file_loc']
										, "upload_time" => $order_files_fetch_row['ord_upload_time']
										, "location" => "L"
									); 
		}
		else
		{
			$upload_time = $order_files_fetch_row['ord_upload_time'];
			
			$inp_file_revision_sql = "select min(ojc_cycle)-1 as revision from orderjobcycle where ojc_job_no='$ord_job_no'
			and ojc_submit_dt > (select max(ojc_complete_dt) from orderjobcycle where ojc_job_no='$ord_job_no'
			and ojc_complete_dt<'$upload_time')";		

			//echo $inp_file_revision_sql."\n\n";
	
			$inp_file_revision_res = mysql_query($inp_file_revision_sql);
			
			$inp_file_revision = mysql_result($inp_file_revision_res,0,'revision');
			
			if($inp_file_revision=='') $inp_file_revision=0;
			
			$layout_file_array[] = array("file_order_type" => $order_files_fetch_row['ord_fil_type']
										, "revision" =>  $inp_file_revision
										, "type"  => "Layout"
										, "file_name" => $order_files_fetch_row['ord_file_loc']
										, "datetime" => $order_files_fetch_row['ord_upload_time']
										, "location" => "L");			
		}
	}
	

	if($ord_is_jd3_order=='0'){
	$order_input_files_sql = "select ord_type, ord_section, ord_class, ord_text, ord_text_loc, ord_file_loc, ord_img_upload_time
								from orderelements where ord_job_no = '$ord_job_no' ";
	
	$order_input_files_res = mysql_query($order_input_files_sql);
	
	while($order_input_files_row = mysql_fetch_array($order_input_files_res))
	{
		if($order_input_files_row['ord_type']=='3')
		{
			$order_input_files_row['ord_type'] = '1,2';
		}
		$file_comments = safeEscapeString($order_input_files_row['ord_text']) . "  " . safeEscapeString($order_input_files_row['ord_text_loc']);
		
		$ftype = "";
		
		$section = "Unspecified";
		
		switch($order_input_files_row['ord_section'])
		{
			case "H" : $section = "Header"; break;
			case "B" : $section = "Body"; break;
			case "F" : $section = "Footer"; break;
			default : $section = "Unspecified"; break;
		}
		
		switch($order_input_files_row['ord_class'])
		{
			case "C" : $section .= " - Copy"; break;
			case "L" : $section .= " - Logo"; break;
			case "P" : $section .= " - Photo"; break;
			case "G" : $section .= " - Graphic"; break;
			default :  break;
		}
		
		$ftype = $section;
		
		$upload_time = $order_input_files_row['ord_img_upload_time'];		
	
		$inp_file_revision_sql = "select min(ojc_cycle)-1 as revision from orderjobcycle where ojc_job_no='$ord_job_no'
			and ojc_submit_dt > (select max(ojc_complete_dt) from orderjobcycle where ojc_job_no='$ord_job_no'
			and ojc_complete_dt<'$upload_time')";
			
		$inp_file_revision_res = mysql_query($inp_file_revision_sql);
		
		$inp_file_revision = mysql_result($inp_file_revision_res,0,'revision');
		
		if($inp_file_revision=='') $inp_file_revision=0;		
		  
		$input_file_array[] = array("file_order_type" => $order_input_files_row['ord_type']
									, "revision" => $inp_file_revision
									, "file_name" => $order_input_files_row['ord_file_loc']
									, "type" => $ftype
									, "comments" => $file_comments
									, "location" => "L"
									, "datetime" => $order_input_files_row['ord_img_upload_time']);	
	}
	
	foreach($input_file_array as $file_cnt => $file_details)
	{
		$file_details['file_name'] = safeEscapeString($file_details['file_name']);

		$insert_input_files_sql = "insert into order_input_files (oif_job_no, oif_order_type, oif_revision, oif_filename, oif_type, oif_comments, oif_location, oif_date) 
									VALUES 
									('".$ord_job_no."','".$file_details['file_order_type']."','".$file_details['revision']."','".$file_details['file_name']."'
									,'".$file_details['type']."','".$file_details['comments']."','".$file_details['location']."','".$file_details['datetime']."')";
		
		mysql_query($insert_input_files_sql) or print("Could not insert into Orders_input_files :". $insert_input_files_sql);
	}
	
	foreach($layout_file_array as $file_cnt => $file_details)
	{
		$file_details['comments'] = '';

		$file_details['file_name'] = safeEscapeString($file_details['file_name']);
		
		$insert_input_files_sql = "insert into order_input_files (oif_job_no, oif_order_type, oif_revision, oif_filename, oif_type, oif_comments, oif_location, oif_date)
									VALUES
									('".$ord_job_no."','".$file_details['file_order_type']."','".$file_details['revision']."','".$file_details['file_name']."'
									,'".$file_details['type']."','".$file_details['comments']."','".$file_details['location']."','".$file_details['datetime']."')";
	
		mysql_query($insert_input_files_sql) or print("Could not insert into Orders_layout_files :". mysql_error());
	}
	}
	foreach($output_file_array as $file_count => $file_details)
	{
		$file_details['file_name'] = safeEscapeString($file_details['file_name']);
		
		$insert_output_files_sql = "insert into order_output_files (oof_job_no, oof_order_type, oof_revision, oof_version, oof_filename, oof_uploaded_time, oof_location)
									VALUES
									('".$ord_job_no."','".$file_details['file_order_type']."','".$file_details['revision']."','".$file_details['version']."'
									,'".$file_details['file_name']."','".$file_details['upload_time']."','".$file_details['location']."')";
		
		mysql_query($insert_output_files_sql) or print("Could not insert into Orders_output_files :". mysql_error());
	}
	
	//Order Logs Update
	
	$order_logs_fetch_sql = "select * from orderlogs where ord_job_no='$ord_job_no'";
	
	$order_logs_fetch_res = mysql_query($order_logs_fetch_sql);

	
	
	while($order_logs_fetch_row = mysql_fetch_array($order_logs_fetch_res))
	{
		$insert_into_order_status_logs_sql = "insert into order_status_logs (osl_job_no, osl_status, osl_date, osl_submit_by)
											VALUES ('$ord_job_no','".$order_logs_fetch_row['ord_status']."','".$order_logs_fetch_row['ord_status_dt']."','".$order_logs_fetch_row['ord_modified_by']."')";
		
		mysql_query($insert_into_order_status_logs_sql) or print("Could not insert into Orders_status_logs :". mysql_error());
	}
	
	//Order Revision Cycle Update

	$delete_ord_rev_cycle = "delete from order_revision_cycle where or_job_no=$ord_job_no";
	mysql_query($delete_ord_rev_cycle);
	
	$order_revision_cycle_update_qry = "select ojc_job_no, ojc_cycle-1 as rev, ojc_dlv_id, ojc_due_dt, ojc_submit_dt
									, ojc_complete_dt, ojc_status, ojc_to_status
									from orderjobcycle where ojc_job_no='$ord_job_no'";
	
	$order_revision_cycle_update_res = mysql_query($order_revision_cycle_update_qry);
	
	while($order_revision_cycle_row = mysql_fetch_array($order_revision_cycle_update_res))
	{
		
		if($order_revision_cycle_row['rev']==0)
		{
			$dlv_id = $ord_dlv_id;
			$dlv_dt = $ord_due_dt;
		}
		else
		{
			$dlv_id = $order_revision_cycle_row['ojc_dlv_id'];
			$dlv_dt = $order_revision_cycle_row['ojc_due_dt'];
		}
		
		echo $insert_into_revision_cycle_qry = "insert into revision_cycle_logs
											(rcl_job_no, rcl_revision_cycle, rcl_dlv_id, rcl_submit_dt, rcl_dlv_dt, rcl_from_status, rcl_to_status, rcl_completed_dt) 
											VALUES
											('$ord_job_no','".$order_revision_cycle_row['rev']."','$dlv_id'
											,'".$order_revision_cycle_row['ojc_submit_dt']."','$dlv_dt','".$order_revision_cycle_row['ojc_status']."'
											,'".$order_revision_cycle_row['ojc_to_status']."','".$order_revision_cycle_row['ojc_complete_dt']."')";
		
		mysql_query($insert_into_revision_cycle_qry) or print("Could not insert into Orders_revision_cycle :". mysql_error());
	}
	
	//Revision Data Copy
	
	$delete_orders_revision_qry = "delete from orders_revision where or_job_no='$ord_job_no'";
	mysql_query($delete_orders_revision_qry);
	
	$orders_revise_qry = "select ord_job_no,ord_revise_1,ord_revise_2,ord_revise_3,ord_revise_4,ord_revise_5,ord_revise_6,
						ord_others_desc, ord_revise,ord_revise_reasons,ord_revise_dt,ord_revise_print_ver,ord_revise_web_ver,ord_revision_round
						, ord_revision_priority, ojc_revision_for
						from orders_revise
						join orderjobcycle on (ojc_job_no=ord_job_no and ojc_cycle=(ord_revision_round+1) and ojc_status='E')
					where ord_job_no='$ord_job_no'";
	
	$orders_revise_res = mysql_query($orders_revise_qry);
	
	while($orders_revise_row = mysql_fetch_array($orders_revise_res))
	{
		$revision_comments = safeEscapeString($orders_revise_row['ord_revise']);
		$revise_other_desc = safeEscapeString($orders_revise_row['ord_others_desc']);

		$revise_order_type = '1';

		if($orders_revise_row['ojc_revision_for']=='1')
		{
			$revise_order_type='1';
		}
		else if($orders_revise_row['ojc_revision_for']=='2')
		{
			$revise_order_type='2';
		}
		else if($orders_revise_row['ojc_revision_for']=='3')
		{
			$revise_order_type='1,2';
		}

	
		$insert_orders_revision_sql = "insert into orders_revision
										(or_job_no, or_revision, or_revise_input_field1, or_revise_input_field2,or_revise_input_field3
										, or_revise_input_field4, or_revise_input_field5, or_revise_input_field6
										, or_revise_others_desc, or_revision_comments, or_revision_order_type
										, or_revision_date, or_revision_dlv_id)
										VALUES
										('".$ord_job_no."','".$orders_revise_row['ord_revision_round']."','".$orders_revise_row['ord_revise_1']."'
										,'".$orders_revise_row['ord_revise_2']."','".$orders_revise_row['ord_revise_3']."','".$orders_revise_row['ord_revise_4']."'
										,'".$orders_revise_row['ord_revise_5']."','".$orders_revise_row['ord_revise_6']."','".$revise_other_desc."'
										,'$revision_comments','".$revise_order_type."','".$orders_revise_row['ord_revise_dt']."','".$orders_revise_row['ord_revision_priority']."')";
		mysql_query($insert_orders_revision_sql);
	}
	
	//Feedback Data Copy
	
	$delete_feedback_qry = "delete from order_feedback_history where jfh_job_no='$ord_job_no'";
	mysql_query($delete_feedback_qry);
	
	
	$feedback_history_sql = "select fh_job_no, fh_cycle, fh_date, fh_rating, fh_comment, fh_commented_by, fh_wf_update
	from feedback_history where fh_job_no='$ord_job_no'";
	
	$feedback_history_res = mysql_query($feedback_history_sql);

	while($feedback_history_row = mysql_fetch_array($feedback_history_res))
	{
		$fdbk_comments = safeEscapeString($feedback_history_row['fh_comment']);

		$insert_feedback_history_sql = "insert into order_feedback_history
			(jfh_job_no,jfh_rev_cycle,jfh_ratings,jfh_provided_by,jfh_comments,jfh_date,jfh_wf_synched)
			VALUES
			('$ord_job_no','".$feedback_history_row['fh_cycle']."','".$feedback_history_row['fh_rating']."'
			,'".$feedback_history_row['fh_commented_by']."','".$fdbk_comments."','".$feedback_history_row['fh_date']."'
			,'".$feedback_history_row['fh_wf_update']."')";
		mysql_query($insert_feedback_history_sql);
	}

	//Messageboard Migrate
	
	$delete_orders_messages_qry = "delete from order_messages where or_job_no='$ord_job_no'";
	mysql_query($delete_orders_messages_qry);
	
	//$delete_orders_message_files_qry = "delete from order_message_files where or_job_no='$ord_job_no'";
	//mysql_query($delete_orders_message_files_qry);
	
	$message_qry = "select * from messageboard where job_no='$ord_job_no' ";
	$message_res = mysql_query($message_qry);

	while($message_row = mysql_fetch_array($message_res))
	{
		extract($message_row);

		$message = safeEscapeString($message);

		$insert_message_qry = "insert into order_messages
		(jm_id, jm_job_no, jm_revision, jm_date, jm_posted_by, jm_message, jm_is_production_private, jm_is_sm_private, jm_wf_msg_synched, jm_is_high_priority)
		values
		('$messageid', '$job_no', '$revision', '$entereddate', '$userid', '$message', '$private', '$sm_private_msg', '$wf_msg_synched', '$high_priority_msg')";
	
		$insert_message_res = mysql_query($insert_message_qry);
		
		$delete_orders_message_files_qry = "delete from order_message_files where jmf_msg_id='$messageid'";
	        mysql_query($delete_orders_message_files_qry);	

	
		$message_file_qry = "select * from messagefiles where messageid='$messageid'";
		$message_file_res = mysql_query($message_file_qry);

		while($message_file_row = mysql_fetch_array($message_file_res))
		{
			extract($message_file_row);

			if($ord_file_loc!='' || $ord_file_loc!='NULL')
			{
				$ord_file_loc = safeEscapeString($ord_file_loc);
	
				$insert_message_file_qry = "insert into order_message_files
				(jmf_msg_id, jmf_file, jmf_location, jmf_date)
				values
				('$messageid', '$ord_file_loc', 'L', '$entereddate')";
	
				$insert_message_file_res = mysql_query($insert_message_file_qry);
	
			}
		}
	}

	
	$update_synched_time = "update orders_main set ord_modified_dt='$ord_modified_dt', ord_jd3_synch_dt='$ord_modified_dt' where ord_job_no='$ord_job_no' and ord_modified_dt='$ord_modified_dt'";
	mysql_query($update_synched_time);
	
}

?>
