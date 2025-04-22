<?php
    include 'info.php';
    try {
        $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        if($_SERVER['REQUEST_METHOD'] == 'POST') {
            $username = trim(htmlspecialchars(stripslashes($_POST['username'])));
            $email = trim(htmlspecialchars(stripslashes($_POST['email'])));
            $password = $_POST['password'];
            $verifyPassword = $_POST['verify-password'];
            $image = null;
            $zero = 0;
            if(empty($username) || empty($email) || empty($password) || empty($verifyPassword)) {
                echo "All fields are required";
                exit;
            }
            if(!filter_var($email, FILTER_VALIDATE_EMAIL)) {
                echo "Email is invalid";
                exit;
            }
            if($password !== $verifyPassword) {
                echo "Passwords do not match";
                exit;
            }
            if(isset($_FILES['profile-image']) && $_FILES['profile-image']['error'] === UPLOAD_ERR_OK) {
                $uploadDir = '../assets/img/';
                if(!file_exists($uploadDir)) {
                    mkdir($uploadDir, 0777, true);
                }
                $fileExtension = pathinfo($_FILES['profile-image']['name'], PATHINFO_EXTENSION);
                $imageName = uniqid() . '.' . $fileExtension;
                $uploadFile = $uploadDir . $imageName;
                if(move_uploaded_file($_FILES['profile-image']['tmp_name'], $uploadFile)) {
                    $image = $imageName;
                }else {
                    echo "Failed to load image";
                    exit;
                }
            }
            $sqlQurey = "SELECT COUNT(*) FROM USERS WHERE username = :username";
            $stmt = $conn->prepare($sqlQurey);
            $stmt->bindParam(":username", $username);
            $stmt->execute();
            if($stmt->fetchColumn() > 0) {
                echo "Username already in use";
                exit;
            }
            $sqlQurey = "SELECT COUNT(*) FROM USERS WHERE email = :email";
            $stmt = $conn->prepare($sqlQurey);
            $stmt->bindParam(":email", $email);
            $stmt->execute();
            if($stmt->fetchColumn() > 0) {
                echo "Email already exists";
                exit;
            }
            $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
            $sqlQurey = "INSERT INTO USERS(username, email, password, image) VALUES(:username, :email, :password, :image)";
            $stmt = $conn->prepare($sqlQurey);
            $stmt->bindParam(":username", $username);
            $stmt->bindParam(":email", $email);
            $stmt->bindParam(":password", $hashedPassword);
            $stmt->bindParam(":image", $image);
            if($stmt->execute()) {
                $sqlQurey = "INSERT INTO Userinfo VALUES (:username, :views, :notifications, :favorites, :later, :reading, :readed)";
                $stmt = $conn->prepare($sqlQurey);
                $stmt->bindParam(":username", $username);
                $stmt->bindParam(":views", $zero);
                $stmt->bindParam(":notifications", $zero);
                $stmt->bindParam(":favorites", $zero);
                $stmt->bindParam(":later", $zero);
                $stmt->bindParam(":reading", $zero);
                $stmt->bindParam(":readed", $zero);
                $stmt->execute();
                echo "Registration completed successfully";
                header("Location: ../pages/login.php");
            }else {
                echo "An error occurred during registration";
            }
        }
    }catch(PDOException $exp) {
        echo "Database connection failed" . $exp->getMessage();
    }
    $conn = null;
?>