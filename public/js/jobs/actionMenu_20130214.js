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
					jsonDataForMenu.push({"id": "analyticsBox","name":"ANALYTICS"});
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
				alert(stringify(jsondata));
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
function showMessageResponse(responseText, statusText, xhr, $form)  {
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
		$("#"+this).click(function(){
			
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
			$('#changeJob_'+jobID).click(function(){
				$.post('/orders/create',{"jobno":jobID},function(data){	
					$('.content-main-left').css({"width" : '900px'});
					$('#dashboard').remove();
					$('#orderlist').remove();
					$('#order_details').remove();
					$('#order_form').html(data);
					$('#order_form').show('slow');
					
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
				$('#jobId').val(jobID);
				$('#requester').val(submittedBy);
				cancelJob();
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
								$('#changeTo').append('<option value="">Select Owner</option>');
								$.each(jsondata,function(key,val) {
									$('#changeTo').append('<option value="'+ val + '">' + val + '</option>');
								});
							} else {
								$('#changeTo').append('<option value="">Select Owner</option>');
							}
						
							$('#jobId').val(jobID);
							$('#currentOwner').val(submittedBy);
							changeOwner();
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
				$('#jobId').val(jobID);
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
				
				feedBack();
				//--
			});
			$('#accept_'+jobID).click(function(){	
				//--
				$('#jobId').val(jobID);
				accept();
				//--
			});
			$('#emailProof_'+jobID).click(function(){	
				//--
				$('#jobId').val(jobID);
				
				$.ajax({
url: '/orders/emailproofget',
type: 'POST',
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
				//var json = '{"subject":"Your ad ROF is available for proof","message":"You"}';
				emailProof();
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
				$('#jobId').val(jobID);
				assignJob();
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
	var pickupLI 		=  '<li><a href="#" id="pickupJob_'+jobID+'" ><img src="/images/pickup.png" />Pickup</a></li>';
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
    	if(actionItemsArray[i]=='PICKUP_ORDER')
    	{
    		createMenuDivHtml += pickupLI;
    	}
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


function cancelJob()
{
	var flag = false ;
	
	$( "#dialog-canceljob" ).dialog({
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
    });
	
	$("#actionMenuCanceljob").validate({
		submitHandler: function(form) {
			$.post('/orders/cancelorder', {
        		jobno: $('#jobId').val(),
                Comments: $('#reason').val(),
                requester: $('#requester').val(),
                form_action: 'cancel_order'
            }, function(d){
                //console.log(d);
                // Here we handle the response from the script
                // We are just going to alert the result for now
                loadOrderList();
                //alert(d);
            });
    		
			$("#dialog-canceljob").dialog( "close" );
			return false;
		},
		errorClass : "errorActionMenu",
		errorPlacement: function(error, element)
		{
			//var error_element_name = "#"+element.attr("name")+"_error";
			error.insertAfter(element);
		}
	});
}

/**
 * Function (assignJob) is used to assign Job. 
 * 
 * @return null.
*/
function assignJob()
{
	//alert('assignJob');
}

/**
 * Function (accept) is used to accept The Order. 
 * 
 * @return null.
*/
function accept()
{
	var flag = false ;
	$( "#dialog-accept" ).dialog({
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
	});
	
	
}

/**
 * Function (feedBack) is used to accept and feedBack The Order. 
 * 
 * @return null.
*/
function feedBack()
{
	var acceptAd ; 
	var flag = false ;
	$( "#dialog-feedback" ).dialog({
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
	});	
	
	 $.validator.addMethod("checkRating", function(value, element) {
		if($("#rating").val() == 0)
		{
			return false;
		}
		else
		{
			return true;
		}
	 }, "Please select Rating for this ad");
	
	$("#actionMenuFeedback").validate({
		submitHandler: function(form) {
			if ($('#status').attr('checked')) { acceptAd = 1 ; }
	    	else { acceptAd = 0 ; }
			$.post('/orders/feedbackorder', {
	    		order_number: $('#jobId').val(),
	    		jobno: $('#jobId').val(),
	    		feedback_rating: $('#rating').val(),
	    		accept_ad:acceptAd,
	    		feedback: $('#comments').val(),
	            form_action: 'order_feedback'
	        }, function(d){
	            //console.log(d);
	            // Here we handle the response from the script
	            // We are just going to alert the result for now
	            loadOrderList();
	            //alert(d);
	        });
    		
			$("#dialog-feedback").dialog( "close" );
			return false;
		},
		rules:{
			status:{
				checkRating:true
			}
		},
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
		}
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
	
	$("#loadToPopUp").html('');
	
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
	
	$("#actionMenuEmailproof").validate({
		submitHandler: function(form) {
			var selectedValue = "";
			var selected = $('input[type=radio][name=email_source]:checked', '#actionMenuEmailproof');
			if (selected.length > 0)
			    selectedValue = selected.val();
			
			if (selectedValue == '2adproMail') { adproMailServiceFlag = true ; }
	    	else if (selectedValue == 'DesktopMail') { adproMailServiceFlag = false ; }
			
			if (adproMailServiceFlag) {
	    		
	    		$.post('/orders/emailprooforder', {
	        		jobno: $('#jobId').val(),
	        		requester: 'demouser1',
	        		To: $('#To').val(),
	        		Subject: $('#Subject').val(),
	        		Message: $('#Message').val(),
	        		MessageHtml: $('#HTMLMessage').val(),
	        		email_source: $('input[name=email_source]:checked', '#actionMenuEmailproof').val(),
	        		product: 'JD',
	                form_action: 'eproof'
	            }, function(d){
	                //console.log(d);
	                // Here we handle the response from the script
	                // We are just going to alert the result for now
	                loadOrderList();
	                //alert(d);
	            });
	    		$( "#dialog-emailproof" ).dialog("close");
	    		
	    	} else {
	    		mailto_link='mailto:'+$('#To').val()+'?subject='+rawurlencode($('#Subject').val())+'&body='+rawurlencode($('#Message').val())+'&signature=';
	    		win = window.open(mailto_link,'emailWindow');
	    		if (win && win.open &&!win.closed) win.close();
	    		window.close();
	    		
	    		$( "#dialog-emailproof" ).dialog("close");
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
		$("#loadPage").html("Loading...");
		$.post('/orders/viewjob',{'jobno':jobno},function(data){
			$('#order_details').html(data);
			if($('.content-main-left').css('height')!='680px')
			{
				$('.content-main-left').css({"height" : '680px'});
			}

			if($('.content-main-left').css("width")!='309px')
			{
				$('.content-main-left').animate({"width" : '-=591px'}, "slow");
			}

			$('#order_details').fadeIn('slow');
			$('.content-main-left').css({"height" : '680px', 'width':'309px'});
			document.getElementById('job_'+jobno).scrollIntoView(false);
			$(".noteboxes").hide();
			$("#noteboxview").fadeIn("normal");
			nextprev("revcomm");
			//document.getElementById('job_'+jobno).scrollIntoView(false);
		});
		$("#loadPage").html("");
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
	printJoblink='http://prod3/orders/orderdetail/?id='+$('#jobId').val();
	win = window.open(printJoblink,'Job Direct 3 - Order Detail- '+$('#jobId').val());
}

/**
 * Function (messageJob) is used to show message section. 
 * 
 * @return null.
*/
function messageJob(jobID)
{
	jobno = jobID;
	$.post('/orders/viewjob',{'jobno':jobno},function(data){
		$('#order_details').html(data);
		
		if($('.content-main-left').css('height')!='680px')
		{
			$('.content-main-left').css({"height" : '680px', 'overflow-y':'scroll'});
			$('.content-main-left').animate({"width" : '-=570px'}, "slow", function(){
				$('#order_details').fadeIn('slow');
				$('.content-main-left').css({"height" : '680px', 'overflow-y':'scroll'});
				document.getElementById('job_'+jobno).scrollIntoView(false);
			});
			$('.content-main-left').css({"height" : '680px', 'overflow-y':'scroll'});
		}
		$(".noteboxes").hide();
		$("#noteboxview").fadeIn("normal");
		nextprev("msgbrd");
		//document.getElementById('job_'+jobno).scrollIntoView(false);
	});
}


/**
 * Function (changeOwner) is used to change the Job owner. 
 * 
 * @return null.
*/
function changeOwner()
{
	$( "#dialog-changeowner" ).dialog({
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
    });
	
	$("#actionMenuChangeowner").validate({
		submitHandler: function(form) {
			$.post('/orders/changeowner', {
	    		jobno: $('#jobId').val(),
	            requester: $('#currentOwner').val(),
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
			$("#dialog-changeowner").dialog("close");
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
	$("#loadPage").html("Loading...");
	$.post('/view/orderlist', function(data) {
		createOrderListHTMLData(data, '');
	});
}

/**
 * Function (createOrderListHTMLData) is used to  create OrderList HTML
 * 
 * 
 * @return null.
*/
function createOrderListHTMLData(data, clearbody) {
	if(clearbody!='1')
	{
		$('#main_body').html('');
		var loadPageDiv = $('<div/>');
		loadPageDiv.attr('id','loadPage');
		win_width = $(document).width();
		wwidth = (win_width/2)-50;
		loadPageDiv.attr('style','position:fixed;top:0px;left:'+wwidth+'px;background-color:yellow;font-size:18px;font-weight:bold;');
		$("#main_body").append(loadPageDiv);
	}

	data = $.parseJSON(data);
	var orderListDiv = $('<div/>');
	orderListDiv.attr('id','orderlist');
	//orderListDiv.attr('class','content-main-left');
	var contentMainDiv = $('<div/>');
	contentMainDiv.attr('class','content-main-left');
	var orderFormDiv = $('<div/>');
	orderFormDiv.attr('id','order_form');
	contentMainDiv.append(orderFormDiv);
	contentMainDiv.append(orderListDiv);
	var orderDetailsDiv = $('<div/>');
	orderDetailsDiv.attr('id','order_details');
	orderDetailsDiv.attr('style','float:left;display:none;');
	var containerDiv = $('<div/>');
	containerDiv.attr('class','clear-block');
	containerDiv.append(contentMainDiv);
	containerDiv.append(orderDetailsDiv);
	
	var inp = $("<input/>");
	inp.attr({id:'isloading',type:'hidden'});
	inp.val("false");
	orderListDiv.append(inp);
	
	
	$("#main_body").append(containerDiv);
	
	
	
	maincontentdiv_holders = new Array();
	k = 0;
	//createActionMenuIds = new Array();
	var createActionMenuIds = '';
	
	$.each(data,function(jobNo,jobDetails)
	{
		var mainContentDiv = $('<div/>');
		var createMenuDivHtml = '';
		mainContentDiv.attr('class','content-left-box');
		mainContentDiv.attr('style','display:none');
		var jobContentDiv = $('<div/>');
		jobContentDiv.attr('id','job_'+jobNo);
		var statusDiv = $('<div/>');
		statusDiv.attr('class','content-left-text');
		statusDiv.html(jobDetails.Status);
		var jobNoDivCont = $('<div/>');
		jobNoDivCont.attr('class','content-left-text1');
		var ordTypeDiv = $('<div/>');
		ordTypeDiv.attr('class','content-left-text11');
		
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
		
		
		
		var jobNoDiv = $('<div/>');
		jobNoDiv.attr('class','no');
		jobNoDiv.html('<b>'+jobDetails.JobNo+'</b>');
		jobNoDivCont.append(ordTypeDiv);
		jobNoDivCont.append(jobNoDiv);
		var jobDetailsContainer = $("<div/>");
		jobDetailsContainer.attr('class',"content-left-content");
		var dateDivContainer = $('<div/>');
		dateDivContainer.attr('class','content-left-content-text');
		dateDivContainer.html('<h4>Ordered</h4><h3>'+jobDetails.Ordered+'</h3><h4>Due</h4><h3>'+jobDetails.Due+'</h3>');
		jobDetailsContainer.append(dateDivContainer);
		var jobSpecDiv = $('<div/>');
		jobSpecDiv.attr('class','content-middle-right');
		jobSpecDivHtml = '<h1>';
		var jobSubmittedBy   ;
		$.each(jobDetails,function(fieldKey, fieldValue)
		{							
			if(fieldKey!='Ordered' && fieldKey!='JobNo' && fieldKey != 'Due' && fieldKey != 'Status' && fieldKey != 'Order_Type' && fieldKey != 'Action_Items')
			{
				if(fieldValue)
				{
					if(fieldValue.length>12)
					{
						jobSpecDivHtml += "<div class='fkey'>"+fieldKey+"</div>&nbsp;&nbsp;<div class='fvalue' title='"+fieldValue+"'>"+fieldValue.substr(0,10)+'...'+"</div>";
						if (fieldKey == 'Submitted By') {
							jobSubmittedBy = fieldValue;
						}
					}
					else
					{
						jobSpecDivHtml += "<div class='fkey'>"+fieldKey+"</div>&nbsp;&nbsp;<div class='fvalue'>"+fieldValue+"</div>";
						if (fieldKey == 'Submitted By') {
							jobSubmittedBy = fieldValue;
						}
					}
				}
				else
				{
					jobSpecDivHtml += "<div class='fkey'>"+fieldKey+"</div>&nbsp;&nbsp;<div class='fvalue'>"+fieldValue+"</div>";
					if (fieldKey == 'Submitted By') {
						jobSubmittedBy = fieldValue;
					}
				}
			}
		});
		jobSpecDivHtml +="</h1>";
		jobSpecDiv.html(jobSpecDivHtml);
		var actionMenuDiv = $('<div/>');
		actionMenuDiv.attr('class','content-right');
		//actionMenuDivHtml = '<div id="actionMenu_'+jobNo+'" rel="'+jobDetails.Status+'##'+jobSubmittedBy+'" ><div><h4>ACTION</h4></div><div class="content-right-middle"><div class="content-right-button"> <img   src="/images/dot-red.png" width="14" height="14" border="0"></div><div class="content-right-button1"><img class="act" src="/images/double-arrow.png" width="9" height="12" ></div></div></div>';
		actionMenuDivHtml = '<div id="actionMenu_'+jobNo+'" rel="'+jobDetails.Action_Items+'##'+jobSubmittedBy+'" ><div><h4>ACTION</h4></div><div class="content-right-middle"><div class="content-right-button"> <img   src="/images/dot-red.png" width="14" height="14" border="0"></div><div class="content-right-button1"><img class="act" src="/images/double-arrow.png" width="9" height="12" ></div></div></div>';
		actionMenuDivHtml = actionMenuDivHtml ;
		createActionMenuIds =  createActionMenuIds + 'actionMenu_'+jobNo+',';
		actionMenuDiv.html(actionMenuDivHtml);
		jobDetailsContainer.append(jobSpecDiv);
		jobDetailsContainer.append(actionMenuDiv);
		jobContentDiv.append(statusDiv);
		jobContentDiv.append(jobNoDivCont);
		jobContentDiv.append(jobDetailsContainer);
		mainContentDiv.append(jobContentDiv);
		orderListDiv.append(mainContentDiv);
		k++;
	});
	
	//$("#loadPage").append('<div id="loadMore" class="load-more"><a id="1" href="#" class="more" >Load More</a></div>');
	
	// creating Menu for each JOB
	showPopup(createActionMenuIds, "popup");
	
	$("#isloading").val("true");
	
	// Sete Time to fadeOut
	setTimeout("$(this).showjobs("+(k-1)+");",300);
	$('#order_details').fadeOut('fast',function(){
		$("#orderlist").unbind().scroll(function()
		{
        	if($("#dragHandle").html()=='ACTIVE JOBS' || $("#dragHandle").html()=='ORDER ENTRY JOB')
        	{
    			pos = $("#orderlist").position();
    			
            	if(($("#orderlist").scrollTop()+$("#orderlist").innerHeight() >= $("#orderlist").prop('scrollHeight')) && $("#isloading").val()=='false')
            	{
            		//alert($("#isloading").val());
                   	currentPage = $("#page").val();

                   	currentPage++;

                   	$("#page").val(currentPage);
                   	
                   	$("#loadPage").html("Loading...");     
                   	
                   	$("#isloading").val("true");

                   	$.post("/view/orderlist", $("#search_form").serialize(), function(data) {
                        	loadMoreOrderListHTMLData(data,1);

                	});

            	}
        	}
        });
	});

	$('.no').unbind().click(function(){
		jobid = $(this).parent().parent().attr('id');
		jobno = jobid.substr(4);
		$("#loadPage").html("Loading...");
		$.post('/orders/viewjob',{'jobno':jobno},function(data){
			$('#order_details').html(data);
			if($('.content-main-left').css('height')!='680px')
			{
				$('.content-main-left').css({"height" : '680px'});
			}

			if($('.content-main-left').css("width")!='309px')
			{
				$('.content-main-left').animate({"width" : '-=591px'}, "slow");
			}

			$('#order_details').fadeIn('slow');
			$('.content-main-left').css({"height" : '680px', 'width':'309px'});
			document.getElementById('job_'+jobno).scrollIntoView(false);
			$("#loadPage").html("");
			
			//document.getElementById('job_'+jobno).scrollIntoView(false);
		});
	});
	
	$("#orderlist").hover(function(){
		$(this).css({'overflow-y':'scroll'});
	},function(){
		$(this).css({'overflow-y':'hidden'});
	});

	
}

function loadMoreOrderListHTMLData(data, clearbody) {
	if(clearbody!='1')
	{
		//$('#main_body').html('');
	}

	data = $.parseJSON(data);
	orderListDiv = $("#orderlist");
	
	//createActionMenuIds = new Array();
	var createActionMenuIds = '';
	
	k=0;
	
	$.each(data,function(jobNo,jobDetails)
	{
		var mainContentDiv = $('<div/>');
		var createMenuDivHtml = '';
		mainContentDiv.attr('class','content-left-box');
		mainContentDiv.attr('style','display:none');
		var jobContentDiv = $('<div/>');
		jobContentDiv.attr('id','job_'+jobNo);
		var statusDiv = $('<div/>');
		statusDiv.attr('class','content-left-text');
		statusDiv.html(jobDetails.Status);
		var jobNoDivCont = $('<div/>');
		jobNoDivCont.attr('class','content-left-text1');
		var ordTypeDiv = $('<div/>');
		ordTypeDiv.attr('class','content-left-text11');
		
		jobOrderType = '/images/print_icon.png';
		
		$.each(jobDetails,function(fieldKey, fieldValue)
		{
			if(fieldKey=='Order Type')
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
		
		var jobNoDiv = $('<div/>');
		jobNoDiv.attr('class','no');
		jobNoDiv.html('<b>'+jobDetails.JobNo+'</b>');
		jobNoDivCont.append(ordTypeDiv);
		jobNoDivCont.append(jobNoDiv);
		var jobDetailsContainer = $("<div/>");
		jobDetailsContainer.attr('class',"content-left-content");
		var dateDivContainer = $('<div/>');
		dateDivContainer.attr('class','content-left-content-text');
		dateDivContainer.html('<h4>Ordered</h4><h3>'+jobDetails.Ordered+'</h3><h4>Due</h4><h3>'+jobDetails.Due+'</h3>');
		jobDetailsContainer.append(dateDivContainer);
		var jobSpecDiv = $('<div/>');
		jobSpecDiv.attr('class','content-middle-right');
		jobSpecDivHtml = '<h1>';
		var jobSubmittedBy   ;
		$.each(jobDetails,function(fieldKey, fieldValue)
		{							
			if(fieldKey!='Ordered' && fieldKey!='JobNo' && fieldKey != 'Due' && fieldKey != 'Status' && fieldKey != 'Order_Type' && fieldKey != 'Action_Items')
			{
				if(fieldValue)
				{
					if(fieldValue.length>12)
					{
						jobSpecDivHtml += "<div class='fkey'>"+fieldKey+"</div>&nbsp;&nbsp;<div class='fvalue' title='"+fieldValue+"'>"+fieldValue.substr(0,10)+'...'+"</div>";
						if (fieldKey == 'Submitted By') {
							jobSubmittedBy = fieldValue;
						}
					}
					else
					{
						jobSpecDivHtml += "<div class='fkey'>"+fieldKey+"</div>&nbsp;&nbsp;<div class='fvalue'>"+fieldValue+"</div>";
						if (fieldKey == 'Submitted By') {
							jobSubmittedBy = fieldValue;
						}
					}
				}
				else
				{
					jobSpecDivHtml += "<div class='fkey'>"+fieldKey+"</div>&nbsp;&nbsp;<div class='fvalue'>"+fieldValue+"</div>";
					if (fieldKey == 'Submitted By') {
						jobSubmittedBy = fieldValue;
					}
				}
			}
		});
		jobSpecDivHtml +="</h1>";
		jobSpecDiv.html(jobSpecDivHtml);
		var actionMenuDiv = $('<div/>');
		actionMenuDiv.attr('class','content-right');
		//actionMenuDivHtml = '<div id="actionMenu_'+jobNo+'" rel="'+jobDetails.Status+'##'+jobSubmittedBy+'" ><div><h4>ACTION</h4></div><div class="content-right-middle"><div class="content-right-button"> <img   src="/images/dot-red.png" width="14" height="14" border="0"></div><div class="content-right-button1"><img class="act" src="/images/double-arrow.png" width="9" height="12" ></div></div></div>';
		actionMenuDivHtml = '<div id="actionMenu_'+jobNo+'" rel="'+jobDetails.Action_Items+'##'+jobSubmittedBy+'" ><div><h4>ACTION</h4></div><div class="content-right-middle"><div class="content-right-button"> <img   src="/images/dot-red.png" width="14" height="14" border="0"></div><div class="content-right-button1"><img class="act" src="/images/double-arrow.png" width="9" height="12" ></div></div></div>';
		actionMenuDivHtml = actionMenuDivHtml ;
		createActionMenuIds =  createActionMenuIds + 'actionMenu_'+jobNo+',';
		actionMenuDiv.html(actionMenuDivHtml);
		jobDetailsContainer.append(jobSpecDiv);
		jobDetailsContainer.append(actionMenuDiv);
		jobContentDiv.append(statusDiv);
		jobContentDiv.append(jobNoDivCont);
		jobContentDiv.append(jobDetailsContainer);
		mainContentDiv.append(jobContentDiv);
		orderListDiv.append(mainContentDiv);
		k++;
	});
	
	//$("#loadPage").append('<div id="loadMore" class="load-more"><a id="1" href="#" class="more" >Load More</a></div>');
	
	// creating Menu for each JOB
	showPopup(createActionMenuIds, "popup");
	
	$("#isloading").val("true");
	
	// Sete Time to fadeOut
	setTimeout("$(this).showjobs("+(k-1)+");$(\"#loadPage\").html(\"\");",300);
	//$('#order_details').fadeOut();

	$('.no').unbind().click(function(){
                jobid = $(this).parent().parent().attr('id');
                jobno = jobid.substr(4);
                $("#loadPage").html("Loading...");
                $.post('/orders/viewjob',{'jobno':jobno},function(data){
                        $('#order_details').html(data);
                        if($('.content-main-left').css('height')!='680px')
                        {
                                $('.content-main-left').css({"height" : '680px'});
                        }

                        if($('.content-main-left').css("width")!='309px')
                        {
                                $('.content-main-left').animate({"width" : '-=591px'}, "slow");
                        }

                        $('#order_details').fadeIn('slow');
                        $('.content-main-left').css({"height" : '680px','width':'309px'});
                        document.getElementById('job_'+jobno).scrollIntoView(false);
                        $("#loadPage").html("");
                        //document.getElementById('job_'+jobno).scrollIntoView(false);
                });
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
			alert('No New Messages');
			$("#loadPage").html('');			
			return;
		}
		
		$("#msgpage").val(1);
       	
		$('#main_body').html('');
		
		var msgListDiv = $('<div/>');
		msgListDiv.attr('id','messlist');
		msgListDiv.attr('style','height:600px');
		var msgMainDiv = $('<div/>');
		msgMainDiv.attr('class','mess-main-left');
		var msgFormDiv = $('<div/>');
		msgFormDiv.attr('id','mess_form');
		msgMainDiv.append(msgFormDiv);
		msgMainDiv.append(msgListDiv);
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
		//
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
				var mainContentDiv = $('<div/>');
				var createMenuDivHtml = '';
				mainContentDiv.attr('class','content-left-box-msg');
				mainContentDiv.attr('style','display:none');
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
				k++;
			});
			
			$("#isloadingmsg").val("false");
			setTimeout("$(this).showmsg("+(k-1)+");",300);
			
			$('#mess_details').fadeOut('fast',function(){
				$("#messlist").unbind().scroll(function()
				{
		        	if($("#dragHandle").html()=='MESSAGES')
		        	{
		    			pos = $("#messlist").position();
		            	if  (($("#messlist").scrollTop()+$("#messlist").innerHeight() >= $("#messlist").prop('scrollHeight')) && $("#isloadingmsg").val()=='false')
		            	{              	
		                   	
		                   	$("#loadPage").html("Loading...");
		                   	
		                   	$("#isloadingmsg").val("true");

		                   	$.post("/view/messages", $("#msg_form").serialize(), function(data) {
		                   		
		                   		currentPage = $("#msgpage").val();

			                   	currentPage = parseInt(currentPage,10);
			                   	
			                   	currentPage++;

			                   	$("#msgpage").val(currentPage);
		                   			
		                        loadMoreMsgList(data,1);

		                	});

		            	}
		        	}
		        });
			});
			
			$('.inner-content_left').click(function(){
				jobid = $(this).parent().attr('id');
				jobno = jobid.substr(4);
				id = $(this).prevAll('.inner-content-red').attr('id')
				$('#'+id).attr('class','inner-content');
				//$('.inner-content').html('MESSAGE READ');
				messageRead(jobno,id)
				
			});
			
			$("#messlist").hover(function(){
				$(this).css({'overflow-y':'scroll'});
			},function(){
				$(this).css({'overflow-y':'hidden'});
			});
			
			
			
		}	
	});
	
}

function loadMoreMsgList(data, clearbody) {
	
	data = $.parseJSON(data);
	msgListDiv = $("#messlist");
	k=0;
	$.each(data,function(jobNo,msgDetails)
	{
		var mainContentDiv = $('<div/>');
		var createMenuDivHtml = '';
		mainContentDiv.attr('class','content-left-box-msg');
		mainContentDiv.attr('style','display:none');
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
		k++;
	});
	$("#isloadingmsg").val("true");
	setTimeout("$(this).showmsg("+(k-1)+");$(\"#loadPage\").html(\"\");",300);
	
	$('.inner-content_left').click(function(){
		jobid = $(this).parent().attr('id');
		jobno = jobid.substr(4);
		id = $(this).prevAll('.inner-content-red').attr('id');
		$('#'+id).attr('class','inner-content');
		//$('.inner-content').html('MESSAGE READ');
		
		messageRead(jobno,id)
		
	});
	
	
}




function messageRead(jobno,id)
{
	$("#loadPage").html("Loading...");
	$.post('/view/messageread',{'jobno':jobno,'msgid':id},function(data){
		$.post('/orders/viewjob',{'jobno':jobno},function(data){
			$('#mess_details').html(data);
			
			if($('.mess-main-left').css('height')!='680px')
			{
				$('.mess-main-left').css({"height" : '680px', 'overflow-y':'scroll'});
				$('.mess-main-left').animate({"width" : '-=570px'}, "slow", function(){
					$('#mess_details').fadeIn('slow');
					$('.mess-main-left').css({"height" : '680px', 'overflow-y':'scroll'});
					document.getElementById('job_'+jobno).scrollIntoView(false);
				});
				$('.mess-main-left').css({"height" : '680px', 'overflow-y':'scroll'});
			}
			$(".noteboxes").hide();
			$("#noteboxview").fadeIn("normal");
			nextprev("msgbrd");
			//document.getElementById('job_'+jobno).scrollIntoView(false);
			 $("#loadPage").html("");
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




