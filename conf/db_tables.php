<?php

define('CUSTOMER_TIMEZONES','customer_timezone');
#define('ACTIVE_JOBS','Active_Jobs2');		
define('ACTIVE_JOBS','Active_Jobs4');
define('USER_CONTACTS','user_contacts');
define('SITE_CONFIG','site_config');
define('SYSTEM_FIELDS','system_fields');
define('SITES','sites');
define('EMAIL_CONFIG','email_config');
define('DELIVERY_OPTIONS','delivery_options');
define('DELIVERIES','deliveries');
define('ORDERS_MAIN_INFO','orders_main_info');
define('DELIVERY_PRIORITIES','delivery_priorities');
define('FIELD_GROUPS','field_groups');
define('ORDERS_DETAILS','orders_details');
define('ORDERS_DETAIL_SPEC','orders_detail_spec');
define('ORDERS_DETAIL_TEXT','orders_detail_text');
define('REVISION_CYCLE_LOGS','revision_cycle_logs');
define('ORDER_STATUS_CYCLE_LOGS','order_status_cycle_logs');
define('ORDER_STATUS_LOGS','order_status_logs');
define('ORDER_INPUT_FILES','order_input_files');
define('CONNECT_SITE_CONFIG','connect_site_config');
define('ORDERSTATUS','order_status_ref');
define('ORDER_TYPES','order_types');
define('AD_CATEGORY_REF','ad_category_ref');
define('CUSTOM_CATEGORY','custom_category');
define('SITE_PRODUCTS','site_products');
define('ARTISTIC_DESCRETION_REF','artistic_discretion_ref');
define('SEARCH_FILTERS','search_filters');
define('SEARCH_FILTER_FIELDS','search_filter_fields');
define('CONTACT_SITE_PRIVILEGES','contacts_site_privileges');
define('ANNOUNCEMENT','announcement');
define('ORDER_STATUS_REF','order_status_ref');
define('ORDER_STATUS_FLOW','order_status_flow');
define('MASTER_PRODUCTS','master_products');
define('SITE_PUBLICATION_TITLE','site_publication_title');
define('SITE_PUBLICATION_TITLE_TIME_ZONE','site_publication_title_time_zone');
define('INTEGRATION_LOGS_INFO','integration_logs_info');
define('INTEGRATION_MESSAGES','integration_messages');

$dbname_mm = 'mmdb.';
define('TABLE_ASSET_TYPE_CUSTOMER_ASSOC', $dbname_mm.'asset_type_customer_association');
define('TABLE_ASSET_TYPE', $dbname_mm.'asset_type');

define('JD2_ORDERS_MAIN','orders_main');
define('JD2_ORDERS_DETAIL','orders_detail');
define('JD2_ORDERS_MULTI_VERSION_SPEC','ord_multi_ver_spec');
define('JD2_ORDERFILES','orderfiles');
define('JD2_ORDERELEMENTS','orderelements');
define('JD2_ORDERS_REVISE','orders_revise');
define('JD2_ORDERLOGS','orderlogs');
define('JD2_MESSAGEBOARD','messageboard');
define('JD2_MESSAGEFILES','messagefiles');
define('JD2_ADVERTISERS','advertisers');
define('JD2_AD_CATEGORY','ad_category');
define('JD2_PRODUCTS','products');
define('JD2_PRINTORDERS_TYPE_DESC','printorders_type_desc');
define('JD2_WEBORDERS_TYPE_DESC','weborders_type_desc');
define('JD2_ORD_MULTI_VER_SPEC','ord_multi_ver_spec');
define('JD2_ORDERJOBCYCLE','orderjobcycle');
define('JD2_FEEDBACK_HISTORY','feedback_history');


define('CORPORATES','corporates');
define('CUSTOMER_CLIENTS','customer_clients');
define('CLUSTERS','clusters');
define('USER_ROLE_PROFILES','user_role_profiles');
define('FUNCTIONS','functions');
define('VISUAL_STUDIOS','visual_studios');
define('CONTACTS_SITE_PRIVILEGES','contacts_site_privileges');
define('USER_SITE_EMAIL_PREFERENCES','user_site_email_preferences');
define('PRODUCTION_CONTACTS','production_contacts');
define('PROD_USER_ROLE_PROFILES','prod_user_role_profiles');
define('PROD_CON_EMAIL_PREFERENCES','prod_con_email_preferences');
define('PROD_CONTACTS_SITE_PRIVILEGES','prod_contacts_site_privileges');
define('USER_STUDIO_MAIL_CONFIGURATION','user_studio_mail_configuration');
define('USER_GROUPS','user_groups');
define('USER_GROUPS_CONTACTS','user_groups_contacts');
define('USER_GROUPS_CATEGORY_PREF','user_groups_category_pref');
define('USER_GROUPS_PRODUCT_PREF','user_groups_product_pref');
define('PRINT_PRODUCT_TYPES','print_product_types');
define('WEB_PRODUCT_TYPES_REF','web_product_types_ref');
define('CON_CUSTOMER_ASS','con_customer_ass');
define('WEB_OUTPUT_TYPES','web_output_types');
define('ORDER_REVISION_REASONS','order_revision_reasons');
define('REVISION_REASONS','revision_reasons'); 
define('REVISION_ESCALATIONS','revision_escalations');

