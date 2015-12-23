var dropColor = "red";
var fileUploadCount=0;
var fileUploadFrameCnt=0;
var jobSubmit=0;
var msgSubmit=0;
var revSubmit=0;
var upload_initiated = 0;
function fileUploadComplete(uploadId,size_uploaded)
{	
	fileUploadCount--;
	
	var formele = $('iframe[src="/upload_frame.php?up_id='+uploadId+'"]').parent();
	var pBar = formele.parent();
	
	var size = sizeFormat('mb', size_uploaded);
	pBar.html("File Attached");
	var remove = $('<a title="" class="ax-remove" />').click(function(){
		//fileUploadCount--;
    	$(this).parent().parent().remove();
    }).append('<span class="ax-clear-icon"><img src="/images/delete-icon.png" /></span>');
	
	pBar.parent().append(remove);
	
	if((fileUploadCount==0 && jobSubmit==1))
	{
		$("#formSubmit").trigger('click');
	}

	if(fileUploadCount==0 && msgSubmit==1)
	{
		$('#messageSubmit').trigger('click');
	}

	if(fileUploadCount==0 && revSubmit==1)
    {
        $('#reviseSubmit').trigger('click');
    }
}

function sizeFormat(format, size)
{
	var orig_size = size;
	switch(format)
	{
		case 'gb' : size = size / (1024*1024*1024);break;
		case 'mb' : size = size / (1024*1024);break;
		case 'kb' : size = size / (1024);break;
	}

	if(format=='mb' && parseInt(Math.round(size*100)/100)<=0)
	{
		return sizeFormat('kb', orig_size);
	}
	else
	{
		return (Math.round(size*100)/100)+' '+format;
	}
}

function setSize(uploadId,size_uploaded)
{
	 var size = sizeFormat('mb', size_uploaded);

	 $('.ax-file-size[ref="'+uploadId+'"]').html(size);
}

