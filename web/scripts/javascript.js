$(document).ready(function() {

    function makeGame(data) {
	$("#rack").html(data.rack);
	data.words.forEach(word => {
	    let list;
	    switch(word.length) {
	    case 2:
		list = $("#2words");
		break;
	    }
	    list.append(`<li>${word}</li>`);
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
