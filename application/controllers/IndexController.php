<?php
/**
 * Index Controller for Order
 *
 * @category   PROD JD 3.0
 * @package    IndexController
 * @subpackage IndexController
 * @author     2Adpro Team <team@ninestars.in>
 * @copyright  2012 2adpro.com. (http://www.2adpro.com)
 * @license    http://2adpro.com/license  Software License
 * @version    JD 3.0
 * @link       http://2adpro.com/
 * @since      Class available JD 3.0
*/

class IndexController extends Zend_Controller_Action
{	
	
	/**
	 * Function for indexAction functionality 
	 * Serves to check login
	 * 
	 * @return object (in view).
	*/
	public function indexAction() {
		
		if (isset ($_SESSION['UserId']) && $_SESSION['UserId']!='') {
			$this->_redirect('/view/index');
		} else {
			$this->_redirect('/index/login');
		}
	}
	
	/**
	 * Function for loginAction functionality 
	 * Serves to login
	 * 
	 * @return object (in view).
	*/
	public function loginAction()
	{		
		if (isset ($_SESSION['UserId']) && $_SESSION['UserId']!='') {
			$this->_redirect('/view/index');
		} 
		
		$form = new JD_LoginForm();
		$this->view->form = $form;	
		
		if($this->_request->isPost())
		{
			######	User Login Tracking ######	
			//Test if it is a shared client
			if (!empty($_SERVER['HTTP_CLIENT_IP']))
			{
				$ip=$_SERVER['HTTP_CLIENT_IP'];
				//Is it a proxy address
			}
			elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR']))
			{
				$ip=$_SERVER['HTTP_X_FORWARDED_FOR'];
			}
			else
			{
				$ip=$_SERVER['REMOTE_ADDR'];
			}
				
			//The value of $ip at this point would look something like: "192.0.34.166"
			$ip = ip2long($ip);
				
			$user_agent	=	$_SERVER['HTTP_USER_AGENT'];
			
			$post_data = $this->_request->getPost();
			$username = $post_data['username'];
			$password = $post_data['password'];
			
			$request_params = array('product'=>'JD', 'ip'=>$ip, 'user_agent'=>$user_agent);
			
			$rest_obj = new JD_RestService(SERVICE_HTTP_PATH, $username, $password, 1);
			
			$rest_obj->requestName = 'auth';
			$rest_obj->requestData = $username;
			$rest_obj->requestType = 'html';
			$rest_obj->responseType = 'json';
			$rest_obj->querydata = $request_params;
			$rest_obj->getData();		
			
			
			if($rest_obj->response->Status == 'Success')
			{				
				//--------
				$post_dataForJsonData = $this->_request->getPost();
				$post_dataForJsonData['request_action'] = 'DASHBOARD_DATA';
				$post_dataForJsonData['userid'] = $username;
				#print '<pre>';print_r($post_data);exit();
				$rest_objForJsonData = new JD_RestService(SERVICE_HTTP_PATH,$username,$password);
				
				$rest_objForJsonData->requestName = 'dashboard';
				$rest_objForJsonData->requestData = '';
				$rest_objForJsonData->requestType = 'html';
				$rest_objForJsonData->responseType = 'json';
				$rest_objForJsonData->requestParams = $post_dataForJsonData;
				$rest_objForJsonData->listData();
				
				$jsonDataToDisplayDashboardBox = $rest_objForJsonData->response->dshbrd_detail;
				if ($jsonDataToDisplayDashboardBox == '') {
					$jsonDataToDisplayDashboardBox = '[{"name":"createjobBox","openFlag":1},{"name":"SearchAnythingBox","openFlag":1},{"name":"filterBox","openFlag":1},{"name":"analyticsBox","openFlag":1},{"name":"jobStatusBox","openFlag":1},{"name":"messageAlertBox","openFlag":1}]';
					$post_dataForJsonData['request_action'] = 'UPDATE_DASHBOARD_DATA';
					$post_dataForJsonData['userid'] = $username;
					$post_dataForJsonData['dashboard_detail'] = $jsonDataToDisplayDashboardBox;
					$rest_objForJsonData->requestParams = $post_dataForJsonData;
					$rest_objForJsonData->updateData();
				}
				//---------
				$cookieValue = $jsonDataToDisplayDashboardBox;

				$_SESSION['DataToDisplayDashboardBox'] = $cookieValue;

				$days = 45;
				$domainName = 'prod3';
				$cookieTime = $days*24*60*60*1000;
				//setcookie("jsonBoxCookieData", $jsonDataToDisplayDashboardBox, time()+$cookieTime);  /* expire in 1 hour */
				setcookie("jsonBoxCookieData", $cookieValue, time()+(60*60*24*45), "/");
				//print_r($_COOKIE);exit;
				
				$_SESSION['auth_token']		=	(string)$rest_obj->response->Token;
				$_SESSION['UserId']			=	(string)$rest_obj->response->UserId;
				$_SESSION['SiteId']			=	(string)$rest_obj->response->SiteId;
				$_SESSION['BaseSite']		= (string)$rest_obj->response->BaseSite;
				$_SESSION['FirstName']		=	(string)$rest_obj->response->FirstName;
				$_SESSION['LastName']		=	(string)$rest_obj->response->LastName;
				$_SESSION['Photo']			=	(string)$rest_obj->response->Photo;
				$_SESSION['AccessibleFunctions'] = (array)$rest_obj->response->AccessibleFunctions;
				$_SESSION['HasAccessTo']	=	(string)$rest_obj->response->HasAccessTo;
				$_SESSION['BaseRole']		=	(string)$rest_obj->response->BaseRole;
				$_SESSION['StudioBaseRole']	=	(string)$rest_obj->response->StudioBaseRole;
				$_SESSION['AccessLevel']	=	(string)$rest_obj->response->AccessLevel;
				$_SESSION['OnscreenNotificationFlag']	=	(string)$rest_obj->response->OnscreenNotificationFlag;
				$_SESSION['ToolTips']	=	(string)$rest_obj->response->ToolTips;
				$_SESSION['Logo']	=	CUSTOMER_PIC_PATH.((string)$rest_obj->response->logo);
	
				$_SESSION['Sites']	=	(array)$rest_obj->response->Sites;
				$_SESSION['Regions']	=	(array)$rest_obj->response->Regions;
				$_SESSION['TimeZone']	=(string)$rest_obj->response->TimeZone;
				$_SESSION['site_uom'] = (string)$rest_obj->response->SiteUom;
				
				$_SESSION['DisplayTimeZone']	=(string)$rest_obj->response->DisplayTimeZone;

				$_SESSION['UserCityId']           =       (string)$rest_obj->response->UserCityId;
				$_SESSION['UserCorpId']           =       (string)$rest_obj->response->UserCorpId;
				$_SESSION['UserClustId']          =       (string)$rest_obj->response->UserClustId;

				$_SESSION['isTrafficUser'] = (string)$rest_obj->response->TrafficUser;
                                $_SESSION['TrafficUserId'] = (string)$rest_obj->response->TrafficUserId;

				$_SESSION['JdFlowLogo']	=	CUSTOMER_PIC_PATH.(string)$rest_obj->response->JdFlowLogo;
				
				$_SESSION['SiteMagazine']	=	(string)$rest_obj->response->SiteMagazine;
				$_SESSION['SiteCampaign']	=	(string)$rest_obj->response->SiteCampaign;

				$_SESSION['CorporateId']       =       (string)$rest_obj->response->CorporateId;
				
				$hasAccessTo = explode(",", $_SESSION['HasAccessTo']);
				
				$_SESSION['system'] = 'JD';				

				$_SESSION['Is_Billing_Estimates_Enabled'] = $rest_obj->response->Is_Billing_Estimates_Enabled;
				
				//MM
				$_SESSION['UserSiteId']=(string)$rest_obj->response->SiteId;
				$_SESSION['UserSites']=(array)$rest_obj->response->Sites;
				
				$_SESSION['UserPublisherId']=(string)$rest_obj->response->SiteId;
				
				$_SESSION['privilege']   ='C';
				
				$_SESSION['UserRoles'] = (string)$rest_obj->response->MMBaseRole;
				
				$_SESSION['Corp_id']           =       (string)$rest_obj->response->CorporateId;
				$_SESSION['download_file_access'] = (string)$rest_obj->response->uc_download_file_access;
				$_SESSION['WorkloadTab'] = (string)$rest_obj->response->corp_workload_tab;
				//MM
				
				$this->_redirect('/view/index');
				
				/*		
				1	CPC 	Production Coordinator
				2	CPM 	Customer Production Manager
				3	CRO 	Read Only User
				4	CSR 	Sales Representative
				5	IPA 	Production Artist
				6	IPC 	Production Coordinator
				7	IPM 	Production Manager
				8	IQC 	Quality Control Supervisor
				*/
				
			}
			else
			{
				$this->view->error = $rest_obj->response->Status;
			}
		}
		
		//fetch announcement
		$post_dataForAnnouncement['request_action'] = 'ANNOUNCEMENTS';
		$post_dataForAnnouncement['product'] = 'P';
		$post_dataForAnnouncement['display'] = '1';
		$rest_objForAnnouncement = new JD_RestService(SERVICE_HTTP_PATH,'','');
		$rest_objForAnnouncement->requestName = 'dashboard';
		$rest_objForAnnouncement->requestData = '';
		$rest_objForAnnouncement->requestType = 'html';
		$rest_objForAnnouncement->responseType = 'json';
		$rest_objForAnnouncement->requestParams = $post_dataForAnnouncement;
		$rest_objForAnnouncement->listData();
		$dataToDisplayAnnouncements = $rest_objForAnnouncement->response->msg;
		$this->view->announcements = $dataToDisplayAnnouncements;
		//
	}
	
