<?php
    session_start();
    $config = json_decode(file_get_contents('../actions/config.json') , true);
    if (!$config) {
        throw new Exception("Error reading configuration file");
    }
    $servername = $config['servername'];
    $username = $config['username'];
    $password = $config['password'];
    $dbname = $config['dbname'];
    try {
        $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        if($_SERVER['REQUEST_METHOD'] == 'GET') {
            $name = $_GET['manga-name'];
            $chapter = $_GET['chapter'];
            $sqlQurey = "SELECT * FROM manga WHERE manga_name = :manganame AND chapter = :chapter";
            $stmt = $conn->prepare($sqlQurey);
            $stmt->bindParam(":manganame", $name);
            $stmt->bindParam(":chapter", $chapter);
            $stmt->execute();
            $manga = $stmt->fetch(PDO::FETCH_ASSOC);
            if(!$manga) {
                echo "manga or chapter not found";
                exit;
            }
        }
    }catch(PDOException $exp) {
        echo "Database connection failed" . $exp->getMessage();
    }
    $conn = null;
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ARABOON - <?php echo $manga['manga_name'];?></title>
    <link rel="shortcut icon" href="../assets/icons/ARABOON.png">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <link rel="stylesheet" href="../assets/css/style.css">
    <link rel="stylesheet" href="../assets/css/chapter.css">
</head>
<body>
    <header class="header">
            <div class="header1">
                <div class="logo">
                    <div style="width:50px;height:50px"><img style="width:100%;height:100%" src="../assets/icons/ARABOON.png" alt="img not found"></div>
                    <h1>ARABOON</h1>
                </div>
                <div class="LSU">
                    <ul>
                        <li><a href="../actions/logout.php">logout</a></li>
                    </ul>
                </div>
            </div>
            <nav>
                <ul>
                    <li><a href="<?php echo $_SESSION['role'] == 'admin' ? 'adminDashboard.php':'userDashboard.php';?>">Home</a></li>
                    <li><a href="#">Manga List</a></li>
                    <li><a href="#">Teams</a></li>
                    <li><a href="#">News</a></li>
                </ul>
            </nav>
        </header>
    <div style="animation: fadeIn 0.5s ease-in;" class="container">
        <h1 class="title">Manga Details</h1>    
        <div class="manga-info">
            <div class="info-card">
                <div class="info-label"><strong>Manga Name</strong></div>
                <div class="info-value"><?php echo $manga['manga_name']; ?></div>
            </div>           
            <div class="info-card">
                <div class="info-label"><strong>Chapter Number</strong></div>
                <div class="info-value"><?php echo $manga['chapter']; ?></div>
            </div>         
            <div class="info-card">
                <div class="info-label"><strong>Rating</strong></div>
                <div class="info-value rating">
                <?php echo $manga['rate']; ?>
                    <span class="star">★</span>
                </div>
            </div>
        </div>
        <div class="chapter-viewer">
            <iframe src="../assets/manga/<?php echo $manga['chapter_file']; ?>#pagemode=none&toolbar=0&navpanes=0&scrollbar=0" class="chapter-frame"title="Manga Chapter Viewer"></iframe>
        </div>
    </div>
    <footer>
        <p>@ARABOON</p>
        <div class="icon-footer">
            <a href="#"><i class="fab fa-facebook"></i></a>
            <a href="#"><i class="fab fa-linkedin"></i></a>
            <a href="#"><i class="fab fa-twitter"></i></a>
            <a href="#"><i class="fab fa-github"></i></a>
            <a href="#"><i class="fab fa-whatsapp"></i></a>
        </div>
    </footer>
</body>
</html>