<?php
session_start();
$mysql_conf = array(
    'host'    => '127.0.0.1:3306', 
    'db'      => 'db_ticket', 
    'db_user' => 'root', 
    'db_pwd'  => '', 
    );
$prices = 0;
$mysqli = @new mysqli($mysql_conf['host'], $mysql_conf['db_user'], $mysql_conf['db_pwd']);
if ($mysqli->connect_errno) {
    die("could not connect to the database:\n" . $mysqli->connect_error);//诊断连接错误
}
$mysqli->query("set names 'utf8';");//编码转化
$select_db = $mysqli->select_db($mysql_conf['db']);
if (!$select_db) {
    die("could not connect to the db:\n" .  $mysqli->error);
}$sql = "select * from db_tickets;"; 
            
$res = $mysqli->query($sql);
if (@($res->num_rows <= 0)) {
    echo 0; 
}
else 
{
	$arrs;
    while($row = $res->fetch_assoc())
    {
        $id = $row['id'];
        $username = $row['用户名'];
        $price = $row['实际价格'];
        $name = $row['姓名'];
        $idDate = $row['身份证号码'];
        $arr = array('id' => $id, 'username' => $username, 'price' => $price, 'name' => $name, 'idDate' => $idDate);
        //@array_push($arrs,json_encode($arr));
        $arrs[] = $arr;
        $prices = $prices + $price;
    }
    //print_r (json_encode($arrs));
}
$arrs;
@$num = count($arrs);
$arrss['tickets'] = $arrs;
$arrss['alltickets'] = $num;
$arrss['allprice'] = $prices;
print_r (json_encode($arrss));
