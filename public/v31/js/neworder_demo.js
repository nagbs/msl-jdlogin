(function(jQuery){	
	
	jQuery.fn.enableChildFields = function(){	
		
		selected_val = $(this).val();
		
		name = $(this).attr('name');
		
		if($(this).is("select") && $(this).parent().attr('order_type')===undefined)
		{
			order_type = $(this).parent().parent().parent().parent().attr('order_type');
		}
		else
		{
			order_type = $(this).parent().attr('order_type');
		}
		
		if(name == undefined)
		{			
			name = $(this).find('label').html();
			selected_val = 'depend';
			
			order_type = $(this).attr('order_type');
		}		
		
		$("div[parent='"+name+"'][parent_value='"+selected_val+"'][order_type='"+order_type+"']").each(function(){
			$(this).fadeIn('fast');
		});
		
		$("div[parent='"+name+"'][order_type='"+order_type+"']").each(function(){
			pval = $(this).attr('parent_value');
			//alert(parent_value.indexOf('value'));
			if(pval.indexOf('value')!=null)
			{
				//alert(parent_value);
			}
		});
		
		$("div[parent='"+name+"'][order_type='"+order_type+"'][parent_value='"+selected_val+"'] label").each(function()
		{					
			p_name = $(this).html();			
			
			order_type = $(this).parent().attr('order_type');
			
			//alert(p_name+'-'+order_type);
			
			//$("div[parent='"+p_name+"'][parent_value='depend'][order_type='"+order_type+"']").fadeIn('fast');
			
			//$("div[parent='"+p_name+"'][parent_value='depend'][order_type='"+order_type+"']").each(function(){				
			//	$(this).enableChildFields();
			//});
			
		});
		
		$("div[parent='"+name+"'][parent_value='"+selected_val+"'][order_type='"+order_type+"'] select").each(function(){
			//alert($(this).parent().css('display'));
			if($(this).parent().css('display')!='none')
			{
				$(this).trigger('change');
			}
		});
	}
	
	jQuery.fn.onChangeMyCustomSelect = function(obj, parent_name, selected_val, order_type){
		
		if(obj.attr('name')=='order_site')
		{
			params = 'id='+encodeURIComponent(selected_val);
			
			checkSessionActive();
			$.post('/orders/create',params,function(data){					
				$('#main_body').html(data);				
			});			
			return;
		}
		
		if(obj.attr('name')=='Size Change Only') return;
		
		if(obj.attr('name')=='Delivery Date')
		{		 
			 site = $("#1").val();
			 deliveryID = $("#14").val();
			 sitePubTitle = $("#6").val();
//		alert(site);	 
			 if(deliveryID!='Other' && deliveryID!='--Select--')
			 {
					
				 $.ajax({
					 url: "/orders/deliverydate?id="+encodeURIComponent(site),
					 dataType: "json",
					 data: {					 
						 deliveryID: deliveryID,
						 sitePubTitle: sitePubTitle
					 },
					 success: function( data ) {
						 str = 'Your order will be delivered on or before: <br /><strong>'+data+'</strong>';
						 $('#duedt').html(str);	
					 }
				 });
			 }
			 else
			 {
				 $('#duedt').html(''); 
			 }
			
			//return;
		}
		
		if(parent_name=="") return;
		
		
		$("div[parent='"+parent_name+"'][order_type='"+order_type+"']").each(function(){
			$(this).fadeOut('fast');
		});
		
		$("div[parent='"+parent_name+"'][order_type='"+order_type+"'][parent_value='all']").each(function(){
			$(this).fadeIn('fast');
		});
		
		$("div[parent='"+parent_name+"'][order_type='"+order_type+"']").each(function(){
			pval = $(this).attr('parent_value');				
			if(pval.indexOf('value')!=-1)
			{
				par_val = $("div[id='ord_form"+order_type+"']").find("[name='"+$(this).attr('parent')+"']").val();
				
				check_val = pval.substr(pval.indexOf('value')+5);					
				
				cond = par_val + check_val;
				
				//alert(cond);
				
				if(eval(cond))
				{
					$(this).fadeIn('fast');
				}
				else
				{
					$(this).fadeOut('fast');
				}
			}			
			
			if((parent_name.indexOf('Product_')!=-1 || parent_name=='Product') && order_type=='Print')

			{				

				if(parent_name.indexOf('Product_')==-1)

				{	

					$("#ord_form"+order_type).find('[name="Width"]').val('');

					$("#ord_form"+order_type).find('[name="Depth"]').val('');

				}

				else

				{	

					ver = parent_name.substring(parent_name.indexOf("_")+1);

					

					$("#ord_form"+order_type).find('[name="Width'+"_"+ver+'"]').val('');

					$("#ord_form"+order_type).find('[name="Depth'+"_"+ver+'"]').val('');

				}

			}

			

			//alert(obj.attr('name').indexOf("Type_"));

			//alert(parent_name+'<>'+parent_name.indexOf("Type_"));

			//alert(parent_name+'<>'+order_type+'<>'+selected_val+'<>'+selected_val.indexOf('('));

			
			//if(parent_name=='Type' && order_type=='Print' && selected_val.indexOf('(')==-1)

			if((parent_name.substr(0,5)=='Type_' || parent_name=='Type') && order_type=='Print')
			{				
				$(this).fadeIn('fast');
				

				if(parent_name=='Type' || parent_name.substr(0,5)=='Type_' )

				{

					if(selected_val!='' && selected_val.indexOf('(')!=-1)

					{

						var type_desc = selected_val.substring(0, selected_val.indexOf("("));

						var type_size = selected_val.substring(selected_val.indexOf("(")+1, selected_val.indexOf(")"));
						
						var type_size_arr = type_size.split("x");
						
						widthuom = type_size_arr[0].trim();
						var width_uom_arr = widthuom.split(" ");						
						width =  width_uom_arr[0];
						width_uom =  width_uom_arr[1].toLowerCase();
						
						depthuom = type_size_arr[1].trim();
						var depth_uom_arr = depthuom.split(" ");						
						depth =  depth_uom_arr[0];
						depth_uom =  depth_uom_arr[1].toLowerCase();
						
						widthuom_obj='';
						depthuom_obj='';

						if(parent_name.indexOf('Type_')==-1)
						{							
							$("#ord_form"+order_type).find('[name="Width"]').val(width);
							$("#ord_form"+order_type).find('[name="Depth"]').val(depth);
							
							widthuom_obj = $("#ord_form"+order_type).find('[name="widthuom"]');
							depthuom_obj = $("#ord_form"+order_type).find('[name="depthuom"]');
						}
						else
						{	
							ver = parent_name.substring(parent_name.indexOf("_")+1);
							
							$("#ord_form"+order_type).find('[name="Width'+"_"+ver+'"]').val(width);
							$("#ord_form"+order_type).find('[name="Depth'+"_"+ver+'"]').val(depth);
							
							widthuom_obj = $("#ord_form"+order_type).find('[name="widthuom'+"_"+ver+'"]');
							depthuom_obj = $("#ord_form"+order_type).find('[name="depthuom'+"_"+ver+'"]');
						}
						
						if(width_uom!=widthuom_obj.val())
						{
							$switch = widthuom_obj.data('switch'),controls = $switch.data('controls');
							controls["toggle"]();
						}
						if(depth_uom!=depthuom_obj.val())
						{
							$switch = depthuom_obj.data('switch'),controls = $switch.data('controls');
							controls["toggle"]();
						}
		}	
		else
		{
			if(parent_name.indexOf('Type_')==-1)
			{							
				$("#ord_form"+order_type).find('[name="Width"]').val('0');
				$("#ord_form"+order_type).find('[name="Depth"]').val('0');
			}
			else
			{	
				ver = parent_name.substring(parent_name.indexOf("_")+1);
				
				$("#ord_form"+order_type).find('[name="Width'+"_"+ver+'"]').val('0');
				$("#ord_form"+order_type).find('[name="Depth'+"_"+ver+'"]').val('0');
			}
		}
	}
}
		
		});
		
		$("div[parent='"+parent_name+"'][order_type='"+order_type+"']").each(function(){
			$(this).find("select").each(function(){				
				$(this).trigger('change');					
			});
		});
		
		$("div[parent='"+parent_name+"'][parent_value='depend'][order_type='"+order_type+"']").each(function(){
			
			$(this).fadeIn('fast',function(){	
			//alert($(this).find('input').attr('name'));
			
			/* if(($(this).attr('order_type'))==order_type && ($(this).parent().parent().parent().parent().attr('id'))==('ord_form_multiver_'+order_type))
			{
				var multiple_formats = $("#ord_form"+ord_type).find('[name="Multiple Formats"]').val();
				
				if(multiple_formats=='Yes')
				{
					var field_name = $(this).find('input').attr('name');
					
					var field_name = field_name.substr(0,field_name.lastIndexOf('_'));
					
					//alert(field_name);
					
					var field_name_org = $(this).find('input').attr('name');	
					
					var ord_type = $(this).attr('order_type');
					
					var parent_product_field = $(this).attr('parent');
					
					var parent_product_val = $("#ord_form div[order_type='"+ord_type+"'] [name='"+parent_product_field+"']").val();
					
					var site = $("#ord_form [name='Site']").val();					
					
					//var field_name = field_name.replace(" ","_");
					var field_name = field_name.replace(/_/g," ");
					
					var url = '/orders/getfieldvalues';
					
					checkSessionActive();
					
					$.post(url,{'site':site, 'ord_type' : ord_type, 'product': parent_product_val, 'field' : field_name}, function(data){				
						
						var obj = $("div[order_type='"+ord_type+"']").find("input[type='hidden'][name='"+field_name_org+"']");
						
						var insert_obj = obj.parent().parent();
						
						var bj_name = field_name_org;
						
						var select_obj = $('<select/>');
						select_obj.attr({'name':obj_name,'id':obj.attr('id'),'tooltip':obj.attr('tooltip'),'class':'select_field'});
						
						insert_obj.html('');
						
						var data = $.parseJSON(data);				
						
						var options = eval("data."+field_name);
						
						var length = options.length;				
						
						if(select_obj.is('select'))
						{	
							select_obj.html('');
							
							var newOption = $('<option/>');						   
						    newOption.html('--Select--');
						    newOption.attr('value', '--Select--'); // fixed typo
						    select_obj.append(newOption);
						    
						    var uom = 'inches';
						    
						    for(var j = 0; j < length; j++)
							{
								if(field_name=='Type' && ord_type=='Print')
								{
									optionval = options[j].split('~');
									
									
									type = optionval[0];
									width_inch = optionval[1];
									depth_inch = optionval[2];
									width_col = optionval[3];
									depth_line = optionval[4];
									type_twosided = optionval[5];
									type_multipage = optionval[6];
									uom = optionval[7];
									
									type_display = type + '( ';
									
									type_width_uom = 'inches';
									type_depth_uom = 'inches';
									
									sel_width = '0';
									sel_depth = '0';
									
									if(width_inch==0 && width_col==0)
									{
										type_display = type_display; // + width_inch + ' ' + uom;
										type_width_uom = 'inches';
										sel_width = width_inch;
									}
									else if(width_inch!=0)
									{
										type_display = type_display + width_inch + ' ' + uom;
										type_width_uom = 'inches';
										sel_width = width_inch;
									}
									else if(width_col!=0)
									{
										type_display = type_display + width_col + ' Columns ';
										type_width_uom = 'columns';
										sel_width = width_col;
									}
									
									if(depth_inch==0 && depth_line==0)
									{
										type_display = type_display;// + ' X ' + depth_inch + ' ' + uom + ' )';
										type_depth_uom = 'inches';
										sel_depth = depth_inch;
									}
									else if(depth_inch!=0)
									{
										type_display = type_display + ' X ' + depth_inch + ' ' + uom + ' )';
										type_depth_uom = 'inches';
										sel_depth = depth_inch;
									}
									else if(depth_line!=0)
									{
										type_display = type_display + ' X ' + depth_line + ' lines )';
										type_depth_uom = 'lines';
										sel_depth = depth_line;
									}
									
									if(type=='Custom'  || sel_width=='0' || sel_depth=='0')
									{
										type_display = type;
									}
										
									
									var newOption = $('<option/>');						   
								    newOption.html(type_display);
								    newOption.attr('value', type_display); // fixed typo							    
								    select_obj.append(newOption);
								}
								else
								{
									var newOption = $('<option/>');						   
								    newOption.html(options[j]);
								    newOption.attr('value', options[j]); // fixed typo
								    select_obj.append(newOption);
								}							    
							}
						    
						    if(field_name=='Type' && ord_type=='Print')
							{
						    	//alert("update");
							    $("div[order_type='Print'][parent='Type']").each(function(){
							    	parent_val = $(this).attr('parent_value');
							    	
							    	parent_val = parent_val.replace(/inches/g,uom);
							    	//alert(parent_val);
							    	
							    	$(this).attr({'parent_value': parent_val});
							    });
							}
							
							insert_obj.append(select_obj);
							
							
							select_obj.custSelectBox3({		
								selectwidth: 280
							});
						}						
					});
					
				}
				
			}
			else
			{*/
				
				var field_name = $(this).find('select').attr('name');
				
				var field_name_org = field_name;
								
				var ord_type = $(this).attr('order_type');
				
				var parent_product_field = $(this).attr('parent');
				
				var parent_product_val = $("#ord_form div[order_type='"+ord_type+"'] [name='"+parent_product_field+"']").val();
				
				var site = $("#ord_form [name='Site']").val();					
				
				var field_name = field_name.replace(" ","_");
				
				var f_name = field_name;
				
				var version_val = field_name.substr(field_name.lastIndexOf('_'));
				
				if(field_name.indexOf('_')!=-1 && field_name.substr(field_name.lastIndexOf('_')).length<=3)
				{
					var f_name = field_name.substr(0,field_name.lastIndexOf('_'));
				}
				else
				{
					version_val ='';
				}
				
				var output_type ='';
				
				if((ord_type=='Web' || ord_type=='Mobile' ) && f_name=='Type')
				{
					//if(parent_product_val=='Rich')
					//{
						selected_versions = $("#33").val();
						if(selected_versions=='--Select--' ||selected_versions =='')
						{
							selected_versions = '1';
						}
							
						
						rich_media_delivery_flag = false;
						
						for(var v = 0; v <= selected_versions; v++)
						{
							if(v==0)
							{
								op_name = "Output Type";
							}
							else
							{
								op_name = "Output Type_"+v;
							}
							
							if(ord_type=='Web')
								var selected_output_type = $('#order_spec_form_Web').find('[name="'+op_name+'"]').val();
							else
								var selected_output_type = $('#order_spec_form_Mobile').find('[name="'+op_name+'"]').val();
							
							if(selected_output_type=='Rich' || selected_output_type=='Rich / Video')
							{
								rich_media_delivery_flag = true;
							}
						}						
						
						select_obj = $("#14");
						
						select_obj.find('option').each(function(){

                            if(rich_media_delivery_flag==true)
                            {
                                    if($(this).val() != 'Other' && $(this).val() != '2nd Day' && $(this).val() != 'Overnight' && $(this).val() != 'Overnight10' && $(this).val() != '--Select--'){
                                            $(this).attr('disabled','disabled');
                                            $(this).parent().parent().parent().parent().parent().find('[class="custRef"]').html('Delivery Date');
                                            $(this).parent().parent().parent().parent().parent().find('[class="custRef"]').addClass('select_grey_out');
                                            $(this).removeAttr("selected");
                                    }
                            }
                            else if($(this).val()=='--Select--')
                            {
                                    $(this).removeAttr("disabled");
                            }
                            else{
                                    $(this).removeAttr("disabled");
                            }


	                    });
	
	                    if(rich_media_delivery_flag==true)
	                    {
	                            select_obj.val('--Select--');
	                    }
						
					//}
					
					//alert(version_val);
					//alert("Product"+version_val+'   '+$("#ord_form div[order_type='"+ord_type+"'][parent='Size Change Only'][parent_value='Yes'] [name='Product"+version_val+"']").val());
					if(version_val!='')
					{
						parent_product_val = $("#ord_form_multiver_"+ord_type+" div[order_type='"+ord_type+"'] [name='Product"+version_val+"']").val();
						output_type = $("#ord_form_multiver_"+ord_type+" div[order_type='"+ord_type+"'] [name='Output Type"+version_val+"']").val();
					}
					else
					{
						parent_product_val = $("#ord_form div[order_type='"+ord_type+"'] [name='Product"+version_val+"']").val();
						output_type = $("#ord_form div[order_type='"+ord_type+"'] [name='Output Type"+version_val+"']").val();
					}
				}
				else if(ord_type=='Print' && f_name=='Type')
				{
					//parent_product_val = $("#ord_form div[order_type='"+ord_type+"'] [name='Product"+version_val+"']").val();					
				}
				
				var d = new Date();
				var n = d.getMilliseconds();
				
				var url = '/orders/getfieldvalues?i='+n;				
				
				checkSessionActive();
				//alert(site+'<>'+ord_type+'<>'+parent_product_val+'<>'+f_name);

if(site=='Media Services(Auckland)' && ord_type=='Web' && f_name=='Type')
{
	if(parent_product_val=='Augmented Reality')
	{
		$("#41").html('');

		var option1 = new Option('Follow Layout(AD1)');
		var option3 = new Option('Full Artistic Discretion(AD3)');
		$("#41").append($(option1));
		$("#41").append($(option3));
	}
	else
	{
		$("#41").html('');

		var option1 = new Option('Follow Layout(AD1)');
		var option2 = new Option('Follow Layout with Changes(AD2)');
		var option3 = new Option('Full Artistic Discretion(AD3)');
		$("#41").append($(option1));
		$("#41").append($(option2));
		$("#41").append($(option3));
	}
}
				
				$.post(url,{'site':site, 'ord_type' : ord_type, 'product': parent_product_val, 'field' : f_name, 'output_type': output_type}, function(data){				
					
					var select_obj = $("div[order_type='"+ord_type+"'] select[name='"+field_name_org+"']");
					
					//var insert_obj = obj.parent().parent();
					
					var obj_name = field_name_org;
					//alert(obj.attr('tooltip'));
					//var select_obj = $('<select/>');
					//select_obj.attr({'name':obj_name,'id':obj.attr('id'),'tooltip':obj.attr('tooltip'),'class':'select_field'});
					
					//insert_obj.html('');
					
					var data = $.parseJSON(data);
					
					var field_name ='';
					
					var options = new Array();
									
					$.each(data,function(f_name,f_values)
					{
						field_name = f_name;
						options = f_values;
					});					
					
					//var options = eval("data."+field_name);
					
					var length = options.length;
					
					
					
					if(select_obj.is('select'))
					{						
						select_obj.html('');
						
						var newOption = $('<option/>');						   
					    newOption.html('--Select--');
					    newOption.attr('value', '--Select--'); // fixed typo
					    newOption.attr('selected', 'selected'); // fixed typo
					    select_obj.append(newOption);
					    
					    select_obj.parent().parent().parent().prev().html(obj_name);
					    select_obj.parent().parent().parent().prev().addClass('select_grey_out');
					    
					    uom = 'inches';

						for(var j = 0; j < length; j++)
						{
							//alert(options[j]);
							if(field_name=='Type' && ord_type=='Print')
							{
								optionval = options[j].split('~');
								
								
								type = optionval[0];
								width_inch = optionval[1];
								depth_inch = optionval[2];
								width_col = optionval[3];
								depth_line = optionval[4];
								type_twosided = optionval[5];
								type_multipage = optionval[6];
								uom = optionval[7];
								
								type_display = type + '(';
								
								type_width_uom = 'inches';
								type_depth_uom = 'inches';
								
								sel_width = '0';
								sel_depth = '0';
								
								if(width_inch==0 && width_col==0)
								{
									type_display = type;// + width_inch + ' ' + uom;
									type_width_uom = 'inches';
									sel_width = width_inch;
								}
								else if(width_inch!=0)
								{
									type_display = type_display + width_inch + ' ' + uom;
									type_width_uom = 'inches';
									sel_width = width_inch;
								}
								else if(width_col!=0)
								{
									type_display = type_display + width_col + ' Columns ';
									type_width_uom = 'columns';
									sel_width = width_col;
								}
								
								if((depth_inch==0 && depth_line==0) && (width_inch==0 && width_col==0))

								{
									type_display = type_display;// + ' x ' + depth_inch + ' ' + uom + ' )';
									type_depth_uom = 'inches';
									sel_depth = depth_inch;
								}
								else if(depth_inch!=0 || width_inch!=0)

								{
									type_display = type_display + ' x ' + depth_inch + ' ' + uom + ' )';
									type_depth_uom = 'inches';
									sel_depth = depth_inch;
								}
								else if(depth_line!=0 || width_col!=0)

								{
									type_display = type_display + ' x ' + depth_line + ' lines )';
									type_depth_uom = 'lines';
									sel_depth = depth_line;
								}
									
								//if(type=='Custom'  || sel_width=='0' || sel_depth=='0')

								if(type=='Custom')
								{
									type_display = type;
								}
								
								var newOption = $('<option/>');						   
							    newOption.html(type_display);
							    newOption.attr('value', type_display); // fixed typo							    
							    select_obj.append(newOption);
							}
							else
							{
								var newOption = $('<option/>');						   
							    newOption.html(options[j]);
							    newOption.attr('value', options[j]); // fixed typo
							    select_obj.append(newOption);
							}
						}
						
						if(field_name=='Type' && ord_type=='Print')
						{
					    	//alert("update");
						    $("div[order_type='Print'][parent='Type']").each(function(){
						    	parent_val = $(this).attr('parent_value');
						    	
						    	parent_val = parent_val.replace(/inches/g,uom);
						    	//alert(parent_val);
						    	
						    	$(this).attr({'parent_value': parent_val});
						    });
						}
						
						//insert_obj.append(select_obj);		
						
						/*$('.select_field').custSelectBox3({		
							selectwidth: 280
						});*/
					}
					
					//Size Change Only Check
					
					var size_change_only = $("#ord_form"+ord_type).find('[name="Size Change Only"]').val();
					if(size_change_only!='Different Creative')
					{
						$("#ord_form_multiver_"+ord_type).find('select[name="'+field_name+'"]').each(function(){			
							
							obj = $(this);			
							
							obj_name = obj.attr('name');
							
							//alert(obj_name);
							
							select_obj = obj;
							//select_obj.attr({'name':obj_name,'id':obj.attr('id'),'tooltip':obj.attr('tooltip'),'class':'select_field'});
							
							//insert_obj.html('');						
							
							if(select_obj.is('select'))
							{				
								select_obj.html('');
								
								var newOption = $('<option/>');						   
							    newOption.html(field_name);
							    newOption.attr('value', field_name); // fixed typo
							    newOption.attr('selected', 'selected'); // fixed typo
							    
							    select_obj.append(newOption);
							    
							    select_obj.parent().parent().parent().prev().html(field_name);
							    select_obj.parent().parent().parent().prev().addClass('select_grey_out');
							    
								for(var j = 0; j < length; j++)
								{
								    var newOption = $('<option/>');						   
								    newOption.html(options[j]);
								    newOption.attr('value', options[j]); // fixed typo
								    select_obj.append(newOption);
								}					
								
								/*insert_obj.append(select_obj);
								
								select_obj.custSelectBox3({		
									selectwidth: 280
								});*/
							}
							
							//$("#ord_form_multiver_"+ord_type).find('div[id="'+obj_name+'_selectbox"]').attr({id:(field_name+'_selectbox')});
							
						});
					}					
					
				});
			//}
			
			
			
			
			/*Product based Deivery Configuration starts*/	
			if(selected_val!='' && selected_val!='--Select--' && selected_val!=null)
			{
	
				/*if(obj.attr('name').indexOf('Output Type')==0)
				{
					if(obj.attr('name').indexOf('_')==-1)
					{
						version_val = 0;
					}
					else
					{
						version_val = obj.attr('name').substr(obj.attr('name').indexOf('_')+1);
					}
		
					if(selected_val!='Rich')
					{
						for(i=0;i<version_val;i++)
						{
							if(i==0)
							{
								media_type = $("#order_spec_form_Web").find('select[name="Output Type"]').val();
							}
							else
							{
								media_type = $("#order_spec_form_Web").find('select[name="Output Type_'+version_val+'"]').val();
							}
				
							if(media_type=='Rich')
							{
								return false;
							}
						}
					}						
				}	*/
	
				type = $("#ord_form div[order_type='"+ord_type+"'] [name='Type"+version_val+"']").val();
	
						/*Deivery Configuration*/
						request_filed = obj.attr('name');
						
						var postValue = selectedSpec();
						//console.log(postValue);
						//return false;
						
						//alert(postValue);
						$.post('/orders/configureddeliveries/',{'site':site, 'selectedSpecItems':postValue, 'request_filed':request_filed}, function(data){

						
						var insert_obj = $("#ord_form").find('[name="Delivery Date"]');
						
						var data = $.parseJSON(data);				
						
						if(insert_obj.is('select'))
						{						
							insert_obj.html('');
							
							var newOption = $('<option/>');						   
						    newOption.html('--Select--');
						    newOption.attr('value', '--Select--'); // fixed typo
						    insert_obj.append(newOption);

						    $.each(data,function(f_name,f_values)
							{
								var newOption = $('<option/>');						   
							    newOption.html(f_values);
							    newOption.attr('value', f_values);						    
							    insert_obj.append(newOption);
							});	
							
						}
					});

					/*Delivery Configuration*/
			}

		})
		});
		
		/*Delivery Configuration*/
		var version_val = parent_name.substr(parent_name.lastIndexOf('_'));
if(parent_name.indexOf('_')!=-1 && parent_name.substr(parent_name.lastIndexOf('_')).length<=3)
{
	var f_name = parent_name.substr(0,parent_name.lastIndexOf('_'));
}
else
{
	version_val ='';
}
var obj_parent_attr = obj.parent().parent().parent().parent().attr('parent');

if( (parent_name=='Type' || (f_name=='Type' && parent_name.indexOf('_')!=-1) && (obj_parent_attr.indexOf('Product')!=-1 || obj_parent_attr.indexOf('Output Type')!=-1)) && selected_val!='' && selected_val!='--Select--' && selected_val!=null)
{
	if(order_type=='Print')
	{
		$("div[parent='Product"+version_val+"'][parent_value='depend'][order_type='"+order_type+"']").each(function(){

			var field_name = $(this).find('select').attr('name');
							
			var ord_type = $(this).attr('order_type');

			var parent_product_field = $(this).attr('parent');

			var parent_product_val = $("#ord_form div[order_type='"+ord_type+"'] [name='"+parent_product_field+"']").val();

			var site = $("#ord_form [name='Site']").val();					

			var field_name = field_name.replace(" ","_");

			var f_name = field_name;
			
			if(field_name.indexOf('_')!=-1 && field_name.substr(field_name.lastIndexOf('_')).length<=3)
			{
				var f_name = field_name.substr(0,field_name.lastIndexOf('_'));
			}
			
			var output_type ='';

			if(f_name=='Type')
			{
				if(version_val!='')
				{
					parent_product_val = $("#ord_form_multiver_"+ord_type+" div[order_type='"+ord_type+"'] [name='Product"+version_val+"']").val();
				}
				else
				{
					parent_product_val = $("#ord_form div[order_type='"+ord_type+"'] [name='Product"+version_val+"']").val();
				}
			}
			
			type = $("#ord_form div[order_type='"+ord_type+"'] [name='Type"+version_val+"']").val();
			request_filed = obj.attr('name');
			
			var postValue = selectedSpec();
		//	console.log(postValue);
		//	return false;
			
			$.post('/orders/configureddeliveries/',{'site':site, 'selectedSpecItems':postValue, 'request_filed':request_filed}, function(data){

				
				var insert_obj = $("#ord_form").find('[name="Delivery Date"]');
				
				var data = $.parseJSON(data);				
				
				if(insert_obj.is('select'))
				{						
					insert_obj.html('');
					
					var newOption = $('<option/>');						   
				    newOption.html('--Select--');
				    newOption.attr('value', '--Select--'); // fixed typo
				    insert_obj.append(newOption);

				    $.each(data,function(f_name,f_values)
					{
						var newOption = $('<option/>');						   
					    newOption.html(f_values);
					    newOption.attr('value', f_values);						    
					    insert_obj.append(newOption);
					});	
					
				}
			});
		});
	}
	else
	{
		/*var rich_media_occured_flag = false;
		
		$("#order_spec_form_Web").find('select[name^="Output Type"]').each(function(){	

			if($(this).val()=='Rich')
			{
				rich_media_occured_flag = true;
			}
		});
		
		if(rich_media_occured_flag==true)
		{
			return false;
		}*/

		$("div[parent='Output Type"+version_val+"'][parent_value='depend'][order_type='"+order_type+"']").each(function(){

			var field_name = $(this).find('select').attr('name');
				
			var ord_type = $(this).attr('order_type');

			var parent_product_field = $(this).attr('parent');

			var parent_product_val = $("#ord_form div[order_type='"+ord_type+"'] [name='"+parent_product_field+"']").val();

			var site = $("#ord_form [name='Site']").val();					

			var field_name = field_name.replace(" ","_");

			var f_name = field_name;
			
			if(field_name.indexOf('_')!=-1 && field_name.substr(field_name.lastIndexOf('_')).length<=3)
			{
				var f_name = field_name.substr(0,field_name.lastIndexOf('_'));
			}
			
			var output_type ='';

			if((ord_type=='Web' || ord_type=='Mobile' ) && f_name=='Type')
			{
				if(version_val!='')
				{
					parent_product_val = $("#ord_form_multiver_"+ord_type+" div[order_type='"+ord_type+"'] [name='Product"+version_val+"']").val();
					output_type = $("#ord_form_multiver_"+ord_type+" div[order_type='"+ord_type+"'] [name='Output Type"+version_val+"']").val();
				}
				else
				{
					parent_product_val = $("#ord_form div[order_type='"+ord_type+"'] [name='Product"+version_val+"']").val();
					output_type = $("#ord_form div[order_type='"+ord_type+"'] [name='Output Type"+version_val+"']").val();
				}
			}
			
			type = $("#ord_form div[order_type='"+ord_type+"'] [name='Type"+version_val+"']").val();
			request_filed = obj.attr('name');
			
			var postValue = selectedSpec();
			// console.log(postValue);
			// return false;	
			
			$.post('/orders/configureddeliveries/',{'site':site, 'selectedSpecItems':postValue, 'request_filed':request_filed}, function(data){

				
				var insert_obj = $("#ord_form").find('[name="Delivery Date"]');
				
				var data = $.parseJSON(data);				
				
				if(insert_obj.is('select'))
				{						
					insert_obj.html('');
					
					var newOption = $('<option/>');						   
				    newOption.html('--Select--');
				    newOption.attr('value', '--Select--'); // fixed typo
				    insert_obj.append(newOption);

				    $.each(data,function(f_name,f_values)
					{
						var newOption = $('<option/>');						   
					    newOption.html(f_values);
					    newOption.attr('value', f_values);						    
					    insert_obj.append(newOption);
					});	
					
				}
			});
		});
	}	
	
}
		/*Product based Delivery Configuration Ends*/

		obj.enableChildFields();
		
		if(obj.attr('name')=='Additional Versions')
		{
			if(order_type=='Print' && selected_val!='--Select--')
			{
				if($('#22').val()=='Product' || $('#22').val()=='--Select--')
				{
					$("#msgbox_text").html("<div><br/>Please fill in the base version details before selecting this option<br/><br/>" +
					"					<img id='create_ok' src='/images/ok.gif' style='vertical-align:middle;' /></div>");
					$("#msgbox").fadeIn('fast',function(){
						$("#msgbox_table").css('width','350px');
						$("#msgbox").css('display','table');
						$("#create_ok").click(function(){
							$("#msgbox").fadeOut('fast');
						});
					});
					obj.val('--Select--');
					obj.parent().parent().parent().prev().html('--Select--');
					obj.parent().parent().parent().hide();
					return false;
				}
			}
			if(obj.val()==0){
				
				var typ1 = $('select[name="Type"]').val();
				var oty1 = $('select[name="Output Type"]').val();
				if(oty1!=""){
					$('select[name="Output Type"]').trigger('change');
				}
				if(typ1!=""){
					$('select[name="Type"]').trigger('change');
				}
			}
			
			$("div[order_type='"+order_type+"'][parent='Additional Versions']").find('[name="Size Change Only"]').trigger('change');
		}
		
	};
	
	jQuery.fn.onChangeCustomSelect = function(obj, parent_name, selected_val, order_type){
				
		if(obj.parent().find('input').attr('name')=='order_site')
		{
			params = 'id='+encodeURIComponent(selected_val);
			
			checkSessionActive();
			$.post('/orders/create',params,function(data){					
				$('#main_body').html(data);				
			});			
			return;
		}
		
		if(obj.parent().find('input').attr('name')=='Delivery Date')
		{

			 
			 site = $("#1").val();
			 deliveryID = $("#14").val();
			 
			 if(deliveryID!='Other' && deliveryID!='--Select--')
			 {
					
				 $.ajax({
					 url: "/orders/deliverydate?id="+encodeURIComponent(site),
					 dataType: "json",
					 data: {					 
						 deliveryID: deliveryID					 
					 },
					 success: function( data ) {
						 str = 'Your order will be delivered on or before: <br /><strong>'+data+'</strong>';
						 $('#duedt').html(str);	
					 }
				 });
			 }
			
			//return;
		}
		
		if(parent_name=="") return;
		
		
		$("div[parent='"+parent_name+"'][order_type='"+order_type+"']").each(function(){
			$(this).fadeOut('fast');
		});
		
		$("div[parent='"+parent_name+"'][order_type='"+order_type+"'][parent_value='all']").each(function(){
			$(this).fadeIn('fast');
		});
		
		$("div[parent='"+parent_name+"'][order_type='"+order_type+"']").each(function(){
			pval = $(this).attr('parent_value');				
			if(pval.indexOf('value')!=-1)
			{
				par_val = $("div[id='ord_form"+order_type+"']").find("[name='"+$(this).attr('parent')+"']").val();
				
				check_val = pval.substr(pval.indexOf('value')+5);					
				
				cond = par_val + check_val;
				
				//alert(cond);
				
				if(eval(cond))
				{
					$(this).fadeIn('fast');
				}
				else
				{
					$(this).fadeOut('fast');
				}
			}
			
		});
		
		$("div[parent='"+parent_name+"'][order_type='"+order_type+"']").each(function(){
			$(this).find("select").each(function(){				
				$(this).trigger('change');					
			});
		});
		
		$("div[parent='"+parent_name+"'][parent_value='depend'][order_type='"+order_type+"']").each(function(){
			
			$(this).fadeIn('fast',function(){			
		
			
			//alert($(this).find('input').attr('name'));
			
			if($(this).hasClass('m-block2'))
			{
				
			}
			else if(($(this).attr('order_type'))==order_type && ($(this).parent().parent().parent().parent().attr('id'))==('ord_form_multiver_'+order_type))
			{
				var multiple_formats = $("#ord_form"+ord_type).find('[name="Multiple Formats"]').val();
				
				if(multiple_formats=='Yes')
				{
					var field_name = $(this).find('input').attr('name');
					
					var field_name = field_name.substr(0,field_name.lastIndexOf('_'));
					
					//alert(field_name);
					
					var field_name_org = $(this).find('input').attr('name');	
					
					var ord_type = $(this).attr('order_type');
					
					var parent_product_field = $(this).attr('parent');
					
					var parent_product_val = $("#ord_form div[order_type='"+ord_type+"'] [name='"+parent_product_field+"']").val();
					
					var site = $("#ord_form [name='Site']").val();					
					
					//var field_name = field_name.replace(" ","_");
					var field_name = field_name.replace(/_/g," ");
					
					var url = '/orders/getfieldvalues';
					
					checkSessionActive();
					
					$.post(url,{'site':site, 'ord_type' : ord_type, 'product': parent_product_val, 'field' : field_name}, function(data){				
						
						var obj = $("div[order_type='"+ord_type+"']").find("input[type='hidden'][name='"+field_name_org+"']");
						
						var insert_obj = obj.parent().parent();
						
						var bj_name = field_name_org;
						
						var select_obj = $('<select/>');
						select_obj.attr({'name':obj_name,'id':obj.attr('id'),'tooltip':obj.attr('tooltip'),'class':'select_field'});
						
						insert_obj.html('');
						
						var data = $.parseJSON(data);				
						
						var options = eval("data."+field_name);
						
						var length = options.length;				
						
						if(select_obj.is('select'))
						{	
							select_obj.html('');
							
							var newOption = $('<option/>');						   
						    newOption.html('--Select--');
						    newOption.attr('value', '--Select--'); // fixed typo
						    select_obj.append(newOption);
						    
						    var uom = 'inches';
						    
						    for(var j = 0; j < length; j++)
							{
								if(field_name=='Type' && ord_type=='Print')
								{
									optionval = options[j].split('~');
									
									
									type = optionval[0];
									width_inch = optionval[1];
									depth_inch = optionval[2];
									width_col = optionval[3];
									depth_line = optionval[4];
									type_twosided = optionval[5];
									type_multipage = optionval[6];
									uom = optionval[7];
									
									type_display = type + '( ';
									
									type_width_uom = 'inches';
									type_depth_uom = 'inches';
									
									sel_width = '0';
									sel_depth = '0';
									
									if(width_inch==0 && width_col==0)
									{
										type_display = type_display + width_inch + ' ' + uom;
										type_width_uom = 'inches';
										sel_width = width_inch;
									}
									else if(width_inch!=0)
									{
										type_display = type_display + width_inch + ' ' + uom;
										type_width_uom = 'inches';
										sel_width = width_inch;
									}
									else if(width_col!=0)
									{
										type_display = type_display + width_col + ' Columns ';
										type_width_uom = 'columns';
										sel_width = width_col;
									}
									
									if((depth_inch==0 && depth_line==0) && (width_inch==0 && width_col==0))

									{
										type_display = type_display + ' X ' + depth_inch + ' ' + uom + ' )';
										type_depth_uom = 'inches';
										sel_depth = depth_inch;
									}
									else if(depth_inch!=0 || width_inch!=0)

									{
										type_display = type_display + ' X ' + depth_inch + ' ' + uom + ' )';
										type_depth_uom = 'inches';
										sel_depth = depth_inch;
									}
									else if(depth_line!=0 || width_col!=0)

									{
										type_display = type_display + ' X ' + depth_line + ' lines )';
										type_depth_uom = 'lines';
										sel_depth = depth_line;
									}
									
									if(type=='Custom')
									{
										type_display = type;
									}
										
									
									var newOption = $('<option/>');						   
								    newOption.html(type_display);
								    newOption.attr('value', type_display); // fixed typo							    
								    select_obj.append(newOption);
								}
								else
								{
									var newOption = $('<option/>');						   
								    newOption.html(options[j]);
								    newOption.attr('value', options[j]); // fixed typo
								    select_obj.append(newOption);
								}							    
							}
						    
						    if(field_name=='Type' && ord_type=='Print')
							{
						    	//alert("update");
							    $("div[order_type='Print'][parent='Type']").each(function(){
							    	parent_val = $(this).attr('parent_value');
							    	
							    	parent_val = parent_val.replace(/inches/g,uom);
							    	//alert(parent_val);
							    	
							    	$(this).attr({'parent_value': parent_val});
							    });
							}
							
							insert_obj.append(select_obj);
							
							
							select_obj.custSelectBox3({		
								selectwidth: 280
							});
						}						
					});
					
				}
				
			}
			else
			{
				var field_name = $(this).find('input').attr('name');
				
				var field_name_org = field_name;
								
				var ord_type = $(this).attr('order_type');
				
				var parent_product_field = $(this).attr('parent');
				
				var parent_product_val = $("#ord_form div[order_type='"+ord_type+"'] [name='"+parent_product_field+"']").val();
				
				var site = $("#ord_form [name='Site']").val();					
				
				var field_name = field_name.replace(" ","_");
				var field_name = field_name.replace(/_/g," ");
				
				var d = new Date();
				var n = d.getMilliseconds();
				
				var url = '/orders/getfieldvalues?i='+n;				
				
				checkSessionActive();
				
				$.post(url,{'site':site, 'ord_type' : ord_type, 'product': parent_product_val, 'field' : field_name}, function(data){				
					
					var obj = $("div[order_type='"+ord_type+"'] input[type='hidden'][name='"+field_name_org+"']");
					
					var insert_obj = obj.parent().parent();
					
					var obj_name = field_name_org;
					//alert(obj.attr('tooltip'));
					var select_obj = $('<select/>');
					select_obj.attr({'name':obj_name,'id':obj.attr('id'),'tooltip':obj.attr('tooltip'),'class':'select_field'});
					
					insert_obj.html('');
					
					var data = $.parseJSON(data);
					
					var field_name ='';
					
					var options = new Array();
									
					$.each(data,function(f_name,f_values)
					{
						field_name = f_name;
						options = f_values;
					});					
					
					//var options = eval("data."+field_name);
					
					var length = options.length;
					
					
					
					if(select_obj.is('select'))
					{						
						select_obj.html('');
						
						var newOption = $('<option/>');						   
					    newOption.html('--Select--');
					    newOption.attr('value', '--Select--'); // fixed typo
					    select_obj.append(newOption);
					    
					    uom = 'inches';

						for(var j = 0; j < length; j++)
						{
							//alert(options[j]);
							if(field_name=='Type' && ord_type=='Print')
							{
								optionval = options[j].split('~');
								
								
								type = optionval[0];
								width_inch = optionval[1];
								depth_inch = optionval[2];
								width_col = optionval[3];
								depth_line = optionval[4];
								type_twosided = optionval[5];
								type_multipage = optionval[6];
								uom = optionval[7];
								
								type_display = type + '(';
								
								type_width_uom = 'inches';
								type_depth_uom = 'inches';
								
								sel_width = '0';
								sel_depth = '0';
								
								if(width_inch==0 && width_col==0)
								{
									type_display = type_display ; //+ width_inch + ' ' + uom;
									type_width_uom = 'inches';
									sel_width = width_inch;
								}
								else if(width_inch!=0)
								{
									type_display = type_display + width_inch + ' ' + uom;
									type_width_uom = 'inches';
									sel_width = width_inch;
								}
								else if(width_col!=0)
								{
									type_display = type_display + width_col + ' Columns ';
									type_width_uom = 'columns';
									sel_width = width_col;
								}
								
								if(depth_inch==0 && depth_line==0)
								{
									type_display = type_display ; //+ ' x ' + depth_inch + ' ' + uom + ' )';
									type_depth_uom = 'inches';
									sel_depth = depth_inch;
								}
								else if(depth_inch!=0)
								{
									type_display = type_display + ' x ' + depth_inch + ' ' + uom + ' )';
									type_depth_uom = 'inches';
									sel_depth = depth_inch;
								}
								else if(depth_line!=0)
								{
									type_display = type_display + ' x ' + depth_line + ' lines )';
									type_depth_uom = 'lines';
									sel_depth = depth_line;
								}
									
								if(type=='Custom')
								{
									type_display = type;
								}
								
								var newOption = $('<option/>');						   
							    newOption.html(type_display);
							    newOption.attr('value', type_display); // fixed typo							    
							    select_obj.append(newOption);
							}
							else
							{
								var newOption = $('<option/>');						   
							    newOption.html(options[j]);
							    newOption.attr('value', options[j]); // fixed typo
							    select_obj.append(newOption);
							}
						}
						
						if(field_name=='Type' && ord_type=='Print')
						{
					    	//alert("update");
						    $("div[order_type='Print'][parent='Type']").each(function(){
						    	parent_val = $(this).attr('parent_value');
						    	
						    	parent_val = parent_val.replace(/inches/g,uom);
						    	//alert(parent_val);
						    	
						    	$(this).attr({'parent_value': parent_val});
						    });
						}
						
						insert_obj.append(select_obj);		
						
						$('.select_field').custSelectBox3({		
							selectwidth: 280
						});
					}
					
					//Size Change Only Check
					
					var size_change_only = $("#ord_form"+ord_type).find('[name="Size Change Only"]').val();
					if(size_change_only!='Different Creative')
					{
						$("#ord_form_multiver_"+ord_type).find('div[id="'+field_name+'_selectbox"]').each(function(){
							
							insert_obj = $(this).parent();
							
							obj = insert_obj.find("input[type='hidden']");			
							
							obj_name = obj.attr('name');
							
							//alert(obj_name);
							
							select_obj = $('<select/>');
							select_obj.attr({'name':obj_name,'id':obj.attr('id'),'tooltip':obj.attr('tooltip'),'class':'select_field'});
							
							insert_obj.html('');						
							
							if(select_obj.is('select'))
							{				
								select_obj.html('');
								
								var newOption = $('<option/>');						   
							    newOption.html(field_name);
							    newOption.attr('value', field_name); // fixed typo
							    select_obj.append(newOption);
	
								for(var j = 0; j < length; j++)
								{
								    var newOption = $('<option/>');						   
								    newOption.html(options[j]);
								    newOption.attr('value', options[j]); // fixed typo
								    select_obj.append(newOption);
								}
								
								insert_obj.append(select_obj);
								
								select_obj.custSelectBox3({		
									selectwidth: 280
								});
							}
							
							$("#ord_form_multiver_"+ord_type).find('div[id="'+obj_name+'_selectbox"]').attr({id:(field_name+'_selectbox')});
							
						});
					}					
					
				});
			}
		})
		});
		
		obj.enableChildFields();
		
		if(obj.parent().find('input').attr('name')=='Additional Versions')
		{
			if(ord_type=='Print' && selected_val!='--Select--')
			{
				if($('#22').val()=='Product' || $('#22').val()=='--Select--')
				{
					$("#msgbox_text").html("<div><br/>Please fill in the base version details before selecting this option<br/><br/>" +
					"					<img id='create_ok' src='/images/ok.gif' style='vertical-align:middle;' /></div>");
					$("#msgbox").fadeIn('fast',function(){
						$("#msgbox_table").css('width','350px');
						$("#msgbox").css('display','table');
						$("#create_ok").click(function(){
							$("#msgbox").fadeOut('fast');
						});
					});
					obj.parent().find("li:first").trigger('click');				
					return false;
				}
			}
			
			$("div[order_type='"+ord_type+"'][parent='Additional Versions']").find('[name="Size Change Only"]').trigger('change');
		}
		
	};
	
	jQuery.fn.applyCustomSelect = function(){
		$("#ord_form .customSelect").each(function(){
			//$(this).enableChildFields();
			if($(this).find('select').attr('name')=='Color Type' || $(this).find('select').attr('name') == 'Additional Versions' || $(this).find('select').attr('id')=='14')
			{
				$(this).removeClass('twoColumn');
				$(this).mySelectBox();				
			}
			else
			{
				$(this).mySelectBox();
			}			
			
			$(this).find('select').change(function(){				
				var parent = $(this).parent().parent().parent().parent().attr('parent');
				var selected_val = $(this).val();
				var order_type = $(this).parent().parent().parent().parent().attr('order_type');
				obj=$(this);				
				$(this).onChangeMyCustomSelect(obj, $(this).attr('name'), selected_val, order_type)
			})
			
			
		});
	};
	
	jQuery.fn.showHideOrderComponents = function(){
		var checked = false;
		
		$("#order_info_form").find("[name='Order Type']").each(function(){
			if($(this).is(":checked"))
			{
				checked = true;
				
			}else{
				
					var typ1 = $('select[name="Type"]').val();
					var oty1 = $('select[name="Output Type"]').val();
					if(oty1!=""){
						$('select[name="Output Type"]').trigger('change');
					}
					if(typ1!=""){
						$('select[name="Type"]').trigger('change');
					}
					
				
			}
		});
		
		if(checked)
		{
			
			
			$("#ordercomponents").show('fast');
			
		}
		else
		{
			
			$("#ordercomponents").hide('fast');
		}
	};
	
	jQuery.fn.cleanOrderFields = function(){		
		
		
		//$( "#ord_form .dpicker" ).datepicker( "option", "dateFormat", "yy-mm-dd" );	
		$("#other_date.dpicker" ).datepicker({ minDate:+3, dateFormat: 'yy-mm-dd'});
		$( "#ord_form .dpicker" ).datepicker({ minDate:+0, dateFormat: 'yy-mm-dd'});
		
		$("#4").autocomplete({
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
		
		
		$("#5").autocomplete({
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
		
		$("#16").autocomplete({
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

		$("#19").autocomplete({
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
		
		$("#6").autocomplete({
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
		
		
		$('#ord_form').find("input[type='checkbox']").click(function(){
			selected_val = $(this).val();			
	
			v = "div[parent='"+$(this).attr('name')+"']";
			//alert(v);
			
			idVal =  $(this).attr('id')
            var isChecked = $('#'+idVal).attr('checked')?true:false;

		//For Single OrderType Statrs Here
		ord_type_cnt = 0;			
		$("#order_info_form").find("[name='Order Type']").each(function(){				
			ord_type_cnt++;
		});
			
		if(ord_type_cnt=='1')
		{
			isChecked = false;
		}
		//For Single OrderType End

            if(isChecked) {
                $('#ord_form').find("#"+idVal).attr("checked", false);
                $('#ord_form').find("#o-"+idVal).removeClass("active");
            } else {
            	$('#ord_form').find("#"+idVal).attr("checked", true);
            	$('#ord_form').find("#o-"+idVal).addClass("active");
            }           
			
			if($(this).attr('checked')=='checked')
			{
				$("div[parent='"+$(this).attr('name')+"'][parent_value='"+selected_val+"']").fadeIn('fast', function(){
					if($(this).hasClass('selectbox2options_wrap'))
					{
						$(this).fadeOut('fast');
					}
					
					if($(this).hasClass('selectboxoptions_wrap'))
					{
						$(this).fadeOut('fast');
					}
						
				});
				
				$(this).enableChildFields();		
				
				/*$("div[parent='"+$(this).attr('name')+"'][parent_value='"+selected_val+"'] label").each(function()
				{					
					p_name = $(this).html();
					
					order_type = $(this).parent().attr('order_type');
					
					$("div[parent='"+p_name+"'][parent_value='depend'][order_type='"+order_type+"']").fadeIn('fast');
				});*/
			}
			else
			{
				$("div[parent='"+$(this).attr('name')+"'][parent_value='"+selected_val+"']").fadeOut('fast');
				
				$("div[parent='"+$(this).attr('name')+"'][parent_value='"+selected_val+"'] label").each(function()
				{					
					p_name = $(this).html();			
					
					$("div[parent='"+p_name+"'][parent_value='depend']").fadeOut('fast');
				});
				
				$("div[id='ord_form"+selected_val+"']").fadeOut('fast');
				$("div[id='ord_form_multiver_"+selected_val+"']").fadeOut('fast');
			}
			
			$(this).showHideOrderComponents();
		
		});	
		
	
		$("select").change(function(){
			
			if($(this).parent().parent().parent().hasClass('selectContainer'))
			{
				return;
			}
			
			parent_name = $(this).attr('name');
			selected_val = $(this).val();
			order_type = $(this).parent().attr('order_type');
			obj = $(this);		
			
			if(parent_name=="") return;			
			
			$("div[parent='"+parent_name+"'][order_type='"+order_type+"']").each(function(){
				$(this).fadeOut('fast');
			});
			
			$("div[parent='"+parent_name+"'][order_type='"+order_type+"']").each(function(){				
				pval = $(this).attr('parent_value');
				
				if(pval.indexOf('value')!=-1)
				{
					par_val = $("div[id='ord_form"+order_type+"']").find("[name='"+$(this).attr('parent')+"']").val();
					
					if(par_val=='--Select--') return;
					
					check_val = pval.substr(pval.indexOf('value')+5);					
					
					cond = par_val + check_val;
					
					//alert(cond);
					
					if(eval(cond))
					{
						$(this).fadeIn('fast');
					}
					else
					{
						$(this).fadeOut('fast');
					}
				}

				//if($('#order_info_form').find('#Jobno').val()!='')	
				//{
					if(parent_name=='Type' && order_type=='Print' && selected_val.indexOf('(')==-1)
	                        	{	                               
        	                        	$(this).fadeIn('fast');
                	        	}
                        		else if(parent_name.indexOf('Type_')==0 && order_type=='Print' && selected_val.indexOf('(')==-1)
                        		{
	                                	$(this).fadeIn('fast');
        	               		}
				//}
			});
			
			$("div[parent='"+parent_name+"'][order_type='"+order_type+"']").each(function(){				
				$(this).find("select").each(function(){				
					//$(this).trigger('change');					
				});
			});
			
			$("div[parent='"+parent_name+"'][parent_value='depend'][order_type='"+order_type+"']").fadeIn('fast',function(){			
				
				//alert($(this).find('input').attr('name'));
				
				if($(this).hasClass('m-block2') || $(this).hasClass('m-block')){
					
				}
				
			});


			$("#order_info_form").find('[name="Camera Ready"]').each(function(){

                                var camera_ready = $(this).val();
                                var pick_up_ad = $("#16").val();

                                  if((camera_ready == 'Yes' &&  pick_up_ad == '') || (camera_ready == 'Yes' &&  pick_up_ad !=''))
                                                {
                                                        $("#order_info_form").find("[parent='Build Type']").css('display','none');
                                                }
                        });

			//Copy Translation Delivery Opt Starts here
			if(parent_name=='Copy Translation')
			{
				copy_translate_delivery_flag = false;
				$("#order_info_form").find("input:checked[name='Order Type']").each(function(){				
					
					otype = $(this).val();	
					
					$('#order_spec_form_'+otype).find('[name="Copy Translation"]').each(function()
					{
						var copy_translate =  $(this).val();
						
						if(copy_translate=='Yes')
						{
							copy_translate_delivery_flag = true;
						}							
					});							
					
				});
				
				//alert(selected_val+' - '+copy_translate_delivery_flag);
						
				select_obj = $("#14");
				
				select_obj.find('option').each(function(){
				
				
					if(selected_val=='Yes' || copy_translate_delivery_flag==true)
					{						
						if($(this).val() != 'Other' && $(this).val() != '2nd Day' ){
							$(this).attr('disabled','disabled');
						}					
					}
					else{
						$(this).removeAttr("disabled");
					}
				
				
				});
				
			}
			//Copy Translation Delivery Opt Ends here
			
			obj.enableChildFields();
			
		});
	
		$("input[type='radio']").change(function(){		
	
			parent_name = $(this).attr('name');
			$("div[parent='"+parent_name+"']").each(function(){
				$("div[parent='"+parent_name+"']").fadeOut('fast');
			});		
			
			selected_val = $(this).val();
			
			$("div[parent='"+$(this).attr('name')+"'][parent_value='"+selected_val+"']").fadeIn('fast');
			
			/*$("div[parent='"+$(this).attr('name')+"'][parent_value='"+selected_val+"'] label").each(function()
			{					
				p_name = $(this).html();			
				
				$("div[parent='"+p_name+"'][parent_value='depend']").fadeIn('fast');
			});*/			
		});
		
		$("div[parent]").each(function(){
			
			if($(this).attr('parent')!='' && ($(this).attr('changeval')=='' || ($(this).attr('parent_value')!=$("div[order_type='"+$(this).attr('order_type')+"'] [name='"+$(this).attr('parent')+"']").val() && $(this).attr('parent_value')!='depend')))
			{				
				$(this).fadeOut('fast',function(){
					/*$('[data-role="slider"]').each(function(){
						$(this).slider();
					});*/
				});
			}			

			//if($('#order_info_form').find('#Jobno').val()!='')
			//{
				if($(this).attr('parent')=='Type' && $(this).attr('order_type')=='Print')
        	                {                               
                	                $(this).fadeIn('fast');
	                        }
        	                else if($(this).attr('parent').indexOf('Type_')==0 && $(this).attr('order_type')=='Print')
                	        {
                        	        $(this).fadeIn('fast');
	                        }
			//}
		});
		
		$("#order_form").find("input:checked[name='Order Type']").each(function(){
			var ord_type = $(this).val();		
			
			$("div[parent='Order Type'][parent_value='"+ord_type+"']").each(function(){
				$(this).fadeIn('fast');
			});
			
			$(this).showHideOrderComponents();
		});
		
		$('[data-role="slider"]').each(function(){

			/*

			if($(this).attr('name').indexOf('depthuom')!=-1)
			{				
				$(this).find('option[value="lines"]').html("_lines__");
			}
			*/

			$(this).switchify();
		});
		
		$("div[parent]").each(function(){
			
			$(this).find("select").each(function(){	
				if($(this).parent().attr('parent')=='')
				{
					if($(this).parent().css('display')!='none')
					{
						$(this).trigger('change');
					}
				}
			});
			
		});
		
		$("[name='Size Change Only']").each(function(){
			
			$(this).unbind().change(function(){			
				
				ord_type = $(this).parent().parent().parent().parent().attr('order_type');
				parent = $(this).parent().parent().parent().parent().attr('parent');				
				
				if($(this).val()!='Different Creative')
				{	
					selected_versions = $("div[order_type='"+ord_type+"'] [name='"+parent+"']").val();
					
					multi_ver_container = $("#ord_form_multiver"+ord_type);					
					
					selected_versions = parseInt(selected_versions);
					
					//$("#ord_form_multiver_"+ord_type).html('');	
					
					var existing_versions = 0;
					$("form[id='ord_form_multiver_"+ord_type+"']").find("div[ver]").each(function(){
						existing_versions++;
					});
					
					if(selected_versions>existing_versions)
					{
						cont_div_obj = '';
						for(mul=existing_versions; mul<selected_versions; mul++)
						{
							div_obj1 = $("<div parent='Size Change Only' order_type='"+ord_type+"' style='width:900px;clear:both;' ver='"+(mul+1)+"'><div class='m-block t-right'><h2>VERSION "+(mul+1)+"</h2></div></div>");
							div_obj1.appendTo($("#ord_form_multiver_"+ord_type));
							div_obj = $("<div class='o-row' id='multi_ver_div_"+ord_type+"'/>");
							cont_div_obj = '';
							cont_div_obj1 = '';
							$("div[order_type='"+ord_type+"'][multiversion='1']").each(function(){
								org_name = $(this).find('[name]').attr('name');
								label_name = $(this).find('label').html();
								//if((org_name!='Product' && label_name!='Product') || (org_name!='Format' && label_name!='Format') )
								//{
									clone_obj = $(this).clone(true);
									clone_obj.removeAttr('multiversion');
									clone_obj_inp = clone_obj.find('[name]');
									clone_obj_name_org = clone_obj_inp.attr('name');								
									
									//alert(clone_obj_name_org+'-'+$(this).parent().width())
									
									if($(this).parent().width()=='900')
									{
										if($(this).is(':first-child'))
										{
											cont_div_obj1 = $('<div divver="'+(mul+1)+'" style="width:900px;float:left" />');
											cont_div_obj1.appendTo($("#ord_form_multiver_"+ord_type));
											cont_div_obj = $('<div style="width:900px;float:left" />');
											cont_div_obj.appendTo(cont_div_obj1);
										}
										
										//cont_div_obj = $("#ord_form_multiver_"+ord_type).find("div[order_type='"+ord_type+"'][multiversion='1'][parent='"+$(this).attr('parent')+"']").parent();										
										
										clone_obj.appendTo(cont_div_obj);					
									}
									else if($(this).parent().width()=='705')
									{
										if($(this).is(':first-child'))
										{
											cont_div_obj1 = $('<div divver="'+(mul+1)+'" style="width:900px;float:left" />');
											cont_div_obj1.appendTo($("#ord_form_multiver_"+ord_type));
											cont_div_obj = $('<div style="width:135px;float:left" />');
											cont_div_obj.appendTo(cont_div_obj1);
										}
										
										//cont_div_obj = $("#ord_form_multiver_"+ord_type).find("div[order_type='"+ord_type+"'][multiversion='1'][parent='"+$(this).attr('parent')+"']").parent();										
										
										clone_obj.appendTo(cont_div_obj);					
									}
									else if($(this).parent().width()=='435')
									{
										if($(this).is(':first-child'))
										{
											cont_div_obj1 = $('<div divver="'+(mul+1)+'" style="width:900px;float:left" />');
											cont_div_obj1.appendTo($("#ord_form_multiver_"+ord_type));
											cont_div_obj = $('<div style="width:435px;float:left" />');
											cont_div_obj.appendTo(cont_div_obj1);
										}
										
										//cont_div_obj = $("#ord_form_multiver_"+ord_type).find("div[order_type='"+ord_type+"'][multiversion='1'][parent='"+$(this).attr('parent')+"']").parent();										
										
										clone_obj.appendTo(cont_div_obj);				
										
										
									}
									else if($(this).parent().width()=='290')
									{
										
										if($(this).is(':first-child'))
										{
											cont_div_obj1 = $('<div divver="'+(mul+1)+'" style="width:900px;float:left" />');
											cont_div_obj1.appendTo($("#ord_form_multiver_"+ord_type));
											cont_div_obj = $('<div divver="'+(mul+1)+'" style="width:290px;float:left" />');
											cont_div_obj.appendTo(cont_div_obj1);
											
										}
										
										//cont_div_obj = $("#ord_form_multiver_"+ord_type).find("div[order_type='"+ord_type+"'][multiversion='1'][parent='"+$(this).attr('parent')+"']").parent();										
										
										clone_obj.appendTo(cont_div_obj);									
									}
									else if($(this).parent().width()=='610')
									{										
										if($(this).is(':first-child'))
										{											
											cont_div_obj = $('<div divver="'+(mul+1)+'" style="width:610px;float:left" />');
											cont_div_obj.appendTo(cont_div_obj1);
											
										}
										
										//cont_div_obj = $("#ord_form_multiver_"+ord_type).find("div[order_type='"+ord_type+"'][multiversion='1'][parent='"+$(this).attr('parent')+"']").parent();										
										
										clone_obj.appendTo(cont_div_obj);		
										
									}
									else if($(this).parent().width()=='465')
									{
										if($(this).is(':first-child'))
										{
											/*if(clone_obj_name_org=='Type' && ord_type=='Print')
											{
												cont_div_obj1 = $('<div divver="'+(mul+1)+'" style="width:900px;float:left" />');
												cont_div_obj1.appendTo($("#ord_form_multiver_"+ord_type));
												
												cont_div_obj = $('<div divver="'+(mul+1)+'" style="width:435px;float:left" />');
												label_div_obj = $('<div class="m-block t-right"><label>Type</label></div>');
												
												label_div_obj.appendTo(cont_div_obj);
												cont_div_obj.appendTo(cont_div_obj1);
												
												clone_obj.appendTo(cont_div_obj);
												
												cont_div_obj = $('<div divver="'+(mul+1)+'" style="width:465px;float:left" />');
												cont_div_obj.appendTo(cont_div_obj1);
												
											}
											else
											{*/
												cont_div_obj = $('<div divver="'+(mul+1)+'"  style="width:465px;float:left" />');
												cont_div_obj.appendTo(cont_div_obj1);
												clone_obj.appendTo(cont_div_obj);
											//}					
										}
										
										if((clone_obj_name_org!='Type' && ord_type=='Print') || (ord_type!='Print'))
										{
											clone_obj.appendTo(cont_div_obj);
										}
										
									}
									
									if(clone_obj_name_org=='Width' && ord_type=='Print')
									{
										widthuom_obj = clone_obj.find('[name="widthuom"]');	
										
										disp = widthuom_obj.parent().parent().css('display');
										widthuom_obj.parent().parent().css({'display':''});
										
										widthuom_obj.attr("name",'widthuom'+"_"+(mul+1));
										widthuom_obj.attr("id",'widthuom'+"_"+(mul+1));				
										
										widthuom_obj.next().remove();
										
										widthuom_obj.removeData('switch');
										
										widthuom_obj.val($('[name="widthuom"]').val());										

										

										$('[name="widthuom'+"_"+(mul+1)+'"][data-role="slider"]').switchify();
										widthuom_obj.parent().parent().css({'display':disp});
									}
									
									if(clone_obj_name_org=='Depth' && ord_type=='Print')
									{
										widthuom_obj = clone_obj.find('[name="depthuom"]');
										
										disp = widthuom_obj.parent().parent().css('display');
										widthuom_obj.parent().parent().css({'display':''});
										
										widthuom_obj.attr("name",'depthuom'+"_"+(mul+1));
										widthuom_obj.attr("id",'depthuom'+"_"+(mul+1));							
										
										widthuom_obj.next().remove();
										
										widthuom_obj.removeData('switch');
										
										widthuom_obj.val($('[name="depthuom"]').val());

										

										$('[name="depthuom'+"_"+(mul+1)+'"][data-role="slider"]').switchify();
										widthuom_obj.parent().parent().css({'display':disp});
									}
								//}
							});
							
							$("div[order_type='"+ord_type+"'][multiversion='1']").each(function(){
								org_name = $(this).find('[name]').attr('name');
								
								//if(org_name!='Product' && org_name!='Format')
								//{							
									clone_obj_inp = $("#ord_form_multiver_"+ord_type).find('[name="'+org_name+'"]');
									clone_obj_name_org = clone_obj_inp.attr('name');
									
									//inner_div_obj = $('<div style="width:450px;float:left;"/>');							
									//inner_div_obj = $('<div style="float:left;width:600px;"/>');
									
									if(clone_obj_name_org!='undefined'){
										clone_obj_name = clone_obj_name_org+"_"+(mul+1);
										clone_obj_inp.attr({name:clone_obj_name});
										
										//if(clone_obj_name_org=='Brief/Instructions')
										if(clone_obj_inp.is('textarea'))
										{
											clone_obj_inp.removeAttr("style");
										}

										if(clone_obj_inp.is('select'))
										{
											clone_obj_inp.val(clone_obj_inp.parent().parent().parent().prev().html());
										}
										
										$("#ord_form_multiver_"+ord_type+" [parent='"+clone_obj_name_org+"']").each(function(){
											$(this).attr({parent:clone_obj_name});
											
											if(!$(this).hasClass('selectboxoptions_wrap') && !$(this).hasClass('selectbox2options_wrap'))
											{
												//inner_div_obj.append($(this));
											}
										});
									}							
									
									append_after = clone_obj_inp.parent().parent();
									
									//inner_div_obj.insertAfter(append_after);
								//}
							});
						}
					}
					else if(selected_versions<existing_versions)
					{
						for(mul=existing_versions; mul>=selected_versions; mul--)
						{
							$('div[divver="'+(mul+1)+'"]').remove();
							$('div[ver="'+(mul+1)+'"]').remove();
						}
						/*for(mul=0; mul<selected_versions; mul++)
						{
							div_obj1 = $("<div parent='Size Change Only'  parent_value='Yes' order_type='"+ord_type+"' ver='"+(mul+1)+"'><h2>VERSION "+(mul+1)+"</h2></div>");
							div_obj1.appendTo($("#ord_form_multiver_"+ord_type));
							div_obj = $("<div class='o-row' id='multi_ver_div_"+ord_type+"'/>");
							$("div[order_type='"+ord_type+"'][multiversion='1']").each(function(){
								org_name = $(this).find('[name]').attr('name');
								label_name = $(this).find('label').html();
								if((org_name!='Product' && label_name!='Product') || (org_name!='Format' && label_name!='Format') )
								{
									clone_obj = $(this).clone(true);
									clone_obj.removeAttr('multiversion');
									clone_obj_inp = clone_obj.find('[name]');
									clone_obj_name_org = clone_obj_inp.attr('name');
									//clone_obj.appendTo(div_obj);								
									
									div_obj.appendTo($("#ord_form_multiver_"+ord_type));
									
									if(clone_obj_name_org=='Width' && ord_type=='Print')
									{
										widthuom_obj = clone_obj.find('[name="widthuom"]');								
										
										widthuom_obj.attr("name",'widthuom'+"_"+(mul+1));
										widthuom_obj.attr("id",'widthuom'+"_"+(mul+1));									
																				
										widthuom_obj.next().remove();
										
										widthuom_obj.removeData('switch');
										
										$('[name="widthuom'+"_"+(mul+1)+'"][data-role="slider"]').switchify();
									}
									
									if(clone_obj_name_org=='Depth' && ord_type=='Print')
									{
										widthuom_obj = clone_obj.find('[name="depthuom"]');								
										
										widthuom_obj.attr("name",'depthuom'+"_"+(mul+1));
										widthuom_obj.attr("id",'depthuom'+"_"+(mul+1));									
																				
										widthuom_obj.next().remove();
										
										widthuom_obj.removeData('switch');
										
										$('[name="depthuom'+"_"+(mul+1)+'"][data-role="slider"]').switchify();
									}
								}
							});
							
							$("div[order_type='"+ord_type+"'][multiversion='1']").each(function(){
								org_name = $(this).find('[name]').attr('name');
								
								if(org_name!='Product' && org_name!='Format')
								{							
									clone_obj_inp = $("#ord_form_multiver_"+ord_type).find('[name="'+org_name+'"]');
									clone_obj_name_org = clone_obj_inp.attr('name');
									
									//inner_div_obj = $('<div style="width:450px;float:left;"/>');							
									/*inner_div_obj = $('<div style="width:600px;float:left;text-align:middle;"/>');
									
									if(clone_obj_name_org!='undefined'){
										clone_obj_name = clone_obj_name_org+"_"+(mul+1);
										clone_obj_inp.attr({name:clone_obj_name});							
										
										$("#ord_form_multiver_"+ord_type+" [parent='"+clone_obj_name_org+"']").each(function(){
											$(this).attr({parent:clone_obj_name});
											
											if(!$(this).hasClass('selectboxoptions_wrap') && !$(this).hasClass('selectbox2options_wrap'))
											{
												inner_div_obj.append($(this));
											}
										});
									}							
									
									append_after = clone_obj_inp.parent().parent();
									
									inner_div_obj.insertAfter(append_after);*/
								//}
							//});
						//}
					}
					else
					{
						//do nothing
					}
				}
				else
				{
					$("#ord_form_multiver_"+ord_type).html('');
				}
			});
		});
		
		$("[name='Multiple Formats']").each(function(){		
			
			$(this).unbind().change(function(){			
				
				//alert($(this).attr('name'));
				
				ord_type = $(this).parent().attr('order_type');
				parent = 'Additional Versions';		
				
				if($(this).val()=='Yes')
				{
					selected_versions = $("div[order_type='"+ord_type+"'] [name='"+parent+"']").val();
					
					multi_ver_container = $("#ord_form_multiver"+ord_type);					
					
					selected_versions = parseInt(selected_versions);
					
					$("#ord_form_multiver_"+ord_type).html('');
					
					for(mul=0; mul<selected_versions; mul++)
					{
						div_obj1 = $("<div parent='Multiple Formats'  parent_value='Yes' order_type='"+ord_type+"'><div class='m-block t-right'><h2>VERSION "+(mul+1)+"</h2></div></div>");
						div_obj1.appendTo($("#ord_form_multiver_"+ord_type));
						div_obj = $('<div class="o-row"/>');
						$("div[order_type='"+ord_type+"'][multiversion='1']").each(function(){													
							clone_obj = $(this).clone(true);
							clone_obj.removeAttr('multiversion');
							clone_obj_inp = clone_obj.find('[name]');
							clone_obj_name_org = clone_obj_inp.attr('name');
							clone_obj.appendTo(div_obj);							
							
							div_obj.appendTo($("#ord_form_multiver_"+ord_type));
							
							if(clone_obj_name_org=='Width' && ord_type=='Print')
							{
								widthuom_obj = clone_obj.find('[name="widthuom"]');								
								
								widthuom_obj.attr("name",'widthuom'+"_"+(mul+1));
								widthuom_obj.attr("id",'widthuom'+"_"+(mul+1));									
								widthuom_obj.css({"display":''});
								
								widthuom_obj.next().remove();
								
								widthuom_obj.removeData('switch');
								
								$('[name="widthuom'+"_"+(mul+1)+'"][data-role="slider"]').switchify();
							}
							
							if(clone_obj_name_org=='Depth' && ord_type=='Print')
							{
								widthuom_obj = clone_obj.find('[name="depthuom"]');								
								
								widthuom_obj.attr("name",'depthuom'+"_"+(mul+1));
								widthuom_obj.attr("id",'depthuom'+"_"+(mul+1));									
								widthuom_obj.css({"display":''});
								
								widthuom_obj.next().remove();
								
								widthuom_obj.removeData('switch');
								
								$('[name="depthuom'+"_"+(mul+1)+'"][data-role="slider"]').switchify();
							}
						});
						
						$("div[order_type='"+ord_type+"'][multiversion='1']").each(function(){
							org_name = $(this).find('[name]').attr('name');
							clone_obj_inp = $("#ord_form_multiver_"+ord_type).find('[name="'+org_name+'"]');
							clone_obj_name_org = clone_obj_inp.attr('name');
							
							//inner_div_obj = $('<div style="width:450px;float:left;"/>');
							inner_div_obj = $('<div style="width:600px;float:left;"/>');
							
							if(clone_obj_name_org!='undefined'){
								clone_obj_name = clone_obj_name_org+"_"+(mul+1);
								clone_obj_inp.attr({name:clone_obj_name});							
								
								$("#ord_form_multiver_"+ord_type+" [parent='"+clone_obj_name_org+"']").each(function(){
										$(this).attr({parent:clone_obj_name});
										
									if(!$(this).hasClass('selectboxoptions_wrap') && !$(this).hasClass('selectbox2options_wrap'))
									{
										inner_div_obj.append($(this));
									}
								});
							}
							
							
							
							append_after = clone_obj_inp.parent().parent();
							
							inner_div_obj.insertAfter(append_after);
						});
					}
				}
				else
				{
					$("#ord_form_multiver_"+ord_type).html('');
				}
			});
		});
		
		/*$("#uploader1").pluploadQueue({
			// General settings
			runtimes : 'gears,flash,silverlight,browserplus,html5',
			url : '/upload.php',
			max_file_size : '10mb',
			chunk_size : '1mb',
			unique_names : true,
			multiple_queues : true,
			// Resize images on clientside if we can
			resize : false,
			// Specify what files to browse for
			filters : [
				{title : "Image files", extensions : "jpg,gif,png"},
				{title : "Document files", extensions : "doc,docx,pdf,xls,xlsx"},
				{title : "Zip files", extensions : "zip"}
			],
			// Flash settings
			flash_swf_url : '/js/plupload/plupload.flash.swf',
			// Silverlight settings
			silverlight_xap_url : '/js/plupload/plupload.silverlight.xap'
		});*/
		
		$("[name='Additional Versions']").each(function(){
			$(this).trigger('change');
		});
		
		$(this).applyCustomSelect();
		
		$('#ord_form .color_pick').each(function(){
			$(this).colourPicker({		
				ico:    '/images/colourPicker.gif',
				title:    false
			});
		});
		
		
		$('#ordercomponents').myFileUpload({
		    url:'/upload.php',
		    tmp_path : $('#tmp_folder_path').val(),
		    page: 'NewOrder',
		    showOrderType:'true',
		    showInstr:'true'
		});
		
		 $(function() {
			 $( "#dialog-message" ).dialog({
				 modal: true,
				 autoOpen: false,
				 show: {
					 duration: 1000
				 },
				 hide: {					 
					 duration: 100
				 }
			 });
		});
		
		
		
		$("#formSubmit").click(function(event){
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
			if(!objRegExp.test($("[name='Tracking No']").val()) && $("[name='Tracking No']").parent().css('display')!='none')
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
			
			/*
			 * Check Order Components has copied or not
			 */			
			/*
			var tmp_folder_path = $("#tmp_folder_path").val();
			//$("#ordercomponents").find( 'div[name="ax-file-name"]' ).val();
			
			file_names = new Array();	
			file_names[0] = tmp_folder_path;
			file_names_cnt = 1;
			
			$('div[class="ax-file-name"]').each(function(){				
				file_names[file_names_cnt++] = $(this).html();				
			});
			
			$.ajax({
		        data: tmp_folder_path,
		        data: "files="+file_names,	
		        type: "post",
		        url: "/orders/checkfilescopystatus",
		        success: function(jsondata) {
					alert(jsondata.length);
				},
				error: function(errorThrown) {
					alert("failed");
				}
		    });			
			return false;
			*/
			
			order_type_field = "Order Type";		
			
			for(ot=0;ot<order_type.length;ot++)
			{
				formdetails =  formdetails + '&' + order_type_field+'['+ot+']'+'='+order_type[ot];
			}	
			
			form_components_details = $("#ordercomponents").find('input').serialize();
			
			formdetails =  formdetails + '&' + form_components_details;
			
			if($('#order_info_form').find('#Jobno').val()!='')
			{
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
				$("#formSubmit").hide();

				$("#msgbox").fadeIn('fast',function(){
					$("#msgbox").css('display','table');
				});
					$.post('/orders/submit',formdetails,function(data1){
				
					$("#msgbox").fadeOut('fast');
					//$('.orderform-box').fadeOut('slow');
					
					$('.inp-text1').trigger('click');
					
					
					
					//jobno_details = data1.split('/~/');	
					//$('#Jobno').val(jobno_details[0]);
					//$('#confirmOrder').html(jobno_details[1]);
					//$('#confirmOrder').fadeIn('slow');
					//callForConfirmSubmit();
				//});				
			});
		      }
			else
			{
				$("#msgbox_text").html("<div>Waiting for File Upload to complete...<img src='/images/transparent_loading.gif' style='vertical-align:middle;' /></div>");
					$("#msgbox").fadeIn('fast',function(){
						$("#msgbox").css('display','table');
					});
				jobSubmit = 1;	
				
			}
		});
		
		$("#formSave").click(function(event){
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
				$("[name='Tracking No']").css('background-color','#FF0000');
				return false;
			}
			
			mandatory_fields = new Array();
			
			errFlag = false;
			
			if($('#14').val()=='--Select--' || $('#14').val()=='' || $('#14').val()==null)
			{
				$('#14').parent().parent().parent().parent().css('background-color','#FF0000');
				errFlag = true;
			}
			
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
			
			
			//$('#ordercomponents').ajaxupload('start');
			
			form_details = new Array();
			fi=0;
			
			form_details[fi] = $("#order_info_form").serialize();
			fi++;
			
			form_details[fi] = $("#14").serialize();
			fi++;
			
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
				
				if(parseInt(additional_version)>1 && size_change_only!='Different Creative')
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
			
			/*
			 * Check Order Components has copied or not
			 */			
			/*
			var tmp_folder_path = $("#tmp_folder_path").val();
			//$("#ordercomponents").find( 'div[name="ax-file-name"]' ).val();
			
			file_names = new Array();	
			file_names[0] = tmp_folder_path;
			file_names_cnt = 1;
			
			$('div[class="ax-file-name"]').each(function(){				
				file_names[file_names_cnt++] = $(this).html();				
			});
			
			$.ajax({
		        data: tmp_folder_path,
		        data: "files="+file_names,	
		        type: "post",
		        url: "/orders/checkfilescopystatus",
		        success: function(jsondata) {
					alert(jsondata.length);
				},
				error: function(errorThrown) {
					alert("failed");
				}
		    });			
			return false;
			*/
			
			order_type_field = "Order Type";		
			
			for(ot=0;ot<order_type.length;ot++)
			{
				formdetails =  formdetails + '&' + order_type_field+'['+ot+']'+'='+order_type[ot];
			}	
			
			form_components_details = $("#ordercomponents").find('input').serialize();
			
			formdetails =  formdetails + '&' + form_components_details;
			
			if($('#order_info_form').find('#Jobno').val()!='')
			{
				$("#msgbox_text").html("<div>Updating Order...<img src='/images/transparent_loading.gif' style='vertical-align:middle;' /></div>");
			}
			else
			{
				$("#msgbox_text").html("<div>Saving Order...<img src='/images/transparent_loading.gif' style='vertical-align:middle;' /></div>");
			}
			
			formdetails =  formdetails + '&' + 'order_action=Save';
			
			
			$("#msgbox").fadeIn('fast',function(){
				$("#msgbox").css('display','table');
			});
			
			checkSessionActive();
			
			if(fileUploadCount==0)
			{
				$.post('/orders/submit',formdetails,function(data1){
					//$.post('/orders/confirm',{'jobno':jobno},function(data1) {
					$("#msgbox").fadeOut('fast');
					//$('.orderform-box').fadeOut('slow');
					
					//$('.inp-text1').trigger('click');

					jobno_details = data1.split('/~/');	
					$('#order_info_form [name="order_number"]').val(jobno_details[0]);
					
					jobno_html = '<div class="m-block t-right"><label>Job no</label></div>';
					jobno_html += '<div class="m-block2"><span style=\'font-size:18px;color:#fff;\'>'+jobno_details[0]+'</span></div></div>';
						
					$('#order_info_form div').first().html(jobno_html);
					
					
					
					//jobno_details = data1.split('/~/');	
					//$('#Jobno').val(jobno_details[0]);
					//$('#confirmOrder').html(jobno_details[1]);
					//$('#confirmOrder').fadeIn('slow');
					//callForConfirmSubmit();
					//});				
				});
			}
			else
			{
				$("#msgbox_text").html("<div>Waiting for File Upload to complete...<img src='/images/transparent_loading.gif' style='vertical-align:middle;' /></div>");
					$("#msgbox").fadeIn('fast',function(){
						$("#msgbox").css('display','table');
					});
				jobSave = 1;	
				
			}
		});
		
	};
	
	
	
	function callForConfirmSubmit()
	{
		$("#confirmSubmit").click(function(){
			 var trackno=$("#tracking_no").val();
			 var confirmtrackno = $("#confirm_tracking_no").val();
			 if (trackno==confirmtrackno)
				 {
					 $("#cnf_err_msg").html("");
					 checkSessionActive();
					 $.post('/orders/confirmsubmit',$("#order_confirm_form").serialize(),function(data) {
						 $('#main_body').html("");	
						 loadOrderList();
					 });
				 
				 }
			 else
				 {
				 $("#cnf_err_msg").html("Order number you have given is not matched...");
				 }
		});
		
		//ord_form
		
		$("#editForm").click(function(){
			$('#confirmOrder').fadeOut('slow');
			$('.orderform-box').fadeIn('slow');			
		});
		
	}
	
	function showordercomponents(track_jobno)
	{		
		$.ajax({
			 url: "/orders/fetchordercomponents",
			 dataType: "json",
			 data: {					 
				 track_jobno: track_jobno,
				 tmp_path : $('#tmp_folder_path').val()
			 },
			 success: function( data ) {
				 	
				// data = $.parseJSON(data.input);			
				// alert(data);
				 
				 $('.ax-file-list li').remove();
				 
				 var options = eval(data.OrderFiles);
					
					var length = options.length;
					
					for(var j = 0; j < length; j++)
					{
						//alert(options[j].file+'---'+options[j].file_rel_path);
						
							fname = options[j].file;

							assoc_types = options[j].associated_types;
							
							comments = options[j].comments;
							
							filepath = options[j].file_rel_path;

							assoc_types = assoc_types.split(',');
							
							filesize = '';
							//$.post('/orders/fetchfilesize',{'filepath':filepath}, function(data){				
							//	filesize = data;
							//});
							
							filelist_obj = $(".ax-file-list");

							li_obj = $("<li title='"+fname+"' class='progress-cont' />").appendTo(filelist_obj);	

							progress_left_div_obj = $('<div/>');
							progress_left_div_obj.attr('class','progress-left-col');
							progress_left_div_obj.html('<img width="15" height="34" src="/images/progress-left-bg.png" />');		
							li_obj.append(progress_left_div_obj);

							ax_details_div_obj = $('<div/>');
							ax_details_div_obj.attr('class','ax-details');
							ax_details_div_obj.attr('title',fname);

							order_type_div_obj = $('<div/>');
							order_type_div_obj.attr('class','single-column');							
							
							order_type_ul_obj = $('<ul/>');
							order_type_ul_obj.attr('id','n-order-sprite');					
							
							for(var i=0;i<assoc_types.length;i++)
							{			
								ord_type = assoc_types[i];

								if(ord_type=='Digital')
								{
									ord_type = 'Web';
								}
								else
								{
									ord_type = ord_type;
								}
								
								order_type_li_obj = $('<li/>');
								order_type_li_html = '<input type="checkbox" style="display:none;" checked="checked" value="'+ord_type+'" name="order_components['+fname+'][]" id="'+ord_type+'">';
								order_type_li_html += '<a href="#" onclick="" class="o-'+ord_type+'-active">'+ord_type+'</a>';	// id="o-'+ord_type+'" rel="order_type" class="o-'+ord_type+'-active"
								order_type_li_obj.html(order_type_li_html);
								order_type_li_obj.appendTo(order_type_ul_obj);							
							}	
							
							order_type_div_obj.append(order_type_ul_obj);
							ax_details_div_obj.append(order_type_div_obj);	

							ax_filename_div_obj = $('<div/>');
							ax_filename_div_obj.attr('class','ax-file-name two-column attache-txt-field');
							ax_filename_div_obj.html(fname);
							ax_details_div_obj.append(ax_filename_div_obj);	

							ax_filesize_div_obj = $('<div/>');
							ax_filesize_div_obj.attr('class','ax-file-size');
							ax_filesize_div_obj.html(filesize);
							ax_details_div_obj.append(ax_filesize_div_obj);

							instr_div_obj = $('<div/>');
							instr_div_obj.attr('class','single-column');
							inp_html = '<input type="text" name="fileinstr['+fname+']" value="'+comments+'" class="o-input-s" style="margin-top:2px;" placeholder="instructions"><input type="hidden" name="pickup_files_path['+fname+']" value="'+filepath+'" class="o-input-s" style="margin-top:2px;" placeholder="pickup_files_path">';
							instr_div_obj.html(inp_html);
							ax_details_div_obj.append(instr_div_obj);

							progressbar_div_obj = $('<div/>');
							progressbar_div_obj.attr('class','ax-progress');
							prog_html = '<div style="width: 100%;">&nbsp;</div>';
							progressbar_div_obj.html(prog_html);
							ax_details_div_obj.append(progressbar_div_obj);


							ax_filename_div_obj = $('<div/>');
							ax_filename_div_obj.attr('class','ax-toolbar');
							ax_filename_div_obj.html('<a title="" class="ax-remove DeleteExistingFile"><span class="ax-clear-icon"><img src="/images/delete-icon.png"></span></a>');
							ax_details_div_obj.append(ax_filename_div_obj);
							
							
							li_obj.append(ax_details_div_obj);	

							progress_right_div_obj = $('<div/>');
							progress_right_div_obj.attr('style','float:left');
							progress_right_div_obj.html('<img width="15" height="34" src="/images/progress-right-bg.png">');
							li_obj.append(progress_right_div_obj);
						
					}
					
					$('.DeleteExistingFile').click(function(e) {		

						ax_details = $(this).parent().parent();
						
				    	ax_details.parent().remove();
					});
			 }
		 });
	}
	function selectedSpec(){
				
		var selectedProductSpec = new Object();
		
		/*selectedProductSpec.Print = new Object();
		selectedProductSpec.Web = new Object();
		selectedProductSpec.Mobile = new Object();
		
		selectedProductSpec.Print.Product = new Object();
		selectedProductSpec.Web.Product = new Object();
		selectedProductSpec.Mobile.Product = new Object();
		
		selectedProductSpec.Print.Type = new Object();
		selectedProductSpec.Web.Type = new Object();
		selectedProductSpec.Mobile.Type = new Object();
		
		selectedProductSpec.Web.OutputType = new Object();*/
		
		
		$("input[name='Order Type']:checked").each(function(){
				var ordtype = $(this).val();
					
				if(ordtype=="Print"){
					selectedProductSpec.Print = new Object();
					selectedProductSpec.Print.Product = new Object();
					selectedProductSpec.Print.Type = new Object();
					version = 0;
					$('#order_spec_form_'+ordtype).find('[name="Product"]').each(function(){
						eval('selectedProductSpec.'+ordtype+'.Product.v'+(version) +'= "' + $(this).val()+'"');
						version++;
					});
					
					version = 0;
					$('#order_spec_form_'+ordtype).find('[name="Type"]').each(function(){
						eval('selectedProductSpec.'+ordtype+'.Type.v'+(version) +' = "' + $(this).val()+'"');
						version++;
					});
					
					var version = $('#order_spec_form_'+ordtype).find('[name="Additional Versions"] option:selected').val();
					
					for(i=1;i<=version;i++)
					{
						var val = $('#order_spec_form_'+ordtype).find('[name="Product_'+i+'"] option:selected').val();
						
						eval('selectedProductSpec.'+ordtype+'.Product.v'+(i) +' = "' + val +'"');
						
						var val = $('#order_spec_form_'+ordtype).find('[name="Type_'+i+'"] option:selected').val();
						
						eval('selectedProductSpec.'+ordtype+'.Type.v'+(i) +' = "' + val +'"');
						
					}
					
					
				}else if(ordtype=="Web"){
					selectedProductSpec.Web = new Object();
					selectedProductSpec.Web.Product = new Object();
					selectedProductSpec.Web.OutputType = new Object();
					selectedProductSpec.Web.Type = new Object();
					
					version = 0;
					$('#order_spec_form_'+ordtype).find('[name="Product"]').each(function(){
						eval('selectedProductSpec.'+ordtype+'.Product.v'+(version) +'= "' + $(this).val()+'"');
						version++;
					});
					
					version = 0;
					$('#order_spec_form_'+ordtype).find('[name="Type"]').each(function(){
						eval('selectedProductSpec.'+ordtype+'.Type.v'+(version) +' = "' + $(this).val()+'"');
						version++;
					});
					version = 0;
					$('#order_spec_form_'+ordtype).find('[name="Output Type"]').each(function(){
						eval('selectedProductSpec.'+ordtype+'.OutputType.v'+(version) +' = "' + $(this).val()+'"');
						version++;
					});
					
					var version = $('#order_spec_form_'+ordtype).find('[name="Additional Versions"] option:selected').val();
					
					for(i=1;i<=version;i++)
					{
						var val = $('#order_spec_form_'+ordtype).find('[name="Product_'+i+'"] option:selected').val();
						
						eval('selectedProductSpec.'+ordtype+'.Product.v'+(i) +' = "' + val +'"');
						
						var val = $('#order_spec_form_'+ordtype).find('[name="Type_'+i+'"] option:selected').val();
						
						eval('selectedProductSpec.'+ordtype+'.Type.v'+(i) +' = "' + val +'"');
						
						var val = $('#order_spec_form_'+ordtype).find('[name="OutputType_'+i+'"] option:selected').val();
						
						eval('selectedProductSpec.'+ordtype+'.OutputType.v'+(i) +' = "' + val +'"');
						
					}
					
				}else if(ordtype=="Mobile"){
					selectedProductSpec.Mobile = new Object();
					selectedProductSpec.Mobile.Product = new Object();
					selectedProductSpec.Mobile.OutputType = new Object();
					selectedProductSpec.Mobile.Type = new Object();
					version = 0;
					$('#order_spec_form_'+ordtype).find('[name="Product"]').each(function(){
						eval('selectedProductSpec.'+ordtype+'.Product.v'+(version) +'= "' + $(this).val()+'"');
						version++;
					});
					
					version = 0;
					$('#order_spec_form_'+ordtype).find('[name="Type"]').each(function(){
						eval('selectedProductSpec.'+ordtype+'.Type.v'+(version) +' = "' + $(this).val()+'"');
						version++;
					});
					version = 0;
					$('#order_spec_form_'+ordtype).find('[name="Output Type"]').each(function(){
						eval('selectedProductSpec.'+ordtype+'.OutputType.v'+(version) +' = "' + $(this).val()+'"');
						version++;
					});
					
					var version = $('#order_spec_form_'+ordtype).find('[name="Additional Versions"] option:selected').val();
					
					for(i=1;i<=version;i++)
					{
						var val = $('#order_spec_form_'+ordtype).find('[name="Product_'+i+'"] option:selected').val();
						
						eval('selectedProductSpec.'+ordtype+'.Product.v'+(i) +' = "' + val +'"');
						
						var val = $('#order_spec_form_'+ordtype).find('[name="Type_'+i+'"] option:selected').val();
						
						eval('selectedProductSpec.'+ordtype+'.Type.v'+(i) +' = "' + val +'"');
						
						var val = $('#order_spec_form_'+ordtype).find('[name="OutputType_'+i+'"] option:selected').val();
						
						eval('selectedProductSpec.'+ordtype+'.OutputType.v'+(i) +' = "' + val +'"');
						
					}
				}
								
		});
				
		var r2 = JSON.stringify(selectedProductSpec);
		
		return r2;
	}
})(jQuery);
