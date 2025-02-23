<?php
require '../vendor/autoload.php'; // Autoload MongoDB library

use MongoDB\Client;

// Connect to MongoDB
try {
    $mongoClient = new Client("mongodb://localhost:27017");
    $Promo = $mongoClient->Promo; // change your own db name
} catch (Exception $e) {
    die("Error connecting to MongoDB: " . $e->getMessage());
}
?>