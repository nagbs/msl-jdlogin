<?php
/**
 * View Controller for Order
 *
 * @category   PROD JD 3.0
 * @package    ViewController
 * @subpackage ViewController
 * @author     2Adpro Team <manoj@ninestars.in>
 * @copyright  2012 2adpro.com. (http://www.2adpro.com)
 * @license    http://2adpro.com/license  Software License
 * @version    JD 3.0
 * @link       http://2adpro.com/
 * @since      Class available JD 3.0
*/

class ViewController extends Zend_Controller_Action
{	
	
		/**
	     * Function for view home page functionality 
	     * 
	     * @return null.
	    */
		public function indexAction() {
			//check server availability
			$redirect_url = $this->serveravailability();

			$this->_helper->redirector->gotoUrlAndExit($redirect_url);
			
			$this->view->headTitle("Job Direct 3 - Enterprise");
			//$this->_helper->layout->disableLayout(); 
			//$this->view->headLink()->appendStylesheet('/css/example.css');
        	//$this->view->headScript()->appendFile('/js/example.js');
			//Zend_Layout::startMvc(array('layoutPath'=>'../application/v31/layouts'));
			$this->renderScript("view/dashboard.phtml");
		}

	 	/**
	     * The Constructor for the class
	     * 
	     * @return null
	    */		
		public function init() { //Initialization
	    	/*
	    	$basic_search_fields[0] = "SAVED_FILTERS";
			$basic_search_fields[1] = "SORT_BY";
			$basic_search_fields[0] = "Order Status";
			$basic_search_fields[1] = "Order Type";
			$basic_search_fields[2] = "Product";
			$basic_search_fields[3] = "Site";
			$basic_search_fields[4] = "Ad Category";
			$basic_search_fields[5] = "Print Artistic Discretion";
	    	
	    	$rest_obj = new JD_RestService(SERVICE_HTTP_PATH, $_SESSION['UserId'],$_SESSION['auth_token']);
	    	 
	    	$rest_obj->requestName = 'searchform';
	    	 
	    	$rest_obj->requestData = '';
	    	 
	    	$rest_obj->requestType = "html";
	    	 
	    	$rest_obj->responseType = "json";
	    	
	    	$rest_obj->requestParams = $basic_search_fields;
	    	 
	    	$rest_obj->getData();
	    	 
	    	$this->view->formFields = $rest_obj->response;
	    	*/
	    }
	    
	    /**
	     * Function for dashboard Action 
	     * 
	     * @return null.
	    */
		public function dashboardAction()
		{
			if ($this->_request->isPost()) {
				$post_data = $this->_request->getPost();
							
				$rest_obj = new JD_RestService(SERVICE_HTTP_PATH,$_SESSION['UserId'],$_SESSION['auth_token']);
				
				$rest_obj->requestName = 'dashboard';
				$rest_obj->requestData = '';
				$rest_obj->requestType = 'html';
				$rest_obj->responseType = 'json';
				$rest_obj->requestParams = array("request_action"=>"DASHBOARD_DATA","userid"=>$_SESSION['UserId']);
				$rest_obj->listData();
				
				//print_r($rest_obj->response);
				
				
				
				if ($rest_obj->response->status == 'success')
				{
					$this->view->dshbrd_det = $rest_obj->response->dshbrd_detail;
				}
				
				
    		}
			
		}
		
