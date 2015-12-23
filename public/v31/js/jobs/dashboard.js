// JavaScript Document
var refreshCallbacks;
function dashboardRefresh()
{
	filterUpdate();
	createJob();	
	messageAlertUpdate();
	searchAnythingList();
	
}

function startDashboardRefresh()
{
	//
	orderentrycount();
	jobStatusUpdate();
	refreshCallbacks = setInterval("dashboardRefresh();",18000);	
}

function stopDashboardRefresh()
{
	clearInterval(refreshCallbacks);
}

function createJob()
{
	$('#CREATE-DASH').unbind().click(function(e){
		e.preventDefault();
		$("#createjob").trigger("click");
	});
}

function orderentrycount()
{
	$.ajax({
		type: "POST",
		url: "/dashboard/orderentrycount",
		async: true,
		success: function(msg, textStatus)
		{
			data = $.parseJSON(msg);
			$("#createjobBox").find(".boxcontent_1").html(' ');
			$.each(data, function(index, value)
			{
				value = (value == null ? '0' : value);
				value = (value < 10 ? '0' : '') + value;
				$newDiv = $("<div />");
				$newDiv.attr("style","cursor: pointer; cursor: hand;");
				$newDiv.attr("class","halfbox");
				$newDiv.attr("id","JSTATUS_"+index);
				$newDiv.append(value);
				$newDiv.append("<span style='width:180px;'>Incomplete Orders – Review</span>");
				$("#createjobBox").find(".boxcontent_1").append($newDiv);
			});
			
			//SUBMITTED Click on dashboard
			$("#JSTATUS_ORDERENTRY").click(function()
			{
				var submitedDate = '';
				var pos = $(".ui-draggable").position();
				var widthinp = $(".inp").width();
				
				var slider_width = $(".ui-draggable").width();
				var setpos = widthinp/2 - slider_width/2;
				stopDashboardRefresh();
				
				$(".ui-draggable").animate({left : setpos+'px'},1000,function(){
					$("#dragHandle").html("JOBS IN ORDER ENTRY");
				});
				
				
				$('input[name=page]:', '#search_form').val('0');
				$('input[name=Status]:', '#search_form').val('Order Entry');				
			    
				checkSessionActive();
				$.post("/view/orderlist", 'page=0&Status=Order Entry', function(data) {
		        	//var valfilter = ($("#filter_name").val());
		    	    //$(".filters_scroll").prepend('<div class="filter_list_disp"><input name="filters[]"  value="'+valfilter+'" type="text" size="19" style="border:none;" class="all" /></div>');
		    	    createOrderListHTMLData(data);
		    	    //stopDashboardRefresh();
				
		    	    $('input[name=Status]:', '#search_form').val('--Select--');
		   		 });
			});
			
			
			
		}
	});
}


function createJobAjaxCall()
{	
	checkSessionActive();
	$.post('/orders/create',function(data){
	/*
		$('#dashboard').hide('slow');
		$('#orderlist').hide('slow');
		$('#order_details').hide('slow');
		$('#order_form').html(data);
		$('#order_form').show('slow');
	*/	
		$('#main_body').html('');
		$('#main_body').html(data);
		$('#main_body').show('slow');
		
		var pos = $(".ui-draggable").position();
		var widthinp = $(".inp").width();
		
		var slider_width = $(".ui-draggable").width();
		var setpos = widthinp/2 - slider_width/2;
		
		$(".ui-draggable").animate({left : setpos+'px'},1000,function(){
			$("#dragHandle").html("CREATE JOB");
		});
		
	});
}

jQuery.fn.searchFields = function(){
	$("#adv_search_filter .customSelect").each(function(){
		$(this).mySelectBox();
	});
	
};

