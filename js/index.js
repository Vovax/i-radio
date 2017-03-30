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
    	// song.src= 'http://icepe9.infomaniak.ch:80/energylounge-high.mp3';
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
    
    $('.player').on('click', '#muted', function(e) {
		e.preventDefault();
		theVolume = vol.val()
		song.volume = theVolume / 100;
		$(this).replaceWith('<a class="play-btn gradient" id="mute" href="" title=""><i class="fa fa-volume-up"></a>');

	});
    
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
	
	
	$('.player').on('change', '#volume', function(e) {
		e.preventDefault();
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
	};
	
	
    
    
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
	
	var canvasDots = function() {
		var canvas = document.querySelector('canvas'),
			ctx = canvas.getContext('2d'),
			colorDot = '#ccffff',
			color = '#ccffff';
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
		canvas.style.display = 'block';
		ctx.fillStyle = colorDot;
		ctx.lineWidth = .1;
		ctx.strokeStyle = color;
		
		var mousePosition = {
			x: 60 * canvas.width / 100,
			y: 60 * canvas.height / 100
		};
	
		var dots = {
			nb: 50,
			distance: 60,
			d_radius: 50,
			array: []
		};
		
		function Dot(){
			this.x = Math.random() * canvas.width;
			this.y = Math.random() * canvas.height;
		
			this.vx = -.5 + Math.random();
			this.vy = -.5 + Math.random();
			
			this.radius = Math.random();
		}
		
		Dot.prototype = {
			create: function(){
				ctx.beginPath();
				ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
				ctx.fill();
			},
			animate: function(){
				for(i = 0; i < dots.nb; i++){
					var dot = dots.array[i];
					if(dot.y < 0 || dot.y > canvas.height){
						dot.vx = dot.vx;
						dot.vy = - dot.vy;
					}
					else if(dot.x < 0 || dot.x > canvas.width){
						dot.vx = - dot.vx;
						dot.vy = dot.vy;
					}
					dot.x += dot.vx;
					dot.y += dot.vy;
				}
			},
			
			line: function(){
				for(i = 0; i < dots.nb; i++){
					for(j = 0; j < dots.nb; j++){
						i_dot = dots.array[i];
						j_dot = dots.array[j];
						
						if((i_dot.x - j_dot.x) < dots.distance && (i_dot.y - j_dot.y) < dots.distance && (i_dot.x - j_dot.x) > - dots.distance && (i_dot.y - j_dot.y) > - dots.distance){
							if((i_dot.x - mousePosition.x) < dots.d_radius && (i_dot.y - mousePosition.y) < dots.d_radius && (i_dot.x - mousePosition.x) > - dots.d_radius && (i_dot.y - mousePosition.y) > - dots.d_radius){
								ctx.beginPath();
								ctx.moveTo(i_dot.x, i_dot.y);
								ctx.lineTo(j_dot.x, j_dot.y);
								ctx.stroke();
								ctx.closePath();
							}
						}
					}
				}
			}
		};
		
		function createDots(){
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			for(i = 0; i < dots.nb; i++){
				dots.array.push(new Dot());
				dot = dots.array[i];
				dot.create();
			}
			dot.line();
			dot.animate();
		}
		
		window.onmousemove = function(parameter) {
			mousePosition.x = parameter.pageX;
			mousePosition.y = parameter.pageY;
		}
		
		mousePosition.x = window.innerWidth / 2;
		mousePosition.y = window.innerHeight / 2;
		
		setInterval(createDots, 2000/60); 
	};

	window.onload = function() {
		canvasDots();
	}
	
	
});




