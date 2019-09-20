<?php
$db_path = "sqlite:../../scrabble.sqlite";
$conn = new PDO($db_path);
if (!$conn) die($error);
