function mapfunction(){
	var google = window.google;
	var addressStart = [];
	var addressEnd = [];
	var autoComplete;


	var aboutContainer = $(".about-container");
	var tripContainer = $(".trip-container");
	var frontPage = $('.front-page');
	$(window).scroll(function () {
		if($(window).scrollTop() > 0) {
			// frontPage.addClass("animateMe");
			aboutContainer.addClass("animateMe");
			tripContainer.addClass("animateMe")
		}
		if($(window).scrollTop() == 0) {
			// frontPage.addClass("animateMe");
			aboutContainer.removeClass("animateMe")
			tripContainer.removeClass("animateMe")
		}

	});
	// $(window).scroll(function () {
	// 	if($(window).scrollTop() == 0) {
	// 		// frontPage.addClass("animateMe");
	// 		aboutContainer.removeClass("animateMe")
	// 	}
	// });

	function initAutocomplete() {
		// Create the autocomplete object, restricting the search to geographical
		// location types.
		autocomplete = new google.maps.places.Autocomplete(
			/** @type {!HTMLInputElement} */(document.getElementById('autocomplete')),
			{types: ['geocode']});
	}
	function initAutocompleteEnd() {
		// Create the autocomplete object, restricting the search to geographical
		// location types.
		autocomplete = new google.maps.places.Autocomplete(
			/** @type {!HTMLInputElement} */(document.getElementById('autocomplete-end')),
			{types: ['geocode']});
	}

	$("#log-in").click(()=>{
		$('#myModalLogIn').modal("show");
	});
	$("#sign-up").click(()=>{
		$('#myModalSignIn').modal("show");
	});

	// $(".search-form").submit((e)=>{
	// 	e.preventDefault();
	// 	var start = $(".start-location").val();
	// 	console.log(start);
	// 	var end = $(".end-location").val();
	// 	var oldAddress = localStorage.getItem("address")
	// 	var info = JSON.parse(oldAddress);
	// 	if(info == null){
	// 		info = [];
	// 	}
	// 	info.push(start);
	// 	info.push(end);
	// 	var infoAsString = JSON.stringify(info);
	// 	localStorage.setItem("address", infoAsString);
	// });

	$("#go-button").click(()=>{
		localStorage.clear(addressStart);
		localStorage.clear(addressEnd);
		var start = $(".start-location").val();
		console.log(start);
		var end = $(".end-location").val();
		var oldAddressStart = localStorage.getItem("addressStart");
		var oldAddressEnd = localStorage.getItem("addressEnd");
		var infoStart = JSON.parse(oldAddressStart);
		var infoEnd = JSON.parse(oldAddressEnd);
		if(infoStart == null){
			infoStart = [];
		}
		if(infoEnd == null){
			infoEnd = [];
		}
		infoStart.push(start);
		infoEnd.push(end);
		var infoAsStringStart = JSON.stringify(infoStart);
		var infoAsStringEnd = JSON.stringify(infoEnd);
		localStorage.setItem("addressStart", infoAsStringStart);
		localStorage.setItem("addressEnd", infoAsStringEnd);
	});

	$("#add-button").click(()=>{
		
	})

	initAutocomplete();
	initAutocompleteEnd();
}