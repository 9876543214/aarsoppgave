<?php 

session_start();

if (isset($_SESSION["user_id"])) {

    $mysqli = require __DIR__ ."/Login_signup/database.php";

    $sql = "SELECT * FROM user
            WHERE user_id = {$_SESSION["user_id"]}";

    $result = $mysqli->query($sql); 

    $user = $result->fetch_assoc();
}

?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="style.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Alata&display=swap" rel="stylesheet">
</head>
<body>

    <form id="retriveticket" action="/Nettside_php_database/php_saveticket/retriveticket.php" method="post"></form>

    <nav class="nav">
        <div class="links">
            <a href="index.php">Filmer</a>
            <a href="mine_billetter.php">Mine billetter</a>
        </div>
    </nav>


    
    <div class="content-minebilletter">
        <div id="ingenbilletttekst">Ingen billett funnet :|</div>
        <div id="loginbillett">Du må <a href="Login_signup/login.php">Logge inn</a> for å se kjøpte billetter</div>

        <div id="ticket"></div>

    </div>

    <script>
        localStorage.removeItem("userid")
    </script>
    <?php if (isset($user)): ?>
        <script type="text/javascript">
            localStorage.setItem("userid", <?php echo json_encode($user["user_id"])?>)
        </script>
    <?php endif; ?>
    <script src="js/mine_billetter.js"></script>

</body>
</html>