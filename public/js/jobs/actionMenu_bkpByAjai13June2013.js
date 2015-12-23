function showMenu(clickID , popupID)
{
	var clickIDArrays = clickID.split(",");
	var status;
	var relJobDetailsWithSeparator;
	var jsonData;
	var cnt=0;
	//var jsonData = '[{"name":"createjobBox","openFlag":1},{"name":"SearchAnythingBox","openFlag":1},{"name":"filterBox","openFlag":1},{"name":"analyticsBox","openFlag":1},{"name":"jobStatusBox","openFlag":1},{"name":"messageAlertBox","openFlag":1}]';
	$.post("/dashboard/dashboardmenu", function(data) {
		
		jsonData = data;
		jsonData  = eval(jsonData);
		//var jsonDataForMenu = '[{"id": "SearchAnythingBox","name":"SEARCH"},{"id": "filterBox","name":"FILTERS"},{"id": "analyticsBox","name":"ANALYTICS"},{"id": "jobStatusBox","name":"JOB STATUS"},{"id": "messageAlertBox","name":"ALERTS"}]';
		var jsonDataForMenu = new Array();
		$.each(jsonData, function(index, value)
		{
			//alert(this.name);
			
				if (this.name=='SearchAnythingBox' && this.openFlag=='0')
				{
					jsonDataForMenu.push({"id": "SearchAnythingBox","name":"SEARCH"});
					cnt++;
				}
				if (this.name=='filterBox' && this.openFlag=='0')
				{
					jsonDataForMenu.push({"id": "filterBox","name":"FILTERS"});
					cnt++;
				}
				if (this.name=='analyticsBox' && this.openFlag=='0')
				{
					jsonDataForMenu.push({"id": "analyticsBox","name":"REPORTS"});
					cnt++;
				}
				if (this.name=='jobStatusBox' && this.openFlag=='0')
				{
					jsonDataForMenu.push({"id": "jobStatusBox","name":"JOB STATUS"});
					cnt++;
				}
				if (this.name=='messageAlertBox' && this.openFlag=='0')
				{
					jsonDataForMenu.push({"id": "messageAlertBox","name":"ALERTS"});
					cnt++;
				}
			
				
				
		});
		var hide;
		var addMenu = '';
		jsonBoxData  = eval(jsonDataForMenu);
		
		if (cnt == 1)
			{
				hide = true;
			}
		else
			{
				hide = false;
			}
		
		$.each(jsonBoxData, function(index, value)
		{
			addMenu +=  '<li class="add-button" ><a href="#"  href="#" rel="'+this.id+'" >'+this.name+'</a></li>';
		});
		
		var StartTable	= '<ul>';
		var EndTable	=  '</ul>';
		var createMenuDivHtml	= StartTable + addMenu + EndTable;	
		
		$.each(clickIDArrays, function(){
			$("#"+this).click(function(){
				var offset = $(this).offset();
				$("#"+popupID).show();
				$("#"+popupID).html(createMenuDivHtml);
				$("#"+popupID).offset({ top: offset.top, left: offset.left});
				$("#"+popupID).css("z-index", "10");
				$("#"+popupID).hover(
					function () {
						$(this).show();
					}, 
					function () {
						$(this).hide();
					}
				);
				/* Add Box OnClick Event-Call */
				$("li.add-button a").click(function () { 
					addBoxesOnDashboard($(this).attr('rel'),hide);
					
				});
				
				/* End -OnClick*/
			});
		});
	});
	
}

/**
 * Function (box_hover) is used to show and hide.
 * used on Dashboard
 * 
 * @return null.
*/
function box_hover(clickClass, hoverClass)
{
	$("."+clickClass).hover(
		function () {
			$(this).addClass(hoverClass);
		}, 
		function () {
			$(this).removeClass(hoverClass);
		}
	);
}

/**
 * Function (readCookie) is used to Read Cookie
 * used for dashboard Box 
 * 
 * @return null.
*/
function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

/**
 * Function (createCookie) is used to create Cookie
 * used for dashboard Box 
 * 
 * @return null.
*/
function createCookie(name,value,days) {
	var value = rawurlencode (value);
    if (days) {
        var date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        var expires = "; expires="+date.toGMTString();
    }
    else var expires = "";
    document.cookie = name+"="+value+expires+"; path=/";
    
    $.ajax({
		url: '/dashboard/managedashboard',
		type: 'POST',
		data: "request_action=UPDATE_DASHBOARD_DATA&dashboard_detail="+value,
		dataType: 'json',
		beforeSend: function() {
			//
		},
		success: function(jsondata) {
				//alert(JSON.stringify(jsondata));
		},
		error: function(errorThrown) {
			//$('#'+id+' .contentarea').html(textStatus);
		}
	});
}

/**
 * Function (addBoxesOnDashboard) is used to Add Box on dashboard
 * used for dashboard Box 
 * 
 * @return null.
*/
function addBoxesOnDashboard(tmp,hide)
{	
	var tmp;
	var nameCookieData = 'jsonBoxCookieData';
	var jsonBoxDataFromCookieEnc = readCookie('jsonBoxCookieData');
	var jsonBoxDataFromCookie = rawurldecode(jsonBoxDataFromCookieEnc);
	jsonBoxData  = eval(jsonBoxDataFromCookie);
	$.each(jsonBoxData, function(index, value)
	{
		if (this.name == tmp ){
			if (this.openFlag == 1) {
				flagCheck  = false; 
			} else {
				this.openFlag = 1;
				flagCheck  = true; 
			}
		}
	});
	if (flagCheck) {
		jsonBoxData = JSON.stringify(jsonBoxData);
		createCookie(nameCookieData,jsonBoxData,45);
		$.post('/view/dashboard', function(data) {
			  $('#main_body').html(data);
			  if (hide==true)
			  {
					$("#blankbox").hide();
			  }
		});
	}
	
}

/**
 * Function (displayBoxesOnDashboard) is used to display Boxes On Dashboard.
 * used on Dashboard
 * 
 * @return null.
*/
function displayBoxesOnDashboard()
{
	var nameCookieData = 'jsonBoxCookieData';
	//var jsonBoxDataForCookie = '[{"name":"createjobBox","openFlag":1},{"name":"SearchAnythingBox","openFlag":1},{"name":"filterBox","openFlag":1},{"name":"analyticsBox","openFlag":1},{"name":"jobStatusBox","openFlag":1},{"name":"messageAlertBox","openFlag":1}]';
	//createCookie(nameCookieData,jsonBoxDataForCookie,45);
	var jsonBoxDataFromCookieEnc = readCookie('jsonBoxCookieData');
	var jsonBoxDataFromCookie = rawurldecode(jsonBoxDataFromCookieEnc);
	
	//alert(jsonBoxDataFromCookie);
	jsonBoxData  = eval(jsonBoxDataFromCookie);
	
	$.each(jsonBoxData, function(index, value)
	{
		if (this.openFlag == 0){
			$("#"+this.name).remove();
		}
	});
}

/**
 * Function (closeBox) is used to close the Box.
 * used on Dashboard
 * 
 * @return null.
*/
function closeBox()
{
	$(".close-button a").click(function(){
		//alert($(this).parent().parent().attr('id'));
		$("#blankbox").show();
		var tmp; 
		var nameCookieData = 'jsonBoxCookieData';
		tmp = $(this).parent().parent().attr('id');
		var jsonBoxDataFromCookieEnc = readCookie('jsonBoxCookieData');
		jsonBoxDataFromCookie = rawurldecode(jsonBoxDataFromCookieEnc);
		jsonBoxData  = eval(jsonBoxDataFromCookie);
		$.each(jsonBoxData, function(index, value)
		{
			if (this.name == tmp ){
				this.openFlag = 0;
			}
		});
		jsonBoxData = JSON.stringify(jsonBoxData);
		createCookie(nameCookieData,jsonBoxData,45);
		removeOddEven();
		//$(this).parent().parent().remove();
		$(this).parent().parent().remove();
		//$(this).parent().parent().hide();
		//$(this).parent().parent().fadeOut("slow");
		addOddEven();
	});
}
/**
 * Function (removeOddEven) is used to Remove Odd and Even Color.
 * used on Dashboard
 * 
 * @return null.
*/
function removeOddEven()
{
	$(".content div.box:odd").removeClass("green-bg");
	$(".content div.box:even").removeClass("grey-bg");
}
/**
 * Function (addOddEven) is used to Add Odd and Even Color.
 * used on Dashboard
 * 
 * @return null.
*/
function addOddEven()
{
	$(".content div.box:odd").addClass("green-bg");
	$(".content div.box:even").addClass("grey-bg");
}

/**
 * Function (showMessageResponse) is used to show MessageBoard submit Response.
 * and its used in viewjob.phtml 
 * 
 * @return null.
*/
function showMessageResponse()  {
	//alert(responseText);
	messageJob($("#orderNumber").val());
	$("#formOutput").html("Your message sent successfully.");
}

/**
 * Function (showPopup) is used to create Menu. 
 * 
 * @return null.
*/
function showPopup(clickID , popupID)
{
	var clickIDArrays = clickID.split(",")
	var status;
	var relJobDetailsWithSeparator;
	
	$.each(clickIDArrays, function(){
		$("#"+this).unbind().click(function(){
			
			var offset = $(this).offset();
			$("#"+popupID).show();
			
			var jobIDArrays = $(this).attr('id').split("_")
			var jobID = jobIDArrays[1];
			
			/* Set Job Detail in JS Var */ 
			relJobDetailsWithSeparator = $(this).attr('rel');
			JobDetailsArray = relJobDetailsWithSeparator.split("##");
			status = JobDetailsArray[0];
			submittedBy = JobDetailsArray[1];			
			
			createMenuDivHtmlTxt  = createMenuDivHtml(status,jobID);
			$("#"+popupID).html(createMenuDivHtmlTxt);
			//$("#"+popupID).offset({ top: (offset.top)+15, left: (offset.left)+15});
			$("#"+popupID).offset({ top: (offset.top)+2, left: (offset.left)-36});
			$("#"+popupID).css("z-index", "10");
			$("#"+popupID).hover(
				function () {
					$(this).show();
				}, 
				function () {
					$(this).hide();
				}
			);
			$('#changeJob_'+jobID).click(function(){
				$.post('/orders/create',{"jobno":jobID},function(data){	
					$('.content-main-left').css({"width" : '900px'});
					$('#dashboard').remove();
					$('#orderlist').remove();
					$('#order_details').remove();
					$('#main_body').html('');
					$('#main_body').html(data);
					
					var pos = $(".ui-draggable").position();
					var widthinp = $(".inp").width();
					
					var slider_width = $(".ui-draggable").width();
					var setpos = widthinp/2 - slider_width/2;
					
					$(".ui-draggable").animate({left : setpos+'px'},1000,function(){
						$("#dragHandle").html("UPDATE JOB");
					});
					
				});
			});
			
			$('#printJob_'+jobID).click(function(){
				//alert();
				$('#jobId').val(jobID);
				printJob();
			});
			$('#pickupJob_'+jobID).click(function(){
				
				pickupJob();
			});
			$('#cancelJob_'+jobID).click(function(){	
				//--
				$('#cancelOrderDialog').find('#jobno').html(jobID);
				$('#requester').val(submittedBy);
				cancelJob(jobID);
				//--
			});
			$('#changeOwner_'+jobID).click(function(){	
				//--
				$.ajax({
					url: '/orders/getownerlist',
					type: 'POST',
					data: "form_action=change_owner_list&jobno="+jobID,
					dataType: 'json',
					beforeSend: function() {
						//
					},
					success: function(jsondata) {
							$("select#changeTo").html('');
							//alert(jsondata.length);
							if (jsondata.length > 0) {
								$('#changeTo').append('<option value="Select Owner" selected="selected">Select Owner</option>');
								$.each(jsondata,function(key,val) {
									$('#changeTo').append('<option value="'+ val + '">' + val + '</option>');
								});
							} else {
								$('#changeTo').append('<option value="">Select Owner</option>');
							}
						
							$('#dialog-changeowner').find('#jobno').html(jobID);
							
							$('#dialog-changeowner').find('input[name="currentOwner"]').val(submittedBy);
							//alert($('#changeOwnerDialog').find('input[name="currentOwner"]').val());
							changeOwner(jobID, submittedBy);
					},
					error: function(errorThrown) {
						//$('#'+id+' .contentarea').html(textStatus);
					}
				});
				//--
			});
			$('#messageJob_'+jobID).click(function(){	
				//--
				messageJob(jobID);
				//--
			});
			$('#feedBack_'+jobID).click(function(){	
				//--
				var FeedbackComments = '';
				var FeedbackRatings = 0;
				$('#feedbackDialog').find('#jobno').html(jobID);
				$.ajax({
							url: '/orders/fetchfeedback',
							type: 'POST',
														data: "form_action=feedbacks&jobno="+jobID,
														dataType: 'json',
							beforeSend: function() {
							//$('#emailproofLoading').html('<img src="http://www.jquery4u.com/function-demos/functions/ajax/images/loading.gif" />');
							},
							success: function(jsondata) {
								if(jsondata.FeedBacks.length > 0){
									//alert(jsondata.FeedBacks.length);
									FeedbackComments = jsondata.FeedBacks[jsondata.FeedBacks.length-1].FeedbackComments; 
									FeedbackRatings = jsondata.FeedBacks[jsondata.FeedBacks.length-1].FeedbackRatings;
								}
								
								$('#rating').val(FeedbackRatings);
								changeRating(FeedbackRatings);
								$('#comments').val(FeedbackComments);
							},
							error: function(errorThrown) {
//$('#'+id+' .contentarea').html(textStatus);
}
				});
				
				feedBack(jobID);
				//--FeedbackRatings
			});
			$('#accept_'+jobID).click(function(){	
				//--
				$('#acceptOrderDialog').find('#jobno').html(jobID);
				accept(jobID);
				//--
			});
			$('#emailProof_'+jobID).click(function(){	
				//--
				$('#jobId').val(jobID);
				
				$.ajax({
url: '/orders/emailproofget',
type: 'POST',
async: false,
							data: "form_action=eproof&jobno="+jobID,
							dataType: 'json',
beforeSend: function() {
//$('#emailproofLoading').html('<img src="http://www.jquery4u.com/function-demos/functions/ajax/images/loading.gif" />');
},
success: function(jsondata) {
								$('#Subject').val(jsondata.subject);
								$('#Message').val(jsondata.message);
								$('#HTMLMessage').val(jsondata.htmlmessage);
								
							},
							error: function(errorThrown) {
//$('#'+id+' .contentarea').html(textStatus);
}
				});
				
				emailProof();
				//var json = '{"subject":"Your ad ROF is available for proof","message":"You"}';
				//data = $.parseJSON(data);
				//alert(json);
				//-- 
			});
			$('#revise_'+jobID).click(function(){	
				//--
				$('#jobId').val(jobID);
				revise();
				//--
			});
			$('#assignJob_'+jobID).click(function(){	
				//--
				$.ajax({
					url: '/orders/getallstudios',
					type: 'POST',
					data: "form_action=get_all_studio_list&jobno="+jobID,
					dataType: 'json',
					beforeSend: function() {
						//
					},
					success: function(jsondata) {
							$('#assignDialog').find('#jobno').html(jobID);
							data = jsondata;
							select_container = $('#assignToStudio').parent();
							select_container.html('');
							
							assign_studio_select_box = $("<select name='assign_sProvider' id='assignToStudio' class='select_field' onchange='getUsersForStudio(selected_text);'></select>");
							assign_studio_select_box.append('<option value="--Select--">--Select--</option>');
							
							$.each(data,function(key,val) {
								assign_studio_select_box.append('<option value="'+ val + '">' + val + '</option>');
							});
							
							select_container.append(assign_studio_select_box);
							
							$('#assignDialog').find('#jobno').html(jobID);
							assignJob(jobID);
					},
					error: function(errorThrown) {
						//$('#'+id+' .contentarea').html(textStatus);
					}
				});
				//--
			});
		});
	});
}

