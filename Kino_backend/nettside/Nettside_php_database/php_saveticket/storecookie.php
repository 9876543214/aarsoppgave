<?php

$cookiedata = $_COOKIE['Ticket'];

if (!$cookiedata) {
    die("cookie not found");
}

$userticket = json_decode($cookiedata, true);

$tickets_db = require __DIR__ . "/tickets_db.php";

if ($tickets_db) {
    foreach ($userticket as $ticket) {
        $seats = $tickets_db->real_escape_string(implode(',' , $ticket['seats'])); 
        $time = $tickets_db->real_escape_string($ticket['time']);
        $movie = $tickets_db->real_escape_string($ticket['movie']);
        $location = $tickets_db->real_escape_string($ticket['location']);
        $id = $tickets_db->real_escape_string($ticket['id']);

        $query = "INSERT INTO tickets (seats, time, movie, location, user_id) VALUES ('$seats', '$time', '$movie', '$location', '$id')";

        if ($tickets_db->query($query) === TRUE) {
            echo "Ticket stored successfully";
        } else {
            echo "Error storing ticket: " . $tickets_db->error;
        }
    }

    $tickets_db->close(); 
} else {
    echo "Database connection failed";
}

header("Location: " . $_SERVER['HTTP_REFERER']);