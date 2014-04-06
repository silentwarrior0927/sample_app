$(document).ready(function(){

	// Tooltips on Glyphicons
	$(".data_source a").tooltip({
		html: true
	})

	// Equalize div heights
	var max = 0;

	$('.subcontainer').children().each(function(){
		if( $(this).height() > max ) 
			max = $(this).height();
	});

	$('.subcontainer').children().each(function(){
	    $(this).height(max);
	});

});