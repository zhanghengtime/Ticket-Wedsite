<?php
session_start();

$mysql_conf = array(
    'host'    => '127.0.0.1:3306', 
    'db'      => 'db_ticket', 
    'db_user' => 'root', 
    'db_pwd'  => '', 
    );

$mysqli = @new mysqli($mysql_conf['host'], $mysql_conf['db_user'], $mysql_conf['db_pwd']);
if ($mysqli->connect_errno) {
    die("could not connect to the database:\n" . $mysqli->connect_error);//诊断连接错误
}
$mysqli->query("set names 'utf8';");//编码转化
$select_db = $mysqli->select_db($mysql_conf['db']);
$username = $mysqli->real_escape_string(@$_POST['username']);
$password = $mysqli->real_escape_string(@$_POST['password']); 
if (!$select_db) {
    die("could not connect to the db:\n" .  $mysqli->error);
}$sql = "select * from db_user where 用户名='".$username."' and 密码= '".$password."';";     
                
$res = $mysqli->query($sql);
if ($res->num_rows <= 0) {
    //die("sql error:\n" . $mysqli->error);
    echo 0; 
}
else 
{
	$sqll = "select * from db_user where 用户名='".$username."' and 密码= '".$password."'and 超级用户=1;"; 
    $ress = $mysqli->query($sqll);
    if($ress->num_rows <= 0)
    {
    	echo 1;
    }
    else 
    {
    	echo 2;
    }
    $_SESSION["username"] = $username;
}

 //	echo 1;
 //while ($row = $res->fetch_assoc()) {
        //var_dump($row);
    //}
//$res->free();
$mysqli->close();
?>