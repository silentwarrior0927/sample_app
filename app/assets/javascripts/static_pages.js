$(document).ready(function() {

	$("#request_trial_button").click(function (event) {
		$(this).hide();
		event.preventDefault(); // Prevent link from following its href
		var h = $("#request_trial_form").height();
		var topMargin = (88 - h) / 2;
		$("#request_trial_form_wrapper").css("top", topMargin);
		setTimeout(function(){$('#free_trial_field').focus(); }, 0);
	});

});