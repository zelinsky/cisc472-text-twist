<?php
require_once 'dbconnect.php';
 
    $rack = "ABILOTU";
    //this is a sample query which gets some data, the order by part shuffles the results
    //the limit 0, 10 takes the first 10 results.
    // you might want to consider taking more results, implementing "pagination", 
    // ordering by rank, etc.
    $query = "SELECT words FROM racks WHERE rack = :rack";
    
    //this next line could actually be used to provide user_given input to the query to 
    //avoid SQL injection attacks
    $stmt = $conn->prepare($query);
    $stmt->bindParam(":rack", $rack, PDO::PARAM_STR);
    $stmt->execute();
    
    //The results of the query are typically many rows of data
    //there are several ways of getting the data out, iterating row by row,
    //I chose to get associative arrays inside of a big array
    //this will naturally create a pleasant array of JSON data when I echo in a couple lines
    $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
    foreach ($results as $r) {
        $words = explode("@@", $r["words"]);
        foreach ($words as $w) {
            echo $w."\n";   
        }
    }
    
    //this part is perhaps overkill but I wanted to set the HTTP headers and status code
    //making to this line means everything was great with this request
    header('HTTP/1.1 200 OK');
    //this lets the browser know to expect json
    header('Content-Type: application/json');
    //this creates json and gives it back to the browser
    //echo json_encode($results);

