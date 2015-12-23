$(document).ready(function() {
	// search_form
	$('#search_form').submit(function(event) { 
    	event.preventDefault(); 
	$('#search_form #page').val(0);
		showProgress();
		
		//var pos = $(".ui-draggable").position();
		//var widthinp = $(this).parent().width();
		//var divdes = widthinp/2;
		
		//alert(divdes+'---'+widthinp);		
		var pos = $(".ui-draggable").position();
		var widthinp = $(".inp").width();
		
		var slider_width = $(".ui-draggable").width();
		var setpos = widthinp/2 - slider_width/2;
		
		$(".ui-draggable").animate({left : setpos+'px'},1000,function(){
			$("#dragHandle").html("ACTIVE JOBS");
		});
		
		checkSessionActive();
    	$.post("/view/orderlist", $("#search_form").serialize(), function(data) {
    		
    		if (data !='[]')
    		{
    			$("#saveFilter").show();
    			$("#saveFilter1").show();
    		}
    		else
    		{
    			$("#saveFilter").hide();
    			$("#saveFilter1").hide();
    		}
    		
    		createOrderListHTMLData(data);
    		$('#VerticalClose').trigger('click');
    	});
        return false;
    });
	
	$("#Advertiser").autocomplete({
		 source: function( request, response ) {
			 site = $("#Site").val();
			
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
			$('.ui-menu').css({'left':'12px','top':'33px','position':'absolute','z-index':'1000'});
			$(this).parent().append($('.ui-menu'));
		},
		close: function() {
			 $( this ).removeClass( "ui-corner-top" ).addClass( "ui-corner-all" );
		}
	});
	
	
	
	// adv_search_form
    $('#add_search_form').submit(function(event) { 
    	event.preventDefault(); 

    	$('#search_form #page').val(0);
    	showProgress();
    	
    	var pos = $(".ui-draggable").position();
		var widthinp = $(".inp").width();
		
		var slider_width = $(".ui-draggable").width();
		var setpos = widthinp/2 - slider_width/2;
		
		$(".ui-draggable").animate({left : setpos+'px'},1000,function(){
			$("#dragHandle").html("ACTIVE JOBS");
		});
    	
		checkSessionActive();
    	$.post("/view/orderlist", $("#add_search_form").serialize(), function(data) {
    		//alert(data);
    		if (data !='[]')
    		{
    			$("#saveFilter").show();
    			$("#saveFilter1").show();
    		}
    		else
    		{
    			$("#saveFilter").hide();
    			$("#saveFilter1").hide();
    		}
    		createOrderListHTMLData(data);
    		$('#VerticalClose').trigger('click');
    	});
    	return false;
    });

    // saveFilter 
	$("#saveFilter").click(function(event){
		var offset = $(this).offset();
		$("#dialog-save-filter").show();
		$("#dialog-save-filter").offset({ top: offset.top, left: offset.left});
		$("#dialog-save-filter").css("z-index", "1000");
		$("#filter_name").val('');

		
	});
    // closeSaveFilter 
    $("#closeSaveFilter").click(function(event){
    	$("#dialog-save-filter").hide();    	
    });
    
    // applyFilter
    /*
   $("#applyFilter").click(function(event){
	   // Check orderlist existing
	   alert("Hi");
	   if ($(".contentOrderList").html() != '')
		   {
		   	$("#saveFilter").show();
		   } 
	   else
		   {
		   $("#saveFilter").hide();
		   }
   }
    */
    
    // saveFilterForm -
    $("#saveFilterForm").click(function(event)
    {   
    	var filterChk=  /^[0-9a-zA-Z_]+$/;
    	
    	if(!$("#filter_name").val().match(filterChk)) 
    	{ 

    		$("#msgbox_text").html("<div><br/>Filter Name must be Alpha Numeric<br/><br/>" +
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

	//raja validation for filters
    	fil_name = $("#filter_name").val();
    	//alert($(".filter_delete").find("#"+fil_name).val());
    	
    	if ($(".filter_delete").find("#"+fil_name).val()!=undefined)
    		{
	    		$("#msgbox_text").html("<div><br/>Filter Name already exist<br/><br/>" +
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
    	//end validation for filters
    	
    	 $("#loadPage").html("Saving Filter...");
    	 $("#save_filter").val("1");     
    	 $("#dialog-save-filter").hide();
    	 event.preventDefault();   
		 if ( ($("#adv_search_form").find( 'input[name="Region"]' ).val()!='--Select--') || ($("#adv_search_form").find( 'input[name="Product"]' ).val()!='--Select--')
	 			|| ($("#adv_search_form").find( 'input[name="Requester"]' ).val()!='--Select--')	|| ($("#adv_search_form").find( 'input[name="Search_Date"]' ).val()!='')
	 			|| ($("#adv_search_form").find( 'input[name="Site"]' ).val()!='--Select--') || ($("#adv_search_form").find( 'input[name="Order Type"]' ).val()!='--Select--')
	 			|| ($("#adv_search_form").find( 'input[name="List_From_Past"]' ).val()!='--Select--') || ($("#adv_search_form").find( 'input[name="Date_Type"]' ).val()!='--Select--')
	 			|| ($("#adv_search_form").find( 'input[name="Artistic_Discretion"]' ).val()!='--Select--') || ($("#adv_search_form").find( 'input[name="Advertiser"]' ).val()!='--Select--')
	 			|| ($("#adv_search_form").find( 'input[name="Ad Category"]' ).val()!='--Select--') )
		 {
			showProgress();
			checkSessionActive();
	        $.post("/view/orderlist", $("#search_form").serialize(), function(data) {
	        	$("#loadPage").html("Filter Saved");
	        	$("#loadPage").hide();
	        	$("#loadPage").html("");
	        		//var valfilter = ($("#filter_name").val());
	        	   // $(".filters_scroll").prepend('<div class="filter_list_disp"><input name="filters[]"  value="'+valfilter+'" type="text" size="19" style="border:none;" class="all" /></div>');
	        	    //$(".selectboxoptions_radio").prepend('<li class="hideitem"><span class="elmValue">'+valfilter+'</span>'+valfilter+'</li>');
	        	hideProgress();
	        	checkSessionActive();
	        	$.post("/dashboard/filter", $("#search_form").serialize(), function(data) {
	        		data = $.parseJSON(data);
	        		$(".filters_scroll").empty();
	        		var k=0;
	        		$('#SAVED_FILTERS').find('option').remove().end().append('<option value="--Select--">--Select--</option>').val('--Select--');
	        		$.each(data,function(key,filtername)
	        		{
	        			$(".filters_scroll").append('<div class="filter-item"><div class="filter_name" style="width:115px; text-overflow:ellipsis; overflow:hidden;" >'+filtername+'</div><div class="filter_delete"><a id="'+filtername+'" ref="select_saved_filters" href="#"><img src="/images/dust-bin.png"></a></div></div>');
	        			$("#select_saved_filters"+k).click(function(event){
	        				checkSessionActive();
	        				$.post('/view/filterselect',{'filtername':filtername},function(data){
	        					$(window).ready(function () {
	        						$('#adv_search_filter').hide();
	        						$('#adv_search_filter').html(data);
	        						$('#adv_search_filter').slideUp(300).delay(800).fadeIn(400);
	        					});	
	        				});
	        				    	
	        			});
	        			// below line is used to append new data in SAVED_FILTERS box
	        			$('#SAVED_FILTERS').append('<option value="'+ filtername + '">' + filtername + '</option>');
	        			k++;
	        		});
	        		
	        		
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
	        		
	        	});
	    		 	
	        	createOrderListHTMLData(data);
	    		
	        });
	        
		 }
		 else
		 {
			 alert("Please Select Atleast One Filter");
		 }
         return false;
    	 $("#save_filter").val("0");
    	 $("#dialog-save-filter").hide();
      });    
    
   
    $('ul#filterlist5').click(function(e) 
    	    { 
    	     alert('12345');
    	    });
/*
    $("#filterlist").click(function(event){
    	
    	 var index = $(this).index();
         var text = $(this).text();
         alert('Index is: ' + index + ' and text is ' + text);
    }); 
   */ 
    
   /* $("#orderlist").scroll(function(){
		//if($("#dragHandle").html()=='ACTIVE JOBS')
		//{
			alert($("#orderlist").scrollTop()+'-'+$(document).height() +'-'+$("#orderlist").height());
			if  ($("#orderlist").scrollTop() == $(document).height() - $("#orderlist").height()){			  
				
				   currentPage = $("#page").val();
			  
				   currentPage++;
			     
				   $("#page").val(currentPage);
			   
				   $.post("/view/orderlist", $("#search_form").serialize(), function(data) {
	        	   		createOrderListHTMLData(data,1);
	 	          	});
			   
			}
		//}
	});*/
    
    
    $('#reset-button').click(function(){
    	
    	$('#add_search_form, #search_form').find(':input').each(function() {
    		input_name = this.name;
    		input_type = this.type;
    		
    		selected_list_id = input_name+'_selected';
    
    		switch(input_type) {
    		
	    		case 'text':
					$(this).val('');
					break;
					
	    		case 'hidden':
	    			$(this).val('--Select--');
	    			$('#'+selected_list_id).html('--Select--');
	    			
	    			$('ul.selectboxoptions_radio li').each(function(){    				
	    				$(this).removeClass('selected');
	    			});
	    			//.selectboxoptions_wrap selectboxoptions_radio
	    			
	    			break;
	    			
	    		case 'checkbox':
	    		case 'radio':
	    			this.checked = false;
    		}
    	});
    	
    	$('#add_search_form, #search_form').find('select').each(function() {
    		
    		if($(this).val()!="--Select--")
    		{   
    			$(this).val("--Select--");
    			$(this).trigger('change');
    		}
    		
    		if(this.id=='Status')
    		{
    			$("#Status").find('option').each(function(){
					
    				if($(this).val() != '--Select--')
    				{
    					var dropdownItem = $(this).html();
    					
    					if (dropdownItem.substring(0,1) == "+")
    					{
    						$(this).html(dropdownItem.substring(1));
    					}
    				}
    			});
    		}
    		
    	});
    });

    jQuery.fn.onChangeSearchMyCustomSelect = function(){
    	
    	obj = $(this);
    	
    	inp_name = obj.attr('name');
    	inp_value = obj.val();

		if(obj.attr('name')=='SAVED_FILTERS')
		{
			checkSessionActive();
			$.post('/view/filterselect',{'filtername':inp_value},function(data){
				//$('#adv_search_filter').html(data);
				//$(this).searchFields();
				
				data = jQuery.parseJSON(data);
				
				$.each(data,function(searchfield,searchval){
					searchfield = searchfield.replace(" ","_");
					if($('[name="'+searchfield+'"]').is('select') || $('[name="'+searchfield+'[]"]').is('select'))
					{
						if($('[name="'+searchfield+'"]').is('select'))
						{
							$('#search_form [name="'+searchfield+'"]').val(searchval);
							$('#search_form [name="'+searchfield+'"]').parent().parent().parent().prev().html(searchval);
							$('#search_form [name="'+searchfield+'"]').parent().parent().parent().prev().removeClass('select_grey_out');
						}
						else
						{							
							$('#search_form [name="'+searchfield+'[]"]').val(searchval);
							
							for(b=0;b<searchval.length;b++)
							{
								notifySelect(searchval[b],b);
							}
						}						
					}
					else
					{
						//alert(searchfield+'--'+searchval);
						$('[name="'+searchfield+'"]').val(searchval);
					}										
				});
				$('#search_form').trigger('submit');
			});
		}		
    	else if(inp_name=='Order_Type' || inp_name=='Site')
		{
			
			field_name = 'Product';
			
			//ord_type = inp_value;
			
			ord_type = $("#search_form [name='Order_Type']").val();
			
			site = $("#search_form [name='Site']").val();					
			
			url = '/orders/getfieldvalues';
			
			checkSessionActive();
			
			$.post(url,{'site':site, 'ord_type' : ord_type, 'product': '', 'field' : field_name}, function(data){
				
				//insert_obj = $("#add_search_form #Product").parent().parent();
				
				data = $.parseJSON(data);				
				
				select_obj = $("#search_form #Product");
				
				//select_obj.attr({'name':'Product','id':'Product','class':'select_field'});
				
				if(data==null || data=='')
				{
					select_obj.html('');
					
					var newOption = $('<option/>');						   
				    newOption.html('--Select--');
				    newOption.attr('value', '--Select--'); // fixed typo
				    select_obj.append(newOption);
				}
				else
				{	
					select_obj.html('');
					var options = eval("data."+field_name);
					
					var length = options.length;
					
					select_obj.html('');
					
					if(select_obj.is('select'))
					{	
						select_obj.html('');
						
						var newOption = $('<option/>');						   
					    newOption.html('--Select--');
					    newOption.attr('value', '--Select--'); // fixed typo
					    select_obj.append(newOption);

						for(var j = 0; j < length; j++)
						{
							var newOption = $('<option/>');						   
						    newOption.html(options[j]);
						    newOption.attr('value', options[j]); // fixed typo
						    select_obj.append(newOption);
						}						
					}
				}				
				
				//insert_obj.append(select_obj);	
				
			});
			
		}
    	else if(inp_name=='Region')
    	{
    		field_name = 'Sites';
			
    		region = $("#search_form [name='Region']").val();					
						
			url = '/orders/corporateclustersites';
			
			checkSessionActive();
			
			$.post(url,{'region':region, 'associated_with':'cluster'}, function(data){
				
				insert_obj = $("#search_form #Site").parent().parent();
				
				data = $.parseJSON(data);		
				
				select_obj = $("#search_form #Site");
				
				//select_obj.attr({'name':'Site','id':'Site','class':'select_field'});
				
				
				if(data=='')
				{
					select_obj.html('');
					
					var newOption = $('<option/>');						   
				    newOption.html('--Select--');
				    newOption.attr('value', '--Select--'); // fixed typo
				    select_obj.append(newOption);
				}
				else
				{					
					var options = eval("data."+field_name);
					
					var length = options.length;
					
					if(select_obj.is('select'))
					{	
						select_obj.html('');
						
						var newOption = $('<option/>');						   
					    newOption.html('--Select--');
					    newOption.attr('value', '--Select--'); // fixed typo
					    select_obj.append(newOption);

						for(var j = 0; j < length; j++)
						{
							var newOption = $('<option/>');						   
						    newOption.html(options[j]);
						    newOption.attr('value', options[j]); // fixed typo
						    select_obj.append(newOption);
						}
						
					}
				}
			});
			
    	}
		
	};
    
    jQuery.fn.onChangeSearchCustomSelect = function(obj, parent_name){
		
    	inp_name = obj.parent().find('input').attr('name');
    	inp_value = obj.parent().find('input').val();


		if(obj.attr('name')=='SAVED_FILTERS')
		{
			checkSessionActive();
			$.post('/view/filterselect',{'filtername':inp_value},function(data){
				$('#adv_search_filter').html(data);    						    						
				$(this).searchFields();
				$('#add_search_form').trigger('submit');
			});
		}		
    	else if(inp_name=='Order_Type' || inp_name=='Site')
		{
			
			field_name = 'Product';
			
			//ord_type = inp_value;
			
			ord_type = $("#add_search_form [name='Order_Type']").val();
			
			site = $("#add_search_form [name='Site']").val();					
			
			url = '/orders/getfieldvalues';
			
			checkSessionActive();
			
			$.post(url,{'site':site, 'ord_type' : ord_type, 'product': '', 'field' : field_name}, function(data){
				
				insert_obj = $("#add_search_form #Product").parent().parent();
				
				data = $.parseJSON(data);				
				
				select_obj = $('<select/>');
				
				select_obj.attr({'name':'Product','id':'Product','class':'select_field'});
				
				if(data==null || data=='')
				{
					select_obj.html('');
					
					var newOption = $('<option/>');						   
				    newOption.html('--Select--');
				    newOption.attr('value', '--Select--'); // fixed typo
				    select_obj.append(newOption);
				}
				else
				{	

					select_obj.html('');

					var options = eval("data."+field_name);
					
					var length = options.length;
					
					
					if(select_obj.is('select'))
					{	
						select_obj.html('');
						
						var newOption = $('<option/>');						   
					    newOption.html('--Select--');
					    newOption.attr('value', '--Select--'); // fixed typo
					    select_obj.append(newOption);

						for(var j = 0; j < length; j++)
						{
							var newOption = $('<option/>');						   
						    newOption.html(options[j]);
						    newOption.attr('value', options[j]); // fixed typo
						    select_obj.append(newOption);
						}						
					}
				}				
				
				insert_obj.append(select_obj);	
				
				$('.select_field').custSelectBox({		
					selectwidth: 280
				});
				
			});
			
		}
    	else if(inp_name=='Region')
    	{
    		field_name = 'Sites';
			
    		region = $("#add_search_form [name='Region']").val();					
						
			url = '/orders/corporateclustersites';
			checkSessionActive();
			$.post(url,{'region':region, 'associated_with':'cluster'}, function(data){
				
				insert_obj = $("#add_search_form #Site").parent().parent();
				
				data = $.parseJSON(data);		
				
				select_obj = $('<select/>');
				
				select_obj.attr({'name':'Site','id':'Site','class':'select_field'});
				
				
				if(data=='')
				{
					select_obj.html('');
					
					var newOption = $('<option/>');						   
				    newOption.html('--Select--');
				    newOption.attr('value', '--Select--'); // fixed typo
				    select_obj.append(newOption);
				}
				else
				{					
					var options = eval("data."+field_name);
					
					var length = options.length;
					
					if(select_obj.is('select'))
					{	
						select_obj.html('');
						
						var newOption = $('<option/>');						   
					    newOption.html('--Select--');
					    newOption.attr('value', '--Select--'); // fixed typo
					    select_obj.append(newOption);

						for(var j = 0; j < length; j++)
						{
							var newOption = $('<option/>');						   
						    newOption.html(options[j]);
						    newOption.attr('value', options[j]); // fixed typo
						    select_obj.append(newOption);
						}
						
					}
				}	
				
				insert_obj.append(select_obj);	
				
				$('.select_field').custSelectBox({		
					selectwidth: 280
				});
				
			});
			
    	}
		
	};

}); // End $(document).ready
