<?php
    if (!isset($_SESSION['role']) || $_SESSION['role'] !== 'member') {
        echo "You are not allowed to enter here";
        exit();
    }
?>