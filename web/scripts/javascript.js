$(document).ready(function() {

    function makeGame(data) {
	$("#id").html(data);
    };
    
    $("#start").click(() => {
	$.ajax({
	    method: "GET",
	    url: "/api",
	    success: data=>{makeGame(data)}
	});
    });

});