/**
 * Function (createMenuDivHtml) is used to create HTML for Menue and 
 * called inside the (showPopup)function. 
 * 
 * @return null.
*/
function createMenuDivHtml(status,jobID)
{
	var createMenuDivHtml = '';
	/**/
	var StartTable  = '<ul>';
	var EndTable  =  '</ul>';
	var changeLI 		=  '<li><a href="#" id="changeJob_'+jobID+'" ><img src="/images/change.png" />Change</a></li>';
	//var pickupLI 		=  '<li><a href="#" id="pickupJob_'+jobID+'" ><img src="/images/pickup.png" />Pickup</a></li>';
	var changeOwnerLI 	=  '<li><a href="#" id="changeOwner_'+jobID+'"><img src="/images/change.png" width="13" height="15"/>Change Owner</a></li>';
	var printLI 	  	=  '<li><a href="#" id="printJob_'+jobID+'" ><img src="/images/print.png" width="16" height="12"/>Print</a></li>';
	var messageLI 	  	=  '<li><a href="#" id="messageJob_'+jobID+'" ><img src="/images/message.png" width="16" height="11"/>Message</a></li>';
	var cancelJobLI 	=  '<li><a href="#" id="cancelJob_'+jobID+'" ><img src="/images/cancel.png" width="16" height="11"/>Cancel</a></li>';
	var assignJobLI 	=  '<li><a href="#" id="assignJob_'+jobID+'" ><img src="/images/pickup.png" width="16" height="12"/>Assign</a></li>';
	
	var acceptLI 		=  '<li><a href="#" id="accept_'+jobID+'" ><img height="12" width="13" src="/images/accept.png"> Accept</a></li>';
	var feedBackLI 		=  '<li><a href="#" id="feedBack_'+jobID+'" ><img src="/images/feedback.png" width="13" height="15"/>FeedBack</a></li>';
	var emailProofLI 	=  '<li><a href="#" id="emailProof_'+jobID+'" ><img src="/images/email-proof.png" width="14" height="11"/>E-Mail Proof</a></li>';
	var reviseLI 		=  '<li><a href="#" id="revise_'+jobID+'" ><img src="/images/revise.png" width="13" height="12"/>Revise</a></li>';
	var archiveVisualsLI=  '<li><a href="#" id="archiveVisuals_'+jobID+'" ><img src="/images/revise.png" width="13" height="12"/>Archive Visuals</a></li>';
	
	
	/*
	 * Action Items Part Starts Here
	 */
	var actionItemsArray = status.split(',');

	createMenuDivHtml = StartTable;
	
    for(var i=0;i<actionItemsArray.length;i++)
    {
        //alert(actionItemsArray[i]);
    	if(actionItemsArray[i]=='EDIT_ORDER')
    	{
    		createMenuDivHtml += changeLI;
    	}
    	//if(actionItemsArray[i]=='PICKUP_ORDER')
    	//{
    	//	createMenuDivHtml += pickupLI;
    	//}
    	if(actionItemsArray[i]=='ACCEPT_ORDER')
    	{
    		createMenuDivHtml += acceptLI;
    	}
    	if(actionItemsArray[i]=='REVISE_ORDER')
    	{
    		createMenuDivHtml += reviseLI;
    	}
    	if(actionItemsArray[i]=='CANCEL_ORDER')
    	{
    		createMenuDivHtml += cancelJobLI;
    	}
    	if(actionItemsArray[i]=='ASSIGN')
    	{
    		createMenuDivHtml += assignJobLI;
    	}
    	if(actionItemsArray[i]=='MESSAGE')
    	{
    		createMenuDivHtml += messageLI;
    	}
    	if(actionItemsArray[i]=='ARCHIVE')
    	{
    		createMenuDivHtml += archiveVisualsLI;
    	}
    	if(actionItemsArray[i]=='FEEDBACK')
    	{
    		createMenuDivHtml += feedBackLI;
    	}
    	if(actionItemsArray[i]=='EMAILPROOF')
    	{
    		createMenuDivHtml += emailProofLI;
    	}
    	if(actionItemsArray[i]=='PRINT')
    	{
    		createMenuDivHtml += printLI;
    	}
    	if(actionItemsArray[i]=='CHANGE_OWNER')
    	{
    		createMenuDivHtml += changeOwnerLI;
    	}
        
    }
	createMenuDivHtml =	createMenuDivHtml +	EndTable;
	/*
	if (status == 'Order Entry') {
		//Order Entry
		createMenuDivHtml = StartTable + changeLI + pickupLI + changeOwnerLI + printLI +  cancelJobLI + messageLI + EndTable;
	
	} else if (status == 'Submitted' || status == 'Revised' || status == 'In Production' || status == 'Cancelled') { 
		//-Submitted || Revised || In Production || Cancelled
		createMenuDivHtml = StartTable + pickupLI + changeOwnerLI + printLI + messageLI ;
			if (status != 'Cancelled') {
				createMenuDivHtml =	createMenuDivHtml +	cancelJobLI;
			}
			if (status == 'Submitted' || status == 'Revised') {
				createMenuDivHtml =	createMenuDivHtml +	assignJobLI;
			}
		createMenuDivHtml =	createMenuDivHtml +	EndTable;
	
	}  else if (status == 'Ready for Proof') {
		//Ready for Proof
		//createMenuDivHtml = StartTable + acceptLI + feedBackLI + emailProofLI + reviseLI + archiveVisualsLI + pickupLI + changeOwnerLI + printLI + messageLI + EndTable;
		createMenuDivHtml = StartTable + acceptLI + feedBackLI + emailProofLI + changeOwnerLI + printLI + messageLI + EndTable;
		
	} else if (status == 'Non Compliance-On Hold') {
		//Non Compliance-On Hold
		createMenuDivHtml = StartTable + pickupLI + changeOwnerLI + printLI + cancelJobLI + messageLI +	EndTable;
	
	} else if (status == 'Complete' || status == 'Accepted' || status == 'Archive' || status == 'Quote Requested' || status == 'Quote Submitted' || status == 'Quote Accepted') {
		//Complete || Accepted || Archive || Quote Requested || Quote Submitted || Quote Accepted
		createMenuDivHtml = StartTable + changeOwnerLI + messageLI + printLI + EndTable;
	} else {
		// Else 
		createMenuDivHtml = StartTable + messageLI + EndTable;
	}
	*/
	return createMenuDivHtml;
}


function cancelJob(jobno)
{
	var flag = false ;
	
	/*$( "#dialog-canceljob" ).dialog({
        resizable: false,
        height: 350,
        width: 300,
        modal: true,
        buttons: { 
            "Yes": function() {
				$("#actionMenuCanceljob").submit();
            },
            Cancel: function() {
                $(this).dialog( "close" );
            }
        },
        close: function() {
        	$(this).find("input").each(function(){ $(this).val(""); });
        }
    });*/
	
	$("#msgbox_text").html('');	
	$("#msgbox_text").html($( "#dialog-canceljob" ).html());
	$("#msgbox").css('display','table');
	$("#msgbox").fadeIn('fast',function(){
		$("#msgbox").css('display','table');
	});
	$('#msgbox_text').find('#cancel_form').click(function(e){
		e.preventDefault();
		$("#msgbox").fadeOut('fast');
	});
	
	$('#msgbox_text').find('#submit_form').click(function(e){
		e.preventDefault();
		$("#msgbox_text").find("#actionMenuCanceljob").submit();
	});
	
	$("#msgbox_text").find("#actionMenuCanceljob").validate({
		submitHandler: function(form) {
			$.post('/orders/cancelorder', {
        		jobno: jobno,
                Comments: $('#reason').val(),                
                form_action: 'cancel_order'
            }, function(d){
                //console.log(d);
                // Here we handle the response from the script
                // We are just going to alert the result for now
            	$("#msgbox").fadeOut('fast');
                loadOrderList();
                //alert(d);
            });    		
			
			return false;
		},
		rules:{
			reason: "required"
		}
		/*errorClass : "errorActionMenu",
		errorPlacement: function(error, element)
		{
			//var error_element_name = "#"+element.attr("name")+"_error";
			error.insertAfter(element);
		}*/
	});
}

/**
 * Function (assignJob) is used to assign Job. 
 * 
 * @return null.
*/
function assignJob(jobId)
{
	$("#msgbox_text").html('');	
	$("#msgbox_text").html($( "#dialog-assign" ).html());
	$("#msgbox").fadeIn('fast',function(){
		$("#msgbox").css('display','table');
		
		$("#msgbox").find('.select_field').custSelectBox2({});
	});
	
	
	$('#msgbox_text').find('#cancel_form').click(function(e){
		e.preventDefault();
		$("#msgbox").fadeOut('fast');
	});
	
	$('#msgbox_text').find('#submit_form').click(function(e){
		e.preventDefault();
		$("#msgbox_text").find("#actionMenuAssignJobToUser").submit();
	});
	
	$("#msgbox_text").find("#actionMenuAssignJobToUser").validate({
		submitHandler: function(form) {
					
				$("#msgbox").find('#AssignJobToUser_Jobno').val(jobId);
	        	$.post('/orders/assignjobtostudio',$("#msgbox").find("#actionMenuAssignJobToUser").serialize(),function(data){        		
	        		$("#msgbox").fadeOut('fast');
	        		loadOrderList();        		
        		});
            }			
	});		
}

function getUsersForStudio(studio)
{
 //alert(studioId);
	$.post('/orders/listallstudiousers',{'studio':studio,'form_action':'get_all_studio_users_list'},function(data){
		select_container = $("#msgbox").find("#assign_spcontact_selectbox").parent();
		select_container.html('');
		
		select_obj = $('<select id="assignToUser" name="assign_spcontact" class="required select_field"></select>');
		
		data = $.parseJSON(data);
		//data = jsondata;
		select_obj.append('<option value="--Select--">--Select--</option>');
		$.each(data,function(key,val) {
			select_obj.append('<option value="'+ val + '">' + val + '</option>');
		});
		
		select_container.append(select_obj);
		
		select_obj.custSelectBox2({});		
	});
}

/**
 * Function (accept) is used to accept The Order. 
 * 
 * @return null.
*/
function accept(jobno)
{
	var flag = false ;
	/*$( "#dialog-accept" ).dialog({
	    resizable: false,
	    height: 150,
	    width : 300,
	    modal: true,
	    buttons: { 
	        "Accept": function() {
	        	//----
	        	var res = $.ajax({
		    		url: '/orders/acceptorder',
		    		type: 'POST',
		    		data: "form_action=accept_order&order_number="+$('#jobId').val(),
		    		dataType: 'json',
		    		beforeSend: function() {
		    			//$('#dialog').html('<img src="http://www.jquery4u.com/function-demos/functions/ajax/images/loading.gif" />');
		    		},
		    		success: function(jsondata) {
		    			$("#dialog-accept").dialog("close");
		    			loadOrderList();
		    		},
		    		error: function(errorThrown) {
		    			//$('#'+id+' .contentarea').html(textStatus);
		    		}
				});
		    	
	        },
	        Cancel: function() {
	            $(this).dialog( "close" );
	        }
	    }
	});*/
	
	$("#msgbox_text").html('');	
	$("#msgbox_text").html($( "#dialog-accept" ).html());
	$("#msgbox").fadeIn('fast',function(){
		$("#msgbox").css('display','table');
	});
	$('#msgbox_text').find('#cancel_form').click(function(e){
		e.preventDefault();
		$("#msgbox").fadeOut('fast');
	});
	
	$('#msgbox_text').find('#submit_form').click(function(e){
		e.preventDefault();
		$("#msgbox_text").find("#actionMenuAccept").submit();
	});
	
	$("#msgbox_text").find("#actionMenuAccept").validate({
		submitHandler: function(form) {
			$.ajax({
	    		url: '/orders/acceptorder',
	    		type: 'POST',
	    		data: "form_action=accept_order&order_number="+jobno,
	    		dataType: 'json',
	    		beforeSend: function() {
	    			//$('#dialog').html('<img src="http://www.jquery4u.com/function-demos/functions/ajax/images/loading.gif" />');
	    		},
	    		success: function(jsondata) {
	    			$("#msgbox").fadeOut('fast');
	    			loadOrderList();
	    		},
	    		error: function(errorThrown) {
	    			//$('#'+id+' .contentarea').html(textStatus);
	    		}
			}), function(d){
                //console.log(d);
                // Here we handle the response from the script
                // We are just going to alert the result for now
                loadOrderList();
                //alert(d);
            }			
		}		
	});
}

/**
 * Function (feedBack) is used to accept and feedBack The Order. 
 * 
 * @return null.
*/

function changeRating(rate)
{
	var src;
	
	if($('#msgbox_text').find('#rating').val() >= rate)
	{	for(i=0; i <= $('#rating').val(); i++)
		{
		$('#msgbox_text').find("#img"+i).attr("src","<?php echo $this->baseUrl();?>/images/ratingempty.gif");
		}
	} else if (!($('#rating').val())) {
		for(i=0; i <= 5; i++)
		{
			$('#msgbox_text').find("#img"+i).attr("src","<?php echo $this->baseUrl();?>/images/ratingempty.gif");
		}
	}	
	
	for(i=0; i <= rate; i++)
	{
		$('#msgbox_text').find("#img"+i).attr("src","<?php echo $this->baseUrl();?>/images/rating.gif");
	}
	$('#msgbox_text').find('#rating').val(rate);
}

