<?php
session_start();
$s = 300;
while($s>0)
{
	sleep(1);
	$s = $s - 1;
 	echo $s;}
