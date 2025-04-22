<?php
    include 'info.php';
    if(isset($_GET['username'])) {
        try {
            $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            if($_SERVER['REQUEST_METHOD'] == 'GET') {
                $username = trim(htmlspecialchars(stripslashes($_GET['username'])));
                $sqlQurey = "DELETE FROM Users WHERE username = :username";
                $stmt = $conn->prepare($sqlQurey);
                $stmt->bindParam(":username", $username);
                $stmt->execute();
                echo "Deleted successfully";
                header("Location: ../pages/viewUsers.php");
            }
        }catch(PDOException $exp) {
            echo "Database connection failed" . $exp->getMessage();
        }
    }else {
        echo "This user was not found";
    }
?>