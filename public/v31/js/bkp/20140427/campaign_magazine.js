$(document).ready(function(){
	
	$("#magazineformSubmit").click(function(event){
		
		event.preventDefault();
		
		order_type = new Array();
		
		ord_type_cnt = 0;
		
		$("#order_info_form").find("input:checked[name='Order Type']").each(function(){				
			order_type[ord_type_cnt++] = $(this).val();	
		});
		
		
		if(ord_type_cnt==0)
		{
			$("#msgbox_text").html("<div><br/>Please select atleast one Order Type <br/><br/>" +
			"					<img id='create_ok' src='/images/ok.gif' style='vertical-align:middle;' /></div>");
			$("#msgbox").fadeIn('fast',function(){
				$("#msgbox_table").css('width','350px');
				$("#msgbox").css('display','table');
				$("#create_ok").click(function(){
					$("#msgbox").fadeOut('fast');
				});
			});
			
			return false;
		}
		
		var objRegExp  =  /^[\w\.\-]+$/;
		//check for numeric characters					
		$("[name='Tracking No']").css('background-color','');
		if(!objRegExp.test($("[name='Tracking No']").val()))
		{
			$("#msgbox_text").html("<div><br/>Tracking Number should be Alphanumeric <br/><br/>" +
			"					<img id='create_ok' src='/images/ok.gif' style='vertical-align:middle;' /></div>");
			$("#msgbox").fadeIn('fast',function(){
				$("#msgbox_table").css('width','350px');
				$("#msgbox").css('display','table');
				$("#create_ok").click(function(){
					$("#msgbox").fadeOut('fast');
					$("[name='Tracking No']").css('background-color','#FF0000');
				});
			});
			return false;
		}
		
		mandatory_fields = new Array();
		
		errFlag = false;
		
		$("div[order_type][mandatory='1']:visible").each(function(){
			$(this).find('input').each(function()
			{
				//alert($(this).attr('type')+' -- '+$(this).attr('name')+' -- '+$(this).val());
				if( $(this).attr('name')!='order_number' && ( $(this).val()=='' || $(this).val()=='--Select--') || $(this).val()==$(this).attr('name'))
				{						
					if($(this).val()=='--Select--' || $(this).attr('name')==$(this).val())
					{
						$(this).parent().prev().css('background-color','#FF0000');
						errFlag = true;
					}
					else if(!$(this).hasClass('dpicker'))
					{
						$(this).css('background-color','#FF0000');
						errFlag = true;
					}
					else if($(this).hasClass('dpicker') && ($(this).val()=='' || $(this).val()==$(this).attr('name')))
					{
						$(this).parent().parent().parent().css('background-color','#FF0000');
						errFlag = true;
					}
					
				}
				else
				{			
					if($(this).hasClass('dpicker'))
					{
						//$(this).parent().parent().parent().prev().css('background-color','');						
						$(this).parent().parent().parent().css('background-color','');
					}
					else
					{
						$(this).parent().prev().css('background-color','');						
						$(this).css('background-color','');
					}											
				}
			});	
			
			$(this).find('select').each(function()
			{
				//alert($(this).attr('type')+' -- '+$(this).attr('name')+' -- '+$(this).val());
				if( $(this).attr('name')!='order_number' && ( $(this).val()=='' || $(this).val()=='--Select--') || $(this).val()==$(this).attr('name'))
				{						
					if($(this).val()=='--Select--' || $(this).attr('name')==$(this).val())
					{
						$(this).parent().parent().parent().parent().css('background-color','#FF0000');
						errFlag = true;
					}
					else if(!$(this).hasClass('dpicker'))
					{
						$(this).css('background-color','#FF0000');
						errFlag = true;
					}
				}
				else
				{					
					$(this).parent().parent().parent().parent().css('background-color','');						
					$(this).css('background-color','');					
				}
			});
		});
		
		if($('#14').val()=='--Select--' || $('#14').val()=='' || $('#14').val()==null)
		{
			$('#14').parent().parent().parent().parent().css('background-color','#FF0000');
			errFlag = true;
		}

		if($("#14").val() == 'Other' && $("[name='OtherDate']").val() == "") 
		{
			$("[name='OtherDate']").parent().parent().css({'background-color':'#FF0000','width':'135px'});
			errFlag = true;
		}
		
		if(errFlag)
		{
			$("#msgbox_text").html("<div><br/>Please fill in the Mandatory Fields <br/><br/>" +
					"					<img id='create_ok' src='/images/ok.gif' style='vertical-align:middle;' /></div>");
			$("#msgbox").fadeIn('fast',function(){
				$("#msgbox_table").css('width','350px');
				$("#msgbox").css('display','table');
				$("#create_ok").click(function(){
					$("#msgbox").fadeOut('fast');
				});
			});
			return false;
		}

		if(($("[name='Proof Date']").val() != '' ) &&  ($("[name='Run Date']").val() != '' )) 
		{
			if(new Date($("[name='Proof Date']").val())  > new Date($("[name='Run Date']").val())) 
			{
				$("#msgbox_text").html("<div><br/>Run Date should be greater than Proof Date.<br/><br/>" +
				"					<img id='create_ok' src='/images/ok.gif' style='vertical-align:middle;' /></div>");
				$("#msgbox").fadeIn('fast',function(){
					$("#msgbox_table").css('width','350px');
					$("#msgbox").css('display','table');
					$("#create_ok").click(function(){
						$("#msgbox").fadeOut('fast');
					});
				});
				return false;
			}
			
		}
		
		
		//$('#ordercomponents').ajaxupload('start');
		
		form_details = new Array();
		fi=0;
		
		form_details[fi] = $("#order_info_form").serialize();
		fi++;
		
		form_details[fi] = $("#14").serialize();
		fi++;
		
		if($("#14").val() == 'Other') 
		{
			form_details[fi] = $("[name='OtherDate']").serialize();
			fi++;
		}
		
		formdetails = '';
		
		for(fl=0;fl<form_details.length;fl++)
		{
			formdetails =  formdetails + '&' +  form_details[fl];
		}
		
		order_type = new Array();
		
		ord_type_cnt = 0;
		
		$("#order_info_form").find("input:checked[name='Order Type']").each(function(){				
			//alert($(this).val()+'-'+$("#order_spec_form_"+$(this).val()).serialize());
			
			order_type[ord_type_cnt++] = $(this).val();			
			
			form_spec_details = $("#order_spec_form_"+$(this).val()).serialize();
			
			form_spec_details_arr = form_spec_details.split("&");
			
			additional_version = 0;
			size_change_only = 'No';
			
			for(fe=0;fe<form_spec_details_arr.length;fe++)
			{
				form_field_value = form_spec_details_arr[fe].split('=');
				
				form_field = $(this).val()+'['+form_field_value[0]+']';
				
				form_value = form_field_value[1];
				
				if(form_field_value[0] == "Additional+Versions")
				{
					additional_version = form_field_value[1];
				}
				
				if(form_field_value[0] == "Size+Change+Only")
				{
					size_change_only = form_field_value[1];
				}
				
				formdetails =  formdetails + '&' +  form_field+'='+form_value;
			}
			
			
			
			//alert(parseInt(additional_version)+'-'+size_change_only);
			
			if(parseInt(additional_version)>0 && size_change_only!='Different Creative')
			{					
				form_multi_spec_details = $("#ord_form_multiver_"+$(this).val()).serialize();
				
				//alert(form_multi_spec_details);
				
				form_spec_details_arr = form_multi_spec_details.split("&");					
				
				for(fe=0;fe<form_spec_details_arr.length;fe++)
				{
					form_field_value = form_spec_details_arr[fe].split('=');
					
					form_field_value_ver = form_field_value[0].split("_");
					
					form_field = $(this).val()+'['+form_field_value_ver[1]+']'+'['+form_field_value_ver[0]+']';						
					
					form_value = form_field_value[1];						
					
					formdetails =  formdetails + '&' + form_field + '=' + form_value;
				}
			}
		
		});
		
		
		order_type_field = "Order Type";		
		
		for(ot=0;ot<order_type.length;ot++)
		{
			formdetails =  formdetails + '&' + order_type_field+'['+ot+']'+'='+order_type[ot];
		}	
		
		form_components_details = $("#ordercomponents").find('input').serialize();
		
		formdetails =  formdetails + '&' + form_components_details;
		
		var update_action = '';
		if($('#order_info_form').find('#Jobno').val()!='')
		{
			var update_action = 'yes';
			$("#msgbox_text").html("<div>Updating Order...<img src='/images/transparent_loading.gif' style='vertical-align:middle;' /></div>");
			formdetails =  formdetails + '&' + 'order_action=Update_Submit';
		}
		else
		{
			$("#msgbox_text").html("<div>Creating Order...<img src='/images/transparent_loading.gif' style='vertical-align:middle;' /></div>");
			formdetails =  formdetails + '&' + 'order_action=Submit';
		}

		checkSessionActive();
        
		if(fileUploadCount==0)
	      {
			$("#magazineformSubmit").hide();

			$("#msgbox").fadeIn('fast',function(){
				$("#msgbox").css('display','table');
			});
			
				if(update_action == 'yes')
				{
					$.post('/magazines/submit',formdetails,function(data1){
						$("#msgbox").fadeOut('fast');
						$('.inp-text1').trigger('click');
					});
				}
				else
				{
					$.post('/magazines/submit',formdetails,function(data1){
				
						$("#msgbox").fadeOut('fast');
						
						obj = $.parseJSON(data1);
						//alert(obj); return false;
						/*camp_id = obj.CampaignId;
						camp_job_no = obj.CampaignDetails['Job No'];
						camp_order_site = obj.CampaignDetails['order_site'];
						camp_product = obj.CampaignDetails['product'];
						camp_no_of_pages = obj.CampaignDetails['no_of_pages'];
						/*camp_order_type = obj.CampaignDetails['Order_Type'];
						camp_advertiser = obj.CampaignDetails['Advertiser'];
						camp_salesperson= obj.CampaignDetails['Sales_Person'];
						camp_pub_title 	= obj.CampaignDetails['Publication_Title'];*//*
						
						
						camp_detail = "campaign_no="+camp_id+"&camp_job_no="+camp_job_no+"&camp_order_site="+camp_order_site+"&camp_product="+camp_product+"&camp_no_of_pages="+camp_no_of_pages;
						 
						$.post('/magazines/createsubpages', camp_detail, function(orderformdata){
							$( "#sub_pages_form" ).html(orderformdata);
						});*/
					
						$('.inp-text1').trigger('click');
					});
				}
	      }
		else
		{
			$("#msgbox_text").html("<div>Waiting for File Upload to complete...<img src='/images/transparent_loading.gif' style='vertical-align:middle;' /></div>");
				$("#msgbox").fadeIn('fast',function(){
					$("#msgbox").css('display','table');
				});
			magazineSubmit = 1;	
			
		}
	});
	
	$("#subpagesformSubmit").click(function(event){
		
		event.preventDefault();
		
		form_subpages_details = $("#magazine_sub_pages_main_form").serialize();
		
		no_of_pages = $("#no_of_pages").val();
		
		//alert(no_of_pages);
		
		for(i=1; i<=no_of_pages; i++)
		{
			form_subpages_details = form_subpages_details + '&'+ $("#magazine_sub_pages_form"+i).serialize();
			form_subpages_details = form_subpages_details + '&'+ $("#ordercomponents"+i).find('input').serialize();
			var folder_name = $("#ordercomponents"+i).find('input[name="tmp_folder_path"]').val();
			
			form_subpages_details = form_subpages_details + '&tmp_folder_path'+i+'='+folder_name;
		}
		
		//alert(form_subpages_details); return false;
		if(fileUploadCount==0)
		{
			$("#subpagesformSubmit").hide();

			$("#msgbox").fadeIn('fast',function(){
				$("#msgbox").css('display','table');
			});
			
			$.post('/magazines/pagessubmit',form_subpages_details,function(data1){
				$("#msgbox").fadeOut('fast');
				$('.inp-text1').trigger('click');
			});
	    }
		else
		{
			$("#msgbox_text").html("<div>Waiting for File Upload to complete...<img src='/images/transparent_loading.gif' style='vertical-align:middle;' /></div>");
			$("#msgbox").fadeIn('fast',function(){
				$("#msgbox").css('display','table');
			});
			magazineSubOrderSubmit = 1;	
		}
	});
	
	$(".subpage_submit").unbind().click(function(event){
		
		event.preventDefault();
		
		var page_no  = '';
		page_no = $(this).parent().attr("id");
		
		form_subpages_details = $("#magazine_sub_pages_main_form").serialize();
		
		
		form_subpages_details = form_subpages_details + '&'+ $("#magazine_sub_pages_form"+page_no).serialize();
		form_subpages_details = form_subpages_details + '&'+ $("#ordercomponents"+page_no).find('input').serialize();
		var folder_name = $("#ordercomponents"+page_no).find('input[name="tmp_folder_path"]').val();
		
		form_subpages_details = form_subpages_details + '&tmp_folder_path'+page_no+'='+folder_name;
		form_subpages_details = form_subpages_details + '&single_page=yes&page_no='+page_no;
		
		//alert(form_subpages_details); return false;
		if(fileUploadCount==0)
		{
			$("#msgbox").fadeIn('fast',function(){
				$("#msgbox").css('display','table');
			});
			
			$.post('/magazines/pagessubmit',form_subpages_details,function(data1){
				$("#msgbox").fadeOut('fast');
			});
	    	}
		else
		{
			$("#msgbox_text").html("<div>Waiting for File Upload to complete...<img src='/images/transparent_loading.gif' style='vertical-align:middle;' /></div>");
			$("#msgbox").fadeIn('fast',function(){
				$("#msgbox").css('display','table');
			});
			singleSubOrderSubmit = 1;	
		}
	});
	
});
