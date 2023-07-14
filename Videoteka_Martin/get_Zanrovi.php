<?php
header('Content-type: text/json');
header('Content-type: application/json; charset-utf-8');
header('Access-Control-Allow-Origin: *');

include 'connection.php';

$sQuery = "SELECT zanr FROM filmovi WHERE filmovi.film_id = ".$_GET['Id'];
$oRecord = $oConnection->query($sQuery);
$oZanrovi = array();
while($oRow = $oRecord->fetch(PDO::FETCH_ASSOC))
{
    $zanr = $oRow['zanr'];
    array_push($oZanrovi, $zanr);
}
echo json_encode($oZanrovi);
?>
