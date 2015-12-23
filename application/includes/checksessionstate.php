<?php

header('Cache-Control: no-cache, must-revalidate');

header('Expires: Fri, 01 Dec 2006 10:00:00 GMT');

if( (!isset($_SESSION['UserId']) || $_SESSION['UserId']=='') && isset($_SERVER['REQUEST_URI']))
{				
	#if((substr_count($_SERVER['REQUEST_URI'],'index/login')==0) && (substr_count($_SERVER['REQUEST_URI'],'/')==0))
	if((substr_count($_SERVER['REQUEST_URI'],'index/login')==0) 
		&& (substr_count($_SERVER['REQUEST_URI'],'index/forgotpwd')==0) 
		&& (substr_count($_SERVER['REQUEST_URI'],'index/resetpwd')==0)
		&& (substr_count($_SERVER['REQUEST_URI'],'index/resettingpwd')==0)
		&& (substr_count($_SERVER['REQUEST_URI'],'/proxy')==0)
		)
	{
		session_destroy();
		session_start();
		$_SESSION['msg']='Your session has timed out. Please login again.';
		header("Location: /index/login");
		
		exit();
	}	
}
?>
