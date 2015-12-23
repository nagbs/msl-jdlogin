<link href="http://prod.2adpro.com/css/jd2_styles.css" rel="stylesheet" type="text/css"  />
<script language="javascript">
function expandCollapse(id,dispid)
{
	
	if(document.getElementById(dispid).style.display=='none')
	{
			//document.getElementById(dispid).style.display='';
			//document.getElementById(id).innerHTML='http://prod.2adpro.com/images/expand.jpg';
			document.getElementById(id).innerHTML ='<a href="#" onclick="expandCollapse(\''+id + '\',\''+dispid+'\');return false;" style="text-decoration:none" ><img src="http://prod.2adpro.com/images/minus.jpg" border=0" style="vertical-align:text-bottom"></a>';
		document.getElementById(dispid).style.display='';
	}else
	{
			//document.getElementById(dispid).style.display='none';
			//document.getElementById(id).src='http://prod.2adpro.com/images/collapse.jpg';
			document.getElementById(id).innerHTML ='<a href="#" onclick="expandCollapse(\''+id + '\',\''+dispid+'\');return false;" style="text-decoration:none" ><img src="http://prod.2adpro.com/images/pluse.jpg" border=0" style="vertical-align:text-bottom"></a>';
		document.getElementById(dispid).style.display='none';
	}
	
	
}

function minmax(id,imgid)
{
	if(document.getElementById(id).style.display == '')
	{
			//document.getElementById(dispid).style.display='';
			//document.getElementById(id).innerHTML='http://prod.2adpro.com/images/expand.jpg';
			document.getElementById(id).style.display = 'none';
			document.getElementById(imgid).src = 'http://prod.2adpro.com/images/f-maximize.gif';
	}else
	{
			document.getElementById(imgid).src = 'http://prod.2adpro.com/images/f-minimize.gif';
			document.getElementById(id).style.display = '';
	}
}
function onSelChange(selected)
{
	val = document.form1.contents.options[selected].value;
	
	
	//document.getElementById('selectVAL').innerHTML = '<strong>'+document.getElementById(val).innerHTML+'</strong>';

	var arrayList = new Array();
	arrayList[0] = "GE";
	arrayList[1] = "Login";
	arrayList[2] = "Job Order List";
	arrayList[3] = "New Order";
	arrayList[4] = "Change Order";
	arrayList[5] = "Messaging";
	arrayList[6] = "Revise Order";
	arrayList[7] = "Reports";
	arrayList[8] = "Download Ad";
	arrayList[9] = "Miscellaneous";
	
	var arrayList1 = new Array();
	arrayList1[0] = "ge";
	arrayList1[1] = "ln";
	arrayList1[2] = "jo";
	arrayList1[3] = "no";
	arrayList1[4] = "co";
	arrayList1[5] = "msg";
	arrayList1[6] = "ro";
	arrayList1[7] = "re";
	arrayList1[8] = "da";
	arrayList1[9] = "mi";
	
	for(i=0; i<arrayList.length; i++){
		if(val == i)
		{
			document.getElementById(arrayList1[i]).src = 'http://prod.2adpro.com/images/f-minimize.gif';
			document.getElementById(arrayList[i]).style.display = "";
		}
		else
		{
			document.getElementById(arrayList1[i]).src = 'http://prod.2adpro.com/images/f-maximize.gif';
			document.getElementById(arrayList[i]).style.display = "none";
		}
	}
}

function gotoQuestions(title,id){

	document.getElementById('selectVAL').innerHTML = '<strong>'+title+'</strong>';


	var arrayList1 = new Array();
	arrayList1[0] = "General SetUp";
	arrayList1[1] = "Login";
	arrayList1[2] = "Job Order List";
	arrayList1[3] = "New Order";
	arrayList1[4] = "Change Order";
	arrayList1[5] = "Messaging";
	arrayList1[6] = "Revise Order";
	arrayList1[7] = "Reports";
	arrayList1[8] = "Download Ad";
	arrayList1[9] = "Miscellaneous";
	
	for(j=0; j<arrayList1.length; j++){
		if(title == arrayList1[j])
		{
			document.getElementById(arrayList1[j]).style.display = "";
			document.getElementById(j).className = "highlight";
		}
		else
		{
			document.getElementById(arrayList1[j]).style.display = "none";
			document.getElementById(j).className = "tabbg";
		}
	}
}
</script>

<script type="text/javascript" src="scripts/tooltip/wz_tooltip.js"></script>

