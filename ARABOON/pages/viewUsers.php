<?php
    session_start();
    include '../actions/adminAuth.php';
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ARABOON - Display Users Data</title>
    <link rel="shortcut icon" href="../assets/icons/ARABOON.png">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <link rel="stylesheet" href="../assets/css/style.css">
    <link rel="stylesheet" href="../assets/css/table.css">
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
    <div style="margin: 20px auto;animation: fadeIn 0.5s ease-in;" class="container glass">
        <h2>Display Users Data</h2>
        <div class="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Profile Image</th>
                        <th colspan="2" style="text-align: center;">Actions</th>
                    </tr>
                </thead>
                <tbody>
                <?php
                $config = json_decode(file_get_contents('../actions/config.json') , true);
                $servername = $config['servername'];
                $username = $config['username'];
                $password = $config['password'];
                $dbname = $config['dbname'];
                try {
                    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
                    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                    $sqlQurey = "SELECT * FROM Users";
                    $stmt = $conn->prepare($sqlQurey);
                    $stmt->execute();
                    $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
                    if (!empty($users)) {
                        foreach ($users as $user) {
                            echo "<tr>";
                            echo "<td>" . htmlspecialchars($user['username']) . "</td>";
                            echo "<td>" . htmlspecialchars($user['email']) . "</td>";
                            echo "<td>" . htmlspecialchars($user['role']) . "</td>";
                            echo "<td><img src='../assets/img/". htmlspecialchars($user['image']) . "' alt='notfound' style='width:100px;height:100px;border-radius:50%'></td>";
                            echo "<td><a class='btn btn-delete' href='../actions/deleteUser.php?username=" . urlencode($user['username']) . "' onclick='return confirm(\"Are you sure you want to delete this user?؟\")'>delete</a></td>";
                            echo "<td><a class='btn btn-update' href='updateUser.php?userID=" . urlencode($user['username']) . 
                                                                                    "&username=" . urlencode($user['username']) . 
                                                                                    "&email=" . urlencode($user['email']) . 
                                                                                    "&password=" . urlencode($user['password']) . 
                                                                                    "&role=" . urlencode($user['role']) . 
                                                                                    "&image=" . urlencode($user['image']) . 
                                                                                    "'>update</a></td>";
                            echo "</tr>";
                        }
                    } else {
                        echo "<tr><td colspan='3'>No data</td></tr>";
                    }
                }catch(PDOException $exp) {
                    echo "<tr><td colspan='3'>error: " . $exp->getMessage() . "</td></tr>";
                }
            ?>
                </tbody>
            </table>
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