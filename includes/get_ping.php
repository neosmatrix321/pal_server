<?php
$ip_address = "8.8.8.8";

$command = "ping -c 5 -t 10 $ip_address | tail -n1";
$return_var = exec($command, $output);

// if ($return_var !== 0) {
//     echo "Fehler beim Ausführen des Befehls";
//     exit;
// }

// preg_match('/time=([0-9.]+) ms/', $output, $matches);

$latency = substr($output[0], 4);

echo json_encode(array("ping_innerHTML" => $latency));