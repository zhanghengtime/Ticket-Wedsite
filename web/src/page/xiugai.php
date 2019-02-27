<?php
session_start();

$mysql_conf = array(
    'host'    => '127.0.0.1:3306', 
    'db'      => 'db_ticket', 
    'db_user' => 'root', 
    'db_pwd'  => '', 
    );
$changeCar = @$_POST['changeCar'];
$changeCar2 = @$_POST['changeCar2'];
$mysqli = @new mysqli($mysql_conf['host'], $mysql_conf['db_user'], $mysql_conf['db_pwd']);
if ($mysqli->connect_errno) {
    die("could not connect to the database:\n" . $mysqli->connect_error);//诊断连接错误
}
$mysqli->query("set names 'utf8';");//编码转化
$select_db = $mysqli->select_db($mysql_conf['db']);
if (!$select_db) {
    die("could not connect to the db:\n" .  $mysqli->error);
}$sql = "update db_vehicle set 编号='".$changeCar2['id']."', 始发站='".$changeCar2['startStation']."', 终点站='".$changeCar2['endStation']."', 出发时间='".$changeCar2['startDate']."', 到达时间='".$changeCar2['endDate']."', 价格='".$changeCar2['price']."', 票数='".$changeCar2['tickets']."' where 编号='".$changeCar['id']."';"; 
            
if (@$mysqli->query($sql)) {
    echo 1; 
}
else 
{
	echo 0;
}