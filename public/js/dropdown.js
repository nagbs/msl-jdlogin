// set the javascript special char here to flag selected value in dropdown
var selChr = "+";
//

function notifySelect(RepSelected, flag)
{
	if (RepSelected == "click to view reps") return false;
	
	//var rep_str ="";
	select_obj = $("#Status");
	
	if(flag==0)
	{
		select_obj.find('option').each(function(){
					
			if($(this).val() != '--Select--')
			{
				var dropdownItem = $(this).html();
				
				if (dropdownItem.substring(0,1) == selChr)
				{
					$(this).html(dropdownItem.substring(1));
					$(this).attr("selected",false);
				}
			}
		});
	}
	
	select_obj.find('option').each(function()
	{
		if ($(this).val() != '--Select--')
		{
			var dropdownItem = $(this).html();
			
			if (dropdownItem == RepSelected || dropdownItem == selChr+RepSelected)
			{
				if (dropdownItem.substring(0,1) == selChr && flag!=0)
				{
					//$(this).html(RepSelected.substring(1));
					$(this).html(dropdownItem.substring(1));
					
				}
				else
				{
					$(this).html(selChr + RepSelected);
					
				}
			}			
				
			
			
			dropdownItem = $(this).html();
			if (dropdownItem.substring(0,1) == selChr)
			{
				//rep_str = rep_str + $(this).val() + ",";
				
				//$(this).attr('style','color:#FFFFFF');
				
				//$(this).attr('class','select_grey_out');				
				if($(this).attr('selected')===undefined)
				{
					$(this).attr("selected",true);
				}
			}
			else
			{				
				$(this).attr('style','background-color:#FFFFFF');
				//$(this).attr('style','color:#006699');
				$(this).attr("selected",false);
			}
		}
	});
	
	//$(this).attr('selected',true);
	//document.index.notifyReps.value = rep_str;
}
