<?php
    session_start();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="shortcut icon" href="../assets/icons/ARABOON.png">
    <title>ARABOON - Login</title>
    <link rel="stylesheet" href="../assets/css/login.css">
    <link rel="shourtcut icon" href="icon/login.png">
</head>
<body>
    <div class="container">
        <div class="login-box glass">
            <h2>Login</h2>
            <form action="../actions/login.php" method="post">
                <div class="input-box">
                    <input type="email" id="email" name="email" required autofocus>
                    <label for="email">Email</label>
                </div>
                <div class="input-box">
                    <input type="password" id="password" name="password" required>
                    <label for="password">Password</label>
                </div>
                <div class="forgot-password">
                    <a href="#">Forgot Password?</a>
                </div>
                <div class="remember-me">
                    <sub><input class="glass" type="checkbox" id="remember-me" name="remember" value="true"></sub>
                    <label for="remember-me" style="user-select: none;">Remember me</label>
                </div>
                <button type="submit" class="btn">Login</button>
                <div class="signup-link">
                    <span>Don't have an account? <a href="signup.php" target="_self">Signup</a></span>
                </div>
            </form>
        </div>
    </div>
</body>
</html>