	/**
	 * Function for logoutAction functionality 
	 * Serves to logout 
	 * 
	 * @return object (in view).
	*/
	public function logoutAction()
	{		
		session_destroy();
		//session_start();
		$_SESSION['msg'] = "Successfully Logged Out";
		$this->_redirect('index/login');					
	
	}
	
	public function announcementAction()
	{		
		
		$post_dataForAnnouncement['request_action'] = 'ANNOUNCEMENTS';
		$post_dataForAnnouncement['product'] = 'P';
		$post_dataForAnnouncement['display'] = '0';
		$rest_objForAnnouncement = new JD_RestService(SERVICE_HTTP_PATH,'','');		
		$rest_objForAnnouncement->requestName = 'dashboard';
		$rest_objForAnnouncement->requestData = '';
		$rest_objForAnnouncement->requestType = 'html';
		$rest_objForAnnouncement->responseType = 'json';
		$rest_objForAnnouncement->requestParams = $post_dataForAnnouncement;
		$rest_objForAnnouncement->listData();
		if 	($rest_objForAnnouncement->response->status == 'success')
		{
			$dataToDisplayAnnouncements = $rest_objForAnnouncement->response->msg;	
			$this->view->announcementsMsg = $dataToDisplayAnnouncements;
			$this->view->announcementsStatus = $rest_objForAnnouncement->response->msg_status;	
			$this->view->announcementsProduct = $rest_objForAnnouncement->response->product;
			$this->view->announcementsId = $rest_objForAnnouncement->response->id;
		}	
		if($this->_request->isPost())
		{					
			$post_data = $this->_request->getPost();
			$post_dataForAnn['id'] = $post_data['id'];
			$post_dataForAnn['product'] = $post_data['product'];
			$post_dataForAnn['status'] = $post_data['status'];
			$post_dataForAnn['msg'] = $post_data['ann_msg'];
			
			$rest_objForAnnouncementnew = new JD_RestService(SERVICE_HTTP_PATH,'','');	
			$rest_objForAnnouncementnew->requestName = 'dashboard';
			$rest_objForAnnouncementnew->requestData = '';
			$rest_objForAnnouncementnew->requestType = 'html';
			$rest_objForAnnouncementnew->responseType = 'json';
			
			if ($post_dataForAnn['id']!='')
			{
				
				$post_dataForAnn['request_action'] = 'UPDATE_ANNOUNCEMENTS';
				$rest_objForAnnouncementnew->requestParams = $post_dataForAnn;
				$rest_objForAnnouncementnew->updateData();
			}
			else 
			{
				$post_dataForAnn['request_action'] = 'CREATE_ANNOUNCEMENTS';
				$rest_objForAnnouncementnew->requestParams = $post_dataForAnn;
				$rest_objForAnnouncementnew->createData();
			}
			
		}
	}
	
