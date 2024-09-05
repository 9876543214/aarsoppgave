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

    <header class="header">
        <h1>Kino</h1>        
        
        <?php if (isset($user)): ?>

            <div>
                <p>Hello, <?=htmlspecialchars($user["name"])?></p>
                <form action="Login_signup/logout.php">
                    <button id="logout">Log out</button>
                </form>
            </div>

        <?php else: ?>

            <p id="login-signup"><a href="Login_signup/login.php">Log in</a> or <a href="Login_signup/signup.html">Sign up</a></p>

        <?php endif; ?>
    </header>

    <nav class="nav">
        <div class="links">
            <a href="index.php">Filmer</a>
            <a href="mine_billetter.html">Mine billetter</a>
        </div>
    </nav>

    <div class="content-filmer">
        <div class="film-dune"> <!--div til alt med dune på forsiden-->
            <div class="poster-dune"> <!--bilde og tekst under-->
                <img src="nettside_bilder/dune2poster.jpg" alt="Dune 2 poster" id="img-dune">
                <p>Dune: Part 2</p>
            </div>
            <div class="tider-dune"><!--boks med tider ved siden av plakat -->
                <div id="tid-dune-topp">
                    <a href="kjøpseter_dune/dune_12_00.php" id="tider">12:00</a>
                    <p>Sal 4</p>
                </div>
                <div id="tid-dune-topp">
                    <a href="kjøpseter_dune/dune_13_30.php" id="tider">13:30</a>
                    <p>Sal 2</p>
                </div>
                <div id="tid-dune-bunn">
                    <a href="kjøpseter_dune/dune_15_45.php" id="tider">15:45</a>
                    <p>Sal 6</p>
                </div>
                <div id="tid-dune-bunn">
                    <a href="kjøpseter_dune/dune_17_45.php" id="tider">17:15</a>
                    <p>Sal 3</p>
                </div>                
            </div>
        </div>
    </div>

    <footer>
        
    </footer>

    <?php if (isset($user)): ?>
        <script type="text/javascript">
            localStorage.setItem("userid", <?php echo json_encode($user["user_id"])?>)
        </script>
    <?php endif; ?>

</body>
</html>