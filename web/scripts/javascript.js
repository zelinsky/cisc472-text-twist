$(document).ready(function() {

    function makeGame(data) {
	$("#rack").html(data.rack);
	data.words.forEach(word => {
	    let list;
	    switch(word.length) {
	    case 2:
		list = $("#2words");
		break;
	    case 3:
		list = $("#3words");
		break;
	    case 4:
		list = $("#4words");
		break;
	    case 5:
		list = $("#5words");
		break;
	    case 6:
		list = $("#6words");
		break;
	    default:
		list = $("#2words");
		break;
	    }
	    list.append('<li class="emptyword"></li>');
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
