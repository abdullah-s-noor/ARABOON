<?php
    session_start();
    include '../actions/adminAuth.php';
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ARABOON - Add Manga</title>
    <link rel="shortcut icon" href="../assets/icons/ARABOON.png">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <link rel="stylesheet" href="../assets/css/updateManga.css">
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
                <li><a href="adminDashboard.php">Home</a></li>
                <li><a href="#">Manga List</a></li>
                <li><a href="#">Teams</a></li>
                <li><a href="#">News</a></li>
            </ul>
        </nav>
    </header>
    <main>
        <section>
            <div class="container glass">
                <h2>Add Manga</h2>
                <form action="../actions/addManga.php" class="update-form" method="post" autocomplete="off" enctype="multipart/form-data">
                    <div class="form-group">
                        <div>
                            <input name="manga-name" type="text" class="form-input" id="manga-name-new" required>
                            <span class="input-label">manga name</span>
                        </div>
                        <div>
                            <input name="chapter" type="text" class="form-input" id="chapter-new" required>
                            <span class="input-label">chapter</span>
                        </div>
                        <div>
                            <input name="rate" type="text" class="form-input" id="rate" required>
                            <span class="input-label">rate</span>
                        </div>
                        <div class="file-input-container">
                            <input name="file-chapter" type="file" id="chapter-file" style="display: none;" accept=".pdf" required>
                            <button type="button" class="file-input-button"
                                onclick="document.getElementById('chapter-file').click()">Choose file</button>
                            <span class="file-name">No file chosen</span>
                            <span class="input-label">chapter file</span>
                        </div>
                        <input type="submit" class="add-button" id="submit-btn" value="Add" disabled>
                    </div>
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
    <script src="../assets/js/addManga.js"></script>
</body>

</html>