function feedBack(jobno)
{
	var acceptAd ; 
	var flag = false ;
	/*$( "#dialog-feedback" ).dialog({
	    resizable: false,
	    height: 400,
	    width: 500,
	    modal: true,
	    buttons: { 
	        "Submit": function() {
	        	$("#actionMenuFeedback").submit();
	        	//order_number
	        	//$(this).dialog("close");
	        },
	        Cancel: function() {
	            $(this).dialog( "close" );
	        }
	    },
        close: function() {
        	$(this).find("input").each(function(){ $(this).val(""); });
        	changeRating()
        	
        }
	});*/
	
	$("#msgbox_text").html('');	
	$("#msgbox_text").html($( "#dialog-feedback" ).html());
	$("#msgbox").fadeIn('fast',function(){
		$("#msgbox").css('display','table');
	});
	$('#msgbox_text').find('#cancel_form').click(function(e){
		e.preventDefault();
		$("#msgbox").fadeOut('fast');
	});
	
	$('#msgbox_text').find('#submit_form').click(function(e){
		e.preventDefault();
		$("#msgbox_text").find("#actionMenuFeedback").submit();
	});
	
	// Star selection Validating 
	$.validator.addMethod("checkRating", function(value, element) {
		if($("#msgbox_text").find('#rating').val() == 0)
		{
			return false;
		}
		else
		{
			return true;
		}
	 }, " Please select Rating for this add");
	 
	 // Submit Action - after validation
	 $("#msgbox_text").find("#actionMenuFeedback").validate({	
		submitHandler: function(form) {
			if ($("#msgbox_text").find('#status').attr('checked')) { acceptAd = 1 ; }
	    	else { acceptAd = 0 ; }
			$.post('/orders/feedbackorder', {
	    		order_number: jobno,
	    		jobno: jobno,
	    		feedback_rating: $("#msgbox_text").find('#rating').val(),
	    		accept_ad:acceptAd,
	    		feedback: $("#msgbox_text").find('#comments').val(),
	            form_action: 'order_feedback'
	        }, function(d){
	            //console.log(d);
	            // Here we handle the response from the script
	            // We are just going to alert the result for now
	        	$("#msgbox").fadeOut('fast');
	            loadOrderList();
	            //alert(d);
	        });
    		
			
			return false;
		},
		rules:{
			ratingError:{
				checkRating:true
			}
		}
		/*,
		errorClass : "errorActionMenu",
		errorPlacement: function(error, element)
		{
			//var error_element_name = "#"+element.attr("name")+"_error";
			if(element.attr("name") == "status")
			{
				//var error_element_name = "#"+element.attr("name")+"_error";
				//error.appendTo(error_element_name);
				error.appendTo("#rating_error");
				
			}
			else
			{
				error.insertAfter(element);
			}
		}*/
	});
}


/**
 * Function (emailProof) is used to send Email Proof. 
 * 
 * @return null.
*/
function emailProof()
{
	var flag = false ;
	/*
	$( "#dialog-emailproof" ).dialog({
	    resizable: false,
	    height: 600,
	    width: 500,
	    modal: true,
	    buttons: { 
	        "Accept": function() {
				//$('input[name=email_source]:checked', '#actionMenuEmailproof').val()
				$("#actionMenuEmailproof").submit();
	            //$(this).dialog("close");
	        },
	        Cancel: function() {
	            $(this).dialog( "close" );
	        }
	    },
        close: function() {
	    	$('#To').val("");
        	//$(this).find("input").each(function(){ $(this).val(""); });
        }
	});
	*/
	
	//---
	$("#msgbox_text").html('');	
	$("#msgbox_text").html($( "#dialog-emailproof" ).html());
	
	$("#msgbox_text").find("#Subject").val($('#Subject').val());
	$('#Subject').val("");
	$("#msgbox_text").find("#Message").val($('#Message').val());
	$('#Message').val("");
	$("#msgbox_text").find("#HTMLMessage").val($('#HTMLMessage').val());
	$('#HTMLMessage').val("");
	
	//$('#Subject').val($('#Subject').val());
	$("#msgbox").fadeIn('fast',function(){
		$("#msgbox").css('display','table');
	});

	$('#msgbox_text').find('#cancel_form').click(function(e){
		e.preventDefault();
		$("#msgbox").fadeOut('fast');
	});
	
	$('#msgbox_text').find('#submit_form').click(function(e){
		e.preventDefault();
		$("#msgbox_text").find("#actionMenuEmailproof").submit();
	});
	
	//----
	$('#msgbox_text').find("#actionMenuEmailproof").validate({
		submitHandler: function(form) {
			var selectedValue = "";
			var selected = $("#msgbox_text").find('input[type=radio][name=email_source]:checked', '#actionMenuEmailproof');
			
			if (selected.length > 0)
			    selectedValue = selected.val();
			
			if (selectedValue == '2adproMail') { adproMailServiceFlag = true ; }
	    	else if (selectedValue == 'DesktopMail') { adproMailServiceFlag = false ; }
			
			if (adproMailServiceFlag) {
	    		
	    		$.post('/orders/emailprooforder', {
	        		jobno: $("#msgbox_text").find('#jobId').val(),
	        		requester: 'demouser1',
	        		To:  $("#msgbox_text").find('#To').val(),
	        		Subject: $("#msgbox_text").find('#Subject').val(),
	        		Message: $("#msgbox_text").find('#Message').val(),
	        		MessageHtml: $("#msgbox_text").find('#HTMLMessage').val(),
	        		email_source: $("#msgbox_text").find('input[name=email_source]:checked', '#actionMenuEmailproof').val(),
	        		product: 'JD',
	                form_action: 'eproof'
	            }, function(d){
	                //console.log(d);
	                // Here we handle the response from the script
	                // We are just going to alert the result for now
	            	$("#msgbox").fadeOut('fast');
	                
	            	//loadOrderList();
	                //alert(d);
	            });
	    		$( "#dialog-emailproof" ).dialog("close");
	    		
	    	} else {
	    		mailto_link='mailto:'+$("#msgbox_text").find('#To').val()+'?subject='+rawurlencode($("#msgbox_text").find('#Subject').val())+'&body='+rawurlencode($("#msgbox_text").find('#Message').val())+'&signature=';
	    		win = window.open(mailto_link,'emailWindow');
	    		if (win && win.open &&!win.closed) win.close();
	    		window.close();
	    		
	    		//$( "#dialog-emailproof" ).dialog("close");
			$("#msgbox").fadeOut('fast');
	    	}
			return false;
		},
		errorClass : "errorActionMenu",
		errorPlacement: function(error, element)
		{
			
			var error_element_name = "#"+element.attr("name")+"_error";
			error.insertAfter(element);
			if(element.attr("name") == element)
			{
				//var error_element_name = "#"+element.attr("name")+"_error";
				error.appendTo(error_element_name);
				//error.appendTo("#changeTo_error");
				
			}
			else
			{
				error.insertAfter(element);
			}
			
		}
	});
	
}

/**
 * Function (revise) is used to revise the order. 
 * 
 * @return null.
*/
function revise()
{
		jobno = $('#jobId').val();
		
		$('#activelist').val('ver');
		$("#isloading").val("true");
		$("#loadPage").html("Loading...");
		if($('.content-main-left').css('height')!='680px')
		{
			$('.content-main-left').css({"height" : '680px'});
		}

		if($('.content-main-left').css("width")!='309px')
		{
			$('.content-main-left').animate({"width" : '-=591px'}, "slow");
		}
		$('.normal-row').remove();
		$('#order_details').fadeIn('slow');
		$('.content-main-left').css({"height" : '680px', 'width':'309px'});
		$('#orderlist').css({'width':'289px'});
		$('.contentOrderList').css({'width':'289px'});
		$('.active-jobs-box-outer').show();
		$('.content-left-box').hide();
		
		/****** Focus on Selected Job ******/
		$('.scroll-job-div').find('.active-jobs-box-row1.shadow.active-job-list-ver').removeClass('active-job-list-ver');
		$('#ver_job_'+jobno).addClass('active-job-list-ver');
		$(".scroll-job-div > .nano").nanoScroller({scrollTo : $('#ver_job_'+jobno)});
		
		showProgress();
		$.post('/orders/viewjob',{'jobno':jobno},function(data1){
			hideProgress();
			$('#order_details').html(data1);
			$("#loadPage").html("");
			$(".noteboxes").hide();
			$("#noteboxview").fadeIn("normal");
			nextprev("revcomm");
		});	
		//document.getElementById('ver_job_'+jobno).scrollIntoView(true);
}

/**
 * Function (pickupJob) is used to create duplicate Job. 
 * 
 * @return null.
*/
function pickupJob()
{
	//alert('pickup');
}

/**
 * Function (printJob) is used to open detail in new window for print purpose. 
 * 
 * @return null.
*/
function printJob()
{	
	//mailto:'+$('#To').val()+'?subject='+rawurlencode($('#Subject').val())+'&body='+rawurlencode($('#Message').val())+'&signature=
	//printJoblink='http://prod3/orders/orderdetail/?id='+$('#jobId').val();
	//win = window.open(printJoblink,'Job Direct 3 - Order Detail- '+$('#jobId').val());
}

/**
 * Function (messageJob) is used to show message section. 
 * 
 * @return null.
*/
function messageJob(jobID)
{
	jobno = jobID;
	$('#activelist').val('ver');
	$("#isloading").val("true");
	$("#loadPage").html("Loading...");
	if($('.content-main-left').css('height')!='680px')
	{
		$('.content-main-left').css({"height" : '680px'});
	}

	if($('.content-main-left').css("width")!='309px')
	{
		$('.content-main-left').animate({"width" : '-=591px'}, "slow");
	}
	$('.normal-row').hide();
	$('#order_details').fadeIn('slow');
	$('.content-main-left').css({"height" : '680px', 'width':'309px'});
	$('#orderlist').css({'width':'289px'});
	$('.contentOrderList').css({'width':'289px'});
	$('.active-jobs-box-outer').show();
	$('.content-left-box').hide();
	
	/****** Focus on Selected Job ******/
	$('.scroll-job-div').find('.active-jobs-box-row1.shadow.active-job-list-ver').removeClass('active-job-list-ver');
	$('#ver_job_'+jobno).addClass('active-job-list-ver');
	$(".scroll-job-div > .nano").nanoScroller({scrollTo : $('#ver_job_'+jobno)});
	
	showProgress();
	$.post('/orders/viewjob',{'jobno':jobno},function(data1){
		hideProgress();
		$('#order_details').html(data1);
		$("#loadPage").html("");
		$(".noteboxes").hide();
		$("#noteboxview").fadeIn("normal");
		nextprev("msgbrd");
		//document.getElementById('job_'+jobno).scrollIntoView(false);
	});
	//document.getElementById('ver_job_'+jobno).scrollIntoView(true);
}


/**
 * Function (changeOwner) is used to change the Job owner. 
 * 
 * @return null.
*/
function changeOwner(jobno, submitby)
{
	/*$( "#dialog-changeowner" ).dialog({
        resizable: false,
        height: 200,
        width: 350,
        modal: true,
        buttons: { 
            "Yes": function() {
				$("#actionMenuChangeowner").submit();
            },
            Cancel: function() {
                $(this).dialog( "close" );
            }
        },
        close: function() {
        	$(this).find("input").each(function(){ $(this).val(""); });
        }
    });*/
	
	//$("#msgbox_text").html('');	
	//$("#msgbox_text").html($( "#dialog-changeowner" ).html());
	$("#dialog-changeowner").fadeIn('fast',function(){
		//$("#msgbox").css('display','table');
	});
	$('#dialog-changeowner').find('#cancel_form').click(function(e){
		e.preventDefault();
		$("#dialog-changeowner").fadeOut('fast');
	});
	
	$('#dialog-changeowner').find('.select_field').custSelectBox({		
		selectwidth: 135
	});
	
	$('#dialog-changeowner').find('#currentOwner').val(submitby);
	
	$('#dialog-changeowner').find('#submit_form').click(function(e){
		e.preventDefault();
		$("#dialog-changeowner").find("#actionMenuChangeowner").submit();
	});
	
	$("#dialog-changeowner").find("#actionMenuChangeowner").validate({
		submitHandler: function(form) {
			$.post('/orders/changeowner', {
	    		jobno: jobno,
	            requester: submitby,
	            new_owner: $('#changeTo').val(),
	            form_action: 'change_owner',
	            request_product: 'JD'
	        }, function(d){
	            //console.log(d);
	            // Here we handle the response from the script
	            // We are just going to alert the result for now
	        	
	            loadOrderList();
	            //alert(d);
	        });
			//$("#dialog-changeowner").dialog("close");
			return false;
		},
		errorClass : "errorActionMenu",
		errorPlacement: function(error, element)
		{
			var error_element_name = "#"+element.attr("name")+"_error";
			error.insertAfter(element);
			if(element.attr("name") == "changeTo")
			{
				//var error_element_name = "#"+element.attr("name")+"_error";
				error.appendTo(error_element_name);
				//error.appendTo("#changeTo_error");
				
			}
			else
			{
				error.insertAfter(element);
			}
			
		}
	});
	
}

/**
 * Function (loadOrderList) is used to load OrderList 
 * 
 * 
 * @return null.
*/

function loadOrderList() {
	showProgress();
	$.post('/view/orderlist', function(data) {
		createOrderListHTMLData(data, '');
	});
}


function statusStyleClass(statusData) {
	
	if(statusData == 'Non Compliance-On Hold'){
		statusDivclass = 'status-lables-red' ;
	} else if(statusData == 'Submitted'){
		statusDivclass = 'status-lables-green' ;
	} else if(statusData == 'Quote Submitted'){
		statusDivclass = 'status-lables-red' ;
	} else if(statusData == 'Quote Requested'){
		statusDivclass = 'status-lables-orrange' ;
	} else if(statusData == 'Cancelled'){
		statusDivclass = 'status-lables-black' ;
	} else if(statusData == 'Order Entry'){
		statusDivclass = 'status-lables-orrange' ;
	} else if(statusData == 'Revised'){
		statusDivclass = 'status-lables-red' ;
	} else if(statusData == 'Archive'){
		statusDivclass = 'status-lables-black' ;
	} else if(statusData == 'In Production'){
		statusDivclass = 'status-lables-green' ;
	} else if(statusData == 'Ready for Proof'){
		statusDivclass = 'status-lables-red' ;
	} else if(statusData == 'Accepted'){
		statusDivclass = 'status-lables-green' ;
	}
	return statusDivclass;
}
/**
 * Function (createOrderListHTMLData) is used to  create OrderList HTML
 * 
 * 
 * @return null.
*/



