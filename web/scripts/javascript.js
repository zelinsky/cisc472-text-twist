$(document).ready(function() {

    function makeGame(data) {
	console.log(data);
	$("#rack").html(data.rack);
    };
    
    $("#start").click(() => {
	$.ajax({
	    method: "GET",
	    url: "/api/words",
	    success: data=>{makeGame(data)}
	});
    });

});