jQuery.fn.saveform = function(){
	// saveFilterForm -
	$("#saveFilterForm1").click(function(event)
	{   	    
		 $("#loadPage").html("Saving Filter...");
		 $("#save_filter").val("1");     
		 $("#dialog-save-filter1").hide();
		 event.preventDefault();   
		 if ( ($("#search_form").find( 'input[name="Region"]' ).val()!='--Select--') || ($("#search_form").find( 'input[name="Product"]' ).val()!='--Select--')
	 			|| ($("#search_form").find( 'input[name="Requester"]' ).val()!='--Select--')	|| ($("#search_form").find( 'input[name="Search_Date"]' ).val()!='')
	 			|| ($("#search_form").find( 'input[name="Site"]' ).val()!='--Select--') || ($("#search_form").find( 'input[name="Order Type"]' ).val()!='--Select--')
	 			|| ($("#search_form").find( 'input[name="List_From_Past"]' ).val()!='--Select--') || ($("#search_form").find( 'input[name="Date_Type"]' ).val()!='--Select--')
	 			|| ($("#search_form").find( 'input[name="Artistic_Discretion"]' ).val()!='--Select--') || ($("#search_form").find( 'input[name="Advertiser"]' ).val()!='--Select--')
	 			|| ($("#search_form").find( 'input[name="Ad Category"]' ).val()!='--Select--') )
		 {
			 checkSessionActive();
	        $.post("/view/orderlist", $("#add_search_form").serialize(), function(data) {
	        	$("#loadPage").html("Filter Saved");
	        	$("#loadPage").hide();
	        	$("#loadPage").html("");
	        		
	        	filterUpdate();
	        	
	    		createOrderListHTMLData(data);
	    		
	        });
	        
		 }
		 else
		 {
			 alert("Please Select Atleast One Filter");
		 }
	     return false;
		 $("#save_filter").val("0");
		 $("#dialog-save-filter1").hide();
	  });    
	};


function filterUpdate()
{
	$('#SAVED_FILTERS').find('option').remove().end().append('<option value="--Select--">--Select--</option>').val('--Select--');
	
	$.ajax({
		type: "POST",
		url: "/dashboard/filter",
		async: true,
		success: function(msg, textStatus)
		{
			data = $.parseJSON(msg);
			//$("#filterBox").find(".subtitle").html("("+$(data).size()+")");
			$("#filterBox").find(".boxcontent").html(" ");
			if(data != null)
			{			
				var scrollDiv = $('<div/>');
				scrollDiv.attr('class','scroll-div-filters-list');
				
				var nanoDiv = $('<div/>');
				nanoDiv.attr('class','nano');
				
				var contentDiv = $('<div/>');
				contentDiv.attr('class','content');				
				newListOne = $("<ul id=\"filterlist5\" />");
				$.each(data, function(index, value)
				{
					newListOne.append("<li id=\"filtersText_"+index+"\" rel=\""+value+"\" ><a href=\"#\" onClick=\"javascript:filtersTextList('filtersText_"+index+"')\" rel=\"filtersText_"+index+"\">"+value+"</a></li>");
					
					
				});
				contentDiv.append(newListOne);
				nanoDiv.append(contentDiv);
				scrollDiv.append(nanoDiv);
				$("#filterBox").find(".boxcontent").append(scrollDiv);
				
				
				
				nanoDiv.nanoScroller({});
				$(".filters_scroll").empty();
				$("#SAVED_FILTERS").empty();
				$('#SAVED_FILTERS').append('<option value="--Select--">--Select--</option>');
				$.each(data, function(key, filtername)
				{
					$(".filters_scroll").append('<div class="filter-item"><div class="filter_name" title="'+filtername+'" style="width:115px; text-overflow:ellipsis; overflow:hidden;" >'+filtername+'</div><div class="filter_delete"><a id="'+filtername+'" ref="select_saved_filters" href="#"><img src="/images/dust-bin.png"></a></div></div>');
					
					/*filter_div = $('<div class="filter_list_disp" />');
				
					filter_content = $('<a class="home"><div class="button togglebtn" ref="select_saved_filters'+index+'"><span>'+value+'</span><input name="filters[]" id="select_saved_filters'+index+'" type="hidden" value="'+value+'" /></div></a>');
														
					filter_content.appendTo(filter_div);
					
					filter_container.append(filter_div);*/
					$('#SAVED_FILTERS').append('<option value="'+ filtername + '">' + filtername + '</option>');
				});
				
				$(".filter_list_disp a").click(function(event){					
					$(".filter_list_disp").find('.togglebtn.checked').parent().removeClass('home_checked');
					$(".filter_list_disp").find('.togglebtn.checked').removeClass('checked');
					$(this).find('.togglebtn').toggleClass('checked');
					$(this).find('.togglebtn').parent().toggleClass('home_checked');
					
    				var filtername = $(this).find('input').val();
    				checkSessionActive();
    				$.post('/view/filterselect',{'filtername':filtername},function(data){
    					$('#adv_search_filter').html(data);    						    						
    					$(this).searchFields();    						
    				});
    				    	
    			});
				
				$('.delete-filters-cont').nanoScroller();
				
				$("a[ref='select_saved_filters']").each(function(){
					$(this).click(function(){
						$("#confirmmsg_text").html("Are you sure to delete saved filter : \"" + $(this).attr('id') + "\"? <br/> <br/> ");
						$("#confirmbox").fadeIn('fast');
						$("#confirmbox").css('display','table');
						
						filtername = $(this).attr('id');
						
						$('#confirm_ok').click(function(){
							checkSessionActive();
							$.post('/filter/delete',{'filtername':filtername},function(data){
								filterUpdate();
								$("#confirmbox").fadeOut('fast');					
							});
						});
						
						$('#confirm_cancel').click(function(){
							$("#confirmbox").fadeOut('fast');
						});
							
					});
				});
				$('a.home').find('span').css({'text-transform':'none'});

			}
		}
	});
	
}