function createOrderListHTMLData(data, clearbody) {	
	
	data = $.parseJSON(data);
	
	if(data=='')
	{
		$("#msgbox").css('display','table');
		$("#msgbox_text").html("<div><div>No Matching Records found</div><div class='button' style='margin-left:80px'><a  class='home' id='msgok' href='#' style='padding-bottom:0px;color:#000000'><span style='font-size:10px;'>OK</span></a></div> &nbsp;</div></div>");
		$("#msgbox").fadeIn('fast',function(){
			$("#msgbox").css('display','table');
		});
		$('#msgok').click(function(e){
			e.preventDefault();
			$("#msgbox").fadeOut('fast');
		});
		$("#loadPage").html('');
		hideProgress();
		return;
	}
	
	$('#page').val('0');
	hideProgress();
	
	
	var loadPageDiv = '';
	var orderListDiv = '';
	var fullWidthDiv = '';
	var listHeaderDiv = '';
	var scrollerLastDiv = '';
	var scrollerMainDiv = '';
	var contentMainDiv = '';
	var orderFormDiv = '';
	var orderDetailsDiv = '';
	var containerDiv = '';
	
	def = $('#activelist').attr('id');
	
	if(def===undefined)
	{
		$('#main_body').html('');
		loadPageDiv = $('<div/>');
		loadPageDiv.attr('id','loadPage');
		win_width = $(document).width();
		wwidth = (win_width/2)-50;
		loadPageDiv.attr('style','position:fixed;top:0px;left:'+wwidth+'px;background-color:yellow;font-size:18px;font-weight:bold;');
		$("#main_body").append(loadPageDiv);
	
		//console.log(data)
		orderListDiv = $('<div/>');
		orderListDiv.attr('id','orderlist');
		orderListDiv.attr('class','new-order-list-cont');	
		
		fullWidthDiv = $('<div/>');
		fullWidthDiv.attr('class','full-width-ajob-con');	
		
		listHeaderDiv = $('<div/>');
		listHeaderDiv.attr('class','normal-row');
		/*listHeaderDivHtml = '<div class="status-col caps">STATUS</div><div class="order-no-col caps lalign">ORDER NUMBER</div><div class="job-type-col caps ralign">JOB TYPE</div><div class="order-date-col caps">ORDERED</div><div class="due-date-col caps">due</div><div class="brand-col caps">BRAND</div><div class="job-no-col caps">JOB NUMBER</div><div class="summited-by-col caps">SUBMITTED BY</div><div class="actions-col caps"></div><br />';
		listHeaderDivHtml = listHeaderDivHtml ;
		listHeaderDiv.html(listHeaderDivHtml);*/
	}
	else
	{	
		loadPageDiv = $('#loadPage');
		orderListDiv = $('#orderlist');
		fullWidthDiv = $('.full-width-ajob-con');
		listHeaderDiv = $('.normal-row');
	}
	
	if(def===undefined)
	{	
		$.each(data,function(jobNo,jobDetails)
		{
			$.each(jobDetails,function(fieldKey, fieldValue)
			{							
				if(fieldKey!='Bkgnd_color' && fieldKey!='JobNo' && fieldKey!='Action_items' && fieldKey!='Deliverypritype' && fieldKey!='Revisioncount')
				{
					headTitle = $('<div />');
					if(fieldKey=='Job_no')
					{
						headTitle.attr('class','job-no-col lalign order-no-font');
					}
					else if(fieldKey=='Status')
					{
						headTitle.attr('class','status-col lalign');
					}
					else if(fieldKey=='Tracking_no')
					{
						headTitle.attr('class','order-no-col lalign order-no-font');
					}
					else if(fieldKey=='Order_type')
					{
						headTitle.attr('class','job-type-col r-align');			
					}
					else if(fieldKey=='Submit_date' || fieldKey=='Studio')
					{
						headTitle.attr('class','order-date-col lalign');
					}
					else if(fieldKey=='Due_date')
					{
						headTitle.attr('class','order-date-col lalign');
					}
					else
					{
						headTitle.attr('class','brand-col lalign');
					}
					
					/*
					* fieldKey == 'Submit_by' is used to change the active job header title (Submitted by)..
					**/
					if(fieldKey == 'Submit_by'){
						headTitle.html('Submitted by');
					} else {
						fieldKey = fieldKey.replace('_',' ');
						headTitle.html(fieldKey);	
					}
					
					
					listHeaderDiv.append(headTitle);
				}
				
				
				return true;
			});
			return false;
		});
	}
	
	if(def===undefined)
	{
	
		/*reloadDiv = $('<div class="jobs_reload"/>');
		reloadDiv.attr('class','actions-col');
		reloadDiv.attr('style','padding-top:0px;margin-top:-2px;cursor:pointer');
		reloadDiv.html('<img src="/images/reload.png" >');
		listHeaderDiv.append(reloadDiv);
		
		fullWidthDiv.append(listHeaderDiv);*/
		
		//nanao scroller
		scrollerMainDiv = $('<div/>');
		scrollerMainDiv.attr('class','scroll-job-div');
		
		reloadDiv = $('<div id="jobs_reload"/>');
		reloadDiv.attr('class','actions-col');
		reloadDiv.attr('style','padding-top:0px;margin-top:-18px;margin-right:-5px;cursor:pointer;');
		reloadDiv.html('<img src="/images/reload.png" >');
		scrollerMainDiv.append(reloadDiv);
		
		scrollerNanoDiv = $('<div/>');
		scrollerNanoDiv.attr('class','nano');
		
		scrollerLastDiv = $('<div/>');
		scrollerLastDiv.attr('class','content contentOrderList');
		scrollerLastDiv.attr('style','width:900px; border:none;');
		
		scrollerNanoDiv.append(scrollerLastDiv);
		scrollerMainDiv.append(scrollerNanoDiv);
		
		
		
		
		//
		
		
		contentMainDiv = $('<div/>');
		contentMainDiv.attr('class','content-main-left');
		
		orderFormDiv = $('<div/>');
		orderFormDiv.attr('id','order_form');
		contentMainDiv.append(orderFormDiv);	
		contentMainDiv.append(orderListDiv);
		orderListDiv.append(listHeaderDiv);
		orderListDiv.append(scrollerMainDiv);
		
		orderDetailsDiv = $('<div/>');
		orderDetailsDiv.attr('id','order_details');
		orderDetailsDiv.attr('style','float:left;display:none;');
		
		containerDiv = $('<div/>');
		containerDiv.attr('class','clear-block');
		containerDiv.append(contentMainDiv);
		containerDiv.append(orderDetailsDiv);
		
		var inp = $("<input/>");
		inp.attr({id:'isloading',type:'hidden'});
		inp.val("false");
		orderListDiv.append(inp);
	
	
		var inp = $("<input/>");
		inp.attr({id:'activelist',type:'hidden'});
		inp.val("full");
		orderListDiv.append(inp);
		
		$("#main_body").append(containerDiv);		
	}
	else
	{
		scrollerLastDiv = $('.content.contentOrderList');
		scrollerMainDiv = $('.scroll-job-div')
		contentMainDiv = $('.content-main-left');
		orderFormDiv = $('#order_form');
		orderDetailsDiv = $('#orderDetailsDiv');
		containerDiv = $('.clear-block');
		
		scrollerLastDiv.html('');		
	}
	
	
	
	maincontentdiv_holders = new Array();
	k = 0;
	//createActionMenuIds = new Array();
	var createActionMenuIds = '';
	var createActionMenuIdsVer = '';
	
	$.each(data,function(jobNo,jobDetails)
	{
		jobNo = jobNo.replace(/\s/g,'');
		// Start horizontal Active List
		var mainContentFullDiv = $('<div/>');
		mainContentFullDiv.attr('class','content-left-box');
		
		if($("#activelist").val()=='ver')
		{
			mainContentFullDiv.attr('style','display:none');
		}
		else
		{
			mainContentFullDiv.attr('style','display:block');
		}
		
		var mainContentDiv = $('<div/>');
		
		var createMenuDivHtml = '';
		mainContentDiv.attr('class','jl-styled-row'); 
		
		
		var jobMainContentDiv = $('<div/>');
		jobMainContentDiv.attr('class','jl-styled-row-inner black-txt');
		
		if(jobDetails.Bkgnd_color!='')
		{
			jobMainContentDiv.css('background-color',jobDetails.Bkgnd_color);
		}
		
		var jobContentDiv = $('<div/>');
		jobContentDiv.attr('id','job_'+jobNo);
		
		var statusDiv = $('<div/>');
		statusDiv.attr('class','status-col');
		
		var statusDescOuterDiv = $('<div>');
		statusOuterDivClass = statusStyleClass(jobDetails.Status);
		statusDescOuterDiv.attr('class',statusOuterDivClass);
		
		var statusDescDiv = $('<div class="mm-msg">');
		statusDescOuterDiv.append(statusDescDiv);
		//alert(jobDetails.Status);
		
		if(jobDetails.Status == 'Non Compliance-On Hold'){
			//statusDescDiv.html(jobDetails.Status);
			statusDescDiv.html('Non Compliance On Hold');
		} else {
			statusDescDiv.html(jobDetails.Status);
		}
		
		
		
		statusDiv.append(statusDescOuterDiv);
		
		jobContentDiv.append(statusDiv);
		
		var jobSubmittedBy   ;
		var TrackingNo   ;
		$.each(jobDetails,function(fieldKey, fieldValue)
		{							
			if(fieldKey!='Bkgnd_color' && fieldKey!='Status' && fieldKey!='JobNo' && fieldKey!='Action_items' && fieldKey!='Deliverypritype' && fieldKey!='Revisioncount')
			{
				if (fieldKey == 'Submit_by') {
					jobSubmittedBy = fieldValue;
				}
				else if (fieldKey == 'Tracking no') {
					TrackingNo = fieldValue;
				}
				/*if(fieldValue)
				{
					if(fieldValue.length>12)
					{						
						if (fieldKey == 'Submitted By') {
							jobSubmittedBy = fieldValue;
						}
						else if (fieldKey == 'Tracking No') {
							TrackingNo = fieldValue;
						}
					}
					else
					{						
						if (fieldKey == 'Submitted By') {
							jobSubmittedBy = fieldValue;
						}
						else if (fieldKey == 'Tracking No') {
							TrackingNo = fieldValue;
						}
					}
				}*/
				var colDiv = $('<div/>');
				colDiv.html(fieldValue);
				
				if(fieldKey=='Job_no')
				{
					colDiv.attr('class','job-no-col lalign order-no-font');
				}
				else if(fieldKey=='Tracking_no')
				{
					colDiv.attr('class','order-no-col lalign order-no-font');
					
					if(jobDetails.Revisioncount>0)
					{
						colDiv.addClass('RevCount');
					}
					else if(jobDetails.Deliverypritype=='hours')
					{
						colDiv.addClass('Rush');
					}
				}
				else if(fieldKey=='Order_type')
				{
					colDiv.attr('class','job-type-col r-align');
					
					jobOrderType = '';				
					
					fVal = fieldValue.split(',');
					
					colDiv.html('');
					
					if(fVal.length==0)
					{
						colDiv.html('&nbsp;');
					}
					else
					{
						for(fcnt=0; fcnt<fVal.length;fcnt++)
						{
						
							if(fVal[fcnt]=="Print")
							{
								jobOrderType = '/images/print_icon.png';
							}
							if(fVal[fcnt]=="Web")
							{
								jobOrderType = '/images/web-icon.png';
							}
							if(fVal[fcnt]=="Mobile")
							{
								jobOrderType = '/images/mobile-icon.png';
							}
							
							if(jobOrderType!='')
							{							
								var img =  $('<img src="'+jobOrderType+'" height="16" border="0">');
						
								colDiv.append(img);
							}
							else
							{
								colDiv.html('&nbsp;');
								break;
							}
						}
					}
				}
				else if(fieldKey=='Submit_date' || fieldKey=='Studio')
				{
					colDiv.attr('class','order-date-col lalign');
				}
				else if(fieldKey=='Due_date')
				{
					colDiv.attr('class','order-date-col lalign');
				}
				else
				{
					colDiv.attr('class','brand-col lalign');
				}			
				
				jobContentDiv.append(colDiv);
			}
		});
		
		/*var tracknoDiv = $('<div/>');
		tracknoDiv.attr('class','order-no-col lalign order-no-font');
		tracknoDiv.html(TrackingNo+'&nbsp;');
		
		var ordTypeDiv = $('<div/>');
		ordTypeDiv.attr('class','job-type-col r-align');
		
		jobOrderType = '/images/print_icon.png';
		
		$.each(jobDetails,function(fieldKey, fieldValue)
		{
			if(fieldKey=='Order_Type')
			{
				if(fieldValue=="Print")
				{
					jobOrderType = '/images/print_icon.png';
				}
				else if(fieldValue=="Digital")
				{
					jobOrderType = '/images/web-icon.png';
				}
				else if(fieldValue=="Mobile")
				{
					jobOrderType = '/images/mobile-icon.png';
				}
			}
		});
			
		ordTypeDiv.html('<img src="'+jobOrderType+'" width="13" height="16" border="0">');
		
		
		var ordereddateDiv = $('<div/>');
		ordereddateDiv.attr('class','order-date-col');
		ordereddateDiv.html(jobDetails.Ordered);
		
		
		var duedateDiv = $('<div/>');
		duedateDiv.attr('class','due-date-col');
		duedateDiv.html(jobDetails.Due);
		
		var brandDiv = $('<div/>');
		brandDiv.attr('class','brand-col');
		brandDiv.html(jobDetails.Advertiser);
		
		
		var jobnoDiv = $('<div/>');
		jobnoDiv.attr('class','job-no-col bold-txt');
		jobnoDiv.html(jobDetails.JobNo);
		
		
		var submitbydDiv = $('<div/>');
		submitbydDiv.attr('class','summited-by-col');
		submitbydDiv.html(jobSubmittedBy);*/	
		
		
		var actionMenuDiv = $('<div/>');
		actionMenuDiv.attr('class','actions-col');
		//actionMenuDivHtml = '<div id="actionMenu_'+jobNo+'" rel="'+jobDetails.Status+'##'+jobSubmittedBy+'" ><div><h4>ACTION</h4></div><div class="content-right-middle"><div class="content-right-button"> <img   src="/images/dot-red.png" width="14" height="14" border="0"></div><div class="content-right-button1"><img class="act" src="/images/double-arrow.png" width="9" height="12" ></div></div></div>';
		actionMenuDivHtml = '<div id="actionMenu_'+jobNo+'" rel="'+jobDetails.Action_items+'##'+jobSubmittedBy+'" ><img src="/images/actions-h.png" /></div>';
		actionMenuDivHtml = actionMenuDivHtml ;
		createActionMenuIds =  createActionMenuIds + 'actionMenu_'+jobNo+',';		
		actionMenuDiv.html(actionMenuDivHtml);
		
		
		
		/*jobContentDiv.append(tracknoDiv);
		jobContentDiv.append(ordTypeDiv);
		jobContentDiv.append(ordereddateDiv);
		jobContentDiv.append(duedateDiv);
		jobContentDiv.append(brandDiv);
		jobContentDiv.append(jobnoDiv);
		jobContentDiv.append(submitbydDiv);*/
		jobContentDiv.append(actionMenuDiv);
		jobMainContentDiv.append(jobContentDiv);
		mainContentDiv.append(jobMainContentDiv);
		mainContentFullDiv.append(mainContentDiv);
		fullWidthDiv.append(mainContentFullDiv);
		scrollerLastDiv.append(mainContentFullDiv);
		//End Horizontal Active List
		
		//Start vertical Active List
		
		var mainContentDivVer = $('<div/>');
		
		var createMenuDivHtmlVer = '';
		mainContentDivVer.attr('class','active-jobs-box-outer'); 
		
		if($("#activelist").val()=='ver')
		{
			mainContentDivVer.attr('style','display:block');
		}
		else
		{
			mainContentDivVer.attr('style','display:none');
		}
		
		var jobMainContentDivVer = $('<div/>');
		jobMainContentDivVer.attr('class','active-jobs-box  black-txt');
		mainContentDivVer.append(jobMainContentDivVer);
		
		var actionsDivVer = $('<div/>');
		actionsDivVer.attr('class',"action-left-column");
		
		var activeJobBoxDivVer =  $('<div/>');
		activeJobBoxDivVer.attr('id','ver_job_'+jobNo);
		activeJobBoxDivVer.attr('class','active-jobs-box-row1 shadow');
		
		var statusOuterDivver = $('<div>');
		//statusOuterDivClass = 'status-lables-red';
		statusOuterDivClassVer = 'small-'+statusStyleClass(jobDetails.Status);
		statusOuterDivver.attr('class',statusOuterDivClassVer);
		
		var statusDivVer = $('<div class="mm-msg">');
		if(jobDetails.Status == 'Non Compliance-On Hold'){
			//statusDiv.html(jobDetails.Status);
			statusDivVer.html('Non Compliance On Hold');
		} else {
			statusDivVer.html(jobDetails.Status);
		}
		
		statusOuterDivver.append(statusDivVer);
		
		
		//statusDivVer.html(jobDetails.Status);
		
		var jobNoDivTopVer = $('<div/>');
		jobNoDivTopVer.attr('class','jobnocol order-block-track order-list-font3');
		jobNoDivTopVer.html(jobDetails.Tracking_no);
		
		var iconDivVer = $('<div/>');
		iconDivVer.attr('class','order-block-type r-align');
		jobOrderType = '';	
		
		fieldValue = jobDetails.Order_type;
		
		fVal = fieldValue.split(',');
		
		iconDivVer.html('');				
		
		for(fcnt=0; fcnt<fVal.length;fcnt++)
		{
		
			if(fVal[fcnt]=="Print")
			{
				jobOrderType = '/images/print_icon.png';
			}
			if(fVal[fcnt]=="Web")
			{
				jobOrderType = '/images/web-icon.png';
			}
			if(fVal[fcnt]=="Mobile")
			{
				jobOrderType = '/images/mobile-icon.png';
			}
			
			var img =  $('<img src="'+jobOrderType+'" height="16" border="0">');
		
			iconDivVer.append(img);
		}
		
		activeJobBoxDivVer.append(statusOuterDivver);
		//activeJobBoxDiv.append(statusDivVer);
		
		activeJobBoxDivVer.append(jobNoDivTopVer);
		activeJobBoxDivVer.append(iconDivVer);
		
		var orderBoxDivVer = $('<div/>');
		orderBoxDivVer.attr('class','order-list-rw1');
		
		var divElementsVer =  $('<div/>');
		divElementsVer.css({"float" : 'left', 'width':'70px'});
		
		var divElementsRowFirstVer =  $('<div/>');
		divElementsRowFirstVer.attr('class','order-block1 order-list-font1');
		divElementsRowFirstVer.html('ORDERED <strong>'+jobDetails.Submit_date+'</strong>');
		
		var divElementsRowSecondVer =  $('<div/>');
		divElementsRowSecondVer.attr('class','order-block1 order-list-font1');
		divElementsRowSecondVer.html('DUE<br /><strong>'+jobDetails.Due_date+'</strong>');
		
		divElementsVer.append(divElementsRowFirstVer);
		divElementsVer.append(divElementsRowSecondVer);
		
		
		var jobNoDivVer = $('<div/>');
		jobNoDivVer.attr('class','order-block3 order-list-font2');
		jobNoDivVer.html(jobDetails.Job_no);
		
		var jobNoLabelDivVer = $('<div/>');
		jobNoLabelDivVer.attr('class','order-block4');
		jobNoLabelDivVer.html('Job no');
		
		var brandDivVer = $('<div/>');
		brandDivVer.attr('class','order-block3 order-list-font2');
		brandDivVer.html(jobDetails.Advertiser);
		
		var brandValueDivVer = $('<div/>');
		brandValueDivVer.attr('class','order-block4');
		brandValueDivVer.html('Advertiser');
		
	
		var subValueDivVer = $('<div/>');
		subValueDivVer.attr('class','order-block3 order-list-font2');
		subValueDivVer.html(jobSubmittedBy);
		
		var subLabelDivVer = $('<div/>');
		subLabelDivVer.attr('class','order-block4');
		subLabelDivVer.html('Submitted by');
		
		
		orderBoxDivVer.append(divElementsVer);
		orderBoxDivVer.append(brandDivVer);
		orderBoxDivVer.append(brandValueDivVer);
		orderBoxDivVer.append(jobNoDivVer);
		orderBoxDivVer.append(jobNoLabelDivVer);
		orderBoxDivVer.append(subValueDivVer);
		orderBoxDivVer.append(subLabelDivVer);
		
		actionsDivVer.append(activeJobBoxDivVer);
		actionsDivVer.append(orderBoxDivVer);
		
		var actionMenuDivVer = $('<div/>');
		actionMenuDivVer.attr('class','action-btn');
		actionMenuDivHtmlVer ='<div id="actionMenuVer_'+jobNo+'" rel="'+jobDetails.Action_items+'##'+jobSubmittedBy+'" ><img src="../images/actions.png" width="19" height="67" border="0" align="absbottom" /></div>';
		actionMenuDivHtmlVer = actionMenuDivHtmlVer ;
		createActionMenuIdsVer =  createActionMenuIdsVer + 'actionMenuVer_'+jobNo+',';		
		actionMenuDivVer.html(actionMenuDivHtmlVer);
		
		jobMainContentDivVer.append(actionMenuDivVer);
		jobMainContentDivVer.append(actionsDivVer);
		mainContentDivVer.append(jobMainContentDivVer);	
		scrollerLastDiv.append(mainContentDivVer);
		
		//End Vertical Active List
		
		k++;
	});	
	
	loaderdiv = $('<div/>');
	loaderdiv.attr('id','loadmoreprogress');
	loaderdiv.attr('style','text-align:center;display:block;padding-top:5px;');
	loaderdiv.html("<img src='/images/ajax-loader4.gif' />");
	orderListDiv.append(loaderdiv);
	loaderdiv.hide();
	//$("#loadPage").append('<div id="loadMore" class="load-more"><a id="1" href="#" class="more" >Load More</a></div>');
	
	// creating Menu for each JOB
	showPopup(createActionMenuIdsVer, "popup");
	showPopup(createActionMenuIds, "popup");
	$("#isloading").val("false");
	//alert($("#isloading").val());
	// Sete Time to fadeOut
	//setTimeout("$(this).showjobs("+(k-1)+");",300);
	$(".scroll-job-div > .nano").nanoScroller({scroll:'top'});
	
	$('#jobs_reload').unbind().click(function(){
		$('.inp-text1').trigger('click');
	});
	
	$('.scroll-job-div').find('.job-no-col').parent().children().each(function(){
		
		$(this).hover(function(){
				$(this).parent().parent().addClass('active-job-list');
			},
			function(){
				$(this).parent().parent().removeClass('active-job-list');
			}
		);
		
		if(!($(this).hasClass('actions-col')))
		{
			$(this).click(function(){
				$("#isloading").val("true");
				//jobid = $(this).parent().parent().attr('id');		
				jobid = $(this).parent().attr('id');
				jobno = jobid.substr(4);
				
				if($('.content-main-left').css('height')!='680px')
				{
					$('.content-main-left').css({"height" : '680px'});
				}
		
				if($('.content-main-left').css("width")!='309px')
				{
					$('.content-main-left').animate({"width" : '-=591px'}, "slow");
				}
				$('.normal-row').hide();
				$('#order_details').fadeIn('slow');
				$('#verjobs_reload').fadeIn('slow');
				$('.content-main-left').css({"height" : '680px', 'width':'309px'});
				$('#orderlist').css({'width':'289px'});
				$('.contentOrderList').css({'width':'289px'});
				//document.getElementById('ver_job_'+jobno).scrollIntoView(true);
				$('.active-jobs-box-outer').toggle();
				$('.content-left-box').toggle();
				
				$('.scroll-job-div').find('.active-jobs-box-row1.shadow.active-job-list').removeClass('active-job-list-ver');
				
				$('#ver_job_'+jobno).addClass('active-job-list-ver');
				
				$(".scroll-job-div > .nano").nanoScroller({scrollTo : $('#ver_job_'+jobno)});
				
				$('#activelist').val('ver');
				$('#order_details').html("<div style='text-align:center;height:720px;vertical-align:middle;'><img src='/images/loading4.gif' style='vertical-align:middle' /></div>");
				$.post('/orders/viewjob',{'jobno':jobno},function(data1){
					$('#order_details').html(data1);					
					//createVerticalOrderListHTMLData(data, '');
					//document.getElementById('job_'+jobno).scrollIntoView(false);
					$("#isloading").val("false");
				});
			});
		}
	});
	
	
	
	$('.jobnocol').unbind().click(function(){
		$("#isloading").val("true");
		jobid = $(this).parent().attr('id');		
		jobno = jobid.substr(8);
		
		$('.scroll-job-div').find('.active-jobs-box-row1.shadow.active-job-list-ver').removeClass('active-job-list-ver');
		
		$('#ver_job_'+jobno).addClass('active-job-list-ver');
		
		$('#order_details').html("<div style='text-align:center;'><img src='/images/loading4.gif' style='vertical-align:middle' /></div>");
		$.post('/orders/viewjob',{'jobno':jobno},function(data1){
			$('#order_details').html(data1);
			
			$("#loadPage").html(" ");
			//document.getElementById('ver_job_'+jobno).scrollIntoView(true);
			$("#isloading").val("false");
		});
		
		$(".scroll-job-div > .nano").nanoScroller({scrollTo:$('#ver_job_'+jobno)});
	});
	
	//$('#order_details').fadeOut('fast',function(){
		
		$(".scroll-job-div .nano").bind("scrollend", function(e){
			
			//if($("#dragHandle").html()=='ACTIVE JOBS' || $("#dragHandle").html()=='JOBS IN ORDER ENTRY')
        	//{
    			   			
    		    topValue=(parseInt($(".slider").css('top')));
    			
    			//if  ( topValue >= '300' && k != '0')
            	if($("#isloading").val()=="false")
    		    {
            		//alert($("#isloading").val());
                   	currentPage = $("#page").val();

                   	currentPage++;

                   	$("#page").val(currentPage);
                   	
                   	//$("#loadPage").html("Loading...");     
                   	
                   
                   	$("#isloading").val("true");
                   	$('#loadmoreprogress').fadeIn();
                   	$.post("/view/orderlist", 'page='+currentPage+'&loadmore=1', function(data) {
                   			$('#loadmoreprogress').fadeOut();
                        	loadMoreOrderListHTMLData(data,1);

                	});

            	}
            	
        	//}
			 
		});
	//});
	
	$("#orderlist").hover(function(){
		//$(this).css({'overflow-y':'hidden'});
		$(".scroll-job-div > .nano").nanoScroller();
	},function(){
			
	});

	
	//$(".nano").nanoScroller();
			
}

