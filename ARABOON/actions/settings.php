<?php
    session_start();
    include 'info.php';
    try {
        $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        if($_SERVER["REQUEST_METHOD"] == 'POST') {
            $userID = trim(htmlspecialchars(stripslashes($_POST['userID'])));
            $newUsername = trim(htmlspecialchars(stripslashes($_POST["username"])));
            $newEmail = trim(htmlspecialchars(stripslashes($_POST['email'])));
            $newPassword = $_POST['password'];
            if(empty($newUsername) || empty($newEmail)) {
                echo "Username and email are required";
                exit;
            }
            $sqlQurey = "SELECT * FROM Users WHERE username = :userID";
            $stmt = $conn->prepare($sqlQurey);
            $stmt->bindParam(":userID", $userID);
            $stmt->execute();
            $user = $stmt->fetch(PDO::FETCH_ASSOC);
            if(!$user) {
                echo "User not found";
                exit;
            }
            if($newUsername !== $user['username']) {
                $sqlQurey = "SELECT COUNT(*) FROM Users WHERE username = :username AND username != :userID";
                $stmt = $conn->prepare($sqlQurey);
                $stmt->bindParam(":username", $newUsername);
                $stmt->bindParam(":userID", $userID);
                $stmt->execute();
                if($stmt->fetchColumn() > 0) {
                    echo "Username already in use";
                    exit;
                }
            }
            if($newEmail !== $user['email']) {
                $sqlQurey = "SELECT COUNT(*) FROM Users WHERE email = :email AND username != :userID";
                $stmt = $conn->prepare($sqlQurey);
                $stmt->bindParam(":email", $newEmail);
                $stmt->bindParam(":userID", $userID);
                $stmt->execute();
                if($stmt->fetchColumn() > 0) {
                    echo "Email already exists";
                    exit;
                }
            }
            $newImage = $user['image'];
            if(isset($_FILES['image']) && $_FILES['image']['error'] == 0) {
                $uploadDir = '../assets/img/';
                if(!file_exists($uploadDir)) {
                    mkdir($uploadDir, 0777, true);
                }
                $fileExtension = pathinfo($_FILES['image']['name'], PATHINFO_EXTENSION);
                $imageName = uniqid() . '.' . $fileExtension;
                $uploadFile = $uploadDir . $imageName;
                if(move_uploaded_file($_FILES['image']['tmp_name'], $uploadFile)) {
                    $newImage = $imageName;
                }else {
                    echo "Failed to upload new image";
                    exit;
                }
            }
            $sqlQurey = "UPDATE Users SET username = :username, email = :email, image = :image";
            $params = [
                ":username" => $newUsername,
                ":email" => $newEmail,
                ":image" => $newImage,
                ":userID" => $userID
            ];
            if(!empty($newPassword)) {
                $hashedPassword = password_hash($newPassword, PASSWORD_DEFAULT);
                $sqlQurey .= ", password = :password";
                $params[":password"] = $hashedPassword;
            }
            $sqlQurey .= " WHERE username = :userID";
            $stmt = $conn->prepare($sqlQurey);
            if($stmt->execute($params)) {
                $sqlQurey = "SELECT * FROM Users where username = :username";
                $stmt = $conn->prepare($sqlQurey);
                $stmt->bindParam(":username", $newUsername);
                $stmt->execute();
                $user = $stmt->fetch(PDO::FETCH_ASSOC);
                $_SESSION['username'] = $user['username'];
                $_SESSION['email'] = $user['email'];
                $_SESSION['image'] = $user['image'];
                echo "Update completed successfully";
                header("Location: ../pages/settings.php");
            }else {
                echo "An error occurred during update";
            }
        }
    }catch(PDOException $exp) {
        echo "Database connection failed: " . $exp->getMessage();
    }
    $conn = null;
?>