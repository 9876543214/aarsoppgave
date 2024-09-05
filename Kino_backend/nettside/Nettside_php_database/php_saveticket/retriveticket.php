<?php

$tickets_db = require __DIR__  . "/tickets_db.php";

if (!$tickets_db) {
    return;
}

$alltickets_data = "SELECT ticket_id, user_id, GROUP_CONCAT(seats) AS seats, movie, time, location FROM tickets GROUP BY movie, time, location, user_id";



$tickets = []; 



$alltickets = $tickets_db->query($alltickets_data);



if ($alltickets->num_rows > 0) {
    while ($row = $alltickets->fetch_assoc()) {
        $ticket = [
            "seats" => $row["seats"],
            "time" => $row["time"],
            "location" => $row["location"],
            "movie" => $row["movie"],
            "id" => $row["user_id"]
        ];
        array_push($tickets, $ticket);
    }
}

$encoded_tickets = json_encode($tickets);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <script>

        var encodedtickets = <?php echo $encoded_tickets ?>;
        localStorage.setItem("Database-tickets", JSON.stringify(encodedtickets))
        window.location.href = document.referrer;
    </script>
</body>
</html>

