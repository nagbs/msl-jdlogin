/**
 * Common functions to validate user password
 *
 * @author Malayan K
 * @date   20-10-2021
 *
 */

var restrictedWords = 'welcome|welcome@123|admin|@123|123';
$.get('/index/restrictedwords',function(data) {
	var obj = jQuery.parseJSON(data);

	restrictedWords = obj.words;
});
var userPwdValidation      = {status: '', msg: ''};
var validUserPwdValidation = {status: '', msg: ''};

var pwdLength       = /^.{8,32}$/;
var pwdUpper        = /[A-Z]+/;
var pwdLower        = /[a-z]+/;
var pwdNumber       = /[0-9]+/;
var pwdSpecial      = /[!@#$%^&()'[\]"?+-/*={}.,;:_]+/;


function checkUserPassword(userPwd) 
{ 
	errors  = [];
	noError = true;
	msg     = 'Your password must contain at least 1 ';

	if(!pwdLength.test(userPwd)) {
		userPwdValidation.status = false;
		userPwdValidation.msg    = 'Your password must be 8 to 32 characters with combination of Alpha-numberic and Symbols.';

		return userPwdValidation;
	}

	if (!pwdUpper.test(userPwd)) {
		noError = false;
		errors.push('uppercase');
	}

	if (!pwdLower.test(userPwd)) {
		noError = false;
		errors.push('lowercase');
	}

	if (!pwdSpecial.test(userPwd)) {
    	noError = false;
    	errors.push('symbol');
	}

	if (!pwdNumber.test(userPwd)) {
    	noError = false;
    	errors.push('number');
	}

	userPwdValidation.status = noError;
	validationMsg            = (msg + errors.join(','));
	userPwdValidation.msg    = validationMsg.replace(/,(?=[^,]*$)/, ' and ');
	
	return userPwdValidation;
}

function checkValidUserPassword(userPwd)
{
	var userPassword = userPwd.toLowerCase();

	if (restrictedWords.indexOf(userPassword) != -1 || restrictedWords.includes(userPassword)) {
		validUserPwdValidation.status = false;
		validUserPwdValidation.msg    = 'Never Use Obvious Words or Numbers for Passwords.';

		return validUserPwdValidation;
	}

	var matchFound = userPassword.match(new RegExp(restrictedWords, "g"));

	if (matchFound != null){
	    validUserPwdValidation.status = false;
		validUserPwdValidation.msg    = 'Never Use Obvious Words or Numbers for Passwords.';

		return validUserPwdValidation;
	}

  	validUserPwdValidation.status = true;

 	return validUserPwdValidation;
}

function showMsgBox(customMsg)
{
	$("#msgbox_text").html("<div><div>" + customMsg + "</div><div class='button' style='margin-left:80px'><a  class='home' id='msgok' href='#' style='padding-bottom:0px;color:#000000'><span style='font-size:10px;'>OK</span></a></div> &nbsp;</div></div>");
	$("#msgbox").fadeIn('fast',function() {
		$("#msgbox").css('display','table');
	});
	$('#msgok').click(function(e) {
		e.preventDefault();
		$("#msgbox").fadeOut('fast');
	});
	$("#loadPage").html('');
	$("#messageTextArea").focus();

	return false;
}

function showMsgBoxTbl(customMsg)
{
	$('#msgbox_table .box-center').html('');
	$('#msgbox_table').css('width','350px');
	$('#msgbox_table').css('height','100px');
	$('#msgbox_table .box-center').html("<br/>" + customMsg + "<br/><br/>" + 
		"<img id='create_ok' src='/images/ok.gif' style='vertical-align:middle;' />");
	$('#msgbox').css('display','table');
	$('#msgbox').show();
	$("#create_ok").click(function(){
		$("#msgbox").fadeOut('fast');
	});

	return false;
}
