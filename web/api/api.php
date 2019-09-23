<?php
require_once 'dbconnect.php';

//$verb = $_SERVER['REQUEST_METHOD'];
//$uri = $_SERVER['PATH_INFO'];
//$routes = explode("/", $uri);
 
function generate_rack($n){
  $tileBag = "AAAAAAAAABBCCDDDDEEEEEEEEEEEEFFGGGHHIIIIIIIIIJKLLLLMMNNNNNNOOOOOOOOPPQRRRRRRSSSSTTTTTTUUUUVVWWXYYZ";
  $rack_letters = substr(str_shuffle($tileBag), 0, $n);
  
  $temp = str_split($rack_letters);
  sort($temp);
  return implode($temp);
};

function get_words($conn, $rack) {
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
    return $results;
}

function get_subracks($rack) {
    $racks = [];
    for($i = 0; $i < pow(2, strlen($rack)); $i++){
	$ans = "";
	for($j = 0; $j < strlen($rack); $j++){
            //if the jth digit of i is 1 then include letter
	    if (($i >> $j) % 2) {
                $ans .= $rack[$j];
	    }
        }
        if (strlen($ans) > 1){
          $racks[] = $ans;	
        }
    }
    $racks = array_unique($racks);
    return $racks;
}

    //foreach ($results as $r) {
    //$words = explode("@@", $r["words"]);
        //foreach ($words as $w) {
        //    echo $w."\n";   
        //}
    //}
    do {
        $results = [];
        $rack = generate_rack(6);
	$subracks = get_subracks($rack);
        foreach($subracks as $r) {
	    $result = get_words($conn, $r);
            if (!empty($result)) {
		$results = array_merge($results, explode("@@", $result[0]["words"]));
	    }
	}
    } while (empty($results));
    usort($results, function($a, $b) {
	return strlen($a) - strlen($b) ?: strcmp($a, $b);
    });
    $ret["rack"] = $rack;
    $ret["words"] = $results;
    //$results = $results[0];
    //$results["rack"] = $rack;
    //$results["words"] = explode("@@", $results["words"]);
    //this part is perhaps overkill but I wanted to set the HTTP headers and status code
    //making to this line means everything was great with this request
    header('HTTP/1.1 200 OK');
    //this lets the browser know to expect json
    header('Content-Type: application/json');
    //this creates json and gives it back to the browser

    echo json_encode($ret);
    

