<?php
    include 'info.php';
    try {
            $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            if($_SERVER['REQUEST_METHOD'] == 'GET') {
                $mangaName = trim(htmlspecialchars(stripslashes($_GET['manga-name'])));
                $chapter = trim(htmlspecialchars(stripslashes($_GET['chapter'])));
                $sqlQurey = "SELECT COUNT(*) FROM manga WHERE manga_name = :manganame AND chapter = :chapter";
                $stmt = $conn->prepare($sqlQurey);
                $stmt->bindParam(":manganame", $mangaName);
                $stmt->bindParam(":chapter", $chapter);
                $stmt->execute();
                if($stmt->fetchColumn() == 0) {
                    echo "this manga or chapter dose not exist";
                    exit;
                }
                $sqlQurey = "DELETE FROM manga where manga_name = :mangeName AND chapter = :chapter";
                $stmt = $conn->prepare($sqlQurey);
                $stmt->bindParam(":mangeName", $mangaName);
                $stmt->bindParam(":chapter", $chapter);
                if($stmt->execute()) {
                    echo "Deleted successfully";
                    header("Location: ../pages/deleteManga.php");
                }else {
                    echo "Deletion error";
                }
            }
    }catch(PDOException $exp) {
        echo "Database connection failed" . $exp->getMessage();
    }
?>