function jobStatusUpdate()
{
	$.ajax({
		type: "POST",
		url: "/dashboard/jobstatus",
		async: true,
		success: function(msg, textStatus)
		{
			data = $.parseJSON(msg);
			$("#jobStatusBox").find(".boxcontent_1").html(' ');
			todaytime='';
			nextdaytime='';
			user='';
			$.each(data, function(index, value)
			{
				if(index=='TODAYTIME')
				{
					todaytime = value;
				}
				else if(index=='NEXTDAYTIME')
				{
					nextdaytime = value;
				}
				else if(index=='USER')
				{
					//user = value;
				}
				else
				{				
					value = (value == null ? '0' : value);
					value = (value < 10 ? '0' : '') + value;
					$newDiv = $("<div />");
					$newDiv.attr("style","cursor: pointer; cursor: hand;");
					$newDiv.attr("class","halfbox");
					$newDiv.attr("id","JSTATUS_"+index);
					$newDiv.append(value);
					$newDiv.append("<span style='width:80px;'>"+index+"</span>");
					$("#jobStatusBox").find(".boxcontent_1").append($newDiv);
				}
			});
			
			//SUBMITTED Click on dashboard
			$("#JSTATUS_SUBMITTED").click(function()
			{
				var submitedDate = '';
				var pos = $(".ui-draggable").position();
				var widthinp = $(".inp").width();
				
				var slider_width = $(".ui-draggable").width();
				var setpos = widthinp/2 - slider_width/2;
				stopDashboardRefresh();
				
				$(".ui-draggable").animate({left : setpos+'px'},1000,function(){
					$("#dragHandle").html("SUBMITTED JOB");
				});
				
				
				//$('input[name=Status]:', '#jobStatusForm').val('Submitted');
				$('input[name=Date_Type]:', '#jobStatusForm').val('Submit Date');
				$('input[name=FROM_TO_DATE]:', '#jobStatusForm').val(todaytime+'::'+nextdaytime);
				//$('input[name=USER]:', '#jobStatusForm').val(user);
				checkSessionActive();
				$.post("/search/jobstatussearchlist", $("#jobStatusForm").serialize(), function(data) {
		        	//var valfilter = ($("#filter_name").val());
		    	    //$(".filters_scroll").prepend('<div class="filter_list_disp"><input name="filters[]"  value="'+valfilter+'" type="text" size="19" style="border:none;" class="all" /></div>');
		    	    createOrderListHTMLData(data);
		    	    //stopDashboardRefresh();
				
		   		 });
			});
			
			//DELIVERED
			$('#JSTATUS_DELIVERED').click(function()
			{	
				var deliveredDate = '';
				var pos = $(".ui-draggable").position();
				var widthinp = $(".inp").width();
				
				var slider_width = $(".ui-draggable").width();
				var setpos = widthinp/2 - slider_width/2;
				stopDashboardRefresh();
				
				$(".ui-draggable").animate({left : setpos+'px'},1000,function(){
					$("#dragHandle").html("DELIVERED JOB");
				});
				
				$('input[name=Status]:', '#jobStatusForm').val('Ready for Proof');
				$('input[name=Date_Type]:', '#jobStatusForm').val('Due Date');
				$('input[name=FROM_TO_DATE]:', '#jobStatusForm').val(todaytime+'::'+nextdaytime);
				//$('input[name=USER]:', '#jobStatusForm').val(user);
				
				checkSessionActive();
				$.post("/search/jobstatussearchlist", $("#jobStatusForm").serialize(), function(data) {
		        	//var valfilter = ($("#filter_name").val());
		    	    //$(".filters_scroll").prepend('<div class="filter_list_disp"><input name="filters[]"  value="'+valfilter+'" type="text" size="19" style="border:none;" class="all" /></div>');
		    	    createOrderListHTMLData(data);
		    	    //stopDashboardRefresh();
				
		   		 });
		  	});
			
			//INCOMPLETE
			$('#JSTATUS_INCOMPLETE').click(function()
			{	
				var deliveredDate = '';
				var pos = $(".ui-draggable").position();
				var widthinp = $(".inp").width();
				
				var slider_width = $(".ui-draggable").width();
				var setpos = widthinp/2 - slider_width/2;
				stopDashboardRefresh();
				
				$(".ui-draggable").animate({left : setpos+'px'},1000,function(){
					$("#dragHandle").html("INCOMPLETE ORDERS");
				});
				
				$('input[name=Status]:', '#jobStatusForm').val('Order Entry');
				$('input[name=Date_Type]:', '#jobStatusForm').val('Submit Date');
				$('input[name=FROM_TO_DATE]:', '#jobStatusForm').val(todaytime+'::'+nextdaytime);
				//$('input[name=USER]:', '#jobStatusForm').val(user);
				
				checkSessionActive();
				$.post("/search/jobstatussearchlist", $("#jobStatusForm").serialize(), function(data) {
		        	//var valfilter = ($("#filter_name").val());
		    	    //$(".filters_scroll").prepend('<div class="filter_list_disp"><input name="filters[]"  value="'+valfilter+'" type="text" size="19" style="border:none;" class="all" /></div>');
		    	    createOrderListHTMLData(data);
		    	    //stopDashboardRefresh();
				
		   		 });
		  	});
			
			//ON HOLD
			$('#JSTATUS_HOLD').click(function()
			{	
				var deliveredDate = '';
				var pos = $(".ui-draggable").position();
				var widthinp = $(".inp").width();
				
				var slider_width = $(".ui-draggable").width();
				var setpos = widthinp/2 - slider_width/2;
				stopDashboardRefresh();
				
				$(".ui-draggable").animate({left : setpos+'px'},1000,function(){
					$("#dragHandle").html("ON HOLD");
				});
				
				$('input[name=Status]:', '#jobStatusForm').val('Non Compliance-On Hold');
				$('input[name=Date_Type]:', '#jobStatusForm').val('Modified Date');
				$('input[name=FROM_TO_DATE]:', '#jobStatusForm').val(todaytime+'::'+nextdaytime);
				//$('input[name=USER]:', '#jobStatusForm').val(user);
				
				checkSessionActive();
				$.post("/search/jobstatussearchlist", $("#jobStatusForm").serialize(), function(data) {
		        	//var valfilter = ($("#filter_name").val());
		    	    //$(".filters_scroll").prepend('<div class="filter_list_disp"><input name="filters[]"  value="'+valfilter+'" type="text" size="19" style="border:none;" class="all" /></div>');
		    	    createOrderListHTMLData(data);
		    	    //stopDashboardRefresh();
				
		   		 });
		  	});
		}
	});
}

