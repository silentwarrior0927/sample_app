$(document).ready(function(){

	if($('.subcontainer-tables').length) {

		// Tooltips on Glyphicons
		$(".data_source a").tooltip({
			html: true
		})

		// Equalize div heights
		var max = 0;

		$('.subcontainer-tables').children().each(function(){
			if( $(this).height() > max ) 
				max = $(this).height();
		});

		$('.subcontainer-tables').children().each(function(){
		    $(this).height(max);
		});

	}

});