<?php

$is_invalid = false;

if ( $_SERVER["REQUEST_METHOD"] === "POST") {

    $mysqli = require __DIR__ ."/database.php";

    $sql = sprintf("SELECT * FROM user
            WHERE email = '%s'",
            $mysqli->real_escape_string($_POST["email"]));

    $result = $mysqli->query($sql);

    $user = $result->fetch_assoc();
    
    if ($user) { 

        if (password_verify($_POST["password"], $user["password_hash"])) {

            session_start();

            session_regenerate_id();

            $_SESSION["user_id"] = $user["id"];

            header("location: ../index.php");
            exit;
        };
    }

    $is_invalid = true;
}

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/water.css@2/out/water.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,500,0,0" />
    <link rel="stylesheet" href="login_signup.css">
</head>
<body>


    <span class="material-symbols-outlined" onclick="window.location='../index.php'">
    arrow_back
    </span>
    
    <h1>Login</h1>

    <?php if ($is_invalid): ?>
        <em>Invalid login</em>
    <?php endif; ?>

    <form method="post">
        <label for="email">Email</label>
        <input type="email" name="email" id="email"
                value="<?= htmlspecialchars($_POST["email"] ?? "") ?>">

        <label for="password">Password</label>
        <input type="password" name="password" id="password">

        <button>Log in</button>
    </form>

    <p>Don't have an account? <a href="signup.html">Sign up here</a>.</p>

</body>
</html>