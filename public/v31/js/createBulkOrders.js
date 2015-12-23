$(document).ready(function(){
	$("#upload_file").click(function () {

			var filename = $('#file').val();
		//alert(filename); return false;
	

			 var fileExt = filename.split('.');
			    var ext = fileExt[1];
			    if (ext === 'xls' || ext === 'xlsx') {
			    	showProgress();
			    	$.post('/orders/bulkorderscreation', {data:filename}, function(result){

			    		hideProgress();
						  $('#errormessages').html('');
							 $('#errormessages').html(result);
							 $('#errormessages').show();
				    				
						});
			    } else {
			    	alert ("Uploaded file Should be xls or xlsx !");
			    }
			/*if (filename != '') {
				  $.post('/orders/bulkorderscreation', {data:filename}, function(result){
					  $('#errormessages').html('');
						 $('#errormessages').html(result);
						 $('#errormessages').show();
			    				
					});
			} else {
				alert("Browse the xls file");
			}*/
		
	    });
	$('#file').change(function(){
	    var file = this.files[0];
	    var name = file.name;
	    var fileExt = name.split('.');
	    var ext = fileExt[1];
	    if (ext === 'xls' || ext === 'xlsx') {
	    	
	    	 $("#create_bulk_orders_form").attr('target','uploadXLS');
	    	 $("#create_bulk_orders_form").attr('action','../../file_upload.php');
			 $("#create_bulk_orders_form").submit();
	    } else {
	    	alert ("File Extention Should be xls or xlsx !");
	    }
	});   
	/* For Back Button */
	/*$('#back_button').click(function(){
		$.post('/admin/',function(data){
			$('#main_body').html('');
			$('#main_body').html(data);
			$('#main_body').show('slow');
			
        });
    });*/
});
function showXLSDetails(data)
{    
	if (data != 'SUCCESS') {
		alert ('file upload fails !');
	} else {
		alert ('file uploaded successfully !');
	}
}
showProgress=function()
{
	$('#progress_loading').css('display:table');
	$('#progress_loading').fadeIn();
}

hideProgress=function()
{
	$('#progress_loading').fadeOut();
}



