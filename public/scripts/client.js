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

	$(".invite-btn").on("click", function(){
		console.log($(this).parents('.event').data('id'));
		var id = $(this).parents('.event').data('id');
		console.log($(this).parents('.event').data('urlname'));
		$(this).removeClass("track-btn-color");
		$.post( "/invite", {id:id},function( data ) {
		});
	});

	$(".check").on("click", function(){
		var id = $(this).parents('.invite-item').data('id');
		$.post( "/acceptInvite", {id:id}, function( data ) {
		});
	});

	$(".deny").on("click", function(){
		var id = $(this).parents('.invite-item').data('id');
		$.post( "/denyInvite", {id:id}, function( data ) {
		});
	});
    // var sidebar = $('.sidebar');
    // var top = sidebar.offset().top - parseFloat(sidebar.css('margin-top'));

    // $(window).scroll(function (event) {
    //   var y = $(this).scrollTop();
    //   if (y >= top) {
    //     sidebar.addClass('fixed');
    //   } else {
    //     sidebar.removeClass('fixed');
    //   }
    // });
	
});