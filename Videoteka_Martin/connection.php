<?php

$host = 'database';
$dbname = 'videoteka';
$username = 'root';
$password = 'tiger';

try
{
    $oConnection = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    
}
catch (PDOException $pe)
{
    die("Could not connect to the database $dbname :" . $pe->getMessage());
}

?>