		/**
		 * Function for OrderList functionality 
		 * Serves an Ajax Request
		 * 
		 * @return null.
		*/
		public function orderlistAction()
		{
			// If is POST Request
			if ($this->_request->isPost()) {
				
				$post_data = $this->_request->getPost();
				/*
				foreach($post_data as $key=>$value)
				{
					$post_data[$key] = str_replace(" ", "_", $value);
				}
				*/				
				#print '<pre>';print_r($post_data);exit();
				
				/*if(isset($post_data['Status']))
				{
					$status_arr = array();
					foreach($post_data['Status'] as $skey => $sval)
					{
						if(trim($val)!='')
						{
							$status_arr[] = $post_data['Status'];
						}
					}
					
					$post_data['Status'] = implode(',',$status_arr);
				}*/
				
				if(isset($post_data['loadmore']))
				{
					$post_data = array_merge($_SESSION['order_post_data'],$post_data);
					unset($_SESSION['order_post_data']);
				}
				else
				{					
					$post_data['system'] = $_SESSION['system'];
				}
				
				$rest_obj = new JD_RestService(SERVICE_HTTP_PATH,$_SESSION['UserId'],$_SESSION['auth_token']);
				
				$rest_obj->requestName = 'searchorders';
				$rest_obj->requestData = '';
				$rest_obj->requestType = 'html';
				$rest_obj->responseType = 'json';
				$rest_obj->requestParams = $post_data;
				$rest_obj->listData();
				
				//if(!isset($post_data['loadmore']))
				//{
				$_SESSION['order_post_data'] = $post_data;
				//}
				//print_r($rest_obj);
				//exit;
				
				if ($rest_obj->response->Status == 'Success') {	
					$orders	=	(array)$rest_obj->response->Orders;
					// $this->_redirect('/view/orderlist');
					$this->view->orders = $orders;
				} else {
					$this->error = $rest_obj->response->Status;
				}
    		}
		} // End orderlistAction
		
		
		/**
		 * Function for MagazineList functionality
		 * Serves an Ajax Request
		 *
		 * @return null.
		 */
		public function magazinelistAction()
		{
			// If is POST Request
			if ($this->_request->isPost()) {
		
				$post_data = $this->_request->getPost();
				
				$post_data['magazine_order'] = '1';
				
				if(isset($post_data['loadmore']))
				{
					$post_data = array_merge($_SESSION['order_post_data'],$post_data);
					unset($_SESSION['order_post_data']);
				}
				else
				{
					$post_data['system'] = $_SESSION['system'];
				}
		
				$rest_obj = new JD_RestService(SERVICE_HTTP_PATH,$_SESSION['UserId'],$_SESSION['auth_token']);
		
				$rest_obj->requestName = 'searchorders';
				$rest_obj->requestData = '';
				$rest_obj->requestType = 'html';
				$rest_obj->responseType = 'json';
				$rest_obj->requestParams = $post_data;
				$rest_obj->listData();
		
				$_SESSION['order_post_data'] = $post_data;
				
				if ($rest_obj->response->Status == 'Success') {
					$orders	=	(array)$rest_obj->response->Orders;
					$this->view->orders = $orders;
				} else {
					$this->error = $rest_obj->response->Status;
				}
			}
		} // End orderlistAction
								
		/**
		 * Function for CampaignList functionality
		 * Serves an Ajax Request
		 *
		 * @return null.
		 */
		public function campaignlistAction()
		{
			// If is POST Request
			if ($this->_request->isPost()) {
		
				$post_data = $this->_request->getPost();
		
				$post_data['campaign_order'] = '1';
		
				if(isset($post_data['loadmore']))
				{
					$post_data = array_merge($_SESSION['order_post_data'],$post_data);
					unset($_SESSION['order_post_data']);
				}
				else
				{
					$post_data['system'] = $_SESSION['system'];
				}
		
				$rest_obj = new JD_RestService(SERVICE_HTTP_PATH,$_SESSION['UserId'],$_SESSION['auth_token']);
		
				$rest_obj->requestName = 'searchorders';
				$rest_obj->requestData = '';
				$rest_obj->requestType = 'html';
				$rest_obj->responseType = 'json';
				$rest_obj->requestParams = $post_data;
				$rest_obj->listData();
		
				$_SESSION['order_post_data'] = $post_data;
		
				if ($rest_obj->response->Status == 'Success') {
					$orders	=	(array)$rest_obj->response->Orders;
					$this->view->orders = $orders;
				} else {
					$this->error = $rest_obj->response->Status;
				}
			}
		} 
		// End campaignlistAction
		
		//Notifications Action
		public function messagesAction()
		{
			// If is POST Request
			if ($this->_request->isPost()) {
				$post_data = $this->_request->getPost();
				
				//print_r($post_data);exit;
				if (isset($post_data['priority']) && $post_data['priority']!='' )
				{
					$priority = $post_data['priority'];
				}
				else 
				{
					$priority = '';
				}

				$page = $post_data['msgpage'];
				
				$rest_obj = new JD_RestService(SERVICE_HTTP_PATH,$_SESSION['UserId'],$_SESSION['auth_token']);
				$rest_obj->requestName = 'message';
				$rest_obj->requestData = '';
				$rest_obj->requestType = 'html';
				$rest_obj->responseType = 'json';
				$rest_obj->requestParams = array("UserId"=>$_SESSION['UserId'],"priority"=>$priority,"page"=>$page);
				$rest_obj->listData();
				//print_r($rest_obj);
				//exit;
				$this->view->mess = $rest_obj->response;
    		}
		} // End Notifications
		
		
		public function messagereadAction()
		{
			if ($this->_request->isPost()) {
				$post_data = $this->_request->getPost();
				
				$rest_obj = new JD_RestService(SERVICE_HTTP_PATH,$_SESSION['UserId'],$_SESSION['auth_token']);
				
				$rest_obj->requestName = 'message';
				$rest_obj->requestData = $post_data['jobno'];
				$rest_obj->requestType = 'html';
				$rest_obj->responseType = 'json';
				$rest_obj->requestParams = $post_data;
				$rest_obj->updateData();
				$this->view->mess = $rest_obj->response;
				
				//print_r($this->view->mess);
			}
			exit();
			
		}
		