function messageAlertUpdate()
{
	$.ajax({
		type: "POST",
		url: "/dashboard/messagealert",
		async: true,
		success: function(msg, textStatus)
		{
			data = $.parseJSON(msg);
			$("#messageAlertBox").find(".boxcontent_1").html(' ');
			$("#messageAlertBox").find(".boxcontent_2").html(' ');
			$.each(data, function(index, value)
			{
				value = (value == null ? '0' : value);
				value = (value < 10 ? '0' : '') + value;
				if(index == "NEW MESSAGES")
				{
					$newDiv = $("<div />");
					$newDiv.attr("class","halfbox");
					$newDiv.attr("style","cursor:pointer; cursor:hand;");
					$newDiv.attr("rel",index);
					$newDiv.append(value);
					$newDiv.append(" <span style='width:120px;'>"+index+"</span>");
					$("#messageAlertBox").find(".boxcontent_1").append($newDiv);
				}
				else
				{
					/*$newDiv = $("<div />");
					$newDiv.attr("class","halfbox_1");
					$newDiv.attr("style","cursor:pointer; cursor:hand;");
					$newDiv.attr("rel",index);
					$newDiv.append(value);
					$newDiv.append(" <span style='width:80px;'>"+index+"</span>");
					$("#messageAlertBox").find(".boxcontent_2").append($newDiv);*/
				}
			});
			messageList();
		}
	});
}

