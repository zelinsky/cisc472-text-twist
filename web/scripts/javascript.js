$(document).ready(function() {

    function makeGame(data) {
	$("#rack").html(data.rack);
	data.words.forEach(word => {
	    console.log(word);
	});
    };
    
    $("#start").click(() => {
	$.ajax({
	    method: "GET",
	    url: "/api/words",
	    success: data=>{makeGame(data)}
	});
    });

    $("#start").click();
});
