<?php
$w = 80; //����ͼƬ��͸�
$h = 26;
$str = Array(); //�����洢�����
$string = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*()+";//�����ѡ����4���ַ���Ҳ����ѡ����࣬ע��ѭ����ʱ����ϣ�����ʵ�����
for($i = 0;$i < 4;$i++){
    $str[$i] = $string[rand(0,35)];
    $vcode .= $str[$i];
 }
 session_start(); //���ó�ȫ�ֱ���session
 $_SESSION["vcode"] = $vcode;
 $im = imagecreatetruecolor($w,$h);
 $white = imagecolorallocate($im,255,255,255); //��һ�ε������ñ���ɫ
$black = imagecolorallocate($im,0,0,0); //�߿���ɫ
imagefilledrectangle($im,0,0,$w,$h,$white); //��һ�������
imagerectangle($im,0,0,$w-1,$h-1,$black); //��һ���ο�
//����ѩ������
for($i = 1;$i < 200;$i++){
    $x = mt_rand(1,$w-9);
    $y = mt_rand(1,$h-9);
    $color = imagecolorallocate($im,mt_rand(200,255),mt_rand(200,255),mt_rand(200,255));
    imagechar($im,1,$x,$y,"*",$color);
 }
 //����֤��д��ͼ��
for($i = 0;$i < count($str);$i++){
    $x = 13 + $i * ($w - 15)/4;
    $y = mt_rand(3,$h / 3);
    $color = imagecolorallocate($im,mt_rand(0,225),mt_rand(0,150),mt_rand(0,225));
    imagechar($im,5,$x,$y,$str[$i],$color);
 }
 ob_clean();
 header("Content-type:image/jpeg"); //��jpeg��ʽ�����ע�����治������κ��ַ����������
 imagejpeg($im);
 imagedestroy($im);
?>