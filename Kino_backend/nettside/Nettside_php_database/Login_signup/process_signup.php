<?php

if (empty($_POST["name"])) {
    die("Name is required");
}

if ( ! filter_var($_POST["email"], FILTER_VALIDATE_EMAIL)) {
    die("Valid email is required");
}

if (strlen($_POST["password"]) < 8) {
    die("Password must be at least 8 characters");
}

if ( ! preg_match("/[a-z]/i", $_POST["password"], $matches)) {
    die("Password must contain at least one letter");
}   

if ( ! preg_match("/[1-9]/", $_POST["password"], $matches)) {
    die("Password must contain at least one number");
}   

if ($_POST["password"] !== $_POST["password_confirmation"]) {
    die("Passwords must match");
}

$password_hash = password_hash($_POST["password"], PASSWORD_DEFAULT);

$mysqli = require __DIR__ . "/database.php";

mysqli_report(MYSQLI_REPORT_OFF);

$sql = "INSERT INTO user (name, email, password_hash)
        VALUES (?, ?, ?)";

$stmt = $mysqli->stmt_init();

if ( ! $stmt->prepare($sql)) {
    die("SQL error; " . $mysqli->errno);
}

$stmt->bind_param("sss",
    $_POST["name"],
    $_POST["email"],
    $password_hash
);

if ( $stmt->execute() ) {
    header("Location: signup_success.html");
    exit;
} else {
    if ($mysqli->errno === 1062) {
        die("email is already taken");
    } else {
        die($mysqli->error . " " . $mysqli->errno);
    }
}           
// try { /*Måtte legge til "try" og bruke getcode() for å finne error code*/
//     if ($stmt->execute()) {
//         header("location: signup_success.html");
//         exit;
//     } else {
//         die("Unknown error occurred during execution.");
//     }
//     } catch (mysqli_sql_exception $e) {
//         $error_code = $e->getCode();
//         $error_message = $e->getMessage();
//     if ($error_code === 1062) {
//         echo("Email is already in use");
//     } else {
//         die("Error code: $error_code - $error_message");
//     }
// }
                