$(document).ready(function() {
	
	play = $('#play');
	pause = $('#pause');
	mute = $('#mute');
	muted = $('#muted');
	close = $('#close');
	audio = 'http://93.75.217.95:8000/';
	song = new Audio(audio);
	vol = $('#volume');
	duration = song.duration;

	if ($("body").data("title") === "deep-page") {
    	song.src= 'http://93.75.217.95:8000';
    	// song.src= 'http://cast.loungefm.com.ua/terrace128';
	} else if ($("body").data("title") === "chill-page") {
    	song.src= 'http://185.33.21.112:11085';
	} else if ($("body").data("title") === "lounge-page") {
    	song.src= 'http://icepe9.infomaniak.ch:80/energylounge-high.mp3';
	}else {
    	song.src= 'http://205.164.62.15:7016';
    	// http://192.240.97.67:8059;
    	// http://lush.wavestreamer.com:6970;
	}



	$('.player').on('click', '#play', function(e) {
		e.preventDefault();
// 		alert($(this));
		song.play();
		$(this).replaceWith('<a class="play-btn gradient" id="pause" href="" title=""><i class="fa fa-pause"></i></a>');
// 		$('#close').fadeIn(300);
		$('#seek').attr('max',song.duration);
	});

	$('.player').on('click', '#pause', function(e) {
		e.preventDefault();
// 		alert($(this));
		song.pause();
		$(this).replaceWith('<a class="play-btn gradient" id="play" href="" title=""><i class="fa fa-play"></i></a>');

	});
    
    $('.player').on('click', '#mute', function(e) {
		e.preventDefault();
		song.volume = 0;
		$(this).replaceWith('<a class="play-btn gradient" id="muted" href="" title=""><i class="fa fa-volume-off"></i></a>');

	});
    
 //   $('.player').on('click', '#muted', function(e) {
	// 	e.preventDefault();
	// 	song.volume = curVolume / 100;;
	// 	$(this).replaceWith('<a class="play-btn gradient" id="mute" href="" title=""><i class="fa fa-volume-up"></a>');

	// });
    
    $('.player').on('click', '#close', function(e) {
		e.preventDefault();
		song.pause();
		song.currentTime = 0;
		$('#pause').replaceWith('<a class="play-btn gradient" id="play" href="" title=""><i class="fa fa-player fa-play"></i></a>');
		$('#close').fadeOut(300);
	});



	$("#seek").bind("change", function() {
		song.currentTime = $(this).val();
		$("#seek").attr("max", song.duration);
	});

	song.addEventListener('timeupdate',function () {
		curtime = parseInt(song.currentTime, 10);
	$("#seek").attr("value", curtime);
	});
	
	// function getMuted(color, qty) {
	//     $('.player').on('click', '#muted', function(e) {
	// 		e.preventDefault();
	// 		song.volume = curVolume / 100;;
	// 		$(this).replaceWith('<a class="play-btn gradient" id="mute" href="" title=""><i class="fa fa-volume-up"></a>');
	
	// 	});
 //   };

	$('.player').on('change', '#volume', function(e) {
		e.preventDefault();
		// alert( this.value );
    	curVolume = this.value;
    	song.volume = curVolume / 100;
	});
	

	$('.carousel').carousel({
		interval: 14000,
		pause: false
	});
   
	
	$(window).on('scroll', function() {
		if ($(document).scrollTop() > 200) {
			$('.back-top').removeClass('inactive').addClass('active');
		} else {
			$('.back-top').removeClass('active').addClass('inactive');
		}
	});

	
	$(".back-top").on('click', '#top', function(e) {
		e.preventDefault();
    	$('html, body').animate({ scrollTop: 0 }, 'slow');
    	// return false;
    });
    
    $(window).on('scroll', function() {
		if ($(document).scrollTop() > 200) {
			$('.contact-us').removeClass('inactive').addClass('active');
		} else {
			$('.contact-us').removeClass('active').addClass('inactive');
		}
	});

	
	$(".modal").on("submit", "form", function(e) {
	    e.preventDefault();  
		contactFormValid();
	    // var form = $(this);
	    $.ajax({
	        type: "POST",
	    	url: 'https://formspree.io/volodymyr.khvesyk@gmail.com',
	        dataType: "JSON",
	        data: new FormData(this),
	        processData: false,
	        contentType: false,
	        success: function (data, status) {
				showAlert(status);
				$('.form').find("input,textarea").val('').end();
				$('body').removeClass('modal-open');
				$('.modal-backdrop').remove();
				setTimeout(function(){
			    	$(".modal").hide();
			    }, 5000);
	        },
	        error: function (xhr, desc, err) {
				showAlert("error"+ err.status + " " + err.statusText);
	        }
	    });        
	});
	
	function contactFormValid() {
	    var name = $("#name").val();
	    var email = $("#email").val();
	    var message = $("#message").val();
	    var emailValid = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	    if (name == "") {
	        showAlert("Please enter your name.");
	        name.focus();
	        return false;
    	}
    	if (email == "") {
	        showAlert("Please enter a valid e-mail address.");
	        email.focus();
	        return false;
	    }
	    if (!emailValid.test(email)) {
	        showAlert("Please enter a valid e-mail address.");
	        email.focus();
	        return false;
	    }
	    if (message == "") {
	    	showAlert("Please type your message.");
	        message.focus();
	        return false;
	    }
	    return true;
	};
	
	function showAlert(message) {
		if (message == "success") {
			var message = "Your message send.";
	    	$('.alert').html("<div class='alert alert-success'>"+message+"</div>");
			$('.alert').show();
			$(".alert").fadeTo(10000, 500).slideUp(500, function() {
			    $(".alert").alert('hide');
			});
		} else {
			$('.alert').html("<div class='alert alert-danger'>"+message+"</div>");
			$('.alert').show();
			$(".alert").fadeTo(10000, 500).slideUp(500, function() {
			    $(".alert").alert('hide');
			});
		}
	}
	
	
	
	
	
	
    
    
  //  $("form").on( "submit", function(e) {
		//   e.preventDefault();
		//   console.log($(this).serialize());
		// });
    
	// $.ajax({
	//     type: "GET",
	//     url: "http://93.75.217.95:8000/status.xsl",
	//     dataType: "xsl",
	//     success: function(data) {
	//         $(".table").html(data);
	//     },
	//     error: function(xhr, status) {
	//         $(".table").html(status);
	//     }
	// });
	


	
});