<?php
if(isset($_GET['param1'])){
	$param1 = $_GET['param1'];
	$param2 = $_GET['param2'];
}
?>	   
			
	
									<table width="100%" border="0" cellspacing="0" cellpadding="0" style='background-color:#e5e5e5'>
									 	<tr>
											<td width="714" bgcolor="#f8f8f8" style=" padding-left:29px; padding-top:5px; padding-right:15px;">
												<table width="100%" border="0" cellpadding="0" cellspacing="0">
										  			<tr>
														<td style="padding-bottom:12px;"><img src="http://prod.2adpro.com/images/faq-title.gif" /></td>
														<td align="right">
															<form id="form1" name="form1" method="post" action="">
															<label>															
															  <select name="contents" class="listbox" onchange="onSelChange(this.selectedIndex);">
																<option <? if(!isset($param1)){ echo 'selected';}elseif($param2 == 'ge'){ echo 'selected';}?> value="0">General SetUp</option>
																<option value="1">Login</option>
																<option value="2">Job Order List</option>
																<option value="3" <? if($param2 == 'no'){ echo 'selected';}?>>New Order</option>
																<option value="4">Change Order</option>
																<option value="5">Messaging</option>
																<option value="6">Revise Order</option>
																<option value="7">Reports</option>
																<option value="8">Download Ad </option>
																<option value="9">Miscellaneous</option>
																</select>
															 </label>
															 </form>
														</td>
													</tr>			  
												</table>
											</td>
										</tr>
					
										<tr>
											<td>
												<table width="90%"  border="0" cellspacing="0" cellpadding="0" align="center"  background="http://prod.2adpro.com/images/faq-head-bg.gif" class="highlight">
													<tr >
														<td height="10"   id="selectVAL"  colspan="2" style="padding-left:10px;"> <strong>General Set Up</strong></td>
														<td align="right">
														<?php if(isset($param1)){ ?>
														<img id="ge" src="http://prod.2adpro.com/images/f-maximize.gif" style="vertical-align:middle; cursor:pointer" border="0" onclick="minmax('GE',this.id)" />
														<?php }else{?> 
														<img id="ge" src="http://prod.2adpro.com/images/f-minimize.gif" style="vertical-align:middle; cursor:pointer" border="0" onclick="minmax('GE',this.id)" />
														<?php }?></td>
													</tr>
												</table>
											</td>
										</tr>
										
										<?php if(isset($param1)){ ?>
										<tr  id="GE"   style="display:none;">
										<?php }else{?> 
										<tr  id="GE"  style="display:">
										<?php }?>										
										<td width="720" valign="top" colspan="2">
											<table width="90%" cellspacing="0" cellpadding="0" align="center" style="border:1px thin #e9e9e9; border-width:1px;border-collapse:collapse;" >
												<tr>
													<td  style="background-color:#FFFFFF;border:solid 1px #e9e9e9">
														
														<table cellpadding="0" cellspacing="0" style="margin-top:15px; margin-left:15px;border:1px thin #F0F0F0; border-width:1px;"  >		
															<tr>
																<td width="1" style="color:#669966; font-size:12px; font-weight:bold; font-family:Verdana, Arial, Helvetica, sans-serif;text-decoration:none;" id="id1" valign="top"><a href="#" onclick="expandCollapse('id1','General SetUp1');return false;" style="text-decoration:none" ><img src="http://prod.2adpro.com/images/pluse.jpg" border="0"></a></td><td class="descH"><a href="#" onclick="expandCollapse('id1','General SetUp1');return false;" style="text-decoration:none; cursor:pointer;">How do I get access to JobDirect?</a></td>
															</tr>
														</table>
													
														<table cellpadding="0" cellspacing="0" style="margin-left:15px;border:1px thin #e9e9e9; border-width:1px;"  >
															<tr id="General SetUp1" style="display:none" > 
																	<td colspan="2" class="descBody">Before you can send orders to 2AdPro via JobDirect, you must complete a Display Ad Production survey.  Completed forms must be sent back to sales@2adpro.com.  An account will be setup for you usually within 24 hours.</td>
															</tr>
														</table>
													</td>
												</tr>
												<tr>
													<td  style="background-color:#FFFFFF;border:solid 1px #e9e9e9"> 
														<table cellpadding="0" cellspacing="0" style="margin-top:15px;margin-left:15px; border:1px thin #e9e9e9; border-width:1px;"  >
															<tr>
																<td width="1" style="color:#669966; font-size:12px; font-weight:bold; font-family:Verdana, Arial, Helvetica, sans-serif;text-decoration:none;" id="id2" valign="top"><a href="#" onclick="expandCollapse('id2','General SetUp2');return false;" style="text-decoration:none" ><img src="http://prod.2adpro.com/images/pluse.jpg" border="0"></a></td><td class="descH"><a href="#" onclick="expandCollapse('id2','General SetUp2');return false;" style="text-decoration:none; cursor:pointer;">How is JobDirect customized for me?</a></td>
															</tr>
														</table>
														<table cellpadding="0" cellspacing="0" style="margin-left:15px; border:1px thin #999999; border-width:1px;"  >
															<tr id="General SetUp2" style="display:none" > 
																	<td colspan="2" class="descBody">JobDirect will display your logo when you sign in.  Options such as order types, product lists and delivery options can be customized by customer.  For products that support modular ad sizes, we can load the modular sizes within JobDirect.</td>
															</tr>
														</table>
													</td>
												</tr>
												<tr>
													<td  style="background-color:#FFFFFF;border:solid 1px #e9e9e9">
														<table cellpadding="0" cellspacing="0" style="margin-top:15px;margin-left:15px; border:1px thin #999999; border-width:1px;"  >
															<tr>
																<td width="1" style="color:#669966; font-size:12px; font-weight:bold; font-family:Verdana, Arial, Helvetica, sans-serif;text-decoration:none;" id="id3" valign="top"><a href="#" onclick="expandCollapse('id3','General SetUp3');return false;" style="text-decoration:none" ><img src="http://prod.2adpro.com/images/pluse.jpg" border="0"></a></td><td class="descH"><a href="#" onclick="expandCollapse('id3','General SetUp3');return false;" style="text-decoration:none; cursor:pointer;">Can I configure JobDirect for my site?</a></td>
															</tr>
														</table>
														<table cellpadding="0" cellspacing="0" style="margin-left:15px; margin-bottom:15px;border:1px thin #999999; border-width:1px;"  >
															<tr id="General SetUp3" style="display:none" > 
																	<td colspan="2" class="descBody">There are several self-service options available within JobDirect for users who have a Production Manager role within the system.  Such users can add additional users, setup e-mail notifications and modify display preferences.</td>
															</tr>
														</table>
													</td>
												</tr>
											</table>
										</td>
									</tr>
										<tr><td height="3"></td></tr>
										<tr>
										<td>
											<table width="90%"  border="0" cellspacing="0" cellpadding="0" align="center"  background="http://prod.2adpro.com/images/faq-head-bg.gif" class="highlight">
											<tr >
												<td height="10"   id="selectVAL"  colspan="2" style="padding-left:10px;"> <strong>Login</strong></td>
												<td align="right"><img id="ln" src="http://prod.2adpro.com/images/f-maximize.gif" style="vertical-align:middle; cursor:pointer" border="0" onclick="minmax('Login',this.id)" /></td>
											</tr>
											</table>
										</td>
									</tr>
										<tr   id="Login"  style="display:none">
										<td>													
											<table width="90%" cellspacing="0" cellpadding="0" align="center" style="border:1px thin #F0F0F0; border-width:1px;border-collapse:collapse;" >
												<tr>
													<td  style="background-color:#FFFFFF;border:solid 1px #e9e9e9">
														
														<table cellpadding="0" cellspacing="0" style="margin-top:15px; margin-left:15px;border:1px thin #F0F0F0; border-width:1px;" align="left"  >		
															<tr>															
																<td width="1" style="color:#669966; font-size:12px; font-weight:bold; font-family:Verdana, Arial, Helvetica, sans-serif;text-decoration:none;" id="id4" align="left"><a href="#" onclick="expandCollapse('id4','Login1');return false;" style="text-decoration:none" ><img src="http://prod.2adpro.com/images/pluse.jpg" border="0"></a></td><td class="descH"><a href="#" onclick="expandCollapse('id4','Login1');return false;" style="text-decoration:none; cursor:pointer;">I am not able to log in.</a></td>
															</tr>
															<tr id="Login1" style="display:none" > 
																	<td colspan="2" class="descBody">User IDs and Passwords are case-sensitive.  Make sure that the CAPS Lock key on your system is not pressed.  If you have forgotten your user ID and/or password, please contact your site administrator.  This is the individual with a Production Manager role within the system.  If you are administrator, then please contact us at support@2adpro.com to have your password reset..</td>
															</tr>
														</table>
													</td>
												</tr>
												<tr>
													<td  style="background-color:#FFFFFF;border:solid 1px #e9e9e9">
														<table cellpadding="0" cellspacing="0" style="margin-top:15px; margin-left:15px;margin-bottom:15px;border:1px thin #F0F0F0; border-width:1px;"  >		
															<tr>														
																<td width="1"style="color:#669966; font-size:12px; font-weight:bold; font-family:Verdana, Arial, Helvetica, sans-serif;text-decoration:none;" id="id5"><a href="#" onclick="expandCollapse('id5','Login2');return false;" style="text-decoration:none" ><img src="http://prod.2adpro.com/images/pluse.jpg" border="0"></a></td><td class="descH"><a href="#" onclick="expandCollapse('id5','Login2');return false;" style="text-decoration:none; cursor:pointer;">Can multiple users log in using the same login ID?.</a></td>															</tr>
															<tr id="Login2" style="display:none">
																<td colspan="2" class="descBody">Yes.  However this is not advisable since the system will be unable to keep track of the actual users.  All reporting and notifications are tied to a user.s login ID.</td>
															</tr>									
														</table>
													</td>
												</tr>
											</table>
										</td>
										</tr>
														
										<tr><td height="3"></td></tr>
										<tr>
											<td>
												<table width="90%"  border="0" cellspacing="0" cellpadding="0" align="center"  background="http://prod.2adpro.com/images/faq-head-bg.gif" class="highlight">
												<tr >
													<td height="10"   id="selectVAL"  colspan="2" style="padding-left:10px;"> <strong>Job Order List</strong></td>
													<td align="right"><img id="jo" src="http://prod.2adpro.com/images/f-maximize.gif" style="vertical-align:middle; cursor:pointer" border="0" onclick="minmax('Job Order List',this.id)" /></td>
												</tr>
												</table>
											</td>
										</tr>				
										<tr id="Job Order List" style="display:none">
											<td>													
											<table width="90%" cellspacing="0" cellpadding="0" align="center" style="border:1px thin #F0F0F0; border-width:1px;border-collapse:collapse;" >
												<tr>
													<td  style="background-color:#FFFFFF;border:solid 1px #e9e9e9">
														
														<table cellpadding="0" cellspacing="0" style="margin-top:15px; margin-left:15px;border:1px thin #F0F0F0; border-width:1px;"  >		
															<tr>
																<td width="1" style="color:#669966; font-size:12px; font-weight:bold; font-family:Verdana, Arial, Helvetica, sans-serif;text-decoration:none;" id="id6" valign="top"><a href="#" onclick="expandCollapse('id6','Job Order List1');return false;" style="text-decoration:none" ><img src="http://prod.2adpro.com/images/pluse.jpg" border="0"></a></td><td class="descH"><a href="#" onclick="expandCollapse('id6','Job Order List1');return false;" style="text-decoration:none; cursor:pointer;">Why don.t I see my ads in the list of orders?</a></td>
															</tr>
															<tr id="Job Order List1" style="display:none" > 
																	<td colspan="2" class="descBody">Depending on the role that has been assigned to you within JobDirect, you may not have the privileges to view all the ads.  Also, check the filter options within the search panels to see if any filter has been set.  By default, JobDirect will display orders only for the past 30 days.  </td>
																</tr>
														</table>
													</td>
												</tr>
												<tr>
													<td  style="background-color:#FFFFFF;border:solid 1px #e9e9e9">
														<table cellpadding="0" cellspacing="0" style="margin-top:15px; margin-left:15px;border:1px thin #F0F0F0; border-width:1px;"  >																														
															<tr>
																<td width="1" style="color:#669966; font-size:12px; font-weight:bold; font-family:Verdana, Arial, Helvetica, sans-serif;text-decoration:none;" id="id7" valign="top"><a href="#" onclick="expandCollapse('id7','Job Order List2');return false;" style="text-decoration:none" ><img src="http://prod.2adpro.com/images/pluse.jpg" border="0"></a></td><td class="descH"><a href="#" onclick="expandCollapse('id7','Job Order List2');return false;" style="text-decoration:none; cursor:pointer;">What is the status of my ad?</a></td>
															</tr>
															<tr id="Job Order List2" style="display:none" > 
																	<td colspan="2" class="descBody">The Job Order List will include the current status of your ad.</td>
																</tr>
														</table>
													</td>
												</tr>
												<tr>
													<td  style="background-color:#FFFFFF;border:solid 1px #e9e9e9">
														<table cellpadding="0" cellspacing="0" style="margin-top:15px; margin-left:15px;border:1px thin #F0F0F0; border-width:1px;"  >		
															<tr>														
																<td width="1" style="color:#669966; font-size:12px; font-weight:bold; font-family:Verdana, Arial, Helvetica, sans-serif;text-decoration:none;" id="id8" valign="top"><a href="#" onclick="expandCollapse('id8','Job Order List3');return false;" style="text-decoration:none" ><img src="http://prod.2adpro.com/images/pluse.jpg" border="0"></a></td><td class="descH"><a href="#" onclick="expandCollapse('id8','Job Order List3');return false;" style="text-decoration:none; cursor:pointer;">Why are some tracking numbers listed in red?</a></td>
															</tr>
															<tr id="Job Order List3" style="display:none" > 
																	<td colspan="2" class="descBody">These are orders that have been ordered as Rush.</td>
																</tr>
														</table>
													</td>
												</tr>
												<tr>
													<td  style="background-color:#FFFFFF;border:solid 1px #e9e9e9">
														<table cellpadding="0" cellspacing="0" style="margin-top:15px; margin-left:15px;border:1px thin #F0F0F0; border-width:1px;"  >		
															<tr>														
																<td width="1" style="color:#669966; font-size:12px; font-weight:bold; font-family:Verdana, Arial, Helvetica, sans-serif;text-decoration:none;" id="id9" valign="top"><a href="#" onclick="expandCollapse('id9','Job Order List4');return false;" style="text-decoration:none" ><img src="http://prod.2adpro.com/images/pluse.jpg" border="0"></a></td><td class="descH"><a href="#" onclick="expandCollapse('id9','Job Order List4');return false;" style="text-decoration:none; cursor:pointer;">What does the reset button do?</a></td>
															</tr>
															<tr id="Job Order List4" style="display:none" > 
																	<td colspan="2" class="descBody">The reset button clears all filter settings that have been applied earlier.</td>
																</tr>
														</table>
													</td>
												</tr>
												<tr>
													<td  style="background-color:#FFFFFF;border:solid 1px #e9e9e9">
														<table cellpadding="0" cellspacing="0" style="margin-top:15px; margin-left:15px;border:1px thin #F0F0F0; border-width:1px;"  >		
															<tr>														
																<td width="1" style="color:#669966; font-size:12px; font-weight:bold; font-family:Verdana, Arial, Helvetica, sans-serif;text-decoration:none;" id="id10" valign="top"><a href="#" onclick="expandCollapse('id10','Job Order List5');return false;" style="text-decoration:none" ><img src="http://prod.2adpro.com/images/pluse.jpg" border="0"></a></td><td class="descH"><a href="#" onclick="expandCollapse('id10','Job Order List5');return false;" style="text-decoration:none; cursor:pointer;">How can I change the number of ads that I see on the Job Order List page?</a></td>
															</tr>
															<tr id="Job Order List5" style="display:none" > 
																	<td colspan="2" class="descBody">Go to the My Account page and modify the value in the Maximum page size field.</td>
																</tr>
														</table>
													</td>
												</tr>
												<tr>
													<td  style="background-color:#FFFFFF;border:solid 1px #e9e9e9">
														<table cellpadding="0" cellspacing="0" style="margin-top:15px; margin-left:15px;border:1px thin #F0F0F0; border-width:1px;"  >		
															<tr>														
																<td width="1" style="color:#669966; font-size:12px; font-weight:bold; font-family:Verdana, Arial, Helvetica, sans-serif;text-decoration:none;" id="id11" valign="top"><a href="#" onclick="expandCollapse('id11','Job Order List6');return false;" style="text-decoration:none" ><img src="http://prod.2adpro.com/images/pluse.jpg" border="0"></a></td><td class="descH"><a href="#" onclick="expandCollapse('id11','Job Order List6');return false;" style="text-decoration:none; cursor:pointer;">How is the order list sorted?</a></td>
															</tr>
															<tr id="Job Order List6" style="display:none" > 
																	<td colspan="2" class="descBody">By default the ads are sorted by order date in descending order.</td>
																</tr>
														</table>
													</td>
												</tr>
												<tr>
													<td  style="background-color:#FFFFFF;border:solid 1px #e9e9e9">
														<table cellpadding="0" cellspacing="0" style="margin-top:15px; margin-left:15px;border:1px thin #F0F0F0; border-width:1px;"  >		
															<tr>														
																<td width="1" style="color:#669966; font-size:12px; font-weight:bold; font-family:Verdana, Arial, Helvetica, sans-serif;text-decoration:none;" id="id12" valign="top"><a href="#" onclick="expandCollapse('id12','Job Order List7');return false;" style="text-decoration:none" ><img src="http://prod.2adpro.com/images/pluse.jpg" border="0"></a></td><td class="descH"><a href="#" onclick="expandCollapse('id12','Job Order List7');return false;" style="text-decoration:none; cursor:pointer;">Can I change the sort order of the orders?</a></td>
															</tr>
															<tr id="Job Order List7" style="display:none" > 
																	<td colspan="2" class="descBody">The list can be sorted by any one of the columns by simply clicking on the column header.</td>
																</tr>
														</table>
													</td>
												</tr>
												<tr>
													<td  style="background-color:#FFFFFF;border:solid 1px #e9e9e9">
														<table cellpadding="0" cellspacing="0" style="margin-top:15px; margin-left:15px;margin-bottom:15px;border:1px thin #F0F0F0; border-width:1px;"  >		
															<tr>														
																<td width="1" style="color:#669966; font-size:12px; font-weight:bold; font-family:Verdana, Arial, Helvetica, sans-serif;text-decoration:none;" id="id13" valign="top"><a href="#" onclick="expandCollapse('id13','Job Order List8');return false;" style="text-decoration:none" ><img src="http://prod.2adpro.com/images/pluse.jpg" border="0"></a></td><td class="descH"><a href="#" onclick="expandCollapse('id13','Job Order List8');return false;" style="text-decoration:none; cursor:pointer;">How do I find an ad that I am looking for?</a></td>
															</tr>
															<tr id="Job Order List8" style="display:none" > 
																	<td colspan="2" class="descBody">Use the Search Panel to specify your search criteria and press the Go button.</td>
															</tr>								
														</table>
													</td>
												</tr>
												</table>
											</td>
										</tr>
										<tr><td height="3"></td></tr>
										<tr>
											<td>
												<table width="90%"  border="0" cellspacing="0" cellpadding="0" align="center"  background="http://prod.2adpro.com/images/faq-head-bg.gif" class="highlight">
												<tr >
													<td height="10"   id="selectVAL"  colspan="2" style="padding-left:10px;"> <strong>New Order</strong></td>
													<td align="right"><img id="no" src="http://prod.2adpro.com/images/f-maximize.gif" style="vertical-align:middle; cursor:pointer" border="0" onclick="minmax('New Order',this.id)" /></td>
												</tr>
												</table>
											</td>
										</tr>
										<tr  id="New Order" style="display:none">
											<td>													
											<table width="90%" cellspacing="0" cellpadding="0" align="center" style="border:1px thin #F0F0F0; border-width:1px;border-collapse:collapse;" >
												<tr>
													<td  style="background-color:#FFFFFF;border:solid 1px #e9e9e9">
														
														<table cellpadding="0" cellspacing="0" style="margin-top:15px; margin-left:15px;border:1px thin #F0F0F0; border-width:1px;"  >		
															<tr>
																<td width="1" style="color:#669966; font-size:12px; font-weight:bold; font-family:Verdana, Arial, Helvetica, sans-serif;text-decoration:none;" id="id14" valign="top"><a href="#" onclick="expandCollapse('id14','New Order1');return false;" style="text-decoration:none" ><img src="http://prod.2adpro.com/images/pluse.jpg" border="0"></a></td><td class="descH"><a href="#" onclick="expandCollapse('id14','New Order1');return false;" style="text-decoration:none; cursor:pointer;">What is a client name?</a></td>
															</tr>
															<tr id="New Order1" style="display:none" > 
																	<td colspan="2" class="descBody">Client names are setup by you.  A client name is the name of the advertiser.  Once you add a client name, it will be added to your database and will be available for use by all other users.</td>
															</tr>
														</table>
													</td>
												</tr>
												<tr>
													<td  style="background-color:#FFFFFF;border:solid 1px #e9e9e9">
														<table cellpadding="0" cellspacing="0" style="margin-top:15px; margin-left:15px;border:1px thin #F0F0F0; border-width:1px;"  >		
															<tr>
																<td width="1" style="color:#669966; font-size:12px; font-weight:bold; font-family:Verdana, Arial, Helvetica, sans-serif;text-decoration:none;" id="id15" valign="top"><a href="#" onclick="expandCollapse('id15','New Order2');return false;" style="text-decoration:none" ><img src="http://prod.2adpro.com/images/pluse.jpg" border="0"></a></td><td class="descH"><a href="#" onclick="expandCollapse('id15','New Order2');return false;" style="text-decoration:none; cursor:pointer;">What is a tracking number?</a></td>
															</tr>
															<tr id="New Order2" style="display:none" > 
																	<td colspan="2" class="descBody">The tracking number is your internal ad tracking number.  It is usually generated by your own ad booking or tracking system.  We use the tracking number to generate file names for the output.</td>
															</tr>
														</table>
													</td>
												</tr>
												<tr>
													<td  style="background-color:#FFFFFF;border:solid 1px #e9e9e9">
														<table cellpadding="0" cellspacing="0" style="margin-top:15px; margin-left:15px;border:1px thin #F0F0F0; border-width:1px;"  >		
															<tr>
																<td width="1" style="color:#669966; font-size:12px; font-weight:bold; font-family:Verdana, Arial, Helvetica, sans-serif;text-decoration:none;" id="id16" valign="top"><a href="#" onclick="expandCollapse('id16','New Order3');return false;" style="text-decoration:none" ><img src="http://prod.2adpro.com/images/pluse.jpg" border="0"></a></td><td class="descH"><a href="#" onclick="expandCollapse('id16','New Order3');return false;" style="text-decoration:none; cursor:pointer;">How does the delivery option work?</a></td>
															</tr>
															<tr id="New Order3" style="display:none" > 
																	<td colspan="2" class="descBody">We offer multiple delivery options and the choices available to you depend on the agreement between your publisher and 2AdPro.  Our standard delivery option is overnight.  Any ads ordered prior to 8pm will be completed and returned by 8am the next morning.  We also offer a Same Day and Rush delivery option.</td>
															</tr>
														</table>
													</td>
												</tr>
												<tr>
													<td  style="background-color:#FFFFFF;border:solid 1px #e9e9e9">
														<table cellpadding="0" cellspacing="0" style="margin-top:15px; margin-left:15px;border:1px thin #F0F0F0; border-width:1px;"  >		
															<tr>
																<td width="1" style="color:#669966; font-size:12px; font-weight:bold; font-family:Verdana, Arial, Helvetica, sans-serif;text-decoration:none;" id="id17" valign="top"><a href="#" onclick="expandCollapse('id17','New Order4');return false;" style="text-decoration:none" ><img src="http://prod.2adpro.com/images/pluse.jpg" border="0"></a></td><td class="descH"><a href="#" onclick="expandCollapse('id17','New Order4');return false;" style="text-decoration:none; cursor:pointer;">How do I provide my creative brief?</a></td>
															</tr>
															<tr id="New Order4" style="display:none" > 
																	<td colspan="2" class="descBody">JobDirect provides a lot of structured fields for you to specify the technical requirements of an ad such as color and size.  Use the field General Instructions to provide a high level description of the type of creative you are looking for.  Special Instructions allow you to specify additional technical instructions about the ad.  Additionally, you can attach a layout file to the job order. </td>
															</tr>
														</table>
													</td>
												</tr>
												<tr>
													<td  style="background-color:#FFFFFF;border:solid 1px #e9e9e9">
														<table cellpadding="0" cellspacing="0" style="margin-top:15px; margin-left:15px;border:1px thin #F0F0F0; border-width:1px;"  >		
															<tr>
																<td width="1" style="color:#669966; font-size:12px; font-weight:bold; font-family:Verdana, Arial, Helvetica, sans-serif;text-decoration:none;" id="id18" valign="top"><a href="#" onclick="expandCollapse('id18','New Order5');return false;" style="text-decoration:none" ><img src="http://prod.2adpro.com/images/pluse.jpg" border="0"></a></td><td class="descH"><a href="#" onclick="expandCollapse('id18','New Order5');return false;" style="text-decoration:none; cursor:pointer;">What is a layout?</a></td>
															</tr>
															<tr id="New Order5" style="display:none" > 
																	<td colspan="2" class="descBody">A layout provides design instruction to our artist.  It could be a scanned copy of an old ad or a hand-drawn layout or a document with layout instructions.</td>
															</tr>
														</table>
													</td>
												</tr>
												<tr>
													<td  style="background-color:#FFFFFF;border:solid 1px #e9e9e9">
														<table cellpadding="0" cellspacing="0" style="margin-top:15px; margin-left:15px;border:1px thin #F0F0F0; border-width:1px;"  >		
															<tr>
																<td width="1" style="color:#669966; font-size:12px; font-weight:bold; font-family:Verdana, Arial, Helvetica, sans-serif;text-decoration:none;" id="id19" valign="top"><a href="#" onclick="expandCollapse('id19','New Order6');return false;" style="text-decoration:none" ><img src="http://prod.2adpro.com/images/pluse.jpg" border="0"></a></td><td class="descH"><a href="#" onclick="expandCollapse('id19','New Order6');return false;" style="text-decoration:none; cursor:pointer;">How do I know that my order has been sent successfully?</a></td>
															</tr>
															<tr id="New Order6" style="display:none" > 
																	<td colspan="2" class="descBody">As soon as you submit an order, the order will appear in the Job Order List.  You can click on the order and go to the Order Detail page where you can verify all your inputs.  An order submitted for production must be in the Submitted status.</td>
															</tr>
														</table>
													</td>
												</tr>
												<tr>
													<td  style="background-color:#FFFFFF;border:solid 1px #e9e9e9">
														<table cellpadding="0" cellspacing="0" style="margin-top:15px; margin-left:15px;margin-bottom:15px;border:1px thin #F0F0F0; border-width:1px;"  >		
															<tr>
																<td width="1" style="color:#669966; font-size:12px; font-weight:bold; font-family:Verdana, Arial, Helvetica, sans-serif;text-decoration:none;" id="id20" valign="top"><a href="#" onclick="expandCollapse('id20','New Order7');return false;" style="text-decoration:none" ><img src="http://prod.2adpro.com/images/pluse.jpg" border="0"></a></td><td class="descH"><a href="#" onclick="expandCollapse('id20','New Order7');return false;" style="text-decoration:none; cursor:pointer;">My order is sitting in the Job Order List in an Order Entry status.  What do I need to do now?</a></td>
															</tr>
															<tr id="New Order7" style="display:none" > 
																	<td colspan="2" class="descBody">You must submit an order for us to start working on it.  If an order is in an Order Entry state, click on Change.  This will allow you to edit and submit the order.  Go to the last page of the order where you will be required to re-type the tracking number and submit the order.</td>
															</tr>																		
														</table>
													</td>
												</tr>
												</table>
											</td>
										</tr>
										<tr><td height="3"></td></tr>
										<tr>
											<td>
												<table width="90%"  border="0" cellspacing="0" cellpadding="0" align="center"  background="http://prod.2adpro.com/images/faq-head-bg.gif" class="highlight">
												<tr >
													<td height="10"   id="selectVAL"  colspan="2" style="padding-left:10px;"> <strong>Change Order</strong></td>
													<td align="right"><img id="co" src="http://prod.2adpro.com/images/f-maximize.gif" style="vertical-align:middle; cursor:pointer" border="0" onclick="minmax('Change Order',this.id)" /></td>
												</tr>
												</table>
											</td>
										</tr>
										<tr  id="Change Order" style="display:none">
											<td>													
											<table width="90%" cellspacing="0" cellpadding="0" align="center" style="border:1px thin #F0F0F0; border-width:1px;border-collapse:collapse;" >
												<tr>
													<td  style="background-color:#FFFFFF;border:solid 1px #e9e9e9">
														
														<table cellpadding="0" cellspacing="0" style="margin-top:15px; margin-left:15px;border:1px thin #F0F0F0; border-width:1px;"  >		
															<tr>
																<td width="1" style="color:#669966; font-size:12px; font-weight:bold; font-family:Verdana, Arial, Helvetica, sans-serif;text-decoration:none;" id="id21" valign="top"><a href="#" onclick="expandCollapse('id21','Change Order1');return false;" style="text-decoration:none" ><img src="http://prod.2adpro.com/images/pluse.jpg" border="0"></a></td><td class="descH"><a href="#" onclick="expandCollapse('id21','Change Order1');return false;" style="text-decoration:none; cursor:pointer;">How do I make changes to my order?</a></td>
															</tr>
															<tr id="Change Order1" style="display:none" > 
																	<td colspan="2" class="descBody">If an order is in an Order Entry state, you can make any change to the order.  Once an order is Submitted, you will not be allowed to make any changes.  You can notify us of any minor changes by posting a message on the order.</td>
															</tr>
														</table>
													</td>
												</tr>
												<tr>
													<td  style="background-color:#FFFFFF;border:solid 1px #e9e9e9">
														<table cellpadding="0" cellspacing="0" style="margin-top:15px; margin-left:15px;margin-bottom:15px;border:1px thin #F0F0F0; border-width:1px;"  >		
															<tr>
																<td width="1"style="color:#669966; font-size:12px; font-weight:bold; font-family:Verdana, Arial, Helvetica, sans-serif;text-decoration:none;" id="id22" valign="top"><a href="#" onclick="expandCollapse('id22','Change Order2');return false;" style="text-decoration:none" ><img src="http://prod.2adpro.com/images/pluse.jpg" border="0"></a></td><td class="descH"><a href="#" onclick="expandCollapse('id22','Change Order2');return false;" style="text-decoration:none; cursor:pointer;">Can I make changes to an order that is in production?</a></td>
															</tr>
															<tr id="Change Order2" style="display:none">
																<td colspan="2" class="descBody">You may request changes to an order that is already in production.  Depending on the complexity of the change and the status of the order in the production workflow, it may cause a delay in the delivery of the ad.</td>
															</tr>									
														</table>
														</td>
													</tr>	
												</table>
											</td>
										</tr>
										<tr><td height="3"></td></tr>
										<tr>
											<td>
												<table width="90%"  border="0" cellspacing="0" cellpadding="0" align="center"  background="http://prod.2adpro.com/images/faq-head-bg.gif" class="highlight">
												<tr >
													<td height="10"   id="selectVAL"  colspan="2" style="padding-left:10px;"> <strong>Messaging</strong></td>
													<td align="right"><img id="msg" src="http://prod.2adpro.com/images/f-maximize.gif" style="vertical-align:middle; cursor:pointer" border="0" onclick="minmax('Messaging',this.id)" /></td>
												</tr>
												</table>
											</td>
										</tr>
										<tr id="Messaging" style="display:none">
											<td>													
											<table width="90%" cellspacing="0" cellpadding="0" align="center" style="border:1px thin #F0F0F0; border-width:1px;border-collapse:collapse;" >
												<tr>
													<td  style="background-color:#FFFFFF;border:solid 1px #e9e9e9">
														
														<table cellpadding="0" cellspacing="0" style="margin-top:15px; margin-left:15px;border:1px thin #F0F0F0; border-width:1px;"  >		
															<tr>
																<td width="1" style="color:#669966; font-size:12px; font-weight:bold; font-family:Verdana, Arial, Helvetica, sans-serif;text-decoration:none;" id="id23" valign="top"><a href="#" onclick="expandCollapse('id23','Messaging1');return false;" style="text-decoration:none" ><img src="http://prod.2adpro.com/images/pluse.jpg" border="0"></a></td><td class="descH"><a href="#" onclick="expandCollapse('id23','Messaging1');return false;" style="text-decoration:none; cursor:pointer;">How can I communicate with your production team?</a></td>
															</tr>
															<tr id="Messaging1" style="display:none" > 
																	<td colspan="2" class="descBody">The best way to communicate with our team is by using the messaging facility within JobDirect.  This will guarantee that all messages are seen immediately by the production team.  This also ensures that all communication is tracked and helps us with our quality audit.  Our customer service team is also available round the clock to assist you.  They can be reached by e-mail at support@2adpro.com and by Skype at production-2adpro.</td>
															</tr>
														</table>
													</td>
												</tr>
												<tr>
													<td  style="background-color:#FFFFFF;border:solid 1px #e9e9e9">
														<table cellpadding="0" cellspacing="0" style="margin-top:15px; margin-left:15px;border:1px thin #F0F0F0; border-width:1px;"  >		
															<tr>
																<td width="1"style="color:#669966; font-size:12px; font-weight:bold; font-family:Verdana, Arial, Helvetica, sans-serif;text-decoration:none;" id="id24" valign="top"><a href="#" onclick="expandCollapse('id24','Messaging2');return false;" style="text-decoration:none" ><img src="http://prod.2adpro.com/images/pluse.jpg" border="0"></a></td><td class="descH"><a href="#" onclick="expandCollapse('id24','Messaging2');return false;" style="text-decoration:none; cursor:pointer;">How do I find out when a particular ad will be done?</a></td>
															</tr>
															<tr id="Messaging2" style="display:none">
																<td colspan="2" class="descBody">You can either post a message on the ad within JobDirect or send an e-mail to support@2adpro.com or contact us via Skype at production-2adpro.</td>
															</tr>
														</table>
													</td>
												</tr>
												<tr>
													<td  style="background-color:#FFFFFF;border:solid 1px #e9e9e9">
														<table cellpadding="0" cellspacing="0" style="margin-top:15px; margin-left:15px;margin-bottom:15px;border:1px thin #F0F0F0; border-width:1px;"  >		
															<tr>
																<td width="1"style="color:#669966; font-size:12px; font-weight:bold; font-family:Verdana, Arial, Helvetica, sans-serif;text-decoration:none;" id="id25" valign="top"><a href="#" onclick="expandCollapse('id25','Messaging3');return false;" style="text-decoration:none" ><img src="http://prod.2adpro.com/images/pluse.jpg" border="0"></a></td><td class="descH"><a href="#" onclick="expandCollapse('id25','Messaging3');return false;" style="text-decoration:none; cursor:pointer;">I received a notification that my ad is on hold for non-compliance.  What does this mean?</a></td>
															</tr>
															<tr id="Messaging3" style="display:none">
																<td colspan="2" class="descBody">Occassionally we receive an order where either the instructions/copy are not clear or an attached element is not usable.  In the event that the input is not sufficient for us to work on the ad, we will flag the ad as Non-Compliant, which in turn will trigger a notification to you.</td>
															</tr>										
														</table>
														</td>
													</tr>	
												</table>
											</td>
										</tr>
										<tr><td height="3"></td></tr>
										<tr>
											<td>
												<table width="90%"  border="0" cellspacing="0" cellpadding="0" align="center"  background="http://prod.2adpro.com/images/faq-head-bg.gif" class="highlight">
												<tr >
													<td height="10"   id="selectVAL"  colspan="2" style="padding-left:10px;"> <strong>Revise Order</strong></td>
													<td align="right"><img id="ro" src="http://prod.2adpro.com/images/f-maximize.gif" style="vertical-align:middle; cursor:pointer" border="0" onclick="minmax('Revise Order',this.id)" /></td>
												</tr>
												</table>
											</td>
										</tr>
										<tr  id="Revise Order" style="display:none">
											<td>													
											<table width="90%" cellspacing="0" cellpadding="0" align="center" style="border:1px thin #F0F0F0; border-width:1px;border-collapse:collapse;" >
												<tr>
													<td  style="background-color:#FFFFFF;border:solid 1px #e9e9e9">
														
														<table cellpadding="0" cellspacing="0" style="margin-top:15px; margin-left:15px;border:1px thin #F0F0F0; border-width:1px;"  >		
															<tr>
															<td width="1" style="color:#669966; font-size:12px; font-weight:bold; font-family:Verdana, Arial, Helvetica, sans-serif;text-decoration:none;" id="id26" valign="top"><a href="#" onclick="expandCollapse('id26','Revise Order1');return false;" style="text-decoration:none" ><img src="http://prod.2adpro.com/images/pluse.jpg" border="0"></a></td><td class="descH"><a href="#" onclick="expandCollapse('id26','Revise Order1');return false;" style="text-decoration:none; cursor:pointer;">How do I make changes to an ad that you built? </a></td>
														</tr>
														<tr id="Revise Order1" style="display:none" > 
																<td colspan="2" class="descBody">You can use the Revise functionality within JobDirect to send the changes to us.  The revision feature allows you to specify your changes as comments or on-line markups.  You can also send us additional attachments.</td>
														</tr>
														</table>
													</td>
												</tr>
												<tr>
													<td  style="background-color:#FFFFFF;border:solid 1px #e9e9e9">
														<table cellpadding="0" cellspacing="0" style="margin-top:15px; margin-left:15px;border:1px thin #F0F0F0; border-width:1px;"  >		
															<tr>
															<td width="1" style="color:#669966; font-size:12px; font-weight:bold; font-family:Verdana, Arial, Helvetica, sans-serif;text-decoration:none;" id="id27" valign="top"><a href="#" onclick="expandCollapse('id27','Revise Order2');return false;" style="text-decoration:none" ><img src="http://prod.2adpro.com/images/pluse.jpg" border="0"></a></td><td class="descH"><a href="#" onclick="expandCollapse('id27','Revise Order2');return false;" style="text-decoration:none; cursor:pointer;">How quickly can I expect my changes to be completed?</a></td>
														</tr>
														<tr id="Revise Order2" style="display:none" > 
																<td colspan="2" class="descBody">Most revisions are completed within two to three hours of receipt.  But if the changes are complex, then it might take some extra time to complete.</td>
														</tr>
														</table>
													</td>
												</tr>
												<tr>
													<td  style="background-color:#FFFFFF;border:solid 1px #e9e9e9">
														<table cellpadding="0" cellspacing="0" style="margin-top:15px; margin-left:15px;margin-bottom:15px;border:1px thin #F0F0F0; border-width:1px;"  >		
															<tr>
															<td width="1" style="color:#669966; font-size:12px; font-weight:bold; font-family:Verdana, Arial, Helvetica, sans-serif;text-decoration:none;" id="id28" valign="top"><a href="#" onclick="expandCollapse('id28','Revise Order3');return false;" style="text-decoration:none" ><img src="http://prod.2adpro.com/images/pluse.jpg" border="0"></a></td><td class="descH"><a href="#" onclick="expandCollapse('id28','Revise Order3');return false;" style="text-decoration:none; cursor:pointer;">How do I mark up an ad online? </a></td>
														</tr>
														<tr id="Revise Order3" style="display:none" > 
																<td colspan="2" class="descBody">JobDirect provides a new on-line markup tool called eRevision.  Using this tool, you can open an ad in your browser, add comments directly in the ad and submit it to us for corrections.</td>
														</tr>																		
													</table>
													</td>
												</tr>	
											</table>
										</td>
									</tr>
										<tr><td height="3"></td></tr>
											<tr>
										<td>
											<table width="90%"  border="0" cellspacing="0" cellpadding="0" align="center"  background="http://prod.2adpro.com/images/faq-head-bg.gif" class="highlight">
											<tr >
												<td height="10"   id="selectVAL"  colspan="2" style="padding-left:10px;"> <strong>Reports</strong></td>
												<td align="right"><img id="re" src="http://prod.2adpro.com/images/f-maximize.gif" style="vertical-align:middle; cursor:pointer" border="0" onclick="minmax('Reports',this.id)" /></td>
											</tr></table>
										</td>
									</tr>
										<tr  id="Reports" style="display:none">
										<td>													
											<table width="90%" cellspacing="0" cellpadding="0" align="center" style="border:1px thin #F0F0F0; border-width:1px;border-collapse:collapse;" >
												<tr>
													<td  style="background-color:#FFFFFF;border:solid 1px #e9e9e9">
														
														<table cellpadding="0" cellspacing="0" style="margin-top:15px; margin-left:15px;border:1px thin #F0F0F0; border-width:1px;"  >		
															<tr>
																<td width="1" style="color:#669966; font-size:12px; font-weight:bold; font-family:Verdana, Arial, Helvetica, sans-serif;text-decoration:none;" id="id29" valign="top"><a href="#" onclick="expandCollapse('id29','Reports1');return false;" style="text-decoration:none" ><img src="http://prod.2adpro.com/images/pluse.jpg" border="0"></a></td><td class="descH"><a href="#" onclick="expandCollapse('id29','Reports1');return false;" style="text-decoration:none; cursor:pointer;">I would like to receive consolidated reports on a regular, monthly basis. </a></td>
															</tr>
															<tr id="Reports1" style="display:none" > 
																<td colspan="2" class="descBody">Weekly production summaries and dashboards are published on a weekly basis. These are available on request.</td>
															</tr>																		
														</table>
													</td>
												</tr>	
											</table>
										</td>
									</tr>
									<tr><td height="3"></td></tr>
											<tr>
												<td>
												<table width="90%"  border="0" cellspacing="0" cellpadding="0" align="center"  background="http://prod.2adpro.com/images/faq-head-bg.gif" class="highlight">
												<tr >
													<td height="10"   id="selectVAL"  colspan="2" style="padding-left:10px;"> <strong>Download Ad</strong></td>
													<td align="right"><img id="da" src="http://prod.2adpro.com/images/f-maximize.gif" style="vertical-align:middle; cursor:pointer" border="0" onclick="minmax('Download Ad',this.id)" /></td>
												</tr>
												</table>
											</td>
										</tr>	
										<tr  id="Download Ad" style="display:none">
										<td>													
											<table width="90%" cellspacing="0" cellpadding="0" align="center" style="border:1px thin #F0F0F0; border-width:1px;border-collapse:collapse;" >
												<tr>
													<td  style="background-color:#FFFFFF;border:solid 1px #e9e9e9">
														
														<table cellpadding="0" cellspacing="0" style="margin-top:15px; margin-left:15px;border:1px thin #F0F0F0; border-width:1px;"  >		
															<tr>
															<td width="1" style="color:#669966; font-size:12px; font-weight:bold; font-family:Verdana, Arial, Helvetica, sans-serif;text-decoration:none;" id="id30" valign="top"><a href="#" onclick="expandCollapse('id30','Download Ad1');return false;" style="text-decoration:none" ><img src="http://prod.2adpro.com/images/pluse.jpg" border="0"></a></td><td class="descH"><a href="#" onclick="expandCollapse('id30','Download Ad1');return false;" style="text-decoration:none; cursor:pointer;">How do I know when my ad is complete?</a></td>
														</tr>
														<tr id="Download Ad1" style="display:none" > 
																<td colspan="2" class="descBody">As soon as an ad is completed by 2AdPro, it is uploaded into JobDirect.  This will trigger an e-mail notification to you.  If we have an automated delivery system configured for you, the file will become available on the designated ftp site as soon as it is complete.  All completed ads will be available in JobDirect. </td>
														</tr>
														</table>
													</td>
												</tr>
												<tr>
													<td  style="background-color:#FFFFFF;border:solid 1px #e9e9e9">
														<table cellpadding="0" cellspacing="0" style="margin-top:15px; margin-left:15px;margin-bottom:15px;border:1px thin #F0F0F0; border-width:1px;"  >		
															<tr>
															<td width="1" style="color:#669966; font-size:12px; font-weight:bold; font-family:Verdana, Arial, Helvetica, sans-serif;text-decoration:none;" id="id31" valign="top"><a href="#" onclick="expandCollapse('id31','Download Ad2');return false;" style="text-decoration:none" ><img src="http://prod.2adpro.com/images/pluse.jpg" border="0"></a></td><td class="descH"><a href="#" onclick="expandCollapse('id31','Download Ad2');return false;" style="text-decoration:none; cursor:pointer;">How will the completed ad be sent to me?</a></td>
														</tr>
														<tr id="Download Ad2" style="display:none" > 
																<td colspan="2" class="descBody">All print ads are sent as PDFs.  Web ads are sent in a GIF or SWF format.  Based on the agreement that 2Adpro has with your publisher, we may also delivery a native file in a compressed format.</td>
														</tr>																		
													</table>
													</td>
												</tr>	
											</table>
										</td>
									</tr>
										<tr><td height="3"></td></tr>
									<tr>
										<td>
											<table width="90%"  border="0" cellspacing="0" cellpadding="0" align="center"  background="http://prod.2adpro.com/images/faq-head-bg.gif" class="highlight">
											<tr >
												<td height="10"   id="selectVAL"  colspan="2" style="padding-left:10px;"> <strong>Miscellaneous</strong></td>
												<td align="right"><img id="mi" src="http://prod.2adpro.com/images/f-maximize.gif" style="vertical-align:middle; cursor:pointer" border="0" onclick="minmax('Miscellaneous',this.id)" /></td>
											</tr>
											</table>
										</td>
									</tr>
										<tr  id="Miscellaneous" style="display:none">
											<td>													
												<table width="90%" cellspacing="0" cellpadding="0" align="center" style="border:1px thin #F0F0F0; border-width:1px;border-collapse:collapse;" >
													<tr>
														<td  style="background-color:#FFFFFF;border:solid 1px #e9e9e9">														
																<table cellpadding="0" cellspacing="0" style="margin-top:15px; margin-left:15px;border:1px thin #F0F0F0; border-width:1px;"  >		
																<tr>
																	<td width="1" style="color:#669966; font-size:12px; font-weight:bold; font-family:Verdana, Arial, Helvetica, sans-serif;text-decoration:none;" id="id32" valign="top"><a href="#" onclick="expandCollapse('id32','Miscellaneous1');return false;" style="text-decoration:none" ><img src="http://prod.2adpro.com/images/pluse.jpg" border="0"></a></td><td class="descH"><a href="#" onclick="expandCollapse('id32','Miscellaneous1');return false;" style="text-decoration:none; cursor:pointer;">Do you build ads in different languages?</a></td>
																</tr>
																<tr id="Miscellaneous1" style="display:none" > 
																	<td colspan="2" class="descBody">Yes. As long as the copy is provided, we can build ads in any language, especially, German, Italian, Arabic, and Spanish. </td>
																</tr>
															</table>
														</td>
													</tr>
													<tr>
														<td  style="background-color:#FFFFFF;border:solid 1px #e9e9e9">
															<table cellpadding="0" cellspacing="0" style="margin-top:15px; margin-left:15px;border:1px thin #F0F0F0; border-width:1px;"  >		
																<tr>
																<td width="1" style="color:#669966; font-size:12px; font-weight:bold; font-family:Verdana, Arial, Helvetica, sans-serif;text-decoration:none;" id="id33" valign="top"><a href="#" onclick="expandCollapse('id33','Miscellaneous2');return false;" style="text-decoration:none" ><img src="http://prod.2adpro.com/images/pluse.jpg" border="0"></a></td><td class="descH"><a href="#" onclick="expandCollapse('id33','Miscellaneous2');return false;" style="text-decoration:none; cursor:pointer;">What is the offline support provided in case I want to reach someone in production offline?</a></td>
															</tr>
															<tr id="Miscellaneous2" style="display:none" > 
																	<td colspan="2" class="descBody">Support may be requested via multiple channels, such as, skype for real time (production-2adpro), via voice chat, and email (support @2adpro.com). All these contacts are monitored 24/7.</td>
															</tr>
															</table>
														</td>
													</tr>
													<tr>
														<td  style="background-color:#FFFFFF;border:solid 1px #e9e9e9">
															<table cellpadding="0" cellspacing="0" style="margin-top:15px; margin-left:15px;border:1px thin #F0F0F0; border-width:1px;"  >		
																<tr>
																<td width="1" style="color:#669966; font-size:12px; font-weight:bold; font-family:Verdana, Arial, Helvetica, sans-serif;text-decoration:none;" id="id34" valign="top"><a href="#" onclick="expandCollapse('id34','Miscellaneous3');return false;" style="text-decoration:none" ><img src="http://prod.2adpro.com/images/pluse.jpg" border="0"></a></td><td class="descH"><a href="#" onclick="expandCollapse('id34','Miscellaneous3');return false;" style="text-decoration:none; cursor:pointer;">Do you provide alternate mechanism to send you large files? </a></td>
															</tr>
															<tr id="Miscellaneous3" style="display:none" > 
																	<td colspan="2" class="descBody">Yes. Files may be transferred via FTP.  If you need to have this setup, please contact us at support@2adpro.com.</td>
															</tr>
															</table>
														</td>
													</tr>
													<tr>
														<td  style="background-color:#FFFFFF;border:solid 1px #e9e9e9">
															<table cellpadding="0" cellspacing="0" style="margin-top:15px; margin-left:15px;border:1px thin #F0F0F0; border-width:1px;"  >		
																<tr>
																<td width="1" style="color:#669966; font-size:12px; font-weight:bold; font-family:Verdana, Arial, Helvetica, sans-serif;text-decoration:none;" id="id35" valign="top"><a href="#" onclick="expandCollapse('id35','Miscellaneous4');return false;" style="text-decoration:none" ><img src="http://prod.2adpro.com/images/pluse.jpg" border="0"></a></td><td class="descH"><a href="#" onclick="expandCollapse('id35','Miscellaneous4');return false;" style="text-decoration:none; cursor:pointer;">Do you have sample ads produced by 2AdPro? </a></td>
															</tr>
															<tr id="Miscellaneous4" style="display:none" > 
																	<td colspan="2" class="descBody">Please visit the 2adpro.com website for a glimpse of our gallery.</td>
															</tr>
															</table>
														</td>
													</tr>
													<tr>
														<td  style="background-color:#FFFFFF;border:solid 1px #e9e9e9">
															<table cellpadding="0" cellspacing="0" style="margin-top:15px; margin-left:15px;margin-bottom:15px;border:1px thin #F0F0F0; border-width:1px;"  >		
																<tr>
																	<td width="1" style="color:#669966; font-size:12px; font-weight:bold; font-family:Verdana, Arial, Helvetica, sans-serif;text-decoration:none;" id="id36" valign="top"><a href="#" onclick="expandCollapse('id36','Miscellaneous5');return false;" style="text-decoration:none" ><img src="http://prod.2adpro.com/images/pluse.jpg" border="0"></a></td><td class="descH"><a href="#" onclick="expandCollapse('id36','Miscellaneous5');return false;" style="text-decoration:none; cursor:pointer;">Which browsers are supported by JobDirect?</a></td>
																</tr>
																<tr id="Miscellaneous5" style="display:none" > 
																	<td colspan="2" class="descBody">JobDirect is compatible with IE 6.0 or higher on a PC and FIRE FOX 2.4 or higher on a PC or Mac.</td>
																</tr>																
															</table>
														</td>
													</tr>
												</table>
											</td>
										</tr>	
									</table>
																	
							

<?
if(isset($param1)){
?>
<script language="javascript">
	minmax('<?=$param1?>','<?=$param2?>');
</script>
<?
}
?>		