function loadMoreOrderListHTMLData(data, clearbody) {
	if(clearbody!='1')
	{
		//$('#main_body').html('');
	}
	//alert(harizontalFlag);
	//alert(data);
	data = $.parseJSON(data);
	
	if(data=='')
	{
		$("#loadPage").html("");
		$("#isloading").val("true");
		$(".scroll-job-div .nano").unbind("scrollend");			
		return;
	}
	
	scrollerLastDiv = $(".contentOrderList");
	fullWidthDiv = $(".full-width-ajob-con");
	//createActionMenuIds = new Array();
	var createActionMenuIds = '';
	var createActionMenuIdsVer = '';
	
	k=0;
	
	$.each(data,function(jobNo,jobDetails)
	{
		jobNo = jobNo.replace(/\s/g,'');
		//start Horizontal Active List
		var mainContentFullDiv = $('<div/>');
		mainContentFullDiv.attr('class','content-left-box');
				
		if($("#activelist").val()=='ver')
		{
			mainContentFullDiv.attr('style','display:none');
		}
		
		var mainContentDiv = $('<div/>');
		
		var createMenuDivHtml = '';
		mainContentDiv.attr('class','jl-styled-row'); 
		
		
		var jobMainContentDiv = $('<div/>');
		jobMainContentDiv.attr('class','jl-styled-row-inner black-txt');
		
		if(jobDetails.Bkgnd_color!='')
		{
			jobMainContentDiv.css('background-color',jobDetails.Bkgnd_color);
		}
		
		var jobContentDiv = $('<div/>');
		jobContentDiv.attr('id','job_'+jobNo);
		
		var statusDiv = $('<div/>');
		statusDiv.attr('class','status-col');
		
		var statusDescOuterDiv = $('<div>');
		statusOuterDivClass = statusStyleClass(jobDetails.Status);
		statusDescOuterDiv.attr('class',statusOuterDivClass);
		
		var statusDescDiv = $('<div class="mm-msg">');
		statusDescOuterDiv.append(statusDescDiv);
		//alert(jobDetails.Status);
		
		if(jobDetails.Status == 'Non Compliance-On Hold'){
			//statusDescDiv.html(jobDetails.Status);
			statusDescDiv.html('Non Compliance On Hold');
		} else {
			statusDescDiv.html(jobDetails.Status);
		}
		
		statusDiv.append(statusDescOuterDiv);
		jobContentDiv.append(statusDiv);
		
		var jobSubmittedBy   ;
		var TrackingNo   ;
		$.each(jobDetails,function(fieldKey, fieldValue)
		{							
			if(fieldKey!='Bkgnd_color' && fieldKey!='Status' && fieldKey!='JobNo' && fieldKey!='Action_items' && fieldKey!='Deliverypritype' && fieldKey!='Revisioncount')
			{
				if (fieldKey == 'Submit_by') {
					jobSubmittedBy = fieldValue;
				}
				else if (fieldKey == 'Tracking no') {
					TrackingNo = fieldValue;
				}
				/*if(fieldValue)
				{
					if(fieldValue.length>12)
					{						
						if (fieldKey == 'Submitted By') {
							jobSubmittedBy = fieldValue;
						}
						else if (fieldKey == 'Tracking No') {
							TrackingNo = fieldValue;
						}
					}
					else
					{						
						if (fieldKey == 'Submitted By') {
							jobSubmittedBy = fieldValue;
						}
						else if (fieldKey == 'Tracking No') {
							TrackingNo = fieldValue;
						}
					}
				}*/
				var colDiv = $('<div/>');
				colDiv.html(fieldValue);
				
				if(fieldKey=='Job_no')
				{
					colDiv.attr('class','job-no-col lalign order-no-font');
				}
				else if(fieldKey=='Tracking_no')
				{
					colDiv.attr('class','order-no-col lalign order-no-font');
					
					if(jobDetails.Revisioncount>0)
				     {
						 colDiv.addClass('RevCount');
				     }
					else if(jobDetails.Deliverypritype=='hours')
				     {
						 colDiv.addClass('Rush');
				     }
				}
				else if(fieldKey=='Order_type')
				{
					colDiv.attr('class','job-type-col r-align');
					
					jobOrderType = '';				
					
					fVal = fieldValue.split(',');
					
					colDiv.html('');				
					
					if(fVal.length==0)
					{
						colDiv.html('&nbsp;');
					}
					else
					{
						for(fcnt=0; fcnt<fVal.length;fcnt++)
						{
						
							if(fVal[fcnt]=="Print")
							{
								jobOrderType = '/images/print_icon.png';
							}
							if(fVal[fcnt]=="Web")
							{
								jobOrderType = '/images/web-icon.png';
							}
							if(fVal[fcnt]=="Mobile")
							{
								jobOrderType = '/images/mobile-icon.png';
							}
							
							if(jobOrderType!='')
							{							
								var img =  $('<img src="'+jobOrderType+'" height="16" border="0">');
						
								colDiv.append(img);
							}
							else
							{
								colDiv.html('&nbsp;');
								break;
							}
						}
					}
				}
				else if(fieldKey=='Submit_date' || fieldKey=='Studio')
				{
					colDiv.attr('class','order-date-col lalign');
				}
				else if(fieldKey=='Due_date')
				{
					colDiv.attr('class','order-date-col lalign');
				}
				else
				{
					colDiv.attr('class','brand-col lalign');
				}			
				
				jobContentDiv.append(colDiv);
			}
		});
		
		/*var tracknoDiv = $('<div/>');
		tracknoDiv.attr('class','order-no-col lalign order-no-font');
		tracknoDiv.html(TrackingNo+'&nbsp;');
		
		var ordTypeDiv = $('<div/>');
		ordTypeDiv.attr('class','job-type-col r-align');
		
		jobOrderType = '/images/print_icon.png';
		
		$.each(jobDetails,function(fieldKey, fieldValue)
		{
			if(fieldKey=='Order_Type')
			{
				if(fieldValue=="Print")
				{
					jobOrderType = '/images/print_icon.png';
				}
				else if(fieldValue=="Digital")
				{
					jobOrderType = '/images/web-icon.png';
				}
				else if(fieldValue=="Mobile")
				{
					jobOrderType = '/images/mobile-icon.png';
				}
			}
		});
			
		ordTypeDiv.html('<img src="'+jobOrderType+'" width="13" height="16" border="0">');
		
		
		var ordereddateDiv = $('<div/>');
		ordereddateDiv.attr('class','order-date-col');
		ordereddateDiv.html(jobDetails.Ordered);
		
		
		var duedateDiv = $('<div/>');
		duedateDiv.attr('class','due-date-col');
		duedateDiv.html(jobDetails.Due);
		
		var brandDiv = $('<div/>');
		brandDiv.attr('class','brand-col');
		brandDiv.html(jobDetails.Advertiser);
		
		
		var jobnoDiv = $('<div/>');
		jobnoDiv.attr('class','job-no-col bold-txt');
		jobnoDiv.html(jobDetails.JobNo);
		
		
		var submitbydDiv = $('<div/>');
		submitbydDiv.attr('class','summited-by-col');
		submitbydDiv.html(jobSubmittedBy);*/	
		
		
		var actionMenuDiv = $('<div/>');
		actionMenuDiv.attr('class','actions-col');
		//actionMenuDivHtml = '<div id="actionMenu_'+jobNo+'" rel="'+jobDetails.Status+'##'+jobSubmittedBy+'" ><div><h4>ACTION</h4></div><div class="content-right-middle"><div class="content-right-button"> <img   src="/images/dot-red.png" width="14" height="14" border="0"></div><div class="content-right-button1"><img class="act" src="/images/double-arrow.png" width="9" height="12" ></div></div></div>';
		actionMenuDivHtml = '<div id="actionMenu_'+jobNo+'" rel="'+jobDetails.Action_items+'##'+jobSubmittedBy+'" ><img src="/images/actions-h.png" /></div>';
		actionMenuDivHtml = actionMenuDivHtml ;
		createActionMenuIds =  createActionMenuIds + 'actionMenu_'+jobNo+',';		
		actionMenuDiv.html(actionMenuDivHtml);
		
		
		
		/*jobContentDiv.append(tracknoDiv);
		jobContentDiv.append(ordTypeDiv);
		jobContentDiv.append(ordereddateDiv);
		jobContentDiv.append(duedateDiv);
		jobContentDiv.append(brandDiv);
		jobContentDiv.append(jobnoDiv);
		jobContentDiv.append(submitbydDiv);*/
		jobContentDiv.append(actionMenuDiv);
		jobMainContentDiv.append(jobContentDiv);
		mainContentDiv.append(jobMainContentDiv);
		mainContentFullDiv.append(mainContentDiv);
		fullWidthDiv.append(mainContentFullDiv);
		scrollerLastDiv.append(mainContentFullDiv);
		//End Horizontal Active List
		
		//Start vertical Active List
		
		var mainContentDivVer = $('<div/>');
		
		var createMenuDivHtmlVer = '';
		mainContentDivVer.attr('class','active-jobs-box-outer');
		
		
		if($("#activelist").val()=='full')
		{
			mainContentDivVer.attr('style','display:none'); 
		}
		
		var jobMainContentDivVer = $('<div/>');
		jobMainContentDivVer.attr('class','active-jobs-box  black-txt');
		mainContentDivVer.append(jobMainContentDivVer);
		
		var actionsDivVer = $('<div/>');
		actionsDivVer.attr('class',"action-left-column");
		
		var activeJobBoxDivVer =  $('<div/>');
		activeJobBoxDivVer.attr('id','ver_job_'+jobNo);
		activeJobBoxDivVer.attr('class','active-jobs-box-row1 shadow');
		
		var statusOuterDivver = $('<div>');
		//statusOuterDivClass = 'status-lables-red';
		statusOuterDivClassVer = 'small-'+statusStyleClass(jobDetails.Status);
		statusOuterDivver.attr('class',statusOuterDivClassVer);
		
		var statusDivVer = $('<div class="mm-msg">');
		if(jobDetails.Status == 'Non Compliance-On Hold'){
			//statusDiv.html(jobDetails.Status);
			statusDivVer.html('Non Compliance On Hold');
		} else {
			statusDivVer.html(jobDetails.Status);
		}
		
		statusOuterDivver.append(statusDivVer);
		
		
		//statusDivVer.html(jobDetails.Status);
		
		var jobNoDivTopVer = $('<div/>');
		jobNoDivTopVer.attr('class','jobnocol order-block-track order-list-font3');
		jobNoDivTopVer.html(jobDetails.Tracking_no);
		
		var iconDivVer = $('<div/>');
		iconDivVer.attr('class','order-block-type r-align');
		
		jobOrderType = '';	
		
		fieldValue = jobDetails.Order_type;
		
		fVal = fieldValue.split(',');
		
		iconDivVer.html('');				
		
		for(fcnt=0; fcnt<fVal.length;fcnt++)
		{
		
			if(fVal[fcnt]=="Print")
			{
				jobOrderType = '/images/print_icon.png';
			}
			if(fVal[fcnt]=="Web")
			{
				jobOrderType = '/images/web-icon.png';
			}
			if(fVal[fcnt]=="Mobile")
			{
				jobOrderType = '/images/mobile-icon.png';
			}
			
			var img =  $('<img src="'+jobOrderType+'" height="16" border="0">');
		
			iconDivVer.append(img);
		}
		
		
		
		activeJobBoxDivVer.append(statusOuterDivver);
		//activeJobBoxDiv.append(statusDivVer);
		
		activeJobBoxDivVer.append(jobNoDivTopVer);
		activeJobBoxDivVer.append(iconDivVer);
		
		var orderBoxDivVer = $('<div/>');
		orderBoxDivVer.attr('class','order-list-rw1');
		
		var divElementsVer =  $('<div/>');
		divElementsVer.css({"float" : 'left', 'width':'70px'});
		
		var divElementsRowFirstVer =  $('<div/>');
		divElementsRowFirstVer.attr('class','order-block1 order-list-font1');
		divElementsRowFirstVer.html('ORDERED <strong>'+jobDetails.Submit_date+'</strong>');
		
		var divElementsRowSecondVer =  $('<div/>');
		divElementsRowSecondVer.attr('class','order-block1 order-list-font1');
		divElementsRowSecondVer.html('DUE<br /><strong>'+jobDetails.Due_date+'</strong>');
		
		divElementsVer.append(divElementsRowFirstVer);
		divElementsVer.append(divElementsRowSecondVer);
		
		var jobNoDivVer = $('<div/>');
		jobNoDivVer.attr('class','order-block3 order-list-font2');
		jobNoDivVer.html(jobDetails.Job_no);
		
		var jobNoLabelDivVer = $('<div/>');
		jobNoLabelDivVer.attr('class','order-block4');
		jobNoLabelDivVer.html('Job no');
		
		var brandDivVer = $('<div/>');
		brandDivVer.attr('class','order-block3 order-list-font2');
		brandDivVer.html(jobDetails.Advertiser);
		
		var brandValueDivVer = $('<div/>');
		brandValueDivVer.attr('class','order-block4');
		brandValueDivVer.html('Advertiser');
		
		var jobNoDivVer = $('<div/>');
		jobNoDivVer.attr('class','order-block3 order-list-font2');
		jobNoDivVer.html(jobDetails.Tracking_no);
		
		var jobNoLabelDivVer = $('<div/>');
		jobNoLabelDivVer.attr('class','order-block4');
		jobNoLabelDivVer.html('Tracking no');
		
		var subValueDivVer = $('<div/>');
		subValueDivVer.attr('class','order-block3 order-list-font2');
		subValueDivVer.html(jobSubmittedBy);
		
		var subLabelDivVer = $('<div/>');
		subLabelDivVer.attr('class','order-block4');
		subLabelDivVer.html('Submitted by');
		
		
		orderBoxDivVer.append(divElementsVer);
		orderBoxDivVer.append(brandDivVer);
		orderBoxDivVer.append(brandValueDivVer);
		orderBoxDivVer.append(jobNoDivVer);
		orderBoxDivVer.append(jobNoLabelDivVer);
		orderBoxDivVer.append(subValueDivVer);
		orderBoxDivVer.append(subLabelDivVer);
		
		actionsDivVer.append(activeJobBoxDivVer);
		actionsDivVer.append(orderBoxDivVer);
		
		var actionMenuDivVer = $('<div/>');
		actionMenuDivVer.attr('class','action-btn');
		actionMenuDivHtmlVer ='<div id="actionMenuVer_'+jobNo+'" rel="'+jobDetails.Action_items+'##'+jobSubmittedBy+'" ><img src="../images/actions.png" width="19" height="67" border="0" align="absbottom" /></div>';
		actionMenuDivHtmlVer = actionMenuDivHtmlVer ;
		createActionMenuIdsVer =  createActionMenuIdsVer + 'actionMenuVer_'+jobNo+',';		
		actionMenuDivVer.html(actionMenuDivHtmlVer);
		
		jobMainContentDivVer.append(actionMenuDivVer);
		jobMainContentDivVer.append(actionsDivVer);
		mainContentDivVer.append(jobMainContentDivVer);	
		scrollerLastDiv.append(mainContentDivVer);
		
		//End Vertical Active List
		k++;
		
	});
	
	 $("#loadPage").html("");
	//$("#loadPage").append('<div id="loadMore" class="load-more"><a id="1" href="#" class="more" >Load More</a></div>');
	
	// creating Menu for each JOB
	showPopup(createActionMenuIds, "popup");
	showPopup(createActionMenuIdsVer, "popup");
	
	$("#isloading").val("false");
	
	$(".scroll-job-div > .nano").nanoScroller();

	$('.scroll-job-div').find('.job-no-col').parent().children().each(function(){
			
			$(this).hover(function(){
					$(this).parent().parent().addClass('active-job-list');
				},
				function(){
					$(this).parent().parent().removeClass('active-job-list');
				}
			);
			
			if(!($(this).hasClass('actions-col')))
			{
				$(this).click(function(){
					$("#isloading").val("true");
					//jobid = $(this).parent().parent().attr('id');		
					jobid = $(this).parent().attr('id');
					jobno = jobid.substr(4);
					$("#loadPage").html("Loading...");
					if($('.content-main-left').css('height')!='680px')
					{
						$('.content-main-left').css({"height" : '680px'});
					}
			
					if($('.content-main-left').css("width")!='309px')
					{
						$('.content-main-left').animate({"width" : '-=591px'}, "slow");
					}
					$('.normal-row').hide();
					$('#order_details').fadeIn('slow');
					$('.content-main-left').css({"height" : '680px', 'width':'309px'});
					$('#orderlist').css({'width':'289px'});
					$('.contentOrderList').css({'width':'289px'});
					//document.getElementById('ver_job_'+jobno).scrollIntoView(true);
					$('.active-jobs-box-outer').show();
					$('.content-left-box').hide();
					
					$('.scroll-job-div').find('.active-jobs-box-row1.shadow.active-job-list').removeClass('active-job-list-ver');
					
					$('#ver_job_'+jobno).addClass('active-job-list-ver');
					
					$(".scroll-job-div > .nano").nanoScroller({scrollTo : $('#ver_job_'+jobno)});
					
					$('#activelist').val('ver');
					$.post('/orders/viewjob',{'jobno':jobno},function(data1){
						$('#order_details').html(data1);
						$("#loadPage").html("");
						//createVerticalOrderListHTMLData(data, '');
						//document.getElementById('job_'+jobno).scrollIntoView(false);
						$("#isloading").val("false");
					});
				});
			}
		});
	
	$('.scroll-job-div').find('.job-no-col').parent().children().each(function(){
		
		$(this).hover(function(){
				$(this).parent().parent().addClass('active-job-list');
			},
			function(){
				$(this).parent().parent().removeClass('active-job-list');
			}
		);
	});	
	
	$('.jobnocol').unbind().click(function(){
		$("#isloading").val("true");
		jobid = $(this).parent().attr('id');		
		jobno = jobid.substr(8);
		
		$('.scroll-job-div').find('.active-jobs-box-row1.shadow.active-job-list-ver').removeClass('active-job-list-ver');
		
		$('#ver_job_'+jobno).addClass('active-job-list-ver');
		
		$('#order_details').html("<div style='text-align:center;'><img src='/images/loading4.gif' style='vertical-align:middle' /></div>");
		$.post('/orders/viewjob',{'jobno':jobno},function(data1){
			$('#order_details').html(data1);		
			
			//document.getElementById('ver_job_'+jobno).scrollIntoView(true);
			$("#isloading").val("false");
		});
		
		$(".scroll-job-div > .nano").nanoScroller({scrollTo:$('#ver_job_'+jobno)});
	});
	
	
}

