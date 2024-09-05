<?php

$host = "localhost";
$dbname = "tickets_db";
$username = "root";
$password = "";

$tickets_db = new mysqli(hostname: $host, 
                     username: $username, 
                     password: $password, 
                     database: $dbname);

if ($tickets_db->connect_errno) {
    die("Connection error: ". $tickets_db->connect_error);
}

 
return $tickets_db;