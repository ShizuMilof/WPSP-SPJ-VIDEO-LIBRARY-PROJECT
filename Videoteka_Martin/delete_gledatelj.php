<?php

include "connection.php";
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: access');
header('Access-Control-Allow-Methods: DELETE');
header('Content-type: application/json; charset-utf-8');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, Access-Control-Allow-Methods');

// Provjera POST zahtjeva
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Provjera postavljene vrijednosti 'id' u POST tijelu zahtjeva
    if (isset($_POST['id'])) {
        $id = $_POST['id'];

        // Izvršavanje upita za brisanje gledatelja s određenim ID-em
        $query = "DELETE FROM gledatelji WHERE oib = '$id'";
        $result = $oConnection->query($query);

        if ($result) {
            // Uspješno brisanje gledatelja
            $response = [
                'success' => true,
                'message' => 'Gledatelj je uspješno obrisan.'
            ];
        } else {
            // Greška prilikom brisanja gledatelja
            $response = [
                'success' => false,
                'message' => 'Pogreška prilikom brisanja gledatelja.'
            ];
        }
    } else {
        // ID gledatelja nije postavljen
        $response = [
            'success' => false,
            'message' => 'Nedostaje ID gledatelja.'
        ];
    }
} else {
    // Zahtjev nije POST
    $response = [
        'success' => false,
        'message' => 'Nedozvoljeni metod zahtjeva.'
    ];
}

// Ispisivanje odgovora kao JSON
echo json_encode($response);

?>
