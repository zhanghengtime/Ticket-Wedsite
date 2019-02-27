<?php
session_start();
$mysql_conf = array(
    'host'    => '127.0.0.1:3306', 
    'db'      => 'db_ticket', 
    'db_user' => 'root', 
    'db_pwd'  => '', 
    );
$username = @$_SESSION["username"];
$prices = 0;

$mysqli = @new mysqli($mysql_conf['host'], $mysql_conf['db_user'], $mysql_conf['db_pwd']);
if ($mysqli->connect_errno) {
    die("could not connect to the database:\n" . $mysqli->connect_error);//诊断连接错误
}
$mysqli->query("set names 'utf8';");//编码转化
$select_db = $mysqli->select_db($mysql_conf['db']);
if (!$select_db) {
    die("could not connect to the db:\n" .  $mysqli->error);
}

$sql = "select * from db_tickets where 用户名='".$username."';";
$res = $mysqli->query($sql);
if (@($res->num_rows <= 0)) {
	echo 0;
}
else  
{
	
    while($row = $res->fetch_assoc())
    {
    	$id = $row['id'];
        $price = $row['实际价格'];
        $name = $row['姓名'];
        $num = $row['身份证号码'];
        $prices = $prices + $price;
        $arr = array('id' => $id, 'username' => $username, 'name' => $name, 'idDate' => $num, 'price' => $price);
        $arrs[] = $arr;
    }
    $nums = count($arrs);

$arrss;
$arrss[0] = $arrs;
$arrss[1] = $prices;
$arrss[2] = $nums;

print_r(json_encode($arrss));
}
