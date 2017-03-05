$(document).ready(function() {
	
	container = $('.play-window');
	cover = $('.cover');
	play = $('#play');
	pause = $('#pause');
	mute = $('#mute');
	muted = $('#muted');
	close = $('#close');
	audio = 'http://93.75.217.95:8000/';
	song = new Audio(audio);
	// vol = ('#volume');
	vol = document.getElementById("volume");
	duration = song.duration;

	if (song.canPlayType('audio/mpeg;')) {
    	song.type= 'audio/mpeg';
    	song.src= 'http://93.75.217.95:8000';
    	// song.src= 'http://cast.loungefm.com.ua/terrace128';
	} else {
    	song.type= 'audio/ogg';
    	song.src= 'http://185.33.22.15:11006';
	}



	$('.player').on('click', '#play', function(e) {
		e.preventDefault();
// 		alert($(this));
// 		alert(song.play());
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
		song.volume = 1;
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

	song.addEventListener('timeupdate',function (){
		curtime = parseInt(song.currentTime, 10);
	$("#seek").attr("value", curtime);
	});


	$('.player').on('change', '#volume', function(e) {
		e.preventDefault();
		alert( this.value );
    	curVolume = this.value;
	});

	$('.carousel').carousel({
		interval: 7000,
		pause: false
	});
	
	$(".carousel").swiperight(function() {
    	$(this).carousel('prev');
	});
		
	$(".carousel").swipeleft(function() {
		$(this).carousel('next');
	});
	
	$(".carousel-inner").swipe( {
		swipeLeft:function(event, direction, distance, duration, fingerCount) {
			$(this).parent().carousel('prev'); 
		},
		swipeRight: function() {
			$(this).parent().carousel('next'); 
		},
		threshold:0
	})
	
	

	
});


