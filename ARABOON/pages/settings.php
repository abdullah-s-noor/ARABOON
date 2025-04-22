<?php
    session_start();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="shortcut icon" href="../assets/icons/ARABOON.png">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <link rel="stylesheet" href="../assets/css/updateUser.css">
    <title>ARABOON - settings</title>
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
                <li><a href="<?php echo $_SESSION['role'] == 'admin' ? 'adminDashboard.php':'userDashboard.php'?>">Home</a></li>
                <li><a href="#">Manga List</a></li>
                <li><a href="#">Teams</a></li>
                <li><a href="#">News</a></li>
            </ul>
        </nav>
    </header>
    <main>
        <section style="margin: 20px auto;" class="container glass">
            <h2>Settings</h2>
            <form class="update-form" action="../actions/settings.php" method="post" autocomplete="off" enctype="multipart/form-data">
                <div class="form-group" style="display: none;">
                    <input type="text" id="userID" name="userID" value="<?php echo $_SESSION['username'];?>">
                    <label for="userID">userID</label>
                </div>
                <div  class="form-group">
                    <label for="username">Username</label>
                    <input type="text" id="username" name="username" class="form-input" value="<?php echo $_SESSION['username'];?>">
                </div>
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" id="email" name="email" class="form-input" value="<?php echo $_SESSION['email']?>">
                </div>
                <div class="form-group">
                    <label for="password">new Password</label>
                    <input type="password" id="password" name="password" class="form-input">
                </div>
                <div class="form-group">
                    <label for="image">Image</label>
                    <div class="file-input-wrapper">
                        <input type="file" id="image" name="image" class="file-input" accept="image/*">
                        <span class="file-input-text">Choose file</span>
                    </div>
                    <span class="file-name">No file chosen</span>
                </div>
                <button type="submit" class="update-btn">Update</button>
            </form>
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
    <script src="../assets/js/updateUser.js"></script>
</body>
</html>