/**
 * Function (loadMsgList) is used to  load MsgList HTML
 * 
 * 
 * @return null.
*/


function loadMsgList() {
	$("#loadPage").html("Loading...");
	$("#msgpage").val(0);
	$.post('/view/messages', $("#msg_form").serialize(), function(data) {
		data = $.parseJSON(data);
		
		if(data=='')
		{
			$("#msgbox").css('display','table');
			$("#msgbox_text").html("<div><div>No New Messages</div><div class='button' style='margin-left:80px'><a  class='home' id='msgok' href='#' style='padding-bottom:0px;color:#000000'><span style='font-size:10px;'>OK</span></a></div> &nbsp;</div></div>");
			$("#msgbox").fadeIn('fast',function(){
				$("#msgbox").css('display','table');
			});
			$('#msgok').click(function(e){
				e.preventDefault();
				$("#msgbox").fadeOut('fast');
			});
			$("#loadPage").html('');			
			return;
		}
		
		$("#msgpage").val(0);
       	
		$('#main_body').html('');
		
		//var fullWidthDiv = $('<div/>');
		//fullWidthDiv.attr('class','full-width-ajob-con');	
		
		var listHeaderDiv = $('<div/>');
		listHeaderDiv.attr('class','normal-row');
		listHeaderDivHtml = '<div class="status-col caps">STATUS</div><div class="order-no-col caps lalign">ORDER NUMBER</div><div class="job-type-col caps ralign">JOB TYPE</div><div class="order-date-col caps">POSTED</div><div class="job-no-col caps">JOB NUMBER</div><div class="summited-by-col caps">POSTED BY</div><div class="msg-col caps">MESSAGE</div><br />';
		listHeaderDivHtml = listHeaderDivHtml ;
		listHeaderDiv.html(listHeaderDivHtml);
		//fullWidthDiv.append(listHeaderDiv);
		
		var msgListDiv = $('<div/>');
		msgListDiv.attr('id','messlist');
		msgListDiv.attr('style','height:680px;background:#e5e5e5;');
		msgListDiv.attr('class','new-order-list-cont');		
		var msgMainDiv = $('<div/>');
		msgMainDiv.attr('class','mess-main-left');
		var msgFormDiv = $('<div/>');
		msgFormDiv.attr('id','mess_form');
		msgMainDiv.append(msgFormDiv);
		msgMainDiv.append(msgListDiv);
		
		msgListDiv.append(listHeaderDiv);
		
		var msgDetailsDiv = $('<div/>');
		msgDetailsDiv.attr('id','mess_details');
		msgDetailsDiv.attr('style','float:left;display:none;');
		var msgContainerDiv = $('<div/>');
		msgContainerDiv.attr('class','clear-block');
		msgContainerDiv.append(msgMainDiv);
		msgContainerDiv.append(msgDetailsDiv);
		//
		var inp = $("<input/>");
		inp.attr({id:'isloadingmsg',type:'hidden'});
		inp.val("false");
		msgListDiv.append(inp);
		
		var inp = $("<input/>");
		inp.attr({id:'activemsglist',type:'hidden'});
		inp.val("full");
		msgListDiv.append(inp);
		//
		
		//nanao scroller
		var scrollerMainDiv = $('<div/>');
		scrollerMainDiv.attr('class','scroll-job-div');
		
		var scrollerNanoDiv = $('<div/>');
		scrollerNanoDiv.attr('class','nano');
		
		var scrollerLastDiv = $('<div/>');
		scrollerLastDiv.attr('class','content contentOrderList');
		scrollerLastDiv.attr('style','width:903px; border:none;');
		
		scrollerNanoDiv.append(scrollerLastDiv);
		scrollerMainDiv.append(scrollerNanoDiv);
		//
		msgListDiv.append(scrollerMainDiv);
		
		
		
		var loadPageDiv = $('<div/>');
		loadPageDiv.attr('id','loadPage');
		win_width = $(document).width();
		wwidth = (win_width/2)-50;
		loadPageDiv.attr('style','position:fixed;top:0px;left:'+wwidth+'px;background-color:yellow;font-size:18px;font-weight:bold;');
		
		$("#main_body").append(msgContainerDiv);
		$("#main_body").append(loadPageDiv);
		
		if (data=='')
		{
			$("#main_body").html("<div align='center' style='height:300px; margin-top:10px; font-weight:bold; color:red; background-color:#f8f8f8;' ><br/><br/>No New Messages</div>");
		}
		else
		{
			$("#isloadingmsg").val("true");
			maincontentdiv_holders = new Array();
			k = 0;
			//createActionMenuIds = new Array();
			var createActionMenuIds = '';
			$.each(data,function(jobNo,msgDetails)
			{
				//start Horizontal Active List
				var mainContentFullDiv = $('<div/>');
				mainContentFullDiv.attr('class','content-left-box');
				
				if ($('#activemsglist').val() == "full")
				{
					mainContentFullDiv.attr('style','display:block');
				}
				else
				{
					mainContentFullDiv.attr('style','display:none');
				}
				
				var mainContentDiv = $('<div/>');
				
				var createMenuDivHtml = '';
				mainContentDiv.attr('class','jl-styled-row'); 
				
				
				var jobMainContentDiv = $('<div/>');
				jobMainContentDiv.attr('class','jl-styled-row-inner');
				
				var jobContentDiv = $('<div/>');
				jobContentDiv.attr('id','job_'+msgDetails.JobNo);
				
				var statusDiv = $('<div/>');
				statusDiv.attr('class','status-col');
				
				var statusDescOuterDiv = $('<div>');
				statusDescOuterDiv.attr('class','status-lables-red');
				
				var statusDescDiv = $('<div class="mm-msg" id="'+msgDetails.MsgId+'">');
				statusDescOuterDiv.append(statusDescDiv);
				//alert(jobDetails.Status);
				
				statusDescDiv.html("UNREAD");
							
				statusDiv.append(statusDescOuterDiv);
				
				TrackingNo = msgDetails.TrackingNo;
				
				var tracknoDiv = $('<div/>');
				tracknoDiv.attr('class','order-no-col lalign black-txt order-no-font');
				tracknoDiv.html(TrackingNo+'&nbsp;');
				
				var ordTypeDiv = $('<div/>');
				ordTypeDiv.attr('class','job-type-col r-align black-txt');
				
				jobOrderType = '/images/print_icon.png';
				
				$.each(msgDetails,function(fieldKey, fieldValue)
				{
					if(fieldKey=='Order_Type')
					{
						if(fieldValue=="Print")
						{
							jobOrderType = '/images/print_icon.png';
						}
						else if(fieldValue=="Web")
						{
							jobOrderType = '/images/web-icon.png';
						}
						else if(fieldValue=="Mobile")
						{
							jobOrderType = '/images/mobile-icon.png';
						}
					}
				});
					
				ordTypeDiv.html('<img src="'+jobOrderType+'" width="13" height="16" border="0">');
				
				
				var ordereddateDiv = $('<div/>');
				ordereddateDiv.attr('class','order-date-col black-txt');
				ordereddateDiv.html(msgDetails.Posted);			
				
				var jobnoDiv = $('<div/>');
				jobnoDiv.attr('class','job-no-col black-txt bold-txt');
				jobnoDiv.html(msgDetails.AbbrJobNo);
				
				
				var submitbydDiv = $('<div/>');
				submitbydDiv.attr('class','summited-by-col black-txt');
				submitbydDiv.html(msgDetails.From);	
				
				
				var actionMenuDiv = $('<div/>');
				actionMenuDiv.attr('class','msg-col black-txt');
				
				
				actionMenuDivHtml = msgDetails.Msg ;
						
				actionMenuDiv.html(actionMenuDivHtml);
				
				
				jobContentDiv.append(statusDiv);
				jobContentDiv.append(tracknoDiv);
				jobContentDiv.append(ordTypeDiv);
				jobContentDiv.append(ordereddateDiv);				
				jobContentDiv.append(jobnoDiv);
				jobContentDiv.append(submitbydDiv);
				jobContentDiv.append(actionMenuDiv);
				jobMainContentDiv.append(jobContentDiv);
				mainContentDiv.append(jobMainContentDiv);
				mainContentFullDiv.append(mainContentDiv);
				scrollerLastDiv.append(mainContentFullDiv);
				
				//end Horizontal Active List
				
				
				//NEW UI Layout Starts Here
				
				
				var mainContentDivVer = $('<div/>');
				
				var createMenuDivHtmlVer = '';
				mainContentDivVer.attr('class','active-jobs-box-outer'); 
				
				
				if ($('#activemsglist').val() == "ver")
				{
					mainContentDivVer.attr('style','display:block');
				}
				else
				{
					mainContentDivVer.attr('style','display:none');
				}
				
				
				
				var jobMainContentDivVer = $('<div/>');
				jobMainContentDivVer.attr('class','active-jobs-box');
				mainContentDivVer.append(jobMainContentDivVer);
				
				var actionsDivVer = $('<div/>');
				actionsDivVer.attr('class',"action-left-column");
				
				var activeJobBoxDivVer =  $('<div/>');
				activeJobBoxDivVer.attr('id','ver_job_'+msgDetails.JobNo);
				activeJobBoxDivVer.attr('class','active-jobs-box-row1 shadow');
				
				var statusOuterDivver = $('<div>');
				statusOuterDivClassVer = 'status-lables-red';
				//statusOuterDivClassVer = 'small-'+statusStyleClass(jobDetails.Status);
				statusOuterDivver.attr('class',statusOuterDivClassVer);
				
				var statusDivVer = $('<div class="mm-msg" id="'+msgDetails.MsgId+'" />');
				
				statusDivVer.html("UNREAD");
				
				
				statusOuterDivver.append(statusDivVer);
				
				
				//statusDivVer.html(jobDetails.Status);
				
				var jobNoDivTopVer = $('<div/>');
				jobNoDivTopVer.attr('class','jobnocol order-block1 order-list-font3');
				jobNoDivTopVer.html(msgDetails.AbbrJobNo);
				
				var iconDivVer = $('<div/>');
				iconDivVer.attr('class','order-block2 r-align');
				iconDivVer.html('<img src="../images/job-icon.png" width="9" height="13" />');
				
				activeJobBoxDivVer.append(statusOuterDivver);
				//activeJobBoxDiv.append(statusDivVer);
				
				activeJobBoxDivVer.append(jobNoDivTopVer);
				activeJobBoxDivVer.append(iconDivVer);
				
				var orderBoxDivVer = $('<div/>');
				orderBoxDivVer.attr('class','order-list-rw1');
				
				var divElementsVer =  $('<div/>');
				divElementsVer.css({"float" : 'left', 'width':'70px'});
				
				var divElementsRowFirstVer =  $('<div/>');
				divElementsRowFirstVer.attr('class','order-block1 order-list-font1');
				divElementsRowFirstVer.html('POSTED <strong>'+msgDetails.Posted+'</strong>');				
				
				divElementsVer.append(divElementsRowFirstVer);				
				
				var brandDivVer = $('<div/>');
				brandDivVer.attr('class','order-block3 order-list-font2 black-txt');
				brandDivVer.html(msgDetails.From);
				
				var brandValueDivVer = $('<div/>');
				brandValueDivVer.attr('class','order-block4');
				brandValueDivVer.html('FROM');
				
				var jobNoDivVer = $('<div/>');
				jobNoDivVer.attr('class','order-block3 order-list-font2 black-txt');
				jobNoDivVer.html(msgDetails.Msg);
				
				var jobNoLabelDivVer = $('<div/>');
				jobNoLabelDivVer.attr('class','order-block4');
				jobNoLabelDivVer.html('Message');
				
				
				
				
				orderBoxDivVer.append(divElementsVer);
				orderBoxDivVer.append(brandDivVer);
				orderBoxDivVer.append(brandValueDivVer);
				orderBoxDivVer.append(jobNoDivVer);
				orderBoxDivVer.append(jobNoLabelDivVer);
				
				actionsDivVer.append(activeJobBoxDivVer);
				actionsDivVer.append(orderBoxDivVer);
				
				jobMainContentDivVer.append(actionsDivVer);
				mainContentDivVer.append(jobMainContentDivVer);	
				scrollerLastDiv.append(mainContentDivVer);
				k++;
			});
			
			$("#isloadingmsg").val("false");
			//setTimeout("$(this).showmsg("+(k-1)+");",300);
			
			
			$(".scroll-job-div > .nano").unbind().bind("scrollend", function(e){
		        	if($("#dragHandle").html()=='MESSAGES'  && $("#isloadingmsg").val()=="false")
		        	{
	        		   	$("#loadPage").html("Loading...");
	                   	
	                   	$("#isloadingmsg").val("true");
	                   	
	                   	currentPage = $("#msgpage").val();
	                   	
	                   	currentPage++;

	                   	$("#msgpage").val(currentPage);
	                   	
	                   	$.post("/view/messages", $("#msg_form").serialize(), function(data) {        		
	                   			
	                        loadMoreMsgList(data,1);

	                	});       	
		        	}
		        });
			
			/*$('.jobnocol').click(function(){
				jobid = $(this).parent().attr('id');
				jobno = jobid.substr(8);
				id = $(this).parent().find('.mm-msg').attr('id');
				//$('#'+id).attr('class','inner-content');
				//$('.inner-content').html('MESSAGE READ');
				messageRead(jobno,id)
				
			});*/			
			
			$("#isloading").val("false");
			
			$(".scroll-job-div > .nano").nanoScroller({});

			$('.scroll-job-div').find('.job-no-col').parent().children().each(function(){
					
					$(this).hover(function(){
							$(this).parent().parent().addClass('active-job-list');
						},
						function(){
							$(this).parent().parent().removeClass('active-job-list');
						}
					);
					
					if(!($(this).hasClass('actions-col')))
					{
						$(this).click(function(){
							$("#isloading").val("true");
							
							jobid = $(this).parent().attr('id');
							jobno = jobid.substr(4);
							id = $(this).parent().find('.mm-msg').attr('id');
							
							$("#loadPage").html("Loading...");
							if($('.content-main-left').css('height')!='680px')
							{
								$('.content-main-left').css({"height" : '680px'});
							}
					
							if($('.content-main-left').css("width")!='309px')
							{
								$('.content-main-left').animate({"width" : '-=591px'}, "slow");
							}
							$('.normal-row').hide();
							$('#mess_details').fadeIn('slow');
							$('.content-main-left').css({"height" : '680px', 'width':'309px'});
							$('#messlist').css({'width':'289px'});
							$('.contentOrderList').css({'width':'289px'});
							//document.getElementById('ver_job_'+jobno).scrollIntoView(true);
							$('.active-jobs-box-outer').show();
							$('.content-left-box').hide();
							
							$('.scroll-job-div').find('.active-jobs-box-row1.shadow.active-job-list').removeClass('active-job-list-ver');
							
							$('#ver_job_'+jobno).addClass('active-job-list-ver');
							
							$(".scroll-job-div > .nano").nanoScroller({scrollTo : $('#ver_job_'+jobno)});
							
							$('#activemsglist').val('ver');
							
							
							
							messageRead(jobno,id);
						});
					}
				});
			
			$('.scroll-job-div').find('.job-no-col').parent().children().each(function(){
				
				$(this).hover(function(){
						$(this).parent().parent().addClass('active-job-list');
					},
					function(){
						$(this).parent().parent().removeClass('active-job-list');
					}
				);
			});	
			
			$('.jobnocol').unbind().click(function(){
				$("#isloading").val("true");
				jobid = $(this).parent().attr('id');
				jobno = jobid.substr(8);
				id = $(this).parent().find('.mm-msg').attr('id');				
				messageRead(jobno,id);
			});
			
			
			
		}	
	});
	
}

