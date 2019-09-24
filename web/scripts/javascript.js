$(document).ready(function() {

    function makeGame(data) {
	$("#2words").empty();
	$("#3words").empty();
	$("#4words").empty();
	$("#5words").empty();
	$("#6words").empty();
	$("#rack").empty();
	for(let i=0; i < data.rack.length; i++) {
	    $("#rack").append(`<span class="rack-letter">${data.rack.charAt(i)}</span>`);
	}
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
	    list.append('<li class="empty-word"></li>');
	});
    };

    $(document).on("click", ".rack-letter", evt => {
	$(evt.target).addClass("clicked");
    });
    
    $("#start").click(() => {
	$.ajax({
	    method: "GET",
	    url: "/api/words",
	    success: data=>{makeGame(data)}
	});
    });

    $("#start").click();
});
