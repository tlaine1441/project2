$(document).ready(function() {
	var jumboHeight = $('.jumbotron').outerHeight();
	function parallax(){
	    var scrolled = $(window).scrollTop();
	    $('.bg').css('height', (jumboHeight-scrolled) + 'px');
	}

	$(window).scroll(function(e){
	    parallax();
	});

	$(".track-btn").on("click", function(){
		console.log($(this).parents('.event').data('id'));
		var id = $(this).parents('.event').data('id');
		console.log($(this).parents('.event').data('urlname'));
		$.get("/events/"+ id , function( data ) {
		  console.log(data);
		});
	});
});