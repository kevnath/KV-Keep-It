/*
 * Created by kevnath
 * Kevin Nathanael Soeharjanto
 * 2017-03-06
 * https://github.com/kevnath
 * */

$(document).ready(function() {	
	// Insert new note
	$("#textbox").keydown(function(e) {
		if(e.ctrlKey && e.keyCode == 13 && $(this).val() !== "") {
			var date = new Date();
			var formattedDate = (date.getDate() < 10 ? '0'+ date.getDate() : date.getDate()) + '-'+ 
					(date.getMonth() < 10 ? '0'+ (date.getMonth()+1) : date.getMonth()+1) + '-' + date.getFullYear();
			var content = 	"<article class='note'>" +
								"<div class='date'>" + formattedDate+ "</div>" +
								"<div class='note-content'>"+$(this).val()+"</div>" +
							"</article>";
			$(".list-notes").prepend(content);
			$(this).val("");
		}
	});

	// click event on note
	$(document).on("mousedown", ".note", function(e) {
		switch(e.which) {
			case 1:
				var child = $(this).children('.note-content');
				child.attr("contenteditable", "true");
				// focus on contenteditable div
				setTimeout(function() {
					child.focus();
				}, 0);
				setEditingEvents(child.text());
				break;
			case 2:
				$(this).remove();
				break;			
		}
	});
	
	function setEditingEvents(string) {
		$(".note-content").keydown(function(e) {
			// press Ctrl + Enter
			if(e.ctrlKey && e.keyCode == 13) {
				$(this).attr("contenteditable", "false");
			}
			// press Esc
			if(e.keyCode == 27) {
				$(this).text(string);
				$(this).attr("contenteditable", "false");
			}
		});
	}
});