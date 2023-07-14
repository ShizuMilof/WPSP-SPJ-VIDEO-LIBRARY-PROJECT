<?php
include "connection.php";
header('Access-Control-Allow-Origin: *');

$filmId = $_POST['Id'];
$kolicina = $_POST['kolicina'];

$sQuery = "UPDATE filmovi SET kolicina = $kolicina WHERE film_id = $filmId";
$Result = $oConnection->query($sQuery);

if ($Result === TRUE) {
    $response = array('status' => 'success', 'message' => 'Količina filma je ažurirana.');
    echo json_encode($response);
} else {
    $response = array('status' => 'error', 'message' => 'Greška prilikom ažuriranja količine filma: ' . $oConnection->error);
    echo json_encode($response);
}
?>
