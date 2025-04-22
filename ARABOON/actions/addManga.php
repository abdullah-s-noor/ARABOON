<?php
    include 'info.php';
    try {
        $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        if($_SERVER['REQUEST_METHOD'] == 'POST') {
            $chapterNumber = trim(htmlspecialchars(stripslashes($_POST['chapter'])));
            $mangaName = trim(htmlspecialchars(stripslashes($_POST['manga-name'])));
            $rate = trim(htmlspecialchars(stripslashes($_POST['rate'])));
            $chapter = null;
            if(empty($chapterNumber) || empty($mangaName) || empty($rate)) {
                echo "All fields are required";
                exit;
            }
            $sqlQurey = "SELECT COUNT(*) FROM manga WHERE chapter = :chapter AND manga_name = :manga_name";
            $stmt = $conn->prepare($sqlQurey);
            $stmt->bindParam(":chapter", $chapterNumber);
            $stmt->bindParam(":manga_name", $mangaName);
            $stmt->execute();
            if($stmt->fetchColumn() > 0) {
                echo "file already exist";
                exit;
            }
            if(isset($_FILES['file-chapter']) && $_FILES['file-chapter']['error'] === UPLOAD_ERR_OK) {
                $uploadDir = '../assets/manga/';
                if(!file_exists($uploadDir)) {
                    mkdir($uploadDir, 0777, true);
                }
                $fileExtension = pathinfo($_FILES['file-chapter']['name'], PATHINFO_EXTENSION);
                $chapterName = uniqid() . '.' . $fileExtension;
                $uploadFile = $uploadDir . $chapterName;
                if(move_uploaded_file($_FILES['file-chapter']['tmp_name'], $uploadFile)) {
                    $chapter = $chapterName;
                }else {
                    echo "Failed to load file";
                    exit;
                }
            }
            $sqlQurey = "INSERT INTO manga VALUES(:chapterNumber, :mangaName, :chapter, :rate)";
            $stmt = $conn->prepare($sqlQurey);
            $stmt->bindParam(":chapterNumber", $chapterNumber);
            $stmt->bindParam(":mangaName", $mangaName);
            $stmt->bindParam(":chapter", $chapter);
            $stmt->bindParam(":rate", $rate);
            if($stmt->execute()) {
                echo "addition completed successfully";
                header("Location: ../pages/addManga.php");
            }else {
                echo "An error occurred during addition";
            }
        }
    }catch(PDOException $exp) {
        echo "Database connection failed" . $exp->getMessage();
    }
    $conn = null;
?>