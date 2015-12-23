/**
 * cust_select_plugin.js
 * Copyright (c) 2010 myPocket technologies (www.mypocket-technologies.com)
 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:

 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.

 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.

 * @author Darren Mason (djmason9@gmail.com)
 * @date 5/13/2009
 * @projectDescription Replaces the standard HTML form selectbox with a custom looking selectbox. Allows for disable, multiselect, scrolling, and very customizable.
 * @version 2.1.4
 * 
 * @requires jquery.js (tested with 1.3.2)
 * 
 * @param isscrolling: 		false,				//scrolls long lists
 * @param scrollminitems:	15,					//items before scrolling
 * @param scrollheight:		150,				//height of scrolling window
 * @param preopenselect:	true,				//opens prechecked select boxes
 * @param hoverstyle:		"hover",			//css hover style name
 * @param openspeed:		"normal",			//selectbox open speed "slow","normal","fast" or numbers 1000
 * @param alldisabled:		false,				//disables all the selectbox
 * @param selectwidth:		"auto",				//set width of selectbox
 * @param wrappername:		".select_wrap"		//class name of the wrapper tag
*/
(function(jQuery) {

	jQuery.fn.custSelectBox3 = function(options){
		
		//css names
		var classselectbox = "selectbox2";
		var selectbox = "." + classselectbox;
		var selectboxoptions_wrap = ".selectbox2options_wrap";
		var hideitem = "hideitem";
		var classselected = "selected";
		var classselectboxopen = "selectbox2open";
		var classselectboxfoot = "selectbox2foot";
		var selectboxfoot = "." + classselectboxfoot;
		var elmValue = ".elmValue";
		
		var defaults = {
				isscrolling: 	true,				//scrolls long lists
				scrollminitems:	5,					//items before scrolling
				scrollheight:	150,				//height of scrolling window
				preopenselect:	true,				//opens prechecked select boxes
				hoverstyle:		"hover",			//css hover style name
				openspeed:		"fast",			//selectbox open speed "slow","normal","fast" or numbers 1000
				alldisabled:	false,				//disables the selectbox
				selectwidth:	"auto",				//set width of selectbox
				wrappername:	".select_wrap2"
			};
		
		//override defaults
		var opts = jQuery.extend(defaults, options);

		return this.each(function() {
			
		p_obj = $(this).parent();
		
		s_name = p_obj.find('select').attr('name');
					
		onchange_call_back = p_obj.find('select').attr('onchange');	
		
		/** FUNCTIONS **/
		jQuery.fn.disable = function(thisElm){
			//loop through items
			for(var i=0;i<jQuery(thisElm).find("ul").find("li").length;i++)
			{
				if(jQuery(jQuery(thisElm).find("ul").find("li").get(i)).hasClass(classselected))
				{
					jQuery(jQuery(thisElm).find("ul").find("li").get(i)).addClass("selected_disable");
				}
				jQuery(jQuery(thisElm).find("ul").find("li").get(i)).unbind();
				jQuery(jQuery(thisElm).find("ul").get(i)).find("input").attr("disabled","disabled");
			}				
		};
	
		//adds form elements to the selectbox
		jQuery.fn.addformelms = function(thisElm){
				var currElm = jQuery(thisElm);
				var boxtype = jQuery(thisElm).find(selectboxoptions_wrap+ " ul").attr("class");
				//alert(boxtype);
				//alert(jQuery(thisElm).attr('class'));
				if(boxtype.indexOf("selectbox2options_radio") >-1)
				{
					var radioVal = jQuery(currElm).find("."+classselected+" span").text();
					jQuery(currElm).find(selectboxoptions_wrap).append("<input type=\"hidden\" id=\""+jQuery(main_currElm).attr("id")+"\" name=\""+jQuery(main_currElm).attr("name")+"\" value=\""+radioVal+"\">");
				}
				else
				{
					for(var i=0;i<jQuery(currElm).find(selectboxoptions_wrap + " li").length;i++)
					{
						var currInnerElm = jQuery(currElm).find(selectboxoptions_wrap + " li").get(i);
						jQuery(currInnerElm).append("<input type=\"hidden\" id=\""+jQuery(main_currElm).attr("id") +"_"+ i+"\" name=\""+jQuery(main_currElm).attr("name") +"["+i+"]\" tooltip=\""+jQuery(main_currElm).attr("tooltip")+"\" value=\"\">");
						
						if(jQuery(currInnerElm).hasClass(classselected))
						{
							var checkVal = jQuery(currInnerElm).find("span").text();
							jQuery(jQuery(currElm).find(selectboxoptions_wrap + " li").get(i)).find("input").val(checkVal);
						}
					}
				}
		};
		
		//opens selectboxs if they have pre selected options
		jQuery.fn.openSelectBoxsThatArePrePopulated = function(currElm)
		{
				var boxtype = jQuery(currElm).find(selectboxoptions_wrap+ " ul").attr("class");
				
				if(jQuery(selectbox).parent().find("." +boxtype).find("li").hasClass(classselected))
				{
					//jQuery(selectbox).addClass(classselectboxopen);
					//jQuery(selectbox).parent().find(selectboxoptions_wrap).slideUp("normal");
					//jQuery(selectbox).parent().find("." +boxtype).find("li");
					//jQuery(selectbox).parent().find("." +boxtype).find("li");	
				}
		};
		
		jQuery.fn.scrolling = function (theElm, isOpen)
		{
			if(isOpen)
			{
				if(jQuery(theElm).parent().find(selectboxoptions_wrap+ " ul li").length >= opts.scrollminitems){
					jQuery(theElm).parent().find(selectboxoptions_wrap+ " ul").css("height",opts.scrollheight).addClass("setScroll");
				}
			}
			else{
				//jQuery(theElm).parent().find(selectboxoptions_wrap+ " ul").css("height","auto").removeClass("setScroll");
			}
		};
		/** FUNCTIONS **/
		
		//BUILD HTML TO CREATE CUSTOM SELECT BOX
		var main_currElm = jQuery(this);
		var wrapperElm = jQuery(main_currElm).parent();
		var name = "";
		var select_options = jQuery(main_currElm).find("option");
		var opts_str="";
		var isDisabled = jQuery(main_currElm).attr("disabled");
		var isMulti = jQuery(main_currElm).attr("multiple");
		var boxtype = "selectbox2options_radio";
		var disabled = "";
		
		if(isMulti){boxtype = "selectbox2options_check";}
		if(isDisabled){disabled="disabled";}
		//loop through options
		selectbox_name = $(this).attr('name'); 
		
		tooltip = $(this).attr('tooltip');
		//alert(selectbox_name+' -- '+tooltip);
		
		for(var i=0;i<select_options.length;i++)
		{
			var checked="";
			var currOption = jQuery(select_options).get(i);
			
			if(i===0 && !isMulti){
				name = jQuery(currOption).text();
			}
			else if(i==0 && isMulti)
			{
				name = $(this).parent().prev().html();
			}
			
			//else
			//{
				if(jQuery(currOption).attr("selected"))
				{
					name = jQuery(currOption).val();
					checked ="selected";
				}				

				opts_str = opts_str + "<li class=\""+checked +" "+disabled+"\"><span class=\"elmValue\">"+jQuery(currOption).val()+"</span>"+jQuery(currOption).text()+"</li>";
			//}
		}
		
		wrapper_html = "<div class=\"selectbox2\" id=\""+selectbox_name+"_selectbox\">";
		if(tooltip=='' && tooltip=='undefined'){
			wrapper_html = wrapper_html + " <ul> ";
		}			
		else{
			wrapper_html = wrapper_html + " <ul title=\""+tooltip+"\"> ";
		}
		
		if(name=='--Select--')
		{
			name = selectbox_name;
		}
		
		disp_text = name;
		title_text = '';
		
		if(name.length>42)
		{
			disp_text = name.substr(0,42)+'...';
			
			title_text = name;
		}
		
		wrapper_html = wrapper_html + " <li id=\""+selectbox_name+"_selected\" title=\""+title_text+"\" "; 
		if(name == selectbox_name)
		{
			wrapper_html = wrapper_html + " class=\"select_grey_out\" ";
		}
		wrapper_html = wrapper_html + " >"+disp_text+"</li> ";
		
		wrapper_html = wrapper_html + " </ul> ";
		wrapper_html = wrapper_html + " </div> ";
		wrapper_html = wrapper_html + " <div class=\"selectbox2options_wrap\" ";
		wrapper_html = wrapper_html + " parent=\""+jQuery(main_currElm).parent().attr('parent')+"\" ";
		wrapper_html = wrapper_html + " parent_value=\""+jQuery(main_currElm).parent().attr('parent_value')+"\" ";
		wrapper_html = wrapper_html + " order_type=\""+jQuery(main_currElm).parent().attr('order_type')+"\" ";
		wrapper_html = wrapper_html + " style=\"display:none;\"> ";
		wrapper_html = wrapper_html + " <ul class=\""+boxtype+"\">"+opts_str+"</ul> ";
		wrapper_html = wrapper_html + " </div> ";
		
		if(jQuery(wrapperElm).attr('mandatory')=='1')
		{
			wrapper_html = wrapper_html + "<div class='mandatory_field'><sup>*</sup></div>";
		}
		
		jQuery(wrapperElm).empty().html(wrapper_html);
		
		jQuery(wrapperElm).find(selectboxoptions_wrap +" ul").after("<div class=\""+classselectboxfoot+"\"><div></div></div>"); //add footer
		
		if("auto" != opts.selectwidth){
			jQuery(wrapperElm).find(selectbox + " ul").css({width:opts.selectwidth-10});
			//jQuery(wrapperElm).find(selectboxoptions_wrap + " ul").attr("class",boxtype).css({width:(opts.selectwidth+57) + "px"});
			//jQuery(wrapperElm).find(selectboxoptions_wrap + " ul").attr("class",boxtype).css({width:(opts.selectwidth) + "px"});
			jQuery(wrapperElm).find(selectboxfoot + " div").css({width:opts.selectwidth + "px"});
		}else{
			//jQuery(wrapperElm).find(selectboxoptions_wrap + " ul").attr("class",boxtype).css({width:(jQuery(wrapperElm).find(selectbox + " ul").width()+57) + "px"});
			//jQuery(wrapperElm).find(selectboxoptions_wrap + " ul").attr("class",boxtype).css({width:(jQuery(wrapperElm).find(selectbox + " ul").width()) + "px"});
			jQuery(wrapperElm).find(selectboxfoot + " div").css({width:jQuery(wrapperElm).find(selectbox + " ul").width() + "px"});
		}
		
		if(select_options.length > opts.scrollminitems)
		{
			jQuery(wrapperElm).find(selectboxoptions_wrap + " ul").css("height",opts.scrollheight).addClass("setScroll");
		}

		if(isDisabled){jQuery.fn.disable(jQuery(wrapperElm).find(selectboxoptions_wrap));}
		
		
		//alert(opts.wrappername);
		
		var thisElement = jQuery(opts.wrappername);

		//bind item clicks
		jQuery(selectboxoptions_wrap+ " ul li").unbind().click( function() {
			
			if(jQuery(this).attr("class").indexOf("disabled") < 0)
			{
				var id;
				var boxtype = jQuery(this).parent().attr("class");
				
				if(boxtype.indexOf("selectbox2options_radio") >-1)
				{
					if(!jQuery(this).hasClass(classselected))
					{
						id = jQuery(this).find(elmValue).text();
						jQuery(this).parent().find("." + classselected).removeClass(classselected);
						jQuery(this).addClass(classselected);
						jQuery(this).parent().parent().find("input").val(jQuery(this).find(elmValue).text());
						/*selected_name = jQuery(this).parent().parent().find("input").attr("name");							
						$("#"+selected_name+"_selected").html(jQuery(this).find(elmValue).text());
						$("#"+selected_name+"_selectbox").removeClass(classselectboxopen).addClass(classselectbox);
						$("#"+selected_name+"_selectbox ~ div[class='selectboxoptions_wrap']").slideUp("normal");*/
						
						inp_obj = jQuery(this).parent().parent().find("input");
						parent_name = inp_obj.attr('name');
						parent_value = inp_obj.val();
						ord_type = inp_obj.parent().attr('order_type');
						
						selected_text = jQuery(this).find(elmValue).text();
						
						if(selected_text=='--Select--')
						{
							selected_text = parent_name;
							
							if(selected_text.indexOf('_')!=-1)
							{
								selected_text = selected_text.substr(0,selected_text.lastIndexOf('_'));
							}
						}
						
						disp_text = selected_text;
						
						title_text = '';
						
						if(selected_text.length>42)
						{
							disp_text = selected_text.substr(0,42)+'...';
							
							title_text=selected_text;
						}
						
						jQuery(this).parent().parent().prev().find('li').html(disp_text);
						jQuery(this).parent().parent().prev().find('li').attr('title',title_text);
						
						
						
						if(jQuery(this).find(elmValue).text() == '--Select--')
						{
							jQuery(this).parent().parent().prev().find('li').addClass('select_grey_out');
						}
						else
						{
							jQuery(this).parent().parent().prev().find('li').removeClass('select_grey_out');
						}
						
						//jQuery(this).parent().parent().prev().find('li').html(jQuery(this).find(elmValue).text());
						jQuery(this).parent().parent().prev().removeClass(classselectboxopen).addClass(classselectbox);
						jQuery(this).parent().parent().slideUp("normal");
						
						
						
						if(onchange_call_back)
						{	
							eval(onchange_call_back);
						}
						else
						{
							$(this).onChangeCustomSelect(inp_obj,parent_name,parent_value,ord_type);
						}
					}
					else
					{
						/*jQuery(this).parent().find("." + classselected).removeClass(classselected);
						jQuery(this).parent().parent().find("input").val("");
						selected_name = jQuery(this).parent().parent().find("input").attr("name");							
						jQuery(this).parent().parent().prev().html('--Select--');
						//$("#"+selected_name+"_selectbox").trigger('click');*/
						jQuery(this).parent().parent().prev().removeClass(classselectboxopen).addClass(classselectbox);
						jQuery(this).parent().parent().slideUp("normal");
					}
				}
				else //checkbox
				{
					if(jQuery(this).hasClass(classselected))
					{
						//turn off the checkbox
						jQuery(this).removeClass(classselected);
						//blank out the value
						jQuery(this).find("input").val("");
						selected_name = jQuery(this).parent().parent().find("input").attr("name");					
						$("#"+selected_name+"_selectbox").trigger('click');
						$("#"+selected_name+"_selectbox ~ div[class='selectbox2options_wrap']").css({'display':'none'});
					}
					else
					{
						//gets the value of the element
						id = jQuery(this).find(elmValue).text();	
						jQuery(this).addClass(classselected);						
						jQuery(this).find("input").val(id);
						selected_name = jQuery(this).parent().parent().find("input").attr("name");							
						
						$("#"+selected_name+"_selectbox").trigger('click');
						$("#"+selected_name+"_selectbox ~ div[class='selectbox2options_wrap']").css({'display':'none'});
					}
				}
			}
		}).hover(function(){
			jQuery(this).addClass(opts.hoverstyle);
		},function(){
			jQuery(this).removeClass(opts.hoverstyle);
		});

		//alert(jQuery(thisElement).attr('class'));
		
		//bind sliding open
		jQuery(thisElement).find(selectbox).unbind().toggle(
				
			function() {				
				if(opts.isscrolling){jQuery.fn.scrolling(jQuery(this),true);}
				//unhide li
				jQuery(this).parent().find(selectboxoptions_wrap+ " ul li").removeClass(hideitem);
				//makes the arrow go up or down
				jQuery(this).removeClass(classselectbox).addClass(classselectboxopen);
				//slides the options down
				jQuery(this).parent().find(selectboxoptions_wrap).slideDown(opts.openspeed);
				
				jQuery(this).parent().unbind().mouseleave(function(s_name){					
					jQuery(this).find(selectboxoptions_wrap).slideUp("normal");			
					jQuery(this).find("div[class='selectbox2open']").removeClass(classselectboxopen).addClass(classselectbox);
					
					//jQuery(this).find(selectbox).trigger('click');
					jQuery(this).unbind();
				});
			},
			function() {
				
				var boxtype = jQuery(this).parent().find(selectboxoptions_wrap+ " ul").attr("class");
				if(jQuery(this).parent().find(selectboxoptions_wrap+ " ul li").hasClass(classselected))
				{
					jQuery(this).parent().find(selectboxoptions_wrap+ " ul li").addClass(hideitem);
					jQuery(this).parent().find(selectboxoptions_wrap).css({'display':'none'});
				}	
				else
				{
					//makes the arrows go up or down
					jQuery(this).removeClass(classselectboxopen).addClass(classselectbox);
					//slides the options up
					jQuery(this).parent().find(selectboxoptions_wrap).slideUp("normal");					
				}
				
				if(opts.isscrolling){jQuery.fn.scrolling(jQuery(this),false);}
			});
		
			jQuery.fn.addformelms(jQuery(wrapperElm));
			if(opts.preopenselect){ jQuery.fn.openSelectBoxsThatArePrePopulated(jQuery(wrapperElm));}
			if(opts.alldisabled){jQuery.fn.disable(jQuery(thisElement));}
			
			
		});
		
		
		
	};
	
	
	
	
})(jQuery);