(function($)
{	
	function fileTemplate(list, fileobj, settings)
	{
	    var fn = fileobj.name;
	    
	    size	= sizeFormat(settings.showSize, fileobj.size);

	    size = '&nbsp;';
	    
	    var container = $('<li />').appendTo(list).attr('title',fn);
	    	
	    container.attr('class','progress-cont');
	    	
	    var container_left = $('<div class="progress-left-col"><img width="15" height="34" src="/images/progress-left-bg.png"></div>');
	    	
	    container_left.appendTo(container);
	    	
	    var li = $('<div class="ax-details">');
	    	
	    li.appendTo(container);    	
	    	
	    var selected_order_types = new Array();
	    	
	    var otypecnt = 0;
	    	
    	if(settings.page=='NewOrder')
    	{
		    $("#order_info_form").find("[name='Order Type']").each(function(){
		    		
		    		if($(this).is(':checked'))
		    		{
		    			//alert($(this).val());
		    			selected_order_types[otypecnt++] = $(this).val();
		    		}
		    });
    	}
    	else if(settings.page=='Revision')
    	{
	    	
	    	$("#ReviseForm").find("[name='Order Type']").each(function(){
	    			//alert($(this).val());
	    			selected_order_types[otypecnt++] = $(this).val();
	    	});
    	}
    	else
    	{
    		selected_order_types[otypecnt++] = "Message";
    	}
	    	
    	var orderTypeCont = $('<div class="single-column"/>');
    	
    	var orderTypeFields = "";
    	
    	orderTypeFields = orderTypeFields + '<ul  id="n-order-sprite">';
    	
    	for(oi=0;oi<selected_order_types.length;oi++)
    	{    	
    		if(selected_order_types[oi]=='Message')
    		{
    			orderTypeFields = orderTypeFields + '<li><input type="checkbox" style="display:none;" checked="checked" value="'+selected_order_types[oi]+'" name="order_components['+fn+'][]"  id="'+selected_order_types[oi]+'" /></li>';
    		}
    		else
    		{
    			orderTypeFields = orderTypeFields + '<li><input type="checkbox" style="display:none;" checked="checked" value="'+selected_order_types[oi]+'" name="order_components['+fn+'][]"  id="'+selected_order_types[oi]+'" /> <a href="#" id="o-'+selected_order_types[oi]+'" rel="order_type" class="o-'+selected_order_types[oi]+'-active" onclick="" >'+selected_order_types[oi]+'</a></li>';
    		}
    	}
    	
    	orderTypeFields = orderTypeFields + '</ul>';
    	
    	orderTypeCont.html(orderTypeFields);
    	
    	orderTypeCont.appendTo(li);
    	
    	$('.ax-details').find('ul[id="n-order-sprite"] li').each(function(e)
    	{
    		$(this).find('a').unbind().click(function(e1)
    		{
    			e1.preventDefault();
    			
    			link = $(this);    			
    			
    			id = link.html();
    			
    			active = link.attr('class');
    			
    			if(active.indexOf('active')!=-1)
    			{
    				link.prev().attr('checked',false);
    				link.attr('class',"o-"+id);
    			}
    			else
    			{
    				link.prev().attr('checked',true);
    				link.attr('class',"o-"+id+"-active");
    			}    			
    		});
    	});
    	
    	var upload_id = new Date().getTime();
		    	
    	var nameC	= $('<div class="ax-file-name two-column attache-txt-field">'+fn+'</div>').appendTo(li);
		    
    	var sizeC	= $('<div class="ax-file-size" ref="'+upload_id+'">'+size+'</div>').appendTo(li);
		    
		  
    	if(settings.showInstr=='true')
    	{
			var instr	= $('<div class="instruction"><input type="text" name="fileinstr['+fn+']" class="o-input-s" style="margin-top:2px;" placeholder="instructions"></div>').appendTo(li);
    	}
		   
		var progres	= $('<div class="ax-progress" />').appendTo(li); // three-column attache-txt-field
		
		var pBar	= $('<div class="ax-progress-bar" />').appendTo(progres);
		//var pFrm	= $('#ordercomponentsform');
		var pFrm	= settings.form;
		pFrm.find('input[name="APC_UPLOAD_PROGRESS"]').val(upload_id);
		var toolbar	= $('<div class="ax-toolbar" />').appendTo(li);
		
		var container_right = $('<div style="float:left"><img width="15" height="34" src="/images/progress-right-bg.png"></div>');
		container_right.appendTo(container);
		
		//createPreview(prevC, fileobj.file, fileobj.ext, settings);
		return {pBar:pBar, pFrm:pFrm, nameC:nameC, li:li, sizeC:sizeC};
	}
	
	
	function formList(list, obj, settings)
    {
		var FILES	= settings.FILES;
    	var tools	= fileTemplate(list, obj, settings);
    	
    	var form = tools.pFrm;    	
	    
	    var up_id = form.find("[name='APC_UPLOAD_PROGRESS']").val();
	    form.attr('action','/upload_new.php');
	    form.attr('target',"uploadFrame_"+fileUploadFrameCnt);
	    
	    tools.pBar.append($('<iframe frameborder="0" id="uploadFrame_'+fileUploadFrameCnt+'" name="uploadFrame_'+fileUploadFrameCnt+'" style="display:none;"></iframe'));   	
	    tools.pBar.append($('<iframe frameborder="0" id="uploadForm_'+fileUploadFrameCnt+'" name="uploadForm_'+fileUploadFrameCnt+'" class="ax-progress-info" src="/upload_frame.php?up_id='+up_id+'"></iframe>'));    	
    		
   	    fileUploadFrameCnt++;

	form.submit();
        
    }
	
	function addFiles(arr, list, settings)
	{
		var FILES = settings.FILES;
		var ext, name, size, pos = FILES.length;
		
		for (var i = 0; i < arr.length; i++) 
		{
			fileUploadCount++;			
			value   = arr[i].value;
                        name  = arr[i].value.replace(/^.*\\/, '');
                        name    = name.replace(/[^a-zA-Z0-9._-]/gi, "_");
	
/*
if(name.indexOf('C__fakepath_')==0)
{
	name    = name.replace('C__fakepath_', "");
}
*/
			/*name	= arr[i].value.replace(/^.*\\/, '');
			name	= name.replace(/\[/, '_');
			name	= name.replace(/\]/, '_');*/
			size	= arr[i].size;
			
			ext	= name.split('.').pop().toLowerCase();
			
			var obj={
					pos	: pos,
					byte	: 0,					 
					file	: arr[i], 
					status	: 'ok', 
					name	: name,
					size	: size,
					xhr		: null, 
					info	: '',
					ext		: ext
				};
							
			formList(list, obj, settings);			
		}
	}
	
	function addDropFiles(arr, list, settings)
	{		
		for (var i = 0; i < arr.length; i++) 
		{
			fileUploadCount++;			
			var name	= arr[i].name;
			size	= arr[i].size;
			
			var ext	= name.split('.').pop().toLowerCase();
						
			
			var obj={	
						byte	: 0,						
						file	: arr[i], 
						status	: 'ok', 
						name	: name,
						xhr		: null,
						size	: size,
						ext		: ext
					};
			
				
			formList(list, obj, settings);
			
		}
	}

	$.fn.myFileUpload = function(options)
	{
		
		
		 var globalSettings = 
		    {
		    	remotePath : 	'js/',						//remote upload path, can be set also in the php upload script
		    	url:			'upload.php',				//php/asp/jsp upload script
		    	data:			'',							//other user data to send in GET to the php script
		    	async:			true,						//set asyncron upload or not
		    	maxFiles:		9999,						//max number of files can be selected
		    	allowExt:		[],							//array of allowed upload extesion, can be set also in php script
		    	showSize:		'mb',						//show size in Mb, Kb or bytes, or Gb
		    	success:		function(fileName){},		//function that triggers every time a file is uploaded
		    	finish:			function(arrFiles){},		//function that triggers when all files are uploaded
		    	error:			function(txt,fileName){},	//function that triggers if an error occuors during upload
		    	enable:			true,						//start plugin enable or disabled
		    	chunkSize:		1024*1024*1024,//default 1Mb,	//if supported send file to server by chunks, not at once
		    	maxConnections:	3,							//max parallel connection on multiupload recomended 3, firefox support 6, only for browsers that support file api
		    	dropColor:		'red',						//back color of drag & drop area, hex or rgb
		    	dropArea:		'#dropArea',						//set the id or element of area where to drop files. default self
		    	autoStart:		true,						//if true upload will start immediately after drop of files or select of files
		    	thumbHeight:	0,							//max thumbnial height if set generate thumbnial of images on server side
		    	thumbWidth:		0,							//max thumbnial width if set generate thumbnial of images on server side
		    	thumbPostfix:	'_thumb',					//set the post fix of generated thumbs, default filename_thumb.ext,
		    	thumbPath:		'',							//set the path where thumbs should be saved, if empty path setted as remotePath
		    	thumbFormat:	'',							//default same as image, set thumb output format, jpg, png, gif
		    	maxFileSize:	'1024M',					//max file size of single file,
		    	form:			null,						//integration with some form, set the form selector or object, and upload will start on form submit
		    	editFilename:	false,						//if true allow edit file names before upload, by dblclick
		    	sortable:		false						//set if need to sort file list, need jquery-ui
		    };
		 
		return this.each(function(){
			
			var fileList	= $('<ul class="ax-file-list" />').appendTo($(this));
			
			var settings = $.extend({},globalSettings,options);
			
			settings.FILES		= []; //the queue
			
			settings.form		= $(this).find('form');
			
			var browse = $('<a class="ax-button home" title="Add Files"><div class="button"><span>Add Files</span></div></a>');		
			
			$(this).find('[name="file[]"]').parent().prepend(browse);
			
			$(this).find('[name="file[]"]').hide();
			
			browse.bind('click',function(){
				$(this).parent().find('[name="file[]"]').show();
                                $(this).parent().find('[name="file[]"]').focus();
				$(this).parent().find('[name="file[]"]').trigger('click');
			});
			
			$(this).find('[name="file[]"]').bind('change',function(e){		
				
				/*files = e.target.files || e.dataTransfer.files;
				var uploadSize = sizeFormat('mb',files[0].size);
				uploadSize = uploadSize.substr(0,uploadSize.indexOf(' mb'));
				uploadSize = parseInt(uploadSize);
		
				if(uploadSize>500) 
				{					
					alert("Only Files upto 500 MB can be uploaded"); 
					$(this).val('');
					return false;
				}*/
	
				addFiles([this], fileList, settings);
				$(this).clone(true).val('').hide().appendTo($(this).parent());
				$(this).remove();
			});

		
			$('#dropArea').css({'display':'none'});
			
		    //Add files by drag and drop
	    	/*dropArea.addEventListener('dragenter',function(e){
	    		e.stopPropagation();  
	    		e.preventDefault(); 
	    	},false);
	    	
	    	dropArea.addEventListener('dragover',function(e){
	    	
	    		e.preventDefault(); 
	    		$(this).css('background-color',dropColor);
	    		
	    	},false);
	    	
	    	dropArea.addEventListener('dragleave',function(e){
	    		e.stopPropagation();  
	    		e.preventDefault(); 
	    		$(this).css('background-color',''); 
	    	},false);
	    	
	    	dropArea.addEventListener('drop',function(e)
		    {	    		
		    	e.stopPropagation();  
		    	e.preventDefault();
				
		    	var files = e.target.files || e.dataTransfer.files;
		    	
		    	addDropFiles(files, fileList, settings);
	
				$(this).css('background-color','');
				
		    	
			},false);*/
		});
	};	
})(jQuery);
