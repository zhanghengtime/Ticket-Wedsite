<?php
    session_start();
    if(@is_null($_SESSION["data"]))
    {
    	echo 0;
    }
    else
    {
    	@print_r (json_encode($_SESSION["data"]));
    }
   ?>