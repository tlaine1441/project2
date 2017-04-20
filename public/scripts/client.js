var jumboHeight = $('.jumbotron').outerHeight();
function parallax(){
    var scrolled = $(window).scrollTop();
    $('.bg').css('height', (jumboHeight-scrolled) + 'px');
}

$(window).scroll(function(e){
    parallax();
});
$(document).ready(function() {
	$(".track-btn").on("click", function(){
		console.log($(this).parents('.event').data('id'));
		var id = $(this).parents('.event').data('id');
		console.log($(this).parents('.event').data('urlname'));
		$(this).removeClass("track-btn-color");
		$.post( "/events/"+ id, function( data ) {
		  console.log( "post: " + data );
		});
	});
	
});