$(document).ready(function() {
    
    let words = [];

    function makeGame(data) {
	$("#2words").empty();
	$("#3words").empty();
	$("#4words").empty();
	$("#5words").empty();
	$("#6words").empty();
	$("#letters").empty();
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
	words = data.words;
    };

    $(document).on("click", ".rack-letter", function() {
	const l = $(this);
	if (!l.hasClass("clicked")) {
	    l.addClass("clicked");
	    $("#letters").append(l.text());
	}
    });

    $("#clear").click(() => {
	$("#letters").empty();
	$("#rack").children().each(function() {
	    $(this).removeClass("clicked");
	});
    });

    $("#backspace").click(() => {
	const letters = $("#letters");
	const text = letters.text();
	if (text) {
	    let l = text.charAt(text.length-1);
	    letters.html(text.slice(0, -1));
	    $("#rack").find(".clicked").each(function() {
		if ($(this).text() === l) {
		    $(this).removeClass("clicked");
		    return false;
		}
	    });
	}
    });

    $("#enter").click(() => {
	const word = $("#letters").text();
	let correct = false;
	if (word) {
	    words.forEach(function(item, index, object) {
		if (item === word) {
		    object.splice(index, 1);
		    let list;
		    switch(item.length) {
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

		    const w = list.children(".empty-word").first();
		    w.text(item);
		    w.removeClass("empty-word");
		    $("#clear").click();
		    correct = true;
		    return false;
		}
	    });
	    if (!correct) {
		$("#letters").effect("shake", {direction: "left", times: 2, distance: 50}, 750);
	    }
	}
    });

    $("#show").click(() => {
	words.forEach(function(item, index, object) {
	    let list;
	    switch(item.length) {
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

	    const w = list.children(".empty-word").first();
	    w.text(item);
	    w.removeClass("empty-word");
	});
	words = [];
    });
    
    $("#start").click(() => {
	$.ajax({
	    method: "GET",
	    url: "/api/words",
	    success: data=>{makeGame(data)}
	});
    });

    $("#start").click();

    $(document).keydown(evt => {
	switch (evt.which) {
	case 8: // backspace
	    $("#backspace").click();
	    break;
	case 13: // enter
	    $("#enter").click();
	    break;
	case 27: // escape
	    $("#clear").click();
	    break;
	case 32: // space
	    $("#start").click();
	    break;
	default:
	    if (evt.which >= 65 && evt.which <= 90) {
		let l = String.fromCharCode(evt.which).toUpperCase();
		console.log(l);
		console.log($("#rack").text());
	    }
	    break;
	}
    });
});
