<?php
include "connection.php";
header('Access-Control-Allow-Origin: *');


$sQuery2 = "UPDATE filmovi SET film_sifra='".$_POST['film_sifra']."', naziv='".$_POST['naziv_filma']."', opis='".$_POST['opis']."', godina_izlaska='".$_POST['godina_izlaska']."', trajanje='".$_POST['trajanje']."', poster='".$_POST['poster']."',zanr='".$_POST['zanr']."', kolicina='".$_POST['kolicina']."' WHERE film_id=".$_POST['Id'];

$Result2 = $oConnection->query($sQuery2);



$Result1 = $oConnection->query($sQuery1);


?>