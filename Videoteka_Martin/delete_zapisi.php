<?php
include "connection.php";
header('Access-Control-Allow-Origin: *');

$sQuery = "DELETE FROM zapisi";
$Result = $oConnection->query($sQuery);

if ($Result === TRUE) {
  echo "All rows deleted successfully";
} else {
  echo "Error deleting rows: " . $oConnection->error;
}

$oConnection->close();
?>