function loadMoreMsgList(data, clearbody) {
	
	data = $.parseJSON(data);
	
	
	if(data=='')
	{
		$("#loadPage").html("");
		$(".scroll-job-div .nano").unbind("scrollend");			
		return;
	}
	
	
	msgListDiv = $(".contentOrderList");
	k=0;
	
	scrollerLastDiv = $('.contentOrderList');
	$.each(data,function(jobNo,msgDetails)
	{
		/*var mainContentDiv = $('<div/>');
		var createMenuDivHtml = '';
		mainContentDiv.attr('class','content-left-box-msg');
		mainContentDiv.attr('style','display:block');
		//
		var jobContentDiv = $('<div/>');
		jobContentDiv.attr('id','job_'+msgDetails.JobNo);
		var statusDiv = $('<div/>');
		//
		var statusDiv = $('<div/>');
		statusDiv.attr('class',msgDetails.TiltleClass);
		statusDiv.attr('id',msgDetails.MsgId);
		statusDiv.html(msgDetails.TiltleMsg);
		//
		var jobNoDiv = $('<div/>');
		jobNoDiv.attr('class','inner-content_left');
		jobNoDiv.html('<img src="/images/print-icon.png" width="12" height="15" align="absmiddle">&nbsp;'+msgDetails.AbbrJobNo);
		//
		var msgDetailsContainer = $("<div/>");
		msgDetailsContainer.attr('class',"inner-content1");
		msgDetailsContainer.html('<span>Posted</span>'+msgDetails.Posted);
		//
		var dateDivContainer = $('<div/>');
		dateDivContainer.attr('class','inner-content1_left');
		//
		var fromDivContainer = $('<div/>');
		fromDivContainer.attr('id','from-content');
		fromDivContainer.html('From <span>'+msgDetails.From+'</span>');
		//
		var msgDivContainer = $('<div/>');
		msgDivContainer.attr('id','msg-content');
		msgDivContainer.html('Content <span>'+msgDetails.Msg+'</span>');
		//
		jobContentDiv.append(statusDiv);
		jobContentDiv.append(jobNoDiv);
		jobContentDiv.append(msgDetailsContainer);
		//
		dateDivContainer.append(fromDivContainer);
		dateDivContainer.append(msgDivContainer);
		mainContentDiv.append(jobContentDiv);
		mainContentDiv.append(dateDivContainer);
		msgListDiv.append(mainContentDiv);
		//alert(mainContentDiv);
		k++;*/
		
		//start Horizontal Active List
		var mainContentFullDiv = $('<div/>');
		mainContentFullDiv.attr('class','content-left-box');
		
		if ($('#activemsglist').val() == "full")
		{
			mainContentFullDiv.attr('style','display:block');
		}
		else
		{
			mainContentFullDiv.attr('style','display:none');
		}
		
		var mainContentDiv = $('<div/>');
		
		var createMenuDivHtml = '';
		mainContentDiv.attr('class','jl-styled-row'); 
		
		
		var jobMainContentDiv = $('<div/>');
		jobMainContentDiv.attr('class','jl-styled-row-inner');
		
		var jobContentDiv = $('<div/>');
		jobContentDiv.attr('id','job_'+msgDetails.JobNo);
		
		var statusDiv = $('<div/>');
		statusDiv.attr('class','status-col');
		
		var statusDescOuterDiv = $('<div>');
		statusDescOuterDiv.attr('class','status-lables-red');
		
		var statusDescDiv = $('<div class="mm-msg" id="'+msgDetails.MsgId+'">');
		statusDescOuterDiv.append(statusDescDiv);
		//alert(jobDetails.Status);
		
		statusDescDiv.html("UNREAD");
					
		statusDiv.append(statusDescOuterDiv);
		
		TrackingNo = msgDetails.TrackingNo;
		
		var tracknoDiv = $('<div/>');
		tracknoDiv.attr('class','order-no-col lalign black-txt order-no-font');
		tracknoDiv.html(TrackingNo+'&nbsp;');
		
		var ordTypeDiv = $('<div/>');
		ordTypeDiv.attr('class','job-type-col r-align black-txt');
		
		jobOrderType = '/images/print_icon.png';
		
		$.each(msgDetails,function(fieldKey, fieldValue)
		{
			if(fieldKey=='Order_Type')
			{
				if(fieldValue=="Print")
				{
					jobOrderType = '/images/print_icon.png';
				}
				else if(fieldValue=="Web")
				{
					jobOrderType = '/images/web-icon.png';
				}
				else if(fieldValue=="Mobile")
				{
					jobOrderType = '/images/mobile-icon.png';
				}
			}
		});
			
		ordTypeDiv.html('<img src="'+jobOrderType+'" width="13" height="16" border="0">');
		
		
		var ordereddateDiv = $('<div/>');
		ordereddateDiv.attr('class','order-date-col black-txt');
		ordereddateDiv.html(msgDetails.Posted);			
		
		var jobnoDiv = $('<div/>');
		jobnoDiv.attr('class','job-no-col black-txt bold-txt');
		jobnoDiv.html(msgDetails.AbbrJobNo);
		
		
		var submitbydDiv = $('<div/>');
		submitbydDiv.attr('class','summited-by-col black-txt');
		submitbydDiv.html(msgDetails.From);	
		
		
		var actionMenuDiv = $('<div/>');
		actionMenuDiv.attr('class','msg-col black-txt');
		
		
		actionMenuDivHtml = msgDetails.Msg ;
				
		actionMenuDiv.html(actionMenuDivHtml);
		
		
		jobContentDiv.append(statusDiv);
		jobContentDiv.append(tracknoDiv);
		jobContentDiv.append(ordTypeDiv);
		jobContentDiv.append(ordereddateDiv);				
		jobContentDiv.append(jobnoDiv);
		jobContentDiv.append(submitbydDiv);
		jobContentDiv.append(actionMenuDiv);
		jobMainContentDiv.append(jobContentDiv);
		mainContentDiv.append(jobMainContentDiv);
		mainContentFullDiv.append(mainContentDiv);
		scrollerLastDiv.append(mainContentFullDiv);
		
		//end Horizontal Active List
		
		
		var mainContentDivVer = $('<div/>');
		
		var createMenuDivHtmlVer = '';
		mainContentDivVer.attr('class','active-jobs-box-outer'); 
		
		
		if ($('#activemsglist').val() == "ver")
		{
			mainContentDivVer.attr('style','display:block');
		}
		else
		{
			mainContentDivVer.attr('style','display:none');
		}
		
		
		
		var jobMainContentDivVer = $('<div/>');
		jobMainContentDivVer.attr('class','active-jobs-box');
		mainContentDivVer.append(jobMainContentDivVer);
		
		var actionsDivVer = $('<div/>');
		actionsDivVer.attr('class',"action-left-column");
		
		var activeJobBoxDivVer =  $('<div/>');
		activeJobBoxDivVer.attr('id','ver_job_'+msgDetails.JobNo);
		activeJobBoxDivVer.attr('class','active-jobs-box-row1 shadow');
		
		var statusOuterDivver = $('<div>');
		statusOuterDivClassVer = 'status-lables-red';
		//statusOuterDivClassVer = 'small-'+statusStyleClass(jobDetails.Status);
		statusOuterDivver.attr('class',statusOuterDivClassVer);
		
		var statusDivVer = $('<div class="mm-msg"  id="'+msgDetails.MsgId+'" />');
		
		statusDivVer.html("UNREAD");
		
		
		statusOuterDivver.append(statusDivVer);
		
		
		//statusDivVer.html(jobDetails.Status);
		
		var jobNoDivTopVer = $('<div/>');
		jobNoDivTopVer.attr('class','jobnocol order-block1 order-list-font3');
		jobNoDivTopVer.html(msgDetails.AbbrJobNo);
		
		var iconDivVer = $('<div/>');
		iconDivVer.attr('class','order-block2 r-align');
		iconDivVer.html('<img src="../images/job-icon.png" width="9" height="13" />');
		
		activeJobBoxDivVer.append(statusOuterDivver);
		//activeJobBoxDiv.append(statusDivVer);
		
		activeJobBoxDivVer.append(jobNoDivTopVer);
		activeJobBoxDivVer.append(iconDivVer);
		
		var orderBoxDivVer = $('<div/>');
		orderBoxDivVer.attr('class','order-list-rw1');
		
		var divElementsVer =  $('<div/>');
		divElementsVer.css({"float" : 'left', 'width':'70px'});
		
		var divElementsRowFirstVer =  $('<div/>');
		divElementsRowFirstVer.attr('class','order-block1 order-list-font1');
		divElementsRowFirstVer.html('POSTED <strong>'+msgDetails.Posted+'</strong>');				
		
		divElementsVer.append(divElementsRowFirstVer);				
		
		var brandDivVer = $('<div/>');
		brandDivVer.attr('class','order-block3 order-list-font2 black-txt');
		brandDivVer.html(msgDetails.From);
		
		var brandValueDivVer = $('<div/>');
		brandValueDivVer.attr('class','order-block4');
		brandValueDivVer.html('FROM');
		
		var jobNoDivVer = $('<div/>');
		jobNoDivVer.attr('class','order-block3 order-list-font2 black-txt');
		jobNoDivVer.html(msgDetails.Msg);
		
		var jobNoLabelDivVer = $('<div/>');
		jobNoLabelDivVer.attr('class','order-block4');
		jobNoLabelDivVer.html('Message');		
		
		orderBoxDivVer.append(divElementsVer);
		orderBoxDivVer.append(brandDivVer);
		orderBoxDivVer.append(brandValueDivVer);
		orderBoxDivVer.append(jobNoDivVer);
		orderBoxDivVer.append(jobNoLabelDivVer);
		
		actionsDivVer.append(activeJobBoxDivVer);
		actionsDivVer.append(orderBoxDivVer);
		
		jobMainContentDivVer.append(actionsDivVer);
		mainContentDivVer.append(jobMainContentDivVer);	
		scrollerLastDiv.append(mainContentDivVer);
		k++;
	});
	$("#loadPage").html("");     
	$("#isloadingmsg").val("false");
	//setTimeout("$(this).showmsg("+(k-1)+");",300);
	//setTimeout("$(this).showmsg("+(k-1)+");$(\"#loadPage\").html(\"\");",300);
	
	/*$('.jobnocol').click(function(){
		jobid = $(this).parent().attr('id');
		jobno = jobid.substr(8);
		id = $(this).parent().find('.mm-msg').attr('id');
		//$('#'+id).attr('class','inner-content');
		//$('.inner-content').html('MESSAGE READ');
		messageRead(jobno,id)
		
	});*/
	
	$(".scroll-job-div > .nano").unbind().bind("scrollend", function(e){
    	if($("#dragHandle").html()=='MESSAGES' && $("#isloadingmsg").val()=="false")
    	{
		   	$("#loadPage").html("Loading...");
           	
           	$("#isloadingmsg").val("true");
           	
           	currentPage = $("#msgpage").val();
           	
           	currentPage++;

           	$("#msgpage").val(currentPage);
           	
           	$.post("/view/messages", $("#msg_form").serialize(), function(data) {        		
           			
                loadMoreMsgList(data,1);

        	});       	
    	}
    });

	/*$('.jobnocol').click(function(){
		jobid = $(this).parent().attr('id');
		jobno = jobid.substr(8);
		id = $(this).parent().find('.mm-msg').attr('id');
		//$('#'+id).attr('class','inner-content');
		//$('.inner-content').html('MESSAGE READ');
		messageRead(jobno,id)
		
	});*/			

		$("#isloading").val("false");
		
		$(".scroll-job-div > .nano").nanoScroller({});
		
		$('.scroll-job-div').find('.job-no-col').parent().children().each(function(){
		
		$(this).hover(function(){
				$(this).parent().parent().addClass('active-job-list');
			},
			function(){
				$(this).parent().parent().removeClass('active-job-list');
			}
		);
		
		if(!($(this).hasClass('actions-col')))
		{
			$(this).click(function(){
				$("#isloading").val("true");
				
				jobid = $(this).parent().attr('id');
				jobno = jobid.substr(4);
				id = $(this).parent().find('.mm-msg').attr('id');
				
				$("#loadPage").html("Loading...");
				if($('.content-main-left').css('height')!='680px')
				{
					$('.content-main-left').css({"height" : '680px'});
				}
		
				if($('.content-main-left').css("width")!='309px')
				{
					$('.content-main-left').animate({"width" : '-=591px'}, "slow");
				}
				$('.normal-row').hide();
				$('#mess_details').fadeIn('slow');
				$('.content-main-left').css({"height" : '680px', 'width':'309px'});
				$('#messlist').css({'width':'289px'});
				$('.contentOrderList').css({'width':'289px'});
				//document.getElementById('ver_job_'+jobno).scrollIntoView(true);
				$('.active-jobs-box-outer').show();
				$('.content-left-box').hide();
				
				$('.scroll-job-div').find('.active-jobs-box-row1.shadow.active-job-list').removeClass('active-job-list-ver');
				
				$('#ver_job_'+jobno).addClass('active-job-list-ver');
				
				$(".scroll-job-div > .nano").nanoScroller({scrollTo : $('#ver_job_'+jobno)});
				
				$('#activemsglist').val('ver');
				
				messageRead(jobno,id);
			});
		}
	});

	$('.scroll-job-div').find('.job-no-col').parent().children().each(function(){
		
		$(this).hover(function(){
				$(this).parent().parent().addClass('active-job-list');
			},
			function(){
				$(this).parent().parent().removeClass('active-job-list');
			}
		);
	});	
	
	$('.jobnocol').unbind().click(function(){
		$("#isloading").val("true");
		jobid = $(this).parent().attr('id');
		jobno = jobid.substr(8);
		id = $(this).parent().find('.mm-msg').attr('id');				
		messageRead(jobno,id);
	});
	
	
}




