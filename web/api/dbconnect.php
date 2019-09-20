<?php
$db_path = "sqlite:../../scrabble.sqlite";
$conn = new PDO($db_host, $db_user, $db_pass, $db_name);
if (!$conn) die($error);
