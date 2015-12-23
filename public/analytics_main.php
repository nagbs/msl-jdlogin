<?php
include_once('classes/contactinfo.class.php');

include_once('session_mysql.php');

session_start();

include_once('checksessionactive.php');

include_once('conf/config.inc.php');

include_once('includes/functions.inc.php');
include_once('includes/functions1.inc.php');
include_once('includes/resetsess.php');

$userid = $_SESSION['userid'];

$contact = new Contact();

$contact = $_SESSION['contact'];

$roles = $contact->GetRoleFunctions();

if(isset($_SESSION['proxyuserid'])){
	$redirecturl = getOrdersPage();
	header("Location: $redirecturl");
	exit();
}

?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
<title>Analytics - Job Direct</title>
<?php
$customer_style = JD_styles();
?>
<link href="css/<?php print $customer_style['css'];?>" rel="stylesheet" type="text/css"  />
<script type="text/javascript" src="scripts/advsearch.js"></script>
<script language="JavaScript" type="text/JavaScript">

function showhideDiv(ID) {

	var divID = document.getElementById(ID).style;

	if (divID.display == 'block') { divID.display = 'none'; }

	else { divID.display = 'block'; }

}

function MM_swapImgRestore() { //v3.0

  var i,x,a=document.MM_sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;

}

function MM_preloadImages() { //v3.0

	var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();

 	var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)

 	if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}

}

function MM_findObj(n, d) { //v4.01

	var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length)

	{

		d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}

		if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];

		for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);

			if(!x && d.getElementById) x=d.getElementById(n); return x;

	}

function MM_swapImage() { //v3.0

	var i,j=0,x,a=MM_swapImage.arguments; document.MM_sr=new Array; for(i=0;i<(a.length-2);i+=3)

 	if ((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}

}

</script>
<script src="scripts/imageinfo.js"></script>
<script type="text/javascript" src="scripts/ajax/prototype.js"></script>
<script type="text/javascript" src="scripts/validate.js"></script>
<script type="text/javascript" language="javascript" src="scripts/messagebox.js"></script>
</head>

<body>
<script type="text/javascript" src="scripts/tooltip/wz_tooltip.js"></script>
<?php include_once('inc/header.inc.php');?>
	<tr> 
	<td valign="top" style="background-color:#f8f8f8; border-bottom:1px solid #ececec; padding:10px;">
	<table width="930" height="214" border="0" align="center" cellpadding="0"  cellspacing="3" style="background-color:#f0f0f0; border:8px solid #ececec;">
		<tr>
		<td align="center" valign="middle">
				<table cellpadding="0" cellspacing="0" width="80%" align="center">
					
					<tr>
						<td  class="menuLink"><a href="analytics.php?ot=0" style="text-decoration:none;"><img src="images/detailed-Report.png" width="41" height="49" border="0" align="absmiddle" hspace="4" />Live Orders Analytics</a></td>
						<td  class="menuLink"><a href="analytics.php?ot=1" style="text-decoration:none;"><img src="images/personal-settings2.png" width="40" height="37" border="0" align="absmiddle" hspace="4" />Studio Orders Analytics</a></td>
					</tr>
					<tr><td height="5px"></td></tr>
					
				</table>
			</td>
		</tr>
		</table>


  </tr>
 <? include_once("inc/footer.inc.php");?>
</table>
  
  
<? 

#for add client

include_once('includes/orderinfo_req.php');

?>

</body>
</html>
			

   