function searchAnythingList()
{
	//SUBMITTED Click on Dashboard
	$("#SEARCH").click(function(e)
	{
		e.preventDefault();
		$('#loading_progress').show('fast');
		var pos = $(".ui-draggable").position();
		var widthinp = $(".inp").width();
		var slider_width = $(".ui-draggable").width();
		var setpos = widthinp/2 - slider_width/2;
		
		$(".ui-draggable").animate({left : setpos+'px'},1000,function(){
			$("#dragHandle").html("SEARCH");
		});
		stopDashboardRefresh();
		$('input[name=Search_Text]:', '#jobSearchAnythingForm').val();
		
		checkSessionActive();
		$.post("/search/searchanythinglist", $("#jobSearchAnythingForm").serialize(), function(data) {
			$('#loading_progress').hide('fast');
        	createOrderListHTMLData(data);
   		});
		
	});

}

function filtersTextList(filtersTextID)
{
	var filtersTextID;
	//filters text Click on Dashboard
	$("#"+filtersTextID).click(function()
	{
		//var savedFilters = 'product custom ad copy';
		//alert( $(this).attr('rel'));
		var savedFilters = $(this).attr('rel');
		var pos = $(".ui-draggable").position();
		var widthinp = $(".inp").width();
		var slider_width = $(".ui-draggable").width();
		var setpos = widthinp/2 - slider_width/2;
		
		$(".ui-draggable").animate({left : setpos+'px'},1000,function(){
			$("#dragHandle").html("FILTERS");
		});
		
		stopDashboardRefresh();
		/*$('input[name=page]:', '#jobFiltersForm').val(0);
		$('input[name=SAVED_FILTERS]:', '#jobFiltersForm').val(savedFilters);
		$('input[name=SORT_BY]:', '#jobFiltersForm').val('--Select--');
		$('input[name=Status]:', '#jobFiltersForm').val('--Select--');
		
		//'Submitted'
		///view/orderlist search/filtersearchlist
		$.post("/view/orderlist", $("#jobFiltersForm").serialize(), function(data) {
        	createOrderListHTMLData(data);
        });
		*/		
		
		$(".basic_search").find("[name='SAVED_FILTERS']").val(savedFilters);
		$(".basic_search").find("[name='SAVED_FILTERS']").parent().parent().parent().prev().html(savedFilters);
		$(".basic_search").find("[name='SAVED_FILTERS']").parent().parent().parent().hide();
		$(".basic_search").find("[name='SAVED_FILTERS']").trigger('change');
	});

}	


function messageList(){
	
	$("#messageAlertBox .boxcontent_2 .halfbox_1").click(function(){
		//alert('ssss'+$(this).attr('rel'));
		var priority;
		if ($(this).attr('rel') == 'HIGH PRIORITY') {
			priority = 'H_P';
		} else if ($(this).attr('rel') == 'NORMAL') {
			priority = 'N';
		}
		$('input[name=priority]:', '#msg_form').val(priority);	
		var pos = $(".ui-draggable").position();
		var widthinp = $(".inp").width();
		
		var slider_width = $(".ui-draggable").width();
		var setpos = widthinp/2 - slider_width/2;
		
		$(".ui-draggable").animate({left : setpos+'px'},1000,function(){
			$("#dragHandle").html("MESSAGES");
		});
		loadMsgList();
		$('input[name=priority]:', '#msg_form').val('');
	});
	$("#messageAlertBox .boxcontent_1 .halfbox").click(function(){
		//alert('ssss'+$(this).attr('rel'));
		var priority;
		if ($(this).attr('rel') == 'NEW MESSAGES') {
			priority = '0';
		} 
		$('input[name=priority]:', '#msg_form').val(priority);	
		var pos = $(".ui-draggable").position();
		var widthinp = $(".inp").width();
		
		var slider_width = $(".ui-draggable").width();
		var setpos = widthinp/2 - slider_width/2;
		
		$(".ui-draggable").animate({left : setpos+'px'},1000,function(){
			$("#dragHandle").html("MESSAGES");
		});
		loadMsgList();
		$('input[name=priority]:', '#msg_form').val('');
	});

}



