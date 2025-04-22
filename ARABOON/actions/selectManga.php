<?php
    function getMangaData() {
        try {
            $config = json_decode(file_get_contents('../actions/config.json') , true);
            if (!$config) {
                throw new Exception("Error reading configuration file");
            }
            $servername = $config['servername'];
            $username = $config['username'];
            $password = $config['password'];
            $dbname = $config['dbname'];
            
            $conn = new PDO("mysql:host=$servername;dbname=$dbname;charset=utf8mb4", $username, $password);
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            
            $sqlQuery = "SELECT manga_name, chapter FROM manga ORDER BY manga_name, chapter";
            $stmt = $conn->prepare($sqlQuery);
            $stmt->execute();
            
            $mangaData = [];
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                $mangaName = $row['manga_name'];
                $chapterNumber = $row['chapter'];
                if (!isset($mangaData[$mangaName])) {
                    $mangaData[$mangaName] = [];
                }
                $mangaData[$mangaName][] = $chapterNumber;
            }
            
            return $mangaData;
        } catch (Exception $e) {
            return ['error' => $e->getMessage()];
        } finally {
            if (isset($conn)) {
                $conn = null;
            }
        }
    }
    $mangaData = getMangaData();
?>