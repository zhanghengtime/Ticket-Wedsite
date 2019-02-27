<?php
session_start();

$mysql_conf = array(
    'host'    => '127.0.0.1:3306', 
    'db'      => 'db_ticket', 
    'db_user' => 'root', 
    'db_pwd'  => '', 
    );
$changefavorable = @$_POST['changefavorable'];
$changefavorable2 = @$_POST['changefavorable2'];
$mysqli = @new mysqli($mysql_conf['host'], $mysql_conf['db_user'], $mysql_conf['db_pwd']);
if ($mysqli->connect_errno) {
    die("could not connect to the database:\n" . $mysqli->connect_error);//诊断连接错误
}
$mysqli->query("set names 'utf8';");//编码转化
$select_db = $mysqli->select_db($mysql_conf['db']);
if (!$select_db) {
    die("could not connect to the db:\n" .  $mysqli->error);
}$sql = "update db_discount set id='".$changefavorable2['id']."', num='".$changefavorable2['num']."' where id='".$changefavorable['id']."';"; 
         
if (@$mysqli->query($sql)) {
    echo 1; 
}
else 
{
	echo 0;
}