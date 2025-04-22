<?php
    session_start();
    include '../actions/userAuth.php';
    include '../actions/selectManga.php';
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="shortcut icon" href="../assets/icons/ARABOON.png">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <link rel="stylesheet" href="../assets/css/style.css">
    <link rel="stylesheet" href="../assets/css/view.css">
    <title>ARABOON - user dashboard</title>
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
                    <li><a href="settings.php">settings</a></li>
                    <li><a href="../actions/logout.php">logout</a></li>
                </ul>
            </div>
        </div>
        <nav>
            <ul>
                <li><a href="#">Home</a></li>
                <li><a href="#">Manga List</a></li>
                <li><a href="#">Teams</a></li>
                <li><a href="#">News</a></li>
            </ul>
        </nav>
    </header>
    <main>
        <aside style="margin: 20px auto;" class="glass">
            <div class="user-info">
                <div class="user-img">
                    <img src="../assets/img/<?php echo $_SESSION['image'];?>" alt="image not found">
                </div>
                <div class="user-body">
                    <h5><?php echo $_SESSION['username'];?></h5>
                    <h5><?php echo $_SESSION['email'];?></h5>
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
            <div class="info">
                <div class="info-header">
                    Information about your following
                </div>
                <div class="info-card">
                    <div class="info-item">
                        <h5>Views: <?php echo $_SESSION['views'];?> <i class="fa-solid fa-eye" style="color: #ffffff;"></i></h5>
                    </div>
                    <div class="info-item">
                        <h5>Notifications: <?php echo $_SESSION['notifications'];?> <i class="fa-solid fa-bell" style="color: #FFD43B;"></i></h5>
                    </div>
                    <div class="info-item">
                        <h5>Favorites: <?php echo $_SESSION['favorites'];?> <i class="fa-solid fa-heart" style="color: #d60000;"></i></h5>
                    </div>
                    <div class="info-item">
                        <h5>Reading: <?php echo $_SESSION['reading'];?> <i class="fa-solid fa-book-open" style="color: #ffffff;"></i></h5>
                    </div>
                    <div class="info-item">
                        <h5>Read: <?php echo $_SESSION['readed'];?> <i class="fa-solid fa-check" style="color: #ffffff;"></i></h5>
                    </div>
                </div>
            </div>
        </aside>
        <section style="margin: 20px auto;" class="glass">
            <div>
                <form action="chapterPage.php" method="get">
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