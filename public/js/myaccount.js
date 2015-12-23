$(document).ready(function(){
$('#changeEmail').click(function()
 {
   	var email = document.getElementById('newemail');
    var filter = /^([a-zA-Z0-9_\.\-\+\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    if (!filter.test(email.value)) {
   // alert('Please provide a valid email address!');
    //email.focus;
    //return false;

			$("#msgbox_text").html("<div><div>Please provide a valid email address!</div><div class='button' style='margin-left:80px'><a  class='home' id='msgok' href='#' style='padding-bottom:0px;color:#000000'><span style='font-size:10px;'>OK</span></a></div> &nbsp;</div></div>");
			$("#msgbox").fadeIn('fast',function(){
				$("#msgbox").css('display','table');
			});
			$('#msgok').click(function(e){
				e.preventDefault();
				$("#msgbox").fadeOut('fast');
			});
			$("#loadPage").html('');			
			return;
 }
 else
	 {
		//postval = {email: $('#newemail').val()}
	 checkSessionActive();
	var Mulemail = new Array;
	Mulemail.push( $("#msgbox_text").find('#newemail').val() );
	 $(".o-input-m").each(function() {
		    if ($(this).val() != '')
		    {
		    	Mulemail.push( $(this).val() );
		    }
		});
	 email_join = Mulemail.join(',');
       $.post('/profile/change',$('[name="email[]"]').serialize(),function(data){	
       $('.msg-block').html(data);
	   if(data=="updated Successfully")
		   $('#myacc').trigger('click');
	   });
	 }
 });


$('#changePass').click(function()
	{
    var password = $("#newPass").val();
    var confirmPassword = $("#newPass1").val();

    if (password != confirmPassword)
		{
    	$("#msgbox_text").html("<div><div>Passwords do not match!</div><div class='button' style='margin-left:80px'><a  class='home' id='msgok' href='#' style='padding-bottom:0px;color:#000000'><span style='font-size:10px;'>OK</span></a></div> &nbsp;</div></div>");
		$("#msgbox").fadeIn('fast',function(){
			$("#msgbox").css('display','table');
		});
		$('#msgok').click(function(e){
			e.preventDefault();
			$("#msgbox").fadeOut('fast');
		});
		$("#loadPage").html('');			
		return;
        }
    else if (password=='' || confirmPassword=='')
    	{
    	$("#msgbox_text").html("<div><div>Please enter New Password!</div><div class='button' style='margin-left:80px'><a  class='home' id='msgok' href='#' style='padding-bottom:0px;color:#000000'><span style='font-size:10px;'>OK</span></a></div> &nbsp;</div></div>");
		$("#msgbox").fadeIn('fast',function(){
			$("#msgbox").css('display','table');
		});
		$('#msgok').click(function(e){
			e.preventDefault();
			$("#msgbox").fadeOut('fast');
		});
		$("#loadPage").html('');			
		return;
    	}
	else
		{
		checkSessionActive();	
           $.post('/profile/changepassword',{old_pwd: $('#currentPass').val(),new_pwd: $('#newPass').val()},function(data){	
           $('.msg-block1').html(data);
	   });
		}
	});


$('#changesec').click(function()
		{
	    var secQ = $("#s_question").val();
	    var secA= $("#s_ans").val();
	    checkSessionActive();
	           $.post('/profile/changesecurity',{question: $('#s_question').val(),answer: $('#s_ans').val()},function(data){	
	           $('.msg-block4').html(data);
		   });
			
		});

$('#change').click(function()
		{
	        var time=$("#time").val();
	        var tooltip=$("#tooltip").val();
	        var color=$("#color").val();
	        checkSessionActive();
	        $.post('/profile/changesettings',{time: $('#time').val(), tooltip:$("#tooltip").val(),
	        	color:$("#color").val()}, function(data)
	        	{
	        		$('.msg-block6').html("Changed!");
	        		$('#myacc').trigger('click');
	        	});
		});

/*$('#changetime').click(function()
		{
	    var time = $("#time").val();
	   // var time = document.getElementById('time');
	           $.post('/profile/changetime',{time: $('#time').val()},function(data){
	           $('.msg-block6').html("Time-Zone changed");
	          
	           //$('#myacc').trigger('click');
		   });
			
		});


$('#changetip').click(function(e)
{	
	$("input[name='tooltip'][type=radio]").each( 
			function() {
				if($(this).is(":checked"))
				{
					 
	   	            
					$.post('/profile/changetooltip',{tooltip: $(this).val()},function(data){
						$('.msg-block7').html("Changed!");
						});
				}

    });
	e.preventDefault();
});


$('#changetip').click(function()
		{
	       //var tooltip=$("#tooltip").val();
	var tooltip=document.getElementsByName('tooltip');
	       $.post('/profile/changetooltip',{tooltip: $(this).val()},function(data){
				$('.msg-block7').html("Changed!");
		});
  });*/

$('#changePhoto').click(function()
		{
	    //var secQ = $("#s_question").val();
	    //var secA= $("#s_ans").val();
	   // alert($("#photo").serialize());
	checkSessionActive();
	           $.post('/profile/changephoto',$('#photo').serialize(),function(data){
	        	//alert(data);
	           $('.msg-block5').html("Uploaded Succesfully");
	           $('#myacc').trigger('click');
		   });
			
		});

$('#addMore').click(function()
		{  
			var newemail=$("#emaildiv").clone();
			newemail.appendTo("#emailContainer");
			$("#emailContainer").append('<div class="m-block"><div class="btnWhite remove" style="margin-top:5px;margin-left:10px;"><a href="javascript:void(0)"><img src="/images/dust-bin.png" title="REMOVE"></a></div></div>');
			
			$(".btnWhite.remove a").unbind().click(function () {
				$(this).parent().parent().prev().remove();
				$(this).parent().parent().remove();
			});
		});

$('#change_config').click(function()
		{
	 		 //var site_id=$("#site_id").val();
	 		 //var e_config = $("input[name=email_config[][]]:checked").val();
			 checkSessionActive();
			 $.post('/profile/changeconfig',$('[name="mail_config"]').serialize(),function(data){ 
				// alert(data);
			 });
		});

});