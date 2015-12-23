<?php
/* This form is used to define Login display 
 * and also the filter for the form elements
 */
class JD_LoginForm extends Zend_Form
{
	public function __construct($options=null)
	{
		parent::__construct($options);
		
		$this->setName('indexPage');
		
			
		$username = new Zend_Form_Element_Text('username');
		$username->setRequired('true')
				->addFilter('StripTags')
				->addFilter('StringTrim')
				->addValidator('NotEmpty');
				
		$password = new Zend_Form_Element_Password('password');		
		$password->setRequired('true')				
				->addFilter('StripTags')
				->addFilter('StringTrim')
				->addValidator('NotEmpty');
				
		$submit = new Zend_Form_Element_Submit('submit');		
		$submit->setValue('submit');				
		
		$this->addElements(array($username, $password, $submit));		
	}
	
}