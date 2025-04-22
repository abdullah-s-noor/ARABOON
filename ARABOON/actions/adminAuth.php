<?php
    if (!isset($_SESSION['role']) || $_SESSION['role'] !== 'admin') {
        echo "You are not allowed to enter here";
        exit();
    }
?>