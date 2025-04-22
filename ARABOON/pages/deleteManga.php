<?php
    session_start();
    include '../actions/adminAuth.php';
    include '../actions/selectManga.php';
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ARABOON - Delete Manga</title>
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
                <h2>Delete Manga</h2>
                <form action="../actions/deleteManga.php" class="update-form" metehod="get">
                    <div class="form-group">
                        <div>
                            <input name="manga-name" type="text" class="form-input" id="manga-name" list="manga-names">
                            <span class="input-label">manga name</span>
                            <datalist id="manga-names"></datalist>
                        </div>
                        <div>
                            <input name="chapter" type="text" class="form-input" id="chapter" list="chapters" disabled>
                            <span class="input-label">chapter</span>
                            <datalist id="chapters"></datalist>
                        </div>
                        <input type="submit" value="delete" class="add-button" id="submit-btn" disabled>
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
    <script>
        const mangaData = <?php echo json_encode($mangaData); ?>;
        const mangaInput = document.getElementById('manga-name');
        const chapterInput = document.getElementById('chapter');
        const mangaDatalist = document.getElementById('manga-names');
        const chapterDatalist = document.getElementById('chapters');
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
        document.getElementById('chapter-file').addEventListener('change', function(e) {
            const fileName = e.target.files[0] ? e.target.files[0].name : 'No file chosen';
            e.target.nextElementSibling.nextElementSibling.textContent = fileName;
        });
    </script>
</body>
</html>