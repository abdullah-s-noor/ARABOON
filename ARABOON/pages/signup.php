<?php
    session_start();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="shortcut icon" href="../assets/icons/ARABOON.png">
    <title>ARABOON - SignUp</title>
    <link rel="stylesheet" href="../assets/css/signup.css">
    <link rel="shourtcut icon" href="icon/signup.png">

</head>
<body>
    <div class="container">
        <div class="signup-box glass">
            <h2>SignUp</h2>
            <form action="../actions/signup.php" method="post" autocomplete="off" enctype="multipart/form-data">
                <div class="input-box">
                    <input type="text" id="username" name="username" required autofocus>
                    <label for="username">Username</label>
                </div>
                <div class="input-box">
                    <input type="email" id="email" name="email" required>
                    <label for="email">Email</label>
                </div>
                <div class="input-box">
                    <input type="password" id="password" name="password" required>
                    <label for="password">Password</label>
                </div>
                <div class="input-box">
                    <input type="password" id="verify-password" name="verify-password" required>
                    <label for="verify-password">Verify Password</label>
                </div>
                <div class="file-box input-box">
                    <input style="border: none;" type="file" id="profile-image" name="profile-image" accept=".png, .jpg, .jpeg" required>
                </div>
                <div class="terms-privacy">
                    <sub><input class="glass" type="checkbox" id="terms-privacy" name="terms-privacy" value="true" required></sub>
                    <label for="terms-privacy" style="user-select: none;"><span>I agree to the</span> <a href="#">terms and privacy</a></label>
                </div>
                <button type="submit" class="btn">SignUp</button>
                <div class="login-link">
                    <a href="login.php" target="_self">Already have an account?</a>
                </div>
            </form>
        </div>
    </div>
</body>
</html>
