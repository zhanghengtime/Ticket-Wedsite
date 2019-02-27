<?php
session_start();
$mysql_conf = array(
    'host'    => '127.0.0.1:3306', 
    'db'      => 'db_ticket', 
    'db_user' => 'root', 
    'db_pwd'  => '', 
    );
$ID = @$_POST['id'];  //订单的id

$mysqli = @new mysqli($mysql_conf['host'], $mysql_conf['db_user'], $mysql_conf['db_pwd']);
if ($mysqli->connect_errno) {
    die("could not connect to the database:\n" . $mysqli->connect_error);//诊断连接错误
}
$mysqli->query("set names 'utf8';");//编码转化
$select_db = $mysqli->select_db($mysql_conf['db']);
if (!$select_db) {
    die("could not connect to the db:\n" .  $mysqli->error);
}
@$num = count($ID['users']); 
for($i=0;$i<$num;++$i)
{
	$sql =  "INSERT INTO db_tickets(id,用户名,实际价格,姓名,身份证号码)
                       values('".$ID['users'][$i]['ticketId']."'
                       ,'".$_SESSION["username"]."',
                       '".$ID['users'][$i]['price']."',
                       '".$ID['users'][$i]['name']."',
                       '".$ID['users'][$i]['id']."'
                       );";
   if ($mysqli->query($sql) == true) {
    $_SESSION["ticketNum"] = $_SESSION["ticketNum"] - 1;
    $sqll =  "UPDATE db_vehicle set 票数='"
    .$_SESSION["ticketNum"]."' where 编号='"
    .$_SESSION["vehicleId"]."';";
    //echo $sqll;                   
    $mysqli->query($sqll);
  	echo 1;
    //die("sql error:\n" . $mysqli->error); 
	}
	else 
	{
	echo 0;
	}
}
