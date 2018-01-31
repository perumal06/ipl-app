<?php
  	$dbhost = 'localhost';
	$dbuser = 'root';
	$dbpass = '';
	$dbname = 'webappsv2';
   
   $conn = mysql_connect($dbhost, $dbuser, $dbpass);
   
   if(! $conn ) {
      die('Could not connect: ' . mysql_error());
   }
   
   $sql = 'SELECT * from users';
   mysql_select_db($dbname);
   $retval = mysql_query( $sql, $conn );
   
   if(! $retval ) {
      die('Could not get data: ' . mysql_error());
   }
   
   $res_arr = array();
   while($row = mysql_fetch_array($retval, MYSQL_ASSOC)) {
		$res_arr[] = $row;
   }
	
echo json_encode($res_arr);

?>