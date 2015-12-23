<?php

class RestService
{
	var $serviceUrl;
	var $requestName;
	var $requestParams;
	var $querydata;
	var $requestType;
	var $responseType;
	var $requestData;
	
	var $requestObject;
	var $headers;
	var $html_content_type;
	
	var $user;
	var $pwd;
	
	function __construct($service_url, $username, $password)
	{
		$this->serviceUrl = $service_url;
		$this->requestObject = curl_init();
		curl_setopt($this->requestObject, CURLOPT_RETURNTRANSFER, true);
		
		$this->html_content_type = array( 'xml'  => 'application/xml'
										, 'json' => 'application/json'
										, 'html' => 'text/html'
										, 'post' => 'application/x-www-form-urlencoded'
										, '' => 'application/xml'
										);
		
		$this->headers = array();
		$this->querydata = array();
		$this->requestParams = array();			
		
		$time = strtotime(date('Y-m-d H:i:s'));

		$password = md5($password.$time);
		
		curl_setopt($this->requestObject, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
		curl_setopt($this->requestObject, CURLOPT_USERPWD, "$username:$password");
		curl_setopt($this->requestObject, CURLOPT_TIMEVALUE, $time);
		
	}
	
	public function listData()
	{
		$url = $this->serviceUrl."/".$this->requestName;	

		if(is_array($this->requestParams) && count($this->requestParams)>0)
		{
			$query_string = http_build_query($this->requestParams);		
			$url = $url.'?'.$query_string;
		}
		
		$this->headers[] = "Accept:".$this->html_content_type[$this->responseType];
		$this->headers[] = "Content-Type:".$this->html_content_type['post'];
		 
		curl_setopt($this->requestObject, CURLOPT_URL, $url);
		curl_setopt($this->requestObject, CURLOPT_HTTPHEADER, $this->headers);

		curl_setopt($this->requestObject, CURLOPT_CUSTOMREQUEST, "GET");
		
		if(is_array($this->requestParams) && count($this->requestParams)>0)
		{
			$this->requestParams = http_build_query($this->requestParams);				
		}	
		
		$this->doRequest();
	}
	
	public function getData()
	{
		$url = $this->serviceUrl."/".$this->requestName."/".urlencode($this->requestData);
		
		if(is_array($this->querydata) && count($this->querydata)>0)
		{
			$query_string = http_build_query($this->querydata);		
			$url = $url.'?'.$query_string;
		}
		
		$this->headers[] = "Accept:".$this->html_content_type[$this->responseType];
		$this->headers[] = "Content-Type:".$this->html_content_type['post'];
		 
		curl_setopt($this->requestObject, CURLOPT_URL, $url);
		curl_setopt($this->requestObject, CURLOPT_HTTPHEADER, $this->headers);		 

		$this->doRequest();
	}
	
	public function createData()
	{
		$url = $this->serviceUrl."/".$this->requestName;	

		if(is_array($this->querydata) && count($this->querydata)>0)
		{
			$query_string = http_build_query($this->querydata);		
			$url = $url.'?'.$query_string;
		}
		
		$this->headers[] = "Accept:".$this->html_content_type[$this->responseType];
		$this->headers[] = "Content-Type:".$this->html_content_type['post'];
		 
		curl_setopt($this->requestObject, CURLOPT_URL, $url);
		curl_setopt($this->requestObject, CURLOPT_HTTPHEADER, $this->headers);

		curl_setopt($this->requestObject, CURLOPT_POST, 1);
		
		
		if(is_array($this->requestParams) && count($this->requestParams)>0)
		{
			$this->requestParams = http_build_query($this->requestParams);
		}		
		
		curl_setopt($this->requestObject, CURLOPT_POSTFIELDS, $this->requestParams);
		
		$this->doRequest();
	}
	
	public function updateData()
	{
		$url = $this->serviceUrl."/".$this->requestName."/".$this->requestData;	

		if(is_array($this->querydata) && count($this->querydata)>0)
		{
			$query_string = http_build_query($this->querydata);		
			$url = $url.'?'.$query_string;
		}
		
		$this->headers[] = "Accept:".$this->html_content_type[$this->responseType];
		
		$this->headers[] = "Content-Type:".$this->html_content_type['html'];
		 
		curl_setopt($this->requestObject, CURLOPT_URL, $url);
		curl_setopt($this->requestObject, CURLOPT_HTTPHEADER, $this->headers);

		curl_setopt($this->requestObject, CURLOPT_CUSTOMREQUEST, "PUT");
		
		if(is_array($this->requestParams) && count($this->requestParams)>0)
		{
			$this->requestParams = http_build_query($this->requestParams);				
		}
		
		curl_setopt($this->requestObject, CURLOPT_POSTFIELDS, $this->requestParams);
		
		$this->doRequest();
	}
	
	private function doRequest()
	{
		$response = curl_exec($this->requestObject);
		//echo "<pre>".$response; exit();
		if(curl_getinfo($this->requestObject, CURLINFO_CONTENT_TYPE)=='application/json')
		{
			//echo "<pre>";
			//print_r(json_decode($response));
			/*$form_fields = json_decode($response);
			$this->generateForm($form_fields);*/
			
			$this->response =  json_decode($response);
		}
		else
		{
			header("Content-Type:".curl_getinfo($this->requestObject, CURLINFO_CONTENT_TYPE));
			echo $response;
		}
	}
	
	private function generateForm($formFields)
	{
		foreach($formFields as $fieldid => $field_details)
		{
			$name = $field_details->name;
			$type = $field_details->type;
			
			$parent_field = $field_details->parent;
			switch($type)
			{
				case "text" : echo "$name : <input name='$name' id='$fieldid' type='text' style='display:". (($parent_field!='')?'none':''). "'> <br/> <br />";
								break;
								
				case "list" : echo "$name : <select name='$name' id='$fieldid'  style='display:". (($parent_field!='')?'none':''). "'></select> <br/> <br />";
								break;
								
				case "radio" : echo "$name : <input name='$name' id='$fieldid' type='radio'  style='display:". (($parent_field!='')?'none':''). "'> <br/> <br />";
								break;
								
				case "checkbox" : echo "$name : <input name='$name' id='$fieldid' type='checkbox'  style='display:". (($parent_field!='')?'none':''). "'> <br/> <br />";
								break;
								
				case "textarea" : echo "$name : <textarea name='$name' id='$fieldid'  style='display:". (($parent_field!='')?'none':'') . "'></textarea> <br/> <br />";
								break;
			}
		}
	} 
}