function messageRead(jobno,id)
{
	$("#loadPage").html("Loading...");
	$.post('/view/messageread',{'jobno':jobno,'msgid':id},function(data){
		$.post('/orders/viewjob',{'jobno':jobno},function(data){
			
			//$('#'+id).parent().removeClass('status-lables-red').addClass('status-lables-green');
			$('#messlist').find('#'+id).parent().removeClass('status-lables-red').addClass('status-lables-green');
			$('#messlist').find('#'+id).html('READ');
			$('#mess_details').html(data);
			
			 if($('.mess-main-left').css('height')!='680px')
             {
                     $('.mess-main-left').css({"height" : '680px'});
             }

             if($('.mess-main-left').css("width")!='309px')
             {
                     $('.mess-main-left').animate({"width" : '-=591px'}, "slow");
                     $('.contentOrderList').css({'width':'289px'});
                     $('#mess_details').show();
             }
			$(".noteboxes").hide();
			$("#noteboxview").fadeIn("normal");
			nextprev("msgbrd");
			//document.getElementById('job_'+jobno).scrollIntoView(false);
			 $("#loadPage").html("");
			 
			 $("#messlist").find(".scroll-job-div > .nano").nanoScroller({scrollTo:$("#"+id).parent().parent()});
		});
	});
}



/**
 * JavaScript Function (rawurlencode) is used to convert string like PHP function(rawurlencode)
 * 
 * Refrence: phpjs.org-functions-rawurlencode
 * @return string(encoded formate).
*/
function rawurlencode (str) {
	  str = (str + '').toString();
	  return encodeURIComponent(str).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28').
	  replace(/\)/g, '%29').replace(/\*/g, '%2A');
}


function rawurldecode( str ) {  
    // Decodes URL-encodes string    
    //   
    // version: 901.1411  
    // discuss at: http://phpjs.org/functions/rawurldecode  
    // +   original by: Brett Zamir  
    // *     example 1: rawurldecode('Kevin+van+Zonneveld%21');  
    // *     returns 1: 'Kevin+van+Zonneveld!'  
    // *     example 2: rawurldecode('http%3A%2F%2Fkevin.vanzonneveld.net%2F');  
    // *     returns 2: 'http://kevin.vanzonneveld.net/'  
    // *     example 3: rawurldecode('http%3A%2F%2Fwww.google.nl%2Fsearch%3Fq%3Dphp.js%26ie%3Dutf-8%26oe%3Dutf-8%26aq%3Dt%26rls%3Dcom.ubuntu%3Aen-US%3Aunofficial%26client%3Dfirefox-a');  
    // *     returns 3: 'http://www.google.nl/search?q=php.js&ie=utf-8&oe=utf-8&aq=t&rls=com.ubuntu:en-US:unofficial&client=firefox-a'  
    var histogram = {};  
    var ret = str.toString();   
  
    var replacer = function(search, replace, str) {  
        var tmp_arr = [];  
        tmp_arr = str.split(search);  
        return tmp_arr.join(replace);  
    };  
  
    // The histogram is identical to the one in urlencode.  
    histogram["'"]   = '%27';  
    histogram['(']   = '%28';  
    histogram[')']   = '%29';  
    histogram['*']   = '%2A';  
    histogram['~']   = '%7E';  
    histogram['!']   = '%21';  
  
    for (replace in histogram) {  
        search = histogram[replace]; // Switch order when decoding  
        ret = replacer(search, replace, ret) // Custom replace. No regexing  
    }  
  
    // End with decodeURIComponent, which most resembles PHP's encoding functions  
    ret = decodeURIComponent(ret);  
  
    return ret;  
}  




