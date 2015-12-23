$(document).ready(function(){	
	$(".analytics-container #Advertiser").autocomplete({
		 source: function( request, response ) {
			 site = $(".analytics-container #Site").val();
			
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
			$('.ui-menu').css({'left':'12px','top':'33px','position':'absolute'});
			$(this).parent().append($('.ui-menu'));
		},
		close: function() {
			 $( this ).removeClass( "ui-corner-top" ).addClass( "ui-corner-all" );
		}
	});
	
	
	
	// adv_search_form
    /*$('.analytics-container').submit(function(event) { 
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
    	
    	$.post("/view/orderlist", $(".analytics-container").serialize(), function(data) {
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
    	});
    	return false;
    }); */  
    
    $('#reset-button').click(function(){
    	
    	$('.analytics-container, #search_form').find(':input').each(function() {
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
    	
    	$('.analytics-container, #search_form').find('select').each(function() {
    		
    		if($(this).val()!="--Select--")
    		{   
    			$(this).val("--Select--");
    			$(this).trigger('change');
    		}
    	});
    });

    jQuery.fn.onChangeReportMyCustomSelect = function(){
    	
    	obj = $(this);
    	
    	inp_name = obj.attr('name');
    	inp_value = obj.val();

		if(inp_name=='Order_Type' || inp_name=='Site')
		{
			
			field_name = 'Product';
			
			//ord_type = inp_value;
			
			ord_type = $(".analytics-container [name='Order_Type']").val();
			
			site = $(".analytics-container [name='Site']").val();					
			
			url = '/orders/getfieldvalues';
			
			checkSessionActive();
			
			$.post(url,{'site':site, 'ord_type' : ord_type, 'product': '', 'field' : field_name}, function(data){
				
				//insert_obj = $(".analytics-container #Product").parent().parent();
				
				data = $.parseJSON(data);				
				
				select_obj = $(".analytics-container #Product");
				
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
				
				//insert_obj.append(select_obj);	
				
			});
			

			if(inp_name=='Site')
			{
				site	= inp_value;
				
				field_name = 'Requester';					
				
				url = '/orders/getcustomerrep';
				
				checkSessionActive();
				
				$.post(url,{'site':site}, function(data){
					
					data = $.parseJSON(data);				
					
					select_obj = $(".analytics-container [name='Requester']");
					
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
						var options = eval("data.sales_rep");
						
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
					
					//insert_obj.append(select_obj);	
					
				});
			}
		
		}
    	else if(inp_name=='Region')
    	{
    		field_name = 'Sites';
			
    		region = $(".analytics-container [name='Region']").val();					
						
			url = '/orders/corporateclustersites';
			checkSessionActive();
			$.post(url,{'region':region, 'associated_with':'cluster'}, function(data){
				
				insert_obj = $(".analytics-container #Site").parent().parent();
				
				data = $.parseJSON(data);		
				
				select_obj = $(".analytics-container #Site");
				
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
				$('.analytics-container').trigger('submit');
			});
		}		
    	else if(inp_name=='Order_Type' || inp_name=='Site')
		{
			
			field_name = 'Product';
			
			//ord_type = inp_value;
			
			ord_type = $(".analytics-container [name='Order_Type']").val();
			
			site = $(".analytics-container [name='Site']").val();					
			
			url = '/orders/getfieldvalues';
			
			checkSessionActive();
			
			$.post(url,{'site':site, 'ord_type' : ord_type, 'product': '', 'field' : field_name}, function(data){
				
				insert_obj = $(".analytics-container #Product").parent().parent();
				
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
			
    		region = $(".analytics-container [name='Region']").val();					
						
			url = '/orders/corporateclustersites';
			
			checkSessionActive();
			
			$.post(url,{'region':region, 'associated_with':'cluster'}, function(data){
				
				insert_obj = $(".analytics-container #Site").parent().parent();
				
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
