<?php
$config_vars = simplexml_load_file(realpath(__DIR__.'/conf.xml'));

foreach($config_vars as $config_name => $config_val)
{
	define($config_name, $config_val);
}
?>