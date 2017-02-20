$(document).ready(function() {

	container = $('.player-content');
	cover = $('.cover');
	play = $('#play');
	pause = $('#pause');
	mute = $('#mute');
	muted = $('#muted');
	close = $('#close');
	song = new Audio('http://185.33.22.15:11006');
	duration = song.duration;

	if (song.canPlayType('audio/mpeg;')) {
    	song.type= 'audio/mpeg';
    	song.src= 'http://185.33.21.112:11017';
	} else {
    	song.type= 'audio/ogg';
    	song.src= 'http://185.33.22.15:11006';
	}



	play.live('click', function(e) {
		e.preventDefault();
		song.play();

		$(this).replaceWith('<a class="play-btn gradient" id="pause" href="" title=""><i class="fa fa-pause"></i></a>');
		container.addClass('containerLarge');
		cover.addClass('coverLarge');
		$('#close').fadeIn(300);
		$('#seek').attr('max',song.duration);
	});

	pause.live('click', function(e) {
		e.preventDefault();
		song.pause();
		$(this).replaceWith('<a class="play-btn gradient" id="play" href="" title=""><i class="fa fa-play"></i></a>');

	});

	mute.live('click', function(e) {
		e.preventDefault();
		song.volume = 0;
		$(this).replaceWith('<a class="play-btn gradient" id="muted" href="" title=""><i class="fa fa-volume-off"></i></a>');

	});

	muted.live('click', function(e) {
		e.preventDefault();
		song.volume = 1;
		$(this).replaceWith('<a class="play-btn gradient" id="mute" href="" title=""><i class="fa fa-volume-up"></a>');

	});

	$('#close').click(function(e) {
		e.preventDefault();
		container.removeClass('containerLarge');
		cover.removeClass('coverLarge');
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









	
	
});
