<?php 
session_start();

$mysqli = require __DIR__ . "/../Login_signup/database.php";

$user = null; 

if (isset($_SESSION["user_id"])) {
    $sql = "SELECT * FROM user WHERE user_id = " . $mysqli->real_escape_string($_SESSION["user_id"]);
    $result = $mysqli->query($sql); 

    if ($result) {
        $user = $result->fetch_assoc();
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="../style.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Alata&display=swap" rel="stylesheet">
</head>
<body class="kjøpseter">
<div id="popup-login" class="overlay-popup"> <!--popup som kommer opp når brukeren ikke er logget inn-->
        <div class="popup">
            <h2>Ingen konto funnet</h2>
            <button class="close-popup" id="close-popup">&times;</button>
            <div class="content-popup">
                <p>Du må <a href="../login_signup/login.php">Logge inn</a> for å kjøpe seter.</p>
                <p>Har ikke konto? <a href="../Login_signup/signup.html">Lag konto her.</a></p>
            </div>
        </div>
    </div>
    <nav class="nav">
        <div class="links">
            <a href="../index.php">Filmer</a>
            <a href="../mine_billetter.php">Mine billetter</a>
        </div>
    </nav>
    <h1 id="sal">Sal 6</h1>
    <div class="content-kjøpseter">        
        <div class="poster">
            <img src="../nettside_bilder/dune2poster.jpg" alt="Dune: part 2">
            <p id="poster-movie">Dune: Part 2</p>
            <p id="poster-time">Kl 15:45</p>
        </div>
        <div class="seter">
            <div class="rad1">
                <p>Rad 1</p>
                <button onclick="toggle(1)" id="sete1" class="sete">Sete 1</button>
                <button onclick="toggle(2)" id="sete2" class="sete">Sete 2</button>
                <button onclick="toggle(3)" id="sete3" class="sete">Sete 3</button>
                <button onclick="toggle(4)" id="sete4" class="sete">Sete 4</button>
                <button onclick="toggle(5)" id="sete5" class="sete">Sete 5</button>
            </div>
            <div class="rad2">
                <p>Rad 2</p> 
                <button onclick="toggle(6)" id="sete6" class="sete">Sete 6</button>
                <button onclick="toggle(7)" id="sete7" class="sete">Sete 7</button>
                <button onclick="toggle(8)" id="sete8" class="sete">Sete 8</button>
                <button onclick="toggle(9)" id="sete9" class="sete">Sete 9</button>
                <button onclick="toggle(10)" id="sete10" class="sete">Sete 10</button>
            </div>
            <div class="rad3">
                <p>Rad 3</p>
                <button onclick="toggle(11)" id="sete11" class="sete">Sete 11</button>
                <button onclick="toggle(12)" id="sete12" class="sete">Sete 12</button>
                <button onclick="toggle(13)" id="sete13" class="sete">Sete 13</button>
                <button onclick="toggle(14)" id="sete14" class="sete">Sete 14</button>
                <button onclick="toggle(15)" id="sete15" class="sete">Sete 15</button>
            </div>
            <div class="rad4">
                <p>Rad 4</p> 
                <button onclick="toggle(16)" id="sete16" class="sete">Sete 16</button>
                <button onclick="toggle(17)" id="sete17" class="sete">Sete 17</button>
                <button onclick="toggle(18)" id="sete18" class="sete">Sete 18</button>
                <button onclick="toggle(19)" id="sete19" class="sete">Sete 19</button>
                <button onclick="toggle(20)" id="sete20" class="sete">Sete 20</button>
            </div> 
            <div class="rad5">
                <p>Rad 5</p>
                <button onclick="toggle(21)" id="sete21" class="sete">Sete 21</button>
                <button onclick="toggle(22)" id="sete22" class="sete">Sete 22</button>
                <button onclick="toggle(23)" id="sete23" class="sete">Sete 23</button>
                <button onclick="toggle(24)" id="sete24" class="sete">Sete 24</button>
                <button onclick="toggle(25)" id="sete25" class="sete">Sete 25</button>
            </div>    
        </div>    

        <div class="footer-seter">
            <div class="info">
                <div class="eksempel-ledig">
                    <p>Ledige seter</p>
                    <button class="sete"></button>
                </div>
                <div class="eksempel-valgt">
                    <p>Valgte seter</p>
                    <button id="valg-glow"></button>
                </div>
                <div class="eksempel-reservert">
                    <p>Reserverte seter</p>
                    <button class="sete reserved"></button>
                </div>
            </div>

            <form id="retriveticket" action="../php_saveticket/retriveticket.php" method="post"></form>
            <form id="saveticket" action="../php_saveticket/storecookie.php" method="post"></form>
            <button id="kjøp" onclick="kjøp(event)">Kjøp: 0kr</button>
            <button id="clearstorage">Tøm data</button>
        </div>  
    </div>
    
    <?php if (!isset($user)): ?>
        <script>
            console.log("a")
            let kjøpknapp = document.getElementById("kjøp")
            const popup = document.getElementById("popup-login")
            const close = document.getElementById("close-popup")
            localStorage.setItem("notloggedin", "1")
            kjøpknapp.addEventListener("click", function(){
                popup.style.display = "block"
            }) 
            close.addEventListener("click", function() {
                popup.style.display = "none"
            })    
    
        </script>
    <?php else: ?>
        <script>
            localStorage.removeItem("notloggedin")
        </script>
    <?php endif; ?>
    
    <?php if (isset($user)): ?>
        <script type="text/javascript">
            localStorage.setItem("userid", <?php echo json_encode($user["user_id"])?>)
        </script>
    <?php endif; ?>
    <script src="../js/script.js"></script>
</body>
</html>