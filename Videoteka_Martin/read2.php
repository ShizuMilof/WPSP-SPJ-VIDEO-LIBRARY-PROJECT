<?php
header('Content-type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');

include 'connection.php';
include 'classes.php';

$sQuery = "SELECT * FROM filmovi ORDER BY statistika DESC LIMIT 10";
$oRecord = $oConnection->query($sQuery);
$oFilmovi = array();

while ($oRow = $oRecord->fetch(PDO::FETCH_ASSOC)) {
    $oFilm = new Film(
        $oRow['film_id'],
        $oRow['film_sifra'],
        $oRow['naziv'],
        $oRow['opis'],
        $oRow['status'],
        $oRow['godina_izlaska'],
        $oRow['trajanje'],
        $oRow['poster'],
        $oRow['zanr'],
        $oRow['kolicina'],
        $oRow['statistika']
    );

    $oFilmovi[] = $oFilm;
}

echo json_encode($oFilmovi);
?>