		public  function filterselectAction()
		{
			if ($this->_request->isPost()) {
				$post_data = $this->_request->getPost();
				$filtername = ($post_data['filtername']);
				//exit();
				$rest_obj = new JD_RestService(SERVICE_HTTP_PATH,$_SESSION['UserId'],$_SESSION['auth_token']);
				
				$rest_obj->requestName = 'searchfilters';
				$rest_obj->querydata = $post_data;
				$rest_obj->requestData = '1';
				$rest_obj->requestType = 'html';
				$rest_obj->responseType = 'json';
				$rest_obj->getData();
				
				echo json_encode($rest_obj->response);
				exit;
				//$this->view->fields = $rest_obj->response;
			}	
		}

		public function printAction()
		{
			$post_data = $this->_request->getParams();
			
			$request_params = array("request_product" => 'JD');
			
			$rest_obj = new JD_RestService(SERVICE_HTTP_PATH, $_SESSION['UserId'],$_SESSION['auth_token']);
			$rest_obj->requestName = 'orders';
			$rest_obj->requestData = $post_data['id'];
			$rest_obj->querydata = $request_params;
			$rest_obj->requestType = "html";
			$rest_obj->responseType = "json";
			
			$rest_obj->getData();
				
			foreach ($rest_obj->response->Orders as $key => $value)
			{
				$site =$rest_obj->response->Orders->$key->OrderInformation->Site;
				$status = $rest_obj->response->Orders->$key->OrderInformation->Status;
			}
			
			$this->view->orderdetails = $rest_obj->response;
			//print_r($this->view->orderdetails);
		}
		
		
		public function checksessionexpireAction()
		{
			if( (!isset($_SESSION['UserId']) || $_SESSION['UserId']=='') && isset($_SERVER['REQUEST_URI']))
			{
				#if((substr_count($_SERVER['REQUEST_URI'],'index/login')==0) && (substr_count($_SERVER['REQUEST_URI'],'/')==0))
				if((substr_count($_SERVER['REQUEST_URI'],'index/login')==0)
				&& (substr_count($_SERVER['REQUEST_URI'],'index/forgotpwd')==0)
				&& (substr_count($_SERVER['REQUEST_URI'],'index/resetpwd')==0)
						&& (substr_count($_SERVER['REQUEST_URI'],'index/resettingpwd')==0)
								)
					{
						echo '0';
						exit();
					}
			}
			echo  '1';
			exit();
		}
		
		public function getactivetabsAction()
		{

			if($_SESSION['UserId'] == 'demouser1')
			{
				//print_r($_SESSION);exit;
			}
			
			if( ($_SESSION['UserId']!='') && isset($_SERVER['REQUEST_URI']) )
			{
				if($_SESSION['SiteMagazine']=='1' && $_SESSION['SiteCampaign'] =='1')
				{
					echo '4';
				}
				else if($_SESSION['SiteCampaign'] =='1')
				{
					echo '3';	
				}
				else if($_SESSION['SiteMagazine']=='1')
				{
					echo '2';
				}
				else 
				{
					echo '1';
				}
				exit();
			}
			
		}
		
		public function serveravailability()
		{
			$url = '';
			
			$post_data = array('corp_id'=>$_SESSION['CorporateId'], 'formaction' => 'get_server_preference');
			$rest_obj = new JD_RestService(SERVICE_HTTP_PATH,$_SESSION['UserId'],$_SESSION['auth_token']);
			
			$rest_obj->requestName = 'corporate';
			$rest_obj->querydata = $post_data;
			$rest_obj->requestData = '1';
			$rest_obj->requestType = 'html';
			$rest_obj->responseType = 'json';
			$rest_obj->getData();
			//print_r($rest_obj->response); exit;	
			$first_server = $rest_obj->response->server_preference->first_server;
			$second_server = $rest_obj->response->server_preference->second_server;
			$third_server = $rest_obj->response->server_preference->third_server;
		
			$ch = curl_init("$first_server/Serverstatus/serveravailability");
			curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
			curl_setopt($ch, CURLOPT_BINARYTRANSFER, true);
			$server_status = curl_exec($ch);
				
			if($server_status == 'Success')
			{
				$url = "$first_server/view/index";
			} 
			else 
			{
				$ch = curl_init("$second_server/Serverstatus/serveravailability");
				curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
				curl_setopt($ch, CURLOPT_BINARYTRANSFER, true);
				$server_status = curl_exec($ch);
				
				if($server_status == 'Success')
				{
					$url = "$second_server/view/index";
				}
				else 
				{
					$ch = curl_init("$third_server/Serverstatus/serveravailability");
					curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
					curl_setopt($ch, CURLOPT_BINARYTRANSFER, true);
					$server_status = curl_exec($ch);
					
					if($server_status == 'Success')
					{
						$url = "$third_server/view/index";
					}
				}
			}
			
			return $url;
		}
}
