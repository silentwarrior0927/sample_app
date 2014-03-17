# Place cursor in search bar (in /search)

ready = ->
	
	document.getElementById("search").focus()

$(document).ready(ready)
$(document).on('page:load', ready)