	public function forgotpwdAction()
	{
		if($this->_request->isPost())
		{
			$post_data = $this->_request->getPost();
			$rest_objForUser = new JD_RestService(SERVICE_HTTP_PATH,'','');
			$rest_objForUser->requestName = 'users';
			$rest_objForUser->requestData = $post_data['id'];
			$rest_objForUser->requestType = 'html';
			$rest_objForUser->responseType = 'json';
			$rest_objForUser->getData();
			if ($rest_objForUser->response->status == '1')
			{
				$sendermailid = explode(",",$rest_objForUser->response->emailid);
				
				$validator = new Zend_Validate_EmailAddress();
				$sendermailid2 = array();
				for($i=0;$i<count($sendermailid);$i++)
				{
					if($validator->isValid($sendermailid[$i]))
					{
						$sendermailid2[]= $sendermailid[$i];
					}
				}
				if((is_array($sendermailid2) && count($sendermailid2)==0)){
					echo "No Mail ID configured or Invalid Mail ID, Please contact 2adpro <br /><div class='button float-right'><a id='forgot_Ok' class='home' href='#'><span>Ok</span></a>";
					exit();
				}
				
				$sendername=$rest_objForUser->response->firstname.' '.$rest_objForUser->response->lastname;
				
				$string = "abcdefghijklmnopqrstuvwxyz0123456789";
				$randomno ='';
				for($i=0;$i<7;$i++)
				{
					$pos = rand(0,36);
					$randomno .= $string{$pos};
				}
				
				
				$msg="Please click the below link to reset your password \r\n \t \"". HTTP_PATH . "/index/resetpwd/auth/".$randomno."/id/".$post_data['id']."\"";
				/*try{	
				
				$config = array(
				"ssl" => "ssl",
				'auth' =>  "login",
				'port' =>  "465",
				'username' => 'AKIAIEBO2M2KYFKWT2IQ',
				'password' =>  "AlCXQyz++ojmu6+vdyvYJEIyCZv3BlWDA+j2ul4aN4So",
				);

				$transport = new Zend_Mail_Transport_Smtp('email-smtp.eu-west-1.amazonaws.com', $config);
				Zend_Mail::setDefaultTransport($transport);*/


				try{  
                                
                                $config = array(
                                "ssl" => "ssl",
                                'auth' =>  "plain",
                                'port' =>  "465",
                                'username' => 'webmaster@2adproalerts.com',
                                'password' =>  "2@pro_wmg1",
                                );

                                $transport = new Zend_Mail_Transport_Smtp('smtp.gmail.com', $config);
                                Zend_Mail::setDefaultTransport($transport);

				$mail = new Zend_Mail();
				$mail->setFrom('webmaster@2adproalerts.com', '2ADPro Customer Service');	

				if(is_array($sendermailid2))
				{
					foreach($sendermailid2 as $to_email)
					{
						$mail->addTo(trim($to_email));
					}
				}
				else
				{
					$mail->addTo(trim($sendermailid2));
				}

				$mail->setSubject('Password Reset for JD');
				$mail->setBodyText($msg);
				$mail->send();

				}
				catch(Zend_Exception $mze)
				{
					echo $mze->getMessage();
				}
			   
				$rest_objForUserAuth = new JD_RestService(SERVICE_HTTP_PATH,'','');
				$rest_objForUserAuth->requestName = 'users';
				$rest_objForUserAuth->requestData = '';
				$rest_objForUserAuth->requestType = 'html';
				$rest_objForUserAuth->responseType = 'json';
				$rest_objForUserAuth->requestParams = array('userid'=>$post_data['id'],'token'=>$randomno,'request_action'=>'UPDATE_AUTH');
				$rest_objForUserAuth->updateData();
		    	
		    	
				echo "Please check the registered email address for further instructions to reset password <br /><div class='button float-right'><a id='forgot_Ok' class='home' href='#'><span>Ok</span></a></div>";
				//}
				
			} 
			else
			{
				echo "Please check the Username";
			}
		}
		exit();
	}
	
	
	public function resetpwdAction()
	{
		$post_data = $this->_request->getParams();
		//print_r ($post_data);
		$token = $post_data['auth'];
		$id = $post_data['id'];
		$rest_objForUserCheckAuth = new JD_RestService(SERVICE_HTTP_PATH,'','');
		$rest_objForUserCheckAuth->requestName = 'users';
		$rest_objForUserCheckAuth->requestData = $post_data['id'];
		$rest_objForUserCheckAuth->requestType = 'html';
		$rest_objForUserCheckAuth->responseType = 'json';
		$rest_objForUserCheckAuth->getData();
		
		if ($rest_objForUserCheckAuth->response->status == '1')
		{
			if ($rest_objForUserCheckAuth->response->authtoken == $token)
			{
				$this->view->msg = "Success";
				$this->view->id = $post_data['id'];
			}
			else
			{
				$this->view->msg = "Wrong Token";
			}
		}
		else
		{
			$this->view->msg = "This is not a valid Username";
		}
	}
	
	
	public function resettingpwdAction()
	{
		if($this->_request->isPost())
		{
			$data = $this->_request->getPost();
			$rest_objForChangePwd = new JD_RestService(SERVICE_HTTP_PATH,'','');
			$rest_objForChangePwd->requestName = 'users';
			$rest_objForChangePwd->requestData = '';
			$rest_objForChangePwd->requestType = 'html';
			$rest_objForChangePwd->responseType = 'json';
			$rest_objForChangePwd->requestParams = array('userid'=>$data['id'],'pwd'=>$data['pwd'],'request_action'=>'RESET_PWD');
			$rest_objForChangePwd->updateData();
				
			if ($rest_objForChangePwd->response->status == '1');
			{
				echo $rest_objForChangePwd->response->message;
			}	
			
		}
		exit();
	}
	
	
	

} // End IndexController
