<?php
ini_set('display_errors',1);
chdir(dirname(__file__));
include_once('../conf/credentials.php');

$host = SEND_MAIL_DB_HOST;
$user = SEND_MAIL_DB_USER;
$password = SEND_MAIL_DB_PASSWORD;
$database = SEND_MAIL_DB_NAME;
set_include_path(get_include_path().PATH_SEPARATOR.'/mnt/das/2adpro.com/jd3/prod3/library/');
require_once 'Zend/Rest/Client.php';
require_once 'Zend/Mail.php';
require_once 'Zend/Mail/Transport/Smtp.php';
mysql_connect($host,$user,$password);
mysql_select_db($database);


define('EMAIL_NOTIFICATION_LOGS','email_notification_logs');
define('USER_CONTACTS','user_contacts');

$email_trigger_sql = " select etl_id,uc_email_id,etl_message,etl_posted_by,etl_posted_dt,etl_status, uc_first_name from " . EMAIL_NOTIFICATION_LOGS ." 
					JOIN " . USER_CONTACTS ." ON uc_userid=etl_recipients 
					where etl_send_email = '1' 
					and etl_is_email_triggered = '0'";

$email_trigger_res = mysql_query($email_trigger_sql);


while ($row= mysql_fetch_array($email_trigger_res))
{
	//echo "<pre>";
	$mailid = $row['uc_email_id'];
	//$mailid = 'rajamsc1984@gmail.com';
	$msg=$row['uc_first_name'].",\n\n".$row['etl_message'];
	$eid=$row['etl_id'];
	//print_r ($row);
	//mail function goes here

	$config = array(
                                                "ssl" => "ssl",
                                                'auth' =>  "login",
                                                'port' =>  SMTP_MAIL_PORT,
                                                'username' => SMTP_MAIL_USER,
                                                'password' =>  SMTP_MAIL_PASSWORD,

                                );

        $transport = new Zend_Mail_Transport_Smtp(SMTP_MAIL_HOST, $config);
        Zend_Mail::setDefaultTransport($transport);

        $mail = new Zend_Mail();
        $mail->setFrom(SMTP_MAIL_FROM, 'JD New Mail Notification System');
        $mail->addTo($mailid);
        $mail->setSubject('JD NEW - ' . $row['etl_subject']);
        $mail->setBodyText($msg);
	
	//end send mail
    if ($mail->send())
    {
		//update email notification logs
		$update_email_send_sql = "update  " . EMAIL_NOTIFICATION_LOGS ." set etl_is_email_triggered = '1' 
						where etl_id = '$eid'";
	    mysql_query($update_email_send_sql);
		//end update
    }
    else
	{

		echo "Mail sending Failed";
	}
}

$email_trigger_sql = " select etl_id,pc_email,etl_message,etl_posted_by,etl_posted_dt,etl_status, etl_subject, pc_first_name
					from " . EMAIL_NOTIFICATION_LOGS ." 
                                        JOIN production_contacts ON pc_userid=etl_recipients 
                                        where etl_send_email = '1' 
                                        and etl_is_email_triggered = '0'";

$email_trigger_res = mysql_query($email_trigger_sql);


while ($row= mysql_fetch_array($email_trigger_res))
{
        //echo "<pre>";
        $mailid = $row['pc_email'];
        //$mailid = 'rajamsc1984@gmail.com';
        $msg= $row['pc_first_name']. ",\n\n" . $row['etl_message'];
        $eid=$row['etl_id'];
        //print_r ($row);
        //mail function goes here

        $config = array(
						"ssl" => "ssl",
                                                'auth' =>  "login",
                                                'port' =>  SMTP_MAIL_PORT,
                                                'username' => SMTP_MAIL_USER,
                                                'password' =>  SMTP_MAIL_PASSWORD,

                                );

        $transport = new Zend_Mail_Transport_Smtp('email-smtp.us-east-1.amazonaws.com', $config);
        Zend_Mail::setDefaultTransport($transport);                        

        $mail = new Zend_Mail();
        $mail->setFrom(SMTP_MAIL_FROM, 'JD New Mail Notification System');
        $mail->addTo($mailid);
	//$mail->addBcc("uat@2adpro.com");
	$mail->addBcc("support@2adpro.com");
        $mail->setSubject('JD NEW - UAT Testing - ' . $row['etl_subject']);
        $mail->setBodyText($msg);
	if ($mail->send())
    	{
                //update email notification logs
                $update_email_send_sql = "update  " . EMAIL_NOTIFICATION_LOGS ." set etl_is_email_triggered = '1' 
                                                where etl_id = '$eid'";
            mysql_query($update_email_send_sql);
                //end update
    	}
    	else
        {

                echo "Mail sending Failed";
        }
}
?>
