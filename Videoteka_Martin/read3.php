<?php
header('Content-type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');

include 'connection.php';
include 'classes.php';

$sQuery = "SELECT * FROM gledatelji ORDER BY statistika DESC LIMIT 10";
$oRecord = $oConnection->query($sQuery);
$oGledatelji = array();

while ($oRow = $oRecord->fetch(PDO::FETCH_ASSOC)) {
    $oGled= new Gledatelj(
        $oRow['oib'],
        $oRow['ime'],
        $oRow['prezime'],
        $oRow['spol'],
        $oRow['datum_rod'],
        $oRow['statistika']
    );

    $oGledatelji[] = $oGled;
}

echo json_encode($oGledatelji);
?>
