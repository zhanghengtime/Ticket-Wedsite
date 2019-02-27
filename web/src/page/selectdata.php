<?php
session_start();
$mysql_conf = array(
    'host'    => '127.0.0.1:3306', 
    'db'      => 'db_ticket', 
    'db_user' => 'root', 
    'db_pwd'  => '', 
    );
$ID = @$_POST['ID'];
$userdata = @$_POST['userdata'];  //姓名 ， 身份号  name id
$style = @$_POST['style'];
$_SESSION["style"] = $style;
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

$sql = "select * from db_discount where id='冬季优惠';";
$res = $mysqli->query($sql);
if (@($res->num_rows <= 0)) {
	$discount = 0;
}
else  
{
	
    while($row = $res->fetch_assoc())
    {
    	$discount = doubleval($row['num']);
       
    }
}

@$num = count($userdata); 
$sql = "select 价格 from db_vehicle where 编号='".$ID."';";
$res = $mysqli->query($sql);
while($row = $res->fetch_assoc())
{
    $price = $row['价格'];
    //@array_push($arrs,json_encode($arr));
	$prices = $price*(1-$discount) * $num;  //总价格
}
//$arr = json_decode()
//$sql = "select 价格 from db_vehicle where 编号='".$ID."';";
$sql = "select * from db_vehicle where 编号='".$ID."';";
$res = $mysqli->query($sql);
if (@($res->num_rows <= 0)) {
    echo 0; 
}
else  //车的信息
{
	//$arrs;
    while($row = $res->fetch_assoc())
    {
    	$vEndDate = $row['到达时间'];
        $vId = $row['编号'];
        $vStartDate = $row['出发时间'];
        $vStartStation = $row['始发站'];
        $vEndStation = $row['终点站'];
        $_SESSION["vehicleId"] = $row['编号'];
        $_SESSION["ticketNum"] = $row['票数'];
        $arr = array('startStation' => $vStartStation, 'endStation' => $vEndStation, 'startDate' => $vStartDate, 'endDate' => $vEndDate, 'ID' => $vId);
        //@array_push($arrs,json_encode($arr));
       // $arrs[] = $arr;
    }
}
for($i=0;$i<$num;++$i)
{
	$userdata[$i]['price'] = $price * (1 - $discount); 
	$ticketId = $ID.''.$userdata[$i]['id'];
	$userdata[$i]['ticketId'] = $ticketId;
	//$sql =  "INSERT INTO db_tickets(id,用户名,实际价格,姓名,身份证号码)
                    //   values('".$ticketId."'
                    //   ,'".$_SESSION["username"]."',
                  //     '".$price."',
                   //    '".$userdata[$i]['name']."',
                  //     '".$userdata[$i]['id']."'
                 //      );";
    //$mysqli->query($sql);
}
$arrs;
$arrs[0] = $arr;
$arrs[1] = $prices;
$arrs[2] = $userdata;

print_r(json_encode($arrs));