//
define('PRODUCT_SIZE_RATIO','product_size_ratio');
define('CITIES','cities');
//
define('ORDERS_REVISION','orders_revision');
define('ORDER_REVISION_DETAILS','order_revision_details');
define('ORDER_CHANGE_LOGS','order_change_logs');
define('ORDER_CHANGE_LOG_DETAIL','order_change_log_detail');

define('ORDER_FEEDBACK_HISTORY','order_feedback_history');
define('ORDER_MESSAGES','order_messages');
define('ORDER_MESSAGE_FILES','order_message_files');

define('EMAIL_NOTIFICATION_LOGS','email_notification_logs');
define('PRODUCT_BASE_GROUP','product_base_group');
define('PRODUCT_DETAILED_DESC','product_detailed_desc');
define('RETAIL_PRICING','retail_pricing');
define('OMX_PRODUCT_PRICE_DETAILS','omx_product_price_detais');
define('EPROOF','eproof');


define('ORDER_OUTPUT_FILES','order_output_files');
define('STUDIO_SITE_ASSOC','studio_site_assoc');
define('STUDIO_ROUTING_PREFERENCE','studio_routing_preference');

define('PUB_VISUAL_STUDIO_SPEC','pub_visual_studio_spec');

define('SESSION_SHOPPING_CART','session_shopping_cart');

define('USER_PASSWORD_SECURITY_REF','user_password_security_pref');

define('ORDERS_JDWF','orders_jdwf');
define('FTP_DETAILS','ftp_details');
define('LOCATION','location');
define('ORDERS_JDWF_LOG','orders_jdwf_log');
define('ORDERS_JDWF','orders_jdwf');

//Fields Customization
define("PUB_SM_DISPLAY_FIELDS",'pub_sm_display_fields');
define("SM_LISTORDERS_DISPLAY_FIELDS",'sm_listorders_display_fields');

//Billing
define('BILLING_MAIN','billing_main_jd3');
define('BILLING_PLAN_DETAILS','billing_plan_details_jd3');
define('BILLING_PLAN_TIER_DETAILS','billing_plan_tier_details_jd3');
define('BILLING_VERSION_DISCOUNT_CONFIG','billing_version_discount_config_jd3');
define('BILLING_ADCOUNT_PRICE_CONFIG','billing_adcount_price_config_jd3');

define('WEB_MULITIMEDIA_TYPES_REF','web_multimedia_types_ref');
define('WEB_OUTPUT_TYPES_REF','web_output_types_ref');
define('TABLE_BILLING_CYCLE','billing_cycle');

define('ORDERS_DETAILS_LOGS','orders_details_logs');
define('ORDERJOBCYCLE','orderjobcycle');
define('TABLE_PROD_SHIPMENT_USERS','prod_shipment_users');
define('TABLE_PUBLISHERS_WORKFLOW_CONFIG','publishers_workflow_config');
define('TABLE_AUTOSCRIPT','autoscript');
define('TABLE_JD_INTEGRATION','jd_integration');
define('TABLE_FTP_DETAILS','ftp_details');
define('TABLE_STATUS_XML_TRIGGER_CONF','status_xml_trigger_conf');
define('TABLE_MESSAGEBOARD','messageboard');
define('TABLE_ORDERLOGS','orderlogs');

define('TABLE_ASSET_MAIN', $dbname_mm.'asset_main');
define('TABLE_ASSET_KEYWORDS',$dbname_mm.'asset_keywords');
define('TABLE_KEYWORDS',$dbname_mm.'keywords');
define('TABLE_ASSET_FILES',$dbname_mm.'asset_files');
define('TABLE_ASSET_GROUP', $dbname_mm.'asset_group');
define('EMAIL_ORDERS_INFO','email_orders_info');

define('FTP_VER_REV_INFO','ftp_ver_rev_info');

define('PROXY_USER_LOGIN_DETAILS','proxy_user_login_details');

define('ORDERS_DETAILS_REVISE','orders_details_revise');

define('SERVER_GMT_OFFSET','-07:00');

