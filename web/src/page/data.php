<?php
session_start();

$mysql_conf = array(
    'host'    => '127.0.0.1:3306', 
    'db'      => 'db_ticket', 
    'db_user' => 'root', 
    'db_pwd'  => '', 
    );
$startStation = @$_POST['startStation'];
$endStation = @$_POST['endStation'];
$startDate = @$_POST['date'];
$mysqli = @new mysqli($mysql_conf['host'], $mysql_conf['db_user'], $mysql_conf['db_pwd']);
if ($mysqli->connect_errno) {
    die("could not connect to the database:\n" . $mysqli->connect_error);//诊断连接错误
}
$mysqli->query("set names 'utf8';");//编码转化
$select_db = $mysqli->select_db($mysql_conf['db']);
if (!$select_db) {
    die("could not connect to the db:\n" .  $mysqli->error);
}$sql = "select * from db_vehicle where 始发站='".$startStation."' and 终点站= '".$endStation."' and 出发时间='".$startDate."';"; 
//$sql = "select * from db_vehicle where 始发站='".'天津'."' and 终点站= '".'北京'."' and 出发时间='".'2018-10-20'."';"; 
//echo $sql;                    
$res = $mysqli->query($sql);
if (@($res->num_rows <= 0)) {
    echo 0; 
}
else 
{
	$arrs;
    while($row = $res->fetch_assoc())
    {
        $endDate = $row['到达时间'];
        $ID = $row['编号'];
        $price = $row['价格'];
        $number = $row['票数'];
        $arr = array('startStation' => $startStation, 'endStation' => $endStation, 'startDate' => $startDate, 'endDate' => $endDate, 'ID' => $ID, 'price' => $price, 'number' => $number);
        //@array_push($arrs,json_encode($arr));
        $arrs[] = $arr;
    }
    print_r (json_encode($arrs));
    //print_r ($arrs); 
    //print_r $arrs;
	//$sqll = "select * from db_user where 用户名='".$username."' and 密码= '".$password."'and 超级用户=1;"; 
    //$ress = $mysqli->query($sqll);
    //if($ress->num_rows <= 0)
   // {
    //	echo 1;
    //}
    //else 
    //{
    //	echo 2;
    //}
}

 //	echo 1;
 //while ($row = $res->fetch_assoc()) {
        //var_dump($row);
    //}
//$res->free();
$mysqli->close();
?>