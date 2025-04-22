<?php
    $config = json_decode(file_get_contents('config.json') , true);
    $servername = $config['servername'];
    $username = $config['username'];
    $password = $config['password'];
    $dbname = $config['dbname'];
?>