$(document).ready(function(){
	/** This section is used to hide Alll popup */
	$("#popup").hide();
	$("#dialog-canceljob").hide();
	$("#dialog-changeowner").hide();
	$("#dialog-accept").hide();
	$("#dialog-feedback").hide();
	$("#dialog-emailproof").hide();
	
	var loadPageDiv = $('<div/>');
	loadPageDiv.attr('id','loadPage');
	win_width = $(document).width();
	wwidth = (win_width/2)-50;
	loadPageDiv.attr('style','position:fixed;top:0px;left:'+wwidth+'px;background-color:yellow;font-size:18px;font-weight:bold;');
	$("#main_body").append(loadPageDiv);
	
	/** End */
	//hiding module in index.html

	/** Added By Kishore Aditani This section is used for dashboard functionality.**/
	/*addOddEven();
	box_hover("box","black-bg");
	closeBox();
	dashboardRefresh();
	startDashboardRefresh();*/
	
	/** END **/

	//display create job when clicked on create job icon in header right
	$(".icon311 img").click(function(){
		$(".module5").fadeIn("slow");
	});

	//filter dropdown links when clicked
	$("#filter-drop-container li").click(function(){
		var nameattr = $(this).attr("name");		
		$("."+nameattr).fadeIn("slow");
	});

	//landing page hover on blocks
	$(".landmodulecontainer").hover(function(){
		$(".landmodulecontainer").removeClass("module-act");
		$(this).addClass("module-act");
	});

	// Dash-board button Drag able
	$(".inp-text").draggable({
		containment: '.inp',
		cursor: 'move',
		stop: function()
		{
			var pos = $(".ui-draggable").position();
			var widthinp = $(".inp").width();
			var divdes = widthinp/2;
			leftmoved = pos.left;
			rightmoved = pos.right;
			//alert(leftmoved+'-'+divdes+'-'+rightmoved);
			
			showProgress();
			if(leftmoved>divdes/2)
			{
				//alert("right");
				//window.location="search.html";
				/** This is used to change selection and position */
				$(".ui-draggable").css({left : divdes+35+'px'});
				$("#dragHandle").html("ACTIVE JOBS");
				/**
				 * Function (loadOrderList) is used to load OrderList 
				 * This function is defined in actionMenu.js
				*/
				loadOrderList();
				stopDashboardRefresh();
			}
			else if(leftmoved<divdes/2)
			{
				//alert("left");
				//window.location="index.html";
				$(".ui-draggable").css({left : 0+'px'});
				$("#dragHandle").html("DASHBOARD");
				
				checkSessionActive();
				$.post('/view/dashboard', function(data) {
					  hideProgress();
					  $('#main_body').html(data);
				});
			}
		} 
	});
	
	$(".inp-text_1").click(function(){
		
			var pos = $(".ui-draggable").position();
			var widthinp = $(".inp").width();
			var divdes = widthinp/2;
			leftmoved = pos.left;
			rightmoved = pos.right;
			
			showProgress();
			$(".ui-draggable").css({left : 0+'px'});
			$("#dragHandle").html("DASHBOARD");
			
			checkSessionActive();
			$.post('/view/dashboard', function(data) {
				  hideProgress();
				  $('#main_body').html(data);
			});	 
	});
	
	$(".inp-text1").click(function(){
		
		var pos = $(".ui-draggable").position();
		var widthinp = $(".inp").width();
		var divdes = widthinp/2;
		leftmoved = pos.left;
		rightmoved = pos.right;
		
		/** This is used to change selection and position */
		$(".ui-draggable").css({left : divdes+35+'px'});
		$("#dragHandle").html("ACTIVE JOBS");
		/**
		 * Function (loadOrderList) is used to load OrderList 
		 * This function is defined in actionMenu.js
		*/
		showProgress();
		loadOrderList();
		stopDashboardRefresh();	 
	});
	
showProgress=function()
{
	$('#progress_loading').css('display:table');
	$('#progress_loading').fadeIn();
}

hideProgress=function()
{
	$('#progress_loading').fadeOut();
}

updateTime = function(clock)
{
	//alert(clock);
$("div[id='"+clock+"'] span[timeattr]").each(function(){
timeattr=$(this).attr('timeattr');
timezone_attr=timeattr.split(",");

var t=new Date();


t.setTime(t.getTime()+(t.getTimezoneOffset()*60000)+((parseInt(timezone_attr[1],10)+parseInt(timezone_attr[2],10))*60000));//the zone's time
var Dy=t.getFullYear();
var Dd=t.getDate()<10?'0'+t.getDate():t.getDate();
var Dm=t.getMonth()<10?'0'+(t.getMonth()+1):t.getMonth()+1;
var Dh=t.getHours()<10?'0'+t.getHours():t.getHours();
var Di=t.getMinutes()<10?'0'+t.getMinutes():t.getMinutes();
var Ds=t.getSeconds()<10?'0'+t.getSeconds():t.getSeconds();

$(this).html(timezone_attr[0] + ' ' + Dh+':'+Di);

});
}
var clockTimer = '';
$(".clock-arrow").click(function(){
	
	clock = "clock-int";
	
	show_clock = 'clock-int';
	hide_clock = "clock-exp";

	if($("#clock-int").css('display')=='none')
	{
		clock = "clock-int";
		
		show_clock = 'clock-int';
		hide_clock = "clock-exp";
	}
	else
	{
		clock = "clock-exp";
		
		hide_clock = 'clock-int';
		show_clock = "clock-exp";
	}
	
	$('#'+hide_clock).fadeOut(function(){
		updateTime(hide_clock);	  
	});
	
	$('#'+show_clock).fadeIn(function(){
		updateTime(show_clock);
	 
	});
	
	
	
	clearTimeout(clockTimer);
	clockTimer = setInterval('updateTime("'+clock+'");',10000);
	
});

$("#clock-int").show('slow',function(){
	    updateTime('clock-int');
		clearTimeout(clockTimer);		
		clockTimer = setInterval('updateTime("clock-int");',10000);
});


$('#createjob').click(function(){
	checkSessionActive();
	stopDashboardRefresh();
	$.post('/orders/create',function(data){
		$('.container').hide('slow');
	/*	$('#dashboard').hide('slow');
		$('#orderlist').hide('slow');
		$('#order_details').hide('slow');
		$('#order_form').html(data);
		$('#order_form').show('slow');
	*/
		$('.search-container').slideUp(300);
		$('#main_body').html('');
		$('#main_body').html(data);
		$('#main_body').show('slow');
		
		var pos = $(".ui-draggable").position();
		var widthinp = $(".inp").width();
		
		var slider_width = $(".ui-draggable").width();
		var setpos = widthinp/2 - slider_width/2;
		
		$(".ui-draggable").animate({left : setpos+'px'},100,function(){
			$("#dragHandle").html("CREATE JOB");
		});
		
	});
});

$('#createmagazine').click(function(){
	checkSessionActive();
	stopDashboardRefresh();
	$.post('/magazines/createmagazine',function(data){
		$('.container').hide('slow');
		
		$('.search-container').slideUp(300);
		$('#main_body').html('');
		$('#main_body').html(data);
		$('#main_body').show('slow');
		
		var pos = $(".ui-draggable").position();
		var widthinp = $(".inp").width();
		
		var slider_width = $(".ui-draggable").width();
		var setpos = widthinp/2 - slider_width/2;
		
		$(".ui-draggable").animate({left : setpos+'px'},100,function(){
			$("#dragHandle").html("CREATE JOB");
		});
		
	});
});


$('#myacc').click(function(){
	stopDashboardRefresh();
	
	checkSessionActive();
	$.post('/profile/myaccount',function(data){	
		
		$('#main_body').html('');
		$('#main_body').html(data);
		$('#main_body').show('slow');
		
		var pos = $(".ui-draggable").position();
		var widthinp = $(".inp").width();
		
		var slider_width = $(".ui-draggable").width();
		var setpos = widthinp/2 - slider_width/2;
		
		$(".ui-draggable").animate({left : setpos+'px'},1000,function(){
			$("#dragHandle").html("MY ACCOUNT");
		});
		
	});
});

$('#help').click(function(){
	stopDashboardRefresh();
	
	
	$.post('/jdhelp/help',function(data){	
		checkSessionActive();
		$('#main_body').html('');
		$('#main_body').html(data);
		$('#main_body').show('slow');
		
		var pos = $(".ui-draggable").position();
		var widthinp = $(".inp").width();
		
		var slider_width = $(".ui-draggable").width();
		var setpos = widthinp/2 - slider_width/2;
		
		$(".ui-draggable").animate({left : setpos+'px'},1000,function(){
			$("#dragHandle").html("HELP");
		});
		
	});
});

$('.hdr_search').toggle(function(){
		$('.header .search-container').slideDown(300);
		//$('.search-box').css({opacity:0, height:0, display:'block'});
		//$('.search-box').animate({opacity:1, height:100},800);			
		},
		function(){
		
			$('.header .search-container').slideUp(300);
			//$('.search-box').css({opacity:1, height:100, display:'none'});
			//$('.search-box').animate({opacity:0, height:0},800);
		
		}
	);
	
	$('#advFilter').toggle(function(){			
			$('.filter-box').slideDown(300);
			$('#adv_search_filter').slideDown(300);
			//$('.filter-box').css({opacity:0, height:0, display:'block'});
			//$('.filter-box').animate({opacity:1, height:250},800);
				
		},
		function(){			
			$('.filter-box').slideUp(300);
			$('#adv_search_filter').slideUp(300);
			//$('.filter-box').css({opacity:1, height:250, display:'none'});
			//$('.filter-box').animate({opacity:0, height:0},800);
					
		}
	);
	
	$('.filter-box').css({'display':'none'});
	$('#adv_search_filter').css({'display':'none'});
	
	
	// Site Menu Functions
	//Hide SubLevel Menus
	$('.sitenav ul li ul').hide();
	
	var currMnuEl;
	
	//OnHover Show SubLevel Menus
	$('.sitenav1 ul li').click(
			//OnHover
			function(){
		
				currMnuEl = $(this).find('ul');
		
				//Hide Other Menus
				$('.sitenav ul li').not($('ul', this)).stop();
			
				// Show Hoved Menu
				//$('ul', this).slideDown();
				$('ul', this).fadeIn();
				
				// Hide border from first li element
				$('ul li:first-child', this).css('border-top', '0')
				
				// Hover Menu Selection
				$('a span.lcap', this).addClass("lcapselected");
				$('a span.lnktxt', this).addClass("lnktxtselected")			
				
				currMnuEl.mouseleave(function(){
					$(this).fadeOut();
				})
		
			}
	);
	
	//OnHover Show SubLevel Menus
	$('.sitenav ul li').click(
		//OnHover
		function(){
			
			currMnuEl = $(this).find('ul');
			
			//Hide Other Menus
			$('.sitenav ul li').not($('ul', this)).stop();
		
			// Show Hoved Menu
			//$('ul', this).slideDown();
			$('ul', this).fadeIn();
			
			// Hide border from first li element
			$('ul li:first-child', this).css('border-top', '0')
			
			// Hover Menu Selection
			$('a span.lcap', this).addClass("lcapselected");
			$('a span.lnktxt', this).addClass("lnktxtselected")			
			
			currMnuEl.mouseleave(function(){
				$(this).fadeOut();
			})
			
		}
	);
	
	//console.log(currMnuEl);
	
	/*jQuery.fn.onChangeSearchCustomSelect = function(obj, selected_val)
	{		
		if(obj.attr('name')=='SAVED_FILTERS')
		{
			$.post('/view/filterselect',{'filtername':selected_val},function(data){
				$('#adv_search_filter').html(data);    						    						
				$(this).searchFields();
				$('#add_search_form').trigger('submit');
			});
		}
	}*/
	
	jQuery.fn.applySearchCustomSelect = function(){
	
	$('.search-container').find(".select_field").each(function(){
		
			$(this).custSelectBox({selectwidth: 155});	
						
			
			if($('.search-container').find(".select_field").length>0)
			{
				setTimeout("$(this).applySearchCustomSelect()",10);
				return false;
			}
			
			
		});
		
	};	
	
	$('.search-container').find('.customSelect').mySelectBox();

	$(this).applySearchCustomSelect();


	$('.logodrop').click(function(){
		$('.dropdownJobBx').fadeOut();
		$('.dropdownLogoBx').fadeIn('slow',function(){
			$('.dropdownLogoBx').mouseleave(function(){
				$('.dropdownLogoBx').fadeOut('slow');
			});
			
		});
	});
	$('.createjob').click(function(){
		$('.dropdownLogoBx').fadeOut();
		$('.dropdownJobBx').fadeIn('slow',function(){
			$('.dropdownJobBx').mouseleave(function(){
				$('.dropdownJobBx').fadeOut('slow');
			});
		});
	});
	
	$('table').fadeOut('slow');
	
	$(".hdr_messages").click(function(){
		var pos = $(".ui-draggable").position();
		var widthinp = $(".inp").width();
		
		var slider_width = $(".ui-draggable").width();
		var setpos = widthinp/2 - slider_width/2;
		
		$(".ui-draggable").animate({left : setpos+'px'},1000,function(){
			$("#dragHandle").html("MESSAGES");
		});
		loadMsgList();
	});
	
	$('.hdr_analytics').unbind().click(function(){
		/*$.post('/reports/',function(data){
			$("#main_body").html('');
			$("#main_body").html(data);
		});*/
		checkSessionActive();
		$.post('/reports/',function(data){
			$('#main_body').html(data);
			$('.select_field').custSelectBox2({
				
			});
		});
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
	
	filterUpdate();
	
	$(window).bind('beforeunload',function(e){	
		if($('#dragHandle').html()=='CREATE JOB')
		{
			return "The Order has not been saved yet";
		}		
	});
	
});
