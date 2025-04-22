<?php
    session_start();
    include 'info.php';
    try {
        $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        if($_SERVER["REQUEST_METHOD"] == 'POST') {
            $email = trim(htmlentities(stripslashes($_POST['email'])));
            $password = $_POST['password'];
            $sqlQurey = "SELECT COUNT(*) FROM Users where email = :email";
            $stmt = $conn->prepare($sqlQurey);
            $stmt->bindParam(":email", $email);
            $stmt->execute();
            if(!filter_var($email, FILTER_VALIDATE_EMAIL)) {
                $_SESSION['error'] = "Invalid email format";
                header("Location: ../pages/login.php");
                echo "Wrong";
                exit;
            }
            if($stmt->fetchColumn() == 0) {
                echo "This email not exist";
                header("Location: ../pages/signup.php");
                exit;
            }
            $sqlQurey = "SELECT Users.*, UserInfo.* FROM Users
                        LEFT JOIN UserInfo ON Users.username = UserInfo.username 
                        WHERE Users.email = :email";
            $stmt = $conn->prepare($sqlQurey);
            $stmt->bindParam(":email", $email);
            $stmt->execute();
            $user = $stmt->fetch(PDO::FETCH_ASSOC);
            if($user && password_verify($password , $user['password'])) {
                $_SESSION['username'] = $user['username'];
                $_SESSION['email'] = $user['email'];
                $_SESSION['image'] = $user['image'];
                $_SESSION['role'] = $user['role'];
                $_SESSION['views'] = $user['views'];
                $_SESSION['notifications'] = $user['notifications'];
                $_SESSION['favorites'] = $user['favorites'];
                $_SESSION['later'] = $user['later'];
                $_SESSION['reading'] = $user['reading'];
                $_SESSION['readed'] = $user['readed'];
                if($_SESSION['role'] === 'admin') {
                    header("Location: ../pages/adminDashboard.php");
                }else {
                    header("Location: ../pages/userDashboard.php");
                }
            }
        }else {
            $_SESSION['error'] = "Invalid email or password";
            header("Location: ../pages/login.php");
            exit;
        }
    }catch(PDOEXception $exp) {
        echo "Database connection failed" . $exp->getMessage();
    }
?>