(function(jQuery) {

	jQuery.fn.mySelectBox = function(options){
		var classCustomSelect = "customSelect";
		var classCustomDataRef = "custRef";
		var classCustomContainer = "selectContainer";
		
		
		return this.each(function(){
			
			if($(this).find('.'+classCustomDataRef).length==0){
			//Create Display Reference Div
			
			custRef = $('<div/>');
			custRef.attr('class',classCustomDataRef);
			
			//Create Select Container
			selectContainer = $('<div/>');
			selectContainer.attr('class',classCustomContainer);
			
			nanoContainer = $('<div/>');
			nanoContainer.addClass('cont');
			
			selectBox = $(this).find('select');
			
			selected_val = selectBox.val();
			
			if(selectBox.attr('multiple')===undefined)
			{
				if(selected_val=="--Select--")
				{
					name = selectBox.attr('name');
					//name = name.replace('_',' ');
					name = name.replace(/_/g," ");
					custRef.html(name);
					custRef.addClass('select_grey_out');
				}
				else
				{
					if(selectBox.attr('name')=='time')
                                        {
                                                var n = selectBox.find('option[selected]').html();
                                                custRef.html(n);
                                        }
                                        else
                                        {
						custRef.html(selectBox.val());
					}

					custRef.removeClass('select_grey_out');
				}
			}
			else
			{
				name = selectBox.attr('name');
				name_arr = name.split('[');
				name = name_arr[0].replace('_',' ');
				custRef.html(name);		
				custRef.addClass('select_grey_out');
			}
			
			classNanoContent = $('<div/>');
			classNanoContent.attr('class','content');
						
			selectContainer.append(nanoContainer);
			
			nanoContainer.append(classNanoContent);
			
			classNanoContent.append(selectBox);
			
			
			
			$(this).append(custRef);
			$(this).append(selectContainer);
			
			var options = selectBox.find('option');	
			var size = options.length;
			selectBox.attr("size",'12');
			
			selectBox.change(function(){
				
				if($(this).attr('multiple')===undefined)
				{
					name = $(this).val();
					if(name=='--Select--')
					{
						name = $(this).attr('name');
						name = name.replace('_',' ');
						$(this).parent().parent().parent().prev().addClass('select_grey_out');
					}
					else
					{
						$(this).parent().parent().parent().prev().removeClass('select_grey_out');
					}
					
					if($(this).attr('name')=='time')
					{
						var n = $(this).find('option[selected]').html();
						$(this).parent().parent().parent().prev().html(n);
					}
					else
					{
						$(this).parent().parent().parent().prev().html(name);				
					}
					
					$(this).parent().parent().parent().hide();
				}
			});
			
			var sum=0;
			$(this).each( function(){ 
				//sum = $(this).width(); 
				//$(this).find('.selectContainer').width(sum -=2);
				//$(this).find('select').width(sum +=20);
			});
			
			custRef.click(function(){
				if(!$(this).next().is('visible'))
				{
					$(this).css('z-index','8');
					$(this).next().show('fast',function(){
						$(this).find('select').focus();
						$(this).find('select').trigger('click');
						if($(this).parent().width()<$(this).find('select').width())
						{
							$(this).css({width:($(this).find('select').width()+12)+'px'});
						}
						else
						{
							$(this).find('select').css({width:($(this).parent().width()+'px')});
						}
						
						//$(this).find('select').css({'height':'182px'});
						$(this).find('.cont').css({'margin-top':'10px','height':'182px'});
						//$(this).find('.nano').nanoScroller({preventPageScrolling:true});						
						
					});
				}
				else
				{
					$(this).next().hide();
				}
			});
			
			custRef.hover(
					function(){
						$(this).toggleClass('H');
					}
				);
			
			selectBox.blur(function(){				
				$(this).parent().parent().parent().hide();				
			});
			};	
		});
	};
})(jQuery);
