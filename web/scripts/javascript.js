$(document).ready(function() {

    function makeGame(data) {
	console.log(data);
	$("#words").html(data);
    };
    
    $("#start").click(() => {
	$.ajax({
	    method: "GET",
	    url: "/api/words",
	    success: data=>{makeGame(data)}
	});
    });

});
