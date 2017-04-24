// paralax header
var jumboHeight = $('.jumbotron').outerHeight();

function parallax(){
	var scrolled = $(window).scrollTop();
	$('.bg').css('height', (jumboHeight-scrolled) + 'px');
}

$(window).scroll(function(e){
    parallax();
});


// document ready
$(document).ready(function() {

	// track button event
	$(".track-btn").on("click", function(){
		//console.log($(this).parents('.event').data('id'));

		var id = $(this).parents('.event').data('id');

		//console.log($(this).parents('.event').data('urlname'));

		$(this).removeClass("track-btn-color");

		$.post( "/events/"+ id, function( data ) {
		  console.log( "post: " + data );
		});

	});

	// invite button event
	$(".invite-btn").on("click", function(){

		var button =  '<button type="button" class="btn btn-secondary invite-btn">Invite Sent</button>';

		//console.log($(this).parents('.event').data('id'));

		var id = $(this).parents('.event').data('id');

		//console.log($(this)[0]);

		$.post( "/invite", {id:id},function( data ) {})

		$(this).text("Invite Sent...").removeClass("btn-info").addClass("btn-secondary");

	});

	// accept invite button event
	$(".check").on("click", function(){

		var id = $(this).parents('.invite-item').data('id');

		$.post( "/acceptInvite", {id:id}, function( data ) {});

		$(this).parents('.invite-item').remove();

		var inviteCount = parseInt($("#invite-count").text());

		inviteCount--;

		if (inviteCount < 0) {

			inviteCount = 0;
		}

		$("#invite-count").text(inviteCount);

		$.get("/events/"+ id, function(data) {

			//console.log(data);

			$("#event-root").append(renderEvent(data));

		});

		if (inviteCount === 0) {
			$(".bottom-block").append('<p class="no-invite">No Invites...</p>');
		}

	});

	// deny button event
	$(".deny").on("click", function() {

		var id = $(this).parents('.invite-item').data('id');

		$.post( "/denyInvite", {id:id}, function( data ) {});

		$(this).parents('.invite-item').remove();

		var inviteCount = parseInt($("#invite-count").text());

		inviteCount--;

		if (inviteCount < 0) {

			inviteCount = 0;
		}

		$("#invite-count").text(inviteCount);

		if(inviteCount === 0) {

			$(".bottom-block").append('<p class="no-invite">No Invites...</p>');
		}

	});

	// tooltip popup
    $("body").tooltip(
    	{
    		selector: '[data-toggle="tooltip"]'
    	}
    );
	
}); // end document ready

// render event appends event to my events view when invite is accepted
function renderEvent(event) {

	var html = '<div class="card card-shadow event" data-id="' +event.id + '" data-urlname="'+ event.urlname + '" style="margin-bottom: 20px">'+
	'<h4 class="card-header event-name-header">'+ event.name + '</h4>'+
 		'<div class="card-block">'+
 			'<div class="row">'+
 		    	'<div class="col">'+
 					'<h6 class="card-subtitle mb-2 text-muted">' + event.time + '</h6>'+
 					'</div>'+
 					'</div>'+
 					'<div class="row">'+
 		    			'<div class="col-3">' +
 		    			'<h4 class="card-text">Status</h4>'+
 		    			'<p class="text-success">' + event.status + '</p>' +
 		    			'</div>'+
 		    			'<div class="col-3">'+
 		    			'<h4 class="card-text">City</h4>'+
 		    			'<p class="card-text">' + event.city + '</p>'+
 		    			'</div>' +
 		    			'<div class="col-6">' +
 		    			'<h4 class="card-text">Group</h4>' +
 		    			'<p class="card-text">' + event.group + '</p>' +
 		    			'</div>' +
 		        	  '</div>' +
 		    	  '</div>' +
 		    	  '<div class="card-footer card-outline-secondary">' +
 		    	  '<div class="row">' +
 		    	     '<div class="col" style="padding-top: 5px;">'+
 		    	       '<small class="text-muted"><span class="text-info">Last updated</span> 3 mins ago</small>'+
 		    	     '</div>' +
 		    	     '<div class=col">'+
 		                '<div class="row">'+
 		    	     	'<div class="col">'+
 		                    '<button type="button" class="btn btn-info invite-btn ">Invite Squad</button>'+
 		    	     	'</div>'+
 		    	     	'<div class="col">'+
 		                    '<button type="button" class="btn btn-secondary track-btn">Track Event</button>'+
 		    	      '</div>'+
 		    	       '</div>'+
 		    	   '</div>'+
 		    	'</div>'+
 		    '</div>'+
    	'</div>';

   return html;

} // end renderEvent
