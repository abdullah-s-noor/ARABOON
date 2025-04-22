<?php
    session_start();
    function getMangaData() {
        try {
            $config = json_decode(file_get_contents('actions/config.json') , true);
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
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="shortcut icon" href="assets/icons/ARABOON.png">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <link rel="stylesheet" href="assets/css/style.css">
    <link rel="stylesheet" href="assets/css/view.css">
    <title>ARABOON - homePage</title>
</head>
<body>
    <header class="header">
        <div class="header1">
            <div class="logo">
                <div style="width:50px;height:50px"><img style="width:100%;height:100%" src="assets/icons/ARABOON.png" alt="img not found"></div>
                <h1>ARABOON</h1>
            </div>
            <div class="LSU">
                <ul>
                    <li><a href="pages/login.php">Login</a></li>
                    <li><a href="pages/signup.php">Signup</a></li>
                </ul>
            </div>
        </div>
        <nav>
            <ul>
                <li><a href="index.php">Home</a></li>
                <li><a href="#">Manga List</a></li>
                <li><a href="#">Teams</a></li>
                <li><a href="#">News</a></li>
            </ul>
        </nav>
    </header>
    <main>
        <aside style="margin: 20px auto;" class="glass">
            <div class="container-aside">
                <div class="user-info">
                    <div class="user-img">
                        <img src="../assets/img/abdullah.png" alt="">
                    </div>
                </div>
                <div class="SMedia">
                    <div class="social-header">Social Media</div>
                    <div class="social-icons">
                        <a href="#" class="icon discord">
                            <i class="fab fa-discord"></i>
                        </a>
                        <a href="#" class="icon facebook">
                            <i class="fab fa-facebook"></i>
                        </a>
                        <a href="#" class="icon twitter">
                            <i class="fab fa-twitter"></i>
                        </a>
                    </div>
                </div>
            </div>
        </aside>
        <section style="margin: 20px auto;" class="glass">
        <div>
            <form action="pages/chapterPage.php" method="get">
                    <label for="manga-name">Select Manga Name:</label>
                    <input name="manga-name" list="mangaList" id="manga-name" placeholder="Choose Manga Name" class="inpData">
                    <datalist id="mangaList"></datalist>
                    <label for="chapter-number">Select Chapter Number:</label>
                    <input name="chapter" list="chapterList" id="chapter-number" placeholder="Choose Chapter Number" class="inpData" disabled>
                    <datalist id="chapterList"></datalist>
                    <input type="submit" id="submit-btn" disabled>
                </form>
        </div>
        </section>
    </main>
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
    <script>
        const mangaData = <?php echo json_encode($mangaData); ?>;
        const mangaInput = document.getElementById('manga-name');
        const chapterInput = document.getElementById('chapter-number');
        const mangaDatalist = document.getElementById('mangaList');
        const chapterDatalist = document.getElementById('chapterList');
        const submitButton = document.getElementById('submit-btn');
        Object.keys(mangaData).forEach(manga => {
            const option = document.createElement('option');
            option.value = manga;
            mangaDatalist.appendChild(option);
        });
        mangaInput.addEventListener('input', function() {
            const selectedManga = mangaInput.value;
            chapterDatalist.innerHTML = '';
            chapterInput.value = '';
            chapterInput.disabled = true;
            submitButton.disabled = true;
            if (mangaData[selectedManga]) {
                mangaData[selectedManga].forEach(chapter => {
                    const option = document.createElement('option');
                    option.value = `${chapter}`;
                    chapterDatalist.appendChild(option);
                });
                chapterInput.disabled = false;
            }
        });
        chapterInput.addEventListener('input', function() {
            if (!mangaInput.value || !mangaData[mangaInput.value]) {
                alert("Please select a manga name first!");
                chapterInput.value = '';
            }
            updateSubmitButtonState();
        });
        function updateSubmitButtonState() {
            submitButton.disabled = !(mangaInput.value && chapterInput.value);
        }
    </script>
</body>
</html>