<?php
    include 'info.php';
    try {
        $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        if($_SERVER["REQUEST_METHOD"] == 'POST') {
            $_chapter = trim(htmlspecialchars(stripslashes($_POST['past-chapter'])));
            $_manga = trim(htmlspecialchars(stripslashes($_POST['past-manga'])));
            $sqlQurey = "SELECT * FROM manga WHERE manga_name = :manganame AND chapter = :chapter";
            $stmt = $conn->prepare($sqlQurey);
            $stmt->bindParam(":manganame", $_manga);
            $stmt->bindParam(":chapter", $_chapter);
            $stmt->execute();
            $manga = $stmt->fetch(PDO::FETCH_ASSOC);
            if(!$manga) {
                echo "manga or chapter not found";
                exit;
            }
            $newName = trim(htmlspecialchars(stripslashes($_POST['manga-name'])));
            $newChapterNumber = trim(htmlspecialchars(stripslashes($_POST['chapter'])));
            $newRate = trim(htmlspecialchars(stripslashes($_POST['rate'])));
            $newName = (empty($newName)) ? $manga['manga_name']:$newName;
            $newChapterNumber = (empty($newChapterNumber)) ? $manga['chapter']:$newChapterNumber;
            $newRate = (empty($newRate)) ? $manga['rate']:$newRate;
            if($newName !== $manga['manga_name'] && $newChapterNumber !== $manga['chapter']) {
                $sqlQurey = "SELECT COUNT(*) FROM manga WHERE manga_name = :manganame AND chapter = :chapter";
                $stmt = $conn->prepare($sqlQurey);
                $stmt->bindParam(":manganame", $newName);
                $stmt->bindParam(":chapter", $newChapterNumber);
                $stmt->execute();
                if($stmt->fetchColumn() > 0) {
                    echo "this manga and chapter already exist";
                    exit;
                }
            }
            $newChapter = $manga['chapter_file'];
            if(isset($_FILES['file-chapter']) && $_FILES['file-chapter']['error'] == 0) {
                $uploadDir = '../assets/manga/';
                if(!file_exists($uploadDir)) {
                    mkdir($uploadDir, 0777, true);
                }
                $fileExtension = pathinfo($_FILES['file-chapter']['name'], PATHINFO_EXTENSION);
                $chapterName = uniqid() . '.' . $fileExtension;
                $uploadFile = $uploadDir . $chapterName;
                if(move_uploaded_file($_FILES['file-chapter']['tmp_name'], $uploadFile)) {
                    $newChapter = $chapterName;
                }else {
                    echo "Failed to upload new file";
                    exit;
                }
            }
            $sqlQurey = "UPDATE manga SET chapter = :chapter, manga_name = :manganame, chapter_file = :chapterfile, rate = :rate WHERE chapter = :cc AND manga_name = :mm";
            $params = [
                ":chapter" => $newChapterNumber,
                ":manganame" => $newName,
                ":chapterfile" => $newChapter,
                ":rate" => $newRate,
                ":cc" => $_chapter,
                ":mm" => $_manga
            ];
            $stmt = $conn->prepare($sqlQurey);
            if($stmt->execute($params)) {
                echo "Update completed successfully";
                header("Location: ../pages/updateManga.php");
            }else {
                echo "An error occurred during update";
            }
        }
    }catch(PDOException $exp) {
        echo "Database connection failed" . $exp->getMessage();
    }
?>