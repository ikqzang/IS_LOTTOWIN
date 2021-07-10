//Hook up the tweet display

$(document).ready(function() {
						   
	$(".countdown").countdown({
				date: "16 jul 2021 16:00:00",
				format: "on"
			},
			
			function() {
				// callback function
			});

});	