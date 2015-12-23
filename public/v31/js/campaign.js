$(document).ready(function(){
	jQuery.fn.enableCampaignChildFields = function(){	
		alert("Haii");

	}

	jQuery.fn.cleanCampaignOrderFields = function(){
		
		$('#order_info_form').find("#4").autocomplete({
			 source: function( request, response ) {
				 site = $("#1").val();
				 $.ajax({
					 url: "/orders/advertisers?id="+encodeURIComponent(site),
					 dataType: "json",
					 data: {				 
						 maxRows: 5,
						 name_startsWith: request.term						 
					 },
					 success: function( data ) {
						 response( $.map( data.advertisers, function( item ) {
							 return {
							 	label: item.name,
							 	value: item.name
							 }
						 }));
					 }
				 });
			},
			minLength: 2,
			select: function( event, ui ) {
				 /*log( ui.item ?
				 "Selected: " + ui.item.label :
				 "Nothing selected, input was " + this.value);*/
				 $("#4").val(this.value);
			},
			open: function() {
				$( this ).removeClass( "ui-corner-all" ).addClass( "ui-corner-top" );
				$('.ui-menu').width(255);
				$('.ui-menu').css({'left':'12px','top':'20px','position':'absolute','z-index':'10'});
				$(this).parent().append($('.ui-menu'));
			},
			close: function() {
				 $( this ).removeClass( "ui-corner-top" ).addClass( "ui-corner-all" );
			}
		});
		
		
		$('#order_info_form').find("#5").autocomplete({
			 source: function( request, response ) {
				 site = $("#1").val();
				 $.ajax({
					 url: "/orders/salespersons?id="+encodeURIComponent(site),
					 dataType: "json",
					 data: {				 
						 maxRows: 5,
						 name_startsWith: request.term						 
					 },
					 success: function( data1 ) {						 
						 response( $.map( data1.salespersons, function( item ) {
							 return {
							 	label: item.name,
							 	value: item.name
							 }
						 }));
					 }
				 });
			},
			minLength: 2,
			select: function( event, ui ) {
				 /*log( ui.item ?
				 "Selected: " + ui.item.label :
				 "Nothing selected, input was " + this.value);*/
				 $("#5").val(this.value);
			},
			open: function() {
				$( this ).removeClass( "ui-corner-all" ).addClass( "ui-corner-top" );
				$('.ui-menu').width(255);
				$('.ui-menu').css({'left':'12px','top':'20px','position':'absolute','z-index':'10'});
				$(this).parent().append($('.ui-menu'));
			},
			close: function() {
				 $( this ).removeClass( "ui-corner-top" ).addClass( "ui-corner-all" );
			}
		});
		
		$('#order_info_form').find("#6").autocomplete({
			 source: function( request, response ) {
				 site = $("#1").val();
				 $.ajax({
					 url: "/orders/publication?id="+encodeURIComponent(site),
					 dataType: "json",
					 data: {				 
						 maxRows: 5,
						 name_startsWith: request.term	
					 },
					 success: function( data1 ) {						 
						 response( $.map( data1.Publishers, function( item ) {
							 return {
							 	label: item.pub,
							 	value: item.pub
							 }
						 }));
					 }
				 });
			},
			minLength: 2,
			select: function( event, ui ) {
				 /*log( ui.item ?
				 "Selected: " + ui.item.label :
				 "Nothing selected, input was " + this.value);*/
				 $("#6").val(this.value);
			},
			open: function() {
				$( this ).removeClass( "ui-corner-all" ).addClass( "ui-corner-top" );
				$('.ui-menu').width(255);
				$('.ui-menu').css({'left':'12px','top':'20px','position':'absolute','z-index':'10'});
				$(this).parent().append($('.ui-menu'));
			},
			close: function() {
				 $( this ).removeClass( "ui-corner-top" ).addClass( "ui-corner-all" );
			}
		});
		
		$('#order_info_form').find("#16").autocomplete({
			 source: function( request, response ) {
				 site = $("#1").val();
				 $.ajax({
					 url: "/orders/pickup?id="+encodeURIComponent(site),
					 dataType: "json",
					 data: {				 
						 maxRows: 5,
						 name_startsWith: request.term						 
					 },
					 success: function( data1 ) {						 
						 response( $.map( data1.pickup, function( item ) {							 
							 return {
								 
							 	label: item.pickupno,
							 	value: item.pickupno
							 }
						 }));
					 }
				 });
			},
			minLength: 2,
			select: function( event, ui ) {
				 /*log( ui.item ?
				 "Selected: " + ui.item.label :
				 "Nothing selected, input was " + this.value);*/
				 $("#16").val(this.value);
			},
			open: function() {
				$( this ).removeClass( "ui-corner-all" ).addClass( "ui-corner-top" );
				$('.ui-menu').width(255);
				$('.ui-menu').css({'left':'12px','top':'20px','position':'absolute','z-index':'10'});
				$(this).parent().append($('.ui-menu'));
			},
			close: function() {
				showordercomponents(this.value);
				 $( this ).removeClass( "ui-corner-top" ).addClass( "ui-corner-all" );
			}
		});

		$('#order_info_form').find("#19").autocomplete({
			 source: function( request, response ) {
				 site = $("#1").val();
				 $.ajax({
					 url: "/orders/template?id="+encodeURIComponent(site),
					 dataType: "json",
					 data: {				 
						 maxRows: 5,
						 name_startsWith: request.term	
					 },
					 success: function( data1 ) {						 
						 response( $.map( data1.template, function( item ) {							 
							 return {
								 
							 	label: item.template,
							 	value: item.template
							 }
						 }));
					 }
				 });
			},
			minLength: 2,
			select: function( event, ui ) {
				 /*log( ui.item ?
				 "Selected: " + ui.item.label :
				 "Nothing selected, input was " + this.value);*/
				 $("#19").val(this.value);
			},
			open: function() {
				$( this ).removeClass( "ui-corner-all" ).addClass( "ui-corner-top" );
				$('.ui-menu').width(255);
				$('.ui-menu').css({'left':'12px','top':'20px','position':'absolute','z-index':'10'});
				$(this).parent().append($('.ui-menu'));
			},
			close: function() {
				 $( this ).removeClass( "ui-corner-top" ).addClass( "ui-corner-all" );
			}
		});
			
		//$("select").change(function(){
		$('#order_info_form').on('change','select',function(){
			
			if($(this).parent().parent().parent().hasClass('selectContainer'))
			{
				return;
			}
			
			parent_name = $(this).attr('name');
			selected_val = $(this).val();
			order_type = $(this).parent().attr('order_type');
			obj = $(this);		
			//alert(parent_name);
			if(parent_name=="") return;
			
			$('#order_info_form').find('div[parent="'+parent_name+'"]').hide();
			$('#order_info_form').find('div[parent="'+parent_name+'"][parent_value="Custom"]').show();
			$('#order_info_form').find('div[parent="'+parent_name+'"][parent_value="'+selected_val+'"]').show();
			
			$("#order_info_form").find('[name="Camera Ready"]').each(function(){

                var camera_ready = $(this).val();
                var pick_up_ad = $("#16").val();

				if((camera_ready == 'Yes' &&  pick_up_ad == '') || (camera_ready == 'Yes' &&  pick_up_ad !=''))
				{
				        $("#order_info_form").find("[parent='Build Type']").css('display','none');
				}
            });

			//obj.enableCampaignChildFields();
			
		});
	
			
		$("#order_info_form").find('[data-role="slider"]').each(function(){
			$(this).switchify();
		});
		
				
		$("#order_info_form .customSelect").each(function(){
			$(this).mySelectBox();
		});
		
		$("#order_info_form").find("div[parent]").each(function(){
			
			if($(this).attr('parent')!='' && ($(this).attr('changeval')=='' || ($(this).attr('parent_value')!=$("div[order_type='"+$(this).attr('order_type')+"'] [name='"+$(this).attr('parent')+"']").val() && $(this).attr('parent_value')!='depend')))
			{				
				$(this).fadeOut('fast');
			}
		});
	};
	
	$('#campaignformSubmit').click(function(event){
		
		event.preventDefault();
	
		var $master_order_due_date = '';
		//campaign main order info validation
		$formid_obj = $('#order_info_form');
		
		var objRegExp  =  /^[\w\.\-]+$/;
		//check for numeric characters					
		$formid_obj.find("[name='CampaignNumber']").css('background-color','');
		if(!objRegExp.test($formid_obj.find("[name='CampaignNumber']").val()) && $formid_obj.find("[name='CampaignNumber']").parent().css('display')!='none')
		{
			$("#msgbox_text").html("<div><br/>Campaign Name should be Alphanumeric <br/><br/>" +
			"					<img id='create_ok' src='/images/ok.gif' style='vertical-align:middle;' /></div>");
			$("#msgbox").fadeIn('fast',function(){
				$("#msgbox_table").css('width','350px');
				$("#msgbox").css('display','table');
				$("#create_ok").click(function(){
					$("#msgbox").fadeOut('fast');
					$formid_obj.find("[name='CampaignNumber']").css('background-color','#FF0000');
				});
			});
			return false;
		}
		
		var $errFlag = false;
		
		$formid_obj.find("div[order_type][mandatory='1']:visible").each(function(){
			$(this).find('input').each(function()
			{
				if( $(this).attr('name')!='order_number' && ( $(this).val()=='' || $(this).val()=='--Select--') || $(this).val()==$(this).attr('name'))
				{						
					if($(this).val()=='--Select--' || $(this).attr('name')==$(this).val())
					{
						$(this).parent().prev().css('background-color','#FF0000');
						$errFlag = true;
					}
					else if(!$(this).hasClass('dpicker'))
					{
						$(this).css('background-color','#FF0000');
						$errFlag = true;
					}
					else if($(this).hasClass('dpicker') && ($(this).val()=='' || $(this).val()==$(this).attr('name')))
					{
						$(this).parent().parent().parent().css('background-color','#FF0000');
						$errFlag = true;
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
						$errFlag = true;
					}
					else if(!$(this).hasClass('dpicker'))
					{
						$(this).css('background-color','#FF0000');
						$errFlag = true;
					}
				}
				else
				{					
					$(this).parent().parent().parent().parent().css('background-color','');						
					$(this).css('background-color','');					
				}
			});
		});
		
		if($errFlag)
		{
			$("#msgbox_text").html("<div><br/>Please fill in the Mandatory Fields in Order Main Info<br/><br/>" +
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
		//campaign main order info validation
		
		var $num_of_sub_orders = $('#tabContainer').children().length;
		
		//alert($num_of_sub_orders);
		
		if($num_of_sub_orders=='0')
		{
			$("#msgbox_text").html("<div><br/>Please create atleast one suborder <br/><br/>" +
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
		
		var $i;
		for($i=1; $i<=$num_of_sub_orders; $i++)
		{
			var $formid_obj = $('#Form'+$i);
			
			var $formOrderType = $('#Form'+$i).find('[name="OrderType"]').val();
			
			//alert($formOrderType);
			
			if($formOrderType=='' || $formOrderType==undefined)
			{
				$("#msgbox_text").html("<div><br/>Order Type is missing in Suborder"+$i+"<br/><br/>" +
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
			$formid_obj.find("[name='Tracking No']").css('background-color','');
			if(!objRegExp.test($formid_obj.find("[name='Tracking No']").val()) && $formid_obj.find("[name='Tracking No']").parent().css('display')!='none')
			{
				$("#msgbox_text").html("<div><br/>Tracking Number should be Alphanumeric in Suborder"+$i+"<br/><br/>" +
				"					<img id='create_ok' src='/images/ok.gif' style='vertical-align:middle;' /></div>");
				$("#msgbox").fadeIn('fast',function(){
					$("#msgbox_table").css('width','350px');
					$("#msgbox").css('display','table');
					$("#create_ok").click(function(){
						$("#msgbox").fadeOut('fast');
						$formid_obj.find("[name='Tracking No']").css('background-color','#FF0000');
					});
				});
				return false;
			}
			
			if($.trim($formid_obj.find("[name='Tracking No']").val()) == $.trim($('#order_info_form').find("[name='CampaignNumber']").val()))
			{
				$("#msgbox_text").html("<div><br/>Tracking Number should be different against Camapign Name in Suborder"+$i+"<br/><br/>" +
				"					<img id='create_ok' src='/images/ok.gif' style='vertical-align:middle;' /></div>");
				$("#msgbox").fadeIn('fast',function(){
					$("#msgbox_table").css('width','350px');
					$("#msgbox").css('display','table');
					$("#create_ok").click(function(){
						$("#msgbox").fadeOut('fast');
						$formid_obj.find("[name='Tracking No']").css('background-color','#FF0000');
					});
				});
				return false;
			}
			
			var $errFlag = false;
			
			$formid_obj.find("div[order_type][mandatory='1']:visible").each(function(){
				$(this).find('input').each(function()
				{
					if( $(this).attr('name')!='order_number' && ( $(this).val()=='' || $(this).val()=='--Select--') || $(this).val()==$(this).attr('name'))
					{						
						if($(this).val()=='--Select--' || $(this).attr('name')==$(this).val())
						{
							$(this).parent().prev().css('background-color','#FF0000');
							$errFlag = true;
						}
						else if(!$(this).hasClass('dpicker'))
						{
							$(this).css('background-color','#FF0000');
							$errFlag = true;
						}
						else if($(this).hasClass('dpicker') && ($(this).val()=='' || $(this).val()==$(this).attr('name')))
						{
							$(this).parent().parent().parent().css('background-color','#FF0000');
							$errFlag = true;
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
							$errFlag = true;
						}
						else if(!$(this).hasClass('dpicker'))
						{
							$(this).css('background-color','#FF0000');
							$errFlag = true;
						}
					}
					else
					{					
						$(this).parent().parent().parent().parent().css('background-color','');						
						$(this).css('background-color','');					
					}
				});
			});
			
			if($formid_obj.find('#14').val()=='--Select--' || $formid_obj.find('#14').val()=='' || $formid_obj.find('#14').val()==null)
			{
				$formid_obj.find('#14').parent().parent().parent().parent().css('background-color','#FF0000');
				$errFlag = true;
			}
			else if($formid_obj.find("#14").val() == 'Other' && $formid_obj.find("[name='OtherDate']").val() == "") 
			{
				$formid_obj.find("[name='OtherDate']").parent().parent().css({'background-color':'#FF0000','width':'135px'});
				$errFlag = true;
			}
			else
			{
				$formid_obj.find('#14').parent().parent().parent().parent().css('background-color','');
			}
			
			//alert("delivery "+$formid_obj.find('#14').val());
			if($errFlag)
			{
				$("#msgbox_text").html("<div><br/>Please fill in the Mandatory Fields  in Suborder"+$i+"<br/><br/>" +
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
		
		//alert('validation done');
		
		$form_details = new Array();
		
		var $order_info_form_details = $("#order_info_form").serialize();
		
		var $i;
		for($i=1; $i<=$num_of_sub_orders; $i++)
		{
			var $suborder_form_detail = ''; 
			
			var $formid_obj = $('#Form'+$i);
			
			var $formOrderType = $('#Form'+$i).find('[name="OrderType"]').val();
			
			var $tracking_no = $('#Form'+$i).find('[name="Tracking No"]').val();
			
			$suborder_form_detail = $order_info_form_details;
			
			$suborder_form_detail = $suborder_form_detail+ '&Order+Type=' +$formOrderType+'&Tracking+No='+$tracking_no;
			
			var $delivery_detail = $formid_obj.find("#14").serialize();
			
			$suborder_form_detail = $suborder_form_detail+ '&' +  $delivery_detail;
			
			if($formid_obj.find("#14").val() == 'Other') 
			{
				$suborder_form_detail = $suborder_form_detail+ '&' +  $formid_obj.find("[name='OtherDate']").serialize();
			}
			
			
			//form order type detail array
			$order_type = new Array();
			
			var $ord_type_cnt = 0;
			
			$order_type[$ord_type_cnt++] = $formOrderType;
			
			var $form_spec_details = $formid_obj.find("#order_spec_form_"+$formOrderType).serialize();
			
			var $form_spec_details_arr = $form_spec_details.split("&");
			
			var $additional_version = 0;
			var $size_change_only = 'No';
			var $fe='';
			
			for($fe=0;$fe<$form_spec_details_arr.length;$fe++)
			{
				$form_field_value = $form_spec_details_arr[$fe].split('=');
				
				if($form_field_value[0]=='OrderType' || $form_field_value[0]=='Tracking+No') {continue;}
				
				$form_field = $formOrderType+'['+$form_field_value[0]+']';
				
				$form_value = $form_field_value[1];
				
				if($form_field_value[0] == "Additional+Versions")
				{
					$additional_version = $form_field_value[1];
				}
				
				if($form_field_value[0] == "Size+Change+Only")
				{
					$size_change_only = $form_field_value[1];
				}
				
				$suborder_form_detail =  $suborder_form_detail + '&' +  $form_field+'='+$form_value;
			}
			//form order type detail array
			
			//adding order type field
			$suborder_form_detail =  $suborder_form_detail + '&Order Type[0]='+$formOrderType;
			//adding order type field
			
			//order components part
			$form_components_details = $formid_obj.find("#OrderComponents"+$i).find('input').serialize();
			//order components part
			
			$suborder_form_detail =  $suborder_form_detail + '&' + $form_components_details;
			
			$suborder_form_detail =  $suborder_form_detail + '&order_action=Submit';
			
			$form_details[$i] = $suborder_form_detail;
		}
		
		
		//posting orders
		checkSessionActive();
		
		$("#formSubmit").hide();
		
		var $i;
		var $j = 1;
		
		jQuery.ajaxSetup({async:false});
		for($i=1; $i<=$num_of_sub_orders; $i++)
		{
			
			//alert($form_details[$i]); return false;
			$("#msgbox").fadeIn('fast',function(){
				$("#msgbox").css('display','table');
			});
			
			$("#msgbox_text").html("<div>Creating Order  "+$i+"...<img src='/images/transparent_loading.gif' style='vertical-align:middle;' /></div>");
			
			$.post('/campaigns/submit',$form_details[$i],function(data1){
				
				$("#msgbox").fadeOut('fast');
				$j++;
			});
		}
		jQuery.ajaxSetup({async:true});
		
		if($i == $j)
		{
			$('.inp-text1').trigger('click');
		}
	});
		
});

