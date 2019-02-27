<?php
session_start();
$mysql_conf = array(
    'host'    => '127.0.0.1:3306', 
    'db'      => 'db_ticket', 
    'db_user' => 'root', 
    'db_pwd'  => '', 
    );
$name = @$_POST['name'];
$password = @$_POST['password'];
$email = @$_POST['email'];
$tel = @$_POST['tel'];
$id = @$_POST['id'];
$date = @$_POST['date'];
$mysqli = @new mysqli($mysql_conf['host'], $mysql_conf['db_user'], $mysql_conf['db_pwd']);
if ($mysqli->connect_errno) {
    die("could not connect to the database:\n" . $mysqli->connect_error);//诊断连接错误
}
$mysqli->query("set names 'utf8';");//编码转化
$select_db = $mysqli->select_db($mysql_conf['db']);
if (!$select_db) {
    die("could not connect to the db:\n" .  $mysqli->error);
}$sql = "INSERT INTO db_user(用户名,密码,Email,电话,身份证号码,出生日期)
                       values('".$name."'
                       ,'".$password."'
                       ,'".$email."',
                       '".$tel."',
                       '".$id."',
                       '".$date."'
                       );";

if ($mysqli->query($sql) == true) {
  echo 1;
    //die("sql error:\n" . $mysqli->error); 
}
else 
{
echo 0;
}
  //while ($row = $res->fetch_assoc()) {
        //var_dump($row);
    //}

//$res->free();
$mysqli->close();
?>