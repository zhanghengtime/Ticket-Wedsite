<?php
session_start();

$mysql_conf = array(
    'host'    => '127.0.0.1:3306', 
    'db'      => 'db_ticket', 
    'db_user' => 'root', 
    'db_pwd'  => '', 
    );
$order = @$_POST['order'];
$mysqli = @new mysqli($mysql_conf['host'], $mysql_conf['db_user'], $mysql_conf['db_pwd']);
if ($mysqli->connect_errno) {
    die("could not connect to the database:\n" . $mysqli->connect_error);//诊断连接错误
}
$mysqli->query("set names 'utf8';");//编码转化
$select_db = $mysqli->select_db($mysql_conf['db']);
if (!$select_db) {
    die("could not connect to the db:\n" .  $mysqli->error);
}$sql = "DELETE FROM db_tickets WHERE id='".$order['id']."';"; 
       
if (@$mysqli->query($sql)) {
	$_SESSION["ticketNum"] = $_SESSION["ticketNum"] + 1;
	$a = $order['id'];
	$count=strpos($a,$order['idDate']);
	$str=substr_replace($a,"",$count); 
	$sql = "UPDATE db_vehicle set 票数='".$_SESSION["ticketNum"]."'WHERE 编号='".$str."'"; 
	$mysqli->query($sql);
    echo 1;
}
else 
{
	echo 0;
}