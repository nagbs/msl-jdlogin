(function(jQuery) {
	var j;
	jQuery.fn.showjobs = function(i){
		$("div[class='content-left-box']").each(function(){
			if($(this).css("display") == 'none')
			{
				$(this).fadeIn(300,function(){
					i--;
					if(i>=0)
					{
						$(this).attr({'style':''});
						clearTimeout(j);
						j = setTimeout('$(this).showjobs('+i+')',100);
					}
					
					if(i<=0)
					{
						$("#isloading").val("false");
					}
					//alert(i+'-'+$("#isloading").val());
				});			
				//$(this).show(500);
				return false;
			}
		});
		
	};
})(jQuery);


(function(jQuery) {
	var j;
	jQuery.fn.showmsg = function(i){
		$("div[class='content-left-box-msg']").each(function(){
			if($(this).css("display") == 'none')
			{
				$(this).fadeIn(300,function(){
					i--;
					if(i>=0)
					{
						$(this).attr({'style':''});
						clearTimeout(j);
						j = setTimeout('$(this).showmsg('+i+')',100);
					}
					
					if(i<=0)
					{
						$("#isloadingmsg").val("false");
					}
					//alert(i+'-'+$("#isloading").val());
				});			
				//$(this).show(500);
				return false;
			}
		});
		
	};
})(jQuery);